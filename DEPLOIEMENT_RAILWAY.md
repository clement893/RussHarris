# 🚀 Guide de Déploiement sur Railway

**Date:** 29 décembre 2025  
**Problème:** Les changements UX/UI ne sont pas visibles en production

---

## 🔍 Diagnostic

### Problème Identifié
Les changements sont dans le code **local** mais **pas commités/pushés** vers Git.

**Railway se déclenche automatiquement uniquement lors d'un `git push`.**

---

## ✅ Solution : Déployer les Changements

### Étape 1 : Vérifier les Changements

```bash
# Voir tous les fichiers modifiés
git status

# Voir les différences
git diff apps/web/src/components/ui/Sidebar.tsx
```

### Étape 2 : Ajouter les Fichiers Modifiés

```bash
# Ajouter tous les fichiers modifiés
git add .

# OU ajouter spécifiquement les fichiers UX/UI
git add apps/web/src/components/ui/Sidebar.tsx
git add apps/web/src/app/[locale]/dashboard/layout.tsx
git add apps/web/src/app/[locale]/dashboard/page.tsx
git add apps/web/src/components/motion/MotionDiv.tsx
git add apps/web/src/components/ui/Card.tsx
git add apps/web/src/components/ui/Modal.tsx
git add apps/web/src/components/ui/Accordion.tsx
git add apps/web/src/components/layout/PageHeader.tsx
git add apps/web/src/components/ui/Heading.tsx
git add apps/web/src/components/ui/Text.tsx
```

### Étape 3 : Commiter les Changements

```bash
git commit -m "feat(ui): apply UX/UI improvements batches 16-17

- Add search bar to Sidebar (Batch 8)
- Add animations to dashboard (Batch 16)
- Improve mobile sidebar (Batch 17)
- Enhance spacing and typography
- Apply improvements to Card, Modal, Accordion components"
```

### Étape 4 : Pousser vers Git

```bash
# Pousser vers la branche principale
git push origin main

# OU si vous êtes sur une autre branche
git push origin votre-branche
```

### Étape 5 : Railway Déploie Automatiquement

Une fois le push effectué :
1. ✅ Railway détecte le push
2. ✅ Railway lance le build Docker
3. ✅ Railway déploie la nouvelle version
4. ✅ Le site est mis à jour (2-5 minutes)

---

## 🔍 Vérification du Déploiement

### Dans Railway Dashboard

1. Aller sur [Railway Dashboard](https://railway.app)
2. Ouvrir votre projet
3. Vérifier l'onglet **Deployments**
4. Voir le build en cours/terminé

### Vérifier les Logs

```bash
# Si vous avez Railway CLI installé
railway logs

# OU dans le dashboard Railway
# Onglet "Deployments" → Cliquer sur le dernier déploiement → Voir les logs
```

### Vérifier le Site

Après le déploiement (2-5 minutes) :
1. Aller sur https://modeleweb-production-08e7.up.railway.app/fr/dashboard
2. Vider le cache du navigateur (`Ctrl+Shift+R`)
3. Vérifier :
   - ✅ Sidebar avec barre de recherche
   - ✅ Animations au chargement
   - ✅ Spacing amélioré

---

## ⚠️ Problèmes Potentiels

### 1. Build Échoue

**Symptôme:** Railway montre une erreur de build

**Solution:**
```bash
# Tester le build localement
cd apps/web
pnpm build

# Si erreur, corriger puis recommiter
```

### 2. Changements Pas Visibles Après Déploiement

**Symptôme:** Déploiement réussi mais changements invisibles

**Solutions:**
1. **Vider le cache du navigateur**
   - `Ctrl+Shift+R` (Windows/Linux)
   - `Cmd+Shift+R` (Mac)
   - OU navigation privée

2. **Vérifier que Tailwind a généré les classes**
   - Ouvrir DevTools → Network
   - Recharger la page
   - Chercher le fichier CSS
   - Vérifier présence de `p-lg`, `space-y-2xl`, etc.

3. **Vérifier les logs Railway**
   - S'assurer que le build a bien inclus les nouveaux fichiers

### 3. Railway Ne Se Déclenche Pas

**Symptôme:** Pas de build après `git push`

**Solutions:**
1. Vérifier que Railway est connecté au bon repo Git
2. Vérifier la branche dans Railway (doit être `main` ou votre branche)
3. Vérifier les webhooks Git dans Railway

---

## 📋 Checklist de Déploiement

- [ ] Fichiers modifiés vérifiés (`git status`)
- [ ] Fichiers ajoutés (`git add`)
- [ ] Commit créé avec message descriptif
- [ ] Push effectué (`git push`)
- [ ] Railway détecte le push (vérifier dashboard)
- [ ] Build Railway réussi (vérifier logs)
- [ ] Déploiement terminé (attendre 2-5 minutes)
- [ ] Cache navigateur vidé
- [ ] Site vérifié (changements visibles)

---

## 🎯 Commandes Rapides

```bash
# Tout en une fois (ATTENTION: commit tout)
git add .
git commit -m "feat(ui): apply UX/UI improvements batches 16-17"
git push origin main

# Puis attendre 2-5 minutes et vérifier le site
```

---

## 📝 Notes Importantes

1. **Railway utilise le cache Docker** - Les builds peuvent être plus rapides
2. **Le build prend 2-5 minutes** - Patience !
3. **Le cache du navigateur** peut masquer les changements - Toujours vider le cache
4. **Les classes Tailwind** sont générées lors du build - Si absentes, rebuild nécessaire

---

**Document créé:** 2025-12-29  
**Dernière mise à jour:** 2025-12-29
