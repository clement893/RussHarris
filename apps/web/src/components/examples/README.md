# Composants d'exemples - Micro-interactions

Ce dossier contient des composants d'exemple démontrant l'utilisation des micro-interactions et animations définies dans `@/lib/animations/micro-interactions`.

## 📦 Composants disponibles

### 1. `AnimatedTourCard`
Composant de carte pour les événements/tournées avec animations au survol.

**Fonctionnalités** :
- Animation d'entrée avec délai (stagger)
- Zoom de l'image au survol
- Effet de lift (soulèvement) de la carte
- Transition fluide du texte et des icônes

**Utilisation** :
```tsx
import { AnimatedTourCard } from '@/components/examples/AnimatedTourCard';

<AnimatedTourCard
  title="Workshop Paris"
  date="15 Mars 2024"
  location="Paris, France"
  image="/images/events/paris.jpg"
  href="/events/paris-workshop"
  index={0}
/>
```

---

### 2. `AnimatedStatCard`
Composant de carte de statistique pour le dashboard avec animations.

**Fonctionnalités** :
- Animation d'entrée en cascade (stagger)
- Hover effect avec scale
- Animation de l'icône au survol
- Support des tendances (trend indicators)

**Utilisation** :
```tsx
import { AnimatedStatCard } from '@/components/examples/AnimatedStatCard';
import { Users } from 'lucide-react';

<AnimatedStatCard
  label="Total Users"
  value={1250}
  icon={Users}
  color="primary"
  index={0}
  trend={{ value: 12, isPositive: true }}
/>
```

---

### 3. `AnimatedButton`
Bouton avec différents effets d'animation.

**Fonctionnalités** :
- Plusieurs types d'animations : glow, shimmer, ripple, pulse, bounce
- Transitions fluides
- Feedback visuel au hover et au clic

**Utilisation** :
```tsx
import { AnimatedButton } from '@/components/examples/AnimatedButton';

<AnimatedButton
  animation="glow"
  variant="primary"
  onClick={handleClick}
>
  Découvrir
</AnimatedButton>
```

**Types d'animations disponibles** :
- `default` : Animation de base avec hover
- `glow` : Effet de lueur au survol
- `shimmer` : Effet de brillance qui traverse le bouton
- `ripple` : Effet d'onde au clic
- `pulse` : Animation de pulsation
- `bounce` : Animation de rebond au clic

---

### 4. `ScrollReveal`
Composant qui révèle le contenu lors du scroll.

**Fonctionnalités** :
- Utilise Intersection Observer API pour la performance
- Animation fade-in + slide-up
- Configurable (threshold, delay)
- Se déconnecte automatiquement après la première révélation

**Utilisation** :
```tsx
import { ScrollReveal } from '@/components/examples/ScrollReveal';

<ScrollReveal threshold={0.2} delay={100}>
  <div>
    <h2>Contenu qui apparaît au scroll</h2>
    <p>Ce contenu sera révélé lorsque l'utilisateur fait défiler la page.</p>
  </div>
</ScrollReveal>
```

**Props** :
- `threshold` : Seuil de visibilité (0-1), défaut: 0.1
- `delay` : Délai avant l'animation en ms, défaut: 0
- `className` : Classes CSS supplémentaires

---

## 🎨 Intégration dans vos pages

### Exemple : Page d'accueil avec cartes animées

```tsx
import { AnimatedTourCard } from '@/components/examples/AnimatedTourCard';
import { ScrollReveal } from '@/components/examples/ScrollReveal';

export default function HomePage() {
  const events = [
    { title: 'Paris', date: '15 Mars', location: 'Paris, France', ... },
    { title: 'Lyon', date: '22 Mars', location: 'Lyon, France', ... },
    // ...
  ];

  return (
    <section>
      <ScrollReveal>
        <h2>Prochaines dates</h2>
      </ScrollReveal>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <AnimatedTourCard
            key={event.id}
            {...event}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
```

### Exemple : Dashboard avec statistiques animées

```tsx
import { AnimatedStatCard } from '@/components/examples/AnimatedStatCard';
import { Users, FileText, Calendar, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  const stats = [
    { label: 'Users', value: 1250, icon: Users, color: 'primary' as const },
    { label: 'Documents', value: 342, icon: FileText, color: 'secondary' as const },
    { label: 'Events', value: 28, icon: Calendar, color: 'info' as const },
    { label: 'Growth', value: '+12%', icon: TrendingUp, color: 'success' as const },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <AnimatedStatCard
          key={stat.label}
          {...stat}
          index={index}
        />
      ))}
    </div>
  );
}
```

---

## 🔧 Personnalisation

Tous ces composants utilisent les utilitaires d'animation centralisés. Pour personnaliser :

1. **Modifier les animations** : Éditez `apps/web/src/lib/animations/micro-interactions.ts`
2. **Ajouter de nouvelles animations CSS** : Éditez `apps/web/src/app/globals.css`
3. **Configurer Tailwind** : Éditez `apps/web/tailwind.config.ts`

---

## 📚 Documentation complète

Voir le document principal : `PROPOSITIONS_MICRO_INTERACTIONS.md` à la racine du projet pour :
- Toutes les propositions d'animations
- Exemples d'utilisation par page
- Guide d'implémentation
- Bonnes pratiques

---

## ⚡ Performance

- Toutes les animations respectent `prefers-reduced-motion`
- Utilisation d'Intersection Observer pour les animations au scroll
- Animations CSS pures (pas de JavaScript pour les animations de base)
- Désactivation automatique après la première révélation (ScrollReveal)

---

## ♿ Accessibilité

- Respect de `prefers-reduced-motion` (déjà implémenté dans Tailwind)
- Animations non bloquantes
- Focus visible sur les éléments interactifs
- Transitions fluides pour éviter les mouvements saccadés
