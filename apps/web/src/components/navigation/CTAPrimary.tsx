/**
 * CTAPrimary Component
 * Primary CTA button "Réserver ma place" (Book Now)
 * Swiss Style design: black background, white text, bold typography
 */

'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { clsx } from 'clsx';
import { Calendar } from 'lucide-react';
import UrgencyBadge from '@/components/masterclass/UrgencyBadge';

interface CTAPrimaryProps {
  variant?: 'desktop' | 'mobile';
  showUrgencyBadge?: boolean;
  urgencyThreshold?: number; // Percentage threshold for showing urgency badge (default: 10%)
  availablePlaces?: number; // Current available places (for urgency calculation)
  className?: string;
  onClick?: () => void;
}

export default function CTAPrimary({
  variant = 'desktop',
  showUrgencyBadge = false,
  urgencyThreshold = 10,
  availablePlaces,
  className,
  onClick,
}: CTAPrimaryProps) {
  const t = useTranslations();
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push('/cities');
    }
  };

  // Calculate if urgency badge should be shown
  const shouldShowUrgency = showUrgencyBadge && availablePlaces !== undefined;
  const isUrgent = shouldShowUrgency && availablePlaces !== undefined && (availablePlaces / 100) * 100 < urgencyThreshold;

  // Desktop variant
  if (variant === 'desktop') {
    return (
      <div className={clsx('relative', className)}>
        <button
          onClick={handleClick}
          className={clsx(
            'relative px-8 py-3 bg-black text-white font-black text-base',
            'border-2 border-black transition-all duration-200 rounded-none',
            'hover:bg-white hover:text-black hover:border-black',
            'focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2',
            'active:scale-95',
            isUrgent && 'animate-pulse'
          )}
          aria-label={t('navigation.bookNow')}
        >
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" aria-hidden="true" />
            <span>{t('navigation.bookNow')}</span>
          </div>
        </button>
        {shouldShowUrgency && isUrgent && (
          <div className="absolute -top-2 -right-2">
            <UrgencyBadge text="Places limitées" className="text-xs px-2 py-1" />
          </div>
        )}
      </div>
    );
  }

  // Mobile variant
  return (
    <button
      onClick={handleClick}
      className={clsx(
        'w-full px-6 py-4 bg-black text-white font-black text-lg',
        'border-2 border-black transition-all duration-200 rounded-none',
        'hover:bg-white hover:text-black hover:border-black',
        'focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2',
        'active:scale-95',
        'min-h-[56px] flex items-center justify-center gap-2',
        isUrgent && 'animate-pulse',
        className
      )}
      aria-label={t('navigation.bookNow')}
    >
      <Calendar className="w-5 h-5" aria-hidden="true" />
      <span>{t('navigation.bookNow')}</span>
      {shouldShowUrgency && isUrgent && (
        <UrgencyBadge text="Places limitées" className="text-xs px-2 py-1" />
      )}
    </button>
  );
}
