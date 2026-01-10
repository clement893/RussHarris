"""
Booking Endpoints
API endpoints for bookings and reservations
"""

from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.logging import logger
from app.schemas.booking import BookingCreate, BookingResponse, BookingSummaryResponse, PaymentIntentResponse
from app.services.booking_service import BookingService
from app.services.availability_service import AvailabilityService
from app.services.stripe_service import StripeService
from app.models.booking import Booking, BookingStatus, PaymentStatus
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
        venue_name=city_event.venue.name if city_event.venue else "TBD",
        venue_address=city_event.venue.address if city_event.venue else None,
        start_date=city_event.start_date.isoformat(),
        end_date=city_event.end_date.isoformat(),
        attendee_name=booking.attendee_name,
        attendee_email=booking.attendee_email,
        quantity=booking.quantity,
        total=booking.total,
        payment_status=booking.payment_status,
    )


@router.post("/{booking_id}/create-payment-intent", response_model=PaymentIntentResponse)
async def create_payment_intent(
    booking_id: int,
    db: AsyncSession = Depends(get_db),
):
    """
    Create Stripe PaymentIntent for a booking
    
    Args:
        booking_id: Booking ID
        
    Returns:
        PaymentIntent with client_secret for frontend
    """
    try:
        # Get booking
        result = await db.execute(
            select(Booking).where(Booking.id == booking_id)
        )
        booking = result.scalar_one_or_none()
        
        if not booking:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Booking {booking_id} not found",
            )
        
        # Check if booking already has a payment intent
        if booking.payment_intent_id:
            # Retrieve existing payment intent
            stripe_service = StripeService(db)
            try:
                import stripe
                payment_intent = stripe.PaymentIntent.retrieve(booking.payment_intent_id)
                return PaymentIntentResponse(
                    client_secret=payment_intent.client_secret,
                    payment_intent_id=payment_intent.id,
                    amount=booking.total,
                    currency="EUR",
                )
            except Exception as e:
                logger.warning(f"Could not retrieve existing payment intent: {e}")
                # Continue to create new one
        
        # Check booking status
        if booking.status == BookingStatus.CANCELLED:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot create payment intent for cancelled booking",
            )
        
        if booking.payment_status == PaymentStatus.PAID:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Booking is already paid",
            )
        
        # Get currency from event
        result = await db.execute(
            select(CityEvent)
            .options(selectinload(CityEvent.event))
            .where(CityEvent.id == booking.city_event_id)
        )
        city_event = result.scalar_one_or_none()
        # Currency is not stored in CityEvent, default to EUR for masterclass bookings
        currency = "EUR"
        
        # Create PaymentIntent
        stripe_service = StripeService(db)
        payment_intent_data = await stripe_service.create_payment_intent_for_booking(
            booking=booking,
            currency=currency,
        )
        
        # Update booking with payment_intent_id
        booking.payment_intent_id = payment_intent_data["payment_intent_id"]
        await db.commit()
        await db.refresh(booking)
        
        from decimal import Decimal
        
        return PaymentIntentResponse(
            client_secret=payment_intent_data["client_secret"],
            payment_intent_id=payment_intent_data["payment_intent_id"],
            amount=Decimal(str(booking.total)),
            currency=currency,
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error creating payment intent for booking {booking_id}: {e}", exc_info=True)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create payment intent",
        )