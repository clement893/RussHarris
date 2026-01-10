# 📋 Plan d'Implémentation Simplifié - Site Russ Harris Masterclass

## 🎯 Vue d'Ensemble

**Projet:** Transformer le template Next.js existant en site de vente de billets Russ Harris Masterclass  
**Durée Réaliste:** **3-4 semaines** (pas 12!)  
**Approche:** **Réutiliser 90% du template existant**, personnaliser seulement ce qui est nécessaire

---

## ✅ Ce qui Existe DÉJÀ (On Ne Le Refait Pas!)

### ✨ Infrastructure Complète
- ✅ **Next.js 16 + React 19 + TypeScript** - Framework complet
- ✅ **FastAPI Backend + PostgreSQL** - API REST opérationnelle
- ✅ **Stripe Integration** - Checkout sessions, webhooks, payment processing COMPLET
- ✅ **SendGrid Integration** - Email service avec Celery tasks, templates COMPLET
- ✅ **Système de thème avancé** - ThemeManager UI pour personnalisation
- ✅ **i18n FR/EN** - next-intl configuré et fonctionnel
- ✅ **270+ composants UI** - Tous les composants nécessaires existent
- ✅ **Layout components** - Header, Footer, Sidebar, PageHeader déjà prêts
- ✅ **Performance optimisée** - Code splitting, image optimization déjà fait
- ✅ **SEO setup** - Sitemap, robots.txt, meta tags système déjà là

### 📦 Modules Existants à Réutiliser Directement
- ✅ **Billing/Subscriptions** (`components/billing/`, `components/subscriptions/`)
  - PricingSection, PaymentHistory, PaymentMethodForm
  - Stripe checkout déjà implémenté
  - Webhooks Stripe configurés
  
- ✅ **Email System** (`backend/app/services/email_service.py`)
  - EmailService avec SendGrid
  - Templates email (Welcome, Invoice, etc.)
  - Celery tasks pour emails asynchrones
  
- ✅ **Theme System** (`components/theme/`)
  - ThemeManager avec UI complète
  - Personnalisation couleurs, typographie, spacing
  - Export/Import themes

---

## 🔨 Ce qui Doit Être Fait (Uniquement le Nécessaire)

### 1. Personnalisation Design Swiss Style (3-4 jours)
**Utiliser le système de thème existant - pas besoin de créer un nouveau design system!**

