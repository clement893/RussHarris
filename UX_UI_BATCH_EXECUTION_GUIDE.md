# 🚀 Guide d'Exécution des Batches UX/UI

**Document:** Guide pratique pour exécuter les batches  
**Date:** 29 décembre 2025  
**Usage:** Suivre ce guide étape par étape pour chaque batch

---

## 📋 Avant de Commencer

### Prérequis
- ✅ Codebase à jour (`git pull`)
- ✅ Branche propre (`git status`)
- ✅ Dépendances installées (`pnpm install`)
- ✅ Environnement de développement fonctionnel

### Commandes Utiles
```bash
# Vérifier le statut Git
git status

# Vérifier TypeScript
cd apps/web && pnpm type-check

# Vérifier le build
cd apps/web && pnpm build

# Vérifier le linting
cd apps/web && pnpm lint
```

---

## 🔄 Workflow pour Chaque Batch

### Étape 1: Pre-Check

**Objectif:** Vérifier que le code compile avant modifications

```bash
# Aller dans le dossier web
cd apps/web

# Vérifier TypeScript
pnpm type-check

# Si erreurs, les corriger AVANT de continuer
```

**✅ Critère de succès:** Aucune erreur TypeScript

---

### Étape 2: Lire les Instructions du Batch

1. Ouvrir `UX_UI_BATCH_EXECUTION_PLAN.md`
2. Trouver le batch à exécuter (ex: BATCH 1)
3. Lire attentivement:
   - Objectif
   - Fichiers à modifier
   - Instructions détaillées
   - Vérifications requises

---

### Étape 3: Faire les Modifications

**⚠️ IMPORTANT:** 
- Modifier UNIQUEMENT les fichiers spécifiés
- Suivre les instructions exactement
- Ne pas faire de changements supplémentaires

**Processus:**
1. Ouvrir le fichier à modifier
2. Faire les changements selon les instructions
3. Sauvegarder
4. Répéter pour chaque fichier du batch

---

### Étape 4: Post-Check

**Objectif:** Vérifier que tout fonctionne après modifications

```bash
# Vérifier TypeScript
cd apps/web
pnpm type-check

# Si erreurs, les corriger
# Répéter jusqu'à ce que ça compile

# Vérifier le build
pnpm build

# Si erreurs de build, les corriger
# Répéter jusqu'à ce que ça build

# Vérifier le linting (optionnel mais recommandé)
pnpm lint
```

**✅ Critère de succès:**
- ✅ TypeScript compile sans erreurs
- ✅ Build réussi
- ✅ Pas d'erreurs de lint critiques

---

### Étape 5: Commit et Push

**Objectif:** Sauvegarder les changements dans Git

```bash
# Retourner à la racine du projet
cd ../..

# Vérifier les fichiers modifiés
git status

# Ajouter les fichiers modifiés
git add [fichiers modifiés]
# OU pour ajouter tous les changements du batch
git add apps/web/tailwind.config.ts  # exemple

# Commit avec le message du batch
git commit -m "feat(ui): add standardized spacing scale to Tailwind config

- Add xs (4px), sm (8px), md (16px), lg (24px), xl (32px), 2xl (48px), 3xl (64px)
- Maintain backward compatibility with existing spacing values
- Part of Phase 1.1 - Foundation spacing system"

# Push vers le repository
git push origin main
```

**✅ Critère de succès:**
- ✅ Commit créé avec message descriptif
- ✅ Push réussi

---

### Étape 6: Créer le Rapport de Progression

**Objectif:** Documenter ce qui a été fait

1. Copier `UX_UI_BATCH_PROGRESS_TEMPLATE.md`
2. Renommer en `UX_UI_BATCH_X_PROGRESS.md` (X = numéro du batch)
3. Remplir toutes les sections:
   - Summary
   - Completed Tasks
   - Verification Results
   - Files Modified
   - Issues Encountered
   - Metrics
   - Git Commit
   - Next Steps

**Exemple:**
```bash
# Copier le template
cp UX_UI_BATCH_PROGRESS_TEMPLATE.md UX_UI_BATCH_1_PROGRESS.md

# Éditer le fichier et remplir les sections
```

---

### Étape 7: Mettre à Jour le Tableau de Suivi

**Objectif:** Suivre la progression globale

