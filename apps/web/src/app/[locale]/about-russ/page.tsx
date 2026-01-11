/**
 * About Russ Harris Page
 * Biography and key information about Russ Harris
 */

'use client';

import { Container } from '@/components/ui';
import SwissDivider from '@/components/masterclass/SwissDivider';
import BenefitsGrid, { type Benefit } from '@/components/masterclass/BenefitsGrid';
import { Award, Book, Globe, Users } from 'lucide-react';

export default function AboutRussPage() {
  const keyPoints: Benefit[] = [
    {
      icon: <Book className="w-12 h-12" />,
      title: 'Auteur Best-Seller',
      description: 'Auteur de "Le piège du bonheur" et de nombreux autres ouvrages sur l\'ACT, traduits dans plus de 30 langues.',
    },
    {
      icon: <Globe className="w-12 h-12" />,
      title: 'Formateur International',
      description: 'Formé des milliers de professionnels dans plus de 30 pays à travers le monde.',
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: 'Expert Reconnu',
      description: 'Reconnu comme l\'un des principaux experts mondiaux en ACT avec plus de 20 ans d\'expérience clinique.',
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: 'Pratique Clinique',
      description: 'Pratique clinique active avec une approche pragmatique et centrée sur l\'efficacité thérapeutique.',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Container className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <h1 className="swiss-display text-6xl md:text-8xl mb-6 text-black">
              À propos de Russ Harris
            </h1>
            <SwissDivider />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            {/* Photo Section */}
            <div className="md:col-span-1">
              <div className="w-full aspect-square bg-gray-200 mb-6">
                {/* Placeholder for professional photo */}
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Photo professionnelle
                </div>
              </div>
            </div>

            {/* Biography */}
            <div className="md:col-span-2 space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                Russ Harris est un médecin, psychothérapeute et formateur internationalement reconnu 
                dans le domaine de la Thérapie d'Acceptation et d'Engagement (ACT). 
                Il est l'auteur de plusieurs best-sellers, dont "Le piège du bonheur" 
                (The Happiness Trap), traduit en plus de 30 langues.
              </p>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                Avec plus de 20 ans d'expérience, Russ a formé des milliers de professionnels 
                de la santé mentale à travers le monde. Sa capacité à rendre l'ACT accessible 
                et applicable dans la pratique clinique quotidienne en fait l'un des formateurs 
                les plus recherchés au monde.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                Dans cette masterclass exclusive, Russ partagera ses connaissances approfondies, 
                ses techniques éprouvées et ses insights uniques pour vous aider à maîtriser 
                l'ACT et à transformer votre pratique professionnelle.
              </p>
            </div>
          </div>

          <SwissDivider className="my-16" />

          {/* Key Points */}
          <BenefitsGrid
            benefits={keyPoints}
            title={undefined}
            subtitle={undefined}
            className="!py-0"
          />

          <SwissDivider className="my-16" />

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-black text-black mb-6">
              Rejoignez la Masterclass
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Découvrez l'ACT avec Russ Harris et transformez votre pratique professionnelle.
            </p>
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
