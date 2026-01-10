# 📋 Plan de Refonte de la Navigation - Russ Harris Masterclass

## 🎯 Objectif
Créer un système de navigation centralisé, cohérent et appliqué partout dans l'application, avec un design Swiss Style pour le site de la Masterclass ACT avec Russ Harris.

---

## 📐 Architecture de Navigation

### **Structure Hiérarchique:**

```
Navigation Principale (Header)
├── Logo/Brand (ContextPsy ou Masterclass)
├── Menu Principal (Desktop)
│   ├── Accueil
│   ├── Programme
│   ├── À propos de Russ
│   ├── Villes & Dates
│   ├── Tarifs
│   ├── Témoignages
│   └── FAQ
├── Menu Secondaire (Desktop)
│   ├── Contact
│   └── Langue (FR/EN)
├── CTA Principal
│   └── "Réserver ma place" (sticky, visible)
└── Menu Mobile (Hamburger)
    └── Tous les items ci-dessus
```

---

## 🔧 Composants à Créer/Modifier

### **1. Composant Principal: `MasterclassNavigation.tsx`** ⭐
**Objectif:** Navigation principale centralisée et réutilisable

#### Fonctionnalités:
- ✅ Design Swiss Style (noir/blanc, typographie Inter Bold)
- ✅ Responsive (mobile/tablet/desktop)
- ✅ Menu mobile avec hamburger animé
- ✅ Menu desktop horizontal avec hover states
- ✅ CTA "Réserver ma place" sticky et visible
- ✅ Indicateur de page active
- ✅ Smooth scroll (si sections sur même page)
- ✅ Support i18n (FR/EN)
- ✅ Accessibilité (ARIA, navigation clavier)
- ✅ Sticky header (fixe en scroll)

#### Props:
```typescript
interface MasterclassNavigationProps {
  variant?: 'default' | 'transparent' | 'solid';
  showCTA?: boolean;
  currentPath?: string;
  locale?: 'fr' | 'en';
}
```

#### Structure:
```tsx
<header className="sticky top-0 z-50 bg-white border-b border-black">
  <Container>
    {/* Logo + Menu Desktop */}
    <nav>
      <Link href="/">Logo</Link>
      <DesktopMenu />
      <CTAPrimary />
      <LanguageSwitcher />
      <MobileMenuButton />
    </nav>
    {/* Menu Mobile (Overlay/Slide) */}
    <MobileMenu />
  </Container>
</header>
```

---

### **2. Composant: `DesktopNavigation.tsx`**
**Objectif:** Menu desktop horizontal

#### Items de Menu:
1. **Accueil** (`/`)
   - Icon: Home
   - Active state si pathname === '/'

2. **Programme** (`/masterclass`)
   - Icon: BookOpen
   - Sous-menu (optionnel):
     - Jour 1
     - Jour 2
     - Objectifs pédagogiques
     - Ressources

3. **À propos de Russ** (`/about-russ`)
   - Icon: User
   - Sous-menu (optionnel):
     - Biographie
     - Expertise
     - Publications

4. **Villes & Dates** (`/cities`)
   - Icon: MapPin
   - Badge: Nombre de villes disponibles

5. **Tarifs** (`/pricing`)
   - Icon: CreditCard
   - Badge: "Early Bird" si applicable

6. **Témoignages** (`/testimonials`)
   - Icon: Star

7. **FAQ** (`/faq`)
   - Icon: HelpCircle

#### Style Swiss:
- Typographie: Inter Bold pour items actifs
- Hover: Underline animé (swiss style)
- Espacement: Large (32px entre items)
- Border bottom sur item actif
- Transition smooth

---

### **3. Composant: `MobileNavigation.tsx`**
**Objectif:** Menu mobile avec overlay/slide

#### Fonctionnalités:
- ✅ Slide-in depuis droite (ou overlay fullscreen)
- ✅ Animation smooth (transform translateX)
- ✅ Backdrop blur
- ✅ Close button (X icon)
- ✅ Tous les items du menu desktop
- ✅ CTA "Réserver ma place" en bas
- ✅ Language switcher
- ✅ Escape key pour fermer
- ✅ Focus trap (navigation clavier)

#### Items dans même ordre que desktop:
- Accueil
- Programme
- À propos de Russ
- Villes & Dates
- Tarifs
- Témoignages
- FAQ
- Contact (en bas)
- Language Switcher (en bas)
- CTA Principal (en bas, sticky)

---

