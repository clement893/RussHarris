"""
CSRF protection middleware for FastAPI.
"""

import os
import secrets
from typing import Optional

from fastapi import Request, Response, HTTPException, status
from starlette.middleware.base import BaseHTTPMiddleware, RequestResponseEndpoint
from starlette.types import ASGIApp

from app.core.config import settings
from app.core.logging import logger

# Configuration
CSRF_COOKIE_NAME = "csrftoken"
CSRF_HEADER_NAME = "X-CSRFToken"
CSRF_TOKEN_LENGTH = 32  # Bytes, so 64 chars in hex
CSRF_COOKIE_SECURE = os.getenv("ENVIRONMENT", "development").lower() == "production"
CSRF_COOKIE_SAMESITE = "lax"  # Strict or Lax
CSRF_COOKIE_HTTPONLY = False  # Must be accessible by JS to read and send in header
CSRF_COOKIE_MAX_AGE = 3600 * 24 * 7  # 7 days

# Endpoints to exclude from CSRF protection (e.g., webhooks, public APIs)
# These should be carefully considered.
CSRF_EXEMPT_PATHS = [
    f"{settings.API_V1_STR}/auth/google/callback",
    f"{settings.API_V1_STR}/auth/github/callback",
    "/api/webhooks/stripe",  # Stripe webhooks
    "/api/health",  # Health check
]


class CSRFMiddleware(BaseHTTPMiddleware):
    """
    CSRF protection middleware for FastAPI.
    Implements a double-submit cookie pattern.
    """

    def __init__(self, app: ASGIApp):
        super().__init__(app)

    async def dispatch(
        self, request: Request, call_next: RequestResponseEndpoint
    ) -> Response:
        # Check if the path is exempt from CSRF protection
        if any(request.url.path.startswith(path) for path in CSRF_EXEMPT_PATHS):
            logger.debug(f"CSRF exempt path: {request.url.path}")
            response = await call_next(request)
            return response

        # For GET, HEAD, OPTIONS requests, just set the cookie if not present
        if request.method in ["GET", "HEAD", "OPTIONS"]:
            response = await call_next(request)
            if CSRF_COOKIE_NAME not in request.cookies:
                self._set_csrf_cookie(response)
            return response

        # For state-changing methods (POST, PUT, DELETE, PATCH), validate CSRF token
        if request.method in ["POST", "PUT", "DELETE", "PATCH"]:
            csrf_cookie = request.cookies.get(CSRF_COOKIE_NAME)
            csrf_header = request.headers.get(CSRF_HEADER_NAME)

            if not csrf_cookie or not csrf_header or csrf_cookie != csrf_header:
                logger.warning(
                    f"CSRF validation failed for {request.method} {request.url.path}. "
                    f"Cookie: {csrf_cookie}, Header: {csrf_header}"
                )
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="CSRF token missing or incorrect",
                )

            logger.debug(f"CSRF token validated for {request.method} {request.url.path}")

            response = await call_next(request)
            # Regenerate and set a new CSRF token for subsequent requests
            self._set_csrf_cookie(response)
            return response

        # For any other method, just pass through
        response = await call_next(request)
        return response

    def _set_csrf_cookie(self, response: Response) -> None:
        """Generates a new CSRF token and sets it in a cookie."""
        token = secrets.token_hex(CSRF_TOKEN_LENGTH)
        response.set_cookie(
            key=CSRF_COOKIE_NAME,
            value=token,
            max_age=CSRF_COOKIE_MAX_AGE,
            expires=CSRF_COOKIE_MAX_AGE,
            path="/",
            secure=CSRF_COOKIE_SECURE,
            httponly=CSRF_COOKIE_HTTPONLY,  # False for JS access
            samesite=CSRF_COOKIE_SAMESITE,
        )
        logger.debug(f"New CSRF cookie set: {CSRF_COOKIE_NAME}={token[:5]}...")


# Alias for backward compatibility
CSRFProtectionMiddleware = CSRFMiddleware