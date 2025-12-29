# Prompt Court pour Cursor

```
Refactoriser les layouts de pages internes (dashboard, settings, profile) pour utiliser un layout partagé.

TÂCHES:
1. Créer `components/layout/DashboardLayout.tsx` avec:
   - Sidebar avec navigation (sidebarItems)
   - Système collapse desktop (sidebarCollapsed)
   - Menu mobile/tablet avec overlay (mobileMenuOpen)
   - Footer du dashboard
   - Protection de route (ProtectedRoute)
   - IMPORTANT: `showSearch={true}` sur tous les Sidebar
   - PAS de header en haut (supprimer Accueil/Logout/Notifications/Dark Mode)

2. Refactoriser chaque `app/[locale]/*/layout.tsx` pour:
   - Garder uniquement les exports (`dynamic`, `runtime`)
   - Importer et exporter DashboardLayout
   - Exemple: `import DashboardLayout from '@/components/layout/DashboardLayout'; export default DashboardLayout;`

3. Vérifier:
   - Navigation identique partout
   - Recherche activée partout (showSearch={true})
   - Pas de duplication de code
   - Même sidebarItems partout

BONNES PRATIQUES:
- DRY: Un seul endroit pour la navigation
- Source unique de vérité: sidebarItems défini une fois
- Cohérence: Même UI/UX partout
- Next.js App Router: Utiliser layouts pour hiérarchie

RÉSULTAT ATTENDU:
- Un layout partagé réutilisable
- Layouts de pages simplifiés (3-5 lignes)
- Navigation cohérente
- Recherche partout
- Facile à maintenir
```