### **4. Composant: `CTAPrimary.tsx`**
**Objectif:** Bouton CTA "Réserver ma place" visible partout

#### Variants:
- **Desktop:** Bouton noir avec texte blanc, taille large
- **Mobile:** Bouton plein largeur dans menu mobile
- **Sticky:** Option pour rendre sticky en scroll (toujours visible)

#### Style Swiss:
- Fond noir (`bg-black`)
- Texte blanc (`text-white`)
- Police Inter Bold
- Border: 2px solid black
- Hover: Invert (blanc/noir)
- Animation: Scale légère au hover
- Shadow: None (flat design)

#### Comportement:
- Click → Redirige vers `/cities` ou `/book`
- Badge urgence si places limitées (< 10%)
- Pulse animation si urgence

---

### **5. Composant: `LanguageSwitcher.tsx`** (Existant, à adapter)
**Objectif:** Switch FR/EN

#### Style Swiss:
- Simple dropdown ou toggle
- FR / EN visible
- Flag icons optionnels
- Style minimaliste

---

### **6. Composant: `Breadcrumbs.tsx`** (Optionnel)
**Objectif:** Fil d'Ariane pour navigation profonde

#### Style Swiss:
- Minimaliste
- Séparateur: `/` ou `>`
- Typographie fine
- Couleur: gris

---

## 📄 Fichiers à Modifier

### **Backend/Configuration:**
1. **`apps/web/src/lib/navigation/config.ts`** (Nouveau)
   - Configuration centralisée des items de menu
   - Support i18n (traductions)
   - Items conditionnels (admin, auth)

### **Frontend/Composants:**
2. **`apps/web/src/components/layout/Header.tsx`** (Remplacer)
   - Utiliser `MasterclassNavigation` au lieu de l'ancien header
   - Supprimer ancien code

3. **`apps/web/src/components/navigation/MasterclassNavigation.tsx`** (Nouveau)
   - Composant principal navigation

4. **`apps/web/src/components/navigation/DesktopNavigation.tsx`** (Nouveau)
   - Menu desktop

5. **`apps/web/src/components/navigation/MobileNavigation.tsx`** (Nouveau)
   - Menu mobile

6. **`apps/web/src/components/navigation/CTAPrimary.tsx`** (Nouveau)
   - Bouton CTA

7. **`apps/web/src/components/navigation/NavigationItem.tsx`** (Nouveau)
   - Item de menu réutilisable
   - Support sous-menu
   - Support badge
   - Support icon

8. **`apps/web/src/components/navigation/index.ts`** (Nouveau)
   - Exports centralisés

### **Layouts:**
9. **`apps/web/src/app/[locale]/layout.tsx`** (Modifier)
   - Intégrer `MasterclassNavigation` au lieu de Header générique
   - S'assurer que navigation est présente sur toutes les pages

10. **`apps/web/src/app/app.tsx`** (Vérifier)
    - Vérifier que Header est bien inclus

### **Pages Spéciales:**
11. **Pages avec navigation différente:**
    - `/book/*` (Booking flow) - Garder navigation simple ou mini-header
    - `/dashboard/*` - Garder sidebar existante
    - `/admin/*` - Garder navigation admin existante
    - `/auth/*` - Pas de navigation complète (logo seulement)

---

## 🎨 Design Swiss Style

### **Palette Couleurs:**
- **Background:** `#FFFFFF` (blanc pur)
- **Foreground:** `#000000` (noir pur)
- **Border:** `#000000` (2px solid)
- **Hover:** `#000000` background, `#FFFFFF` text
- **Active:** Border bottom 2px noir
- **Accent:** Aucun (pas de couleur)

### **Typographie:**
- **Logo:** Inter Bold, 24px
- **Menu Items:** Inter Regular, 16px (desktop), 18px (mobile)
- **Menu Items Active:** Inter Bold, 16px
- **CTA Button:** Inter Bold, 16px
- **Letter Spacing:** Normal (0px)

### **Espacements:**
- **Gap entre items:** 32px (desktop), 0px (mobile, stack vertical)
- **Padding header:** 24px vertical, 120px horizontal (desktop), 16px (mobile)
- **Padding menu items:** 12px vertical, 0px horizontal

### **Transitions:**
- **Hover:** 0.2s ease
- **Menu mobile slide:** 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- **Underline:** 0.2s ease

---

## 📱 Responsive Breakpoints

### **Mobile (< 768px):**
- Menu hamburger
- Logo centré ou à gauche
- CTA dans menu mobile (pas dans header)
- Menu slide-in fullscreen ou depuis droite

