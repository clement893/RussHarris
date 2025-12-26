# Plan d'Implémentation - Multi-Tenancy avec Bases de Données Séparées

**Date**: 2025-01-25  
**Status**: 🟡 **IN PROGRESS**  
**Feature**: Multi-Tenancy Optionnel avec Support Multi-Database  
**Objectif**: Implémenter un système multi-tenant complet et facilement désactivable

---

## 📋 Vue d'Ensemble

### Objectifs
1. ✅ Support multi-tenant avec bases de données séparées
2. ✅ Activation/désactivation via configuration
3. ✅ Rétrocompatibilité avec projets single-tenant existants
4. ✅ Facile à retirer si non nécessaire
5. ✅ Documentation complète
6. ✅ Tests unitaires et d'intégration
7. ✅ Correction progressive des erreurs TypeScript
8. ✅ Utilisation des composants existants
9. ✅ Démonstration sur le site template
10. ✅ Features de sécurité complètes

### 🎯 Principes d'Implémentation

**IMPORTANT**: Tous les composants UI utiliseront les **270+ composants existants** :
- ✅ **Theme-aware** (dark mode support, CSS variables)
- ✅ **Accessible** (WCAG AA compliant)
- ✅ **Responsive** (mobile-first)
- ✅ **Type-safe** (TypeScript strict)
- ✅ **Testé** (unit tests, E2E tests)

**Nous ne créerons PAS de nouveaux primitifs UI** - nous composerons à partir des composants existants.

### 📦 Structure par Batch

Chaque batch suit cette structure :
1. **Sécurité & Access Control**
   - Vérification des permissions
   - Rate limiting
   - Input validation
2. **Implémentation Backend**
   - Code avec types TypeScript/Python stricts
   - Validation et sanitization
   - Gestion d'erreurs
3. **Implémentation Frontend**
   - Utilisation des composants existants
   - i18n support
   - Error handling et loading states
4. **Tests**
   - Tests unitaires (backend + frontend)
   - Tests d'intégration
   - Tests de sécurité
   - Tests d'accessibilité
5. **Documentation**
   - JSDoc/Python docstrings
   - Documentation utilisateur
   - Guide de migration
6. **Démonstration Template**
   - Ajout sur le site template
   - Exemples d'utilisation
   - Documentation visuelle
7. **Review & Commit**
   - Vérification TypeScript/Python
   - Build check
   - Review de sécurité
   - Commit progressif

### Architecture
- **Mode Single-Tenant** (par défaut): Une seule base de données, pas de filtrage
- **Mode Multi-Tenant Shared DB**: Une DB avec `team_id` sur tous les modèles
- **Mode Multi-Tenant Separate DB**: Une DB par tenant (isolation maximale)

---

## 📦 BATCH 1: Foundation & Configuration

**Status**: ⏳ **PENDING**  
**Priority**: 🔴 Critical  
**Estimated Time**: 1-2 days  
**Dependencies**: None

### Objectif
Créer la structure de base et le système de configuration

### Tâches

#### 1.1 Configuration et Feature Flag
**Fichiers à créer**:
- `backend/app/core/tenancy.py` - Configuration et détection du mode
- `backend/app/core/config.py` - Ajouter variables d'environnement

**Fichiers à modifier**:
- `backend/app/core/config.py` - Ajouter settings multi-tenancy

**Code**:
```python
# backend/app/core/tenancy.py
from enum import Enum
from app.core.config import settings

class TenancyMode(str, Enum):
    SINGLE = "single"  # Pas de multi-tenancy
    SHARED_DB = "shared_db"  # Une DB, filtrage par team_id
    SEPARATE_DB = "separate_db"  # Une DB par tenant

class TenancyConfig:
    mode: TenancyMode = TenancyMode(settings.TENANCY_MODE or "single")
    enabled: bool = mode != TenancyMode.SINGLE
    
    @classmethod
    def is_enabled(cls) -> bool:
        return cls.enabled
    
    @classmethod
    def is_separate_db(cls) -> bool:
        return cls.mode == TenancyMode.SEPARATE_DB
```

**Variables d'environnement**:
```bash
# .env.example
TENANCY_MODE=single  # Options: single, shared_db, separate_db
TENANT_DB_REGISTRY_URL=postgresql://...  # DB principale pour registry
```

#### 1.2 TenantMixin Optionnel
**Fichier à créer**:
- `backend/app/core/mixins.py` - Mixins réutilisables

**Code**:
```python
# backend/app/core/mixins.py
from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import declared_attr, relationship
from app.core.tenancy import TenancyConfig

class TenantMixin:
    """Mixin pour ajouter team_id aux modèles (optionnel)"""
    
    if TenancyConfig.is_enabled():
        @declared_attr
        def team_id(cls):
            return Column(
                Integer,
                ForeignKey("teams.id"),
                nullable=False,
                index=True
            )
        
        @declared_attr
        def team(cls):
            return relationship("Team", backref=cls.__tablename__)
```

**Note**: Le mixin est conditionnel - si tenancy désactivé, `team_id` n'existe pas

#### 1.3 Migration Conditionnelle
**Fichier à créer**:
- `backend/alembic/versions/XXX_add_tenancy_support.py`

**Code**:
```python
# Migration conditionnelle basée sur TENANCY_MODE
def upgrade():
    tenancy_mode = os.getenv("TENANCY_MODE", "single")
    
    if tenancy_mode != "single":
        # Ajouter team_id aux tables existantes
        op.add_column('projects', sa.Column('team_id', sa.Integer(), nullable=True))
        op.create_foreign_key('fk_projects_team', 'projects', 'teams', ['team_id'], ['id'])
        op.create_index('idx_projects_team', 'projects', ['team_id'])
        # Répéter pour autres tables...
```

### Batch 1 Checklist Complète
- [ ] Créer `backend/app/core/tenancy.py`
- [ ] Ajouter variables d'environnement dans `.env.example`
- [ ] Créer `TenantMixin` conditionnel
- [ ] Créer migration conditionnelle
- [ ] Tests unitaires pour configuration
- [ ] Documentation de configuration

