/**
 * Terms Page
 * Terms and Conditions (CGV)
 */

'use client';

import { Container } from '@/components/ui';
import SwissDivider from '@/components/masterclass/SwissDivider';
import SwissCard from '@/components/masterclass/SwissCard';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Container className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <h1 className="swiss-display text-6xl md:text-8xl mb-6 text-black">
              Conditions Générales de Vente
            </h1>
            <SwissDivider />
          </div>

          <SwissCard className="p-8 md:p-12 border-2 border-black">
            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-black text-black mb-4">1. Objet</h2>
                <p className="text-gray-700 leading-relaxed">
                  Les présentes Conditions Générales de Vente (CGV) régissent les relations entre ContextPsy et les participants à la masterclass ACT avec Russ Harris.
                </p>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">2. Réservation</h2>
                <p className="text-gray-700 leading-relaxed">
                  La réservation s'effectue en ligne via le site web. Une confirmation de réservation sera envoyée par email après validation du paiement.
                </p>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">3. Tarifs</h2>
                <p className="text-gray-700 leading-relaxed">
                  Les tarifs sont indiqués en euros, toutes taxes comprises. Les prix peuvent varier selon les conditions de réservation (Early Bird, tarif standard, tarif groupe).
                </p>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">4. Paiement</h2>
                <p className="text-gray-700 leading-relaxed">
                  Le paiement s'effectue en ligne par carte bancaire ou via un système de paiement sécurisé. La réservation n'est confirmée qu'après réception du paiement.
                </p>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">5. Annulation et remboursement</h2>
                <p className="text-gray-700 leading-relaxed">
                  Les participants peuvent annuler leur réservation jusqu'à 14 jours avant l'événement pour un remboursement complet. Les annulations après cette date peuvent être soumises à des frais d'annulation. Pour toute demande d'annulation, contactez-nous à contact@contextpsy.fr.
                </p>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">6. Modification ou annulation par l'organisateur</h2>
                <p className="text-gray-700 leading-relaxed">
                  En cas d'annulation de la masterclass par l'organisateur, les participants seront intégralement remboursés dans les 30 jours.
                </p>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">7. Contenu de la formation</h2>
                <p className="text-gray-700 leading-relaxed">
                  Le contenu de la formation est décrit sur le site web. L'organisateur se réserve le droit de modifier le programme si nécessaire, tout en maintenant la qualité et les objectifs pédagogiques.
                </p>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">8. Responsabilité</h2>
                <p className="text-gray-700 leading-relaxed">
                  L'organisateur décline toute responsabilité en cas de dommages directs ou indirects résultant de la participation à la masterclass. Les participants sont responsables de leur propre assurance.
                </p>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">9. Droit de rétractation</h2>
                <p className="text-gray-700 leading-relaxed">
                  Conformément à la législation en vigueur, les participants bénéficient d'un délai de rétractation de 14 jours à compter de la date de réservation.
                </p>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">10. Droit applicable</h2>
                <p className="text-gray-700 leading-relaxed">
                  Les présentes CGV sont régies par le droit français. Tout litige sera soumis aux tribunaux compétents.
                </p>
              </section>
            </div>
          </SwissCard>
        </div>
      </Container>
    </div>
  );
}
