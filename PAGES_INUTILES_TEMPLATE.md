# Liste des Pages Inutiles liées au Template

Cette liste identifie les pages qui sont des pages de démonstration, de test, ou des fonctionnalités génériques du template qui ne sont **pas nécessaires** pour le site Russ Harris Masterclass.

## 📋 Pages à Supprimer

### 1. Pages de Test et Débogage
- `/test/*` - Toutes les pages de test
  - `/test/api-connections` - Tests de connexions API
  - `/test/admin-logs` - Tests de logs admin
  - `/test-sentry` - Test Sentry
  - `/check-my-superadmin-status` - Page de test superadmin
  - `/db/test` - Tests de base de données

### 2. Pages d'Exemples et Démonstrations
- `/examples/*` - Toutes les pages d'exemples (12 pages)
  - `/examples/dashboard` - Exemple de dashboard
  - `/examples/crud` - Exemple CRUD
  - `/examples/auth` - Exemple d'authentification
  - `/examples/api-fetching` - Exemple de récupération API
  - `/examples/data-table` - Exemple de tableau de données
  - `/examples/file-upload` - Exemple d'upload de fichiers
  - `/examples/modal` - Exemple de modales
  - `/examples/onboarding` - Exemple d'onboarding
  - `/examples/search` - Exemple de recherche
  - `/examples/settings` - Exemple de paramètres
  - `/examples/toast` - Exemple de notifications toast

### 3. Pages de Testing (sous-répertoires)
- `/api-connections/testing` - Tests de connexions API (doublon)
- `/email/testing` - Tests d'email
- `/stripe/testing` - Tests Stripe
- `/sentry/testing` - Tests Sentry
- `/ai/testing` - Tests AI
- `/admin-logs/testing` - Tests de logs admin

### 4. Systèmes Génériques Non Utilisés

#### Blog System
- `/blog/*` - Système de blog complet (7 pages)
  - `/blog` - Page principale du blog
  - `/blog/[slug]` - Article de blog
  - `/blog/archive` - Archives
  - `/blog/author` - Auteur
  - `/blog/category` - Catégorie
  - `/blog/tag` - Tag
  - `/blog/rss` - RSS feed
  - `/blog/sitemap` - Sitemap du blog

#### Content Management
- `/content/*` - Gestion de contenu générique (8 pages)
  - `/content` - Page principale
  - `/content/posts` - Posts
  - `/content/pages` - Pages
  - `/content/categories` - Catégories
  - `/content/tags` - Tags
  - `/content/media` - Médias
  - `/content/templates` - Templates
  - `/content/schedule` - Planning

#### Client Portal
- `/client/*` - Portail client (4 pages)
  - `/client/dashboard` - Dashboard client
  - `/client/projects` - Projets client
  - `/client/invoices` - Factures client
  - `/client/tickets` - Tickets client

#### ERP System
- `/erp/*` - Système ERP complet (7 pages)
  - `/erp/dashboard` - Dashboard ERP
  - `/erp/clients` - Clients ERP
  - `/erp/orders` - Commandes
  - `/erp/invoices` - Factures ERP
  - `/erp/inventory` - Inventaire
  - `/erp/reports` - Rapports ERP

#### Onboarding
- `/onboarding/*` - Système d'onboarding générique (6 pages)
  - `/onboarding` - Page principale
  - `/onboarding/welcome` - Bienvenue
  - `/onboarding/profile` - Profil
  - `/onboarding/preferences` - Préférences
  - `/onboarding/team` - Équipe
  - `/onboarding/complete` - Complété

#### Surveys
- `/surveys/*` - Système de sondages (3 pages)
  - `/surveys` - Page principale
  - `/surveys/[id]/preview` - Aperçu
  - `/surveys/[id]/results` - Résultats

#### Forms
- `/forms/*` - Formulaires génériques (2 pages)
  - `/forms` - Liste des formulaires
  - `/forms/[id]/submissions` - Soumissions

