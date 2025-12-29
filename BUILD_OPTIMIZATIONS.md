# Optimisations des Builds

Ce document décrit les optimisations appliquées pour accélérer les builds Docker sur Railway.

## Temps de build actuel
- **Avant optimisations** : ~241 secondes (4 minutes)
- **Objectif** : Réduire à ~150-180 secondes (2.5-3 minutes)

## Optimisations appliquées

### 1. Élimination du double type check ✅
**Gain estimé** : ~15-20 secondes

**Problème** : Le type check était effectué deux fois :
- Dans `prebuild` script : `(SKIP_TYPE_CHECK=true || pnpm type-check)`
- Dans `validate-build.js` : Type check complet

**Solution** :
- Supprimé le type check du script `prebuild`
- Conservé uniquement le type check dans `validate-build.js` (avant le build)
- Ajouté `skipLibCheck: true` dans `next.config.js` pour accélérer le type check

**Fichiers modifiés** :
- `apps/web/package.json` : Script `prebuild` simplifié
- `apps/web/next.config.js` : Ajout de `skipLibCheck: true`

### 2. Optimisation des build traces ✅
**Gain estimé** : ~30-45 secondes

**Problème** : Les build traces prenaient ~45 secondes malgré `buildTraces: false` dans `next.config.js`

**Solution** :
- `buildTraces: false` déjà présent dans `next.config.js`
- Ajout de `ENV NEXT_PRIVATE_STANDALONE=true` dans Dockerfile pour forcer le mode standalone
- Les build traces sont désactivées dans le mode standalone

**Fichiers modifiés** :
- `Dockerfile` : Ajout de `ENV NEXT_PRIVATE_STANDALONE=true`

### 3. Optimisation des installations pnpm ✅
**Gain estimé** : ~5-10 secondes

**Problème** : Plusieurs `pnpm install` redondants dans le Dockerfile

**Solution** :
- Supprimé le `pnpm install` après la construction du package types (non nécessaire)
- Utilisé `--frozen-lockfile` quand possible pour des installations plus rapides
- Conservé `--prefer-offline` pour utiliser le cache Railway

**Fichiers modifiés** :
- `Dockerfile` : Optimisation des étapes `pnpm install`

### 4. Cache TypeScript amélioré ✅
**Gain estimé** : ~5-10 secondes

**Solution** :
- `incremental: true` déjà activé dans `tsconfig.json`
- `tsBuildInfoFile` configuré pour utiliser le cache `.next/cache/`
- `skipLibCheck: true` pour éviter la vérification des types des node_modules

**Fichiers modifiés** :
- `apps/web/tsconfig.json` : Déjà optimisé
- `apps/web/next.config.js` : Ajout de `skipLibCheck: true`

## Optimisations futures possibles

### 1. Cache Docker BuildKit
**Gain estimé** : ~20-30 secondes sur les builds suivants

Utiliser BuildKit cache mounts pour :
- Cache pnpm store entre builds
- Cache node_modules entre builds
- Cache TypeScript build info

**Exemple** :
```dockerfile
RUN --mount=type=cache,target=/app/.pnpm-store \
    pnpm install --frozen-lockfile
```

### 2. Parallélisation des étapes Docker
**Gain estimé** : ~10-15 secondes

Paralléliser les COPY et RUN indépendants dans le Dockerfile.

### 3. Réduction des dépendances
**Gain estimé** : ~10-20 secondes

Auditer et supprimer les dépendances inutilisées pour réduire le temps d'installation.

### 4. Utilisation de Turbopack (quand stable)
**Gain estimé** : ~30-50 secondes

Turbopack est généralement plus rapide que Webpack, mais actuellement désactivé à cause de problèmes avec les routes catch-all de next-auth.

### 5. Cache Next.js amélioré
**Gain estimé** : ~10-20 secondes

Utiliser un cache externe pour `.next/cache/` entre les builds.

## Résumé des gains

| Optimisation | Gain estimé | Statut |
|-------------|-------------|--------|
| Élimination double type check | 15-20s | ✅ Appliqué |
| Désactivation build traces | 30-45s | ✅ Appliqué |
| Optimisation pnpm install | 5-10s | ✅ Appliqué |
| Cache TypeScript amélioré | 5-10s | ✅ Appliqué |
| **Total** | **55-85s** | **✅ Appliqué** |

**Temps de build estimé après optimisations** : ~155-185 secondes (2.5-3 minutes)

## Vérification

Pour vérifier l'efficacité des optimisations :

1. Surveiller les logs de build Railway
2. Comparer le temps de build avant/après
3. Vérifier que les builds fonctionnent toujours correctement

## Notes importantes

- Les optimisations préservent la qualité des builds (type checking toujours effectué)
- Les builds restent reproductibles et fiables
- Les optimisations sont compatibles avec Railway et Docker
