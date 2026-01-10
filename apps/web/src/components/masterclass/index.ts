/**
 * Masterclass Components
 * Components spécifiques pour le site Russ Harris Masterclass
 */

// Swiss Style Components (BATCH 4)
// HeroSection exported separately to avoid TypeScript module resolution issues in Docker builds
// Import directly: import HeroSection from '@/components/masterclass/HeroSection'
export { default as UrgencyBadge } from './UrgencyBadge';
export { default as AvailabilityBar } from './AvailabilityBar';
export { default as SwissDivider } from './SwissDivider';
export { default as SwissCard } from './SwissCard';
export { default as BookingForm } from './BookingForm';
export { default as BookingSummary } from './BookingSummary';
export { default as BookingStripeCheckout } from './BookingStripeCheckout';
export { default as BenefitsGrid } from './BenefitsGrid';
export { default as ProgramPreview } from './ProgramPreview';
export { default as CityCard } from './CityCard';
export type { BookingSummaryData } from './BookingSummary';
export type { Benefit } from './BenefitsGrid';
