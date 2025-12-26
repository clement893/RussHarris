/**
 * Pages Management Page
 * 
 * Page for managing content pages with CRUD operations.
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuthStore } from '@/lib/store';
import { PagesManager } from '@/components/content';
import type { Page } from '@/components/content';
import { PageHeader, PageContainer } from '@/components/layout';
import { Loading, Alert } from '@/components/ui';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { logger } from '@/lib/logger';

export default function PagesManagementPage() {
  const router = useRouter();
  const t = useTranslations('content.pages');
  const { isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pages, setPages] = useState<Page[]>([]);

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/auth/login');
      return;
    }

    loadPages();
  }, [isAuthenticated, router]);

  const loadPages = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // TODO: Load pages from API when backend endpoints are ready
      // For now, use empty array
      setPages([]);
      setIsLoading(false);
    } catch (error) {
      logger.error('Failed to load pages', error instanceof Error ? error : new Error(String(error)));
      setError(t('errors.loadFailed') || 'Failed to load pages. Please try again.');
      setIsLoading(false);
    }
  };

  const handlePageCreate = async (pageData: Omit<Page, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      // TODO: Create page via API
      logger.info('Creating page', pageData);
      await loadPages();
    } catch (error) {
      logger.error('Failed to create page', error instanceof Error ? error : new Error(String(error)));
      throw error;
    }
  };

  const handlePageUpdate = async (id: number, pageData: Partial<Page>) => {
    try {
      // TODO: Update page via API
      logger.info('Updating page', { id, pageData });
      await loadPages();
    } catch (error) {
      logger.error('Failed to update page', error instanceof Error ? error : new Error(String(error)));
      throw error;
    }
  };

  const handlePageDelete = async (id: number) => {
    try {
      // TODO: Delete page via API
      logger.info('Deleting page', { id });
      await loadPages();
    } catch (error) {
      logger.error('Failed to delete page', error instanceof Error ? error : new Error(String(error)));
      throw error;
    }
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
          title={t('title') || 'Pages Management'}
          description={t('description') || 'Create and manage your content pages'}
          breadcrumbs={[
            { label: t('breadcrumbs.dashboard') || 'Dashboard', href: '/dashboard' },
            { label: t('breadcrumbs.content') || 'Content', href: '/content' },
            { label: t('breadcrumbs.pages') || 'Pages' },
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
          <PagesManager
            pages={pages}
            onPageCreate={handlePageCreate}
            onPageUpdate={handlePageUpdate}
            onPageDelete={handlePageDelete}
          />
        </div>
      </PageContainer>
    </ProtectedRoute>
  );
}

