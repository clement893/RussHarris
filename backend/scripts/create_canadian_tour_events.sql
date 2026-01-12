-- Create Canadian Tour Events 2026
-- Create the 4 city events for Russ Harris Masterclass Canadian Tour 2026
-- 
-- Usage: psql $DATABASE_URL -f scripts/create_canadian_tour_events.sql
-- Or: psql -U user -d database -f scripts/create_canadian_tour_events.sql

BEGIN;

-- 1. Get or create Masterclass Event
DO $$
DECLARE
    masterclass_event_id INTEGER;
BEGIN
    -- Check if masterclass event exists
    SELECT id INTO masterclass_event_id FROM masterclass_events LIMIT 1;
    
    IF masterclass_event_id IS NULL THEN
        -- Create new masterclass event
        INSERT INTO masterclass_events (title_en, title_fr, description_en, description_fr, duration_days, language, created_at, updated_at)
        VALUES (
            'ACT Masterclass with Russ Harris',
            'Masterclass ACT avec Russ Harris',
            'An intensive 2-day masterclass on Acceptance and Commitment Therapy with Dr. Russ Harris. Master psychological flexibility and integrate mindfulness, values, and committed action into your clinical practice.',
            'Masterclass intensive de 2 jours sur la Thérapie d''Acceptation et d''Engagement avec Dr. Russ Harris. Maîtrisez la flexibilité psychologique et intégrez la pleine conscience, les valeurs et l''action engagée dans votre pratique clinique.',
            2,
            'English',
            NOW(),
            NOW()
        )
        RETURNING id INTO masterclass_event_id;
        
        RAISE NOTICE 'Created new Masterclass Event (ID: %)', masterclass_event_id;
    ELSE
        RAISE NOTICE 'Using existing Masterclass Event (ID: %)', masterclass_event_id;
    END IF;
    
    -- Store in a temporary table for use in next steps
    CREATE TEMP TABLE IF NOT EXISTS temp_masterclass_event (id INTEGER);
    DELETE FROM temp_masterclass_event;
    INSERT INTO temp_masterclass_event VALUES (masterclass_event_id);
END $$;

-- 2. Create/Update Cities, Venues, and Events
DO $$
DECLARE
    masterclass_event_id INTEGER;
    city_id INTEGER;
    venue_id INTEGER;
    city_event_id INTEGER;
    early_bird_deadline DATE;
