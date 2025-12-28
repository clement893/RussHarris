# 📋 Batch 7 Plan: Dashboard Insights & Analytics

## 🎯 Objectif

Connecter les pages Dashboard Insights et Analytics aux API backend, en créant les endpoints nécessaires si besoin.

---

## 📦 Pages à Traiter

1. `/dashboard/insights` - Page d'insights avec métriques
2. `/dashboard/analytics` - Page d'analytics avec graphiques

---

## 🔍 État Actuel

### Dashboard Insights
- **Fichier**: `apps/web/src/app/[locale]/dashboard/insights/page.tsx`
- **Statut**: Utilise des données mockées
- **TODOs**: Ligne 54 - Remplacement par endpoint `/v1/insights`

### Dashboard Analytics
- **Fichier**: `apps/web/src/app/[locale]/dashboard/analytics/page.tsx`
- **Statut**: Utilise des données mockées
- **TODOs**: Ligne 52 - Remplacement par endpoint `/v1/analytics/metrics`

---

## 🔌 Endpoints Backend Nécessaires

### Option 1: Créer des endpoints dédiés
- `GET /api/v1/insights` - Obtenir les insights (métriques, tendances, croissance utilisateurs)
- `GET /api/v1/analytics/metrics` - Obtenir les métriques analytics

### Option 2: Utiliser les endpoints existants
- Vérifier si `/v1/dashboard` ou `/v1/analytics` existent déjà
- Utiliser les endpoints de projets/activités pour générer les métriques

---

## 📝 Étapes de Développement

### Étape 1: Vérifier les endpoints existants
- Chercher dans `backend/app/api/v1/endpoints/` pour dashboard/analytics
- Vérifier si des endpoints peuvent être réutilisés

### Étape 2: Créer les endpoints backend (si nécessaire)
- Créer `backend/app/api/v1/endpoints/insights.py` ou `analytics.py`
- Implémenter les endpoints avec agrégation de données
- Ajouter au router principal

### Étape 3: Créer les modules API frontend
- Créer `apps/web/src/lib/api/insights.ts` ou `analytics.ts`
- Implémenter les fonctions API

### Étape 4: Intégrer dans les pages
- Remplacer les données mockées par les appels API
- Ajouter gestion d'erreurs avec `handleApiError()`

### Étape 5: Vérifications
- TypeScript compile sans erreurs
- Build Next.js réussit
- Tests manuels

---

## ⚠️ Notes Importantes

1. **Données mockées**: Les pages utilisent actuellement des données mockées pour le développement
2. **Endpoints manquants**: Les endpoints backend doivent être créés ou vérifiés
3. **Agrégation de données**: Les insights nécessitent probablement une agrégation de plusieurs sources (projets, utilisateurs, activités)

---

## ✅ Checklist de Validation

- [ ] Endpoints backend créés/vérifiés
- [ ] Modules API frontend créés
- [ ] Pages intégrées avec API
- [ ] TypeScript compile sans erreurs
- [ ] Build Next.js réussit
- [ ] Gestion d'erreurs implémentée
- [ ] Tests manuels effectués

---

**Note**: Ce batch nécessite une décision sur la structure des endpoints backend avant de commencer.
