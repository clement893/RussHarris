/**
 * DesktopNavigation Component
 * Horizontal desktop navigation menu with Swiss Style design
 */

'use client';

import { masterclassNavigationConfig, type NavigationItem } from '@/lib/navigation/config';
import NavigationItem from './NavigationItem';
import { usePathname } from 'next/navigation';

interface DesktopNavigationProps {
  items?: NavigationItem[];
  onNavigate?: () => void;
}

export default function DesktopNavigation({
  items = masterclassNavigationConfig,
  onNavigate,
}: DesktopNavigationProps) {
  const pathname = usePathname();

  return (
    <nav
      className="hidden lg:flex items-center gap-8"
      aria-label="Navigation principale desktop"
    >
      {items.map((item) => (
        <NavigationItem
          key={item.id}
          item={item}
          variant="desktop"
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  );
}
