# 📋 Plan d'Implémentation - Site Web Russ Harris Masterclass 2025

## 🎯 Vue d'Ensemble du Projet

**Projet:** Site Web de vente de billets pour le Masterclass Trauma-Focused ACT de Russ Harris  
**Deadline:** 31 janvier 2026  
**Stack Actuel:** Next.js 16, React 19, TypeScript, FastAPI, PostgreSQL, Tailwind CSS  
**Objectif:** Transformer le template existant en site de conversion optimisé pour ventes de billets

---

## 📊 Analyse de l'Existant vs Besoins

### ✅ Ce qui existe déjà (Avantages)
- ✅ Next.js 16 avec App Router (SSR, SEO optimisé)
- ✅ React 19 + TypeScript strict
- ✅ Tailwind CSS avec système de thème avancé
- ✅ i18n configuré (FR/EN) avec next-intl
- ✅ Intégration Stripe (composants billing existants)
- ✅ SendGrid pour emails
- ✅ 270+ composants UI réutilisables
- ✅ Système d'authentification (peut être simplifié pour site public)
- ✅ FastAPI backend avec PostgreSQL
- ✅ Structure monorepo avec Turborepo
- ✅ Performance optimisée (code splitting, image optimization)

### 🔨 Ce qui doit être créé/modifié
- 🆕 Design System Swiss International Style (noir/blanc/minimaliste)
- 🆕 9 pages principales selon le brief
- 🆕 Système de réservation multi-villes avec disponibilité en temps réel
- 🆕 Base de données pour événements, villes, réservations
- 🆕 Backend API pour gestion des billets
- 🆕 Email sequences post-conversion
- 🆕 Analytics et tracking conversion
- 🆕 SEO optimization spécifique événement
- 🆕 Formulaire de réservation avec checkout Stripe

---

## 🏗️ Architecture Technique

### Frontend Structure
```
apps/web/src/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx                    # Hero/Landing (modifié)
│   │   ├── about-russ/                 # À propos (nouveau)
│   │   ├── masterclass/                # Programme détaillé (nouveau)
│   │   ├── cities/                     # Villes & Dates (nouveau)
│   │   │   ├── page.tsx
│   │   │   └── [city]/page.tsx
│   │   ├── pricing/                    # Tarification (existe, à modifier)
│   │   ├── testimonials/               # Témoignages (nouveau)
│   │   ├── faq/                        # FAQ (nouveau)
│   │   ├── book/                       # Réservation (nouveau)
│   │   │   ├── page.tsx                # Sélection ville/date
│   │   │   ├── checkout/               # Checkout Stripe
│   │   │   └── confirmation/           # Confirmation
│   │   └── layout.tsx                  # Layout avec navigation
│   └── api/
│       └── bookings/                   # API routes Next.js
├── components/
│   ├── masterclass/                    # Composants spécifiques
│   │   ├── HeroSection.tsx
│   │   ├── AboutRuss.tsx
│   │   ├── ProgramDetails.tsx
│   │   ├── CitiesGrid.tsx
│   │   ├── CityCard.tsx
│   │   ├── PricingTable.tsx
│   │   ├── TestimonialsCarousel.tsx
│   │   ├── FAQAccordion.tsx
│   │   ├── BookingForm.tsx
│   │   ├── AvailabilityIndicator.tsx
│   │   └── UrgencyBadge.tsx
│   └── ui/                             # Composants existants (réutilisés)
└── lib/
    ├── api/
    │   └── masterclass.ts              # Client API pour masterclass
    └── utils/
        └── booking.ts                  # Utilitaires réservation
```

### Backend Structure (FastAPI)
```
backend/app/
├── api/v1/endpoints/
│   ├── masterclass.py                  # Endpoints événements
│   ├── cities.py                       # Gestion villes
│   ├── bookings.py                     # Gestion réservations
│   ├── payments.py                     # Intégration Stripe webhooks
│   └── email.py                        # Emails transactionnels
├── models/
│   ├── masterclass.py                  # Event, City, Venue
│   ├── booking.py                      # Booking, Ticket, Attendee
│   └── payment.py                      # Payment, Transaction
├── schemas/
│   ├── masterclass.py                  # Pydantic schemas
│   ├── booking.py
│   └── payment.py
└── services/
    ├── booking_service.py              # Logique métier réservations
    ├── availability_service.py         # Calcul disponibilité
    ├── email_service.py                # Envoi emails
    └── payment_service.py              # Gestion paiements Stripe
```

### Base de Données
```sql
-- Tables principales à créer
masterclass_events
  - id, title, description, duration_days, language
  - start_date, end_date (nullable pour multi-dates par ville)
  - created_at, updated_at

cities
  - id, name_en, name_fr, province, country
  - timezone, created_at

venues
  - id, city_id, name, address, postal_code
  - capacity, amenities (JSON), created_at

city_events
  - id, event_id, city_id, venue_id
  - start_date, end_date, start_time, end_time
  - total_capacity, available_spots
  - status (draft, published, sold_out, cancelled)
  - early_bird_deadline, early_bird_price
  - regular_price, group_discount_percentage
  - created_at, updated_at

bookings
  - id, city_event_id, user_id (nullable pour guests)
  - booking_reference (unique), status (pending, confirmed, cancelled)
  - attendee_name, attendee_email, attendee_phone
  - ticket_type (regular, early_bird, group)
  - quantity, subtotal, discount, total
  - payment_status (pending, paid, refunded)
  - payment_method_id (Stripe), payment_intent_id
  - created_at, confirmed_at, cancelled_at

attendees
  - id, booking_id, first_name, last_name, email
  - phone, role, experience_level, dietary_restrictions
  - created_at

payments
  - id, booking_id, payment_intent_id (Stripe)
  - amount, currency, status
  - stripe_charge_id, refund_id (nullable)
  - created_at, refunded_at

email_campaigns
  - id, booking_id, email_type (confirmation, reminder, etc.)
  - sent_at, opened_at, clicked_at
  - created_at
```

---

## 🎨 Design System - Swiss International Style

