"""
Pytest Configuration
Fixtures and test setup
"""

import pytest
from httpx import AsyncClient
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.pool import StaticPool

from app.core.database import Base, get_db
from app.main import app


# Test database URL (in-memory SQLite for testing)
TEST_DATABASE_URL = "sqlite+aiosqlite:///:memory:"

# Create test engine
test_engine = create_async_engine(
    TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)

TestSessionLocal = async_sessionmaker(
    test_engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


async def override_get_db() -> AsyncSession:
    """Override database dependency for testing"""
    async with TestSessionLocal() as session:
        yield session


@pytest.fixture(scope="function")
async def db_session() -> AsyncSession:
    """Create database session for testing"""
    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with TestSessionLocal() as session:
        yield session

    async with test_engine.begin() as conn:
        await conn.run_sync(Base.metadata.drop_all)


@pytest.fixture(scope="function")
async def client(db_session: AsyncSession) -> AsyncClient:
    """Create test client"""
    app.dependency_overrides[get_db] = override_get_db
    async with AsyncClient(app=app, base_url="http://test") as ac:
        yield ac
    app.dependency_overrides.clear()


@pytest.fixture
async def test_user(db_session: AsyncSession) -> dict:
    """Create a test user"""
    from app.models.user import User
    from app.api.v1.endpoints.auth import get_password_hash

    user = User(
        email="test@example.com",
        hashed_password=get_password_hash("TestPassword123"),
        first_name="Test",
        last_name="User",
    )
    db_session.add(user)
    await db_session.commit()
    await db_session.refresh(user)

    return {
        "id": user.id,
        "email": user.email,
        "password": "TestPassword123",
    }
