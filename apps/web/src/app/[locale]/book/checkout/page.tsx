/**
 * Checkout Page
 * Booking form with summary - using static city data
 */

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container } from '@/components/ui';
import SwissDivider from '@/components/masterclass/SwissDivider';
import BookingForm from '@/components/masterclass/BookingForm';
import BookingSummary, { type BookingSummaryData } from '@/components/masterclass/BookingSummary';
import { bookingsAPI, type BookingCreate } from '@/lib/api/bookings';
import { logger } from '@/lib/logger';

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

      // Calculate pricing based on ticket type
      const basePrice = Number(priceParam);
      let ticketPrice = basePrice;
      
      if (formData.ticket_type === 'EARLY_BIRD') {
        // Early bird: 450 CAD (18% discount)
        ticketPrice = 450;
      } else if (formData.ticket_type === 'GROUP' && formData.quantity >= 3) {
        // Group: 400 CAD (27% discount)
        ticketPrice = 400;
      }

      const subtotal = ticketPrice * formData.quantity;

      // Prepare booking data
      // Note: Using city_event_id = 1 as default (backend requires it)
      // The backend should have a generic event with id = 1
      const bookingData: BookingCreate = {
        city_event_id: 1, // Default event ID for static bookings
        attendee_name: formData.attendee_name,
        attendee_email: formData.attendee_email,
        attendee_phone: formData.attendee_phone || undefined,
        ticket_type: formData.ticket_type,
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
    <div className="min-h-screen bg-white">
      <Container className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <button
              onClick={() => router.push('/book')}
              className="text-gray-600 hover:text-black mb-6 text-sm font-bold"
            >
              ← Retour à la sélection
            </button>
            <h1 className="swiss-display text-6xl md:text-8xl mb-6 text-black">
              Finaliser la réservation
            </h1>
            <SwissDivider />
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Form and Summary Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <BookingForm
                cityEventId={1} // Default event ID for static bookings
                onSubmit={handleSubmit}
                isLoading={isSubmitting}
              />
            </div>

            {/* Booking Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <BookingSummary data={summaryData} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
