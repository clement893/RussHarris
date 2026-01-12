/**
 * NavigationItem Component
 * Reusable navigation item component with support for icons, badges, and sub-menus
 */

'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import type { NavigationItem as NavigationItemType } from '@/lib/navigation/config';
import { isActivePath } from '@/lib/navigation/config';

interface NavigationItemProps {
  item: NavigationItemType;
  variant?: 'desktop' | 'mobile';
  onNavigate?: () => void;
}

export default function NavigationItem({
  item,
  variant = 'desktop',
  onNavigate,
}: NavigationItemProps) {
  const t = useTranslations();
  const pathname = usePathname();

  const isActive = isActivePath(pathname, item);

  const handleClick = () => {
    if (onNavigate) {
      onNavigate();
    }
    
    // Handle anchor links (smooth scroll)
    if (item.anchor && item.href === pathname) {
      const element = document.querySelector(item.anchor);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Desktop variant - Simplified: no icons, no badges, no sub-menus, just text with underline
  if (variant === 'desktop') {
    return (
      <Link
        href={item.href}
        onClick={handleClick}
        className={clsx(
          'relative text-sm font-medium transition-all duration-200',
          'text-white/90 hover:text-white',
          isActive && 'text-white font-semibold'
        )}
        aria-current={isActive ? 'page' : undefined}
      >
        <span className="relative">
          {t(item.label)}
          {/* Simple underline on hover and active */}
          <span
            className={clsx(
              'absolute -bottom-1 left-0 right-0 h-0.5 bg-[#F58220] transition-all duration-200',
              isActive ? 'opacity-100' : 'opacity-0 hover:opacity-100',
              isActive && 'h-[2px]' // Thicker underline when active
            )}
          />
        </span>
      </Link>
    );
  }

  // Mobile variant - Simplified: no icons, no badges, no sub-menus
  return (
    <Link
      href={item.href}
      onClick={handleClick}
      className={clsx(
        'block px-4 py-3 text-base font-medium transition-colors duration-200',
        'min-h-[44px] flex items-center',
        isActive
          ? 'text-white font-semibold border-l-4 border-[#F58220] bg-[#F58220]/10'
          : 'text-white/90 hover:text-white hover:bg-white/5'
      )}
      aria-current={isActive ? 'page' : undefined}
    >
      {t(item.label)}
    </Link>
  );
}
