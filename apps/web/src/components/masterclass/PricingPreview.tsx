/**
 * PricingPreview Component
 * Preview section of pricing options for homepage
 * Swiss Style: clean, minimal, black/white
 */

'use client';

import { Container } from '@/components/ui';
import SwissDivider from './SwissDivider';
import SwissCard from './SwissCard';
import ButtonLink from '@/components/ui/ButtonLink';
import { CheckCircle, Tag } from 'lucide-react';
import { clsx } from 'clsx';

export interface PricingOption {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  popular?: boolean;
  features: string[];
  badge?: string;
}

interface PricingPreviewProps {
  pricingOptions: PricingOption[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function PricingPreview({
  pricingOptions,
  title = 'Tarifs & Options',
  subtitle,
  className,
}: PricingPreviewProps) {
  if (pricingOptions.length === 0) {
    return null;
  }

  return (
    <section className={clsx('bg-white py-20 md:py-32', className)} aria-labelledby="pricing-preview-heading">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-16 text-center">
            <h2 id="pricing-preview-heading" className="swiss-display text-5xl md:text-6xl font-black text-black mb-6">
              {title}
            </h2>
            {subtitle && (
              <>
                <SwissDivider className="mx-auto max-w-md" />
                <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
                  {subtitle}
                </p>
              </>
            )}
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {pricingOptions.map((option) => (
              <SwissCard
                key={option.id}
                className={clsx(
                  'p-8 border-2 border-black relative',
                  option.popular && 'bg-black text-white',
                  !option.popular && 'hover:bg-black hover:text-white transition-all duration-200'
                )}
              >
                {/* Popular Badge */}
                {option.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-black text-white px-4 py-1 text-sm font-black border-2 border-black">
                      Populaire
                    </div>
                  </div>
                )}

                {/* Badge (Early Bird, etc.) */}
                {option.badge && (
                  <div className="mb-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 border-2 border-black text-xs font-black">
                      <Tag className="w-3 h-3" aria-hidden="true" />
                      {option.badge}
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className="mb-6">
                  <h3 className={clsx('text-2xl font-black mb-2', option.popular ? 'text-white' : 'text-black')}>
                    {option.name}
                  </h3>
                  <p className={clsx('text-sm mb-4', option.popular ? 'text-white/80' : 'text-gray-600')}>
                    {option.description}
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className={clsx('text-5xl font-black', option.popular ? 'text-white' : 'text-black')}>
                      {option.price}
                    </span>
                    <span className={clsx('text-xl', option.popular ? 'text-white/80' : 'text-gray-600')}>
                      {option.currency}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {option.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle
                        className={clsx('w-5 h-5 mt-0.5 flex-shrink-0', option.popular ? 'text-white' : 'text-black')}
                        aria-hidden="true"
                      />
                      <span className={clsx('text-sm', option.popular ? 'text-white/90' : 'text-gray-700')}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <ButtonLink
                  href="/pricing"
                  variant={option.popular ? 'primary' : 'outline'}
                  className={clsx(
                    'w-full px-6 py-3 font-black border-2 transition-all duration-200 rounded-none',
                    option.popular
                      ? 'bg-white text-black border-white hover:bg-gray-100'
                      : 'border-black hover:bg-black hover:text-white'
                  )}
                >
                  {option.id === 'group' ? 'Contacter pour groupe' : 'Voir les tarifs'}
                </ButtonLink>
              </SwissCard>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center">
            <ButtonLink
              href="/pricing"
              variant="outline"
              className="px-8 py-4 text-lg font-black border-2 border-black hover:bg-black hover:text-white transition-all duration-200 rounded-none"
            >
              Voir tous les tarifs et options
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
