# Plan de Reconstruction du Système de Gestion de Thème

## 🎯 Objectifs

Créer un système de gestion de thème complet, simple et fonctionnel pour les superadmins, avec :
- Interface intuitive pour créer/modifier/activer des thèmes
- Éditeur JSON avancé avec validation en temps réel
- Prévisualisation en direct des changements
- Application immédiate des thèmes sur toute la plateforme

---

## 📋 Architecture Générale

### 1. Structure des Fichiers

```
apps/web/src/app/[locale]/admin/themes/
├── page.tsx                          # Page principale de gestion
├── components/
│   ├── ThemeList.tsx                 # Liste des thèmes disponibles
│   ├── ThemeEditor.tsx               # Éditeur de thème (formulaire + JSON)
│   ├── ThemePreview.tsx              # Prévisualisation en temps réel
│   ├── ThemeJSONEditor.tsx           # Éditeur JSON avec validation
│   └── ThemeColorPicker.tsx          # Sélecteur de couleurs avancé
└── hooks/
    ├── useThemeEditor.ts             # Hook pour gérer l'état de l'éditeur
    └── useThemePreview.ts            # Hook pour la prévisualisation
```

---

## 🏗️ Composants Principaux

### 1. **ThemeList** - Liste des Thèmes
**Responsabilités :**
- Afficher tous les thèmes disponibles
- Indiquer le thème actif
- Actions : Créer, Éditer, Activer, Supprimer, Dupliquer
- Recherche et filtres

**Fonctionnalités :**
- Tableau avec colonnes : Nom, Statut (actif/inactif), Date création, Actions
- Badge pour le thème actif
- Boutons d'action par ligne
- Modal de confirmation pour suppression
- Filtre par statut (actif/inactif)

### 2. **ThemeEditor** - Éditeur Principal
**Responsabilités :**
- Formulaire pour créer/modifier un thème
- Intégration de l'éditeur JSON
- Gestion des onglets : Formulaire / JSON / Prévisualisation
- Validation et sauvegarde

**Structure :**
```
┌─────────────────────────────────────┐
│  [Formulaire] [JSON] [Prévisualisation] │
├─────────────────────────────────────┤
│                                     │
│  Contenu de l'onglet actif          │
│                                     │
└─────────────────────────────────────┘
[Annuler]                    [Sauvegarder]
```

**Onglets :**
1. **Formulaire** : Champs structurés (nom, couleurs, polices, etc.)
2. **JSON** : Éditeur JSON avec validation
3. **Prévisualisation** : Aperçu en temps réel

### 3. **ThemeJSONEditor** - Éditeur JSON
**Responsabilités :**
- Éditeur JSON avec coloration syntaxique
- Validation en temps réel
- Auto-complétion
- Formatage automatique
- Messages d'erreur clairs

**Fonctionnalités :**
- Éditeur Monaco (VS Code editor)
- Validation JSON en temps réel
- Validation du schéma ThemeConfig
- Bouton "Formater JSON"
- Bouton "Valider"
- Indicateur de validité (✅/❌)
- Messages d'erreur détaillés

### 4. **ThemePreview** - Prévisualisation
**Responsabilités :**
- Afficher un aperçu du thème en temps réel
- Composants de démonstration
- Mise à jour automatique lors des changements

**Composants à prévisualiser :**
- Boutons (toutes variantes)
- Cartes
- Formulaires
- Alertes
- Badges
- Typographie
- Couleurs (palette complète)

### 5. **ThemeColorPicker** - Sélecteur de Couleurs
**Responsabilités :**
- Sélection de couleurs avec palette
- Support hex, RGB, HSL
- Génération automatique des nuances (50-950)
- Prévisualisation des nuances

---

## 🔄 Flux de Données

### Création d'un Thème
```
1. User clique "Créer un thème"
2. ThemeEditor s'ouvre avec formulaire vide
3. User remplit le formulaire OU édite le JSON
4. Prévisualisation se met à jour en temps réel
5. User clique "Sauvegarder"
6. Validation côté client
7. Appel API POST /v1/themes
8. Thème créé, retour à la liste
```

