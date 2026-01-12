/**
 * City Detail Page
 * Detailed information about a specific city and its events
 */

'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Container } from '@/components/ui';
import SwissDivider from '@/components/masterclass/SwissDivider';
import SwissCard from '@/components/masterclass/SwissCard';
import AvailabilityBar from '@/components/masterclass/AvailabilityBar';
import UrgencyBadge from '@/components/masterclass/UrgencyBadge';
import { MapPin, Calendar, Clock, Users, Building } from 'lucide-react';
import { masterclassAPI, type CityEvent, type City } from '@/lib/api/masterclass';
import { logger } from '@/lib/logger';

export default function CityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const cityId = parseInt(params.city as string, 10);
  
  const [cityEvents, setCityEvents] = useState<CityEvent[]>([]);
  const [city, setCity] = useState<City | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (cityId) {
      loadCityEvents();
    }
  }, [cityId]);

  const loadCityEvents = async () => {
    try {
      setIsLoading(true);
      const events = await masterclassAPI.listCityEvents(cityId);
      setCityEvents(events);
      if (events.length > 0 && events[0]?.city) {
        setCity(events[0].city);
      }
    } catch (error) {
      logger.error('Failed to load city events', error instanceof Error ? error : new Error(String(error)));
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getEventDate = (event: CityEvent) => {
    return event.event_date || event.start_date;
  };

  const formatTime = (timeString: string) => {
    return timeString.substring(0, 5); // HH:MM format
  };

  return (
    <div className="min-h-screen bg-white">
      <Container className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <button
              onClick={() => router.push('/cities')}
              className="text-gray-600 hover:text-[#F58220] mb-6 text-sm font-bold transition-colors"
            >
              ← Retour aux villes
            </button>
            <div className="flex items-center justify-between mb-6">
              <h1 className="swiss-display text-6xl md:text-8xl text-black">
                {city ? `${city.name_fr || city.name_en || city.name}, ${city.country}` : 'Chargement...'}
              </h1>
              {city && cityEvents.length > 0 && (
                <button
                  onClick={() => router.push(`/cities/${cityId}/inscription`)}
                  className="hidden md:flex items-center gap-2 px-6 py-3 bg-[#F58220] text-white font-bold hover:bg-[#C4681A] transition-all duration-300 rounded-full transform hover:scale-105"
                >
                  S'inscrire
                </button>
              )}
            </div>
            <SwissDivider />
          </div>

          {/* Events List */}
          {isLoading ? (
            <div className="text-center py-20">
              <p className="text-gray-600">Chargement des événements...</p>
            </div>
          ) : cityEvents.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600">Aucun événement disponible pour cette ville.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {cityEvents.map((event) => {
                const maxAttendees = event.max_attendees || event.total_capacity || 0;
                const currentAttendees = event.current_attendees || 0;
                const available = maxAttendees - currentAttendees;
                const percentage = maxAttendees > 0 
                  ? ((available / maxAttendees) * 100) 
                  : 0;
                const isLowAvailability = percentage < 20;

                return (
                  <SwissCard key={event.id} className="p-8">
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Calendar className="w-5 h-5 text-black" aria-hidden="true" />
                            <h2 className="text-3xl font-black text-black">
                              {formatDate(getEventDate(event))}
                            </h2>
                          </div>
                        {isLowAvailability && <UrgencyBadge text="Places limitées" />}
                      </div>

                      <div className="flex items-center gap-4 text-gray-600 mb-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" aria-hidden="true" />
                          <span>{formatTime(event.start_time)} - {formatTime(event.end_time)}</span>
                        </div>
                        {event.venue && (
                          <div className="flex items-center gap-2">
                            <Building className="w-4 h-4" aria-hidden="true" />
                            <span>{event.venue.name}</span>
                          </div>
                        )}
                      </div>

                      {event.venue && (
                        <div className="mb-4">
                          <div className="flex items-start gap-2 text-gray-600">
                            <MapPin className="w-4 h-4 mt-1 flex-shrink-0" aria-hidden="true" />
                            <span className="text-sm">{event.venue.address}</span>
                          </div>
                        </div>
                      )}

                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-gray-600" aria-hidden="true" />
                            <span className="text-sm font-bold text-black">
                              {available} places disponibles sur {maxAttendees}
                            </span>
                          </div>
                        </div>
                        <AvailabilityBar 
                          available={available} 
                          total={maxAttendees}
                        />
                      </div>

                      {event.event && (
                        <div className="mb-6 p-4 bg-gray-50 border border-gray-200">
                          <h3 className="text-lg font-bold text-black mb-2">
                            {event.event.title_fr || event.event.title_en}
                          </h3>
                          {(event.event.description_fr || event.event.description_en) && (
                            <p className="text-gray-600 text-sm">
                              {event.event.description_fr || event.event.description_en}
                            </p>
                          )}
                          <div className="mt-4 flex items-center justify-between gap-4">
                            <span className="text-2xl font-black text-black">
                              {event.price || event.regular_price} {event.currency || 'EUR'}
                            </span>
                            <div className="flex gap-3">
                              <button
                                onClick={() => router.push(`/cities/${cityId}/inscription`)}
                                className="px-6 py-2.5 bg-[#F58220] text-white font-bold hover:bg-[#C4681A] transition-all duration-300 rounded-full transform hover:scale-105"
                              >
                                Inscription
                              </button>
                              <button
                                onClick={() => router.push(`/book?cityEventId=${event.id}`)}
                                className="px-6 py-2.5 bg-black text-white font-bold hover:bg-gray-900 transition-colors rounded-full"
                              >
                                Réserver
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </SwissCard>
                );
              })}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
