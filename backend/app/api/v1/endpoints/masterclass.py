"""
Masterclass Endpoints
API endpoints for masterclass events, cities, and venues
"""

from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, and_, or_, delete
from sqlalchemy.orm import selectinload
from datetime import date
from sqlalchemy.exc import IntegrityError

from app.core.database import get_db
from app.core.logging import logger
from app.core.cache import invalidate_cache_pattern_async
from app.dependencies import get_current_user, require_admin_or_superadmin
from app.models.masterclass import MasterclassEvent, City, Venue, CityEvent, EventStatus
from app.models import User
from app.schemas.masterclass import (
    MasterclassEventResponse,
    MasterclassEventCreate,
    MasterclassEventUpdate,
    CityResponse,
    CityCreate,
    CityUpdate,
    CityWithEventsResponse,
    VenueResponse,
    VenueCreate,
    VenueUpdate,
    CityEventResponse,
    CityEventCreate,
    CityEventUpdate,
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


# ============================================================================
# Admin Endpoints - MasterclassEvent CRUD
# ============================================================================

@router.post("/events", response_model=MasterclassEventResponse, status_code=status.HTTP_201_CREATED)
async def create_event(
    event_data: MasterclassEventCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
    _: None = Depends(require_admin_or_superadmin),
):
    """
    Create a new masterclass event
    Requires admin or superadmin authentication
    """
    try:
        event = MasterclassEvent(**event_data.model_dump())
        db.add(event)
        await db.commit()
        await db.refresh(event)
        
        logger.info(f"User {current_user.id} created masterclass event {event.id}")
        # Invalidate cache for masterclass endpoints
        await invalidate_cache_pattern_async("masterclass:*")
        return MasterclassEventResponse.model_validate(event)
    except Exception as e:
        await db.rollback()
        logger.error(f"Error creating masterclass event: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create masterclass event",
        )


@router.put("/events/{event_id}", response_model=MasterclassEventResponse)
async def update_event(
    event_id: int,
    event_data: MasterclassEventUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
    _: None = Depends(require_admin_or_superadmin),
):
    """
    Update a masterclass event
    Requires admin or superadmin authentication
    """
    result = await db.execute(
        select(MasterclassEvent).where(MasterclassEvent.id == event_id)
    )
    event = result.scalar_one_or_none()
    
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Event {event_id} not found",
        )
    
    try:
        # Update fields
        update_data = event_data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(event, field, value)
        
        await db.commit()
        await db.refresh(event)
        
        logger.info(f"User {current_user.id} updated masterclass event {event_id}")
        # Invalidate cache for masterclass endpoints
        await invalidate_cache_pattern_async("masterclass:*")
        return MasterclassEventResponse.model_validate(event)
    except Exception as e:
        await db.rollback()
        logger.error(f"Error updating masterclass event {event_id}: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update masterclass event",
        )


@router.delete("/events/{event_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_event(
    event_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
    _: None = Depends(require_admin_or_superadmin),
):
    """
    Delete a masterclass event
    Requires admin or superadmin authentication
    Note: This will cascade delete all associated city events
    """
    result = await db.execute(
        select(MasterclassEvent).where(MasterclassEvent.id == event_id)
    )
    event = result.scalar_one_or_none()
    
    if not event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Event {event_id} not found",
        )
    
    try:
        await db.delete(event)
        await db.commit()
        
        logger.info(f"User {current_user.id} deleted masterclass event {event_id}")
        # Invalidate cache for masterclass endpoints
        await invalidate_cache_pattern_async("masterclass:*")
        return None
    except IntegrityError:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot delete event with associated city events",
        )
    except Exception as e:
        await db.rollback()
        logger.error(f"Error deleting masterclass event {event_id}: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete masterclass event",
        )


# ============================================================================
# Admin Endpoints - City CRUD
# ============================================================================