### Modification d'un Thème
```
1. User clique "Éditer" sur un thème
2. ThemeEditor s'ouvre avec données du thème
3. User modifie via formulaire OU JSON
4. Prévisualisation se met à jour
5. User clique "Sauvegarder"
6. Validation
7. Appel API PUT /v1/themes/{id}
8. Si thème actif : rechargement automatique
9. Thème mis à jour, retour à la liste
```

### Activation d'un Thème
```
1. User clique "Activer" sur un thème
2. Modal de confirmation
3. Appel API POST /v1/themes/{id}/activate
4. Cache vidé
5. GlobalThemeProvider recharge le thème
6. Thème appliqué sur toute la plateforme
7. Badge "Actif" mis à jour dans la liste
```

### Édition JSON
```
1. User ouvre l'onglet JSON
2. JSONEditor affiche le JSON actuel
3. User modifie le JSON
4. Validation en temps réel
5. Si valide : ThemePreview se met à jour
6. Si invalide : message d'erreur affiché
7. User peut "Appliquer" pour tester sans sauvegarder
8. User peut "Sauvegarder" pour persister
```

---

## 🎨 Structure des Données

### ThemeConfig (Type)
```typescript
interface ThemeConfig {
  // Métadonnées
  name: string;
  display_name: string;
  description?: string;
  
  // Couleurs
  colors: {
    primary: string;
    secondary: string;
    danger: string;
    warning: string;
    info: string;
    success: string;
    background: string;
    foreground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    input: string;
    ring: string;
  };
  
  // Typographie
  typography: {
    fontFamily: string;
    fontFamilyHeading?: string;
    fontFamilySubheading?: string;
    fontUrl?: string;
  };
  
  // Effets
  effects?: {
    glassmorphism?: {...};
    shadows?: {...};
    gradients?: {...};
  };
  
  // Border radius
  border_radius?: string;
  
  // Mode
  mode?: 'light' | 'dark' | 'system';
}
```

---

## 🔌 Intégration API

### Endpoints Utilisés
- `GET /v1/themes` - Liste des thèmes
- `GET /v1/themes/{id}` - Détails d'un thème
- `POST /v1/themes` - Créer un thème
- `PUT /v1/themes/{id}` - Modifier un thème
- `POST /v1/themes/{id}/activate` - Activer un thème
- `DELETE /v1/themes/{id}` - Supprimer un thème
- `GET /v1/themes/active` - Thème actif (pour prévisualisation)

### Gestion du Cache
- Vider le cache après chaque modification/activation
- Forcer le rechargement du GlobalThemeProvider
- Utiliser `clearThemeCache()` et `refreshTheme()`

---

## ✅ Validation

### Validation Côté Client
1. **JSON** : Syntaxe JSON valide
2. **Schéma** : Structure ThemeConfig correcte
3. **Couleurs** : Format hex/RGB valide
4. **Champs requis** : name, display_name, colors.primary, etc.
5. **Contraste** : Vérification WCAG (optionnel)

### Validation Côté Backend
- Validation complète du schéma
- Vérification des permissions (superadmin)
- Gestion des erreurs avec messages clairs

---

## 🎯 Fonctionnalités Clés

### 1. Édition JSON
- ✅ Éditeur Monaco avec coloration syntaxique
- ✅ Validation en temps réel
- ✅ Auto-complétion basée sur ThemeConfig
- ✅ Formatage automatique (Ctrl+Shift+F)
- ✅ Messages d'erreur avec numéro de ligne
- ✅ Bouton "Appliquer" pour tester sans sauvegarder
- ✅ Bouton "Valider" pour vérifier la syntaxe

### 2. Prévisualisation
- ✅ Mise à jour en temps réel
- ✅ Composants de démonstration
- ✅ Support light/dark mode
- ✅ Aperçu de la palette de couleurs
- ✅ Aperçu de la typographie

