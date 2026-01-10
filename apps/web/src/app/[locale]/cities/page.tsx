/**
 * Cities Page
 * List of all cities with available events
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui';
import SwissDivider from '@/components/masterclass/SwissDivider';
import SwissCard from '@/components/masterclass/SwissCard';
import AvailabilityBar from '@/components/masterclass/AvailabilityBar';
import { MapPin, Calendar, Users } from 'lucide-react';
import { masterclassAPI, type CityWithEvents } from '@/lib/api/masterclass';
import { logger } from '@/lib/logger';

export default function CitiesPage() {
  const router = useRouter();
  const [cities, setCities] = useState<CityWithEvents[]>([]);
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
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getEventDate = (event: CityEvent) => {
    return event.event_date || event.start_date;
  };

  return (
    <div className="min-h-screen bg-white">
      <Container className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <h1 className="swiss-display text-6xl md:text-8xl mb-6 text-black">
              Villes & Dates
            </h1>
            <SwissDivider />
            <p className="text-xl text-gray-600 mt-6 max-w-3xl">
              Choisissez la ville et la date qui vous conviennent pour participer à la masterclass ACT avec Russ Harris.
            </p>
          </div>

          {/* Cities Grid */}
          {isLoading ? (
            <div className="text-center py-20">
              <p className="text-gray-600">Chargement des villes...</p>
            </div>
          ) : cities.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600">Aucune ville disponible pour le moment.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cities.map((city) => (
                <SwissCard key={city.id} className="p-8 hover:border-black transition-colors">
                  <div className="mb-6">
                      <div className="flex items-center gap-3 mb-4">
                        <MapPin className="w-5 h-5 text-black" aria-hidden="true" />
                        <h2 className="text-3xl font-black text-black">
                          {city.name_fr || city.name_en || city.name}
                        </h2>
                      </div>
                    <p className="text-gray-600">{city.country}</p>
                  </div>

                  {city.events && city.events.length > 0 ? (
                    <div className="space-y-4">
                      {city.events.slice(0, 3).map((event) => {
                        const maxAttendees = event.max_attendees || event.total_capacity || 0;
                        const currentAttendees = event.current_attendees || 0;
                        const available = maxAttendees - currentAttendees;
                        const percentage = maxAttendees > 0 
                          ? ((available / maxAttendees) * 100) 
                          : 0;

                        return (
                          <div key={event.id} className="border-t border-gray-200 pt-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Calendar className="w-4 h-4 text-gray-600" aria-hidden="true" />
                              <span className="text-sm font-bold text-black">
                                {formatDate(getEventDate(event))}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              <Users className="w-4 h-4 text-gray-600" aria-hidden="true" />
                              <span className="text-sm text-gray-600">
                                {available} places disponibles
                              </span>
                            </div>
                            <AvailabilityBar 
                              available={available} 
                              total={maxAttendees || 0}
                            />
                            <button
                              onClick={() => router.push(`/cities/${city.id}`)}
                              className="mt-4 w-full px-4 py-2 bg-black text-white font-bold hover:bg-gray-900 transition-colors text-sm"
                            >
                              Voir les détails
                            </button>
                          </div>
                        );
                      })}
                      {city.events.length > 3 && (
                        <button
                          onClick={() => router.push(`/cities/${city.id}`)}
                          className="w-full px-4 py-2 border border-black text-black font-bold hover:bg-black hover:text-white transition-colors text-sm"
                        >
                          Voir toutes les dates ({city.events.length})
                        </button>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-600 text-sm">Aucun événement disponible</p>
                  )}
                </SwissCard>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
