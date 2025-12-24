"""
API Key Authentication
Provides API key-based authentication as an alternative to JWT tokens
"""

import secrets
import hashlib
from typing import Optional
from fastapi import HTTPException, Security, status
from fastapi.security import APIKeyHeader, APIKeyQuery
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.logging import logger
from app.models.user import User


# API Key header name
API_KEY_HEADER_NAME = "X-API-Key"
API_KEY_QUERY_NAME = "api_key"

# API Key schemes
api_key_header = APIKeyHeader(name=API_KEY_HEADER_NAME, auto_error=False)
api_key_query = APIKeyQuery(name=API_KEY_QUERY_NAME, auto_error=False)


def generate_api_key() -> str:
    """Generate a secure API key"""
    # Generate 32-byte random key, encode as base64url
    return secrets.token_urlsafe(32)


def hash_api_key(api_key: str) -> str:
    """Hash an API key for storage"""
    return hashlib.sha256(api_key.encode()).hexdigest()


def verify_api_key(api_key: str, hashed_key: str) -> bool:
    """Verify an API key against its hash"""
    return hash_api_key(api_key) == hashed_key


async def get_api_key(
    api_key_header: Optional[str] = Security(api_key_header),
    api_key_query: Optional[str] = Security(api_key_query),
) -> Optional[str]:
    """Get API key from header or query parameter"""
    return api_key_header or api_key_query


async def get_user_from_api_key(
    api_key: Optional[str] = Security(get_api_key),
    db: AsyncSession = None,
) -> Optional[User]:
    """Get user from API key"""
    if not api_key:
        return None
    
    if not db:
        return None
    
    # Hash the provided API key
    hashed_key = hash_api_key(api_key)
    
    # Query user by API key hash
    # Note: This assumes you add an api_key_hash field to the User model
    try:
        result = await db.execute(
            select(User).where(User.api_key_hash == hashed_key)
        )
        user = result.scalar_one_or_none()
        
        if user and user.is_active:
            return user
    except AttributeError:
        # api_key_hash field doesn't exist yet
        logger.warning("API key authentication not fully configured - api_key_hash field missing")
        return None
    
    return None


async def require_api_key(
    api_key: Optional[str] = Security(get_api_key),
    db: AsyncSession = None,
) -> User:
    """Require valid API key, raise exception if invalid"""
    user = await get_user_from_api_key(api_key, db)
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or missing API key",
            headers={"WWW-Authenticate": "ApiKey"},
        )
    
    return user


async def optional_api_key(
    api_key: Optional[str] = Security(get_api_key),
    db: AsyncSession = None,
) -> Optional[User]:
    """Optional API key authentication - returns None if not provided"""
    return await get_user_from_api_key(api_key, db)

