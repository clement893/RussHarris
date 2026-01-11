/**
 * Cities Page
 * List of all cities with available events
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui';
import SwissDivider from '@/components/masterclass/SwissDivider';
import CityCard from '@/components/masterclass/CityCard';
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
                <CityCard key={city.id} city={city} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