@router.get("/cities/all", response_model=List[CityResponse])
async def list_all_cities(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
    _: None = Depends(require_admin_or_superadmin),
):
    """
    List all cities (admin only, without event filtering)
    Requires admin or superadmin authentication
    """
    result = await db.execute(select(City).order_by(City.name_en.asc()))
    cities = result.scalars().all()
    return [CityResponse.model_validate(city) for city in cities]


@router.post("/cities", response_model=CityResponse, status_code=status.HTTP_201_CREATED)
async def create_city(
    city_data: CityCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
    _: None = Depends(require_admin_or_superadmin),
):
    """
    Create a new city
    Requires admin or superadmin authentication
    """
    try:
        city = City(**city_data.model_dump())
        db.add(city)
        await db.commit()
        await db.refresh(city)
        
        logger.info(f"User {current_user.id} created city {city.id}")
        # Invalidate cache for masterclass endpoints
        await invalidate_cache_pattern_async("masterclass:*")
        return CityResponse.model_validate(city)
    except Exception as e:
        await db.rollback()
        logger.error(f"Error creating city: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create city",
        )


@router.put("/cities/{city_id}", response_model=CityResponse)
async def update_city(
    city_id: int,
    city_data: CityUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
    _: None = Depends(require_admin_or_superadmin),
):
    """
    Update a city
    Requires admin or superadmin authentication
    """
    result = await db.execute(
        select(City).where(City.id == city_id)
    )
    city = result.scalar_one_or_none()
    
    if not city:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"City {city_id} not found",
        )
    
    try:
        # Update fields
        update_data = city_data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(city, field, value)
        
        await db.commit()
        await db.refresh(city)
        
        logger.info(f"User {current_user.id} updated city {city_id}")
        # Invalidate cache for masterclass endpoints
        await invalidate_cache_pattern_async("masterclass:*")
        return CityResponse.model_validate(city)
    except Exception as e:
        await db.rollback()
        logger.error(f"Error updating city {city_id}: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update city",
        )


@router.delete("/cities/{city_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_city(
    city_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
    _: None = Depends(require_admin_or_superadmin),
):
    """
    Delete a city
    Requires admin or superadmin authentication
    Note: This will cascade delete all associated venues and city events
    """
    result = await db.execute(
        select(City).where(City.id == city_id)
    )
    city = result.scalar_one_or_none()
    
    if not city:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"City {city_id} not found",
        )
    
    try:
        await db.delete(city)
        await db.commit()
        
        logger.info(f"User {current_user.id} deleted city {city_id}")
        # Invalidate cache for masterclass endpoints
        await invalidate_cache_pattern_async("masterclass:*")
        return None
    except Exception as e:
        await db.rollback()
        logger.error(f"Error deleting city {city_id}: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete city",
        )


# ============================================================================
# Admin Endpoints - Venue CRUD
# ============================================================================

@router.get("/venues", response_model=List[VenueResponse])
async def list_venues(
    city_id: Optional[int] = Query(None, description="Filter by city ID"),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
    _: None = Depends(require_admin_or_superadmin),
):
    """
    List all venues (admin only)
    Requires admin or superadmin authentication
    """
    query = select(Venue)
    if city_id:
        query = query.where(Venue.city_id == city_id)
    query = query.order_by(Venue.name.asc())
    
    result = await db.execute(query)
    venues = result.scalars().all()
    return [VenueResponse.model_validate(venue) for venue in venues]


@router.get("/venues/{venue_id}", response_model=VenueResponse)
async def get_venue(
    venue_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
    _: None = Depends(require_admin_or_superadmin),
):
    """
    Get venue details by ID
    Requires admin or superadmin authentication
    """
    result = await db.execute(
        select(Venue).where(Venue.id == venue_id)
    )
    venue = result.scalar_one_or_none()
    
    if not venue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Venue {venue_id} not found",
        )
    
    return VenueResponse.model_validate(venue)


