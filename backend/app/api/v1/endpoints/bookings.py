"""
Booking Endpoints
API endpoints for bookings and reservations
"""

from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.logging import logger
from app.schemas.booking import BookingCreate, BookingResponse, BookingSummaryResponse
from app.services.booking_service import BookingService
from app.services.availability_service import AvailabilityService
from app.models.booking import Booking, BookingStatus
from app.models.masterclass import CityEvent
from sqlalchemy import select
from sqlalchemy.orm import selectinload

router = APIRouter()


@router.post("/create", response_model=BookingResponse, status_code=status.HTTP_201_CREATED)
async def create_booking(
    booking_data: BookingCreate,
    db: AsyncSession = Depends(get_db),
):
    """
    Create a new booking
    
    Args:
        booking_data: Booking creation data
        
    Returns:
        Created booking with reference
    """
    booking_service = BookingService(db)
    
    try:
        booking = await booking_service.create_booking(booking_data)
        
        # Reload with relationships
        result = await db.execute(
            select(Booking)
            .options(
                selectinload(Booking.attendees),
                selectinload(Booking.city_event).selectinload(CityEvent.event),
                selectinload(Booking.city_event).selectinload(CityEvent.city),
                selectinload(Booking.city_event).selectinload(CityEvent.venue),
            )
            .where(Booking.id == booking.id)
        )
        booking = result.scalar_one_or_none()
        
        return BookingResponse.model_validate(booking)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
    except Exception as e:
        logger.error(f"Error creating booking: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create booking",
        )


@router.get("/{booking_reference}", response_model=BookingResponse)
async def get_booking_by_reference(
    booking_reference: str,
    db: AsyncSession = Depends(get_db),
):
    """
    Get booking status by reference
    
    Args:
        booking_reference: Unique booking reference
        
    Returns:
        Booking details with status, attendees, and payment info
    """
    booking_service = BookingService(db)
    
    booking = await booking_service.get_booking_by_reference(booking_reference)
    
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Booking {booking_reference} not found",
        )
    
    return BookingResponse.model_validate(booking)


@router.post("/{booking_reference}/cancel", response_model=BookingResponse)
async def cancel_booking(
    booking_reference: str,
    db: AsyncSession = Depends(get_db),
):
    """
    Cancel a booking
    
    Args:
        booking_reference: Unique booking reference
        
    Returns:
        Cancelled booking details
    """
    booking_service = BookingService(db)
    
    try:
        booking = await booking_service.cancel_booking(booking_reference)
        
        # Reload with relationships
        result = await db.execute(
            select(Booking)
            .options(
                selectinload(Booking.attendees),
                selectinload(Booking.city_event).selectinload(CityEvent.event),
                selectinload(Booking.city_event).selectinload(CityEvent.city),
                selectinload(Booking.city_event).selectinload(CityEvent.venue),
            )
            .where(Booking.id == booking.id)
        )
        booking = result.scalar_one_or_none()
        
        return BookingResponse.model_validate(booking)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e),
        )
    except Exception as e:
        logger.error(f"Error cancelling booking {booking_reference}: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to cancel booking",
        )


@router.get("/{booking_reference}/summary", response_model=BookingSummaryResponse)
async def get_booking_summary(
    booking_reference: str,
    db: AsyncSession = Depends(get_db),
):
    """
    Get booking summary for confirmation page
    
    Args:
        booking_reference: Unique booking reference
        
    Returns:
        Booking summary with city, venue, dates, and price
    """
    booking_service = BookingService(db)
    
    booking = await booking_service.get_booking_by_reference(booking_reference)
    
    if not booking:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Booking {booking_reference} not found",
        )
    
    # Load city_event with relationships
    result = await db.execute(
        select(CityEvent)
        .options(
            selectinload(CityEvent.city),
            selectinload(CityEvent.venue),
        )
        .where(CityEvent.id == booking.city_event_id)
    )
    city_event = result.scalar_one_or_none()
    
    if not city_event:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="City event not found",
        )
    
    return BookingSummaryResponse(
        booking_reference=booking.booking_reference,
        city=city_event.city.name_en,
        city_fr=city_event.city.name_fr,
        venue_name=city_event.venue.name,
        venue_address=city_event.venue.address,
        start_date=city_event.start_date.isoformat(),
        end_date=city_event.end_date.isoformat(),
        attendee_name=booking.attendee_name,
        attendee_email=booking.attendee_email,
        quantity=booking.quantity,
        total=booking.total,
        payment_status=booking.payment_status,
    )