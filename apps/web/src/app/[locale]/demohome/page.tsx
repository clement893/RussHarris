'use client';

import DemoHeader from "@/components/layout/DemoHeader";
import { Badge, Button } from "@/components/ui";
import { ArrowRight, Book, Users, Heart, Stethoscope, BrainCircuit, UserCheck } from "lucide-react";
import Image from "next/image";

export default function DemoHomePage() {
  return (
    <div className="bg-gray-900 text-white">
      <DemoHeader />
      <main>
        <section id="accueil" className="relative pt-32 pb-20 bg-gray-900">
          <div className="absolute inset-0 bg-grid-gray-800/20 [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="border border-orange-500/50 text-orange-500 bg-transparent">
                TOURNÉE CANADIENNE 2026
              </Badge>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
                RUSS HARRIS
              </h1>
              <p className="text-lg text-gray-300">
                Maîtrisez la flexibilité psychologique avec l’ACT. Une formation
                intensive de 2 jours pour les professionnels de la santé mentale.
              </p>
              <div className="flex items-center space-x-4">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                  Découvrir les dates
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <p className="text-sm text-gray-400">Places limitées</p>
              </div>
            </div>
            <div className="relative flex justify-center items-center">
              <div className="absolute -inset-2 bg-gradient-to-r from-orange-500 to-teal-500 rounded-3xl blur-xl opacity-20"></div>
              <Image
                src="/images/russ/8obb1myXAohZ.jpg"
                alt="Russ Harris"
                width={384}
                height={512}
                className="relative rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </section>

        <section id="dates" className="py-20 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">4 Villes. 4 Opportunités.</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { city: "Montréal", date: "24-25 mai 2026", venue: "Palais des Congrès" },
                { city: "Calgary", date: "31 mai - 1 juin 2026", venue: "Calgary Convention Centre" },
                { city: "Vancouver", date: "7-8 juin 2026", venue: "Vancouver Convention Centre" },
                { city: "Toronto", date: "14-15 juin 2026", venue: "Metro Toronto Convention Centre" },
              ].map((item) => (
                <div key={item.city} className="bg-gray-900/50 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
                  <h3 className="text-2xl font-bold text-orange-500">{item.city}</h3>
                  <p className="text-gray-300 mt-2">{item.date}</p>
                  <p className="text-sm text-gray-400">{item.venue}</p>
                  <Button variant="outline" className="mt-4 w-full border-orange-500/50 text-orange-500 hover:bg-orange-500/10 hover:text-orange-400">
                    S'inscrire
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="a-propos" className="py-20 bg-gray-900">
          <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-4">L'homme derrière l'ACT</h2>
              <p className="text-gray-300 mb-6">
                Russ Harris est un médecin, psychothérapeute et formateur de renommée mondiale. Auteur du best-seller "Le Piège du Bonheur", il a formé plus de 90 000 professionnels de la santé mentale à l'ACT. Sa capacité à rendre des concepts complexes accessibles et pratiques a transformé la pratique de milliers de thérapeutes.
              </p>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-gray-800 p-4 rounded-lg">
                  <Users className="mx-auto h-8 w-8 text-orange-500 mb-2" />
                  <p className="font-bold text-xl">+90 000</p>
                  <p className="text-sm text-gray-400">Professionnels formés</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg">
                  <Book className="mx-auto h-8 w-8 text-orange-500 mb-2" />
                  <p className="font-bold text-xl">+1 Million</p>
                  <p className="text-sm text-gray-400">Livres vendus</p>
                </div>
              </div>
            </div>
            <div className="relative flex justify-center items-center">
              <Image
                src="/images/russ/8obb1myXAohZ.jpg"
                alt="Russ Harris en conférence"
                width={400}
                height={500}
                className="rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </section>

        <section id="act" className="py-20 bg-gray-800">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Maîtrisez la flexibilité psychologique</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-12">
              L'ACT n'est pas juste une série de techniques, c'est une nouvelle façon de penser la condition humaine. Apprenez à aider vos clients à embrasser leurs pensées et émotions difficiles tout en s'engageant dans des actions riches de sens.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Défusion Cognitive", description: "Apprenez à observer vos pensées sans vous y identifier." },
                { title: "Acceptation", description: "Cessez de lutter contre vos émotions et faites de la place pour elles." },
                { title: "Action Engagée", description: "Posez des actions concrètes alignées avec vos valeurs profondes." },
              ].map((item) => (
                <div key={item.title} className="bg-gray-900 p-6 rounded-2xl border border-gray-700">
                  <h3 className="text-xl font-bold text-orange-500">{item.title}</h3>
                  <p className="text-gray-400 mt-2">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pour-qui" className="py-20 bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold">Une formation conçue pour vous</h2>
              <p className="text-lg text-gray-400 mt-4 max-w-3xl mx-auto">
                Que vous soyez psychothérapeute, médecin, conseiller ou coach, cette masterclass vous donnera des outils concrets pour enrichir votre pratique et améliorer la vie de vos clients.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "Psychothérapeutes", icon: Heart, benefits: ["Réduction de l'épuisement professionnel", "Alliance thérapeutique renforcée", "Interventions plus créatives"] },
                { title: "Médecins", icon: Stethoscope, benefits: ["Meilleure gestion de la douleur chronique", "Amélioration de l'observance thérapeutique", "Approche holistique du patient"] },
                { title: "Conseillers", icon: BrainCircuit, benefits: ["Outils pour le stress et l'anxiété", "Cadre basé sur les valeurs", "Techniques de pleine conscience"] },
                { title: "Coachs", icon: UserCheck, benefits: ["Dépassement des blocages mentaux", "Alignement avec les objectifs de vie", "Augmentation de la résilience"] },
              ].map((item) => (
                <div key={item.title} className="bg-gray-800 p-6 rounded-2xl border border-transparent hover:border-orange-500/50 transition-all duration-300 transform hover:-translate-y-2">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-500/10 mb-6">
                    <item.icon className="w-8 h-8 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    {item.benefits.map(benefit => <li key={benefit} className="flex items-start"><span className="text-orange-500 mr-2">✓</span>{benefit}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="temoignages" className="py-20 bg-gray-800">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Ce qu'en disent les experts</h2>
            <div className="max-w-3xl mx-auto">
              <div className="bg-gray-900 p-8 rounded-2xl">
                <p className="text-lg italic text-gray-300">
                  "Russ Harris est un formateur exceptionnel qui rend l'ACT accessible et applicable. Ses ateliers transforment la pratique clinique."
                </p>
                <p className="mt-4 font-bold text-orange-500">Dr. Steven Hayes</p>
                <p className="text-sm text-gray-400">Co-fondateur de l'ACT</p>
              </div>
            </div>
          </div>
        </section>

        <section id="inscription" className="py-20 bg-gray-900">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold">Prêt à transformer votre pratique ?</h2>
            <p className="text-lg text-gray-300 mt-4 mb-8 max-w-xl mx-auto">
              Rejoignez des milliers de professionnels et découvrez la puissance de l'ACT avec l'un de ses meilleurs formateurs au monde.
            </p>
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
              Réserver ma place
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        <footer className="py-8 bg-gray-900 border-t border-gray-800">
          <div className="container mx-auto px-4 text-center text-gray-400">
            <p>&copy; 2026 Institut de psychologie contextuelle. Tous droits réservés.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}
