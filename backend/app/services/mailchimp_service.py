"""
Mailchimp Service - Add contacts to Mailchimp audience with tags.
Uses Mailchimp Marketing API v3.
Fetches list merge fields and fills missing ones with empty string so subscriptions always succeed.
"""

import hashlib
import os
from typing import Any

import httpx
from app.core.logging import logger

# Cache: list_id -> list of merge field tags (so we only call merge-fields API once per list)
_merge_fields_cache: dict[str, list[str]] = {}

# Tag for Montreal microsite interest signups
MONTREAL_INTEREST_TAG = "Microsite - Intérêt Montréal"

# Tag for footer newsletter (homepage only)
FOOTER_NEWSLETTER_TAG = "Champ Newsletter Microsite Russ Harris"


def _get_datacenter(api_key: str) -> str:
    """Extract Mailchimp datacenter from API key (e.g. us21)."""
    if "-" in api_key:
        return api_key.rsplit("-", 1)[-1].strip()
    return "us1"


def _subscriber_hash(email: str) -> str:
    """MD5 hash of lowercase email for Mailchimp subscriber_hash."""
    return hashlib.md5(email.lower().encode("utf-8")).hexdigest()


def _parse_mailchimp_error(response: httpx.Response) -> str:
    """Extract user-friendly error from Mailchimp API response (type, title, detail)."""
    try:
        data = response.json()
        if isinstance(data, dict):
            detail = data.get("detail")
            title = data.get("title")
            if isinstance(detail, str) and detail:
                return detail
            if isinstance(title, str) and title:
                return title
            errors = data.get("errors")
            if isinstance(errors, list) and errors:
                first = errors[0]
                if isinstance(first, dict) and first.get("message"):
                    return str(first["message"])
                if isinstance(first, dict) and first.get("field"):
                    return f"{first.get('field', '')}: {first.get('message', response.text)}".strip(": ")
    except Exception:
        pass
    return response.text or f"HTTP {response.status_code}"


