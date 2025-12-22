# 🧪 Guide des Tests

Guide complet pour écrire et exécuter des tests dans le projet.

---

## 📚 Table des Matières

- [Configuration](#configuration)
- [Écrire des Tests](#écrire-des-tests)
- [Types de Tests](#types-de-tests)
- [Bonnes Pratiques](#bonnes-pratiques)
- [Dépannage](#dépannage)

---

## ⚙️ Configuration

### Outils Utilisés

- **Vitest** : Framework de test
- **React Testing Library** : Tests de composants React
- **Playwright** : Tests E2E
- **@testing-library/jest-dom** : Matchers DOM personnalisés

### Installation

Les dépendances sont déjà installées dans le projet :

```bash
pnpm install
```

### Configuration

**Vitest** : `apps/web/vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

---

## ✍️ Écrire des Tests

### Structure d'un Test

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Component from './Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

### Test d'un Composant Simple

**Exemple : Button**

```tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await userEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies variant classes', () => {
    const { container } = render(<Button variant="primary">Click me</Button>);
    expect(container.firstChild).toHaveClass('bg-primary-600');
  });
});
```

### Test d'un Composant avec Hooks

**Exemple : useThemeManager**

```tsx
import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useThemeManager } from '@/components/theme/hooks';

describe('useThemeManager', () => {
  it('initializes with default theme', () => {
    const { result } = renderHook(() => useThemeManager());
    expect(result.current.theme.primary).toBe('#3B82F6');
  });

  it('updates color when updateColor is called', () => {
    const { result } = renderHook(() => useThemeManager());
    
    act(() => {
      result.current.updateColor('primary', '#FF0000');
    });
    
    expect(result.current.theme.primary).toBe('#FF0000');
  });

  it('resets theme when resetTheme is called', () => {
    const { result } = renderHook(() => useThemeManager());
    
    act(() => {
      result.current.updateColor('primary', '#FF0000');
      result.current.resetTheme();
    });
    
    expect(result.current.theme.primary).toBe('#3B82F6');
  });
});
```

### Test d'un Composant avec Formulaires

**Exemple : Input**

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

describe('Input', () => {
  it('renders with label', () => {
    render(<Input label="Email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<Input label="Email" error="Invalid email" />);
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
  });

  it('calls onChange when typing', async () => {
    const handleChange = vi.fn();
    render(<Input label="Email" onChange={handleChange} />);
    
    const input = screen.getByLabelText('Email');
    await userEvent.type(input, 'test@example.com');
    
    expect(handleChange).toHaveBeenCalled();
  });
});
```

---

## 🎯 Types de Tests

### 1. Tests Unitaires

Tests isolés d'un composant ou fonction.

**Objectif** : Vérifier le comportement d'une unité isolée

**Exemple** :

```tsx
describe('hexToRgb', () => {
  it('converts hex to RGB', () => {
    expect(hexToRgb('#3B82F6')).toEqual({ r: 59, g: 130, b: 246 });
  });

  it('returns null for invalid hex', () => {
    expect(hexToRgb('invalid')).toBeNull();
  });
});
```

### 2. Tests d'Intégration

Tests d'interaction entre plusieurs composants.

**Objectif** : Vérifier que les composants fonctionnent ensemble

**Exemple** :

```tsx
describe('Form with Input', () => {
  it('submits form with input value', async () => {
    const handleSubmit = vi.fn();
    render(
      <Form onSubmit={handleSubmit}>
        <Input name="email" label="Email" />
        <Button type="submit">Submit</Button>
      </Form>
    );
    
    await userEvent.type(screen.getByLabelText('Email'), 'test@example.com');
    await userEvent.click(screen.getByText('Submit'));
    
    expect(handleSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
    });
  });
});
```

### 3. Tests E2E (End-to-End)

Tests de flux complets utilisateur avec Playwright.

**Objectif** : Vérifier les scénarios utilisateur complets

**Exemple** :

```typescript
import { test, expect } from '@playwright/test';

test('user can login and access dashboard', async ({ page }) => {
  await page.goto('http://localhost:3000/login');
  
  await page.fill('[name="email"]', 'user@example.com');
  await page.fill('[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  
  await expect(page).toHaveURL('http://localhost:3000/dashboard');
  await expect(page.locator('h1')).toContainText('Dashboard');
});
```

---

## ✅ Bonnes Pratiques

### 1. Nommer les Tests de Manière Descriptive

```tsx
// ✅ Bon
it('displays error message when email is invalid', () => { });

// ❌ Mauvais
it('test 1', () => { });
```

### 2. Tester le Comportement, Pas l'Implémentation

```tsx
// ✅ Bon - Teste le comportement
it('calls onSubmit when form is submitted', () => { });

// ❌ Mauvais - Teste l'implémentation
it('calls handleSubmit function', () => { });
```

### 3. Utiliser les Queries Accessibles

```tsx
// ✅ Bon
screen.getByRole('button', { name: 'Submit' });
screen.getByLabelText('Email');

// ❌ Mauvais
screen.getByTestId('submit-button');
```

### 4. Isoler les Tests

```tsx
// ✅ Bon - Chaque test est indépendant
describe('Button', () => {
  it('renders correctly', () => { });
  it('handles click', () => { });
});

// ❌ Mauvais - Tests dépendants
describe('Button', () => {
  let button;
  it('renders correctly', () => {
    button = render(<Button />);
  });
  it('handles click', () => {
    // Dépend de test précédent
    click(button);
  });
});
```

### 5. Utiliser `act` pour les Mises à Jour d'État

```tsx
import { act } from '@testing-library/react';

act(() => {
  result.current.updateColor('primary', '#FF0000');
});
```

---

## 🚀 Exécuter les Tests

### Tous les Tests

```bash
pnpm test
```

### Tests avec Interface

```bash
pnpm test:ui
```

### Tests en Mode Watch

```bash
pnpm test:watch
```

### Tests avec Coverage

```bash
pnpm test:coverage
```

### Tests E2E

```bash
pnpm test:e2e
```

### Tests d'un Fichier Spécifique

```bash
pnpm test Button.test.tsx
```

---

## 📊 Coverage

### Objectif de Coverage

- **Composants critiques** : 80%+
- **Utilitaires** : 90%+
- **Hooks** : 85%+

### Vérifier le Coverage

```bash
pnpm test:coverage
```

Le rapport sera généré dans `coverage/` avec un rapport HTML.

---

## 🐛 Dépannage

### Les Tests Échouent avec "Cannot find module"

**Problème** : Les alias `@/` ne sont pas résolus

**Solution** :
1. Vérifier que `vitest.config.ts` contient la configuration des alias
2. Vérifier que `tsconfig.json` contient les mêmes alias

### Les Tests Échouent avec "useTheme must be used within ThemeProvider"

**Problème** : Le hook nécessite un provider

**Solution** :
```tsx
import { ThemeProvider } from '@/contexts/ThemeContext';

render(
  <ThemeProvider>
    <Component />
  </ThemeProvider>
);
```

### Les Tests Échouent avec "localStorage is not defined"

**Problème** : localStorage n'est pas disponible dans l'environnement de test

**Solution** :
```tsx
// Dans setup.ts
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
});
```

---

## 📚 Ressources

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Documentation](https://playwright.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

---

**Dernière mise à jour** : 2025-01-22

