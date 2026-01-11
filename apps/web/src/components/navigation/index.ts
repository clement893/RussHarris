/**
 * Navigation Components
 * Centralized exports for all navigation-related components
 */

export { default as MasterclassNavigation } from './MasterclassNavigation';
export { default as DesktopNavigation } from './DesktopNavigation';
export { default as MobileNavigation } from './MobileNavigation';
export { default as NavigationItem } from './NavigationItem';
export { default as CTAPrimary } from './CTAPrimary';

// Re-export config types and functions
export type { NavigationItem as NavigationItemType } from '@/lib/navigation/config';
export {
  masterclassNavigationConfig,
  getFilteredNavigation,
  getNavigationItemById,
  isActivePath,
  getActiveNavigationItem,
} from '@/lib/navigation/config';
