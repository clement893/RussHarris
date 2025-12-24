/**
 * Theme API client for managing platform themes.
 */
import type {
  Theme,
  ThemeCreate,
  ThemeUpdate,
  ThemeListResponse,
  ThemeConfigResponse,
} from '@modele/types';

import { getApiUrl } from '../api';

const API_URL = getApiUrl().replace(/\/$/, '');

// Helper to get auth token
import { TokenStorage } from '@/lib/auth/tokenStorage';

function getAuthToken(): string {
  return TokenStorage.getToken() || '';
}

/**
 * Get the currently active theme configuration.
 * Public endpoint - no authentication required.
 * Returns default theme if backend is not available.
 */
export async function getActiveTheme(): Promise<ThemeConfigResponse> {
  try {
    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(`${API_URL}/api/v1/themes/active`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Always fetch fresh theme
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      // If backend returns error, return default theme
      console.warn(`Failed to fetch active theme: ${response.statusText}. Using default theme.`);
      return {
        id: 0,
        name: 'default',
        display_name: 'Default Theme',
        config: {
          primary_color: '#3B82F6',
          secondary_color: '#10B981',
          danger_color: '#EF4444',
          warning_color: '#F59E0B',
          info_color: '#06B6D4',
          success_color: '#10B981',
          font_family: 'Inter',
          border_radius: '0.5rem',
        },
      };
    }

    return response.json();
  } catch (error) {
    // Handle network errors (backend not available)
    if (error instanceof Error && (error.name === 'AbortError' || error.message.includes('Failed to fetch'))) {
      console.warn('Backend not available. Using default theme. Make sure the backend is running on', API_URL);
      return {
        id: 0,
        name: 'default',
        display_name: 'Default Theme',
        config: {
          primary_color: '#3B82F6',
          secondary_color: '#10B981',
          danger_color: '#EF4444',
          warning_color: '#F59E0B',
          info_color: '#06B6D4',
          success_color: '#10B981',
          font_family: 'Inter',
          border_radius: '0.5rem',
        },
      };
    }
    // Re-throw other errors
    throw error;
  }
}

/**
 * List all themes.
 * Requires authentication and superadmin role.
 */
export async function listThemes(
  token?: string,
  skip: number = 0,
  limit: number = 100
): Promise<ThemeListResponse> {
  const authToken = token || getAuthToken();
  const response = await fetch(
    `${API_URL}/api/v1/themes?skip=${skip}&limit=${limit}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch themes: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get a specific theme by ID.
 * Requires authentication and superadmin role.
 */
export async function getTheme(
  themeId: number,
  token?: string
): Promise<Theme> {
  const authToken = token || getAuthToken();
  const response = await fetch(`${API_URL}/api/v1/themes/${themeId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch theme: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Create a new theme.
 * Requires authentication and superadmin role.
 */
export async function createTheme(
  themeData: ThemeCreate,
  token?: string
): Promise<Theme> {
  const authToken = token || getAuthToken();
  const response = await fetch(`${API_URL}/api/v1/themes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(themeData),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: response.statusText }));
    throw new Error(error.detail || `Failed to create theme: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Update an existing theme.
 * Requires authentication and superadmin role.
 */
export async function updateTheme(
  themeId: number,
  themeData: ThemeUpdate,
  token?: string
): Promise<Theme> {
  const authToken = token || getAuthToken();
  const response = await fetch(`${API_URL}/api/v1/themes/${themeId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(themeData),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: response.statusText }));
    throw new Error(error.detail || `Failed to update theme: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Activate a theme (deactivates all others).
 * Requires authentication and superadmin role.
 */
export async function activateTheme(
  themeId: number,
  token?: string
): Promise<Theme> {
  const authToken = token || getAuthToken();
  const response = await fetch(`${API_URL}/api/v1/themes/${themeId}/activate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: response.statusText }));
    throw new Error(error.detail || `Failed to activate theme: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Delete a theme.
 * Requires authentication and superadmin role.
 * Cannot delete the active theme.
 */
export async function deleteTheme(
  themeId: number,
  token?: string
): Promise<void> {
  const authToken = token || getAuthToken();
  const response = await fetch(`${API_URL}/api/v1/themes/${themeId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: response.statusText }));
    throw new Error(error.detail || `Failed to delete theme: ${response.statusText}`);
  }
}

/**
 * Update the mode (light/dark/system) of the currently active theme.
 * Requires authentication and superadmin role.
 * This affects all users globally.
 */
export async function updateActiveThemeMode(
  mode: 'light' | 'dark' | 'system',
  token?: string
): Promise<ThemeConfigResponse> {
  const authToken = token || getAuthToken();
  const response = await fetch(`${API_URL}/api/v1/themes/active/mode`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({ mode }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: response.statusText }));
    throw new Error(error.detail || `Failed to update theme mode: ${response.statusText}`);
  }

  return response.json();
}

