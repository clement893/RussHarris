/**
 * SwissDivider Component
 *
 * Minimal horizontal divider line following Swiss International Style
 * Thin 1px line in black/gray, no shadows, no decorations
 *
 * @component
 */
'use client';

import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface SwissDividerProps extends HTMLAttributes<HTMLHRElement> {
  /**
   * Variant: full-width (spans entire container) or container-width (respects max-width)
   */
  variant?: 'full-width' | 'container-width';
  /**
   * Color variant: black (default) or gray
   */
  color?: 'black' | 'gray';
}

export default function SwissDivider({
  variant = 'full-width',
  color = 'black',
  className,
  ...props
}: SwissDividerProps) {
  const colorClasses = {
    black: 'border-swiss-black',
    gray: 'border-border',
  };

  const variantClasses = {
    'full-width': 'w-full',
    'container-width': 'max-w-7xl mx-auto',
  };

  return (
    <hr
      className={clsx(
        'border-0 border-t',
        'h-0',
        'border-solid',
        colorClasses[color],
        variantClasses[variant],
        className
      )}
      role="separator"
      aria-orientation="horizontal"
      {...props}
    />
  );
}
