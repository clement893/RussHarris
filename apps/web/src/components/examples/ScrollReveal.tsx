/**
 * Scroll Reveal Component
 * 
 * Component that reveals content when it enters the viewport.
 * Uses Intersection Observer API for performance.
 */

'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import { getScrollRevealClasses } from '@/lib/animations/micro-interactions';

interface ScrollRevealProps {
  children: ReactNode;
  threshold?: number;
  delay?: number;
  className?: string;
}

export function ScrollReveal({
  children,
  threshold = 0.1,
  delay = 0,
  className = '',
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const classes = getScrollRevealClasses(threshold);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting && !isVisible) {
          // Add delay if specified
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          // Disconnect after first reveal for performance
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [threshold, delay, isVisible]);

  return (
    <div
      ref={ref}
      className={`${isVisible ? classes.revealed : classes.initial} ${className}`}
    >
      {children}
    </div>
  );
}
