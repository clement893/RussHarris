# 🏗️ Architecture Technique - Site Russ Harris Masterclass

## 📐 Vue d'Ensemble Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND (Next.js 16)                    │
│                      apps/web/src/app/                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  [Hero] → [About] → [Program] → [Cities] → [Pricing] → [FAQ]    │
│     ↓                                                             │
│  [Booking Flow] → [Checkout] → [Confirmation]                   │
│                                                                   │
│  Components: HeroSection, CityCard, BookingForm, StripeCheckout │
│  Design: Swiss International Style (noir/blanc)                  │
│  i18n: FR/EN (next-intl)                                         │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↕ HTTP/REST
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND (FastAPI)                           │
│                      backend/app/api/v1/endpoints/               │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  /api/v1/masterclass/events     → Liste événements              │
│  /api/v1/masterclass/cities     → Villes + événements           │
│  /api/v1/availability/{id}      → Disponibilité temps réel      │
│  /api/v1/bookings/create        → Créer réservation             │
│  /api/v1/payments/create-intent → Créer Stripe PaymentIntent    │
│  /api/v1/webhooks/stripe        → Webhook Stripe                │
│                                                                   │
│  Services:                                                       │
│    - BookingService      → Logique métier réservations          │
│    - AvailabilityService → Calcul spots disponibles              │
│    - PaymentService      → Gestion paiements Stripe             │
│    - EmailService        → Envoi emails (SendGrid)              │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↕ SQL
┌─────────────────────────────────────────────────────────────────┐
│                    BASE DE DONNÉES (PostgreSQL)                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  masterclass_events    → Événements principaux                  │
│  cities                → Villes (Toronto, Vancouver, etc.)      │
│  venues                → Lieux (hôtels, centres conf)           │
│  city_events           → Instances événements par ville         │
│  bookings              → Réservations                           │
│  attendees             → Participants individuels               │
│  payments              → Transactions Stripe                    │
│  email_campaigns       → Historique emails envoyés              │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
                              ↕ API
┌─────────────────────────────────────────────────────────────────┐
│                    SERVICES EXTERNES                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │   Stripe     │  │   SendGrid   │  │ Redis Cache  │          │
│  │  (Paiement)  │  │   (Emails)   │  │ (Disponibilité)         │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐          │
│  │ Google       │  │   Sentry     │  │   Vercel     │          │
│  │ Analytics 4  │  │ (Monitoring) │  │  (Hosting)   │          │
│  └──────────────┘  └──────────────┘  └──────────────┘          │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Flux de Données - Réservation Complète

```
┌─────────────┐
│   USER      │
│  (Browser)  │
└──────┬──────┘
       │
       │ 1. Sélection Ville/Date
       ▼
┌──────────────────────────┐
│  Frontend: Cities Page   │
│  - Affiche villes        │
│  - Disponibilité temps   │
│    réel (polling API)    │
└──────┬───────────────────┘
       │
       │ GET /api/v1/availability/{city_event_id}
       ▼
┌──────────────────────────┐
│  Backend: Availability   │
│  Service                 │
│  - Query DB bookings     │
│  - Calcul: capacity -    │
│    confirmed_bookings    │
│  - Cache Redis (TTL 1m)  │
└──────┬───────────────────┘
       │
       │ Response: { available: 28, total: 30 }
       ▼
┌──────────────────────────┐
│  User: Clic "Réserver"   │
│  → Booking Form Page     │
└──────┬───────────────────┘
       │
       │ 2. Formulaire Réservation
       │    - Nom, Email, Téléphone
       │    - Expérience ACT
       │    - Quantité billets
       │
       │ POST /api/v1/bookings/create
       ▼
┌──────────────────────────┐
│  Backend: BookingService │
│  - Valide données        │
│  - Crée booking (pending)│
│  - Génère reference      │
│  - Calcule prix          │
└──────┬───────────────────┘
       │
       │ Response: { booking_id, reference, total }
       ▼
┌──────────────────────────┐
│  Frontend: Checkout Page │
│  - Affiche récapitulatif │
│  - Intègre Stripe        │
│    Elements              │
└──────┬───────────────────┘
       │
       │ POST /api/v1/payments/create-intent
       ▼
┌──────────────────────────┐
│  Backend: PaymentService │
│  - Crée Stripe           │
│    PaymentIntent         │
│  - Amount: booking.total │
│  - Currency: CAD         │
└──────┬───────────────────┘
       │
       │ Stripe API
       ▼
┌──────────────────────────┐
│      STRIPE              │
│  - PaymentIntent créé    │
│  - client_secret retourné│
└──────┬───────────────────┘
       │
       │ client_secret
       ▼
┌──────────────────────────┐
│  Frontend: Stripe        │
│  Checkout                │
│  - Affiche formulaire    │
│    carte bancaire        │
│  - User entre carte      │
└──────┬───────────────────┘
       │
       │ User: Submit Payment
       ▼
┌──────────────────────────┐
│      STRIPE              │
│  - Traite paiement       │
│  - webhook:              │
│    payment_intent.       │
│    succeeded             │
└──────┬───────────────────┘
       │
       │ POST /api/v1/webhooks/stripe
       ▼
┌──────────────────────────┐
│  Backend: Webhook        │
│  Handler                 │
│  - Vérifie signature     │
│  - Confirme booking      │
│    (status: confirmed)   │
│  - Enregistre payment    │
│  - Trigger email         │
│    confirmation          │
└──────┬───────────────────┘
       │
       │ Email Service → SendGrid
       ▼
┌──────────────────────────┐
│      SENDGRID            │
│  - Envoie email          │
│    confirmation          │
└──────┬───────────────────┘
       │
       │ Frontend: Redirect
       ▼
┌──────────────────────────┐
│  Confirmation Page       │
│  - Booking reference     │
│  - Détails événement     │
│  - Prochaines étapes     │
└──────────────────────────┘
```

