# 📦 Plan d'Implémentation par Batches - Site Russ Harris Masterclass

## 🎯 Vue d'Ensemble

**Total Batches:** 10  
**Durée estimée:** 3-4 semaines  
**Approche:** Implémentation incrémentale batch par batch avec validation à chaque étape

---

## 📋 Structure des Batches

### **BATCH 1: Setup & Configuration de Base** ⚙️
**Durée:** 0.5 jour  
**Priorité:** 🔴 Critique  
**Objectif:** Préparer environnement et structure de base

**Tâches:**
- [ ] Créer structure dossiers pour masterclass
- [ ] Configurer variables d'environnement nécessaires
- [ ] Setup seed data scripts
- [ ] Vérifier dépendances (Stripe, SendGrid)
- [ ] Créer fichiers de configuration spécifiques

**Livrables:**
- Structure dossiers créée
- Variables env configurées
- Scripts utilitaires prêts

---

### **BATCH 2: Base de Données & Modèles Backend** 🗄️
**Durée:** 1.5 jours  
**Priorité:** 🔴 Critique  
**Objectif:** Créer schéma DB complet pour événements et réservations

**Tâches:**
- [ ] Créer modèle `MasterclassEvent` (SQLAlchemy)
- [ ] Créer modèle `City` (SQLAlchemy)
- [ ] Créer modèle `Venue` (SQLAlchemy)
- [ ] Créer modèle `CityEvent` (SQLAlchemy) - Instance événement par ville
- [ ] Créer modèle `Booking` (SQLAlchemy) - Réservations
- [ ] Créer modèle `Attendee` (SQLAlchemy) - Participants
- [ ] Créer modèle `BookingPayment` (SQLAlchemy) - Transactions
- [ ] Créer migration Alembic
- [ ] Créer schemas Pydantic pour validation
- [ ] Créer seed data script (villes, événements test)
- [ ] Tests unitaires modèles

**Livrables:**
- `backend/app/models/masterclass.py`
- `backend/app/models/booking.py`
- `backend/alembic/versions/XXX_create_masterclass_tables.py`
- `backend/app/schemas/masterclass.py`
- `backend/app/schemas/booking.py`
- `backend/scripts/seed_masterclass_data.py`

---

### **BATCH 3: API Backend Endpoints** 🔌
**Durée:** 2 jours  
**Priorité:** 🔴 Critique  
**Objectif:** Créer endpoints API pour événements et réservations

**Tâches:**
- [ ] Endpoint `GET /api/v1/masterclass/events` - Liste événements
- [ ] Endpoint `GET /api/v1/masterclass/cities` - Villes avec événements
- [ ] Endpoint `GET /api/v1/masterclass/cities/{city_id}/events` - Événements par ville
- [ ] Endpoint `GET /api/v1/masterclass/events/{event_id}` - Détails événement
- [ ] Endpoint `GET /api/v1/masterclass/events/{event_id}/availability` - Disponibilité temps réel
- [ ] Endpoint `POST /api/v1/bookings/create` - Créer réservation
- [ ] Endpoint `GET /api/v1/bookings/{reference}` - Status réservation
- [ ] Endpoint `POST /api/v1/bookings/{reference}/cancel` - Annuler réservation
- [ ] Service `BookingService` - Logique métier réservations
- [ ] Service `AvailabilityService` - Calcul disponibilité
- [ ] Tests API (pytest)
- [ ] Documentation Swagger

**Livrables:**
- `backend/app/api/v1/endpoints/masterclass.py`
- `backend/app/api/v1/endpoints/bookings.py`
- `backend/app/services/booking_service.py`
- `backend/app/services/availability_service.py`
- Tests API passent
- Swagger documentation

---

### **BATCH 4: Design System Swiss Style** 🎨
**Durée:** 1 jour  
**Priorité:** 🟡 Haute  
**Objectif:** Personnaliser design selon Swiss International Style

