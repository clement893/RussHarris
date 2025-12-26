/**
 * Support Tickets Page
 * 
 * Page for viewing and managing support tickets.
 */

'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/lib/store';
import { SupportTickets } from '@/components/help';
import type { SupportTicket } from '@/components/help';
import { PageHeader, PageContainer } from '@/components/layout';
import { Loading, Alert } from '@/components/ui';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { logger } from '@/lib/logger';

export default function SupportTicketsPage() {
  const t = useTranslations('help.tickets');
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth/login');
      return;
    }

    loadTickets();
  }, [isAuthenticated, router]);

  const loadTickets = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // TODO: Replace with actual support tickets API endpoint when available
      // const response = await apiClient.get('/v1/support/tickets');
      // setTickets(response.data);
      
      setTickets([]);
      setIsLoading(false);
    } catch (error) {
      logger.error('Failed to load support tickets', error instanceof Error ? error : new Error(String(error)));
      setError(t('errors.loadFailed') || 'Failed to load support tickets. Please try again.');
      setIsLoading(false);
    }
  }, [t]);

  const handleCreateTicket = () => {
    router.push('/help/contact');
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <PageContainer>
          <div className="flex items-center justify-center min-h-[400px]">
            <Loading />
          </div>
        </PageContainer>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <PageContainer>
        <PageHeader
          title={t('title') || 'Support Tickets'}
          description={t('description') || 'View and manage your support tickets'}
          breadcrumbs={[
            { label: t('breadcrumbs.home') || 'Home', href: '/' },
            { label: t('breadcrumbs.help') || 'Help', href: '/help' },
            { label: t('breadcrumbs.tickets') || 'Tickets' },
          ]}
        />

        {error && (
          <div className="mt-6">
            <Alert variant="error" onClose={() => setError(null)}>
              {error}
            </Alert>
          </div>
        )}

        <div className="mt-8">
          <SupportTickets
            tickets={tickets}
            onCreateTicket={handleCreateTicket}
          />
        </div>
      </PageContainer>
    </ProtectedRoute>
  );
}

