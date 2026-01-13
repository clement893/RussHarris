/**
 * About Russ Harris Page
 * Biography and key information about Russ Harris
 */

'use client';

import Image from 'next/image';
import { Button, Container } from '@/components/ui';
import { Link } from '@/i18n/routing';
import { Award, Book, Globe, Users, Hexagon } from 'lucide-react';

export default function AboutRussPage() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white text-gray-900">
      {/* Hero Section - Avec gris anthracite élégant */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden py-20 bg-gradient-to-br from-[#1F2937] via-[#111827] to-[#0F172A]">
        {/* Grille hexagonale subtile en arrière-plan */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexPatternAbout" x="0" y="0" width="100" height="86.6" patternUnits="userSpaceOnUse">
                <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexPatternAbout)" />
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
              À propos de Russ Harris
            </h1>
            <p className="text-xl md:text-2xl font-light text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Médecin, psychothérapeute et formateur internationalement reconnu dans le domaine de la Thérapie d'Acceptation et d'Engagement (ACT).
            </p>
          </div>
        </Container>
      </section>

      {/* Section Biographie */}
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
            <div className="md:col-span-3 space-y-6">
              <p className="text-xl text-gray-700 leading-relaxed">
                Russ Harris est un médecin, psychothérapeute et formateur internationalement reconnu 
                dans le domaine de la Thérapie d'Acceptation et d'Engagement (ACT). 
                Il est l'auteur de plusieurs best-sellers, dont "Le piège du bonheur" 
                (The Happiness Trap), traduit en plus de 30 langues.
              </p>
              
              <p className="text-xl text-gray-700 leading-relaxed">
                Avec plus de 20 ans d'expérience, Russ a formé des milliers de professionnels 
                de la santé mentale à travers le monde. Sa capacité à rendre l'ACT accessible 
                et applicable dans la pratique clinique quotidienne en fait l'un des formateurs 
                les plus recherchés au monde.
              </p>

              <p className="text-xl text-gray-700 leading-relaxed">
                Dans cette masterclass exclusive, Russ partagera ses connaissances approfondies, 
                ses techniques éprouvées et ses insights uniques pour vous aider à maîtriser 
                l'ACT et à transformer votre pratique professionnelle.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Section Points Clés */}
      <section className="py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.015]">
          <svg className="w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexPatternKeyPoints" x="0" y="0" width="100" height="86.6" patternUnits="userSpaceOnUse">
                <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" fill="none" stroke="#1F2937" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexPatternKeyPoints)" />
          </svg>
        </div>

        <Container className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors relative">
              <div className="absolute top-4 right-4 w-12 h-12 opacity-5">
                <Hexagon className="w-full h-full text-[#FF8C42]" />
              </div>
              <div className="mb-6 text-[#FF8C42]">
                <Book className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Auteur Best-Seller</h3>
              <p className="text-gray-600 text-sm">
                Auteur de "Le piège du bonheur" et de nombreux autres ouvrages sur l'ACT, traduits dans plus de 30 langues.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors relative">
              <div className="absolute top-4 right-4 w-12 h-12 opacity-5">
                <Hexagon className="w-full h-full text-[#FF8C42]" />
              </div>
              <div className="mb-6 text-[#FF8C42]">
                <Globe className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Formateur International</h3>
              <p className="text-gray-600 text-sm">
                Formé des milliers de professionnels dans plus de 30 pays à travers le monde.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors relative">
              <div className="absolute top-4 right-4 w-12 h-12 opacity-5">
                <Hexagon className="w-full h-full text-[#FF8C42]" />
              </div>
              <div className="mb-6 text-[#FF8C42]">
                <Award className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Expert Reconnu</h3>
              <p className="text-gray-600 text-sm">
                Reconnu comme l'un des principaux experts mondiaux en ACT avec plus de 20 ans d'expérience clinique.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors relative">
              <div className="absolute top-4 right-4 w-12 h-12 opacity-5">
                <Hexagon className="w-full h-full text-[#FF8C42]" />
              </div>
              <div className="mb-6 text-[#FF8C42]">
                <Users className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Pratique Clinique</h3>
              <p className="text-gray-600 text-sm">
                Pratique clinique active avec une approche pragmatique et centrée sur l'efficacité thérapeutique.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Final */}
      <section className="py-32 bg-gradient-to-br from-[#1F2937] via-[#111827] to-[#0F172A] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexPatternCTAAbout" x="0" y="0" width="100" height="86.6" patternUnits="userSpaceOnUse">
                <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexPatternCTAAbout)" />
          </svg>
        </div>

        <Container className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-8">
            Rejoignez la Masterclass
          </h2>
          <p className="text-xl text-gray-300 mb-12">
            Découvrez l'ACT avec Russ Harris et transformez votre pratique professionnelle.
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
