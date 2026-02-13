/**
 * Masterclass Programme Page
 * Detailed description of the 2-day masterclass program
 */

'use client';

import { Button, Container } from '@/components/ui';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { BookOpen, CheckCircle, Info } from 'lucide-react';

export default function MasterclassPage() {
  const t = useTranslations('masterclass');
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white text-gray-900">
      {/* Hero Section - Avec gris anthracite élégant */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden pt-24 pb-20 md:py-20 bg-gradient-to-br from-[#1F2937] via-[#111827] to-[#0F172A]" data-header-contrast="dark">
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
            {t('programSubtitle') ? (
              <p className="text-xl md:text-2xl font-medium text-[#FF8C42] mb-6 leading-relaxed max-w-3xl mx-auto">
                {t('programSubtitle')}
              </p>
            ) : null}
            <p className="text-xl md:text-2xl text-white mb-10 leading-relaxed max-w-5xl mx-auto">
              {t('description3')}
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

      {/* Program content - right after hero */}
      <section className="py-16 md:py-24 bg-white" data-header-contrast="light">
        <Container className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('whatsInvolvedTitle')}</h2>
            <p className="text-lg leading-relaxed">{t('programIntro1')}</p>
            <p className="text-lg">{t('whatsInvolvedIntro')}</p>
            <ul className="grid sm:grid-cols-2 gap-3 list-none pl-0 mt-6">
              {([1, 2, 3, 4, 5, 6, 7] as const).map((i) => (
                <li key={i} className="flex items-start gap-2 p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <CheckCircle className="w-5 h-5 text-[#FF8C42] flex-shrink-0 mt-0.5" aria-hidden />
                  <span>{t(`whatsInvolved${i}`)}</span>
                </li>
              ))}
            </ul>

            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-16 mb-4">{t('youWillLearnTitle')}</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {([1, 2, 3, 8, 5, 6, 7, 4, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18] as const).map((i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <CheckCircle className="w-5 h-5 text-[#FF8C42] flex-shrink-0 mt-0.5" aria-hidden />
                  <span>{t(`youWillLearn${i}`)}</span>
                </div>
              ))}
            </div>
            <p className="text-lg font-medium text-[#FF8C42] mt-2">{t('youWillLearnMore')}</p>

            <div className="flex justify-center my-12">
              <span className="inline-flex items-center px-6 py-3 rounded-full bg-[#FF8C42]/10 text-[#FF8C42] font-semibold text-lg border border-[#FF8C42]/30">
                {t('cpdHours')}
              </span>
            </div>

            <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-3">{t('whoAttendTitle')}</h3>
            <p className="text-lg">{t('programClosing')} {t('whoAttendText')}</p>
            <p className="text-lg mt-4">{t('whoAttendRecommend')}</p>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-200 mt-8">
              <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" aria-hidden />
              <div>
                <p className="font-semibold text-gray-900 m-0 mb-1">{t('prereqNote')}</p>
                <p className="text-gray-800 m-0">{t('diagnosisNote')}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section Ressources Incluses */}
      <section className="pt-4 pb-16 bg-white" data-header-contrast="light">
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
      <section className="pt-16 pb-32 bg-gradient-to-br from-[#1F2937] via-[#111827] to-[#0F172A] text-white relative overflow-hidden" data-header-contrast="dark">
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
