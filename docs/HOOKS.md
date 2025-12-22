# 🪝 Hooks Personnalisés

Documentation complète des hooks personnalisés disponibles dans le projet.

---

## 📚 Table des Matières

- [Theme Hooks](#theme-hooks)
- [CommandPalette Hooks](#commandpalette-hooks)
- [Performance Hooks](#performance-hooks)

---

## 🎨 Theme Hooks

### `useThemeManager`

Hook principal pour gérer l'état du thème avec persistance dans localStorage.

**Localisation** : `@/components/theme/hooks`

**Utilisation** :

```tsx
import { useThemeManager } from '@/components/theme/hooks';

function MyComponent() {
  const { theme, updateColor, updateTheme, resetTheme, mounted } = useThemeManager();
  
  return (
    <div>
      <button onClick={() => updateColor('primary', '#FF0000')}>
        Changer la couleur principale
      </button>
      <button onClick={() => resetTheme()}>
        Réinitialiser le thème
      </button>
    </div>
  );
}
```

**Valeurs retournées** :

| Propriété | Type | Description |
|-----------|------|-------------|
| `theme` | `ThemeConfig` | Configuration actuelle du thème |
| `updateColor` | `(key: keyof ThemeConfig, value: string) => void` | Mettre à jour une couleur spécifique |
| `updateTheme` | `(newTheme: Partial<ThemeConfig>) => void` | Mettre à jour plusieurs propriétés du thème |
| `resetTheme` | `() => void` | Réinitialiser le thème aux valeurs par défaut |
| `mounted` | `boolean` | Indique si le composant est monté (pour éviter les erreurs SSR) |

**Exemple avancé** :

```tsx
import { useThemeManager } from '@/components/theme/hooks';
import { themePresets } from '@/components/theme/presets';

function ThemeSelector() {
  const { theme, updateTheme } = useThemeManager();
  
  const applyPreset = (presetName: keyof typeof themePresets) => {
    const preset = themePresets[presetName];
    updateTheme(preset);
  };
  
  return (
    <div>
      <button onClick={() => applyPreset('modern')}>Modern</button>
      <button onClick={() => applyPreset('corporate')}>Corporate</button>
    </div>
  );
}
```

**Notes** :
- Le thème est automatiquement sauvegardé dans `localStorage` à chaque modification
- Les modifications sont appliquées instantanément via des variables CSS
- Le hook gère automatiquement le chargement du thème depuis `localStorage` au montage

---

## ⌘ CommandPalette Hooks

### `useCommandPalette`

Hook pour gérer l'état d'ouverture/fermeture de la Command Palette avec raccourci ⌘K.

**Localisation** : `@/components/ui/CommandPalette`

**Utilisation** :

```tsx
import { CommandPalette, useCommandPalette } from '@/components/ui';
import type { Command } from '@/components/ui';

const commands: Command[] = [
  {
    id: '1',
    label: 'Créer un utilisateur',
    description: 'Ouvrir le formulaire de création',
    category: 'Actions',
    action: () => router.push('/users/new'),
    shortcut: '⌘N',
  },
];

function App() {
  const { isOpen, open, close, toggle } = useCommandPalette(commands);
  
  return (
    <>
      <button onClick={toggle}>Ouvrir Command Palette</button>
      <CommandPalette commands={commands} isOpen={isOpen} onClose={close} />
    </>
  );
}
```

**Valeurs retournées** :

| Propriété | Type | Description |
|-----------|------|-------------|
| `isOpen` | `boolean` | État d'ouverture de la palette |
| `open` | `() => void` | Ouvrir la palette |
| `close` | `() => void` | Fermer la palette |
| `toggle` | `() => void` | Basculer l'état d'ouverture |

**Raccourci clavier** :
- **Mac** : `⌘K` (Cmd + K)
- **Windows/Linux** : `Ctrl+K`

### `useCommandPaletteState`

Hook interne pour gérer l'état complet de la Command Palette (recherche, sélection, filtrage).

**Localisation** : `@/components/ui/CommandPalette.hooks`

**Utilisation interne** :

```tsx
import { useCommandPaletteState } from '@/components/ui/CommandPalette.hooks';

function CommandPalette({ commands, isOpen, onClose }) {
  const { search, setSearch, selectedIndex, filteredCommands, groupedCommands } =
    useCommandPaletteState(commands, isOpen, onClose);
  
  // Utilisation interne du composant
}
```

**Valeurs retournées** :

| Propriété | Type | Description |
|-----------|------|-------------|
| `search` | `string` | Terme de recherche actuel |
| `setSearch` | `(value: string) => void` | Mettre à jour le terme de recherche |
| `selectedIndex` | `number` | Index de la commande sélectionnée |
| `filteredCommands` | `Command[]` | Commandes filtrées selon la recherche |
| `groupedCommands` | `Record<string, Command[]>` | Commandes groupées par catégorie |

### `useFilteredCommands`

Hook pour filtrer les commandes selon un terme de recherche.

**Localisation** : `@/components/ui/CommandPalette.hooks`

**Utilisation** :

```tsx
import { useFilteredCommands } from '@/components/ui/CommandPalette.hooks';

function MyComponent({ commands, searchTerm }) {
  const filteredCommands = useFilteredCommands(commands, searchTerm);
  
  return (
    <div>
      {filteredCommands.map(cmd => (
        <div key={cmd.id}>{cmd.label}</div>
      ))}
    </div>
  );
}
```

**Paramètres** :

| Paramètre | Type | Description |
|-----------|------|-------------|
| `commands` | `Command[]` | Liste des commandes à filtrer |
| `search` | `string` | Terme de recherche |

**Retour** : `Command[]` - Liste des commandes filtrées

**Critères de recherche** :
- Recherche dans `label`
- Recherche dans `description`
- Recherche dans `keywords`
- Recherche dans `category`

### `useGroupedCommands`

Hook pour grouper les commandes par catégorie.

**Localisation** : `@/components/ui/CommandPalette.hooks`

**Utilisation** :

```tsx
import { useGroupedCommands } from '@/components/ui/CommandPalette.hooks';

function MyComponent({ commands }) {
  const groupedCommands = useGroupedCommands(commands);
  
  return (
    <div>
      {Object.entries(groupedCommands).map(([category, cmds]) => (
        <div key={category}>
          <h3>{category}</h3>
          {cmds.map(cmd => <div key={cmd.id}>{cmd.label}</div>)}
        </div>
      ))}
    </div>
  );
}
```

**Paramètres** :

| Paramètre | Type | Description |
|-----------|------|-------------|
| `commands` | `Command[]` | Liste des commandes à grouper |

**Retour** : `Record<string, Command[]>` - Commandes groupées par catégorie

**Note** : Les commandes sans catégorie sont groupées sous "Autres"

### `useKeyboardNavigation`

Hook pour gérer la navigation clavier dans la Command Palette.

**Localisation** : `@/components/ui/CommandPalette.hooks`

**Utilisation interne** :

```tsx
import { useKeyboardNavigation } from '@/components/ui/CommandPalette.hooks';

useKeyboardNavigation(
  isOpen,
  filteredCommands,
  selectedIndex,
  handleSelect,
  onClose
);
```

**Paramètres** :

| Paramètre | Type | Description |
|-----------|------|-------------|
| `isOpen` | `boolean` | État d'ouverture |
| `filteredCommands` | `Command[]` | Commandes filtrées |
| `selectedIndex` | `number` | Index sélectionné |
| `onSelect` | `(index: number) => void` | Callback de sélection |
| `onClose` | `() => void` | Callback de fermeture |

**Raccourcis clavier** :
- `ArrowDown` : Sélectionner la commande suivante
- `ArrowUp` : Sélectionner la commande précédente
- `Enter` : Exécuter la commande sélectionnée
- `Escape` : Fermer la palette

---

## ⚡ Performance Hooks

### `createLazyComponent`

Fonction utilitaire pour créer un composant lazy-loaded avec fallback.

**Localisation** : `@/lib/performance/lazy`

**Utilisation** :

```tsx
import { createLazyComponent } from '@/lib/performance/lazy';

// Composant lazy avec fallback par défaut (Spinner)
const HeavyComponent = createLazyComponent(
  () => import('./HeavyComponent')
);

// Composant lazy avec fallback personnalisé
const CustomComponent = createLazyComponent(
  () => import('./CustomComponent'),
  <div>Chargement...</div>
);

function App() {
  return <HeavyComponent prop1="value" />;
}
```

**Paramètres** :

| Paramètre | Type | Description |
|-----------|------|-------------|
| `importFn` | `() => Promise<{ default: T }>` | Fonction d'import dynamique |
| `fallback` | `ReactNode` (optionnel) | Composant de fallback (défaut: `<Spinner />`) |

**Retour** : Composant wrapper avec Suspense intégré

**Avantages** :
- Réduction de la taille du bundle initial
- Chargement à la demande
- Gestion automatique du Suspense

### `lazyLoad`

Fonction utilitaire alternative pour le lazy loading avec composant de chargement personnalisé.

**Localisation** : `@/lib/performance/lazy`

**Utilisation** :

```tsx
import { lazyLoad } from '@/lib/performance/lazy';
import LoadingSpinner from './LoadingSpinner';

const MyComponent = lazyLoad(
  () => import('./MyComponent'),
  LoadingSpinner
);
```

**Paramètres** :

| Paramètre | Type | Description |
|-----------|------|-------------|
| `importFn` | `() => Promise<{ default: T }>` | Fonction d'import dynamique |
| `LoadingComponent` | `ComponentType` (optionnel) | Composant de chargement personnalisé |

**Différence avec `createLazyComponent`** :
- `lazyLoad` accepte un composant React comme fallback
- `createLazyComponent` accepte un ReactNode comme fallback

---

## 🔗 Hooks Externes Utilisés

### React Hooks Standards

Le projet utilise également les hooks React standards :

- `useState` - Gestion d'état local
- `useEffect` - Effets de bord
- `useMemo` - Mémoïsation
- `useCallback` - Callbacks mémorisés
- `useContext` - Contexte React
- `useRef` - Références

### Next.js Hooks

- `useRouter` - Navigation Next.js
- `usePathname` - Chemin actuel
- `useSearchParams` - Paramètres de recherche

---

## 📝 Bonnes Pratiques

### 1. Utiliser `mounted` pour éviter les erreurs SSR

```tsx
const { theme, mounted } = useThemeManager();

if (!mounted) {
  return null; // Évite les erreurs SSR
}
```

### 2. Utiliser `useMemo` pour les calculs coûteux

```tsx
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);
```

### 3. Utiliser `useCallback` pour les callbacks stables

```tsx
const handleClick = useCallback(() => {
  doSomething();
}, [dependencies]);
```

---

## 🐛 Dépannage

### Le thème ne s'applique pas

**Problème** : Les modifications du thème ne sont pas visibles

**Solution** :
1. Vérifier que `ThemeManager` est monté dans le layout
2. Vérifier que `mounted` est `true` avant d'utiliser le thème
3. Vérifier la console pour les erreurs CSS

### La Command Palette ne s'ouvre pas

**Problème** : Le raccourci ⌘K ne fonctionne pas

**Solution** :
1. Vérifier que `useCommandPalette` est appelé au niveau racine
2. Vérifier qu'aucun autre composant n'intercepte le raccourci
3. Vérifier que `isOpen` est correctement géré

---

## 📚 Ressources

- [React Hooks Documentation](https://react.dev/reference/react)
- [Next.js Hooks](https://nextjs.org/docs/app/building-your-application/data-fetching)
- [Documentation API](./API.md)
- [Guide de Thème](../apps/web/src/components/theme/README.md)

---

**Dernière mise à jour** : 2025-01-22

