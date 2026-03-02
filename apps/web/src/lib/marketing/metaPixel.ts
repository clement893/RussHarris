/**
 * Meta (Facebook) Pixel - track city registration interest
 * Same event per city for: city name click + "Je m'inscris" click (home + Villes & dates)
 */

export type MetaPixelCity = 'Montreal' | 'Toronto' | 'Vancouver';

export function trackCityInterest(city: MetaPixelCity): void {
  if (typeof window === 'undefined' || !window.fbq) return;
  window.fbq('track', 'Lead', { content_name: city });
}
