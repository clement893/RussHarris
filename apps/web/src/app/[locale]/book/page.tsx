/**
 * Book Page - City/Date Selection
 * Select city and date for booking
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container } from '@/components/ui';
import SwissDivider from '@/components/masterclass/SwissDivider';
import SwissCard from '@/components/masterclass/SwissCard';
import AvailabilityBar from '@/components/masterclass/AvailabilityBar';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { masterclassAPI, type CityWithEvents, type CityEvent } from '@/lib/api/masterclass';
import { logger } from '@/lib/logger';

export default function BookPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedCityId = searchParams.get('cityId');
  const preselectedEventId = searchParams.get('cityEventId');

  const [cities, setCities] = useState<CityWithEvents[]>([]);
  const [selectedCityId, setSelectedCityId] = useState<number | null>(
    preselectedCityId ? parseInt(preselectedCityId, 10) : null
  );
  const [selectedEventId, setSelectedEventId] = useState<number | null>(
    preselectedEventId ? parseInt(preselectedEventId, 10) : null
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadCities();
  }, []);

  const loadCities = async () => {
    try {
      setIsLoading(true);
      const data = await masterclassAPI.listCitiesWithEvents();
      setCities(data);
    } catch (error) {
      logger.error('Failed to load cities', error instanceof Error ? error : new Error(String(error)));
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
    return timeString.substring(0, 5);
  };

  const handleContinue = () => {
    if (selectedEventId) {
      router.push(`/book/checkout?cityEventId=${selectedEventId}`);
    }
  };

  const selectedCity = cities.find((c) => c.id === selectedCityId);

  return (
    <div className="min-h-screen bg-white">
      <Container className="py-20 md:py-32">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <h1 className="swiss-display text-6xl md:text-8xl mb-6 text-black">
              Réserver ma place
            </h1>
            <SwissDivider />
            <p className="text-xl text-gray-600 mt-6 max-w-3xl">
              Sélectionnez la ville et la date de votre choix pour participer à la masterclass ACT avec Russ Harris.
            </p>
          </div>

          {/* Step 1: Select City */}
          {!selectedCityId ? (
            <div>
              <h2 className="text-3xl font-black text-black mb-8">Étape 1 : Choisir une ville</h2>
              {isLoading ? (
                <div className="text-center py-20">
                  <p className="text-gray-600">Chargement des villes...</p>
                </div>
              ) : cities.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-gray-600">Aucune ville disponible pour le moment.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cities.map((city) => (
                    <SwissCard
                      key={city.id}
                      className="p-6 cursor-pointer hover:border-black transition-colors"
                      onClick={() => setSelectedCityId(city.id)}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <MapPin className="w-5 h-5 text-black" aria-hidden="true" />
                        <h3 className="text-2xl font-black text-black">{city.name}</h3>
                      </div>
                      <p className="text-gray-600 mb-4">{city.country}</p>
                      {city.events && city.events.length > 0 && (
                        <p className="text-sm text-gray-600">
                          {city.events.length} date{city.events.length > 1 ? 's' : ''} disponible{city.events.length > 1 ? 's' : ''}
                        </p>
                      )}
                    </SwissCard>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Step 2: Select Date */}
              <div className="mb-12">
                <button
                  onClick={() => {
                    setSelectedCityId(null);
                    setSelectedEventId(null);
                  }}
                  className="text-gray-600 hover:text-black mb-6 text-sm font-bold flex items-center gap-2"
                >
                  ← Changer de ville
                </button>
                <h2 className="text-3xl font-black text-black mb-8">
                  Étape 2 : Choisir une date
                </h2>

                {selectedCity?.events && selectedCity.events.length > 0 ? (
                  <div className="space-y-6">
                    {selectedCity.events.map((event) => {
                      const maxAttendees = event.max_attendees || event.total_capacity || 0;
                      const currentAttendees = event.current_attendees || 0;
                      const available = maxAttendees - currentAttendees;
                      const percentage = maxAttendees > 0
                        ? ((available / maxAttendees) * 100)
                        : 0;
                      const isSelected = selectedEventId === event.id;
                      const isLowAvailability = percentage < 20;

                      return (
                        <SwissCard
                          key={event.id}
                          className={`p-6 cursor-pointer transition-colors ${
                            isSelected ? 'border-2 border-black' : 'hover:border-black'
                          }`}
                          onClick={() => setSelectedEventId(event.id)}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <div className="flex items-center gap-3 mb-2">
                                <Calendar className="w-5 h-5 text-black" aria-hidden="true" />
                                <h3 className="text-2xl font-black text-black">
                                  {formatDate(getEventDate(event))}
                                </h3>
                              </div>
                              <div className="flex items-center gap-4 text-gray-600 mb-4">
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4" aria-hidden="true" />
                                  <span className="text-sm">
                                    {formatTime(event.start_time)} - {formatTime(event.end_time)}
                                  </span>
                                </div>
                                {event.venue && (
                                  <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" aria-hidden="true" />
                                    <span className="text-sm">{event.venue.name}</span>
                                  </div>
                                )}
                              </div>
                              {event.venue?.address && (
                                <p className="text-sm text-gray-600 mb-4">{event.venue.address}</p>
                              )}
                            </div>
                            {isLowAvailability && (
                              <span className="px-3 py-1 bg-red-600 text-white text-xs font-bold">
                                Places limitées
                              </span>
                            )}
                          </div>

                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-gray-600" aria-hidden="true" />
                                <span className="text-sm font-bold text-black">
                                  {available} places disponibles sur {maxAttendees}
                                </span>
                              </div>
                            </div>
                            <AvailabilityBar available={available} total={maxAttendees} />
                          </div>

                          {event.event && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <p className="text-sm text-gray-600 mb-2">{event.event.title_fr || event.event.title_en}</p>
                              <p className="text-2xl font-black text-black">
                                {event.price || event.regular_price} {event.currency || 'EUR'}
                              </p>
                            </div>
                          )}
                        </SwissCard>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-gray-600">Aucun événement disponible pour cette ville.</p>
                  </div>
                )}

                {selectedEventId && (
                  <div className="mt-8 text-center">
                    <button
                      onClick={handleContinue}
                      className="px-12 py-4 bg-black text-white font-bold text-lg hover:bg-gray-900 transition-colors"
                    >
                      Continuer vers le formulaire
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </Container>
    </div>
  );
}
