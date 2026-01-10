/**
 * Checkout Page
 * Booking form with summary
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container } from '@/components/ui';
import SwissDivider from '@/components/masterclass/SwissDivider';
import BookingForm from '@/components/masterclass/BookingForm';
import BookingSummary, { type BookingSummaryData } from '@/components/masterclass/BookingSummary';
import { masterclassAPI, type CityEvent } from '@/lib/api/masterclass';
import { bookingsAPI, type BookingCreate } from '@/lib/api/bookings';
import { logger } from '@/lib/logger';

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cityEventIdParam = searchParams.get('cityEventId');

  const [cityEvent, setCityEvent] = useState<CityEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cityEventIdParam) {
      loadCityEvent();
    } else {
      router.push('/book');
    }
  }, [cityEventIdParam, router]);

  const loadCityEvent = async () => {
    try {
      setIsLoading(true);
      const eventId = parseInt(cityEventIdParam!, 10);
      const event = await masterclassAPI.getCityEvent(eventId);
      setCityEvent(event);
    } catch (err) {
      logger.error('Failed to load city event', err instanceof Error ? err : new Error(String(err)));
      setError('Événement non trouvé');
    } finally {
      setIsLoading(false);
    }
  };

  const getEventDate = (event: CityEvent) => {
    return event.event_date || event.start_date;
  };

  const handleSubmit = async (formData: any) => {
    if (!cityEvent || !cityEventIdParam) {
      setError('Événement non sélectionné');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      // Calculate pricing based on ticket type and quantity
      const basePrice = Number(cityEvent.regular_price || cityEvent.price || cityEvent.event?.price || 550);
      let ticketPrice = basePrice;
      
      // Check if early bird deadline has passed
      const isEarlyBird = cityEvent.early_bird_deadline 
        ? new Date(cityEvent.early_bird_deadline) > new Date()
        : false;
      
      if (formData.ticket_type === 'EARLY_BIRD' && isEarlyBird && cityEvent.early_bird_price) {
        ticketPrice = Number(cityEvent.early_bird_price);
      } else if (formData.ticket_type === 'GROUP' && formData.quantity >= 3) {
        const groupDiscount = Number(cityEvent.group_discount_percentage || 0) / 100;
        ticketPrice = basePrice * (1 - groupDiscount);
      }

      const subtotal = ticketPrice * formData.quantity;
      const discount = basePrice * formData.quantity - subtotal;
      const total = subtotal;

      // Prepare booking data
      const bookingData: BookingCreate = {
        city_event_id: parseInt(cityEventIdParam, 10),
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (error && !cityEvent) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => router.push('/book')}
            className="px-6 py-2 bg-black text-white font-bold hover:bg-gray-900 transition-colors"
          >
            Retour à la sélection
          </button>
        </div>
      </div>
    );
  }

  if (!cityEvent || !cityEvent.event) {
    return null;
  }

  // Calculate pricing for summary (default values, will be updated by form)
  const calculatePricing = (ticketType: string = 'REGULAR', quantity: number = 1) => {
    const basePrice = Number(cityEvent.regular_price || cityEvent.price || 550);
    let ticketPrice = basePrice;
    
    const isEarlyBird = cityEvent.early_bird_deadline 
      ? new Date(cityEvent.early_bird_deadline) > new Date()
      : false;
    
    if (ticketType === 'EARLY_BIRD' && isEarlyBird && cityEvent.early_bird_price) {
      ticketPrice = Number(cityEvent.early_bird_price);
    } else if (ticketType === 'GROUP' && quantity >= 3) {
      const groupDiscount = Number(cityEvent.group_discount_percentage || 0) / 100;
      ticketPrice = basePrice * (1 - groupDiscount);
    }

    const subtotal = ticketPrice * quantity;
    const discount = basePrice * quantity - subtotal;
    const total = subtotal;

    return { subtotal, discount, total, ticketPrice };
  };

  const defaultPricing = calculatePricing();
  
  const summaryData: BookingSummaryData = {
    city: cityEvent.city?.name_fr || cityEvent.city?.name_en || '',
    venue_name: cityEvent.venue?.name || '',
    venue_address: cityEvent.venue?.address || undefined,
    event_date: getEventDate(cityEvent),
    start_time: cityEvent.start_time,
    end_time: cityEvent.end_time,
    quantity: 1,
    ticket_type: 'REGULAR',
    subtotal: defaultPricing.subtotal,
    discount: defaultPricing.discount,
    total: defaultPricing.total,
    currency: cityEvent.currency || 'EUR',
  };

  return (
    <div className="min-h-screen bg-white">
      <Container className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <button
              onClick={() => router.push(`/book?cityEventId=${cityEventIdParam}`)}
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
            <div className="mb-8 p-4 bg-red-50 border border-red-200">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Form and Summary Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Booking Form */}
            <div className="lg:col-span-2">
              <BookingForm
                cityEventId={parseInt(cityEventIdParam!, 10)}
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
