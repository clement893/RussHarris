/**
 * Locale-based Layout
 * Wraps the app with next-intl provider and RTL support
 */

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import AppProviders from '@/components/providers/AppProviders';
import { App } from '../app';
import { WebVitalsReporter, PerformanceScripts } from '@/components/performance';
import { ResourceHints } from '@/lib/performance/resourceHints';
import { ErrorBoundary } from '@/components/errors/ErrorBoundary';
import { SchemaMarkup } from '@/components/seo';
import { GoogleAnalytics } from '@/components/marketing/GoogleAnalytics';
import RTLProvider from '@/components/i18n/RTLProvider';
import SkipLink from '@/components/ui/SkipLink';
import { LocaleSync } from '@/components/preferences';
import type { Locale } from '@/i18n/routing';
import { themeCacheInlineScript } from '@/lib/theme/theme-inline-cache-script';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Optimize font loading - show fallback until font loads
  variable: '--font-inter',
  preload: true, // Preload critical font
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'], // Better fallback
  adjustFontFallback: true, // Adjust fallback font metrics
});

export const metadata: Metadata = {
  title: 'MODELE-NEXTJS-FULLSTACK',
  description: 'Full-stack template with Next.js 16 frontend and FastAPI backend',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // themeColor will be set dynamically by theme system, using a neutral fallback here
  themeColor: '#2563eb', // Fallback - will be overridden by theme when loaded
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  // Get API URL for resource hints
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_DEFAULT_API_URL || 'http://localhost:8000';
  const apiHost = apiUrl.replace(/^https?:\/\//, '').split('/')[0];

  // Generate default Open Graph metadata
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const appName = process.env.NEXT_PUBLIC_APP_NAME || 'MODELE-NEXTJS-FULLSTACK';
  const appDescription = process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Full-stack template with Next.js 16 frontend and FastAPI backend';

  return (
    <html lang={locale} className={inter.variable} data-api-url={apiUrl} suppressHydrationWarning>
      <head>
        {/* CRITICAL: Apply theme script FIRST, before any CSS, to prevent flash */}
        {/* This script MUST execute synchronously and block rendering until theme is applied */}
        <script
          dangerouslySetInnerHTML={{
            __html: themeCacheInlineScript,
          }}
        />
        
        {/* CSS structure with default colors - applied AFTER script sets theme */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Base structure - default colors prevent flash before theme loads */
              :root {
                /* Font and layout variables */
                --font-family: Inter, system-ui, -apple-system, sans-serif;
                --font-family-heading: Inter, system-ui, -apple-system, sans-serif;
                --font-family-subheading: Inter, system-ui, -apple-system, sans-serif;
                --border-radius: 8px;
                
                /* Default color variables - prevent flash before theme loads */
                /* These will be overridden by themeCacheInlineScript or GlobalThemeProvider */
                --color-background: #ffffff;
                --color-foreground: #0f172a;
                --color-muted: #f1f5f9;
                --color-muted-foreground: #64748b;
                --color-border: #e2e8f0;
                --color-input: #ffffff;
                --color-ring: #2B5F7A;
                
                /* Default color palette - will be overridden by theme */
                /* Primary shades (Bleu pétrole) - prevent flash on gradients */
                --color-primary-50: #E8F1F5;
                --color-primary-100: #C2DCE6;
                --color-primary-200: #9BC7D7;
                --color-primary-300: #74B2C8;
                --color-primary-400: #4D9DB9;
                --color-primary-500: #2B5F7A;
                --color-primary-600: #234E63;
                --color-primary-700: #1B3D4C;
                --color-primary-800: #132C35;
                --color-primary-900: #0B1B1E;
                --color-primary-950: #0B1B1E;
                /* Secondary shades (Orange) */
                --color-secondary-50: #FFF4E6;
                --color-secondary-100: #FFE0B3;
                --color-secondary-200: #FFCC80;
                --color-secondary-300: #FFB84D;
                --color-secondary-400: #FFA41A;
                --color-secondary-500: #F58220;
                --color-secondary-600: #C4681A;
                --color-secondary-700: #934E13;
                --color-secondary-800: #62340D;
                --color-secondary-900: #311A06;
                --color-secondary-950: #311A06;
                /* Other colors */
                --color-danger-500: #EF4444;
                --color-warning-500: #F59E0B;
                --color-info-500: #3B82F6;
                --color-success-500: #10B981;
              }
              
              /* Dark mode defaults - applied when .dark class is present */
              .dark {
                --color-background: #0f172a;
                --color-foreground: #f8fafc;
                --color-muted: #1e293b;
                --color-muted-foreground: #94a3b8;
                --color-border: #334155;
                --color-input: #1e293b;
              }
              
              /* Body uses CSS variables - NO transition on initial load to prevent flash */
              /* Transition only applies after initial render */
              body {
                background-color: var(--color-background) !important;
                color: var(--color-foreground) !important;
                font-family: var(--font-family, Inter, system-ui, sans-serif);
              }
              
              /* Enable transitions only after initial load */
              body.loaded {
                transition: background-color 0.2s ease, color 0.2s ease;
              }
            `,
          }}
        />
        
        {/* Add loaded class to body after initial render to enable transitions */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // Wait for DOM to be ready
                if (document.readyState === 'loading') {
                  document.addEventListener('DOMContentLoaded', function() {
                    document.body.classList.add('loaded');
                  });
                } else {
                  // DOM already ready, add class immediately
                  document.body.classList.add('loaded');
                }
              })();
            `,
          }}
        />
        
        {/* Resource hints for performance - optimized order */}
        {apiHost && (
          <>
            <link rel="dns-prefetch" href={`//${apiHost}`} />
            <link rel="preconnect" href={`//${apiHost}`} crossOrigin="anonymous" />
          </>
        )}
        {/* Font optimization - preconnect early */}
        {/* Note: next/font/google handles font preloading automatically, no manual preload needed */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Open Graph tags */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={appName} />
        <meta property="og:locale" content={locale === 'fr' ? 'fr_FR' : locale === 'ar' ? 'ar_SA' : locale === 'he' ? 'he_IL' : 'en_US'} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body 
        className={`${inter.className} bg-background text-foreground`}
        style={{ 
          fontFamily: 'var(--font-family, Inter, system-ui, sans-serif)',
          backgroundColor: 'var(--color-background)',
          color: 'var(--color-foreground)'
        }}
        suppressHydrationWarning
        // Note: suppressHydrationWarning can be removed after testing confirms no hydration errors
        // We've fixed the root cause (removed direct body style manipulation from inline script)
      >
        <SkipLink />
        <SchemaMarkup
          type="organization"
          data={{
            name: appName,
            url: baseUrl,
            description: appDescription,
          }}
        />
        <SchemaMarkup
          type="website"
          data={{
            name: appName,
            url: baseUrl,
            description: appDescription,
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: `${baseUrl}/search?q={search_term_string}`,
              },
            },
          }}
        />
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
        <NextIntlClientProvider messages={messages}>
          <RTLProvider>
            <PerformanceScripts />
            <ResourceHints />
            <ErrorBoundary>
              <AppProviders>
                <LocaleSync>
                  <App>
                    {children}
                  </App>
                </LocaleSync>
              </AppProviders>
            </ErrorBoundary>
            <WebVitalsReporter />
          </RTLProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

