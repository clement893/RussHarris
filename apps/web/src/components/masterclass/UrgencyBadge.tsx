/**
 * UrgencyBadge Component
 *
 * Badge indicating limited availability for masterclass events
 * - "Places limitées" message
 * - Color variants: warning (yellow) or danger (red if < 5 places)
 * - Optional subtle pulse animation
 *
 * @component
 */
'use client';

import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface UrgencyBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Variant: warning (yellow) or danger (red)
   */
  variant?: 'warning' | 'danger';
  /**
   * Enable subtle pulse animation
   */
  pulse?: boolean;
  /**
   * Custom text (default: "Places limitées")
   */
  text?: string;
}

export default function UrgencyBadge({
  variant = 'warning',
  pulse = false,
  text = 'Places limitées',
  className,
  ...props
}: UrgencyBadgeProps) {
  const variantClasses = {
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    danger: 'bg-swiss-red/10 text-swiss-red border-swiss-red/30',
  };

  return (
    <span
      className={clsx(
        'inline-flex items-center px-4 py-2',
        'text-sm font-semibold',
        'border border-solid rounded-none', // Swiss style: no rounded corners
        variantClasses[variant],
        pulse && 'animate-pulse',
        className
      )}
      {...props}
    >
      {text}
    </span>
  );
}
