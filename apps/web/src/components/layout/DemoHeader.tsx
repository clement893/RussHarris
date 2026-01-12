'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function DemoHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#accueil', label: 'Accueil' },
    { href: '#a-propos', label: 'À propos' },
    { href: '#act', label: 'L\'ACT' },
    { href: '#dates', label: 'Dates' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Header Desktop & Mobile */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#2B5F7A]/95 backdrop-blur-lg border-b border-[#2B5F7A]/50 shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/ips-logo.png"
                  alt="Institut de psychologie contextuelle"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-white font-semibold text-lg hidden sm:block">
                Institut de psychologie contextuelle
              </span>
            </Link>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white font-medium text-base hover:text-[#F58220] transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* CTA Button Desktop */}
            <div className="hidden md:block">
              <a
                href="#inscription"
                className="inline-flex items-center gap-2 px-6 py-2.5 text-base font-semibold text-[#F58220] border-2 border-[#F58220] rounded-full hover:bg-[#F58220] hover:text-white transition-all duration-300"
              >
                S'inscrire
              </a>
            </div>

            {/* Hamburger Button Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed inset-y-0 right-0 z-40 w-full max-w-sm bg-[#132C35] transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6 pt-24">
          {/* Mobile Navigation Links */}
          <nav className="flex flex-col gap-6 flex-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white font-medium text-lg hover:text-[#F58220] transition-colors duration-200 py-2"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile CTA Button */}
          <a
            href="#inscription"
            onClick={() => setIsMobileMenuOpen(false)}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold text-white bg-[#F58220] rounded-full hover:bg-[#C4681A] transition-all duration-300"
          >
            S'inscrire
          </a>
        </div>
      </div>

      {/* Overlay for Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}
