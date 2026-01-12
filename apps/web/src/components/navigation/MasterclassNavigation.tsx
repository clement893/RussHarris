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
            const citiesItem = itemsWithBadges[citiesItemIndex];
            if (citiesItem) {
              itemsWithBadges[citiesItemIndex] = {
                ...citiesItem,
                badge: availableCitiesCount,
              };
            }
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
  const shouldShowBackground = isScrolled || variant !== 'transparent';

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          shouldShowBackground
            ? 'bg-[#2B5F7A]/95 backdrop-blur-lg border-b border-[#2B5F7A]/50 shadow-lg'
            : 'bg-transparent',
          className
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo - IPS Logo with text */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/ips-logo.png"
                  alt="Institut de psychologie contextuelle"
                  fill
                  className="object-contain"
                />
              </div>
              <span className={clsx(
                'font-semibold text-lg hidden sm:block transition-colors duration-300',
                shouldShowBackground ? 'text-white' : 'text-white'
              )}>
                Institut de psychologie contextuelle
              </span>
            </Link>

            {/* Desktop Navigation */}
            <DesktopNavigation items={navigationItems} />

            {/* Desktop Actions (CTA + Language) */}
            <div className="hidden lg:flex items-center gap-4">
              {showCTA && (
                <Link
                  href="/cities"
                  className={clsx(
                    'inline-flex items-center gap-2 px-6 py-2.5 text-base font-semibold rounded-full transition-all duration-300',
                    shouldShowBackground
                      ? 'text-[#F58220] border-2 border-[#F58220] hover:bg-[#F58220] hover:text-white'
                      : 'text-[#F58220] border-2 border-[#F58220] hover:bg-[#F58220] hover:text-white'
                  )}
                >
                  {t('navigation.bookNow')}
                </Link>
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
                  'p-2 transition-colors rounded-lg',
                  shouldShowBackground
                    ? 'text-white hover:bg-white/10'
                    : 'text-white hover:bg-white/10',
                  'focus:outline-none focus:ring-2 focus:ring-[#F58220] focus:ring-offset-2 focus:ring-offset-[#2B5F7A]',
                  'min-h-[44px] min-w-[44px] flex items-center justify-center'
                )}
                aria-label={mobileMenuOpen ? t('navigation.close') : t('navigation.menu')}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" aria-hidden="true" /> : <Menu className="w-6 h-6" aria-hidden="true" />}
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
