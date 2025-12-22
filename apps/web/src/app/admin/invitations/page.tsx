'use client';

import { PageHeader, PageContainer } from '@/components/layout';

export default function InvitationsPage() {
  return (
    <PageContainer>
      <PageHeader 
        title="Invitations" 
        description="Gérer les invitations utilisateurs"
      />
      <div className="mt-6">
        <p className="text-gray-600">Page d'invitations en cours de développement.</p>
      </div>
    </PageContainer>
  );
}