@router.post("/venues", response_model=VenueResponse, status_code=status.HTTP_201_CREATED)
async def create_venue(
    venue_data: VenueCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
    _: None = Depends(require_admin_or_superadmin),
):
    """
    Create a new venue
    Requires admin or superadmin authentication
    """
    # Validate city exists
    city_result = await db.execute(
        select(City).where(City.id == venue_data.city_id)
    )
    if not city_result.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"City {venue_data.city_id} not found",
        )
    
    try:
        venue = Venue(**venue_data.model_dump())
        db.add(venue)
        await db.commit()
        await db.refresh(venue)
        
        logger.info(f"User {current_user.id} created venue {venue.id}")
        # Invalidate cache for masterclass endpoints
        await invalidate_cache_pattern_async("masterclass:*")
        return VenueResponse.model_validate(venue)
    except Exception as e:
        await db.rollback()
        logger.error(f"Error creating venue: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create venue",
        )


@router.put("/venues/{venue_id}", response_model=VenueResponse)
async def update_venue(
    venue_id: int,
    venue_data: VenueUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
    _: None = Depends(require_admin_or_superadmin),
):
    """
    Update a venue
    Requires admin or superadmin authentication
    """
    result = await db.execute(
        select(Venue).where(Venue.id == venue_id)
    )
    venue = result.scalar_one_or_none()
    
    if not venue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Venue {venue_id} not found",
        )
    
    # Validate city exists if provided
    if venue_data.city_id is not None:
        city_result = await db.execute(
            select(City).where(City.id == venue_data.city_id)
        )
        if not city_result.scalar_one_or_none():
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"City {venue_data.city_id} not found",
            )
    
    try:
        # Update fields
        update_data = venue_data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(venue, field, value)
        
        await db.commit()
        await db.refresh(venue)
        
        logger.info(f"User {current_user.id} updated venue {venue_id}")
        # Invalidate cache for masterclass endpoints
        await invalidate_cache_pattern_async("masterclass:*")
        return VenueResponse.model_validate(venue)
    except Exception as e:
        await db.rollback()
        logger.error(f"Error updating venue {venue_id}: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update venue",
        )


@router.delete("/venues/{venue_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_venue(
    venue_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
    _: None = Depends(require_admin_or_superadmin),
):
    """
    Delete a venue
    Requires admin or superadmin authentication
    Note: This will cascade delete all associated city events
    """
    result = await db.execute(
        select(Venue).where(Venue.id == venue_id)
    )
    venue = result.scalar_one_or_none()
    
    if not venue:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Venue {venue_id} not found",
        )
    
    try:
        await db.delete(venue)
        await db.commit()
        
        logger.info(f"User {current_user.id} deleted venue {venue_id}")
        # Invalidate cache for masterclass endpoints
        await invalidate_cache_pattern_async("masterclass:*")
        return None
    except Exception as e:
        await db.rollback()
        logger.error(f"Error deleting venue {venue_id}: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete venue",
        )


# ============================================================================
# Admin Endpoints - CityEvent CRUD
# ============================================================================

@router.get("/city-events/all", response_model=CityEventListResponse)
async def list_all_city_events(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=1000),
    status_filter: Optional[EventStatus] = Query(None, description="Filter by event status"),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
    _: None = Depends(require_admin_or_superadmin),
):
    """
    List all city events (admin only, without filtering)
    Requires admin or superadmin authentication
    """
    query = (
        select(CityEvent)
        .options(
            selectinload(CityEvent.event),
            selectinload(CityEvent.city),
            selectinload(CityEvent.venue),
        )
        .offset(skip)
        .limit(limit)
        .order_by(CityEvent.start_date.desc())
    )
    
    if status_filter:
        query = query.where(CityEvent.status == status_filter)
    
    result = await db.execute(query)
    city_events = result.scalars().all()
    
    # Count total
    count_query = select(CityEvent)
    if status_filter:
        count_query = count_query.where(CityEvent.status == status_filter)
    count_result = await db.execute(count_query)
    total = len(count_result.scalars().all())
    
    return CityEventListResponse(
        city_events=[CityEventResponse.model_validate(ce) for ce in city_events],
        total=total,
    )