### Palette de Couleurs
```typescript
// apps/web/src/styles/swiss-theme.css ou tailwind.config.ts
const swissTheme = {
  colors: {
    primary: '#000000',        // Noir - autorité, professionnalisme
    secondary: '#FFFFFF',      // Blanc - clarté, espace
    accent: '#1A3A52',         // Bleu profond - confiance
    accentDark: '#333333',     // Gris foncé - stabilité
    urgent: '#E74C3C',         // Rouge - urgence (CTA)
    success: '#27AE60',        // Vert - confirmation
    muted: '#F5F5F5',          // Gris très clair - backgrounds
    text: '#000000',           // Texte principal
    textMuted: '#666666',      // Texte secondaire
  },
  typography: {
    fontFamily: {
      sans: ['Inter', 'system-ui', 'sans-serif'],
      display: ['Montserrat', 'Inter', 'sans-serif'],
    },
    fontSize: {
      display: ['72px', { lineHeight: '1.1', fontWeight: '900' }],
      h1: ['48px', { lineHeight: '1.2', fontWeight: '700' }],
      h2: ['36px', { lineHeight: '1.3', fontWeight: '600' }],
      h3: ['28px', { lineHeight: '1.4', fontWeight: '600' }],
      body: ['18px', { lineHeight: '1.6', fontWeight: '400' }],
      small: ['16px', { lineHeight: '1.5', fontWeight: '400' }],
      cta: ['20px', { lineHeight: '1.4', fontWeight: '700' }],
    },
  },
  spacing: {
    // Grille 12 colonnes stricte
    grid: '12',
    sectionPadding: '120px',   // Espace blanc généreux
    containerMax: '1280px',
  },
};
```

### Principes de Design
1. **Asymétrie équilibrée** - Utiliser grille mais avec placements asymétriques
2. **Espace blanc généreux** - Marges et padding larges (min 80px entre sections)
3. **Typographie comme design** - Headlines énormes (72px+), hiérarchie forte
4. **Contraste fort** - Noir sur blanc, pas de gris moyens
5. **Pas de décorations** - Pas de gradients, ombres minimales
6. **Lignes géométriques** - Diviseurs horizontaux, alignements précis
7. **Minimalisme** - Un seul CTA par section, focus clair

---

## 📅 Phases d'Implémentation

### PHASE 1: Fondations & Design System (Semaine 1-2)

#### 1.1 Design System Swiss Style
**Priorité:** 🔴 Critique  
**Durée:** 3-4 jours

- [ ] Créer thème Tailwind personnalisé avec couleurs Swiss style
- [ ] Configurer typographie (Inter/Montserrat) avec weights optimisés
- [ ] Créer composants de base réutilisables:
  - [ ] `SwissButton` - Boutons minimalistes noir/blanc
  - [ ] `SwissSection` - Container avec espacement généreux
  - [ ] `SwissHeading` - Headlines avec hiérarchie typographique
  - [ ] `SwissDivider` - Ligne horizontale fine
  - [ ] `SwissCard` - Cards sans ombres, bordures fines
- [ ] Créer layout système avec grille 12 colonnes
- [ ] Setup fonts (Inter, Montserrat) via next/font
- [ ] Tester accessibilité (contraste noir/blanc)

**Livrables:**
- `apps/web/src/styles/swiss-theme.css`
- `apps/web/src/components/ui/swiss/` (nouveaux composants)
- Document de style guide

#### 1.2 Base de Données & Modèles Backend
**Priorité:** 🔴 Critique  
**Durée:** 4-5 jours

- [ ] Créer modèles SQLAlchemy (Event, City, Venue, Booking, etc.)
- [ ] Créer migrations Alembic pour toutes les tables
- [ ] Créer schemas Pydantic pour validation API
- [ ] Setup indexes pour performance (bookings par city_event_id, etc.)
- [ ] Créer seed data pour développement (villes, événements test)
- [ ] Tests unitaires pour modèles et validations

**Livrables:**
- `backend/app/models/masterclass.py`
- `backend/app/models/booking.py`
- `backend/alembic/versions/XXX_create_masterclass_tables.py`
- `backend/app/schemas/masterclass.py`

#### 1.3 API Backend - Endpoints Base
**Priorité:** 🔴 Critique  
**Durée:** 5-6 jours

- [ ] Endpoint `GET /api/v1/masterclass/events` - Liste événements
- [ ] Endpoint `GET /api/v1/masterclass/cities` - Liste villes avec événements
- [ ] Endpoint `GET /api/v1/masterclass/cities/{city_id}/events` - Événements par ville
- [ ] Endpoint `GET /api/v1/masterclass/events/{event_id}/availability` - Disponibilité
- [ ] Endpoint `POST /api/v1/bookings/create` - Créer réservation (sans paiement)
- [ ] Endpoint `GET /api/v1/bookings/{reference}` - Status réservation
- [ ] Service calcul disponibilité (spots disponibles en temps réel)
- [ ] Tests API avec pytest
- [ ] Documentation Swagger

**Livrables:**
- `backend/app/api/v1/endpoints/masterclass.py`
- `backend/app/api/v1/endpoints/bookings.py`
- `backend/app/services/availability_service.py`

---

### PHASE 2: Pages Principales - Frontend (Semaine 3-4)

#### 2.1 Hero/Landing Page
**Priorité:** 🔴 Critique  
**Durée:** 3-4 jours

- [ ] Modifier `apps/web/src/app/[locale]/page.tsx`
- [ ] Hero section full-width avec image/vidéo Russ Harris
- [ ] Headline énorme: "Trauma-Focused ACT Masterclass"
- [ ] Subheading: "Dr. Russ Harris | Canada 2025"
- [ ] Message clé court + CTA prominent "Réserver ma place"
- [ ] Indicateur urgence: "Places limitées - 30 places par ville"
- [ ] Section statistiques (500+ thérapeutes formés, 4.9/5)
- [ ] Ligne graphique horizontale (Swiss style)
- [ ] Scroll animations subtiles (fade-in)
- [ ] Optimisation images (next/image avec priority)
- [ ] Responsive mobile-first

**Composants:**
- `HeroSection.tsx`
- `StatsSection.tsx`
- `UrgencyBadge.tsx`

#### 2.2 Page À propos de Russ Harris
**Priorité:** 🟡 Haute  
**Durée:** 2-3 jours

- [ ] Créer `apps/web/src/app/[locale]/about-russ/page.tsx`
- [ ] Photo professionnelle haute résolution (côté gauche, asymétrique)
- [ ] Bio courte et impactante (4-5 paragraphes)
- [ ] Points clés avec icônes minimalistes
- [ ] Citation inspirante de Russ Harris
- [ ] Logos/affiliations (universités, organisations)
- [ ] Statistiques (nombre thérapeutes formés)
- [ ] CTA vers masterclass