1. Ouvrir `UX_UI_BATCH_EXECUTION_PLAN.md`
2. Trouver le tableau "Tableau de Suivi Global"
3. Mettre à jour la ligne du batch:
   - Status: ✅ Complete
   - Date: [date actuelle]
   - Commit: [hash du commit]

---

### Étape 8: Attendre Validation

**⚠️ IMPORTANT:** 
- **NE PAS** continuer au batch suivant sans validation
- Attendre votre validation visuelle
- Si problèmes, ajuster et recommencer

**Après validation:**
- ✅ Si validé: Passer au batch suivant
- ❌ Si problème: Ajuster et recommencer le batch

---

## 🐛 Résolution de Problèmes

### Erreurs TypeScript

**Symptôme:** `pnpm type-check` échoue

**Solutions:**
1. Lire l'erreur attentivement
2. Vérifier les types dans le fichier modifié
3. Vérifier les imports
4. Corriger l'erreur
5. Relancer `pnpm type-check`

**Exemple:**
```typescript
// Erreur: Property 'level' does not exist on type 'HeadingProps'
// Solution: Vérifier que la prop 'level' est bien définie dans l'interface
```

---

### Erreurs de Build

**Symptôme:** `pnpm build` échoue

**Solutions:**
1. Lire l'erreur de build
2. Vérifier les imports manquants
3. Vérifier les dépendances
4. Vérifier la syntaxe
5. Corriger et relancer

---

### Conflits Git

**Symptôme:** `git push` échoue avec conflits

**Solutions:**
1. Faire `git pull` pour récupérer les changements
2. Résoudre les conflits manuellement
3. Commit les résolutions
4. Push à nouveau

---

## ✅ Checklist Complète par Batch

Avant de passer au batch suivant, vérifier:

- [ ] Pre-check réussi (TypeScript compile)
- [ ] Modifications faites selon instructions
- [ ] Post-check réussi (TypeScript + Build)
- [ ] Commit créé avec message descriptif
- [ ] Push réussi vers repository
- [ ] Rapport de progression créé et rempli
- [ ] Tableau de suivi mis à jour
- [ ] Validation utilisateur obtenue (si requis)

---

## 📊 Suivi de Progression

### Commandes Utiles pour Suivre

```bash
# Voir les commits récents
git log --oneline -10

# Voir les fichiers modifiés dans le dernier commit
git show --name-only HEAD

# Voir les différences depuis le dernier commit
git diff HEAD

# Voir le statut actuel
git status
```

---

## 🎯 Conseils pour une Exécution Efficace

### 1. Un Batch à la Fois
- Ne pas essayer de faire plusieurs batches en même temps
- Compléter un batch avant de passer au suivant

### 2. Vérifications Régulières
- Toujours vérifier TypeScript après modifications
- Ne pas accumuler les erreurs

### 3. Commits Fréquents
- Commit après chaque batch
- Messages descriptifs pour faciliter le suivi

### 4. Documentation
- Remplir les rapports de progression
- Noter les problèmes rencontrés
- Documenter les solutions

### 5. Validation Utilisateur
- Attendre validation avant de continuer
- Ajuster selon les retours

---

## 📝 Notes Importantes

### ⚠️ Ne Pas Faire
- ❌ Modifier des fichiers non spécifiés dans le batch
- ❌ Faire plusieurs batches sans validation
- ❌ Ignorer les erreurs TypeScript
- ❌ Commit sans vérifier que ça compile
- ❌ Oublier de créer le rapport de progression

### ✅ Toujours Faire
- ✅ Vérifier TypeScript avant et après
- ✅ Suivre les instructions exactement
- ✅ Commit avec message descriptif
- ✅ Créer le rapport de progression
- ✅ Attendre validation avant de continuer

---

## 🚀 Démarrage Rapide

Pour commencer le Batch 1:

```bash
# 1. Pre-check
cd apps/web && pnpm type-check

# 2. Faire les modifications (suivre instructions Batch 1)

# 3. Post-check
pnpm type-check && pnpm build

# 4. Commit
cd ../..
git add apps/web/tailwind.config.ts
git commit -m "feat(ui): add standardized spacing scale to Tailwind config"
git push origin main

# 5. Créer rapport
cp UX_UI_BATCH_PROGRESS_TEMPLATE.md UX_UI_BATCH_1_PROGRESS.md
# Remplir le rapport

# 6. Attendre validation
```

---

**Guide créé:** 29 décembre 2025  
**Dernière mise à jour:** 29 décembre 2025  
**Prochaine étape:** Commencer Batch 1
