# MODELE Backend API

FastAPI backend with OpenAPI/Swagger auto-generation, Pydantic v2 validation, Alembic migrations, and automated tests.

## 🚀 Features

- **FastAPI** with automatic OpenAPI/Swagger documentation
- **Pydantic v2** for request/response validation
- **Alembic** for database migrations with rollback support
- **Automated API tests** with pytest
- **Async SQLAlchemy** for database operations
- **JWT authentication** with password hashing

## 📋 Prerequisites

- Python 3.11+
- PostgreSQL (or SQLite for development)
- pip or poetry

## 🛠️ Installation

1. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Copy environment file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration

## 🗄️ Database Setup

1. Create database:
```bash
createdb modele
```

2. Run migrations:
```bash
python scripts/migrate.py upgrade
```

Or create initial migration:
```bash
python scripts/migrate.py create "Initial migration"
python scripts/migrate.py upgrade
```

## 🏃 Running the Application

### Development
```bash
python run.py
```

Or with uvicorn directly:
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Production
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

## 📚 API Documentation

Once the server is running:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI JSON**: http://localhost:8000/api/v1/openapi.json

## 🧪 Testing

Run all tests:
```bash
pytest
```

Run with coverage:
```bash
pytest --cov=app --cov-report=html
```

Run specific test file:
```bash
pytest tests/test_auth.py
```

## 🔄 Database Migrations

### Create Migration
```bash
python scripts/migrate.py create "Description of changes"
```

### Upgrade Database
```bash
python scripts/migrate.py upgrade
```

### Downgrade Database
```bash
python scripts/migrate.py downgrade -1  # Go back one revision
python scripts/migrate.py downgrade <revision_id>  # Go to specific revision
```

### View Current Revision
```bash
python scripts/migrate.py current
```

### View Migration History
```bash
python scripts/migrate.py history
```

## 📁 Project Structure

```
backend/
├── app/
│   ├── api/
│   │   └── v1/
│   │       ├── endpoints/     # API endpoints
│   │       └── router.py      # Main router
│   ├── core/
│   │   ├── config.py          # Settings with Pydantic
│   │   └── database.py        # Database configuration
│   ├── models/                # SQLAlchemy models
│   ├── schemas/               # Pydantic schemas
│   └── main.py                # FastAPI app
├── alembic/                   # Alembic migrations
├── tests/                     # Test suite
├── scripts/
│   └── migrate.py             # Migration helper script
├── requirements.txt
├── pyproject.toml
└── alembic.ini
```

## 🔐 Authentication

The API uses JWT tokens for authentication:

1. Register a user:
```bash
POST /api/v1/auth/register
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "first_name": "John",
  "last_name": "Doe"
}
```

2. Login:
```bash
POST /api/v1/auth/login
username=user@example.com&password=SecurePass123
```

3. Use token in requests:
```bash
Authorization: Bearer <access_token>
```

## 🎯 API Endpoints

### Health
- `GET /api/v1/health/` - Health check
- `GET /api/v1/health/ready` - Readiness check

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login and get token
- `GET /api/v1/auth/me` - Get current user (protected)

### Users
- `GET /api/v1/users/` - List users
- `GET /api/v1/users/{id}` - Get user by ID

## 🧹 Code Quality

### Format code:
```bash
black app tests
```

### Lint code:
```bash
ruff check app tests
```

### Type checking:
```bash
mypy app
```

## 📝 Environment Variables

See `.env.example` for all available environment variables.

Key variables:
- `DATABASE_URL` - Database connection string
- `SECRET_KEY` - Secret key for JWT tokens
- `CORS_ORIGINS` - Allowed CORS origins
- `DEBUG` - Enable debug mode

## 🐛 Troubleshooting

### Database connection errors
- Verify `DATABASE_URL` is correct
- Ensure PostgreSQL is running
- Check database exists

### Migration errors
- Ensure all models are imported in `alembic/env.py`
- Check database schema matches models

### Test failures
- Ensure test database is clean
- Check fixtures are properly configured

## 📚 Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Pydantic v2 Documentation](https://docs.pydantic.dev/)
- [Alembic Documentation](https://alembic.sqlalchemy.org/)
- [SQLAlchemy Async Documentation](https://docs.sqlalchemy.org/en/20/orm/extensions/asyncio.html)
