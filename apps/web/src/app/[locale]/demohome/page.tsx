'use client';

import Image from 'next/image';
import { Button, Container } from '@/components/ui';
import { ArrowRight, Calendar, MapPin, Circle, Hexagon } from 'lucide-react';

export default function DemoHomePage() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white text-gray-900">
      {/* Hero Section - Avec gris anthracite élégant */}
      <section className="relative min-h-screen flex items-center overflow-hidden py-20 bg-gradient-to-br from-[#1F2937] via-[#111827] to-[#0F172A]">
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

        <Container className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Colonne gauche - Contenu principal */}
            <div>
              <h1 className="text-6xl md:text-8xl font-bold mb-4 leading-none text-white tracking-tight">
                RUSS
                <br />
                HARRIS
              </h1>
              <div className="inline-block border border-[#FF8C42]/40 text-[#FF8C42] px-5 py-1.5 text-xs font-medium mb-8 tracking-widest rounded-full backdrop-blur-sm bg-white/5">
                TOURNÉE CANADIENNE 2026
              </div>
              <p className="text-3xl md:text-4xl font-light text-white mb-8 leading-tight">
                Maîtrisez la flexibilité psychologique avec l'ACT
              </p>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed max-w-xl">
                Deux jours intensifs pour découvrir la Thérapie d'Acceptation et d'Engagement avec l'un des formateurs les plus respectés au monde. Apprenez à intégrer la pleine conscience, les valeurs et l'action engagée dans votre pratique clinique.
              </p>
              
              {/* Citation emblématique */}
              <div className="border-l-2 border-[#FF8C42]/60 pl-6 mb-10 italic text-gray-400 text-base">
                "Embrace your demons and follow your heart"
                <span className="block text-xs not-italic text-gray-500 mt-2">— Dr. Russ Harris</span>
              </div>

              <Button 
                size="lg" 
                className="bg-[#FF8C42] hover:bg-[#FF7A29] text-white font-medium text-sm px-8 py-3 rounded-full transition-all hover:scale-105 border border-[#FF8C42]/20"
              >
                Découvrir les dates
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>

            {/* Colonne droite - Photo avec forme hexagonale subtile */}
            <div className="flex items-center justify-center">
              <div className="relative">
                {/* Hexagone décoratif en arrière-plan */}
                <div className="absolute inset-0 -z-10 scale-110 opacity-10">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <polygon points="50,2 95,27 95,73 50,98 5,73 5,27" fill="none" stroke="#FF8C42" strokeWidth="0.3"/>
                  </svg>
                </div>
                <div className="relative w-96 h-[600px] rounded-3xl overflow-hidden border-2 border-[#FF8C42]/30 ring-2 ring-white/5">
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
      <section className="py-32 bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
        <Container className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-4">La tournée canadienne</h2>
            <p className="text-xl text-gray-400">4 villes • 800 places • Mai-Juin 2026</p>
          </div>

          <div className="space-y-6">
            {/* Montréal */}
            <div className="group border border-gray-700/50 bg-gradient-to-r from-gray-900/50 to-gray-800/30 rounded-3xl p-8 hover:border-[#FF8C42]/50 transition-all duration-300 hover:scale-[1.01] backdrop-blur-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-6xl md:text-7xl font-black text-white mb-2 group-hover:text-[#FF8C42] transition-colors">
                    MONTRÉAL
                  </h3>
                  <div className="flex items-center gap-4 text-gray-400 mb-2">
                    <Calendar className="w-5 h-5" />
                    <span className="text-lg">24-25 mai 2026</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-400">
                    <MapPin className="w-5 h-5" />
                    <span className="text-lg">Palais des Congrès</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-4">
                  <span className="text-2xl font-bold text-[#FF8C42]">200 places</span>
                  <Button className="bg-[#FF8C42] hover:bg-[#FF7A29] text-white px-6 py-2.5 text-sm font-medium rounded-full transition-all border border-[#FF8C42]/20">
                    Inscription Montréal
                  </Button>
                </div>
              </div>
            </div>

            {/* Calgary */}
            <div className="group border border-gray-700/50 bg-gradient-to-r from-gray-900/50 to-gray-800/30 rounded-3xl p-8 hover:border-[#FF8C42]/50 transition-all duration-300 hover:scale-[1.01] backdrop-blur-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-6xl md:text-7xl font-black text-white mb-2 group-hover:text-[#FF8C42] transition-colors">
                    CALGARY
                  </h3>
                  <div className="flex items-center gap-4 text-gray-400 mb-2">
                    <Calendar className="w-5 h-5" />
                    <span className="text-lg">31 mai - 1 juin 2026</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-400">
                    <MapPin className="w-5 h-5" />
                    <span className="text-lg">Calgary Convention Centre</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-4">
                  <span className="text-2xl font-bold text-[#FF8C42]">200 places</span>
                  <Button className="bg-[#FF8C42] hover:bg-[#FF7A29] text-white px-6 py-2.5 text-sm font-medium rounded-full transition-all border border-[#FF8C42]/20">
                    Inscription Calgary
                  </Button>
                </div>
              </div>
            </div>

            {/* Vancouver */}
            <div className="group border border-gray-700/50 bg-gradient-to-r from-gray-900/50 to-gray-800/30 rounded-3xl p-8 hover:border-[#FF8C42]/50 transition-all duration-300 hover:scale-[1.01] backdrop-blur-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-6xl md:text-7xl font-black text-white mb-2 group-hover:text-[#FF8C42] transition-colors">
                    VANCOUVER
                  </h3>
                  <div className="flex items-center gap-4 text-gray-400 mb-2">
                    <Calendar className="w-5 h-5" />
                    <span className="text-lg">7-8 juin 2026</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-400">
                    <MapPin className="w-5 h-5" />
                    <span className="text-lg">Vancouver Convention Centre</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-4">
                  <span className="text-2xl font-bold text-[#FF8C42]">200 places</span>
                  <Button className="bg-[#FF8C42] hover:bg-[#FF7A29] text-white px-6 py-2.5 text-sm font-medium rounded-full transition-all border border-[#FF8C42]/20">
                    Inscription Vancouver
                  </Button>
                </div>
              </div>
            </div>

            {/* Toronto */}
            <div className="group border border-gray-700/50 bg-gradient-to-r from-gray-900/50 to-gray-800/30 rounded-3xl p-8 hover:border-[#FF8C42]/50 transition-all duration-300 hover:scale-[1.01] backdrop-blur-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex-1">
                  <h3 className="text-6xl md:text-7xl font-black text-white mb-2 group-hover:text-[#FF8C42] transition-colors">
                    TORONTO
                  </h3>
                  <div className="flex items-center gap-4 text-gray-400 mb-2">
                    <Calendar className="w-5 h-5" />
                    <span className="text-lg">14-15 juin 2026</span>
                  </div>
                  <div className="flex items-center gap-4 text-gray-400">
                    <MapPin className="w-5 h-5" />
                    <span className="text-lg">Metro Toronto Convention Centre</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-4">
                  <span className="text-2xl font-bold text-[#FF8C42]">200 places</span>
                  <Button className="bg-[#FF8C42] hover:bg-[#FF7A29] text-white px-6 py-2.5 text-sm font-medium rounded-full transition-all border border-[#FF8C42]/20">
                    Inscription Toronto
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section L'homme derrière l'ACT */}
      <section className="py-32 bg-white">
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
            <div className="md:col-span-3">
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                L'homme derrière <span className="text-[#FF8C42] italic">l'ACT</span>
              </h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Dr. Russ Harris est médecin, psychothérapeute et l'un des formateurs ACT les plus respectés au monde. Auteur du best-seller international "The Happiness Trap", traduit en plus de 30 langues, il a formé plus de 90 000 professionnels de la santé mentale à travers le monde.
              </p>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Son approche unique combine rigueur scientifique et accessibilité pratique, rendant les concepts complexes de l'ACT immédiatement applicables en contexte clinique.
              </p>
              
              {/* Stats avec design épuré */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-[#FF8C42]/20">
                <div>
                  <div className="text-4xl font-bold text-[#FF8C42] mb-1">90K+</div>
                  <div className="text-sm text-gray-600">Professionnels formés</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#FF8C42] mb-1">1M+</div>
                  <div className="text-sm text-gray-600">Livres vendus</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-[#FF8C42] mb-1">30</div>
                  <div className="text-sm text-gray-600">Langues</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section Hexaflex - Design interactif et visuel */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
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

        <Container className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Le modèle Hexaflex
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              L'ACT repose sur six processus fondamentaux qui cultivent la flexibilité psychologique, permettant de vivre une vie riche et pleine de sens malgré les difficultés inévitables.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Processus 1 */}
            <div className="group bg-gradient-to-br from-[#1F2937] to-[#111827] rounded-3xl p-8 text-white hover:scale-105 transition-transform relative overflow-hidden">
              {/* Hexagone décoratif au hover */}
              <div className="absolute -top-10 -right-10 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity">
                <Hexagon className="w-full h-full text-[#FF8C42]" />
              </div>
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#FF8C42] flex items-center justify-center">
                  <Circle className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-[#FF8C42]">01</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Moment présent</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                Être pleinement conscient et connecté à l'ici et maintenant, plutôt que perdu dans les pensées du passé ou du futur.
              </p>
            </div>

            {/* Processus 2 */}
            <div className="group bg-gradient-to-br from-[#1F2937] to-[#111827] rounded-3xl p-8 text-white hover:scale-105 transition-transform relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity">
                <Hexagon className="w-full h-full text-[#FF8C42]" />
              </div>
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#FF8C42] flex items-center justify-center">
                  <Circle className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-[#FF8C42]">02</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Acceptation</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                Accueillir les pensées et émotions difficiles sans lutter contre elles, libérant ainsi de l'énergie pour l'action.
              </p>
            </div>

            {/* Processus 3 */}
            <div className="group bg-gradient-to-br from-[#1F2937] to-[#111827] rounded-3xl p-8 text-white hover:scale-105 transition-transform relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity">
                <Hexagon className="w-full h-full text-[#FF8C42]" />
              </div>
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#FF8C42] flex items-center justify-center">
                  <Circle className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-[#FF8C42]">03</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Défusion cognitive</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                Observer les pensées comme des événements mentaux plutôt que des vérités absolues, réduisant leur emprise.
              </p>
            </div>

            {/* Processus 4 */}
            <div className="group bg-gradient-to-br from-[#1F2937] to-[#111827] rounded-3xl p-8 text-white hover:scale-105 transition-transform relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity">
                <Hexagon className="w-full h-full text-[#FF8C42]" />
              </div>
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#FF8C42] flex items-center justify-center">
                  <Circle className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-[#FF8C42]">04</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Soi comme contexte</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                Développer une perspective transcendante, le "soi observateur" qui peut accueillir toutes les expériences.
              </p>
            </div>

            {/* Processus 5 */}
            <div className="group bg-gradient-to-br from-[#1F2937] to-[#111827] rounded-3xl p-8 text-white hover:scale-105 transition-transform relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity">
                <Hexagon className="w-full h-full text-[#FF8C42]" />
              </div>
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#FF8C42] flex items-center justify-center">
                  <Circle className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-[#FF8C42]">05</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Valeurs</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                Clarifier ce qui compte vraiment dans la vie et utiliser ces valeurs comme boussole pour guider l'action.
              </p>
            </div>

            {/* Processus 6 */}
            <div className="group bg-gradient-to-br from-[#1F2937] to-[#111827] rounded-3xl p-8 text-white hover:scale-105 transition-transform relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity">
                <Hexagon className="w-full h-full text-[#FF8C42]" />
              </div>
              <div className="flex items-center gap-4 mb-4 relative z-10">
                <div className="w-12 h-12 rounded-full bg-[#FF8C42] flex items-center justify-center">
                  <Circle className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-[#FF8C42]">06</span>
              </div>
              <h3 className="text-2xl font-bold mb-3">Action engagée</h3>
              <p className="text-gray-300 leading-relaxed text-sm">
                Agir de manière cohérente avec ses valeurs, même en présence de pensées et d'émotions difficiles.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Section Pour qui - Avec icônes hexagonales */}
      <section className="py-32 bg-white">
        <Container className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Pour les professionnels de la santé mentale
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cette formation s'adresse aux thérapeutes, psychologues, médecins, conseillers et coachs qui souhaitent enrichir leur pratique avec l'ACT.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors relative">
              {/* Hexagone décoratif */}
              <div className="absolute top-4 right-4 w-12 h-12 opacity-5">
                <Hexagon className="w-full h-full text-[#FF8C42]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Psychothérapeutes</h3>
              <p className="text-gray-600 text-sm">
                Intégrez l'ACT dans votre pratique pour aider vos clients à développer leur flexibilité psychologique.
              </p>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors relative">
              <div className="absolute top-4 right-4 w-12 h-12 opacity-5">
                <Hexagon className="w-full h-full text-[#FF8C42]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Médecins</h3>
              <p className="text-gray-600 text-sm">
                Apprenez des outils pratiques pour accompagner vos patients face à la douleur chronique et aux maladies.
              </p>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors relative">
              <div className="absolute top-4 right-4 w-12 h-12 opacity-5">
                <Hexagon className="w-full h-full text-[#FF8C42]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Conseillers</h3>
              <p className="text-gray-600 text-sm">
                Enrichissez votre boîte à outils avec des interventions basées sur les valeurs et l'action engagée.
              </p>
            </div>

            <div className="bg-gray-50 rounded-3xl p-8 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors relative">
              <div className="absolute top-4 right-4 w-12 h-12 opacity-5">
                <Hexagon className="w-full h-full text-[#FF8C42]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Coachs</h3>
              <p className="text-gray-600 text-sm">
                Aidez vos clients à surmonter les obstacles internes et à vivre en accord avec leurs valeurs profondes.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Section Témoignages */}
      <section className="py-32 bg-gray-50">
        <Container className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Ce qu'en disent les experts
            </h2>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-10 border-l-2 border-[#FF8C42]">
              <p className="text-xl text-gray-700 mb-6 leading-relaxed italic">
                "Russ Harris est un formateur exceptionnel qui rend l'ACT accessible et applicable. Ses ateliers transforment la pratique clinique."
              </p>
              <div className="flex items-center gap-4">
                <div>
                  <div className="font-bold text-gray-900">Dr. Steven Hayes</div>
                  <div className="text-sm text-gray-600">Co-fondateur de l'ACT</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-10 border-l-2 border-[#FF8C42]">
              <p className="text-xl text-gray-700 mb-6 leading-relaxed italic">
                "La capacité de Russ à enseigner l'ACT avec clarté et compassion est remarquable. Une formation à ne pas manquer."
              </p>
              <div className="flex items-center gap-4">
                <div>
                  <div className="font-bold text-gray-900">Dr. Kirk Strosahl</div>
                  <div className="text-sm text-gray-600">Co-fondateur de l'ACT</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Final - Avec grille hexagonale */}
      <section className="py-32 bg-gradient-to-br from-[#1F2937] via-[#111827] to-[#0F172A] text-white relative overflow-hidden">
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

        <Container className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            Prêt à transformer votre pratique ?
          </h2>
          <p className="text-2xl text-gray-300 mb-4">
            800 places disponibles au total
          </p>
          <p className="text-lg text-gray-400 mb-12">
            Les places sont limitées. Réservez dès maintenant pour garantir votre participation.
          </p>
          <Button 
            size="lg" 
            className="bg-[#FF8C42] hover:bg-[#FF7A29] text-white font-medium text-base px-10 py-4 rounded-full transition-all hover:scale-105 border border-[#FF8C42]/20"
          >
            Réserver ma place
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Container>
      </section>

      {/* Section Organisateur */}
      <section className="py-16 bg-white border-t border-gray-200">
        <Container className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-6">
            <p className="text-sm text-gray-500 uppercase tracking-wider">Organisé par</p>
            <div className="relative w-[400px] h-[100px] opacity-80 hover:opacity-100 transition-opacity">
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
