'use client';

import Image from 'next/image';
import { Button, Container } from '@/components/ui';
import { Heart, Compass, Sparkles } from 'lucide-react';

export default function DemoHomePage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section - L'Invitation */}
      <section className="bg-[#F3EFEA] py-20 md:py-32">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <div className="order-2 md:order-1">
              <h1 className="font-serif text-4xl md:text-6xl text-[#2C3E50] mb-6 leading-tight">
                Une invitation à la transformation
              </h1>
              <p className="text-xl md:text-2xl text-[#34495E] mb-8 leading-relaxed">
                Rejoignez Dr. Russ Harris, auteur du best-seller <span className="italic">The Happiness Trap</span>, pour une formation immersive en Thérapie d'Acceptation et d'Engagement.
              </p>
              <p className="text-lg text-[#34495E] mb-10 leading-relaxed">
                Deux jours pour enrichir votre pratique, approfondir votre compréhension de l'ACT et découvrir des outils concrets qui transformeront la vie de vos clients.
              </p>
              <Button 
                size="lg" 
                className="bg-[#E87A5D] hover:bg-[#D66A4D] text-white font-medium text-lg px-10 py-6 rounded-full shadow-lg transition-all"
              >
                Découvrir la tournée canadienne
              </Button>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/russ/SSjqkHFlqMG2.jpg"
                  alt="Dr. Russ Harris"
                  width={600}
                  height={700}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section Tournée - L'Itinéraire */}
      <section className="py-20 md:py-32">
        <Container className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl text-[#2C3E50] text-center mb-4">
            La tournée canadienne 2026
          </h2>
          <p className="text-xl text-[#34495E] text-center mb-16 max-w-3xl mx-auto">
            Quatre villes, une expérience unique. Choisissez la destination qui vous convient.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { city: 'Montréal', province: 'Québec', date: 'Printemps 2026', places: 200 },
              { city: 'Calgary', province: 'Alberta', date: 'Printemps 2026', places: 200 },
              { city: 'Vancouver', province: 'Colombie-Britannique', date: 'Printemps 2026', places: 200 },
              { city: 'Toronto', province: 'Ontario', date: 'Printemps 2026', places: 200 },
            ].map((location) => (
              <div 
                key={location.city}
                className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all hover:border-[#E87A5D] group"
              >
                <h3 className="font-serif text-3xl text-[#2C3E50] mb-2">{location.city}</h3>
                <p className="text-lg text-[#34495E] mb-4">{location.province}</p>
                <p className="text-base text-[#34495E] mb-6">{location.date}</p>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-2xl font-semibold text-[#E87A5D]">{location.places}</span>
                  <span className="text-base text-[#34495E]">places disponibles</span>
                </div>
                <a 
                  href="#inscription" 
                  className="text-[#E87A5D] font-medium hover:underline group-hover:text-[#D66A4D] transition-colors"
                >
                  S'inscrire à {location.city} →
                </a>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Section Qui est Russ Harris - La Confiance */}
      <section className="bg-[#F3EFEA] py-20 md:py-32">
        <Container>
          <div className="grid md:grid-cols-5 gap-12 items-center max-w-7xl mx-auto">
            <div className="md:col-span-2">
              <div className="relative rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="/images/russ/russ-harris-photo.jpg"
                  alt="Dr. Russ Harris"
                  width={500}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
            <div className="md:col-span-3">
              <h2 className="font-serif text-4xl md:text-5xl text-[#2C3E50] mb-6">
                Rencontrez votre formateur, Dr. Russ Harris
              </h2>
              <p className="text-lg text-[#34495E] mb-6 leading-relaxed">
                Avec plus de 90 000 professionnels de la santé formés et un million de lecteurs à travers le monde, Russ Harris est l'une des voix les plus respectées de la psychologie moderne.
              </p>
              <p className="text-lg text-[#34495E] mb-6 leading-relaxed">
                Médecin de formation, psychothérapeute et auteur de renommée internationale, il a créé un protocole ACT pour l'Organisation Mondiale de la Santé, validé par trois études randomisées contrôlées.
              </p>
              <p className="text-lg text-[#34495E] mb-8 leading-relaxed">
                Son approche unique rend les concepts complexes de l'ACT simples, accessibles et immédiatement applicables dans votre pratique quotidienne.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <div className="text-3xl font-semibold text-[#E87A5D] mb-1">90 000+</div>
                  <div className="text-sm text-[#34495E]">Professionnels formés</div>
                </div>
                <div>
                  <div className="text-3xl font-semibold text-[#E87A5D] mb-1">1M+</div>
                  <div className="text-sm text-[#34495E]">Livres vendus</div>
                </div>
                <div>
                  <div className="text-3xl font-semibold text-[#E87A5D] mb-1">30</div>
                  <div className="text-sm text-[#34495E]">Langues traduites</div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section L'Approche ACT - L'Intelligence */}
      <section className="py-20 md:py-32">
        <Container className="max-w-6xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl text-[#2C3E50] text-center mb-6">
            L'intelligence de l'Acceptation et de l'Engagement
          </h2>
          <p className="text-xl text-[#34495E] text-center mb-16 max-w-3xl mx-auto leading-relaxed">
            L'ACT est une approche transdiagnostique fondée sur la science, qui aide vos clients à développer la flexibilité psychologique nécessaire pour vivre une vie riche et pleine de sens.
          </p>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F3EFEA] mb-6">
                <Heart className="w-8 h-8 text-[#E87A5D]" />
              </div>
              <h3 className="font-serif text-2xl text-[#2C3E50] mb-4">Accepter avec courage</h3>
              <p className="text-base text-[#34495E] leading-relaxed">
                Apprendre à faire de la place aux pensées et émotions difficiles, plutôt que de lutter contre elles.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F3EFEA] mb-6">
                <Sparkles className="w-8 h-8 text-[#E87A5D]" />
              </div>
              <h3 className="font-serif text-2xl text-[#2C3E50] mb-4">Être présent</h3>
              <p className="text-base text-[#34495E] leading-relaxed">
                Cultiver une attention flexible au moment présent, avec ouverture et curiosité.
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F3EFEA] mb-6">
                <Compass className="w-8 h-8 text-[#E87A5D]" />
              </div>
              <h3 className="font-serif text-2xl text-[#2C3E50] mb-4">S'engager avec sens</h3>
              <p className="text-base text-[#34495E] leading-relaxed">
                Clarifier ses valeurs profondes et agir en accord avec elles, même face aux obstacles.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Section Témoignages - La Résonance */}
      <section className="bg-[#F3EFEA] py-20 md:py-32">
        <Container className="max-w-5xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl text-[#2C3E50] text-center mb-16">
            Ce qu'ils en disent
          </h2>
          <div className="space-y-12">
            <blockquote className="border-l-4 border-[#E87A5D] pl-8 py-4">
              <p className="text-xl md:text-2xl text-[#34495E] mb-6 leading-relaxed italic">
                "Russ Harris est brillant dans sa capacité à éliminer la complexité inutile et à présenter des idées cliniques complexes de manière accessible. Il a apporté sa créativité clinique à de nouvelles méthodes et de nouvelles façons d'aller au cœur des problèmes avec les clients."
              </p>
              <footer className="text-base text-[#2C3E50] font-medium">
                — Dr. Steven Hayes, Co-fondateur de l'ACT, Université du Nevada
              </footer>
            </blockquote>
            <blockquote className="border-l-4 border-[#E87A5D] pl-8 py-4">
              <p className="text-xl md:text-2xl text-[#34495E] mb-6 leading-relaxed italic">
                "Russ Harris est le clinicien ACT par excellence et un formateur dynamique. Il rend les concepts ACT faciles à comprendre et à mettre en œuvre dans la pratique clinique en temps réel. Sa passion pour le travail ACT et ses méthodes de formation sont absolument de premier ordre."
              </p>
              <footer className="text-base text-[#2C3E50] font-medium">
                — Dr. Kirk D. Strosahl, Co-fondateur de l'ACT
              </footer>
            </blockquote>
          </div>
        </Container>
      </section>

      {/* Final CTA - L'Appel Doux */}
      <section className="py-20 md:py-32">
        <Container className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl text-[#2C3E50] mb-6">
            Prêt à transformer votre pratique?
          </h2>
          <p className="text-xl text-[#34495E] mb-10 leading-relaxed max-w-2xl mx-auto">
            Rejoignez cette formation exceptionnelle et découvrez comment l'ACT peut enrichir votre travail et votre vie. Les places sont limitées à 200 participants par ville.
          </p>
          <Button 
            size="lg" 
            className="bg-[#E87A5D] hover:bg-[#D66A4D] text-white font-medium text-lg px-12 py-6 rounded-full shadow-lg transition-all"
          >
            Voir les dates et s'inscrire
          </Button>
        </Container>
      </section>
    </div>
  );
}
