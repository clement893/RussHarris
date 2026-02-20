/**
 * Terms Page
 * Terms and Conditions of Sale (CGV / TCS)
 */

'use client';

import { Container } from '@/components/ui';
import SwissDivider from '@/components/masterclass/SwissDivider';
import SwissCard from '@/components/masterclass/SwissCard';
import { useTranslations, useLocale } from 'next-intl';
import { FileText } from 'lucide-react';

const CANCELLATION_PDF = {
  fr: '/documents/Politique_annulation_FR.pdf',
  en: '/documents/Cancellation_Policy_EN.pdf',
} as const;

export default function TermsPage() {
  const t = useTranslations('terms');
  const locale = useLocale() as 'fr' | 'en';
  const cancellationPdfUrl = CANCELLATION_PDF[locale] ?? CANCELLATION_PDF.en;

  return (
    <div className="min-h-screen bg-white" data-header-contrast="light">
      <Container className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <h1 className="swiss-display text-6xl md:text-8xl mb-6 text-black">
              {t('title')}
            </h1>
            <SwissDivider />
          </div>

          <SwissCard className="p-8 md:p-12 border-2 border-black">
            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-black text-black mb-4">{t('section1Title')}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('section1Content')}
                </p>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">{t('section2Title')}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('section2Content')}
                </p>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">{t('section3Title')}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('section3Content')}
                </p>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">{t('section4Title')}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('section4Content')}
                </p>
                <a
                  href={cancellationPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 px-4 py-2.5 bg-[#FF8C42] hover:bg-[#FF7A29] text-white font-medium rounded-full border border-[#FF8C42]/20 transition-colors"
                >
                  <FileText className="w-4 h-4" aria-hidden />
                  {t('section4PdfLabel')}
                </a>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">{t('section5Title')}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('section5Content')}
                </p>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">{t('section6Title')}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('section6Content')}
                </p>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">{t('section7Title')}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('section7Content')}
                </p>
              </section>
            </div>
          </SwissCard>
        </div>
      </Container>
    </div>
  );
}
