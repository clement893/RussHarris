'use client';

import Image from 'next/image';
import { Button, Container } from '@/components/ui';
import { CheckCircle, Users, BookOpen, Award, Globe } from 'lucide-react';

export default function DemoHomePage() {
  return (
    <div className="bg-white text-gray-900">
      {/* Hero Section - ULTRA PERCUTANT */}
      <section className="relative bg-gradient-to-br from-red-600 via-red-700 to-black text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/russ/SSjqkHFlqMG2.jpg"
            alt="Russ Harris presenting"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>
        <Container className="relative z-10 py-24 md:py-40 text-center">
          <div className="inline-block bg-yellow-400 text-black px-6 py-2 rounded-full font-black text-sm md:text-base mb-6 uppercase tracking-wider">
            🏆 Formateur ACT #1 au monde
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-none">
            RUSS HARRIS
            <br />
            <span className="text-yellow-400">CANADIAN TOUR 2026</span>
          </h1>
          <p className="text-2xl md:text-4xl font-bold mb-4 max-w-4xl mx-auto">
            Rejoignez les 90 000+ professionnels de la santé déjà formés
          </p>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto opacity-90">
            Formation intensive de 2 jours en Thérapie d'Acceptation et d'Engagement (ACT)
          </p>
          <Button 
            size="lg" 
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-black text-xl md:text-2xl px-12 py-8 rounded-full shadow-2xl transform hover:scale-105 transition-all"
          >
            RÉSERVEZ VOTRE PLACE MAINTENANT
          </Button>
          <p className="mt-6 text-lg font-bold">⚡ Places limitées à 200 par ville</p>
        </Container>
      </section>

      {/* Section Villes - LES 4 VILLES EN GRAND */}
      <section className="py-20 md:py-32 bg-gray-50">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              4 VILLES. 800 PLACES.
            </h2>
            <p className="text-2xl md:text-3xl font-bold text-red-600">
              UNE OPPORTUNITÉ UNIQUE.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              { city: 'MONTRÉAL', province: 'QC', date: 'Printemps 2026', places: 200 },
              { city: 'CALGARY', province: 'AB', date: 'Printemps 2026', places: 200 },
              { city: 'VANCOUVER', province: 'BC', date: 'Printemps 2026', places: 200 },
              { city: 'TORONTO', province: 'ON', date: 'Printemps 2026', places: 200 },
            ].map((location) => (
              <div 
                key={location.city}
                className="bg-white border-4 border-black p-10 hover:shadow-2xl transition-all hover:scale-105 cursor-pointer"
              >
                <h3 className="text-4xl md:text-6xl font-black mb-2">{location.city}</h3>
                <p className="text-2xl font-bold text-gray-600 mb-4">{location.province}</p>
                <p className="text-xl font-bold mb-4">{location.date}</p>
                <div className="bg-red-600 text-white px-6 py-3 rounded-lg inline-block mb-6">
                  <span className="text-3xl font-black">{location.places}</span>
                  <span className="text-lg font-bold ml-2">PLACES</span>
                </div>
                <Button className="w-full bg-black hover:bg-gray-800 text-white font-black text-xl py-6">
                  INSCRIPTION {location.city}
                </Button>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Section Pourquoi Russ Harris - L'AUTORITÉ */}
      <section className="py-20 md:py-32 bg-black text-white">
        <Container>
          <h2 className="text-4xl md:text-6xl font-black text-center mb-16">
            Pourquoi se former avec <span className="text-yellow-400">Dr. Russ Harris</span>?
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="bg-white/10 p-8 rounded-2xl backdrop-blur">
              <Users className="w-16 h-16 text-yellow-400 mb-4" />
              <h3 className="text-3xl font-black mb-4">90 000+ Professionnels Formés</h3>
              <p className="text-xl">
                Rejoignez une communauté mondiale d'experts qui ont transformé leur pratique clinique avec l'ACT.
              </p>
            </div>
            <div className="bg-white/10 p-8 rounded-2xl backdrop-blur">
              <BookOpen className="w-16 h-16 text-yellow-400 mb-4" />
              <h3 className="text-3xl font-black mb-4">Auteur Best-Seller Mondial</h3>
              <p className="text-xl">
                "The Happiness Trap" : 1 million+ d'exemplaires vendus, traduit en 30 langues.
              </p>
            </div>
            <div className="bg-white/10 p-8 rounded-2xl backdrop-blur">
              <Award className="w-16 h-16 text-yellow-400 mb-4" />
              <h3 className="text-3xl font-black mb-4">Approuvé par les Fondateurs de l'ACT</h3>
              <p className="text-xl">
                Reconnu par Dr. Steven Hayes et Dr. Kirk Strosahl comme "le clinicien ACT par excellence".
              </p>
            </div>
            <div className="bg-white/10 p-8 rounded-2xl backdrop-blur">
              <Globe className="w-16 h-16 text-yellow-400 mb-4" />
              <h3 className="text-3xl font-black mb-4">Protocole pour l'OMS</h3>
              <p className="text-xl">
                Créateur d'un protocole ACT utilisé dans les camps de réfugiés, validé par 3 études randomisées.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Section Qu'est-ce que l'ACT - LA SOLUTION */}
      <section className="py-20 md:py-32">
        <Container className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-12">
            L'ACT : Une révolution pour votre pratique clinique
          </h2>
          <div className="bg-gradient-to-br from-red-50 to-yellow-50 p-10 md:p-16 rounded-3xl mb-12">
            <p className="text-2xl md:text-3xl font-bold mb-8 leading-relaxed">
              La Thérapie d'Acceptation et d'Engagement (ACT) est une approche transdiagnostique basée sur la science qui aide vos clients à accepter ce qu'ils ne peuvent pas contrôler et à s'engager dans des actions alignées avec leurs valeurs.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-5xl font-black text-red-600 mb-2">✓</div>
                <p className="text-xl font-bold">Efficacité prouvée</p>
                <p className="text-lg">Dépression, anxiété, TOC, douleur chronique, PTSD</p>
              </div>
              <div>
                <div className="text-5xl font-black text-red-600 mb-2">✓</div>
                <p className="text-xl font-bold">Engagement client</p>
                <p className="text-lg">Des techniques qui fonctionnent vraiment</p>
              </div>
              <div>
                <div className="text-5xl font-black text-red-600 mb-2">✓</div>
                <p className="text-xl font-bold">Flexibilité</p>
                <p className="text-lg">Un seul modèle pour multiples conditions</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section Pour Qui - LA CIBLE */}
      <section className="py-20 md:py-32 bg-gray-50">
        <Container>
          <h2 className="text-4xl md:text-6xl font-black text-center mb-16">
            Cette formation est pour <span className="text-red-600">VOUS</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {[
              { title: 'Thérapeutes & Psychologues', desc: 'Allez au-delà des approches traditionnelles' },
              { title: 'Médecins & Infirmières', desc: 'Intégrez le psychologique dans vos soins' },
              { title: 'Conseillers & Travailleurs Sociaux', desc: 'Obtenez des outils concrets et efficaces' },
              { title: 'Coachs & Professionnels', desc: 'Guidez vos clients vers une vie riche de sens' },
            ].map((persona) => (
              <div key={persona.title} className="bg-white p-8 rounded-xl border-2 border-gray-200 hover:border-red-600 transition-all">
                <h3 className="text-2xl font-black mb-4">{persona.title}</h3>
                <p className="text-lg">{persona.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Section Ce que vous apprendrez - LE CONTENU */}
      <section className="py-20 md:py-32">
        <Container className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-16">
            Ce que vous maîtriserez en 2 jours
          </h2>
          <div className="space-y-6">
            {[
              'Les 6 processus centraux de l\'ACT et comment les appliquer en séance',
              'Techniques d\'acceptation et de pleine conscience adaptées à votre clientèle',
              'Comment utiliser les valeurs pour motiver le changement comportemental',
              'Application pratique à des cas cliniques complexes',
              'Stratégies de prévention du burnout pour vous-même en tant que thérapeute',
              'Protocoles courts (1 à 6 sessions) pour contextes médicaux',
            ].map((item, index) => (
              <div key={index} className="flex items-start bg-gradient-to-r from-red-50 to-transparent p-6 rounded-xl">
                <CheckCircle className="w-8 h-8 text-red-600 mr-4 mt-1 flex-shrink-0" />
                <p className="text-xl md:text-2xl font-bold">{item}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Section Témoignages - PREUVE SOCIALE */}
      <section className="py-20 md:py-32 bg-black text-white">
        <Container>
          <h2 className="text-4xl md:text-6xl font-black text-center mb-16">
            Ce que disent les <span className="text-yellow-400">90 000 professionnels</span> formés
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="bg-white/10 p-8 rounded-2xl backdrop-blur">
              <p className="text-xl mb-6 italic">
                "Russ Harris rend les concepts ACT simples, accessibles et faciles à mettre en œuvre. Sa formation a transformé ma pratique clinique."
              </p>
              <p className="font-bold text-yellow-400">– Dr. Steven Hayes, Co-fondateur de l'ACT</p>
            </div>
            <div className="bg-white/10 p-8 rounded-2xl backdrop-blur">
              <p className="text-xl mb-6 italic">
                "Le clinicien ACT par excellence et un formateur dynamite. Je recommande vivement sa formation à quiconque veut vraiment apprendre l'ACT."
              </p>
              <p className="font-bold text-yellow-400">– Dr. Kirk D. Strosahl, Co-fondateur de l'ACT</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Final CTA - L'URGENCE */}
      <section className="py-20 md:py-40 bg-gradient-to-br from-red-600 via-red-700 to-black text-white text-center">
        <Container className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            LE CANADA ATTEND.
            <br />
            <span className="text-yellow-400">VOTRE PRATIQUE AUSSI.</span>
          </h2>
          <p className="text-2xl md:text-3xl font-bold mb-12">
            Les places partent vite. Ne manquez pas cette chance unique de vous former avec le meilleur.
          </p>
          <div className="bg-white/20 backdrop-blur p-8 rounded-2xl mb-12 inline-block">
            <p className="text-lg font-bold mb-2">Places restantes au Canada</p>
            <p className="text-6xl font-black text-yellow-400">800</p>
            <p className="text-lg font-bold mt-2">sur 4 villes</p>
          </div>
          <br />
          <Button 
            size="lg" 
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-black text-2xl md:text-3xl px-16 py-10 rounded-full shadow-2xl transform hover:scale-105 transition-all"
          >
            RÉSERVEZ MAINTENANT
          </Button>
          <p className="mt-8 text-xl font-bold">🔥 Inscription ouverte - Places limitées</p>
        </Container>
      </section>
    </div>
  );
}
