import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className, hover = false }: CardProps) {
  return (
    <div
      className={clsx(
        'bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-gray-900/50 p-6',
        'border border-gray-200 dark:border-gray-700',
        hover && 'hover:shadow-lg dark:hover:shadow-gray-900/70 transition-shadow duration-200',
        className
      )}
    >
      {children}
    </div>
  );
}

