"""
Activity Feed API Endpoints
"""

from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status, Query
from pydantic import BaseModel, Field
from sqlalchemy import select, desc, and_
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.user import User
from app.dependencies import get_current_user
from app.core.database import get_db
from app.core.security_audit import SecurityAuditLog
from app.core.logging import logger

router = APIRouter()


class ActivityResponse(BaseModel):
    """Activity response model"""
    id: int
    action: str
    entity_type: str
    entity_id: Optional[str]
    user_id: int
    timestamp: str
    event_metadata: Optional[dict] = None

    class Config:
        from_attributes = True


@router.get("/activities", response_model=List[ActivityResponse], tags=["activities"])
async def get_activities(
    entity_type: Optional[str] = Query(None, description="Filter by entity type"),
    entity_id: Optional[int] = Query(None, description="Filter by entity ID"),
    user_id: Optional[int] = Query(None, description="Filter by user ID"),
    limit: int = Query(50, ge=1, le=100, description="Maximum number of results"),
    offset: int = Query(0, ge=0, description="Offset for pagination"),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Get activity feed with optional filters
    """
    try:
        query = select(SecurityAuditLog).order_by(desc(SecurityAuditLog.created_at))
        
        # Apply filters
        filters = []
        if entity_type:
            filters.append(SecurityAuditLog.entity_type == entity_type)
        if entity_id:
            filters.append(SecurityAuditLog.entity_id == str(entity_id))
        if user_id:
            filters.append(SecurityAuditLog.user_id == user_id)
        
        if filters:
            query = query.where(and_(*filters))
        
        # Apply pagination
        query = query.limit(limit).offset(offset)
        
        result = await db.execute(query)
        activities = result.scalars().all()
        
        return [
            ActivityResponse(
                id=activity.id,
                action=activity.action,
                entity_type=activity.entity_type or '',
                entity_id=activity.entity_id,
                user_id=activity.user_id,
                timestamp=activity.created_at.isoformat() if activity.created_at else '',
                event_metadata=activity.event_metadata
            )
            for activity in activities
        ]
    except Exception as e:
        logger.error(f"Failed to fetch activities: {e}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch activities: {str(e)}"
        )


@router.get("/activities/timeline", response_model=List[ActivityResponse], tags=["activities"])
async def get_activity_timeline(
    entity_type: Optional[str] = Query(None),
    entity_id: Optional[int] = Query(None),
    limit: int = Query(100, ge=1, le=500),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Get activity timeline (more results for timeline view)
    """
    return await get_activities(
        entity_type=entity_type,
        entity_id=entity_id,
        limit=limit,
        offset=0,
        current_user=current_user,
        db=db
    )