### **Tablet (768px - 1024px):**
- Menu hamburger (ou menu compact horizontal)
- Logo + CTA visible
- Menu items réduits si nécessaire

### **Desktop (> 1024px):**
- Menu horizontal complet
- Tous les items visibles
- CTA sticky à droite
- Logo à gauche

---

## ♿ Accessibilité

### **ARIA Labels:**
- `aria-label="Navigation principale"` sur `<nav>`
- `aria-label="Menu mobile"` sur bouton hamburger
- `aria-label="Fermer le menu"` sur bouton fermer
- `aria-current="page"` sur item actif
- `aria-expanded` sur menu mobile

### **Navigation Clavier:**
- Tab: Naviguer entre items
- Enter/Space: Activer item
- Escape: Fermer menu mobile
- Arrow keys: Navigation dans menu (si applicable)

### **Focus Visible:**
- Outline: 2px solid noir (contraste WCAG AA)
- Focus trap dans menu mobile
- Skip link vers contenu principal

---

## 🌐 Internationalisation (i18n)

### **Traductions Requises:**

#### **FR (`messages/fr.json`):**
```json
{
  "navigation": {
    "home": "Accueil",
    "program": "Programme",
    "about": "À propos de Russ",
    "cities": "Villes & Dates",
    "pricing": "Tarifs",
    "testimonials": "Témoignages",
    "faq": "FAQ",
    "contact": "Contact",
    "bookNow": "Réserver ma place",
    "menu": "Menu",
    "close": "Fermer"
  }
}
```

#### **EN (`messages/en.json`):**
```json
{
  "navigation": {
    "home": "Home",
    "program": "Program",
    "about": "About Russ",
    "cities": "Cities & Dates",
    "pricing": "Pricing",
    "testimonials": "Testimonials",
    "faq": "FAQ",
    "contact": "Contact",
    "bookNow": "Book Now",
    "menu": "Menu",
    "close": "Close"
  }
}
```

---

## 🔗 Configuration Centralisée

### **`apps/web/src/lib/navigation/config.ts`:**

```typescript
export interface NavigationItem {
  id: string;
  label: string; // Key pour i18n
  href: string;
  icon?: React.ComponentType;
  badge?: string | number;
  children?: NavigationItem[]; // Sous-menu
  external?: boolean;
  authRequired?: boolean;
  adminOnly?: boolean;
}

export const navigationConfig: NavigationItem[] = [
  {
    id: 'home',
    label: 'navigation.home',
    href: '/',
    icon: Home,
  },
  {
    id: 'program',
    label: 'navigation.program',
    href: '/masterclass',
    icon: BookOpen,
    children: [
      { id: 'day1', label: 'navigation.program.day1', href: '/masterclass#day1' },
      { id: 'day2', label: 'navigation.program.day2', href: '/masterclass#day2' },
    ],
  },
  {
    id: 'about',
    label: 'navigation.about',
    href: '/about-russ',
    icon: User,
  },
  {
    id: 'cities',
    label: 'navigation.cities',
    href: '/cities',
    icon: MapPin,
    badge: 'dynamic', // Calculé dynamiquement
  },
  {
    id: 'pricing',
    label: 'navigation.pricing',
    href: '/pricing',
    icon: CreditCard,
  },
  {
    id: 'testimonials',
    label: 'navigation.testimonials',
    href: '/testimonials',
    icon: Star,
  },
  {
    id: 'faq',
    label: 'navigation.faq',
    href: '/faq',
    icon: HelpCircle,
  },
];
```

---

## ✅ Checklist d'Implémentation

### **Phase 1: Structure de Base** 🔴 Priorité Max
- [ ] Créer `lib/navigation/config.ts` avec configuration centralisée
- [ ] Créer composant `MasterclassNavigation.tsx`
- [ ] Créer composant `DesktopNavigation.tsx`
- [ ] Créer composant `MobileNavigation.tsx`
- [ ] Créer composant `NavigationItem.tsx`
- [ ] Créer composant `CTAPrimary.tsx`
- [ ] Créer fichier `components/navigation/index.ts` pour exports

### **Phase 2: Intégration** 🟡 Priorité Haute
- [ ] Remplacer `Header.tsx` par `MasterclassNavigation`
- [ ] Intégrer dans `layout.tsx` principal
- [ ] Vérifier toutes les pages utilisent nouvelle navigation
- [ ] Adapter navigation pour pages spéciales (booking, dashboard, admin, auth)