---

## 📧 Séquence Email - Timeline

```
┌─────────────────────────────────────────────────────────────┐
│                    TIMELINE EMAIL                            │
└─────────────────────────────────────────────────────────────┘

Booking Confirmed (Day 0)
  │
  ├─► Email 1: Confirmation Immédiate
  │   └─► Reçu + détails pratiques (ville, date, lieu, horaires)
  │
  │
  ├─► Day -30
  │   │
  │   ├─► Email 2: Rappel J-30
  │   └─► Ressources pré-masterclass (documents, checklist)
  │
  │
  ├─► Day -14
  │   │
  │   ├─► Email 3: Agenda Détaillé J-14
  │   └─► Timeline journée + matériel à apporter
  │
  │
  ├─► Day -7
  │   │
  │   ├─► Email 4: Logistique J-7
  │   └─► Hôtel, transport, parking, restaurant
  │
  │
  ├─► Day -1
  │   │
  │   ├─► Email 5: Bienvenue J-1
  │   └─► Horaire final + contacts urgence + WiFi
  │
  │
  └─► Day +1 (Post-Event)
      │
      ├─► Email 6: Accès Ressources + Feedback
      └─► Liens ressources (3 mois) + formulaire feedback
```

**Implémentation:**
- Scheduled tasks (Celery ou background jobs)
- Query bookings: `confirmed_at < (event_date - N days)`
- Envoi via SendGrid API
- Tracking: table `email_campaigns` (sent_at, opened_at, clicked_at)

---

## 🗄️ Modèle de Données - Relations

```
masterclass_events
    │
    ├─► city_events (1:N)
    │       │
    │       ├─► cities (N:1)
    │       ├─► venues (N:1)
    │       └─► bookings (1:N)
    │               │
    │               ├─► attendees (1:N)
    │               └─► payments (1:N)
    │
    └─► [Réutilisé pour multi-événements futurs]
```

**Relations Clés:**
- `city_events` = Instance d'un événement dans une ville spécifique
- `bookings` = Réservation pour un `city_event` spécifique
- `attendees` = Participants individuels (1+ par booking si groupe)
- `payments` = Transactions Stripe (1 payment par booking, peut avoir refund)

---

## 🎨 Architecture Frontend - Structure Composants

```
apps/web/src/
├── app/
│   └── [locale]/
│       ├── page.tsx                    # Hero/Landing
│       ├── about-russ/
│       │   └── page.tsx
│       ├── masterclass/
│       │   └── page.tsx
│       ├── cities/
│       │   ├── page.tsx               # Liste villes
│       │   └── [city]/
│       │       └── page.tsx           # Détail ville
│       ├── pricing/
│       │   └── page.tsx
│       ├── testimonials/
│       │   └── page.tsx
│       ├── faq/
│       │   └── page.tsx
│       └── book/
│           ├── page.tsx               # Sélection ville/date
│           ├── checkout/
│           │   └── page.tsx           # Stripe checkout
│           └── confirmation/
│               └── page.tsx           # Confirmation
│
└── components/
    └── masterclass/
        ├── HeroSection.tsx
        ├── AboutRuss.tsx
        ├── ProgramDetails.tsx
        ├── DayTimeline.tsx
        ├── CitiesGrid.tsx
        ├── CityCard.tsx
        ├── AvailabilityBar.tsx
        ├── PricingTable.tsx
        ├── TestimonialsCarousel.tsx
        ├── FAQAccordion.tsx
        ├── BookingForm.tsx
        ├── CityDateSelector.tsx
        ├── BookingSummary.tsx
        ├── StripeCheckout.tsx
        └── UrgencyBadge.tsx
```

---

## 🔐 Sécurité & Performance

### Sécurité
- ✅ **HTTPS obligatoire** (SSL/TLS)
- ✅ **JWT tokens** pour auth (si nécessaire)
- ✅ **CORS** configuré (frontend origin uniquement)
- ✅ **Input validation** (Zod frontend, Pydantic backend)
- ✅ **SQL injection protection** (SQLAlchemy ORM)
- ✅ **XSS protection** (React auto-escape, DOMPurify si HTML)
- ✅ **CSRF protection** (cookies SameSite, tokens)
- ✅ **Stripe webhook signature** vérification
- ✅ **Rate limiting** API (si nécessaire)
- ✅ **GDPR compliant** (politique confidentialité, consentement)

