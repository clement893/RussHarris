/**
 * Language Toggle Component
 * Simple toggle that switches between available languages in one click
 */
'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { locales, localeNames, type Locale } from '@/i18n/routing';
import { Globe } from 'lucide-react';

export default function LanguageToggle() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const handleToggle = () => {
    // Get the other locale (toggle between available locales)
    const currentIndex = locales.indexOf(locale);
    const nextIndex = (currentIndex + 1) % locales.length;
    const newLocale = locales[nextIndex];

    // Get current pathname without locale
    const pathWithoutLocale = pathname.replace(/^\/(en|fr)/, '') || '/';

    // Build new path with locale
    const newPath = newLocale === 'en' ? pathWithoutLocale : `/${newLocale}${pathWithoutLocale}`;

    // Navigate to new locale
    router.push(newPath);

    // Small delay before reload to ensure navigation
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  // Get the next locale to show what it will switch to
  const currentIndex = locales.indexOf(locale);
  const nextIndex = (currentIndex + 1) % locales.length;
  const nextLocale = locales[nextIndex] || locales[0]; // Fallback to first locale if undefined

  return (
    <button
      onClick={handleToggle}
      className="p-2 rounded-lg hover:bg-muted dark:hover:bg-muted text-foreground transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] min-h-[44px] min-w-[44px] flex items-center justify-center"
      aria-label={`Switch to ${localeNames[nextLocale]}`}
      title={`${localeNames[locale]} → ${localeNames[nextLocale]}`}
    >
      <Globe className="w-5 h-5" />
    </button>
  );
}