**Composants:**
- `AboutRuss.tsx`
- `BioCard.tsx`
- `AchievementList.tsx`

#### 2.3 Page Programme Masterclass
**Priorité:** 🟡 Haute  
**Durée:** 3-4 jours

- [ ] Créer `apps/web/src/app/[locale]/masterclass/page.tsx`
- [ ] Titre: "Trauma-Focused Acceptance & Commitment Therapy Masterclass"
- [ ] Format: 2 jours intensifs (16 heures)
- [ ] Timeline graphique asymétrique (jour 1, jour 2)
- [ ] Objectifs pédagogiques (5-7 points avec checkmarks)
- [ ] Agenda jour par jour détaillé
- [ ] Méthodologie pédagogique
- [ ] Ressources incluses (manuel, templates, vidéos)
- [ ] Certification/Attestation
- [ ] Langue: Anglais avec note traduction simultanée
- [ ] CTA vers réservation

**Composants:**
- `ProgramDetails.tsx`
- `DayTimeline.tsx`
- `LearningObjectives.tsx`
- `IncludedResources.tsx`

#### 2.4 Page Villes & Dates
**Priorité:** 🔴 Critique  
**Durée:** 4-5 jours

- [ ] Créer `apps/web/src/app/[locale]/cities/page.tsx`
- [ ] Grille 2-3 colonnes responsive avec cartes villes
- [ ] Pour chaque ville:
  - Nom ville + drapeau/province
  - Dates (ex: "15-16 juillet 2025")
  - Lieu (hôtel/venue - nom + adresse)
  - Places disponibles (ex: "28/30 places réservées")
  - Barre progression visuelle (urgence)
  - Badge couleur si presque complet (rouge)
  - Bouton "Réserver pour [Ville]"
- [ ] Images villes optionnelles (CN Tower, etc.)
- [ ] Filtre par date (optionnel)
- [ ] Carte interactive Canada (optionnel, Phase 3)
- [ ] Page détail par ville: `[city]/page.tsx`

**Composants:**
- `CitiesGrid.tsx`
- `CityCard.tsx`
- `AvailabilityBar.tsx`
- `CityDetailPage.tsx`

#### 2.5 Page Tarification
**Priorité:** 🟡 Haute  
**Durée:** 2-3 jours

- [ ] Modifier `apps/web/src/app/[locale]/pricing/page.tsx`
- [ ] Tableau comparatif clair (Prix standard, Early bird, Group)
- [ ] Prix standard: $X (à définir)
- [ ] Early bird: -20% avec deadline
- [ ] Group discount: 10%+ pour 3+ personnes
- [ ] Payment plans: Option 2-3 versements
- [ ] Liste "Ce qui est inclus" avec checkmarks:
  - 16 heures formation
  - Manuel cours (PDF + imprimé)
  - Accès plateforme ressources (3 mois)
  - Certificat participation
  - Lunch & pauses café
  - Réseau pairs (WhatsApp/Discord)
- [ ] CTA "Réserver maintenant" pour chaque option

**Composants:**
- `PricingTable.tsx`
- `PricingCard.tsx`
- `InclusionsList.tsx`

#### 2.6 Page Témoignages
**Priorité:** 🟢 Moyenne  
**Durée:** 2 jours

- [ ] Créer `apps/web/src/app/[locale]/testimonials/page.tsx`
- [ ] Carousel ou grille avec 4-6 témoignages
- [ ] Pour chaque témoignage:
  - Photo participant (300x300px)
  - Nom, titre, ville
  - Citation courte (2-3 lignes max)
  - Évaluation ★★★★★
  - Résultat mesurable (ex: "50% plus de clients aidés")
- [ ] Guillemets typographiques (Swiss style)
- [ ] Photos cohérentes (noir & blanc ou couleur)

**Composants:**
- `TestimonialsCarousel.tsx`
- `TestimonialCard.tsx`

#### 2.7 Page FAQ
**Priorité:** 🟡 Haute  
**Durée:** 2 jours

- [ ] Créer `apps/web/src/app/[locale]/faq/page.tsx`
- [ ] Accordéon (expandable) ou onglets
- [ ] Questions clés:
  - Niveau requis? (Débutant à avancé)
  - En ligne? (Non, in-person uniquement)
  - Pré-requis? (Connaissances basiques ACT)
  - Remboursement? (Politique)
  - Accès ressources après? (Accès 3 mois)
  - Paiement versements? (Oui, options)
  - Langue? (Anglais, traduction simultanée)
- [ ] Design minimaliste, espace blanc généreux
- [ ] Recherche FAQ (optionnel)

**Composants:**
- `FAQAccordion.tsx`
- `FAQItem.tsx`

#### 2.8 Navigation & Footer
**Priorité:** 🔴 Critique  
**Durée:** 2 jours

- [ ] Header sticky avec navigation minimaliste
- [ ] Logo ContextPsy
- [ ] Menu: Accueil, À propos, Programme, Villes, Tarifs, FAQ, Réserver
- [ ] CTA "Réserver ma place" dans header (sticky)
- [ ] Footer avec:
  - Coordonnées contact
  - Liens légaux (CGV, Politique confidentialité)
  - Réseaux sociaux (LinkedIn, Facebook)
  - Logo ContextPsy
  - Copyright
- [ ] Responsive mobile menu (hamburger)

**Composants:**
- `MasterclassHeader.tsx`
- `MasterclassFooter.tsx`

---

### PHASE 3: Système de Réservation & Paiement (Semaine 5-6)

#### 3.1 Flux de Réservation Frontend
**Priorité:** 🔴 Critique  
**Durée:** 5-6 jours

- [ ] Créer `apps/web/src/app/[locale]/book/page.tsx`
  - Sélection ville/date avec disponibilité en temps réel
  - Affichage prix selon date (early bird vs regular)
  - Indicateur urgence si presque complet
- [ ] Formulaire réservation:
  - Nom, Email, Téléphone (requis)
  - Ville préférée (sélectionnée)
  - Expérience ACT (dropdown)
  - Nombre billets (1-10, avec groupe discount si 3+)
  - Option payment plan
