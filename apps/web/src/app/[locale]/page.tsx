'use client';

import Image from 'next/image';
import { Button, Container } from '@/components/ui';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Calendar, MapPin, Circle, Hexagon, Heart, Stethoscope, Users, Brain } from 'lucide-react';
import { microInteractions, animationVariants, combineAnimations } from '@/lib/animations/micro-interactions';
import { ScrollReveal } from '@/components/examples/ScrollReveal';

export default function HomePage() {
  const t = useTranslations('home');
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white text-gray-900">
      {/* Hero Section - Avec gris anthracite élégant */}
      <section className="relative min-h-screen flex items-center overflow-hidden py-12 md:py-20 bg-gradient-to-br from-[#1F2937] via-[#111827] to-[#0F172A]">
        {/* Grille hexagonale subtile en arrière-plan */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexPattern" x="0" y="0" width="100" height="86.6" patternUnits="userSpaceOnUse">
                <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexPattern)" />
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
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            {/* Colonne gauche - Contenu principal */}
            <div className="text-center md:text-left">
              <h1 className={combineAnimations(
                animationVariants.hero.title,
                "text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-4 leading-none text-white tracking-tight"
              )}>
                RUSS
                <br />
                HARRIS
              </h1>
              <div className={combineAnimations(
                animationVariants.hero.subtitle,
                "inline-block border border-[#FF8C42]/40 text-[#FF8C42] px-4 py-1.5 text-xs font-medium mb-6 md:mb-8 tracking-widest rounded-full backdrop-blur-sm bg-white/5"
              )}>
                {t('tourBadge')}
              </div>
              <p className={combineAnimations(
                animationVariants.hero.subtitle,
                "text-2xl sm:text-3xl md:text-4xl font-light text-white mb-6 md:mb-8 leading-tight"
              )}>
                {t('heroTitle')}
              </p>
              <p className={combineAnimations(
                animationVariants.hero.cta,
                "text-base sm:text-lg text-gray-300 mb-6 leading-relaxed max-w-xl mx-auto md:mx-0"
              )}>
                {t('heroDescription')}
              </p>
              
              {/* Citation emblématique */}
              <div className={combineAnimations(
                animationVariants.hero.cta,
                "border-l-2 border-[#FF8C42]/60 pl-4 md:pl-6 mb-8 md:mb-10 italic text-gray-400 text-sm md:text-base"
              )}>
                "{t('quote')}"
                <span className="block text-xs not-italic text-gray-500 mt-2">{t('quoteAuthor')}</span>
              </div>

              <Button 
                size="lg" 
                className={combineAnimations(
                  animationVariants.hero.cta,
                  microInteractions.button.glow,
                  microInteractions.button.hover,
                  "bg-[#FF8C42] hover:bg-[#FF7A29] text-white font-medium text-sm px-6 md:px-8 py-3 rounded-full border border-[#FF8C42]/20 w-full sm:w-auto"
                )}
              >
                {t('discoverDates')}
              </Button>
            </div>

            {/* Colonne droite - Photo avec forme hexagonale subtile */}
            <div className="flex items-center justify-center mt-8 md:mt-0">
              <div className="relative w-full max-w-sm md:max-w-md lg:max-w-lg">
                {/* Hexagone décoratif en arrière-plan */}
                <div className="absolute inset-0 -z-10 scale-110 opacity-10 hidden md:block">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <polygon points="50,2 95,27 95,73 50,98 5,73 5,27" fill="none" stroke="#FF8C42" strokeWidth="0.3"/>
                  </svg>
                </div>
                <div className={combineAnimations(
                  microInteractions.homepage.heroImage,
                  "relative w-full aspect-[3/4] max-h-[500px] md:max-h-[600px] rounded-2xl md:rounded-3xl overflow-hidden border-2 border-[#FF8C42]/30 ring-2 ring-white/5"
                )}>
                  <Image
                    src="/images/russ/8obb1myXAohZ.jpg"
                    alt="Dr. Russ Harris"
                    fill
                    style={{ objectFit: 'cover' }}
                    className=""
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section Dates de Tournée - Fond foncé élégant */}
      <section className="py-16 md:py-32 bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
        <Container className="max-w-7xl mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">{t('tourTitle')}</h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-400">{t('tourSubtitle')}</p>
            </div>
          </ScrollReveal>

          <div className="space-y-4 md:space-y-6">
            {/* Montréal */}
            <ScrollReveal delay={100}>
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
                  <span className="text-xl md:text-2xl font-bold text-[#FF8C42]">200 {t('places')}</span>
                  <Link href="/montreal" className="w-full md:w-auto">
                    <Button className={combineAnimations(
                      microInteractions.button.base,
                      microInteractions.button.hover,
                      "bg-[#FF8C42] hover:bg-[#FF7A29] text-white px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-medium rounded-full border border-[#FF8C42]/20 w-full md:w-auto"
                    )}>
                      {t('registerMontreal')}
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
                  <span className="text-xl md:text-2xl font-bold text-[#FF8C42]">200 {t('places')}</span>
                  <Link href="/calgary" className="w-full md:w-auto">
                    <Button className={combineAnimations(
                      microInteractions.button.base,
                      microInteractions.button.hover,
                      "bg-[#FF8C42] hover:bg-[#FF7A29] text-white px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-medium rounded-full border border-[#FF8C42]/20 w-full md:w-auto"
                    )}>
                      {t('registerCalgary')}
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
                  <span className="text-xl md:text-2xl font-bold text-[#FF8C42]">200 {t('places')}</span>
                  <Link href="/vancouver" className="w-full md:w-auto">
                    <Button className={combineAnimations(
                      microInteractions.button.base,
                      microInteractions.button.hover,
                      "bg-[#FF8C42] hover:bg-[#FF7A29] text-white px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-medium rounded-full border border-[#FF8C42]/20 w-full md:w-auto"
                    )}>
                      {t('registerVancouver')}
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
                  <span className="text-xl md:text-2xl font-bold text-[#FF8C42]">200 {t('places')}</span>
                  <Link href="/toronto" className="w-full md:w-auto">
                    <Button className={combineAnimations(
                      microInteractions.button.base,
                      microInteractions.button.hover,
                      "bg-[#FF8C42] hover:bg-[#FF7A29] text-white px-4 md:px-6 py-2 md:py-2.5 text-xs md:text-sm font-medium rounded-full border border-[#FF8C42]/20 w-full md:w-auto"
                    )}>
                      {t('registerToronto')}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Section L'homme derrière l'ACT */}
      <section className="py-16 md:py-32 bg-white">
        <Container className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-5 gap-8 md:gap-12 items-center">
            {/* Photo avec effet hexagonal */}
            <div className="md:col-span-2">
              <div className="relative">
                {/* Hexagones décoratifs */}
                <div className="absolute -top-4 md:-top-8 -left-4 md:-left-8 w-16 md:w-24 h-16 md:h-24 opacity-5">
                  <Hexagon className="w-full h-full text-[#FF8C42]" />
                </div>
                <div className="absolute -bottom-4 md:-bottom-8 -right-4 md:-right-8 w-20 md:w-32 h-20 md:h-32 opacity-5">
                  <Hexagon className="w-full h-full text-gray-900" />
                </div>
                
                <div className="relative w-full aspect-[3/4] rounded-2xl md:rounded-3xl overflow-hidden">
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
            <div className="md:col-span-3">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
                {t('aboutTitle')}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 md:mb-8 leading-relaxed">
                {t('aboutDescription1')}
              </p>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 md:mb-8 leading-relaxed">
                {t('aboutDescription2')}
              </p>
              
              {/* Stats avec design épuré */}
              <div className="grid grid-cols-3 gap-4 md:gap-6 pt-6 md:pt-8 border-t border-[#FF8C42]/20">
                <ScrollReveal delay={100}>
                  <div>
                    <div className={combineAnimations(
                      microInteractions.homepage.statNumber,
                      "text-2xl sm:text-3xl md:text-4xl font-bold text-[#FF8C42] mb-1"
                    )}>90K+</div>
                    <div className="text-xs sm:text-sm text-gray-600">{t('statsTrained')}</div>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={200}>
                  <div>
                    <div className={combineAnimations(
                      microInteractions.homepage.statNumber,
                      "text-2xl sm:text-3xl md:text-4xl font-bold text-[#FF8C42] mb-1"
                    )}>1M+</div>
                    <div className="text-xs sm:text-sm text-gray-600">{t('statsBooks')}</div>
                  </div>
                </ScrollReveal>
                <ScrollReveal delay={300}>
                  <div>
                    <div className={combineAnimations(
                      microInteractions.homepage.statNumber,
                      "text-2xl sm:text-3xl md:text-4xl font-bold text-[#FF8C42] mb-1"
                    )}>30</div>
                    <div className="text-xs sm:text-sm text-gray-600">{t('statsLanguages')}</div>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section Hexaflex - Design interactif et visuel */}
      <section className="py-16 md:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Grille hexagonale très subtile en arrière-plan */}
        <div className="absolute inset-0 opacity-[0.015]">
          <svg className="w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexPatternSection" x="0" y="0" width="100" height="86.6" patternUnits="userSpaceOnUse">
                <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" fill="none" stroke="#1F2937" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexPatternSection)" />
          </svg>
        </div>

        <Container className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
              {t('hexaflexTitle')}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              {t('hexaflexDescription')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {/* Processus 1 */}
            <div className="group bg-gradient-to-br from-[#1F2937] to-[#111827] rounded-2xl md:rounded-3xl p-6 md:p-8 text-white hover:scale-105 transition-transform relative overflow-hidden">
              {/* Hexagone décoratif au hover */}
              <div className="absolute -top-6 md:-top-10 -right-6 md:-right-10 w-20 md:w-32 h-20 md:h-32 opacity-0 group-hover:opacity-10 transition-opacity">
                <Hexagon className="w-full h-full text-[#FF8C42]" />
              </div>
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4 relative z-10">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FF8C42] flex items-center justify-center flex-shrink-0">
                  <Circle className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <span className="text-xs font-medium text-[#FF8C42]">01</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">{t('process1Title')}</h3>
              <p className="text-gray-300 leading-relaxed text-xs md:text-sm">
                {t('process1Description')}
              </p>
            </div>

            {/* Processus 2 */}
            <div className="group bg-gradient-to-br from-[#1F2937] to-[#111827] rounded-2xl md:rounded-3xl p-6 md:p-8 text-white hover:scale-105 transition-transform relative overflow-hidden">
              <div className="absolute -top-6 md:-top-10 -right-6 md:-right-10 w-20 md:w-32 h-20 md:h-32 opacity-0 group-hover:opacity-10 transition-opacity">
                <Hexagon className="w-full h-full text-[#FF8C42]" />
              </div>
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4 relative z-10">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FF8C42] flex items-center justify-center flex-shrink-0">
                  <Circle className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <span className="text-xs font-medium text-[#FF8C42]">02</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">{t('process2Title')}</h3>
              <p className="text-gray-300 leading-relaxed text-xs md:text-sm">
                {t('process2Description')}
              </p>
            </div>

            {/* Processus 3 */}
            <div className="group bg-gradient-to-br from-[#1F2937] to-[#111827] rounded-2xl md:rounded-3xl p-6 md:p-8 text-white hover:scale-105 transition-transform relative overflow-hidden">
              <div className="absolute -top-6 md:-top-10 -right-6 md:-right-10 w-20 md:w-32 h-20 md:h-32 opacity-0 group-hover:opacity-10 transition-opacity">
                <Hexagon className="w-full h-full text-[#FF8C42]" />
              </div>
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4 relative z-10">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FF8C42] flex items-center justify-center flex-shrink-0">
                  <Circle className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <span className="text-xs font-medium text-[#FF8C42]">03</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">{t('process3Title')}</h3>
              <p className="text-gray-300 leading-relaxed text-xs md:text-sm">
                {t('process3Description')}
              </p>
            </div>

            {/* Processus 4 */}
            <div className="group bg-gradient-to-br from-[#1F2937] to-[#111827] rounded-2xl md:rounded-3xl p-6 md:p-8 text-white hover:scale-105 transition-transform relative overflow-hidden">
              <div className="absolute -top-6 md:-top-10 -right-6 md:-right-10 w-20 md:w-32 h-20 md:h-32 opacity-0 group-hover:opacity-10 transition-opacity">
                <Hexagon className="w-full h-full text-[#FF8C42]" />
              </div>
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4 relative z-10">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FF8C42] flex items-center justify-center flex-shrink-0">
                  <Circle className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <span className="text-xs font-medium text-[#FF8C42]">04</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">{t('process4Title')}</h3>
              <p className="text-gray-300 leading-relaxed text-xs md:text-sm">
                {t('process4Description')}
              </p>
            </div>

            {/* Processus 5 */}
            <div className="group bg-gradient-to-br from-[#1F2937] to-[#111827] rounded-2xl md:rounded-3xl p-6 md:p-8 text-white hover:scale-105 transition-transform relative overflow-hidden">
              <div className="absolute -top-6 md:-top-10 -right-6 md:-right-10 w-20 md:w-32 h-20 md:h-32 opacity-0 group-hover:opacity-10 transition-opacity">
                <Hexagon className="w-full h-full text-[#FF8C42]" />
              </div>
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4 relative z-10">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FF8C42] flex items-center justify-center flex-shrink-0">
                  <Circle className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <span className="text-xs font-medium text-[#FF8C42]">05</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">{t('process5Title')}</h3>
              <p className="text-gray-300 leading-relaxed text-xs md:text-sm">
                {t('process5Description')}
              </p>
            </div>

            {/* Processus 6 */}
            <div className="group bg-gradient-to-br from-[#1F2937] to-[#111827] rounded-2xl md:rounded-3xl p-6 md:p-8 text-white hover:scale-105 transition-transform relative overflow-hidden">
              <div className="absolute -top-6 md:-top-10 -right-6 md:-right-10 w-20 md:w-32 h-20 md:h-32 opacity-0 group-hover:opacity-10 transition-opacity">
                <Hexagon className="w-full h-full text-[#FF8C42]" />
              </div>
              <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4 relative z-10">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#FF8C42] flex items-center justify-center flex-shrink-0">
                  <Circle className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <span className="text-xs font-medium text-[#FF8C42]">06</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">{t('process6Title')}</h3>
              <p className="text-gray-300 leading-relaxed text-xs md:text-sm">
                {t('process6Description')}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Section Pour qui - Design amélioré avec cartes gradient */}
      <section className="py-16 md:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Grille hexagonale subtile en arrière-plan */}
        <div className="absolute inset-0 opacity-[0.015]">
          <svg className="w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexPatternProfessionals" x="0" y="0" width="100" height="86.6" patternUnits="userSpaceOnUse">
                <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" fill="none" stroke="#1F2937" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexPatternProfessionals)" />
          </svg>
        </div>

        <Container className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
              {t('professionalsTitle')}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              {t('professionalsDescription')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {/* Psychothérapeutes */}
            <div className="group relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-200 hover:border-[#FF8C42]/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#FF8C42]/10 min-w-0">
              {/* Hexagone décoratif au hover */}
              <div className="absolute -top-4 md:-top-6 -right-4 md:-right-6 w-16 md:w-20 h-16 md:h-20 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                <Hexagon className="w-full h-full text-[#FF8C42]" />
              </div>
              
              {/* Icône avec fond gradient */}
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#FF8C42] to-[#FF7A29] flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 group-hover:text-[#FF8C42] transition-colors break-words hyphens-auto">
                {t('professional1Title')}
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {t('professional1Description')}
              </p>
            </div>

            {/* Médecins */}
            <div className="group relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-200 hover:border-[#FF8C42]/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#FF8C42]/10 min-w-0">
              <div className="absolute -top-4 md:-top-6 -right-4 md:-right-6 w-16 md:w-20 h-16 md:h-20 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                <Hexagon className="w-full h-full text-[#FF8C42]" />
              </div>
              
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#FF8C42] to-[#FF7A29] flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Stethoscope className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 group-hover:text-[#FF8C42] transition-colors break-words">
                {t('professional2Title')}
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {t('professional2Description')}
              </p>
            </div>

            {/* Conseillers */}
            <div className="group relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-200 hover:border-[#FF8C42]/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#FF8C42]/10 min-w-0">
              <div className="absolute -top-4 md:-top-6 -right-4 md:-right-6 w-16 md:w-20 h-16 md:h-20 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                <Hexagon className="w-full h-full text-[#FF8C42]" />
              </div>
              
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#FF8C42] to-[#FF7A29] flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Brain className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 group-hover:text-[#FF8C42] transition-colors break-words">
                {t('professional3Title')}
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {t('professional3Description')}
              </p>
            </div>

            {/* Coachs */}
            <div className="group relative bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-200 hover:border-[#FF8C42]/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#FF8C42]/10 min-w-0">
              <div className="absolute -top-4 md:-top-6 -right-4 md:-right-6 w-16 md:w-20 h-16 md:h-20 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                <Hexagon className="w-full h-full text-[#FF8C42]" />
              </div>
              
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-gradient-to-br from-[#FF8C42] to-[#FF7A29] flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-3 md:mb-4 group-hover:text-[#FF8C42] transition-colors break-words">
                {t('professional4Title')}
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {t('professional4Description')}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Section Témoignages */}
      <section className="py-16 md:py-32 bg-gray-50">
        <Container className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6">
              {t('testimonialsTitle')}
            </h2>
          </div>

          <div className="space-y-6 md:space-y-8">
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 border-l-2 border-[#FF8C42]">
              <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-4 md:mb-6 leading-relaxed italic">
                "{t('testimonial1')}"
              </p>
              <div className="flex items-center gap-4">
                <div>
                  <div className="font-bold text-gray-900 text-sm md:text-base">{t('testimonial1Author')}</div>
                  <div className="text-xs md:text-sm text-gray-600">{t('testimonial1Role')}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 border-l-2 border-[#FF8C42]">
              <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-4 md:mb-6 leading-relaxed italic">
                "{t('testimonial2')}"
              </p>
              <div className="flex items-center gap-4">
                <div>
                  <div className="font-bold text-gray-900 text-sm md:text-base">{t('testimonial2Author')}</div>
                  <div className="text-xs md:text-sm text-gray-600">{t('testimonial2Role')}</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Final - Avec grille hexagonale */}
      <section className="py-16 md:py-32 bg-gradient-to-br from-[#1F2937] via-[#111827] to-[#0F172A] text-white relative overflow-hidden">
        {/* Grille hexagonale */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexPatternCTA" x="0" y="0" width="100" height="86.6" patternUnits="userSpaceOnUse">
                <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexPatternCTA)" />
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

        <Container className="max-w-5xl mx-auto text-center relative z-10 px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 md:mb-8">
            {t('ctaTitle')}
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-3 md:mb-4">
            {t('ctaSubtitle')}
          </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-8 md:mb-12">
            {t('ctaDescription')}
          </p>
          <Button 
            size="lg" 
            className={combineAnimations(
              microInteractions.button.base,
              microInteractions.button.glow,
              microInteractions.button.hover,
              "bg-[#FF8C42] hover:bg-[#FF7A29] text-white font-medium text-sm md:text-base px-6 md:px-10 py-3 md:py-4 rounded-full border border-[#FF8C42]/20 w-full sm:w-auto"
            )}
          >
            {t('ctaButton')}
          </Button>
        </Container>
      </section>

      {/* Section Organisateur */}
      <section className="py-12 md:py-16 bg-white border-t border-gray-200">
        <Container className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center gap-4 md:gap-6">
            <p className="text-xs md:text-sm text-gray-500 uppercase tracking-wider">{t('organizerLabel')}</p>
            <div className="relative w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] h-[60px] sm:h-[80px] md:h-[100px] opacity-80 hover:opacity-100 transition-opacity">
              <Image
                src="/images/ips-logo.png"
                alt="Institut de psychologie contextuelle"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
