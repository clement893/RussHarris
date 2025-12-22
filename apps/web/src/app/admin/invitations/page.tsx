'use client';

import { PageHeader, PageContainer } from '@/components/layout';

// Disable static generation to avoid CSS file issues during build
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const runtime = 'nodejs';
export const fetchCache = 'force-no-store';

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

