/**
 * Checkout Page
 * Booking form with summary - using static city data
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container } from '@/components/ui';
import SwissDivider from '@/components/masterclass/SwissDivider';
import SwissCard from '@/components/masterclass/SwissCard';
import BookingForm from '@/components/masterclass/BookingForm';
import BookingSummary, { type BookingSummaryData } from '@/components/masterclass/BookingSummary';
import { bookingsAPI } from '@/lib/api/bookings';
import { logger } from '@/lib/logger';
import { animationVariants, combineAnimations } from '@/lib/animations/micro-interactions';
import { Hexagon } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get static data from query params
  const cityParam = searchParams.get('city');
  const dateParam = searchParams.get('date');
  const priceParam = searchParams.get('price');
  const currencyParam = searchParams.get('currency');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If no static data, redirect to book page
    if (!cityParam || !dateParam || !priceParam) {
      router.push('/book');
    }
  }, [cityParam, dateParam, priceParam, router]);

  const handleSubmit = async (formData: any) => {
    if (!cityParam || !dateParam || !priceParam) {
      setError('Données de réservation manquantes');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // Convert ticket_type from 'REGULAR'/'EARLY_BIRD'/'GROUP' to 'regular'/'early_bird'/'group' for backend
      const convertTicketType = (type: string): 'regular' | 'early_bird' | 'group' => {
        if (type === 'EARLY_BIRD') return 'early_bird';
        if (type === 'GROUP') return 'group';
        return 'regular';
      };

      // Prepare booking data
      // Note: Using hardcoded city_event_id = 1 (must exist in backend)
      const bookingData: any = {
        city_event_id: 1,
        attendee_name: formData.attendee_name,
        attendee_email: formData.attendee_email,
        attendee_phone: formData.attendee_phone || undefined,
        ticket_type: convertTicketType(formData.ticket_type),
        quantity: formData.quantity,
        // Additional attendees for group bookings
        attendees: formData.additional_attendees || undefined,
      };

      // Create booking
      const booking = await bookingsAPI.create(bookingData);

      // Redirect to payment page with booking reference
      router.push(`/book/payment?bookingReference=${booking.booking_reference}`);
    } catch (err) {
      logger.error('Failed to create booking', err instanceof Error ? err : new Error(String(err)));
      setError(
        err instanceof Error
          ? err.message
          : 'Erreur lors de la création de la réservation. Veuillez réessayer.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!cityParam || !dateParam || !priceParam) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Redirection...</p>
        </div>
      </div>
    );
  }

  const basePrice = Number(priceParam);
  const currency = currencyParam || 'CAD';

  // Calculate pricing for summary
  const calculatePricing = (ticketType: string = 'REGULAR', quantity: number = 1) => {
    let ticketPrice = basePrice;
    
    if (ticketType === 'EARLY_BIRD') {
      ticketPrice = 450;
    } else if (ticketType === 'GROUP' && quantity >= 3) {
      ticketPrice = 400;
    }

    const subtotal = ticketPrice * quantity;
    const discount = (basePrice * quantity) - subtotal;
    const total = subtotal;

    return { subtotal, discount, total, ticketPrice };
  };

  const defaultPricing = calculatePricing();
  
  const summaryData: BookingSummaryData = {
    city: cityParam,
    venue_name: '',
    venue_address: undefined,
    event_date: dateParam,
    start_time: '09:00:00',
    end_time: '17:00:00',
    quantity: 1,
    ticket_type: 'REGULAR',
    subtotal: defaultPricing.subtotal,
    discount: defaultPricing.discount,
    total: defaultPricing.total,
    currency: currency,
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white text-gray-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-[#1F2937] via-[#111827] to-[#0F172A]">
        {/* Grille hexagonale subtile en arrière-plan */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexPatternCheckout" x="0" y="0" width="100" height="86.6" patternUnits="userSpaceOnUse">
                <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexPatternCheckout)" />
          </svg>
        </div>

        {/* Motif de vagues subtil */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,400 Q300,300 600,400 T1200,400" stroke="white" strokeWidth="2" fill="none" />
            <path d="M0,450 Q300,350 600,450 T1200,450" stroke="white" strokeWidth="2" fill="none" />
            <path d="M0,500 Q300,400 600,500 T1200,500" stroke="white" strokeWidth="2" fill="none" />
          </svg>
        </div>

        <Container className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="mb-16">
            <button
              onClick={() => router.push('/book')}
              className={combineAnimations(
                animationVariants.hero.cta,
                "text-gray-400 hover:text-white mb-8 text-sm font-medium transition-colors"
              )}
            >
              ← Retour à la sélection
            </button>
            <h1 className={combineAnimations(
              animationVariants.hero.title,
              "swiss-display text-6xl md:text-8xl mb-6 text-white"
            )}>
              Finaliser la réservation
            </h1>
            <SwissDivider className="mb-8" />
            <p className={combineAnimations(
              animationVariants.hero.subtitle,
              "text-xl text-gray-300 max-w-3xl"
            )}>
              Complétez vos informations pour réserver votre place à la masterclass ACT avec Russ Harris.
            </p>
          </div>
        </Container>
      </section>

      {/* Form Section */}
      <section className="py-20 md:py-32 bg-white">
        <Container className="max-w-7xl mx-auto px-4">
          {/* Error Display */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 border-2 border-red-300 rounded-lg">
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          )}

          {/* Form and Summary Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <SwissCard className="p-8 md:p-10">
                {/* Hexagone décoratif */}
                <div className="absolute -top-10 -right-10 w-32 h-32 opacity-5 hidden md:block">
                  <Hexagon className="w-full h-full text-[#FF8C42]" />
                </div>
                <BookingForm
                  cityEventId={1} // Default event ID for static bookings
                  onSubmit={handleSubmit}
                  isLoading={isSubmitting}
                />
              </SwissCard>
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <SwissCard className="p-8 border-2 border-black">
                  {/* Hexagone décoratif */}
                  <div className="absolute -bottom-10 -left-10 w-24 h-24 opacity-5 hidden md:block">
                    <Hexagon className="w-full h-full text-gray-900" />
                  </div>
                  <BookingSummary data={summaryData} />
                </SwissCard>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