- [ ] Validation formulaire (Zod schema)
- [ ] Affichage récapitulatif avant paiement
- [ ] Page confirmation: `book/confirmation/page.tsx`

**Composants:**
- `BookingForm.tsx`
- `BookingSummary.tsx`
- `CityDateSelector.tsx`
- `AttendeeInfoForm.tsx`

#### 3.2 Intégration Stripe Checkout
**Priorité:** 🔴 Critique  
**Durée:** 4-5 jours

- [ ] Configurer Stripe avec clés API
- [ ] Créer endpoint `POST /api/v1/payments/create-intent`
  - Créer PaymentIntent Stripe avec montant
  - Créer booking en status "pending"
  - Retourner client_secret
- [ ] Composant checkout Stripe Elements
  - Formulaire carte bancaire
  - Affichage montant, taxes (si applicable)
  - Option "Enregistrer pour futurs achats"
- [ ] Gérer webhook Stripe:
  - `payment_intent.succeeded` → Confirmer booking, envoyer email confirmation
  - `payment_intent.payment_failed` → Annuler booking, notifier utilisateur
- [ ] Page success: `/book/confirmation?reference=XXX`
- [ ] Page error: `/book/error`
- [ ] Tests paiements avec Stripe test mode

**Composants:**
- `StripeCheckout.tsx`
- `PaymentForm.tsx`

**Backend:**
- `backend/app/api/v1/endpoints/payments.py`
- `backend/app/services/payment_service.py`
- Webhook handler: `backend/app/api/v1/webhooks/stripe.py`

#### 3.3 Gestion Disponibilité Temps Réel
**Priorité:** 🔴 Critique  
**Durée:** 2-3 jours

- [ ] Service backend calcul spots disponibles
  - `total_capacity - confirmed_bookings`
  - Cache Redis pour performance (TTL 1 minute)
- [ ] Endpoint `GET /api/v1/availability/{city_event_id}`
- [ ] Frontend polling ou WebSocket pour mise à jour
- [ ] Indicateur visuel urgence si < 5 places
- [ ] Blocage réservation si sold_out
- [ ] Queue système si plusieurs utilisateurs simultanés

**Backend:**
- `backend/app/services/availability_service.py`
- Redis cache pour availability

---

### PHASE 4: Email Marketing & Automatisation (Semaine 7)

#### 4.1 Séquence Email Post-Conversion
**Priorité:** 🟡 Haute  
**Durée:** 4-5 jours

- [ ] Email 1: Confirmation immédiate
  - Template: Reçu réservation + détails pratiques
  - Déclencheur: PaymentIntent succeeded
  - Contenu: Reference booking, ville/date, lieu, horaires
  
- [ ] Email 2: J-30 (Rappel)
  - Template: Ressources pré-masterclass
  - Déclencheur: 30 jours avant événement
  - Contenu: Documents préparatoires, checklist
  
- [ ] Email 3: J-14 (Agenda détaillé)
  - Template: Agenda + Conseils préparation
  - Déclencheur: 14 jours avant
  - Contenu: Timeline journée, matériel à apporter
  
- [ ] Email 4: J-7 (Logistique)
  - Template: Logistique finale
  - Déclencheur: 7 jours avant
  - Contenu: Hôtel, transport, parking, restaurant
  
- [ ] Email 5: J-1 (Bienvenue)
  - Template: Horaire final + Contacts urgence
  - Déclencheur: 1 jour avant
  - Contenu: Horaires précis, numéro urgence, WiFi venue
  
- [ ] Email 6: Post-masterclass
  - Template: Accès ressources + Feedback
  - Déclencheur: 1 jour après événement
  - Contenu: Liens ressources, formulaire feedback

**Backend:**
- `backend/app/services/email_service.py`
- `backend/app/models/email_campaigns.py`
- Scheduled tasks (Celery ou background jobs)

**Templates:**
- Créer templates SendGrid pour chaque email
- Variables dynamiques: {attendee_name}, {city}, {date}, {reference}

#### 4.2 Lead Generation (Liste d'Attente)
**Priorité:** 🟢 Moyenne  
**Durée:** 2 jours

- [ ] Formulaire "S'inscrire liste d'attente" si événement complet
- [ ] Enregistrement email en base (table `waitlist`)
- [ ] Email automatique confirmation inscription liste
- [ ] Notification admin si place disponible (manuel)

---

### PHASE 5: SEO, Analytics & Performance (Semaine 8)

#### 5.1 SEO Optimization
**Priorité:** 🟡 Haute  
**Durée:** 3-4 jours

- [ ] Meta titles optimisés pour chaque page
  - Homepage: "Russ Harris ACT Masterclass Canada 2025 | Trauma-Focused Training"
  - Cities: "ACT Masterclass [Ville] - Dates & Inscription"
  - etc.
- [ ] Meta descriptions uniques (150-160 caractères)
- [ ] Open Graph tags pour partage social
  - Image OG par page (Russ Harris, ville, etc.)
  - Title, description, type "website"
- [ ] Schema.org markup (Event schema):
  ```json
  {
    "@type": "Event",
    "name": "Trauma-Focused ACT Masterclass",
    "location": {...},
    "startDate": "...",
    "organizer": {...}
  }
  ```
- [ ] Sitemap.xml dynamique avec toutes pages
- [ ] Robots.txt optimisé
- [ ] Structured data pour villes, dates, prix
- [ ] URLs SEO-friendly (`/cities/toronto` vs `/cities/1`)

**Fichiers:**
- `apps/web/src/app/[locale]/sitemap.ts` (modifier)
- `apps/web/src/app/robots.txt/route.ts` (vérifier)
- Composant `StructuredData.tsx`

#### 5.2 Analytics & Tracking
**Priorité:** 🟡 Haute  
**Durée:** 2-3 jours

- [ ] Google Analytics 4 setup
  - Event tracking: "book_button_clicked", "form_started", "payment_completed"
  - Conversion goal: "Booking Confirmed"
  - E-commerce tracking (montant transaction)
- [ ] Facebook Pixel (optionnel, pour retargeting)
- [ ] Hotjar ou similar (heatmaps, session replay)
- [ ] Custom events tracking:
  - CTA clicks
  - Form submissions
  - Page scroll depth
  - Time on page
- [ ] Conversion funnel tracking:
  - Landing → About → Program → Cities → Booking → Payment

