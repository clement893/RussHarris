/**
 * Home Page - Russ Harris Masterclass
 * Hero section with masterclass information
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui';
import HeroSection from '@/components/masterclass/HeroSection';
import UrgencyBadge from '@/components/masterclass/UrgencyBadge';
import BenefitsGrid, { type Benefit } from '@/components/masterclass/BenefitsGrid';
import ProgramPreview from '@/components/masterclass/ProgramPreview';
import CityCard from '@/components/masterclass/CityCard';
import TestimonialPreview, { type Testimonial } from '@/components/masterclass/TestimonialPreview';
import PricingPreview, { type PricingOption } from '@/components/masterclass/PricingPreview';
import FAQPreview, { type FAQItem } from '@/components/masterclass/FAQPreview';
import MasterclassFooter from '@/components/layout/MasterclassFooter';
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

  // Testimonials data
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Marie Dubois',
      role: 'Psychologue clinicienne',
      location: 'Paris, France',
      rating: 5,
      text: 'Une formation exceptionnelle ! Russ Harris a une façon unique de rendre l\'ACT accessible et applicable. J\'ai pu immédiatement intégrer les techniques dans ma pratique.',
    },
    {
      id: 2,
      name: 'Jean Martin',
      role: 'Thérapeute',
      location: 'Lyon, France',
      rating: 5,
      text: 'La meilleure formation en ACT que j\'ai suivie. Russ est un formateur remarquable, clair et passionné. Les démonstrations pratiques m\'ont permis de vraiment comprendre les concepts.',
    },
    {
      id: 3,
      name: 'Sophie Laurent',
      role: 'Psychothérapeute',
      location: 'Marseille, France',
      rating: 5,
      text: 'Cette masterclass a transformé ma pratique professionnelle. Les outils partagés sont directement applicables. L\'accès aux enregistrements est un vrai plus.',
    },
  ];

  // Pricing data
  const pricingOptions: PricingOption[] = [
    {
      id: 'early-bird',
      name: 'Early Bird',
      price: 450,
      currency: 'EUR',
      description: 'Tarif préférentiel pour réservations anticipées',
      popular: true,
      badge: 'Tarif réduit',
      features: [
        'Accès complet à la masterclass (2 jours)',
        'Manuel de formation (PDF)',
        'Accès aux enregistrements vidéo (3 mois)',
        'Certificat de participation',
      ],
    },
    {
      id: 'regular',
      name: 'Tarif Standard',
      price: 550,
      currency: 'EUR',
      description: 'Tarif standard pour réservations',
      popular: false,
      features: [
        'Accès complet à la masterclass (2 jours)',
        'Manuel de formation (PDF)',
        'Accès aux enregistrements vidéo (3 mois)',
        'Certificat de participation',
      ],
    },
    {
      id: 'group',
      name: 'Tarif Groupe',
      price: 400,
      currency: 'EUR',
      description: 'Tarif réduit pour groupes de 3+ personnes',
      popular: false,
      features: [
        'Accès complet à la masterclass (2 jours)',
        'Manuel de formation (PDF)',
        'Accès aux enregistrements vidéo (3 mois)',
        'Réduction de groupe appliquée',
      ],
    },
  ];

  // FAQ data
  const faqItems: FAQItem[] = [
    {
      id: 1,
      question: 'Qu\'est-ce que l\'ACT (Thérapie d\'Acceptation et d\'Engagement) ?',
      answer: 'L\'ACT est une approche thérapeutique basée sur la pleine conscience qui aide les personnes à accepter leurs pensées et émotions difficiles tout en s\'engageant dans des actions alignées avec leurs valeurs.',
    },
    {
      id: 2,
      question: 'Qui est Russ Harris ?',
      answer: 'Russ Harris est un médecin, psychothérapeute et formateur internationalement reconnu dans le domaine de l\'ACT. Il est l\'auteur de plusieurs best-sellers, dont "Le piège du bonheur", traduit en plus de 30 langues.',
    },
    {
      id: 3,
      question: 'Comment puis-je réserver ma place ?',
      answer: 'Vous pouvez réserver votre place directement en ligne en sélectionnant une ville et une date sur la page "Villes & Dates". Le processus de réservation est simple et sécurisé.',
    },
    {
      id: 4,
      question: 'Y a-t-il un tarif réduit pour les groupes ?',
      answer: 'Oui, nous offrons un tarif groupe pour les réservations de 3 personnes ou plus. Contactez-nous pour obtenir un devis personnalisé.',
    },
    {
      id: 5,
      question: 'Quelles ressources sont incluses dans le prix ?',
      answer: 'Le prix comprend l\'accès complet à la masterclass de 2 jours, le manuel de formation, l\'accès aux enregistrements vidéo pendant 3 mois, toutes les ressources pratiques et le certificat de participation.',
    },
  ];

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

      {/* Testimonials Preview Section */}
      <TestimonialPreview
        testimonials={testimonials}
        title="Ce que disent nos participants"
        subtitle="Découvrez les témoignages des professionnels ayant suivi la masterclass"
        maxVisible={3}
      />

      {/* Pricing Preview Section */}
      <PricingPreview
        pricingOptions={pricingOptions}
        title="Tarifs & Options"
        subtitle="Choisissez l'option qui vous convient pour participer à la masterclass"
      />

      {/* FAQ Preview Section */}
      <FAQPreview
        faqItems={faqItems}
        title="Questions fréquentes"
        subtitle="Trouvez rapidement les réponses aux questions les plus courantes"
        maxVisible={5}
      />

      {/* Footer */}
      <MasterclassFooter />
    </div>
  );
}
