# Rapport d'Audit - Problèmes de Cache et Délais de Synchronisation

**Date:** ${new Date().toISOString().split('T')[0]}
**Problème:** Délais importants (plusieurs minutes) entre les changements backend/BDD et leur apparition dans le frontend

---

## 🔍 Résumé Exécutif

L'audit révèle plusieurs couches de cache qui peuvent causer des délais significatifs :
1. **Cache Next.js** (pages statiques/générées)
2. **Cache Redis** (backend)
3. **Cache HTTP** (navigateur/serveurs intermédiaires)
4. **Stratégies de revalidation** manquantes ou incorrectes

---

## 📊 Problèmes Identifiés

### 1. **Pages Next.js sans Revalidation**

#### Problème
De nombreuses pages Next.js n'ont pas de configuration explicite de revalidation, ce qui peut entraîner une mise en cache indéfinie.

#### Exemples trouvés :
- `/book/page.tsx` - Pas de `revalidate` défini
- `/cities/page.tsx` - Pas de `revalidate` défini
- `/admin/masterclass/page.tsx` - `revalidate = 0` mais peut être ignoré en production

#### Impact
- Pages statiques générées au build qui ne se mettent pas à jour
- Changements backend non visibles immédiatement

---

### 2. **Cache Redis dans le Backend**

#### Problème
Le backend utilise un système de cache Redis avec des décorateurs `@cached` qui peuvent mettre en cache des réponses pendant des périodes indéfinies.

#### Fichier : `backend/app/core/cache.py`

```python
# Cache patterns utilisés
- `@cached` décorateur pour mettre en cache les réponses
- `invalidate_cache_pattern` pour invalider le cache
```

#### Impact
- Les endpoints API peuvent retourner des données mises en cache
- Pas de TTL (Time To Live) visible dans le code
- Invalidation manuelle nécessaire

---

### 3. **Absence de Headers HTTP Cache-Control**

#### Problème
Le backend FastAPI ne définit probablement pas explicitement les headers `Cache-Control` pour forcer ou empêcher la mise en cache.

#### Impact
- Le navigateur et les proxies intermédiaires peuvent mettre en cache les réponses
- Pas de contrôle sur la durée de vie du cache HTTP
- Comportement par défaut du navigateur (variable)

---

### 4. **Client API sans Configuration de Cache**

#### Fichier : `apps/web/src/lib/api/client.ts`

#### Problème
Le client API Axios n'a pas de configuration explicite pour gérer le cache :
- Pas de `Cache-Control` headers dans les requêtes
- Pas de stratégie de revalidation
- Pas d'utilisation de SWR ou React Query pour la gestion du cache

#### Impact
- Le navigateur utilise son cache par défaut
- Pas de mécanisme de revalidation automatique
- Les requêtes peuvent retourner des données obsolètes

---

### 5. **Pages Admin avec `revalidate = 0`**

#### Exemples :
- `/admin/masterclass/page.tsx` : `revalidate = 0`

#### Problème
`revalidate = 0` devrait empêcher la mise en cache, mais :
- En mode développement, cela fonctionne
- En production avec ISR (Incremental Static Regeneration), cela peut être ignoré
- Next.js peut toujours mettre en cache la page initiale

#### Recommandation
Utiliser `export const dynamic = 'force-dynamic'` à la place

---

### 6. **Données Fetchées au Build Time**

#### Problème
Si des pages utilisent `generateStaticParams` ou fetch des données au build time, ces données ne se mettront pas à jour jusqu'au prochain build.

---

## 🎯 Recommandations

### Priorité 1 : Critique

#### 1.1 Ajouter `dynamic = 'force-dynamic'` aux Pages Admin

**Fichiers à modifier :**
- `apps/web/src/app/[locale]/admin/masterclass/page.tsx`
- Toutes les autres pages admin

**Changement :**
```typescript
// AVANT
export const revalidate = 0;

// APRÈS
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
```

**Raison :** Force Next.js à rendre la page dynamiquement à chaque requête, évitant tout cache.

---

#### 1.2 Ajouter Headers Cache-Control au Backend

**Fichier :** `backend/app/main.py`

**Ajout d'un middleware :**
```python
@app.middleware("http")
async def add_cache_control_header(request: Request, call_next):
    response = await call_next(request)
    
    # Désactiver le cache pour les endpoints admin
    if request.url.path.startswith("/v1/masterclass"):
        response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
        response.headers["Pragma"] = "no-cache"
        response.headers["Expires"] = "0"
    
    # Ou permettre le cache avec revalidation pour les endpoints publics
    # response.headers["Cache-Control"] = "public, max-age=60, must-revalidate"
    
    return response
```

