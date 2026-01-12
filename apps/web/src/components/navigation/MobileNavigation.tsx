/**
 * MobileNavigation Component
 * Mobile navigation menu with slide-in animation
 * Design based on demohome with blue/orange colors
 */

'use client';

import { useEffect, useRef } from 'react';
import { Link } from '@/i18n/routing';
import { masterclassNavigationConfig, type NavigationItem as NavigationItemType } from '@/lib/navigation/config';
import NavigationItem from './NavigationItem';
import LanguageSwitcher from '@/components/i18n/LanguageSwitcher';
import { X } from 'lucide-react';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  items?: NavigationItemType[];
  showCTA?: boolean;
}

export default function MobileNavigation({
  isOpen,
  onClose,
  items = masterclassNavigationConfig,
  showCTA = true,
}: MobileNavigationProps) {
  const t = useTranslations();
  const menuRef = useRef<HTMLDivElement>(null);
  const firstItemRef = useRef<HTMLDivElement>(null);

  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Focus management
  useEffect(() => {
    if (isOpen && firstItemRef.current) {
      // Small delay to ensure menu is visible
      setTimeout(() => {
        const firstLink = firstItemRef.current?.querySelector('a') as HTMLAnchorElement | null;
        firstLink?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu panel - Dark background with design system colors */}
      <div
        ref={menuRef}
        className={clsx(
          'fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-gradient-to-br from-[#132C35] via-[#1B3D4C] to-[#132C35] transform transition-transform duration-500 ease-out lg:hidden',
          'backdrop-blur-xl border-l border-[#2B5F7A]/40 shadow-2xl shadow-[#1B3D4C]/50',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label={t('navigation.menu')}
      >
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#F58220]/5 via-transparent to-[#2B5F7A]/10 pointer-events-none"></div>
        
        <div className="relative flex flex-col h-full p-6 pt-24">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-[#2B5F7A]/60 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F58220]/5 to-transparent"></div>
            <h2 className="relative z-10 text-xl font-bold text-white tracking-wide">{t('navigation.menu')}</h2>
            <button
              onClick={onClose}
              className="relative z-10 p-2.5 text-white hover:bg-white/10 active:bg-white/20 transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F58220] focus:ring-offset-2 focus:ring-offset-[#132C35] transform hover:scale-110 active:scale-95"
              aria-label={t('navigation.close')}
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>

          {/* Navigation items */}
          <nav className="flex flex-col gap-2 flex-1 overflow-y-auto" aria-label="Menu mobile">
            {items.map((item, index) => (
              <div key={item.id} ref={index === 0 ? firstItemRef : undefined}>
                <NavigationItem
                  item={item}
                  variant="mobile"
                  onNavigate={onClose}
                />
              </div>
            ))}
          </nav>

          {/* Footer with CTA and Language Switcher */}
          <div className="border-t border-[#2B5F7A]/60 pt-6 space-y-4 mt-auto relative">
            <div className="absolute inset-x-0 top-0 bg-gradient-to-r from-transparent via-[#F58220]/5 to-transparent h-px"></div>
            {showCTA && (
              <Link
                href="/cities"
                onClick={onClose}
                className="relative inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-white bg-gradient-to-r from-[#F58220] to-[#C4681A] rounded-full hover:from-[#C4681A] hover:to-[#934E13] transition-all duration-300 w-full transform hover:scale-105 active:scale-95 shadow-lg shadow-[#F58220]/30 hover:shadow-[#F58220]/50"
              >
                <span className="relative z-10">{t('navigation.bookNow')}</span>
                <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            )}
            <div className="flex items-center justify-center pt-2">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
