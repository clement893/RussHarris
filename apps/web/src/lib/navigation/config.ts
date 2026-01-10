/**
 * Navigation Configuration
 * Centralized configuration for masterclass navigation menu
 */

import { 
  Home, 
  BookOpen, 
  User, 
  MapPin, 
  CreditCard, 
  Star, 
  HelpCircle,
  Mail
} from 'lucide-react';

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
 * This is the source of truth for all navigation items
 */
export const masterclassNavigationConfig: NavigationItem[] = [
  {
    id: 'home',
    label: 'navigation.home',
    href: '/',
    icon: Home,
  },
  {
    id: 'program',
    label: 'navigation.program',
    href: '/masterclass',
    icon: BookOpen,
    children: [
      {
        id: 'program-overview',
        label: 'navigation.program.overview',
        href: '/masterclass',
        anchor: '#overview',
      },
      {
        id: 'program-day1',
        label: 'navigation.program.day1',
        href: '/masterclass',
        anchor: '#day1',
      },
      {
        id: 'program-day2',
        label: 'navigation.program.day2',
        href: '/masterclass',
        anchor: '#day2',
      },
      {
        id: 'program-objectives',
        label: 'navigation.program.objectives',
        href: '/masterclass',
        anchor: '#objectives',
      },
    ],
  },
  {
    id: 'about',
    label: 'navigation.about',
    href: '/about-russ',
    icon: User,
    children: [
      {
        id: 'about-bio',
        label: 'navigation.about.bio',
        href: '/about-russ',
        anchor: '#bio',
      },
      {
        id: 'about-expertise',
        label: 'navigation.about.expertise',
        href: '/about-russ',
        anchor: '#expertise',
      },
      {
        id: 'about-publications',
        label: 'navigation.about.publications',
        href: '/about-russ',
        anchor: '#publications',
      },
    ],
  },
  {
    id: 'cities',
    label: 'navigation.cities',
    href: '/cities',
    icon: MapPin,
    badge: 'dynamic', // Will be calculated: number of cities with available events
  },
  {
    id: 'pricing',
    label: 'navigation.pricing',
    href: '/pricing',
    icon: CreditCard,
  },
  {
    id: 'testimonials',
    label: 'navigation.testimonials',
    href: '/testimonials',
    icon: Star,
  },
  {
    id: 'faq',
    label: 'navigation.faq',
    href: '/faq',
    icon: HelpCircle,
  },
  {
    id: 'contact',
    label: 'navigation.contact',
    href: '/contact',
    icon: Mail,
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
