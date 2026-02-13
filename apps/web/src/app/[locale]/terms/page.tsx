/**
 * Terms Page
 * Terms and Conditions of Sale (CGV / TCS)
 */

'use client';

import { Container } from '@/components/ui';
import SwissDivider from '@/components/masterclass/SwissDivider';
import SwissCard from '@/components/masterclass/SwissCard';
import { useTranslations } from 'next-intl';

export default function TermsPage() {
  const t = useTranslations('terms');
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

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">{t('section8Title')}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('section8Content')}
                </p>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">{t('section9Title')}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('section9Content')}
                </p>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">{t('section10Title')}</h2>
                <p className="text-gray-700 leading-relaxed">
                  {t('section10Content')}
                </p>
              </section>
            </div>
          </SwissCard>
        </div>
      </Container>
    </div>
  );
}
