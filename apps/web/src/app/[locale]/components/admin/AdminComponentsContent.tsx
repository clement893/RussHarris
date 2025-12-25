/**
 * Admin Components Showcase Page
 */

'use client';

import { PageHeader, PageContainer, Section } from '@/components/layout';
import InvitationManagement from '@/components/admin/InvitationManagement';
import RoleManagement from '@/components/admin/RoleManagement';
import TeamManagement from '@/components/admin/TeamManagement';
import { AdminThemeManager } from '@/components/admin/themes/AdminThemeManager';
import { Card } from '@/components/ui';

export default function AdminComponentsContent() {

  return (
    <PageContainer>
      <PageHeader
        title="Composants d'Administration"
        description="Composants pour la gestion des utilisateurs, rôles, équipes et invitations"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Composants', href: '/components' },
          { label: 'Administration' },
        ]}
      />

      <div className="space-y-8 mt-8">
        <Section title="Invitation Management">
          <InvitationManagement />
        </Section>

        <Section title="Role Management">
          <RoleManagement />
        </Section>

        <Section title="Team Management">
          <TeamManagement />
        </Section>

        <Section title="Theme Manager (Super Admin)">
          <Card className="p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              AdminThemeManager allows super admins to manage global themes that apply to all users.
            </p>
            <AdminThemeManager authToken="" />
          </Card>
        </Section>
      </div>
    </PageContainer>
  );
}

