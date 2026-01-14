/**
 * Book Page - City/Date Selection
 * Select city and date for booking
 */

'use client';

import { useRouter } from 'next/navigation';
import { Container } from '@/components/ui';
import SwissDivider from '@/components/masterclass/SwissDivider';
import SwissCard from '@/components/masterclass/SwissCard';
import { MapPin } from 'lucide-react';
import { microInteractions, animationVariants, combineAnimations } from '@/lib/animations/micro-interactions';

// Static city data with fixed date and price
interface StaticCity {
  id: number;
  name: string;
  name_en: string;
  name_fr: string;
  country: string;
  date: string; // Format: "24-25 mai 2026"
  price: number; // Price in CAD
  currency: string;
}

const STATIC_CITIES: StaticCity[] = [
  {
    id: 1,
    name: 'Montréal',
    name_en: 'Montreal',
    name_fr: 'Montréal',
    country: 'Canada',
    date: '24-25 mai 2026',
    price: 550,
    currency: 'CAD',
  },
  {
    id: 2,
    name: 'Calgary',
    name_en: 'Calgary',
    name_fr: 'Calgary',
    country: 'Canada',
    date: '31 mai - 1 juin 2026',
    price: 550,
    currency: 'CAD',
  },
  {
    id: 3,
    name: 'Vancouver',
    name_en: 'Vancouver',
    name_fr: 'Vancouver',
    country: 'Canada',
    date: '7-8 juin 2026',
    price: 550,
    currency: 'CAD',
  },
  {
    id: 4,
    name: 'Toronto',
    name_en: 'Toronto',
    name_fr: 'Toronto',
    country: 'Canada',
    date: '14-15 juin 2026',
    price: 550,
    currency: 'CAD',
  },
];

export default function BookPage() {
  const router = useRouter();

  const handleCitySelect = (city: StaticCity) => {
    // Pass static data via query params
    const params = new URLSearchParams({
      city: city.name,
      date: city.date,
      price: city.price.toString(),
      currency: city.currency,
    });
    router.push(`/book/checkout?${params.toString()}`);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white text-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-[#1F2937] via-[#111827] to-[#0F172A]">
        <Container className="max-w-6xl mx-auto px-4">
          <div className="mb-16">
            <h1 className={combineAnimations(
              animationVariants.hero.title,
              "swiss-display text-6xl md:text-8xl mb-6 text-white"
            )}>
              Réserver ma place
            </h1>
            <SwissDivider className="mb-8" />
            <p className={combineAnimations(
              animationVariants.hero.subtitle,
              "text-xl text-gray-300 mt-6 max-w-3xl"
            )}>
              Sélectionnez la ville de votre choix pour participer à la masterclass ACT avec Russ Harris.
            </p>
          </div>
        </Container>
      </section>

      {/* Cities Selection Section */}
      <section className="py-20 md:py-32 bg-white">
        <Container className="max-w-6xl mx-auto px-4">
          <div>
            <h2 className="text-3xl font-black text-black mb-8">Choisir une ville</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {STATIC_CITIES.map((city) => (
                <SwissCard
                  key={city.id}
                  className={combineAnimations(
                    microInteractions.card.hover,
                    "p-6 cursor-pointer hover:border-black transition-colors"
                  )}
                  onClick={() => handleCitySelect(city)}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-black" aria-hidden="true" />
                    <h3 className="text-2xl font-black text-black">{city.name}</h3>
                  </div>
                  <p className="text-gray-600 mb-2">{city.country}</p>
                  <p className="text-sm text-gray-600 mb-4">{city.date}</p>
                  <p className="text-sm text-[#FF8C42] font-bold mt-4">
                    Cliquez pour réserver →
                  </p>
                </SwissCard>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
