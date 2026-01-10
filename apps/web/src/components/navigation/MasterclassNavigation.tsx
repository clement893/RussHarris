/**
 * MasterclassNavigation Component
 * Main navigation component for the masterclass website
 * Combines desktop and mobile navigation with Swiss Style design
 */

'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import CTAPrimary from './CTAPrimary';
import LanguageSwitcher from '@/components/i18n/LanguageSwitcher';
import { masterclassNavigationConfig } from '@/lib/navigation/config';
import { getFilteredNavigation } from '@/lib/navigation/config';
import { useAuthStore } from '@/lib/store';

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
  const pathname = usePathname();
  const t = useTranslations();
  const { isAuthenticated, user } = useAuthStore();

  // Get filtered navigation based on auth status
  const navigationItems = getFilteredNavigation(
    masterclassNavigationConfig,
    isAuthenticated(),
    user?.is_admin || false
  );

  // Check if header should be transparent (e.g., on hero section)
  const isTransparent = variant === 'transparent';

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 w-full transition-all duration-200',
        isTransparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-md border-b border-black',
        className
      )}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl lg:text-2xl font-bold text-black hover:opacity-80 transition-opacity"
            aria-label={t('navigation.home')}
          >
            <span>Masterclass ACT</span>
            <span className="text-gray-600">Russ Harris</span>
          </Link>

          {/* Desktop Navigation */}
          <DesktopNavigation items={navigationItems} />

          {/* Desktop Actions (CTA + Language) */}
          <div className="hidden lg:flex items-center gap-4">
            {showCTA && (
              <CTAPrimary variant="desktop" />
            )}
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={clsx(
                'p-2 text-black hover:bg-gray-100 transition-colors rounded-lg',
                'focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2',
                'min-h-[44px] min-w-[44px] flex items-center justify-center'
              )}
              aria-label={mobileMenuOpen ? t('navigation.close') : t('navigation.menu')}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        items={navigationItems}
        showCTA={showCTA}
      />
    </header>
  );
}
