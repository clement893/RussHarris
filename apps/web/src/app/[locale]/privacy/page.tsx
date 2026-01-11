/**
 * Privacy Page
 * Privacy Policy
 */

'use client';

import { Container } from '@/components/ui';
import SwissDivider from '@/components/masterclass/SwissDivider';
import SwissCard from '@/components/masterclass/SwissCard';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Container className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <h1 className="swiss-display text-6xl md:text-8xl mb-6 text-black">
              Politique de Confidentialité
            </h1>
            <SwissDivider />
          </div>

          <SwissCard className="p-8 md:p-12 border-2 border-black">
            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-black text-black mb-4">1. Collecte des données</h2>
                <p className="text-gray-700 leading-relaxed">
                  ContextPsy collecte les données personnelles suivantes lors de la réservation : nom, prénom, email, téléphone, adresse. Ces données sont nécessaires pour la gestion de votre réservation et la communication relative à la masterclass.
                </p>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">2. Utilisation des données</h2>
                <p className="text-gray-700 leading-relaxed">
                  Les données collectées sont utilisées pour : la gestion de votre réservation, l'envoi de confirmations et informations relatives à la masterclass, la gestion des paiements, l'amélioration de nos services.
                </p>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">3. Conservation des données</h2>
                <p className="text-gray-700 leading-relaxed">
                  Les données personnelles sont conservées pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées, conformément à la législation en vigueur.
                </p>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">4. Partage des données</h2>
                <p className="text-gray-700 leading-relaxed">
                  ContextPsy ne partage pas vos données personnelles avec des tiers, sauf si cela est nécessaire pour l'exécution de la prestation (hébergeur, prestataire de paiement) ou si la loi l'exige.
                </p>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">5. Vos droits</h2>
                <p className="text-gray-700 leading-relaxed">
                  Conformément au RGPD, vous disposez des droits suivants : droit d'accès, droit de rectification, droit à l'effacement, droit à la portabilité, droit d'opposition. Pour exercer ces droits, contactez-nous à contact@contextpsy.fr.
                </p>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">6. Sécurité</h2>
                <p className="text-gray-700 leading-relaxed">
                  ContextPsy met en œuvre toutes les mesures techniques et organisationnelles nécessaires pour protéger vos données personnelles contre tout accès non autorisé, perte ou destruction.
                </p>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">7. Contact</h2>
                <p className="text-gray-700 leading-relaxed">
                  Pour toute question relative à la protection de vos données personnelles, vous pouvez nous contacter à : contact@contextpsy.fr
                </p>
              </section>
            </div>
          </SwissCard>
        </div>
      </Container>
    </div>
  );
}
