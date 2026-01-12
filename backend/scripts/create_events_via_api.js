/**
 * Create Canadian Tour Events 2026 via API
 * This script uses the backend API to create the events
 * 
 * Usage: node scripts/create_events_via_api.js
 * 
 * Requires:
 * - Backend API running
 * - API_KEY or admin credentials
 */

const https = require('https');
const http = require('http');

// Configuration
const API_URL = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const API_KEY = process.env.API_KEY || process.env.ADMIN_API_KEY;

// Events data
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

function makeRequest(url, options, data) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const isHttps = urlObj.protocol === 'https:';
    const client = isHttps ? https : http;
    
    const requestOptions = {
      hostname: urlObj.hostname,
      port: urlObj.port || (isHttps ? 443 : 80),
      path: urlObj.pathname + urlObj.search,
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    const req = client.request(requestOptions, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        try {
          const parsed = body ? JSON.parse(body) : {};
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${parsed.detail || body}`));
          }
        } catch (e) {
          reject(new Error(`Parse error: ${e.message}`));
        }
      });
    });

    req.on('error', reject);
    
    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

async function createEvents() {
  console.log('='.repeat(70));
  console.log('Creating Canadian Tour Events 2026 via API');
  console.log('='.repeat(70));
  console.log(`API URL: ${API_URL}\n`);

  if (!API_KEY) {
    console.error('❌ API_KEY not set. Please set API_KEY environment variable.');
    console.error('   This script requires admin API key to create events.');
    process.exit(1);
  }

  try {
    // 1. Get or create Masterclass Event
    console.log('1. Getting/Creating Masterclass Event...');
    let events = await makeRequest(`${API_URL}/api/v1/masterclass/events`, {
      method: 'GET',
      headers: { 'X-API-Key': API_KEY },
    });
    
    let masterclassEventId;
    if (Array.isArray(events) && events.length > 0) {
      masterclassEventId = events[0].id;
      console.log(`   ✅ Using existing event: ${events[0].title_en} (ID: ${masterclassEventId})`);
    } else {
      // Create new event
      const newEvent = await makeRequest(`${API_URL}/api/v1/masterclass/events`, {
        method: 'POST',
        headers: { 'X-API-Key': API_KEY },
      }, {
        title_en: 'ACT Masterclass with Russ Harris',
        title_fr: 'Masterclass ACT avec Russ Harris',
        description_en: 'An intensive 2-day masterclass on Acceptance and Commitment Therapy with Dr. Russ Harris.',
        description_fr: 'Masterclass intensive de 2 jours sur la Thérapie d\'Acceptation et d\'Engagement avec Dr. Russ Harris.',
        duration_days: 2,
        language: 'English',
      });
      masterclassEventId = newEvent.id;
      console.log(`   ✅ Created new event: ${newEvent.title_en} (ID: ${masterclassEventId})`);
    }

    // 2. Create cities, venues, and events
    console.log('\n2. Creating Cities, Venues, and Events...');
    const createdEvents = [];

    for (const eventData of eventsData) {
      console.log(`\n   Processing ${eventData.cityNameEn}...`);
      
      // Get or create city
      let cities = await makeRequest(`${API_URL}/api/v1/masterclass/cities/all`, {
        method: 'GET',
        headers: { 'X-API-Key': API_KEY },
      });
      
      let city = cities.find(c => c.name_en === eventData.cityNameEn);
      let cityId;
      
      if (!city) {
        console.log(`     Creating city: ${eventData.cityNameEn}`);
        city = await makeRequest(`${API_URL}/api/v1/masterclass/cities`, {
          method: 'POST',
          headers: { 'X-API-Key': API_KEY },
        }, {
          name_en: eventData.cityNameEn,
          name_fr: eventData.cityNameFr,
          province: eventData.province,
          country: 'Canada',
          timezone: eventData.timezone,
        });
        cityId = city.id;
      } else {
        cityId = city.id;
        console.log(`     Using existing city: ${eventData.cityNameEn} (ID: ${cityId})`);
      }

      // Get or create venue
      let venues = await makeRequest(`${API_URL}/api/v1/masterclass/venues?city_id=${cityId}`, {
        method: 'GET',
        headers: { 'X-API-Key': API_KEY },
      });
      
      let venue = venues.find(v => v.name === eventData.venueName);
      let venueId;
      
      if (!venue) {
        console.log(`     Creating venue: ${eventData.venueName}`);
        venue = await makeRequest(`${API_URL}/api/v1/masterclass/venues`, {
          method: 'POST',
          headers: { 'X-API-Key': API_KEY },
        }, {
          city_id: cityId,
          name: eventData.venueName,
          address: eventData.venueAddress,
          capacity: eventData.capacity,
          amenities: { wifi: true, parking: true, restaurant: true, accessibility: true },
        });
        venueId = venue.id;
      } else {
        venueId = venue.id;
        if (venue.capacity !== eventData.capacity) {
          await makeRequest(`${API_URL}/api/v1/masterclass/venues/${venueId}`, {
            method: 'PUT',
            headers: { 'X-API-Key': API_KEY },
          }, { capacity: eventData.capacity });
          console.log(`     Updated venue capacity: ${eventData.venueName} -> ${eventData.capacity}`);
        } else {
          console.log(`     Using existing venue: ${eventData.venueName} (ID: ${venueId})`);
        }
      }

      // Calculate early bird deadline (60 days before)
      const startDate = new Date(eventData.startDate);
      const earlyBirdDeadline = new Date(startDate);
      earlyBirdDeadline.setDate(earlyBirdDeadline.getDate() - 60);
      const earlyBirdDeadlineStr = earlyBirdDeadline.toISOString().split('T')[0];

      // Create city event
      console.log(`     Creating event: ${eventData.startDate}`);
      const cityEvent = await makeRequest(`${API_URL}/api/v1/masterclass/city-events`, {
        method: 'POST',
        headers: { 'X-API-Key': API_KEY },
      }, {
        event_id: masterclassEventId,
        city_id: cityId,
        venue_id: venueId,
        start_date: eventData.startDate,
        end_date: eventData.endDate,
        start_time: '09:00:00',
        end_time: '17:00:00',
        total_capacity: eventData.capacity,
        available_spots: eventData.capacity,
        status: 'published',
        early_bird_deadline: earlyBirdDeadlineStr,
        early_bird_price: 960.00,
        regular_price: 1200.00,
        group_discount_percentage: 10,
        group_minimum: 3,
      });
      
      createdEvents.push({
        city: eventData.cityNameEn,
        date: eventData.startDate,
        venue: eventData.venueName,
        capacity: eventData.capacity,
        id: cityEvent.id,
      });
      console.log(`     ✅ Created event (ID: ${cityEvent.id})`);
    }

    console.log('\n' + '='.repeat(70));
    console.log('✅ All events created successfully!');
    console.log('='.repeat(70));
    console.log(`\nSummary:`);
    console.log(`  - Masterclass Event ID: ${masterclassEventId}`);
    console.log(`  - City Events Created: ${createdEvents.length}`);
    console.log(`\nEvents:`);
    for (const event of createdEvents) {
      console.log(`  - ${event.city}: ${event.date}`);
      console.log(`    Venue: ${event.venue}`);
      console.log(`    Capacity: ${event.capacity} places`);
      console.log();
    }

  } catch (error) {
    console.error('\n❌ Error creating events:', error.message);
    if (error.stack) {
      console.error(error.stack);
    }
    process.exit(1);
  }
}

// Run the script
createEvents()
  .then(() => {
    console.log('\n✅ Script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Script failed:', error);
    process.exit(1);
  });
