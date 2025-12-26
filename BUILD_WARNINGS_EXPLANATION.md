# Explication des Warnings du Build

## 1. ⚠ Middleware Deprecation Warning

**Warning**: `The "middleware" file convention is deprecated. Please use "proxy" instead.`

### Explication
Next.js 16+ recommande d'utiliser la convention "proxy" au lieu de "middleware" pour les nouvelles applications. Cependant, le fichier `middleware.ts` fonctionne toujours et reste supporté.

### Impact
- **Niveau** : Informatif (non bloquant)
- **Action requise** : Aucune action immédiate nécessaire
- **Priorité** : Basse

### Solution (optionnelle)
Si vous souhaitez migrer vers "proxy" dans le futur, vous devrez :
1. Renommer `middleware.ts` en `proxy.ts`
2. Adapter la syntaxe selon la nouvelle API Next.js
3. Tester toutes les routes protégées

**Recommandation** : Ignorer ce warning pour l'instant car le middleware fonctionne correctement.

---

## 2. ⚠ Sentry onRequestError Hook Missing

**Warning**: `Could not find 'onRequestError' hook in instrumentation file`

### Explication
Sentry cherche le hook `onRequestError` dans le fichier d'instrumentation pour capturer automatiquement les erreurs des React Server Components (RSC) imbriqués. Sans ce hook, certaines erreurs RSC peuvent ne pas être capturées.

### Impact
- **Niveau** : Avertissement (non bloquant)
- **Action requise** : Ajouter le hook `onRequestError`
- **Priorité** : Moyenne (améliore le monitoring)

### Solution
Ajouter le hook `onRequestError` dans `apps/web/src/instrumentation.ts` :

```typescript
import * as Sentry from '@sentry/nextjs';

export async function register() {
  // ... existing code
}

// Add this function to capture RSC errors
export function onRequestError(
  err: Error,
  request: {
    path: string;
    headers: Headers;
  },
  context: {
    routerKind: string;
    routePath: string;
  }
) {
  Sentry.captureException(err, {
    tags: {
      component: 'rsc',
      routerKind: context.routerKind,
      routePath: context.routePath,
    },
    extra: {
      path: request.path,
    },
  });
}
```

---

## 3. ⚠ Sentry Client Config Deprecation

**Warning**: `It is recommended renaming your 'sentry.client.config.ts' file, or moving its content to 'instrumentation-client.ts'`

### Explication
Sentry recommande de renommer `sentry.client.config.ts` en `instrumentation-client.ts` pour la compatibilité avec Turbopack (le nouveau bundler de Next.js). Avec Turbopack, `sentry.client.config.ts` ne fonctionnera plus.

### Impact
- **Niveau** : Avertissement (non bloquant actuellement)
- **Action requise** : Renommer le fichier (recommandé pour compatibilité future)
- **Priorité** : Moyenne (préparation pour Turbopack)

### Solution
1. Créer `apps/web/src/instrumentation-client.ts` avec le contenu de `sentry.client.config.ts`
2. Supprimer `apps/web/sentry.client.config.ts`
3. Mettre à jour les imports si nécessaire

**Note** : Cette migration est recommandée si vous prévoyez d'utiliser Turbopack à l'avenir.

---

## Résumé des Actions Recommandées

| Warning | Priorité | Action | Impact |
|---------|----------|--------|--------|
| Middleware deprecation | Basse | Aucune (informatif) | Aucun |
| Sentry onRequestError | Moyenne | Ajouter le hook | Améliore le monitoring |
| Sentry client config | Moyenne | Renommer le fichier | Compatibilité Turbopack |

---

## Recommandation Générale

Ces warnings sont **non bloquants** et n'empêchent pas le build de réussir. Cependant, il est recommandé de :

1. **Ajouter le hook `onRequestError`** pour améliorer le monitoring Sentry
2. **Renommer `sentry.client.config.ts`** si vous prévoyez d'utiliser Turbopack
3. **Ignorer le warning middleware** pour l'instant (fonctionne toujours)

Ces corrections peuvent être faites progressivement sans impact sur le fonctionnement actuel de l'application.

