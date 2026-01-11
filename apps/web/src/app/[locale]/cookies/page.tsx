/**
 * Cookies Page
 * Cookie Policy
 */

'use client';

import { Container } from '@/components/ui';
import SwissDivider from '@/components/masterclass/SwissDivider';
import SwissCard from '@/components/masterclass/SwissCard';

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Container className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <h1 className="swiss-display text-6xl md:text-8xl mb-6 text-black">
              Politique des Cookies
            </h1>
            <SwissDivider />
          </div>

          <SwissCard className="p-8 md:p-12 border-2 border-black">
            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-black text-black mb-4">1. Qu'est-ce qu'un cookie ?</h2>
                <p className="text-gray-700 leading-relaxed">
                  Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette, smartphone) lors de la visite d'un site web. Il permet au site de reconnaître votre terminal et d'améliorer votre expérience de navigation.
                </p>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">2. Types de cookies utilisés</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-black text-black mb-2">Cookies essentiels</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Ces cookies sont indispensables au fonctionnement du site. Ils permettent notamment de mémoriser vos préférences de langue et de sécuriser votre session.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-black mb-2">Cookies analytiques</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Ces cookies nous permettent d'analyser l'utilisation du site pour améliorer nos services.
                    </p>
                  </div>
                </div>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">3. Gestion des cookies</h2>
                <p className="text-gray-700 leading-relaxed">
                  Vous pouvez configurer votre navigateur pour refuser les cookies. Cependant, certaines fonctionnalités du site peuvent ne plus être disponibles.
                </p>
                <p className="text-gray-700 leading-relaxed mt-4">
                  Pour gérer les cookies dans votre navigateur :
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mt-4">
                  <li>Chrome : Paramètres → Confidentialité et sécurité → Cookies</li>
                  <li>Firefox : Options → Vie privée et sécurité → Cookies</li>
                  <li>Safari : Préférences → Confidentialité → Cookies</li>
                  <li>Edge : Paramètres → Confidentialité → Cookies</li>
                </ul>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">4. Durée de conservation</h2>
                <p className="text-gray-700 leading-relaxed">
                  Les cookies sont conservés pour une durée maximale de 13 mois, conformément à la législation en vigueur.
                </p>
              </section>

              <SwissDivider className="my-8" />

              <section>
                <h2 className="text-2xl font-black text-black mb-4">5. Contact</h2>
                <p className="text-gray-700 leading-relaxed">
                  Pour toute question relative aux cookies, vous pouvez nous contacter à : contact@contextpsy.fr
                </p>
              </section>
            </div>
          </SwissCard>
        </div>
      </Container>
    </div>
  );
}
