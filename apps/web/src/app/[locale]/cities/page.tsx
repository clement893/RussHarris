/**
 * Cities Page
 * List of all cities with available events
 * Design aligned with home page - 4 city blocks (Toronto, Vancouver, Montréal, Calgary)
 */

'use client';

import { useState } from 'react';
import { Container, Button } from '@/components/ui';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Calendar, MapPin, Mail } from 'lucide-react';
import { microInteractions, combineAnimations } from '@/lib/animations/micro-interactions';
import { ScrollReveal } from '@/components/examples/ScrollReveal';

export default function CitiesPage() {
  const t = useTranslations('home');
  const [calgaryEmail, setCalgaryEmail] = useState('');
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white text-gray-900">
      {/* Hero Section - plus d'espace sous le header, moins entre hero et blocs */}
      <section className="relative pt-24 pb-6 md:pt-32 md:pb-10 bg-gradient-to-br from-[#1F2937] via-[#111827] to-[#0F172A]" data-header-contrast="dark">
        <Container className="max-w-7xl mx-auto">
          <div className="text-center mb-0">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              {t('citiesPageTitle')}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t('citiesPageSubtitle')}
            </p>
            <p className="text-xl text-gray-400 mt-6 max-w-3xl mx-auto">
              {t('limitedPlaces')}
            </p>
          </div>
        </Container>
      </section>

      {/* Section 4 blocs villes - espacement réduit de moitié avec le hero */}
      <section className="pt-3 pb-16 md:pt-4 md:pb-24 bg-gradient-to-b from-[#0F172A] to-[#1E293B]" data-header-contrast="dark">
        <Container className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="space-y-4 md:space-y-6">
            {/* Toronto */}
            <ScrollReveal delay={100}>
              <div className={combineAnimations(
                microInteractions.card.base,
                microInteractions.homepage.tourCard,
                "group border border-gray-700/50 bg-gradient-to-r from-gray-900/50 to-gray-800/30 rounded-2xl md:rounded-3xl p-6 md:p-8 backdrop-blur-sm"
              )}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
                <div className="flex-1 min-w-0">
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-2 group-hover:text-[#FF8C42] transition-colors break-words">
                    TORONTO
                  </h3>
                  <div className="flex items-center gap-3 md:gap-4 text-gray-400 mb-2">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                    <span className="text-sm sm:text-base md:text-lg">{t('torontoDate')}</span>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4 text-gray-400">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                    <span className="text-sm sm:text-base md:text-lg break-words">{t('torontoVenue')}</span>
                  </div>
                </div>
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-4 md:gap-4">
                  <span className="w-full md:w-auto inline-block">
                    <a
                      href="https://ipc.mylearnworlds.com/course/russ-harris-2026-toronto"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={combineAnimations(
                        microInteractions.button.base,
                        microInteractions.button.hover,
                        "inline-block text-center bg-[#FF8C42] hover:bg-[#FF7A29] text-white px-4 md:px-6 py-2.5 text-xs md:text-sm font-medium rounded-full border border-[#FF8C42]/20 w-full md:w-auto shrink-0"
                      )}
                    >
                      {t('registerCta')}
                    </a>
                  </span>
                </div>
              </div>
            </div>
            </ScrollReveal>

            {/* Vancouver */}
            <ScrollReveal delay={200}>
              <div className={combineAnimations(
                microInteractions.card.base,
                microInteractions.homepage.tourCard,
                "group border border-gray-700/50 bg-gradient-to-r from-gray-900/50 to-gray-800/30 rounded-2xl md:rounded-3xl p-6 md:p-8 backdrop-blur-sm"
              )}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
                <div className="flex-1 min-w-0">
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-2 group-hover:text-[#FF8C42] transition-colors break-words">
                    VANCOUVER
                  </h3>
                  <div className="flex items-center gap-3 md:gap-4 text-gray-400 mb-2">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                    <span className="text-sm sm:text-base md:text-lg">{t('vancouverDate')}</span>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4 text-gray-400">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                    <span className="text-sm sm:text-base md:text-lg break-words">{t('vancouverVenue')}</span>
                  </div>
                </div>
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-4 md:gap-4">
                  <span className="w-full md:w-auto inline-block">
                    <a
                      href="https://ipc.mylearnworlds.com/course/vancouver-russ-harris-neuroaffirming-act-for-adhd-autism"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={combineAnimations(
                        microInteractions.button.base,
                        microInteractions.button.hover,
                        "inline-block text-center bg-[#FF8C42] hover:bg-[#FF7A29] text-white px-4 md:px-6 py-2.5 text-xs md:text-sm font-medium rounded-full border border-[#FF8C42]/20 w-full md:w-auto shrink-0"
                      )}
                    >
                      {t('registerCta')}
                    </a>
                  </span>
                </div>
              </div>
            </div>
            </ScrollReveal>

            {/* Montréal */}
            <ScrollReveal delay={300}>
              <div className={combineAnimations(
                microInteractions.card.base,
                microInteractions.homepage.tourCard,
                "group border border-gray-700/50 bg-gradient-to-r from-gray-900/50 to-gray-800/30 rounded-2xl md:rounded-3xl p-6 md:p-8 backdrop-blur-sm"
              )}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
                <div className="flex-1 min-w-0">
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-2 group-hover:text-[#FF8C42] transition-colors break-words">
                    MONTRÉAL
                  </h3>
                  <div className="flex items-center gap-3 md:gap-4 text-gray-400 mb-2">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                    <span className="text-sm sm:text-base md:text-lg">{t('montrealDate')}</span>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4 text-gray-400">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                    <span className="text-sm sm:text-base md:text-lg break-words">{t('montrealVenue')}</span>
                  </div>
                </div>
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-4 md:gap-4">
                  <span className="w-full md:w-auto inline-block">
                    <a
                      href="https://ipc.mylearnworlds.com/course/montreal-russ-harris-neuroaffirming-act-for-adhd-autismact-neuroaffirmative-aupres-des-personnes-autistes-et-tdah"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={combineAnimations(
                        microInteractions.button.base,
                        microInteractions.button.hover,
                        "inline-block text-center bg-[#FF8C42] hover:bg-[#FF7A29] text-white px-4 md:px-6 py-2.5 text-xs md:text-sm font-medium rounded-full border border-[#FF8C42]/20 w-full md:w-auto shrink-0"
                      )}
                    >
                      {t('registerCta')}
                    </a>
                  </span>
                </div>
              </div>
            </div>
            </ScrollReveal>

            {/* Calgary (caché) */}
            <div className="hidden">
            <ScrollReveal delay={400}>
              <div className={combineAnimations(
                microInteractions.card.base,
                microInteractions.homepage.tourCard,
                "group border border-gray-700/50 bg-gradient-to-r from-gray-900/50 to-gray-800/30 rounded-2xl md:rounded-3xl p-6 md:p-8 backdrop-blur-sm"
              )}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
                <div className="flex-1 min-w-0">
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white mb-2 group-hover:text-[#FF8C42] transition-colors break-words">
                    CALGARY
                  </h3>
                  <div className="flex items-center gap-3 md:gap-4 text-gray-400 mb-2">
                    <Calendar className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                    <span className="text-sm sm:text-base md:text-lg">{t('dateComingSoon')}</span>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4 text-gray-400">
                    <Mail className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                    <span className="text-sm sm:text-base md:text-lg break-words">{t('emailNotifyText')}</span>
                  </div>
                </div>
                <div className="flex flex-col items-stretch md:items-end gap-3 w-full md:min-w-[280px] md:max-w-sm">
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="flex flex-col sm:flex-row gap-2 w-full"
                  >
                    <input
                      type="email"
                      value={calgaryEmail}
                      onChange={(e) => setCalgaryEmail(e.target.value)}
                      placeholder={t('montrealEmailPlaceholder')}
                      className="flex-1 min-w-0 px-4 py-2.5 text-sm md:text-base rounded-full border border-gray-600 bg-gray-800/80 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#FF8C42] focus:border-transparent"
                      aria-label={t('montrealEmailPlaceholder')}
                    />
                    <Button
                      type="submit"
                      className={combineAnimations(
                        microInteractions.button.base,
                        microInteractions.button.hover,
                        "bg-[#FF8C42] hover:bg-[#FF7A29] text-white px-4 md:px-6 py-2.5 text-xs md:text-sm font-medium rounded-full border border-[#FF8C42]/20 shrink-0"
                      )}
                    >
                      {t('notifySendCta')}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
            </ScrollReveal>
            </div>
          </div>
        </Container>
      </section>

      {/* Section Vous avez des questions ? - hauteur réduite de moitié */}
      <section className="py-16 bg-white" data-header-contrast="light">
        <Container className="max-w-7xl mx-auto">
          <div className="text-center py-6">
            <p className="text-gray-600 text-lg mb-6">{t('questionsCta')}</p>
            <Link href="/contact">
              <Button className="bg-[#F58220] hover:bg-[#C4681A] text-white rounded-full">
                {t('contactUs')}
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
