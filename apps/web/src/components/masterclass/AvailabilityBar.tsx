/**
 * AvailabilityBar Component
 *
 * Visual progress bar showing event availability
 * - Color changes based on availability: green (> 20%), yellow (10-20%), red (< 10%)
 * - Displays "X/Y places disponibles" text
 * - Responsive design
 *
 * @component
 */
'use client';

import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface AvailabilityBarProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Number of available spots
   */
  available: number;
  /**
   * Total capacity
   */
  total: number;
  /**
   * Show text label
   */
  showLabel?: boolean;
}

export default function AvailabilityBar({
  available,
  total,
  showLabel = true,
  className,
  ...props
}: AvailabilityBarProps) {
  const percentage = total > 0 ? (available / total) * 100 : 0;
  const booked = total - available;

  // Determine color based on percentage
  const getColorClass = () => {
    if (percentage > 20) return 'bg-swiss-green';
    if (percentage >= 10) return 'bg-yellow-500';
    return 'bg-swiss-red';
  };

  const getStatusText = () => {
    if (available === 0) return 'Complet';
    if (percentage < 10) return 'Presque complet';
    if (percentage < 20) return 'Peu de places';
    return 'Places disponibles';
  };

  return (
    <div className={clsx('w-full', className)} {...props}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">
            {available}/{total} places disponibles
          </span>
          <span className="text-xs text-muted-foreground">{getStatusText()}</span>
        </div>
      )}

      {/* Progress bar container */}
      <div className="w-full h-2 bg-muted border border-border">
        <div
          className={clsx('h-full transition-all duration-300', getColorClass())}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={available}
          aria-valuemin={0}
          aria-valuemax={total}
          aria-label={`${available} places disponibles sur ${total}`}
        />
      </div>

      {showLabel && available > 0 && (
        <div className="mt-1 text-xs text-muted-foreground">
          {booked} places réservées
        </div>
      )}
    </div>
  );
}
