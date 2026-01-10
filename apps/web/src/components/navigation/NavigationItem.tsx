/**
 * NavigationItem Component
 * Reusable navigation item component with support for icons, badges, and sub-menus
 */

'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { usePathname } from 'next/navigation';
import { clsx } from 'clsx';
import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import type { NavigationItem as NavigationItemType } from '@/lib/navigation/config';
import { isActivePath } from '@/lib/navigation/config';

interface NavigationItemProps {
  item: NavigationItemType;
  variant?: 'desktop' | 'mobile';
  onNavigate?: () => void;
  showChildren?: boolean;
}

export default function NavigationItem({
  item,
  variant = 'desktop',
  onNavigate,
  showChildren = true,
}: NavigationItemProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const subMenuRef = useRef<HTMLDivElement>(null);

  const isActive = isActivePath(pathname, item);
  const hasChildren = item.children && item.children.length > 0;
  const Icon = item.icon;

  // Close submenu when clicking outside
  useEffect(() => {
    if (!isSubMenuOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (subMenuRef.current && !subMenuRef.current.contains(event.target as Node)) {
        setIsSubMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isSubMenuOpen]);

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

  // Desktop variant
  if (variant === 'desktop') {
    return (
      <div className="relative" ref={subMenuRef}>
        <div className="relative">
          <Link
            href={item.href}
            onClick={handleClick}
            className={clsx(
              'relative flex items-center gap-2 px-4 py-3 text-base font-normal transition-all duration-200',
              'hover:font-bold',
              isActive
                ? 'font-bold border-b-2 border-black'
                : 'text-gray-700 hover:text-black',
              hasChildren && 'cursor-pointer'
            )}
            aria-current={isActive ? 'page' : undefined}
          >
            {Icon && <Icon className="w-4 h-4" aria-hidden="true" />}
            <span>{t(item.label)}</span>
            {item.badge && item.badge !== 'dynamic' && (
              <span className="ml-1 px-2 py-0.5 text-xs font-bold bg-black text-white">
                {item.badge}
              </span>
            )}
            {hasChildren && (
              <ChevronDown
                className={clsx(
                  'w-4 h-4 transition-transform duration-200',
                  isSubMenuOpen && 'rotate-180'
                )}
                aria-hidden="true"
              />
            )}
          </Link>

          {/* Underline animation on hover (Swiss style) */}
          <span
            className={clsx(
              'absolute bottom-0 left-0 h-0.5 bg-black transition-all duration-200',
              isActive ? 'w-full' : 'w-0 group-hover:w-full'
            )}
          />
        </div>

        {/* Sub-menu dropdown (desktop) */}
        {hasChildren && showChildren && isSubMenuOpen && (
          <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-black shadow-lg z-50">
            <div className="py-2">
              {item.children!.map((child) => (
                <NavigationItem
                  key={child.id}
                  item={child}
                  variant="desktop"
                  onNavigate={() => {
                    setIsSubMenuOpen(false);
                    if (onNavigate) onNavigate();
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Mobile variant
  return (
    <div>
      <Link
        href={item.href}
        onClick={() => {
          if (hasChildren) {
            setIsSubMenuOpen(!isSubMenuOpen);
          } else {
            handleClick();
          }
        }}
        className={clsx(
          'flex items-center justify-between px-4 py-3 text-lg font-normal transition-colors',
          'min-h-[44px]',
          isActive
            ? 'font-bold bg-black text-white'
            : 'text-black hover:bg-gray-100',
        )}
        aria-current={isActive ? 'page' : undefined}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-5 h-5" aria-hidden="true" />}
          <span>{t(item.label)}</span>
        </div>
        {item.badge && item.badge !== 'dynamic' && (
          <span className="px-2 py-0.5 text-xs font-bold bg-black text-white">
            {item.badge}
          </span>
        )}
        {hasChildren && (
          <ChevronDown
            className={clsx(
              'w-5 h-5 transition-transform duration-200',
              isSubMenuOpen && 'rotate-180'
            )}
            aria-hidden="true"
          />
        )}
      </Link>

      {/* Sub-menu (mobile) */}
      {hasChildren && showChildren && isSubMenuOpen && (
        <div className="pl-8 bg-gray-50 border-l-2 border-black">
          {item.children!.map((child) => (
            <NavigationItem
              key={child.id}
              item={child}
              variant="mobile"
              onNavigate={onNavigate}
            />
          ))}
        </div>
      )}
    </div>
  );
}
