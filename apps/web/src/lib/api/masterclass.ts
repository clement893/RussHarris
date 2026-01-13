/**
 * Masterclass API Client
 * 
 * Client for fetching masterclass events, cities, and availability data
 */

import { apiClient, extractApiData } from '@/lib/api';
import type { ApiResponse } from '@modele/types';

export interface MasterclassEvent {
  id: number;
  title_en: string;
  title_fr: string;
  description_en?: string;
  description_fr?: string;
  duration_days: number;
  language: string;
  created_at: string;
  updated_at: string;
  title?: string;  // Alias for compatibility (will map to title_fr or title_en)
  description?: string;  // Alias for compatibility (will map to description_fr or description_en)
}

export interface City {
  id: number;
  name_en: string;
  name_fr: string;
  name?: string;  // Alias for compatibility (will map to name_fr or name_en)
  country: string;
  province?: string;
  timezone?: string;
  image_url?: string;
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
    const data = extractApiData<MasterclassEvent[]>(response as unknown as ApiResponse<MasterclassEvent[]>);
    return Array.isArray(data) ? data : [];
  },

  /**
   * Get a specific event by ID
   */
  getEvent: async (eventId: number): Promise<MasterclassEvent> => {
    const response = await apiClient.get<MasterclassEvent>(`/v1/masterclass/events/${eventId}`);
    const data = extractApiData<MasterclassEvent>(response as unknown as ApiResponse<MasterclassEvent>);
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
    const result = extractApiData<{cities: CityWithEvents[], total: number}>(response as unknown as ApiResponse<{cities: CityWithEvents[], total: number}>);
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
    const result = extractApiData<{city_events: CityEvent[], total: number}>(response as unknown as ApiResponse<{city_events: CityEvent[], total: number}>);
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
    const data = extractApiData<CityEvent>(response as unknown as ApiResponse<CityEvent>);
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
    const data = extractApiData<Availability>(response as unknown as ApiResponse<Availability>);
    if (!data) {
      throw new Error(`Availability not found for city event: ${cityEventId}`);
    }
    return data;
  },

  // ============================================================================
  // Admin endpoints (require admin or superadmin)
  // ============================================================================

  /**
   * Create a new masterclass event (admin only)
   */
  createEvent: async (data: {
    title_en: string;
    title_fr: string;
    description_en?: string;
    description_fr?: string;
    duration_days?: number;
    language?: string;
  }): Promise<MasterclassEvent> => {
    const response = await apiClient.post<MasterclassEvent>('/v1/masterclass/events', data);
    return extractApiData<MasterclassEvent>(response as unknown as ApiResponse<MasterclassEvent>);
  },

  /**
   * Update a masterclass event (admin only)
   */
  updateEvent: async (eventId: number, data: {
    title_en?: string;
    title_fr?: string;
    description_en?: string;
    description_fr?: string;
    duration_days?: number;
    language?: string;
  }): Promise<MasterclassEvent> => {
    const response = await apiClient.put<MasterclassEvent>(`/v1/masterclass/events/${eventId}`, data);
    return extractApiData<MasterclassEvent>(response as unknown as ApiResponse<MasterclassEvent>);
  },

  /**
   * Delete a masterclass event (admin only)
   */
  deleteEvent: async (eventId: number): Promise<void> => {
    await apiClient.delete(`/v1/masterclass/events/${eventId}`);
  },

  /**
   * List all cities (admin only, without filtering)
   */
  listAllCities: async (): Promise<City[]> => {
    const response = await apiClient.get<City[]>('/v1/masterclass/cities/all');
    const data = extractApiData<City[]>(response as unknown as ApiResponse<City[]>);
    return Array.isArray(data) ? data : [];
  },

  /**
   * Create a new city (admin only)
   */
  createCity: async (data: {
    name_en: string;
    name_fr: string;
    province?: string;
    country?: string;
    timezone?: string;
    image_url?: string;
  }): Promise<City> => {
    const response = await apiClient.post<City>('/v1/masterclass/cities', data);
    return extractApiData<City>(response as unknown as ApiResponse<City>);
  },

  /**
   * Update a city (admin only)
   */
  updateCity: async (cityId: number, data: {
    name_en?: string;
    name_fr?: string;
    province?: string;
    country?: string;
    timezone?: string;
    image_url?: string;
  }): Promise<City> => {
    const response = await apiClient.put<City>(`/v1/masterclass/cities/${cityId}`, data);
    return extractApiData<City>(response as unknown as ApiResponse<City>);
  },

  /**
   * Delete a city (admin only)
   */
  deleteCity: async (cityId: number): Promise<void> => {
    await apiClient.delete(`/v1/masterclass/cities/${cityId}`);
  },

  /**
   * List all venues (admin only)
   */
  listVenues: async (cityId?: number): Promise<Venue[]> => {
    const response = await apiClient.get<Venue[]>('/v1/masterclass/venues', {
      params: cityId ? { city_id: cityId } : undefined,
    });
    const data = extractApiData<Venue[]>(response as unknown as ApiResponse<Venue[]>);
    return Array.isArray(data) ? data : [];
  },

  /**
   * Get a venue by ID (admin only)
   */
  getVenue: async (venueId: number): Promise<Venue> => {
    const response = await apiClient.get<Venue>(`/v1/masterclass/venues/${venueId}`);
    const data = extractApiData<Venue>(response as unknown as ApiResponse<Venue>);
    if (!data) {
      throw new Error(`Venue not found: ${venueId}`);
    }
    return data;
  },

  /**
   * Create a new venue (admin only)
   */
  createVenue: async (data: {
    city_id: number;
    name: string;
    address?: string;
    postal_code?: string;
    capacity: number;
    amenities?: any;
  }): Promise<Venue> => {
    const response = await apiClient.post<Venue>('/v1/masterclass/venues', data);
    return extractApiData<Venue>(response as unknown as ApiResponse<Venue>);
  },

  /**
   * Update a venue (admin only)
   */
  updateVenue: async (venueId: number, data: {
    city_id?: number;
    name?: string;
    address?: string;
    postal_code?: string;
    capacity?: number;
    amenities?: any;
  }): Promise<Venue> => {
    const response = await apiClient.put<Venue>(`/v1/masterclass/venues/${venueId}`, data);
    return extractApiData<Venue>(response as unknown as ApiResponse<Venue>);
  },

  /**
   * Delete a venue (admin only)
   */
  deleteVenue: async (venueId: number): Promise<void> => {
    await apiClient.delete(`/v1/masterclass/venues/${venueId}`);
  },

  /**
   * List all city events (admin only, without filtering)
   */
  listAllCityEvents: async (skip = 0, limit = 100, status?: string): Promise<{city_events: CityEvent[], total: number}> => {
    const response = await apiClient.get<{city_events: CityEvent[], total: number}>('/v1/masterclass/city-events/all', {
      params: { skip, limit, status_filter: status },
    });
    const result = extractApiData<{city_events: CityEvent[], total: number}>(response as unknown as ApiResponse<{city_events: CityEvent[], total: number}>);
    if (!result) {
      return { city_events: [], total: 0 };
    }
    // Map fields for frontend compatibility
    return {
      city_events: result.city_events.map(event => ({
        ...event,
        event_date: event.start_date,
        max_attendees: event.total_capacity,
        current_attendees: (event.total_capacity || 0) - (event.available_spots || 0),
        is_active: event.status === 'published',
        price: event.regular_price,
        currency: event.currency || 'EUR',
      })),
      total: result.total,
    };
  },

  /**
   * Create a new city event (admin only)
   */
  createCityEvent: async (data: {
    event_id: number;
    city_id: number;
    venue_id: number;
    start_date: string;
    end_date: string;
    start_time?: string;
    end_time?: string;
    total_capacity: number;
    available_spots: number;
    status?: string;
    early_bird_deadline?: string;
    early_bird_price?: number;
    regular_price: number;
    group_discount_percentage?: number;
    group_minimum?: number;
  }): Promise<CityEvent> => {
    const response = await apiClient.post<CityEvent>('/v1/masterclass/city-events', data);
    const event = extractApiData<CityEvent>(response as unknown as ApiResponse<CityEvent>);
    // Map fields for frontend compatibility
    return {
      ...event,
      event_date: event.start_date,
      max_attendees: event.total_capacity,
      current_attendees: (event.total_capacity || 0) - (event.available_spots || 0),
      is_active: event.status === 'published',
      price: event.regular_price,
      currency: event.currency || 'EUR',
    };
  },

  /**
   * Update a city event (admin only)
   */
  updateCityEvent: async (cityEventId: number, data: {
    event_id?: number;
    city_id?: number;
    venue_id?: number;
    start_date?: string;
    end_date?: string;
    start_time?: string;
    end_time?: string;
    total_capacity?: number;
    available_spots?: number;
    status?: string;
    early_bird_deadline?: string;
    early_bird_price?: number;
    regular_price?: number;
    group_discount_percentage?: number;
    group_minimum?: number;
  }): Promise<CityEvent> => {
    const response = await apiClient.put<CityEvent>(`/v1/masterclass/city-events/${cityEventId}`, data);
    const event = extractApiData<CityEvent>(response as unknown as ApiResponse<CityEvent>);
    // Map fields for frontend compatibility
    return {
      ...event,
      event_date: event.start_date,
      max_attendees: event.total_capacity,
      current_attendees: (event.total_capacity || 0) - (event.available_spots || 0),
      is_active: event.status === 'published',
      price: event.regular_price,
      currency: event.currency || 'EUR',
    };
  },

  /**
   * Delete a city event (admin only)
   */
  deleteCityEvent: async (cityEventId: number): Promise<void> => {
    await apiClient.delete(`/v1/masterclass/city-events/${cityEventId}`);
  },
};
