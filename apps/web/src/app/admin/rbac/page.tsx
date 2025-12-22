'use client';

import { PageHeader, PageContainer } from '@/components/layout';

// Disable static generation to avoid CSS file issues during build
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';

export default function RBACPage() {
  return (
    <PageContainer>
      <PageHeader
        title="RBAC (Role-Based Access Control)"
        description="Gestion des rôles et permissions"
        breadcrumbs={[{ label: 'Accueil', href: '/' }, { label: 'Administration', href: '/admin' }, { label: 'RBAC' }]}
      />
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Gestion des rôles et permissions</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Cette page est en cours de développement.
          </p>
        </div>
      </div>
    </PageContainer>
  );
}

