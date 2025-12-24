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

/**
 * Get API URL with production fallback
 * Uses Railway production URL in production, localhost in development
 */
const getApiUrl = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  const defaultUrl = isProduction 
    ? 'https://modelebackend-production-0590.up.railway.app'
    : 'http://localhost:8000';
  
  let url = (process.env.NEXT_PUBLIC_API_URL || defaultUrl).trim();
  
  // If URL doesn't start with http:// or https://, add https://
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`;
  }
  
  return url.replace(/\/$/, ''); // Remove trailing slash
};

const API_URL = getApiUrl();

// Helper to get auth token
import { TokenStorage } from '@/lib/auth/tokenStorage';

function getAuthToken(): string {
  return TokenStorage.getToken() || '';
}

/**
 * Default theme configuration used when backend is unavailable
 */
const DEFAULT_THEME_CONFIG: ThemeConfigResponse = {
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

/**
 * Get the currently active theme configuration.
 * Public endpoint - no authentication required.
 * Falls back to default theme if backend is unavailable.
 */
export async function getActiveTheme(): Promise<ThemeConfigResponse> {
  try {
    // Create an AbortController for timeout
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
      // If backend returns an error, use default theme
      console.warn(`Backend returned ${response.status}. Using default theme.`);
      return DEFAULT_THEME_CONFIG;
    }

    return response.json();
  } catch (error) {
    // Handle network errors, timeouts, and connection refused
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.warn('Theme fetch timeout. Using default theme. Make sure the backend is running on', API_URL);
      } else if (error.message.includes('fetch') || error.message.includes('Failed to fetch') || error.message.includes('ERR_CONNECTION_REFUSED')) {
        console.warn('Backend not available. Using default theme. Make sure the backend is running on', API_URL);
      } else {
        console.warn('Failed to fetch theme:', error.message, '- Using default theme.');
      }
    }
    // Return default theme instead of throwing
    return DEFAULT_THEME_CONFIG;
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
 * Update the active theme mode (light/dark/system).
 * Requires authentication and superadmin role.
 */
export async function updateActiveThemeMode(
  mode: 'light' | 'dark' | 'system',
  token?: string
): Promise<void> {
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
