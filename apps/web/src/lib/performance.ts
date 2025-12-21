/**
 * Performance Utilities
 * Outils pour le monitoring et l'optimisation des performances
 */

/**
 * Mesure le temps d'exécution d'une fonction
 */
export function measurePerformance<T>(
  fn: () => T,
  label?: string
): T {
  if (typeof window === 'undefined' || !window.performance) {
    return fn();
  }

  const start = performance.now();
  const result = fn();
  const end = performance.now();
  const duration = end - start;

  if (label) {
    console.log(`[Performance] ${label}: ${duration.toFixed(2)}ms`);
  }

  return result;
}

/**
 * Mesure le temps d'exécution d'une fonction async
 */
export async function measurePerformanceAsync<T>(
  fn: () => Promise<T>,
  label?: string
): Promise<T> {
  if (typeof window === 'undefined' || !window.performance) {
    return fn();
  }

  const start = performance.now();
  const result = await fn();
  const end = performance.now();
  const duration = end - start;

  if (label) {
    console.log(`[Performance] ${label}: ${duration.toFixed(2)}ms`);
  }

  return result;
}

/**
 * Report Web Vitals to analytics
 */
export function reportWebVitals(metric: {
  id: string;
  name: string;
  value: number;
  label: string;
}) {
  // En production, envoyer à votre service d'analytics
  if (process.env.NODE_ENV === 'production') {
    // Envoyer à Sentry si disponible
    if (typeof window !== 'undefined' && (window as any).Sentry) {
      (window as any).Sentry.metrics.distribution(metric.name.toLowerCase(), metric.value, {
        tags: {
          id: metric.id,
          label: metric.label,
        },
      });
    }

    // Exemple: envoyer à Google Analytics
    // if (typeof window !== 'undefined' && (window as any).gtag) {
    //   (window as any).gtag('event', metric.name, {
    //     value: Math.round(metric.value),
    //     event_category: 'Web Vitals',
    //     event_label: metric.id,
    //     non_interaction: true,
    //   });
    // }
  } else {
    console.log('[Web Vitals]', metric);
  }
}

/**
 * Lazy load un composant avec loading state
 * Note: Utilisez directement React.lazy() dans vos composants
 */
// export function lazyLoad<T extends React.ComponentType<any>>(
//   importFn: () => Promise<{ default: T }>,
//   fallback?: React.ReactNode
// ) {
//   return React.lazy(importFn);
// }

/**
 * Debounce function pour optimiser les appels fréquents
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function pour limiter la fréquence d'exécution
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Vérifie si on est en mode développement
 */
export const isDev = process.env.NODE_ENV === 'development';

/**
 * Vérifie si on est en mode production
 */
export const isProd = process.env.NODE_ENV === 'production';

