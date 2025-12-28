# 🔗 URLs de Test pour les Endpoints API

Document de référence pour tester tous les endpoints API créés dans le projet.

## 📋 Table des Matières

- [Configuration](#configuration)
- [Batch 1: Pages Management](#batch-1-pages-management)
- [Batch 2: Forms Submissions](#batch-2-forms-submissions)
- [Batch 3: Surveys](#batch-3-surveys)
- [Batch 4: Dashboard Reports](#batch-4-dashboard-reports)
- [Batch 5: Content Media & Schedule](#batch-5-content-media--schedule)
- [Batch 6: Help Center](#batch-6-help-center)
- [Batch 7: Dashboard Insights & Analytics](#batch-7-dashboard-insights--analytics)
- [Batch 8: Blog Posts](#batch-8-blog-posts)

---

## Configuration

### Base URL
```
Backend API: http://localhost:8000/api/v1
Frontend: http://localhost:3000
```

### Authentification
La plupart des endpoints nécessitent un token d'authentification :
```bash
Authorization: Bearer <your_token>
```

### Headers requis
```bash
Content-Type: application/json
Authorization: Bearer <token>
```

---

## Batch 1: Pages Management

### Endpoints Pages

#### Liste des pages
```bash
GET /api/v1/pages?skip=0&limit=100&status=published
```

#### Obtenir une page par slug
```bash
GET /api/v1/pages/my-page-slug
```

#### Créer une page
```bash
POST /api/v1/pages
Content-Type: application/json

{
  "title": "Ma Nouvelle Page",
  "slug": "ma-nouvelle-page",
  "content": "Contenu de la page",
  "status": "draft",
  "meta_title": "SEO Title",
  "meta_description": "SEO Description"
}
```

#### Mettre à jour une page
```bash
PUT /api/v1/pages/1
Content-Type: application/json

{
  "title": "Page Modifiée",
  "status": "published"
}
```

#### Supprimer une page
```bash
DELETE /api/v1/pages/1
```

### URLs Frontend
- Liste: `http://localhost:3000/content/pages`
- Édition: `http://localhost:3000/content/pages/my-page-slug/edit`
- Aperçu: `http://localhost:3000/content/pages/my-page-slug/preview`
- Page publique: `http://localhost:3000/pages/my-page-slug`

---

## Batch 2: Forms Submissions

### Endpoints Forms

#### Liste des formulaires
```bash
GET /api/v1/forms?skip=0&limit=100
```

#### Obtenir un formulaire
```bash
GET /api/v1/forms/1
```

#### Créer un formulaire
```bash
POST /api/v1/forms
Content-Type: application/json

{
  "name": "Formulaire de Contact",
  "description": "Formulaire pour contacter l'équipe",
  "fields": [
    {
      "name": "email",
      "label": "Email",
      "type": "email",
      "required": true
    }
  ]
}
```

#### Mettre à jour un formulaire
```bash
PUT /api/v1/forms/1
Content-Type: application/json

{
  "name": "Formulaire Modifié"
}
```

#### Supprimer un formulaire
```bash
DELETE /api/v1/forms/1
```

### Endpoints Submissions

#### Liste des soumissions
```bash
GET /api/v1/forms/1/submissions?skip=0&limit=100
```

#### Obtenir une soumission
```bash
GET /api/v1/submissions/1
```

#### Créer une soumission
```bash
POST /api/v1/forms/1/submit
Content-Type: application/json

{
  "data": {
    "email": "user@example.com",
    "message": "Mon message"
  }
}
```

#### Supprimer une soumission
```bash
DELETE /api/v1/submissions/1
```

### URLs Frontend
- Liste formulaires: `http://localhost:3000/content/forms`
- Soumissions: `http://localhost:3000/content/forms/submissions`

---

## Batch 3: Surveys

### Endpoints Surveys

#### Liste des sondages
```bash
GET /api/v1/surveys?skip=0&limit=100&status=active
```

#### Obtenir un sondage
```bash
GET /api/v1/surveys/1
```

#### Créer un sondage
```bash
POST /api/v1/surveys
Content-Type: application/json

{
  "title": "Sondage de Satisfaction",
  "description": "Aidez-nous à améliorer nos services",
  "questions": [
    {
      "text": "Êtes-vous satisfait?",
      "type": "multiple_choice",
      "options": ["Oui", "Non"]
    }
  ]
}
```

#### Mettre à jour un sondage
```bash
PUT /api/v1/surveys/1
Content-Type: application/json

{
  "status": "active"
}
```

#### Supprimer un sondage
```bash
DELETE /api/v1/surveys/1
```

#### Soumettre une réponse
```bash
POST /api/v1/surveys/1/responses
Content-Type: application/json

{
  "answers": [
    {
      "question_id": 1,
      "value": "Oui"
    }
  ]
}
```

### URLs Frontend
- Liste: `http://localhost:3000/content/surveys`
- Création: `http://localhost:3000/content/surveys/new`
- Édition: `http://localhost:3000/content/surveys/1/edit`
- Réponses: `http://localhost:3000/content/surveys/1/responses`

---

## Batch 4: Dashboard Reports

### Endpoints Reports

#### Liste des rapports
```bash
GET /api/v1/reports?skip=0&limit=100
```

#### Obtenir un rapport
```bash
GET /api/v1/reports/1
```

#### Créer un rapport
```bash
POST /api/v1/reports
Content-Type: application/json

{
  "name": "Rapport Mensuel",
  "description": "Rapport des activités du mois",
  "config": {
    "dateRange": {
      "start": "2024-01-01",
      "end": "2024-01-31"
    },
    "format": "table"
  }
}
```

#### Mettre à jour un rapport
```bash
PUT /api/v1/reports/1
Content-Type: application/json

{
  "name": "Rapport Modifié"
}
```

#### Supprimer un rapport
```bash
DELETE /api/v1/reports/1
```

#### Rafraîchir un rapport
```bash
POST /api/v1/reports/1/refresh
```

### URLs Frontend
- Dashboard Reports: `http://localhost:3000/dashboard/reports`

---

## Batch 5: Content Media & Schedule

### Endpoints Media

#### Liste des médias
```bash
GET /api/v1/media?skip=0&limit=100&type=image
```

#### Obtenir un média
```bash
GET /api/v1/media/1
```

#### Uploader un média
```bash
POST /api/v1/media/upload
Content-Type: multipart/form-data

file: <file>
folder: "images"
```

#### Supprimer un média
```bash
DELETE /api/v1/media/1
```

### Endpoints Scheduled Tasks

#### Liste des tâches planifiées
```bash
GET /api/v1/scheduled-tasks?skip=0&limit=100&status=pending
```

#### Obtenir une tâche
```bash
GET /api/v1/scheduled-tasks/1
```

#### Créer une tâche planifiée
```bash
POST /api/v1/scheduled-tasks
Content-Type: application/json

{
  "name": "Publication automatique",
  "task_type": "publish_content",
  "scheduled_at": "2024-12-25T10:00:00Z",
  "config": {
    "content_id": 1
  }
}
```

#### Mettre à jour une tâche
```bash
PUT /api/v1/scheduled-tasks/1
Content-Type: application/json

{
  "status": "completed"
}
```

#### Supprimer une tâche
```bash
DELETE /api/v1/scheduled-tasks/1
```

### URLs Frontend
- Media Library: `http://localhost:3000/content/media`
- Scheduled Content: `http://localhost:3000/content/schedule`

---

## Batch 6: Help Center

### Endpoints Documentation

#### Liste des articles
```bash
GET /api/v1/documentation/articles?category_id=1&is_published=true
```

#### Obtenir un article
```bash
GET /api/v1/documentation/articles/my-article-slug
```

#### Liste des catégories
```bash
GET /api/v1/documentation/categories
```

### Endpoints Support Tickets

#### Liste des tickets
```bash
GET /api/v1/support/tickets?status=open&category=technical
```

#### Obtenir un ticket
```bash
GET /api/v1/support/tickets/1
```

#### Créer un ticket
```bash
POST /api/v1/support/tickets
Content-Type: application/json

{
  "email": "user@example.com",
  "subject": "Problème technique",
  "category": "technical",
  "priority": "medium",
  "message": "Description du problème..."
}
```

#### Mettre à jour un ticket
```bash
PUT /api/v1/support/tickets/1
Content-Type: application/json

{
  "status": "in_progress",
  "priority": "high"
}
```

#### Obtenir les messages d'un ticket
```bash
GET /api/v1/support/tickets/1/messages
```

#### Ajouter un message à un ticket
```bash
POST /api/v1/support/tickets/1/messages
Content-Type: application/json

{
  "message": "Ma réponse au ticket"
}
```

### URLs Frontend
- Help Center: `http://localhost:3000/help`
- Article: `http://localhost:3000/help/articles/my-article-slug`
- Tickets: `http://localhost:3000/help/tickets`
- Détail ticket: `http://localhost:3000/help/tickets/1`

---

## Batch 7: Dashboard Insights & Analytics

### Endpoints Insights

#### Obtenir les insights
```bash
GET /api/v1/insights
```

Réponse:
```json
{
  "metrics": {
    "total_projects": 150,
    "active_projects": 45,
    "completed_projects": 105
  },
  "trends": {
    "projects_growth": 15.5,
    "users_growth": 8.2
  },
  "userGrowth": {
    "this_month": 25,
    "last_month": 20,
    "growth_percentage": 25.0
  }
}
```

### Endpoints Analytics

#### Obtenir les analytics
```bash
GET /api/v1/analytics/metrics?start_date=2024-01-01&end_date=2024-01-31
```

Réponse:
```json
{
  "page_views": 1250,
  "unique_visitors": 450,
  "bounce_rate": 35.5,
  "avg_session_duration": 180,
  "top_pages": [
    {
      "path": "/dashboard",
      "views": 320
    }
  ]
}
```

### URLs Frontend
- Dashboard Insights: `http://localhost:3000/dashboard/insights`
- Dashboard Analytics: `http://localhost:3000/dashboard/analytics`

---

## Batch 8: Blog Posts

### Endpoints Posts

#### Liste des posts
```bash
GET /api/v1/posts?skip=0&limit=100&status=published
```

Filtres disponibles:
- `status`: draft, published, archived
- `category_id`: ID de la catégorie
- `category_slug`: Slug de la catégorie
- `tag`: Tag à filtrer
- `author_id`: ID de l'auteur
- `author_slug`: Slug/nom de l'auteur
- `year`: Année de publication

Exemples:
```bash
# Posts publiés
GET /api/v1/posts?status=published

# Posts par catégorie
GET /api/v1/posts?category_slug=technology&status=published

# Posts par tag
GET /api/v1/posts?tag=tutorial&status=published

# Posts par auteur
GET /api/v1/posts?author_slug=john-doe&status=published

# Posts par année
GET /api/v1/posts?year=2024&status=published
```

#### Obtenir un post par slug
```bash
GET /api/v1/posts/my-blog-post-slug
```

#### Créer un post
```bash
POST /api/v1/posts
Content-Type: application/json

{
  "title": "Mon Premier Article",
  "slug": "mon-premier-article",
  "excerpt": "Résumé de l'article",
  "content": "Contenu complet de l'article...",
  "content_html": "<p>Contenu HTML...</p>",
  "status": "draft",
  "category_id": 1,
  "tags": ["tutorial", "getting-started"],
  "meta_title": "SEO Title",
  "meta_description": "SEO Description",
  "meta_keywords": "keyword1, keyword2"
}
```

#### Mettre à jour un post
```bash
PUT /api/v1/posts/1
Content-Type: application/json

{
  "title": "Article Modifié",
  "status": "published"
}
```

#### Supprimer un post
```bash
DELETE /api/v1/posts/1
```

### URLs Frontend

#### Pages publiques
- Liste blog: `http://localhost:3000/blog`
- Post par slug: `http://localhost:3000/blog/my-blog-post-slug`
- Par tag: `http://localhost:3000/blog/tag/tutorial`
- Par catégorie: `http://localhost:3000/blog/category/technology`
- Par auteur: `http://localhost:3000/blog/author/john-doe`
- Par année: `http://localhost:3000/blog/archive/2024`

#### Pages d'administration
- Gestion posts: `http://localhost:3000/content/posts`
- Créer post: `http://localhost:3000/content/posts/new/edit`
- Éditer post: `http://localhost:3000/content/posts/1/edit`

#### Feeds et Sitemap
- RSS Feed: `http://localhost:3000/blog/rss`
- Sitemap: `http://localhost:3000/blog/sitemap`

---

## 🧪 Tests avec cURL

### Exemple: Créer un post
```bash
curl -X POST http://localhost:8000/api/v1/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Test Post",
    "slug": "test-post",
    "excerpt": "Test excerpt",
    "content": "Test content",
    "status": "draft"
  }'
```

### Exemple: Lister les posts publiés
```bash
curl -X GET "http://localhost:8000/api/v1/posts?status=published&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Exemple: Obtenir un post par slug
```bash
curl -X GET http://localhost:8000/api/v1/posts/test-post \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📝 Notes Importantes

1. **Authentification**: La plupart des endpoints nécessitent un token JWT valide
2. **Pagination**: Utilisez `skip` et `limit` pour paginer les résultats
3. **Filtres**: Les filtres peuvent être combinés (ex: `status=published&category_id=1&year=2024`)
4. **Rate Limiting**: Respectez les limites de taux définies dans les paramètres API
5. **CORS**: Assurez-vous que CORS est configuré correctement pour les requêtes frontend

---

## 🔍 Vérification des Endpoints

Pour vérifier qu'un endpoint fonctionne:

```bash
# Health check
curl http://localhost:8000/api/v1/health

# Vérifier l'authentification
curl http://localhost:8000/api/v1/users/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## 📚 Documentation Complémentaire

- Documentation API complète: Voir `backend/app/api/v1/endpoints/`
- Schéma de base de données: Voir `backend/DATABASE_SCHEMA.md`
- Plan d'intégration: Voir `API_INTEGRATION_BATCH_PLAN.md`
- Statut d'intégration: Voir `API_INTEGRATION_STATUS.md`
