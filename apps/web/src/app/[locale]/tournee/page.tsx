/**
 * Tournée Page
 * Displays all cities with details like on the main page
 */

'use client';

import { Button, Container } from '@/components/ui';
import { Link } from '@/i18n/routing';
import { Calendar, MapPin } from 'lucide-react';
import { microInteractions, animationVariants, combineAnimations } from '@/lib/animations/micro-interactions';
import { ScrollReveal } from '@/components/examples/ScrollReveal';

export default function TourneePage() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white text-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-[#1F2937] via-[#111827] to-[#0F172A]">
        {/* Grille hexagonale subtile en arrière-plan */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexPatternTournee" x="0" y="0" width="100" height="86.6" patternUnits="userSpaceOnUse">
                <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexPatternTournee)" />
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

        <Container className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className={combineAnimations(
              animationVariants.hero.title,
              "text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 leading-none text-white tracking-tight"
            )}>
              LA TOURNÉE
            </h1>
            <p className={combineAnimations(
              animationVariants.hero.subtitle,
              "text-xl md:text-2xl font-light text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto"
            )}>
              Découvrez toutes les dates et lieux de la masterclass ACT avec Dr. Russ Harris
            </p>
          </div>
        </Container>
      </section>

      {/* Cities Section */}
      <section className="py-16 md:py-32 bg-gradient-to-br from-[#1F2937] via-[#111827] to-[#0F172A]">
        <Container className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="space-y-6 md:space-y-8">
            {/* Montréal */}
            <ScrollReveal delay={0}>
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
                      <span className="text-sm sm:text-base md:text-lg">24-25 mai 2026</span>
                    </div>
                    <div className="flex items-center gap-3 md:gap-4 text-gray-400">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <span className="text-sm sm:text-base md:text-lg break-words">Palais des Congrès</span>
                    </div>
                  </div>
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-4 md:gap-4">
                    <span className="text-xl md:text-2xl font-bold text-[#FF8C42]">200 places</span>
                    <Link href="/montreal" className="w-full md:w-auto">
                      <Button className={combineAnimations(
                        microInteractions.button.base,
                        microInteractions.button.hover,
                        "bg-[#FF8C42] hover:bg-[#FF7A29] text-white px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-medium rounded-full border border-[#FF8C42]/20 w-full md:w-auto"
                      )}>
                        Inscription Montréal
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Calgary */}
            <ScrollReveal delay={200}>
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
                      <span className="text-sm sm:text-base md:text-lg">31 mai - 1 juin 2026</span>
                    </div>
                    <div className="flex items-center gap-3 md:gap-4 text-gray-400">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <span className="text-sm sm:text-base md:text-lg break-words">Calgary Convention Centre</span>
                    </div>
                  </div>
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-4 md:gap-4">
                    <span className="text-xl md:text-2xl font-bold text-[#FF8C42]">200 places</span>
                    <Link href="/calgary" className="w-full md:w-auto">
                      <Button className={combineAnimations(
                        microInteractions.button.base,
                        microInteractions.button.hover,
                        "bg-[#FF8C42] hover:bg-[#FF7A29] text-white px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-medium rounded-full border border-[#FF8C42]/20 w-full md:w-auto"
                      )}>
                        Inscription Calgary
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Vancouver */}
            <ScrollReveal delay={300}>
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
                      <span className="text-sm sm:text-base md:text-lg">7-8 juin 2026</span>
                    </div>
                    <div className="flex items-center gap-3 md:gap-4 text-gray-400">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <span className="text-sm sm:text-base md:text-lg break-words">Vancouver Convention Centre</span>
                    </div>
                  </div>
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-4 md:gap-4">
                    <span className="text-xl md:text-2xl font-bold text-[#FF8C42]">200 places</span>
                    <Link href="/vancouver" className="w-full md:w-auto">
                      <Button className={combineAnimations(
                        microInteractions.button.base,
                        microInteractions.button.hover,
                        "bg-[#FF8C42] hover:bg-[#FF7A29] text-white px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-medium rounded-full border border-[#FF8C42]/20 w-full md:w-auto"
                      )}>
                        Inscription Vancouver
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Toronto */}
            <ScrollReveal delay={400}>
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
                      <span className="text-sm sm:text-base md:text-lg">14-15 juin 2026</span>
                    </div>
                    <div className="flex items-center gap-3 md:gap-4 text-gray-400">
                      <MapPin className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                      <span className="text-sm sm:text-base md:text-lg break-words">Metro Toronto Convention Centre</span>
                    </div>
                  </div>
                  <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-start gap-4 md:gap-4">
                    <span className="text-xl md:text-2xl font-bold text-[#FF8C42]">200 places</span>
                    <Link href="/toronto" className="w-full md:w-auto">
                      <Button className={combineAnimations(
                        microInteractions.button.base,
                        microInteractions.button.hover,
                        "bg-[#FF8C42] hover:bg-[#FF7A29] text-white px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-medium rounded-full border border-[#FF8C42]/20 w-full md:w-auto"
                      )}>
                        Inscription Toronto
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>
    </div>
  );
}
