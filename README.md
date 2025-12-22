# MODELE-NEXTJS-FULLSTACK

> 🚀 **Template Full-Stack Production-Ready** avec Next.js 16 et FastAPI

Un template complet et moderne pour démarrer rapidement vos projets full-stack avec les meilleures pratiques de développement.

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-green)](https://fastapi.tiangolo.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## ✨ Fonctionnalités

### 🎨 Frontend (Next.js 16)
- ⚡ **Next.js 16** avec App Router et Turbopack
- ⚛️ **React 19** avec Server Components
- 📘 **TypeScript 5** avec configuration stricte
- 🎨 **Tailwind CSS 3** pour le styling
- 🧩 **Bibliothèque UI complète** (20+ composants ERP)
- 🪝 **Hooks réutilisables** (useForm, usePagination, useFilters, usePermissions)
- 🔐 **NextAuth.js v5** avec OAuth Google
- 🛡️ **Protection des routes** avec middleware
- 📝 **Gestion d'erreurs centralisée**
- 📊 **Logging structuré**

### ⚙️ Backend (FastAPI)
- 🚀 **FastAPI** avec documentation OpenAPI/Swagger auto-générée
- ✅ **Pydantic v2** pour la validation des données
- 🗄️ **SQLAlchemy async** ORM
- 🔄 **Alembic** pour les migrations de base de données
- 🐘 **PostgreSQL** avec support async
- 🔑 **Authentification JWT** avec refresh tokens
- 📧 **Service Email SendGrid** avec 7+ templates transactionnels
- ⚡ **Celery** pour le traitement de tâches en arrière-plan
- 🧪 **Tests** avec pytest
- 📋 **Logging** structuré
- 🛡️ **Gestion d'erreurs standardisée**

### 🔗 Types Partagés
- 📦 **Package `@modele/types`** pour les types TypeScript partagés
- 🔄 **Génération automatique** depuis les schémas Pydantic
- 🔗 **Synchronisation frontend/backend**

### 🛠️ DevOps & Outils
- ⚡ **Turborepo** pour monorepo optimisé
- 📦 **pnpm workspaces** pour la gestion des dépendances
- 🔄 **GitHub Actions** CI/CD
- 🪝 **Pre-commit hooks** avec Husky
- 🐳 **Docker & Docker Compose**
- 🚂 **Railway** prêt pour déploiement
- 🎯 **Générateurs de code** (composants, pages, routes API)
- 📊 **Scripts de migration** de base de données

---

## 🚀 Démarrage Rapide

### Prérequis

- **Node.js** 22+ ([télécharger](https://nodejs.org/))
- **pnpm** 9+ (`npm install -g pnpm`)
- **Python** 3.11+ ([télécharger](https://www.python.org/downloads/))
- **PostgreSQL** 14+ ([télécharger](https://www.postgresql.org/download/))
- **Redis** 7+ (optionnel, pour Celery)
- **Git** ([télécharger](https://git-scm.com/))

### Installation

```bash
# 1. Cloner le projet
git clone https://github.com/clement893/MODELE-NEXTJS-FULLSTACK.git
cd MODELE-NEXTJS-FULLSTACK

# 2. Installer les dépendances
pnpm install

# 3. Configurer les variables d'environnement
cp backend/.env.example backend/.env
cp apps/web/.env.example apps/web/.env.local
# Éditer les fichiers .env avec vos valeurs

# 4. Initialiser la base de données
createdb modele_db
cd backend && alembic upgrade head && cd ..

# 5. Démarrer le projet
pnpm dev:full
```

**Accès :**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

> 📖 **Guide complet** : [GETTING_STARTED.md](./GETTING_STARTED.md)

---

## 📁 Structure du Projet

```
MODELE-NEXTJS-FULLSTACK/
├── apps/
│   └── web/                    # Next.js 16 frontend
│       ├── src/
│       │   ├── app/           # Pages et layouts
│       │   ├── components/    # Composants React
│       │   └── lib/           # Utilitaires
│       └── package.json
├── backend/                    # FastAPI backend
│   ├── app/
│   │   ├── api/               # Endpoints API
│   │   ├── models/            # Modèles SQLAlchemy
│   │   ├── schemas/           # Schémas Pydantic
│   │   ├── services/          # Logique métier
│   │   └── main.py
│   ├── alembic/               # Migrations
│   └── requirements.txt
├── packages/                   # Code partagé
│   └── types/                 # Types TypeScript partagés
├── scripts/                    # Scripts utilitaires
│   └── generate/              # Générateurs de code
├── docs/                       # Documentation
├── docker-compose.yml
├── turbo.json                 # Configuration Turborepo
└── package.json               # Package.json racine
```

---

## 📚 Documentation

### 📖 Guides Principaux
- [🚀 Guide de Démarrage](./GETTING_STARTED.md) - Guide complet d'installation
- [🛠️ Guide de Développement](./docs/DEVELOPMENT.md) - Outils et workflows de développement
- [🧪 Guide des Tests](./docs/TESTING.md) - Comment écrire et exécuter les tests
- [🔒 Sécurité](./docs/SECURITY.md) - Bonnes pratiques de sécurité
- [📧 Configuration SendGrid](./docs/SENDGRID_SETUP.md) - Configuration du service email
- [💳 Configuration Stripe](./docs/STRIPE_SETUP.md) - Configuration des paiements
- [🤝 Contribuer](./CONTRIBUTING.md) - Guide de contribution

### 📋 Documentation Technique
- [🎨 Composants UI](./docs/COMPONENTS.md) - Documentation des composants
- [🪝 Hooks Personnalisés](./docs/HOOKS.md) - Documentation des hooks
- [🛠️ Utilitaires](./docs/UTILS.md) - Documentation des utilitaires
- [🔧 Dépannage](./docs/TROUBLESHOOTING.md) - Résolution des problèmes courants

---

## 🛠️ Scripts Disponibles

```bash
# Développement
pnpm dev:full          # Démarrer frontend + backend
pnpm dev:frontend      # Frontend uniquement
pnpm dev:backend       # Backend uniquement

# Génération de code
pnpm generate:component ComponentName
pnpm generate:page page-name
pnpm generate:api route-name
pnpm generate:types    # Générer types TypeScript depuis Pydantic

# Tests
pnpm test              # Tous les tests
pnpm test:web          # Tests frontend
pnpm test:backend      # Tests backend
pnpm test:coverage     # Avec couverture

# Qualité de code
pnpm lint              # Linter
pnpm lint:fix          # Corriger les erreurs
pnpm type-check        # Vérification TypeScript
pnpm format            # Formater avec Prettier

# Base de données
pnpm migrate create MigrationName
pnpm migrate upgrade
pnpm migrate downgrade
```

---

## 🔐 Sécurité

- ✅ Authentification JWT avec refresh tokens
- ✅ Hachage de mots de passe avec bcrypt
- ✅ Protection CORS
- ✅ Rate limiting
- ✅ Headers de sécurité (CSP, HSTS, X-Frame-Options)
- ✅ Validation des entrées (Pydantic)
- ✅ Protection contre les injections SQL (SQLAlchemy ORM)
- ✅ Protection XSS (DOMPurify)

> 🔒 **Audit de sécurité** : [docs/SECURITY_AUDIT_REPORT.md](./docs/SECURITY_AUDIT_REPORT.md)

---

## 📦 Déploiement

### Railway

1. Push vers GitHub
2. Connecter Railway à votre dépôt GitHub
3. Configurer les variables d'environnement dans Railway
4. Déploiement automatique

### Docker

```bash
docker-compose up --build
```

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Veuillez lire [CONTRIBUTING.md](./CONTRIBUTING.md) pour les guidelines.

1. Fork le projet
2. Créer une branche (`git checkout -b feat/ma-fonctionnalite`)
3. Commit vos changements (`git commit -m 'feat: ajouter ma fonctionnalité'`)
4. Push vers la branche (`git push origin feat/ma-fonctionnalite`)
5. Ouvrir une Pull Request

---

## 📄 License

MIT License - voir [LICENSE](./LICENSE) pour plus de détails.

---

## 🙏 Remerciements

- [Next.js](https://nextjs.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Turborepo](https://turbo.build/)

---

## 📞 Support

Pour les questions et problèmes, veuillez ouvrir une [issue](https://github.com/clement893/MODELE-NEXTJS-FULLSTACK/issues).

---

**Créé avec ❤️ par clement893**
