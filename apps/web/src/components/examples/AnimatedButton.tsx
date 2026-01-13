/**
 * Animated Button Component
 * 
 * Example component demonstrating various button micro-interactions.
 * Shows different animation effects: glow, shimmer, ripple, pulse.
 */

'use client';

import { Button, ButtonProps } from '@/components/ui';
import { microInteractions, combineAnimations } from '@/lib/animations/micro-interactions';
import { ReactNode } from 'react';

interface AnimatedButtonProps extends ButtonProps {
  animation?: 'glow' | 'shimmer' | 'ripple' | 'pulse' | 'bounce' | 'default';
  children: ReactNode;
}

export function AnimatedButton({
  animation = 'default',
  className,
  children,
  ...props
}: AnimatedButtonProps) {
  const animationClasses = {
    default: combineAnimations(
      microInteractions.button.base,
      microInteractions.button.hover
    ),
    glow: combineAnimations(
      microInteractions.button.base,
      microInteractions.button.glow,
      microInteractions.button.hover
    ),
    shimmer: combineAnimations(
      microInteractions.button.base,
      microInteractions.button.shimmer,
      microInteractions.button.hover
    ),
    ripple: combineAnimations(
      microInteractions.button.base,
      microInteractions.button.ripple,
      microInteractions.button.hover
    ),
    pulse: combineAnimations(
      microInteractions.button.base,
      microInteractions.button.pulse,
      microInteractions.button.hover
    ),
    bounce: combineAnimations(
      microInteractions.button.base,
      microInteractions.button.bounce,
      microInteractions.button.hover
    ),
  };

  return (
    <Button
      className={combineAnimations(
        animationClasses[animation],
        className || ''
      )}
      {...props}
    >
      {children}
    </Button>
  );
}
