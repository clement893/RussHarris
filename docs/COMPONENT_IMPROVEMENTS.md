# Guide d'Amélioration Rapide - Système de Composants

## 🎯 Améliorations Immédiates (Quick Wins)

### 1. Unifier les Types (30 min)

#### Problème
Plusieurs composants définissent leurs propres types au lieu d'utiliser ceux de `types.ts`.

#### Solution
```typescript
// ❌ AVANT - Alert.tsx
export type AlertVariant = 'info' | 'success' | 'warning' | 'error';

// ✅ APRÈS - Alert.tsx
import { ColorVariant } from './types';
export type AlertVariant = ColorVariant; // ou utiliser directement ColorVariant
```

**Fichiers à modifier** :
- `Alert.tsx` - Utiliser `ColorVariant` au lieu de `AlertVariant`
- `Loading.tsx` - Utiliser `Size` de `types.ts`
- `Progress.tsx` - Utiliser `Size` de `types.ts`

### 2. Créer un Système de Design Tokens (1h)

Créer `components/ui/tokens.ts` :

```typescript
/**
 * Design Tokens
 * Centralized design values using CSS variables from global theme
 */

export const tokens = {
  colors: {
    primary: {
      base: 'var(--color-primary)',
      hover: 'var(--color-primary-hover, var(--color-primary))',
      focus: 'var(--color-primary-focus, var(--color-primary))',
    },
    secondary: {
      base: 'var(--color-secondary)',
      hover: 'var(--color-secondary-hover, var(--color-secondary))',
    },
    // ...
  },
  spacing: {
    xs: 'var(--spacing-xs, 4px)',
    sm: 'var(--spacing-sm, 8px)',
    md: 'var(--spacing-md, 16px)',
    lg: 'var(--spacing-lg, 24px)',
    xl: 'var(--spacing-xl, 32px)',
  },
  borderRadius: {
    sm: 'var(--border-radius-sm, 2px)',
    md: 'var(--border-radius-md, 4px)',
    lg: 'var(--border-radius-lg, 8px)',
    xl: 'var(--border-radius-xl, 12px)',
  },
  typography: {
    fontFamily: {
      sans: 'var(--typography-font-family-sans, Inter, sans-serif)',
      mono: 'var(--typography-font-family-mono, monospace)',
    },
    fontSize: {
      xs: 'var(--typography-font-size-xs, 12px)',
      sm: 'var(--typography-font-size-sm, 14px)',
      base: 'var(--typography-font-size-base, 16px)',
      lg: 'var(--typography-font-size-lg, 18px)',
    },
  },
};
```

### 3. Ajouter React.memo pour Performance (30 min)

Pour les composants qui re-render souvent :

```typescript
// Button.tsx
import { memo } from 'react';

function Button({ ... }: ButtonProps) {
  // ...
}

export default memo(Button);

// DataTable.tsx
export default memo(DataTable);
```

### 4. Créer un Error Boundary (1h)

```typescript
// components/ui/ErrorBoundary.tsx
'use client';

import { Component, ReactNode } from 'react';
import Alert from './Alert';
import Button from './Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <Alert variant="error" title="Une erreur est survenue">
          {this.state.error?.message || 'Une erreur inattendue s\'est produite'}
          <Button onClick={() => this.setState({ hasError: false })}>
            Réessayer
          </Button>
        </Alert>
      );
    }

    return this.props.children;
  }
}
```

---

## 📋 Checklist de Vérification

### Avant de Commencer un Nouveau Projet

- [ ] ✅ Types unifiés - Tous les composants utilisent `types.ts`
- [ ] ✅ Design tokens - Système de tokens créé et utilisé
- [ ] ✅ Variables CSS - Tous les composants utilisent les variables du thème
- [ ] ✅ Tests de base - Au moins un test par composant critique
- [ ] ✅ Error Boundaries - En place pour isoler les erreurs
- [ ] ✅ Performance - Composants lourds optimisés avec memo/lazy
- [ ] ✅ Documentation - README à jour avec exemples

### Standards de Code

- [ ] ✅ Props étendues avec `HTMLAttributes` quand approprié
- [ ] ✅ `forwardRef` pour les composants de formulaire
- [ ] ✅ Support complet du dark mode
- [ ] ✅ Attributs ARIA appropriés
- [ ] ✅ Navigation clavier fonctionnelle
- [ ] ✅ Focus visible

---

## 🚀 Améliorations Futures

### Storybook (Recommandé)

```bash
# Installation
pnpm add -D @storybook/react @storybook/addon-essentials

# Configuration
npx storybook init

# Créer une story pour Button
# components/ui/Button.stories.tsx
```

### Tests Automatisés d'Accessibilité

```bash
pnpm add -D @axe-core/react jest-axe

# Dans les tests
import { axe, toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);

it('should have no accessibility violations', async () => {
  const { container } = render(<Button>Test</Button>);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Bundle Analysis

```bash
pnpm add -D @next/bundle-analyzer

# next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
```

---

## 📊 Métriques de Qualité

### Objectifs

- **Couverture de tests** : 70% minimum
- **Accessibilité** : 0 violations WCAG 2.1 AA
- **Performance** : Lighthouse score > 90
- **Bundle size** : < 200KB pour les composants UI
- **TypeScript** : 100% de typage strict

### Outils Recommandés

- **Tests** : Vitest + React Testing Library
- **Accessibilité** : axe-core + jest-axe
- **Performance** : Lighthouse CI
- **Bundle** : @next/bundle-analyzer
- **Documentation** : Storybook

---

## ✅ Conclusion

Le système de composants est **excellent** et prêt pour le développement. Les améliorations suggérées sont des optimisations qui peuvent être faites progressivement.

**Priorité** :
1. 🔴 Unifier les types (impact immédiat sur la maintenabilité)
2. 🟡 Design tokens (impact sur la cohérence)
3. 🟢 Storybook (impact sur la productivité)

