/**
 * StatsSection Component
 * Reusable statistics section component
 * Swiss Style: clean, minimal, black/white
 */

'use client';

import { ReactNode } from 'react';
import { clsx } from 'clsx';
import { Container } from '@/components/ui';

export interface Stat {
  value: string | number;
  label: string;
  icon?: ReactNode;
  description?: string;
}

interface StatsSectionProps {
  stats: Stat[];
  title?: string;
  subtitle?: string;
  className?: string;
  variant?: 'default' | 'compact';
  columns?: 2 | 3 | 4;
}

export default function StatsSection({
  stats,
  title,
  subtitle,
  className,
  variant = 'default',
  columns = 4,
}: StatsSectionProps) {
  const isCompact = variant === 'compact';
  const gridCols = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  };

  return (
    <section className={clsx('bg-white py-16', !isCompact && 'md:py-20', className)} aria-labelledby="stats-heading">
      <Container>
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && (
              <h2 id="stats-heading" className="swiss-display text-4xl md:text-5xl font-black text-black mb-4">
                {title}
              </h2>
            )}
            {subtitle && <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>}
          </div>
        )}
        <div className={clsx('grid gap-8', gridCols[columns])} role="list" aria-label="Statistiques">
          {stats.map((stat, index) => (
            <div
              key={index}
              role="listitem"
              className={clsx(
                'text-center',
                isCompact ? 'py-4' : 'py-6',
                'border-2 border-transparent hover:border-black transition-all duration-200'
              )}
            >
              {/* Icon */}
              {stat.icon && (
                <div className="flex justify-center mb-4 text-black">{stat.icon}</div>
              )}

              {/* Value */}
              <div
                className={clsx(
                  'font-black text-black mb-2',
                  isCompact ? 'text-3xl md:text-4xl' : 'text-4xl md:text-5xl'
                )}
              >
                {stat.value}
              </div>

              {/* Label */}
              <div
                className={clsx(
                  'text-gray-600 flex items-center justify-center gap-2',
                  isCompact ? 'text-sm' : 'text-sm md:text-base'
                )}
              >
                {stat.label}
              </div>

              {/* Description */}
              {stat.description && (
                <p className={clsx('text-gray-500 mt-2', isCompact ? 'text-xs' : 'text-sm')}>
                  {stat.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