---

#### 1.3 Configurer le Client API pour Désactiver le Cache

**Fichier :** `apps/web/src/lib/api/client.ts`

**Ajout dans la configuration Axios :**
```typescript
this.client = axios.create({
  baseURL: getApiUrlLazy(),
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  },
  // ...
});
```

---

### Priorité 2 : Important

#### 2.1 Vérifier et Configurer le Cache Redis

**Action :**
1. Vérifier les TTL (Time To Live) des clés de cache Redis
2. Réduire les TTL pour les endpoints sensibles (admin, masterclass)
3. Implémenter une invalidation automatique après les opérations de modification

**Exemple :**
```python
@router.post("/city-events")
@invalidate_cache_pattern("masterclass:*")  # Invalider après création
async def create_city_event(...):
    # ...
```

---

#### 2.2 Ajouter Revalidation aux Pages Publiques

**Pour les pages publiques qui doivent se mettre à jour :**
```typescript
export const revalidate = 60; // Revalider toutes les 60 secondes
```

**Pour les pages qui doivent toujours être à jour :**
```typescript
export const dynamic = 'force-dynamic';
```

---

#### 2.3 Utiliser `useEffect` avec Revalidation dans les Composants Client

**Pour les données critiques :**
```typescript
useEffect(() => {
  const interval = setInterval(() => {
    loadData(); // Recharger les données
  }, 30000); // Toutes les 30 secondes

  return () => clearInterval(interval);
}, []);
```

---

### Priorité 3 : Amélioration

#### 3.1 Implémenter SWR ou React Query

**Avantages :**
- Cache intelligent avec revalidation automatique
- Polling configurable
- Invalidation automatique après mutations
- Gestion optimiste des mises à jour

**Exemple avec SWR :**
```typescript
import useSWR from 'swr';

const { data, error, mutate } = useSWR(
  '/v1/masterclass/city-events/all',
  fetcher,
  {
    refreshInterval: 30000, // Revalider toutes les 30 secondes
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  }
);
```

---

#### 3.2 Ajouter un Système d'Invalidation de Cache Global

**Implémenter un système d'événements pour invalider le cache côté frontend :**
- WebSocket pour les notifications en temps réel
- Polling périodique pour vérifier les changements
- Événements personnalisés après les mutations

---

## 📋 Plan d'Action

### Phase 1 : Correctifs Immédiats (1-2 heures)

1. ✅ Ajouter `dynamic = 'force-dynamic'` aux pages admin
2. ✅ Ajouter headers Cache-Control au backend
3. ✅ Configurer le client API pour désactiver le cache

### Phase 2 : Améliorations (2-4 heures)

1. ⬜ Vérifier et configurer le cache Redis
2. ⬜ Ajouter revalidation aux pages publiques
3. ⬜ Implémenter revalidation dans les composants client

### Phase 3 : Optimisations (4-8 heures)

1. ⬜ Implémenter SWR/React Query
2. ⬜ Système d'invalidation de cache global
3. ⬜ Tests et monitoring

---

## 🧪 Tests Recommandés

1. **Test de cache HTTP :**
   - Ouvrir DevTools → Network
   - Vérifier les headers `Cache-Control` dans les réponses
   - Vérifier que les requêtes ne sont pas mises en cache

2. **Test de revalidation Next.js :**
   - Modifier une donnée dans la BDD
   - Vérifier que la page se met à jour immédiatement
   - Vérifier les logs Next.js pour voir si la page est régénérée

3. **Test de cache Redis :**
   - Vérifier les clés Redis avec `redis-cli KEYS "masterclass:*"`
   - Vérifier les TTL avec `redis-cli TTL <key>`
   - Vérifier l'invalidation après les mutations

---

## 📊 Métriques à Surveiller

- Temps de réponse des API
- Taux de cache hit/miss (Redis)
- Fréquence de revalidation (Next.js)
- Temps entre modification et mise à jour frontend

---

## 🔗 Références

- [Next.js Caching](https://nextjs.org/docs/app/building-your-application/caching)
- [FastAPI Caching](https://fastapi.tiangolo.com/tutorial/dependencies/)
- [HTTP Cache-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control)
- [Axios Request Config](https://axios-http.com/docs/req_config)
