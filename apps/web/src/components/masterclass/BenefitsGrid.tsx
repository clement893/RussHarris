/**
 * BenefitsGrid Component
 * Grid displaying key benefits of the masterclass
 * Swiss Style: clean, minimal, black/white
 */

'use client';

import { ReactNode } from 'react';
import { clsx } from 'clsx';
import SwissCard from './SwissCard';

export interface Benefit {
  icon: ReactNode;
  title: string;
  description: string;
}

interface BenefitsGridProps {
  benefits: Benefit[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function BenefitsGrid({
  benefits,
  title,
  subtitle,
  className,
}: BenefitsGridProps) {
  return (
    <section className={clsx('bg-white py-20 md:py-32', className)} aria-labelledby="benefits-heading">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          {(title || subtitle) && (
            <div className="mb-16 text-center">
              {title && (
                <h2 id="benefits-heading" className="swiss-display text-5xl md:text-6xl font-black text-black mb-6">
                  {title}
                </h2>
              )}
              {subtitle && (
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <SwissCard
                key={index}
                className="p-8 text-center border-2 border-black hover:bg-black hover:text-white transition-all duration-200 group"
              >
                <div className="flex justify-center mb-6">
                  <div className="text-black group-hover:text-white [&_svg]:w-12 [&_svg]:h-12">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-xl font-black text-black mb-4 group-hover:text-white">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed group-hover:text-white/90">
                  {benefit.description}
                </p>
              </SwissCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
