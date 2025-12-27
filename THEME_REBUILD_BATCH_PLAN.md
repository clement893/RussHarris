# Plan de Reconstruction du Système de Gestion de Thème - Par Batch

## 🎯 Objectif
Reconstruire le système de gestion de thème par batch, en évitant les erreurs de build et TypeScript, avec push et rapport de progression à chaque étape.

---

## 📦 Batch 1 : Structure de Base et Types
**Objectif** : Créer la structure de base sans erreurs TypeScript

### Fichiers à créer :
1. `apps/web/src/app/[locale]/admin/themes/page.tsx` - Page principale (squelette)
2. `apps/web/src/app/[locale]/admin/themes/types.ts` - Types TypeScript pour les thèmes
3. `apps/web/src/app/[locale]/admin/themes/hooks/useThemeEditor.ts` - Hook de base

### Actions :
- ✅ Créer les dossiers nécessaires
- ✅ Créer les types TypeScript complets
- ✅ Créer la page principale avec export par défaut
- ✅ Créer le hook useThemeEditor (vide pour l'instant)
- ✅ Vérifier qu'il n'y a pas d'erreurs TypeScript
- ✅ Vérifier que le build passe
- ✅ Commit + Push avec message "Batch 1: Structure de base et types"

### Validation :
- [ ] `pnpm type-check` passe sans erreur
- [ ] `pnpm build` passe sans erreur
- [ ] La page `/admin/themes` est accessible (même si vide)

---

## 📦 Batch 2 : Liste des Thèmes (ThemeList)
**Objectif** : Afficher la liste des thèmes avec les appels API

### Fichiers à créer :
1. `apps/web/src/app/[locale]/admin/themes/components/ThemeList.tsx`
2. `apps/web/src/app/[locale]/admin/themes/components/ThemeListItem.tsx`

### Actions :
- ✅ Créer ThemeList avec appel API `listThemes()`
- ✅ Créer ThemeListItem pour chaque thème
- ✅ Afficher : nom, statut (actif/inactif), date création
- ✅ Badge pour le thème actif
- ✅ Intégrer dans la page principale
- ✅ Gestion des états : loading, error, empty
- ✅ Vérifier TypeScript et build
- ✅ Commit + Push avec message "Batch 2: Liste des thèmes"

### Validation :
- [ ] TypeScript : aucune erreur
- [ ] Build : passe sans erreur
- [ ] La liste s'affiche correctement
- [ ] Les thèmes sont récupérés depuis l'API
- [ ] Le thème actif est identifié

---

## 📦 Batch 3 : Actions de Base (CRUD)
**Objectif** : Ajouter les actions CRUD de base

### Fichiers à modifier :
1. `apps/web/src/app/[locale]/admin/themes/components/ThemeList.tsx` - Ajouter boutons d'action
2. `apps/web/src/app/[locale]/admin/themes/components/ThemeActions.tsx` - Nouveau composant

### Actions :
- ✅ Ajouter boutons : Créer, Éditer, Activer, Supprimer
- ✅ Créer ThemeActions avec modals de confirmation
- ✅ Implémenter activateTheme()
- ✅ Implémenter deleteTheme() avec confirmation
- ✅ Gestion des erreurs avec messages clairs
- ✅ Messages de succès après actions
- ✅ Vérifier TypeScript et build
- ✅ Commit + Push avec message "Batch 3: Actions CRUD de base"

### Validation :
- [ ] TypeScript : aucune erreur
- [ ] Build : passe sans erreur
- [ ] Créer un thème fonctionne
- [ ] Activer un thème fonctionne
- [ ] Supprimer un thème fonctionne (avec confirmation)
- [ ] Messages d'erreur/succès s'affichent

---

## 📦 Batch 4 : Éditeur de Thème - Structure et Formulaire
**Objectif** : Créer l'éditeur avec formulaire de base

### Fichiers à créer :
1. `apps/web/src/app/[locale]/admin/themes/components/ThemeEditor.tsx`
2. `apps/web/src/app/[locale]/admin/themes/components/ThemeForm.tsx`
3. `apps/web/src/app/[locale]/admin/themes/components/ThemeTabs.tsx`

### Actions :
- ✅ Créer ThemeEditor avec système d'onglets
- ✅ Créer ThemeForm avec champs de base (nom, description)
- ✅ Créer ThemeTabs pour gérer les onglets
- ✅ Intégrer dans la page avec routing
- ✅ Gestion de l'état (création vs édition)
- ✅ Vérifier TypeScript et build
- ✅ Commit + Push avec message "Batch 4: Éditeur - Structure et formulaire"

### Validation :
- [ ] TypeScript : aucune erreur
- [ ] Build : passe sans erreur
- [ ] L'éditeur s'ouvre en mode création
- [ ] L'éditeur s'ouvre en mode édition
- [ ] Les onglets fonctionnent
- [ ] Le formulaire de base fonctionne

---

## 📦 Batch 5 : Sélecteur de Couleurs
**Objectif** : Ajouter le sélecteur de couleurs dans le formulaire

### Fichiers à créer :
1. `apps/web/src/app/[locale]/admin/themes/components/ThemeColorPicker.tsx`
2. `apps/web/src/app/[locale]/admin/themes/components/ColorPalette.tsx`

### Actions :
- ✅ Créer ThemeColorPicker avec support hex/RGB
- ✅ Créer ColorPalette pour afficher les nuances
- ✅ Intégrer dans ThemeForm pour toutes les couleurs
- ✅ Génération automatique des nuances (50-950)
- ✅ Prévisualisation des couleurs
- ✅ Vérifier TypeScript et build
- ✅ Commit + Push avec message "Batch 5: Sélecteur de couleurs"

### Validation :
- [ ] TypeScript : aucune erreur
- [ ] Build : passe sans erreur
- [ ] Le sélecteur de couleurs fonctionne
- [ ] Les nuances sont générées automatiquement
- [ ] Les couleurs sont sauvegardées correctement

---

## 📦 Batch 6 : Éditeur JSON - Installation et Configuration
**Objectif** : Installer et configurer l'éditeur Monaco

### Actions :
- ✅ Installer `@monaco-editor/react` ou équivalent
- ✅ Créer `apps/web/src/app/[locale]/admin/themes/components/ThemeJSONEditor.tsx`
- ✅ Configurer Monaco avec thème JSON
- ✅ Intégrer dans l'onglet JSON de ThemeEditor
- ✅ Charger le JSON du thème actuel
- ✅ Vérifier TypeScript et build
- ✅ Commit + Push avec message "Batch 6: Éditeur JSON - Installation"

### Validation :
- [ ] TypeScript : aucune erreur
- [ ] Build : passe sans erreur
- [ ] Monaco Editor s'affiche
- [ ] Le JSON du thème est chargé
- [ ] L'éditeur est fonctionnel

---

## 📦 Batch 7 : Validation JSON
**Objectif** : Ajouter la validation JSON en temps réel

### Fichiers à modifier :
1. `apps/web/src/app/[locale]/admin/themes/components/ThemeJSONEditor.tsx`
2. `apps/web/src/app/[locale]/admin/themes/utils/validateThemeJSON.ts` - Nouveau

### Actions :
- ✅ Créer validateThemeJSON avec validation de schéma
- ✅ Validation syntaxe JSON en temps réel
- ✅ Validation structure ThemeConfig
- ✅ Affichage des erreurs dans l'éditeur
- ✅ Indicateur de validité (✅/❌)
- ✅ Messages d'erreur clairs
- ✅ Vérifier TypeScript et build
- ✅ Commit + Push avec message "Batch 7: Validation JSON"

### Validation :
- [ ] TypeScript : aucune erreur
- [ ] Build : passe sans erreur
- [ ] La validation JSON fonctionne
- [ ] Les erreurs sont affichées clairement
- [ ] La validation détecte les erreurs de schéma

---

## 📦 Batch 8 : Synchronisation Formulaire/JSON
**Objectif** : Synchroniser les données entre formulaire et JSON

### Fichiers à modifier :
1. `apps/web/src/app/[locale]/admin/themes/components/ThemeEditor.tsx`
2. `apps/web/src/app/[locale]/admin/themes/hooks/useThemeEditor.ts`

### Actions :
- ✅ Implémenter la synchronisation formulaire → JSON
- ✅ Implémenter la synchronisation JSON → formulaire
- ✅ Gérer les conflits (quelle source de vérité)
- ✅ Débounce pour éviter les re-renders excessifs
- ✅ Vérifier TypeScript et build
- ✅ Commit + Push avec message "Batch 8: Synchronisation formulaire/JSON"

### Validation :
- [ ] TypeScript : aucune erreur
- [ ] Build : passe sans erreur
- [ ] Modifier le formulaire met à jour le JSON
- [ ] Modifier le JSON met à jour le formulaire
- [ ] Pas de boucles infinies de synchronisation

---

## 📦 Batch 9 : Prévisualisation - Structure
**Objectif** : Créer la structure de prévisualisation

### Fichiers à créer :
1. `apps/web/src/app/[locale]/admin/themes/components/ThemePreview.tsx`
2. `apps/web/src/app/[locale]/admin/themes/components/PreviewComponents.tsx`

### Actions :
- ✅ Créer ThemePreview avec composants de démonstration
- ✅ Créer PreviewComponents avec boutons, cartes, etc.
- ✅ Intégrer dans l'onglet Prévisualisation
- ✅ Appliquer le thème en cours d'édition (mode preview)
- ✅ Vérifier TypeScript et build
- ✅ Commit + Push avec message "Batch 9: Prévisualisation - Structure"

### Validation :
- [ ] TypeScript : aucune erreur
- [ ] Build : passe sans erreur
- [ ] La prévisualisation s'affiche
- [ ] Les composants de démonstration sont visibles
- [ ] Le thème est appliqué en mode preview

---

## 📦 Batch 10 : Prévisualisation - Mise à Jour Temps Réel
**Objectif** : Mettre à jour la prévisualisation en temps réel

### Fichiers à modifier :
1. `apps/web/src/app/[locale]/admin/themes/components/ThemePreview.tsx`
2. `apps/web/src/app/[locale]/admin/themes/hooks/useThemePreview.ts` - Nouveau

### Actions :
- ✅ Créer useThemePreview pour gérer l'état
- ✅ Appliquer les changements en temps réel (debounce)
- ✅ Utiliser applyThemeConfigDirectly en mode preview
- ✅ Gérer le flag data-manual-theme
- ✅ Vérifier TypeScript et build
- ✅ Commit + Push avec message "Batch 10: Prévisualisation temps réel"

### Validation :
- [ ] TypeScript : aucune erreur
- [ ] Build : passe sans erreur
- [ ] Les changements dans le formulaire mettent à jour la prévisualisation
- [ ] Les changements dans le JSON mettent à jour la prévisualisation
- [ ] Pas de lag excessif

---

## 📦 Batch 11 : Sauvegarde et Application
**Objectif** : Implémenter la sauvegarde et l'application du thème

### Fichiers à modifier :
1. `apps/web/src/app/[locale]/admin/themes/components/ThemeEditor.tsx`
2. `apps/web/src/app/[locale]/admin/themes/hooks/useThemeEditor.ts`

### Actions :
- ✅ Implémenter saveTheme() avec validation
- ✅ Gérer création vs modification
- ✅ Vider le cache après sauvegarde
- ✅ Recharger le thème si actif
- ✅ Appliquer le thème sur toute la plateforme
- ✅ Messages de succès/erreur
- ✅ Vérifier TypeScript et build
- ✅ Commit + Push avec message "Batch 11: Sauvegarde et application"

### Validation :
- [ ] TypeScript : aucune erreur
- [ ] Build : passe sans erreur
- [ ] Sauvegarder un nouveau thème fonctionne
- [ ] Modifier un thème existant fonctionne
- [ ] Le thème est appliqué si actif
- [ ] Le cache est vidé après sauvegarde

---

## 📦 Batch 12 : Bouton "Appliquer" JSON
**Objectif** : Ajouter le bouton "Appliquer" pour tester sans sauvegarder

### Fichiers à modifier :
1. `apps/web/src/app/[locale]/admin/themes/components/ThemeJSONEditor.tsx`
2. `apps/web/src/app/[locale]/admin/themes/components/ThemeEditor.tsx`

### Actions :
- ✅ Ajouter bouton "Appliquer JSON" dans l'éditeur JSON
- ✅ Appliquer le JSON en mode preview (sans sauvegarder)
- ✅ Afficher message de confirmation
- ✅ Gérer le flag data-manual-theme
- ✅ Vérifier TypeScript et build
- ✅ Commit + Push avec message "Batch 12: Bouton Appliquer JSON"

### Validation :
- [ ] TypeScript : aucune erreur
- [ ] Build : passe sans erreur
- [ ] Le bouton "Appliquer" fonctionne
- [ ] Le JSON est appliqué en mode preview
- [ ] La prévisualisation se met à jour
- [ ] Message de confirmation affiché

---

## 📦 Batch 13 : Recherche et Filtres
**Objectif** : Ajouter recherche et filtres dans la liste

### Fichiers à modifier :
1. `apps/web/src/app/[locale]/admin/themes/components/ThemeList.tsx`
2. `apps/web/src/app/[locale]/admin/themes/components/ThemeFilters.tsx` - Nouveau

### Actions :
- ✅ Créer ThemeFilters avec recherche et filtres
- ✅ Filtrer par statut (actif/inactif)
- ✅ Recherche par nom
- ✅ Intégrer dans ThemeList
- ✅ Vérifier TypeScript et build
- ✅ Commit + Push avec message "Batch 13: Recherche et filtres"

### Validation :
- [ ] TypeScript : aucune erreur
- [ ] Build : passe sans erreur
- [ ] La recherche fonctionne
- [ ] Les filtres fonctionnent
- [ ] Les résultats sont filtrés correctement

---

## 📦 Batch 14 : Duplication de Thème
**Objectif** : Ajouter la fonctionnalité de duplication

### Fichiers à modifier :
1. `apps/web/src/app/[locale]/admin/themes/components/ThemeList.tsx`
2. `apps/web/src/app/[locale]/admin/themes/components/ThemeActions.tsx`

### Actions :
- ✅ Ajouter bouton "Dupliquer" dans les actions
- ✅ Implémenter duplicateTheme()
- ✅ Créer un nouveau thème avec préfixe "Copy of"
- ✅ Ouvrir l'éditeur avec le thème dupliqué
- ✅ Vérifier TypeScript et build
- ✅ Commit + Push avec message "Batch 14: Duplication de thème"

### Validation :
- [ ] TypeScript : aucune erreur
- [ ] Build : passe sans erreur
- [ ] Dupliquer un thème fonctionne
- [ ] Le nouveau thème est créé avec le bon nom
- [ ] L'éditeur s'ouvre avec le thème dupliqué

---

## 📦 Batch 15 : Polish & UX Final
**Objectif** : Améliorer l'UX et corriger les derniers détails

### Actions :
- ✅ Améliorer les messages d'erreur
- ✅ Ajouter des tooltips
- ✅ Améliorer les loading states
- ✅ Ajouter des raccourcis clavier (Ctrl+S pour sauvegarder)
- ✅ Améliorer le responsive design
- ✅ Optimiser les performances (memoization)
- ✅ Vérifier TypeScript et build
- ✅ Commit + Push avec message "Batch 15: Polish & UX final"

### Validation :
- [ ] TypeScript : aucune erreur
- [ ] Build : passe sans erreur
- [ ] L'interface est intuitive
- [ ] Les messages sont clairs
- [ ] Le responsive fonctionne
- [ ] Les performances sont bonnes

---

## 📋 Checklist Globale

### Avant chaque batch :
- [ ] Vérifier que le code précédent compile
- [ ] S'assurer qu'il n'y a pas d'erreurs TypeScript
- [ ] Tester le build localement

### Après chaque batch :
- [ ] `pnpm type-check` passe sans erreur
- [ ] `pnpm build` passe sans erreur (ou au moins `pnpm lint`)
- [ ] Commit avec message descriptif
- [ ] Push sur la branche INITIALComponentRICH
- [ ] Créer un rapport de progression

### Rapport de progression à inclure :
- ✅ Ce qui a été fait
- ✅ Ce qui fonctionne
- ✅ Problèmes rencontrés (si applicable)
- ✅ Prochaines étapes

---

## 🚨 Règles Importantes

1. **Ne jamais pousser du code avec des erreurs TypeScript**
2. **Toujours vérifier le build avant de pousser**
3. **Un batch = une fonctionnalité complète et testée**
4. **Si erreur, corriger avant de continuer**
5. **Commit atomique : un batch = un commit**

---

## 📊 Progression

- [ ] Batch 1 : Structure de base et types
- [ ] Batch 2 : Liste des thèmes
- [ ] Batch 3 : Actions CRUD de base
- [ ] Batch 4 : Éditeur - Structure et formulaire
- [ ] Batch 5 : Sélecteur de couleurs
- [ ] Batch 6 : Éditeur JSON - Installation
- [ ] Batch 7 : Validation JSON
- [ ] Batch 8 : Synchronisation formulaire/JSON
- [ ] Batch 9 : Prévisualisation - Structure
- [ ] Batch 10 : Prévisualisation temps réel
- [ ] Batch 11 : Sauvegarde et application
- [ ] Batch 12 : Bouton "Appliquer" JSON
- [ ] Batch 13 : Recherche et filtres
- [ ] Batch 14 : Duplication de thème
- [ ] Batch 15 : Polish & UX final

---

## 🎯 Résultat Final Attendu

Un système complet de gestion de thème avec :
- ✅ Liste des thèmes avec recherche et filtres
- ✅ Création/modification via formulaire ou JSON
- ✅ Éditeur JSON avec validation en temps réel
- ✅ Prévisualisation en temps réel
- ✅ Application immédiate sur la plateforme
- ✅ Toutes les actions CRUD fonctionnelles
- ✅ Interface intuitive et responsive

