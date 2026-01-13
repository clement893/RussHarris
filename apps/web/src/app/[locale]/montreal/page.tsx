'use client';

import { Button, Container } from '@/components/ui';
import { Link } from '@/i18n/routing';
import { Calendar, MapPin, Clock, Users, Building, CheckCircle, Ticket } from 'lucide-react';

export default function MontrealPage() {
  const pricingOptions = [
    {
      id: 'early-bird',
      name: 'Early Bird',
      price: 450,
      currency: 'CAD',
      description: 'Tarif préférentiel pour réservations anticipées',
      badge: 'Meilleur prix',
      deadline: 'Jusqu\'au 1er mars 2026',
      features: [
        'Accès complet à la masterclass (2 jours)',
        'Manuel de formation (PDF)',
        'Certificat de participation',
      ],
    },
    {
      id: 'regular',
      name: 'Tarif Standard',
      price: 550,
      currency: 'CAD',
      description: 'Tarif standard',
      badge: null,
      features: [
        'Accès complet à la masterclass (2 jours)',
        'Manuel de formation (PDF)',
        'Certificat de participation',
      ],
    },
    {
      id: 'group',
      name: 'Tarif Groupe',
      price: 400,
      currency: 'CAD',
      description: 'Tarif réduit pour groupes de 3+ personnes',
      badge: 'Réduction 10%',
      minQuantity: 3,
      features: [
        'Accès complet à la masterclass (2 jours)',
        'Manuel de formation (PDF)',
        'Certificat de participation',
        'Réduction de groupe appliquée',
      ],
    },
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white text-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-br from-[#1F2937] via-[#111827] to-[#0F172A]">
        <Container className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              MONTRÉAL
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-4">
              Masterclass ACT avec Dr. Russ Harris
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Deux jours intensifs pour découvrir la Thérapie d'Acceptation et d'Engagement avec l'un des formateurs les plus respectés au monde.
            </p>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
              <Calendar className="w-8 h-8 text-[#FF8C42] mb-3" />
              <div className="text-white">
                <div className="text-sm text-gray-400 mb-1">Dates</div>
                <div className="text-xl font-bold">24-25 mai 2026</div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
              <MapPin className="w-8 h-8 text-[#FF8C42] mb-3" />
              <div className="text-white">
                <div className="text-sm text-gray-400 mb-1">Lieu</div>
                <div className="text-lg font-bold">Palais des Congrès</div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
              <Clock className="w-8 h-8 text-[#FF8C42] mb-3" />
              <div className="text-white">
                <div className="text-sm text-gray-400 mb-1">Horaires</div>
                <div className="text-lg font-bold">9h - 17h</div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/30 rounded-2xl p-6 border border-gray-700/50">
              <Users className="w-8 h-8 text-[#FF8C42] mb-3" />
              <div className="text-white">
                <div className="text-sm text-gray-400 mb-1">Places</div>
                <div className="text-xl font-bold">200 places</div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Programme Section */}
      <section className="py-20 bg-white">
        <Container className="max-w-7xl mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 text-center">
              Le Programme
            </h2>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="border border-gray-200 rounded-2xl p-8 bg-gradient-to-br from-white to-gray-50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#FF8C42] text-white flex items-center justify-center font-bold text-xl rounded-full">
                    1
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Jour 1 - Fondements</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Matin (9h-12h30)</h4>
                    <p className="text-gray-600 text-sm">
                      Introduction à l'ACT • Le modèle hexaflex • Démonstrations pratiques
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Après-midi (14h-17h)</h4>
                    <p className="text-gray-600 text-sm">
                      Acceptation et défusion cognitive • Contact avec le moment présent • Exercices pratiques
                    </p>
                  </div>
                </div>
              </div>
              <div className="border border-gray-200 rounded-2xl p-8 bg-gradient-to-br from-white to-gray-50">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#FF8C42] text-white flex items-center justify-center font-bold text-xl rounded-full">
                    2
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Jour 2 - Application</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Matin (9h-12h30)</h4>
                    <p className="text-gray-600 text-sm">
                      Valeurs et action engagée • Soi comme contexte • Intégration clinique
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">Après-midi (14h-17h)</h4>
                    <p className="text-gray-600 text-sm">
                      Applications pratiques • Études de cas • Plan d'action personnel
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Billeterie Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <Container className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Billeterie
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choisissez le tarif qui vous convient
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingOptions.map((option) => (
              <div
                key={option.id}
                className={`relative border-2 rounded-2xl p-8 bg-white ${
                  option.id === 'early-bird'
                    ? 'border-[#FF8C42] shadow-xl scale-105'
                    : 'border-gray-200 hover:border-[#FF8C42]/50'
                } transition-all`}
              >
                {option.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-[#FF8C42] text-white px-4 py-1 rounded-full text-sm font-bold">
                      {option.badge}
                    </span>
                  </div>
                )}
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{option.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{option.description}</p>
                  {option.deadline && (
                    <p className="text-xs text-gray-500 mb-4">{option.deadline}</p>
                  )}
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{option.price}</span>
                    <span className="text-lg text-gray-600 ml-2">{option.currency}</span>
                  </div>
                  {option.minQuantity && (
                    <p className="text-sm text-gray-600">Minimum {option.minQuantity} personnes</p>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {option.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#FF8C42] flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/book" className="block">
                  <Button
                    className={`w-full py-3 rounded-full font-medium ${
                      option.id === 'early-bird'
                        ? 'bg-[#FF8C42] hover:bg-[#FF7A29] text-white'
                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                    }`}
                  >
                    <Ticket className="w-4 h-4 mr-2 inline" />
                    Réserver
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Info Pratique Section */}
      <section className="py-20 bg-white">
        <Container className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Informations Pratiques
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Building className="w-5 h-5 text-[#FF8C42]" />
                  Lieu
                </h3>
                <p className="text-gray-600">
                  <strong>Palais des Congrès de Montréal</strong>
                  <br />
                  1001, Place Jean-Paul-Riopelle
                  <br />
                  Montréal, QC H2Z 1H5
                  <br />
                  Canada
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#FF8C42]" />
                  Horaires
                </h3>
                <p className="text-gray-600">
                  <strong>Jour 1 & 2 :</strong>
                  <br />
                  Accueil : 8h30
                  <br />
                  Formation : 9h - 17h
                  <br />
                  Pause déjeuner : 12h30 - 14h
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Qui peut participer ?</h3>
                <p className="text-gray-600 mb-3">
                  Cette masterclass s'adresse aux professionnels de la santé mentale :
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#FF8C42] flex-shrink-0 mt-0.5" />
                    <span>Psychothérapeutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#FF8C42] flex-shrink-0 mt-0.5" />
                    <span>Psychologues</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#FF8C42] flex-shrink-0 mt-0.5" />
                    <span>Médecins</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[#FF8C42] flex-shrink-0 mt-0.5" />
                    <span>Conseillers et coachs</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