- [ ] Créer preset thème "Swiss Style" via ThemeManager UI (`/admin/themes/builder`)
  - Palette: Noir (#000000), Blanc (#FFFFFF), Bleu profond (#1A3A52)
  - Typographie: Inter Bold pour headings, Inter Regular pour body
  - Espacement: Marges larges (120px entre sections)
  - Bordures: Fines, géométriques
  
- [ ] Appliquer thème Swiss Style comme thème par défaut
  
- [ ] Créer composants visuels spécifiques (optionnel, peut utiliser composants existants avec classes personnalisées):
  - `HeroSection.tsx` - Hero avec image Russ Harris
  - `UrgencyBadge.tsx` - Badge "Places limitées"
  - `AvailabilityBar.tsx` - Barre progression disponibilité

**Estimation: 3-4 jours**

---

### 2. Base de Données - Modèles Événements/Bookings (2-3 jours)
**Créer structure similaire aux subscriptions existantes**

- [ ] Créer modèles SQLAlchemy:
  - `MasterclassEvent` - Événement principal
  - `City` - Villes (Toronto, Vancouver, etc.)
  - `Venue` - Lieux (hôtels, centres)
  - `CityEvent` - Instance événement par ville/date
  - `Booking` - Réservation (similaire à `Subscription` mais pour événement unique)
  - `Attendee` - Participants individuels
  - `Payment` - Transactions (réutiliser modèle existant ou créer similaire)

- [ ] Créer migration Alembic pour tables

- [ ] Créer schemas Pydantic pour validation API

**Estimation: 2-3 jours**

---

### 3. Backend API - Endpoints Bookings (3-4 jours)
**S'inspirer du système subscriptions existant (`/api/v1/subscriptions/`)**

- [ ] Créer endpoints `/api/v1/masterclass/`:
  - `GET /events` - Liste événements
  - `GET /cities` - Villes avec événements
  - `GET /cities/{city_id}/events` - Événements par ville
  - `GET /events/{event_id}/availability` - Disponibilité temps réel

- [ ] Créer endpoints `/api/v1/bookings/` (similaire à `/api/v1/subscriptions/`):
  - `POST /create` - Créer réservation (sans paiement)
  - `GET /{reference}` - Status réservation
  - `POST /{reference}/cancel` - Annuler réservation

- [ ] Créer service `BookingService` (inspiré de `StripeService`):
  - Gérer réservations
  - Calcul disponibilité
  - Générer booking reference

- [ ] Adapter `StripeService` existant pour paiements bookings:
  - Créer PaymentIntent au lieu de Checkout Session (pour paiement unique)
  - Webhook handler pour `payment_intent.succeeded` → confirmer booking

**Estimation: 3-4 jours**

---

### 4. Pages Frontend - Masterclass (4-5 jours)
**Réutiliser composants existants + créer pages spécifiques**

- [ ] **Page Hero/Landing** (`/page.tsx` - modifier l'existant):
  - Utiliser `HeroSection` component
  - Réutiliser `StatsCard` pour statistiques
  - Réutiliser `Button` pour CTA
  
- [ ] **Page About Russ** (`/about-russ/page.tsx`):
  - Réutiliser `Card`, `Heading`, `Text` components
  - Ajouter contenu bio Russ Harris
  
- [ ] **Page Programme** (`/masterclass/page.tsx`):
  - Réutiliser `Card`, `Timeline` components (si existe)
  - Contenu programme détaillé
  
- [ ] **Page Villes & Dates** (`/cities/page.tsx`):
  - Réutiliser `PricingCard` ou créer `CityCard` similaire
  - Grille responsive avec `Grid` component existant
  - `AvailabilityBar` pour disponibilité
  
- [ ] **Page Tarification** (`/pricing/page.tsx` - **DÉJÀ EXISTE!**):
  - Modifier contenu existant (remplacer plans par options masterclass)
  - Réutiliser `PricingCardSimple` existant
  - Réutiliser `FAQItem` pour FAQ
  
- [ ] **Page Témoignages** (`/testimonials/page.tsx`):
  - Réutiliser `Card` components
  - Carousel avec composant carousel existant (ou créer simple)
  
- [ ] **Page FAQ** (`/faq/page.tsx`):
  - Réutiliser `FAQItem` component existant (déjà vu dans pricing)
  - Ajouter questions/réponses masterclass
  
- [ ] **Flux Réservation** (`/book/`):
  - Page sélection ville/date (`/book/page.tsx`)
  - Formulaire réservation (`/book/checkout/page.tsx`) - réutiliser `Form` components
  - Page paiement Stripe (`/book/payment/page.tsx`) - réutiliser logique Stripe existante
  - Page confirmation (`/book/confirmation/page.tsx`)

**Estimation: 4-5 jours**

---

### 5. Adaptation Stripe pour Bookings (2 jours)
**Le système Stripe existe déjà - juste adapter pour paiement unique**

- [ ] Modifier `StripeService` pour supporter PaymentIntent (au lieu de Checkout Session)
  - Paiement unique (pas subscription récurrente)
  
- [ ] Créer endpoint `POST /api/v1/bookings/{booking_id}/create-payment-intent`
  - Créer PaymentIntent Stripe
  - Retourner client_secret pour Stripe Elements
  
- [ ] Adapter webhook Stripe existant (`/webhooks/stripe`):
  - Ajouter handler `payment_intent.succeeded` → confirmer booking
  - Envoyer email confirmation (utiliser `EmailService` existant)

- [ ] Frontend: Créer composant `BookingStripeCheckout` (inspiré de `StripeCheckout` existant)
  - Utiliser Stripe Elements (déjà configuré dans le projet)
  - Intégrer dans page `/book/payment`

**Estimation: 2 jours**

---

### 6. Emails Transactionnels (2 jours)
**Le système SendGrid existe déjà - créer nouveaux templates**

- [ ] Créer templates email dans `EmailTemplates`:
  - `booking_confirmation_email()` - Email confirmation réservation
  - `booking_reminder_30_days()` - Rappel J-30
  - `booking_reminder_14_days()` - Rappel J-14
  - `booking_reminder_7_days()` - Rappel J-7
  - `booking_reminder_1_day()` - Rappel J-1
  - `booking_post_event()` - Post-event avec ressources

- [ ] Créer Celery tasks (inspiré de `email_tasks.py` existant):
  - `send_booking_confirmation_task()`
  - `send_booking_reminder_task()` (générique avec days_until param)

- [ ] Scheduler pour emails rappels (utiliser Celery Beat ou cron):
  - Tâche quotidienne pour vérifier bookings et envoyer rappels

**Estimation: 2 jours**

---

### 7. Contenu & Assets (2-3 jours)
**Ajouter contenu réel du brief**

- [ ] Images:
  - Hero image Russ Harris (1920x1080px)
  - Photos villes (600x400px x 6)
  - Photos témoignages (300x300px x 4-6)
  - Optimiser avec next/image
  
- [ ] Copywriting:
  - Tous les textes selon brief (FR/EN)
  - Ajouter dans fichiers i18n (`messages/fr.json`, `en.json`)
  
- [ ] SEO:
  - Meta tags par page (utiliser système existant)
  - Schema.org Event markup (ajouter dans pages)
  - Sitemap (déjà configuré, juste ajouter nouvelles pages)

**Estimation: 2-3 jours**

---

### 8. Tests & Ajustements (2-3 jours)

- [ ] Tests E2E flux réservation complet (Playwright existant)
- [ ] Tests API endpoints (pytest existant)
- [ ] Tests responsive mobile/tablet/desktop
- [ ] Tests paiements Stripe (test mode)
- [ ] Validation contenu avec client
- [ ] Ajustements UX/UI selon feedback

**Estimation: 2-3 jours**

---

## 📅 Timeline Réaliste (3-4 Semaines)

| Semaine | Jours | Tâches | Priorité |
|---------|-------|--------|----------|
| **Semaine 1** | 5 jours | Design Swiss Style + DB + API Backend | 🔴 Critique |
| **Semaine 2** | 5 jours | Pages Frontend + Flux Réservation | 🔴 Critique |
| **Semaine 3** | 5 jours | Stripe Bookings + Emails + Contenu | 🟡 Haute |
| **Semaine 4** | 5 jours | Tests + Ajustements + Déploiement | 🔴 Critique |

**Total: 20 jours ouvrables (4 semaines)**

---

## 🚀 Commandes de Démarrage Rapide

### 1. Setup Thème Swiss Style (10 minutes)
```bash
# Démarrer app
pnpm dev

# Aller à http://localhost:3000/admin/themes/builder
# Créer nouveau thème "Swiss Style"
# Configurer:
# - primary_color: #000000
# - secondary_color: #FFFFFF
# - accent: #1A3A52
# - font_family: Inter
# - font_weight_heading: 900
# - spacing_section: 120px
# Sauvegarder et activer
```

### 2. Créer Tables DB (30 minutes)
```bash
cd backend

# Créer migration
alembic revision --autogenerate -m "create masterclass tables"

# Vérifier migration générée
# Éditer si nécessaire

# Appliquer migration
alembic upgrade head

# Seed données test (créer script)
python scripts/seed_masterclass_data.py
```

### 3. Créer Pages Frontend (1 jour)
```bash
# Créer structure pages
apps/web/src/app/[locale]/
  ├── about-russ/page.tsx        # Nouveau
  ├── masterclass/page.tsx       # Nouveau
  ├── cities/page.tsx            # Nouveau
  ├── testimonials/page.tsx      # Nouveau
  ├── faq/page.tsx               # Nouveau
  └── book/
      ├── page.tsx               # Nouveau
      ├── checkout/page.tsx      # Nouveau
      └── confirmation/page.tsx  # Nouveau

# Réutiliser composants existants:
# - @/components/ui/Card
# - @/components/ui/Button
# - @/components/ui/Heading
# - @/components/ui/Text
# - @/components/ui/Container
# - @/components/subscriptions/PricingCard
```

### 4. Adapter Stripe pour Bookings (2 jours)
```python
# backend/app/services/stripe_service.py
# Ajouter méthode (s'inspirer de create_checkout_session):

async def create_payment_intent_for_booking(
    self,
    booking: Booking,
    amount: int,  # en cents
    currency: str = "cad"
) -> Dict[str, Any]:
    """Créer PaymentIntent pour réservation unique"""
    try:
        intent = stripe.PaymentIntent.create(
            amount=amount,
            currency=currency.lower(),
            metadata={
                "booking_id": str(booking.id),
                "booking_reference": booking.reference,
            },
        )
        return {
            "client_secret": intent.client_secret,
            "payment_intent_id": intent.id,
        }
    except stripe.StripeError as e:
        logger.error(f"Stripe error: {e}")
        raise
```

---

## 📊 Checklist Simplifiée

### Design
- [ ] Thème Swiss Style créé via ThemeManager
- [ ] Composants spécifiques créés (HeroSection, UrgencyBadge, AvailabilityBar)
- [ ] Responsive mobile/tablet/desktop testé

### Backend
- [ ] Tables DB créées (migrations Alembic)
- [ ] API endpoints `/api/v1/masterclass/*` créés
- [ ] API endpoints `/api/v1/bookings/*` créés
- [ ] Service BookingService créé
- [ ] Stripe PaymentIntent adapté pour bookings
- [ ] Webhooks Stripe configurés

### Frontend
- [ ] Page Hero modifiée
- [ ] Page About Russ créée
- [ ] Page Programme créée
- [ ] Page Villes créée
- [ ] Page Pricing adaptée
- [ ] Page Témoignages créée
- [ ] Page FAQ créée
- [ ] Flux réservation complet (`/book/*`)

### Intégrations
- [ ] Stripe paiement unique fonctionnel
- [ ] Emails confirmation + rappels créés
- [ ] Scheduler emails rappels configuré

### Contenu
- [ ] Images ajoutées et optimisées
- [ ] Copywriting FR/EN complet
- [ ] SEO meta tags par page
- [ ] Schema.org Event markup

### Tests & Déploiement
- [ ] Tests E2E passent
- [ ] Tests API passent
- [ ] Tests paiements (Stripe test mode)
- [ ] Déploiement staging validé
- [ ] Déploiement production

---

## 🎯 Points Clés de Simplification

### ❌ On NE Fait PAS:
- ❌ Créer nouveau design system (réutiliser thème existant)
- ❌ Recréer système Stripe (déjà complet)
- ❌ Recréer système email (SendGrid déjà configuré)
- ❌ Recréer composants UI (270+ existent déjà)
- ❌ Recréer système auth (si pas nécessaire pour site public)
- ❌ Recréer performance optimization (déjà fait)

### ✅ On FAIT:
- ✅ Personnaliser thème existant (ThemeManager UI - 10 min)
- ✅ Adapter Stripe pour paiement unique (au lieu de subscription)
- ✅ Créer nouveaux templates email (SendGrid déjà configuré)
- ✅ Créer pages spécifiques masterclass (réutiliser composants)
- ✅ Ajouter tables DB pour événements/bookings (similaire à subscriptions)
- ✅ Ajouter contenu réel (textes, images)

---

## 💡 Réutilisation Maximale

### Exemple: Page Pricing
**Au lieu de créer:** Nouvelle page pricing from scratch  
**On fait:** Modifier `/pricing/page.tsx` existant
```tsx
// Avant (template SaaS):
const plans = [
  { name: 'Starter', price: 29, ... },
  { name: 'Professional', price: 79, ... },
];

// Après (masterclass):
const options = [
  { name: 'Early Bird', price: 960, ... },  // -20%
  { name: 'Regular', price: 1200, ... },
  { name: 'Group (3+)', price: 1080, ... },  // -10%
];
// Réutiliser PricingCardSimple, BillingPeriodToggle, FAQItem
```

### Exemple: Checkout Stripe
**Au lieu de créer:** Nouveau système checkout  
**On fait:** Adapter `StripeService.create_checkout_session()` pour PaymentIntent
```python
# Avant (subscription):
session = stripe.checkout.Session.create(mode="subscription", ...)

# Après (booking one-time):
intent = stripe.PaymentIntent.create(amount=amount, currency="cad", ...)
# Même logique, juste mode différent!
```

---

## 📈 Estimation Effort Réel

| Tâche | Temps Estimé | Complexité |
|-------|--------------|------------|
| Thème Swiss Style | 0.5 jour | ⭐ Facile (UI ThemeManager) |
| Tables DB + API Backend | 3 jours | ⭐⭐ Moyenne (similaire subscriptions) |
| Pages Frontend | 4 jours | ⭐⭐ Moyenne (réutiliser composants) |
| Adaptation Stripe | 2 jours | ⭐⭐ Moyenne (PaymentIntent vs Session) |
| Emails Templates | 1 jour | ⭐ Facile (SendGrid existe) |
| Contenu & Assets | 2 jours | ⭐ Facile (ajouter textes/images) |
| Tests & Ajustements | 2 jours | ⭐⭐ Moyenne |
| **TOTAL** | **~15 jours** | **Réaliste pour 3 semaines** |

---

## ✅ Validation Plan

**Question:** Est-ce qu'on peut vraiment faire ça en 3-4 semaines?

**Réponse:** OUI, car:
1. ✅ **90% du travail existe déjà** (template complet)
2. ✅ **On adapte, on ne recrée pas** (réutiliser Stripe, SendGrid, composants)
3. ✅ **Structure similaire** (bookings ≈ subscriptions, même pattern)
4. ✅ **Outils déjà en place** (ThemeManager, migration Alembic, etc.)

**Risque:** Timeline pourrait être 4-5 semaines si:
- Besoin de beaucoup de contenu personnalisé
- Changements majeurs design non prévus
- Intégrations supplémentaires requises

---

**Statut:** ✅ Plan réaliste basé sur l'existant  
**Version:** 2.0 (simplifié)  
**Date:** 2025-01-27
