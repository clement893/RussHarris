/**
 * MasterclassFooter Component
 * Footer for Masterclass site with Swiss Style
 * Clean, minimal, black/white design
 */

'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { Mail, Phone, MapPin, ArrowRight, Lock } from 'lucide-react';
import { clsx } from 'clsx';
import Image from 'next/image';

export default function MasterclassFooter() {
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder - to be implemented
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    masterclass: [
      { href: '/masterclass', label: 'Le Programme' },
      { href: '/about-russ', label: 'À propos de Russ' },
      { href: '/tournee', label: 'La Tournée' },
      { href: '/cities', label: 'Villes & Dates' },
    ],
    resources: [
      { href: '/testimonials', label: 'Témoignages' },
      { href: '/faq', label: 'FAQ' },
      { href: '/contact', label: 'Contact' },
      { href: '/legal', label: 'Mentions légales' },
    ],
  };

  return (
    <footer className="bg-gradient-to-br from-[#1B3D4C] via-[#132C35] to-[#0B1B1E] text-white py-16 md:py-20 border-t border-[#2B5F7A]/40" role="contentinfo">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <Link href="/" className="flex items-center gap-3 mb-6 group">
                <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src="/images/ips-logo.png"
                    alt="Institut de psychologie contextuelle"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#F58220] transition-colors">
                  Institut de psychologie contextuelle
                </h3>
              </Link>
              <p className="text-sm text-white/80 mb-6 leading-relaxed">
                Formation professionnelle en Thérapie d'Acceptation et d'Engagement avec Dr. Russ Harris.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 text-sm text-white/80">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#F58220]" aria-hidden="true" />
                  <a href="mailto:contact@contextpsy.fr" className="hover:text-[#F58220] transition-colors">
                    contact@contextpsy.fr
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#F58220]" aria-hidden="true" />
                  <span>+33 (0)X XX XX XX XX</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#F58220]" aria-hidden="true" />
                  <span>Canada</span>
                </div>
              </div>
            </div>

            {/* Masterclass Links */}
            <div>
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider border-b border-[#F58220]/30 pb-2">
                Masterclass
              </h4>
              <ul className="space-y-3" role="list">
                {footerLinks.masterclass.map((link) => (
                  <li key={link.href} role="listitem">
                    <Link
                      href={link.href}
                      className="text-sm text-white/80 hover:text-[#F58220] transition-colors flex items-center gap-2 group"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:text-[#F58220] transition-all" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider border-b border-[#F58220]/30 pb-2">
                Ressources
              </h4>
              <ul className="space-y-3" role="list">
                {footerLinks.resources.map((link) => (
                  <li key={link.href} role="listitem">
                    <Link
                      href={link.href}
                      className="text-sm text-white/80 hover:text-[#F58220] transition-colors flex items-center gap-2 group"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:text-[#F58220] transition-all" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider border-b border-[#F58220]/30 pb-2">
                Newsletter
              </h4>
              <p className="text-sm text-white/80 mb-4">
                Recevez les dernières actualités et dates de masterclass.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Votre email"
                  className="w-full px-4 py-3 bg-white/5 border-2 border-[#2B5F7A]/60 text-white placeholder-white/50 focus:outline-none focus:border-[#F58220] transition-colors text-sm rounded-lg"
                  aria-label="Adresse email pour la newsletter"
                  required
                />
                <button
                  type="submit"
                  disabled={!email || subscribed}
                  className={clsx(
                    'w-full px-6 py-3 text-sm font-bold border-2 transition-all duration-300 rounded-lg',
                    'disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105',
                    subscribed 
                      ? 'bg-[#F58220] border-[#F58220] text-white' 
                      : 'bg-transparent border-[#F58220] text-[#F58220] hover:bg-[#F58220] hover:text-white'
                  )}
                >
                  {subscribed ? 'Inscrit!' : "S'abonner"}
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[#2B5F7A]/40 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-white/70">
                © {currentYear} Institut de psychologie contextuelle - Masterclass ACT avec Dr. Russ Harris. Tous droits réservés.
              </p>
              <div className="flex items-center gap-6 text-sm text-white/70">
                <Link href="/legal" className="hover:text-[#F58220] transition-colors">
                  Mentions légales
                </Link>
                <Link href="/privacy" className="hover:text-[#F58220] transition-colors">
                  Confidentialité
                </Link>
                <Link href="/terms" className="hover:text-[#F58220] transition-colors">
                  CGV
                </Link>
                <Link 
                  href="/auth/login" 
                  className="hover:text-[#F58220] transition-colors flex items-center gap-1.5 opacity-70 hover:opacity-100"
                  title="Accès administrateur"
                >
                  <Lock className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Admin</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