#### Help System
- `/help/*` - Système d'aide générique (6 pages)
  - `/help` - Page principale
  - `/help/faq` - FAQ
  - `/help/guides` - Guides
  - `/help/videos` - Vidéos
  - `/help/tickets` - Tickets d'aide
  - `/help/tickets/[id]` - Détail ticket

#### Monitoring
- `/monitoring/*` - Monitoring système (4 pages)
  - `/monitoring` - Page principale
  - `/monitoring/performance` - Performance
  - `/monitoring/errors` - Erreurs

#### Upload
- `/upload/*` - Upload de fichiers (2 pages)
  - `/upload` - Page d'upload
  - `/upload/layout` - Layout upload

#### Menus
- `/menus` - Gestion de menus

#### Pages Dynamiques
- `/pages/*` - Pages dynamiques (3 pages)
  - `/pages/[slug]` - Page dynamique
  - `/pages/[slug]/edit` - Édition
  - `/pages/[slug]/preview` - Aperçu

#### SEO
- `/seo` - Gestion SEO

#### Subscriptions
- `/subscriptions/*` - Système d'abonnements (2 pages)
  - `/subscriptions` - Page principale
  - `/subscriptions/success` - Succès

#### Stripe (si non utilisé pour paiements)
- `/stripe/*` - Pages Stripe (2 pages)
  - `/stripe/testing` - Tests Stripe
  - `/stripe/layout` - Layout Stripe

#### Sentry
- `/sentry/*` - Pages Sentry (2 pages)
  - `/sentry/testing` - Tests Sentry
  - `/sentry/layout` - Layout Sentry

#### AI Chat
- `/ai/*` - Chat AI (2 pages)
  - `/ai/chat` - Chat
  - `/ai/testing` - Tests AI

#### Documentation
- `/docs/*` - Documentation (3 pages)
  - `/docs` - Page principale
  - `/docs/error` - Erreur
  - `/docs/layout` - Layout

#### API Connections
- `/api-connections/*` - Connexions API (16 pages)
  - `/api-connections/testing` - Tests
  - `/api-connections/layout` - Layout

#### Admin Logs
- `/admin-logs/*` - Logs admin (3 pages)
  - `/admin-logs/testing` - Tests
  - `/admin-logs/layout` - Layout

#### Email
- `/email/*` - Email (2 pages)
  - `/email/testing` - Tests
  - `/email/layout` - Layout

#### Database
- `/db/*` - Base de données (2 pages)
  - `/db/test` - Tests
  - `/db/layout` - Layout

## 📊 Résumé

**Total estimé de pages à supprimer : ~100+ pages**

### Catégories principales :
1. **Pages de test** : ~25 pages
2. **Pages d'exemples** : ~12 pages
3. **Système de blog** : ~7 pages
4. **Gestion de contenu** : ~8 pages
5. **Portail client** : ~4 pages
6. **Système ERP** : ~7 pages
7. **Onboarding** : ~6 pages
8. **Sondages** : ~3 pages
9. **Formulaires** : ~2 pages
10. **Aide** : ~6 pages
11. **Monitoring** : ~4 pages
12. **Autres systèmes** : ~20 pages

## ✅ Pages à CONSERVER (nécessaires pour Russ Harris)

- `/` - Page d'accueil
- `/book/*` - Pages de réservation (book, checkout, payment, confirmation)
- `/montreal`, `/calgary`, `/vancouver`, `/toronto` - Pages des villes
- `/masterclass` - Page du programme
- `/about-russ` - À propos de Russ
- `/testimonials` - Témoignages
- `/faq` - FAQ
- `/contact` - Contact
- `/pricing` - Tarifs
- `/dashboard/*` - Dashboard (si utilisé)
- `/admin/*` - Admin (si utilisé)
- `/auth/*` - Authentification
- `/profile/*` - Profil utilisateur
- `/settings/*` - Paramètres utilisateur
- `/legal`, `/privacy`, `/terms`, `/cookies` - Pages légales
- `/sitemap` - Sitemap

## 🚀 Action Recommandée

1. Créer un script de suppression pour nettoyer ces pages
2. Vérifier les dépendances avant suppression
3. Mettre à jour les routes et la navigation
4. Nettoyer les imports inutilisés
