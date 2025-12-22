# 📊 Monitoring Setup Guide

Ce guide explique comment configurer le monitoring des erreurs en production.

## 🔍 Sentry (Recommandé)

### Installation

Sentry est déjà configuré dans le projet mais optionnel. Pour l'activer :

```bash
cd apps/web
pnpm add @sentry/nextjs
```

### Configuration

1. **Créer un compte Sentry** : https://sentry.io/signup/

2. **Créer un projet Next.js** dans votre dashboard Sentry

3. **Ajouter les variables d'environnement** :

```env
# .env.local
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn-here
SENTRY_ORG=your-org
SENTRY_PROJECT=your-project
SENTRY_AUTH_TOKEN=your-auth-token
```

4. **Initialiser Sentry** (déjà fait dans `src/lib/sentry/client.ts`)

### Fonctionnalités

- ✅ **Error Tracking** : Capture automatique des erreurs
- ✅ **Performance Monitoring** : Suivi des performances
- ✅ **Session Replay** : Enregistrement des sessions utilisateur
- ✅ **Source Maps** : Débogage avec code source original
- ✅ **Release Tracking** : Suivi des versions déployées

### Utilisation

Les erreurs sont automatiquement capturées via :
- `handleApiError()` dans `src/lib/errors/api.ts`
- `global-error.tsx` pour les erreurs globales
- `captureException()` pour les erreurs manuelles

```typescript
import { captureException } from '@/lib/sentry/client';

try {
  // votre code
} catch (error) {
  captureException(error, {
    tags: { feature: 'checkout' },
    extra: { userId: user.id },
  });
}
```

## 📈 Analytics Alternatives

### 1. Vercel Analytics (si déployé sur Vercel)

```bash
pnpm add @vercel/analytics
```

### 2. Google Analytics 4

```bash
pnpm add @next/third-parties
```

### 3. LogRocket

```bash
pnpm add logrocket
```

## 🔔 Alertes

Configurez des alertes dans Sentry pour :
- Erreurs critiques (> 10 erreurs/min)
- Nouvelles erreurs
- Performance dégradée
- Disponibilité du service

## 📊 Dashboards

Créez des dashboards pour suivre :
- Taux d'erreur par endpoint
- Temps de réponse
- Erreurs par navigateur/OS
- Erreurs par fonctionnalité

## 🧪 Tests

Les erreurs de test ne sont pas envoyées à Sentry en développement.

Pour tester :
```typescript
// En développement, vérifiez les logs
// En production, vérifiez le dashboard Sentry
```

