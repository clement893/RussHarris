/**
 * Locale Sync Component
 * 
 * Syncs user's language preference from database with Next.js locale routing.
 * Redirects to the preferred locale if it differs from the current URL locale.
 */

'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useAuthStore } from '@/lib/store';
import { apiClient } from '@/lib/api/client';
import { logger } from '@/lib/logger';
import type { Locale } from '@/i18n/routing';

interface LocaleSyncProps {
  children: React.ReactNode;
}

const SYNC_KEY = 'locale_sync_checked';
const SYNC_TIMEOUT = 5000; // 5 seconds

/**
 * LocaleSync - Syncs user language preference with URL locale
 * 
 * This component:
 * 1. Checks if user is authenticated
 * 2. Loads user preferences from database
 * 3. Compares preference language with current URL locale
 * 4. Redirects to preferred locale if different
 * 
 * Should be placed in the layout to run on every page load.
 */
export function LocaleSync({ children }: LocaleSyncProps) {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale() as Locale;
  const { user, token } = useAuthStore();
  const hasCheckedRef = useRef<string | null>(null);
  const isProcessingRef = useRef(false);

  useEffect(() => {
    const syncLocale = async () => {
      // Skip if not authenticated
      const isAuth = !!(user && token);
      if (!isAuth) {
        // Clear sync flag when user logs out
        if (typeof window !== 'undefined') {
          sessionStorage.removeItem(SYNC_KEY);
        }
        hasCheckedRef.current = null;
        return;
      }

      // Skip if already processing
      if (isProcessingRef.current) {
        return;
      }

      // Check sessionStorage to prevent infinite loops
      const syncKey = `${SYNC_KEY}_${currentLocale}_${pathname}`;
      const lastSync = typeof window !== 'undefined' ? sessionStorage.getItem(syncKey) : null;
      const now = Date.now();
      
      if (lastSync) {
        const timeSinceLastSync = now - parseInt(lastSync, 10);
        // If we checked this locale/path combination recently, skip
        if (timeSinceLastSync < SYNC_TIMEOUT) {
          return;
        }
      }

      // Skip if we've already checked this exact combination
      const checkKey = `${currentLocale}_${pathname}`;
      if (hasCheckedRef.current === checkKey) {
        return;
      }

      isProcessingRef.current = true;
      hasCheckedRef.current = checkKey;

      try {
        // Fetch user preferences
        const response = await apiClient.get<Record<string, any>>('/v1/users/preferences');
        const data = (response as any).data || response;
        
        if (data && typeof data === 'object') {
          // Get language preference (could be 'language' or 'locale')
          const preferredLanguage = (data.language || data.locale) as Locale | undefined;
          
          // Only redirect if preference exists, is valid, and differs from current locale
          if (
            preferredLanguage && 
            preferredLanguage !== currentLocale &&
            ['en', 'fr', 'ar', 'he'].includes(preferredLanguage)
          ) {
            // Mark that we've checked this combination
            if (typeof window !== 'undefined') {
              sessionStorage.setItem(syncKey, now.toString());
            }

            logger.info(`Locale mismatch detected, redirecting to preferred locale`, {
              currentLocale,
              preferredLanguage,
              currentPath: pathname,
            });

            // Use next-intl router for proper locale navigation
            router.replace(pathname, { locale: preferredLanguage });
            return;
          } else if (preferredLanguage === currentLocale) {
            // Locale matches preference, clear any sync flags
            if (typeof window !== 'undefined') {
              sessionStorage.removeItem(syncKey);
            }
          }
        }
      } catch (error) {
        // Silently fail - don't block page load if preferences can't be loaded
        logger.debug('Could not load preferences for locale sync:', error);
      } finally {
        isProcessingRef.current = false;
      }
    };

    syncLocale();
  }, [currentLocale, pathname, user, token, router]);

  // Show children immediately - don't block rendering
  return <>{children}</>;
}

