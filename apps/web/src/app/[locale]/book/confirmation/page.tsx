/**
 * Booking Confirmation Page
 * Displays confirmation after successful booking
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Container } from '@/components/ui';
import SwissDivider from '@/components/masterclass/SwissDivider';
import SwissCard from '@/components/masterclass/SwissCard';
import { CheckCircle, Calendar, MapPin, Mail, FileText } from 'lucide-react';
import { bookingsAPI, type BookingSummaryResponse } from '@/lib/api/bookings';
import { logger } from '@/lib/logger';

export default function ConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingReference = searchParams.get('bookingReference');

  const [bookingSummary, setBookingSummary] = useState<BookingSummaryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (bookingReference) {
      loadBookingSummary();
    } else {
      setError('Référence de réservation manquante');
      setIsLoading(false);
    }
  }, [bookingReference]);

  const loadBookingSummary = async () => {
    try {
      setIsLoading(true);
      const summary = await bookingsAPI.getSummary(bookingReference!);
      setBookingSummary(summary);
    } catch (err) {
      logger.error('Failed to load booking summary', err instanceof Error ? err : new Error(String(err)));
      setError('Réservation non trouvée');
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Chargement de la confirmation...</p>
        </div>
      </div>
    );
  }

  if (error || !bookingSummary) {
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
          {/* Success Message */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" aria-hidden="true" />
            </div>
            <h1 className="swiss-display text-6xl md:text-8xl mb-6 text-black">
              Réservation confirmée !
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Votre réservation a été créée avec succès.
            </p>
            <p className="text-lg font-bold text-black">
              Référence : {bookingSummary.booking_reference}
            </p>
          </div>

          <SwissDivider className="my-16" />

          {/* Booking Details */}
          <SwissCard className="p-8 mb-8">
            <h2 className="text-3xl font-black text-black mb-6">Détails de la réservation</h2>

            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-gray-600" aria-hidden="true" />
                  <span className="text-sm font-bold text-gray-600">Ville</span>
                </div>
                <p className="text-lg text-black">{bookingSummary.city_fr || bookingSummary.city}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-5 h-5 text-gray-600" aria-hidden="true" />
                  <span className="text-sm font-bold text-gray-600">Lieu</span>
                </div>
                <p className="text-lg text-black">{bookingSummary.venue_name}</p>
                {bookingSummary.venue_address && (
                  <p className="text-sm text-gray-600 mt-1">{bookingSummary.venue_address}</p>
                )}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-5 h-5 text-gray-600" aria-hidden="true" />
                  <span className="text-sm font-bold text-gray-600">Dates</span>
                </div>
                <p className="text-lg text-black">
                  Du {formatDate(bookingSummary.start_date)} au {formatDate(bookingSummary.end_date)}
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-5 h-5 text-gray-600" aria-hidden="true" />
                  <span className="text-sm font-bold text-gray-600">Participant</span>
                </div>
                <p className="text-lg text-black">{bookingSummary.attendee_name}</p>
                <p className="text-sm text-gray-600">{bookingSummary.attendee_email}</p>
              </div>

              <div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span className="text-lg font-bold text-black">
                    {bookingSummary.quantity} billet{bookingSummary.quantity > 1 ? 's' : ''}
                  </span>
                  <span className="text-2xl font-black text-black">
                    {bookingSummary.total.toFixed(2)} EUR
                  </span>
                </div>
              </div>
            </div>
          </SwissCard>

          {/* Payment Status */}
          <SwissCard className="p-8 mb-8">
            <h2 className="text-3xl font-black text-black mb-6">Statut du paiement</h2>
            <div className="flex items-center gap-3">
              <div className={`px-4 py-2 rounded ${
                bookingSummary.payment_status === 'PAID'
                  ? 'bg-green-100 text-green-800'
                  : bookingSummary.payment_status === 'PENDING'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {bookingSummary.payment_status === 'PAID' && '✓ Paiement reçu'}
                {bookingSummary.payment_status === 'PENDING' && '⏳ Paiement en attente'}
                {bookingSummary.payment_status === 'FAILED' && '✗ Paiement échoué'}
              </div>
              {bookingSummary.payment_status === 'PENDING' && (
                <button
                  onClick={() => router.push(`/book/payment?bookingReference=${bookingReference}`)}
                  className="px-6 py-2 bg-black text-white font-bold hover:bg-gray-900 transition-colors"
                >
                  Procéder au paiement
                </button>
              )}
            </div>
          </SwissCard>

          {/* Next Steps */}
          <SwissCard className="p-8 mb-8">
            <h2 className="text-3xl font-black text-black mb-6">Prochaines étapes</h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Vous recevrez un email de confirmation dans les prochaines minutes avec tous les détails.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Un email de rappel sera envoyé 30 jours avant l'événement.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Les informations pratiques (adresse, horaires, ressources) seront partagées par email.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" aria-hidden="true" />
                <span>Vous pouvez consulter votre réservation à tout moment en utilisant votre référence.</span>
              </li>
            </ul>
          </SwissCard>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => router.push('/')}
              className="px-8 py-3 border border-black text-black font-bold hover:bg-black hover:text-white transition-colors"
            >
              Retour à l'accueil
            </button>
            <button
              onClick={() => window.print()}
              className="px-8 py-3 bg-black text-white font-bold hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" aria-hidden="true" />
              Imprimer la confirmation
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
