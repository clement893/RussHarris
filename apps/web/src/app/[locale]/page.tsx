/**
 * Home Page - Russ Harris Masterclass
 * Hero section with masterclass information
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Container } from '@/components/ui';
import ButtonLink from '@/components/ui/ButtonLink';
import HeroSection from '@/components/masterclass/HeroSection';
import UrgencyBadge from '@/components/masterclass/UrgencyBadge';
import { Calendar, MapPin, Users, Award } from 'lucide-react';
import { masterclassAPI, type CityWithEvents } from '@/lib/api/masterclass';
import { logger } from '@/lib/logger';

export default function HomePage() {
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

  const totalEvents = cities.reduce((sum, city) => sum + (city.events?.length || 0), 0);
  const totalAvailable = cities.reduce((sum, city) => {
    return sum + (city.events?.reduce((eventSum, event) => {
      const available = (event.max_attendees || 0) - (event.current_attendees || 0);
      return eventSum + Math.max(0, available);
    }, 0) || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection
        headline="Masterclass ACT avec Russ Harris"
        subheading="Découvrez la Thérapie d'Acceptation et d'Engagement (ACT) avec l'un des experts mondiaux"
        ctaText="Réserver ma place"
        onCtaClick={() => router.push('/cities')}
        overlayOpacity={50}
      >
        <UrgencyBadge text="Places limitées" />
      </HeroSection>

      {/* Stats Section */}
      <section className="bg-white py-16" aria-labelledby="stats-heading">
        <Container>
          <h2 id="stats-heading" className="sr-only">Statistiques de la masterclass</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8" role="list" aria-label="Statistiques">
            <div role="listitem" className="text-center">
              <div className="text-4xl md:text-5xl font-black text-black mb-2">
                {cities.length}
              </div>
              <div className="text-sm md:text-base text-gray-600 flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" aria-hidden="true" />
                Villes
              </div>
            </div>
            <div role="listitem" className="text-center">
              <div className="text-4xl md:text-5xl font-black text-black mb-2">
                {totalEvents}
              </div>
              <div className="text-sm md:text-base text-gray-600 flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                Sessions
              </div>
            </div>
            <div role="listitem" className="text-center">
              <div className="text-4xl md:text-5xl font-black text-black mb-2">
                {totalAvailable}
              </div>
              <div className="text-sm md:text-base text-gray-600 flex items-center justify-center gap-2">
                <Users className="w-4 h-4" aria-hidden="true" />
                Places disponibles
              </div>
            </div>
            <div role="listitem" className="text-center">
              <div className="text-4xl md:text-5xl font-black text-black mb-2">
                2
              </div>
              <div className="text-sm md:text-base text-gray-600 flex items-center justify-center gap-2">
                <Award className="w-4 h-4" aria-hidden="true" />
                Jours
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Quick Links Section */}
      <section className="bg-gray-50 py-20" aria-labelledby="quick-links-heading">
        <Container>
          <h2 id="quick-links-heading" className="sr-only">Liens rapides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 border border-gray-200 hover:border-black transition-colors">
              <h3 className="text-2xl font-black text-black mb-4">À propos de Russ</h3>
              <p className="text-gray-600 mb-6">
                Découvrez l'expertise et l'expérience de Russ Harris dans le domaine de l'ACT.
              </p>
              <ButtonLink href="/about-russ" variant="outline" className="w-full">
                En savoir plus
              </ButtonLink>
            </Card>

            <Card className="p-8 border border-gray-200 hover:border-black transition-colors">
              <h3 className="text-2xl font-black text-black mb-4">Le Programme</h3>
              <p className="text-gray-600 mb-6">
                Explorez le contenu détaillé de la masterclass sur 2 jours intensifs.
              </p>
              <ButtonLink href="/masterclass" variant="outline" className="w-full">
                Voir le programme
              </ButtonLink>
            </Card>

            <Card className="p-8 border border-gray-200 hover:border-black transition-colors">
              <h3 className="text-2xl font-black text-black mb-4">Villes & Dates</h3>
              <p className="text-gray-600 mb-6">
                Consultez les villes et dates disponibles pour réserver votre place.
              </p>
              <ButtonLink href="/cities" variant="primary" className="w-full">
                Voir les villes
              </ButtonLink>
            </Card>
          </div>
        </Container>
      </section>
    </div>
  );
}
