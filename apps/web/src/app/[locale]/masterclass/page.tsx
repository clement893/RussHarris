/**
 * Masterclass Programme Page
 * Detailed description of the 2-day masterclass program
 */

'use client';

import { Container } from '@/components/ui';
import SwissDivider from '@/components/masterclass/SwissDivider';
import TimelineDay, { type TimelineItem } from '@/components/masterclass/TimelineDay';
import { Clock, Target, BookOpen, CheckCircle } from 'lucide-react';

export default function MasterclassPage() {
  return (
    <div className="min-h-screen bg-white">
      <Container className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <h1 className="swiss-display text-6xl md:text-8xl mb-6 text-black">
              Le Programme
            </h1>
            <SwissDivider />
          </div>

          {/* Description */}
          <div className="mb-16">
            <p className="text-xl text-gray-700 leading-relaxed mb-6">
              Cette masterclass intensive de 2 jours vous plongera au cœur de la Thérapie 
              d'Acceptation et d'Engagement (ACT). Vous découvrirez les fondements théoriques, 
              les techniques pratiques et les applications cliniques de cette approche 
              thérapeutique révolutionnaire.
            </p>
            <p className="text-xl text-gray-700 leading-relaxed">
              À travers des démonstrations en direct, des exercices pratiques et des études 
              de cas, Russ Harris vous guidera dans l'apprentissage de l'ACT pour transformer 
              votre pratique professionnelle.
            </p>
          </div>

          <SwissDivider className="my-16" />

          {/* Day 1 & Day 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <TimelineDay
              dayNumber={1}
              title="Fondements de l'ACT"
              items={[
                {
                  time: '9h-12h30',
                  title: 'Matin',
                  description: 'Introduction à l\'ACT : historique et philosophie • Le modèle hexaflex : les 6 processus fondamentaux • Démonstrations pratiques et exercices',
                  icon: <Clock className="w-5 h-5" />,
                },
                {
                  time: '14h-17h30',
                  title: 'Après-midi',
                  description: 'L\'acceptation psychologique et la défusion cognitive • Le contact avec le moment présent • Exercices pratiques et études de cas',
                  icon: <Clock className="w-5 h-5" />,
                },
              ]}
            />
            <TimelineDay
              dayNumber={2}
              title="Applications Avancées"
              items={[
                {
                  time: '9h-12h30',
                  title: 'Matin',
                  description: 'Le soi comme contexte et les valeurs • L\'engagement dans l\'action • Intégration des processus ACT dans la pratique',
                  icon: <Clock className="w-5 h-5" />,
                },
                {
                  time: '14h-17h30',
                  title: 'Après-midi',
                  description: 'Applications spécifiques : anxiété, dépression, douleur chronique • Défis courants et pièges à éviter • Questions-réponses et cas cliniques',
                  icon: <Clock className="w-5 h-5" />,
                },
              ]}
            />
          </div>

          <SwissDivider className="my-16" />

          {/* Learning Objectives */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <Target className="w-8 h-8 text-black" aria-hidden="true" />
              <h2 className="text-4xl md:text-5xl font-black text-black">
                Objectifs Pédagogiques
              </h2>
            </div>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-black mt-1 flex-shrink-0" aria-hidden="true" />
                <span>Comprendre les fondements théoriques et philosophiques de l'ACT</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-black mt-1 flex-shrink-0" aria-hidden="true" />
                <span>Maîtriser les 6 processus fondamentaux du modèle hexaflex</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-black mt-1 flex-shrink-0" aria-hidden="true" />
                <span>Apprendre des techniques pratiques applicables immédiatement</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-black mt-1 flex-shrink-0" aria-hidden="true" />
                <span>Développer des compétences pour intégrer l'ACT dans votre pratique</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-black mt-1 flex-shrink-0" aria-hidden="true" />
                <span>Gérer les défis courants et éviter les pièges thérapeutiques</span>
              </li>
            </ul>
          </div>

          <SwissDivider className="my-16" />

          {/* Included Resources */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <BookOpen className="w-8 h-8 text-black" aria-hidden="true" />
              <h2 className="text-4xl md:text-5xl font-black text-black">
                Ressources Incluses
              </h2>
            </div>
            <ul className="space-y-4 text-lg text-gray-700">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-black mt-1 flex-shrink-0" aria-hidden="true" />
                <span>Manuel de formation complet (format PDF)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-black mt-1 flex-shrink-0" aria-hidden="true" />
                <span>Accès aux enregistrements vidéo de la formation (3 mois)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-black mt-1 flex-shrink-0" aria-hidden="true" />
                <span>Fiches pratiques et outils thérapeutiques</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-black mt-1 flex-shrink-0" aria-hidden="true" />
                <span>Certificat de participation</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-6 h-6 text-black mt-1 flex-shrink-0" aria-hidden="true" />
                <span>Support et ressources complémentaires en ligne</span>
              </li>
            </ul>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-16">
            <a
              href="/cities"
              className="inline-block px-12 py-4 bg-black text-white font-bold text-lg hover:bg-gray-900 transition-colors"
            >
              Réserver ma place
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
