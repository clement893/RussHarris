/**
 * Sentry Server Configuration
 * Configuration pour le tracking d'erreurs côté serveur
 */

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  
  // Ajuster la valeur de sample dans la production
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Environnement
  environment: process.env.NODE_ENV || 'development',
  
  // Ignorer certaines erreurs
  ignoreErrors: [
    'ValidationError',
    'UnauthorizedError',
  ],
});

