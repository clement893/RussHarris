/**
 * useSuperAdmin Hook
 * Checks if the current user has superadmin privileges
 */

import { useState, useEffect, useCallback } from 'react';
import { useAuthStore } from '@/lib/store';
import { checkMySuperAdminStatus } from '@/lib/api/admin';
import { TokenStorage } from '@/lib/auth/tokenStorage';
import { logger } from '@/lib/logger';

interface UseSuperAdminReturn {
  isSuperAdmin: boolean;
  isLoading: boolean;
  error: string | null;
  checkStatus: () => Promise<void>;
}

/**
 * Hook to check if the current user is a superadmin
 * 
 * @returns {UseSuperAdminReturn} Object containing superadmin status, loading state, error, and check function
 */
export function useSuperAdmin(): UseSuperAdminReturn {
  const { user, token, isAuthenticated } = useAuthStore();
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const checkStatus = useCallback(async () => {
    if (!isAuthenticated() || !user) {
      setIsSuperAdmin(false);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const authToken = token || TokenStorage.getToken();
      if (!authToken) {
        setIsSuperAdmin(false);
        setIsLoading(false);
        return;
      }

      const status = await checkMySuperAdminStatus(authToken);
      setIsSuperAdmin(status.is_superadmin === true);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to check superadmin status';
      logger.error('Failed to check superadmin status', err instanceof Error ? err : new Error(String(err)));
      setError(errorMessage);
      setIsSuperAdmin(false);
    } finally {
      setIsLoading(false);
    }
  }, [user, token, isAuthenticated]);

  useEffect(() => {
    checkStatus();
  }, [checkStatus]);

  return {
    isSuperAdmin,
    isLoading,
    error,
    checkStatus,
  };
}
