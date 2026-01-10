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
import BenefitsGrid, { type Benefit } from '@/components/masterclass/BenefitsGrid';
import ProgramPreview from '@/components/masterclass/ProgramPreview';
import CityCard from '@/components/masterclass/CityCard';
import { Calendar, MapPin, Users, Award, GraduationCap, BookOpen, UsersRound, Award as AwardIcon } from 'lucide-react';
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

  // Benefits data
  const benefits: Benefit[] = [
    {
      icon: <GraduationCap className="w-12 h-12" />,
      title: 'Formation certifiante',
      description: 'Attestation de participation à la fin de la formation',
    },
    {
      icon: <AwardIcon className="w-12 h-12" />,
      title: 'Expert mondial',
      description: 'Formation dispensée par Russ Harris, expert reconnu de l\'ACT',
    },
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: 'Ressources exclusives',
      description: 'Manuel, templates et ressources pour votre pratique professionnelle',
    },
    {
      icon: <UsersRound className="w-12 h-12" />,
      title: 'Réseau professionnel',
      description: 'Échanges avec d\'autres professionnels et communauté ACT',
    },
  ];

  // Get top 3 cities with most available events
  const topCities = cities
    .filter(city => city.events && city.events.length > 0)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Improved */}
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

      {/* Why This Masterclass Section */}
      <BenefitsGrid
        benefits={benefits}
        title="Pourquoi cette Masterclass?"
        subtitle="Une formation intensive pour maîtriser l'ACT avec l'expert mondial"
      />

      {/* Program Preview Section */}
      <ProgramPreview />

      {/* Cities Preview Section */}
      {topCities.length > 0 && (
        <section className="bg-white py-20 md:py-32" aria-labelledby="cities-preview-heading">
          <Container>
            <div className="max-w-7xl mx-auto">
              {/* Header */}
              <div className="mb-16 text-center">
                <h2 id="cities-preview-heading" className="swiss-display text-5xl md:text-6xl font-black text-black mb-6">
                  Villes Disponibles
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
                  Choisissez la ville qui vous convient pour participer à la masterclass
                </p>
              </div>

              {/* Cities Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {topCities.map((city) => (
                  <CityCard key={city.id} city={city} />
                ))}
              </div>

              {/* CTA */}
              <div className="text-center">
                <button
                  onClick={() => router.push('/cities')}
                  className="px-8 py-4 text-lg font-black border-2 border-black hover:bg-black hover:text-white transition-all duration-200 rounded-none"
                >
                  Voir toutes les villes
                </button>
              </div>
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