class MailchimpService:
    """Service for adding contacts to Mailchimp with tags."""

    def __init__(self) -> None:
        self.api_key = os.getenv("MAILCHIMP_API_KEY", "").strip()
        self.audience_id = (os.getenv("MAILCHIMP_AUDIENCE_ID") or "").strip()
        self._base_url: str | None = None
        if self.api_key:
            dc = _get_datacenter(self.api_key)
            self._base_url = f"https://{dc}.api.mailchimp.com/3.0"

    def is_configured(self) -> bool:
        """Check if Mailchimp API key and audience ID are set."""
        return bool(self.api_key and self.audience_id)

    async def _get_list_merge_field_tags(
        self, client: httpx.AsyncClient, list_id: str, auth: tuple[str, str]
    ) -> list[str]:
        """Get merge field tags for the list (cached). Returns e.g. ['FNAME', 'LNAME', 'PHONE']."""
        global _merge_fields_cache
        if list_id in _merge_fields_cache:
            return _merge_fields_cache[list_id]
        url = f"{self._base_url}/lists/{list_id}/merge-fields"
        try:
            resp = await client.get(url, auth=auth, params={"count": 100})
            if resp.status_code != 200:
                return []
            data = resp.json()
            tags = []
            for m in data.get("merge_fields", []):
                tag = m.get("tag")
                if isinstance(tag, str) and tag:
                    tags.append(tag)
            _merge_fields_cache[list_id] = tags
            return tags
        except Exception as e:
            logger.warning("Mailchimp get merge-fields failed: %s" % (e,))
            return []

    def _merge_fields_for_list(self, tags: list[str]) -> dict[str, str]:
        """Build merge_fields dict with empty string for each tag so all required fields are satisfied."""
        return {tag: "" for tag in tags}

    async def add_montreal_interest(self, email: str) -> dict[str, Any]:
        """
        Add or update a contact in the first audience with tag "Microsite - Intérêt Montréal".
        Uses PUT to add/update member, then POST to add the tag.
        Never raises: returns {"success": False, "error": "..."} on any failure.
        """
        try:
            if not self.is_configured():
                return {
                    "success": False,
                    "error": "Mailchimp is not configured (MAILCHIMP_API_KEY and MAILCHIMP_AUDIENCE_ID).",
                }
            email = email.strip().lower()
            if not email:
                return {"success": False, "error": "Email is required."}
            auth = ("apikey", self.api_key)
            list_id = self.audience_id
            subscriber_hash = _subscriber_hash(email)
            assert self._base_url is not None
            timeout = httpx.Timeout(15.0, connect=5.0)

            async with httpx.AsyncClient(timeout=timeout) as client:
                # Merge fields: fetch list fields and fill all with empty string so Mailchimp accepts
                merge_tags = await self._get_list_merge_field_tags(client, list_id, auth)
                merge_fields = self._merge_fields_for_list(merge_tags) if merge_tags else {"FNAME": "", "LNAME": ""}

                # 1) Add or update member (PUT is idempotent)
                put_url = f"{self._base_url}/lists/{list_id}/members/{subscriber_hash}"
                put_body = {
                    "email_address": email,
                    "status": "subscribed",
                    "status_if_new": "subscribed",
                    "merge_fields": merge_fields,
                }
                try:
                    put_resp = await client.put(put_url, json=put_body, auth=auth)
                except (httpx.ConnectError, httpx.TimeoutException, httpx.HTTPError, Exception) as e:
                    logger.exception("Mailchimp PUT member failed: %s" % (e,))
                    return {"success": False, "error": "Service temporarily unavailable."}

                if put_resp.status_code not in (200, 201):
                    detail = _parse_mailchimp_error(put_resp)
                    logger.warning("Mailchimp PUT member %s: %s" % (put_resp.status_code, detail))
                    return {"success": False, "error": detail or "Failed to add contact."}

                # 2) Add tag
                tags_url = f"{self._base_url}/lists/{list_id}/members/{subscriber_hash}/tags"
                tags_body = {
                    "tags": [{"name": MONTREAL_INTEREST_TAG, "status": "active"}],
                }
                try:
                    tag_resp = await client.post(tags_url, json=tags_body, auth=auth)
                except (httpx.ConnectError, httpx.TimeoutException, httpx.HTTPError, Exception) as e:
                    logger.exception("Mailchimp add tag failed: %s" % (e,))
                    return {
                        "success": True,
                        "message": "Subscribed; tag could not be applied.",
                    }

                if tag_resp.status_code >= 400:
                    logger.warning("Mailchimp add tag %s: %s" % (tag_resp.status_code, tag_resp.text))
                    return {"success": True, "message": "Subscribed."}

                logger.info("Mailchimp Montreal interest: %s" % (email,))
                return {"success": True, "message": "Successfully subscribed."}
        except Exception as e:
            logger.exception("Mailchimp Montreal interest unexpected error: %s" % (e,))
            return {"success": False, "error": "Service temporarily unavailable."}

    async def add_footer_newsletter(self, email: str) -> dict[str, Any]:
        """
        Add or update a contact in the first audience with tag "Champ Newsletter Microsite Russ Harris".
        Used only for the footer newsletter on the homepage.
        Never raises: returns {"success": False, "error": "..."} on any failure.
        """
        try:
            if not self.is_configured():
                return {
                    "success": False,
                    "error": "Mailchimp is not configured (MAILCHIMP_API_KEY and MAILCHIMP_AUDIENCE_ID).",
                }
            email = email.strip().lower()
            if not email:
                return {"success": False, "error": "Email is required."}
            auth = ("apikey", self.api_key)
            list_id = self.audience_id
            subscriber_hash = _subscriber_hash(email)
            assert self._base_url is not None
            timeout = httpx.Timeout(15.0, connect=5.0)

            async with httpx.AsyncClient(timeout=timeout) as client:
                merge_tags = await self._get_list_merge_field_tags(client, list_id, auth)
                merge_fields = self._merge_fields_for_list(merge_tags) if merge_tags else {"FNAME": "", "LNAME": ""}

                put_url = f"{self._base_url}/lists/{list_id}/members/{subscriber_hash}"
                put_body = {
                    "email_address": email,
                    "status": "subscribed",
                    "status_if_new": "subscribed",
                    "merge_fields": merge_fields,
                }
                try:
                    put_resp = await client.put(put_url, json=put_body, auth=auth)
                except (httpx.ConnectError, httpx.TimeoutException, httpx.HTTPError, Exception) as e:
                    logger.exception("Mailchimp PUT member failed: %s" % (e,))
                    return {"success": False, "error": "Service temporarily unavailable."}

                if put_resp.status_code not in (200, 201):
                    detail = _parse_mailchimp_error(put_resp)
                    logger.warning("Mailchimp PUT member %s: %s" % (put_resp.status_code, detail))
                    return {"success": False, "error": detail or "Failed to add contact."}

                tags_url = f"{self._base_url}/lists/{list_id}/members/{subscriber_hash}/tags"
                tags_body = {
                    "tags": [{"name": FOOTER_NEWSLETTER_TAG, "status": "active"}],
                }
                try:
                    tag_resp = await client.post(tags_url, json=tags_body, auth=auth)
                except (httpx.ConnectError, httpx.TimeoutException, httpx.HTTPError, Exception) as e:
                    logger.exception("Mailchimp add tag failed: %s" % (e,))
                    return {
                        "success": True,
                        "message": "Subscribed; tag could not be applied.",
                    }

                if tag_resp.status_code >= 400:
                    logger.warning("Mailchimp add tag %s: %s" % (tag_resp.status_code, tag_resp.text))
                    return {"success": True, "message": "Subscribed."}

                logger.info("Mailchimp footer newsletter: %s" % (email,))
                return {"success": True, "message": "Successfully subscribed."}
        except Exception as e:
            logger.exception("Mailchimp footer newsletter unexpected error: %s" % (e,))
            return {"success": False, "error": "Service temporarily unavailable."}
