/**
 * CityCard Component
 * Card displaying a city with events information
 * Swiss Style: clean, minimal, black/white
 */

'use client';

import { useRouter } from 'next/navigation';
import { MapPin, Calendar, Users } from 'lucide-react';
import { clsx } from 'clsx';
import SwissCard from './SwissCard';
import AvailabilityBar from './AvailabilityBar';
import UrgencyBadge from './UrgencyBadge';
import type { CityWithEvents } from '@/lib/api/masterclass';

interface CityCardProps {
  city: CityWithEvents;
  className?: string;
}

export default function CityCard({ city, className }: CityCardProps) {
  const router = useRouter();

  const events = city.events || [];
  const nextEvent = events.length > 0 ? events[0] : null;
  const totalAvailable = events.reduce((sum, event) => {
    const available = (event.max_attendees || 0) - (event.current_attendees || 0);
    return sum + Math.max(0, available);
  }, 0);
  const totalCapacity = events.reduce((sum, event) => sum + (event.max_attendees || 0), 0);
  const availabilityPercentage = totalCapacity > 0 ? (totalAvailable / totalCapacity) * 100 : 0;
  const isUrgent = availabilityPercentage < 20;

  const handleClick = () => {
    router.push(`/cities/${city.id}`);
  };

  return (
    <SwissCard
      className={clsx(
        'p-6 border-2 border-black cursor-pointer',
        'hover:bg-black hover:text-white transition-all duration-200',
        'group',
        className
      )}
      onClick={handleClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-5 h-5 text-gray-600 group-hover:text-white" aria-hidden="true" />
            <h3 className="text-2xl font-black text-black group-hover:text-white">
              {city.name_fr || city.name_en}
            </h3>
          </div>
          {city.province && (
            <p className="text-gray-600 text-sm group-hover:text-white/80">
              {city.province}, {city.country}
            </p>
          )}
        </div>
        {isUrgent && <UrgencyBadge text="Bientôt complet" variant="danger" className="text-xs px-2 py-1" />}
      </div>

      {/* Next Event Date */}
      {nextEvent && (
        <div className="flex items-center gap-2 mb-4 text-gray-600 group-hover:text-white/90">
          <Calendar className="w-4 h-4" aria-hidden="true" />
          <span className="text-sm font-bold">
            {new Date(nextEvent.start_date).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>
      )}

      {/* Availability */}
      {totalCapacity > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-600 group-hover:text-white" aria-hidden="true" />
              <span className="text-sm font-bold text-black group-hover:text-white">
                {totalAvailable} places disponibles
              </span>
            </div>
            <span className="text-sm text-gray-600 group-hover:text-white/80">
              {events.length} {events.length > 1 ? 'sessions' : 'session'}
            </span>
          </div>
          <AvailabilityBar
            available={totalAvailable}
            total={totalCapacity}
            className="group-hover:[&>div]:bg-white"
          />
        </div>
      )}

      {/* CTA */}
      <div className="flex items-center justify-between gap-3 mt-4 pt-4 border-t border-gray-300 group-hover:border-white/30">
        <button
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/cities/${city.id}/inscription`);
          }}
          className="px-4 py-2 bg-[#F58220] text-white font-bold text-sm rounded-full hover:bg-[#C4681A] transition-all duration-300 transform hover:scale-105"
        >
          S'inscrire
        </button>
        <button
          onClick={handleClick}
          className="flex items-center gap-2 text-sm font-bold text-black group-hover:text-white"
        >
          <span>Voir les dates</span>
        </button>
      </div>
    </SwissCard>
  );
}
