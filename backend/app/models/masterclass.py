"""
Masterclass Models
SQLAlchemy models for Russ Harris Masterclass events
"""

from datetime import datetime, date, time
from sqlalchemy import (
    Column, DateTime, Date, Time, Integer, String, Text, ForeignKey, 
    Numeric, JSON, Enum as SQLEnum, Boolean, func, Index
)
from sqlalchemy.orm import relationship
import enum

from app.core.database import Base


class EventStatus(str, enum.Enum):
    """City event status"""
    DRAFT = "draft"
    PUBLISHED = "published"
    SOLD_OUT = "sold_out"
    CANCELLED = "cancelled"


class MasterclassEvent(Base):
    """Masterclass event model - main event definition"""
    __tablename__ = "masterclass_events"
    __table_args__ = (
        Index("idx_masterclass_events_created_at", "created_at"),
    )

    id = Column(Integer, primary_key=True, index=True)
    title_en = Column(String(200), nullable=False)
    title_fr = Column(String(200), nullable=False)
    description_en = Column(Text, nullable=True)
    description_fr = Column(Text, nullable=True)
    duration_days = Column(Integer, default=2, nullable=False)
    language = Column(String(50), default="English", nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    # Relationships
    city_events = relationship("CityEvent", back_populates="event", lazy="select")

    def __repr__(self) -> str:
        return f"<MasterclassEvent(id={self.id}, title_en={self.title_en})>"


class City(Base):
    """City model for Canadian cities"""
    __tablename__ = "cities"
    __table_args__ = (
        Index("idx_cities_name_en", "name_en"),
        Index("idx_cities_province", "province"),
    )

    id = Column(Integer, primary_key=True, index=True)
    name_en = Column(String(100), nullable=False)
    name_fr = Column(String(100), nullable=False)
    province = Column(String(50), nullable=True)  # Ontario, BC, Quebec, etc.
    country = Column(String(50), default="Canada", nullable=False)
    timezone = Column(String(50), default="America/Toronto", nullable=False)
    image_url = Column(String(500), nullable=True)  # Image de la ville
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    # Relationships
    venues = relationship("Venue", back_populates="city", lazy="select")
    city_events = relationship("CityEvent", back_populates="city", lazy="select")

    def __repr__(self) -> str:
        return f"<City(id={self.id}, name_en={self.name_en})>"


class Venue(Base):
    """Venue model - hotels, conference centers"""
    __tablename__ = "venues"
    __table_args__ = (
        Index("idx_venues_city_id", "city_id"),
    )

    id = Column(Integer, primary_key=True, index=True)
    city_id = Column(Integer, ForeignKey("cities.id", ondelete="CASCADE"), nullable=False, index=True)
    name = Column(String(200), nullable=False)
    address = Column(String(300), nullable=True)
    postal_code = Column(String(20), nullable=True)
    capacity = Column(Integer, nullable=False)
    amenities = Column(JSON, nullable=True)  # WiFi, parking, restaurant, etc.
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    # Relationships
    city = relationship("City", back_populates="venues", lazy="select")
    city_events = relationship("CityEvent", back_populates="venue", lazy="select")

    def __repr__(self) -> str:
        return f"<Venue(id={self.id}, name={self.name}, city_id={self.city_id})>"


class CityEvent(Base):
    """City event model - instance of event in a specific city/venue"""
    __tablename__ = "city_events"
    __table_args__ = (
        Index("idx_city_events_event_id", "event_id"),
        Index("idx_city_events_city_id", "city_id"),
        Index("idx_city_events_status", "status"),
        Index("idx_city_events_start_date", "start_date"),
        Index("idx_city_events_venue_id", "venue_id"),
    )

    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("masterclass_events.id", ondelete="CASCADE"), nullable=False, index=True)
    city_id = Column(Integer, ForeignKey("cities.id", ondelete="CASCADE"), nullable=False, index=True)
    venue_id = Column(Integer, ForeignKey("venues.id", ondelete="CASCADE"), nullable=False, index=True)

    # Dates and times
    start_date = Column(Date, nullable=False, index=True)
    end_date = Column(Date, nullable=False)
    start_time = Column(Time, default=time(9, 0), nullable=False)
    end_time = Column(Time, default=time(17, 0), nullable=False)

    # Capacity
    total_capacity = Column(Integer, nullable=False, default=30)
    available_spots = Column(Integer, nullable=False)  # Calculé dynamiquement

    # Status
    status = Column(
        SQLEnum(EventStatus),
        default=EventStatus.DRAFT,
        nullable=False,
        index=True
    )

    # Pricing
    early_bird_deadline = Column(Date, nullable=True)
    early_bird_price = Column(Numeric(10, 2), nullable=True)  # Prix en CAD
    regular_price = Column(Numeric(10, 2), nullable=False)  # Prix en CAD
    group_discount_percentage = Column(Integer, default=10, nullable=False)
    group_minimum = Column(Integer, default=3, nullable=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)
    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    # Relationships
    event = relationship("MasterclassEvent", back_populates="city_events", lazy="select")
    city = relationship("City", back_populates="city_events", lazy="select")
    venue = relationship("Venue", back_populates="city_events", lazy="select")
    bookings = relationship("Booking", back_populates="city_event", lazy="select")

    def __repr__(self) -> str:
        return f"<CityEvent(id={self.id}, event_id={self.event_id}, city_id={self.city_id}, start_date={self.start_date})>"