---

---

## 📦 BATCH 2: Tenant Resolution & Middleware

**Status**: ⏳ **PENDING**  
**Priority**: 🔴 Critical  
**Estimated Time**: 1-2 days  
**Dependencies**: Batch 1

### Objectif
Créer le système de résolution et middleware de tenant

### Tâches

#### 2.1 Tenant Resolver
**Fichier à créer**:
- `backend/app/core/tenant_resolver.py`

**Code**:
```python
# backend/app/core/tenant_resolver.py
from fastapi import Request, HTTPException
from app.core.tenancy import TenancyConfig

class TenantResolver:
    """Résout le tenant depuis différentes sources"""
    
    @staticmethod
    async def resolve(request: Request) -> int | None:
        if not TenancyConfig.is_enabled():
            return None
        
        # 1. Sous-domaine (tenant1.app.com)
        host = request.headers.get("host", "")
        if "." in host:
            subdomain = host.split(".")[0]
            if subdomain != "www" and subdomain != "app":
                tenant_id = await get_tenant_by_slug(subdomain)
                if tenant_id:
                    return tenant_id
        
        # 2. Header X-Tenant-ID
        tenant_id = request.headers.get("X-Tenant-ID")
        if tenant_id:
            return int(tenant_id)
        
        # 3. JWT token
        # 4. Path parameter (/api/v1/tenant/{tenant_id}/...)
        
        # Si aucun tenant trouvé et mode activé, erreur
        if TenancyConfig.is_enabled():
            raise HTTPException(401, "Tenant not found")
        
        return None
```

#### 2.2 Middleware Conditionnel
**Fichier à créer**:
- `backend/app/middleware/tenant_middleware.py`

**Code**:
```python
# backend/app/middleware/tenant_middleware.py
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from app.core.tenancy import TenancyConfig
from app.core.tenant_resolver import TenantResolver

class TenantMiddleware(BaseHTTPMiddleware):
    """Middleware pour résoudre et stocker le tenant"""
    
    async def dispatch(self, request: Request, call_next):
        if TenancyConfig.is_enabled():
            tenant_id = await TenantResolver.resolve(request)
            request.state.tenant_id = tenant_id
        else:
            request.state.tenant_id = None
        
        response = await call_next(request)
        return response
```