**Tâches:**
- [ ] Configurer thème Swiss Style via Tailwind (noir/blanc)
- [ ] Créer preset thème (optionnel via ThemeManager UI)
- [ ] Créer composant `HeroSection.tsx`
- [ ] Créer composant `UrgencyBadge.tsx`
- [ ] Créer composant `AvailabilityBar.tsx`
- [ ] Créer composant `SwissDivider.tsx` - Ligne horizontale fine
- [ ] Créer composant `SwissCard.tsx` - Card minimaliste
- [ ] Configurer typographie (Inter Bold 900 pour headings)
- [ ] Configurer espacement (marges larges 120px)
- [ ] Tests responsive design

**Livrables:**
- `apps/web/src/styles/swiss-theme.css` ou `tailwind.config.ts` modifié
- `apps/web/src/components/masterclass/HeroSection.tsx`
- `apps/web/src/components/masterclass/UrgencyBadge.tsx`
- `apps/web/src/components/masterclass/AvailabilityBar.tsx`
- `apps/web/src/components/masterclass/SwissDivider.tsx`
- `apps/web/src/components/masterclass/SwissCard.tsx`
- Thème Swiss Style appliqué

---

### **BATCH 5: Pages Frontend Principales** 📄
**Durée:** 2 jours  
**Priorité:** 🔴 Critique  
**Objectif:** Créer toutes les pages du site selon brief

**Tâches:**
- [ ] Modifier page Hero/Landing (`/page.tsx`)
  - Utiliser HeroSection
  - Stats section
  - CTA prominent
  
- [ ] Créer page About Russ (`/about-russ/page.tsx`)
  - Bio Russ Harris
  - Photo professionnelle
  - Points clés avec icônes
  
- [ ] Créer page Programme (`/masterclass/page.tsx`)
  - Description masterclass
  - Timeline jour 1 / jour 2
  - Objectifs pédagogiques
  - Ressources incluses
  
- [ ] Créer page Villes (`/cities/page.tsx`)
  - Grille villes avec CityCard
  - Disponibilité temps réel
  - Filtres (optionnel)
  
- [ ] Créer page détail ville (`/cities/[city]/page.tsx`)
  - Détails ville spécifique
  - Dates disponibles
  - Venue information
  
- [ ] Adapter page Pricing (`/pricing/page.tsx`)
  - Options: Early Bird, Regular, Group
  - Inclusions list
  - FAQ intégré
  
- [ ] Créer page Témoignages (`/testimonials/page.tsx`)
  - Carousel témoignages
  - Photos participants
  - Évaluations ★★★★★
  
- [ ] Créer page FAQ (`/faq/page.tsx`)
  - Accordéon questions/réponses
  - Recherche (optionnel)
  
- [ ] Modifier Navigation Header
  - Menu masterclass
  - CTA sticky "Réserver ma place"
  
- [ ] Modifier Footer
  - Coordonnées ContextPsy
  - Liens légaux
  - Réseaux sociaux

**Livrables:**
- Toutes les pages créées
- Navigation fonctionnelle
- Responsive mobile/tablet/desktop

---

### **BATCH 6: Système de Réservation** 🎫
**Durée:** 1.5 jours  
**Priorité:** 🔴 Critique  
**Objectif:** Créer flux complet de réservation

**Tâches:**
- [ ] Page sélection ville/date (`/book/page.tsx`)
  - Sélection ville
  - Sélection date/événement
  - Affichage disponibilité
  - Prix (early bird vs regular)
  
- [ ] Page formulaire réservation (`/book/checkout/page.tsx`)
  - Formulaire attendee info (Nom, Email, Téléphone)
  - Expérience ACT (dropdown)
  - Nombre billets (1-10)
  - Option groupe (3+)
  - Récapitulatif prix
  
- [ ] Composant `BookingForm.tsx`
  - Validation avec Zod
  - États loading/error/success
  - Gestion multi-attendees (si groupe)
  
- [ ] Composant `BookingSummary.tsx`
  - Récapitulatif réservation
  - Détails prix
  - Total calculé
  
- [ ] Page confirmation (`/book/confirmation/page.tsx`)
  - Message confirmation
  - Booking reference
  - Prochaines étapes
  - Lien télécharger reçu (optionnel)

**Livrables:**
- Flux réservation complet
- Formulaires validés
- Pages confirmation

---

### **BATCH 7: Intégration Stripe pour Bookings** 💳
**Durée:** 1.5 jours  
**Priorité:** 🔴 Critique  
**Objectif:** Adapter Stripe pour paiements uniques (bookings)