BEGIN
    -- Get masterclass event ID
    SELECT id INTO masterclass_event_id FROM temp_masterclass_event LIMIT 1;
    
    -- MONTRÉAL
    RAISE NOTICE 'Processing Montréal...';
    
    -- Get or create city
    SELECT id INTO city_id FROM cities WHERE name_en = 'Montréal';
    IF city_id IS NULL THEN
        INSERT INTO cities (name_en, name_fr, province, country, timezone, created_at)
        VALUES ('Montréal', 'Montréal', 'Quebec', 'Canada', 'America/Montreal', NOW())
        RETURNING id INTO city_id;
        RAISE NOTICE 'Created city: Montréal (ID: %)', city_id;
    ELSE
        RAISE NOTICE 'Using existing city: Montréal (ID: %)', city_id;
    END IF;
    
    -- Get or create venue
    SELECT id INTO venue_id FROM venues WHERE venues.city_id = city_id AND venues.name = 'Palais des Congrès';
    IF venue_id IS NULL THEN
        INSERT INTO venues (city_id, name, address, capacity, amenities, created_at)
        VALUES (city_id, 'Palais des Congrès', '201 Av. Viger O, Montréal, QC H2Z 1X7', 200, '{"wifi": true, "parking": true, "restaurant": true, "accessibility": true}'::jsonb, NOW())
        RETURNING id INTO venue_id;
        RAISE NOTICE 'Created venue: Palais des Congrès (ID: %)', venue_id;
    ELSE
        UPDATE venues SET capacity = 200 WHERE id = venue_id;
        RAISE NOTICE 'Using existing venue: Palais des Congrès (ID: %)', venue_id;
    END IF;
    
    -- Create or update city event
    early_bird_deadline := '2026-05-24'::DATE - INTERVAL '60 days';
    SELECT id INTO city_event_id FROM city_events WHERE city_id = city_id AND start_date = '2026-05-24'::DATE;
    IF city_event_id IS NULL THEN
        INSERT INTO city_events (
            event_id, city_id, venue_id, start_date, end_date, start_time, end_time,
            total_capacity, available_spots, status, early_bird_deadline, early_bird_price,
            regular_price, group_discount_percentage, group_minimum, created_at, updated_at
        )
        VALUES (
            masterclass_event_id, city_id, venue_id, '2026-05-24'::DATE, '2026-05-25'::DATE,
            '09:00:00'::TIME, '17:00:00'::TIME, 200, 200, 'published', early_bird_deadline,
            960.00, 1200.00, 10, 3, NOW(), NOW()
        )
        RETURNING id INTO city_event_id;
        RAISE NOTICE 'Created event: Montréal - 2026-05-24 (ID: %)', city_event_id;
    ELSE
        UPDATE city_events
        SET event_id = masterclass_event_id, venue_id = venue_id, start_date = '2026-05-24'::DATE,
            end_date = '2026-05-25'::DATE, total_capacity = 200, available_spots = 200,
            status = 'published', early_bird_deadline = early_bird_deadline,
            early_bird_price = 960.00, regular_price = 1200.00, updated_at = NOW()
        WHERE id = city_event_id;
        RAISE NOTICE 'Updated event: Montréal - 2026-05-24 (ID: %)', city_event_id;
    END IF;
    
    -- CALGARY
    RAISE NOTICE 'Processing Calgary...';
    
    SELECT id INTO city_id FROM cities WHERE name_en = 'Calgary';
    IF city_id IS NULL THEN
        INSERT INTO cities (name_en, name_fr, province, country, timezone, created_at)
        VALUES ('Calgary', 'Calgary', 'Alberta', 'Canada', 'America/Edmonton', NOW())
        RETURNING id INTO city_id;
        RAISE NOTICE 'Created city: Calgary (ID: %)', city_id;
    ELSE
        RAISE NOTICE 'Using existing city: Calgary (ID: %)', city_id;
    END IF;
    
    SELECT id INTO venue_id FROM venues WHERE venues.city_id = city_id AND venues.name = 'Calgary Convention Centre';
    IF venue_id IS NULL THEN
        INSERT INTO venues (city_id, name, address, capacity, amenities, created_at)
        VALUES (city_id, 'Calgary Convention Centre', '136 8 Ave SE, Calgary, AB T2G 0K6', 200, '{"wifi": true, "parking": true, "restaurant": true, "accessibility": true}'::jsonb, NOW())
        RETURNING id INTO venue_id;
        RAISE NOTICE 'Created venue: Calgary Convention Centre (ID: %)', venue_id;
    ELSE
        UPDATE venues SET capacity = 200 WHERE id = venue_id;
        RAISE NOTICE 'Using existing venue: Calgary Convention Centre (ID: %)', venue_id;
    END IF;
    
    early_bird_deadline := '2026-05-31'::DATE - INTERVAL '60 days';
    SELECT id INTO city_event_id FROM city_events WHERE city_id = city_id AND start_date = '2026-05-31'::DATE;
    IF city_event_id IS NULL THEN
        INSERT INTO city_events (
            event_id, city_id, venue_id, start_date, end_date, start_time, end_time,
            total_capacity, available_spots, status, early_bird_deadline, early_bird_price,
            regular_price, group_discount_percentage, group_minimum, created_at, updated_at
        )
        VALUES (
            masterclass_event_id, city_id, venue_id, '2026-05-31'::DATE, '2026-06-01'::DATE,
            '09:00:00'::TIME, '17:00:00'::TIME, 200, 200, 'published', early_bird_deadline,
            960.00, 1200.00, 10, 3, NOW(), NOW()
        )
        RETURNING id INTO city_event_id;
        RAISE NOTICE 'Created event: Calgary - 2026-05-31 (ID: %)', city_event_id;
    ELSE
        UPDATE city_events
        SET event_id = masterclass_event_id, venue_id = venue_id, start_date = '2026-05-31'::DATE,
            end_date = '2026-06-01'::DATE, total_capacity = 200, available_spots = 200,
            status = 'published', early_bird_deadline = early_bird_deadline,
            early_bird_price = 960.00, regular_price = 1200.00, updated_at = NOW()
        WHERE id = city_event_id;
        RAISE NOTICE 'Updated event: Calgary - 2026-05-31 (ID: %)', city_event_id;
    END IF;
    
    -- VANCOUVER
    RAISE NOTICE 'Processing Vancouver...';
    
    SELECT id INTO city_id FROM cities WHERE name_en = 'Vancouver';
    IF city_id IS NULL THEN
        INSERT INTO cities (name_en, name_fr, province, country, timezone, created_at)
        VALUES ('Vancouver', 'Vancouver', 'British Columbia', 'Canada', 'America/Vancouver', NOW())
        RETURNING id INTO city_id;
        RAISE NOTICE 'Created city: Vancouver (ID: %)', city_id;
    ELSE
        RAISE NOTICE 'Using existing city: Vancouver (ID: %)', city_id;
    END IF;
    
    SELECT id INTO venue_id FROM venues WHERE venues.city_id = city_id AND venues.name = 'Vancouver Convention Centre';
    IF venue_id IS NULL THEN
        INSERT INTO venues (city_id, name, address, capacity, amenities, created_at)
        VALUES (city_id, 'Vancouver Convention Centre', '1055 Canada Pl, Vancouver, BC V6C 0C3', 200, '{"wifi": true, "parking": true, "restaurant": true, "accessibility": true}'::jsonb, NOW())
        RETURNING id INTO venue_id;
        RAISE NOTICE 'Created venue: Vancouver Convention Centre (ID: %)', venue_id;
    ELSE
        UPDATE venues SET capacity = 200 WHERE id = venue_id;
        RAISE NOTICE 'Using existing venue: Vancouver Convention Centre (ID: %)', venue_id;
    END IF;
    
    early_bird_deadline := '2026-06-07'::DATE - INTERVAL '60 days';
    SELECT id INTO city_event_id FROM city_events WHERE city_id = city_id AND start_date = '2026-06-07'::DATE;
    IF city_event_id IS NULL THEN
        INSERT INTO city_events (
            event_id, city_id, venue_id, start_date, end_date, start_time, end_time,
            total_capacity, available_spots, status, early_bird_deadline, early_bird_price,
            regular_price, group_discount_percentage, group_minimum, created_at, updated_at
        )
        VALUES (
            masterclass_event_id, city_id, venue_id, '2026-06-07'::DATE, '2026-06-08'::DATE,
            '09:00:00'::TIME, '17:00:00'::TIME, 200, 200, 'published', early_bird_deadline,
            960.00, 1200.00, 10, 3, NOW(), NOW()
        )
        RETURNING id INTO city_event_id;
        RAISE NOTICE 'Created event: Vancouver - 2026-06-07 (ID: %)', city_event_id;
    ELSE
        UPDATE city_events
        SET event_id = masterclass_event_id, venue_id = venue_id, start_date = '2026-06-07'::DATE,
            end_date = '2026-06-08'::DATE, total_capacity = 200, available_spots = 200,
            status = 'published', early_bird_deadline = early_bird_deadline,
            early_bird_price = 960.00, regular_price = 1200.00, updated_at = NOW()
        WHERE id = city_event_id;
        RAISE NOTICE 'Updated event: Vancouver - 2026-06-07 (ID: %)', city_event_id;
    END IF;
    
    -- TORONTO
    RAISE NOTICE 'Processing Toronto...';
    
    SELECT id INTO city_id FROM cities WHERE name_en = 'Toronto';
    IF city_id IS NULL THEN
        INSERT INTO cities (name_en, name_fr, province, country, timezone, created_at)
        VALUES ('Toronto', 'Toronto', 'Ontario', 'Canada', 'America/Toronto', NOW())
        RETURNING id INTO city_id;
        RAISE NOTICE 'Created city: Toronto (ID: %)', city_id;
    ELSE
        RAISE NOTICE 'Using existing city: Toronto (ID: %)', city_id;
    END IF;
    
    SELECT id INTO venue_id FROM venues WHERE venues.city_id = city_id AND venues.name = 'Metro Toronto Convention Centre';
    IF venue_id IS NULL THEN
        INSERT INTO venues (city_id, name, address, capacity, amenities, created_at)
        VALUES (city_id, 'Metro Toronto Convention Centre', '255 Front St W, Toronto, ON M5V 2W6', 200, '{"wifi": true, "parking": true, "restaurant": true, "accessibility": true}'::jsonb, NOW())
        RETURNING id INTO venue_id;
        RAISE NOTICE 'Created venue: Metro Toronto Convention Centre (ID: %)', venue_id;
    ELSE
        UPDATE venues SET capacity = 200 WHERE id = venue_id;
        RAISE NOTICE 'Using existing venue: Metro Toronto Convention Centre (ID: %)', venue_id;
    END IF;
    
    early_bird_deadline := '2026-06-14'::DATE - INTERVAL '60 days';
    SELECT id INTO city_event_id FROM city_events WHERE city_id = city_id AND start_date = '2026-06-14'::DATE;
    IF city_event_id IS NULL THEN
        INSERT INTO city_events (
            event_id, city_id, venue_id, start_date, end_date, start_time, end_time,
            total_capacity, available_spots, status, early_bird_deadline, early_bird_price,
            regular_price, group_discount_percentage, group_minimum, created_at, updated_at
        )
        VALUES (
            masterclass_event_id, city_id, venue_id, '2026-06-14'::DATE, '2026-06-15'::DATE,
            '09:00:00'::TIME, '17:00:00'::TIME, 200, 200, 'published', early_bird_deadline,
            960.00, 1200.00, 10, 3, NOW(), NOW()
        )
        RETURNING id INTO city_event_id;
        RAISE NOTICE 'Created event: Toronto - 2026-06-14 (ID: %)', city_event_id;
    ELSE
        UPDATE city_events
        SET event_id = masterclass_event_id, venue_id = venue_id, start_date = '2026-06-14'::DATE,
            end_date = '2026-06-15'::DATE, total_capacity = 200, available_spots = 200,
            status = 'published', early_bird_deadline = early_bird_deadline,
            early_bird_price = 960.00, regular_price = 1200.00, updated_at = NOW()
        WHERE id = city_event_id;
        RAISE NOTICE 'Updated event: Toronto - 2026-06-14 (ID: %)', city_event_id;
    END IF;
    
    RAISE NOTICE '✅ All events created/updated successfully!';
END $$;

-- Cleanup temp table
DROP TABLE IF EXISTS temp_masterclass_event;

COMMIT;

-- Display summary
SELECT 
    c.name_en as city,
    ce.start_date,
    ce.end_date,
    v.name as venue,
    ce.total_capacity as capacity,
    ce.status
FROM city_events ce
JOIN cities c ON ce.city_id = c.id
JOIN venues v ON ce.venue_id = v.id
WHERE ce.start_date >= '2026-05-01'::DATE
ORDER BY ce.start_date;
