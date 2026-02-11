"""
Newsletter API Endpoints
Manage newsletter subscriptions using SendGrid Marketing Contacts
"""

from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr, Field

from app.services.newsletter_service import NewsletterService
from app.services.mailchimp_service import MailchimpService
from app.core.logging import logger

NEWSLETTER_UNAVAILABLE_MSG = "Subscription is temporarily unavailable. Please try again later."

router = APIRouter()


class MailchimpMontrealRequest(BaseModel):
    """Request body for Montreal interest signup (Mailchimp)."""
    email: EmailStr


class MailchimpFooterRequest(BaseModel):
    """Request body for footer newsletter signup (Mailchimp) - homepage only."""
    email: EmailStr


class NewsletterSubscribeRequest(BaseModel):
    """Newsletter subscription request"""
    email: EmailStr
    first_name: Optional[str] = Field(None, max_length=100)
    last_name: Optional[str] = Field(None, max_length=100)
    list_ids: Optional[list[str]] = None
    source: Optional[str] = Field(None, description="Source of subscription (e.g., 'homepage', 'footer')")


class NewsletterUnsubscribeRequest(BaseModel):
    """Newsletter unsubscribe request"""
    email: EmailStr


@router.post("/subscribe", status_code=status.HTTP_200_OK, tags=["newsletter"])
async def subscribe_to_newsletter(
    request: NewsletterSubscribeRequest,
):
    """
    Subscribe an email to the newsletter.
    Public endpoint - no authentication required.
    """
    try:
        service = NewsletterService()
        
        if not service.is_configured():
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Newsletter service is not configured. Please set SENDGRID_API_KEY and SENDGRID_NEWSLETTER_LIST_ID.",
            )

        # Prepare custom fields
        custom_fields = {}
        if request.source:
            custom_fields["source"] = request.source

        result = await service.subscribe(
            email=request.email,
            first_name=request.first_name,
            last_name=request.last_name,
            list_ids=request.list_ids,
            custom_fields=custom_fields if custom_fields else None,
        )

        if result.get("success"):
            logger.info(f"Newsletter subscription: {request.email}")
            return {
                "success": True,
                "message": "Successfully subscribed to newsletter",
                "email": request.email,
            }
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=result.get("error", "Failed to subscribe to newsletter"),
            )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
    except Exception as e:
        logger.error(f"Newsletter subscription error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to subscribe to newsletter: {str(e)}",
        )


@router.post("/unsubscribe", status_code=status.HTTP_200_OK, tags=["newsletter"])
async def unsubscribe_from_newsletter(
    request: NewsletterUnsubscribeRequest,
):
    """
    Unsubscribe an email from the newsletter.
    Public endpoint - no authentication required.
    """
    try:
        service = NewsletterService()
        
        if not service.is_configured():
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Newsletter service is not configured.",
            )

        result = await service.unsubscribe(email=request.email)

        if result.get("success"):
            logger.info(f"Newsletter unsubscription: {request.email}")
            return {
                "success": True,
                "message": "Successfully unsubscribed from newsletter",
                "email": request.email,
            }
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=result.get("error", "Failed to unsubscribe from newsletter"),
            )

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
    except Exception as e:
        logger.error(f"Newsletter unsubscription error: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to unsubscribe from newsletter: {str(e)}",
        )


@router.get("/mailchimp/check", tags=["newsletter"])
async def mailchimp_check():
    """
    Check if Mailchimp is configured (API key and audience ID set).
    Public endpoint - no authentication required. Use for debugging.
    """
    service = MailchimpService()
    return {"configured": service.is_configured()}


@router.post("/mailchimp/montreal", status_code=status.HTTP_200_OK, tags=["newsletter"])
async def mailchimp_montreal_interest(request: MailchimpMontrealRequest):
    """
    Subscribe an email to the first Mailchimp audience with tag "Microsite - Intérêt Montréal".
    Public endpoint - no authentication required.
    Never raises: returns 503 JSON on any unexpected error so the generic handler is never hit.
    """
    try:
        service = MailchimpService()
        if not service.is_configured():
            return JSONResponse(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                content={"detail": "Mailchimp is not configured. Set MAILCHIMP_API_KEY and MAILCHIMP_AUDIENCE_ID."},
            )
        result = await service.add_montreal_interest(email=request.email)
        if not isinstance(result, dict):
            logger.error("Mailchimp Montreal: service returned non-dict %s", type(result))
            return JSONResponse(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                content={"detail": NEWSLETTER_UNAVAILABLE_MSG},
            )
        if result.get("success"):
            return {
                "success": True,
                "message": result.get("message", "Successfully subscribed."),
                "email": request.email,
            }
        err = result.get("error", "Failed to subscribe.")
        if err == "Service temporarily unavailable.":
            return JSONResponse(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                content={"detail": NEWSLETTER_UNAVAILABLE_MSG},
            )
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"detail": err},
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Mailchimp Montreal signup error (full traceback above): %s", e, exc_info=True)
        return JSONResponse(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            content={"detail": NEWSLETTER_UNAVAILABLE_MSG},
        )


@router.post("/mailchimp/footer", status_code=status.HTTP_200_OK, tags=["newsletter"])
async def mailchimp_footer_newsletter(request: MailchimpFooterRequest):
    """
    Subscribe an email to the first Mailchimp audience with tag "Champ Newsletter Microsite Russ Harris".
    For the footer newsletter on the homepage only. Public endpoint.
    Never raises: returns 503 JSON on any unexpected error.
    """
    try:
        service = MailchimpService()
        if not service.is_configured():
            return JSONResponse(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                content={"detail": "Mailchimp is not configured. Set MAILCHIMP_API_KEY and MAILCHIMP_AUDIENCE_ID."},
            )
        result = await service.add_footer_newsletter(email=request.email)
        if not isinstance(result, dict):
            logger.error("Mailchimp footer: service returned non-dict %s", type(result))
            return JSONResponse(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                content={"detail": NEWSLETTER_UNAVAILABLE_MSG},
            )
        if result.get("success"):
            return {
                "success": True,
                "message": result.get("message", "Successfully subscribed."),
                "email": request.email,
            }
        err = result.get("error", "Failed to subscribe.")
        if err == "Service temporarily unavailable.":
            return JSONResponse(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                content={"detail": NEWSLETTER_UNAVAILABLE_MSG},
            )
        return JSONResponse(
            status_code=status.HTTP_400_BAD_REQUEST,
            content={"detail": err},
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Mailchimp footer newsletter signup error: %s", e, exc_info=True)
        return JSONResponse(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            content={"detail": NEWSLETTER_UNAVAILABLE_MSG},
        )


@router.get("/status/{email}", tags=["newsletter"])
async def get_subscription_status(
    email: str,
):
    """
    Get newsletter subscription status for an email.
    Public endpoint - no authentication required.
    """
    try:
        service = NewsletterService()
        
        if not service.is_configured():
            return {
                "subscribed": False,
                "configured": False,
            }

        contact = await service.get_contact(email)
        
        return {
            "subscribed": contact is not None,
            "email": email,
            "contact": contact,
        }

    except Exception as e:
        logger.error(f"Error getting subscription status: {e}")
        return {
            "subscribed": False,
            "email": email,
            "error": str(e),
        }

