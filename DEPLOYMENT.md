# 🚀 Deployment Guide

## Backend Configuration (Railway)

### Required Environment Variables

#### CORS Configuration
**⚠️ CRITICAL**: You MUST configure CORS to allow requests from your frontend.

Set one of these variables in Railway:

**Option 1: Single Frontend (Recommended)**
```env
FRONTEND_URL=https://your-frontend.railway.app
```

**Option 2: Multiple Origins**
```env
CORS_ORIGINS=https://your-frontend.railway.app,https://your-staging.railway.app
```

Or as JSON array:
```env
CORS_ORIGINS=["https://your-frontend.railway.app","https://your-staging.railway.app"]
```

#### Bootstrap Superadmin Key
For initial setup, set:
```env
BOOTSTRAP_SUPERADMIN_KEY=your-secure-random-key-here
```

Generate a secure key:
```bash
openssl rand -hex 32
# or
python -c "import secrets; print(secrets.token_hex(32))"
```

**⚠️ IMPORTANT**: 
- This key is only needed for the first superadmin creation
- After the first superadmin is created, this endpoint is disabled
- Keep this key secure and remove it after initial setup

### Example Railway Environment Variables

```env
# Database
DATABASE_URL=postgresql+asyncpg://postgres:password@postgres.railway.app:5432/railway

# CORS - REQUIRED for frontend to work
FRONTEND_URL=https://modele-nextjs-fullstack-production-1e92.up.railway.app

# Or for multiple origins:
# CORS_ORIGINS=https://modele-nextjs-fullstack-production-1e92.up.railway.app,https://staging.railway.app

# Bootstrap Key (for initial superadmin setup)
BOOTSTRAP_SUPERADMIN_KEY=your-generated-key-here

# Security
SECRET_KEY=your-secret-key-here

# Other required variables...
```

## Frontend Configuration (Railway)

### Required Environment Variables

```env
# API Configuration - REQUIRED
NEXT_PUBLIC_API_URL=https://your-backend.railway.app

# NextAuth
NEXTAUTH_URL=https://your-frontend.railway.app
NEXTAUTH_SECRET=your-secret-key-here

# Other required variables...
```

## Troubleshooting CORS Issues

If you see CORS errors like:
```
Access to fetch at 'https://backend.railway.app/...' from origin 'https://frontend.railway.app' 
has been blocked by CORS policy
```

**Solution:**
1. Check that `FRONTEND_URL` or `CORS_ORIGINS` is set in your backend Railway service
2. Ensure the URL matches exactly (including `https://` and no trailing slash)
3. Restart your backend service after setting the variable
4. Check backend logs for: `CORS Origins configured: [...]`

## Common Issues

### Issue: "Response to preflight request doesn't pass access control check"

**Cause**: CORS_ORIGINS not configured or incorrect URL

**Solution**: 
- Set `FRONTEND_URL` in backend Railway environment variables
- Ensure URL matches your frontend URL exactly
- Restart backend service

### Issue: "X-Bootstrap-Key header not allowed"

**Solution**: Already fixed in code - ensure you're using the latest version

### Issue: Backend not accessible

**Solution**:
- Check that `NEXT_PUBLIC_API_URL` is set in frontend Railway environment variables
- Verify backend is running and accessible
- Check Railway logs for backend service