#### 5.3 Performance Optimization
**Priorité:** 🔴 Critique  
**Durée:** 3-4 jours

- [ ] Lighthouse audit et optimisation
  - Target: 90+ Performance, Accessibility, Best Practices, SEO
- [ ] Image optimization:
  - Next.js Image component partout
  - WebP/AVIF formats
  - Lazy loading sauf hero
  - Sizes attributes corrects
- [ ] Code splitting:
  - Dynamic imports pour composants lourds (carousel, maps)
  - Route-based splitting automatique
- [ ] Font optimization:
  - Preload fonts critiques (Inter, Montserrat)
  - Font-display: swap
- [ ] Bundle analysis et réduction:
  - Analyser bundle size
  - Retirer dépendances inutiles
- [ ] Caching strategy:
  - Static pages: ISR (Incremental Static Regeneration)
  - API routes: Cache headers appropriés
  - Images: CDN caching
- [ ] Core Web Vitals:
  - LCP < 2.5s (optimiser hero image)
  - FID < 100ms (réduire JavaScript blocking)
  - CLS < 0.1 (fixer dimensions images)

**Tests:**
- `pnpm build` et vérifier bundle size
- Lighthouse CI dans GitHub Actions
- WebPageTest pour analyse approfondie

---

### PHASE 6: Content & Assets (Semaine 9)

#### 6.1 Contenu Multimédia
**Priorité:** 🟡 Haute  
**Durée:** 3-4 jours

**Images nécessaires:**
- [ ] Hero image Russ Harris (1920x1080px, JPG haute qualité)
- [ ] Photos villes (600x400px x 6):
  - Toronto (CN Tower)
  - Vancouver (Stanley Park)
  - Montréal (Mont Royal)
  - Calgary (Calgary Tower)
  - Ottawa (Parliament)
  - Autres villes
- [ ] Photos participants témoignages (300x300px x 4-6)
- [ ] Logo ContextPsy (SVG + PNG)
- [ ] Icônes minimalistes (calendrier, lieu, utilisateurs, certificat)

**Vidéos (optionnel mais recommandé):**
- [ ] Hero video Russ Harris (30-60 secondes)
- [ ] Testimonial videos (15-30 secondes x 3-4)
- [ ] Program overview (2-3 minutes)

**Actions:**
- Créer dossier `apps/web/public/images/masterclass/`
- Optimiser toutes images (compression, formats)
- Créer versions responsive (mobile, tablet, desktop)

#### 6.2 Copywriting & Traductions
**Priorité:** 🟡 Haute  
**Durée:** 3-4 jours

- [ ] Rédiger tous les textes selon tone of voice:
  - Professionnel mais accessible
  - Inspirant et motivant
  - Basé sur science
  - Pas de hype excessif
- [ ] Traductions FR/EN:
  - Utiliser système i18n existant (next-intl)
  - Fichiers: `apps/web/src/i18n/messages/fr.json`, `en.json`
- [ ] Headlines courtes (max 10 mots)
- [ ] Subheadings explicatifs (max 20 mots)
- [ ] Body text: Paragraphes courts (3-4 lignes)
- [ ] CTA: Verbes action clairs
- [ ] Terminologie ACT correcte (vérifier avec expert)

---

### PHASE 7: Tests & QA (Semaine 10)

#### 7.1 Tests Fonctionnels
**Priorité:** 🔴 Critique  
**Durée:** 4-5 jours

- [ ] Tests E2E (Playwright):
  - Parcours complet réservation
  - Flow paiement Stripe (test mode)
  - Multi-villes, multi-dates
  - Formulaires validation
  - Responsive mobile/tablet/desktop
- [ ] Tests d'intégration API:
  - Endpoints masterclass
  - Endpoints booking
  - Webhooks Stripe
- [ ] Tests unitaires composants critiques:
  - `BookingForm`, `StripeCheckout`, `AvailabilityBar`
- [ ] Tests accessibilité (axe-core):
  - Navigation clavier
  - Screen reader
  - Contraste couleurs
  - ARIA labels

#### 7.2 Tests de Charge & Performance
**Priorité:** 🟡 Haute  
**Durée:** 2 jours

- [ ] Load testing (k6 ou similar):
  - 100 utilisateurs simultanés
  - Peak booking period simulation
  - API endpoints performance
- [ ] Database performance:
  - Indexes vérifiés
  - Query optimization
  - Connection pooling
- [ ] Stress testing:
  - Sold-out scenario (concurrent bookings)

#### 7.3 Tests Cross-Browser & Devices
**Priorité:** 🟡 Haute  
**Durée:** 2 jours

- [ ] Browsers: Chrome, Firefox, Safari, Edge
- [ ] Mobile: iOS Safari, Chrome Android
- [ ] Tablets: iPad, Android tablets
- [ ] Résolutions: 1920x1080, 1366x768, 375x667 (mobile)

---

### PHASE 8: Déploiement & Mise en Production (Semaine 11)

#### 8.1 Préparation Production
**Priorité:** 🔴 Critique  
**Durée:** 3-4 jours

- [ ] Variables d'environnement production:
  - Stripe live keys
  - SendGrid production API key
  - Database production URL
  - Frontend URL production
- [ ] Configuration serveurs:
  - Vercel (frontend) ou alternative
  - Railway/Render (backend)
  - PostgreSQL production
  - Redis production (si utilisé)
- [ ] Domain & SSL:
  - Acheter/configurer domaine (ex: russharrisact.ca)
  - SSL certificate (automatique Vercel)
  - DNS configuration
- [ ] Monitoring & Alerts:
  - Sentry error tracking (déjà configuré)
  - Uptime monitoring (UptimeRobot, Pingdom)
  - Email alerts pour erreurs critiques
- [ ] Backup strategy:
  - Database backups automatiques (daily)
  - Backup restoration tests

#### 8.2 Déploiement Staging
**Priorité:** 🔴 Critique  
**Durée:** 2 jours

- [ ] Créer environnement staging (staging.russharrisact.ca)
- [ ] Déployer code staging
- [ ] Tests complets sur staging:
  - Flow réservation complet
  - Paiements Stripe test mode
  - Emails SendGrid
- [ ] Validation client sur staging

#### 8.3 Déploiement Production
**Priorité:** 🔴 Critique  
**Durée:** 2 jours

