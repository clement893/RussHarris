/**
 * ProgramPreview Component
 * Condensed preview of the 2-day masterclass program
 * Swiss Style: timeline visual, clean design
 */

'use client';

import { Clock, Target, BookOpen } from 'lucide-react';
import { Container } from '@/components/ui';
import SwissDivider from './SwissDivider';
import SwissCard from './SwissCard';
import ButtonLink from '@/components/ui/ButtonLink';

interface ProgramPreviewProps {
  className?: string;
}

export default function ProgramPreview({ className }: ProgramPreviewProps) {
  return (
    <section className={`bg-gray-50 py-20 md:py-32 ${className || ''}`} aria-labelledby="program-preview-heading">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-16 text-center">
            <h2 id="program-preview-heading" className="swiss-display text-5xl md:text-6xl font-black text-black mb-6">
              Le Programme en Bref
            </h2>
            <SwissDivider className="mx-auto max-w-md" />
            <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
              Une formation intensive de 2 jours pour maîtriser l'ACT avec Russ Harris
            </p>
          </div>

          {/* Timeline Preview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Day 1 */}
            <SwissCard className="p-8 border-2 border-black">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-black text-xl">
                  1
                </div>
                <h3 className="text-2xl font-black text-black">Jour 1</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-bold text-black mb-1">9h - 17h</p>
                    <p className="text-gray-600 text-sm">Fondements théoriques et techniques de base</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-bold text-black mb-1">Objectifs</p>
                    <p className="text-gray-600 text-sm">Comprendre les 6 processus de l'ACT</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-bold text-black mb-1">Modules</p>
                    <p className="text-gray-600 text-sm">Démonstrations, exercices pratiques, études de cas</p>
                  </div>
                </div>
              </div>
            </SwissCard>

            {/* Day 2 */}
            <SwissCard className="p-8 border-2 border-black">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-black text-xl">
                  2
                </div>
                <h3 className="text-2xl font-black text-black">Jour 2</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-bold text-black mb-1">9h - 17h</p>
                    <p className="text-gray-600 text-sm">Applications avancées et intégration clinique</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-bold text-black mb-1">Objectifs</p>
                    <p className="text-gray-600 text-sm">Intégrer l'ACT dans sa pratique professionnelle</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="font-bold text-black mb-1">Modules</p>
                    <p className="text-gray-600 text-sm">Ateliers pratiques, supervision de cas, ressources</p>
                  </div>
                </div>
              </div>
            </SwissCard>
          </div>

          {/* CTA */}
          <div className="text-center">
            <ButtonLink
              href="/masterclass"
              variant="outline"
              className="px-8 py-4 text-lg font-black border-2 border-black hover:bg-black hover:text-white transition-all duration-200"
            >
              Voir le programme détaillé
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
