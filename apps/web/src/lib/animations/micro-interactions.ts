/**
 * Micro-interactions and Animation Utilities
 * 
 * Collection of reusable animation utilities and micro-interaction patterns
 * for enhanced user experience across the application.
 */

/**
 * Animation variants for different use cases
 */
export const animationVariants = {
  // Fade animations
  fadeIn: 'animate-fade-in',
  fadeOut: 'opacity-0 transition-opacity duration-300',
  
  // Slide animations
  slideUp: 'animate-slide-up',
  slideDown: 'animate-slide-down',
  slideInLeft: 'translate-x-[-100%] opacity-0 transition-all duration-500 ease-out',
  slideInRight: 'translate-x-[100%] opacity-0 transition-all duration-500 ease-out',
  
  // Scale animations
  scaleIn: 'animate-scale-in',
  scaleOnHover: 'transition-transform duration-300 hover:scale-105 active:scale-95',
  
  // Combined animations
  fadeInSlideUp: 'animate-fade-in-slide-up',
  
  // Stagger animations (for lists)
  stagger: (index: number, delay = 100) => ({
    style: {
      animationDelay: `${index * delay}ms`,
    },
  }),
  
  // Page-specific animations
  hero: {
    title: 'opacity-0 translate-y-8 hero-title-animate',
    subtitle: 'opacity-0 translate-y-6 hero-subtitle-animate',
    cta: 'opacity-0 translate-y-4 hero-cta-animate',
  },
  
  // Card grid animations
  cardGrid: {
    item: (index: number) => ({
      className: 'opacity-0 translate-y-4',
      style: {
        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`,
      },
    }),
  },
};

/**
 * Micro-interaction classes for common UI elements
 */
export const microInteractions = {
  // Button interactions
  button: {
    base: 'transition-all duration-200 ease-out',
    hover: 'hover:scale-105 hover:shadow-lg active:scale-95',
    primary: 'hover:bg-primary-700 dark:hover:bg-primary-600 hover:shadow-primary-500/50',
    secondary: 'hover:bg-secondary-700 dark:hover:bg-secondary-600',
    ghost: 'hover:bg-muted hover:scale-105 active:scale-95',
    ripple: 'relative overflow-hidden before:absolute before:inset-0 before:bg-white/20 before:scale-0 hover:before:scale-100 before:transition-transform before:duration-500 before:rounded-full',
    // New button effects
    glow: 'hover:shadow-[0_0_20px_rgba(255,140,66,0.4)] hover:shadow-secondary-500/50',
    bounce: 'active:animate-bounce',
    pulse: 'hover:animate-pulse',
    shimmer: 'relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent hover:before:translate-x-full before:transition-transform before:duration-1000',
  },
  
  // Card interactions
  card: {
    base: 'transition-all duration-300 ease-out',
    hover: 'hover:shadow-xl hover:-translate-y-1 hover:scale-[1.02]',
    lift: 'hover:shadow-2xl hover:-translate-y-2',
    glow: 'hover:shadow-[0_0_20px_rgba(255,140,66,0.3)]',
    border: 'hover:border-primary-500/50 transition-colors duration-300',
    // New card effects
    tilt: 'hover:rotate-1 transition-transform duration-300',
    reveal: 'group relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary-500/10 before:to-secondary-500/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300',
    imageZoom: 'group overflow-hidden [&_img]:transition-transform [&_img]:duration-500 hover:[&_img]:scale-110',
    borderGradient: 'relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-r before:from-primary-500 before:to-secondary-500 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300 before:-z-10 before:blur-sm',
  },
  
  // Link interactions
  link: {
    base: 'transition-all duration-200',
    underline: 'relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-primary-500 hover:after:w-full after:transition-all after:duration-300',
    arrow: 'group inline-flex items-center gap-2 hover:gap-3 transition-all duration-200',
  },
  
  // Input interactions
  input: {
    base: 'transition-all duration-200',
    focus: 'focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:scale-[1.02]',
    error: 'border-danger-500 focus:ring-danger-500 animate-shake',
    // New input effects
    floatingLabel: 'peer placeholder-transparent focus:placeholder:text-muted-foreground',
    success: 'border-success-500 focus:ring-success-500',
    glow: 'focus:shadow-[0_0_10px_rgba(43,95,122,0.3)]',
  },
  
  // Icon interactions
  icon: {
    base: 'transition-all duration-200',
    hover: 'hover:scale-110 hover:rotate-3',
    spin: 'animate-spin',
    bounce: 'hover:animate-bounce',
  },
  
  // Badge interactions
  badge: {
    base: 'transition-all duration-200',
    pulse: 'animate-pulse',
    glow: 'hover:shadow-[0_0_10px_currentColor]',
  },
  
  // Navigation interactions
  nav: {
    base: 'transition-all duration-200',
    active: 'relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary-500',
    hover: 'hover:text-primary-500 hover:scale-105',
  },
  
  // Loading states
  loading: {
    skeleton: 'animate-pulse bg-muted',
    spinner: 'animate-spin',
    dots: 'animate-bounce',
  },
  
  // Success/Error feedback
  feedback: {
    success: 'animate-scale-in bg-success-500/10 border-success-500',
    error: 'animate-shake border-danger-500',
    info: 'animate-fade-in bg-info-500/10 border-info-500',
  },
  
  // Page-specific interactions
  homepage: {
    heroImage: 'opacity-0 hero-image-animate',
    tourCard: 'group cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:-translate-y-2',
    tourCardImage: 'group-hover:scale-110 transition-transform duration-500',
    statNumber: 'inline-block transition-all duration-300 hover:scale-110',
  },
  
  dashboard: {
    statCard: 'transition-all duration-300 hover:scale-105 hover:shadow-lg',
    chartContainer: 'animate-fade-in-slide-up',
    quickAction: 'group transition-all duration-200 hover:bg-muted hover:scale-105 active:scale-95',
  },
  
  // List and grid animations
  list: {
    stagger: (index: number) => ({
      className: 'opacity-0 translate-y-4',
      style: {
        animation: `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`,
      },
    }),
  },
  
  // Modal and overlay animations
  modal: {
    backdrop: 'animate-fade-in',
    content: 'animate-scale-in',
    exit: 'animate-fade-out',
  },
  
  // Notification animations
  notification: {
    slideIn: 'animate-[slideInRight_0.3s_ease-out]',
    slideOut: 'animate-[slideOutRight_0.3s_ease-out]',
  },
};

/**
 * Scroll reveal animation hook
 */
export const scrollRevealClasses = {
  reveal: 'opacity-0 translate-y-8 transition-all duration-700 ease-out',
  revealed: 'opacity-100 translate-y-0',
};

/**
 * Page transition classes
 */
export const pageTransitions = {
  enter: 'animate-fade-in-slide-up',
  exit: 'opacity-0 translate-y-4 transition-all duration-300',
};

/**
 * Stagger animation for list items
 */
export function getStaggerDelay(index: number, baseDelay = 50): string {
  return `animation-delay: ${index * baseDelay}ms`;
}

/**
 * Combine multiple animation classes
 */
export function combineAnimations(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Hook-like utility to get animation delay for staggered animations
 */
export function getStaggerAnimation(index: number, baseDelay = 100): {
  style: React.CSSProperties;
  className?: string;
} {
  return {
    style: {
      animationDelay: `${index * baseDelay}ms`,
    },
    className: 'opacity-0',
  };
}

/**
 * Scroll reveal utility - returns classes for scroll-triggered animations
 */
export function getScrollRevealClasses(_threshold = 0.1): {
  initial: string;
  revealed: string;
} {
  return {
    initial: 'opacity-0 translate-y-8 transition-all duration-700 ease-out',
    revealed: 'opacity-100 translate-y-0',
  };
}

/**
 * Page transition utilities
 */
export const pageTransitionUtils = {
  // Fade transition
  fade: {
    enter: 'animate-fade-in',
    exit: 'opacity-0 transition-opacity duration-300',
  },
  // Slide transition
  slide: {
    enter: 'animate-slide-up',
    exit: 'opacity-0 translate-y-4 transition-all duration-300',
  },
  // Scale transition
  scale: {
    enter: 'animate-scale-in',
    exit: 'opacity-0 scale-95 transition-all duration-300',
  },
};
