/**
 * TestimonialPreview Component
 * Preview section of testimonials for homepage
 * Swiss Style: clean, minimal, black/white
 */

'use client';

import { useState } from 'react';
import { Container } from '@/components/ui';
import SwissDivider from './SwissDivider';
import SwissCard from './SwissCard';
import ButtonLink from '@/components/ui/ButtonLink';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { clsx } from 'clsx';

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  location: string;
  rating: number;
  text: string;
  photo?: string;
}

interface TestimonialPreviewProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
  maxVisible?: number;
  className?: string;
}

export default function TestimonialPreview({
  testimonials,
  title = 'Ce que disent nos participants',
  subtitle,
  maxVisible = 3,
  className,
}: TestimonialPreviewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleTestimonials = testimonials.slice(0, maxVisible);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % visibleTestimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + visibleTestimonials.length) % visibleTestimonials.length);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
  };

  const currentTestimonial = visibleTestimonials[currentIndex];

  if (visibleTestimonials.length === 0 || !currentTestimonial) {
    return null;
  }

  return (
    <section className={clsx('bg-gray-50 py-20 md:py-32', className)} aria-labelledby="testimonials-preview-heading">
      <Container>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-16 text-center">
            <h2 id="testimonials-preview-heading" className="swiss-display text-5xl md:text-6xl font-black text-black mb-6">
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

          {/* Testimonial Carousel */}
          <div className="mb-12">
            <SwissCard className="p-8 md:p-12 border-2 border-black relative">
              {/* Quote Icon */}
              <div className="absolute top-8 left-8 text-gray-200">
                <Quote className="w-12 h-12" aria-hidden="true" />
              </div>

              {/* Testimonial Content */}
              <div className="relative z-10">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-black text-black" aria-hidden="true" />
                  ))}
                </div>

                {/* Text */}
                <blockquote className="text-xl md:text-2xl font-normal text-black mb-8 leading-relaxed">
                  "{currentTestimonial.text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-lg font-black text-black">{currentTestimonial.name}</p>
                    <p className="text-sm text-gray-600">{currentTestimonial.role}</p>
                    <p className="text-sm text-gray-600">{currentTestimonial.location}</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              {visibleTestimonials.length > 1 && (
                <div className="absolute bottom-8 right-8 flex items-center gap-2">
                  <button
                    onClick={prevTestimonial}
                    className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all duration-200 rounded-none"
                    aria-label="Témoignage précédent"
                  >
                    <ChevronLeft className="w-5 h-5" aria-hidden="true" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="p-2 border-2 border-black hover:bg-black hover:text-white transition-all duration-200 rounded-none"
                    aria-label="Témoignage suivant"
                  >
                    <ChevronRight className="w-5 h-5" aria-hidden="true" />
                  </button>
                </div>
              )}
            </SwissCard>

            {/* Indicators */}
            {visibleTestimonials.length > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                {visibleTestimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToTestimonial(index)}
                    className={clsx(
                      'w-3 h-3 border-2 border-black transition-all duration-200 rounded-none',
                      index === currentIndex ? 'bg-black' : 'bg-white hover:bg-gray-200'
                    )}
                    aria-label={`Aller au témoignage ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="text-center">
            <ButtonLink
              href="/testimonials"
              variant="outline"
              className="px-8 py-4 text-lg font-black border-2 border-black hover:bg-black hover:text-white transition-all duration-200 rounded-none"
            >
              Voir tous les témoignages
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
