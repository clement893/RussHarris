/**
 * Examples Index Page
 * Liste de tous les exemples SaaS
 */

'use client';

import Link from 'next/link';
import { Card } from '@/components/ui';
import { PageHeader, PageContainer } from '@/components/layout';

const examples = [
  {
    title: 'Dashboard',
    description: 'Dashboard complet avec statistiques, graphiques et tableaux',
    href: '/examples/dashboard',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: 'bg-blue-500',
  },
  {
    title: 'Paramètres',
    description: 'Page de paramètres avec onglets et formulaires',
    href: '/examples/settings',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: 'bg-purple-500',
  },
  {
    title: 'Onboarding',
    description: 'Flow d\'onboarding avec stepper et formulaires multi-étapes',
    href: '/examples/onboarding',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    color: 'bg-green-500',
  },
];

export default function ExamplesPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Exemples SaaS"
        description="Exemples complets d'utilisation des composants dans des scénarios SaaS réels"
        breadcrumbs={[{ label: 'Accueil', href: '/' }, { label: 'Exemples' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {examples.map((example) => (
          <Link key={example.href} href={example.href}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
              <div className="p-6">
                <div className={`${example.color} w-16 h-16 rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                  {example.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {example.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {example.description}
                </p>
                <div className="mt-4 flex items-center text-primary-600 dark:text-primary-400 text-sm font-medium group-hover:translate-x-1 transition-transform">
                  Voir l'exemple
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}

