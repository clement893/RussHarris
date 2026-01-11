/**
 * Payment Page
 * Payment processing page (Stripe integration will be in BATCH 7)
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container } from '@/components/ui';
import SwissDivider from '@/components/masterclass/SwissDivider';
import SwissCard from '@/components/masterclass/SwissCard';
import { Lock } from 'lucide-react';
import { bookingsAPI, type BookingResponse } from '@/lib/api/bookings';
import BookingStripeCheckout from '@/components/masterclass/BookingStripeCheckout';
import { logger } from '@/lib/logger';

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingReference = searchParams.get('bookingReference');

  const [booking, setBooking] = useState<BookingResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  useEffect(() => {
    if (bookingReference) {
      loadBooking();
    } else {
      setError('Référence de réservation manquante');
      setIsLoading(false);
    }
  }, [bookingReference]);

  const loadBooking = async () => {
    try {
      setIsLoading(true);
      const bookingData = await bookingsAPI.getByReference(bookingReference!);
      setBooking(bookingData);

      // If already paid, redirect to confirmation
      if (bookingData.payment_status === 'PAID') {
        router.push(`/book/confirmation?bookingReference=${bookingReference}`);
      }
    } catch (err) {
      logger.error('Failed to load booking', err instanceof Error ? err : new Error(String(err)));
      setError('Réservation non trouvée');
    } finally {
      setIsLoading(false);
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

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h1 className="text-4xl font-black text-black mb-4">Erreur</h1>
            <p className="text-gray-600 mb-8">{error || 'Réservation non trouvée'}</p>
            <button
              onClick={() => router.push('/book')}
              className="px-8 py-3 bg-black text-white font-bold hover:bg-gray-900 transition-colors"
            >
              Retour à la réservation
            </button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Container className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="swiss-display text-6xl md:text-8xl mb-6 text-black">
              Paiement
            </h1>
            <SwissDivider className="mx-auto max-w-md" />
            <p className="text-xl text-gray-600 mt-6">
              Référence : {booking.booking_reference}
            </p>
          </div>

          {/* Payment Summary */}
          <SwissCard className="p-8 mb-8">
            <h2 className="text-3xl font-black text-black mb-6">Récapitulatif</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <span className="text-gray-600">Sous-total</span>
                <span className="text-black font-bold">
                  {booking.subtotal.toFixed(2)} EUR
                </span>
              </div>
              {booking.discount > 0 && (
                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <span className="text-gray-600">Réduction</span>
                  <span className="text-green-600 font-bold">
                    -{booking.discount.toFixed(2)} EUR
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between pt-4">
                <span className="text-xl font-black text-black">Total</span>
                <span className="text-3xl font-black text-black">
                  {booking.total.toFixed(2)} EUR
                </span>
              </div>
            </div>
          </SwissCard>

          {/* Payment Form */}
          <SwissCard className="p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Lock className="w-6 h-6 text-black" aria-hidden="true" />
              <h2 className="text-3xl font-black text-black">Paiement sécurisé</h2>
            </div>
            
            {paymentError && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded">
                <p className="text-sm text-red-600">{paymentError}</p>
              </div>
            )}

            <BookingStripeCheckout
              bookingId={booking.id}
              amount={Number(booking.total)}
              currency="EUR"
              onSuccess={() => {
                // Redirect to confirmation page after successful payment
                router.push(`/book/confirmation?bookingReference=${bookingReference}`);
              }}
              onError={(errorMessage) => {
                setPaymentError(errorMessage);
              }}
            />

            {/* Back button */}
            <div className="mt-8">
              <button
                onClick={() => router.push(`/book/checkout?cityEventId=${booking.city_event_id}`)}
                className="w-full px-8 py-3 border border-black text-black font-bold hover:bg-black hover:text-white transition-colors"
              >
                Retour au formulaire
              </button>
            </div>
          </SwissCard>

          {/* Security Notice */}
          <div className="text-center text-sm text-gray-600">
            <p>🔒 Paiement sécurisé via Stripe. Vos informations bancaires sont protégées.</p>
          </div>
        </div>
      </Container>
    </div>
  );
}
