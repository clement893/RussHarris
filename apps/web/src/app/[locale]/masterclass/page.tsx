/**
 * Masterclass Programme Page
 * Detailed description of the 2-day masterclass program
 */

'use client';

import { Button, Container } from '@/components/ui';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Target, BookOpen, CheckCircle } from 'lucide-react';

export default function MasterclassPage() {
  const t = useTranslations('masterclass');
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white text-gray-900">
      {/* Hero Section - Avec gris anthracite élégant */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden py-20 bg-gradient-to-br from-[#1F2937] via-[#111827] to-[#0F172A]" data-header-contrast="dark">
        {/* Grille hexagonale subtile en arrière-plan */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexPatternMasterclass" x="0" y="0" width="100" height="86.6" patternUnits="userSpaceOnUse">
                <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexPatternMasterclass)" />
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
              {t('description1')}
            </p>
            <p className="text-lg text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
              {t('description2')}
            </p>
            <Link href="/cities">
              <Button 
                size="lg" 
                className="bg-[#FF8C42] hover:bg-[#FF7A29] text-white font-medium text-base px-10 py-4 rounded-full transition-all hover:scale-105 border border-[#FF8C42]/20"
              >
                {t('bookPlace')}
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Section Objectifs Pédagogiques */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden" data-header-contrast="light">
        <div className="absolute inset-0 opacity-[0.015]">
          <svg className="w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexPatternObjectives" x="0" y="0" width="100" height="86.6" patternUnits="userSpaceOnUse">
                <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" fill="none" stroke="#1F2937" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexPatternObjectives)" />
          </svg>
        </div>

        <Container className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Target className="w-10 h-10 text-[#FF8C42]" aria-hidden="true" />
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
                {t('objectivesTitle')}
              </h2>
            </div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#FF8C42] mt-1 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-700">{t('objective1')}</span>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#FF8C42] mt-1 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-700">{t('objective2')}</span>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#FF8C42] mt-1 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-700">{t('objective3')}</span>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#FF8C42] mt-1 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-700">{t('objective4')}</span>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors md:col-span-2">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#FF8C42] mt-1 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-700">{t('objective5')}</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section Ressources Incluses */}
      <section className="py-32 bg-white" data-header-contrast="light">
        <Container className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <BookOpen className="w-10 h-10 text-[#FF8C42]" aria-hidden="true" />
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
                {t('resourcesTitle')}
              </h2>
            </div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#FF8C42] mt-1 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-700">{t('resource1')}</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#FF8C42] mt-1 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-700">{t('resource2')}</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#FF8C42] mt-1 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-700">{t('resource3')}</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#FF8C42] mt-1 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-700">{t('resource4')}</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors md:col-span-2">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#FF8C42] mt-1 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-700">{t('resource5')}</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Final */}
      <section className="py-32 bg-gradient-to-br from-[#1F2937] via-[#111827] to-[#0F172A] text-white relative overflow-hidden" data-header-contrast="dark">
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexPatternCTAMasterclass" x="0" y="0" width="100" height="86.6" patternUnits="userSpaceOnUse">
                <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexPatternCTAMasterclass)" />
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
