/**
 * ERP Portal Components Showcase Page
 */

'use client';

import { PageHeader, PageContainer, Section } from '@/components/layout';
import { ERPNavigation, ERPDashboard } from '@/components/erp';

export default function ERPComponentsContent() {
  return (
    <PageContainer>
      <PageHeader
        title="Portail ERP"
        description="Composants pour le portail ERP avec navigation et tableau de bord"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Composants', href: '/components' },
          { label: 'Portail ERP' },
        ]}
      />

      <div className="space-y-8 mt-8">
        <Section title="ERP Navigation">
          <div className="max-w-4xl">
            <ERPNavigation />
          </div>
        </Section>

        <Section title="ERP Dashboard">
          <ERPDashboard />
        </Section>
      </div>
    </PageContainer>
  );
}

