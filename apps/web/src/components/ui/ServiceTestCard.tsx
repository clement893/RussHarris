'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface ServiceTestCardProps {
  href: string;
  title: string;
  description: string;
  icon: ReactNode;
  color: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
}

const colorClasses = {
  primary: {
    border: 'border-primary-200 dark:border-primary-800',
    bg: 'bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/60 dark:to-primary-800/60',
    hoverBorder: 'hover:border-primary-400 dark:hover:border-primary-600',
    iconBg: 'bg-primary-600 dark:bg-primary-500',
    text: 'text-primary-900 dark:text-primary-100',
    textSecondary: 'text-primary-800 dark:text-primary-200',
    arrow: 'text-primary-600 dark:text-primary-400',
  },
  secondary: {
    border: 'border-secondary-200 dark:border-secondary-800',
    bg: 'bg-gradient-to-br from-secondary-100 to-secondary-200 dark:from-secondary-900/60 dark:to-secondary-800/60',
    hoverBorder: 'hover:border-secondary-400 dark:hover:border-secondary-600',
    iconBg: 'bg-secondary-600 dark:bg-secondary-500',
    text: 'text-secondary-900 dark:text-secondary-100',
    textSecondary: 'text-secondary-800 dark:text-secondary-200',
    arrow: 'text-secondary-600 dark:text-secondary-400',
  },
  info: {
    border: 'border-info-200 dark:border-info-800',
    bg: 'bg-gradient-to-br from-info-100 to-info-200 dark:from-info-900/60 dark:to-info-800/60',
    hoverBorder: 'hover:border-info-400 dark:hover:border-info-600',
    iconBg: 'bg-info-600 dark:bg-info-500',
    text: 'text-info-900 dark:text-info-100',
    textSecondary: 'text-info-800 dark:text-info-200',
    arrow: 'text-info-600 dark:text-info-400',
  },
  success: {
    border: 'border-green-200 dark:border-green-800',
    bg: 'bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/60 dark:to-green-800/60',
    hoverBorder: 'hover:border-green-400 dark:hover:border-green-600',
    iconBg: 'bg-green-600 dark:bg-green-500',
    text: 'text-green-900 dark:text-green-100',
    textSecondary: 'text-green-800 dark:text-green-200',
    arrow: 'text-green-600 dark:text-green-400',
  },
  warning: {
    border: 'border-yellow-200 dark:border-yellow-800',
    bg: 'bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/60 dark:to-yellow-800/60',
    hoverBorder: 'hover:border-yellow-400 dark:hover:border-yellow-600',
    iconBg: 'bg-yellow-600 dark:bg-yellow-500',
    text: 'text-yellow-900 dark:text-yellow-100',
    textSecondary: 'text-yellow-800 dark:text-yellow-200',
    arrow: 'text-yellow-600 dark:text-yellow-400',
  },
  error: {
    border: 'border-red-200 dark:border-red-800',
    bg: 'bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/60 dark:to-red-800/60',
    hoverBorder: 'hover:border-red-400 dark:hover:border-red-600',
    iconBg: 'bg-red-600 dark:bg-red-500',
    text: 'text-red-900 dark:text-red-100',
    textSecondary: 'text-red-800 dark:text-red-200',
    arrow: 'text-red-600 dark:text-red-400',
  },
};

export default function ServiceTestCard({
  href,
  title,
  description,
  icon,
  color = 'info',
}: ServiceTestCardProps) {
  const colors = colorClasses[color];

  return (
    <Link
      href={href}
      className={clsx(
        'group p-6 border-2 rounded-lg hover:shadow-lg transition-all duration-200',
        colors.border,
        colors.bg,
        colors.hoverBorder
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={clsx('w-12 h-12 rounded-lg flex items-center justify-center', colors.iconBg)}>
          <div className="w-6 h-6 text-white">{icon}</div>
        </div>
        <svg
          className={clsx('w-5 h-5 group-hover:translate-x-1 transition-transform', colors.arrow)}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
      <h3 className={clsx('text-xl font-bold mb-2', colors.text)}>{title}</h3>
      <p className={clsx('text-sm', colors.textSecondary)}>{description}</p>
    </Link>
  );
}

