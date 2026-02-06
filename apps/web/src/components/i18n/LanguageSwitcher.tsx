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
import { clsx } from 'clsx';

interface LanguageSwitcherProps {
  /** When true, focus ring offset for light background (optional, for a11y) */
  isOnWhiteBackground?: boolean;
}

/** Same visual style as the header CTA "Je m'inscris" for consistency */
const ctaButtonClasses = (
  isOnWhiteBackground: boolean,
  extra?: string
) =>
  clsx(
    'inline-flex items-center gap-2 px-5 py-2 text-sm font-medium rounded-full',
    'transition-colors duration-200',
    'text-white bg-[#FF8C42] hover:bg-[#FF7A29]',
    isOnWhiteBackground
      ? 'focus:outline-none focus:ring-2 focus:ring-[#FF8C42] focus:ring-offset-2 focus:ring-offset-white'
      : 'focus:outline-none focus:ring-2 focus:ring-[#FF8C42] focus:ring-offset-2 focus:ring-offset-[#1F2937]',
    extra
  );

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
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={ctaButtonClasses(isOnWhiteBackground)}
        aria-label={t('switchLanguage')}
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{localeNames[locale]}</span>
        <span className="sm:hidden">{locale.toUpperCase()}</span>
      </button>

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
