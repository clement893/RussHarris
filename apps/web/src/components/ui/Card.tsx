/**
 * Card Component
 * 
 * Versatile card component for displaying content with optional header, footer, and actions.
 * Supports hover effects, click handlers, and dark mode.
 * 
 * @component
 * @example
 * ```tsx
 * // Basic card
 * <Card>
 *   <p>Card content</p>
 * </Card>
 * ```
 * 
 * @example
 * ```tsx
 * // Card with title and subtitle
 * <Card title="Card Title" subtitle="Subtitle">
 *   <p>Card content</p>
 * </Card>
 * ```
 * 
 * @example
 * ```tsx
 * // Card with actions in footer
 * <Card 
 *   title="Card Title"
 *   footer={<Button>Action</Button>}
 * >
 *   <p>Card content</p>
 * </Card>
 * ```
 * 
 * @example
 * ```tsx
 * // Clickable card with hover effect
 * <Card 
 *   title="Clickable Card"
 *   hover
 *   onClick={() => logger.log('Card clicked')}
 * >
 *   <p>Click me!</p>
 * </Card>
 * ```
 * 
 * @example
 * ```tsx
 * // Card with custom header
 * <Card 
 *   header={
 *     <div className="flex items-center justify-between">
 *       <h3>Custom Header</h3>
 *       <Badge>New</Badge>
 *     </div>
 *   }
 * >
 *   <p>Content with custom header</p>
 * </Card>
 * ```
 * 
 * @param {CardProps} props - Component props
 * @param {ReactNode} props.children - Card content (required)
 * @param {string} [props.title] - Card title displayed in header
 * @param {string} [props.subtitle] - Card subtitle displayed below title
 * @param {ReactNode} [props.header] - Custom header content (overrides title/subtitle)
 * @param {ReactNode} [props.footer] - Footer content (buttons, actions, etc.)
 * @param {ReactNode} [props.actions] - Alias for footer prop
 * @param {boolean} [props.hover=false] - Enable hover shadow effect
 * @param {() => void} [props.onClick] - Click handler (makes card clickable)
 * @param {boolean} [props.padding=true] - Add padding to card content
 * @param {string} [props.className] - Additional CSS classes
 * 
 * @returns {JSX.Element} Card component
 * 
 * @see {@link https://tailwindcss.com/docs/box-shadow} Tailwind shadow utilities
 */

'use client';

import { type ReactNode, type HTMLAttributes } from 'react';
import { clsx } from 'clsx';

export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Card content */
  children: ReactNode;
  /** Card title */
  title?: string;
  /** Card subtitle */
  subtitle?: string;
  /** Custom header content */
  header?: ReactNode;
  /** Footer content */
  footer?: ReactNode;
  /** Actions (alias for footer) */
  actions?: ReactNode;
  /** Enable hover effect */
  hover?: boolean;
  /** Click handler */
  onClick?: () => void;
  /** Add padding to card content */
  padding?: boolean;
}

export default function Card({
  children,
  title,
  subtitle,
  header,
  footer,
  actions,
  className,
  hover = false,
  onClick,
  padding = true,
  ...props
}: CardProps) {
  // Use actions as footer if footer is not provided
  const cardFooter = footer || actions;
  
  // Generate aria-label for clickable cards without title
  const ariaLabel = onClick && !title ? 'Clickable card' : undefined;
  
  return (
    <div
      className={clsx(
        'rounded-lg border shadow-sm',
        // Normal background (will be overridden by glassmorphism if enabled)
        'bg-[var(--color-background)]',
        'border-[var(--color-border)]',
        hover && 'transition-all hover:shadow-md',
        onClick && 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:ring-offset-2',
        className
      )}
      style={{
        // Glassmorphism support: use CSS variables with fallbacks
        backgroundColor: 'var(--glassmorphism-card-background, var(--color-background))',
        backdropFilter: 'var(--glassmorphism-card-backdrop-blur, var(--glassmorphism-backdrop, none))',
        WebkitBackdropFilter: 'var(--glassmorphism-card-backdrop-blur, var(--glassmorphism-backdrop, none))',
        borderColor: 'var(--glassmorphism-card-border, var(--color-border))',
        // Enhanced shadow for glassmorphism (will use normal shadow if glassmorphism not enabled)
        boxShadow: 'var(--glassmorphism-shadow, var(--shadow-sm, 0 1px 2px 0 rgba(0, 0, 0, 0.05)))',
      } as React.CSSProperties}
      onClick={onClick ? (e: React.MouseEvent<HTMLDivElement>) => {
        // Only trigger card onClick if the click target is the card itself or a non-interactive element
        const target = e.target as HTMLElement;
        const isInteractive = target.tagName === 'BUTTON' || 
                              target.tagName === 'A' || 
                              target.closest('button') !== null ||
                              target.closest('a') !== null;
        
        if (!isInteractive) {
          onClick();
        }
      } : undefined}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={ariaLabel}
      onKeyDown={onClick ? (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
      {...props}
    >
      {(title || subtitle || header) && (
        <div className="px-6 py-4 border-b border-[var(--color-border)]">
          {header || (
            <>
              {title && (
                <h3 className="text-lg font-semibold text-[var(--color-foreground)]">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="mt-1 text-sm text-[var(--color-muted-foreground)]">
                  {subtitle}
                </p>
              )}
            </>
          )}
        </div>
      )}

      <div className={clsx(padding && 'p-6')}>{children}</div>

      {cardFooter && (
        <div className="px-6 py-4 border-t border-[var(--color-border)] bg-[var(--color-muted)]">
          {cardFooter}
        </div>
      )}
    </div>
  );
}
