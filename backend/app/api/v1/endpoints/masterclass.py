"""
Masterclass Endpoints
API endpoints for masterclass events, cities, and venues
"""

from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_, or_
from sqlalchemy.orm import selectinload
from datetime import date

from app.core.database import get_db
from app.core.logging import logger
from app.models.masterclass import MasterclassEvent, City, Venue, CityEvent, EventStatus
from app.schemas.masterclass import (
    MasterclassEventResponse,
    CityResponse,
    CityWithEventsResponse,
    CityEventResponse,
    CityEventListResponse,
    AvailabilityResponse,
    EventListResponse,
    CityListResponse,
)
from app.services.availability_service import AvailabilityService

router = APIRouter()


@router.get("/events", response_model=EventListResponse)
async def list_events(
    db: AsyncSession = Depends(get_db),
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
):
    """
    List all masterclass events
    
    Returns:
        List of masterclass events
    """
    # Get all events
    query = select(MasterclassEvent).offset(skip).limit(limit).order_by(MasterclassEvent.created_at.desc())
    
    result = await db.execute(query)
    events = result.scalars().all()
    
    # Count total
    count_query = select(MasterclassEvent)
    count_result = await db.execute(count_query)
    total = len(count_result.scalars().all())
    
    return EventListResponse(
        events=[MasterclassEventResponse.model_validate(event) for event in events],
        total=total,
    )


@router.get("/cities", response_model=CityListResponse)
async def list_cities_with_events(
    db: AsyncSession = Depends(get_db),
    include_upcoming_only: bool = Query(True, description="Include only upcoming events"),
):
    """
    List all cities with their events
    
    Args:
        include_upcoming_only: If True, only include upcoming events (default: True)
        
    Returns:
        List of cities with their events
    """
    today = date.today()
    
    # Get all cities with eager loading of city_events
    query = select(City).options(
        selectinload(City.city_events).selectinload(CityEvent.event),
        selectinload(City.city_events).selectinload(CityEvent.venue),
        selectinload(City.venues),
    )
    
    result = await db.execute(query)
    cities = result.scalars().all()
    
    # Filter events if needed
    cities_with_events = []
    for city in cities:
        # Filter city_events by status and date
        if include_upcoming_only:
            city.city_events = [
                ce for ce in city.city_events
                if ce.status == EventStatus.PUBLISHED and ce.start_date >= today
            ]
        else:
            city.city_events = [
                ce for ce in city.city_events
                if ce.status == EventStatus.PUBLISHED
            ]
        
        # Only include cities that have events
        if city.city_events:
            cities_with_events.append(city)
    
    return CityListResponse(
        cities=[CityWithEventsResponse.model_validate(city) for city in cities_with_events],
        total=len(cities_with_events),
    )


@router.get("/cities/{city_id}/events", response_model=CityEventListResponse)
async def list_city_events(
    city_id: int,
    db: AsyncSession = Depends(get_db),
    status_filter: Optional[EventStatus] = Query(None, description="Filter by event status"),
):
    """
    List events for a specific city
    
    Args:
        city_id: City ID
        status_filter: Optional status filter (default: PUBLISHED only)
        
    Returns:
        List of city events
    """
    # Build query
    query = (
        select(CityEvent)
        .options(
            selectinload(CityEvent.event),
            selectinload(CityEvent.city),
            selectinload(CityEvent.venue),
        )
        .where(CityEvent.city_id == city_id)
    )
    
    # Apply status filter
    if status_filter:
        query = query.where(CityEvent.status == status_filter)
    else:
        # Default: only published events
        query = query.where(CityEvent.status == EventStatus.PUBLISHED)
    
    # Order by start_date
    query = query.order_by(CityEvent.start_date.asc())
    
    result = await db.execute(query)
    city_events = result.scalars().all()
    
    return CityEventListResponse(
        city_events=[CityEventResponse.model_validate(ce) for ce in city_events],
        total=len(city_events),
    )


@router.get("/events/{event_id}", response_model=MasterclassEventResponse)
async def get_event(
    event_id: int,
    db: AsyncSession = Depends(get_db),
):
    """
    Get event details by ID
    
    Args:
        event_id: Event ID
        
    Returns:
        Event details
    """
    result = await db.execute(
        select(MasterclassEvent)
        .where(MasterclassEvent.id == event_id)
    )
    event = result.scalar_one_or_none()
    
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Event {event_id} not found",
        )
    
    return MasterclassEventResponse.model_validate(event)


@router.get("/city-events/{city_event_id}", response_model=CityEventResponse)
async def get_city_event(
    city_event_id: int,
    db: AsyncSession = Depends(get_db),
):
    """
    Get city event details by ID
    
    Args:
        city_event_id: City event ID
        
    Returns:
        City event details with event, city, and venue info
    """
    result = await db.execute(
        select(CityEvent)
        .options(
            selectinload(CityEvent.event),
            selectinload(CityEvent.city),
            selectinload(CityEvent.venue),
        )
        .where(CityEvent.id == city_event_id)
    )
    city_event = result.scalar_one_or_none()
    
    if not city_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"City event {city_event_id} not found",
        )
    
    return CityEventResponse.model_validate(city_event)


@router.get("/city-events/{city_event_id}/availability", response_model=AvailabilityResponse)
async def get_availability(
    city_event_id: int,
    db: AsyncSession = Depends(get_db),
):
    """
    Get real-time availability for a city event
    
    Args:
        city_event_id: City event ID
        
    Returns:
        Availability information with status and spots
    """
    availability_service = AvailabilityService(db)
    
    try:
        availability = await availability_service.get_availability(city_event_id)
        return availability
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e),
        )
    except Exception as e:
        logger.error(f"Error getting availability for city_event {city_event_id}: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to get availability",
        )