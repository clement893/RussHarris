# 🔧 Guide de Dépannage

Guide complet pour résoudre les problèmes courants du projet.

---

## 📚 Table des Matières

- [Erreurs de Build](#erreurs-de-build)
- [Erreurs TypeScript](#erreurs-typescript)
- [Erreurs Runtime](#erreurs-runtime)
- [Problèmes de Thème](#problèmes-de-thème)
- [Problèmes de Performance](#problèmes-de-performance)
- [Problèmes Git](#problèmes-git)

---

## 🔨 Erreurs de Build

### Erreur : "Module not found"

**Symptôme** :
```
Error: Cannot find module '@/components/ui/Button'
```

**Solutions** :

1. **Vérifier les alias TypeScript** :
```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

2. **Vérifier les imports** :
```tsx
// ✅ Bon
import Button from '@/components/ui/Button';

// ❌ Mauvais
import Button from './components/ui/Button';
```

3. **Redémarrer le serveur de développement** :
```bash
pnpm dev
```

---

### Erreur : "Cannot find module 'react'"

**Symptôme** :
```
Error: Cannot find module 'react' or its corresponding type declarations
```

**Solutions** :

1. **Réinstaller les dépendances** :
```bash
rm -rf node_modules
pnpm install
```

2. **Vérifier les versions** :
```bash
pnpm list react
```

---

## 📝 Erreurs TypeScript

### Erreur : "Property 'X' does not exist on type 'Y'"

**Symptôme** :
```
Property 'primary' does not exist on type 'ThemeConfig'
```

**Solutions** :

1. **Vérifier les types** :
```tsx
import type { ThemeConfig } from '@/components/theme/types';

const theme: ThemeConfig = {
  primary: '#3B82F6',
  // ...
};
```

2. **Vérifier les imports de types** :
```tsx
// ✅ Bon
import type { ThemeConfig } from '@/components/theme/types';

// ❌ Mauvais
import { ThemeConfig } from '@/components/theme/types';
```

---

### Erreur : "Object is possibly 'undefined'"

**Symptôme** :
```
Object is possibly 'undefined'
```

**Solutions** :

1. **Utiliser l'opérateur de chaînage optionnel** :
```tsx
// ✅ Bon
const value = obj?.property?.nested;

// ❌ Mauvais
const value = obj.property.nested;
```

2. **Ajouter une vérification** :
```tsx
if (obj && obj.property) {
  const value = obj.property.nested;
}
```

---

## ⚠️ Erreurs Runtime

### Erreur : "useTheme must be used within ThemeProvider"

**Symptôme** :
```
Error: useTheme must be used within a ThemeProvider
```

**Solutions** :

1. **Envelopper l'application avec ThemeProvider** :
```tsx
// app/layout.tsx
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

---

### Erreur : "localStorage is not defined"

**Symptôme** :
```
ReferenceError: localStorage is not defined
```

**Solutions** :

1. **Vérifier que le code s'exécute côté client** :
```tsx
'use client';

export function Component() {
  // Code utilisant localStorage
}
```

2. **Ajouter une vérification** :
```tsx
if (typeof window !== 'undefined') {
  localStorage.setItem('key', 'value');
}
```

---

## 🎨 Problèmes de Thème

### Le thème ne s'applique pas

**Symptômes** :
- Les couleurs ne changent pas
- Les modifications ne sont pas visibles

**Solutions** :

1. **Vérifier que ThemeManager est monté** :
```tsx
const { mounted } = useThemeManager();

if (!mounted) {
  return null; // Évite les erreurs SSR
}
```

2. **Vérifier les variables CSS** :
```css
/* globals.css */
:root {
  --color-primary-500: #3B82F6;
}
```

3. **Vérifier la console pour les erreurs** :
```bash
# Ouvrir la console du navigateur
# Chercher les erreurs CSS
```

---

### Les couleurs ne se génèrent pas

**Symptômes** :
- Les nuances de couleurs ne sont pas créées
- Les variables CSS `--color-primary-*` sont manquantes

**Solutions** :

1. **Vérifier que `generateColorShades` est appelé** :
```tsx
import { generateColorShades } from '@/components/theme/utils';

generateColorShades('#3B82F6', 'primary');
```

2. **Vérifier que le code s'exécute côté client** :
```tsx
'use client';
```

---

## ⚡ Problèmes de Performance

### Le lazy loading ne fonctionne pas

**Symptômes** :
- Les composants ne se chargent pas à la demande
- Erreurs de Suspense

**Solutions** :

1. **Vérifier l'export par défaut** :
```tsx
// ✅ Bon
export default function Component() { }

// ❌ Mauvais
export function Component() { }
```

2. **Vérifier le chemin d'import** :
```tsx
// ✅ Bon
const Component = createLazyComponent(() => import('./Component'));

// ❌ Mauvais
const Component = createLazyComponent(() => import('./component'));
```

---

## 🔀 Problèmes Git

### Erreur : "Updates were rejected"

**Symptôme** :
```
error: failed to push some refs to 'origin'
hint: Updates were rejected because the remote contains work that you do not have locally
```

**Solutions** :

1. **Faire un pull avec rebase** :
```bash
git pull origin INITIALComponentRICH --rebase
git push origin INITIALComponentRICH
```

2. **Faire un pull puis push** :
```bash
git pull origin INITIALComponentRICH
git push origin INITIALComponentRICH
```

---

## 🐛 Erreurs Communes

### Erreur : "Component is not exported"

**Symptôme** :
```
Type error: 'Component' is not exported from '@/components/ui/Component'
```

**Solutions** :

1. **Vérifier le type d'export** :
```tsx
// Export par défaut
export default function Component() { }

// Import
import Component from '@/components/ui/Component';
```

2. **Vérifier les exports nommés** :
```tsx
// Export nommé
export function Component() { }

// Import
import { Component } from '@/components/ui/Component';
```

---

### Erreur : "Event handlers cannot be passed to Client Component props"

**Symptôme** :
```
Error: Event handlers cannot be passed to Client Component props
```

**Solutions** :

1. **Ajouter 'use client'** :
```tsx
'use client';

export default function Component() {
  return <button onClick={() => {}}>Click</button>;
}
```

---

## 📞 Obtenir de l'Aide

### Vérifier la Documentation

1. **README.md** : Vue d'ensemble du projet
2. **docs/INDEX.md** : Index de toute la documentation
3. **docs/API.md** : Documentation API complète

### Rechercher les Issues

1. Vérifier les issues GitHub existantes
2. Créer une nouvelle issue si nécessaire

### Debugging

1. **Activer les logs** :
```tsx
console.log('Debug:', value);
```

2. **Utiliser React DevTools** :
- Installer l'extension Chrome/Firefox
- Inspecter les composants

3. **Vérifier la console du navigateur** :
- Ouvrir les DevTools (F12)
- Vérifier les erreurs et warnings

---

## 📚 Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Dernière mise à jour** : 2025-01-22

