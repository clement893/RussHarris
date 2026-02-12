/**
 * MasterclassFooter Component
 * Footer for Masterclass site with Swiss Style
 * Clean, minimal, black/white design
 */

'use client';

import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Mail, Phone, MapPin, ArrowRight, Lock, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';
import Image from 'next/image';
import { apiClient } from '@/lib/api/client';
import { getErrorMessage } from '@/lib/errors';

export default function MasterclassFooter() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const value = email.trim();
    if (!value) return;
    setStatus('loading');
    setMessage('');
    try {
      const res = await apiClient.post<{ success: boolean; message?: string }>(
        '/v1/newsletter/mailchimp/footer',
        { email: value }
      );
      // Backend returns { success, message, email } directly (apiClient returns response.data)
      if ((res as { success?: boolean }).success) {
        setStatus('success');
        setMessage((res as { message?: string }).message || t('thankYou'));
        setEmail('');
      } else {
        setStatus('error');
        setMessage((res as { message?: string }).message || t('newsletterError') || 'Une erreur est survenue.');
      }
    } catch (err) {
      setStatus('error');
      setMessage(getErrorMessage(err) || t('newsletterError') || 'Une erreur est survenue.');
    }
  };

  const footerLinks = {
    masterclass: [
      { href: '/masterclass', labelKey: 'program' },
      { href: '/about-russ', labelKey: 'aboutRuss' },
      { href: '/cities', labelKey: 'cities' },
    ],
    resources: [
      { href: '/faq', labelKey: 'faq' },
      { href: '/contact', labelKey: 'contact' },
      { href: '/legal', labelKey: 'legal' },
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
              <a
                href="https://ipc.mylearnworlds.com/courses"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 mb-6 group"
              >
                <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src="/images/ips-logo.png"
                    alt={t('brandName')}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#F58220] transition-colors">
                  {t('brandName')}
                </h3>
              </a>
              <p className="text-sm text-white/80 mb-6 leading-relaxed">
                {t('brandDescription')}
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 text-sm text-white/80">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#F58220]" aria-hidden="true" />
                  <a href="mailto:admin@contextpsy.com" className="hover:text-[#F58220] transition-colors">
                    admin@contextpsy.com
                  </a>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#F58220]" aria-hidden="true" />
                  <span>(438) 375-4869</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#F58220]" aria-hidden="true" />
                  <span>422, rue saint François Xavier, Montreal (QC) H2Y 2S9</span>
                </div>
              </div>
            </div>

            {/* Masterclass Links */}
            <div>
              <h4 className="text-sm font-bold text-white mb-4 uppercase tracking-wider border-b border-[#F58220]/30 pb-2">
                {t('masterclassSectionTitle')}
              </h4>
              <ul className="space-y-3" role="list">
                {footerLinks.masterclass.map((link) => (
                  <li key={link.href} role="listitem">
                    <Link
                      href={link.href}
                      className="text-sm text-white/80 hover:text-[#F58220] transition-colors flex items-center gap-2 group"
                    >
                      <span>{t(link.labelKey)}</span>
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
                      <span>{t(link.labelKey)}</span>
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
                Recevez les dernières actualités et dates de classe de maître.
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
                  disabled={status === 'loading'}
                />
                <button
                  type="submit"
                  disabled={!email.trim() || status === 'loading'}
                  className={clsx(
                    'w-full px-6 py-3 text-sm font-bold border-2 transition-all duration-300 rounded-lg flex items-center justify-center gap-2',
                    'disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105',
                    status === 'success'
                      ? 'bg-[#F58220] border-[#F58220] text-white'
                      : 'bg-transparent border-[#F58220] text-[#F58220] hover:bg-[#F58220] hover:text-white'
                  )}
                >
                  {status === 'loading' ? (
                    <Loader2 className="w-4 h-4 animate-spin" aria-hidden />
                  ) : status === 'success' ? (
                    t('subscribed')
                  ) : (
                    t('send')
                  )}
                </button>
                {status === 'success' && message && (
                  <p className="flex items-center gap-2 text-sm text-emerald-400" role="status" aria-live="polite">
                    <CheckCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{message}</span>
                  </p>
                )}
                {status === 'error' && message && (
                  <p className="flex items-center gap-2 text-sm text-red-400" role="alert">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{message}</span>
                  </p>
                )}
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[#2B5F7A]/40 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-white/70">
                {t('copyright', { year: currentYear })}
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
                  className="hidden hover:text-[#F58220] transition-colors flex items-center gap-1.5 opacity-70 hover:opacity-100"
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