**Tâches:**
- [ ] Adapter `StripeService` pour PaymentIntent (au lieu de Checkout Session)
  - Méthode `create_payment_intent_for_booking()`
  - Gérer montants CAD
  - Metadata booking_id
  
- [ ] Endpoint `POST /api/v1/bookings/{booking_id}/create-payment-intent`
  - Créer PaymentIntent Stripe
  - Associer à booking
  - Retourner client_secret
  
- [ ] Page paiement Stripe (`/book/payment/page.tsx`)
  - Stripe Elements (carte bancaire)
  - Affichage montant
  - État payment processing
  
- [ ] Composant `BookingStripeCheckout.tsx`
  - Intégration Stripe Elements
  - Gestion erreurs paiement
  - Redirection après succès
  
- [ ] Webhook Stripe pour bookings
  - Handler `payment_intent.succeeded` → confirmer booking
  - Handler `payment_intent.payment_failed` → annuler booking
  - Envoyer email confirmation (utiliser EmailService)
  
- [ ] Tests paiements Stripe (test mode)
  - Carte succès (4242 4242 4242 4242)
  - Carte échec
  - Webhooks testés

**Livrables:**
- Stripe PaymentIntent fonctionnel
- Webhooks configurés
- Tests paiements passent

---

### **BATCH 8: Emails Transactionnels** 📧
**Durée:** 1.5 jours  
**Priorité:** 🟡 Haute  
**Objectif:** Créer séquence emails automatiques pour réservations

**Tâches:**
- [ ] Template email confirmation immédiate
  - `booking_confirmation_email()` dans `EmailTemplates`
  - HTML + texte version
  - Variables: booking_reference, city, dates, venue
  
- [ ] Template email J-30 (Rappel)
  - `booking_reminder_30_days()`
  - Ressources pré-masterclass
  
- [ ] Template email J-14 (Agenda)
  - `booking_reminder_14_days()`
  - Timeline détaillée
  
- [ ] Template email J-7 (Logistique)
  - `booking_reminder_7_days()`
  - Hôtel, transport, parking
  
- [ ] Template email J-1 (Bienvenue)
  - `booking_reminder_1_day()`
  - Horaires finaux + contacts
  
- [ ] Template email Post-event
  - `booking_post_event_email()`
  - Accès ressources + feedback form
  
- [ ] Celery tasks pour emails
  - `send_booking_confirmation_task()`
  - `send_booking_reminder_task()` (générique avec days param)
  
- [ ] Scheduler emails rappels (Celery Beat)
  - Tâche quotidienne
  - Query bookings: `event_date - days_until = today`
  - Envoyer emails rappels
  
- [ ] Tests emails (envoi réel ou mock)

**Livrables:**
- 6 templates email créés
- Celery tasks configurés
- Scheduler emails rappels fonctionnel

---

### **BATCH 9: Contenu & Assets** 📸
**Durée:** 1 jour  
**Priorité:** 🟡 Haute  
**Objectif:** Ajouter contenu réel et assets visuels

**Tâches:**
- [ ] Images optimisées:
  - Hero image Russ Harris (1920x1080px) → `/public/images/russ-harris-hero.jpg`
  - Photos villes (600x400px x 6) → `/public/images/cities/`
  - Photos témoignages (300x300px x 4-6) → `/public/images/testimonials/`
  - Logo ContextPsy → `/public/images/contextpsy-logo.svg`
  
- [ ] Copywriting FR/EN:
  - Tous textes selon brief
  - Ajouter dans `messages/fr.json` et `messages/en.json`
  - Headlines courtes (max 10 mots)
  - Body text paragraphes courts (3-4 lignes)
  
- [ ] SEO Meta tags:
  - Meta titles par page (optimisés)
  - Meta descriptions (150-160 chars)
  - Open Graph tags (images OG par page)
  
- [ ] Schema.org Event markup:
  - Structured data sur pages événements
  - Event schema avec location, dates, organizer
  
- [ ] Sitemap:
  - Ajouter nouvelles pages dans sitemap
  - Vérifier robots.txt

**Livrables:**
- Images ajoutées et optimisées
- Contenu FR/EN complet
- SEO optimisé
- Schema markup configuré