- [ ] Deploy production (main branch)
- [ ] Migration base de données production
- [ ] Seed données initiales (villes, événements)
- [ ] Vérification post-deploy:
  - Site accessible
  - API fonctionnelle
  - Stripe connecté (live mode)
  - Emails fonctionnels
  - Analytics tracking
- [ ] Smoke tests production

#### 8.4 Documentation & Formation
**Priorité:** 🟢 Moyenne  
**Durée:** 2 jours

- [ ] Documentation technique:
  - Architecture système
  - Guide déploiement
  - Troubleshooting common issues
- [ ] Documentation utilisateur (admin):
  - Comment créer/modifier événements
  - Comment gérer réservations
  - Comment voir analytics
- [ ] Formation équipe ContextPsy:
  - Session formation 2-3 heures
  - Guide rapide référence
- [ ] Handoff documents

---

### PHASE 9: Post-Lancement & Optimisation (Semaine 12+)

#### 9.1 Monitoring Post-Lancement
**Priorité:** 🟡 Haute  
**Durée:** Continue

- [ ] Suivi KPIs quotidien:
  - Taux conversion (visiteurs → acheteurs)
  - Nombre billets vendus
  - Revenu généré
  - Cost Per Acquisition (CPA)
  - Taux rebond
  - Temps moyen sur site
- [ ] Dashboard analytics:
  - Google Analytics dashboard personnalisé
  - Stripe dashboard (revenus)
  - Email open/click rates (SendGrid)
- [ ] Alertes automatiques:
  - Erreurs critiques
  - Baisse conversion soudaine
  - Événements presque complets

#### 9.2 Optimisations Continues
**Priorité:** 🟢 Moyenne  
**Durée:** Continue

- [ ] A/B testing:
  - Headlines différentes
  - CTA variants
  - Pricing display
- [ ] Conversion rate optimization:
  - Analyser parcours utilisateur (Hotjar)
  - Identifier points de friction
  - Tester améliorations
- [ ] Performance monitoring:
  - Core Web Vitals tracking
  - Page load times
  - API response times

#### 9.3 Maintenance
**Priorité:** 🟢 Moyenne  
**Durée:** Continue

- [ ] Mises à jour sécurité:
  - Dependencies updates (semaine)
  - Security patches
- [ ] Contenu updates:
  - Ajouter nouvelles villes si besoin
  - Mettre à jour dates
  - Ajouter nouveaux témoignages
- [ ] Support utilisateurs:
  - Gérer questions/réclamations
  - Support technique réservations

---

## 📐 Architecture Backend Détail

### Modèles de Données (SQLAlchemy)

```python
# backend/app/models/masterclass.py

class MasterclassEvent(Base):
    """Événement masterclass principal"""
    __tablename__ = "masterclass_events"
    
    id = Column(Integer, primary_key=True)
    title_en = Column(String(200), nullable=False)
    title_fr = Column(String(200), nullable=False)
    description_en = Column(Text)
    description_fr = Column(Text)
    duration_days = Column(Integer, default=2)
    language = Column(String(50), default="English")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class City(Base):
    """Villes canadiennes"""
    __tablename__ = "cities"
    
    id = Column(Integer, primary_key=True)
    name_en = Column(String(100), nullable=False)
    name_fr = Column(String(100), nullable=False)
    province = Column(String(50))  # Ontario, BC, Quebec, etc.
    country = Column(String(50), default="Canada")
    timezone = Column(String(50), default="America/Toronto")
    created_at = Column(DateTime, default=datetime.utcnow)

class Venue(Base):
    """Lieux (hôtels, centres de conférence)"""
    __tablename__ = "venues"
    
    id = Column(Integer, primary_key=True)
    city_id = Column(Integer, ForeignKey("cities.id"), nullable=False)
    name = Column(String(200), nullable=False)
    address = Column(String(300))
    postal_code = Column(String(20))
    capacity = Column(Integer, nullable=False)
    amenities = Column(JSON)  # WiFi, parking, restaurant, etc.
    created_at = Column(DateTime, default=datetime.utcnow)

class CityEvent(Base):
    """Instance d'événement dans une ville spécifique"""
    __tablename__ = "city_events"
    
    id = Column(Integer, primary_key=True)
    event_id = Column(Integer, ForeignKey("masterclass_events.id"), nullable=False)
    city_id = Column(Integer, ForeignKey("cities.id"), nullable=False)
    venue_id = Column(Integer, ForeignKey("venues.id"), nullable=False)
    
    start_date = Column(Date, nullable=False)
    end_date = Column(Date, nullable=False)
    start_time = Column(Time, default=time(9, 0))
    end_time = Column(Time, default=time(17, 0))
    
    total_capacity = Column(Integer, nullable=False, default=30)
    available_spots = Column(Integer, nullable=False)  # Calculé dynamiquement
    
    status = Column(
        Enum("draft", "published", "sold_out", "cancelled"),
        default="draft"
    )
    
    # Pricing
    early_bird_deadline = Column(Date)
    early_bird_price = Column(Numeric(10, 2))
    regular_price = Column(Numeric(10, 2), nullable=False)
    group_discount_percentage = Column(Integer, default=10)
    group_minimum = Column(Integer, default=3)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    event = relationship("MasterclassEvent", backref="city_events")
    city = relationship("City", backref="city_events")
    venue = relationship("Venue", backref="city_events")
    bookings = relationship("Booking", back_populates="city_event")

class Booking(Base):
    """Réservation de billet(s)"""
    __tablename__ = "bookings"
    
    id = Column(Integer, primary_key=True)
    city_event_id = Column(Integer, ForeignKey("city_events.id"), nullable=False)
    
    booking_reference = Column(String(20), unique=True, nullable=False, index=True)
    status = Column(
        Enum("pending", "confirmed", "cancelled", "refunded"),
        default="pending"
    )
    
    # Attendee info
    attendee_name = Column(String(200), nullable=False)
    attendee_email = Column(String(200), nullable=False, index=True)
    attendee_phone = Column(String(50))
    
    # Ticket details
    ticket_type = Column(
        Enum("regular", "early_bird", "group"),
        default="regular"
    )
    quantity = Column(Integer, default=1, nullable=False)
    
    # Pricing
    subtotal = Column(Numeric(10, 2), nullable=False)
    discount = Column(Numeric(10, 2), default=0)
    total = Column(Numeric(10, 2), nullable=False)
    
    # Payment
    payment_status = Column(
        Enum("pending", "paid", "failed", "refunded"),
        default="pending"
    )
    payment_intent_id = Column(String(200))  # Stripe PaymentIntent ID
    payment_method_id = Column(String(200))  # Stripe PaymentMethod ID
    
    # Timestamps
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    confirmed_at = Column(DateTime)
    cancelled_at = Column(DateTime)
    
    # Relationships
    city_event = relationship("CityEvent", back_populates="bookings")
    attendees = relationship("Attendee", back_populates="booking", cascade="all, delete-orphan")
    payments = relationship("Payment", back_populates="booking")

class Attendee(Base):
    """Détails individuels de chaque participant"""
    __tablename__ = "attendees"
    
    id = Column(Integer, primary_key=True)
    booking_id = Column(Integer, ForeignKey("bookings.id"), nullable=False)
    
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    email = Column(String(200), nullable=False)
    phone = Column(String(50))
    
    role = Column(String(100))  # Psychologue, thérapeute, coach, etc.
    experience_level = Column(String(50))  # Débutant, Intermédiaire, Avancé
    dietary_restrictions = Column(Text)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Relationships
    booking = relationship("Booking", back_populates="attendees")

class Payment(Base):
    """Transactions de paiement"""
    __tablename__ = "payments"
    
    id = Column(Integer, primary_key=True)
    booking_id = Column(Integer, ForeignKey("bookings.id"), nullable=False)
    
    payment_intent_id = Column(String(200), unique=True, nullable=False, index=True)
    amount = Column(Numeric(10, 2), nullable=False)
    currency = Column(String(3), default="CAD")
    
    status = Column(
        Enum("pending", "succeeded", "failed", "refunded"),
        default="pending"
    )
    
    stripe_charge_id = Column(String(200))
    refund_id = Column(String(200))
    
    created_at = Column(DateTime, default=datetime.utcnow, index=True)
    refunded_at = Column(DateTime)
    
    # Relationships
    booking = relationship("Booking", back_populates="payments")
```

