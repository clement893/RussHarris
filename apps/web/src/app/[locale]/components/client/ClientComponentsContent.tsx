/**
 * Client Portal Components Showcase Page
 */

'use client';

import { PageHeader, PageContainer, Section } from '@/components/layout';
import { ClientNavigation, ClientDashboard } from '@/components/client';

export default function ClientComponentsContent() {
  return (
    <PageContainer>
      <PageHeader
        title="Portail Client"
        description="Composants pour le portail client avec navigation et tableau de bord"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Composants', href: '/components' },
          { label: 'Portail Client' },
        ]}
      />

      <div className="space-y-8 mt-8">
        <Section title="Client Navigation">
          <div className="max-w-4xl">
            <ClientNavigation />
          </div>
        </Section>

        <Section title="Client Dashboard">
          <ClientDashboard />
        </Section>
      </div>
    </PageContainer>
  );
}

