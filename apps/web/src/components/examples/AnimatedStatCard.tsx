/**
 * Animated Stat Card Component
 * 
 * Example component demonstrating micro-interactions on dashboard stat cards.
 * Shows stagger animation, hover effects, and icon animations.
 */

'use client';

import { Card } from '@/components/ui';
import { microInteractions, combineAnimations, getStaggerAnimation } from '@/lib/animations/micro-interactions';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  index?: number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const colorClasses = {
  primary: 'border-l-primary-500 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400',
  secondary: 'border-l-secondary-500 bg-secondary-100 dark:bg-secondary-900/30 text-secondary-600 dark:text-secondary-400',
  success: 'border-l-success-500 bg-success-100 dark:bg-success-900/30 text-success-600 dark:text-success-400',
  warning: 'border-l-warning-500 bg-warning-100 dark:bg-warning-900/30 text-warning-600 dark:text-warning-400',
  danger: 'border-l-danger-500 bg-danger-100 dark:bg-danger-900/30 text-danger-600 dark:text-danger-400',
  info: 'border-l-info-500 bg-info-100 dark:bg-info-900/30 text-info-600 dark:text-info-400',
};

export function AnimatedStatCard({
  label,
  value,
  icon: Icon,
  color = 'primary',
  index = 0,
  trend,
}: StatCardProps) {
  const colorClass = colorClasses[color] || colorClasses.primary;
  const borderColor = colorClass.split(' ')[0] || 'border-l-primary-500';
  const bgTextColors = colorClass.split(' ').slice(1).join(' ') || '';

  return (
    <Card
      className={combineAnimations(
        microInteractions.dashboard.statCard,
        'border-l-4',
        borderColor // border-l color
      )}
      {...getStaggerAnimation(index, 100)}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">
            {label}
          </p>
          <p className="text-3xl font-bold text-foreground mb-2">
            {value}
          </p>
          {trend && (
            <div className={combineAnimations(
              'flex items-center gap-1 text-sm',
              trend.isPositive ? 'text-success-600' : 'text-danger-600'
            )}>
              <span className={trend.isPositive ? '↑' : '↓'} />
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        <div className={combineAnimations(
          'p-3 rounded-lg',
          bgTextColors // bg and text colors
        )}>
          <Icon className={combineAnimations(
            'w-6 h-6',
            microInteractions.icon.hover
          )} />
        </div>
      </div>
    </Card>
  );
}
