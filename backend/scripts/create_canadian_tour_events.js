/**
 * Create Canadian Tour Events 2026
 * Create the 4 city events for Russ Harris Masterclass Canadian Tour 2026
 * 
 * Usage: node scripts/create_canadian_tour_events.js
 * 
 * Requires:
 * - DATABASE_URL environment variable
 * - Or API_URL and API_KEY for API-based creation
 */

const { Pool } = require('pg');
require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });

const DATABASE_URL = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL not set. Please set it in .env file or as environment variable.');
  process.exit(1);
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: DATABASE_URL.includes('localhost') ? false : { rejectUnauthorized: false }
});

async function createCanadianTourEvents() {
  const client = await pool.connect();
  
  try {
    console.log('='.repeat(70));
    console.log('Creating Canadian Tour Events 2026 - Russ Harris Masterclass');
    console.log('='.repeat(70));

    await client.query('BEGIN');

    // 1. Get or create Masterclass Event
    console.log('\n1. Checking Masterclass Event...');
    let masterclassEventResult = await client.query(
      'SELECT id FROM masterclass_events LIMIT 1'
    );
    
    let masterclassEventId;
    if (masterclassEventResult.rows.length === 0) {
      console.log('   Creating new Masterclass Event...');
      const insertResult = await client.query(`
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
        RETURNING id
      `);
      masterclassEventId = insertResult.rows[0].id;
      console.log(`   ✅ Created: ACT Masterclass with Russ Harris (ID: ${masterclassEventId})`);
    } else {
      masterclassEventId = masterclassEventResult.rows[0].id;
      console.log(`   ✅ Using existing: Masterclass Event (ID: ${masterclassEventId})`);
    }

    // 2. Define events data
    const eventsData = [
      {
        cityNameEn: 'Montréal',
        cityNameFr: 'Montréal',
        province: 'Quebec',
        timezone: 'America/Montreal',
        venueName: 'Palais des Congrès',
        venueAddress: '201 Av. Viger O, Montréal, QC H2Z 1X7',
        startDate: '2026-05-24',
        endDate: '2026-05-25',
        capacity: 200,
      },
      {
        cityNameEn: 'Calgary',
        cityNameFr: 'Calgary',
        province: 'Alberta',
        timezone: 'America/Edmonton',
        venueName: 'Calgary Convention Centre',
        venueAddress: '136 8 Ave SE, Calgary, AB T2G 0K6',
        startDate: '2026-05-31',
        endDate: '2026-06-01',
        capacity: 200,
      },
      {
        cityNameEn: 'Vancouver',
        cityNameFr: 'Vancouver',
        province: 'British Columbia',
        timezone: 'America/Vancouver',
        venueName: 'Vancouver Convention Centre',
        venueAddress: '1055 Canada Pl, Vancouver, BC V6C 0C3',
        startDate: '2026-06-07',
        endDate: '2026-06-08',
        capacity: 200,
      },
      {
        cityNameEn: 'Toronto',
        cityNameFr: 'Toronto',
        province: 'Ontario',
        timezone: 'America/Toronto',
        venueName: 'Metro Toronto Convention Centre',
        venueAddress: '255 Front St W, Toronto, ON M5V 2W6',
        startDate: '2026-06-14',
        endDate: '2026-06-15',
        capacity: 200,
      },
    ];

    console.log('\n2. Creating/Updating Cities, Venues, and Events...');
    const createdEvents = [];

    for (const eventData of eventsData) {
      // Get or create city
      let cityResult = await client.query(
        'SELECT id FROM cities WHERE name_en = $1',
        [eventData.cityNameEn]
      );
      
      let cityId;
      if (cityResult.rows.length === 0) {
        console.log(`   Creating city: ${eventData.cityNameEn}`);
        const insertResult = await client.query(`
          INSERT INTO cities (name_en, name_fr, province, country, timezone, created_at)
          VALUES ($1, $2, $3, 'Canada', $4, NOW())
          RETURNING id
        `, [eventData.cityNameEn, eventData.cityNameFr, eventData.province, eventData.timezone]);
        cityId = insertResult.rows[0].id;
      } else {
        cityId = cityResult.rows[0].id;
        console.log(`   Using existing city: ${eventData.cityNameEn} (ID: ${cityId})`);
      }

      // Get or create venue
      let venueResult = await client.query(
        'SELECT id, capacity FROM venues WHERE city_id = $1 AND name = $2',
        [cityId, eventData.venueName]
      );
      
      let venueId;
      if (venueResult.rows.length === 0) {
        console.log(`   Creating venue: ${eventData.venueName}`);
        const insertResult = await client.query(`
          INSERT INTO venues (city_id, name, address, capacity, amenities, created_at)
          VALUES ($1, $2, $3, $4, $5::jsonb, NOW())
          RETURNING id
        `, [
          cityId,
          eventData.venueName,
          eventData.venueAddress,
          eventData.capacity,
          JSON.stringify({ wifi: true, parking: true, restaurant: true, accessibility: true })
        ]);
        venueId = insertResult.rows[0].id;
      } else {
        venueId = venueResult.rows[0].id;
        if (venueResult.rows[0].capacity !== eventData.capacity) {
          await client.query(
            'UPDATE venues SET capacity = $1 WHERE id = $2',
            [eventData.capacity, venueId]
          );
          console.log(`   Updated venue capacity: ${eventData.venueName} -> ${eventData.capacity}`);
        } else {
          console.log(`   Using existing venue: ${eventData.venueName} (ID: ${venueId})`);
        }
      }

      // Check if city event already exists
      let cityEventResult = await client.query(
        'SELECT id FROM city_events WHERE city_id = $1 AND start_date = $2',
        [cityId, eventData.startDate]
      );
      
      const earlyBirdDeadline = new Date(eventData.startDate);
      earlyBirdDeadline.setDate(earlyBirdDeadline.getDate() - 60);
      const earlyBirdDeadlineStr = earlyBirdDeadline.toISOString().split('T')[0];

      if (cityEventResult.rows.length === 0) {
        // Create new city event
        console.log(`   Creating new event: ${eventData.cityNameEn} - ${eventData.startDate}`);
        const insertResult = await client.query(`
          INSERT INTO city_events (
            event_id, city_id, venue_id, start_date, end_date, start_time, end_time,
            total_capacity, available_spots, status, early_bird_deadline, early_bird_price,
            regular_price, group_discount_percentage, group_minimum, created_at, updated_at
          )
          VALUES ($1, $2, $3, $4, $5, '09:00:00', '17:00:00', $6, $6, 'published', $7, 960.00, 1200.00, 10, 3, NOW(), NOW())
          RETURNING id
        `, [
          masterclassEventId,
          cityId,
          venueId,
          eventData.startDate,
          eventData.endDate,
          eventData.capacity,
          earlyBirdDeadlineStr
        ]);
        createdEvents.push({
          id: insertResult.rows[0].id,
          city: eventData.cityNameEn,
          date: eventData.startDate,
          venue: eventData.venueName,
          capacity: eventData.capacity
        });
      } else {
        // Update existing event
        console.log(`   Updating existing event: ${eventData.cityNameEn} - ${eventData.startDate}`);
        await client.query(`
          UPDATE city_events
          SET
            event_id = $1,
            venue_id = $2,
            start_date = $3,
            end_date = $4,
            total_capacity = $5,
            available_spots = $5,
            status = 'published',
            early_bird_deadline = $6,
            early_bird_price = 960.00,
            regular_price = 1200.00,
            group_discount_percentage = 10,
            group_minimum = 3,
            updated_at = NOW()
          WHERE id = $7
        `, [
          masterclassEventId,
          venueId,
          eventData.startDate,
          eventData.endDate,
          eventData.capacity,
          earlyBirdDeadlineStr,
          cityEventResult.rows[0].id
        ]);
        createdEvents.push({
          id: cityEventResult.rows[0].id,
          city: eventData.cityNameEn,
          date: eventData.startDate,
          venue: eventData.venueName,
          capacity: eventData.capacity
        });
      }
    }

    await client.query('COMMIT');

    console.log('\n' + '='.repeat(70));
    console.log('✅ Canadian Tour Events 2026 created successfully!');
    console.log('='.repeat(70));
    console.log(`\nSummary:`);
    console.log(`  - Masterclass Event ID: ${masterclassEventId}`);
    console.log(`  - City Events Created/Updated: ${createdEvents.length}`);
    console.log(`\nEvents:`);
    for (const event of createdEvents) {
      console.log(`  - ${event.city}: ${event.date}`);
      console.log(`    Venue: ${event.venue}`);
      console.log(`    Capacity: ${event.capacity} places`);
      console.log();
    }

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Error creating events:', error);
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run the script
createCanadianTourEvents()
  .then(() => {
    console.log('\n✅ Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });
