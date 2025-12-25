# 🚀 Deployment Guides

Comprehensive deployment guides for different platforms and scenarios.

---

## 📋 Table of Contents

1. [Railway Deployment](#railway-deployment)
2. [Vercel Deployment](#vercel-deployment)
3. [Docker Deployment](#docker-deployment)
4. [Render Deployment](#render-deployment)
5. [DigitalOcean Deployment](#digitalocean-deployment)
6. [Self-Hosted Deployment](#self-hosted-deployment)
7. [Multi-Environment Setup](#multi-environment-setup)

---

## 🚂 Railway Deployment

### Frontend on Railway

#### Step 1: Create Railway Project

1. Go to [railway.app](https://railway.app)
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Choose your repository

#### Step 2: Configure Frontend Service

1. **Add Service** → **GitHub Repo** → Select your repo
2. **Root Directory**: `apps/web`
3. **Build Command**: `pnpm install && pnpm build`
4. **Start Command**: `pnpm start`

#### Step 3: Environment Variables

Add these variables in Railway dashboard:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
NEXT_PUBLIC_APP_URL=https://your-frontend.railway.app

# Authentication
NEXTAUTH_URL=https://your-frontend.railway.app
NEXTAUTH_SECRET=your-production-secret-32-chars-min

# OAuth (if using)
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret

# Sentry
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
SENTRY_DSN=your-sentry-dsn
SENTRY_ENVIRONMENT=production
NEXT_PUBLIC_SENTRY_ENVIRONMENT=production

# Stripe (if using)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-key
```

#### Step 4: Configure Railway

Create `apps/web/railway.json`:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "pnpm install && pnpm build"
  },
  "deploy": {
    "startCommand": "pnpm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

#### Step 5: Deploy

- Railway automatically deploys on push to main branch
- Or manually trigger deployment from dashboard

### Backend on Railway

#### Step 1: Add Backend Service

1. In Railway project, click **"New"** → **"GitHub Repo"**
2. Select same repository
3. **Root Directory**: `backend`

#### Step 2: Add PostgreSQL Database

1. Click **"New"** → **"Database"** → **"PostgreSQL"**
2. Railway automatically provides `DATABASE_URL`

#### Step 3: Environment Variables

```env
# Database (auto-provided)
DATABASE_URL=postgresql://...

# Security
SECRET_KEY=your-production-secret-32-chars-min
ENVIRONMENT=production
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
REFRESH_TOKEN_EXPIRE_DAYS=7

# CORS (CRITICAL!)
FRONTEND_URL=https://your-frontend.railway.app
CORS_ORIGINS=https://your-frontend.railway.app

# Bootstrap Superadmin
BOOTSTRAP_SUPERADMIN_KEY=your-secure-random-key

# Email
SENDGRID_API_KEY=your-sendgrid-key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
SENDGRID_FROM_NAME=Your App Name

# AWS S3 (if using)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name

# Sentry
SENTRY_DSN=your-sentry-dsn
SENTRY_ENVIRONMENT=production

# OpenAI (if using)
OPENAI_API_KEY=your-openai-key
```

#### Step 4: Run Migrations

After first deployment:

```bash
# Via Railway CLI
railway run alembic upgrade head

# Or add to railway.json deploy hook
```

Create `backend/railway.json`:

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "uvicorn app.main:app --host 0.0.0.0 --port $PORT",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

## ▲ Vercel Deployment

### Frontend on Vercel

#### Step 1: Import Project

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New"** → **"Project"**
3. Import your GitHub repository

#### Step 2: Configure Project

**Project Settings:**
- **Framework Preset**: Next.js
- **Root Directory**: `apps/web`
- **Build Command**: `pnpm build` (or leave default)
- **Output Directory**: `.next` (or leave default)
- **Install Command**: `pnpm install`

#### Step 3: Environment Variables

Add in Vercel dashboard → Settings → Environment Variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=https://your-backend.railway.app

# Authentication
NEXTAUTH_URL=https://your-app.vercel.app
NEXTAUTH_SECRET=your-production-secret

# OAuth
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret

# Sentry
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
SENTRY_ENVIRONMENT=production

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-key
```

#### Step 4: Deploy

- Click **"Deploy"**
- Vercel builds and deploys automatically
- Future pushes to main branch auto-deploy

#### Step 5: Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS records as shown

---

## 🐳 Docker Deployment

### Frontend Docker

#### Step 1: Create Dockerfile

Create `apps/web/Dockerfile`:

```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy package files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/
COPY packages/types/package.json ./packages/types/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build application
WORKDIR /app/apps/web
RUN pnpm build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built application
COPY --from=builder /app/apps/web/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/web/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
```

#### Step 2: Build Image

```bash
cd apps/web
docker build -t your-app-frontend .
```

#### Step 3: Run Container

```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=https://your-backend.com \
  -e NEXTAUTH_SECRET=your-secret \
  -e NEXTAUTH_URL=http://localhost:3000 \
  your-app-frontend
```

### Backend Docker

#### Step 1: Create Dockerfile

Create `backend/Dockerfile`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    gcc \
    postgresql-client \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Expose port
EXPOSE 8000

# Run application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### Step 2: Build and Run

```bash
cd backend
docker build -t your-app-backend .

docker run -p 8000:8000 \
  -e DATABASE_URL=postgresql+asyncpg://user:pass@host:5432/db \
  -e SECRET_KEY=your-secret \
  -e FRONTEND_URL=https://your-frontend.com \
  your-app-backend
```

### Docker Compose (Full Stack)

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: ${POSTGRES_DB:-your_db}
      POSTGRES_USER: ${POSTGRES_USER:-postgres}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-postgres}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    environment:
      DATABASE_URL: postgresql+asyncpg://postgres:${POSTGRES_PASSWORD:-postgres}@postgres:5432/${POSTGRES_DB:-your_db}
      SECRET_KEY: ${SECRET_KEY}
      FRONTEND_URL: ${FRONTEND_URL:-http://localhost:3000}
      REDIS_URL: redis://redis:6379/0
      ENVIRONMENT: production
    depends_on:
      postgres:
        condition: service_healthy
      redis:
        condition: service_healthy
    restart: unless-stopped

  frontend:
    build:
      context: ./apps/web
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: http://backend:8000
      NEXTAUTH_URL: ${NEXTAUTH_URL:-http://localhost:3000}
      NEXTAUTH_SECRET: ${NEXTAUTH_SECRET}
    depends_on:
      - backend
    restart: unless-stopped

volumes:
  postgres_data:
```

Run with:

```bash
docker-compose up -d
```

---

## 🎨 Render Deployment

### Frontend on Render

1. **Create Web Service**
   - Connect GitHub repository
   - **Root Directory**: `apps/web`
   - **Build Command**: `pnpm install && pnpm build`
   - **Start Command**: `pnpm start`

2. **Environment Variables**
   - Add all `NEXT_PUBLIC_*` variables
   - Add server-side variables

3. **Deploy**
   - Render auto-deploys on push

### Backend on Render

1. **Create Web Service**
   - Connect GitHub repository
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`

2. **Add PostgreSQL**
   - Create PostgreSQL database
   - `DATABASE_URL` auto-provided

3. **Environment Variables**
   - Same as Railway backend variables

---

## 🌊 DigitalOcean Deployment

### App Platform

1. **Create App**
   - Connect GitHub repository
   - Select frontend/backend directories
   - Choose runtime (Node.js/Python)

2. **Configure**
   - Set build and start commands
   - Add environment variables
   - Add PostgreSQL database

3. **Deploy**
   - DigitalOcean auto-deploys

### Droplets (Self-Managed)

1. **Create Droplet**
   - Ubuntu 22.04 LTS
   - Minimum 2GB RAM

2. **Install Dependencies**
   ```bash
   # Node.js
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Python
   sudo apt-get install python3.11 python3-pip
   
   # PostgreSQL
   sudo apt-get install postgresql postgresql-contrib
   ```

3. **Deploy Application**
   - Clone repository
   - Install dependencies
   - Build application
   - Run with PM2/systemd

---

## 🏠 Self-Hosted Deployment

### Requirements

- Ubuntu 22.04+ server
- Domain name (optional)
- SSL certificate (Let's Encrypt)

### Setup Steps

1. **Install Dependencies**
   ```bash
   # Node.js 20
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Python 3.11
   sudo apt-get install python3.11 python3.11-venv python3-pip
   
   # PostgreSQL
   sudo apt-get install postgresql postgresql-contrib
   
   # Nginx
   sudo apt-get install nginx
   
   # PM2 (Process Manager)
   sudo npm install -g pm2
   ```

2. **Setup Database**
   ```bash
   sudo -u postgres psql
   CREATE DATABASE your_db;
   CREATE USER your_user WITH PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE your_db TO your_user;
   ```

3. **Deploy Application**
   ```bash
   # Clone repository
   git clone https://github.com/your-org/your-repo.git
   cd your-repo
   
   # Install dependencies
   pnpm install
   
   # Build frontend
   cd apps/web
   pnpm build
   
   # Start with PM2
   pm2 start pnpm --name "frontend" -- start
   pm2 save
   pm2 startup
   ```

4. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

5. **Setup SSL**
   ```bash
   sudo apt-get install certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

---

## 🔄 Multi-Environment Setup

### Environment Structure

```
environments/
├── development/
│   ├── .env.development
│   └── config.json
├── staging/
│   ├── .env.staging
│   └── config.json
└── production/
    ├── .env.production
    └── config.json
```

### Environment Variables by Environment

#### Development
```env
NODE_ENV=development
SENTRY_ENVIRONMENT=development
SENTRY_ENABLE_DEV=true
```

#### Staging
```env
NODE_ENV=production
SENTRY_ENVIRONMENT=staging
SENTRY_ENABLE_DEV=false
```

#### Production
```env
NODE_ENV=production
SENTRY_ENVIRONMENT=production
SENTRY_ENABLE_DEV=false
```

---

## 📊 Platform Comparison

| Platform | Frontend | Backend | Database | Ease | Cost |
|----------|----------|---------|----------|------|------|
| **Railway** | ✅ Excellent | ✅ Excellent | ✅ Included | ⭐⭐⭐⭐⭐ | $$ |
| **Vercel** | ✅ Excellent | ⚠️ Limited | ❌ | ⭐⭐⭐⭐⭐ | $ |
| **Render** | ✅ Good | ✅ Good | ✅ Included | ⭐⭐⭐⭐ | $$ |
| **Docker** | ✅ | ✅ | ✅ | ⭐⭐⭐ | $ |
| **DigitalOcean** | ✅ | ✅ | ✅ | ⭐⭐⭐ | $$ |
| **Self-Hosted** | ✅ | ✅ | ✅ | ⭐⭐ | $ |

---

## 🔍 Post-Deployment Checklist

- [ ] Verify frontend loads correctly
- [ ] Test API endpoints
- [ ] Verify authentication works
- [ ] Check database connection
- [ ] Test error tracking (Sentry)
- [ ] Verify performance monitoring
- [ ] Check CORS configuration
- [ ] Test file uploads (if applicable)
- [ ] Verify email sending (if applicable)
- [ ] Check SSL certificate
- [ ] Test custom domain (if applicable)
- [ ] Monitor logs for errors
- [ ] Set up alerts/notifications

---

## 📚 Additional Resources

- [Railway Docs](https://docs.railway.app/)
- [Vercel Docs](https://vercel.com/docs)
- [Docker Docs](https://docs.docker.com/)
- [Render Docs](https://render.com/docs)
- [DigitalOcean Docs](https://docs.digitalocean.com/)

---

**Last Updated**: 2025-01-25

