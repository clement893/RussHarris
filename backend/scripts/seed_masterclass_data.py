#!/usr/bin/env python3
"""
Seed Masterclass Data Script
Create default masterclass events, cities, venues, and city events for Russ Harris Masterclass 2025

Usage: python scripts/seed_masterclass_data.py
"""

import asyncio
import sys
from pathlib import Path
from datetime import date, time, datetime, timedelta

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy import select
from app.core.config import settings
from app.models.masterclass import (
    MasterclassEvent, City, Venue, CityEvent, EventStatus
)


async def seed_masterclass_data():
    """Seed masterclass data: events, cities, venues, city events"""
    engine = create_async_engine(str(settings.DATABASE_URL))
    async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    async with async_session() as session:
        print("=" * 70)
        print("Seeding Masterclass Data - Russ Harris ACT Masterclass 2025")
        print("=" * 70)

        # 1. Check if data already exists
        result = await session.execute(select(MasterclassEvent))
        existing_events = result.scalars().all()
        if existing_events:
            print("\n⚠️  Masterclass data already exists. Skipping seed.")
            print("   To re-seed, delete existing data first.")
            await engine.dispose()
            return

        # 2. Create Masterclass Event
        print("\n1. Creating Masterclass Event...")
        masterclass_event = MasterclassEvent(
            title_en="Trauma-Focused ACT Masterclass",
            title_fr="Masterclass ACT Centré sur le Trauma",
            description_en="An intensive 2-day masterclass on Trauma-Focused Acceptance and Commitment Therapy with Dr. Russ Harris. Transform your practice with evidence-based techniques.",
            description_fr="Masterclass intensive de 2 jours sur la Thérapie d'Acceptation et d'Engagement centrée sur le Trauma avec Dr. Russ Harris. Transformez votre pratique avec des techniques basées sur la science.",
            duration_days=2,
            language="English"
        )
        session.add(masterclass_event)
        await session.flush()  # Flush to get the ID
        print(f"   ✅ Created: {masterclass_event.title_en} (ID: {masterclass_event.id})")

        # 3. Create Cities
        print("\n2. Creating Cities...")
        cities_data = [
            {
                "name_en": "Toronto",
                "name_fr": "Toronto",
                "province": "Ontario",
                "timezone": "America/Toronto",
                "image_url": "/images/cities/toronto.jpg"
            },
            {
                "name_en": "Vancouver",
                "name_fr": "Vancouver",
                "province": "British Columbia",
                "timezone": "America/Vancouver",
                "image_url": "/images/cities/vancouver.jpg"
            },
            {
                "name_en": "Montréal",
                "name_fr": "Montréal",
                "province": "Quebec",
                "timezone": "America/Montreal",
                "image_url": "/images/cities/montreal.jpg"
            },
            {
                "name_en": "Calgary",
                "name_fr": "Calgary",
                "province": "Alberta",
                "timezone": "America/Edmonton",
                "image_url": "/images/cities/calgary.jpg"
            },
            {
                "name_en": "Ottawa",
                "name_fr": "Ottawa",
                "province": "Ontario",
                "timezone": "America/Toronto",
                "image_url": "/images/cities/ottawa.jpg"
            },
        ]

        cities = []
        for city_data in cities_data:
            city = City(**city_data)
            session.add(city)
            cities.append(city)
        await session.flush()
        print(f"   ✅ Created {len(cities)} cities")

        # 4. Create Venues (one per city for now)
        print("\n3. Creating Venues...")
        venues_data = [
            {
                "city_id": 1,  # Toronto
                "name": "Toronto Convention Centre",
                "address": "255 Front St W, Toronto, ON M5V 2W6",
                "postal_code": "M5V 2W6",
                "capacity": 30,
                "amenities": {"wifi": True, "parking": True, "restaurant": True, "accessibility": True}
            },
            {
                "city_id": 2,  # Vancouver
                "name": "Vancouver Convention Centre",
                "address": "1055 Canada Pl, Vancouver, BC V6C 0C3",
                "postal_code": "V6C 0C3",
                "capacity": 30,
                "amenities": {"wifi": True, "parking": True, "restaurant": True, "accessibility": True}
            },
            {
                "city_id": 3,  # Montréal
                "name": "Palais des congrès de Montréal",
                "address": "201 Av. Viger O, Montréal, QC H2Z 1X7",
                "postal_code": "H2Z 1X7",
                "capacity": 30,
                "amenities": {"wifi": True, "parking": True, "restaurant": True, "accessibility": True}
            },
            {
                "city_id": 4,  # Calgary
                "name": "Calgary TELUS Convention Centre",
                "address": "136 8 Ave SE, Calgary, AB T2G 0K6",
                "postal_code": "T2G 0K6",
                "capacity": 30,
                "amenities": {"wifi": True, "parking": True, "restaurant": True, "accessibility": True}
            },
            {
                "city_id": 5,  # Ottawa
                "name": "Shaw Centre",
                "address": "55 Colonel By Dr, Ottawa, ON K1N 9J2",
                "postal_code": "K1N 9J2",
                "capacity": 30,
                "amenities": {"wifi": True, "parking": True, "restaurant": True, "accessibility": True}
            },
        ]

        venues = []
        for venue_data in venues_data:
            # Get city from cities list
            city_index = venue_data["city_id"] - 1
            venue_data["city_id"] = cities[city_index].id
            venue = Venue(**venue_data)
            session.add(venue)
            venues.append(venue)
        await session.flush()
        print(f"   ✅ Created {len(venues)} venues")

        # 5. Create City Events (events in each city with dates)
        print("\n4. Creating City Events...")
        
        # Dates: Starting from July 2025, one weekend per month per city
        base_date = date(2025, 7, 15)  # July 15-16, 2025
        regular_price = 1200.00  # $1,200 CAD
        early_bird_price = 960.00  # $960 CAD (-20%)
        
        city_events = []
        for i, venue in enumerate(venues):
            # Offset dates by 2 weeks per city
            event_date = base_date + timedelta(weeks=i * 2)
            end_date = event_date + timedelta(days=1)  # 2-day event
            
            # Early bird deadline: 2 months before event
            early_bird_deadline = event_date - timedelta(days=60)
            
            city_event = CityEvent(
                event_id=masterclass_event.id,
                city_id=venues[i].city_id,
                venue_id=venue.id,
                start_date=event_date,
                end_date=end_date,
                start_time=time(9, 0),
                end_time=time(17, 0),
                total_capacity=30,
                available_spots=30,  # Will be calculated dynamically later
                status=EventStatus.PUBLISHED,
                early_bird_deadline=early_bird_deadline,
                early_bird_price=early_bird_price,
                regular_price=regular_price,
                group_discount_percentage=10,
                group_minimum=3
            )
            session.add(city_event)
            city_events.append(city_event)
        
        await session.commit()
        print(f"   ✅ Created {len(city_events)} city events")
        
        print("\n" + "=" * 70)
        print("✅ Masterclass data seeded successfully!")
        print("=" * 70)
        print(f"\nSummary:")
        print(f"  - Masterclass Event: 1")
        print(f"  - Cities: {len(cities)}")
        print(f"  - Venues: {len(venues)}")
        print(f"  - City Events: {len(city_events)}")
        print(f"\nCities and dates:")
        for i, city_event in enumerate(city_events):
            city = cities[i] if i < len(cities) else None
            venue = venues[i] if i < len(venues) else None
            if city and venue:
                print(f"  - {city.name_en}: {city_event.start_date} to {city_event.end_date} at {venue.name}")

    await engine.dispose()


if __name__ == "__main__":
    asyncio.run(seed_masterclass_data())
