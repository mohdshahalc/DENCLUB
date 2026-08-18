import React, { useState } from 'react';
import { Camera, MapPin, ArrowUpRight, LayoutGrid, GalleryHorizontalEnd, RotateCw, Orbit } from 'lucide-react';
import type { ShoeProduct } from '../types/store';
import { CircularGallery, type GalleryItem } from './ui/circular-gallery';
import { DiagonalMarqueeCarousel } from './ui/great-ui-diagonal-marquee-carousel';

interface LookbookProps {
  onQuickView: (shoe: ShoeProduct) => void;
  shoes: ShoeProduct[];
}

export function Lookbook({ onQuickView, shoes }: LookbookProps) {
  const [activeCity, setActiveCity] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'circular' | 'grid'>('circular');

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
    {
      id: 'lb-5',
      city: 'Berlin, Germany',
      location: 'Kreuzberg Industrial Quarter',
      photographer: 'Lukas Meyer',
      shoeId: 'den-04',
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=800&fit=crop&q=80',
      title: 'Monochrome Pulse: Tactical Stealth',
      shoeName: 'DEN Stealth Apex X',
      category: 'Berlin',
    },
    {
      id: 'lb-6',
      city: 'Seoul, South Korea',
      location: 'Gangnam Neon Promenade',
      photographer: 'Min-Jun Park',
      shoeId: 'den-07',
      image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&h=800&fit=crop&q=80',
      title: 'Hydro Velocity: Cybernetic Blue',
      shoeName: 'DEN Hydro Cobalt Track',
      category: 'Seoul',
    },
    {
      id: 'lb-7',
      city: 'Miami, USA',
      location: 'South Beach Ocean Drive',
      photographer: 'Julian Cruz',
      shoeId: 'den-05',
      image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&h=800&fit=crop&q=80',
      title: 'Solar Flare: Golden Hour Glide',
      shoeName: 'DEN Solar Flare Neon',
      category: 'Miami',
    },
  ];

  const filteredEditorials = activeCity === 'all' 
    ? editorials 
    : editorials.filter(e => e.category === activeCity);

  // Map to CircularGallery Items
  const circularItems: GalleryItem[] = editorials.map(e => {
    const matchedShoe = shoes.find(s => s.id === e.shoeId) || shoes[0];
    return {
      id: e.id,
      common: e.title,
      binomial: e.shoeName,
      location: e.location,
      photo: {
        url: e.image,
        text: e.city,
        by: e.photographer,
        pos: 'center',
      },
      onClick: () => onQuickView(matchedShoe),
    };
  });

  const marqueeCards = editorials.map((e, idx) => ({
    id: idx + 1,
    url: e.image,
    title: `${e.city} // ${e.title}`,
  }));

  return (
    <section id="lookbook" className="py-20 md:py-28 bg-white border-t border-zinc-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-950 text-white text-xs font-mono font-bold uppercase tracking-widest shadow-xs">
              <Camera className="size-3.5 text-[#ccff00]" />
              <span>STREET CULTURE ARCHIVE</span>
            </div>
            <h2 
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-black uppercase leading-[1.04]"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              DENCLUB ON THE STREETS
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 max-w-xl leading-relaxed">
              Spotted in metropolitan capitals across the globe. Witness how collectors, athletes, and tastemakers style DENCLUB in 3D.
            </p>
          </div>

          {/* View Mode & Filter Controls */}
          <div className="flex flex-wrap items-center gap-3 shrink-0 pb-1">
            {/* Dual View Mode Toggle */}
            <div className="flex items-center p-1 bg-zinc-100 rounded-full border border-zinc-200 shadow-xs">
              <button
                onClick={() => setViewMode('circular')}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase flex items-center gap-1.5 transition cursor-pointer ${
                  viewMode === 'circular' ? 'bg-[#ccff00] text-black shadow-xs font-black' : 'text-zinc-600 hover:text-black'
                }`}
              >
                <Orbit className="size-3.5" />
                <span>3D Circle</span>
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase flex items-center gap-1.5 transition cursor-pointer ${
                  viewMode === 'grid' ? 'bg-black text-white shadow-xs' : 'text-zinc-600 hover:text-black'
                }`}
              >
                <LayoutGrid className="size-3.5" />
                <span>Grid</span>
              </button>
            </div>

            {/* City Filter Pills */}
            {viewMode === 'grid' && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {['all', 'Tokyo', 'New York', 'London', 'Paris'].map(city => (
                  <button
                    key={city}
                    onClick={() => setActiveCity(city)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition cursor-pointer ${
                      activeCity === city
                        ? 'bg-black text-white shadow-xs'
                        : 'bg-zinc-100 border border-zinc-200 text-zinc-600 hover:text-black hover:bg-zinc-200'
                    }`}
                  >
                    {city === 'all' ? 'All' : city}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ======================================================================= */}
        {/* VIEW MODE 1: 3D CIRCULAR VAULT */}
        {/* ======================================================================= */}
        {viewMode === 'circular' && (
          <div className="relative w-full h-[420px] sm:h-[460px] rounded-3xl overflow-hidden bg-gradient-to-b from-zinc-50 via-zinc-100/70 to-white border border-zinc-200 shadow-xl flex items-center justify-center">
            
            {/* Guide Badge */}
            <div className="absolute top-4 z-20 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-zinc-200 shadow-md text-xs font-mono font-bold text-zinc-800 flex items-center gap-2">
              <RotateCw className="size-3 text-[#84cc16] animate-spin" style={{ animationDuration: '6s' }} />
              <span>DRAG OR SCROLL TO ROTATE 3D STREET LOOKBOOK</span>
            </div>

            {/* 3D Circular Cylinder Gallery */}
            <div className="w-full h-full">
              <CircularGallery 
                items={circularItems} 
                radius={360} 
                autoRotateSpeed={0.065} 
                onItemClick={(item) => {
                  const found = editorials.find(e => e.title === item.common);
                  if (found) {
                    const match = shoes.find(s => s.id === found.shoeId) || shoes[0];
                    onQuickView(match);
                  }
                }}
              />
            </div>

            {/* Bottom Subtle Fade */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white via-white/40 to-transparent z-10" />
          </div>
        )}

        {/* ======================================================================= */}
        {/* VIEW MODE 2: EDITORIAL PHOTO GRID (EXACT SECOND SCREENSHOT) */}
        {/* ======================================================================= */}
        {viewMode === 'grid' && (
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
                    <h3 className="text-lg font-bold text-white group-hover:text-[#ccff00] transition leading-snug">
                      {item.title}
                    </h3>
                    
                    <div className="pt-2 border-t border-white/20 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-zinc-300 block">Featured Model</span>
                        <span className="text-xs font-bold text-white">{item.shoeName}</span>
                      </div>
                      <div className="size-8 rounded-full bg-[#ccff00] text-black flex items-center justify-center transition group-hover:scale-110 shadow-sm">
                        <ArrowUpRight className="size-4" />
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
