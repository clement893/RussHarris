/**
 * BookingSummary Component
 * Displays booking summary with details and pricing
 */

'use client';

import { Calendar, MapPin, Users } from 'lucide-react';
import SwissCard from './SwissCard';

export interface BookingSummaryData {
  city: string;
  venue_name: string;
  venue_address?: string;
  event_date: string;
  start_time: string;
  end_time: string;
  quantity: number;
  ticket_type: 'EARLY_BIRD' | 'REGULAR' | 'GROUP';
  subtotal: number;
  discount: number;
  total: number;
  currency: string;
}

interface BookingSummaryProps {
  data: BookingSummaryData;
  className?: string;
}

export default function BookingSummary({ data, className }: BookingSummaryProps) {
  const formatDate = (dateString: string) => {
    // If the date is already formatted (e.g., "31 mai - 1 juin 2026"), return it as is
    // Otherwise, try to parse and format it
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      // If date is invalid, return the original string (already formatted)
      return dateString;
    }
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const formatTime = (timeString: string) => {
    return timeString.substring(0, 5);
  };

  const getTicketTypeLabel = (type: string) => {
    switch (type) {
      case 'EARLY_BIRD':
        return 'Early Bird';
      case 'REGULAR':
        return 'Standard';
      case 'GROUP':
        return 'Groupe';
      default:
        return type;
    }
  };

  return (
    <SwissCard className={`p-8 ${className || ''}`}>
      <h2 className="text-3xl font-black text-black mb-6">Récapitulatif</h2>

      <div className="space-y-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-gray-600" aria-hidden="true" />
            <span className="text-sm font-bold text-gray-600">Ville</span>
          </div>
          <p className="text-lg text-black">{data.city}</p>
        </div>

        {data.venue_name && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-gray-600" aria-hidden="true" />
              <span className="text-sm font-bold text-gray-600">Lieu</span>
            </div>
            <p className="text-lg text-black">{data.venue_name}</p>
            {data.venue_address && (
              <p className="text-sm text-gray-600 mt-1">{data.venue_address}</p>
            )}
          </div>
        )}

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-gray-600" aria-hidden="true" />
            <span className="text-sm font-bold text-gray-600">Date</span>
          </div>
          <p className="text-lg text-black">
            {formatDate(data.event_date)} de {formatTime(data.start_time)} à {formatTime(data.end_time)}
          </p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-gray-600" aria-hidden="true" />
            <span className="text-sm font-bold text-gray-600">Participants</span>
          </div>
          <p className="text-lg text-black">
            {data.quantity} billet{data.quantity > 1 ? 's' : ''} - {getTicketTypeLabel(data.ticket_type)}
          </p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Sous-total</span>
          <span className="text-black font-bold">
            {data.subtotal.toFixed(2)} {data.currency}
          </span>
        </div>
        {data.discount > 0 && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Réduction</span>
            <span className="text-green-600 font-bold">
              -{data.discount.toFixed(2)} {data.currency}
            </span>
          </div>
        )}
        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <span className="text-xl font-black text-black">Total</span>
          <span className="text-2xl font-black text-black">
            {data.total.toFixed(2)} {data.currency}
          </span>
        </div>
      </div>
    </SwissCard>
  );
}
