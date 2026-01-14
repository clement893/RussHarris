/**
 * Book Page - City/Date Selection
 * Select city and date for booking
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui';
import SwissDivider from '@/components/masterclass/SwissDivider';
import SwissCard from '@/components/masterclass/SwissCard';
import { MapPin } from 'lucide-react';
import { masterclassAPI, type CityWithEvents } from '@/lib/api/masterclass';
import { logger } from '@/lib/logger';

export default function BookPage() {
  const router = useRouter();
  const [cities, setCities] = useState<CityWithEvents[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCities();
  }, []);

  const loadCities = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await masterclassAPI.listCitiesWithEvents();
      logger.debug('Loaded cities', { count: data.length, cities: data });
      
      // If API returns empty, use fallback static cities
      if (data.length === 0) {
        logger.warn('No cities from API, using fallback static cities');
        const fallbackCities: CityWithEvents[] = [
          {
            id: 1,
            name_en: 'Montreal',
            name_fr: 'Montréal',
            name: 'Montréal',
            country: 'Canada',
            province: 'Quebec',
            events: [],
          },
          {
            id: 2,
            name_en: 'Calgary',
            name_fr: 'Calgary',
            name: 'Calgary',
            country: 'Canada',
            province: 'Alberta',
            events: [],
          },
          {
            id: 3,
            name_en: 'Vancouver',
            name_fr: 'Vancouver',
            name: 'Vancouver',
            country: 'Canada',
            province: 'British Columbia',
            events: [],
          },
          {
            id: 4,
            name_en: 'Toronto',
            name_fr: 'Toronto',
            name: 'Toronto',
            country: 'Canada',
            province: 'Ontario',
            events: [],
          },
        ];
        setCities(fallbackCities);
      } else {
        setCities(data);
      }
    } catch (error) {
      logger.error('Failed to load cities', error instanceof Error ? error : new Error(String(error)));
      // Use fallback cities on error
      const fallbackCities: CityWithEvents[] = [
        {
          id: 1,
          name_en: 'Montreal',
          name_fr: 'Montréal',
          name: 'Montréal',
          country: 'Canada',
          province: 'Quebec',
          events: [],
        },
        {
          id: 2,
          name_en: 'Calgary',
          name_fr: 'Calgary',
          name: 'Calgary',
          country: 'Canada',
          province: 'Alberta',
          events: [],
        },
        {
          id: 3,
          name_en: 'Vancouver',
          name_fr: 'Vancouver',
          name: 'Vancouver',
          country: 'Canada',
          province: 'British Columbia',
          events: [],
        },
        {
          id: 4,
          name_en: 'Toronto',
          name_fr: 'Toronto',
          name: 'Toronto',
          country: 'Canada',
          province: 'Ontario',
          events: [],
        },
      ];
      setCities(fallbackCities);
      setError('Les données sont chargées depuis le cache. Certaines informations peuvent être limitées.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCitySelect = async (city: CityWithEvents) => {
    // Each city automatically has one event (same event for all cities)
    // If city has events, use the first one; otherwise try to load events from API
    if (city.events && city.events.length > 0) {
      const firstEvent = city.events[0];
      if (firstEvent) {
        router.push(`/book/checkout?cityEventId=${firstEvent.id}`);
        return;
      }
    }
    
    // If city has no events, try to load them from API
    try {
      const events = await masterclassAPI.listCityEvents(city.id);
      if (events && events.length > 0) {
        const firstEvent = events[0];
        if (firstEvent) {
          router.push(`/book/checkout?cityEventId=${firstEvent.id}`);
        } else {
          setError(`Aucun événement disponible pour ${city.name}. Veuillez contacter le support.`);
        }
      } else {
        setError(`Aucun événement disponible pour ${city.name}. Veuillez contacter le support.`);
      }
    } catch (err) {
      logger.error('Failed to load city events', err instanceof Error ? err : new Error(String(err)));
      setError(`Erreur lors du chargement de l'événement pour ${city.name}. Veuillez réessayer.`);
    }
  };

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

          {/* Select City - Direct to Checkout */}
          <div>
            <h2 className="text-3xl font-black text-black mb-8">Choisir une ville</h2>
            {isLoading ? (
              <div className="text-center py-20">
                <p className="text-gray-600">Chargement des villes...</p>
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={loadCities}
                  className="px-6 py-2 bg-black text-white font-bold hover:bg-gray-900 transition-colors"
                >
                  Réessayer
                </button>
              </div>
            ) : cities.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-600 mb-4">Aucune ville disponible pour le moment.</p>
                <button
                  onClick={loadCities}
                  className="px-6 py-2 bg-black text-white font-bold hover:bg-gray-900 transition-colors"
                >
                  Réessayer
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cities.map((city) => (
                    <SwissCard
                      key={city.id}
                      className="p-6 cursor-pointer hover:border-black transition-colors"
                      onClick={() => handleCitySelect(city)}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <MapPin className="w-5 h-5 text-black" aria-hidden="true" />
                        <h3 className="text-2xl font-black text-black">{city.name}</h3>
                      </div>
                      <p className="text-gray-600 mb-4">{city.country}</p>
                      {city.events && city.events.length > 0 && (
                        <p className="text-sm text-gray-600 mb-2">
                          {city.events.length} date{city.events.length > 1 ? 's' : ''} disponible{city.events.length > 1 ? 's' : ''}
                        </p>
                      )}
                      <p className="text-sm text-[#FF8C42] font-bold mt-4">
                        Cliquez pour réserver →
                      </p>
                    </SwissCard>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
