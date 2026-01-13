/**
 * City Inscription Page
 * Dedicated inscription page for each city with event selection
 */

'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Link } from '@/i18n/routing';
import { Container, Button } from '@/components/ui';
import { Calendar, MapPin, Clock, Users, Building, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { masterclassAPI, type CityEvent, type City } from '@/lib/api/masterclass';
import { logger } from '@/lib/logger';
import { clsx } from 'clsx';

export default function CityInscriptionPage() {
  const params = useParams();
  const router = useRouter();
  const cityId = parseInt(params.city as string, 10);
  
  const [cityEvents, setCityEvents] = useState<CityEvent[]>([]);
  const [city, setCity] = useState<City | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (cityId) {
      loadCityEvents();
    }
  }, [cityId]);

  const loadCityEvents = async () => {
    try {
      setIsLoading(true);
      const events = await masterclassAPI.listCityEvents(cityId);
      setCityEvents(events);
      if (events.length > 0 && events[0]?.city) {
        setCity(events[0].city);
        // Auto-select first event if only one available
        if (events.length === 1) {
          setSelectedEventId(events[0].id);
        }
      }
    } catch (error) {
      logger.error('Failed to load city events', error instanceof Error ? error : new Error(String(error)));
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

  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getEventDate = (event: CityEvent) => {
    return event.event_date || event.start_date;
  };

  const formatTime = (timeString: string) => {
    return timeString.substring(0, 5);
  };

  const handleContinue = () => {
    if (selectedEventId) {
      router.push(`/book/checkout?cityEventId=${selectedEventId}`);
    }
  };

  const selectedEvent = cityEvents.find((e) => e.id === selectedEventId);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Container className="py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Link
              href={`/cities/${cityId}`}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-[#F58220] mb-6 text-sm font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à la page de la ville
            </Link>
            
            <div className="text-center mb-8">
              <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-4">
                Inscription {city ? city.name_fr || city.name_en : ''}
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Réservez votre place pour la masterclass ACT avec Dr. Russ Harris
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#F58220]"></div>
              <p className="text-gray-600 mt-4">Chargement des dates disponibles...</p>
            </div>
          ) : cityEvents.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 p-12">
              <p className="text-xl text-gray-600 mb-4">Aucun événement disponible pour cette ville.</p>
              <Link href="/cities">
                <Button className="bg-[#F58220] hover:bg-[#C4681A] text-white">
                  Voir les autres villes
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Events Selection */}
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Choisissez une date</h2>
                
                {cityEvents.map((event) => {
                  const maxAttendees = event.max_attendees || event.total_capacity || 0;
                  const currentAttendees = event.current_attendees || 0;
                  const available = maxAttendees - currentAttendees;
                  const percentage = maxAttendees > 0 
                    ? ((available / maxAttendees) * 100) 
                    : 0;
                  const isSelected = selectedEventId === event.id;
                  const isLowAvailability = percentage < 20;
                  const isSoldOut = available <= 0;

                  return (
                    <button
                      key={event.id}
                      onClick={() => !isSoldOut && setSelectedEventId(event.id)}
                      disabled={isSoldOut}
                      className={clsx(
                        'w-full text-left p-6 rounded-2xl border-2 transition-all duration-300',
                        'hover:shadow-lg transform hover:-translate-y-1',
                        isSelected
                          ? 'border-[#F58220] bg-[#F58220]/5 shadow-lg'
                          : 'border-gray-200 bg-white hover:border-[#F58220]/50',
                        isSoldOut && 'opacity-50 cursor-not-allowed'
                      )}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <Calendar className={clsx(
                              'w-5 h-5',
                              isSelected ? 'text-[#F58220]' : 'text-gray-600'
                            )} />
                            <h3 className={clsx(
                              'text-2xl font-bold',
                              isSelected ? 'text-[#F58220]' : 'text-gray-900'
                            )}>
                              {formatDate(getEventDate(event))}
                            </h3>
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-4">
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              <span className="text-sm">
                                {formatTime(event.start_time)} - {formatTime(event.end_time)}
                              </span>
                            </div>
                            {event.venue && (
                              <div className="flex items-center gap-2">
                                <Building className="w-4 h-4" />
                                <span className="text-sm">{event.venue.name}</span>
                              </div>
                            )}
                          </div>

                          {event.venue?.address && (
                            <div className="flex items-start gap-2 text-gray-600 mb-4">
                              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span className="text-sm">{event.venue.address}</span>
                            </div>
                          )}

                          <div className="flex items-center gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-gray-600" />
                              <span className={clsx(
                                'text-sm font-semibold',
                                isLowAvailability ? 'text-red-600' : 'text-gray-900'
                              )}>
                                {isSoldOut ? 'Complet' : `${available} places disponibles`}
                              </span>
                            </div>
                            {isLowAvailability && !isSoldOut && (
                              <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                                Places limitées
                              </span>
                            )}
                            {isSoldOut && (
                              <span className="px-3 py-1 bg-gray-200 text-gray-700 text-xs font-bold rounded-full">
                                Complet
                              </span>
                            )}
                          </div>

                          {/* Availability bar */}
                          {!isSoldOut && (
                            <div className="mb-4">
                              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                <div
                                  className={clsx(
                                    'h-full rounded-full transition-all duration-500',
                                    percentage > 50 ? 'bg-green-500' : percentage > 20 ? 'bg-yellow-500' : 'bg-red-500'
                                  )}
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          )}

                          {event.event && (
                            <div className="mt-4 pt-4 border-t border-gray-200">
                              <p className="text-lg font-bold text-gray-900 mb-2">
                                {event.event.title_fr || event.event.title_en}
                              </p>
                              <p className="text-2xl font-black text-[#F58220]">
                                {event.price || event.regular_price} {event.currency || 'EUR'}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Selection indicator */}
                        {isSelected && (
                          <div className="ml-4 flex-shrink-0">
                            <div className="w-8 h-8 rounded-full bg-[#F58220] flex items-center justify-center">
                              <CheckCircle2 className="w-5 h-5 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Summary Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 shadow-lg">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Résumé</h3>
                    
                    {selectedEvent ? (
                      <>
                        <div className="space-y-4 mb-6">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Ville</p>
                            <p className="font-semibold text-gray-900">
                              {city?.name_fr || city?.name_en || ''}
                            </p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Date</p>
                            <p className="font-semibold text-gray-900">
                              {formatDateShort(getEventDate(selectedEvent))}
                            </p>
                          </div>

                          {selectedEvent.venue && (
                            <div>
                              <p className="text-sm text-gray-600 mb-1">Lieu</p>
                              <p className="font-semibold text-gray-900">
                                {selectedEvent.venue.name}
                              </p>
                            </div>
                          )}

                          <div>
                            <p className="text-sm text-gray-600 mb-1">Prix</p>
                            <p className="text-2xl font-black text-[#F58220]">
                              {selectedEvent.price || selectedEvent.regular_price} {selectedEvent.currency || 'EUR'}
                            </p>
                          </div>
                        </div>

                        <Button
                          onClick={handleContinue}
                          className="w-full bg-[#F58220] hover:bg-[#C4681A] text-white font-semibold py-3 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
                        >
                          Continuer l'inscription
                        </Button>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-600 mb-4">Sélectionnez une date pour continuer</p>
                        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                          <Calendar className="w-8 h-8 text-gray-400" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Info box */}
                  <div className="mt-6 bg-[#1B3D4C]/5 rounded-2xl p-6 border border-[#2B5F7A]/20">
                    <h4 className="font-bold text-gray-900 mb-3">Ce qui est inclus</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#F58220] mt-0.5 flex-shrink-0" />
                        <span>Formation complète de 2 jours</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#F58220] mt-0.5 flex-shrink-0" />
                        <span>Matériel pédagogique inclus</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#F58220] mt-0.5 flex-shrink-0" />
                        <span>Certificat de participation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#F58220] mt-0.5 flex-shrink-0" />
                        <span>Pause-café et déjeuners</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
