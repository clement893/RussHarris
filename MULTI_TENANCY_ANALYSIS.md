# Analyse Multi-Tenancy pour Template SaaS

**Date**: 2025-01-25  
**Objectif**: Évaluer les fonctionnalités existantes et manquantes pour un SaaS multi-tenant avec bases de données séparées

---

## 📊 État Actuel du Template

### ✅ Fonctionnalités Existantes

#### 1. **Multi-Tenancy de Base (Row-Level)**
- ✅ **Modèle Team/Organization** (`backend/app/models/team.py`)
  - Table `teams` avec `id`, `name`, `slug`, `owner_id`
  - Table `team_members` pour les membres avec rôles
  - Support des invitations d'équipe
  - **Limitation**: Pas d'isolation automatique des données par tenant

#### 2. **Système de Subscriptions**
- ✅ **Plans et Subscriptions** (`backend/app/models/plan.py`, `subscription.py`)
  - Plans avec features JSON
  - Intégration Stripe
  - Gestion des périodes de facturation
  - Support des essais (trials)
  - **Limitation**: Pas de limites automatiques basées sur les plans

#### 3. **Système de Rôles et Permissions**
- ✅ **RBAC** (`backend/app/models/role.py`)
  - Rôles utilisateurs
  - Permissions granulaires
  - **Limitation**: Pas de permissions spécifiques par tenant

#### 4. **Usage Metering (Partiel)**
- ✅ **Composants UI** (`apps/web/src/components/billing/UsageMeter.tsx`)
  - Affichage de l'utilisation
  - **Limitation**: Pas de tracking automatique ni d'enforcement des limites

---

## ❌ Fonctionnalités Manquantes pour Multi-Tenancy avec BD Séparées

### 1. **Isolation des Données**

#### Problème Actuel
- Les modèles n'ont **pas de `team_id` ou `tenant_id`** par défaut
- Pas de middleware pour filtrer automatiquement par tenant
- Pas de séparation des bases de données

#### Solutions Nécessaires

**Option A: Multi-Database (Recommandé pour isolation maximale)**
```python
# Configuration par tenant
TENANT_DATABASES = {
    "tenant-1": "postgresql://.../tenant1_db",
    "tenant-2": "postgresql://.../tenant2_db",
}

# Router de base de données
class TenantDatabaseRouter:
    def get_database_for_tenant(self, tenant_id: str) -> str:
        return TENANT_DATABASES.get(tenant_id)
```

**Option B: Schema Isolation (PostgreSQL)**
```python
# Un schéma par tenant dans la même base
SET search_path TO tenant_123;
```

**Option C: Row-Level Security (PostgreSQL)**
```sql
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON projects
    USING (team_id = current_setting('app.current_tenant_id')::int);
```

### 2. **Middleware de Tenant Resolution**

```python
# backend/app/middleware/tenant_middleware.py
async def tenant_middleware(request: Request, call_next):
    # Résoudre le tenant depuis:
    # - Sous-domaine (tenant1.app.com)
    # - Header (X-Tenant-ID)
    # - JWT token
    # - Path (/tenant/123/...)
    
    tenant_id = resolve_tenant(request)
    request.state.tenant_id = tenant_id
    
    # Changer la connexion DB si nécessaire
    if MULTI_DB_MODE:
        db_url = get_tenant_database(tenant_id)
        request.state.db = get_db_connection(db_url)
    
    response = await call_next(request)
    return response
```

### 3. **Modèles Tenant-Aware**

**Actuellement**: Les modèles n'ont pas de `team_id` systématique

**Nécessaire**:
```python
# Mixin pour tous les modèles tenant-aware
class TenantMixin:
    team_id = Column(Integer, ForeignKey("teams.id"), nullable=False, index=True)
    
    @declared_attr
    def team(cls):
        return relationship("Team", backref=cls.__tablename__)

# Utilisation
class Project(TenantMixin, Base):
    __tablename__ = "projects"
    name = Column(String(200))
    # team_id ajouté automatiquement
```

### 4. **Query Scoping Automatique**

```python
# backend/app/core/tenant_scoped_session.py
class TenantScopedSession(AsyncSession):
    def __init__(self, tenant_id: int, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.tenant_id = tenant_id
    
    async def execute(self, statement, *args, **kwargs):
        # Ajouter automatiquement WHERE team_id = tenant_id
        if hasattr(statement, 'where'):
            statement = statement.where(
                getattr(statement.column_descriptions[0]['entity'], 'team_id') == self.tenant_id
            )
        return await super().execute(statement, *args, **kwargs)
```

### 5. **Usage Tracking et Enforcement**

**Manquant**:
- Tracking automatique de l'utilisation (API calls, storage, etc.)
- Enforcement des limites basées sur le plan
- Alertes quand les limites sont approchées

**Nécessaire**:
```python
# backend/app/models/usage.py
class Usage(Base):
    team_id = Column(Integer, ForeignKey("teams.id"))
    metric_type = Column(String(50))  # 'api_calls', 'storage', 'users'
    value = Column(Integer)
    period_start = Column(DateTime)
    period_end = Column(DateTime)

# Service d'enforcement
class UsageEnforcement:
    async def check_limit(self, team_id: int, metric: str, value: int):
        plan = await get_team_plan(team_id)
        limit = plan.features.get(f"max_{metric}")
        current = await get_current_usage(team_id, metric)
        
        if current + value > limit:
            raise UsageLimitExceeded(f"{metric} limit exceeded")
```

