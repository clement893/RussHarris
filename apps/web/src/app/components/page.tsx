'use client';

import Link from 'next/link';
import { Card, Badge } from '@/components/ui';
import { PageHeader, PageContainer } from '@/components/layout';

const categories = [
  { title: 'Formulaires', description: 'Composants pour creer des formulaires interactifs', href: '/components/forms', icon: 'ðŸ“', count: 8, color: 'blue' },
  { title: 'Navigation', description: 'Composants de navigation et menus', href: '/components/navigation', icon: 'ðŸ§­', count: 4, color: 'green' },
  { title: 'Feedback', description: 'Alertes, modales, notifications et indicateurs', href: '/components/feedback', icon: 'ðŸ””', count: 7, color: 'yellow' },
  { title: 'Donnees', description: 'Tableaux, cartes et affichage de donnees', href: '/components/data', icon: 'ðŸ“Š', count: 3, color: 'purple' },
  { title: 'Utilitaires', description: 'Composants utilitaires et helpers', href: '/components/utils', icon: 'ðŸ› ï¸', count: 6, color: 'pink' },
  { title: 'Theme', description: 'Mode sombre/clair et gestion des themes', href: '/components/theme', icon: 'ðŸŽ¨', count: 2, color: 'indigo' },
];

export default function ComponentsPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Bibliotheque de Composants"
        description="Collection complete de composants reutilisables pour construire des applications SaaS modernes"
        badge={<Badge variant="info">30+ composants disponibles</Badge>}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {categories.map((category) => (
          <Link key={category.href} href={category.href}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{category.icon}</div>
                <Badge variant="default">{category.count} composants</Badge>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{category.title}</h2>
              <p className="text-gray-600 dark:text-gray-400">{category.description}</p>
              <div className="mt-4 text-blue-600 dark:text-blue-400 font-medium">Voir les exemples â†’</div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
        <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-2">Comment utiliser ces composants ?</h3>
          <p className="text-blue-800 dark:text-blue-300 mb-4">
            Tous les composants sont disponibles via l'import depuis <code className="bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded">@/components/ui</code>
          </p>
          <pre className="bg-gray-900 dark:bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto">
            <code>{`import { Button, Input, Modal } from '@/components/ui';`}</code>
          </pre>
        </div>

        <Link href="/dashboard">
          <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 border-indigo-200 dark:border-indigo-800">
            <div className="flex items-start justify-between mb-4">
              <div className="text-4xl">ðŸ </div>
              <Badge variant="info">Espace client</Badge>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
              Acceder a l'espace client
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Decouvrez l'interface utilisateur interne avec menu lateral et dashboard complet
            </p>
            <div className="mt-4 text-indigo-600 dark:text-indigo-400 font-medium flex items-center gap-2">
              Acceder au dashboard
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Card>
        </Link>
      </div>
    </PageContainer>
  );
}