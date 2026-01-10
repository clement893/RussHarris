# 📊 Suivi des Batches - Site Russ Harris Masterclass

## 🎯 Vue d'Ensemble

**Projet:** Site Russ Harris Masterclass Canada 2025  
**Date de début:** [À remplir]  
**Date de fin prévue:** [À remplir]  
**Durée estimée totale:** 3-4 semaines

---

## 📋 Statut Global

| Batch | Nom | Statut | Durée Estimée | Durée Réelle | Date Début | Date Fin | Bloqueurs |
|-------|-----|--------|---------------|--------------|------------|----------|-----------|
| 1 | Setup & Configuration | 🔴 À faire | 0.5 j | - | - | - | - |
| 2 | Database & Modèles | 🔴 À faire | 1.5 j | - | - | - | - |
| 3 | API Backend | 🔴 À faire | 2 j | - | - | - | - |
| 4 | Design System Swiss | 🔴 À faire | 1 j | - | - | - | - |
| 5 | Pages Frontend | 🔴 À faire | 2 j | - | - | - | - |
| 6 | Système Réservation | 🔴 À faire | 1.5 j | - | - | - | - |
| 7 | Stripe Bookings | 🔴 À faire | 1.5 j | - | - | - | - |
| 8 | Emails Transactionnels | 🔴 À faire | 1.5 j | - | - | - | - |
| 9 | Contenu & Assets | 🔴 À faire | 1 j | - | - | - | - |
| 10 | Tests & Finalisation | 🔴 À faire | 2 j | - | - | - | - |

**Légende:**
- 🟢 **Terminé** - Batch complété et validé
- 🟡 **En cours** - Batch en développement
- 🔴 **À faire** - Batch pas encore commencé
- ⚠️ **Bloqué** - Batch bloqué par dépendance/bug

**Progression:** 0/10 batches (0%)

---

## 📦 Détails par Batch

### BATCH 1: Setup & Configuration de Base ⚙️

**Statut:** 🔴 À faire  
**Priorité:** 🔴 Critique  
**Durée:** 0.5 jour  
**Assigné à:** [À remplir]

#### ✅ Checklist

- [ ] Créer structure dossiers pour masterclass
  - `apps/web/src/components/masterclass/`
  - `apps/web/src/app/[locale]/about-russ/`
  - `apps/web/src/app/[locale]/masterclass/`
  - `apps/web/src/app/[locale]/cities/`
  - `apps/web/src/app/[locale]/testimonials/`
  - `apps/web/src/app/[locale]/faq/`
  - `apps/web/src/app/[locale]/book/`
  - `backend/app/models/masterclass.py`
  - `backend/app/api/v1/endpoints/masterclass.py`
  - `backend/app/services/booking_service.py`

- [ ] Configurer variables d'environnement
  - `STRIPE_SECRET_KEY` (vérifier existe)
  - `STRIPE_WEBHOOK_SECRET` (vérifier existe)
  - `SENDGRID_API_KEY` (vérifier existe)
  - `SENDGRID_FROM_EMAIL` (vérifier existe)
  - `DATABASE_URL` (vérifier existe)

- [ ] Créer fichiers utilitaires
  - `backend/scripts/seed_masterclass_data.py`
  - `backend/scripts/check_bookings.py` (optionnel)

- [ ] Vérifier dépendances
  - [ ] Stripe SDK installé
  - [ ] SendGrid SDK installé
  - [ ] SQLAlchemy configuré
  - [ ] Alembic configuré

#### 📝 Notes

#### 🔗 Fichiers Créés/Modifiés

---

### BATCH 2: Base de Données & Modèles Backend 🗄️

**Statut:** 🔴 À faire  
**Priorité:** 🔴 Critique  
**Durée:** 1.5 jours  
**Dépend de:** Batch 1

#### ✅ Checklist

- [ ] Modèle `MasterclassEvent`
  - [ ] Table SQLAlchemy créée
  - [ ] Colonnes: id, title_en, title_fr, description_en, description_fr, duration_days, language
  - [ ] Relations configurées
  - [ ] Tests unitaires

- [ ] Modèle `City`
  - [ ] Table SQLAlchemy créée
  - [ ] Colonnes: id, name_en, name_fr, province, country, timezone
  - [ ] Tests unitaires

- [ ] Modèle `Venue`
  - [ ] Table SQLAlchemy créée
  - [ ] Colonnes: id, city_id, name, address, postal_code, capacity, amenities (JSON)
  - [ ] Foreign key vers City
  - [ ] Tests unitaires

- [ ] Modèle `CityEvent`
  - [ ] Table SQLAlchemy créée
  - [ ] Colonnes: id, event_id, city_id, venue_id, start_date, end_date, start_time, end_time, total_capacity, available_spots, status, early_bird_deadline, early_bird_price, regular_price, group_discount_percentage
  - [ ] Foreign keys configurés
  - [ ] Indexes créés (status, city_id)
  - [ ] Tests unitaires

- [ ] Modèle `Booking`
  - [ ] Table SQLAlchemy créée
  - [ ] Colonnes: id, city_event_id, booking_reference (unique), status, attendee_name, attendee_email, attendee_phone, ticket_type, quantity, subtotal, discount, total, payment_status, payment_intent_id, created_at, confirmed_at
  - [ ] Foreign key vers CityEvent
  - [ ] Index sur booking_reference, attendee_email
  - [ ] Tests unitaires

- [ ] Modèle `Attendee`
  - [ ] Table SQLAlchemy créée
  - [ ] Colonnes: id, booking_id, first_name, last_name, email, phone, role, experience_level, dietary_restrictions
  - [ ] Foreign key vers Booking
  - [ ] Tests unitaires

- [ ] Modèle `BookingPayment`
  - [ ] Table SQLAlchemy créée
  - [ ] Colonnes: id, booking_id, payment_intent_id (unique), amount, currency, status, stripe_charge_id, refund_id, created_at, refunded_at
  - [ ] Foreign key vers Booking
  - [ ] Index sur payment_intent_id
  - [ ] Tests unitaires

