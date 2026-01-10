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
  name: string;
  country: string;
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
  event_date: string;
  start_time: string;
  end_time: string;
  max_attendees: number;
  current_attendees: number;
  is_active: boolean;
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

export interface CityWithEvents extends City {
  events: CityEvent[];
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
    const response = await apiClient.get<CityWithEvents[]>('/v1/masterclass/cities');
    const data = extractApiData<CityWithEvents[]>(response);
    return Array.isArray(data) ? data : [];
  },

  /**
   * Get events for a specific city
   */
  listCityEvents: async (cityId: number): Promise<CityEvent[]> => {
    const response = await apiClient.get<CityEvent[]>(`/v1/masterclass/cities/${cityId}/events`);
    const data = extractApiData<CityEvent[]>(response);
    return Array.isArray(data) ? data : [];
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
    return data;
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
