'use client';

/**
 * ThemeEditor Component
 * Main editor component with tabs for Form, JSON, and Preview
 */

import { useState, useEffect } from 'react';
import { useThemeEditor } from '../hooks/useThemeEditor';
import { ThemeTabs } from './ThemeTabs';
import { ThemeForm } from './ThemeForm';
import { JSONEditor } from './JSONEditor';
import { ThemePreview } from './ThemePreview';
import { Card, Button, Alert } from '@/components/ui';
import type { Theme, ThemeConfig } from '@modele/types';
import type { ThemeFormData } from '../types';
import { X, Save } from 'lucide-react';
import { logger } from '@/lib/logger';

interface ThemeEditorProps {
  theme: Theme | null;
  onSave: (config: ThemeConfig, formData: ThemeFormData) => Promise<void>;
  onCancel: () => void;
}

// Check if theme is TemplateTheme (ID 32 or name 'template-theme')
function isTemplateTheme(theme: Theme | null): boolean {
  if (!theme) return false;
  return theme.id === 32 || theme.name === 'template-theme' || theme.name === 'TemplateTheme';
}

export function ThemeEditor({ theme, onSave, onCancel }: ThemeEditorProps) {
  const { state, updateConfig, setActiveTab } = useThemeEditor(theme);
  const isTemplate = isTemplateTheme(theme);
  const [formData, setFormData] = useState<ThemeFormData>({
    name: theme?.name || '',
    display_name: theme?.display_name || '',
    description: theme?.description || '',
    primary_color: (theme?.config as any)?.primary_color || '#2563eb',
    secondary_color: (theme?.config as any)?.secondary_color || '#6366f1',
    danger_color: (theme?.config as any)?.danger_color || '#dc2626',
    warning_color: (theme?.config as any)?.warning_color || '#d97706',
    info_color: (theme?.config as any)?.info_color || '#0891b2',
    success_color: (theme?.config as any)?.success_color || '#059669',
    font_family: (theme?.config as any)?.font_family || '',
    border_radius: (theme?.config as any)?.border_radius || '',
    mode: (theme?.config as any)?.mode || 'system',
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [jsonValidationError, setJsonValidationError] = useState<string | null>(null);
  const [isJSONValid, setIsJSONValid] = useState(true);

  useEffect(() => {
    if (theme) {
      // Update form data when theme changes
      setFormData({
        name: theme.name,
        display_name: theme.display_name,
        description: theme.description || '',
        primary_color: (theme.config as any)?.primary_color || '#2563eb',
        secondary_color: (theme.config as any)?.secondary_color || '#6366f1',
        danger_color: (theme.config as any)?.danger_color || '#dc2626',
        warning_color: (theme.config as any)?.warning_color || '#d97706',
        info_color: (theme.config as any)?.info_color || '#0891b2',
        success_color: (theme.config as any)?.success_color || '#059669',
        font_family: (theme.config as any)?.font_family || '',
        border_radius: (theme.config as any)?.border_radius || '',
        mode: (theme.config as any)?.mode || 'system',
      });
    } else {
      // Reset form data for new theme
      setFormData({
        name: '',
        display_name: '',
        description: '',
        primary_color: '#2563eb',
        secondary_color: '#6366f1',
        danger_color: '#dc2626',
        warning_color: '#d97706',
        info_color: '#0891b2',
        success_color: '#059669',
        font_family: '',
        border_radius: '',
        mode: 'system',
      });
    }
  }, [theme]);

  const handleFormChange = (field: keyof ThemeFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Update config when colors change
    if (field.includes('_color') || field === 'font_family' || field === 'border_radius') {
      const updatedConfig = {
        ...state.config,
        [field]: value,
      } as ThemeConfig;
      updateConfig(updatedConfig);
    }
  };

  const handleJSONChange = (newConfig: ThemeConfig) => {
    // Update config from JSON
    updateConfig(newConfig);
    
    // Sync form data with new config
    setFormData((prev) => ({
      ...prev,
      primary_color: newConfig.primary_color || prev.primary_color,
      secondary_color: newConfig.secondary_color || prev.secondary_color,
      danger_color: newConfig.danger_color || prev.danger_color,
      warning_color: newConfig.warning_color || prev.warning_color,
      info_color: newConfig.info_color || prev.info_color,
      success_color: newConfig.success_color || prev.success_color,
      font_family: (newConfig as any).font_family || prev.font_family,
      border_radius: (newConfig as any).border_radius || prev.border_radius,
    }));
  };

  const handleJSONValidationChange = (isValid: boolean, error: string | null) => {
    setIsJSONValid(isValid);
    setJsonValidationError(error);
  };

  const handleSave = async () => {
    // Check if JSON is valid when on JSON tab
    if (state.activeTab === 'json' && !isJSONValid) {
      setError('Le JSON contient des erreurs. Veuillez les corriger avant de sauvegarder.');
      return;
    }

    try {
      setSaving(true);
      setError(null);

      // Use current config from state (which may have been updated from JSON or form)
      // Spread state.config FIRST to preserve all complex structures (colors, typography, effects, spacing, etc.)
      // Then add fallbacks for required color fields to ensure compatibility with form tab and old format
      const config: ThemeConfig = {
        ...state.config, // Preserve ALL complex structures (glassmorphism, nested objects, etc.)
        // Ensure required color fields exist (support both formats: primary_color and primary)
        primary_color: state.config.primary_color || (state.config as any).primary || formData.primary_color,
        secondary_color: state.config.secondary_color || (state.config as any).secondary || formData.secondary_color,
        danger_color: state.config.danger_color || (state.config as any).danger || formData.danger_color,
        warning_color: state.config.warning_color || (state.config as any).warning || formData.warning_color,
        info_color: state.config.info_color || (state.config as any).info || formData.info_color,
        success_color: state.config.success_color || (state.config as any).success || formData.success_color,
        // Optional fields with fallbacks
        font_family: (state.config as any).font_family || (state.config as any).typography?.fontFamily || formData.font_family || undefined,
        border_radius: (state.config as any).border_radius || (state.config as any).borderRadius || formData.border_radius || undefined,
      } as ThemeConfig;

      await onSave(config, formData);
    } catch (err) {
      let errorMessage = 'Erreur lors de la sauvegarde';
      
      // Log error for debugging
      logger.error('[ThemeEditor] Save error', err instanceof Error ? err : new Error(String(err)), {
        context: 'ThemeEditor.save',
      });
      
      if (err instanceof Error) {
        errorMessage = err.message;
        
        // If it's a ThemeValidationError, it already has formatted messages
        // Otherwise, try to extract more details
        if (err.name === 'ThemeValidationError' || err.constructor.name === 'ThemeValidationError') {
          // The error message should already contain formatted validation errors
          errorMessage = err.message;
          logger.debug('[ThemeEditor] ThemeValidationError message', { message: errorMessage });
        } else if (err.message.includes('Validation failed') || err.message.includes('422') || err.message.includes('Color format') || err.message.includes('contrast')) {
          // Try to extract more details from the error
          errorMessage = err.message || 'Erreur de validation. Vérifiez les formats de couleur et les ratios de contraste.';
          logger.debug('[ThemeEditor] Validation error message', { message: errorMessage });
        } else {
          // For other errors, try to extract more info
          logger.debug('[ThemeEditor] Other error', {
            message: err.message,
            name: err.name,
            constructor: err.constructor.name,
            stack: err.stack,
          });
        }
      } else {
        logger.error('[ThemeEditor] Unknown error type', new Error(String(err)), { err });
      }
      
      setError(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              {theme ? `Éditer "${theme.display_name}"` : 'Créer un nouveau thème'}
            </h2>
            <p className="text-muted-foreground mt-1">
              {theme ? 'Modifiez les propriétés du thème' : 'Remplissez le formulaire pour créer un nouveau thème'}
            </p>
          </div>
          <Button onClick={onCancel} variant="outline" size="sm">
            <X className="w-4 h-4 mr-2" />
            Annuler
          </Button>
        </div>

        {error && (
          <Alert variant="error" title="Erreur" className="mb-4">
            <div className="whitespace-pre-wrap text-sm">{error}</div>
          </Alert>
        )}

        {jsonValidationError && state.activeTab === 'json' && (
          <Alert variant="error" title="Erreur JSON" className="mb-4">
            {jsonValidationError}
          </Alert>
        )}

        <ThemeTabs activeTab={state.activeTab} onTabChange={setActiveTab} />

        {isTemplate && (
          <Alert variant="warning" title="Thème Template" className="mb-4">
            Ce thème est le TemplateTheme. Seule la configuration (couleurs, polices, etc.) peut être modifiée. Le nom et la description ne peuvent pas être changés.
          </Alert>
        )}

        <div className="mt-6">
          {state.activeTab === 'form' && (
            <ThemeForm formData={formData} onChange={handleFormChange} />
          )}

          {state.activeTab === 'json' && (
            <JSONEditor
              config={state.config}
              onChange={handleJSONChange}
              onValidationChange={handleJSONValidationChange}
            />
          )}

          {state.activeTab === 'preview' && (
            <ThemePreview config={state.config} />
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-border">
          <Button onClick={onCancel} variant="outline" disabled={saving}>
            Annuler
          </Button>
          <Button
            onClick={handleSave}
            variant="primary"
            disabled={saving || (state.activeTab === 'json' && !isJSONValid)}
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Sauvegarde...' : 'Sauvegarder'}
          </Button>
        </div>
      </div>
    </Card>
  );
}

