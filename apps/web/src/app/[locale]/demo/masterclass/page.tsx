import DemoHeader from "@/components/layout/DemoHeader";
import { Button } from "@/components/ui";
import { CheckCircle, Video, FileText, Award } from "lucide-react";

export default function DemoMasterclassPage() {
  return (
    <div className="bg-gray-900 text-white">
      <DemoHeader />
      <main>
        <section className="pt-32 pb-20 bg-gray-800 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-6xl font-bold mb-4">Le Programme de la Masterclass</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Une immersion de 2 jours dans l'univers de l'ACT pour transformer votre pratique clinique.
            </p>
          </div>
        </section>

        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="relative grid md:grid-cols-2 gap-8">
              <div className="absolute w-px h-full bg-orange-500/30 left-1/2 top-0 transform -translate-x-1/2"></div>
              <div className="pr-8">
                <h2 className="text-3xl font-bold mb-6 text-orange-500">Jour 1 : Fondements de l'ACT</h2>
                <div className="space-y-6">
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="font-bold">Matin : Introduction et Hexaflex</h3>
                    <p className="text-gray-400">Historique, philosophie et les 6 processus fondamentaux de l'ACT. Démonstrations pratiques.</p>
                  </div>
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="font-bold">Après-midi : Défusion et Acceptation</h3>
                    <p className="text-gray-400">Techniques de défusion cognitive, acceptation psychologique et contact avec le moment présent.</p>
                  </div>
                </div>
              </div>
              <div className="pl-8">
                <h2 className="text-3xl font-bold mb-6 text-orange-500">Jour 2 : Applications Avancées</h2>
                <div className="space-y-6">
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="font-bold">Matin : Soi, Valeurs et Action</h3>
                    <p className="text-gray-400">Le soi comme contexte, clarification des valeurs et engagement dans l'action.</p>
                  </div>
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="font-bold">Après-midi : Cas cliniques et défis</h3>
                    <p className="text-gray-400">Applications à l'anxiété, dépression, douleur chronique. Gestion des défis courants.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Ce que vous allez maîtriser</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <CheckCircle className="mx-auto h-12 w-12 text-orange-500 mb-4" />
                <h3 className="font-bold text-xl">Les 6 processus de l'Hexaflex</h3>
                <p className="text-gray-400">Pour une compréhension profonde du modèle.</p>
              </div>
              <div className="text-center">
                <CheckCircle className="mx-auto h-12 w-12 text-orange-500 mb-4" />
                <h3 className="font-bold text-xl">Techniques pratiques</h3>
                <p className="text-gray-400">Applicables dès votre retour en cabinet.</p>
              </div>
              <div className="text-center">
                <CheckCircle className="mx-auto h-12 w-12 text-orange-500 mb-4" />
                <h3 className="font-bold text-xl">Gestion des cas complexes</h3>
                <p className="text-gray-400">Pour surmonter les défis thérapeutiques.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Ressources incluses</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-6 rounded-lg text-center">
                <FileText className="mx-auto h-12 w-12 text-orange-500 mb-4" />
                <h3 className="font-bold">Manuel de formation complet</h3>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg text-center">
                <Video className="mx-auto h-12 w-12 text-orange-500 mb-4" />
                <h3 className="font-bold">Accès aux enregistrements vidéo</h3>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg text-center">
                <Award className="mx-auto h-12 w-12 text-orange-500 mb-4" />
                <h3 className="font-bold">Certificat de participation</h3>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
