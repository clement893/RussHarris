/**
 * About Russ Harris Page
 * Biography and key information about Russ Harris
 */

'use client';

import Image from 'next/image';
import { Button, Container } from '@/components/ui';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Award, Book, Globe, Users, Hexagon } from 'lucide-react';

export default function AboutRussPage() {
  const t = useTranslations('aboutRuss');
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white text-gray-900">
      {/* Hero Section - Avec gris anthracite élégant */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-20 pb-14 bg-gradient-to-br from-[#1F2937] via-[#111827] to-[#0F172A]" data-header-contrast="dark">
        {/* Grille hexagonale subtile en arrière-plan */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexPatternAbout" x="0" y="0" width="100" height="86.6" patternUnits="userSpaceOnUse">
                <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexPatternAbout)" />
          </svg>
        </div>

        {/* Motif de vagues subtil */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,400 Q300,300 600,400 T1200,400" stroke="white" strokeWidth="2" fill="none" />
            <path d="M0,450 Q300,350 600,450 T1200,450" stroke="white" strokeWidth="2" fill="none" />
            <path d="M0,500 Q300,400 600,500 T1200,500" stroke="white" strokeWidth="2" fill="none" />
          </svg>
        </div>

        <Container className="relative z-10 max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-none text-white tracking-tight">
              {t('title')}
            </h1>
            <p className="text-xl md:text-2xl font-light text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </Container>
      </section>

      {/* Section Biographie */}
      <section className="py-32 bg-white" data-header-contrast="light">
        <Container className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-5 gap-12 items-center">
            {/* Photo avec effet hexagonal */}
            <div className="md:col-span-2">
              <div className="relative">
                {/* Hexagones décoratifs */}
                <div className="absolute -top-8 -left-8 w-24 h-24 opacity-5">
                  <Hexagon className="w-full h-full text-[#FF8C42]" />
                </div>
                <div className="absolute -bottom-8 -right-8 w-32 h-32 opacity-5">
                  <Hexagon className="w-full h-full text-gray-900" />
                </div>
                
                <div className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden">
                  <Image
                    src="/images/russ/8obb1myXAohZ.jpg"
                    alt="Dr. Russ Harris"
                    fill
                    style={{ objectFit: 'cover' }}
                    className="grayscale-[30%] contrast-110"
                  />
                </div>
              </div>
            </div>

            {/* Contenu */}
            <div className="md:col-span-3 space-y-6">
              <p className="text-xl text-gray-700 leading-relaxed">{t('bio1')}</p>
              <p className="text-xl text-gray-700 leading-relaxed">{t('bio2')}</p>
              <p className="text-xl text-gray-700 leading-relaxed">{t('bio3')}</p>
              <p className="text-xl text-gray-700 leading-relaxed">{t('bio4')}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Section Points Clés */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden" data-header-contrast="light">
        <div className="absolute inset-0 opacity-[0.015]">
          <svg className="w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexPatternKeyPoints" x="0" y="0" width="100" height="86.6" patternUnits="userSpaceOnUse">
                <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" fill="none" stroke="#1F2937" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexPatternKeyPoints)" />
          </svg>
        </div>

        <Container className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors relative">
              <div className="absolute top-4 right-4 w-12 h-12 opacity-5">
                <Hexagon className="w-full h-full text-[#FF8C42]" />
              </div>
              <div className="mb-6 text-[#FF8C42]">
                <Book className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('keyPoint1Title')}</h3>
              <p className="text-gray-600 text-sm">{t('keyPoint1Description')}</p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors relative">
              <div className="absolute top-4 right-4 w-12 h-12 opacity-5">
                <Hexagon className="w-full h-full text-[#FF8C42]" />
              </div>
              <div className="mb-6 text-[#FF8C42]">
                <Globe className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('keyPoint2Title')}</h3>
              <p className="text-gray-600 text-sm">{t('keyPoint2Description')}</p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors relative">
              <div className="absolute top-4 right-4 w-12 h-12 opacity-5">
                <Hexagon className="w-full h-full text-[#FF8C42]" />
              </div>
              <div className="mb-6 text-[#FF8C42]">
                <Award className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('keyPoint3Title')}</h3>
              <p className="text-gray-600 text-sm">{t('keyPoint3Description')}</p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors relative">
              <div className="absolute top-4 right-4 w-12 h-12 opacity-5">
                <Hexagon className="w-full h-full text-[#FF8C42]" />
              </div>
              <div className="mb-6 text-[#FF8C42]">
                <Users className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{t('keyPoint4Title')}</h3>
              <p className="text-gray-600 text-sm">{t('keyPoint4Description')}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Final */}
      <section className="py-32 bg-gradient-to-br from-[#1F2937] via-[#111827] to-[#0F172A] text-white relative overflow-hidden" data-header-contrast="dark">
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexPatternCTAAbout" x="0" y="0" width="100" height="86.6" patternUnits="userSpaceOnUse">
                <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexPatternCTAAbout)" />
          </svg>
        </div>

        <Container className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            {t('ctaTitle')}
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            {t('ctaDescription')}
          </p>
          <Link href="/cities">
            <Button 
              size="lg" 
              className="bg-[#FF8C42] hover:bg-[#FF7A29] text-white font-medium text-base px-10 py-4 rounded-full transition-all hover:scale-105 border border-[#FF8C42]/20"
            >
              {t('ctaButton')}
            </Button>
          </Link>
        </Container>
      </section>
    </div>
  );
}
