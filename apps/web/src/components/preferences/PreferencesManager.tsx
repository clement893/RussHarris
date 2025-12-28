'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { logger } from '@/lib/logger';
import { Settings, Save, X } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import { apiClient } from '@/lib/api/client';
import { useToast } from '@/components/ui';
import { getErrorMessage } from '@/lib/errors';
import type { Locale } from '@/i18n/routing';

interface PreferencesManagerProps {
  className?: string;
}

// User preferences can have various value types (string, number, boolean, object, etc.)
export type UserPreferenceValue = string | number | boolean | object | null | undefined | unknown;
export type UserPreferences = Record<string, UserPreferenceValue>;

export function PreferencesManager({ className = '' }: PreferencesManagerProps) {
  const pathname = usePathname();
  const currentLocale = useLocale() as Locale;
  const [preferences, setPreferences] = useState<UserPreferences>({});
  const [editedPreferences, setEditedPreferences] = useState<UserPreferences>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get<UserPreferences>('/v1/users/preferences');
      // FastAPI returns data directly, not wrapped in ApiResponse
      // apiClient.get returns response.data from axios, which is already the FastAPI response
      // So response is already the data, or response.data if wrapped
      const { extractApiData } = await import('@/lib/api/utils');
      const data = extractApiData<UserPreferences>(response as unknown as UserPreferences | import('@modele/types').ApiResponse<UserPreferences>);
      if (data && typeof data === 'object') {
        // Normalize language preference key (could be 'language' or 'locale')
        const normalizedData = { ...data };
        if (data.locale && !data.language) {
          normalizedData.language = data.locale;
        }
        setPreferences(normalizedData);
        setEditedPreferences(normalizedData);
      }
    } catch (error) {
      logger.error('', 'Failed to fetch preferences:', error);
      // Set empty preferences on error to prevent UI issues
      setPreferences({});
      setEditedPreferences({});
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (key: string, value: unknown) => {
    setEditedPreferences({
      ...editedPreferences,
      [key]: value,
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await apiClient.put('/v1/users/preferences', editedPreferences);
      setPreferences(editedPreferences);
      
      // Check if language changed and redirect to new locale
      const newLanguage = editedPreferences.language as string;
      const oldLanguage = preferences.language as string;
      
      if (newLanguage && newLanguage !== oldLanguage && newLanguage !== currentLocale) {
        // Get the actual URL pathname (includes locale prefix if present)
        const actualPathname = typeof window !== 'undefined' ? window.location.pathname : pathname;
        
        // Get path without locale prefix from actual URL
        // Remove any locale prefix (en, fr, ar, he) from the beginning
        const pathWithoutLocale = actualPathname.replace(/^\/(en|fr|ar|he)(\/|$)/, '/') || '/';
        // Ensure it starts with / and doesn't end with / unless it's root
        const cleanPath = pathWithoutLocale === '/' ? '/' : pathWithoutLocale.replace(/\/$/, '') || '/';
        
        // Build new path with new locale
        // English has no prefix, other locales have /{locale} prefix
        const newPath = newLanguage === 'en' 
          ? cleanPath 
          : `/${newLanguage}${cleanPath === '/' ? '' : cleanPath}`;
        
        // Show success message and redirect
        showToast({
          message: 'Preferences saved successfully. Redirecting...',
          type: 'success',
        });
        
        // Small delay to show toast, then redirect
        setTimeout(() => {
          window.location.href = newPath;
        }, 500);
      } else {
        showToast({
          message: 'Preferences saved successfully',
          type: 'success',
        });
      }
    } catch (error: unknown) {
      showToast({
        message: getErrorMessage(error) || 'Failed to save preferences',
        type: 'error',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    setEditedPreferences(preferences);
  };

  const hasChanges = JSON.stringify(preferences) !== JSON.stringify(editedPreferences);

  if (isLoading) {
    return (
      <Card className={className}>
        <div className="text-center py-8 text-gray-500">Loading preferences...</div>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Preferences
        </h3>
        {hasChanges && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleReset}>
              <X className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <Button variant="primary" size="sm" onClick={handleSave} disabled={isSaving}>
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save'}
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {/* Theme Preference */}
        <div>
          <label className="block text-sm font-medium mb-2">Theme</label>
          <select
            value={(editedPreferences.theme as string) || 'system'}
            onChange={(e) => handleChange('theme', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>

        {/* Language Preference */}
        <div>
          <label className="block text-sm font-medium mb-2">Language</label>
          <select
            value={(editedPreferences.language as string) || 'en'}
            onChange={(e) => handleChange('language', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>
        </div>

        {/* Notifications */}
        <div>
          <label className="block text-sm font-medium mb-2">Email Notifications</label>
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={editedPreferences.email_notifications !== false}
                onChange={(e) => handleChange('email_notifications', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm">Enable email notifications</span>
            </label>
          </div>
        </div>

        {/* Custom Preferences */}
        {Object.entries(editedPreferences).map(([key, value]) => {
          if (['theme', 'language', 'email_notifications'].includes(key)) {
            return null;
          }
          return (
            <div key={key}>
              <label className="block text-sm font-medium mb-2 capitalize">
                {key.replace(/_/g, ' ')}
              </label>
              {typeof value === 'boolean' ? (
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => handleChange(key, e.target.checked)}
                    className="rounded"
                  />
                  <span className="text-sm">Enabled</span>
                </label>
              ) : typeof value === 'number' ? (
                <Input
                  type="number"
                  value={value}
                  onChange={(e) => handleChange(key, Number(e.target.value))}
                />
              ) : (
                <Input
                  value={String(value)}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}




