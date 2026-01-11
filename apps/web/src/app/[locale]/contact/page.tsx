/**
 * Contact Page
 * Contact form and information
 */

'use client';

import { useState, FormEvent } from 'react';
import { Container } from '@/components/ui';
import SwissDivider from '@/components/masterclass/SwissDivider';
import SwissCard from '@/components/masterclass/SwissCard';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { clsx } from 'clsx';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Implement actual form submission
    // For now, just simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Container className="py-20 md:py-32">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="swiss-display text-6xl md:text-8xl mb-6 text-black">
              Contactez-nous
            </h1>
            <SwissDivider className="mx-auto max-w-md" />
            <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
              Une question ? N'hésitez pas à nous contacter. Nous vous répondrons dans les plus brefs délais.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <SwissCard className="p-8 border-2 border-black">
                <h2 className="text-2xl font-black text-black mb-6">Informations de contact</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-black mt-1 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-black text-black mb-1">Email</p>
                      <a 
                        href="mailto:contact@contextpsy.fr" 
                        className="text-gray-600 hover:text-black transition-colors"
                      >
                        contact@contextpsy.fr
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-5 h-5 text-black mt-1 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-black text-black mb-1">Téléphone</p>
                      <a 
                        href="tel:+33XXXXXXXXX" 
                        className="text-gray-600 hover:text-black transition-colors"
                      >
                        +33 (0)X XX XX XX XX
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-black mt-1 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-black text-black mb-1">Adresse</p>
                      <p className="text-gray-600">
                        France
                      </p>
                    </div>
                  </div>
                </div>

                <SwissDivider className="my-8" />

                <div>
                  <p className="text-sm text-gray-600">
                    <strong>Horaires d'ouverture :</strong>
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    Lundi - Vendredi<br />
                    9h00 - 18h00
                  </p>
                </div>
              </SwissCard>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <SwissCard className="p-8 border-2 border-black">
                <h2 className="text-2xl font-black text-black mb-6">Envoyez-nous un message</h2>
                
                {submitted && (
                  <div className="mb-6 p-4 bg-black text-white border-2 border-black">
                    <p className="font-black">Message envoyé avec succès !</p>
                    <p className="text-sm mt-1">Nous vous répondrons dans les plus brefs délais.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-black text-black mb-2">
                        Nom complet *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black text-black"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-black text-black mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black text-black"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-black text-black mb-2">
                      Sujet *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black text-black bg-white"
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="reservation">Réservation</option>
                      <option value="pricing">Tarifs</option>
                      <option value="program">Programme</option>
                      <option value="group">Réservation de groupe</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-black text-black mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={8}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black text-black resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={clsx(
                      'w-full px-8 py-4 font-black border-2 border-black transition-all duration-200',
                      'hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed',
                      'flex items-center justify-center gap-2'
                    )}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin">⏳</span>
                        Envoi en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" aria-hidden="true" />
                        Envoyer le message
                      </>
                    )}
                  </button>
                </form>
              </SwissCard>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
