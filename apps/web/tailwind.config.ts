import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Swiss Style colors for Masterclass
        swiss: {
          black: '#000000',
          white: '#FFFFFF',
          blue: '#1A3A52',
          red: '#E74C3C', // Urgency color
          green: '#27AE60', // Success color
        },
        // Primary color palette (Bleu pétrole) - Uses CSS variables with fallbacks for theme support
        primary: {
          50: 'var(--color-primary-50, #E8F1F5)',
          100: 'var(--color-primary-100, #C2DCE6)',
          200: 'var(--color-primary-200, #9BC7D7)',
          300: 'var(--color-primary-300, #74B2C8)',
          400: 'var(--color-primary-400, #4D9DB9)',
          500: 'var(--color-primary-500, #2B5F7A)',
          600: 'var(--color-primary-600, #234E63)',
          700: 'var(--color-primary-700, #1B3D4C)',
          800: 'var(--color-primary-800, #132C35)',
          900: 'var(--color-primary-900, #0B1B1E)',
          950: 'var(--color-primary-950, #0B1B1E)',
        },
        // Custom blue light color (#B4D6FF) - darker in dark mode
        blue: {
          light: '#B4D6FF',
          lightDark: '#1e3a8a', // Dark mode version
        },
        // Secondary color palette (Orange) - Uses CSS variables with fallbacks for theme support
        secondary: {
          50: 'var(--color-secondary-50, #FFF4E6)',
          100: 'var(--color-secondary-100, #FFE0B3)',
          200: 'var(--color-secondary-200, #FFCC80)',
          300: 'var(--color-secondary-300, #FFB84D)',
          400: 'var(--color-secondary-400, #FFA41A)',
          500: 'var(--color-secondary-500, #F58220)',
          600: 'var(--color-secondary-600, #C4681A)',
          700: 'var(--color-secondary-700, #934E13)',
          800: 'var(--color-secondary-800, #62340D)',
          900: 'var(--color-secondary-900, #311A06)',
          950: 'var(--color-secondary-950, #311A06)',
        },
        // Danger color palette - Uses CSS variables with fallbacks for theme support
        danger: {
          50: 'var(--color-danger-50, #fef2f2)',
          100: 'var(--color-danger-100, #fee2e2)',
          200: 'var(--color-danger-200, #fecaca)',
          300: 'var(--color-danger-300, #fca5a5)',
          400: 'var(--color-danger-400, #f87171)',
          500: 'var(--color-danger-500, #ef4444)',
          600: 'var(--color-danger-600, #dc2626)',
          700: 'var(--color-danger-700, #b91c1c)',
          800: 'var(--color-danger-800, #991b1b)',
          900: 'var(--color-danger-900, #7f1d1d)',
          950: 'var(--color-danger-950, #450a0a)',
        },
        // Warning color palette - Uses CSS variables with fallbacks for theme support
        warning: {
          light: 'var(--color-warning-light, #FEF3C7)',
          DEFAULT: 'var(--color-warning, #F59E0B)',
          dark: 'var(--color-warning-dark, #B45309)',
          50: 'var(--color-warning-50, #FEF3C7)',
          100: 'var(--color-warning-100, #FEF3C7)',
          200: 'var(--color-warning-200, #FDE68A)',
          300: 'var(--color-warning-300, #FCD34D)',
          400: 'var(--color-warning-400, #FBBF24)',
          500: 'var(--color-warning-500, #F59E0B)',
          600: 'var(--color-warning-600, #D97706)',
          700: 'var(--color-warning-700, #B45309)',
          800: 'var(--color-warning-800, #92400E)',
          900: 'var(--color-warning-900, #78350F)',
          950: 'var(--color-warning-950, #451A03)',
        },
        // Info color palette - Uses CSS variables with fallbacks for theme support
        info: {
          light: 'var(--color-info-light, #DBEAFE)',
          DEFAULT: 'var(--color-info, #3B82F6)',
          dark: 'var(--color-info-dark, #1E40AF)',
          50: 'var(--color-info-50, #DBEAFE)',
          100: 'var(--color-info-100, #DBEAFE)',
          200: 'var(--color-info-200, #BFDBFE)',
          300: 'var(--color-info-300, #93C5FD)',
          400: 'var(--color-info-400, #60A5FA)',
          500: 'var(--color-info-500, #3B82F6)',
          600: 'var(--color-info-600, #2563EB)',
          700: 'var(--color-info-700, #1D4ED8)',
          800: 'var(--color-info-800, #1E40AF)',
          900: 'var(--color-info-900, #1E3A8A)',
          950: 'var(--color-info-950, #172554)',
        },
        // Success colors - Uses CSS variables with fallbacks for theme support
        success: {
          50: 'var(--color-success-50, #f0fdf4)',
          100: 'var(--color-success-100, #dcfce7)',
          200: 'var(--color-success-200, #bbf7d0)',
          300: 'var(--color-success-300, #86efac)',
          400: 'var(--color-success-400, #4ade80)',
          500: 'var(--color-success-500, #22c55e)',
          600: 'var(--color-success-600, #16a34a)',
          700: 'var(--color-success-700, #15803d)',
          800: 'var(--color-success-800, #166534)',
          900: 'var(--color-success-900, #14532d)',
          950: 'var(--color-success-950, #052e16)',
        },
        // Error colors - Uses CSS variables with fallbacks for theme support
        error: {
          light: 'var(--color-error-light, #FEE2E2)',
          DEFAULT: 'var(--color-error, #EF4444)',
          dark: 'var(--color-error-dark, #B91C1C)',
          50: 'var(--color-error-50, #FEE2E2)',
          100: 'var(--color-error-100, #FEE2E2)',
          200: 'var(--color-error-200, #FECACA)',
          300: 'var(--color-error-300, #FCA5A5)',
          400: 'var(--color-error-400, #F87171)',
          500: 'var(--color-error-500, #EF4444)',
          600: 'var(--color-error-600, #DC2626)',
          700: 'var(--color-error-700, #B91C1C)',
          800: 'var(--color-error-800, #991B1B)',
          900: 'var(--color-error-900, #7F1D1D)',
          950: 'var(--color-error-950, #450A0A)',
        },
        // Neutral grays (for text, borders, backgrounds) - Keep hardcoded as they're neutral
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#030712',
        },
        // Alias gray for backward compatibility
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
          950: '#030712',
        },
        // Accent Teal color palette
        accent: {
          teal: {
            50: '#E6F7F7',
            100: '#B3E8E8',
            200: '#80D9D9',
            300: '#4DCACA',
            400: '#1ABBBB',
            500: '#0E9999',
            600: '#0B7A7A',
            700: '#085B5B',
            800: '#053C3C',
            900: '#031E1E',
          },
        },
        // Semantic colors for easy access
        semantic: {
          success: {
            light: '#D1FAE5',
            DEFAULT: '#10B981',
            dark: '#047857',
          },
          error: {
            light: '#FEE2E2',
            DEFAULT: '#EF4444',
            dark: '#B91C1C',
          },
          warning: {
            light: '#FEF3C7',
            DEFAULT: '#F59E0B',
            dark: '#B45309',
          },
          info: {
            light: '#DBEAFE',
            DEFAULT: '#3B82F6',
            dark: '#1E40AF',
          },
        },
        // Theme-aware base colors - These use CSS variables that change with theme
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        muted: {
          DEFAULT: 'var(--color-muted)',
          foreground: 'var(--color-muted-foreground)',
        },
        border: 'var(--color-border)',
        input: 'var(--color-input)',
        ring: 'var(--color-ring)',
      },
      spacing: {
        // Standardized spacing scale (UX/UI improvements - Batch 1)
        // Fixed pixel values for consistent spacing across the application
        xs: '4px',    // 0.25rem - Very small spacing
        sm: '8px',    // 0.5rem - Small spacing
        md: '16px',   // 1rem - Standard spacing
        lg: '24px',   // 1.5rem - Large spacing
        xl: '32px',   // 2rem - Very large spacing
        '2xl': '48px', // 3rem - Extra large spacing
        '3xl': '64px', // 4rem - Maximum spacing
        // Swiss Style spacing - Large margins for breathing room
        'swiss-sm': '80px',   // Swiss small margin
        'swiss-md': '120px',  // Swiss standard margin (between sections)
        'swiss-lg': '160px',  // Swiss large margin
        // Theme-aware spacing using CSS variables with fallbacks (backward compatibility)
        // These map to the theme's spacing scale
        'theme-xs': 'var(--spacing-xs, 0.5rem)',      // 8px default
        'theme-sm': 'var(--spacing-sm, 0.75rem)',     // 12px default
        'theme-md': 'var(--spacing-md, 1rem)',        // 16px default
        'theme-lg': 'var(--spacing-lg, 1.5rem)',      // 24px default
        'theme-xl': 'var(--spacing-xl, 2rem)',        // 32px default
        'theme-2xl': 'var(--spacing-2xl, 3rem)',    // 48px default
        'theme-3xl': 'var(--spacing-3xl, 4rem)',    // 64px default
        // Spacing unit and scale (for calculations)
        unit: 'var(--spacing-unit, 0.5rem)',  // 8px default
        // Extended spacing scale for consistent layouts (keep for backward compatibility)
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },
      borderRadius: {
        // Use theme border radius if available, otherwise use default
        DEFAULT: 'var(--border-radius, 0.5rem)',
        // Consistent border radius scale
        '3xl': '1.5rem',
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      fontFamily: {
        // Use theme font family if available, otherwise fallback to system fonts
        sans: [
          'var(--font-family)',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'Fira Sans',
          'Droid Sans',
          'Helvetica Neue',
          'sans-serif',
        ],
        heading: [
          'var(--font-family-heading)',
          'var(--font-family)',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        subheading: [
          'var(--font-family-subheading)',
          'var(--font-family)',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      fontSize: {
        // Standardized typography hierarchy (UX/UI improvements - Batch 2)
        // Fixed pixel values with line heights and font weights
        display: ['48px', { lineHeight: '56px', fontWeight: '700' }],  // Very large titles
        h1: ['32px', { lineHeight: '40px', fontWeight: '700' }],      // Main title
        h2: ['24px', { lineHeight: '32px', fontWeight: '600' }],       // Secondary title
        h3: ['20px', { lineHeight: '28px', fontWeight: '600' }],      // Tertiary title
        subtitle: ['16px', { lineHeight: '24px', fontWeight: '500' }], // Subtitle
        body: ['14px', { lineHeight: '22px', fontWeight: '400' }],     // Body text
        small: ['12px', { lineHeight: '18px', fontWeight: '400' }],   // Small text
        caption: ['11px', { lineHeight: '16px', fontWeight: '400' }],  // Caption/legend
        // Swiss Style typography - Inter Bold 900 for headings
        'swiss-display': ['72px', { lineHeight: '80px', fontWeight: '900' }],  // Hero headline
        'swiss-h1': ['48px', { lineHeight: '56px', fontWeight: '900' }],      // Swiss h1
        'swiss-h2': ['36px', { lineHeight: '44px', fontWeight: '600' }],       // Swiss h2
        'swiss-h3': ['28px', { lineHeight: '36px', fontWeight: '600' }],      // Swiss h3
        'swiss-body': ['18px', { lineHeight: '28px', fontWeight: '400' }],     // Swiss body
        'swiss-cta': ['20px', { lineHeight: '28px', fontWeight: '700' }],      // CTA text
      },
      boxShadow: {
        // Custom shadows for depth
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.2)',
      },
      transitionDuration: {
        // Theme-aware transition durations
        fast: 'var(--animation-duration-fast, 150ms)',
        normal: 'var(--animation-duration-normal, 200ms)',
        slow: 'var(--animation-duration-slow, 300ms)',
        // Keep default Tailwind durations
        75: '75ms',
        100: '100ms',
        150: '150ms',
        200: '200ms',
        300: '300ms',
        400: '400ms',
        500: '500ms',
        700: '700ms',
        1000: '1000ms',
      },
      transitionTimingFunction: {
        // Theme-aware easing functions
        default: 'var(--animation-easing-default, ease-in-out)',
        bounce: 'var(--animation-easing-bounce, cubic-bezier(0.68, -0.55, 0.265, 1.55))',
        smooth: 'var(--animation-easing-smooth, cubic-bezier(0.4, 0, 0.2, 1))',
        // Keep default Tailwind easings
        linear: 'linear',
        in: 'cubic-bezier(0.4, 0, 1, 1)',
        out: 'cubic-bezier(0, 0, 0.2, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      animation: {
        // Custom animations with theme-aware durations and easings
        'fade-in': `fadeIn var(--animation-duration-normal, 0.2s) var(--animation-easing-default, ease-in-out)`,
        'fade-out': `fadeOut var(--animation-duration-normal, 0.2s) var(--animation-easing-default, ease-in-out)`,
        'slide-up': `slideUp var(--animation-duration-normal, 0.3s) var(--animation-easing-smooth, ease-out)`,
        'slide-down': `slideDown var(--animation-duration-normal, 0.3s) var(--animation-easing-smooth, ease-out)`,
        'scale-in': `scaleIn var(--animation-duration-fast, 0.2s) var(--animation-easing-smooth, ease-out)`,
        'fade-in-slide-up': `fadeInSlideUp 0.5s cubic-bezier(0.4, 0, 0.2, 1)`,
        'fade-in-up': `fadeInUp 0.6s ease-out forwards`,
        'slide-in-right': `slideInRight 0.3s ease-out`,
        'slide-out-right': `slideOutRight 0.3s ease-out`,
        'shake': `shake 0.5s ease-in-out`,
        // Optimized blob animation - slower and smoother for better performance
        'blob': 'blob 20s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        fadeInSlideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '25%': { transform: 'translate(20px, -50px) scale(1.1)' },
          '50%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '75%': { transform: 'translate(50px, 50px) scale(1.05)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideOutRight: {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(100%)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
