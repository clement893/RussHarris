/**
 * MobileNavigation Component
 * Mobile navigation menu with slide-in animation (Swiss Style)
 */

'use client';

import { useEffect, useRef } from 'react';
import { masterclassNavigationConfig, type NavigationItem } from '@/lib/navigation/config';
import NavigationItem from './NavigationItem';
import CTAPrimary from './CTAPrimary';
import LanguageSwitcher from '@/components/i18n/LanguageSwitcher';
import { X } from 'lucide-react';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  items?: NavigationItem[];
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
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

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
    if (isOpen && firstLinkRef.current) {
      // Small delay to ensure menu is visible
      setTimeout(() => {
        firstLinkRef.current?.focus();
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
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu panel */}
      <div
        ref={menuRef}
        className={clsx(
          'fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 lg:hidden',
          'transform transition-transform duration-300 ease-out',
          'shadow-2xl border-l border-black',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label={t('navigation.menu')}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-black">
          <h2 className="text-xl font-bold text-black">{t('navigation.menu')}</h2>
          <button
            onClick={onClose}
            className="p-2 text-black hover:bg-gray-100 transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            aria-label={t('navigation.close')}
          >
            <X className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 overflow-y-auto py-4" aria-label="Menu mobile">
          {items.map((item, index) => (
            <div key={item.id} ref={index === 0 ? firstLinkRef : undefined}>
              <NavigationItem
                item={item}
                variant="mobile"
                onNavigate={onClose}
              />
            </div>
          ))}
        </nav>

        {/* Footer with CTA and Language Switcher */}
        <div className="border-t border-black p-6 space-y-4">
          {showCTA && (
            <CTAPrimary
              variant="mobile"
              onClick={onClose}
            />
          )}
          <div className="flex items-center justify-center">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </>
  );
}
