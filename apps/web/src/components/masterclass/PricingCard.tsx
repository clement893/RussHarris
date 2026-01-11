/**
 * PricingCard Component
 * Reusable card component for displaying pricing options
 * Swiss Style: clean, minimal, black/white
 */

'use client';

import { ReactNode } from 'react';
import { CheckCircle, Tag } from 'lucide-react';
import { clsx } from 'clsx';
import SwissCard from './SwissCard';
import ButtonLink from '@/components/ui/ButtonLink';
import Button from '@/components/ui/Button';

export interface PricingFeature {
  text: string;
  icon?: ReactNode;
}

export interface PricingCardData {
  id: string;
  name: string;
  price: number;
  currency: string;
  description?: string;
  popular?: boolean;
  badge?: string;
  features: PricingFeature[];
  ctaText?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
}

interface PricingCardProps {
  pricing: PricingCardData;
  className?: string;
  variant?: 'default' | 'compact';
}

export default function PricingCard({ pricing, className, variant = 'default' }: PricingCardProps) {
  const isCompact = variant === 'compact';

  return (
    <SwissCard
      className={clsx(
        'p-8 border-2 border-black relative',
        pricing.popular && 'bg-black text-white',
        !pricing.popular && 'hover:bg-black hover:text-white transition-all duration-200',
        className
      )}
    >
      {/* Popular Badge */}
      {pricing.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-black text-white px-4 py-1 text-sm font-black border-2 border-black">
            Populaire
          </div>
        </div>
      )}

      {/* Badge (Early Bird, etc.) */}
      {pricing.badge && (
        <div className="mb-4">
          <div
            className={clsx(
              'inline-flex items-center gap-2 px-3 py-1 border-2 text-xs font-black',
              pricing.popular
                ? 'border-white text-white'
                : 'border-black text-black group-hover:border-white group-hover:text-white'
            )}
          >
            <Tag className="w-3 h-3" aria-hidden="true" />
            {pricing.badge}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h3 className={clsx('font-black mb-2', pricing.popular ? 'text-white text-2xl' : 'text-black text-2xl')}>
          {pricing.name}
        </h3>
        {pricing.description && (
          <p className={clsx('text-sm mb-4', pricing.popular ? 'text-white/80' : 'text-gray-600')}>
            {pricing.description}
          </p>
        )}
        <div className="flex items-baseline gap-2">
          <span className={clsx('text-5xl font-black', pricing.popular ? 'text-white' : 'text-black')}>
            {pricing.price}
          </span>
          <span className={clsx('text-xl', pricing.popular ? 'text-white/80' : 'text-gray-600')}>
            {pricing.currency}
          </span>
        </div>
      </div>

      {/* Features */}
      <ul className={clsx('space-y-3 mb-8', isCompact && 'space-y-2')}>
        {pricing.features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            {feature.icon ? (
              <div className={clsx('mt-0.5 flex-shrink-0', pricing.popular ? 'text-white' : 'text-black')}>
                {feature.icon}
              </div>
            ) : (
              <CheckCircle
                className={clsx('w-5 h-5 mt-0.5 flex-shrink-0', pricing.popular ? 'text-white' : 'text-black')}
                aria-hidden="true"
              />
            )}
            <span className={clsx('text-sm', pricing.popular ? 'text-white/90' : 'text-gray-700')}>
              {feature.text}
            </span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      {pricing.ctaHref ? (
        <ButtonLink
          href={pricing.ctaHref}
          variant={pricing.popular ? 'primary' : 'outline'}
          className={clsx(
            'w-full px-6 py-3 font-black border-2 transition-all duration-200 rounded-none',
            pricing.popular
              ? 'bg-white text-black border-white hover:bg-gray-100'
              : 'border-black hover:bg-black hover:text-white'
          )}
        >
          {pricing.ctaText || 'Choisir ce tarif'}
        </ButtonLink>
      ) : pricing.onCtaClick ? (
        <Button
          onClick={pricing.onCtaClick}
          variant={pricing.popular ? 'primary' : 'outline'}
          className={clsx(
            'w-full px-6 py-3 font-black border-2 transition-all duration-200 rounded-none',
            pricing.popular
              ? 'bg-white text-black border-white hover:bg-gray-100'
              : 'border-black hover:bg-black hover:text-white'
          )}
        >
          {pricing.ctaText || 'Choisir ce tarif'}
        </Button>
      ) : null}
    </SwissCard>
  );
}
