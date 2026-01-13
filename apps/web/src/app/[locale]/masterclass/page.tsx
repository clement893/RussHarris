/**
 * Masterclass Programme Page
 * Detailed description of the 2-day masterclass program
 */

'use client';

import { Button, Container } from '@/components/ui';
import { Link } from '@/i18n/routing';
import { Target, BookOpen, CheckCircle, Hexagon } from 'lucide-react';

export default function MasterclassPage() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white text-gray-900">
      {/* Hero Section - Avec gris anthracite élégant */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden py-20 bg-gradient-to-br from-[#1F2937] via-[#111827] to-[#0F172A]">
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
              Le Programme
            </h1>
            <p className="text-xl md:text-2xl font-light text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Cette masterclass intensive de 2 jours vous plongera au cœur de la Thérapie d'Acceptation et d'Engagement (ACT). Vous découvrirez les fondements théoriques, les techniques pratiques et les applications cliniques de cette approche thérapeutique révolutionnaire.
            </p>
            <p className="text-lg text-gray-400 mb-10 leading-relaxed max-w-2xl mx-auto">
              À travers des démonstrations en direct, des exercices pratiques et des études de cas, Russ Harris vous guidera dans l'apprentissage de l'ACT pour transformer votre pratique professionnelle.
            </p>
            <Link href="/cities">
              <Button 
                size="lg" 
                className="bg-[#FF8C42] hover:bg-[#FF7A29] text-white font-medium text-sm px-8 py-3 rounded-full transition-all hover:scale-105 border border-[#FF8C42]/20"
              >
                Réserver ma place
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Section Programme détaillé */}
      <section className="py-32 bg-white">
        <Container className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Jour 1 */}
            <div className="group border border-gray-200 bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 hover:border-[#FF8C42]/50 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 opacity-0 group-hover:opacity-5 transition-opacity">
                <Hexagon className="w-full h-full text-[#FF8C42]" />
              </div>
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 bg-[#FF8C42] text-white flex items-center justify-center font-bold text-xl flex-shrink-0 rounded-full">
                  1
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Fondements de l'ACT</h3>
              </div>
              <div className="space-y-6 relative z-10">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Matin</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Introduction à l'ACT : historique et philosophie • Le modèle hexaflex : les 6 processus fondamentaux • Démonstrations pratiques et exercices
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Après-midi</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    L'acceptation psychologique et la défusion cognitive • Le contact avec le moment présent • Exercices pratiques et études de cas
                  </p>
                </div>
              </div>
            </div>

            {/* Jour 2 */}
            <div className="group border border-gray-200 bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 hover:border-[#FF8C42]/50 transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 opacity-0 group-hover:opacity-5 transition-opacity">
                <Hexagon className="w-full h-full text-[#FF8C42]" />
              </div>
              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="w-12 h-12 bg-[#FF8C42] text-white flex items-center justify-center font-bold text-xl flex-shrink-0 rounded-full">
                  2
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Applications Avancées</h3>
              </div>
              <div className="space-y-6 relative z-10">
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Matin</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Le soi comme contexte et les valeurs • L'engagement dans l'action • Intégration des processus ACT dans la pratique
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Après-midi</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Applications spécifiques : anxiété, dépression, douleur chronique • Défis courants et pièges à éviter • Questions-réponses et cas cliniques
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section Objectifs Pédagogiques */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
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
                Objectifs Pédagogiques
              </h2>
            </div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#FF8C42] mt-1 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-700">Comprendre les fondements théoriques et philosophiques de l'ACT</span>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#FF8C42] mt-1 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-700">Maîtriser les 6 processus fondamentaux du modèle hexaflex</span>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#FF8C42] mt-1 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-700">Apprendre des techniques pratiques applicables immédiatement</span>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#FF8C42] mt-1 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-700">Développer des compétences pour intégrer l'ACT dans votre pratique</span>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors md:col-span-2">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#FF8C42] mt-1 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-700">Gérer les défis courants et éviter les pièges thérapeutiques</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section Ressources Incluses */}
      <section className="py-32 bg-white">
        <Container className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-6">
              <BookOpen className="w-10 h-10 text-[#FF8C42]" aria-hidden="true" />
              <h2 className="text-5xl md:text-6xl font-bold text-gray-900">
                Ressources Incluses
              </h2>
            </div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#FF8C42] mt-1 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-700">Manuel de formation complet (format PDF)</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#FF8C42] mt-1 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-700">Accès aux enregistrements vidéo de la formation (3 mois)</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#FF8C42] mt-1 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-700">Fiches pratiques et outils thérapeutiques</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#FF8C42] mt-1 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-700">Certificat de participation</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors md:col-span-2">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-[#FF8C42] mt-1 flex-shrink-0" aria-hidden="true" />
                  <span className="text-gray-700">Support et ressources complémentaires en ligne</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Final */}
      <section className="py-32 bg-gradient-to-br from-[#1F2937] via-[#111827] to-[#0F172A] text-white relative overflow-hidden">
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
            Prêt à transformer votre pratique ?
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Réservez votre place dès maintenant pour cette masterclass exceptionnelle.
          </p>
          <Link href="/cities">
            <Button 
              size="lg" 
              className="bg-[#FF8C42] hover:bg-[#FF7A29] text-white font-medium text-base px-10 py-4 rounded-full transition-all hover:scale-105 border border-[#FF8C42]/20"
            >
              Réserver ma place
            </Button>
          </Link>
        </Container>
      </section>
    </div>
  );
}
