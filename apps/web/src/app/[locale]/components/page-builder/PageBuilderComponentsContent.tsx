/**
 * Page Builder Components Showcase Page
 */

'use client';

import { PageHeader, PageContainer, Section } from '@/components/layout';
import { PageEditor, PagePreview, SectionTemplates } from '@/components/page-builder';
import type { PageSection } from '@/components/page-builder';
import { useState } from 'react';

export default function PageBuilderComponentsContent() {
  const [sections] = useState<PageSection[]>([
    {
      id: '1',
      type: 'hero',
      title: 'Welcome',
      content: 'Hero section content',
    },
    {
      id: '2',
      type: 'content',
      title: 'About',
      content: 'Content section',
    },
  ]);

  return (
    <PageContainer>
      <PageHeader
        title="Page Builder"
        description="Composants de création de pages avec édition visuelle"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Composants', href: '/components' },
          { label: 'Page Builder' },
        ]}
      />

      <div className="space-y-8 mt-8">
        <Section title="Page Editor">
          <div className="max-w-6xl">
            <PageEditor
              initialSections={sections}
              onSave={async (sections) => {
                console.log('Sections saved:', sections);
              }}
              onPreview={() => {
                console.log('Preview clicked');
              }}
            />
          </div>
        </Section>

        <Section title="Page Preview">
          <div className="max-w-6xl">
            <PagePreview sections={sections} />
          </div>
        </Section>

        <Section title="Section Templates">
          <div className="max-w-6xl">
            <SectionTemplates
              onSelectTemplate={(template) => {
                console.log('Template selected:', template);
              }}
            />
          </div>
        </Section>
      </div>
    </PageContainer>
  );
}

