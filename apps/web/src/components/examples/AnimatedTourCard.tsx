/**
 * Animated Tour Card Component
 * 
 * Example component demonstrating micro-interactions on tour/event cards.
 * Shows hover effects, image zoom, and smooth transitions.
 */

'use client';

import Image from 'next/image';
import { Card } from '@/components/ui';
import { microInteractions, combineAnimations } from '@/lib/animations/micro-interactions';
import { MapPin, Calendar } from 'lucide-react';
import { Link } from '@/i18n/routing';

interface TourCardProps {
  title: string;
  date: string;
  location: string;
  image: string;
  href: string;
  index?: number;
}

export function AnimatedTourCard({
  title,
  date,
  location,
  image,
  href,
  index = 0,
}: TourCardProps) {
  return (
    <Link href={href}>
      <Card
        className={combineAnimations(
          microInteractions.card.base,
          microInteractions.homepage.tourCard,
          microInteractions.card.imageZoom,
          'cursor-pointer group'
        )}
        style={{
          animationDelay: `${index * 100}ms`,
        }}
      >
        {/* Image container with zoom effect */}
        <div className="relative w-full h-48 md:h-64 overflow-hidden rounded-t-lg">
          <Image
            src={image}
            alt={title}
            fill
            className={combineAnimations(
              microInteractions.homepage.tourCardImage,
              'object-cover'
            )}
          />
          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary-500 transition-colors duration-300">
            {title}
          </h3>
          
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{location}</span>
            </div>
          </div>

          {/* CTA arrow that moves on hover */}
          <div className="mt-4 flex items-center gap-2 text-primary-500 font-medium group-hover:gap-3 transition-all duration-300">
            <span>En savoir plus</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">
              →
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
