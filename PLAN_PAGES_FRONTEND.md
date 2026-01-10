# 📋 Plan d'Amélioration des Pages Frontend - Russ Harris Masterclass

## 🎯 Objectif
Créer une expérience de présentation complète et professionnelle pour le site de la Masterclass ACT avec Russ Harris, en remplaçant/améliorant la page d'accueil et en enrichissant toutes les pages de présentation avec du contenu réel et des sections visuelles attractives.

---

## 📄 Pages à Créer/Améliorer

### **1. Page d'Accueil (`/page.tsx`)** 🏠
**Objectif:** Landing page impactante qui convertit les visiteurs en réservations

#### Sections à créer/améliorer:

**A. Hero Section (Améliorer)** ✅
- ✅ Déjà créé avec HeroSection component
- ⚠️ **À améliorer:**
  - Ajouter image de fond professionnelle de Russ Harris
  - Améliorer le texte headline (plus percutant)
  - Ajouter sous-titre avec bénéfices clés
  - CTA plus visible et actionnable
  - Badge "Places limitées" plus visible

**B. Section "Pourquoi cette Masterclass?" (Nouveau)**
- 3-4 bénéfices clés avec icônes
- Bénéfices:
  - "Formation certifiante"
  - "Accès à l'expert mondial"
  - "Ressources exclusives"
  - "Réseau professionnel"

**C. Section "Le Programme en Bref" (Nouveau)**
- Timeline visuelle jour 1 / jour 2 (version condensée)
- Points clés de chaque jour
- Lien vers page détaillée

**D. Section Villes Disponibles (Améliorer)**
- Carrousel/grille de 3-4 villes principales
- Afficher prochaines dates disponibles
- Disponibilité en temps réel
- Bouton "Voir toutes les villes"

**E. Section Témoignages (Prévisualisation)**
- 3-4 témoignages en carrousel
- Photos et noms des participants
- Étoiles et citations
- Lien vers page témoignages complète

**F. Section "Tarifs & Options" (Prévisualisation)**
- Cards Early Bird / Regular / Group
- Prix et avantages
- Lien vers page pricing détaillée

**G. Section FAQ Rapide (Nouveau)**
- 4-5 questions fréquentes avec accordéon
- Lien vers FAQ complète

**H. Section CTA Final (Nouveau)**
- Grand bouton "Réserver ma place maintenant"
- Badge urgence si places limitées
- Informations de contact (ContextPsy)

**I. Footer (Améliorer)**
- Coordonnées ContextPsy
- Liens vers réseaux sociaux
- Mentions légales
- Newsletter signup (optionnel)

---

### **2. Page "À propos de Russ" (`/about-russ/page.tsx`)** 👤
**Statut:** ✅ Créée, à enrichir

#### Sections à améliorer:

**A. Hero Section Russ (Améliorer)**
- Photo professionnelle grande taille
- Headline avec credentials
- Sous-titre avec expertise

**B. Biographie Complète (Enrichir)**
- Histoire et parcours
- Formation et certifications
- Publications importantes
- Reconnaissance internationale

**C. Expertise ACT (Nouveau)**
- Années d'expérience
- Nombre de personnes formées
- Pays où il a formé
- Statistiques impact

**D. Publications & Ressources (Nouveau)**
- Livres publiés avec covers
- Articles scientifiques
- Vidéos/TED talks (si disponibles)
- Ressources gratuites (liens)

**E. Témoignages sur Russ (Nouveau)**
- Citations de professionnels
- Recommandations d'institutions
- Impact de sa méthode

**F. Pourquoi suivre cette formation? (Nouveau)**
- Ce que vous allez apprendre
- Méthodologie unique
- Différence avec autres formations

---

### **3. Page "Programme Masterclass" (`/masterclass/page.tsx`)** 📚
**Statut:** ✅ Créée, à enrichir

#### Sections à améliorer:

**A. Hero Section (Améliorer)**
- Image représentative de la formation
- Durée (2 jours) mise en avant
- Objectifs pédagogiques principaux

**B. Vue d'Ensemble (Enrichir)**
- Pour qui cette formation?
- Prérequis (optionnel)
- Format (présentiel, interactif)
- Certification/attestation

**C. Timeline Jour 1 (Enrichir)**
- Horaires détaillés (9h-17h)
- Modules avec descriptions
- Activités pratiques
- Pauses et repas

**D. Timeline Jour 2 (Enrichir)**
- Horaires détaillés (9h-17h)
- Modules avec descriptions
- Ateliers pratiques
- Cas cliniques

**E. Objectifs Pédagogiques (Enrichir)**
- Liste complète des compétences acquises
- Application pratique immédiate
- Outils concrets fournis

**F. Ressources Incluses (Enrichir)**
- Manuel de formation
- Slides de présentation
- Ressources supplémentaires
- Accès plateforme (si applicable)

