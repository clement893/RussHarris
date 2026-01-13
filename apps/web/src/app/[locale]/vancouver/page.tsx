'use client';

import { Button, Container } from '@/components/ui';
import { Link } from '@/i18n/routing';
import { Calendar, MapPin } from 'lucide-react';

export default function VancouverPage() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white text-gray-900 min-h-screen">
      <section className="relative py-32 bg-gradient-to-br from-[#1F2937] via-[#111827] to-[#0F172A]">
        <Container className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              VANCOUVER
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Masterclass ACT avec Dr. Russ Harris
            </p>
          </div>

          <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/30 rounded-2xl md:rounded-3xl p-8 md:p-12 border border-gray-700/50">
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-gray-300">
                <Calendar className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0 text-[#FF8C42]" />
                <span className="text-xl md:text-2xl">7-8 juin 2026</span>
              </div>
              
              <div className="flex items-center gap-4 text-gray-300">
                <MapPin className="w-6 h-6 md:w-8 md:h-8 flex-shrink-0 text-[#FF8C42]" />
                <span className="text-xl md:text-2xl">Vancouver Convention Centre</span>
              </div>

              <div className="pt-6 border-t border-gray-700/50">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <span className="text-2xl md:text-3xl font-bold text-[#FF8C42]">200 places</span>
                  <Link href="/book">
                    <Button className="bg-[#FF8C42] hover:bg-[#FF7A29] text-white px-8 py-3 text-lg font-medium rounded-full border border-[#FF8C42]/20">
                      Acheter un billet
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
