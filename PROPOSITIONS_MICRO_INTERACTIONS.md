# 🎨 Propositions de Micro-interactions et Animations

Ce document présente des propositions de micro-interactions et animations pour améliorer l'expérience utilisateur sur les différentes pages de l'application.

## 📋 Table des matières

1. [Page d'accueil (Homepage)](#page-daccueil)
2. [Dashboard](#dashboard)
3. [Formulaires](#formulaires)
4. [Navigation](#navigation)
5. [Cartes et Listes](#cartes-et-listes)
6. [Boutons](#boutons)
7. [Feedback utilisateur](#feedback-utilisateur)

---

## 🏠 Page d'accueil

### 1. Hero Section - Animation d'entrée progressive

**Objectif** : Créer un impact visuel fort lors du chargement de la page

**Implémentation** :
```tsx
import { microInteractions, animationVariants } from '@/lib/animations/micro-interactions';

// Titre principal avec animation d'entrée
<h1 className={animationVariants.hero.title}>
  RUSS HARRIS
</h1>

// Sous-titre avec délai
<p className={animationVariants.hero.subtitle}>
  {t('heroTitle')}
</p>

// Bouton CTA avec animation
<Button className={combineAnimations(
  animationVariants.hero.cta,
  microInteractions.button.glow,
  microInteractions.button.hover
)}>
  {t('discoverDates')}
</Button>

// Image avec fade-in
<div className={microInteractions.homepage.heroImage}>
  <Image src="/images/russ/8obb1myXAohZ.jpg" ... />
</div>
```

**Effet** : Les éléments apparaissent progressivement de haut en bas avec un léger délai entre chacun.

---

### 2. Cartes de dates de tournée - Hover interactif

**Objectif** : Rendre les cartes de dates plus engageantes et cliquables

**Implémentation** :
```tsx
<Card className={combineAnimations(
  microInteractions.card.base,
  microInteractions.homepage.tourCard,
  microInteractions.card.imageZoom
)}>
  <div className="relative overflow-hidden">
    <Image 
      src={event.image}
      className={microInteractions.homepage.tourCardImage}
      alt={event.title}
    />
  </div>
  <div className="p-6">
    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
    <p className="text-muted-foreground">{event.date}</p>
  </div>
</Card>
```

**Effet** : 
- Au survol : la carte se soulève légèrement, l'ombre s'intensifie, l'image zoom
- Transition fluide de 300ms

---

### 3. Statistiques - Animation au scroll

**Objectif** : Révéler les statistiques de manière dynamique lors du scroll

**Implémentation** :
```tsx
import { getScrollRevealClasses } from '@/lib/animations/micro-interactions';
import { useEffect, useRef, useState } from 'react';

function StatCard({ value, label, index }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const classes = getScrollRevealClasses();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={isVisible ? classes.revealed : classes.initial}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className={microInteractions.homepage.statNumber}>
        <span className="text-4xl font-bold">{value}</span>
      </div>
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
}
```

**Effet** : Les statistiques apparaissent avec un effet de slide-up lorsqu'elles entrent dans le viewport.

---

## 📊 Dashboard

### 1. Cartes de statistiques - Hover et animation d'entrée

**Objectif** : Rendre les métriques plus interactives

**Implémentation** :
```tsx
import { getStaggerAnimation } from '@/lib/animations/micro-interactions';

<Grid columns={{ mobile: 1, tablet: 2, desktop: 4 }} gap="normal">
  {stats.map((stat, index) => (
    <Card
      key={stat.id}
      className={combineAnimations(
        microInteractions.dashboard.statCard,
        'border-l-4',
        `border-l-${stat.color}-500`
      )}
      {...getStaggerAnimation(index, 100)}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {stat.label}
          </p>
          <p className="text-3xl font-bold text-foreground">
            {stat.value}
          </p>
        </div>
        <div className={`p-3 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-lg`}>
          <stat.icon className={`w-6 h-6 text-${stat.color}-600 dark:text-${stat.color}-400`} />
        </div>
      </div>
    </Card>
  ))}
</Grid>
```

**Effet** : 
- Les cartes apparaissent en cascade (stagger)
- Au survol : légère mise à l'échelle et ombre plus prononcée

---

### 2. Graphiques - Animation de chargement

**Objectif** : Animer l'apparition des graphiques

**Implémentation** :
```tsx
<Card className={microInteractions.dashboard.chartContainer}>
  <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
  <div className="h-64">
    <LineChart data={chartData} />
  </div>
</Card>
```

**Effet** : Le conteneur du graphique apparaît avec un fade-in et slide-up.

---

### 3. Actions rapides - Feedback tactile

**Objectif** : Donner un feedback immédiat lors du clic

**Implémentation** :
```tsx
<Button
  variant="ghost"
  className={combineAnimations(
    microInteractions.dashboard.quickAction,
    microInteractions.button.base
  )}
>
  <Icon className="w-5 h-5 mr-2" />
  Quick Action
</Button>
```

**Effet** : 
- Au survol : fond légèrement coloré et scale up
- Au clic : scale down pour un effet "press"

---

## 📝 Formulaires

### 1. Inputs - Focus avec glow

**Objectif** : Améliorer la visibilité des champs actifs

**Implémentation** :
```tsx
<Input
  className={combineAnimations(
    microInteractions.input.base,
    microInteractions.input.focus,
    microInteractions.input.glow
  )}
  label="Email"
  type="email"
/>
```

**Effet** : 
- Au focus : bordure colorée, ring, légère mise à l'échelle, glow subtil
- Transition fluide de 200ms

---

### 2. Validation - Animation de succès/erreur

**Objectif** : Feedback visuel immédiat sur la validation

**Implémentation** :
```tsx
<Input
  className={combineAnimations(
    microInteractions.input.base,
    isValid 
      ? microInteractions.input.success 
      : hasError 
        ? microInteractions.input.error 
        : microInteractions.input.focus
  )}
  error={hasError ? errorMessage : undefined}
/>
```

**Effet** : 
- Succès : bordure verte avec glow
- Erreur : shake animation + bordure rouge

---

### 3. Labels flottants - Animation fluide

**Objectif** : Moderniser l'apparence des formulaires

**Implémentation** :
```tsx
<div className="relative">
  <Input
    className={combineAnimations(
      microInteractions.input.base,
      microInteractions.input.floatingLabel,
      'peer'
    )}
    placeholder=" "
  />
  <label className="absolute left-3 top-2 text-sm text-muted-foreground 
                    peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2
                    peer-focus:top-2 peer-focus:translate-y-0
                    transition-all duration-200">
    Email
  </label>
</div>
```

**Effet** : Le label se déplace vers le haut lorsque l'input est rempli ou en focus.

---

## 🧭 Navigation

### 1. Liens de navigation - Underline animé

**Objectif** : Indiquer visuellement les liens interactifs

**Implémentation** :
```tsx
<Link
  href="/dashboard"
  className={combineAnimations(
    microInteractions.link.base,
    microInteractions.link.underline
  )}
>
  Dashboard
</Link>
```

**Effet** : Une ligne souligne le lien de gauche à droite au survol.

---

### 2. Menu actif - Indicateur visuel

**Objectif** : Montrer clairement la page active

**Implémentation** :
```tsx
<Link
  href="/dashboard"
  className={combineAnimations(
    microInteractions.nav.base,
    isActive && microInteractions.nav.active,
    microInteractions.nav.hover
  )}
>
  Dashboard
</Link>
```

**Effet** : 
- Page active : ligne de soulignement en bas
- Au survol : changement de couleur et légère mise à l'échelle

---

### 3. Menu mobile - Slide-in

**Objectif** : Animation fluide pour le menu mobile

**Implémentation** :
```tsx
<div
  className={combineAnimations(
    isOpen ? 'translate-x-0' : '-translate-x-full',
    'transition-transform duration-300 ease-out'
  )}
>
  {/* Menu content */}
</div>
```

**Effet** : Le menu glisse depuis la gauche avec une transition fluide.

---

## 🃏 Cartes et Listes

### 1. Liste avec stagger animation

**Objectif** : Animer l'apparition des éléments de liste

**Implémentation** :
```tsx
import { microInteractions } from '@/lib/animations/micro-interactions';

{items.map((item, index) => (
  <Card
    key={item.id}
    className={combineAnimations(
      microInteractions.card.base,
      microInteractions.card.hover
    )}
    style={microInteractions.list.stagger(index).style}
  >
    {/* Card content */}
  </Card>
))}
```

**Effet** : Les cartes apparaissent une par une avec un délai progressif.

---

### 2. Carte avec effet tilt

**Objectif** : Ajouter de la profondeur et de l'interactivité

**Implémentation** :
```tsx
<Card className={combineAnimations(
  microInteractions.card.base,
  microInteractions.card.hover,
  microInteractions.card.tilt
)}>
  {/* Card content */}
</Card>
```

**Effet** : La carte s'incline légèrement au survol pour un effet 3D subtil.

---

### 3. Carte avec gradient reveal

**Objectif** : Effet visuel moderne au survol

**Implémentation** :
```tsx
<Card className={combineAnimations(
  microInteractions.card.base,
  microInteractions.card.reveal
)}>
  <div className="relative z-10">
    {/* Card content */}
  </div>
</Card>
```

**Effet** : Un gradient apparaît progressivement au survol de la carte.

---

## 🔘 Boutons

### 1. Bouton avec effet shimmer

**Objectif** : Attirer l'attention sur les CTA importants

**Implémentation** :
```tsx
<Button
  variant="primary"
  className={combineAnimations(
    microInteractions.button.base,
    microInteractions.button.shimmer,
    microInteractions.button.glow
  )}
>
  Découvrir les dates
</Button>
```

**Effet** : Un effet de brillance traverse le bouton au survol.

---

### 2. Bouton avec ripple effect

**Objectif** : Feedback visuel au clic

**Implémentation** :
```tsx
<Button
  variant="primary"
  className={combineAnimations(
    microInteractions.button.base,
    microInteractions.button.ripple
  )}
>
  Envoyer
</Button>
```

**Effet** : Une onde se propage depuis le point de clic.

---

### 3. Bouton avec pulse

**Objectif** : Indiquer une action importante ou urgente

**Implémentation** :
```tsx
<Button
  variant="primary"
  className={combineAnimations(
    microInteractions.button.base,
    microInteractions.button.pulse
  )}
>
  Réserver maintenant
</Button>
```

**Effet** : Le bouton pulse légèrement pour attirer l'attention.

---

## 💬 Feedback utilisateur

### 1. Toast notifications - Slide-in

**Objectif** : Notifications non-intrusives

**Implémentation** :
```tsx
<div
  className={combineAnimations(
    microInteractions.notification.slideIn,
    'fixed top-4 right-4 z-50'
  )}
>
  <div className="bg-background border rounded-lg shadow-lg p-4">
    {message}
  </div>
</div>
```

**Effet** : La notification glisse depuis la droite et disparaît automatiquement.

---

### 2. Messages de succès/erreur

**Objectif** : Feedback clair sur les actions

**Implémentation** :
```tsx
<div className={combineAnimations(
  microInteractions.feedback.success, // ou .error, .info
  'p-4 rounded-lg border'
)}>
  <Icon className="w-5 h-5 mr-2" />
  {message}
</div>
```

**Effet** : 
- Succès : scale-in avec fond vert clair
- Erreur : shake animation avec bordure rouge
- Info : fade-in avec fond bleu clair

---

### 3. Loading states - Skeleton

**Objectif** : Indiquer le chargement de manière élégante

**Implémentation** :
```tsx
<div className={microInteractions.loading.skeleton}>
  <div className="h-4 w-3/4 mb-2 rounded"></div>
  <div className="h-4 w-1/2 rounded"></div>
</div>
```

**Effet** : Animation de pulse subtile sur les éléments de chargement.

---

## 🎯 Résumé des animations proposées

### Par type d'élément :

1. **Boutons** : Glow, Shimmer, Ripple, Pulse, Bounce
2. **Cartes** : Lift, Tilt, Glow, Border gradient, Image zoom, Reveal
3. **Inputs** : Focus glow, Floating labels, Success/Error states
4. **Navigation** : Underline animé, Active indicator, Hover scale
5. **Listes** : Stagger animation, Scroll reveal
6. **Feedback** : Toast slide-in, Success/Error animations, Loading states

### Par page :

1. **Homepage** : Hero animations, Tour cards hover, Stats scroll reveal
2. **Dashboard** : Stats cards stagger, Charts fade-in, Quick actions feedback
3. **Formulaires** : Input focus, Validation feedback, Floating labels
4. **Navigation** : Active states, Mobile menu slide, Link underlines

---

## 🚀 Prochaines étapes

1. **Implémentation progressive** : Commencer par les pages les plus visitées (homepage, dashboard)
2. **Tests utilisateurs** : Valider que les animations améliorent l'UX
3. **Performance** : S'assurer que les animations n'impactent pas les performances
4. **Accessibilité** : Respecter `prefers-reduced-motion` (déjà implémenté)

---

## 📚 Références

- Fichier principal : `apps/web/src/lib/animations/micro-interactions.ts`
- Styles CSS : `apps/web/src/app/globals.css`
- Configuration Tailwind : `apps/web/tailwind.config.ts`