### 6. **Migration et Provisioning**

**Manquant**:
- Scripts pour créer une nouvelle base de données par tenant
- Migration automatique du schéma pour nouveaux tenants
- Backup/restore par tenant

**Nécessaire**:
```python
# scripts/provision_tenant.py
async def provision_tenant(tenant_id: str, tenant_name: str):
    # 1. Créer la base de données
    db_url = create_database(f"tenant_{tenant_id}")
    
    # 2. Exécuter les migrations
    await run_migrations(db_url)
    
    # 3. Créer le tenant dans la DB principale
    await create_tenant_record(tenant_id, tenant_name, db_url)
    
    # 4. Seed les données initiales
    await seed_tenant_data(db_url)
```

---

## 🎯 Recommandations pour le Template

### Option 1: Multi-Database (Isolation Maximale) ⭐ **RECOMMANDÉ**

**Avantages**:
- ✅ Isolation complète des données
- ✅ Performance (pas de filtres WHERE)
- ✅ Sécurité maximale
- ✅ Backup/restore par tenant facile
- ✅ Scaling indépendant

**Inconvénients**:
- ❌ Plus complexe à gérer
- ❌ Migrations multiples
- ❌ Plus de connexions DB

**Implémentation**:
```python
# backend/app/core/tenant_db.py
TENANT_DB_REGISTRY = {}

async def get_tenant_db(tenant_id: str) -> AsyncSession:
    if tenant_id not in TENANT_DB_REGISTRY:
        db_url = await get_tenant_db_url(tenant_id)
        engine = create_async_engine(db_url)
        TENANT_DB_REGISTRY[tenant_id] = async_sessionmaker(engine)
    
    return TENANT_DB_REGISTRY[tenant_id]()
```

### Option 2: Schema Isolation (PostgreSQL)

**Avantages**:
- ✅ Une seule connexion DB
- ✅ Migrations simplifiées
- ✅ Bonne isolation

**Inconvénients**:
- ❌ Moins flexible pour scaling
- ❌ Requiert PostgreSQL

### Option 3: Row-Level Security (PostgreSQL)

**Avantages**:
- ✅ Simple à implémenter
- ✅ Pas de changement de schéma

**Inconvénients**:
- ❌ Moins performant (filtres WHERE)
- ❌ Risque d'erreurs de sécurité

---

## 📋 Checklist d'Implémentation

### Phase 1: Foundation
- [ ] Créer `TenantMixin` pour tous les modèles
- [ ] Ajouter `team_id` à tous les modèles existants
- [ ] Créer middleware de résolution de tenant
- [ ] Implémenter query scoping automatique

### Phase 2: Multi-Database Support
- [ ] Système de registry des bases de données par tenant
- [ ] Router de connexion DB basé sur tenant
- [ ] Scripts de provisioning de nouveaux tenants
- [ ] Migration automatique du schéma pour nouveaux tenants

### Phase 3: Usage Tracking
- [ ] Modèle `Usage` pour tracking
- [ ] Service de tracking automatique
- [ ] Enforcement des limites basées sur plan
- [ ] Alertes et notifications de limites

### Phase 4: Features Avancées
- [ ] Backup/restore par tenant
- [ ] Analytics par tenant
- [ ] Billing par tenant
- [ ] Migration de données entre tenants

---

## 🚀 Features à Ajouter en Option

### 1. **Tenant Provisioning API**
```python
POST /api/v1/admin/tenants
{
    "name": "Acme Corp",
    "plan": "pro",
    "database_config": {
        "type": "separate",  # ou "shared"
        "region": "us-east-1"
    }
}
```

### 2. **Tenant Settings**
- Configuration par tenant (domaine personnalisé, branding)
- Feature flags par tenant
- Limites personnalisées

### 3. **Tenant Analytics**
- Métriques par tenant
- Dashboard admin multi-tenant
- Reporting consolidé

### 4. **Data Isolation Testing**
- Tests automatisés pour vérifier l'isolation
- Scenarios de sécurité
- Performance testing par tenant

---

## 📝 Conclusion

### Ce qui existe ✅
- Structure de base pour teams/organizations
- Système de subscriptions
- RBAC de base

### Ce qui manque ❌
- **Isolation des données** (critique)
- **Multi-database support** (critique)
- **Usage tracking automatique** (important)
- **Enforcement des limites** (important)
- **Provisioning automatique** (nice-to-have)

### Recommandation
Pour un template SaaS professionnel avec bases de données séparées, il faut ajouter:

1. **Système de multi-database** avec router automatique
2. **TenantMixin** pour tous les modèles
3. **Middleware de tenant resolution**
4. **Usage tracking et enforcement**
5. **Scripts de provisioning**

Ces features devraient être **optionnelles** dans le template, activables via configuration, pour permettre aux utilisateurs de choisir entre:
- Single-tenant (une seule organisation)
- Multi-tenant shared DB (tous dans la même DB avec `team_id`)
- Multi-tenant separate DB (une DB par tenant)

---

**Prochaine étape**: Créer un module `multi_tenancy` optionnel avec ces fonctionnalités.

