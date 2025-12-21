/**
 * Lazy Loading Components
 * Composants lourds chargés dynamiquement pour optimiser le bundle
 */

'use client';

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import Skeleton from './Skeleton';

// DataTable - Composant lourd avec beaucoup de logique
export const LazyDataTable = dynamic(
  () => import('./DataTable'),
  {
    loading: () => (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    ),
    ssr: false, // Client-only car utilise beaucoup de state
  }
);

// Chart - Bibliothèque de graphiques peut être lourde
export const LazyChart = dynamic(
  () => import('./Chart'),
  {
    loading: () => <Skeleton className="h-64 w-full" />,
    ssr: false,
  }
);

// Modal - Peut être lazy-loaded si pas utilisé immédiatement
export const LazyModal = dynamic(
  () => import('./Modal'),
  {
    loading: () => null, // Pas de loading pour les modals
    ssr: false,
  }
);

// Form - Si formulaire complexe avec validation
export const LazyForm = dynamic(
  () => import('./Form').then(mod => ({ default: mod.default })),
  {
    loading: () => <Skeleton className="h-96 w-full" />,
    ssr: true, // Forms peuvent être SSR
  }
);

// Accordion - Si beaucoup d'items
export const LazyAccordion = dynamic(
  () => import('./Accordion'),
  {
    loading: () => (
      <div className="space-y-2">
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    ),
    ssr: true,
  }
);

// Helper pour créer des composants lazy custom
export function createLazyComponent<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options?: {
    loading?: ComponentType;
    ssr?: boolean;
  }
) {
  return dynamic(importFn, {
    loading: options?.loading || (() => <Skeleton className="h-32 w-full" />),
    ssr: options?.ssr ?? true,
  });
}

