import React from 'react';
import { CircularGallery, GalleryItem } from '@/components/ui/circular-gallery';

const galleryData: GalleryItem[] = [
  {
    common: 'DEN Phantom Carbon 01',
    binomial: 'Full-Wave Carbon Propulsion Runner',
    photo: {
      url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop&q=80',
      text: 'New York, USA',
      pos: 'center',
      by: 'Marcus Vance'
    }
  },
  {
    common: 'DEN Cyber Volt V2',
    binomial: 'High-Visibility Neon Volt High-Top',
    photo: {
      url: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=900&auto=format&fit=crop&q=80',
      text: 'Tokyo, Japan',
      pos: 'center',
      by: 'Kenji Sato'
    }
  },
  {
    common: 'DEN Stealth Apex X',
    binomial: 'Triple-Black Tactical Silhouette',
    photo: {
      url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=900&auto=format&fit=crop&q=80',
      text: 'London, UK',
      pos: 'center',
      by: 'Elena Rostova'
    }
  },
  {
    common: 'DEN Aero Horizon Retro',
    binomial: 'Pastel Nostalgia 90s Horizon Court',
    photo: {
      url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=900&auto=format&fit=crop&q=80',
      text: 'Berlin, Germany',
      pos: 'center',
      by: 'Lukas Meyer'
    }
  }
];

export default function CircularGalleryDemo() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-white">
      <div className="text-center mb-8 absolute top-16 z-10">
        <h1 className="text-4xl font-bold uppercase" style={{ fontFamily: 'Syne, sans-serif' }}>3D Circular Gallery</h1>
        <p className="text-zinc-500 font-mono">Scroll or watch the 3D rotating carousel</p>
      </div>
      <div className="w-full h-full">
        <CircularGallery items={galleryData} />
      </div>
    </div>
  );
}
