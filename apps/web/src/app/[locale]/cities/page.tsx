/**
 * Cities Page
 * List of all cities with available events
 * Design aligned with home page
 */

'use client';

import { useEffect, useState } from 'react';
import { Container, Button } from '@/components/ui';
import { Link } from '@/i18n/routing';
import CityCard from '@/components/masterclass/CityCard';
import { masterclassAPI, type CityWithEvents } from '@/lib/api/masterclass';
import { logger } from '@/lib/logger';

export default function CitiesPage() {
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
    <div className="bg-gradient-to-b from-gray-50 to-white text-gray-900">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-[#1F2937] via-[#111827] to-[#0F172A]">
        <Container className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Villes & Dates
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Choisissez la ville et la date qui vous conviennent pour participer à la masterclass ACT avec Russ Harris.
            </p>
          </div>
        </Container>
      </section>

      {/* Cities Grid Section */}
      <section className="py-32 bg-white">
        <Container className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">Chargement des villes...</p>
            </div>
          ) : cities.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">Aucune ville disponible pour le moment.</p>
              <Link href="/contact">
                <Button className="mt-6 bg-[#F58220] hover:bg-[#C4681A] text-white rounded-full">
                  Nous contacter
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {cities.map((city) => (
                <CityCard key={city.id} city={city} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
