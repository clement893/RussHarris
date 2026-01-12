import { DemoHeader } from "@/components/layout/DemoHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Award, Book, Globe, Users, Heart, Stethoscope, BrainCircuit, UserCheck } from "lucide-react";
import Image from "next/image";

export default function DemoAboutRussPage() {
  return (
    <div className="bg-gray-900 text-white">
      <DemoHeader />
      <main>
        <section className="pt-32 pb-20 bg-gray-800 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-6xl font-bold mb-4">À propos de Russ Harris</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Découvrez le parcours de l'un des formateurs ACT les plus influents au monde.
            </p>
          </div>
        </section>

        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <Image
                src="/images/russ/8obb1myXAohZ.jpg"
                alt="Russ Harris"
                width={500}
                height={600}
                className="rounded-3xl shadow-2xl"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">Un pionnier de l'ACT</h2>
              <p className="text-gray-300 mb-4">
                Médecin, psychothérapeute et auteur, Russ Harris a consacré sa carrière à rendre la Thérapie d'Acceptation et d'Engagement accessible à tous. Sa capacité à traduire des concepts complexes en stratégies pratiques a aidé des millions de personnes à travers le monde.
              </p>
              <p className="text-gray-300">
                Son best-seller, "Le Piège du Bonheur", est devenu un ouvrage de référence, traduit en plus de 30 langues. Mais au-delà des livres, c'est sa passion pour la formation qui le définit. Il a personnellement formé plus de 90 000 professionnels de la santé mentale, partageant son expertise avec humour, humilité et une profonde humanité.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Son parcours en quelques chiffres</h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-gray-900 p-8 rounded-2xl">
                <Users className="mx-auto h-12 w-12 text-orange-500 mb-4" />
                <p className="text-4xl font-bold">+90 000</p>
                <p className="text-gray-400">Professionnels formés</p>
              </div>
              <div className="bg-gray-900 p-8 rounded-2xl">
                <Book className="mx-auto h-12 w-12 text-orange-500 mb-4" />
                <p className="text-4xl font-bold">+1 Million</p>
                <p className="text-gray-400">d'exemplaires du "Piège du Bonheur" vendus</p>
              </div>
              <div className="bg-gray-900 p-8 rounded-2xl">
                <Globe className="mx-auto h-12 w-12 text-orange-500 mb-4" />
                <p className="text-4xl font-bold">30+</p>
                <p className="text-gray-400">Langues de traduction</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Prêt à apprendre du meilleur ?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
              Rejoignez la masterclass de Russ Harris et bénéficiez de décennies d'expérience clinique et de formation.
            </p>
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
              Voir les dates de la tournée
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
