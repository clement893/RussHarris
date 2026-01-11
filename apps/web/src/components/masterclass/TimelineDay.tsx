/**
 * TimelineDay Component
 * Component for displaying a day in the program timeline
 * Swiss Style: clean, minimal, black/white
 */

'use client';

import { ReactNode } from 'react';
import { clsx } from 'clsx';
import SwissCard from './SwissCard';
import SwissDivider from './SwissDivider';

export interface TimelineItem {
  time?: string;
  title: string;
  description?: string;
  icon?: ReactNode;
}

interface TimelineDayProps {
  dayNumber: number;
  title: string;
  items: TimelineItem[];
  className?: string;
  variant?: 'default' | 'compact';
}

export default function TimelineDay({
  dayNumber,
  title,
  items,
  className,
  variant = 'default',
}: TimelineDayProps) {
  const isCompact = variant === 'compact';

  return (
    <SwissCard className={clsx('p-8 border-2 border-black', className)}>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-black text-white flex items-center justify-center font-black text-xl flex-shrink-0">
          {dayNumber}
        </div>
        <div>
          <h3 className="text-2xl font-black text-black">{title}</h3>
          {!isCompact && <SwissDivider className="mt-2 max-w-md" />}
        </div>
      </div>

      {/* Items */}
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-start gap-4">
            {/* Icon or Time */}
            {item.icon ? (
              <div className="mt-0.5 flex-shrink-0 text-black">{item.icon}</div>
            ) : item.time ? (
              <div className="mt-0.5 flex-shrink-0 text-sm font-black text-black min-w-[60px]">{item.time}</div>
            ) : null}

            {/* Content */}
            <div className="flex-1">
              <h4 className={clsx('font-black text-black mb-1', isCompact ? 'text-base' : 'text-lg')}>
                {item.title}
              </h4>
              {item.description && (
                <p className={clsx('text-gray-600', isCompact ? 'text-sm' : 'text-base')}>{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </SwissCard>
  );
}
