# Scripts de développement automatisés

Ce document décrit tous les scripts de développement automatisés disponibles dans le projet MODELE-NEXTJS-FULLSTACK.

## 📋 Table des matières

- [Scripts de génération (Scaffolding)](#scripts-de-génération-scaffolding)
- [Scripts de migration de base de données](#scripts-de-migration-de-base-de-données)
- [Hot reload](#hot-reload)
- [Scripts de vérification pré-commit](#scripts-de-vérification-pré-commit)

## 🏗️ Scripts de génération (Scaffolding)

### Générer un composant React

Crée un nouveau composant React avec ses fichiers associés.

```bash
# Depuis la racine
node scripts/generate-component.js ComponentName

# Avec chemin personnalisé
node scripts/generate-component.js ComponentName --path=src/components/ui

# Via npm script
pnpm generate:component ComponentName
```

**Fichiers créés :**
- `ComponentName/ComponentName.tsx` - Composant principal
- `ComponentName/index.ts` - Export du composant
- `ComponentName/ComponentName.module.css` - Styles CSS modules

**Exemple :**
```bash
pnpm generate:component Button
# Crée: apps/web/src/components/Button/Button.tsx
```

### Générer une page Next.js

Crée une nouvelle page Next.js (App Router ou Pages Router).

```bash
# App Router (par défaut)
node scripts/generate-page.js ma-page --app

# Pages Router
node scripts/generate-page.js ma-page

# Via npm script
pnpm generate:page ma-page --app
```

**Fichiers créés (App Router) :**
- `ma-page/page.tsx` - Page principale
- `ma-page/layout.tsx` - Layout de la page

**Fichiers créés (Pages Router) :**
- `ma-page/index.tsx` - Page principale

**Exemple :**
```bash
pnpm generate:page about --app
# Crée: apps/web/src/app/about/page.tsx
# URL: /about
```

### Générer une route API

Crée une nouvelle route API Next.js avec gestion des méthodes HTTP.

```bash
# Route GET (par défaut)
node scripts/generate-api-route.js users

# Route POST
node scripts/generate-api-route.js users --method=POST

# Via npm script
pnpm generate:api users --method=POST
```

**Fichiers créés :**
- `users/route.ts` - Route API avec toutes les méthodes HTTP

**Exemple :**
```bash
pnpm generate:api auth/login --method=POST
# Crée: apps/web/src/app/api/auth/login/route.ts
# Endpoint: /api/auth/login
```

## 🗄️ Scripts de migration de base de données

### Commandes disponibles

```bash
# Créer une nouvelle migration
node scripts/migrate-db.js create NomMigration

# Appliquer les migrations (vers head)
node scripts/migrate-db.js upgrade

# Appliquer jusqu'à une révision spécifique
node scripts/migrate-db.js upgrade abc123

# Rétrograder d'une révision
node scripts/migrate-db.js downgrade

# Rétrograder jusqu'à une révision spécifique
node scripts/migrate-db.js downgrade abc123

# Afficher la révision actuelle
node scripts/migrate-db.js current

# Afficher l'historique des migrations
node scripts/migrate-db.js history

# Marquer la base de données à une révision
node scripts/migrate-db.js stamp abc123

# Via npm script
pnpm migrate create NomMigration
pnpm migrate upgrade
pnpm migrate downgrade
```

**Exemple :**
```bash
# Créer une migration pour ajouter une table
pnpm migrate create AddUserTable

# Appliquer toutes les migrations en attente
pnpm migrate upgrade
```

## 🔥 Hot reload

### Configuration

Le hot reload est configuré automatiquement pour :

- **Frontend (Next.js)** : Hot reload natif activé avec `next dev`
- **Backend (FastAPI)** : Hot reload avec `uvicorn --reload`

### Scripts de développement

```bash
# Développement complet (frontend + backend)
pnpm dev:full

# Frontend uniquement
pnpm dev:frontend

# Backend uniquement
pnpm dev:backend

# Développement avec Turbo (recommandé)
pnpm dev
```

**Docker Compose :**

Le hot reload est également configuré dans `docker-compose.yml` :

```yaml
backend:
  command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
  volumes:
    - ./backend:/app  # Montage pour hot reload
```

## ✅ Scripts de vérification pré-commit

### Configuration automatique

Les hooks Git sont configurés avec **Husky** et **lint-staged** pour :

1. **Lint-staged** : Formate et lint uniquement les fichiers modifiés
2. **Vérifications complètes** : ESLint, TypeScript, tests

### Installation des hooks

```bash
# Configuration automatique
node scripts/setup-hooks.js

# Ou manuellement
pnpm add -D husky lint-staged
npx husky init
```

### Scripts disponibles

```bash
# Exécuter les vérifications manuellement
pnpm pre-commit

# Exécuter sans les tests (plus rapide)
pnpm pre-commit:skip-tests
```

### Vérifications effectuées

1. ✅ **ESLint** - Vérification du code frontend
2. ✅ **TypeScript** - Vérification des types (frontend + types package)
3. ✅ **Tests unitaires** - Exécution des tests (peut être ignoré avec `--skip-tests`)

### Configuration lint-staged

Le fichier `.lintstagedrc.js` configure le formatage automatique :

- **TypeScript/TSX** : ESLint + Prettier
- **JSON/CSS/MD** : Prettier uniquement
- **Fichiers racine** : Prettier

### Désactiver temporairement

Pour désactiver les hooks temporairement :

```bash
# Commit avec --no-verify (non recommandé)
git commit --no-verify -m "message"
```

## 📝 Exemples d'utilisation

### Workflow complet de développement

```bash
# 1. Générer un nouveau composant
pnpm generate:component UserCard

# 2. Générer une page qui l'utilise
pnpm generate:page users --app

# 3. Générer une route API
pnpm generate:api users --method=GET

# 4. Démarrer le développement avec hot reload
pnpm dev:full

# 5. Créer une migration si nécessaire
pnpm migrate create AddUserCardTable

# 6. Appliquer les migrations
pnpm migrate upgrade

# 7. Avant de commiter, les vérifications s'exécutent automatiquement
git add .
git commit -m "feat: add user card component"
# Les hooks pré-commit s'exécutent automatiquement
```

### Workflow de migration

```bash
# 1. Créer une migration
pnpm migrate create AddEmailToUsers

# 2. Éditer le fichier de migration généré
# backend/alembic/versions/xxx_add_email_to_users.py

# 3. Vérifier la migration
pnpm migrate current

# 4. Appliquer la migration
pnpm migrate upgrade

# 5. En cas de problème, rétrograder
pnpm migrate downgrade
```

## 🔧 Personnalisation

### Modifier les templates de génération

Les templates sont dans les scripts :
- `scripts/generate-component.js`
- `scripts/generate-page.js`
- `scripts/generate-api-route.js`

### Modifier les vérifications pré-commit

Éditez `scripts/pre-commit.js` pour ajouter/supprimer des vérifications.

### Modifier lint-staged

Éditez `.lintstagedrc.js` pour modifier les règles de formatage.

## 🐛 Dépannage

### Les hooks ne s'exécutent pas

```bash
# Réinstaller les hooks
node scripts/setup-hooks.js

# Vérifier que husky est installé
pnpm list husky
```

### Erreurs de permissions (Unix/Mac)

```bash
# Rendre les scripts exécutables
chmod +x scripts/*.js
chmod +x scripts/*.sh
chmod +x .husky/pre-commit
```

### Les migrations ne fonctionnent pas

```bash
# Vérifier que alembic est installé
cd backend
pip list | grep alembic

# Vérifier la configuration
cat backend/alembic.ini
```

## 📚 Ressources

- [Husky Documentation](https://typicode.github.io/husky/)
- [lint-staged Documentation](https://github.com/okonet/lint-staged)
- [Alembic Documentation](https://alembic.sqlalchemy.org/)
- [Next.js Scripts](https://nextjs.org/docs/app/api-reference/scripts)

