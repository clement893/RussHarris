"""
User Management Endpoints
"""

from typing import Annotated, List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.models.user import User
from app.schemas.user import User as UserSchema

router = APIRouter()


@router.get("/", response_model=List[UserSchema])
async def get_users(
    skip: int = 0,
    limit: int = 100,
    db: Annotated[AsyncSession, Depends(get_db)] = None,
) -> List[User]:
    """
    Get list of users
    
    Args:
        skip: Number of records to skip
        limit: Maximum number of records to return
        db: Database session
        
    Returns:
        List of users
    """
    result = await db.execute(User.__table__.select().offset(skip).limit(limit))
    users = result.scalars().all()
    return users


@router.get("/{user_id}", response_model=UserSchema)
async def get_user(
    user_id: int,
    db: Annotated[AsyncSession, Depends(get_db)],
) -> User:
    """
    Get user by ID
    
    Args:
        user_id: User ID
        db: Database session
        
    Returns:
        User information
    """
    result = await db.execute(User.__table__.select().where(User.id == user_id))
    user = result.scalar_one_or_none()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    return user

