/**
 * Hook for managing theme editor state
 * This will be expanded in later batches
 */

import { useState, useCallback } from 'react';
import type { Theme, ThemeConfig } from '@modele/types';
import type { ThemeEditorState } from '../types';

export function useThemeEditor(initialTheme: Theme | null = null) {
  const [state, setState] = useState<ThemeEditorState>({
    theme: initialTheme,
    config: initialTheme?.config || ({} as ThemeConfig),
    isEditing: !!initialTheme,
    isDirty: false,
    activeTab: 'form',
    errors: {},
  });

  const updateConfig = useCallback((updates: Partial<ThemeConfig>) => {
    setState((prev) => ({
      ...prev,
      config: { ...prev.config, ...updates } as ThemeConfig,
      isDirty: true,
    }));
  }, []);

  const setActiveTab = useCallback((tab: 'form' | 'json' | 'preview') => {
    setState((prev) => ({ ...prev, activeTab: tab }));
  }, []);

  const reset = useCallback(() => {
    setState({
      theme: initialTheme,
      config: initialTheme?.config || ({} as ThemeConfig),
      isEditing: !!initialTheme,
      isDirty: false,
      activeTab: 'form',
      errors: {},
    });
  }, [initialTheme]);

  return {
    state,
    updateConfig,
    setActiveTab,
    reset,
  };
}

