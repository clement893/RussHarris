/**
 * Versions Components Showcase Page
 */

'use client';

import { PageHeader, PageContainer, Section } from '@/components/layout';
import { VersionHistory, DiffViewer } from '@/components/versions';

export default function VersionsComponentsContent() {
  return (
    <PageContainer>
      <PageHeader
        title="Composants Versions"
        description="Gestion de l'historique des versions et comparaison de différences"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Composants', href: '/components' },
          { label: 'Versions' },
        ]}
      />

      <div className="space-y-8 mt-8">
        <Section title="Version History">
          <div className="max-w-4xl">
            <VersionHistory
              entityType="page"
              entityId={1}
              onRestore={(version) => {
                console.log('Restore version:', version);
              }}
            />
          </div>
        </Section>

        <Section title="Diff Viewer">
          <div className="max-w-4xl">
            <DiffViewer
              diff={{
                added: { newField: 'new value' },
                removed: { oldField: 'old value' },
                modified: {
                  changedField: {
                    old: 'old value',
                    new: 'new value',
                  },
                },
              }}
            />
          </div>
        </Section>
      </div>
    </PageContainer>
  );
}