- [ ] Migration Alembic
  - [ ] `alembic revision --autogenerate -m "create masterclass tables"`
  - [ ] Vérifier migration générée
  - [ ] Appliquer migration: `alembic upgrade head`
  - [ ] Rollback test: `alembic downgrade -1` puis `alembic upgrade head`

- [ ] Schemas Pydantic
  - [ ] `EventSchema`, `EventCreateSchema`
  - [ ] `CitySchema`, `CityWithEventsSchema`
  - [ ] `VenueSchema`
  - [ ] `CityEventSchema`, `CityEventCreateSchema`
  - [ ] `BookingSchema`, `BookingCreateSchema`, `BookingResponseSchema`
  - [ ] `AttendeeSchema`, `AttendeeCreateSchema`
  - [ ] `PaymentSchema`

- [ ] Seed data script
  - [ ] Villes canadiennes (Toronto, Vancouver, Montréal, Calgary, Ottawa)
  - [ ] Venues par ville
  - [ ] Événements masterclass
  - [ ] CityEvents avec dates
  - [ ] Script exécutable: `python scripts/seed_masterclass_data.py`

#### 📝 Notes

#### 🔗 Fichiers Créés/Modifiés
- [ ] `backend/app/models/masterclass.py`
- [ ] `backend/app/models/booking.py`
- [ ] `backend/alembic/versions/XXX_create_masterclass_tables.py`
- [ ] `backend/app/schemas/masterclass.py`
- [ ] `backend/app/schemas/booking.py`
- [ ] `backend/scripts/seed_masterclass_data.py`

#### ✅ Validation
- [ ] Migration appliquée sans erreur
- [ ] Seed data fonctionne
- [ ] Tests unitaires passent (coverage > 80%)

---

### BATCH 3: API Backend Endpoints 🔌

**Statut:** 🔴 À faire  
**Priorité:** 🔴 Critique  
**Durée:** 2 jours  
**Dépend de:** Batch 2

#### ✅ Checklist

- [ ] Endpoint `GET /api/v1/masterclass/events`
  - [ ] Liste tous les événements
  - [ ] Pagination (optionnel)
  - [ ] Tests unitaires
  - [ ] Documentation Swagger

- [ ] Endpoint `GET /api/v1/masterclass/cities`
  - [ ] Liste villes avec leurs événements
  - [ ] Include upcoming events seulement
  - [ ] Tests unitaires
  - [ ] Documentation Swagger

- [ ] Endpoint `GET /api/v1/masterclass/cities/{city_id}/events`
  - [ ] Événements pour ville spécifique
  - [ ] Filtre par statut (published seulement)
  - [ ] Tests unitaires
  - [ ] Documentation Swagger

- [ ] Endpoint `GET /api/v1/masterclass/events/{event_id}`
  - [ ] Détails événement complet
  - [ ] Include city, venue info
  - [ ] Tests unitaires
  - [ ] Documentation Swagger

- [ ] Endpoint `GET /api/v1/masterclass/events/{event_id}/availability`
  - [ ] Disponibilité temps réel (available_spots)
  - [ ] Status (available, almost_full, sold_out)
  - [ ] Cache Redis (optionnel, TTL 1 min)
  - [ ] Tests unitaires
  - [ ] Documentation Swagger

- [ ] Endpoint `POST /api/v1/bookings/create`
  - [ ] Créer réservation (status: pending)
  - [ ] Validation données (Zod/Pydantic)
  - [ ] Générer booking_reference unique
  - [ ] Calculer prix (early bird vs regular, group discount)
  - [ ] Tests unitaires
  - [ ] Documentation Swagger

- [ ] Endpoint `GET /api/v1/bookings/{reference}`
  - [ ] Status réservation par reference
  - [ ] Include city_event, attendees, payment info
  - [ ] Tests unitaires
  - [ ] Documentation Swagger

- [ ] Endpoint `POST /api/v1/bookings/{reference}/cancel`
  - [ ] Annuler réservation
  - [ ] Vérifier status (seulement pending ou confirmed)
  - [ ] Libérer spots (available_spots++)
  - [ ] Si payment fait → initier refund Stripe
  - [ ] Tests unitaires
  - [ ] Documentation Swagger

- [ ] Service `BookingService`
  - [ ] Méthode `create_booking()`
  - [ ] Méthode `get_booking_by_reference()`
  - [ ] Méthode `cancel_booking()`
  - [ ] Méthode `calculate_price()`
  - [ ] Méthode `generate_booking_reference()`
  - [ ] Tests unitaires

- [ ] Service `AvailabilityService`
  - [ ] Méthode `calculate_available_spots()`
  - [ ] Méthode `is_almost_full()` (< 20% disponible)
  - [ ] Méthode `is_sold_out()`
  - [ ] Cache Redis (optionnel)
  - [ ] Tests unitaires

#### 📝 Notes

#### 🔗 Fichiers Créés/Modifiés
- [ ] `backend/app/api/v1/endpoints/masterclass.py`
- [ ] `backend/app/api/v1/endpoints/bookings.py`
- [ ] `backend/app/services/booking_service.py`
- [ ] `backend/app/services/availability_service.py`
- [ ] Tests: `backend/tests/api/test_masterclass.py`
- [ ] Tests: `backend/tests/api/test_bookings.py`

#### ✅ Validation
- [ ] Tous endpoints retournent 200/201 pour cas succès
- [ ] Gestion erreurs (400, 404, 500)
- [ ] Tests API passent (coverage > 80%)
- [ ] Swagger documentation accessible sur `/docs`
- [ ] Performance: endpoints < 500ms (sans cache)

---

### BATCH 4: Design System Swiss Style 🎨

**Statut:** 🔴 À faire  
**Priorité:** 🟡 Haute  
**Durée:** 1 jour  
**Dépend de:** Batch 1

#### ✅ Checklist

