/**
 * BookingStripeCheckout Component
 * Stripe Elements integration for booking payments
 */

'use client';

import { useState, useEffect } from 'react';
import { loadStripe, StripeElementsOptions, Stripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { CreditCard, Lock, AlertCircle } from 'lucide-react';
import { bookingsAPI } from '@/lib/api/bookings';
import { logger } from '@/lib/logger';

// Initialize Stripe with publishable key (memoized)
let stripePromise: Promise<Stripe | null> | null = null;

const getStripe = (): Promise<Stripe | null> => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
    if (publishableKey) {
      stripePromise = loadStripe(publishableKey);
    } else {
      stripePromise = Promise.resolve(null);
    }
  }
  return stripePromise;
};

interface BookingStripeCheckoutProps {
  bookingId: number;
  amount: number;
  currency: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

interface CheckoutFormProps {
  clientSecret: string;
  amount: number;
  currency: string;
  onSuccess: () => void;
  onError: (error: string) => void;
}

function CheckoutForm({ clientSecret, amount, currency, onSuccess, onError }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setError('Stripe n\'est pas encore chargé. Veuillez réessayer.');
      return;
    }

    setIsProcessing(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError('Élément de carte introuvable');
      setIsProcessing(false);
      return;
    }

    try {
      // Confirm payment with Stripe using CardElement
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (stripeError) {
        setError(stripeError.message || 'Erreur lors du paiement');
        onError(stripeError.message || 'Erreur lors du paiement');
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        // Payment succeeded - webhook will update booking status
        // Wait a moment for webhook to process, then redirect
        setTimeout(() => {
          onSuccess();
        }, 1000);
      } else {
        setError('Paiement échoué. Veuillez réessayer.');
        onError('Paiement échoué');
      }
    } catch (err) {
      logger.error('Payment error', err instanceof Error ? err : new Error(String(err)));
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors du paiement';
      setError(errorMessage);
      onError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#1a1a1a',
        '::placeholder': {
          color: '#a0a0a0',
        },
      },
      invalid: {
        color: '#dc2626',
        iconColor: '#dc2626',
      },
    },
    hidePostalCode: true,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-bold text-black mb-2">
          Informations de carte bancaire
        </label>
        <div className="p-4 border border-gray-300 bg-white rounded">
          <CardElement options={cardElementOptions} />
        </div>
        {error && (
          <div className="mt-3 flex items-center gap-2 text-sm text-red-600">
            <AlertCircle className="w-4 h-4" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Lock className="w-4 h-4" aria-hidden="true" />
        <span>Vos informations sont sécurisées et cryptées par Stripe</span>
      </div>

      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full px-8 py-4 bg-black text-white font-bold text-lg hover:bg-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <span className="animate-spin">⏳</span>
            Traitement en cours...
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5" aria-hidden="true" />
            Payer {amount.toFixed(2)} {currency}
          </>
        )}
      </button>
    </form>
  );
}

export default function BookingStripeCheckout({
  bookingId,
  amount,
  currency,
  onSuccess,
  onError,
}: BookingStripeCheckoutProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPaymentIntent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookingId]);

  const loadPaymentIntent = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const paymentIntent = await bookingsAPI.createPaymentIntent(bookingId);
      setClientSecret(paymentIntent.client_secret);
    } catch (err) {
      logger.error('Failed to create payment intent', err instanceof Error ? err : new Error(String(err)));
      const errorMessage = err instanceof Error ? err.message : 'Impossible de créer l\'intention de paiement';
      setError(errorMessage);
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  if (!publishableKey) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" aria-hidden="true" />
        <p className="text-red-600 mb-4">
          Clé publique Stripe non configurée. Veuillez définir NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.
        </p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Chargement du formulaire de paiement...</p>
      </div>
    );
  }

  if (error || !clientSecret) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" aria-hidden="true" />
        <p className="text-red-600 mb-4">{error || 'Impossible de charger le formulaire de paiement'}</p>
        <button
          onClick={loadPaymentIntent}
          className="px-6 py-2 border border-black text-black font-bold hover:bg-black hover:text-white transition-colors"
        >
          Réessayer
        </button>
      </div>
    );
  }

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#000000',
        colorBackground: '#ffffff',
        colorText: '#1a1a1a',
        colorDanger: '#dc2626',
        fontFamily: 'Inter, system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '0px',
      },
    },
  };

  const stripePromise = getStripe();

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm
        clientSecret={clientSecret}
        amount={amount}
        currency={currency}
        onSuccess={onSuccess}
        onError={onError}
      />
    </Elements>
  );
}
