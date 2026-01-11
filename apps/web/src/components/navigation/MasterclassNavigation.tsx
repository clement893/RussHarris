/**
 * MasterclassNavigation Component
 * Main navigation component for the masterclass website
 * Combines desktop and mobile navigation with Swiss Style design
 */

'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import { Menu } from 'lucide-react';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import DesktopNavigation from './DesktopNavigation';
import MobileNavigation from './MobileNavigation';
import CTAPrimary from './CTAPrimary';
import LanguageSwitcher from '@/components/i18n/LanguageSwitcher';
import { masterclassNavigationConfig, type NavigationItem } from '@/lib/navigation/config';
import { getFilteredNavigation } from '@/lib/navigation/config';
import { useAuthStore } from '@/lib/store';
import { masterclassAPI } from '@/lib/api/masterclass';

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
  const [navigationItemsWithBadges, setNavigationItemsWithBadges] = useState<NavigationItem[]>([]);
  const t = useTranslations();
  const { isAuthenticated, user } = useAuthStore();

  // Get filtered navigation based on auth status
  const baseNavigationItems = getFilteredNavigation(
    masterclassNavigationConfig,
    isAuthenticated(),
    user?.is_admin || false
  );

  // Calculate dynamic badges (e.g., number of cities with available events)
  useEffect(() => {
    const calculateDynamicBadges = async () => {
      const itemsWithBadges = [...baseNavigationItems];
      
      // Find cities item and calculate badge
      const citiesItemIndex = itemsWithBadges.findIndex(item => item.id === 'cities' && item.badge === 'dynamic');
      if (citiesItemIndex !== -1) {
        try {
          const cities = await masterclassAPI.listCitiesWithEvents();
          // Count cities that have at least one event with available places
          const availableCitiesCount = cities.filter(city => 
            city.events?.some(event => {
              const available = (event.max_attendees || 0) - (event.current_attendees || 0);
              return available > 0;
            })
          ).length;
          
          if (availableCitiesCount > 0) {
            itemsWithBadges[citiesItemIndex] = {
              ...itemsWithBadges[citiesItemIndex],
              badge: availableCitiesCount,
            };
          }
        } catch (error) {
          // Silently fail - badge will not be shown
          // Only log in development
          if (process.env.NODE_ENV === 'development') {
            console.error('Failed to fetch cities for badge:', error);
          }
        }
      }
      
      setNavigationItemsWithBadges(itemsWithBadges);
    };

    calculateDynamicBadges();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated(), user?.is_admin]); // Only recalculate when auth status changes
  
  // Use items with badges if calculated, otherwise use base items
  const navigationItems = navigationItemsWithBadges.length > 0 ? navigationItemsWithBadges : baseNavigationItems;

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
          {/* Logo - Swiss Style: Inter Bold, no decoration */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl lg:text-2xl font-black text-black hover:opacity-90 transition-opacity"
            aria-label={t('navigation.home')}
          >
            <span className="tracking-tight">Masterclass ACT</span>
            <span className="text-gray-600 font-normal">Russ Harris</span>
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