- [ ] Configurer thème Swiss Style dans Tailwind
  - [ ] Palette couleurs: Noir (#000000), Blanc (#FFFFFF), Bleu (#1A3A52)
  - [ ] Couleur urgence: Rouge (#E74C3C)
  - [ ] Couleur succès: Vert (#27AE60)
  - [ ] Modifier `tailwind.config.ts` ou créer `swiss-theme.css`

- [ ] Typographie
  - [ ] Inter Bold 900 pour headings (display, h1)
  - [ ] Inter SemiBold 600 pour h2, h3
  - [ ] Inter Regular 400 pour body
  - [ ] Inter Bold 700 pour CTA
  - [ ] Tailles: display 72px, h1 48px, h2 36px, h3 28px, body 18px, cta 20px

- [ ] Espacement
  - [ ] Marges larges: 120px entre sections
  - [ ] Padding généreux: 80px containers
  - [ ] Grille 12 colonnes stricte

- [ ] Composant `HeroSection.tsx`
  - [ ] Full-width hero avec image/vidéo
  - [ ] Headline énorme (72px+)
  - [ ] Overlay sombre sur image
  - [ ] CTA prominent
  - [ ] Responsive mobile/tablet/desktop

- [ ] Composant `UrgencyBadge.tsx`
  - [ ] Badge "Places limitées"
  - [ ] Variants: warning (jaune), danger (rouge si < 5 places)
  - [ ] Animation pulse subtile (optionnel)

- [ ] Composant `AvailabilityBar.tsx`
  - [ ] Barre progression visuelle
  - [ ] Couleur selon disponibilité (vert > 20%, jaune 10-20%, rouge < 10%)
  - [ ] Texte "X/Y places disponibles"
  - [ ] Responsive

- [ ] Composant `SwissDivider.tsx`
  - [ ] Ligne horizontale fine (1px)
  - [ ] Couleur noir/gris
  - [ ] Variants: full-width, container-width

- [ ] Composant `SwissCard.tsx`
  - [ ] Card minimaliste (pas d'ombres)
  - [ ] Bordure fine (1px)
  - [ ] Padding généreux
  - [ ] Hover effect subtil (optionnel)

#### 📝 Notes

#### 🔗 Fichiers Créés/Modifiés
- [ ] `apps/web/src/styles/swiss-theme.css` (ou `tailwind.config.ts`)
- [ ] `apps/web/src/components/masterclass/HeroSection.tsx`
- [ ] `apps/web/src/components/masterclass/UrgencyBadge.tsx`
- [ ] `apps/web/src/components/masterclass/AvailabilityBar.tsx`
- [ ] `apps/web/src/components/masterclass/SwissDivider.tsx`
- [ ] `apps/web/src/components/masterclass/SwissCard.tsx`
- [ ] `apps/web/src/components/masterclass/index.ts` (exports)

#### ✅ Validation
- [ ] Thème Swiss Style appliqué visuellement
- [ ] Composants rendent correctement
- [ ] Responsive mobile/tablet/desktop fonctionne
- [ ] Accessibilité: contraste noir/blanc conforme WCAG AA

---

### BATCH 5: Pages Frontend Principales 📄

**Statut:** 🔴 À faire  
**Priorité:** 🔴 Critique  
**Durée:** 2 jours  
**Dépend de:** Batch 3, Batch 4

#### ✅ Checklist

- [ ] Page Hero/Landing (`/page.tsx`)
  - [ ] Modifier page existante
  - [ ] Utiliser HeroSection component
  - [ ] Stats section (500+ thérapeutes, 4.9/5)
  - [ ] CTA "Réserver ma place" prominent
  - [ ] UrgencyBadge "Places limitées"
  - [ ] Scroll animations subtiles (fade-in)

- [ ] Page About Russ (`/about-russ/page.tsx`)
  - [ ] Photo professionnelle Russ Harris (côté gauche, asymétrique)
  - [ ] Bio courte impactante (4-5 paragraphes)
  - [ ] Points clés avec icônes minimalistes
  - [ ] Citation inspirante Russ Harris
  - [ ] Logos/affiliations (universités, organisations)
  - [ ] Statistiques (thérapeutes formés)
  - [ ] CTA vers masterclass

- [ ] Page Programme (`/masterclass/page.tsx`)
  - [ ] Titre: "Trauma-Focused Acceptance & Commitment Therapy Masterclass"
  - [ ] Format: 2 jours intensifs (16 heures)
  - [ ] Langue: Anglais (note traduction simultanée)
  - [ ] Timeline graphique asymétrique (Jour 1, Jour 2)
  - [ ] Objectifs pédagogiques (5-7 points avec checkmarks)
  - [ ] Agenda jour par jour détaillé
  - [ ] Méthodologie pédagogique
  - [ ] Ressources incluses (manuel, templates, vidéos)
  - [ ] Certification/Attestation
  - [ ] CTA vers réservation

- [ ] Page Villes (`/cities/page.tsx`)
  - [ ] Grille 2-3 colonnes responsive
  - [ ] CityCard pour chaque ville
  - [ ] Disponibilité temps réel (via API)
  - [ ] Filtre par date (optionnel)
  - [ ] Trier par disponibilité (optionnel)

- [ ] Page détail ville (`/cities/[city]/page.tsx`)
  - [ ] Détails ville spécifique
  - [ ] Dates disponibles avec availability
  - [ ] Venue information (nom, adresse, capacité)
  - [ ] Carte Google Maps (optionnel)
  - [ ] CTA "Réserver pour [Ville]"

- [ ] Page Pricing (`/pricing/page.tsx`)
  - [ ] Modifier page existante
  - [ ] Options: Early Bird (-20%), Regular, Group (3+)
  - [ ] Tableau comparatif ou cards
  - [ ] Liste "Ce qui est inclus" avec checkmarks:
    - 16 heures formation
    - Manuel cours (PDF + imprimé)
    - Accès plateforme ressources (3 mois)
    - Certificat participation
    - Lunch & pauses café
    - Réseau pairs (WhatsApp/Discord)
  - [ ] FAQ intégré (réutiliser FAQItem)
  - [ ] CTA "Réserver maintenant"

- [ ] Page Témoignages (`/testimonials/page.tsx`)
  - [ ] Carousel ou grille avec 4-6 témoignages
  - [ ] Pour chaque témoignage:
    - Photo participant (300x300px)
    - Nom, titre, ville
    - Citation courte (2-3 lignes max)
    - Évaluation ★★★★★
    - Résultat mesurable
  - [ ] Guillemets typographiques (Swiss style)

- [ ] Page FAQ (`/faq/page.tsx`)
  - [ ] Accordéon (expandable) avec FAQItem
  - [ ] Questions clés:
    - Niveau requis?
    - En ligne?
    - Pré-requis?
    - Remboursement?
    - Accès ressources après?
    - Paiement versements?
    - Langue?
  - [ ] Recherche FAQ (optionnel)

- [ ] Navigation Header
  - [ ] Menu: Accueil, À propos, Programme, Villes, Tarifs, FAQ, Réserver
  - [ ] CTA sticky "Réserver ma place" dans header
  - [ ] Logo ContextPsy
  - [ ] Mobile menu (hamburger)

- [ ] Footer
  - [ ] Coordonnées contact ContextPsy
  - [ ] Liens légaux (CGV, Politique confidentialité)
  - [ ] Réseaux sociaux (LinkedIn, Facebook)
  - [ ] Logo ContextPsy
  - [ ] Copyright

#### 📝 Notes

#### 🔗 Fichiers Créés/Modifiés
- [ ] `apps/web/src/app/[locale]/page.tsx` (modifié)
- [ ] `apps/web/src/app/[locale]/about-russ/page.tsx` (nouveau)
- [ ] `apps/web/src/app/[locale]/masterclass/page.tsx` (nouveau)
- [ ] `apps/web/src/app/[locale]/cities/page.tsx` (nouveau)
- [ ] `apps/web/src/app/[locale]/cities/[city]/page.tsx` (nouveau)
- [ ] `apps/web/src/app/[locale]/pricing/page.tsx` (modifié)
- [ ] `apps/web/src/app/[locale]/testimonials/page.tsx` (nouveau)
- [ ] `apps/web/src/app/[locale]/faq/page.tsx` (nouveau)
- [ ] `apps/web/src/components/layout/MasterclassHeader.tsx` (nouveau)
- [ ] `apps/web/src/components/layout/MasterclassFooter.tsx` (nouveau)
- [ ] `apps/web/src/components/masterclass/CityCard.tsx` (nouveau)

#### ✅ Validation
- [ ] Toutes pages accessibles sans 404
- [ ] Navigation fonctionne (menus, liens internes)
- [ ] Contenu affiché correctement (textes, images)
- [ ] Responsive mobile/tablet/desktop fonctionne
- [ ] i18n FR/EN fonctionne sur toutes pages

---

### BATCH 6: Système de Réservation 🎫

**Statut:** 🔴 À faire  
**Priorité:** 🔴 Critique  
**Durée:** 1.5 jours  
**Dépend de:** Batch 3, Batch 5

#### ✅ Checklist

- [ ] Page sélection ville/date (`/book/page.tsx`)
  - [ ] Liste villes avec dates disponibles
  - [ ] Sélection ville (dropdown ou cards)
  - [ ] Sélection date/événement (dropdown ou calendar)
  - [ ] Affichage disponibilité temps réel (AvailabilityBar)
  - [ ] Prix affiché (early bird vs regular selon date)
  - [ ] UrgencyBadge si presque complet
  - [ ] Bouton "Continuer" vers formulaire

- [ ] Page formulaire réservation (`/book/checkout/page.tsx`)
  - [ ] Formulaire attendee info:
    - Nom (requis)
    - Email (requis, validation)
    - Téléphone (requis, format)
  - [ ] Expérience ACT (dropdown: Débutant, Intermédiaire, Avancé)
  - [ ] Nombre billets (1-10, input number)
  - [ ] Si quantité >= 3: Option groupe (discount automatique)
  - [ ] Informations supplémentaires (textarea optionnel)
  - [ ] Récapitulatif prix (BookingSummary component)
  - [ ] Checkbox "J'accepte les CGV"
  - [ ] Bouton "Procéder au paiement"

- [ ] Composant `BookingForm.tsx`
  - [ ] Formulaire avec React Hook Form
  - [ ] Validation Zod schema
  - [ ] États: idle, loading, success, error
  - [ ] Gestion multi-attendees (si quantité > 1)
  - [ ] API call: `POST /api/v1/bookings/create`
  - [ ] Redirection vers page paiement après succès

- [ ] Composant `BookingSummary.tsx`
  - [ ] Affiche sélection ville/date
  - [ ] Nombre billets
  - [ ] Prix unitaire (early bird ou regular)
  - [ ] Discount groupe (si applicable)
  - [ ] Sous-total, taxes (si applicable), total
  - [ ] Design minimaliste (Swiss style)

- [ ] Composant `CityDateSelector.tsx`
  - [ ] Sélection ville (dropdown ou cards)
  - [ ] Sélection date/événement basé sur ville
  - [ ] Filtre événements (seulement published, upcoming)
  - [ ] API call: `GET /api/v1/masterclass/cities/{city_id}/events`

- [ ] Page confirmation (`/book/confirmation/page.tsx`)
  - [ ] Message confirmation avec booking_reference
  - [ ] Détails réservation (ville, date, venue)
  - [ ] Prochaines étapes (email confirmation, préparation)
  - [ ] Bouton "Télécharger reçu" (optionnel, PDF généré)
  - [ ] Liens vers ressources pré-masterclass (optionnel)

#### 📝 Notes

#### 🔗 Fichiers Créés/Modifiés
- [ ] `apps/web/src/app/[locale]/book/page.tsx` (nouveau)
- [ ] `apps/web/src/app/[locale]/book/checkout/page.tsx` (nouveau)
- [ ] `apps/web/src/app/[locale]/book/confirmation/page.tsx` (nouveau)
- [ ] `apps/web/src/components/masterclass/BookingForm.tsx` (nouveau)
- [ ] `apps/web/src/components/masterclass/BookingSummary.tsx` (nouveau)
- [ ] `apps/web/src/components/masterclass/CityDateSelector.tsx` (nouveau)
- [ ] `apps/web/src/lib/validation/booking.ts` (nouveau, Zod schemas)

#### ✅ Validation
- [ ] Flux complet réservation fonctionne (sélection → formulaire → confirmation)
- [ ] Formulaires valident correctement (champs requis, format email, etc.)
- [ ] Prix calculés correctement (early bird, group discount)
- [ ] Disponibilité mise à jour en temps réel
- [ ] Booking créé en DB avec status "pending"
- [ ] Page confirmation affiche booking_reference

---

### BATCH 7: Intégration Stripe pour Bookings 💳

**Statut:** 🔴 À faire  
**Priorité:** 🔴 Critique  
**Durée:** 1.5 jours  
**Dépend de:** Batch 6

#### ✅ Checklist

- [ ] Adapter `StripeService` pour PaymentIntent
  - [ ] Méthode `create_payment_intent_for_booking()`
  - [ ] Montant en cents CAD
  - [ ] Metadata: booking_id, booking_reference
  - [ ] Retourner client_secret et payment_intent_id
  - [ ] Gestion erreurs Stripe
  - [ ] Tests unitaires

- [ ] Endpoint `POST /api/v1/bookings/{booking_id}/create-payment-intent`
  - [ ] Vérifier booking existe et status = "pending"
  - [ ] Créer PaymentIntent via StripeService
  - [ ] Associer payment_intent_id au booking
  - [ ] Retourner client_secret
  - [ ] Tests API
  - [ ] Documentation Swagger

- [ ] Page paiement Stripe (`/book/payment/page.tsx`)
  - [ ] Affiche récapitulatif réservation
  - [ ] Intègre Stripe Elements (BookingStripeCheckout component)
  - [ ] État loading pendant traitement
  - [ ] Redirection vers confirmation après succès
  - [ ] Gestion erreurs paiement

- [ ] Composant `BookingStripeCheckout.tsx`
  - [ ] Intégration Stripe Elements (@stripe/react-stripe-js)
  - [ ] Formulaire carte bancaire
  - [ ] Affichage montant total
  - [ ] Bouton "Payer [montant] CAD"
  - [ ] État processing pendant paiement
  - [ ] Gestion succès: redirect vers `/book/confirmation?reference=XXX`
  - [ ] Gestion erreur: afficher message, permettre retry

- [ ] Webhook Stripe pour bookings
  - [ ] Handler `payment_intent.succeeded`:
    - [ ] Mettre à jour booking: status = "confirmed", payment_status = "paid"
    - [ ] Mettre à jour city_event: available_spots--
    - [ ] Enregistrer payment dans table BookingPayment
    - [ ] Envoyer email confirmation (EmailService)
  - [ ] Handler `payment_intent.payment_failed`:
    - [ ] Mettre à jour booking: payment_status = "failed"
    - [ ] Notifier utilisateur (optionnel)
  - [ ] Vérification signature webhook (Stripe)
  - [ ] Tests webhooks (Stripe CLI ou test events)

- [ ] Configuration Stripe
  - [ ] Variables env: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET
  - [ ] Webhook endpoint configuré dans Stripe Dashboard
  - [ ] Events sélectionnés: payment_intent.succeeded, payment_intent.payment_failed
  - [ ] Test mode vs Live mode

#### 📝 Notes

#### 🔗 Fichiers Créés/Modifiés
- [ ] `backend/app/services/stripe_service.py` (modifié, ajout méthode)
- [ ] `backend/app/api/v1/endpoints/payments.py` (nouveau ou modifié)
- [ ] `backend/app/api/v1/webhooks/stripe.py` (modifié, ajout handlers bookings)
- [ ] `apps/web/src/app/[locale]/book/payment/page.tsx` (nouveau)
- [ ] `apps/web/src/components/masterclass/BookingStripeCheckout.tsx` (nouveau)
- [ ] `apps/web/src/lib/stripe/booking.ts` (nouveau, Stripe client config)

#### ✅ Validation
- [ ] PaymentIntent créé avec succès (Stripe test mode)
- [ ] Stripe Elements affiche formulaire carte
- [ ] Paiement test réussi (carte 4242 4242 4242 4242)
- [ ] Webhook confirme booking automatiquement
- [ ] Email confirmation envoyé après paiement
- [ ] Disponibilité mise à jour (available_spots--)
- [ ] Tests paiements passent (succès, échec, webhook)

---

### BATCH 8: Emails Transactionnels 📧

**Statut:** 🔴 À faire  
**Priorité:** 🟡 Haute  
**Durée:** 1.5 jours  
**Dépend de:** Batch 7

#### ✅ Checklist

- [ ] Template email confirmation immédiate
  - [ ] Méthode `booking_confirmation_email()` dans `EmailTemplates`
  - [ ] HTML version: design responsive, Swiss style (noir/blanc)
  - [ ] Texte version (fallback)
  - [ ] Variables: {attendee_name}, {booking_reference}, {city}, {event_dates}, {venue_name}, {venue_address}, {total_price}
  - [ ] Test envoi email réel

- [ ] Template email J-30 (Rappel)
  - [ ] Méthode `booking_reminder_30_days()` dans `EmailTemplates`
  - [ ] Ressources pré-masterclass (liens, documents)
  - [ ] Checklist préparation
  - [ ] Variables: {attendee_name}, {city}, {event_dates}

- [ ] Template email J-14 (Agenda)
  - [ ] Méthode `booking_reminder_14_days()` dans `EmailTemplates`
  - [ ] Timeline détaillée jour 1 / jour 2
  - [ ] Horaires précis (9h-17h)
  - [ ] Matériel à apporter
  - [ ] Variables: {attendee_name}, {city}, {event_dates}, {venue_name}

- [ ] Template email J-7 (Logistique)
  - [ ] Méthode `booking_reminder_7_days()` dans `EmailTemplates`
  - [ ] Hôtel recommandé (si applicable)
  - [ ] Transport (parking, métro, etc.)
  - [ ] Restaurant à proximité
  - [ ] Variables: {attendee_name}, {city}, {venue_address}

- [ ] Template email J-1 (Bienvenue)
  - [ ] Méthode `booking_reminder_1_day()` dans `EmailTemplates`
  - [ ] Horaires finaux (confirmation 9h-17h)
  - [ ] Numéro urgence
  - [ ] WiFi venue (si applicable)
  - [ ] Variables: {attendee_name}, {city}, {venue_name}, {emergency_phone}

- [ ] Template email Post-event
  - [ ] Méthode `booking_post_event_email()` dans `EmailTemplates`
  - [ ] Accès ressources (liens plateforme, mot de passe)
  - [ ] Formulaire feedback (lien)
  - [ ] Durée accès (3 mois)
  - [ ] Variables: {attendee_name}, {resource_url}, {access_until}

- [ ] Celery tasks pour emails
  - [ ] `send_booking_confirmation_task()` dans `email_tasks.py`
  - [ ] `send_booking_reminder_task(booking_id, days_until)` dans `email_tasks.py`
  - [ ] Retry logic (3 tentatives, backoff exponentiel)
  - [ ] Logging erreurs
  - [ ] Tests unitaires tasks

- [ ] Scheduler emails rappels (Celery Beat)
  - [ ] Tâche quotidienne (cron: 0 9 * * *, 9h du matin)
  - [ ] Query bookings confirmés: `confirmed_at IS NOT NULL AND status = 'confirmed'`
  - [ ] Pour chaque booking, calculer `days_until_event = (city_event.start_date - today).days`
  - [ ] Si days_until_event == 30: `send_booking_reminder_task(booking_id, 30)`
  - [ ] Si days_until_event == 14: `send_booking_reminder_task(booking_id, 14)`
  - [ ] Si days_until_event == 7: `send_booking_reminder_task(booking_id, 7)`
  - [ ] Si days_until_event == 1: `send_booking_reminder_task(booking_id, 1)`
  - [ ] Si days_until_event == -1: `send_booking_post_event_task(booking_id)`

- [ ] Trigger email confirmation immédiate
  - [ ] Dans webhook Stripe `payment_intent.succeeded`:
    - [ ] Appeler `send_booking_confirmation_task.delay(booking_id)`
  - [ ] Test: créer booking, payer, vérifier email reçu

#### 📝 Notes

#### 🔗 Fichiers Créés/Modifiés
- [ ] `backend/app/services/email_templates.py` (modifié, ajout méthodes)
- [ ] `backend/app/tasks/email_tasks.py` (modifié, ajout tasks)
- [ ] `backend/app/tasks/scheduler.py` (nouveau, Celery Beat config)
- [ ] `backend/app/celery_app.py` (modifié, ajout scheduler)
- [ ] `backend/app/api/v1/webhooks/stripe.py` (modifié, trigger email confirmation)

#### ✅ Validation
- [ ] Email confirmation s'envoie après paiement réussi
- [ ] Templates emails affichent correctement (HTML + texte)
- [ ] Variables remplacées correctement
- [ ] Scheduler rappels fonctionne (test avec dates futures)
- [ ] Emails rappels envoyés aux bonnes dates (J-30, J-14, J-7, J-1)
- [ ] Email post-event envoyé 1 jour après événement
- [ ] Tests emails passent (envoi réel ou mock)

---

### BATCH 9: Contenu & Assets 📸

**Statut:** 🔴 À faire  
**Priorité:** 🟡 Haute  
**Durée:** 1 jour  
**Dépend de:** Batch 5

#### ✅ Checklist

- [ ] Images optimisées
  - [ ] Hero image Russ Harris (1920x1080px)
    - [ ] Format: JPG haute qualité
    - [ ] Optimisé: WebP + JPG fallback
    - [ ] Placeholder: blur data URL
    - [ ] Localisation: `/public/images/russ-harris-hero.jpg`
  - [ ] Photos villes (600x400px x 6):
    - [ ] Toronto (CN Tower)
    - [ ] Vancouver (Stanley Park)
    - [ ] Montréal (Mont Royal)
    - [ ] Calgary (Calgary Tower)
    - [ ] Ottawa (Parliament)
    - [ ] Autre ville si nécessaire
    - [ ] Format: WebP + JPG
    - [ ] Localisation: `/public/images/cities/[city-name].jpg`
  - [ ] Photos témoignages (300x300px x 4-6):
    - [ ] Portraits professionnels
    - [ ] Format: WebP + JPG
    - [ ] Localisation: `/public/images/testimonials/[name].jpg`
  - [ ] Logo ContextPsy:
    - [ ] SVG (vectoriel, scalable)
    - [ ] PNG fallback (pour anciens navigateurs)
    - [ ] Localisation: `/public/images/contextpsy-logo.svg`

- [ ] Copywriting FR/EN
  - [ ] Tous textes selon brief (professionnel, inspirant, basé sur science)
  - [ ] Headlines courtes (max 10 mots)
  - [ ] Subheadings explicatifs (max 20 mots)
  - [ ] Body text: paragraphes courts (3-4 lignes)
  - [ ] CTA: verbes action clairs ("Réserver", "Découvrir", "S'inscrire")
  - [ ] Terminologie ACT correcte (vérifier avec expert)
  - [ ] Ajouter dans fichiers i18n:
    - [ ] `apps/web/src/i18n/messages/fr.json`
    - [ ] `apps/web/src/i18n/messages/en.json`

- [ ] SEO Meta tags
  - [ ] Page Hero:
    - [ ] Title: "Russ Harris ACT Masterclass Canada 2025 | Trauma-Focused Training"
    - [ ] Description: "Formation intensive ACT Trauma-Focused avec Dr. Russ Harris dans 6 villes canadiennes. 2 jours, 16 heures. Places limitées."
    - [ ] OG Image: Russ Harris hero image
  - [ ] Page About Russ:
    - [ ] Title: "À propos de Russ Harris | Expert ACT & Trauma-Focused Therapy"
    - [ ] Description: "Dr. Russ Harris, créateur de l'ACT, 30+ années d'expérience. Formateur reconnu mondialement."
    - [ ] OG Image: Photo Russ Harris
  - [ ] Page Programme:
    - [ ] Title: "Programme Masterclass ACT Trauma-Focused | Canada 2025"
    - [ ] Description: "Programme détaillé 2 jours: Jour 1 Fondamentaux, Jour 2 Techniques avancées. Manuel inclus."
  - [ ] Page Villes:
    - [ ] Title: "Villes & Dates | ACT Masterclass Canada 2025"
    - [ ] Description: "Toronto, Vancouver, Montréal, Calgary, Ottawa. Dates disponibles, lieux, disponibilité en temps réel."
  - [ ] Page Pricing:
    - [ ] Title: "Tarification | ACT Masterclass Russ Harris"
    - [ ] Description: "Early Bird -20%, Prix régulier, Group discount 10%. Inclus: formation, manuel, certificat, ressources 3 mois."
  - [ ] Page FAQ:
    - [ ] Title: "FAQ | Masterclass ACT Russ Harris"
    - [ ] Description: "Questions fréquentes: niveau requis, pré-requis, remboursement, accès ressources, paiement versements."

- [ ] Schema.org Event markup
  - [ ] Component `EventStructuredData.tsx`
  - [ ] Ajouter sur pages événements/cities
  - [ ] Schema Event avec:
    - [ ] name: "Trauma-Focused ACT Masterclass"
    - [ ] description: ...
    - [ ] startDate: ...
    - [ ] endDate: ...
    - [ ] location: {name, address}
    - [ ] organizer: {name: "ContextPsy", url: ...}
    - [ ] offers: {price, priceCurrency: "CAD"}
  - [ ] Test avec Google Rich Results Test

- [ ] Sitemap
  - [ ] Ajouter nouvelles pages dans `sitemap.ts`
  - [ ] Vérifier toutes pages inclues:
    - [ ] / (homepage)
    - [ ] /about-russ
    - [ ] /masterclass
    - [ ] /cities
    - [ ] /cities/[city] (pour chaque ville)
    - [ ] /pricing
    - [ ] /testimonials
    - [ ] /faq
    - [ ] /book (optionnel, si indexable)
  - [ ] Vérifier `robots.txt` (permet toutes pages sauf admin)

#### 📝 Notes

#### 🔗 Fichiers Créés/Modifiés
- [ ] `/public/images/russ-harris-hero.jpg` (nouveau)
- [ ] `/public/images/cities/` (nouveau, 6 images)
- [ ] `/public/images/testimonials/` (nouveau, 4-6 images)
- [ ] `/public/images/contextpsy-logo.svg` (nouveau)
- [ ] `apps/web/src/i18n/messages/fr.json` (modifié, ajout textes)
- [ ] `apps/web/src/i18n/messages/en.json` (modifié, ajout textes)
- [ ] `apps/web/src/app/[locale]/layout.tsx` (modifié, meta tags par page)
- [ ] `apps/web/src/components/seo/EventStructuredData.tsx` (nouveau)
- [ ] `apps/web/src/config/sitemap.ts` (modifié, ajout pages)

#### ✅ Validation
- [ ] Images chargent correctement (next/image)
- [ ] Images optimisées (formats WebP, tailles réduites)
- [ ] Textes FR/EN complets et corrects
- [ ] SEO meta tags présents toutes pages (inspecter HTML)
- [ ] Schema.org Event markup valide (Google Rich Results Test)
- [ ] Sitemap accessible et complet

---

### BATCH 10: Tests & Finalisation ✅

**Statut:** 🔴 À faire  
**Priorité:** 🔴 Critique  
**Durée:** 2 jours  
**Dépend de:** Tous batches précédents

#### ✅ Checklist

- [ ] Tests E2E (Playwright)
  - [ ] Parcours complet réservation:
    - [ ] Landing → Sélection ville/date → Formulaire → Paiement → Confirmation
  - [ ] Flow paiement Stripe:
    - [ ] Carte succès (4242 4242 4242 4242)
    - [ ] Carte échec (4000 0000 0000 0002)
  - [ ] Multi-villes, multi-dates:
    - [ ] Tester sélection différentes villes
    - [ ] Tester dates différentes
    - [ ] Vérifier disponibilité mise à jour
  - [ ] Responsive mobile/tablet/desktop:
    - [ ] Tester toutes pages sur mobile (375px)
    - [ ] Tester toutes pages sur tablet (768px)
    - [ ] Tester toutes pages sur desktop (1920px)
  - [ ] Navigation:
    - [ ] Menus fonctionnent
    - [ ] Liens internes fonctionnent
    - [ ] Mobile menu fonctionne

- [ ] Tests API (pytest)
  - [ ] Endpoints masterclass:
    - [ ] GET /api/v1/masterclass/events → 200
    - [ ] GET /api/v1/masterclass/cities → 200
    - [ ] GET /api/v1/masterclass/cities/{city_id}/events → 200
    - [ ] GET /api/v1/masterclass/events/{event_id}/availability → 200
  - [ ] Endpoints bookings:
    - [ ] POST /api/v1/bookings/create → 201
    - [ ] GET /api/v1/bookings/{reference} → 200
    - [ ] POST /api/v1/bookings/{reference}/cancel → 200
    - [ ] Cas erreurs: 400 (validation), 404 (not found)
  - [ ] Webhooks Stripe:
    - [ ] payment_intent.succeeded → booking confirmé
    - [ ] payment_intent.payment_failed → booking failed
  - [ ] Cas limites:
    - [ ] Sold out event → retourner 400
    - [ ] Invalid booking reference → retourner 404
    - [ ] Past event → retourner 400

- [ ] Tests unitaires composants critiques
  - [ ] `BookingForm.tsx`:
    - [ ] Validation formulaire (champs requis, format email)
    - [ ] Calcul prix (early bird, group discount)
    - [ ] États loading/error/success
  - [ ] `BookingStripeCheckout.tsx`:
    - [ ] Affichage montant
    - [ ] Gestion erreurs Stripe
    - [ ] Redirection après succès
  - [ ] `AvailabilityBar.tsx`:
    - [ ] Calcul pourcentage disponibilité
    - [ ] Couleur selon disponibilité
    - [ ] Affichage "X/Y places"

- [ ] Tests performance
  - [ ] Lighthouse audit:
    - [ ] Performance: 90+
    - [ ] Accessibility: 90+
    - [ ] Best Practices: 90+
    - [ ] SEO: 90+
  - [ ] Core Web Vitals:
    - [ ] LCP (Largest Contentful Paint): < 2.5s
    - [ ] FID (First Input Delay): < 100ms
    - [ ] CLS (Cumulative Layout Shift): < 0.1
    - [ ] TTFB (Time to First Byte): < 600ms
  - [ ] Bundle size analysis:
    - [ ] Frontend bundle < 500KB (gzipped)
    - [ ] Vérifier pas de dépendances inutiles
    - [ ] Code splitting fonctionne (route-based)

- [ ] Tests accessibilité
  - [ ] Navigation clavier:
    - [ ] Tab order logique
    - [ ] Focus visible
    - [ ] Escape ferme modals
  - [ ] Screen reader:
    - [ ] Tester avec NVDA/JAWS/VoiceOver
    - [ ] ARIA labels présents
    - [ ] Alt text images
  - [ ] Contraste couleurs:
    - [ ] Noir sur blanc: 21:1 ✅
    - [ ] Texte secondaire: vérifier > 4.5:1
    - [ ] Boutons: vérifier > 3:1
  - [ ] ARIA labels:
    - [ ] Boutons avec labels
    - [ ] Forms avec labels
    - [ ] Landmarks (header, main, footer)

- [ ] Cross-browser testing
  - [ ] Chrome (dernière version)
  - [ ] Firefox (dernière version)
  - [ ] Safari (dernière version macOS/iOS)
  - [ ] Edge (dernière version)
  - [ ] Mobile: iOS Safari, Chrome Android

- [ ] Fix bugs et ajustements
  - [ ] Résoudre issues trouvées dans tests
  - [ ] Ajustements UX/UI selon feedback
  - [ ] Optimisations finales (images, fonts, code)
  - [ ] Vérifier pas de console errors/warnings

- [ ] Documentation
  - [ ] README.md mise à jour:
    - [ ] Instructions setup
    - [ ] Variables env nécessaires
    - [ ] Commandes utiles
  - [ ] Guide admin (`docs/ADMIN_GUIDE.md`):
    - [ ] Comment créer/modifier événements
    - [ ] Comment gérer réservations
    - [ ] Comment voir analytics
  - [ ] Guide utilisateur (`docs/USER_GUIDE.md`):
    - [ ] Comment utiliser le site
    - [ ] FAQ techniques
  - [ ] Code comments:
    - [ ] Commentaires JSDoc/TypeScript sur fonctions complexes
    - [ ] README dans dossiers complexes

- [ ] Préparation déploiement
  - [ ] Variables env production:
    - [ ] STRIPE_SECRET_KEY (live mode)
    - [ ] STRIPE_WEBHOOK_SECRET (live)
    - [ ] SENDGRID_API_KEY
    - [ ] SENDGRID_FROM_EMAIL (vérifié domaine)
    - [ ] DATABASE_URL (production)
    - [ ] FRONTEND_URL (production)
  - [ ] Database migrations:
    - [ ] Vérifier migrations validées
    - [ ] Backup database production avant migration
    - [ ] Plan rollback si problème
  - [ ] Stripe configuration:
    - [ ] Webhook endpoint configuré (production URL)
    - [ ] Events sélectionnés dans Stripe Dashboard
    - [ ] Test webhook avec Stripe CLI
  - [ ] SendGrid configuration:
    - [ ] Domain vérifié (SPF, DKIM, DMARC)
    - [ ] Email from vérifié
    - [ ] Templates testés

#### 📝 Notes

#### 🔗 Fichiers Créés/Modifiés
- [ ] Tests E2E: `apps/web/tests/e2e/masterclass.spec.ts` (nouveau)
- [ ] Tests API: `backend/tests/api/test_masterclass.py` (modifié)
- [ ] Tests API: `backend/tests/api/test_bookings.py` (modifié)
- [ ] Tests unitaires: `apps/web/src/components/masterclass/__tests__/` (nouveau)
- [ ] Documentation: `docs/ADMIN_GUIDE.md` (nouveau)
- [ ] Documentation: `docs/USER_GUIDE.md` (nouveau)
- [ ] README.md (modifié)

#### ✅ Validation
- [ ] Tous tests passent (E2E, API, unitaires)
- [ ] Lighthouse 90+ (Performance, Accessibility, Best Practices, SEO)
- [ ] Core Web Vitals optimisés (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- [ ] Accessibilité WCAG AA conforme
- [ ] Cross-browser testé (Chrome, Firefox, Safari, Edge, mobile)
- [ ] Documentation complète
- [ ] Prêt pour déploiement production

---

## 📊 Métriques de Progression

### Progression Globale
**Batches terminés:** 0/10 (0%)  
**Tâches terminées:** 0/XXX (0%)  
**Temps écoulé:** 0 jours  
**Temps estimé restant:** 15 jours

### Progression par Batch
| Batch | Tâches | Terminées | % |
|-------|--------|-----------|---|
| 1 | X | 0 | 0% |
| 2 | X | 0 | 0% |
| 3 | X | 0 | 0% |
| 4 | X | 0 | 0% |
| 5 | X | 0 | 0% |
| 6 | X | 0 | 0% |
| 7 | X | 0 | 0% |
| 8 | X | 0 | 0% |
| 9 | X | 0 | 0% |
| 10 | X | 0 | 0% |

---

## 🐛 Issues & Bloqueurs

| Issue | Batch | Description | Statut | Assigné |
|-------|-------|-------------|--------|---------|
| - | - | - | - | - |

---

## 📝 Notes Globales

**Date de dernière mise à jour:** [À remplir]  
**Dernière modification:** [À remplir]  
**Statut global:** 🔴 En attente de démarrage
