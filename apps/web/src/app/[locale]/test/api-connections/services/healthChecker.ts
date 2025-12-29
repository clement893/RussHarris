/**
 * Health Checker Service
 * Service for checking API connection health status
 */

import { apiClient } from '@/lib/api/client';
import { getErrorMessage } from '@/lib/errors';
import { logger } from '@/lib/logger';
import type { ConnectionStatus, CheckResult, ApiResponseWrapper } from '../types/health.types';

/**
 * Check overall API connection status
 */
export async function checkStatus(signal?: AbortSignal): Promise<ConnectionStatus | null> {
  try {
    const response = await apiClient.get<ConnectionStatus>('/v1/api-connection-check/status', { signal });
    // Extract data using proper type handling
    const apiResponse = response as unknown as ApiResponseWrapper<ConnectionStatus>;
    const data = apiResponse?.data || (response as ConnectionStatus);
    
    // If frontend/backend data is empty but success is true, it means scripts are not available
    // This is normal in production environments
    if (data && data.success && (!data.frontend || Object.keys(data.frontend).length === 0)) {
      return {
        ...data,
        frontend: {
          total: data.frontend?.total ?? 0,
          connected: data.frontend?.connected ?? 0,
          partial: data.frontend?.partial ?? 0,
          needsIntegration: data.frontend?.needsIntegration ?? 0,
          static: data.frontend?.static ?? 0,
          error: data.frontend?.error,
          message: data.frontend?.message || 'Frontend check scripts not available in this environment',
          note: 'This is normal in production. Use the "Check Frontend" button below for detailed analysis.',
        },
      };
    }
    
    return data;
  } catch (err: unknown) {
    if (signal?.aborted) {
      return null;
    }
    logger.error('Failed to check API connection status', { error: err });
    throw new Error(getErrorMessage(err) || 'Failed to check API connection status');
  }
}

/**
 * Analyze frontend files for API connections
 */
export async function analyzeFrontendFiles(signal?: AbortSignal): Promise<CheckResult> {
  // Try to fetch the API manifest generated at build time
  try {
    const manifestResponse = await fetch('/api-manifest.json', { signal });
    if (manifestResponse.ok) {
      const manifest = await manifestResponse.json();
      
      // Send analysis to backend
      const response = await apiClient.post<CheckResult>('/v1/api-connection-check/frontend/analyze', {
        pages: manifest.pages || [],
        summary: manifest.summary || {
          total: 0,
          connected: 0,
          partial: 0,
          needsIntegration: 0,
          static: 0,
        },
        timestamp: Date.now(),
      }, { signal });
      return (response as unknown as CheckResult) ?? { success: false, error: 'No data returned' };
    }
  } catch (manifestErr) {
    logger.warn('Could not load API manifest', { error: manifestErr });
  }

  // Fallback: create basic analysis from known routes
  // This is a simplified version for production when manifest is not available
  const pages: Array<{ path: string; apiCalls: Array<{ method: string; endpoint: string }> }> = [];
  const summary = {
    total: 0,
    connected: 0,
    partial: 0,
    needsIntegration: 0,
    static: 0,
  };

  // Send analysis to backend
  try {
    const response = await apiClient.post<CheckResult>('/v1/api-connection-check/frontend/analyze', {
      pages,
      summary,
      timestamp: Date.now(),
    }, { signal });
    return (response as unknown as CheckResult) ?? { success: false, error: 'No data returned' };
  } catch (err) {
    throw err;
  }
}

/**
 * Check frontend API connections
 */
export async function checkFrontend(detailed = false, signal?: AbortSignal): Promise<CheckResult> {
  try {
    const params = detailed ? { detailed: 'true' } : {};
    const response = await apiClient.get<CheckResult>('/v1/api-connection-check/frontend', { params, signal });
    const apiResponse = response as unknown as ApiResponseWrapper<CheckResult>;
    const data = (apiResponse?.data || (response as CheckResult)) ?? null;
    
    // If backend suggests using frontend analysis, do it
    if (data && !data.success && data.useFrontendAnalysis) {
      // Try frontend analysis
      try {
        const frontendAnalysis = await analyzeFrontendFiles(signal);
        return frontendAnalysis;
      } catch (frontendErr) {
        // If frontend analysis also fails, return the original error
        if (data.error) {
          logger.warn('Frontend analysis also unavailable', { error: frontendErr });
        }
        return data;
      }
    }
    
    return data ?? { success: false, error: 'No data returned' };
  } catch (err: unknown) {
    if (signal?.aborted) {
      return { success: false, error: 'Request aborted' };
    }
    const errorMessage = getErrorMessage(err) || 'Failed to check frontend connections';
    logger.error('Failed to check frontend connections', { error: err });
    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Check backend endpoints
 */
export async function checkBackend(signal?: AbortSignal): Promise<CheckResult> {
  try {
    const response = await apiClient.get<CheckResult>('/v1/api-connection-check/backend', { signal });
    // apiClient.get returns response.data from axios, which is the FastAPI response directly
    // FastAPI returns the data directly, not wrapped in ApiResponse
    // So response is already CheckResult, not ApiResponse<CheckResult>
    const apiResponse = response as unknown as ApiResponseWrapper<CheckResult>;
    const data = (apiResponse?.data || (response as CheckResult)) ?? null;
    
    return data ?? { success: false, error: 'No data returned' };
  } catch (err: unknown) {
    if (signal?.aborted) {
      return { success: false, error: 'Request aborted' };
    }
    const errorMessage = getErrorMessage(err) || 'Failed to check backend endpoints';
    logger.error('Failed to check backend endpoints', { error: err });
    return {
      success: false,
      error: errorMessage,
    };
  }
}
