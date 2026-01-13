/**
 * Contact Page
 * Contact form and information
 */

'use client';

import { useState, FormEvent } from 'react';
import { Container, Button } from '@/components/ui';
import { Mail, Phone, MapPin, Send, Hexagon } from 'lucide-react';
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
    <div className="bg-gradient-to-b from-gray-50 to-white text-gray-900">
      {/* Hero Section - Avec gris anthracite élégant */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden py-20 bg-gradient-to-br from-[#1F2937] via-[#111827] to-[#0F172A]">
        {/* Grille hexagonale subtile en arrière-plan */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hexPatternContact" x="0" y="0" width="100" height="86.6" patternUnits="userSpaceOnUse">
                <polygon points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexPatternContact)" />
          </svg>
        </div>

        {/* Motif de vagues subtil */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,400 Q300,300 600,400 T1200,400" stroke="white" strokeWidth="2" fill="none" />
            <path d="M0,450 Q300,350 600,450 T1200,450" stroke="white" strokeWidth="2" fill="none" />
            <path d="M0,500 Q300,400 600,500 T1200,500" stroke="white" strokeWidth="2" fill="none" />
          </svg>
        </div>

        <Container className="relative z-10 max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 leading-none text-white tracking-tight">
              Contactez-nous
            </h1>
            <p className="text-xl md:text-2xl font-light text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
              Une question ? N'hésitez pas à nous contacter. Nous vous répondrons dans les plus brefs délais.
            </p>
          </div>
        </Container>
      </section>

      {/* Section Contact */}
      <section className="py-32 bg-white">
        <Container className="max-w-7xl mx-auto">
          <div className="max-w-6xl mx-auto">

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-8 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 opacity-5">
                    <Hexagon className="w-full h-full text-[#FF8C42]" />
                  </div>
                  <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Informations de contact</h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <Mail className="w-5 h-5 text-[#FF8C42] mt-1 flex-shrink-0" aria-hidden="true" />
                        <div>
                          <p className="text-sm font-bold text-gray-900 mb-1">Email</p>
                          <a 
                            href="mailto:contact@contextpsy.fr" 
                            className="text-gray-600 hover:text-[#FF8C42] transition-colors"
                          >
                            contact@contextpsy.fr
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <Phone className="w-5 h-5 text-[#FF8C42] mt-1 flex-shrink-0" aria-hidden="true" />
                        <div>
                          <p className="text-sm font-bold text-gray-900 mb-1">Téléphone</p>
                          <a 
                            href="tel:+33XXXXXXXXX" 
                            className="text-gray-600 hover:text-[#FF8C42] transition-colors"
                          >
                            +33 (0)X XX XX XX XX
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <MapPin className="w-5 h-5 text-[#FF8C42] mt-1 flex-shrink-0" aria-hidden="true" />
                        <div>
                          <p className="text-sm font-bold text-gray-900 mb-1">Adresse</p>
                          <p className="text-gray-600">
                            France
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-gray-200">
                      <p className="text-sm font-bold text-gray-900 mb-2">
                        Horaires d'ouverture :
                      </p>
                      <p className="text-sm text-gray-600">
                        Lundi - Vendredi<br />
                        9h00 - 18h00
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 border border-gray-200 hover:border-[#FF8C42]/50 transition-colors relative overflow-hidden">
                  <div className="absolute -top-10 -left-10 w-32 h-32 opacity-5">
                    <Hexagon className="w-full h-full text-[#FF8C42]" />
                  </div>
                  <div className="relative z-10">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h2>
                    
                    {submitted && (
                      <div className="mb-6 p-4 bg-[#FF8C42] text-white rounded-xl">
                        <p className="font-bold">Message envoyé avec succès !</p>
                        <p className="text-sm mt-1">Nous vous répondrons dans les plus brefs délais.</p>
                      </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-bold text-gray-900 mb-2">
                            Nom complet *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF8C42] text-gray-900 rounded-lg transition-colors"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF8C42] text-gray-900 rounded-lg transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-bold text-gray-900 mb-2">
                          Sujet *
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF8C42] text-gray-900 bg-white rounded-lg transition-colors"
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
                        <label htmlFor="message" className="block text-sm font-bold text-gray-900 mb-2">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={8}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF8C42] focus:border-[#FF8C42] text-gray-900 resize-none rounded-lg transition-colors"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={clsx(
                          'w-full bg-[#FF8C42] hover:bg-[#FF7A29] text-white font-medium px-8 py-4 rounded-full transition-all hover:scale-105 border border-[#FF8C42]/20',
                          'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
                        )}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="animate-spin">⏳</span>
                            Envoi en cours...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" aria-hidden="true" />
                            Envoyer le message
                          </>
                        )}
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
