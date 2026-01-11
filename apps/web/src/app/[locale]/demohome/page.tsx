'use client';

import Image from 'next/image';
import { Button, Container } from '@/components/ui';
import { ArrowRight, Calendar, MapPin, Users, Award, Globe } from 'lucide-react';

export default function DemoHomePage() {
  return (
    <div className="bg-[#0A0A0A] text-white">
      {/* Hero Section - Enrichi avec plus de substance */}
      <section className="relative min-h-screen flex items-center overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0A0A] via-[#0A0A0A]/95 to-[#F97316]/10" />
        <div className="absolute inset-0 opacity-15">
          <Image
            src="/images/russ/SSjqkHFlqMG2.jpg"
            alt="Russ Harris"
            fill
            style={{ objectFit: 'cover' }}
            className="grayscale"
          />
        </div>
        <Container className="relative z-10 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Colonne gauche - Contenu principal */}
            <div>
              <div className="inline-block border border-[#F97316] text-[#F97316] px-4 py-1 text-xs font-bold mb-6 tracking-widest rounded-full">
                TOURNÉE CANADIENNE 2026
              </div>
              <h1 className="text-6xl md:text-8xl font-black mb-6 leading-none">
                RUSS
                <br />
                HARRIS
              </h1>
              <p className="text-2xl md:text-3xl font-semibold text-[#F97316] mb-8">
                Formation intensive en ACT
              </p>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed max-w-xl">
                Deux jours pour maîtriser la Thérapie d'Acceptation et d'Engagement avec l'un des formateurs ACT les plus respectés au monde. Une opportunité unique de transformer votre pratique clinique.
              </p>
              
              {/* Stats rapides */}
              <div className="grid grid-cols-3 gap-6 mb-10 pb-8 border-b border-gray-800">
                <div>
                  <div className="flex items-center gap-2 text-[#F97316] mb-1">
                    <Users className="w-5 h-5" />
                    <span className="text-2xl font-black">90K+</span>
                  </div>
                  <div className="text-sm text-gray-400">Professionnels formés</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[#F97316] mb-1">
                    <Award className="w-5 h-5" />
                    <span className="text-2xl font-black">1M+</span>
                  </div>
                  <div className="text-sm text-gray-400">Livres vendus</div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-[#F97316] mb-1">
                    <Globe className="w-5 h-5" />
                    <span className="text-2xl font-black">30</span>
                  </div>
                  <div className="text-sm text-gray-400">Langues</div>
                </div>
              </div>

              <Button 
                size="lg" 
                className="bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-base px-10 py-6 rounded-full transition-all hover:scale-105"
              >
                Découvrir les dates
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>

            {/* Colonne droite - Villes et dates */}
            <div className="bg-[#111111]/80 backdrop-blur-sm rounded-3xl p-8 border border-gray-800">
              <h3 className="text-2xl font-black mb-6 text-[#F97316]">4 VILLES • 800 PLACES</h3>
              <div className="space-y-4">
                {[
                  { city: 'Montréal', date: '24-25 mai 2026', places: 200 },
                  { city: 'Calgary', date: '31 mai - 1 juin 2026', places: 200 },
                  { city: 'Vancouver', date: '7-8 juin 2026', places: 200 },
                  { city: 'Toronto', date: '14-15 juin 2026', places: 200 },
                ].map((location) => (
                  <div key={location.city} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
                    <div>
                      <div className="text-xl font-bold">{location.city}</div>
                      <div className="text-sm text-gray-400">{location.date}</div>
                    </div>
                    <div className="text-[#F97316] font-bold text-sm">
                      {location.places} places
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section Dates/Villes - LE COEUR DE LA TOURNÉE */}
      <section className="py-20 md:py-32">
        <Container className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black mb-16 tracking-tight">
            LA TOURNÉE
          </h2>
          <div className="space-y-6">
            {[
              { city: 'MONTRÉAL', province: 'QC', date: '24-25 MAI', venue: 'Palais des Congrès', places: 200 },
              { city: 'CALGARY', province: 'AB', date: '31 MAI - 1 JUIN', venue: 'Calgary Convention Centre', places: 200 },
              { city: 'VANCOUVER', province: 'BC', date: '7-8 JUIN', venue: 'Vancouver Convention Centre', places: 200 },
              { city: 'TORONTO', province: 'ON', date: '14-15 JUIN', venue: 'Metro Toronto Convention Centre', places: 200 },
            ].map((show) => (
              <div 
                key={show.city}
                className="group border-b border-gray-800 pb-6 hover:border-[#F97316] transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-5xl md:text-7xl font-black tracking-tighter leading-none mb-3 transition-colors duration-300 group-hover:text-[#F97316]">
                      {show.city}
                    </h3>
                    <div className="flex items-center gap-6 text-gray-400 text-base md:text-lg">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        <span className="font-bold">{show.date} 2026</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        <span>{show.venue}</span>
                      </div>
                      <div className="text-[#F97316] font-bold">
                        {show.places} places
                      </div>
                    </div>
                  </div>
                  <Button 
                    className="bg-transparent border-2 border-white hover:bg-[#F97316] hover:border-[#F97316] hover:text-black text-white font-black px-8 py-6 rounded-full transition-all"
                  >
                    S'INSCRIRE
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Section L'Artiste - Qui est Russ Harris */}
      <section className="py-20 md:py-32 bg-[#111111]">
        <Container>
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
            <div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image
                  src="/images/russ/8obb1myXAohZ.jpg"
                  alt="Dr. Russ Harris"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="grayscale contrast-110"
                />
              </div>
            </div>
            <div>
              <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-none">
                L'HOMME
                <br />
                DERRIÈRE
                <br />
                <span className="text-[#F97316] italic">L'ACT</span>
              </h2>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                Dr. Russ Harris n'est pas qu'un thérapeute. C'est un pionnier, un innovateur qui a transformé la façon dont 90 000 professionnels de la santé pratiquent la psychothérapie.
              </p>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Auteur du best-seller mondial "The Happiness Trap" (1 million d'exemplaires vendus, traduit en 30 langues), il a créé un protocole ACT pour l'Organisation Mondiale de la Santé, validé par la science.
              </p>
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-[#F97316]/30">
                <div>
                  <div className="text-4xl font-black text-[#F97316] mb-2">90K+</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Professionnels formés</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-[#F97316] mb-2">1M+</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Livres vendus</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-[#F97316] mb-2">30</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Langues</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section L'Album - Qu'est-ce que l'ACT */}
      <section className="py-20 md:py-32">
        <Container className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight text-center">
            PLUS QU'UNE THÉRAPIE,
            <br />
            <span className="text-[#F97316]">UNE PHILOSOPHIE</span>
          </h2>
          <p className="text-xl text-gray-400 text-center mb-16 max-w-3xl mx-auto">
            La Thérapie d'Acceptation et d'Engagement (ACT) est une approche révolutionnaire qui aide vos clients à développer la flexibilité psychologique pour vivre une vie riche et pleine de sens.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'ACCEPTER', desc: 'Faire de la place aux pensées et émotions difficiles plutôt que de lutter contre elles.' },
              { title: 'ÊTRE PRÉSENT', desc: 'Cultiver une attention flexible au moment présent avec ouverture et curiosité.' },
              { title: 'S\'ENGAGER', desc: 'Clarifier ses valeurs profondes et agir en accord avec elles, même face aux obstacles.' },
            ].map((pillar, index) => (
              <div key={index} className="bg-[#111111] p-8 border border-gray-800 hover:border-[#F97316] rounded-3xl transition-all group">
                <div className="text-6xl font-black text-[#F97316] mb-4">0{index + 1}</div>
                <h3 className="text-2xl font-black mb-4 group-hover:text-[#F97316] transition-colors">{pillar.title}</h3>
                <p className="text-gray-400 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA - Le Rappel */}
      <section className="py-32 bg-gradient-to-b from-[#0A0A0A] via-[#F97316]/20 to-[#0A0A0A] relative">
        <div className="absolute inset-0 bg-[#F97316]/10" />
        <Container className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-6xl md:text-7xl font-black mb-8 tracking-tighter leading-none">
            PRÊT À TRANSFORMER
            <br />
            VOTRE PRATIQUE?
          </h2>
          <p className="text-xl font-semibold mb-12 text-gray-300">
            800 places disponibles • 4 villes • 2 jours intensifs
          </p>
          <Button 
            size="lg" 
            className="bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-lg px-14 py-7 rounded-full transition-all hover:scale-105 shadow-lg shadow-[#F97316]/30"
          >
            RÉSERVER MA PLACE
            <ArrowRight className="ml-2 w-6 h-6" />
          </Button>
        </Container>
      </section>
    </div>
  );
}
