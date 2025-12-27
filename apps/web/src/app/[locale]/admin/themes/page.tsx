'use client';

/**
 * Theme Management Page
 * Main page for superadmin theme management
 */

import { PageHeader, PageContainer } from '@/components/layout';
import { Card } from '@/components/ui';

export default function ThemesPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Gestion des Thèmes"
        description="Créez, modifiez et activez les thèmes de la plateforme"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Administration', href: '/admin' },
          { label: 'Thèmes' },
        ]}
      />

      <div className="mt-6">
        <Card>
          <div className="p-6">
            <p className="text-muted-foreground">
              Interface de gestion des thèmes en cours de développement.
            </p>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}

