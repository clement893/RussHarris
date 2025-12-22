# 📦 Bundle Analysis Guide

Guide pour analyser et optimiser la taille du bundle de l'application.

## 🚀 Utilisation

### Analyse complète

```bash
cd apps/web
pnpm analyze
```

Cela va :
1. Builder l'application en mode production
2. Générer un rapport d'analyse du bundle
3. Ouvrir automatiquement le rapport dans le navigateur

### Analyse serveur uniquement

```bash
pnpm analyze:server
```

### Analyse client uniquement

```bash
pnpm analyze:browser
```

## 📊 Interprétation des résultats

### Métriques importantes

1. **Total Bundle Size** : Taille totale du bundle
   - Objectif : < 500 KB (gzipped)

2. **Initial Load** : Taille du bundle initial
   - Objectif : < 200 KB (gzipped)

3. **Largest Modules** : Plus gros modules
   - Identifier les dépendances volumineuses

### Optimisations courantes

#### 1. Lazy Loading

```typescript
// ✅ Bon
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// ❌ Mauvais
import HeavyComponent from './HeavyComponent';
```

#### 2. Tree Shaking

```typescript
// ✅ Bon - import spécifique
import { Button } from 'lucide-react';

// ❌ Mauvais - import complet
import * as Icons from 'lucide-react';
```

#### 3. Optimisation des images

```typescript
// ✅ Utiliser Next.js Image
import Image from 'next/image';

// ❌ Éviter les images non optimisées
<img src="/image.jpg" />
```

#### 4. Code Splitting

Next.js fait automatiquement le code splitting pour :
- Routes (App Router)
- Dynamic imports
- Lazy components

## 🔍 Dependencies à surveiller

### Dépendances volumineuses courantes

- `@storybook/*` : Ne pas inclure en production
- `@testing-library/*` : Dev dependencies uniquement
- `lucide-react` : Utiliser tree shaking
- `@radix-ui/*` : Importer uniquement ce qui est nécessaire

### Vérifier les dépendances

```bash
# Analyser les dépendances
pnpm why <package-name>

# Vérifier les doublons
pnpm list --depth=0
```

## 📈 Objectifs de performance

### Lighthouse Scores

- **Performance** : > 90
- **First Contentful Paint** : < 1.8s
- **Largest Contentful Paint** : < 2.5s
- **Time to Interactive** : < 3.8s

### Bundle Size

- **Initial JS** : < 200 KB (gzipped)
- **Total JS** : < 500 KB (gzipped)
- **CSS** : < 50 KB (gzipped)

## 🛠️ Outils supplémentaires

### 1. Webpack Bundle Analyzer

Déjà configuré dans `next.config.js`

### 2. Source Map Explorer

```bash
pnpm add -D source-map-explorer
pnpm build
source-map-explorer .next/static/chunks/*.js
```

### 3. Lighthouse CI

```bash
pnpm add -D @lhci/cli
```

## 📝 Checklist d'optimisation

- [ ] Lazy loading des composants lourds
- [ ] Tree shaking activé
- [ ] Images optimisées avec Next.js Image
- [ ] Code splitting automatique
- [ ] Dépendances inutiles supprimées
- [ ] Polyfills uniquement si nécessaire
- [ ] Source maps pour le debugging
- [ ] Compression gzip/brotli activée

## 🔄 Monitoring continu

Intégrez l'analyse du bundle dans votre CI/CD :

```yaml
# .github/workflows/bundle-analysis.yml
- name: Analyze bundle
  run: pnpm analyze
```

