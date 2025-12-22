# Contributing to MODELE-NEXTJS-FULLSTACK

Merci de votre intérêt pour contribuer ! Ce document fournit les guidelines et instructions pour contribuer au projet.

---

## 📋 Table des Matières

- [Code de Conduite](#code-de-conduite)
- [Démarrage](#démarrage)
- [Standards de Code](#standards-de-code)
- [Tests](#tests)
- [Commits](#commits)
- [Pull Requests](#pull-requests)
- [Documentation](#documentation)

---

## 🤝 Code de Conduite

- Soyez respectueux et inclusif
- Accueillez les perspectives diverses
- Concentrez-vous sur les retours constructifs
- Signalez les comportements inappropriés

---

## 🚀 Démarrage

### 1. Fork et Clone

```bash
# Fork le dépôt sur GitHub, puis :
git clone https://github.com/VOTRE_USERNAME/MODELE-NEXTJS-FULLSTACK.git
cd MODELE-NEXTJS-FULLSTACK
```

### 2. Créer une Branche

```bash
git checkout -b feat/nom-de-la-fonctionnalite
# ou
git checkout -b fix/nom-du-bug
```

### 3. Installer les Dépendances

```bash
pnpm install
```

### 4. Configuration de l'Environnement

```bash
cp backend/.env.example backend/.env
cp apps/web/.env.example apps/web/.env.local
# Éditer les fichiers .env avec vos valeurs
```

### 5. Démarrer le Développement

```bash
# Frontend + Backend
pnpm dev:full

# Frontend uniquement
pnpm dev:frontend

# Backend uniquement
pnpm dev:backend
```

---

## 📝 Standards de Code

### Frontend (TypeScript/React)

#### Règles Générales

- ✅ **TypeScript strict** : Utiliser TypeScript pour la sécurité de type
- ✅ **ESLint** : Suivre les règles ESLint configurées
- ✅ **Prettier** : Formater avec Prettier
- ✅ **Composants fonctionnels** : Utiliser des composants fonctionnels avec hooks
- ✅ **Composants petits** : Garder les composants petits et focalisés (< 200 lignes)

#### Vérification du Code

```bash
# Linter
pnpm lint

# Formater
pnpm format

# Vérification TypeScript
pnpm type-check

# Tout vérifier
pnpm lint && pnpm format && pnpm type-check
```

#### Structure des Composants

```tsx
// ✅ Bon - Structure claire
'use client';

import { useState } from 'react';
import type { ComponentProps } from './types';

export default function Component({ prop1, prop2 }: ComponentProps) {
  const [state, setState] = useState();
  
  return <div>{/* ... */}</div>;
}
```

#### Nommage

- **Composants** : PascalCase (`Button`, `DataTable`)
- **Fichiers** : PascalCase pour composants (`Button.tsx`)
- **Hooks** : camelCase avec préfixe `use` (`useThemeManager`)
- **Utilitaires** : camelCase (`hexToRgb`, `generateColorShades`)
- **Constantes** : UPPER_SNAKE_CASE (`COLORS`, `FONT_OPTIONS`)

### Backend (Python)

#### Règles Générales

- ✅ **PEP 8** : Suivre le guide de style PEP 8
- ✅ **Type hints** : Utiliser les annotations de type
- ✅ **Docstrings** : Écrire des docstrings pour toutes les fonctions
- ✅ **Fonctions focalisées** : Une fonction = une responsabilité

#### Vérification du Code

```bash
cd backend

# Linter
ruff check .

# Formater
ruff format .

# Type checking
mypy app
```

---

## 🧪 Tests

### Objectifs de Coverage

- **Composants critiques** : 80%+
- **Utilitaires** : 90%+
- **Hooks** : 85%+

### Écrire des Tests

#### Test d'un Composant

```tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

#### Test d'un Hook

```tsx
import { renderHook, act } from '@testing-library/react';
import { useThemeManager } from '@/components/theme/hooks';

describe('useThemeManager', () => {
  it('updates color', () => {
    const { result } = renderHook(() => useThemeManager());
    
    act(() => {
      result.current.updateColor('primary', '#FF0000');
    });
    
    expect(result.current.theme.primary).toBe('#FF0000');
  });
});
```

### Exécuter les Tests

```bash
# Tous les tests
pnpm test

# Tests avec interface
pnpm test:ui

# Tests avec coverage
pnpm test:coverage

# Tests E2E
pnpm test:e2e
```

**Voir** : [Guide des Tests](./docs/TESTING.md) pour plus de détails

---

## 📝 Commits

### Conventional Commits

Utiliser [Conventional Commits](https://www.conventionalcommits.org/) :

- `feat:` - Nouvelle fonctionnalité
- `fix:` - Correction de bug
- `docs:` - Documentation
- `style:` - Style de code (formatage, etc.)
- `refactor:` - Refactorisation
- `test:` - Tests
- `chore:` - Build, dépendances, etc.
- `perf:` - Amélioration de performance
- `ci:` - CI/CD

### Format

```
<type>(<scope>): <description>

<corps optionnel>

<footer optionnel>
```

### Exemples

```bash
# Fonctionnalité
git commit -m "feat(ui): add CommandPalette component"

# Bug fix
git commit -m "fix(theme): correct color generation for dark mode"

# Documentation
git commit -m "docs: add hooks documentation"

# Refactorisation
git commit -m "refactor(api): simplify ApiClient request method"
```

### Corps du Commit (Optionnel)

Pour les changements importants :

```bash
git commit -m "feat(theme): add theme presets

- Add 5 theme presets (Default, Modern, Corporate, Vibrant, Minimal)
- Add preset selector in ThemeManager
- Persist selected preset in localStorage
- Update documentation"
```

---

## 🔀 Pull Requests

### Processus

1. **Mettre à jour la documentation** si nécessaire
2. **Ajouter des tests** pour les nouvelles fonctionnalités
3. **Vérifier que tous les tests passent** : `pnpm test`
4. **Vérifier la qualité du code** : `pnpm lint && pnpm type-check`
5. **Mettre à jour CHANGELOG.md** si nécessaire
6. **Fournir une description claire** de la PR

### Template de PR

```markdown
## Description
Brève description des changements

## Type de changement
- [ ] Bug fix
- [ ] Nouvelle fonctionnalité
- [ ] Breaking change
- [ ] Documentation

## Tests
- [ ] Tests unitaires ajoutés
- [ ] Tests d'intégration ajoutés
- [ ] Tous les tests passent

## Checklist
- [ ] Code formaté avec Prettier
- [ ] Code vérifié avec ESLint
- [ ] Documentation mise à jour
- [ ] CHANGELOG.md mis à jour
```

---

## 📚 Documentation

### Quand Mettre à Jour la Documentation

- ✅ Nouvelle fonctionnalité ajoutée
- ✅ API modifiée
- ✅ Processus de développement changé
- ✅ Nouveau hook ou utilitaire créé

### Fichiers de Documentation

- **README.md** : Vue d'ensemble du projet
- **docs/INDEX.md** : Index de toute la documentation
- **docs/API.md** : Documentation API complète
- **docs/HOOKS.md** : Documentation des hooks
- **docs/UTILS.md** : Documentation des utilitaires
- **docs/TESTING.md** : Guide des tests
- **docs/TROUBLESHOOTING.md** : Guide de dépannage

### Standards de Documentation

- ✅ Utiliser Markdown
- ✅ Ajouter des exemples de code
- ✅ Documenter tous les paramètres
- ✅ Ajouter des notes et avertissements
- ✅ Mettre à jour la table des matières

---

## 🐛 Signaler des Bugs

### Template d'Issue

```markdown
## Description
Description claire du bug

## Étapes pour Reproduire
1. Aller à '...'
2. Cliquer sur '...'
3. Voir l'erreur

## Comportement Attendu
Ce qui devrait se passer

## Comportement Actuel
Ce qui se passe réellement

## Environnement
- OS: [e.g. Windows 10]
- Navigateur: [e.g. Chrome 120]
- Version: [e.g. 1.0.0]

## Screenshots
Si applicable, ajouter des screenshots

## Logs
Si applicable, ajouter les logs d'erreur
```

---

## 💡 Demandes de Fonctionnalités

### Template

```markdown
## Cas d'Usage
Description du cas d'usage

## Solution Proposée
Description de la solution proposée

## Alternatives Considérées
Autres solutions considérées

## Contexte Additionnel
Tout autre contexte pertinent
```

---

## ✅ Checklist Avant de Soumettre

- [ ] Code formaté avec Prettier
- [ ] Code vérifié avec ESLint
- [ ] Tests ajoutés et passent
- [ ] Documentation mise à jour
- [ ] CHANGELOG.md mis à jour
- [ ] Commit messages suivent Conventional Commits
- [ ] PR description claire et complète

---

## 📞 Questions ?

- Ouvrir une discussion sur GitHub
- Vérifier les issues/discussions existantes
- Lire la documentation dans `docs/`

---

## 📄 Licence

En contribuant, vous acceptez que vos contributions soient sous licence MIT.

---

**Merci de contribuer ! 🙏**
