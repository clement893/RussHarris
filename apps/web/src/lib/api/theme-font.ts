/**
 * Theme Font API client for managing custom uploaded fonts.
 * Uses apiClient for centralized authentication and error handling.
 */
import type {
  ThemeFont,
  ThemeFontCreate,
  ThemeFontListResponse,
} from '@modele/types';
import { apiClient } from './client';
import { logger } from '@/lib/logger';

/**
 * Upload a custom font file.
 * Requires authentication and superadmin role.
 */
export async function uploadFont(
  file: File,
  metadata?: ThemeFontCreate
): Promise<ThemeFont> {
  const formData = new FormData();
  formData.append('file', file);
  
  if (metadata?.name) {
    formData.append('name', metadata.name);
  }
  if (metadata?.font_family) {
    formData.append('font_family', metadata.font_family);
  }
  if (metadata?.description) {
    formData.append('description', metadata.description);
  }
  if (metadata?.font_weight) {
    formData.append('font_weight', metadata.font_weight);
  }
  if (metadata?.font_style) {
    formData.append('font_style', metadata.font_style);
  }

  try {
    const response = await apiClient.post<ThemeFont>('/v1/theme-fonts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    logger.error('Failed to upload font', error);
    throw error;
  }
}

/**
 * List all uploaded fonts.
 * Requires authentication and superadmin role.
 */
export async function listFonts(
  skip: number = 0,
  limit: number = 100
): Promise<ThemeFontListResponse> {
  try {
    const response = await apiClient.get<ThemeFontListResponse>(
      `/v1/theme-fonts?skip=${skip}&limit=${limit}`
    );
    return response;
  } catch (error) {
    logger.error('Failed to list fonts', error);
    throw error;
  }
}

/**
 * Get a specific font by ID.
 * Requires authentication and superadmin role.
 */
export async function getFont(fontId: number): Promise<ThemeFont> {
  try {
    const response = await apiClient.get<ThemeFont>(`/v1/theme-fonts/${fontId}`);
    return response;
  } catch (error) {
    logger.error('Failed to get font', error);
    throw error;
  }
}

/**
 * Delete a font.
 * Requires authentication and superadmin role.
 */
export async function deleteFont(fontId: number): Promise<void> {
  try {
    await apiClient.delete<void>(`/v1/theme-fonts/${fontId}`);
  } catch (error) {
    logger.error('Failed to delete font', error);
    throw error;
  }
}

