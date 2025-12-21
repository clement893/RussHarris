# Configuration TypeScript stricte

Ce document décrit la configuration TypeScript stricte mise en place pour le projet MODELE-NEXTJS-FULLSTACK.

## 📋 Vue d'ensemble

Le projet utilise maintenant une configuration TypeScript stricte optimisée pour Next.js 16, avec des règles ESLint strictes et un package de types partagés entre le frontend et le backend.

## 🔧 Configuration TypeScript

### Frontend (`apps/web/tsconfig.json`)

La configuration TypeScript du frontend inclut :

- **Mode strict complet** : Toutes les vérifications strictes sont activées
- **Règles supplémentaires** :
  - `noUncheckedIndexedAccess` : Accès aux tableaux/objets vérifiés
  - `noImplicitOverride` : Override explicite requis
  - `strictPropertyInitialization` : Initialisation des propriétés de classe requise
- **Optimisé pour Next.js 16** :
  - Plugin Next.js configuré
  - Support des types Next.js automatique
  - Paths configurés pour les imports

### Package de types (`packages/types/tsconfig.json`)

Le package de types partagés utilise également une configuration stricte pour garantir la qualité des types partagés.

## 🚨 Règles ESLint strictes

### Configuration (`apps/web/.eslintrc.js`)

Les règles ESLint suivantes sont activées pour éviter les erreurs courantes :

#### TypeScript
- `@typescript-eslint/no-explicit-any` : Interdit l'utilisation de `any`
- `@typescript-eslint/no-floating-promises` : Toutes les promesses doivent être gérées
- `@typescript-eslint/prefer-optional-chain` : Utilisation de l'optional chaining
- `@typescript-eslint/consistent-type-imports` : Imports de types séparés
- `@typescript-eslint/explicit-function-return-type` : Types de retour explicites (warn)

#### Général
- `no-console` : Avertissement pour console.log (sauf warn/error)
- `no-debugger` : Interdit les debugger en production
- `prefer-const` : Utilisation de const par défaut
- `no-var` : Interdit var, utilise let/const

#### React/Next.js
- `react-hooks/rules-of-hooks` : Règles des hooks React
- `react-hooks/exhaustive-deps` : Dépendances exhaustives
- `@next/next/no-html-link-for-pages` : Utilisation de Link pour la navigation

### Exceptions

Certaines règles sont assouplies pour :
- **Fichiers de configuration** : `*.config.js`, `*.config.ts`
- **Tests** : `**/__tests__/**/*`, `**/*.test.*`, `**/*.spec.*`

## 📦 Package de types partagés

### Structure

```
packages/types/
├── src/
│   ├── index.ts      # Types principaux
│   └── api.ts        # Types API
├── package.json
├── tsconfig.json
└── README.md
```

### Types disponibles

Le package `@modele/types` exporte :

- **User** : Types utilisateur (User, UserCreate, UserUpdate)
- **Auth** : Types d'authentification (LoginRequest, LoginResponse, etc.)
- **API** : Types de réponse API (ApiResponse, PaginatedResponse)
- **Common** : Types utilitaires (Nullable, Optional, Maybe, etc.)

### Utilisation

```typescript
import type { User, ApiResponse } from '@modele/types';

// Dans le frontend
const user: User = { ... };
const response: ApiResponse<User> = await fetchUser();

// Dans le backend (à configurer)
// from modele.types import User, ApiResponse
```

### Installation

Le package est automatiquement lié via le workspace pnpm. Pour l'utiliser :

```bash
# Build du package de types
cd packages/types
pnpm build

# Ou depuis la racine
pnpm --filter @modele/types build
```

## 🔍 Vérification de la configuration

### Type checking

```bash
# Frontend
cd apps/web
pnpm type-check

# Package de types
cd packages/types
pnpm type-check
```

### Linting

```bash
# Frontend
cd apps/web
pnpm lint

# Depuis la racine
pnpm lint
```

## 📝 Bonnes pratiques

1. **Utiliser les types partagés** : Préférer `@modele/types` pour les types communs
2. **Éviter `any`** : Utiliser `unknown` ou des types spécifiques
3. **Types explicites** : Définir les types de retour des fonctions
4. **Optional chaining** : Utiliser `?.` au lieu de vérifications manuelles
5. **Nullish coalescing** : Utiliser `??` au lieu de `||` pour les valeurs nulles/undefined

## 🐛 Résolution des erreurs courantes

### Erreur : "Type 'X' is not assignable to type 'Y'"

Vérifier que les types correspondent exactement. Utiliser `as const` ou des assertions de type si nécessaire.

### Erreur : "Property 'X' does not exist on type 'Y'"

Vérifier que la propriété existe dans le type. Utiliser l'optional chaining si la propriété peut être undefined.

### Erreur : "Unused variable"

Supprimer la variable ou la préfixer avec `_` si elle est intentionnellement non utilisée.

### Erreur : "Promise returned in function must be handled"

Ajouter `.catch()` ou utiliser `await` pour gérer la promesse.

## 🔄 Migration

Si vous avez du code existant qui ne respecte pas ces règles :

1. Exécutez `pnpm type-check` pour identifier les erreurs
2. Exécutez `pnpm lint` pour identifier les problèmes de style
3. Corrigez les erreurs une par une
4. Utilisez `// eslint-disable-next-line` temporairement si nécessaire

## 📚 Ressources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [ESLint TypeScript Rules](https://typescript-eslint.io/rules/)
- [Next.js TypeScript Documentation](https://nextjs.org/docs/app/building-your-application/configuring/typescript)