---

### **BATCH 10: Tests & Finalisation** ✅
**Durée:** 2 jours  
**Priorité:** 🔴 Critique  
**Objectif:** Tests complets et finalisation pour production

**Tâches:**
- [ ] Tests E2E (Playwright):
  - Parcours complet réservation
  - Flow paiement Stripe
  - Multi-villes, multi-dates
  - Responsive mobile/tablet/desktop
  
- [ ] Tests API (pytest):
  - Endpoints masterclass
  - Endpoints bookings
  - Webhooks Stripe
  - Cas limites (sold out, invalid reference, etc.)
  
- [ ] Tests unitaires composants critiques:
  - BookingForm
  - BookingStripeCheckout
  - AvailabilityBar
  
- [ ] Tests performance:
  - Lighthouse audit (target 90+)
  - Core Web Vitals (LCP < 2.5s, FID < 100ms, CLS < 0.1)
  - Bundle size analysis
  
- [ ] Tests accessibilité:
  - Navigation clavier
  - Screen reader
  - Contraste couleurs (WCAG AA)
  - ARIA labels
  
- [ ] Cross-browser testing:
  - Chrome, Firefox, Safari, Edge
  - Mobile iOS Safari, Chrome Android
  
- [ ] Fix bugs et ajustements:
  - Résoudre issues trouvées
  - Ajustements UX/UI selon feedback
  - Optimisations finales
  
- [ ] Documentation:
  - README mise à jour
  - Guide admin (gestion événements)
  - Guide utilisateur (équipe ContextPsy)
  
- [ ] Préparation déploiement:
  - Variables env production configurées
  - Database migrations validées
  - Stripe live keys configurées
  - SendGrid domain vérifié

**Livrables:**
- Tous tests passent
- Performance optimisée (Lighthouse 90+)
- Accessibilité WCAG AA
- Documentation complète
- Prêt pour production

---

## 📊 Tracking des Batches

Voir document: `BATCHES_TRACKING.md`

---

## 🚀 Ordre d'Exécution

```
BATCH 1 (Setup)
    ↓
BATCH 2 (Database)
    ↓
BATCH 3 (API Backend)
    ↓
BATCH 4 (Design System) ─┐
    ↓                     │
BATCH 5 (Pages Frontend) ─┤ Parallèle possible
    ↓                     │
BATCH 6 (Réservation)    ─┘
    ↓
BATCH 7 (Stripe)
    ↓
BATCH 8 (Emails) ──────┐
    ↓                  │ Parallèle possible
BATCH 9 (Contenu) ─────┘
    ↓
BATCH 10 (Tests & Finalisation)
```

---

## ✅ Critères de Validation par Batch

### BATCH 1: ✅ Setup
- Structure dossiers créée
- Variables env configurées
- Scripts utilitaires fonctionnent

### BATCH 2: ✅ Database
- Migrations Alembic appliquées sans erreur
- Seed data fonctionne
- Tests modèles passent

### BATCH 3: ✅ API
- Tous endpoints retournent 200/201
- Swagger documentation accessible
- Tests API passent

### BATCH 4: ✅ Design
- Thème Swiss Style appliqué visuellement
- Composants rendent correctement
- Responsive fonctionne

### BATCH 5: ✅ Pages
- Toutes pages accessibles sans 404
- Navigation fonctionne
- Contenu affiché correctement

### BATCH 6: ✅ Réservation
- Flux complet réservation fonctionne
- Formulaires valident correctement
- Confirmation s'affiche

### BATCH 7: ✅ Stripe
- PaymentIntent créé avec succès
- Webhook confirme booking
- Tests paiements passent

### BATCH 8: ✅ Emails
- Emails s'envoient avec succès
- Templates affichent correctement
- Scheduler rappels fonctionne

### BATCH 9: ✅ Contenu
- Images chargent correctement
- Textes FR/EN complets
- SEO meta tags présents

### BATCH 10: ✅ Finalisation
- Tous tests passent (E2E, API, unitaires)
- Lighthouse 90+
- Prêt pour production

---

**Version:** 1.0  
**Date:** 2025-01-27  
**Statut:** Prêt pour implémentation
