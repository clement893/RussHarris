/**
 * DesktopNavigation Component
 * Horizontal desktop navigation menu with Swiss Style design
 */

'use client';

import { masterclassNavigationConfig, type NavigationItem as NavigationItemType } from '@/lib/navigation/config';
import NavigationItem from './NavigationItem';

interface DesktopNavigationProps {
  items?: NavigationItemType[];
  onNavigate?: () => void;
  isOnWhiteBackground?: boolean;
}

export default function DesktopNavigation({
  items = masterclassNavigationConfig,
  onNavigate,
  isOnWhiteBackground = false,
}: DesktopNavigationProps) {

  return (
    <nav
      className="hidden lg:flex items-center gap-6"
      aria-label="Navigation principale desktop"
    >
      {items.map((item) => (
        <NavigationItem
          key={item.id}
          item={item}
          variant="desktop"
          onNavigate={onNavigate}
          isOnWhiteBackground={isOnWhiteBackground}
        />
      ))}
    </nav>
  );
}
