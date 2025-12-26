/**
 * Search Components Showcase Page
 */

'use client';

import { PageHeader, PageContainer, Section } from '@/components/layout';
import { SearchBar, AdvancedFilters } from '@/components/search';
import type { FilterConfig } from '@/components/search/AdvancedFilters';
import { logger } from '@/lib/logger';
import { useState } from 'react';

export default function SearchComponentsContent() {
  const [filters, setFilters] = useState<FilterConfig[]>([]);

  return (
    <PageContainer>
      <PageHeader
        title="Composants Recherche"
        description="Barre de recherche et filtres avancés"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Composants', href: '/components' },
          { label: 'Recherche' },
        ]}
      />

      <div className="space-y-8 mt-8">
        <Section title="Search Bar">
          <div className="max-w-2xl">
            <SearchBar
              entityType="users"
              placeholder="Rechercher des utilisateurs..."
              onResults={(results) => {
                logger.info('Search results:', { results });
              }}
              onSelect={(item) => {
                logger.info('Item selected:', { item });
              }}
            />
          </div>
        </Section>

        <Section title="Advanced Filters">
          <div className="max-w-4xl">
            <AdvancedFilters
              filters={filters}
              availableFields={[
                { value: 'name', label: 'Name', type: 'string' },
                { value: 'email', label: 'Email', type: 'string' },
                { value: 'created_at', label: 'Created At', type: 'date' },
              ]}
              onFiltersChange={(newFilters) => {
                setFilters(newFilters);
                logger.info('Filters changed:', { filters: newFilters });
              }}
            />
          </div>
        </Section>
      </div>
    </PageContainer>
  );
}

