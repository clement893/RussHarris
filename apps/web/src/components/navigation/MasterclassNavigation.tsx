/**
 * MasterclassNavigation Component
 * Main navigation component for the masterclass website
 * Design based on DemoHeader with scroll behavior
 */

'use client';

import { useState, useEffect } from 'react';
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
  const t = useTranslations();
  const { isAuthenticated, user } = useAuthStore();

  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
          shouldShowBackground
            ? 'bg-[#1F2937]/98 backdrop-blur-xl border-b border-[#374151]/60 shadow-2xl shadow-[#1F2937]/20'
            : 'bg-transparent',
          className
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo - IPS Logo only (simplified) */}
            <Link href="/" className="flex items-center group relative">
              <div className="relative w-16 h-16 transition-transform duration-200 group-hover:scale-105">
                <Image
                  src="/images/ips-logo.png"
                  alt="Institut de psychologie contextuelle"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <DesktopNavigation items={navigationItems} />

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
                    'focus:outline-none focus:ring-2 focus:ring-[#FF8C42] focus:ring-offset-2 focus:ring-offset-[#1F2937]'
                  )}
                >
                  {t('navigation.reserve')}
                </Link>
              )}
              <div className="opacity-60 hover:opacity-100 transition-opacity">
                <LanguageSwitcher />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-3">
              <div className="opacity-60 hover:opacity-100 transition-opacity">
                <LanguageSwitcher />
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={clsx(
                  'relative p-3 transition-all duration-300 rounded-xl',
                  'text-white hover:bg-white/10 active:bg-white/20',
                  'focus:outline-none focus:ring-2 focus:ring-[#FF8C42] focus:ring-offset-2 focus:ring-offset-[#1F2937]',
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
