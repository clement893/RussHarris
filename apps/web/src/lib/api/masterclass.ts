/**
 * Masterclass API Client
 * 
 * Client for fetching masterclass events, cities, and availability data
 */

import { apiClient, extractApiData } from '@/lib/api';

export interface MasterclassEvent {
  id: number;
  title: string;
  description?: string;
  start_date: string;
  end_date: string;
  price: number;
  currency: string;
  max_attendees: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface City {
  id: number;
  name_en: string;
  name_fr: string;
  name?: string;  // Alias for compatibility (will map to name_fr or name_en)
  country: string;
  province?: string;
  timezone?: string;
}

export interface Venue {
  id: number;
  name: string;
  address: string;
  city_id: number;
  capacity?: number;
  amenities?: string[];
}

export interface CityEvent {
  id: number;
  event_id: number;
  city_id: number;
  venue_id: number;
  start_date: string;  // Primary date field
  end_date: string;
  event_date?: string;  // Optional alias for start_date (for compatibility)
  start_time: string;
  end_time: string;
  total_capacity?: number;
  available_spots?: number;
  max_attendees?: number;  // Alias for total_capacity
  current_attendees?: number;  // Calculated: total_capacity - available_spots
  is_active?: boolean;  // status == PUBLISHED
  status?: string;  // draft, published, sold_out, cancelled
  price?: number;  // Alias for regular_price
  currency?: string;
  regular_price?: number;
  early_bird_price?: number;
  early_bird_deadline?: string;
  group_discount_percentage?: number;
  group_minimum?: number;
  event?: MasterclassEvent;
  city?: City;
  venue?: Venue;
}

export interface Availability {
  total_spots: number;
  available_spots: number;
  booked_spots: number;
  is_available: boolean;
  percentage_available: number;
}

export interface CityWithEvents {
  id: number;
  name_en: string;
  name_fr: string;
  name?: string;  // Alias
  country: string;
  province?: string;
  timezone?: string;
  events?: CityEvent[];
  city_events?: CityEvent[];  // Alias from backend
}

/**
 * Masterclass API client
 */
export const masterclassAPI = {
  /**
   * Get list of all masterclass events
   */
  listEvents: async (): Promise<MasterclassEvent[]> => {
    const response = await apiClient.get<MasterclassEvent[]>('/v1/masterclass/events');
    const data = extractApiData<MasterclassEvent[]>(response);
    return Array.isArray(data) ? data : [];
  },

  /**
   * Get a specific event by ID
   */
  getEvent: async (eventId: number): Promise<MasterclassEvent> => {
    const response = await apiClient.get<MasterclassEvent>(`/v1/masterclass/events/${eventId}`);
    const data = extractApiData<MasterclassEvent>(response);
    if (!data) {
      throw new Error(`Event not found: ${eventId}`);
    }
    return data;
  },

  /**
   * Get list of cities with their events
   */
  listCitiesWithEvents: async (): Promise<CityWithEvents[]> => {
    const response = await apiClient.get<{cities: CityWithEvents[], total: number}>('/v1/masterclass/cities');
    const result = extractApiData<{cities: CityWithEvents[], total: number}>(response);
    if (!result || !result.cities) {
      return [];
    }
    // Map city_events to events for frontend compatibility
    return result.cities.map(city => ({
      ...city,
      name: city.name_fr || city.name_en,
      events: city.city_events || city.events || [],
    }));
  },

  /**
   * Get events for a specific city
   */
  listCityEvents: async (cityId: number): Promise<CityEvent[]> => {
    const response = await apiClient.get<{city_events: CityEvent[], total: number}>(`/v1/masterclass/cities/${cityId}/events`);
    const result = extractApiData<{city_events: CityEvent[], total: number}>(response);
    if (!result || !result.city_events) {
      return [];
    }
    // Map fields for frontend compatibility
    return result.city_events.map(event => ({
      ...event,
      event_date: event.start_date,
      max_attendees: event.total_capacity,
      current_attendees: (event.total_capacity || 0) - (event.available_spots || 0),
      is_active: event.status === 'published',
      price: event.regular_price,
    }));
  },

  /**
   * Get a specific city event by ID
   */
  getCityEvent: async (cityEventId: number): Promise<CityEvent> => {
    const response = await apiClient.get<CityEvent>(`/v1/masterclass/city-events/${cityEventId}`);
    const data = extractApiData<CityEvent>(response);
    if (!data) {
      throw new Error(`City event not found: ${cityEventId}`);
    }
    // Map fields for frontend compatibility
    return {
      ...data,
      event_date: data.start_date,
      max_attendees: data.total_capacity,
      current_attendees: (data.total_capacity || 0) - (data.available_spots || 0),
      is_active: data.status === 'published',
      price: data.regular_price,
      currency: data.currency || 'EUR',
    };
  },

  /**
   * Get availability for a city event
   */
  getAvailability: async (cityEventId: number): Promise<Availability> => {
    const response = await apiClient.get<Availability>(`/v1/masterclass/city-events/${cityEventId}/availability`);
    const data = extractApiData<Availability>(response);
    if (!data) {
      throw new Error(`Availability not found for city event: ${cityEventId}`);
    }
    return data;
  },
};
