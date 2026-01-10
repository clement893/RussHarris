/**
 * HeroSection Component
 *
 * Full-width hero section for masterclass landing page
 * - Large headline (Swiss style: Inter Bold 900, 72px+)
 * - Dark overlay on background image/video
 * - Prominent CTA button
 * - Responsive mobile/tablet/desktop
 *
 * @component
 */
'use client';

import { ReactNode, HTMLAttributes } from 'react';
import Image from 'next/image';
import { clsx } from 'clsx';
import Button from '@/components/ui/Button';

interface HeroSectionProps extends HTMLAttributes<HTMLElement> {
  /**
   * Main headline (huge text)
   */
  headline: string;
  /**
   * Subheading text
   */
  subheading?: string;
  /**
   * Background image URL
   */
  backgroundImage?: string;
  /**
   * Background image alt text
   */
  backgroundImageAlt?: string;
  /**
   * CTA button text
   */
  ctaText?: string;
  /**
   * CTA button onClick handler
   */
  onCtaClick?: () => void;
  /**
   * Additional content (badges, stats, etc.)
   */
  children?: ReactNode;
  /**
   * Dark overlay opacity (0-100)
   */
  overlayOpacity?: number;
}

export default function HeroSection({
  headline,
  subheading,
  backgroundImage,
  backgroundImageAlt = 'Hero background',
  ctaText = 'Réserver ma place',
  onCtaClick,
  children,
  overlayOpacity = 60,
  className,
  ...props
}: HeroSectionProps) {
  return (
    <section
      className={clsx(
        'relative w-full min-h-[600px] md:min-h-[700px] lg:min-h-[800px]',
        'flex items-center justify-center',
        'overflow-hidden',
        className
      )}
      {...props}
    >
      {/* Background image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt={backgroundImageAlt}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Dark overlay */}
          <div
            className="absolute inset-0 bg-foreground"
            style={{ opacity: overlayOpacity / 100 }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 text-center">
        <div className="flex flex-col items-center space-y-8 md:space-y-10">
          {/* Headline */}
          <h1 className="swiss-display md:text-[80px] lg:text-[96px] text-background max-w-5xl">
            {headline}
          </h1>

          {/* Subheading */}
          {subheading && (
            <p className="text-xl md:text-2xl lg:text-3xl text-background/90 max-w-3xl font-light">
              {subheading}
            </p>
          )}

          {/* Additional content (badges, stats, etc.) */}
          {children && <div className="mt-4">{children}</div>}

          {/* CTA Button */}
          {ctaText && (
            <div className="mt-8 md:mt-12">
              <Button
                variant="primary"
                size="lg"
                onClick={onCtaClick}
                className="px-12 py-4 text-[20px] font-bold bg-foreground text-background hover:bg-background border-2 border-black hover:border-border transition-colors rounded-none"
              >
                {ctaText}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