**G. Méthodologie (Nouveau)**
- Approche pédagogique
- Ratio théorie/pratique
- Interactions et échanges
- Support post-formation

**H. Prérequis & Public Cible (Nouveau)**
- À qui s'adresse cette formation
- Niveau requis
- Recommandations

---

### **4. Page "Villes & Dates" (`/cities/page.tsx`)** 🌍
**Statut:** ✅ Créée, à améliorer

#### Sections à améliorer:

**A. Hero Section (Nouveau)**
- Headline "Choisissez votre ville"
- Carte du Canada (optionnel)
- Statistiques globales

**B. Filtres (Nouveau)**
- Filtre par province
- Filtre par mois
- Tri par disponibilité
- Tri par date

**C. Grille Villes (Améliorer)**
- Cards villes avec:
  - Photo de la ville
  - Nom + Province
  - Nombre de dates disponibles
  - Prochaine date
  - Disponibilité (places restantes)
  - Prix (range)
  - Badge "Nouveau" si récent
  - Badge "Bientôt complet" si < 20%

**D. Carte Interactive (Optionnel)**
- Carte du Canada avec pins
- Click sur pin → scroll vers ville
- Légende avec couleurs (disponibilité)

**E. Section "Pas de ville près de chez vous?" (Nouveau)**
- Formulaire demande nouvelle ville
- Contact pour organiser un événement
- Liste d'attente par ville

---

### **5. Page "Détail Ville" (`/cities/[city]/page.tsx`)** 📍
**Statut:** ✅ Créée, à enrichir

#### Sections à améliorer:

**A. Hero Section Ville (Améliorer)**
- Grande image de la ville
- Nom ville + Province
- Informations pratiques (timezone, météo moyenne)

**B. Dates Disponibles (Améliorer)**
- Liste chronologique des événements
- Pour chaque événement:
  - Date formatée (lundi 15 mars 2025)
  - Horaires (9h-17h)
  - Disponibilité (barre + nombre places)
  - Prix (Early Bird si applicable)
  - Bouton "Réserver"

**C. Informations Lieu (Enrichir)**
- Nom du venue (hôtel/centre)
- Adresse complète
- Plan d'accès (Google Maps embed)
- Parking disponible?
- Transports en commun
- Hôtels à proximité (liens)

**D. Informations Pratiques (Nouveau)**
- Timezone
- Langue (FR/EN)
- Climat/météo
- Services disponibles (WiFi, restauration)

**E. Section "Autres villes à proximité" (Nouveau)**
- Suggestions de villes voisines
- Si pas de disponibilité, alternatives

---

### **6. Page "Tarifs" (`/pricing/page.tsx`)** 💰
**Statut:** ✅ Créée, à enrichir

#### Sections à améliorer:

**A. Hero Section (Nouveau)**
- "Investissement pour votre développement professionnel"
- Prix à partir de (early bird)

