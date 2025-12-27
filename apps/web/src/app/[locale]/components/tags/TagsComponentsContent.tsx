/**
 * Tags Components Showcase Page
 */

'use client';

import { PageHeader, PageContainer, Section } from '@/components/layout';
import { logger } from '@/lib/logger';
import { TagManager, TagInput } from '@/components/tags';
import { useState } from 'react';

interface Tag {
  id: number;
  name: string;
  slug: string;
  color?: string;
}

export default function TagsComponentsContent() {
  const [tags, setTags] = useState<Tag[]>([]);

  return (
    <PageContainer>
      <PageHeader
        title="Composants Tags"
        description="Gestion et saisie de tags pour le contenu"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Composants', href: '/components' },
          { label: 'Tags' },
        ]}
      />

      <div className="space-y-8 mt-8">
        <Section title="Tag Manager">
          <div className="max-w-4xl">
            <TagManager entityType="post" />
          </div>
        </Section>

        <Section title="Tag Input">
          <div className="max-w-2xl">
            <TagInput
              entityType="post"
              entityId={1}
              selectedTags={tags}
              onTagsChange={(newTags) => {
                setTags(newTags);
                logger.log('Tags changed:', newTags);
              }}
              placeholder="Add tags..."
            />
          </div>
        </Section>
      </div>
    </PageContainer>
  );
}

