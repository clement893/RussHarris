#!/bin/sh
set -e

# Use PORT environment variable if set, otherwise default to 8000
# Railway automatically sets PORT to the port the service should listen on
PORT=${PORT:-8000}

echo "=========================================="
echo "Backend startup configuration:"
echo "PORT environment variable: ${PORT}"
echo "DATABASE_URL set: $([ -n "$DATABASE_URL" ] && echo 'yes' || echo 'no')"
echo "=========================================="

# Run database migrations (skip if DATABASE_URL is not set to avoid crashes)
if [ -n "$DATABASE_URL" ]; then
    echo "Running database migrations..."
    alembic upgrade head || echo "Warning: Database migrations failed, continuing anyway..."
else
    echo "Warning: DATABASE_URL not set, skipping migrations..."
fi

# Start Uvicorn directly for FastAPI
# Railway will route traffic to this port
echo "Starting Uvicorn on 0.0.0.0:$PORT..."
exec uvicorn app.main:app --host 0.0.0.0 --port $PORT --log-level info

