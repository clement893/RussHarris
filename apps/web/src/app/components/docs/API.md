# 📚 Documentation API Complète - Composants UI

## Vue d'ensemble

Cette bibliothèque de composants UI fournit une collection complète de composants réutilisables pour construire des applications SaaS modernes avec Next.js 16.

## Installation

```bash
# Les composants sont déjà inclus dans le projet
import { Button, Input, Card } from '@/components/ui';
```

## Composants

### Button

Bouton avec plusieurs variants et tailles.

```tsx
import Button from '@/components/ui/Button';

<Button variant="primary" size="md" onClick={() => {}}>
  Cliquer
</Button>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | Variant du bouton |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Taille du bouton |
| `loading` | `boolean` | `false` | Affiche un spinner de chargement |
| `disabled` | `boolean` | `false` | Désactive le bouton |
| `children` | `ReactNode` | - | Contenu du bouton |
| `className` | `string` | - | Classes CSS supplémentaires |
| `...props` | `ButtonHTMLAttributes` | - | Toutes les props HTML standard |

#### Exemples

```tsx
// Variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>

// Tailles
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// États
<Button loading>Loading</Button>
<Button disabled>Disabled</Button>
```

---

### Input

Champ de saisie avec label, erreur et icônes.

```tsx
import Input from '@/components/ui/Input';

<Input
  label="Email"
  type="email"
  placeholder="exemple@email.com"
  error="Email invalide"
  helperText="Entrez votre adresse email"
  leftIcon={<MailIcon />}
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | - | Label du champ |
| `error` | `string` | - | Message d'erreur |
| `helperText` | `string` | - | Texte d'aide |
| `leftIcon` | `ReactNode` | - | Icône à gauche |
| `rightIcon` | `ReactNode` | - | Icône à droite |
| `fullWidth` | `boolean` | `false` | Largeur complète |
| `className` | `string` | - | Classes CSS supplémentaires |
| `...props` | `InputHTMLAttributes` | - | Toutes les props HTML standard |

---

### CommandPalette

Palette de commandes moderne avec raccourci ⌘K.

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

const { isOpen, open, close } = useCommandPalette();

<CommandPalette commands={commands} isOpen={isOpen} onClose={close} />
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `commands` | `Command[]` | - | Liste des commandes |
| `isOpen` | `boolean` | - | État d'ouverture |
| `onClose` | `() => void` | - | Callback de fermeture |
| `placeholder` | `string` | `'Tapez une commande...'` | Placeholder |
| `emptyState` | `ReactNode` | - | État vide personnalisé |

#### Interface Command

```typescript
interface Command {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  keywords?: string[];
  action: () => void;
  category?: string;
  shortcut?: string;
}
```

---

### MultiSelect

Sélection multiple avec tags.

```tsx
import MultiSelect from '@/components/ui/MultiSelect';
import type { MultiSelectOption } from '@/components/ui';

const options: MultiSelectOption[] = [
  { label: 'React', value: 'react', group: 'Frameworks' },
  { label: 'Vue', value: 'vue', group: 'Frameworks' },
];

<MultiSelect
  options={options}
  value={selected}
  onChange={setSelected}
  label="Technologies"
  maxSelected={5}
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `options` | `MultiSelectOption[]` | - | Options disponibles |
| `value` | `string[]` | - | Valeurs sélectionnées |
| `onChange` | `(value: string[]) => void` | - | Callback de changement |
| `maxSelected` | `number` | - | Nombre maximum de sélections |
| `searchable` | `boolean` | `true` | Activer la recherche |
| `clearable` | `boolean` | `true` | Afficher le bouton clear |

---

### RichTextEditor

Éditeur de texte riche avec barre d'outils.

```tsx
import RichTextEditor from '@/components/ui/RichTextEditor';

<RichTextEditor
  value={content}
  onChange={setContent}
  label="Description"
  placeholder="Tapez votre texte..."
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | - | Contenu HTML |
| `onChange` | `(value: string) => void` | - | Callback de changement |
| `toolbar` | `boolean` | `true` | Afficher la barre d'outils |
| `minHeight` | `string` | `'200px'` | Hauteur minimale |

---

### DataTable

Tableau de données avec tri et pagination.

```tsx
import DataTable from '@/components/ui/DataTable';
import type { Column } from '@/components/ui';

const columns: Column[] = [
  { key: 'name', label: 'Nom', sortable: true },
  { key: 'email', label: 'Email', sortable: true },
];

<DataTable
  data={users}
  columns={columns}
  pageSize={10}
  onPageChange={(page) => {}}
  onSortChange={(key, direction) => {}}
/>
```

---

### Modal

Modal dialog avec support complet.

```tsx
import Modal from '@/components/ui/Modal';

<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Titre"
  size="md"
>
  Contenu de la modal
</Modal>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | - | État d'ouverture |
| `onClose` | `() => void` | - | Callback de fermeture |
| `title` | `string` | - | Titre de la modal |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'` | Taille |
| `closeOnOverlayClick` | `boolean` | `true` | Fermer au clic sur overlay |
| `closeOnEscape` | `boolean` | `true` | Fermer avec Escape |

---

## Système de Thème

### Utilisation

Le système de thème permet de personnaliser dynamiquement les couleurs, polices et styles de tous les composants.

```tsx
import { ThemeManager } from '@/components/theme/ThemeManager';

<ThemeManager />
```

### Variables CSS Disponibles

- `--color-primary-*` (50-900)
- `--color-secondary-*` (50-900)
- `--color-danger-*` (50-900)
- `--color-warning-*` (50-900)
- `--color-info-*` (50-900)
- `--font-family`
- `--font-family-heading`
- `--font-family-subheading`
- `--color-text-heading`
- `--color-text-subheading`
- `--color-text-body`
- `--color-text-secondary`
- `--color-text-link`
- `--color-error`
- `--color-success`
- `--border-radius`

### Presets Disponibles

- `default` - Thème par défaut
- `modern` - Thème moderne avec Indigo/Violet
- `corporate` - Thème corporate professionnel
- `vibrant` - Thème vibrant avec Pink/Amber
- `minimal` - Thème minimaliste

---

## Accessibilité

Tous les composants respectent les standards WCAG 2.1 Level AA :

- ✅ Attributs ARIA appropriés
- ✅ Navigation clavier complète
- ✅ Focus visible
- ✅ Support des lecteurs d'écran
- ✅ Contraste de couleurs suffisant

Voir [ACCESSIBILITY.md](../components/ui/ACCESSIBILITY.md) pour plus de détails.

---

## Exemples d'Usage

### Formulaire Complet

```tsx
import { Form, FormField, Input, Button } from '@/components/ui';

<Form onSubmit={(data) => console.log(data)}>
  <FormField name="email" label="Email" required>
    <Input type="email" />
  </FormField>
  <Button type="submit">Envoyer</Button>
</Form>
```

### Dashboard avec StatsCard

```tsx
import { StatsCard } from '@/components/ui';

<StatsCard
  title="Utilisateurs"
  value="1,234"
  change={{ value: 12, type: 'increase', period: 'ce mois' }}
  icon={<UsersIcon />}
/>
```

---

## Support

Pour plus d'informations, consultez :
- [README.md](../components/ui/README.md)
- [ACCESSIBILITY.md](../components/ui/ACCESSIBILITY.md)
- Pages de démonstration : `/components/*`

