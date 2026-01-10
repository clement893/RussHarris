/**
 * MasterclassFooter Component
 * Footer for Masterclass site with Swiss Style
 * Clean, minimal, black/white design
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { clsx } from 'clsx';

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
      { href: '/cities', label: 'Villes & Dates' },
      { href: '/pricing', label: 'Tarifs' },
    ],
    resources: [
      { href: '/testimonials', label: 'Témoignages' },
      { href: '/faq', label: 'FAQ' },
      { href: '/contact', label: 'Contact' },
      { href: '/legal', label: 'Mentions légales' },
    ],
  };

  return (
    <footer className="bg-black text-white py-16 md:py-20" role="contentinfo">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-black text-white mb-4">
                Masterclass ACT
              </h3>
              <p className="text-sm text-white/80 mb-6 leading-relaxed">
                Formation professionnelle en Thérapie d'Acceptation et d'Engagement avec Russ Harris.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 text-sm text-white/80">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <a href="mailto:contact@contextpsy.fr" className="hover:text-white transition-colors">
                    contact@contextpsy.fr
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span>+33 (0)X XX XX XX XX</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <span>France</span>
                </div>
              </div>
            </div>

            {/* Masterclass Links */}
            <div>
              <h4 className="text-sm font-black text-white mb-4 uppercase tracking-wider">
                Masterclass
              </h4>
              <ul className="space-y-3" role="list">
                {footerLinks.masterclass.map((link) => (
                  <li key={link.href} role="listitem">
                    <Link
                      href={link.href}
                      className="text-sm text-white/80 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources Links */}
            <div>
              <h4 className="text-sm font-black text-white mb-4 uppercase tracking-wider">
                Ressources
              </h4>
              <ul className="space-y-3" role="list">
                {footerLinks.resources.map((link) => (
                  <li key={link.href} role="listitem">
                    <Link
                      href={link.href}
                      className="text-sm text-white/80 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-sm font-black text-white mb-4 uppercase tracking-wider">
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
                  className="w-full px-4 py-3 bg-white/10 border-2 border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-white transition-colors text-sm"
                  aria-label="Adresse email pour la newsletter"
                  required
                />
                <button
                  type="submit"
                  disabled={!email || subscribed}
                  className={clsx(
                    'w-full px-6 py-3 text-sm font-black border-2 border-white transition-all duration-200',
                    'hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed',
                    subscribed ? 'bg-white text-black' : 'bg-transparent text-white'
                  )}
                >
                  {subscribed ? 'Inscrit!' : "S'abonner"}
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-white/60">
                © {currentYear} Masterclass ACT - Russ Harris. Tous droits réservés.
              </p>
              <div className="flex items-center gap-6 text-sm text-white/60">
                <Link href="/legal" className="hover:text-white transition-colors">
                  Mentions légales
                </Link>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Confidentialité
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors">
                  CGV
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
