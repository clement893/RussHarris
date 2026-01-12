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
      <div className="relative group" ref={subMenuRef}>
        <div className="relative">
          <Link
            href={item.href}
            onClick={(e) => {
              if (hasChildren) {
                e.preventDefault();
                setIsSubMenuOpen(!isSubMenuOpen);
              } else {
                handleClick();
              }
            }}
            onMouseEnter={() => {
              if (hasChildren && !isSubMenuOpen) {
                setIsSubMenuOpen(true);
              }
            }}
            className={clsx(
              'relative flex items-center gap-2 px-4 py-3 text-base font-medium transition-all duration-200',
              isActive
                ? 'font-semibold text-white'
                : 'text-white hover:text-[#F58220]',
              hasChildren && 'cursor-pointer'
            )}
            aria-current={isActive ? 'page' : undefined}
            aria-expanded={hasChildren ? isSubMenuOpen : undefined}
          >
            {Icon && <Icon className="w-4 h-4" aria-hidden="true" />}
            <span>{t(item.label)}</span>
            {item.badge && item.badge !== 'dynamic' && (
              <span className="ml-1 px-2 py-0.5 text-xs font-black bg-black text-white rounded-none">
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

          {/* Underline animation on hover */}
          <span
            className={clsx(
              'absolute bottom-0 left-0 h-0.5 bg-[#F58220] transition-all duration-200',
              isActive ? 'w-full' : 'w-0 group-hover:w-full'
            )}
          />
        </div>

        {/* Sub-menu dropdown (desktop) - Swiss Style: flat, no shadow, border only */}
        {hasChildren && showChildren && isSubMenuOpen && (
          <div 
            className="absolute top-full left-0 mt-2 w-56 bg-[#1B3D4C] border border-[#2B5F7A] rounded-lg shadow-xl z-50 backdrop-blur-md"
            onMouseLeave={() => setIsSubMenuOpen(false)}
          >
            <div className="py-1">
              {item.children!.map((child) => {
                const isChildActive = isActivePath(pathname, child);
                return (
                  <Link
                    key={child.id}
                    href={child.href}
                    onClick={(e) => {
                      if (child.anchor && child.href === pathname) {
                        e.preventDefault();
                        const element = document.querySelector(child.anchor);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                      }
                      setIsSubMenuOpen(false);
                      if (onNavigate) onNavigate();
                    }}
                    className={clsx(
                      'block px-4 py-2 text-sm font-medium transition-all duration-200 rounded text-white',
                      'hover:bg-[#2B5F7A] hover:text-[#F58220]',
                      isChildActive && 'font-semibold bg-[#2B5F7A] text-[#F58220]'
                    )}
                  >
                    {t(child.label)}
                  </Link>
                );
              })}
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
          'flex items-center justify-between px-4 py-3 text-base font-medium transition-colors rounded-lg',
          'min-h-[44px]',
          isActive
            ? 'font-semibold bg-[#2B5F7A] text-white'
            : 'text-white hover:bg-white/10 hover:text-[#F58220]',
        )}
        aria-current={isActive ? 'page' : undefined}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon className="w-5 h-5" aria-hidden="true" />}
          <span>{t(item.label)}</span>
        </div>
        {item.badge && item.badge !== 'dynamic' && (
          <span className="px-2 py-0.5 text-xs font-semibold bg-[#F58220] text-white rounded-full">
            {item.badge}
          </span>
        )}
        {hasChildren && (
          <ChevronDown
            className={clsx(
              'w-5 h-5 transition-transform duration-200 text-white',
              isSubMenuOpen && 'rotate-180'
            )}
            aria-hidden="true"
          />
        )}
      </Link>

      {/* Sub-menu (mobile) */}
      {hasChildren && showChildren && isSubMenuOpen && (
        <div className="pl-8 bg-[#1B3D4C]/50 border-l-2 border-[#2B5F7A] mt-2">
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
