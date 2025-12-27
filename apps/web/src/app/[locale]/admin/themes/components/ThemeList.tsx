'use client';

/**
 * ThemeList Component
 * Displays a list of all themes with their status and actions
 */

import { useEffect, useState } from 'react';
import { listThemes } from '@/lib/api/theme';
import type { Theme } from '@modele/types';
import type { ThemeListItem } from '../types';
import { Card, Button, Loading, Alert } from '@/components/ui';
import { Plus } from 'lucide-react';
import { ThemeListItem as ThemeListItemComponent } from './ThemeListItem';

interface ThemeListProps {
  onCreateTheme: () => void;
  onEditTheme: (theme: Theme) => void;
  onDeleteTheme: (theme: Theme) => void;
  onActivateTheme: (theme: Theme) => void;
  onDuplicateTheme: (theme: Theme) => void;
}

export function ThemeList({
  onCreateTheme,
  onEditTheme,
  onDeleteTheme,
  onActivateTheme,
  onDuplicateTheme,
}: ThemeListProps) {
  const [themes, setThemes] = useState<ThemeListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchThemes();
  }, []);

  const fetchThemes = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await listThemes();
      const themesList = response.themes || [];
      const activeId = response.active_theme_id || null;
      
      // Transform themes to ThemeListItem with UI properties
      const themesWithUI: ThemeListItem[] = themesList.map((theme) => ({
        ...theme,
        isActive: theme.id === activeId,
        canDelete: !theme.is_active, // Can't delete active theme
        canEdit: true, // All themes can be edited
      }));
      
      setThemes(themesWithUI);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du chargement des thèmes';
      setError(errorMessage);
      console.error('[ThemeList] Error fetching themes:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <div className="p-6 flex items-center justify-center">
          <Loading />
          <span className="ml-2 text-muted-foreground">Chargement des thèmes...</span>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Alert variant="error" title="Erreur">
        {error}
        <Button onClick={fetchThemes} variant="primary" className="mt-4" size="sm">
          Réessayer
        </Button>
      </Alert>
    );
  }

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Thèmes</h2>
            <p className="text-muted-foreground mt-1">
              {themes.length} thème{themes.length > 1 ? 's' : ''} disponible{themes.length > 1 ? 's' : ''}
            </p>
          </div>
          <Button onClick={onCreateTheme} variant="primary">
            <Plus className="w-4 h-4 mr-2" />
            Créer un thème
          </Button>
        </div>

        {themes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Aucun thème disponible</p>
            <Button onClick={onCreateTheme} variant="primary">
              <Plus className="w-4 h-4 mr-2" />
              Créer le premier thème
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {themes.map((theme) => (
              <ThemeListItemComponent
                key={theme.id}
                theme={theme}
                onEdit={() => onEditTheme(theme)}
                onDelete={() => onDeleteTheme(theme)}
                onActivate={() => onActivateTheme(theme)}
                onDuplicate={() => onDuplicateTheme(theme)}
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}

