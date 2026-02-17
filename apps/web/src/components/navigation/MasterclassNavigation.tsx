/**
 * MasterclassNavigation Component
 * Main navigation component for the masterclass website
 * Design based on DemoHeader with scroll behavior
 */

'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import LanguageSwitcher from '@/components/i18n/LanguageSwitcher';
import { masterclassNavigationConfig } from '@/lib/navigation/config';
import { getFilteredNavigation } from '@/lib/navigation/config';
import { useAuthStore } from '@/lib/store';

const DEFAULT_LOGO = {
  src: '/images/ips-logo.png',
  alt: 'Institut de Psychologie Contextuelle',
};

/** Logo to use on specific paths (path without locale). Alternate logo for legal/terms/privacy/cookies pages — add your image at public/images/logo-legal-pages.png to use it. */
const LEGAL_PAGES_LOGO = { src: '/images/logo-legal-pages.png', alt: 'Institut de Psychologie Contextuelle' };
export const HEADER_LOGO_BY_PATH: Record<string, { src: string; alt: string }> = {
  '/legal': LEGAL_PAGES_LOGO,
  '/terms': LEGAL_PAGES_LOGO,
  '/privacy': LEGAL_PAGES_LOGO,
  '/cookies': LEGAL_PAGES_LOGO,
};

function getPathWithoutLocale(pathname: string | null): string {
  if (!pathname) return '/';
  return pathname.replace(/^\/[a-z]{2}(?=\/|$)/, '') || '/';
}

interface MasterclassNavigationProps {
  variant?: 'default' | 'transparent' | 'solid';
  showCTA?: boolean;
  className?: string;
}

export default function MasterclassNavigation({
  variant = 'default',
  showCTA = true,
  className,
}: MasterclassNavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOnWhiteBackground, setIsOnWhiteBackground] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const pathKey = getPathWithoutLocale(pathname);
  const logo = HEADER_LOGO_BY_PATH[pathKey] ?? DEFAULT_LOGO;
  const t = useTranslations();
  const { isAuthenticated, user } = useAuthStore();

  // Mobile viewport (Tailwind lg = 1024px)
  useEffect(() => {
    const check = () => setIsMobile(typeof window !== 'undefined' && window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Règle au scroll : bloc clair → logo en couleurs, bloc coloré → logo blanc
  useEffect(() => {
    const isBlockLight = (): boolean => {
      const header = document.querySelector('header');
      if (!header) return false;
      const headerRect = header.getBoundingClientRect();
      const y = headerRect.bottom + 5;
      const x = window.innerWidth / 2;
      const sections = document.querySelectorAll<HTMLElement>('[data-header-contrast]');
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= y && rect.bottom >= y && rect.left <= x && rect.right >= x) {
          return section.getAttribute('data-header-contrast') === 'light';
        }
      }
      return false; // défaut : bloc coloré → logo blanc
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setIsOnWhiteBackground(isBlockLight());
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isScrolled]);

  // Get filtered navigation based on auth status
  const baseNavigationItems = getFilteredNavigation(
    masterclassNavigationConfig,
    isAuthenticated(),
    user?.is_admin || false
  );

  // No badges needed - simplified navigation
  const navigationItems = baseNavigationItems;

  // Check if header should be transparent (e.g., on hero section)
  const shouldShowBackground = isScrolled || variant !== 'transparent';

  // Une seule règle pour tout le header (logo + textes) : bloc clair → éléments lisibles sur fond clair, bloc coloré → éléments clairs
  const headerReadableOnLight = isOnWhiteBackground;
  // Sur mobile : header toujours bleu opaque → logo et icônes en style "fond sombre"
  const effectiveReadableOnLight = !isMobile && headerReadableOnLight;

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
          isMobile
            ? 'bg-[#1F2937] border-b border-[#374151]/60 shadow-lg'
            : shouldShowBackground
              ? headerReadableOnLight
                ? 'bg-white/98 backdrop-blur-xl border-b border-gray-200 shadow-lg'
                : 'bg-[#1F2937]/98 backdrop-blur-xl border-b border-[#374151]/60 shadow-2xl shadow-[#1F2937]/20'
              : 'bg-transparent',
          className
        )}
        data-on-white-background={effectiveReadableOnLight}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo : sur mobile header toujours bleu → logo blanc ; sur desktop même règle que les textes */}
            <Link href="/" className="flex items-center group relative">
              <div className="relative w-32 h-32 transition-all duration-300 group-hover:scale-105">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className={clsx(
                    'object-contain transition-all duration-300',
                    effectiveReadableOnLight ? '' : 'brightness-0 invert'
                  )}
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <DesktopNavigation items={navigationItems} isOnWhiteBackground={headerReadableOnLight} />

            {/* Desktop Actions (CTA + Language) */}
            <div className="hidden lg:flex items-center gap-4">
              {showCTA && (
                <Link
                  href="/cities"
                  className={clsx(
                    'inline-flex items-center px-5 py-2 text-sm font-medium rounded-full',
                    'transition-colors duration-200',
                    'text-white bg-[#FF8C42]',
                    'hover:bg-[#FF7A29]',
                    headerReadableOnLight
                      ? 'focus:outline-none focus:ring-2 focus:ring-[#FF8C42] focus:ring-offset-2 focus:ring-offset-white'
                      : 'focus:outline-none focus:ring-2 focus:ring-[#FF8C42] focus:ring-offset-2 focus:ring-offset-[#1F2937]'
                  )}
                >
                  {t('navigation.reserve')}
                </Link>
              )}
              <LanguageSwitcher isOnWhiteBackground={headerReadableOnLight} />
            </div>

            {/* Mobile Menu Button */}
              <div className="lg:hidden flex items-center gap-3">
              <LanguageSwitcher isOnWhiteBackground={effectiveReadableOnLight} />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={clsx(
                  'relative p-3 transition-all duration-300 rounded-xl',
                  effectiveReadableOnLight
                    ? 'text-gray-900 hover:bg-gray-100 active:bg-gray-200'
                    : 'text-white hover:bg-white/10 active:bg-white/20',
                  effectiveReadableOnLight
                    ? 'focus:outline-none focus:ring-2 focus:ring-[#FF8C42] focus:ring-offset-2 focus:ring-offset-white'
                    : 'focus:outline-none focus:ring-2 focus:ring-[#FF8C42] focus:ring-offset-2 focus:ring-offset-[#1F2937]',
                  'min-h-[44px] min-w-[44px] flex items-center justify-center',
                  'transform hover:scale-110 active:scale-95'
                )}
                aria-label={mobileMenuOpen ? t('navigation.close') : t('navigation.menu')}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <div className={clsx(
                  'absolute inset-0 rounded-xl bg-[#FF8C42]/20 opacity-0 transition-opacity duration-300',
                  mobileMenuOpen && 'opacity-100'
                )}></div>
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 relative z-10 transform rotate-0 transition-transform duration-300" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6 relative z-10" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        items={navigationItems}
        showCTA={showCTA}
      />

      {/* Overlay for Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
