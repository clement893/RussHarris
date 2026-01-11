'use client';

import Image from 'next/image';
import { Button, Container } from '@/components/ui';
import { CheckCircle } from 'lucide-react';

export default function DemoHomePage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="relative text-white text-center bg-black">
        <div className="absolute inset-0">
          <Image
            src="/images/russ/SSjqkHFlqMG2.jpg"
            alt="Russ Harris presenting"
            fill
            style={{ objectFit: 'cover' }}
            className="opacity-50"
          />
        </div>
        <Container className="relative z-10 py-32 md:py-48">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4">
            Russ Harris: The ACT Tour Canada 2026
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto mb-8">
            Transform your life and practice with the world leader in Acceptance and Commitment Therapy.
          </p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-10 py-4">
            Get Your Tickets
          </Button>
        </Container>
      </section>

      {/* About Russ Harris Section */}
      <section className="py-20 md:py-28">
        <Container className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-bold mb-4">Meet Dr. Russ Harris</h2>
            <p className="text-lg mb-6">
              Physician, therapist, and world-renowned author, Dr. Russ Harris has trained over 90,000 health professionals in ACT. Author of the bestseller "The Happiness Trap", he is a leading voice in modern psychology, making complex concepts accessible to everyone.
            </p>
            <Button variant="outline">Learn More About Russ</Button>
          </div>
          <div className="flex justify-center">
            <Image
              src="/images/russ/8obb1myXAohZ.jpg"
              alt="Portrait of Russ Harris"
              width={400}
              height={400}
              className="rounded-full shadow-2xl"
            />
          </div>
        </Container>
      </section>

      {/* What is ACT? Section */}
      <section className="bg-gray-50 py-20 md:py-28">
        <Container className="text-center max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">What is ACT Therapy?</h2>
          <p className="text-xl mb-8">
            Acceptance and Commitment Therapy (ACT) isn't just therapy—it's a new way of living. It teaches you to embrace difficult thoughts and emotions, connect with your deepest values, and take action to build a rich and meaningful life.
          </p>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="font-bold text-lg mb-2">Acceptance</h3>
              <p>Learn to make room for uncomfortable thoughts and feelings, rather than fighting against them.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="font-bold text-lg mb-2">Mindfulness</h3>
              <p>Ground yourself in the present moment and observe your inner experience with curiosity and without judgment.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="font-bold text-lg mb-2">Committed Action</h3>
              <p>Identify what truly matters to you and take concrete steps to move in that direction.</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Tour Dates Section */}
      <section className="py-20 md:py-28">
        <Container className="text-center">
          <h2 className="text-4xl font-bold mb-12">Canada Tour 2026 - Dates & Cities</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold mb-2">Toronto, ON</h3>
              <p className="text-lg text-gray-600 mb-4">May 15-16, 2026</p>
              <Button>View Details</Button>
            </div>
            <div className="border rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold mb-2">Vancouver, BC</h3>
              <p className="text-lg text-gray-600 mb-4">May 22-23, 2026</p>
              <Button>View Details</Button>
            </div>
            <div className="border rounded-lg p-8 shadow-md hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-bold mb-2">Montréal, QC</h3>
              <p className="text-lg text-gray-600 mb-4">May 29-30, 2026</p>
              <Button>View Details</Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Why Attend Section */}
      <section className="bg-gray-50 py-20 md:py-28">
        <Container className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Why Attend This Unique Event?</h2>
          <ul className="grid md:grid-cols-2 gap-8 text-lg">
            <li className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <span>Practical, experiential training with a world expert.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <span>Leave with concrete tools for your practice and your life.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <span>Discover the latest advances in ACT therapy.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
              <span>Connect with a community of passionate professionals.</span>
            </li>
          </ul>
        </Container>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 md:py-28 bg-blue-600 text-white">
        <Container className="text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Transform Your Approach?</h2>
          <p className="text-xl mb-8">
            Spots are limited. Reserve yours today and join Russ Harris for an unforgettable experience.
          </p>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-white border-white hover:bg-white hover:text-blue-600 font-bold text-lg px-10 py-4"
          >
            Reserve Your Spot Now
          </Button>
        </Container>
      </section>
    </div>
  );
}