**B. Options Tarifaires (Enrichir)**
- Card Early Bird:
  - Prix (ex: 450 EUR)
  - Conditions (jusqu'au X date)
  - Compteur temps restant (si applicable)
  - Badge "Économisez X EUR"
  
- Card Regular:
  - Prix standard (ex: 550 EUR)
  - Disponible après early bird
  
- Card Group (3+):
  - Prix réduit (ex: 400 EUR/personne)
  - Minimum 3 participants
  - Calcul automatique économies

**C. Tableau Comparatif (Nouveau)**
- Comparer les options
- Inclusions par option
- Restrictions si applicable

**D. Inclusions Détaillées (Enrichir)**
- Liste complète de ce qui est inclus
- Ressources fournies
- Support post-formation
- Certification

**E. Options de Paiement (Nouveau)**
- Paiement en une fois
- Paiement en plusieurs fois (si disponible)
- Remises entreprises
- Financement (si applicable)

**F. Garantie/Remboursement (Nouveau)**
- Politique d'annulation
- Conditions de remboursement
- Garantie satisfaction (si applicable)

**G. FAQ Pricing (Intégrer)**
- Questions fréquentes sur tarifs
- Comparaisons avec autres formations
- Justification du prix

---

### **7. Page "Témoignages" (`/testimonials/page.tsx`)** ⭐
**Statut:** ✅ Créée, à enrichir

#### Sections à améliorer:

**A. Hero Section (Nouveau)**
- "Ce que disent nos participants"
- Statistiques (X participants satisfaits, X% recommandent)

**B. Carrousel Témoignages (Améliorer)**
- Navigation par flèches
- Autoplay optionnel
- Indicateurs de slide
- 3-4 témoignages visibles

**C. Grille Complète Témoignages (Améliorer)**
- Cards avec:
  - Photo participant (avatar)
  - Nom complet + Profession + Ville
  - Étoiles (5/5)
  - Citation complète
  - Date de participation
  - Ville où ils ont participé

**D. Filtres Témoignages (Nouveau)**
- Filtrer par ville
- Filtrer par année
- Filtrer par profession

**E. Statistiques (Nouveau)**
- Taux de satisfaction global
- % qui recommandent
- % qui reviennent pour autre formation
- Nombre total de participants

**F. Section "Laissez votre témoignage" (Nouveau)**
- Formulaire pour participants
- Validation (email de booking)
- Modération avant publication

---

### **8. Page "FAQ" (`/faq/page.tsx`)** ❓
**Statut:** ✅ Créée, à enrichir

#### Sections à améliorer:

**A. Hero Section (Nouveau)**
- "Questions fréquentes"
- Barre de recherche proéminente

**B. Recherche FAQ (Améliorer)**
- Recherche en temps réel
- Filtre par catégorie
- Suggestions de questions

**C. Catégories FAQ (Enrichir)**
- Général (10+ questions)
- Inscription & Réservation (8+ questions)
- Programme & Contenu (10+ questions)
- Tarifs & Paiement (8+ questions)
- Logistique (10+ questions)
- Certification (5+ questions)
- Annulation & Remboursement (6+ questions)

**D. Questions Populaires (Nouveau)**
- Top 5 questions les plus recherchées
- Section mise en avant

**E. Contact Support (Nouveau)**
- "Vous ne trouvez pas votre réponse?"
- Formulaire de contact
- Email direct: contact@contextpsy.fr
- Téléphone (si applicable)

---

### **9. Page "Contact" (`/contact/page.tsx`)** 📧
**Statut:** ⚠️ À créer

#### Sections à créer:

**A. Hero Section**
- "Contactez-nous"
- Coordonnées principales

**B. Formulaire de Contact**
- Nom complet
- Email
- Téléphone (optionnel)
- Sujet (dropdown)
- Message
- Validation Zod

**C. Informations ContextPsy**
- Adresse complète
- Téléphone
- Email: contact@contextpsy.fr
- Horaires de bureau
- Réseaux sociaux

**D. Carte (Google Maps)**
- Localisation ContextPsy
- Embed Google Maps

**E. FAQ Rapide**
- 3-4 questions fréquentes
- Liens vers FAQ complète

---

### **10. Page "Legal" (`/legal/page.tsx`)** ⚖️
**Statut:** ⚠️ À créer

#### Sections à créer:

**A. Conditions Générales de Vente (CGV)**
- Conditions de réservation
- Conditions de paiement
- Politique d'annulation
- Remboursements
- Force majeure

**B. Mentions Légales**
- Éditeur (ContextPsy)
- Hébergement
- Propriété intellectuelle
- Données personnelles (RGPD)

**C. Politique de Confidentialité**
- Collecte de données
- Utilisation des données
- Cookies
- Droits des utilisateurs
- Contact DPO

**D. Cookies**
- Gestion des cookies
- Types de cookies utilisés
- Consentement

---

## 🎨 Composants à Créer/Améliorer

### **Composants Nouveaux:**

1. **`CityCard.tsx`** (Améliorer)
   - Card ville avec image
   - Disponibilité temps réel
   - Badge urgence
   - Prix range
   - Bouton "Voir dates"

2. **`TestimonialCard.tsx`** (Nouveau)
   - Photo + nom + profession
   - Étoiles (5/5)
   - Citation
   - Date et ville

3. **`TimelineDay.tsx`** (Nouveau)
   - Timeline visuelle jour 1/jour 2
   - Horaires
   - Modules avec descriptions
   - Style Swiss minimaliste

4. **`PricingCard.tsx`** (Améliorer)
   - Card tarif (Early Bird/Regular/Group)
   - Prix mis en avant
   - Liste inclusions
   - Bouton CTA
   - Badge "Populaire" si applicable

5. **`FAQAccordion.tsx`** (Améliorer)
   - Accordéon avec recherche
   - Filtres par catégorie
   - Animation smooth

6. **`CityFilters.tsx`** (Nouveau)
   - Filtres par province
   - Filtres par mois
   - Tri par disponibilité/date

7. **`StatsSection.tsx`** (Nouveau)
   - Section statistiques avec animations
   - Nombre villes, sessions, places, jours
   - Style Swiss minimaliste

8. **`BenefitsGrid.tsx`** (Nouveau)
   - Grille bénéfices avec icônes
   - 3-4 colonnes
   - Style Swiss

9. **`ContactForm.tsx`** (Nouveau)
   - Formulaire contact avec validation
   - Sujets prédéfinis
   - Gestion erreurs

10. **`MapEmbed.tsx`** (Nouveau)
    - Google Maps embed
    - Responsive
    - Style Swiss

---

## 📝 Contenu à Ajouter

### **Textes FR à rédiger:**

1. **Page d'Accueil:**
   - Headline percutante
   - Sous-titre avec bénéfices
   - Description "Pourquoi cette masterclass"
   - Bénéfices clés
   - CTA variations

2. **Page About Russ:**
   - Biographie complète (500-800 mots)
   - Liste publications
   - Statistiques impact
   - Citations et reconnaissances

3. **Page Programme:**
   - Descriptions détaillées modules jour 1
   - Descriptions détaillées modules jour 2
   - Objectifs pédagogiques complets
   - Méthodologie détaillée

4. **FAQ:**
   - 50+ questions/réponses complètes
   - Catégorisées par thème
   - Recherchables

5. **Témoignages:**
   - 10-15 témoignages réels ou réalistes
   - Diversité professions
   - Diversité villes
   - Citations authentiques

6. **Page Contact:**
   - Coordonnées complètes ContextPsy
   - Horaires
   - Formulaire labels et messages

7. **Pages Légales:**
   - CGV complètes
   - Mentions légales
   - Politique confidentialité
   - Gestion cookies

---

## 🖼️ Assets Visuels Nécessaires

### **Images à ajouter:**

1. **Hero Images:**
   - `russ-harris-hero.jpg` (1920x1080px)
   - Image professionnelle Russ en action
   - Style sobre, professionnel

2. **Villes:**
   - `cities/montreal.jpg` (1200x800px)
   - `cities/toronto.jpg` (1200x800px)
   - `cities/vancouver.jpg` (1200x800px)
   - `cities/quebec.jpg` (1200x800px)
   - `cities/ottawa.jpg` (1200x800px)
   - `cities/calgary.jpg` (1200x800px)

3. **Témoignages:**
   - Avatars participants (300x300px)
   - Photos professionnelles ou placeholders
   - 10-15 avatars

4. **Logos:**
   - `contextpsy-logo.svg` (logo vectoriel)
   - Logo Russ Harris (si disponible)

5. **Icons:**
   - Iconographie cohérente Swiss Style
   - Icons Lucide React (déjà utilisées)

6. **Programme:**
   - Images représentatives modules
   - Diagrammes/timeline visuels

---

## 🎯 Priorités d'Implémentation

### **Phase 1: Page d'Accueil (Priorité Max)** 🔴
1. Améliorer Hero Section
2. Ajouter section "Pourquoi cette Masterclass?"
3. Ajouter section "Le Programme en Bref"
4. Améliorer section villes
5. Ajouter section témoignages preview
6. Ajouter section tarifs preview
7. Ajouter FAQ rapide
8. Améliorer Footer

### **Phase 2: Pages Contenu (Priorité Haute)** 🟡
1. Enrichir page About Russ
2. Enrichir page Programme
3. Enrichir page Villes avec filtres
4. Enrichir page Détail Ville
5. Enrichir page Tarifs
6. Enrichir page Témoignages

### **Phase 3: Pages Utilitaires (Priorité Moyenne)** 🟢
1. Créer page Contact
2. Enrichir page FAQ
3. Créer pages Légales (CGV, Mentions, Privacy, Cookies)

---

## ✅ Critères de Validation

### **Page d'Accueil:**
- ✅ Toutes sections présentes
- ✅ Responsive mobile/tablet/desktop
- ✅ Images optimisées et chargent
- ✅ CTAs fonctionnels
- ✅ Statistiques en temps réel
- ✅ Design Swiss Style cohérent

### **Pages Contenu:**
- ✅ Contenu complet et professionnel
- ✅ Images et assets présents
- ✅ Navigation fluide
- ✅ Liens internes fonctionnels
- ✅ SEO meta tags présents

### **Pages Utilitaires:**
- ✅ Formulaire contact fonctionnel
- ✅ FAQ recherche et filtres fonctionnels
- ✅ Pages légales complètes
- ✅ Conformité RGPD

---

## 📊 Métriques de Succès

- **Performance:** Lighthouse score 90+
- **Accessibilité:** WCAG AA compliant
- **SEO:** Meta tags optimisés, Schema.org markup
- **Conversion:** CTAs visibles et actionnables
- **UX:** Navigation intuitive, chargement rapide
- **Responsive:** Parfait sur tous devices

---

## 🚀 Prochaines Étapes

1. **Créer/Améliorer page d'accueil complète**
2. **Enrichir pages contenu existantes**
3. **Créer pages utilitaires manquantes**
4. **Ajouter assets visuels (images, logos)**
5. **Rédiger tout le contenu FR**
6. **Optimiser SEO et meta tags**
7. **Tests responsive et accessibilité**
8. **Finaliser design Swiss Style**

---

**Version:** 1.0  
**Date:** 2025-01-27  
**Statut:** Prêt pour implémentation
