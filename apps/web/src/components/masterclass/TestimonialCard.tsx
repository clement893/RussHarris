/**
 * TestimonialCard Component
 * Reusable card component for displaying individual testimonials
 * Swiss Style: clean, minimal, black/white
 */

'use client';

import { Star, Quote } from 'lucide-react';
import { clsx } from 'clsx';
import SwissCard from './SwissCard';
import type { Testimonial } from './TestimonialPreview';

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
  variant?: 'default' | 'compact';
}

export default function TestimonialCard({
  testimonial,
  className,
  variant = 'default',
}: TestimonialCardProps) {
  const isCompact = variant === 'compact';

  return (
    <SwissCard
      className={clsx(
        'p-6 md:p-8 border-2 border-black',
        'hover:bg-black hover:text-white transition-all duration-200',
        'group relative',
        className
      )}
    >
      {/* Quote Icon */}
      <div className="absolute top-6 left-6 text-gray-200 group-hover:text-white/20">
        <Quote className="w-8 h-8" aria-hidden="true" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Rating */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star
              key={i}
              className={clsx('w-4 h-4 fill-black text-black group-hover:fill-white group-hover:text-white')}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Text */}
        <blockquote
          className={clsx(
            'font-normal text-black group-hover:text-white mb-6 leading-relaxed',
            isCompact ? 'text-base' : 'text-lg md:text-xl'
          )}
        >
          "{testimonial.text}"
        </blockquote>

        {/* Author */}
        <div className="border-t border-gray-300 group-hover:border-white/30 pt-4">
          <p className={clsx('font-black text-black group-hover:text-white', isCompact ? 'text-base' : 'text-lg')}>
            {testimonial.name}
          </p>
          <p className={clsx('text-gray-600 group-hover:text-white/80', isCompact ? 'text-sm' : 'text-base')}>
            {testimonial.role}
          </p>
          {!isCompact && (
            <p className="text-sm text-gray-600 group-hover:text-white/70 mt-1">{testimonial.location}</p>
          )}
        </div>
      </div>
    </SwissCard>
  );
}
