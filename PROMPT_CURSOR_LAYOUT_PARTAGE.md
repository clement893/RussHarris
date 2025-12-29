# Prompt Cursor : Créer un Layout Partagé pour Pages Internes

## Contexte
Mon application Next.js a plusieurs pages internes (dashboard, settings, profile, etc.) qui utilisent toutes le même layout avec une sidebar, mais le code est dupliqué dans chaque `layout.tsx`. Je veux créer un layout partagé pour éviter la duplication et garantir la cohérence.

## Objectifs
1. Créer un composant de layout partagé réutilisable
2. Éliminer la duplication de code entre les layouts
3. Garantir que toutes les pages internes ont le même menu/navigation
4. S'assurer que toutes les fonctionnalités (recherche, collapse, etc.) sont présentes partout

## Structure Actuelle
```
app/[locale]/
  ├── dashboard/
  │   └── layout.tsx  (code dupliqué)
  ├── settings/
  │   └── layout.tsx  (code dupliqué)
  └── profile/
      └── layout.tsx  (code dupliqué)
```

## Tâches à Effectuer

### 1. Créer le Composant Layout Partagé
Créer un fichier `components/layout/DashboardLayout.tsx` qui contient :
- La sidebar avec navigation
- Le système de collapse pour desktop
- Le système de menu mobile/tablet avec overlay
- Le footer du dashboard
- La gestion de l'état (sidebarCollapsed, mobileMenuOpen)
- La logique de navigation (sidebarItems)
- La protection de route (ProtectedRoute)

**Points importants :**
- Utiliser `showSearch={true}` sur le Sidebar pour activer la recherche
- Supprimer tout header en haut de page (pas de menu avec Accueil/Logout/Notifications/Dark Mode)
- Utiliser les mêmes sidebarItems partout pour la cohérence
- Gérer les permissions admin/superadmin de manière centralisée

### 2. Refactoriser les Layouts Existants
Pour chaque page interne (dashboard, settings, profile, etc.) :
- Remplacer tout le code dupliqué par un simple import du layout partagé
- Garder uniquement les exports nécessaires (`dynamic`, `runtime`, etc.)
- Exemple de transformation :

**Avant :**
```tsx
'use client';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
// ... 50+ lignes de code dupliqué ...

function DashboardLayoutContent({ children }) {
  // ... code dupliqué ...
}

export default function DashboardLayout({ children }) {
  return (
    <ProtectedRoute>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </ProtectedRoute>
  );
}
```

**Après :**
```tsx
'use client';
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import DashboardLayout from '@/components/layout/DashboardLayout';

export default DashboardLayout;
```

### 3. Vérifications
- [ ] Toutes les pages internes utilisent le même layout partagé
- [ ] La recherche (showSearch) est activée partout
- [ ] Le menu de navigation est identique sur toutes les pages
- [ ] Pas de duplication de code
- [ ] Les fonctionnalités (collapse, mobile menu) fonctionnent partout
- [ ] Les permissions admin sont gérées correctement

## Bonnes Pratiques à Appliquer

### 1. DRY (Don't Repeat Yourself)
- Un seul endroit pour définir la navigation
- Un seul endroit pour modifier le layout

### 2. Source Unique de Vérité
- Les sidebarItems sont définis une seule fois dans le layout partagé
- Toute modification de navigation se fait en un seul endroit

### 3. Cohérence UI/UX
- Même sidebar sur toutes les pages
- Même comportement (recherche, collapse, etc.)
- Pas de dérive visuelle entre pages

### 4. Maintenabilité
- Facile à modifier (un seul fichier)
- Moins de bugs dus à la duplication
- Tests plus simples

### 5. Next.js App Router Best Practices
- Utiliser les layouts Next.js pour la hiérarchie
- Composants réutilisables pour éviter la duplication
- Client Components uniquement où nécessaire

## Structure Finale Attendue

```
components/layout/
  └── DashboardLayout.tsx  ← Layout partagé (nouveau)

app/[locale]/
  ├── dashboard/
  │   └── layout.tsx  ← Utilise DashboardLayout (simplifié)
  ├── settings/
  │   └── layout.tsx  ← Utilise DashboardLayout (simplifié)
  └── profile/
      └── layout.tsx  ← Utilise DashboardLayout (simplifié)
```

## Exemple de Code pour DashboardLayout.tsx

```tsx
/**
 * Shared Dashboard Layout Component
 * 
 * Best Practice: Use a shared layout component to ensure consistency
 * across all internal pages (dashboard, settings, profile, etc.)
 */

'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/ui/Sidebar';
import DashboardFooter from '@/components/layout/DashboardFooter';
import { 
  LayoutDashboard, 
  FolderKanban, 
  Shield,
  User,
  Settings
} from 'lucide-react';
import { clsx } from 'clsx';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

function DashboardLayoutContent({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { user } = useAuthStore();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdmin = user?.is_admin;

  // Shared sidebar items - consistent across all pages
  const sidebarItems = [
    {
      label: 'Dashboard',
      href: '/dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: 'Profile',
      href: '/profile',
      icon: <User className="w-5 h-5" />,
    },
    {
      label: 'Settings',
      href: '/settings',
      icon: <Settings className="w-5 h-5" />,
    },
    // ... autres items ...
    ...(isAdmin ? [/* admin items */] : []),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-muted dark:to-muted">
      {/* Mobile/Tablet Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="xl:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile/Tablet Sidebar */}
      <aside
        className={clsx(
          'xl:hidden fixed top-0 left-0 h-full z-50 transform transition-transform duration-300 ease-in-out w-64 sm:w-72',
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <Sidebar
          items={sidebarItems}
          currentPath={pathname}
          className="h-full"
          user={user}
          showSearch={true}  // IMPORTANT: Activer la recherche
        />
      </aside>

      {/* Desktop Layout */}
      <div className="flex h-screen pt-0 xl:pt-0">
        {/* Desktop Sidebar */}
        <aside className="hidden xl:block">
          <Sidebar
            items={sidebarItems}
            currentPath={pathname}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="h-screen sticky top-0"
            user={user}
            showSearch={true}  // IMPORTANT: Activer la recherche
          />
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 w-full">
          {/* Page Content */}
          <main className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-6 xl:px-8 2xl:px-10 py-4 sm:py-6 2xl:py-8">
            {children}
          </main>

          {/* Dashboard Footer */}
          <DashboardFooter />
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ProtectedRoute>
      <DashboardLayoutContent>{children}</DashboardLayoutContent>
    </ProtectedRoute>
  );
}
```

## Points d'Attention

1. **showSearch={true}** : Ne pas oublier d'activer la recherche sur le Sidebar, sinon elle n'apparaîtra pas
2. **Pas de header** : Supprimer tout header en haut avec Accueil/Logout/Notifications/Dark Mode
3. **Cohérence** : S'assurer que tous les layouts utilisent exactement le même composant partagé
4. **Permissions** : Gérer les permissions admin de manière centralisée dans le layout partagé
5. **Mobile** : Le menu mobile doit fonctionner partout (overlay + sidebar)

## Résultat Attendu

- ✅ Un seul fichier de layout partagé
- ✅ Tous les layouts de pages internes simplifiés (3-5 lignes)
- ✅ Navigation identique partout
- ✅ Recherche activée partout
- ✅ Pas de duplication de code
- ✅ Facile à maintenir et modifier

---

**Note** : Ce prompt peut être utilisé tel quel dans Cursor pour automatiser la refactorisation des layouts dans n'importe quel projet Next.js.
