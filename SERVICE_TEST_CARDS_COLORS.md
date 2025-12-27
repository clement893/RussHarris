# Service Test Cards - Color Mapping

This document shows where each Service Test Card pulls its colors from in the theme system and what colors they should be.

## Service Test Cards Overview

Each `ServiceTestCard` component uses a `color` prop that maps to specific CSS variables from the theme. The colors are applied through Tailwind CSS classes that reference CSS custom properties (CSS variables) set by the theme system.

## Color Mapping

### 1. **AI Test** Card
- **Color Prop**: `info`
- **Theme Source**: `info_color` from theme config
- **Default Color**: `#0891b2` (Professional cyan)
- **CSS Variables Used**:
  - Border: `--color-info-200` (light mode) / `--color-info-800` (dark mode)
  - Background: `--color-info-100` to `--color-info-200` gradient (light) / `--color-info-900/60` to `--color-info-800/60` (dark)
  - Icon Background: `--color-info-600` (light) / `--color-info-500` (dark)
  - Text: `--color-info-900` (light) / `--color-info-100` (dark)
  - Arrow: `--color-info-600` (light) / `--color-info-400` (dark)

### 2. **Email Test** Card
- **Color Prop**: `secondary`
- **Theme Source**: `secondary_color` from theme config
- **Default Color**: `#6366f1` (Elegant indigo)
- **CSS Variables Used**:
  - Border: `--color-secondary-200` (light) / `--color-secondary-800` (dark)
  - Background: `--color-secondary-100` to `--color-secondary-200` gradient (light) / `--color-secondary-900/60` to `--color-secondary-800/60` (dark)
  - Icon Background: `--color-secondary-600` (light) / `--color-secondary-500` (dark)
  - Text: `--color-secondary-900` (light) / `--color-secondary-100` (dark)
  - Arrow: `--color-secondary-600` (light) / `--color-secondary-400` (dark)

### 3. **Stripe Test** Card
- **Color Prop**: `success`
- **Theme Source**: `success_color` from theme config
- **Default Color**: `#059669` (Professional green)
- **CSS Variables Used**:
  - Border: `--color-success-200` (light) / `--color-success-800` (dark)
  - Background: `--color-success-100` to `--color-success-200` gradient (light) / `--color-success-900/60` to `--color-success-800/60` (dark)
  - Icon Background: `--color-success-600` (light) / `--color-success-500` (dark)
  - Text: `--color-success-900` (light) / `--color-success-100` (dark)
  - Arrow: `--color-success-600` (light) / `--color-success-400` (dark)

### 4. **Google Auth Test** Card
- **Color Prop**: `warning`
- **Theme Source**: `warning_color` from theme config
- **Default Color**: `#d97706` (Warm amber)
- **CSS Variables Used**:
  - Border: `--color-warning-200` (light) / `--color-warning-800` (dark)
  - Background: `--color-warning-100` to `--color-warning-200` gradient (light) / `--color-warning-900/60` to `--color-warning-800/60` (dark)
  - Icon Background: `--color-warning-600` (light) / `--color-warning-500` (dark)
  - Text: `--color-warning-900` (light) / `--color-warning-100` (dark)
  - Arrow: `--color-warning-600` (light) / `--color-warning-400` (dark)

### 5. **Sentry Test** Card
- **Color Prop**: `error`
- **Theme Source**: `danger_color` from theme config (maps to `error` in component)
- **Default Color**: `#dc2626` (Refined red)
- **CSS Variables Used**:
  - Border: `--color-danger-200` (light) / `--color-danger-800` (dark)
  - Background: `--color-danger-100` to `--color-danger-200` gradient (light) / `--color-danger-900/60` to `--color-danger-800/60` (dark)
  - Icon Background: `--color-danger-600` (light) / `--color-danger-500` (dark)
  - Text: `--color-danger-900` (light) / `--color-danger-100` (dark)
  - Arrow: `--color-danger-600` (light) / `--color-danger-400` (dark)

### 6. **S3 Upload** Card
- **Color Prop**: `primary`
- **Theme Source**: `primary_color` from theme config
- **Default Color**: `#2563eb` (Deep professional blue)
- **CSS Variables Used**:
  - Border: `--color-primary-200` (light) / `--color-primary-800` (dark)
  - Background: `--color-primary-100` to `--color-primary-200` gradient (light) / `--color-primary-900/60` to `--color-primary-800/60` (dark)
  - Icon Background: `--color-primary-600` (light) / `--color-primary-500` (dark)
  - Text: `--color-primary-900` (light) / `--color-primary-100` (dark)
  - Arrow: `--color-primary-600` (light) / `--color-primary-400` (dark)

### 7. **Client Portal** Card
- **Color Prop**: `info`
- **Theme Source**: `info_color` from theme config
- **Default Color**: `#0891b2` (Professional cyan)
- **CSS Variables Used**: Same as AI Test card (info color)

### 8. **ERP Portal** Card
- **Color Prop**: `primary`
- **Theme Source**: `primary_color` from theme config
- **Default Color**: `#2563eb` (Deep professional blue)
- **CSS Variables Used**: Same as S3 Upload card (primary color)

## How Colors Are Generated

The theme system generates color shades automatically from base colors using the `generateColorShades()` function. For each base color (e.g., `#2563eb`), it creates a full palette:

- **50**: Lightest shade (for backgrounds)
- **100-200**: Light shades (for subtle backgrounds)
- **300-400**: Medium-light shades (for borders, hover states)
- **500**: Base color (main color)
- **600-700**: Medium-dark shades (for icons, text)
- **800-900**: Dark shades (for dark mode backgrounds)
- **950**: Darkest shade

## Theme Configuration Location

The default theme colors are defined in:
- **Backend**: `backend/app/core/theme_defaults.py` - `DEFAULT_THEME_CONFIG`
- **Frontend**: `apps/web/src/lib/theme/default-theme-config.ts` - `DEFAULT_THEME_CONFIG`

## CSS Variables Application

CSS variables are applied to the document root (`:root`) by:
1. **Inline Script**: `apps/web/src/lib/theme/theme-inline-script.ts` - Applied before React hydration
2. **Global Theme Provider**: `apps/web/src/lib/theme/global-theme-provider.tsx` - Applied after React loads

## Component Implementation

The `ServiceTestCard` component is located at:
- `apps/web/src/components/ui/ServiceTestCard.tsx`

It uses Tailwind CSS classes that reference the CSS variables, ensuring all colors come from the theme system and can be customized through the theme configuration.

