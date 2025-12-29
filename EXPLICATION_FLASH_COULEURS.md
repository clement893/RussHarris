# 🔍 Explication des Flashs de Couleurs au Hard Refresh

**Date:** 29 décembre 2025  
**Problème:** Flashs/changements de couleurs visibles lors d'un hard refresh

---

## 🔴 Cause du Problème

### Problème Principal : Variables CSS Non Définies

Le CSS inline dans `layout.tsx` utilise :
```css
body {
  background-color: var(--color-background);
  color: var(--color-foreground);
}
```

**Mais ces variables CSS ne sont pas définies par défaut !**

### Séquence du Flash

1. **HTML rendu** → Le navigateur voit `var(--color-background)` qui n'existe pas
   - Le navigateur utilise une valeur par défaut (transparent ou blanc)
   - **Flash blanc/transparent visible**

2. **Script inline s'exécute** (`themeCacheInlineScript`)
   - Si cache existe → Applique le thème depuis localStorage
   - **Flash de changement de couleur**

3. **React hydrate** → `GlobalThemeProvider` charge le thème depuis l'API
   - Si différent du cache → Applique le nouveau thème
   - **Flash supplémentaire si différent**

4. **Dark mode class** → La classe `dark` ou `light` est appliquée
   - Si appliquée après le rendu → **Flash de changement**

---

## ✅ Solution Appliquée

### Ajout de Valeurs Par Défaut dans le CSS Inline

J'ai ajouté des valeurs par défaut pour toutes les variables CSS critiques :

```css
:root {
  /* Default color variables - prevent flash before theme loads */
  --color-background: #ffffff;
  --color-foreground: #0f172a;
  --color-muted: #f1f5f9;
  /* ... etc */
}

.dark {
  /* Dark mode defaults */
  --color-background: #0f172a;
  --color-foreground: #f8fafc;
  /* ... etc */
}
```

### Transition Smooth

Ajout d'une transition CSS pour les changements de couleur :
```css
body {
  transition: background-color 0.2s ease, color 0.2s ease;
}
```

---

## 🎯 Résultat Attendu

Après cette correction :

1. ✅ **Pas de flash blanc** - Les variables sont définies dès le début
2. ✅ **Pas de flash de changement** - Les valeurs par défaut correspondent au thème
3. ✅ **Transition smooth** - Si changement, c'est animé (0.2s)
4. ✅ **Dark mode immédiat** - La classe `dark` est appliquée avant le premier rendu

---

## 📝 Notes Techniques

### Ordre d'Exécution (Corrigé)

1. **CSS inline** → Définit les valeurs par défaut ✅
2. **Script inline** → Applique le thème depuis le cache (si disponible)
3. **React hydrate** → `GlobalThemeProvider` charge depuis l'API
4. **Pas de flash** → Les valeurs par défaut correspondent au thème

### Si le Cache N'Existe Pas

- Les valeurs par défaut sont utilisées
- Pas de flash blanc
- Le thème API est appliqué de manière transparente

### Si le Cache Existe

- Le script inline applique le thème immédiatement
- Les valeurs par défaut sont remplacées
- Pas de flash visible

---

## 🔧 Fichiers Modifiés

- `apps/web/src/app/[locale]/layout.tsx` - Ajout des valeurs par défaut dans le CSS inline

---

**Document créé:** 2025-12-29
