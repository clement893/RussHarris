'use client';

import { Suspense, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { TokenStorage } from '@/lib/auth/tokenStorage';
import { usersAPI } from '@/lib/api';
import { logger } from '@/lib/logger';
import { handleApiError } from '@/lib/errors/api';

// Note: Client Components are already dynamic by nature.
// Route segment config (export const dynamic) only works in Server Components.
// Since this page uses useSearchParams (which requires dynamic rendering),
// and it's a Client Component, it will be rendered dynamically automatically.

function CallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuthStore();

  const handleAuthCallback = useCallback(async () => {
    // Support both formats: token (from Google OAuth callback) and access_token/refresh_token
    const accessToken = searchParams.get('token') || searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');

    logger.info('Auth callback started', { hasToken: !!accessToken, hasRefreshToken: !!refreshToken });

    if (!accessToken) {
      logger.error('No access token provided in callback URL');
      // Don't add redirect parameter to avoid loops
      router.push('/auth/login?error=No access token provided');
      return;
    }

    try {
      // Store tokens securely using TokenStorage (await to ensure it's stored before API calls)
      await TokenStorage.setToken(accessToken);
      logger.info('Token stored successfully');
      
      if (refreshToken) {
        await TokenStorage.setRefreshToken(refreshToken);
        logger.info('Refresh token stored successfully');
      }

      // Small delay to ensure token is available in sessionStorage
      await new Promise(resolve => setTimeout(resolve, 100));

      // Fetch user info using API client
      logger.info('Fetching user info from API...');
      const response = await usersAPI.getMe();
      logger.info('User info received', { hasUser: !!response.data });
      
      const user = response.data;

      if (user) {
        logger.info('Logging in user', { userId: user.id, email: user.email });
        login(user, accessToken, refreshToken ?? undefined);
        logger.info('Redirecting to dashboard');
        router.push('/dashboard');
      } else {
        throw new Error('No user data received');
      }
    } catch (err) {
      const appError = handleApiError(err);
      logger.error('Failed to complete authentication', appError, { 
        errorMessage: appError.message,
        errorCode: appError.code,
        errorDetails: appError.details 
      });
      // Don't add redirect parameter to avoid loops
      router.push(`/auth/login?error=${encodeURIComponent(appError.message || 'Failed to get user info')}`);
    }
  }, [searchParams, router, login]);

  useEffect(() => {
    handleAuthCallback();
  }, [handleAuthCallback]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing authentication...</p>
      </div>
    </main>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
          </div>
        </main>
      }
    >
      <CallbackContent />
    </Suspense>
  );
}