import React, { useState } from 'react';
import { Camera, MapPin, ArrowUpRight } from 'lucide-react';
import type { ShoeProduct } from '../types/store';

interface LookbookProps {
  onQuickView: (shoe: ShoeProduct) => void;
  shoes: ShoeProduct[];
}

export function Lookbook({ onQuickView, shoes }: LookbookProps) {
  const [activeCity, setActiveCity] = useState<string>('all');

  const editorials = [
    {
      id: 'lb-1',
      city: 'Tokyo, Japan',
      location: 'Shibuya Night Crossing',
      photographer: 'Kenji Sato',
      shoeId: 'den-02',
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&h=800&fit=crop&q=80',
      title: 'Neon Drift: Shibuya Underground',
      shoeName: 'DEN Cyber Volt V2',
      category: 'Tokyo',
    },
    {
      id: 'lb-2',
      city: 'New York, USA',
      location: 'Lower East Side Concrete',
      photographer: 'Chloe Miller',
      shoeId: 'den-01',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop&q=80',
      title: 'Subway Pace: Crimson Carbon',
      shoeName: 'DEN Phantom Carbon 01',
      category: 'New York',
    },
    {
      id: 'lb-3',
      city: 'London, UK',
      location: 'Soho Brick Lane',
      photographer: 'Oliver Grant',
      shoeId: 'den-03',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=800&fit=crop&q=80',
      title: 'Pastel Nostalgia: Record Sessions',
      shoeName: 'DEN Aero Horizon Retro',
      category: 'London',
    },
    {
      id: 'lb-4',
      city: 'Paris, France',
      location: 'Le Marais Gallery District',
      photographer: 'Camille Laurent',
      shoeId: 'den-06',
      image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&h=800&fit=crop&q=80',
      title: 'Minimal Monolith: Haute Court',
      shoeName: 'DEN Minimalist Court 00',
      category: 'Paris',
    },
  ];

  const filteredEditorials = activeCity === 'all' 
    ? editorials 
    : editorials.filter(e => e.category === activeCity);

  return (
    <section id="lookbook" className="py-20 md:py-28 bg-white border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-bold uppercase tracking-wider text-black">
              <Camera className="size-3.5 text-[#84cc16]" />
              <span>Editorial Lookbook</span>
            </div>
            <h2 
              className="text-4xl sm:text-5xl font-black tracking-tight text-black uppercase"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              DENCLUB ON THE STREETS
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 max-w-xl">
              Spotted in metropolitan capitals across the globe. Witness how collectors, athletes, and tastemakers style DENCLUB.
            </p>
          </div>

          {/* City Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {['all', 'Tokyo', 'New York', 'London', 'Paris'].map(city => (
              <button
                key={city}
                onClick={() => setActiveCity(city)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition cursor-pointer ${
                  activeCity === city
                    ? 'bg-black text-white shadow-sm'
                    : 'bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-black hover:bg-zinc-200'
                }`}
              >
                {city === 'all' ? 'All Cities' : city}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredEditorials.map(item => {
            const matchedShoe = shoes.find(s => s.id === item.shoeId) || shoes[0];

            return (
              <div 
                key={item.id}
                className="group relative rounded-3xl overflow-hidden bg-zinc-100 border border-zinc-200 aspect-[4/5] flex flex-col justify-end p-6 cursor-pointer shadow-md hover:shadow-xl transition-all"
                onClick={() => onQuickView(matchedShoe)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                {/* Location Tag */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-extrabold text-black border border-zinc-200 flex items-center gap-1 shadow-xs">
                    <MapPin className="size-3 text-[#65a30d]" />
                    {item.location}
                  </span>
                </div>

                {/* Bottom details */}
                <div className="relative z-10 space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#ccff00]">
                    {item.city} • Shot by {item.photographer}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#ccff00] transition">
                    {item.title}
                  </h3>
                  
                  <div className="pt-2 border-t border-white/20 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-zinc-300 block">Featured Model</span>
                      <span className="text-xs font-bold text-white">{item.shoeName}</span>
                    </div>
                    <div className="size-8 rounded-full bg-[#ccff00] text-black flex items-center justify-center transition">
                      <ArrowUpRight className="size-4" />
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
