/**
 * Templates Components Showcase Page
 */

'use client';

import { PageHeader, PageContainer, Section } from '@/components/layout';
import { logger } from '@/lib/logger';
import { TemplateManager, TemplateEditor } from '@/components/templates';

export default function TemplatesComponentsContent() {
  return (
    <PageContainer>
      <PageHeader
        title="Composants Templates"
        description="Gestion de modèles de contenu réutilisables"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Composants', href: '/components' },
          { label: 'Templates' },
        ]}
      />

      <div className="space-y-8 mt-8">
        <Section title="Template Manager">
          <div className="max-w-4xl">
            <TemplateManager
              entityType="page"
              onSelect={(template) => {
                logger.log('Template selected:', template);
              }}
            />
          </div>
        </Section>

        <Section title="Template Editor">
          <div className="max-w-4xl">
            <TemplateEditor
              entityType="page"
              templateId={1}
              onSave={async (template) => {
                logger.log('Template saved:', template);
              }}
            />
          </div>
        </Section>
      </div>
    </PageContainer>
  );
}

