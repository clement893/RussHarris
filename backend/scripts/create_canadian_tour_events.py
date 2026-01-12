#!/usr/bin/env python3
"""
Create Canadian Tour Events 2026
Create the 4 city events for Russ Harris Masterclass Canadian Tour 2026

Usage: 
  python scripts/create_canadian_tour_events.py
  Or: python -m scripts.create_canadian_tour_events
"""

import asyncio
import sys
import os
from pathlib import Path
from datetime import date, time, timedelta

# Add parent directory to path
backend_path = Path(__file__).parent.parent
sys.path.insert(0, str(backend_path))

# Set working directory to backend
os.chdir(backend_path)

try:
    from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
    from sqlalchemy import select
    from app.core.config import settings
    from app.models.masterclass import (
        MasterclassEvent, City, Venue, CityEvent, EventStatus
    )
except ImportError as e:
    print(f"❌ Import error: {e}")
    print("Make sure you're in the backend directory and dependencies are installed.")
    sys.exit(1)


async def create_canadian_tour_events():
    """Create the 4 city events for Canadian Tour 2026"""
    # Get DATABASE_URL from environment or settings
    database_url = os.getenv('DATABASE_URL') or str(settings.DATABASE_URL)
    
    # Convert postgresql:// to postgresql+asyncpg:// if needed
    if database_url.startswith('postgresql://') and 'asyncpg' not in database_url:
        database_url = database_url.replace('postgresql://', 'postgresql+asyncpg://', 1)
    
    print(f"Connecting to database...")
    engine = create_async_engine(database_url)
    async_session = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

    async with async_session() as session:
        print("=" * 70)
        print("Creating Canadian Tour Events 2026 - Russ Harris Masterclass")
        print("=" * 70)

        # 1. Get or create Masterclass Event
        print("\n1. Checking Masterclass Event...")
        result = await session.execute(select(MasterclassEvent))
        masterclass_event = result.scalar_one_or_none()
        
        if not masterclass_event:
            print("   Creating new Masterclass Event...")
            masterclass_event = MasterclassEvent(
                title_en="ACT Masterclass with Russ Harris",
                title_fr="Masterclass ACT avec Russ Harris",
                description_en="An intensive 2-day masterclass on Acceptance and Commitment Therapy with Dr. Russ Harris. Master psychological flexibility and integrate mindfulness, values, and committed action into your clinical practice.",
                description_fr="Masterclass intensive de 2 jours sur la Thérapie d'Acceptation et d'Engagement avec Dr. Russ Harris. Maîtrisez la flexibilité psychologique et intégrez la pleine conscience, les valeurs et l'action engagée dans votre pratique clinique.",
                duration_days=2,
                language="English"
            )
            session.add(masterclass_event)
            await session.flush()
            print(f"   ✅ Created: {masterclass_event.title_en} (ID: {masterclass_event.id})")
        else:
            print(f"   ✅ Using existing: {masterclass_event.title_en} (ID: {masterclass_event.id})")

        # 2. Define cities and events data
        events_data = [
            {
                "city_name_en": "Montréal",
                "city_name_fr": "Montréal",
                "province": "Quebec",
                "timezone": "America/Montreal",
                "venue_name": "Palais des Congrès",
                "venue_address": "201 Av. Viger O, Montréal, QC H2Z 1X7",
                "start_date": date(2026, 5, 24),
                "end_date": date(2026, 5, 25),
                "capacity": 200,
            },
            {
                "city_name_en": "Calgary",
                "city_name_fr": "Calgary",
                "province": "Alberta",
                "timezone": "America/Edmonton",
                "venue_name": "Calgary Convention Centre",
                "venue_address": "136 8 Ave SE, Calgary, AB T2G 0K6",
                "start_date": date(2026, 5, 31),
                "end_date": date(2026, 6, 1),
                "capacity": 200,
            },
            {
                "city_name_en": "Vancouver",
                "city_name_fr": "Vancouver",
                "province": "British Columbia",
                "timezone": "America/Vancouver",
                "venue_name": "Vancouver Convention Centre",
                "venue_address": "1055 Canada Pl, Vancouver, BC V6C 0C3",
                "start_date": date(2026, 6, 7),
                "end_date": date(2026, 6, 8),
                "capacity": 200,
            },
            {
                "city_name_en": "Toronto",
                "city_name_fr": "Toronto",
                "province": "Ontario",
                "timezone": "America/Toronto",
                "venue_name": "Metro Toronto Convention Centre",
                "venue_address": "255 Front St W, Toronto, ON M5V 2W6",
                "start_date": date(2026, 6, 14),
                "end_date": date(2026, 6, 15),
                "capacity": 200,
            },
        ]

        # 3. Create or update cities, venues, and events
        print("\n2. Creating/Updating Cities, Venues, and Events...")
        created_events = []
        
        for event_data in events_data:
            # Get or create city
            city_result = await session.execute(
                select(City).where(City.name_en == event_data["city_name_en"])
            )
            city = city_result.scalar_one_or_none()
            
            if not city:
                print(f"   Creating city: {event_data['city_name_en']}")
                city = City(
                    name_en=event_data["city_name_en"],
                    name_fr=event_data["city_name_fr"],
                    province=event_data["province"],
                    country="Canada",
                    timezone=event_data["timezone"],
                )
                session.add(city)
                await session.flush()
            else:
                print(f"   Using existing city: {city.name_en} (ID: {city.id})")
            
            # Get or create venue
            venue_result = await session.execute(
                select(Venue).where(
                    Venue.city_id == city.id,
                    Venue.name == event_data["venue_name"]
                )
            )
            venue = venue_result.scalar_one_or_none()
            
            if not venue:
                print(f"   Creating venue: {event_data['venue_name']}")
                venue = Venue(
                    city_id=city.id,
                    name=event_data["venue_name"],
                    address=event_data["venue_address"],
                    capacity=event_data["capacity"],
                    amenities={"wifi": True, "parking": True, "restaurant": True, "accessibility": True}
                )
                session.add(venue)
                await session.flush()
            else:
                # Update capacity if needed
                if venue.capacity != event_data["capacity"]:
                    venue.capacity = event_data["capacity"]
                    print(f"   Updated venue capacity: {event_data['venue_name']} -> {event_data['capacity']}")
                else:
                    print(f"   Using existing venue: {venue.name} (ID: {venue.id})")
            
            # Check if city event already exists
            city_event_result = await session.execute(
                select(CityEvent).where(
                    CityEvent.city_id == city.id,
                    CityEvent.start_date == event_data["start_date"]
                )
            )
            existing_city_event = city_event_result.scalar_one_or_none()
            
            if existing_city_event:
                # Update existing event
                print(f"   Updating existing event: {city.name_en} - {event_data['start_date']}")
                existing_city_event.event_id = masterclass_event.id
                existing_city_event.venue_id = venue.id
                existing_city_event.start_date = event_data["start_date"]
                existing_city_event.end_date = event_data["end_date"]
                existing_city_event.start_time = time(9, 0)
                existing_city_event.end_time = time(17, 0)
                existing_city_event.total_capacity = event_data["capacity"]
                existing_city_event.available_spots = event_data["capacity"]
                existing_city_event.status = EventStatus.PUBLISHED
                existing_city_event.regular_price = 1200.00  # $1,200 CAD
                existing_city_event.early_bird_price = 960.00  # $960 CAD (-20%)
                # Early bird deadline: 2 months before event
                from datetime import timedelta
                existing_city_event.early_bird_deadline = event_data["start_date"] - timedelta(days=60)
                existing_city_event.group_discount_percentage = 10
                existing_city_event.group_minimum = 3
                created_events.append(existing_city_event)
            else:
                # Create new city event
                print(f"   Creating new event: {city.name_en} - {event_data['start_date']}")
                from datetime import timedelta
                city_event = CityEvent(
                    event_id=masterclass_event.id,
                    city_id=city.id,
                    venue_id=venue.id,
                    start_date=event_data["start_date"],
                    end_date=event_data["end_date"],
                    start_time=time(9, 0),
                    end_time=time(17, 0),
                    total_capacity=event_data["capacity"],
                    available_spots=event_data["capacity"],
                    status=EventStatus.PUBLISHED,
                    early_bird_deadline=event_data["start_date"] - timedelta(days=60),
                    early_bird_price=960.00,  # $960 CAD (-20%)
                    regular_price=1200.00,  # $1,200 CAD
                    group_discount_percentage=10,
                    group_minimum=3
                )
                session.add(city_event)
                await session.flush()
                created_events.append(city_event)
        
        await session.commit()
        
        print("\n" + "=" * 70)
        print("✅ Canadian Tour Events 2026 created successfully!")
        print("=" * 70)
        print(f"\nSummary:")
        print(f"  - Masterclass Event: {masterclass_event.title_en}")
        print(f"  - City Events Created/Updated: {len(created_events)}")
        print(f"\nEvents:")
        for event in created_events:
            await session.refresh(event, ["city", "venue"])
            print(f"  - {event.city.name_en}: {event.start_date} to {event.end_date}")
            print(f"    Venue: {event.venue.name}")
            print(f"    Capacity: {event.total_capacity} places")
            print(f"    Status: {event.status.value}")
            print()

    await engine.dispose()


if __name__ == "__main__":
    asyncio.run(create_canadian_tour_events())
