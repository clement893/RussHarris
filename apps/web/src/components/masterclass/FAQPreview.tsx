/**
 * FAQPreview Component
 * Preview section of FAQ for homepage
 * Swiss Style: clean, minimal, black/white
 */

'use client';

import { useState } from 'react';
import { Container } from '@/components/ui';
import SwissDivider from './SwissDivider';
import SwissCard from './SwissCard';
import ButtonLink from '@/components/ui/ButtonLink';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { clsx } from 'clsx';

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
}

interface FAQPreviewProps {
  faqItems: FAQItem[];
  title?: string;
  subtitle?: string;
  maxVisible?: number;
  className?: string;
}

export default function FAQPreview({
  faqItems,
  title = 'Questions fréquentes',
  subtitle,
  maxVisible = 5,
  className,
}: FAQPreviewProps) {
  const [openIds, setOpenIds] = useState<number[]>([]);
  const visibleFAQs = faqItems.slice(0, maxVisible);

  const toggleFAQ = (id: number) => {
    setOpenIds((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  if (visibleFAQs.length === 0) {
    return null;
  }

  return (
    <section className={clsx('bg-gray-50 py-20 md:py-32', className)} aria-labelledby="faq-preview-heading">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16 text-center">
            <h2 id="faq-preview-heading" className="swiss-display text-5xl md:text-6xl font-black text-black mb-6">
              {title}
            </h2>
            {subtitle && (
              <>
                <SwissDivider className="mx-auto max-w-md" />
                <p className="text-xl text-gray-600 mt-6 max-w-3xl mx-auto">
                  {subtitle}
                </p>
              </>
            )}
          </div>

          {/* FAQ Accordion */}
          <div className="space-y-4 mb-12">
            {visibleFAQs.map((faq) => {
              const isOpen = openIds.includes(faq.id);
              return (
                <SwissCard
                  key={faq.id}
                  className={clsx(
                    'p-6 border-2 border-black transition-all duration-200',
                    isOpen && 'bg-black text-white'
                  )}
                >
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full flex items-start justify-between gap-4 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    <div className="flex-1">
                      <div className="flex items-start gap-3">
                        <HelpCircle
                          className={clsx('w-5 h-5 mt-0.5 flex-shrink-0', isOpen ? 'text-white' : 'text-black')}
                          aria-hidden="true"
                        />
                        <h3 className={clsx('text-lg font-black', isOpen ? 'text-white' : 'text-black')}>
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                    <ChevronDown
                      className={clsx(
                        'w-5 h-5 flex-shrink-0 transition-transform duration-200',
                        isOpen ? 'rotate-180 text-white' : 'text-black'
                      )}
                      aria-hidden="true"
                    />
                  </button>
                  {isOpen && (
                    <div
                      id={`faq-answer-${faq.id}`}
                      className="mt-4 pl-8 text-white/90 leading-relaxed"
                      role="region"
                      aria-labelledby={`faq-question-${faq.id}`}
                    >
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </SwissCard>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center">
            <ButtonLink
              href="/faq"
              variant="outline"
              className="px-8 py-4 text-lg font-black border-2 border-black hover:bg-black hover:text-white transition-all duration-200 rounded-none"
            >
              Voir toutes les questions
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
