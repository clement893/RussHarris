# 📦 Monorepo Structure

This document describes the monorepo structure and configuration for MODELE-NEXTJS-FULLSTACK.

## 📁 Structure

```
MODELE-NEXTJS-FULLSTACK/
├── apps/
│   └── web/              # Next.js 16 frontend
├── backend/              # FastAPI backend
├── packages/
│   └── types/            # Shared TypeScript types
├── scripts/              # Development scripts
├── turbo.json            # Turborepo configuration
├── pnpm-workspace.yaml   # pnpm workspace configuration
└── package.json          # Root package.json
```

## 🚀 Turborepo

### Build Pipeline

Build order is automatically handled:
1. `@modele/types` (shared package)
2. `@modele/web` (depends on `@modele/types`)

### Cache

Turborepo cache is configured for:
- **Remote cache**: Shared between CI/CD environments
- **Optimized outputs**: Only necessary files are cached
- **Dependency tracking**: Configuration files monitored for invalidation

### Parallel Scripts

- `build` - Parallel build with dependency respect
- `test` - Parallel tests
- `lint` - Parallel linting
- `type-check` - Parallel type checking

## 📦 Shared Packages

### @modele/types

Shared TypeScript types package between frontend and backend.

**Usage:**
```typescript
import type { User, ApiResponse } from '@modele/types';
```

**Build:**
```bash
pnpm --filter @modele/types build
```

## 🔧 Workspace Dependencies

### Protocol

All internal dependencies use `workspace:*` protocol:

```json
{
  "dependencies": {
    "@modele/types": "workspace:*"
  }
}
```

### Configuration (.npmrc)

- `link-workspace-packages` - Automatic linking
- `public-hoist-pattern` - Hoist common dependencies
- `auto-install-peers` - Auto-install peer dependencies

## 📝 Available Scripts

### Build

```bash
# Build all packages
pnpm build

# Build specific package
pnpm build:web
pnpm build:types

# Clean build (no cache)
pnpm build:clean
```

### Development

```bash
# Start all services
pnpm dev:full

# Start with Turborepo
pnpm dev
```

### Workspace Management

```bash
# Check workspace dependencies
pnpm workspace:check

# Update dependencies
pnpm workspace:upgrade
```

## 🐛 Troubleshooting

### Cache Issues

```bash
# Clear Turborepo cache
rm -rf .turbo
pnpm build
```

### Workspace Dependencies

```bash
# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Verify workspace config
cat pnpm-workspace.yaml
cat .npmrc
```

## 📚 Resources

- [Turborepo Documentation](https://turbo.build/repo/docs)
- [pnpm Workspace Documentation](https://pnpm.io/workspaces)
- [Monorepo Best Practices](https://monorepo.tools/)