### API Endpoints Principaux

```python
# backend/app/api/v1/endpoints/masterclass.py

@router.get("/events", response_model=List[EventSchema])
async def list_events():
    """Liste tous les événements masterclass"""
    pass

@router.get("/cities", response_model=List[CityWithEventsSchema])
async def list_cities_with_events():
    """Liste villes avec leurs événements"""
    pass

@router.get("/cities/{city_id}/events", response_model=List[CityEventSchema])
async def get_city_events(city_id: int):
    """Événements pour une ville spécifique"""
    pass

@router.get("/events/{event_id}/availability")
async def get_availability(event_id: int):
    """Disponibilité en temps réel pour un événement"""
    pass

# backend/app/api/v1/endpoints/bookings.py

@router.post("/bookings/create", response_model=BookingResponseSchema)
async def create_booking(booking_data: CreateBookingSchema):
    """Créer une réservation (sans paiement)"""
    pass

@router.get("/bookings/{reference}", response_model=BookingSchema)
async def get_booking(reference: str):
    """Récupérer statut d'une réservation"""
    pass

@router.post("/bookings/{reference}/cancel")
async def cancel_booking(reference: str):
    """Annuler une réservation"""
    pass

# backend/app/api/v1/endpoints/payments.py

@router.post("/payments/create-intent")
async def create_payment_intent(booking_id: int):
    """Créer Stripe PaymentIntent"""
    pass

@router.post("/webhooks/stripe")
async def stripe_webhook(request: Request):
    """Webhook Stripe pour événements paiement"""
    pass
```

---

## 🎨 Composants Frontend Clés

### HeroSection.tsx
```tsx
// Swiss International Style Hero
export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 bg-black">
        <Image
          src="/images/russ-harris-hero.jpg"
          alt="Russ Harris"
          fill
          priority
          className="object-cover opacity-40"
        />
      </div>
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl">
          <h1 className="text-7xl md:text-8xl font-black text-white mb-6 leading-tight">
            Trauma-Focused<br />ACT Masterclass
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 mb-8 font-light">
            Dr. Russ Harris | Canada 2025
          </p>
          <p className="text-lg text-white/80 mb-12 max-w-2xl">
            2 jours intensifs pour transformer votre pratique
          </p>
          <div className="flex gap-4 items-center">
            <Button size="lg" variant="primary" className="bg-white text-black hover:bg-gray-100">
              Réserver ma place
            </Button>
            <UrgencyBadge>Places limitées - 30 places par ville</UrgencyBadge>
          </div>
        </div>
      </div>
    </section>
  );
}
```

### CityCard.tsx
```tsx
export default function CityCard({ city, event }: Props) {
  const availability = event.available_spots / event.total_capacity;
  const isAlmostFull = availability < 0.2; // < 20% disponible
  
  return (
    <Card className="border border-black">
      <div className="aspect-video relative mb-4">
        <Image src={city.image_url} alt={city.name} fill className="object-cover" />
      </div>
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold mb-2">{city.name_fr}</h3>
        <p className="text-muted mb-4">{formatDate(event.start_date)} - {formatDate(event.end_date)}</p>
        <p className="text-sm mb-4">{event.venue.name}</p>
        
        <div className="mb-4">
          <AvailabilityBar available={event.available_spots} total={event.total_capacity} />
          <p className="text-sm mt-2">
            {event.available_spots}/{event.total_capacity} places disponibles
          </p>
        </div>
        
        {isAlmostFull && (
          <Badge variant="destructive" className="mb-4">Presque complet</Badge>
        )}
        
        <Button className="w-full bg-black text-white">
          Réserver pour {city.name_fr}
        </Button>
      </CardContent>
    </Card>
  );
}
```

---

## 📊 Checklist Complète de Livraison

### Design & UX
- [ ] Design system Swiss style implémenté
- [ ] Typographie (Inter/Montserrat) configurée
- [ ] Palette couleurs (noir/blanc) appliquée
- [ ] Responsive mobile/tablet/desktop testé
- [ ] Accessibilité WCAG 2.1 AA validée
- [ ] Animations subtiles implémentées

### Pages Frontend
- [ ] Hero/Landing page complète
- [ ] Page À propos Russ Harris
- [ ] Page Programme masterclass
- [ ] Page Villes & Dates (liste + détail)
- [ ] Page Tarification
- [ ] Page Témoignages
- [ ] Page FAQ
- [ ] Flux réservation (sélection → formulaire → paiement → confirmation)
- [ ] Navigation & Footer