### Performance
- ✅ **Code splitting** (Next.js automatique)
- ✅ **Image optimization** (next/image, WebP/AVIF)
- ✅ **Font optimization** (next/font, preload)
- ✅ **Caching stratégie:**
  - Static pages: ISR (Incremental Static Regeneration)
  - API routes: Cache headers (availability: 1 min)
  - Images: CDN caching (Vercel)
  - Redis: Cache availability (TTL 1 min)
- ✅ **Database:**
  - Indexes sur colonnes fréquemment query (city_event_id, booking_reference, email)
  - Connection pooling (SQLAlchemy)
  - Query optimization (éviter N+1 queries)
- ✅ **Target Core Web Vitals:**
  - LCP < 2.5s (optimiser hero image)
  - FID < 100ms (réduire JavaScript blocking)
  - CLS < 0.1 (fixer dimensions images)

---

## 📊 Monitoring & Analytics

### Monitoring
- **Sentry:** Error tracking (déjà configuré)
- **UptimeRobot/Pingdom:** Uptime monitoring
- **Email alerts:** Erreurs critiques
- **Logs:** Structured logging (JSON format)

### Analytics
- **Google Analytics 4:**
  - Event tracking: `book_button_clicked`, `form_started`, `payment_completed`
  - Conversion goal: "Booking Confirmed"
  - E-commerce tracking (montant transaction)
- **Facebook Pixel** (optionnel): Retargeting
- **Hotjar** (optionnel): Heatmaps, session replay

### KPIs Tracked
- Taux conversion (visiteurs → acheteurs)
- Nombre billets vendus (par ville)
- Revenu généré
- Cost Per Acquisition (CPA)
- Taux rebond
- Temps moyen sur site
- Email open/click rates

---

## 🚀 Déploiement - Infrastructure

```
┌─────────────────────────────────────────────────────────────┐
│                    PRODUCTION INFRASTRUCTURE                 │
└─────────────────────────────────────────────────────────────┘

Frontend (Next.js)
  │
  └─► Vercel
      - Domain: russharrisact.ca
      - SSL: Automatique
      - CDN: Global Edge Network
      - Build: Automatique (GitHub push)

Backend (FastAPI)
  │
  └─► Railway / Render
      - Domain: api.russharrisact.ca
      - SSL: Automatique
      - Scaling: Auto (selon traffic)
      - Logs: Centralized

Database
  │
  └─► PostgreSQL (Railway)
      - Backups: Automatique (daily)
      - Replication: Optionnel
      - Monitoring: Query performance

Cache (Optionnel)
  │
  └─► Redis (Railway)
      - TTL: 1 minute (availability)
      - Persistence: Optionnel

Services Externes
  │
  ├─► Stripe (Live Mode)
  │   - Webhook URL: api.russharrisact.ca/webhooks/stripe
  │
  ├─► SendGrid
  │   - Domain verified
  │   - Templates: 6 emails
  │
  └─► Google Analytics 4
      - Tracking ID: G-XXXXXXXXXX
```

---

## 🔄 CI/CD Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                    CI/CD WORKFLOW                            │
└─────────────────────────────────────────────────────────────┘

GitHub Push (main branch)
  │
  ├─► GitHub Actions
  │   │
  │   ├─► Tests (Frontend)
  │   │   - Unit tests (Vitest)
  │   │   - E2E tests (Playwright)
  │   │   - Type checking (TypeScript)
  │   │   - Linting (ESLint)
  │   │
  │   ├─► Tests (Backend)
  │   │   - Unit tests (pytest)
  │   │   - API tests (pytest + FastAPI TestClient)
  │   │   - Linting (flake8, black)
  │   │
  │   └─► Build
  │       - Frontend: `pnpm build`
  │       - Backend: Docker build (si nécessaire)
  │
  ├─► Vercel (Frontend)
  │   - Auto deploy main branch
  │   - Preview deployments (PR)
  │   - Lighthouse CI (performance check)
  │
  └─► Railway/Render (Backend)
      - Auto deploy main branch
      - Run migrations (alembic upgrade head)
      - Health check endpoint
```

---

## 📝 Variables d'Environnement

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://api.russharrisact.ca
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FACEBOOK_PIXEL_ID=XXXXXXXXXX (optionnel)
```

### Backend (.env)
```env
DATABASE_URL=postgresql+asyncpg://...
SECRET_KEY=... (32+ chars)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
SENDGRID_API_KEY=SG....
SENDGRID_FROM_EMAIL=noreply@russharrisact.ca
FRONTEND_URL=https://russharrisact.ca
REDIS_URL=redis://... (optionnel)
SENTRY_DSN=https://... (optionnel)
```

---

**Dernière mise à jour:** [Date]  
**Version:** 1.0
