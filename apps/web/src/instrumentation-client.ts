/**
 * Sentry Client Configuration
 * This file configures Sentry for the browser/client-side
 * 
 * Note: This file replaces sentry.client.config.ts for Turbopack compatibility
 * See: https://nextjs.org/docs/app/api-reference/file-conventions/instrumentation-client
 */

import * as Sentry from '@sentry/nextjs';
import { logger } from '@/lib/logger';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;
const SENTRY_ENVIRONMENT = process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT || process.env.NODE_ENV || 'development';
const SENTRY_RELEASE = process.env.NEXT_PUBLIC_SENTRY_RELEASE || process.env.NEXT_PUBLIC_APP_VERSION || 'unknown';

// Only initialize Sentry if DSN is provided
if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: SENTRY_ENVIRONMENT,
    release: SENTRY_RELEASE,
    
    // Enable debug mode in development to see what's happening
    debug: SENTRY_ENVIRONMENT === 'development' && process.env.NEXT_PUBLIC_SENTRY_DEBUG === 'true',
    
    // Performance Monitoring (low rate in prod to avoid Sentry 429)
    tracesSampleRate: SENTRY_ENVIRONMENT === 'production' ? 0.01 : 1.0,
    
    // Session Replay (low rate in prod to avoid Sentry 429)
    replaysSessionSampleRate: SENTRY_ENVIRONMENT === 'production' ? 0.01 : 1.0,
    replaysOnErrorSampleRate: SENTRY_ENVIRONMENT === 'production' ? 0.1 : 1.0,
    
    // Integrations
    integrations: [
      Sentry.replayIntegration({
        maskAllText: true,
        blockAllMedia: true,
      }),
      Sentry.browserTracingIntegration(),
    ],
    
    // Error filtering
    beforeSend(event, hint) {
      // Don't send errors in development unless explicitly enabled
      if (SENTRY_ENVIRONMENT === 'development' && process.env.NEXT_PUBLIC_SENTRY_ENABLE_DEV !== 'true') {
        return null;
      }
      
      // Filter out known non-critical errors (reduces Sentry 429 and noise)
      const error = hint.originalException;
      if (error instanceof Error) {
        // Ignore network errors that are likely user-related (offline, etc.)
        if (
          error.message.includes('NetworkError') ||
          error.message.includes('Failed to fetch') ||
          error.message.includes('Network request failed')
        ) {
          return null;
        }
        // Ignore theme/API timeouts (backend cold start - not actionable)
        if (error.message.includes('timeout') && error.message.includes('exceeded')) {
          return null;
        }
        // Ignore generic backend 500 message (avoids Sentry 429 from newsletter errors)
        if (error.message.includes('An internal error occurred. Please contact support.')) {
          return null;
        }
        // Ignore newsletter subscription errors (we show a friendly message in UI; reduces Sentry 429)
        if (error.message.includes('Subscription is temporarily unavailable')) {
          return null;
        }
        // Ignore ResizeObserver errors (common browser quirk)
        if (error.message.includes('ResizeObserver loop')) {
          return null;
        }
      }
      
      return event;
    },
    
    // Ignore specific URLs and messages
    ignoreErrors: [
    // Theme/API timeouts
    'timeout of',
    'exceeded',
    // Browser extensions
    'top.GLOBALS',
    'originalCreateNotification',
    'canvas.contentDocument',
    'MyApp_RemoveAllHighlights',
    'atomicFindClose',
    'fb_xd_fragment',
    'bmi_SafeAddOnload',
    'EBCallBackMessageReceived',
    'conduitPage',
    
    // Network errors
    'NetworkError',
    'Failed to fetch',
    
      // ResizeObserver
      'ResizeObserver loop',
    ],
    
    // Set user context
    initialScope: {
      tags: {
        component: 'client',
      },
    },
  });
} else {
  // Log warning if Sentry is not configured
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    logger.warn('[Sentry] NEXT_PUBLIC_SENTRY_DSN is not set. Sentry error tracking is disabled.');
  }
}