#### 2.3 Dependency pour Tenant
**Fichier à modifier**:
- `backend/app/core/dependencies.py` (créer si n'existe pas)

**Code**:
```python
# backend/app/core/dependencies.py
from fastapi import Depends, Request
from app.core.tenancy import TenancyConfig

def get_tenant_id(request: Request) -> int | None:
    """Dependency pour obtenir le tenant_id"""
    if TenancyConfig.is_enabled():
        return getattr(request.state, "tenant_id", None)
    return None
```

#### 2.4 Intégration dans FastAPI
**Fichier à modifier**:
- `backend/app/main.py`

**Code**:
```python
# backend/app/main.py
from app.middleware.tenant_middleware import TenantMiddleware
from app.core.tenancy import TenancyConfig

app = FastAPI()

# Ajouter middleware seulement si activé
if TenancyConfig.is_enabled():
    app.add_middleware(TenantMiddleware)
```

### Batch 2 Checklist Complète

#### Backend
- [ ] Créer `TenantResolver` avec toutes les méthodes de résolution
- [ ] Créer `TenantMiddleware` conditionnel
- [ ] Créer dependency `get_tenant_id`
- [ ] Intégrer middleware dans `main.py` (conditionnel)
- [ ] Tests unitaires pour `TenantResolver` (toutes méthodes)
- [ ] Tests unitaires pour `TenantMiddleware`
- [ ] Tests d'intégration pour résolution tenant
- [ ] Tests de sécurité (injection, bypass)
- [ ] Vérification TypeScript/Python (0 erreurs)
- [ ] Review de sécurité

#### Frontend
- [ ] Créer composant `TenantSelector` (si nécessaire) avec composants existants
- [ ] Utiliser `Select`, `Input`, `Alert` existants
- [ ] Ajouter i18n support
- [ ] Tests unitaires
- [ ] Tests d'accessibilité
- [ ] Vérification TypeScript (0 erreurs)

#### Documentation
- [ ] Documenter toutes les méthodes de résolution
- [ ] Ajouter exemples d'utilisation
- [ ] Guide de troubleshooting
- [ ] Mettre à jour `MULTI_TENANCY_CONFIGURATION.md`

#### Démonstration
- [ ] Ajouter section sur page `/admin/tenancy`
- [ ] Démonstration des différentes méthodes de résolution
- [ ] Tests interactifs

#### Review & Commit
- [ ] Run TypeScript check
- [ ] Run Python type check
- [ ] Run build
- [ ] Run tests
- [ ] Review sécurité
- [ ] Commit: `feat(tenancy): Add tenant resolution and middleware`

---

---

## 📦 BATCH 3: Multi-Database Support

**Status**: ⏳ **PENDING**  
**Priority**: 🔴 Critical  
**Estimated Time**: 2-3 days  
**Dependencies**: Batch 2

### Objectif
Implémenter le support multi-database avec router

### Tâches

#### 3.1 Tenant Database Registry
**Fichier à créer**:
- `backend/app/core/tenant_db_registry.py`

**Code**:
```python
# backend/app/core/tenant_db_registry.py
from sqlalchemy.ext.asyncio import AsyncEngine, async_sessionmaker, create_async_engine
from typing import Dict, Optional
from app.core.tenancy import TenancyConfig

class TenantDatabaseRegistry:
    """Registry pour gérer les connexions DB par tenant"""
    
    _engines: Dict[int, AsyncEngine] = {}
    _sessions: Dict[int, async_sessionmaker] = {}
    
    @classmethod
    async def get_tenant_db_url(cls, tenant_id: int) -> str:
        """Récupère l'URL de la DB pour un tenant"""
        if not TenancyConfig.is_separate_db():
            return None
        
        # Option 1: Depuis une table de registry
        # Option 2: Pattern de nommage (tenant_{id}_db)
        # Option 3: Configuration externe
        
        # Exemple: Pattern de nommage
        base_url = os.getenv("TENANT_DB_BASE_URL")
        return f"{base_url}/tenant_{tenant_id}_db"
    
    @classmethod
    async def get_engine(cls, tenant_id: int) -> AsyncEngine:
        """Récupère ou crée l'engine pour un tenant"""
        if tenant_id not in cls._engines:
            db_url = await cls.get_tenant_db_url(tenant_id)
            cls._engines[tenant_id] = create_async_engine(
                db_url,
                pool_pre_ping=True,
                pool_size=10,
                max_overflow=20,
            )
        return cls._engines[tenant_id]
    
    @classmethod
    async def get_session_factory(cls, tenant_id: int) -> async_sessionmaker:
        """Récupère ou crée la session factory pour un tenant"""
        if tenant_id not in cls._sessions:
            engine = await cls.get_engine(tenant_id)
            cls._sessions[tenant_id] = async_sessionmaker(
                engine,
                class_=AsyncSession,
                expire_on_commit=False,
            )
        return cls._sessions[tenant_id]
```

#### 3.2 Database Router
**Fichier à créer**:
- `backend/app/core/db_router.py`

**Code**:
```python
# backend/app/core/db_router.py
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.tenancy import TenancyConfig
from app.core.tenant_db_registry import TenantDatabaseRegistry
from app.core.database import AsyncSessionLocal  # DB principale

class DatabaseRouter:
    """Route les requêtes vers la bonne DB selon le tenant"""
    
    @staticmethod
    async def get_db(tenant_id: int | None = None) -> AsyncSession:
        """Retourne la session DB appropriée"""
        if not TenancyConfig.is_enabled() or tenant_id is None:
            # Mode single-tenant ou pas de tenant: DB principale
            async with AsyncSessionLocal() as session:
                yield session
        elif TenancyConfig.is_separate_db():
            # Mode separate DB: DB du tenant
            session_factory = await TenantDatabaseRegistry.get_session_factory(tenant_id)
            async with session_factory() as session:
                yield session
        else:
            # Mode shared DB: DB principale avec filtrage
            async with AsyncSessionLocal() as session:
                yield session
```

#### 3.3 Query Scoping pour Shared DB
**Fichier à créer**:
- `backend/app/core/query_scoping.py`

**Code**:
```python
# backend/app/core/query_scoping.py
from sqlalchemy.orm import Query
from app.core.tenancy import TenancyConfig

class QueryScoper:
    """Ajoute automatiquement le filtrage par team_id"""
    
    @staticmethod
    def scope_query(query: Query, model_class, tenant_id: int) -> Query:
        """Ajoute WHERE team_id = tenant_id si nécessaire"""
        if not TenancyConfig.is_enabled():
            return query
        
        if TenancyConfig.is_separate_db():
            # Pas besoin de filtrage, DB déjà isolée
            return query
        
        # Shared DB: Ajouter filtrage
        if hasattr(model_class, 'team_id'):
            return query.filter(model_class.team_id == tenant_id)
        
        return query
```

#### 3.4 Modifier get_db Dependency
**Fichier à modifier**:
- `backend/app/core/database.py`

**Code**:
```python
# backend/app/core/database.py
from app.core.db_router import DatabaseRouter
from app.core.tenancy import TenancyConfig

async def get_db(
    request: Request,
    tenant_id: int | None = Depends(get_tenant_id)
) -> AsyncSession:
    """Dependency pour obtenir la session DB (avec routing si activé)"""
    if TenancyConfig.is_enabled():
        async for session in DatabaseRouter.get_db(tenant_id):
            yield session
    else:
        # Comportement original
        async with AsyncSessionLocal() as session:
            yield session
```

### Batch 3 Checklist Complète

#### Backend
- [ ] Créer `TenantDatabaseRegistry` avec gestion de connexions
- [ ] Créer `DatabaseRouter` pour routing automatique
- [ ] Créer `QueryScoper` pour shared DB
- [ ] Modifier `get_db` dependency avec routing
- [ ] Tests unitaires pour `TenantDatabaseRegistry`
- [ ] Tests unitaires pour `DatabaseRouter`
- [ ] Tests unitaires pour `QueryScoper`
- [ ] Tests d'intégration pour isolation des données
- [ ] Tests de performance (connexions multiples)
- [ ] Tests de sécurité (isolation stricte)
- [ ] Vérification TypeScript/Python (0 erreurs)
- [ ] Review de sécurité

#### Frontend
- [ ] Créer composant `DatabaseStatus` avec composants existants
- [ ] Utiliser `Card`, `Badge`, `Table` existants
- [ ] Afficher statut des connexions DB
- [ ] Ajouter i18n support
- [ ] Tests unitaires
- [ ] Tests d'accessibilité
- [ ] Vérification TypeScript (0 erreurs)

#### Documentation
- [ ] Documenter le système de routing
- [ ] Guide de configuration multi-DB
- [ ] Exemples de configuration
- [ ] Troubleshooting connexions

#### Démonstration
- [ ] Ajouter section sur page `/admin/tenancy`
- [ ] Visualisation des connexions DB
- [ ] Tests d'isolation

#### Review & Commit
- [ ] Run TypeScript check
- [ ] Run Python type check
- [ ] Run build
- [ ] Run tests
- [ ] Review sécurité
- [ ] Commit: `feat(tenancy): Add multi-database support and routing`

---

---

## 📦 BATCH 4: Modèles Tenant-Aware

**Status**: ⏳ **PENDING**  
**Priority**: 🟠 High  
**Estimated Time**: 2-3 days  
**Dependencies**: Batch 3

### Objectif
Rendre les modèles existants tenant-aware de manière optionnelle

### Tâches

#### 4.1 Appliquer TenantMixin aux Modèles
**Fichiers à modifier**:
- `backend/app/models/project.py`
- `backend/app/models/form.py`
- `backend/app/models/file.py`
- `backend/app/models/template.py`
- ... (autres modèles selon besoins)

**Code exemple**:
```python
# backend/app/models/project.py
from app.core.mixins import TenantMixin
from app.core.database import Base

class Project(TenantMixin, Base):  # Ajouter TenantMixin
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True)
    name = Column(String(200))
    # team_id ajouté automatiquement si tenancy activé
```

**Note**: Utiliser une approche conditionnelle pour ne pas casser les projets existants

#### 4.2 Migration des Données Existantes
**Fichier à créer**:
- `backend/alembic/versions/XXX_migrate_existing_data_to_tenants.py`

**Code**:
```python
def upgrade():
    """Migrer les données existantes vers le système tenant"""
    tenancy_mode = os.getenv("TENANCY_MODE", "single")
    
    if tenancy_mode == "single":
        return  # Pas de migration nécessaire
    
    # Pour chaque utilisateur, créer un team par défaut
    # et assigner ses données à ce team
    connection = op.get_bind()
    
    # Créer teams pour utilisateurs existants
    connection.execute("""
        INSERT INTO teams (name, slug, owner_id, created_at, updated_at)
        SELECT 
            CONCAT(first_name, ' ', last_name, ' Team') as name,
            CONCAT('team-', id) as slug,
            id as owner_id,
            created_at,
            updated_at
        FROM users
        WHERE id NOT IN (SELECT owner_id FROM teams)
    """)
    
    # Assigner les projets aux teams
    connection.execute("""
        UPDATE projects p
        SET team_id = (
            SELECT t.id 
            FROM teams t 
            WHERE t.owner_id = p.user_id 
            LIMIT 1
        )
        WHERE team_id IS NULL
    """)
```

#### 4.3 Service Helper pour Queries Tenant-Aware
**Fichier à créer**:
- `backend/app/services/tenant_service.py`

**Code**:
```python
# backend/app/services/tenant_service.py
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.query_scoping import QueryScoper
from app.core.tenancy import TenancyConfig

class TenantService:
    """Helper pour queries tenant-aware"""
    
    @staticmethod
    def filter_by_tenant(query, model_class, tenant_id: int | None):
        """Ajoute filtrage tenant si nécessaire"""
        if not TenancyConfig.is_enabled() or tenant_id is None:
            return query
        
        return QueryScoper.scope_query(query, model_class, tenant_id)
    
    @staticmethod
    async def ensure_tenant_access(
        session: AsyncSession,
        model_instance,
        tenant_id: int | None
    ) -> bool:
        """Vérifie qu'un objet appartient au tenant"""
        if not TenancyConfig.is_enabled():
            return True
        
        if hasattr(model_instance, 'team_id'):
            return model_instance.team_id == tenant_id
        
        return True
```

### Batch 4 Checklist Complète

#### Backend
- [ ] Appliquer `TenantMixin` aux modèles principaux (Project, Form, File, Template, etc.)
- [ ] Créer migration pour données existantes (backward compatible)
- [ ] Créer `TenantService` helper avec méthodes utilitaires
- [ ] Mettre à jour les endpoints pour utiliser tenant filtering
- [ ] Ajouter validation `team_id` dans tous les endpoints
- [ ] Tests unitaires pour chaque modèle avec `TenantMixin`
- [ ] Tests d'intégration pour isolation des données
- [ ] Tests pour migration des données (données existantes)
- [ ] Tests de sécurité (accès cross-tenant)
- [ ] Vérification TypeScript/Python (0 erreurs)
- [ ] Review de sécurité

#### Frontend
- [ ] Créer composant `TenantDataView` avec composants existants
- [ ] Utiliser `DataTable`, `Card`, `Badge` existants
- [ ] Afficher données filtrées par tenant
- [ ] Ajouter i18n support
- [ ] Tests unitaires
- [ ] Tests d'accessibilité
- [ ] Vérification TypeScript (0 erreurs)

#### Documentation
- [ ] Documenter les modèles tenant-aware
- [ ] Guide de migration des données
- [ ] Exemples de queries tenant-aware
- [ ] Best practices

#### Démonstration
- [ ] Ajouter section sur page `/admin/tenancy`
- [ ] Visualisation des données par tenant
- [ ] Tests d'isolation visuels

#### Review & Commit
- [ ] Run TypeScript check
- [ ] Run Python type check
- [ ] Run build
- [ ] Run tests
- [ ] Review sécurité
- [ ] Commit: `feat(tenancy): Add tenant-aware models and data isolation`

---

---

## 📦 BATCH 5: Usage Tracking & Enforcement

**Status**: ⏳ **PENDING**  
**Priority**: 🟠 High  
**Estimated Time**: 2-3 days  
**Dependencies**: Batch 4

### Objectif
Implémenter le tracking d'utilisation et enforcement des limites

### Tâches

#### 5.1 Modèle Usage
**Fichier à créer**:
- `backend/app/models/usage.py`

**Code**:
```python
# backend/app/models/usage.py
from app.core.mixins import TenantMixin
from app.core.database import Base

class Usage(TenantMixin, Base):
    __tablename__ = "usage"
    
    id = Column(Integer, primary_key=True)
    metric_type = Column(String(50), nullable=False)  # 'api_calls', 'storage', 'users'
    value = Column(Integer, nullable=False, default=0)
    period_start = Column(DateTime(timezone=True), nullable=False)
    period_end = Column(DateTime(timezone=True), nullable=False)
    
    __table_args__ = (
        Index("idx_usage_tenant_metric", "team_id", "metric_type", "period_start"),
    )
```

#### 5.2 Usage Tracker Service
**Fichier à créer**:
- `backend/app/services/usage_tracker.py`

**Code**:
```python
# backend/app/services/usage_tracker.py
from datetime import datetime, timedelta
from app.core.tenancy import TenancyConfig

class UsageTracker:
    """Track l'utilisation des ressources par tenant"""
    
    @staticmethod
    async def track(
        session: AsyncSession,
        tenant_id: int,
        metric_type: str,
        value: int = 1
    ):
        """Enregistre une utilisation"""
        if not TenancyConfig.is_enabled():
            return
        
        # Obtenir ou créer l'enregistrement pour la période
        period_start = datetime.now().replace(day=1, hour=0, minute=0, second=0)
        period_end = (period_start + timedelta(days=32)).replace(day=1) - timedelta(days=1)
        
        usage = await session.scalar(
            select(Usage).where(
                Usage.team_id == tenant_id,
                Usage.metric_type == metric_type,
                Usage.period_start == period_start
            )
        )
        
        if usage:
            usage.value += value
        else:
            usage = Usage(
                team_id=tenant_id,
                metric_type=metric_type,
                value=value,
                period_start=period_start,
                period_end=period_end
            )
            session.add(usage)
        
        await session.commit()
    
    @staticmethod
    async def get_current_usage(
        session: AsyncSession,
        tenant_id: int,
        metric_type: str
    ) -> int:
        """Récupère l'utilisation actuelle"""
        if not TenancyConfig.is_enabled():
            return 0
        
        period_start = datetime.now().replace(day=1, hour=0, minute=0, second=0)
        
        usage = await session.scalar(
            select(Usage.value).where(
                Usage.team_id == tenant_id,
                Usage.metric_type == metric_type,
                Usage.period_start == period_start
            )
        )
        
        return usage or 0
```

#### 5.3 Usage Enforcement
**Fichier à créer**:
- `backend/app/services/usage_enforcement.py`

**Code**:
```python
# backend/app/services/usage_enforcement.py
from app.services.usage_tracker import UsageTracker
from app.services.subscription_service import get_team_plan

class UsageLimitExceeded(Exception):
    pass

class UsageEnforcement:
    """Enforce les limites d'utilisation basées sur le plan"""
    
    @staticmethod
    async def check_limit(
        session: AsyncSession,
        tenant_id: int,
        metric_type: str,
        value: int = 1
    ):
        """Vérifie si une action dépasse les limites"""
        if not TenancyConfig.is_enabled():
            return
        
        # Obtenir le plan du tenant
        plan = await get_team_plan(session, tenant_id)
        if not plan:
            raise UsageLimitExceeded("No active plan")
        
        # Obtenir la limite depuis les features du plan
        features = json.loads(plan.features or "{}")
        limit_key = f"max_{metric_type}"
        limit = features.get(limit_key)
        
        if limit is None:
            return  # Pas de limite définie
        
        # Obtenir l'utilisation actuelle
        current = await UsageTracker.get_current_usage(session, tenant_id, metric_type)
        
        if current + value > limit:
            raise UsageLimitExceeded(
                f"{metric_type} limit exceeded: {current + value}/{limit}"
            )
```

#### 5.4 Middleware de Tracking
**Fichier à créer**:
- `backend/app/middleware/usage_tracking_middleware.py`

**Code**:
```python
# backend/app/middleware/usage_tracking_middleware.py
from app.services.usage_tracker import UsageTracker
from app.core.tenancy import TenancyConfig

class UsageTrackingMiddleware(BaseHTTPMiddleware):
    """Track automatiquement les appels API"""
    
    async def dispatch(self, request: Request, call_next):
        response = await call_next(request)
        
        if TenancyConfig.is_enabled():
            tenant_id = getattr(request.state, "tenant_id", None)
            if tenant_id and request.url.path.startswith("/api/"):
                # Track API calls
                async with get_db() as session:
                    await UsageTracker.track(
                        session,
                        tenant_id,
                        "api_calls",
                        1
                    )
        
        return response
```

### Batch 5 Checklist Complète

#### Backend
- [ ] Créer modèle `Usage` avec `TenantMixin`
- [ ] Créer `UsageTracker` service avec tracking automatique
- [ ] Créer `UsageEnforcement` service avec vérification des limites
- [ ] Créer middleware de tracking (API calls, storage, etc.)
- [ ] Intégrer enforcement dans endpoints critiques
- [ ] Ajouter rate limiting basé sur usage
- [ ] Tests unitaires pour `UsageTracker`
- [ ] Tests unitaires pour `UsageEnforcement`
- [ ] Tests d'intégration pour tracking
- [ ] Tests pour enforcement (dépassement de limites)
- [ ] Tests de performance (tracking non-bloquant)
- [ ] Vérification TypeScript/Python (0 erreurs)
- [ ] Review de sécurité

#### Frontend
- [ ] Créer composant `UsageDashboard` avec composants existants
- [ ] Utiliser `UsageMeter`, `Card`, `Chart` existants (déjà dans billing)
- [ ] Afficher métriques d'utilisation
- [ ] Afficher alertes de limites
- [ ] Ajouter i18n support
- [ ] Tests unitaires
- [ ] Tests d'accessibilité
- [ ] Vérification TypeScript (0 erreurs)

#### Documentation
- [ ] Documenter le système de tracking
- [ ] Guide de configuration des limites
- [ ] Exemples de métriques
- [ ] Guide de troubleshooting

#### Démonstration
- [ ] Ajouter section sur page `/admin/tenancy`
- [ ] Dashboard d'utilisation interactif
- [ ] Visualisation des limites

#### Review & Commit
- [ ] Run TypeScript check
- [ ] Run Python type check
- [ ] Run build
- [ ] Run tests
- [ ] Review sécurité
- [ ] Commit: `feat(tenancy): Add usage tracking and enforcement`

---

---

## 📦 BATCH 6: Tenant Provisioning

**Status**: ⏳ **PENDING**  
**Priority**: 🟡 Medium  
**Estimated Time**: 2-3 days  
**Dependencies**: Batch 5

### Objectif
Créer les scripts et API pour provisionner de nouveaux tenants

### Tâches

#### 6.1 Script de Provisioning
**Fichier à créer**:
- `backend/scripts/provision_tenant.py`

**Code**:
```python
# backend/scripts/provision_tenant.py
import asyncio
from app.core.tenant_db_registry import TenantDatabaseRegistry
from app.core.tenancy import TenancyConfig

async def provision_tenant(
    tenant_id: int,
    tenant_name: str,
    db_url: str | None = None
):
    """Provisionne un nouveau tenant"""
    if not TenancyConfig.is_separate_db():
        return  # Pas besoin de provisioning pour shared DB
    
    # 1. Créer la base de données
    if not db_url:
        db_url = await TenantDatabaseRegistry.get_tenant_db_url(tenant_id)
    
    await create_database(db_url)
    
    # 2. Exécuter les migrations
    await run_migrations(db_url)
    
    # 3. Seed les données initiales
    await seed_tenant_data(db_url)
    
    print(f"Tenant {tenant_id} ({tenant_name}) provisioned successfully")
```

#### 6.2 API de Provisioning (Admin)
**Fichier à créer**:
- `backend/app/api/v1/endpoints/admin_tenants.py`

**Code**:
```python
# backend/app/api/v1/endpoints/admin_tenants.py
from fastapi import APIRouter, Depends, HTTPException
from app.scripts.provision_tenant import provision_tenant

router = APIRouter(prefix="/admin/tenants", tags=["admin"])

@router.post("/provision")
async def provision_new_tenant(
    tenant_data: TenantProvisionRequest,
    admin_user: User = Depends(require_admin)
):
    """Provisionne un nouveau tenant (admin only)"""
    if not TenancyConfig.is_separate_db():
        raise HTTPException(400, "Separate DB mode not enabled")
    
    await provision_tenant(
        tenant_data.tenant_id,
        tenant_data.name,
        tenant_data.db_url
    )
    
    return {"status": "provisioned"}
```

### Batch 6 Checklist Complète

#### Backend
- [ ] Créer script `provision_tenant.py` avec gestion d'erreurs
- [ ] Créer API admin pour provisioning (`/admin/tenants/provision`)
- [ ] Créer fonction `create_database` sécurisée
- [ ] Créer fonction `run_migrations` pour tenant
- [ ] Créer fonction `seed_tenant_data` avec données par défaut
- [ ] Ajouter validation et sanitization des inputs
- [ ] Ajouter rate limiting sur API provisioning
- [ ] Tests unitaires pour `provision_tenant`
- [ ] Tests unitaires pour API provisioning
- [ ] Tests d'intégration pour provisioning complet
- [ ] Tests de sécurité (injection, permissions)
- [ ] Vérification TypeScript/Python (0 erreurs)
- [ ] Review de sécurité

#### Frontend
- [ ] Créer composant `TenantProvisioning` avec composants existants
- [ ] Utiliser `Form`, `Input`, `Button`, `Alert` existants
- [ ] Formulaire de provisioning avec validation
- [ ] Affichage du statut de provisioning
- [ ] Ajouter i18n support
- [ ] Tests unitaires
- [ ] Tests d'accessibilité
- [ ] Tests E2E pour flow de provisioning
- [ ] Vérification TypeScript (0 erreurs)

#### Documentation
- [ ] Documenter le processus de provisioning
- [ ] Guide de provisioning manuel
- [ ] Guide de troubleshooting
- [ ] Exemples de scripts

#### Démonstration
- [ ] Ajouter section sur page `/admin/tenancy`
- [ ] Formulaire de provisioning interactif
- [ ] Visualisation du processus

#### Review & Commit
- [ ] Run TypeScript check
- [ ] Run Python type check
- [ ] Run build
- [ ] Run tests
- [ ] Review sécurité
- [ ] Commit: `feat(tenancy): Add tenant provisioning system`

---

---

## 📦 BATCH 7: Tests Complets & Documentation

**Status**: ⏳ **PENDING**  
**Priority**: 🟠 High  
**Estimated Time**: 2-3 days  
**Dependencies**: Batch 6

### Objectif
Tests complets et documentation

### Tâches

#### 7.1 Tests Unitaires
**Fichiers à créer**:
- `backend/tests/test_tenancy_config.py`
- `backend/tests/test_tenant_resolver.py`
- `backend/tests/test_db_router.py`
- `backend/tests/test_usage_tracking.py`
- `backend/tests/test_tenant_isolation.py`

#### 7.2 Tests d'Intégration
**Fichier à créer**:
- `backend/tests/integration/test_multi_tenancy.py`

**Scénarios**:
- Tenant A ne peut pas accéder aux données de Tenant B
- Usage tracking fonctionne correctement
- Enforcement bloque les dépassements
- Provisioning crée correctement les DBs

#### 7.3 Documentation
**Fichiers à créer**:
- `docs/MULTI_TENANCY_GUIDE.md` - Guide complet
- `docs/MULTI_TENANCY_MIGRATION.md` - Guide de migration
- `docs/MULTI_TENANCY_REMOVAL.md` - Guide pour retirer la feature

### Batch 7 Checklist Complète

#### Tests Backend
- [ ] Tests unitaires complets pour tous les composants
- [ ] Tests d'intégration multi-tenant (scénarios complets)
- [ ] Tests d'isolation des données (cross-tenant access)
- [ ] Tests de performance (charges multiples tenants)
- [ ] Tests de sécurité (injection, bypass, privilege escalation)
- [ ] Tests de migration (données existantes)
- [ ] Coverage > 80% pour tous les modules tenancy

#### Tests Frontend
- [ ] Tests unitaires pour tous les composants
- [ ] Tests d'intégration pour flows complets
- [ ] Tests E2E pour provisioning, configuration, usage
- [ ] Tests d'accessibilité (axe) pour toutes les pages
- [ ] Tests de sécurité (XSS, CSRF)
- [ ] Coverage > 80% pour tous les composants tenancy

#### Documentation
- [ ] `docs/MULTI_TENANCY_GUIDE.md` - Guide complet utilisateur
- [ ] `docs/MULTI_TENANCY_MIGRATION.md` - Guide de migration
- [ ] `docs/MULTI_TENANCY_REMOVAL.md` - Guide pour retirer la feature
- [ ] `docs/MULTI_TENANCY_SECURITY.md` - Guide de sécurité
- [ ] JSDoc/Python docstrings pour tous les fichiers
- [ ] Exemples de code pour chaque fonctionnalité
- [ ] Troubleshooting guide
- [ ] FAQ

#### Démonstration Template
- [ ] Page `/admin/tenancy` complète et fonctionnelle
- [ ] Toutes les fonctionnalités démontrées
- [ ] Exemples interactifs
- [ ] Guide visuel step-by-step
- [ ] Ajout au sitemap et navigation admin

#### Review & Commit
- [ ] Run TypeScript check (0 erreurs)
- [ ] Run Python type check (0 erreurs)
- [ ] Run build (0 erreurs)
- [ ] Run tous les tests (100% pass)
- [ ] Review sécurité complet
- [ ] Review documentation
- [ ] Commit: `feat(tenancy): Add comprehensive tests and documentation`

---

---

## 📦 BATCH 8: Facilitation du Removal & Finalisation

**Status**: ⏳ **PENDING**  
**Priority**: 🟡 Medium  
**Estimated Time**: 1-2 days  
**Dependencies**: Batch 7

### Objectif
S'assurer que la feature peut être facilement retirée

### Stratégie de Removal

#### 8.1 Feature Flags Partout
- Tous les imports conditionnels
- Tous les middlewares conditionnels
- Toutes les migrations conditionnelles

#### 8.2 Script de Removal
**Fichier à créer**:
- `scripts/remove_tenancy.py`

**Code**:
```python
# scripts/remove_tenancy.py
"""
Script pour retirer le multi-tenancy d'un projet
"""

def remove_tenancy():
    """Retire toutes les références au multi-tenancy"""
    
    # 1. Vérifier que TENANCY_MODE=single
    assert os.getenv("TENANCY_MODE") == "single"
    
    # 2. Supprimer les colonnes team_id des tables
    # 3. Supprimer les fichiers spécifiques au tenancy
    # 4. Nettoyer les imports
    # 5. Supprimer les migrations tenancy
    
    print("Tenancy removed successfully")
```

#### 8.3 Documentation de Removal
**Fichier à créer**:
- `docs/MULTI_TENANCY_REMOVAL.md`

**Contenu**:
1. Checklist de removal
2. Commandes à exécuter
3. Fichiers à supprimer
4. Migrations à rollback
5. Tests à exécuter après removal

### Batch 8 Checklist Complète

#### Script de Removal
- [ ] Créer script `scripts/remove_tenancy.py`
- [ ] Script vérifie que `TENANCY_MODE=single`
- [ ] Supprime les colonnes `team_id` des tables
- [ ] Supprime les fichiers spécifiques tenancy
- [ ] Nettoie les imports conditionnels
- [ ] Supprime les migrations tenancy
- [ ] Tests pour vérifier le script fonctionne

#### Documentation de Removal
- [ ] `docs/MULTI_TENANCY_REMOVAL.md` - Guide complet
- [ ] Checklist step-by-step
- [ ] Commandes à exécuter
- [ ] Fichiers à supprimer
- [ ] Migrations à rollback
- [ ] Tests à exécuter après removal
- [ ] Vérification post-removal

#### Vérification Conditionnelle
- [ ] Vérifier que tous les composants sont conditionnels
- [ ] Vérifier que tous les imports sont conditionnels
- [ ] Vérifier que tous les middlewares sont conditionnels
- [ ] Vérifier que toutes les migrations sont conditionnelles
- [ ] Tests avec `TENANCY_MODE=single` (comportement original)
- [ ] Tests avec `TENANCY_MODE=shared_db`
- [ ] Tests avec `TENANCY_MODE=separate_db`

#### Tests de Removal
- [ ] Test que le script fonctionne correctement
- [ ] Test que le projet fonctionne après removal
- [ ] Test que les tests passent après removal
- [ ] Test que le build fonctionne après removal
- [ ] Vérification qu'aucune référence tenancy ne reste

#### Documentation Finale
- [ ] Mettre à jour README principal
- [ ] Ajouter section tenancy dans documentation
- [ ] Créer guide de choix (single vs multi-tenant)
- [ ] Ajouter exemples de configuration

#### Review & Commit Final
- [ ] Run TypeScript check (0 erreurs)
- [ ] Run Python type check (0 erreurs)
- [ ] Run build (0 erreurs)
- [ ] Run tous les tests (100% pass)
- [ ] Test removal complet
- [ ] Review final sécurité
- [ ] Review final documentation
- [ ] Commit: `feat(tenancy): Add removal script and finalize multi-tenancy feature`

---

## 📁 Structure des Fichiers

```
backend/
├── app/
│   ├── core/
│   │   ├── tenancy.py              # Configuration
│   │   ├── mixins.py                # TenantMixin
│   │   ├── tenant_resolver.py      # Résolution tenant
│   │   ├── tenant_db_registry.py   # Registry des DBs
│   │   ├── db_router.py            # Router de DB
│   │   ├── query_scoping.py        # Scoping queries
│   │   └── dependencies.py         # Dependencies tenant
│   ├── middleware/
│   │   ├── tenant_middleware.py    # Middleware tenant
│   │   └── usage_tracking_middleware.py
│   ├── services/
│   │   ├── tenant_service.py       # Helpers tenant
│   │   ├── usage_tracker.py        # Tracking usage
│   │   └── usage_enforcement.py    # Enforcement limites
│   └── api/v1/endpoints/
│       └── admin_tenants.py        # API provisioning
├── alembic/versions/
│   ├── XXX_add_tenancy_support.py
│   └── XXX_migrate_existing_data.py
├── scripts/
│   └── provision_tenant.py        # Script provisioning
└── tests/
    ├── test_tenancy_config.py
    ├── test_tenant_resolver.py
    ├── test_db_router.py
    ├── test_usage_tracking.py
    └── integration/
        └── test_multi_tenancy.py

docs/
├── MULTI_TENANCY_GUIDE.md
├── MULTI_TENANCY_MIGRATION.md
└── MULTI_TENANCY_REMOVAL.md
```

---

## ✅ Checklist Finale

### Configuration
- [ ] Variables d'environnement documentées
- [ ] Feature flags fonctionnels
- [ ] Mode single-tenant par défaut

### Code
- [ ] Tous les composants sont conditionnels
- [ ] Pas de breaking changes pour projets existants
- [ ] Tests complets
- [ ] Documentation complète

### Removal
- [ ] Script de removal fonctionnel
- [ ] Documentation de removal
- [ ] Tests après removal

---

---

## 🔧 Standards d'Implémentation

### Avant Chaque Batch

1. **Review des Requirements**
   - Lire la checklist complète du batch
   - Vérifier les dépendances
   - Préparer l'environnement de test

2. **Sécurité First**
   - Vérifier les permissions nécessaires
   - Ajouter rate limiting si nécessaire
   - Valider et sanitizer tous les inputs
   - Tests de sécurité inclus

3. **Utilisation des Composants Existants**
   - ✅ Utiliser les 270+ composants existants
   - ❌ Ne pas créer de nouveaux primitifs UI
   - ✅ Suivre les patterns existants
   - ✅ Theme-aware automatiquement

### Pendant l'Implémentation

1. **Backend**
   - Code avec types stricts (Python type hints)
   - Validation et sanitization
   - Gestion d'erreurs complète
   - Logging approprié
   - Docstrings Python

2. **Frontend**
   - Code TypeScript strict
   - Utilisation des composants existants
   - i18n support (next-intl)
   - Error boundaries
   - Loading states
   - JSDoc comments

3. **Tests**
   - Tests unitaires (backend + frontend)
   - Tests d'intégration
   - Tests de sécurité
   - Tests d'accessibilité (axe)
   - Coverage > 80%

4. **Documentation**
   - JSDoc/Python docstrings
   - Documentation utilisateur
   - Exemples de code
   - Guide de troubleshooting

### Après Chaque Batch

1. **Vérifications**
   - [ ] TypeScript: `pnpm --filter web tsc --noEmit` (0 erreurs)
   - [ ] Python: `mypy backend/app` (0 erreurs)
   - [ ] Build: `pnpm build` (0 erreurs)
   - [ ] Tests: `pnpm test` (100% pass)
   - [ ] Linter: `pnpm lint` (0 erreurs)

2. **Review**
   - Review de code
   - Review de sécurité
   - Review de documentation
   - Review d'accessibilité

3. **Commit Progressif**
   - Commit après chaque batch
   - Message descriptif
   - Pas de commits massifs

4. **Démonstration**
   - Ajouter sur le site template
   - Tester manuellement
   - Vérifier visuellement

---

## 🚀 Ordre d'Implémentation Recommandé

1. **Batch 1** (Foundation) - Base solide et configuration
2. **Batch 2** (Tenant Resolution) - Système de résolution
3. **Batch 3** (Multi-DB) - Support multi-database
4. **Batch 4** (Modèles) - Modèles tenant-aware
5. **Batch 5** (Usage Tracking) - Tracking et enforcement
6. **Batch 6** (Provisioning) - Automatisation
7. **Batch 7** (Tests & Docs) - Qualité et documentation
8. **Batch 8** (Removal) - Facilitation du removal

**Durée totale estimée**: 15-20 jours de développement

---

## 📝 Notes Importantes

1. **Rétrocompatibilité**: Le mode `single` doit être le défaut et ne rien changer
2. **Conditionnel**: Tous les imports et usages doivent être conditionnels
3. **Tests**: Tester avec et sans tenancy activé
4. **Documentation**: Expliquer clairement chaque mode
5. **Migration**: Fournir des scripts de migration dans les deux sens

---

---

## 📊 Résumé du Plan

### Statistiques
- **Batches**: 8
- **Durée estimée**: 15-20 jours
- **Complexité**: Moyenne à élevée
- **Impact**: Élevé (feature majeure)
- **Risque**: Faible (bien isolé grâce aux feature flags)

### Composants Utilisés
- ✅ 270+ composants existants réutilisés
- ✅ Aucun nouveau primitif UI créé
- ✅ Theme-aware automatiquement
- ✅ Accessible (WCAG AA)

### Tests
- ✅ Tests unitaires pour chaque batch
- ✅ Tests d'intégration complets
- ✅ Tests de sécurité
- ✅ Tests d'accessibilité
- ✅ Coverage > 80%

### Documentation
- ✅ Guide complet utilisateur
- ✅ Guide de migration
- ✅ Guide de removal
- ✅ Guide de sécurité
- ✅ Documentation inline (JSDoc/Python)

### Sécurité
- ✅ Validation et sanitization
- ✅ Rate limiting
- ✅ Permissions checks
- ✅ Isolation stricte des données
- ✅ Tests de sécurité

### Démonstration
- ✅ Page `/admin/tenancy` complète
- ✅ Toutes les fonctionnalités démontrées
- ✅ Exemples interactifs
- ✅ Guide visuel

---

## ✅ Checklist Finale Globale

### Configuration
- [ ] Variables d'environnement documentées
- [ ] Feature flags fonctionnels
- [ ] Mode single-tenant par défaut
- [ ] Rétrocompatibilité garantie

### Code
- [ ] Tous les composants sont conditionnels
- [ ] Pas de breaking changes
- [ ] Tests complets (unitaires + intégration)
- [ ] Documentation complète
- [ ] 0 erreurs TypeScript/Python
- [ ] 0 erreurs de build

### Sécurité
- [ ] Validation complète
- [ ] Rate limiting
- [ ] Isolation des données vérifiée
- [ ] Tests de sécurité passés

### Démonstration
- [ ] Page template complète
- [ ] Toutes les fonctionnalités testées
- [ ] Documentation visuelle

### Removal
- [ ] Script de removal fonctionnel
- [ ] Documentation de removal complète
- [ ] Tests après removal
- [ ] Guide step-by-step

---

**Dernière mise à jour**: 2025-01-25  
**Status**: ⏳ Prêt pour implémentation

