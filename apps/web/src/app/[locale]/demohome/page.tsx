'use client';

import Image from 'next/image';
import { Button, Container } from '@/components/ui';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';

export default function DemoHomePage() {
  return (
    <div className="bg-[#0A0A0A] text-white">
      {/* Hero Section - L'Affiche de Tournée */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0A0A]/50 to-[#0A0A0A]" />
        <div className="absolute inset-0 opacity-30">
          <Image
            src="/images/russ/SSjqkHFlqMG2.jpg"
            alt="Russ Harris"
            fill
            style={{ objectFit: 'cover' }}
            className="grayscale"
          />
        </div>
        <Container className="relative z-10 text-center py-32">
          <div className="inline-block bg-[#39FF14] text-black px-4 py-1 text-sm font-bold mb-8 tracking-wider">
            WORLD TOUR 2026
          </div>
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-6 leading-none">
            RUSS
            <br />
            HARRIS
          </h1>
          <p className="text-2xl md:text-4xl font-bold text-[#39FF14] mb-12 tracking-wide">
            THE CANADIAN ACT TOUR
          </p>
          <Button 
            size="lg" 
            className="bg-[#39FF14] hover:bg-[#2EE010] text-black font-black text-lg px-12 py-7 rounded-none transition-all hover:scale-105"
          >
            VOIR LES DATES
          </Button>
        </Container>
      </section>

      {/* Section Marquee - Le Mouvement */}
      <div className="bg-[#39FF14] text-black py-6 overflow-hidden whitespace-nowrap">
        <div className="animate-marquee inline-block">
          <span className="text-4xl font-black mx-8">MONTRÉAL</span>
          <span className="text-4xl font-black mx-8">•</span>
          <span className="text-4xl font-black mx-8">CALGARY</span>
          <span className="text-4xl font-black mx-8">•</span>
          <span className="text-4xl font-black mx-8">VANCOUVER</span>
          <span className="text-4xl font-black mx-8">•</span>
          <span className="text-4xl font-black mx-8">TORONTO</span>
          <span className="text-4xl font-black mx-8">•</span>
          <span className="text-4xl font-black mx-8">MONTRÉAL</span>
          <span className="text-4xl font-black mx-8">•</span>
          <span className="text-4xl font-black mx-8">CALGARY</span>
          <span className="text-4xl font-black mx-8">•</span>
          <span className="text-4xl font-black mx-8">VANCOUVER</span>
          <span className="text-4xl font-black mx-8">•</span>
          <span className="text-4xl font-black mx-8">TORONTO</span>
          <span className="text-4xl font-black mx-8">•</span>
        </div>
      </div>

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
                className="group border-b border-gray-800 pb-6 hover:border-[#39FF14] transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-5xl md:text-8xl font-black tracking-tighter group-hover:text-[#39FF14] transition-colors leading-none mb-2">
                      {show.city}
                    </h3>
                    <div className="flex items-center gap-6 text-gray-400 text-sm md:text-base">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="font-bold">{show.date} 2026</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{show.venue}</span>
                      </div>
                      <div className="text-[#39FF14] font-bold">
                        {show.places} places
                      </div>
                    </div>
                  </div>
                  <Button 
                    className="bg-transparent border-2 border-white hover:bg-[#39FF14] hover:border-[#39FF14] hover:text-black text-white font-black px-8 py-6 rounded-none transition-all"
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
                  src="/images/russ/russ-harris-photo.jpg"
                  alt="Dr. Russ Harris"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="grayscale contrast-125"
                />
              </div>
            </div>
            <div>
              <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-none">
                L'HOMME
                <br />
                DERRIÈRE
                <br />
                <span className="text-[#39FF14]">L'ACT</span>
              </h2>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                Dr. Russ Harris n'est pas qu'un thérapeute. C'est un pionnier, un innovateur qui a transformé la façon dont 90 000 professionnels de la santé pratiquent la psychothérapie.
              </p>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Auteur du best-seller mondial "The Happiness Trap" (1 million d'exemplaires vendus, traduit en 30 langues), il a créé un protocole ACT pour l'Organisation Mondiale de la Santé, validé par la science.
              </p>
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-800">
                <div>
                  <div className="text-4xl font-black text-[#39FF14] mb-2">90K+</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Professionnels formés</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-[#39FF14] mb-2">1M+</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Livres vendus</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-[#39FF14] mb-2">30</div>
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
            <span className="text-[#39FF14]">UNE PHILOSOPHIE</span>
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
              <div key={index} className="bg-[#111111] p-8 border border-gray-800 hover:border-[#39FF14] transition-all group">
                <div className="text-6xl font-black text-[#39FF14] mb-4">0{index + 1}</div>
                <h3 className="text-2xl font-black mb-4 group-hover:text-[#39FF14] transition-colors">{pillar.title}</h3>
                <p className="text-gray-400 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA - Le Rappel */}
      <section className="py-32 bg-[#39FF14] text-black">
        <Container className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-none">
            PRÊT?
          </h2>
          <p className="text-2xl font-bold mb-12">
            800 places disponibles au total pour le Canada
          </p>
          <Button 
            size="lg" 
            className="bg-black hover:bg-gray-900 text-white font-black text-xl px-16 py-8 rounded-none transition-all hover:scale-105"
          >
            RÉSERVER MA PLACE
          </Button>
        </Container>
      </section>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