@router.post("/city-events", response_model=CityEventResponse, status_code=status.HTTP_201_CREATED)
async def create_city_event(
    city_event_data: CityEventCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
    _: None = Depends(require_admin_or_superadmin),
):
    """
    Create a new city event
    Requires admin or superadmin authentication
    """
    # Validate event exists
    event_result = await db.execute(
        select(MasterclassEvent).where(MasterclassEvent.id == city_event_data.event_id)
    )
    if not event_result.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Event {city_event_data.event_id} not found",
        )
    
    # Validate city exists
    city_result = await db.execute(
        select(City).where(City.id == city_event_data.city_id)
    )
    if not city_result.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"City {city_event_data.city_id} not found",
        )
    
    # Validate venue exists
    venue_result = await db.execute(
        select(Venue).where(Venue.id == city_event_data.venue_id)
    )
    if not venue_result.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Venue {city_event_data.venue_id} not found",
        )
    
    try:
        city_event = CityEvent(**city_event_data.model_dump())
        db.add(city_event)
        await db.commit()
        await db.refresh(city_event, ["event", "city", "venue"])
        
        logger.info(f"User {current_user.id} created city event {city_event.id}")
        # Invalidate cache for masterclass endpoints
        await invalidate_cache_pattern_async("masterclass:*")
        return CityEventResponse.model_validate(city_event)
    except Exception as e:
        await db.rollback()
        logger.error(f"Error creating city event: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create city event",
        )


@router.put("/city-events/{city_event_id}", response_model=CityEventResponse)
async def update_city_event(
    city_event_id: int,
    city_event_data: CityEventUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
    _: None = Depends(require_admin_or_superadmin),
):
    """
    Update a city event
    Requires admin or superadmin authentication
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
    
    # Validate related entities if provided
    if city_event_data.event_id is not None:
        event_result = await db.execute(
            select(MasterclassEvent).where(MasterclassEvent.id == city_event_data.event_id)
        )
        if not event_result.scalar_one_or_none():
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Event {city_event_data.event_id} not found",
            )
    
    if city_event_data.city_id is not None:
        city_result = await db.execute(
            select(City).where(City.id == city_event_data.city_id)
        )
        if not city_result.scalar_one_or_none():
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"City {city_event_data.city_id} not found",
            )
    
    if city_event_data.venue_id is not None:
        venue_result = await db.execute(
            select(Venue).where(Venue.id == city_event_data.venue_id)
        )
        if not venue_result.scalar_one_or_none():
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Venue {city_event_data.venue_id} not found",
            )
    
    try:
        # Update fields
        update_data = city_event_data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(city_event, field, value)
        
        await db.commit()
        await db.refresh(city_event, ["event", "city", "venue"])
        
        logger.info(f"User {current_user.id} updated city event {city_event_id}")
        # Invalidate cache for masterclass endpoints
        await invalidate_cache_pattern_async("masterclass:*")
        return CityEventResponse.model_validate(city_event)
    except Exception as e:
        await db.rollback()
        logger.error(f"Error updating city event {city_event_id}: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update city event",
        )


@router.delete("/city-events/{city_event_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_city_event(
    city_event_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
    _: None = Depends(require_admin_or_superadmin),
):
    """
    Delete a city event
    Requires admin or superadmin authentication
    Note: This will cascade delete all associated bookings
    """
    result = await db.execute(
        select(CityEvent).where(CityEvent.id == city_event_id)
    )
    city_event = result.scalar_one_or_none()
    
    if not city_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"City event {city_event_id} not found",
        )
    
    try:
        await db.delete(city_event)
        await db.commit()
        
        logger.info(f"User {current_user.id} deleted city event {city_event_id}")
        # Invalidate cache for masterclass endpoints
        await invalidate_cache_pattern_async("masterclass:*")
        return None
    except Exception as e:
        await db.rollback()
        logger.error(f"Error deleting city event {city_event_id}: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to delete city event",
        )