### **Phase 3: Styling Swiss** 🟡 Priorité Haute
- [ ] Appliquer design Swiss Style (noir/blanc)
- [ ] Implémenter hover states et transitions
- [ ] Implémenter active states avec border bottom
- [ ] Sticky header avec backdrop blur
- [ ] Animation menu mobile slide-in

### **Phase 4: Fonctionnalités Avancées** 🟢 Priorité Moyenne
- [ ] Badges dynamiques (nombre villes, early bird)
- [ ] Sous-menus dropdown (Programme, À propos)
- [ ] Smooth scroll pour ancres (#day1, #day2)
- [ ] Urgence badge sur CTA si places limitées
- [ ] Pulse animation CTA si urgence

### **Phase 5: i18n & Accessibilité** 🟢 Priorité Moyenne
- [ ] Ajouter traductions FR/EN dans `messages/*.json`
- [ ] Implémenter ARIA labels
- [ ] Navigation clavier complète
- [ ] Focus trap dans menu mobile
- [ ] Skip link vers contenu

### **Phase 6: Responsive** 🟢 Priorité Moyenne
- [ ] Breakpoint mobile (< 768px)
- [ ] Breakpoint tablet (768px - 1024px)
- [ ] Breakpoint desktop (> 1024px)
- [ ] Tester sur devices réels
- [ ] Optimiser performance (lazy load menu mobile)

### **Phase 7: Tests & Finalisation** ✅
- [ ] Tests unitaires composants navigation
- [ ] Tests E2E navigation (Playwright)
- [ ] Tests accessibilité (axe-core, Lighthouse)
- [ ] Tests responsive (Chrome DevTools, devices)
- [ ] Tests i18n (switching FR/EN)
- [ ] Performance audit (Lighthouse)

---

## 🚫 Pages Exclues (Garder Navigation Simple)

### **Pages avec Navigation Minimaliste:**
1. **`/book/*`** (Booking Flow)
   - Mini-header avec logo + "Annuler"
   - Pas de menu complet (déconcentre)
   - Progress indicator (étape 1/4, 2/4, etc.)

2. **`/dashboard/*`** (Dashboard Utilisateur)
   - Garder sidebar existante
   - Mini-header avec logo + user menu

3. **`/admin/*`** (Admin Panel)
   - Garder navigation admin existante
   - Header admin spécifique

4. **`/auth/*`** (Login/Register)
   - Logo seulement (centré)
   - Pas de menu (déconcentre)
   - Lien "Retour à l'accueil"

---

## 📊 Métriques de Succès

- ✅ **Cohérence:** Navigation identique sur toutes les pages publiques
- ✅ **Performance:** Header < 50KB, menu mobile lazy loaded
- ✅ **Accessibilité:** WCAG AA compliant, navigation clavier complète
- ✅ **Responsive:** Parfait sur mobile/tablet/desktop
- ✅ **UX:** Menu mobile slide smooth, hover states visibles
- ✅ **i18n:** Traductions FR/EN fonctionnelles
- ✅ **Design:** Swiss Style cohérent (noir/blanc, Inter Bold)

---

## 🔄 Ordre d'Exécution Recommandé

```
1. Créer configuration centralisée (config.ts)
   ↓
2. Créer composants navigation (MasterclassNavigation, Desktop, Mobile)
   ↓
3. Créer composants UI (NavigationItem, CTAPrimary)
   ↓
4. Intégrer dans layout principal
   ↓
5. Appliquer styling Swiss
   ↓
6. Implémenter fonctionnalités (badges, sous-menus, smooth scroll)
   ↓
7. Ajouter i18n et accessibilité
   ↓
8. Tests et optimisations
```

---

## 📝 Notes Techniques

### **Performance:**
- Menu mobile lazy loaded (chargé seulement si ouvert)
- Images logos optimisées (WebP, sizes responsives)
- CSS critical inline pour header (above-the-fold)

### **SEO:**
- Liens navigation utilisent `<Link>` Next.js (prefetch)
- Structure sémantique HTML5 (`<nav>`, `<header>`)
- Schema.org BreadcrumbList (si breadcrumbs)

### **Analytics:**
- Track clicks sur items menu (Google Analytics)
- Track CTA clicks ("Réserver ma place")
- Track menu mobile opens/closes

---

**Version:** 1.0  
**Date:** 2025-01-27  
**Statut:** Prêt pour implémentation
