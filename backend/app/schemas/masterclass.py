"""
Masterclass Schemas
Pydantic schemas for masterclass events, cities, and venues
"""

from typing import Optional, List, Any
from datetime import datetime, date, time
from decimal import Decimal
from pydantic import BaseModel, Field, model_validator

from app.models.masterclass import EventStatus


# MasterclassEvent Schemas
class MasterclassEventBase(BaseModel):
    title_en: str = Field(..., max_length=200)
    title_fr: str = Field(..., max_length=200)
    description_en: Optional[str] = None
    description_fr: Optional[str] = None
    duration_days: int = Field(default=2, ge=1, le=30)
    language: str = Field(default="English", max_length=50)


class MasterclassEventCreate(MasterclassEventBase):
    pass


class MasterclassEventUpdate(BaseModel):
    title_en: Optional[str] = Field(None, max_length=200)
    title_fr: Optional[str] = Field(None, max_length=200)
    description_en: Optional[str] = None
    description_fr: Optional[str] = None
    duration_days: Optional[int] = Field(None, ge=1, le=30)
    language: Optional[str] = Field(None, max_length=50)


class MasterclassEventResponse(MasterclassEventBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# City Schemas
class CityBase(BaseModel):
    name_en: str = Field(..., max_length=100)
    name_fr: str = Field(..., max_length=100)
    province: Optional[str] = Field(None, max_length=50)
    country: str = Field(default="Canada", max_length=50)
    timezone: str = Field(default="America/Toronto", max_length=50)
    image_url: Optional[str] = None


class CityCreate(CityBase):
    pass


class CityUpdate(BaseModel):
    name_en: Optional[str] = Field(None, max_length=100)
    name_fr: Optional[str] = Field(None, max_length=100)
    province: Optional[str] = Field(None, max_length=50)
    country: Optional[str] = Field(None, max_length=50)
    timezone: Optional[str] = Field(None, max_length=50)
    image_url: Optional[str] = None


class CityResponse(CityBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


# Venue Schemas
class VenueBase(BaseModel):
    city_id: int
    name: str = Field(..., max_length=200)
    address: Optional[str] = Field(None, max_length=300)
    postal_code: Optional[str] = Field(None, max_length=20)
    capacity: int = Field(..., ge=1)
    amenities: Optional[dict] = None  # JSON object


class VenueCreate(VenueBase):
    pass


class VenueUpdate(BaseModel):
    city_id: Optional[int] = None
    name: Optional[str] = Field(None, max_length=200)
    address: Optional[str] = Field(None, max_length=300)
    postal_code: Optional[str] = Field(None, max_length=20)
    capacity: Optional[int] = Field(None, ge=1)
    amenities: Optional[dict] = None


class VenueResponse(VenueBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


# CityEvent Schemas
class CityEventBase(BaseModel):
    event_id: int
    city_id: int
    venue_id: int
    start_date: date
    end_date: date
    start_time: time = Field(default=time(9, 0))
    end_time: time = Field(default=time(17, 0))
    total_capacity: int = Field(default=30, ge=1)
    available_spots: int = Field(..., ge=0)
    status: EventStatus = EventStatus.DRAFT
    early_bird_deadline: Optional[date] = None
    early_bird_price: Optional[Decimal] = Field(None, ge=0)
    regular_price: Decimal = Field(..., ge=0)
    group_discount_percentage: int = Field(default=10, ge=0, le=100)
    group_minimum: int = Field(default=3, ge=2)


class CityEventCreate(CityEventBase):
    pass


class CityEventUpdate(BaseModel):
    event_id: Optional[int] = None
    city_id: Optional[int] = None
    venue_id: Optional[int] = None
    start_date: Optional[date] = None
    end_date: Optional[date] = None
    start_time: Optional[time] = None
    end_time: Optional[time] = None
    total_capacity: Optional[int] = Field(None, ge=1)
    available_spots: Optional[int] = Field(None, ge=0)
    status: Optional[EventStatus] = None
    early_bird_deadline: Optional[date] = None
    early_bird_price: Optional[Decimal] = Field(None, ge=0)
    regular_price: Optional[Decimal] = Field(None, ge=0)
    group_discount_percentage: Optional[int] = Field(None, ge=0, le=100)
    group_minimum: Optional[int] = Field(None, ge=2)


class CityEventResponse(CityEventBase):
    id: int
    created_at: datetime
    updated_at: datetime
    event: Optional[MasterclassEventResponse] = None
    city: Optional[CityResponse] = None
    venue: Optional[VenueResponse] = None
    # Aliases for frontend compatibility
    event_date: Optional[date] = None  # Alias for start_date
    max_attendees: Optional[int] = None  # Alias for total_capacity
    current_attendees: Optional[int] = None  # Calculated: total_capacity - available_spots
    is_active: Optional[bool] = None  # Alias for status == PUBLISHED
    price: Optional[Decimal] = None  # Alias for regular_price
    currency: Optional[str] = None  # Default to EUR

    class Config:
        from_attributes = True

    @model_validator(mode='before')
    @classmethod
    def add_computed_fields(cls, data: Any) -> Any:
        """Add computed fields for frontend compatibility"""
        if isinstance(data, dict):
            # Add computed fields
            if 'start_date' in data:
                data['event_date'] = data['start_date']
            if 'total_capacity' in data:
                data['max_attendees'] = data['total_capacity']
                # Calculate current_attendees
                total_cap = data.get('total_capacity', 0) or 0
                available = data.get('available_spots', 0) or 0
                data['current_attendees'] = max(0, total_cap - available)
            if 'status' in data:
                data['is_active'] = data['status'] == EventStatus.PUBLISHED
            if 'regular_price' in data:
                data['price'] = data['regular_price']
            data['currency'] = data.get('currency', 'EUR')
        elif hasattr(data, '__dict__'):
            # SQLAlchemy model - convert to dict
            obj_dict = {k: v for k, v in data.__dict__.items() if not k.startswith('_')}
            # Add computed fields
            if hasattr(data, 'start_date'):
                obj_dict['event_date'] = data.start_date
            if hasattr(data, 'total_capacity'):
                obj_dict['max_attendees'] = data.total_capacity
                total_cap = data.total_capacity or 0
                available = data.available_spots or 0
                obj_dict['current_attendees'] = max(0, total_cap - available)
            if hasattr(data, 'status'):
                obj_dict['is_active'] = data.status == EventStatus.PUBLISHED
            if hasattr(data, 'regular_price'):
                obj_dict['price'] = data.regular_price
            obj_dict['currency'] = 'EUR'
            return obj_dict
        return data


class CityWithEventsResponse(CityResponse):
    city_events: List[CityEventResponse] = []

    class Config:
        from_attributes = True


class AvailabilityResponse(BaseModel):
    """Availability response for a city event"""
    city_event_id: int
    total_capacity: int
    available_spots: int
    booked_spots: int
    percentage_available: float = Field(..., ge=0, le=100)
    status: str  # "available", "almost_full" (< 20%), "sold_out"
    is_almost_full: bool  # True if < 20% available
    is_sold_out: bool  # True if available_spots == 0


class EventListResponse(BaseModel):
    events: List[MasterclassEventResponse]
    total: int


class CityListResponse(BaseModel):
    cities: List[CityWithEventsResponse]
    total: int


class CityEventListResponse(BaseModel):
    city_events: List[CityEventResponse]
    total: int
