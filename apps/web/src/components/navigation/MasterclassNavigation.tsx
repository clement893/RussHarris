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
  const [isOnWhiteBackground, setIsOnWhiteBackground] = useState(false);
  const t = useTranslations();
  const { isAuthenticated, user } = useAuthStore();

  // Handle scroll behavior and detect background color
  useEffect(() => {
    const detectBackgroundColor = (): boolean => {
      if (!isScrolled) return false;
      
      const header = document.querySelector('header');
      if (!header) return false;
      
      const headerRect = header.getBoundingClientRect();
      const headerBottom = headerRect.bottom;
      
      // Check multiple points below header for better accuracy
      const checkPoints = [
        { x: window.innerWidth / 2, y: headerBottom + 5 }, // Center
        { x: window.innerWidth / 4, y: headerBottom + 5 }, // Left
        { x: (window.innerWidth * 3) / 4, y: headerBottom + 5 }, // Right
      ];
      
      let whiteCount = 0;
      
      for (const point of checkPoints) {
        const element = document.elementFromPoint(point.x, point.y);
        if (!element) continue;
        
          // Walk up the DOM tree to find element with background color
          let currentElement: Element | null = element;
          let bgColor = '';
          
          while (currentElement && currentElement !== document.body) {
            const computedStyle = window.getComputedStyle(currentElement);
            bgColor = computedStyle.backgroundColor;
            
            // If background is not transparent, use it
            if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)' && bgColor !== 'transparent') {
              break;
            }
            
            currentElement = currentElement.parentElement;
          }
          
          if (bgColor) {
            // Parse RGB color
            const rgbMatch = bgColor.match(/\d+/g);
            if (rgbMatch && rgbMatch.length >= 3) {
              const r = parseInt(rgbMatch[0] || '0');
              const g = parseInt(rgbMatch[1] || '0');
              const b = parseInt(rgbMatch[2] || '0');
              
              // Check if background is light (white or very light color)
              // Threshold: r > 240, g > 240, b > 240 for light backgrounds
              const isLight = r > 240 && g > 240 && b > 240;
              if (isLight) whiteCount++;
            } else {
              // Check for common white color names/values
              const bgColorLower = bgColor.toLowerCase();
              const isWhite = bgColorLower.includes('white') || 
                             bgColor.includes('#fff') || 
                             bgColor.includes('#ffffff') ||
                             bgColor.startsWith('rgb(255') ||
                             bgColor.startsWith('rgb(254');
              if (isWhite) whiteCount++;
            }
          }
      }
      
      // If majority of check points are white, consider it white background
      return whiteCount >= 2;
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setIsOnWhiteBackground(detectBackgroundColor());
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on mount
    
    // Also check on resize
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

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out',
          shouldShowBackground
            ? isOnWhiteBackground
              ? 'bg-white/98 backdrop-blur-xl border-b border-gray-200 shadow-lg'
              : 'bg-[#1F2937]/98 backdrop-blur-xl border-b border-[#374151]/60 shadow-2xl shadow-[#1F2937]/20'
            : 'bg-transparent',
          className
        )}
        data-on-white-background={isOnWhiteBackground}
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
            <DesktopNavigation items={navigationItems} isOnWhiteBackground={isOnWhiteBackground} />

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
                    isOnWhiteBackground
                      ? 'focus:outline-none focus:ring-2 focus:ring-[#FF8C42] focus:ring-offset-2 focus:ring-offset-white'
                      : 'focus:outline-none focus:ring-2 focus:ring-[#FF8C42] focus:ring-offset-2 focus:ring-offset-[#1F2937]'
                  )}
                >
                  {t('navigation.reserve')}
                </Link>
              )}
              <div className={clsx(
                'transition-opacity',
                isOnWhiteBackground ? 'opacity-80 hover:opacity-100' : 'opacity-60 hover:opacity-100'
              )}>
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
                  isOnWhiteBackground
                    ? 'text-gray-900 hover:bg-gray-100 active:bg-gray-200'
                    : 'text-white hover:bg-white/10 active:bg-white/20',
                  isOnWhiteBackground
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
