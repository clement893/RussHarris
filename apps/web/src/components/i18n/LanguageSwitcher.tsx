/**
 * Language Switcher Component
 *
 * Allows users to switch between available languages.
 * Supports RTL languages (Arabic, Hebrew) and uses window.location for navigation.
 *
 * @example
 * ```tsx
 * <LanguageSwitcher />
 * ```
 *
 * @see LocaleSwitcher - Alternative implementation using Next.js router
 */
'use client';

import { useLocale, useTranslations } from 'next-intl';
import { locales, localeNames, localeNativeNames, isRTL, type Locale } from '@/i18n/routing';
import { useState } from 'react';
import { Globe, Check } from '@/lib/icons';
import Button from '@/components/ui/Button';
import { clsx } from 'clsx';

interface LanguageSwitcherProps {
  /** When true, use dark text/icon for readability on light header background */
  isOnWhiteBackground?: boolean;
}

export default function LanguageSwitcher({ isOnWhiteBackground = false }: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const t = useTranslations('language');
  const [isOpen, setIsOpen] = useState(false);

  const handleLocaleChange = (newLocale: Locale) => {
    setIsOpen(false);

    // App uses [locale] segment: URLs are always /en/... or /fr/...
    const { pathname: currentPath } = window.location;
    const pathWithoutLocale = currentPath.replace(/^\/(en|fr)/, '') || '/';
    const segment = pathWithoutLocale === '/' ? '' : pathWithoutLocale;

    // Always use locale prefix so navigation goes to /en/... or /fr/...
    const newPath = `/${newLocale}${segment}`;

    window.location.href = newPath;
  };

  return (
    <div className="relative">
      <Button
        variant="secondary"
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'flex items-center gap-2',
          isOnWhiteBackground
            ? 'bg-gray-100 hover:bg-gray-200 text-gray-900 border border-gray-200'
            : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
        )}
        aria-label={t('switchLanguage')}
      >
        <Globe className={clsx('w-4 h-4', isOnWhiteBackground ? 'text-gray-900' : '')} />
        <span className="hidden sm:inline">{localeNames[locale]}</span>
        <span className="sm:hidden">{locale.toUpperCase()}</span>
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />

          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-background rounded-lg shadow-lg border border-border z-20">
            <div className="py-1">
              {locales.map((loc) => (
                <button
                  key={loc}
                  onClick={() => handleLocaleChange(loc)}
                  className={clsx(
                    'w-full px-4 py-2 text-left text-sm flex items-center justify-between hover:bg-muted transition-colors',
                    locale === loc && 'bg-muted'
                  )}
                  dir={isRTL(loc) ? 'rtl' : 'ltr'}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{localeNativeNames[loc]}</span>
                    <span className="text-xs text-muted-foreground">{localeNames[loc]}</span>
                  </div>
                  {locale === loc && (
                    <Check className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
