"""
User Schemas
Pydantic v2 models for user management
"""

from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr, Field, ConfigDict


class UserBase(BaseModel):
    """Base user schema"""
    email: EmailStr = Field(..., description="User email address")
    first_name: Optional[str] = Field(None, max_length=100, description="First name")
    last_name: Optional[str] = Field(None, max_length=100, description="Last name")
    is_active: bool = Field(default=True, description="User active status")


class UserCreate(UserBase):
    """User creation schema"""
    password: str = Field(..., min_length=8, description="User password")


class UserUpdate(BaseModel):
    """User update schema"""
    email: Optional[EmailStr] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    is_active: Optional[bool] = None


class User(UserBase):
    """User response schema"""
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class UserInDB(User):
    """User in database schema"""
    hashed_password: str
