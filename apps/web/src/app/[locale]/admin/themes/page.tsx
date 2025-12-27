'use client';

/**
 * Theme Management Page
 * Main page for superadmin theme management
 */

import { PageHeader, PageContainer } from '@/components/layout';
import { ThemeList } from './components/ThemeList';
import type { Theme } from '@modele/types';

export default function ThemesPage() {
  const handleCreateTheme = () => {
    // Will be implemented in Batch 4
    console.log('Create theme clicked');
  };

  const handleEditTheme = (theme: Theme) => {
    // Will be implemented in Batch 4
    console.log('Edit theme:', theme);
  };

  const handleDeleteTheme = (theme: Theme) => {
    // Will be implemented in Batch 3
    console.log('Delete theme:', theme);
  };

  const handleActivateTheme = (theme: Theme) => {
    // Will be implemented in Batch 3
    console.log('Activate theme:', theme);
  };

  const handleDuplicateTheme = (theme: Theme) => {
    // Will be implemented in Batch 14
    console.log('Duplicate theme:', theme);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Gestion des Thèmes"
        description="Créez, modifiez et activez les thèmes de la plateforme"
        breadcrumbs={[
          { label: 'Accueil', href: '/' },
          { label: 'Administration', href: '/admin' },
          { label: 'Thèmes' },
        ]}
      />

      <div className="mt-6">
        <ThemeList
          onCreateTheme={handleCreateTheme}
          onEditTheme={handleEditTheme}
          onDeleteTheme={handleDeleteTheme}
          onActivateTheme={handleActivateTheme}
          onDuplicateTheme={handleDuplicateTheme}
        />
      </div>
    </PageContainer>
  );
}

