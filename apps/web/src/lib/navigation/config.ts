/**
 * Navigation Configuration
 * Centralized configuration for masterclass navigation menu
 */

export interface NavigationItem {
  id: string;
  label: string; // Key for i18n translation
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string | number | 'dynamic'; // 'dynamic' means calculated at runtime
  children?: NavigationItem[]; // Sub-menu items
  external?: boolean;
  authRequired?: boolean;
  adminOnly?: boolean;
  anchor?: string; // For smooth scroll to anchors on same page
}

/**
 * Masterclass navigation configuration
 * Simplified navigation - 4 main items, no sub-menus
 * This is the source of truth for all navigation items
 */
export const masterclassNavigationConfig: NavigationItem[] = [
  {
    id: 'program',
    label: 'Programme', // Fallback label
    href: '/masterclass',
    // No icon, no children - simple direct link
  },
  {
    id: 'cities',
    label: 'Villes & Dates', // Fallback label
    href: '/cities',
    // No icon, no badge - simple direct link
  },
  {
    id: 'about',
    label: 'À propos', // Fallback label
    href: '/about-russ',
    // No icon, no children - simple direct link
  },
  {
    id: 'contact',
    label: 'Contact', // Fallback label
    href: '/contact',
    // No icon - simple direct link
  },
];

/**
 * Filter navigation items based on authentication and admin status
 */
export function getFilteredNavigation(
  config: NavigationItem[],
  isAuthenticated: boolean = false,
  isAdmin: boolean = false
): NavigationItem[] {
  return config
    .filter((item) => {
      // Filter out auth-required items if not authenticated
      if (item.authRequired && !isAuthenticated) {
        return false;
      }
      // Filter out admin-only items if not admin
      if (item.adminOnly && !isAdmin) {
        return false;
      }
      return true;
    })
    .map((item) => {
      // Recursively filter children
      if (item.children && item.children.length > 0) {
        return {
          ...item,
          children: getFilteredNavigation(item.children, isAuthenticated, isAdmin),
        };
      }
      return item;
    });
}

/**
 * Get navigation item by ID
 */
export function getNavigationItemById(
  config: NavigationItem[],
  id: string
): NavigationItem | undefined {
  for (const item of config) {
    if (item.id === id) {
      return item;
    }
    if (item.children) {
      const found = getNavigationItemById(item.children, id);
      if (found) {
        return found;
      }
    }
  }
  return undefined;
}

/**
 * Check if a pathname matches a navigation item
 */
export function isActivePath(pathname: string, item: NavigationItem): boolean {
  // Exact match
  if (pathname === item.href) {
    return true;
  }
  
  // Match with anchor
  if (item.anchor && pathname.startsWith(item.href)) {
    return true;
  }
  
  // Match parent path (e.g., /masterclass matches /masterclass#day1)
  if (pathname.startsWith(item.href) && item.href !== '/') {
    return true;
  }
  
  return false;
}

/**
 * Get active navigation item from pathname
 */
export function getActiveNavigationItem(
  config: NavigationItem[],
  pathname: string
): NavigationItem | undefined {
  for (const item of config) {
    if (isActivePath(pathname, item)) {
      return item;
    }
    if (item.children) {
      const found = getActiveNavigationItem(item.children, pathname);
      if (found) {
        return item; // Return parent if child is active
      }
    }
  }
  return undefined;
}
