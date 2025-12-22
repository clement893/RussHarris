# Hooks Usage Guide

Guide complet pour utiliser les hooks personnalisés dans l'application frontend.

## Table des matières

- [useSubscription](#usesubscription)
- [Exemples d'utilisation](#exemples-dutilisation)
- [Bonnes pratiques](#bonnes-pratiques)

## useSubscription

Hook personnalisé pour gérer les abonnements utilisateur.

### API

```typescript
interface UseSubscriptionReturn {
  subscription: Subscription | null;
  isLoading: boolean;
  error: string | null;
  hasActiveSubscription: boolean;
  refresh: () => Promise<void>;
}
```

### Propriétés

- **subscription**: L'abonnement actuel de l'utilisateur ou `null` s'il n'en a pas
- **isLoading**: Indique si les données sont en cours de chargement
- **error**: Message d'erreur s'il y en a un, sinon `null`
- **hasActiveSubscription**: Booléen indiquant si l'utilisateur a un abonnement actif (ACTIVE ou TRIALING)
- **refresh**: Fonction pour recharger les données de l'abonnement

## Exemples d'utilisation

### Exemple 1: Affichage basique de l'abonnement

```tsx
'use client';

import { useSubscription } from '@/hooks/useSubscription';
import { Card } from '@/components/ui/Card';
import { Loader2 } from 'lucide-react';

export function SubscriptionDisplay() {
  const { subscription, isLoading, error } = useSubscription();

  if (isLoading) {
    return <Loader2 className="w-8 h-8 animate-spin" />;
  }

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  if (!subscription) {
    return <div>No active subscription</div>;
  }

  return (
    <Card>
      <h2>Current Plan: {subscription.plan.name}</h2>
      <p>Status: {subscription.status}</p>
      <p>Next billing: {subscription.current_period_end}</p>
    </Card>
  );
}
```

### Exemple 2: Protection de route avec abonnement

```tsx
'use client';

import { useSubscription } from '@/hooks/useSubscription';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';

export function ProtectedContent() {
  const { hasActiveSubscription, isLoading } = useSubscription();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !hasActiveSubscription) {
      router.push('/pricing');
    }
  }, [hasActiveSubscription, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!hasActiveSubscription) {
    return null; // Redirection en cours
  }

  return (
    <div>
      <h1>Premium Content</h1>
      {/* Contenu premium */}
    </div>
  );
}
```

### Exemple 3: Gestion d'abonnement avec refresh

```tsx
'use client';

import { useSubscription } from '@/hooks/useSubscription';
import { Button } from '@/components/ui/Button';
import { api } from '@/lib/api';
import { useState } from 'react';

export function SubscriptionManagement() {
  const { subscription, refresh, hasActiveSubscription } = useSubscription();
  const [isUpgrading, setIsUpgrading] = useState(false);

  const handleUpgrade = async (planId: number) => {
    setIsUpgrading(true);
    try {
      await api.post(`/v1/subscriptions/upgrade/${planId}`);
      // Recharger les données après mise à jour
      await refresh();
    } catch (error) {
      console.error('Failed to upgrade:', error);
    } finally {
      setIsUpgrading(false);
    }
  };

  if (!hasActiveSubscription) {
    return <div>Please subscribe to access this feature</div>;
  }

  return (
    <div>
      <h2>Your Subscription</h2>
      <p>Current Plan: {subscription?.plan.name}</p>
      
      <Button
        onClick={() => handleUpgrade(2)}
        disabled={isUpgrading}
      >
        {isUpgrading ? 'Upgrading...' : 'Upgrade to Premium'}
      </Button>
    </div>
  );
}
```

### Exemple 4: Affichage conditionnel selon le plan

```tsx
'use client';

import { useSubscription } from '@/hooks/useSubscription';
import { formatPrice } from '@/utils/subscriptions';

export function FeatureList() {
  const { subscription, hasActiveSubscription } = useSubscription();

  const canAccessFeature = (featureName: string) => {
    if (!subscription) return false;
    
    // Logique basée sur le plan
    if (featureName === 'advanced_analytics') {
      return subscription.plan.name === 'Pro' || subscription.plan.name === 'Enterprise';
    }
    
    if (featureName === 'api_access') {
      return subscription.plan.name === 'Enterprise';
    }
    
    return hasActiveSubscription;
  };

  return (
    <div>
      <h2>Available Features</h2>
      
      <div className={canAccessFeature('basic_features') ? '' : 'opacity-50'}>
        <h3>Basic Features</h3>
        <p>Available on all plans</p>
      </div>

      <div className={canAccessFeature('advanced_analytics') ? '' : 'opacity-50'}>
        <h3>Advanced Analytics</h3>
        <p>Available on Pro and Enterprise plans</p>
        {!canAccessFeature('advanced_analytics') && (
          <p className="text-sm text-gray-500">
            Upgrade to Pro ({formatPrice(2900)}) to unlock
          </p>
        )}
      </div>

      <div className={canAccessFeature('api_access') ? '' : 'opacity-50'}>
        <h3>API Access</h3>
        <p>Available on Enterprise plan only</p>
      </div>
    </div>
  );
}
```

### Exemple 5: Dashboard avec état d'abonnement

```tsx
'use client';

import { useSubscription } from '@/hooks/useSubscription';
import { formatPrice, formatDate, isSubscriptionExpired } from '@/utils/subscriptions';
import { Alert } from '@/components/ui/Alert';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export function Dashboard() {
  const { subscription, isLoading, hasActiveSubscription } = useSubscription();
  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const isExpired = subscription
    ? isSubscriptionExpired(subscription.current_period_end)
    : false;

  return (
    <div className="space-y-6">
      <h1>Dashboard</h1>

      {!hasActiveSubscription && (
        <Alert variant="warning">
          <p>You don't have an active subscription.</p>
          <Button onClick={() => router.push('/pricing')}>
            View Plans
          </Button>
        </Alert>
      )}

      {isExpired && (
        <Alert variant="error">
          <p>Your subscription has expired. Please renew to continue using premium features.</p>
          <Button onClick={() => router.push('/subscriptions')}>
            Manage Subscription
          </Button>
        </Alert>
      )}

      {hasActiveSubscription && subscription && (
        <div className="bg-green-50 p-4 rounded">
          <h2>Subscription Active</h2>
          <p>Plan: {subscription.plan.name}</p>
          <p>Price: {formatPrice(subscription.plan.amount, subscription.plan.currency)}</p>
          <p>Next billing: {formatDate(subscription.current_period_end)}</p>
        </div>
      )}

      {/* Contenu du dashboard */}
    </div>
  );
}
```

### Exemple 6: Utilisation avec plusieurs composants

```tsx
'use client';

import { useSubscription } from '@/hooks/useSubscription';

// Composant Header qui utilise le hook
export function Header() {
  const { hasActiveSubscription } = useSubscription();

  return (
    <header>
      <nav>
        <a href="/">Home</a>
        {hasActiveSubscription && (
          <a href="/premium-features">Premium Features</a>
        )}
        <a href="/pricing">Pricing</a>
      </nav>
    </header>
  );
}

// Composant Footer qui utilise aussi le hook
export function Footer() {
  const { subscription } = useSubscription();

  return (
    <footer>
      {subscription && (
        <p>Current Plan: {subscription.plan.name}</p>
      )}
    </footer>
  );
}

// Le hook est partagé entre les composants via React Context
// Chaque composant peut utiliser useSubscription indépendamment
```

## Bonnes pratiques

### 1. Gérer les états de chargement

Toujours vérifier `isLoading` avant d'afficher les données :

```tsx
const { subscription, isLoading } = useSubscription();

if (isLoading) {
  return <LoadingSpinner />;
}

// Utiliser subscription ici
```

### 2. Gérer les erreurs

Toujours afficher les erreurs à l'utilisateur :

```tsx
const { subscription, error } = useSubscription();

if (error) {
  return <ErrorMessage message={error} />;
}
```

### 3. Utiliser refresh après mutations

Après avoir modifié l'abonnement, toujours appeler `refresh()` :

```tsx
const { refresh } = useSubscription();

const handleCancel = async () => {
  await api.post('/v1/subscriptions/cancel');
  await refresh(); // Recharger les données
};
```

### 4. Vérifier hasActiveSubscription pour la protection

Utiliser `hasActiveSubscription` plutôt que vérifier `subscription.status` :

```tsx
// ✅ Bon
const { hasActiveSubscription } = useSubscription();
if (!hasActiveSubscription) return null;

// ❌ Moins bon
const { subscription } = useSubscription();
if (subscription?.status !== 'ACTIVE' && subscription?.status !== 'TRIALING') return null;
```

### 5. Éviter les appels API multiples

Le hook gère déjà le chargement, ne pas faire d'appels API supplémentaires :

```tsx
// ✅ Bon
const { subscription } = useSubscription();
const planName = subscription?.plan.name;

// ❌ Moins bon
const { subscription } = useSubscription();
const [plan, setPlan] = useState(null);
useEffect(() => {
  if (subscription?.plan_id) {
    api.get(`/v1/subscriptions/plans/${subscription.plan_id}`).then(setPlan);
  }
}, [subscription]);
```

### 6. Utiliser les utils pour le formatage

Utiliser les fonctions utilitaires pour formater les données :

```tsx
import { formatPrice, formatDate } from '@/utils/subscriptions';

const { subscription } = useSubscription();

// ✅ Bon
<p>Price: {formatPrice(subscription?.plan.amount)}</p>
<p>Date: {formatDate(subscription?.current_period_end)}</p>

// ❌ Moins bon
<p>Price: ${(subscription?.plan.amount / 100).toFixed(2)}</p>
```

## Utilitaires associés

Le hook `useSubscription` fonctionne avec les utilitaires de `@/utils/subscriptions` :

- `formatPrice()` - Formater les prix
- `formatDate()` - Formater les dates
- `formatInterval()` - Formater les intervalles de facturation
- `isSubscriptionActive()` - Vérifier si l'abonnement est actif
- `isSubscriptionExpired()` - Vérifier si l'abonnement est expiré

Voir [utils/subscriptions.ts](../../apps/web/src/utils/subscriptions.ts) pour plus de détails.

## Dépannage

### Le hook ne charge pas les données

Vérifiez que :
1. L'utilisateur est authentifié (`useSession` retourne `status: 'authenticated'`)
2. L'API backend est accessible
3. Les headers d'authentification sont correctement configurés

### Les données ne se mettent pas à jour

Assurez-vous d'appeler `refresh()` après les mutations :

```tsx
const { refresh } = useSubscription();

const handleAction = async () => {
  await api.post('/v1/subscriptions/...');
  await refresh(); // Important !
};
```

### Erreur 404 lors du chargement

Un 404 n'est pas une erreur - cela signifie simplement que l'utilisateur n'a pas d'abonnement. Le hook gère cela automatiquement et retourne `subscription: null`.