### 3. Gestion des Thèmes
- ✅ Création avec formulaire ou JSON
- ✅ Modification avec synchronisation formulaire/JSON
- ✅ Activation avec confirmation
- ✅ Suppression avec confirmation
- ✅ Duplication de thème
- ✅ Recherche et filtres

### 4. Application Immédiate
- ✅ Application en temps réel lors de l'édition (mode preview)
- ✅ Application sur toute la plateforme après sauvegarde
- ✅ Rechargement automatique si thème actif modifié
- ✅ Gestion du cache pour performance

---

## 🚀 Étapes d'Implémentation

### Phase 1 : Structure de Base
1. ✅ Créer la structure de dossiers
2. ✅ Créer la page principale `/admin/themes`
3. ✅ Créer le composant ThemeList
4. ✅ Intégrer les appels API de base

### Phase 2 : Éditeur de Thème
1. ✅ Créer ThemeEditor avec onglets
2. ✅ Créer le formulaire de base
3. ✅ Intégrer ThemeJSONEditor (Monaco)
4. ✅ Créer ThemePreview

### Phase 3 : Fonctionnalités Avancées
1. ✅ Validation en temps réel
2. ✅ Synchronisation formulaire/JSON
3. ✅ Prévisualisation en temps réel
4. ✅ Gestion des erreurs

### Phase 4 : Polish & UX
1. ✅ Messages de confirmation
2. ✅ Loading states
3. ✅ Messages de succès/erreur
4. ✅ Optimisations de performance

---

## 📝 Notes Techniques

### Éditeur Monaco
- Utiliser `@monaco-editor/react` ou `react-monaco-editor`
- Configuration du langage JSON
- Thème dark/light selon préférence utilisateur
- Options : formatOnPaste, minimap, lineNumbers

### Validation JSON
- Utiliser `ajv` ou `zod` pour validation de schéma
- Validation en temps réel avec debounce
- Messages d'erreur clairs et localisés

### Gestion d'État
- Utiliser `useState` pour l'état local de l'éditeur
- Utiliser `useGlobalTheme` pour le thème actif
- Utiliser `react-query` pour le cache des thèmes (optionnel)

### Performance
- Debounce pour la validation JSON
- Debounce pour la prévisualisation
- Lazy loading des composants de prévisualisation
- Mémoization des composants coûteux

---

## 🎨 Design & UX

### Principes
- Interface claire et intuitive
- Feedback visuel immédiat
- Messages d'erreur explicites
- Actions rapides (raccourcis clavier)
- Responsive design

### Composants UI
- Utiliser les composants existants (Card, Button, Input, etc.)
- Créer des composants spécifiques si nécessaire
- Respecter le système de design existant

---

## 🔒 Sécurité

- Vérification des permissions superadmin
- Validation stricte côté client et backend
- Sanitization des données JSON
- Protection contre XSS dans l'éditeur JSON

---

## 📚 Documentation

- Commentaires dans le code
- README pour les développeurs
- Guide utilisateur pour les superadmins
- Exemples de configurations JSON

---

## ✅ Checklist de Développement

- [ ] Structure de fichiers créée
- [ ] Page principale créée
- [ ] ThemeList fonctionnel
- [ ] ThemeEditor avec onglets
- [ ] Formulaire de base
- [ ] Éditeur JSON intégré
- [ ] Prévisualisation fonctionnelle
- [ ] Validation JSON
- [ ] Synchronisation formulaire/JSON
- [ ] CRUD complet (Create, Read, Update, Delete)
- [ ] Activation de thème
- [ ] Gestion du cache
- [ ] Messages d'erreur
- [ ] Loading states
- [ ] Responsive design
- [ ] Tests (optionnel)

---

## 🎯 Résultat Attendu

Un système complet permettant aux superadmins de :
1. Voir tous les thèmes disponibles
2. Créer un nouveau thème (formulaire ou JSON)
3. Modifier un thème existant
4. Prévisualiser les changements en temps réel
5. Activer un thème pour toute la plateforme
6. Supprimer un thème (sauf actif)
7. Dupliquer un thème

Le tout avec une interface intuitive, une validation robuste et une application immédiate des changements.

