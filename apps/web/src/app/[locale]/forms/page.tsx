/**
 * Forms Management Page
 * 
 * Page for managing dynamic forms.
 */

'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { CMSFormBuilder } from '@/components/cms';
import type { CMSForm } from '@/components/cms';
import { PageHeader, PageContainer } from '@/components/layout';
import { Loading, Alert } from '@/components/ui';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { logger } from '@/lib/logger';

export default function FormsPage() {
  const t = useTranslations('forms');
  const [form, setForm] = useState<CMSForm | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadForm();
  }, []);

  const loadForm = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // TODO: Replace with actual form API endpoint when available
      // const response = await apiClient.get('/v1/forms');
      // setForm(response.data);
      
      setForm(null);
      setIsLoading(false);
    } catch (error) {
      logger.error('Failed to load form', error instanceof Error ? error : new Error(String(error)));
      setError(t('errors.loadFailed') || 'Failed to load form. Please try again.');
      setIsLoading(false);
    }
  };

  const handleSave = async (updatedForm: CMSForm) => {
    try {
      // TODO: Replace with actual form API endpoint when available
      // await apiClient.put(`/v1/forms/${updatedForm.id}`, updatedForm);
      logger.info('Saving form', { formId: updatedForm.id, formName: updatedForm.name });
      setForm(updatedForm);
    } catch (error) {
      logger.error('Failed to save form', error instanceof Error ? error : new Error(String(error)));
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
          title={t('title') || 'Form Builder'}
          description={t('description') || 'Create and manage dynamic forms'}
          breadcrumbs={[
            { label: t('breadcrumbs.home') || 'Home', href: '/' },
            { label: t('breadcrumbs.forms') || 'Forms' },
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
          <CMSFormBuilder form={form || undefined} onSave={handleSave} />
        </div>
      </PageContainer>
    </ProtectedRoute>
  );
}

