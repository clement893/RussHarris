/**
 * SwissCard Component
 *
 * Minimalist card component following Swiss International Style
 * - No shadows
 * - Thin border (1px)
 * - Generous padding
 * - Subtle hover effect (optional)
 *
 * @component
 */
'use client';

import { ReactNode, HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface SwissCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  /**
   * Enable subtle hover effect
   */
  hover?: boolean;
  /**
   * Padding variant: sm, md, lg
   */
  padding?: 'sm' | 'md' | 'lg';
}

export default function SwissCard({
  children,
  hover = false,
  padding = 'md',
  className,
  ...props
}: SwissCardProps) {
  const paddingClasses = {
    sm: 'p-6',
    md: 'p-10',
    lg: 'p-16',
  };

  const hoverClasses = hover
    ? 'transition-colors duration-200 hover:border-swiss-black hover:bg-muted'
    : '';

  return (
    <div
      className={clsx(
        'border border-border',
        'bg-background',
        paddingClasses[padding],
        hoverClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
