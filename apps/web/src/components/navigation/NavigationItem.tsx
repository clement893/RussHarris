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
              'relative flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg',
              'transition-all duration-300 ease-out',
              'transform hover:scale-105 active:scale-95',
              isActive
                ? 'font-semibold text-white bg-[#F58220]/20'
                : 'text-white/90 hover:text-white hover:bg-white/10',
              hasChildren && 'cursor-pointer'
            )}
            aria-current={isActive ? 'page' : undefined}
            aria-expanded={hasChildren ? isSubMenuOpen : undefined}
          >
            {/* Active indicator background */}
            {isActive && (
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-[#F58220]/30 to-[#F58220]/10 blur-sm"></div>
            )}
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-lg bg-[#F58220]/0 group-hover:bg-[#F58220]/10 transition-all duration-300"></div>
            
            <div className="relative z-10 flex items-center gap-2">
              {Icon && (
                <Icon className={clsx(
                  'w-4 h-4 transition-transform duration-300',
                  'group-hover:scale-110 group-hover:text-[#F58220]',
                  isActive && 'text-[#F58220]'
                )} aria-hidden="true" />
              )}
              <span className="relative">
                {t(item.label)}
                {/* Active underline */}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#F58220] rounded-full"></span>
                )}
              </span>
              {item.badge && item.badge !== 'dynamic' && (
                <span className="ml-1 px-2 py-0.5 text-xs font-bold bg-[#F58220] text-white rounded-full shadow-lg shadow-[#F58220]/30">
                  {item.badge}
                </span>
              )}
              {hasChildren && (
                <ChevronDown
                  className={clsx(
                    'w-3.5 h-3.5 transition-all duration-300',
                    isSubMenuOpen && 'rotate-180 text-[#F58220]',
                    'group-hover:text-[#F58220]'
                  )}
                  aria-hidden="true"
                />
              )}
            </div>
          </Link>
        </div>

        {/* Sub-menu dropdown (desktop) - Modern design with smooth animations */}
        {hasChildren && showChildren && isSubMenuOpen && (
          <div 
            className="absolute top-full left-0 mt-3 w-64 bg-[#1B3D4C]/98 backdrop-blur-xl border border-[#2B5F7A]/60 rounded-xl shadow-2xl shadow-[#1B3D4C]/50 z-50 overflow-hidden"
            onMouseLeave={() => setIsSubMenuOpen(false)}
          >
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2B5F7A]/10 to-transparent pointer-events-none"></div>
            
            <div className="relative py-2">
              {item.children!.map((child, index) => {
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
                      'relative block px-4 py-2.5 mx-2 text-sm font-medium transition-all duration-300 rounded-lg',
                      'text-white/90 hover:text-white hover:bg-[#2B5F7A]/50',
                      'transform hover:translate-x-1 hover:scale-[1.02]',
                      isChildActive && 'font-semibold bg-[#F58220]/20 text-[#F58220] border-l-2 border-[#F58220]'
                    )}
                    style={{
                      animationDelay: `${index * 30}ms`,
                      animation: isSubMenuOpen ? 'fadeInUp 0.3s ease-out forwards' : 'none'
                    }}
                  >
                    {isChildActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[#F58220] rounded-r-full"></div>
                    )}
                    <span className="relative z-10">{t(child.label)}</span>
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
    <div className="group">
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
          'relative flex items-center justify-between px-4 py-3.5 text-base font-medium transition-all duration-300 rounded-xl',
          'min-h-[48px] transform active:scale-95',
          isActive
            ? 'font-semibold bg-gradient-to-r from-[#F58220]/20 to-[#F58220]/10 text-[#F58220] border-l-4 border-[#F58220]'
            : 'text-white/90 hover:bg-white/10 hover:text-white',
        )}
        aria-current={isActive ? 'page' : undefined}
      >
        {/* Active indicator */}
        {isActive && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#F58220] to-[#C4681A] rounded-r-full"></div>
        )}
        
        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-xl bg-[#F58220]/0 group-hover:bg-[#F58220]/5 transition-all duration-300"></div>
        
        <div className="relative z-10 flex items-center gap-3">
          {Icon && (
            <Icon className={clsx(
              'w-5 h-5 transition-all duration-300',
              isActive ? 'text-[#F58220]' : 'text-white/70 group-hover:text-[#F58220]'
            )} aria-hidden="true" />
          )}
          <span className="relative">
            {t(item.label)}
            {isActive && (
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#F58220] rounded-full"></span>
            )}
          </span>
        </div>
        
        <div className="relative z-10 flex items-center gap-2">
          {item.badge && item.badge !== 'dynamic' && (
            <span className="px-2.5 py-1 text-xs font-bold bg-gradient-to-r from-[#F58220] to-[#C4681A] text-white rounded-full shadow-lg shadow-[#F58220]/30">
              {item.badge}
            </span>
          )}
          {hasChildren && (
            <ChevronDown
              className={clsx(
                'w-5 h-5 transition-all duration-300 text-white/70',
                isSubMenuOpen && 'rotate-180 text-[#F58220]'
              )}
              aria-hidden="true"
            />
          )}
        </div>
      </Link>

      {/* Sub-menu (mobile) */}
      {hasChildren && showChildren && isSubMenuOpen && (
        <div className="pl-6 ml-4 mt-2 bg-[#1B3D4C]/30 border-l-2 border-[#2B5F7A]/60 rounded-r-xl overflow-hidden">
          <div className="py-2 space-y-1">
            {item.children!.map((child, index) => {
              const isChildActive = isActivePath(pathname, child);
              return (
                <Link
                  key={child.id}
                  href={child.href}
                  onClick={() => {
                    if (child.anchor && child.href === pathname) {
                      const element = document.querySelector(child.anchor);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }
                    if (onNavigate) onNavigate();
                  }}
                  className={clsx(
                    'block px-4 py-2.5 text-sm font-medium transition-all duration-300 rounded-lg mx-2',
                    'text-white/80 hover:text-white hover:bg-white/5',
                    'transform hover:translate-x-1',
                    isChildActive && 'font-semibold bg-[#F58220]/20 text-[#F58220] border-l-2 border-[#F58220]'
                  )}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isSubMenuOpen ? 'fadeInLeft 0.3s ease-out forwards' : 'none'
                  }}
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
