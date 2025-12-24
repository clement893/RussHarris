# Dependency Scanning Setup Guide

This guide explains how to set up automated dependency vulnerability scanning for this project.

## 🔍 Overview

Dependency scanning helps identify and fix security vulnerabilities in your project's dependencies before they become a problem.

## 🛠️ Setup Options

### Option 1: GitHub Dependabot (Recommended)

Dependabot is GitHub's built-in dependency scanning and update service.

#### Setup Steps:

1. **Create `.github/dependabot.yml`** (already created if following this guide)

```yaml
version: 2
updates:
  # Frontend dependencies
  - package-ecosystem: "npm"
    directory: "/apps/web"
    schedule:
      interval: "weekly"
      day: "monday"
    open-pull-requests-limit: 5
    reviewers:
      - "your-github-username"
    labels:
      - "dependencies"
      - "security"
    
  # Backend dependencies (if applicable)
  - package-ecosystem: "pip"
    directory: "/backend"
    schedule:
      interval: "weekly"
      day: "monday"
    open-pull-requests-limit: 5
```

2. **Enable Dependabot Security Updates**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Security** → **Code security and analysis**
   - Enable **Dependabot alerts**
   - Enable **Dependabot security updates**

#### Benefits:
- ✅ Automatic vulnerability detection
- ✅ Automatic pull requests for security updates
- ✅ Weekly dependency updates
- ✅ Free for public repositories
- ✅ Integrated with GitHub Security tab

---

### Option 2: Snyk

Snyk provides comprehensive security scanning and monitoring.

#### Setup Steps:

1. **Install Snyk CLI**
```bash
npm install -g snyk
```

2. **Authenticate**
```bash
snyk auth
```

3. **Test your project**
```bash
cd apps/web
snyk test
```

4. **Monitor your project**
```bash
snyk monitor
```

5. **Add to CI/CD** (GitHub Actions example)
```yaml
name: Snyk Security Scan
on:
  push:
    branches: [ main, INITIALComponentRICH ]
  pull_request:
    branches: [ main, INITIALComponentRICH ]
  schedule:
    - cron: '0 0 * * 1' # Weekly on Monday

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Snyk to check for vulnerabilities
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
        with:
          args: --severity-threshold=high
```

#### Benefits:
- ✅ Comprehensive vulnerability database
- ✅ License compliance checking
- ✅ Container scanning
- ✅ CI/CD integration
- ✅ Free tier available

---

### Option 3: npm audit (Built-in)

npm/pnpm includes built-in vulnerability scanning.

#### Usage:

```bash
# Check for vulnerabilities
cd apps/web
pnpm audit

# Fix automatically (if possible)
pnpm audit fix

# Fix with breaking changes
pnpm audit fix --force
```

#### Add to package.json scripts:

```json
{
  "scripts": {
    "audit": "pnpm audit",
    "audit:fix": "pnpm audit fix"
  }
}
```

#### Benefits:
- ✅ Built-in, no setup required
- ✅ Fast scanning
- ✅ Automatic fixes available
- ✅ Free

---

## 📋 Recommended Workflow

### Daily/Weekly:
1. Check Dependabot alerts in GitHub
2. Review and merge security update PRs
3. Run `pnpm audit` locally before deploying

### Monthly:
1. Review all dependencies for unused packages
2. Update major versions (test thoroughly)
3. Review security advisories

### Before Production Deployment:
1. Run `pnpm audit` and fix all high/critical vulnerabilities
2. Review Dependabot alerts
3. Test all dependency updates

---

## 🔧 Manual Scanning Commands

### Check for vulnerabilities:
```bash
cd apps/web
pnpm audit
```

### Check for outdated packages:
```bash
cd apps/web
pnpm outdated
```

### Update dependencies:
```bash
# Update within semver ranges
pnpm update

# Update to latest (may include breaking changes)
pnpm update --latest
```

---

## 📊 Monitoring Dashboard

### GitHub Security Tab
- View all security alerts
- Track vulnerability status
- Review dependency graph

### Snyk Dashboard
- Comprehensive vulnerability reports
- License compliance
- Project health score

---

## ⚠️ Best Practices

1. **Don't ignore security alerts** - Even low-severity vulnerabilities can be chained
2. **Test updates** - Always test dependency updates before merging
3. **Review changelogs** - Check for breaking changes
4. **Use lock files** - Commit `pnpm-lock.yaml` to ensure consistent installs
5. **Pin critical dependencies** - For security-critical packages, pin exact versions
6. **Regular updates** - Don't let dependencies get too outdated

---

## 🚨 Handling Critical Vulnerabilities

If a critical vulnerability is found:

1. **Assess impact** - Determine if your code uses the vulnerable feature
2. **Check for updates** - Look for patched versions
3. **Update immediately** - If update available, update and test
4. **Workaround** - If no update available, implement workaround
5. **Monitor** - Watch for security advisories

---

## 📚 Resources

- [Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)
- [Snyk Documentation](https://docs.snyk.io/)
- [npm audit Documentation](https://docs.npmjs.com/cli/v8/commands/npm-audit)
- [OWASP Dependency Check](https://owasp.org/www-project-dependency-check/)

---

## ✅ Checklist

- [ ] Set up Dependabot (recommended)
- [ ] Enable Dependabot alerts
- [ ] Add `pnpm audit` to CI/CD pipeline
- [ ] Schedule regular dependency reviews
- [ ] Document update process
- [ ] Set up monitoring dashboard

---

**Last Updated:** 2025-12-24

