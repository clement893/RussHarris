/**
 * Legal Page
 * Legal mentions (Mentions légales)
 */

'use client';

import { Container } from '@/components/ui';
import SwissDivider from '@/components/masterclass/SwissDivider';
import SwissCard from '@/components/masterclass/SwissCard';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function LegalPage() {
  const locale = useLocale();
  const t = useTranslations('legal');

  if (locale === 'en') {
    return (
      <div className="min-h-screen bg-white" data-header-contrast="light">
        <Container className="py-20 md:py-32">
          <div className="max-w-4xl mx-auto">
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
                  <p className="text-gray-700 leading-relaxed">{t('section1Intro')}</p>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    <strong>{t('section1Address')}</strong><br />
                    <strong>{t('section1Email')}</strong><br />
                    <strong>{t('section1Phone')}</strong>
                  </p>
                </section>
                <SwissDivider className="my-8" />
                <section>
                  <h2 className="text-2xl font-black text-black mb-4">{t('section2Title')}</h2>
                  <p className="text-gray-700 leading-relaxed">{t('section2Content')}</p>
                </section>
                <SwissDivider className="my-8" />
                <section>
                  <h2 className="text-2xl font-black text-black mb-4">{t('section3Title')}</h2>
                  <p className="text-gray-700 leading-relaxed">{t('section3Content')}<br />{t('section3Address')}</p>
                </section>
                <SwissDivider className="my-8" />
                <section>
                  <h2 className="text-2xl font-black text-black mb-4">{t('section4Title')}</h2>
                  <p className="text-gray-700 leading-relaxed">{t('section4Content')}</p>
                </section>
                <SwissDivider className="my-8" />
                <section>
                  <h2 className="text-2xl font-black text-black mb-4">{t('section5Title')}</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {t('section5Content')}
                    <Link href="/privacy" className="text-black underline font-bold">Privacy Policy</Link>
                    {t('section5ContentEnd')}
                  </p>
                </section>
                <SwissDivider className="my-8" />
                <section>
                  <h2 className="text-2xl font-black text-black mb-4">{t('section6Title')}</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {t('section6Content')}
                    <Link href="/cookies" className="text-black underline font-bold">Cookies Policy</Link>
                    {t('section6ContentEnd')}
                  </p>
                </section>
                <SwissDivider className="my-8" />
                <section>
                  <h2 className="text-2xl font-black text-black mb-4">{t('section7Title')}</h2>
                  <p className="text-gray-700 leading-relaxed">{t('section7Content')}</p>
                </section>
                <SwissDivider className="my-8" />
                <section>
                  <h2 className="text-2xl font-black text-black mb-4">{t('section8Title')}</h2>
                  <p className="text-gray-700 leading-relaxed">{t('section8Content')}</p>
                </section>
              </div>
            </SwissCard>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white" data-header-contrast="light">
      <Container className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16">
            <h1 className="swiss-display text-6xl md:text-8xl mb-6 text-black">
              Mentions Légales
            </h1>
            <SwissDivider />
          </div>

          <SwissCard className="p-8 md:p-12 border-2 border-black">
            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-black text-black mb-4">1. Éditeur du site</h2>
                <p className="text-gray-700 leading-relaxed">
                  Le présent site est édité par l'Institut de Psychologie Contextuelle, société spécialisée dans l'organisation de formations professionnelles en psychothérapie.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  <strong>Adresse :</strong> 422, rue saint François Xavier, Montreal (QC) H2Y 2S9<br />
                  <strong>Email :</strong> admin@contextpsy.com<br />
                  <strong>Téléphone :</strong> (438) 375-4869
                </p>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">2. Directeur de la publication</h2>
                <p className="text-gray-700 leading-relaxed">
                  Le directeur de la publication est le représentant légal de l'Institut de Psychologie Contextuelle.
                </p>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">3. Hébergement</h2>
                <p className="text-gray-700 leading-relaxed">
                  Le site est hébergé par [Nom de l'hébergeur].<br />
                  [Adresse de l'hébergeur]
                </p>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">4. Propriété intellectuelle</h2>
                <p className="text-gray-700 leading-relaxed">
                  L'ensemble du contenu du présent site (textes, images, logos, icônes, etc.) est la propriété exclusive de l'Institut de Psychologie Contextuelle, sauf mention contraire. Toute reproduction, représentation, modification, publication ou adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable de l'Institut de Psychologie Contextuelle.
                </p>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">5. Protection des données personnelles</h2>
                <p className="text-gray-700 leading-relaxed">
                  Les données personnelles collectées sur ce site sont traitées conformément à notre politique de confidentialité. Pour plus d'informations, consultez notre page <a href="/privacy" className="text-black underline font-bold">Politique de Confidentialité</a>.
                </p>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">6. Cookies</h2>
                <p className="text-gray-700 leading-relaxed">
                  Ce site utilise des cookies pour améliorer l'expérience utilisateur. Pour plus d'informations, consultez notre page <a href="/cookies" className="text-black underline font-bold">Politique des Cookies</a>.
                </p>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">7. Liens externes</h2>
                <p className="text-gray-700 leading-relaxed">
                  Le site peut contenir des liens vers d'autres sites. L'Institut de Psychologie Contextuelle n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
                </p>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">8. Droit applicable</h2>
                <p className="text-gray-700 leading-relaxed">
                  Les présentes mentions légales sont régies par le droit français. En cas de litige, les tribunaux français seront seuls compétents.
                </p>
              </section>
            </div>
          </SwissCard>
        </div>
      </Container>
    </div>
  );
}
