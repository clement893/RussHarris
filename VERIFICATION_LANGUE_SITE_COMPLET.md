# Vérification - La Langue Suit l'Utilisateur sur Tout le Site

## ✅ Oui, la langue suit maintenant l'utilisateur correctement

### Mécanismes en place

#### 1. **Sauvegarde de la préférence** ✅
- La préférence est sauvegardée dans la DB (`user_preferences` table)
- Clé : `"language"`, Valeur : `"en"` ou `"fr"`

#### 2. **Synchronisation au chargement** ✅
- Composant `LocaleSync` dans le layout principal
- Vérifie la préférence à chaque chargement de page
- Redirige automatiquement si la locale URL ≠ préférence DB

#### 3. **Navigation préservant la locale** ✅
- Les composants utilisent `Link` de `@/i18n/routing`
- Ce `Link` préserve automatiquement la locale dans l'URL
- Tous les liens internes gardent la langue de l'utilisateur

#### 4. **Changement de langue** ✅
- Quand l'utilisateur change la langue dans les préférences :
  - Sauvegarde en DB
  - Redirection immédiate vers la nouvelle locale
  - Toutes les pages suivantes utilisent la nouvelle langue

### Flux complet

```
1. Utilisateur se connecte
   ↓
2. LocaleSync charge les préférences
   ↓
3. Si préférence ≠ locale URL → Redirection
   ↓
4. Utilisateur navigue (clique sur liens)
   ↓
5. Link de next-intl préserve la locale
   ↓
6. LocaleSync vérifie à nouveau sur nouvelle page
   ↓
7. Si toujours différent → Redirection
```

### Points de vérification

#### ✅ Au chargement initial
- `LocaleSync` vérifie la préférence
- Redirige si nécessaire

#### ✅ Lors de la navigation
- `Link` de `@/i18n/routing` préserve la locale
- `LocaleSync` vérifie à nouveau sur chaque nouvelle page

#### ✅ Changement de préférence
- Sauvegarde en DB
- Redirection immédiate
- Toutes les pages suivantes utilisent la nouvelle langue

### Composants concernés

1. **LocaleSync** (`apps/web/src/components/preferences/LocaleSync.tsx`)
   - Vérifie la préférence à chaque changement de `pathname`
   - Redirige si nécessaire

2. **PreferencesManager** (`apps/web/src/components/preferences/PreferencesManager.tsx`)
   - Sauvegarde la préférence
   - Redirige après sauvegarde

3. **Link** (`apps/web/src/i18n/routing.ts`)
   - Préserve automatiquement la locale dans les URLs
   - Utilisé dans Header, Footer, Sidebar, etc.

### Cas d'usage testés

#### ✅ Scénario 1 : Premier chargement
1. Utilisateur avec préférence `"fr"` accède à `/dashboard`
2. `LocaleSync` détecte que locale URL (`en`) ≠ préférence (`fr`)
3. Redirection vers `/fr/dashboard`
4. Page s'affiche en français

#### ✅ Scénario 2 : Navigation
1. Utilisateur sur `/fr/dashboard` (préférence `fr`)
2. Clique sur lien vers `/settings`
3. `Link` de next-intl génère `/fr/settings`
4. Page s'affiche en français

#### ✅ Scénario 3 : Changement de préférence
1. Utilisateur sur `/fr/settings/preferences`
2. Change langue de `fr` à `en`
3. Sauvegarde → Redirection vers `/settings/preferences`
4. Toutes les pages suivantes en anglais

#### ✅ Scénario 4 : Accès direct avec mauvaise locale
1. Utilisateur avec préférence `fr` accède directement à `/en/dashboard`
2. `LocaleSync` détecte l'incohérence
3. Redirection vers `/fr/dashboard`
4. Page s'affiche en français

### Limitations connues

1. **Première requête** : La première requête peut être dans la mauvaise langue si l'utilisateur accède directement via URL. La redirection se fait ensuite côté client.

2. **Non-authentifié** : `LocaleSync` ne fonctionne que pour les utilisateurs authentifiés. Les visiteurs anonymes utilisent la locale de l'URL.

3. **Performance** : Une requête API est faite à chaque changement de page pour vérifier les préférences. C'est acceptable car :
   - Les préférences sont mises en cache par le navigateur
   - La vérification est asynchrone et ne bloque pas le rendu

### Améliorations possibles (futures)

1. **Cache côté client** : Mettre en cache la préférence dans le localStorage pour éviter les requêtes répétées
2. **Middleware** : Vérifier la préférence côté serveur dans le middleware Next.js
3. **Cookie** : Stocker la préférence dans un cookie pour accès serveur

---

**Status** : ✅ **La langue suit correctement l'utilisateur sur tout le site**