### Backend & API
- [ ] Modèles base de données créés
- [ ] Migrations Alembic appliquées
- [ ] API endpoints masterclass fonctionnels
- [ ] API endpoints booking fonctionnels
- [ ] API endpoints paiement Stripe fonctionnels
- [ ] Webhooks Stripe configurés
- [ ] Service disponibilité temps réel
- [ ] Service email (SendGrid) configuré
- [ ] Séquence emails automatiques

### Intégrations
- [ ] Stripe checkout intégré (test + live)
- [ ] SendGrid emails transactionnels
- [ ] Google Analytics 4 tracking
- [ ] Facebook Pixel (optionnel)
- [ ] Schema.org markup (Event)
- [ ] Open Graph tags

### SEO & Performance
- [ ] Meta tags optimisés toutes pages
- [ ] Sitemap.xml généré
- [ ] Robots.txt configuré
- [ ] Images optimisées (WebP/AVIF)
- [ ] Lighthouse score 90+
- [ ] Core Web Vitals optimisés (LCP < 2.5s, FID < 100ms, CLS < 0.1)

### Tests & QA
- [ ] Tests E2E (Playwright) passent
- [ ] Tests API (pytest) passent
- [ ] Tests unitaires composants critiques
- [ ] Tests cross-browser validés
- [ ] Tests mobile devices validés
- [ ] Tests de charge effectués

### Déploiement
- [ ] Environnement staging déployé
- [ ] Tests staging validés
- [ ] Production déployée
- [ ] Domain & SSL configurés
- [ ] Monitoring & alertes actifs
- [ ] Backups automatiques configurés

### Documentation
- [ ] Documentation technique complète
- [ ] Guide admin (gestion événements/réservations)
- [ ] Guide utilisateur (équipe ContextPsy)
- [ ] Formation équipe effectuée

### Post-Lancement
- [ ] Dashboard analytics configuré
- [ ] KPIs tracking actif
- [ ] Support utilisateurs prêt
- [ ] Plan maintenance établi

---

## ⏱️ Timeline Résumé (12 Semaines)

| Semaine | Phase | Priorité | Livrables Clés |
|---------|-------|----------|----------------|
| 1-2 | Fondations & Design System | 🔴 | Thème Swiss, DB, API base |
| 3-4 | Pages Principales | 🔴 | 8 pages frontend complètes |
| 5-6 | Réservation & Paiement | 🔴 | Flow complet booking + Stripe |
| 7 | Email Marketing | 🟡 | Séquence 6 emails automatiques |
| 8 | SEO & Performance | 🟡 | Lighthouse 90+, SEO optimisé |
| 9 | Content & Assets | 🟡 | Images, vidéos, copywriting |
| 10 | Tests & QA | 🔴 | Tests complets, validation |
| 11 | Déploiement | 🔴 | Production live |
| 12+ | Post-Lancement | 🟢 | Monitoring, optimisations |

---

## 🚀 Commandes de Démarrage Rapide

### Setup Initial
```bash
# 1. Installer dépendances
pnpm install

# 2. Setup backend
cd backend
python -m venv venv
source venv/bin/activate  # ou `venv\Scripts\activate` sur Windows
pip install -r requirements.txt

# 3. Setup database
alembic upgrade head

# 4. Seed données test
python scripts/seed_masterclass_data.py

# 5. Démarrer dev
pnpm dev  # Frontend
# Terminal séparé:
cd backend && uvicorn app.main:app --reload  # Backend
```

### Commandes Utiles
```bash
# Tests
pnpm test              # Tests unitaires
pnpm test:e2e          # Tests E2E
cd backend && pytest   # Tests backend

# Build
pnpm build             # Build production
pnpm analyze           # Analyse bundle size

# Database
cd backend
alembic revision --autogenerate -m "description"
alembic upgrade head

# Linting
pnpm lint
pnpm type-check
```

---

## 📞 Points d'Attention & Risques

### Risques Identifiés
1. **Disponibilité images/vidéos Russ Harris** - S'assurer droits d'utilisation
2. **Prix final non défini** - Nécessite validation client avant implémentation pricing
3. **Dates événements** - Peuvent changer, système doit être flexible
4. **Stripe account** - S'assurer compte Stripe Canada configuré (CAD)
5. **SendGrid domain verification** - Nécessite vérification domaine pour emails transactionnels
6. **Concurrent bookings** - Gérer race conditions si plusieurs réservations simultanées

### Décisions Techniques Pending
- [ ] Choix hosting final (Vercel vs autre pour frontend)
- [ ] Redis nécessaire pour cache ou in-memory suffit?
- [ ] CMS optionnel pour gestion contenu (Strapi, Contentful)?
- [ ] Vidéo hosting (YouTube embed vs self-hosted)?

---

## 🎯 KPIs de Succès

### Métriques Primaires
- ✅ Taux conversion: **5-10%** (visiteurs → acheteurs)
- ✅ Billets vendus: **200+** (6 villes × 30 places minimum)
- ✅ Revenu: **$240,000+** (à $1,200/billet)
- ✅ CPA: **< $100**

### Métriques Secondaires
- ✅ Taux rebond: **< 40%**
- ✅ Temps moyen site: **> 3 minutes**
- ✅ Email captures: **500+ leads**
- ✅ Lighthouse Performance: **90+**
- ✅ Avis/Ratings: **4.5+ étoiles**

---

## 📚 Ressources & Références

### Design Inspirations
- Swiss International Style: Dribbble, Awwwards
- Event websites: Behance event designs
- Minimalist e-commerce: Stripe, Linear websites

### Documentation Technique
- [Next.js 16 Docs](https://nextjs.org/docs)
- [Stripe Checkout](https://stripe.com/docs/payments/checkout)
- [SendGrid API](https://docs.sendgrid.com/api-reference)
- [Schema.org Event](https://schema.org/Event)

### Contenu Russ Harris
- Site officiel (à obtenir)
- Livres: "The Happiness Trap", "ACT Made Simple"
- Videos: TED talks, YouTube channel

---

**Dernière mise à jour:** [Date]  
**Version:** 1.0  
**Statut:** Plan initial complet - Prêt pour implémentation
