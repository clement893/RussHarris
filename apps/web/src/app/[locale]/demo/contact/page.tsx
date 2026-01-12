'use client';

import DemoHeader from "@/components/layout/DemoHeader";
import { Button, Input, Textarea, Select } from "@/components/ui";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

export default function DemoContactPage() {
  return (
    <div className="bg-gray-900 text-white">
      <DemoHeader />
      <main>
        <section className="pt-32 pb-20 bg-gray-800 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-6xl font-bold mb-4">Contactez-nous</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Une question sur la tournée, les inscriptions ou le programme ? Notre équipe est là pour vous aider.
            </p>
          </div>
        </section>

        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-6">Informations de contact</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-bold">Email</h3>
                    <p className="text-gray-300">contact@contextpsy.fr</p>
                    <p className="text-sm text-gray-400">Temps de réponse moyen : 24h</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-bold">Téléphone</h3>
                    <p className="text-gray-300">+33 1 23 45 67 89</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-bold">Adresse</h3>
                    <p className="text-gray-300">Institut de Psychologie Contextuelle</p>
                    <p className="text-gray-400">123 Rue de la Thérapie, 75001 Paris, France</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-6 h-6 text-orange-500 mt-1" />
                  <div>
                    <h3 className="font-bold">Horaires d'ouverture</h3>
                    <p className="text-gray-300">Lundi - Vendredi : 9h00 - 18h00</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6">Envoyez-nous un message</h2>
              <form className="space-y-6">
                <Input placeholder="Nom complet *" className="bg-gray-800 border-gray-700" />
                <Input type="email" placeholder="Email *" className="bg-gray-800 border-gray-700" />
                <Select
                  placeholder="Sélectionnez un sujet"
                  options={[
                    { label: "Réservation", value: "reservation" },
                    { label: "Tarifs", value: "tarifs" },
                    { label: "Programme", value: "programme" },
                    { label: "Réservation de groupe", value: "groupe" },
                  ]}
                  className="bg-gray-800 border-gray-700"
                />
                <Textarea placeholder="Votre message *" className="bg-gray-800 border-gray-700" rows={5} />
                <Button type="submit" size="lg" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                  Envoyer le message
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
