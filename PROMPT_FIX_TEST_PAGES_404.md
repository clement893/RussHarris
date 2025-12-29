# Prompt pour corriger les erreurs 404 sur les pages de test

## Problème
Les pages de test retournent des erreurs 404 sur Next.js 16 avec App Router. Par exemple :
- `/fr/test/api-connections` → 404
- `/fr/test/admin-logs` → 404

Alors que d'autres pages de test fonctionnent :
- `/fr/stripe/testing` → ✅ Fonctionne
- `/fr/email/testing` → ✅ Fonctionne
- `/fr/sentry/testing` → ✅ Fonctionne

## Solution : Suivre le pattern `/[service]/testing/`

Next.js App Router nécessite que les pages de test suivent le pattern `/[service]/testing/` au lieu de `/test/[service]/`.

### Étapes à suivre

1. **Identifier les pages qui ne fonctionnent pas**
   - Trouver toutes les pages dans `/test/[service]/` qui retournent 404
   - Comparer avec les pages qui fonctionnent dans `/[service]/testing/`

2. **Déplacer les pages**
   - Déplacer `/test/[service]/page.tsx` → `/[service]/testing/page.tsx`
   - Déplacer tous les fichiers associés (components, hooks, services, types, etc.)

3. **Créer les layouts parents**
   - Créer `/[service]/layout.tsx` avec :
     ```typescript
     'use client';
     
     export const dynamic = 'force-dynamic';
     export const runtime = 'nodejs';
     
     import DashboardLayout from '@/components/layout/DashboardLayout';
     
     export default DashboardLayout;
     ```

4. **Mettre à jour toutes les références**
   - Middleware : routes publiques
   - Navigation : liens de menu
   - Composants : liens internes
   - Redirects : pages de redirection

5. **Vérifier les exports dans les pages**
   - S'assurer que les pages ont `'use client'` si elles utilisent des composants clients
   - Pas d'exports `dynamic` ou `runtime` dans les pages (seulement dans les layouts)

### Exemple de structure avant/après

**Avant (ne fonctionne pas) :**
```
apps/web/src/app/[locale]/
└── test/
    ├── layout.tsx
    ├── admin-logs/
    │   └── page.tsx
    └── api-connections/
        └── page.tsx
```

**Après (fonctionne) :**
```
apps/web/src/app/[locale]/
├── admin-logs/
│   ├── layout.tsx  (avec dynamic + runtime exports)
│   └── testing/
│       └── page.tsx
└── api-connections/
    ├── layout.tsx  (avec dynamic + runtime exports)
    └── testing/
        └── page.tsx
```

### Checklist de vérification

- [ ] Pages déplacées vers `/[service]/testing/`
- [ ] Layouts parents créés avec `dynamic` et `runtime` exports
- [ ] Pages ont `'use client'` si nécessaire
- [ ] Middleware mis à jour avec les nouvelles routes
- [ ] Navigation mise à jour
- [ ] Tous les liens internes mis à jour
- [ ] Redirects mis à jour
- [ ] Build fonctionne sans erreurs

### Fichiers typiques à modifier

- `src/middleware.ts` - Routes publiques
- `src/lib/navigation/index.tsx` - Navigation principale
- `src/app/[locale]/admin/AdminContent.tsx` - Liens admin
- `src/app/admin/logs/page.tsx` - Redirects
- Tous les composants qui référencent les anciennes routes

---

## Prompt à utiliser

```
J'ai des pages de test qui retournent des erreurs 404 sur Next.js 16 avec App Router.

Pages qui ne fonctionnent pas :
- /fr/test/api-connections → 404
- /fr/test/admin-logs → 404

Pages qui fonctionnent (pour référence) :
- /fr/stripe/testing → ✅
- /fr/email/testing → ✅
- /fr/sentry/testing → ✅

Structure actuelle :
- Les pages qui ne fonctionnent pas sont dans /test/[service]/
- Les pages qui fonctionnent sont dans /[service]/testing/

Peux-tu :
1. Identifier toutes les pages dans /test/ qui doivent être déplacées
2. Les déplacer vers /[service]/testing/ en suivant le pattern des pages qui fonctionnent
3. Créer les layouts parents nécessaires avec les exports dynamic et runtime
4. Mettre à jour toutes les références (middleware, navigation, liens, redirects)
5. Vérifier que les pages ont 'use client' si nécessaire

Le pattern à suivre est le même que /stripe/testing, /email/testing, etc.
```
