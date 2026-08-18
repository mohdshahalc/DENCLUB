import React from "react";
import { DiagonalMarqueeCarousel } from "./ui/great-ui-diagonal-marquee-carousel";
import { Sparkles, ArrowRight } from "lucide-react";

export function StreetMarqueeSection() {
  const streetCards = [
    {
      id: "m-1",
      url: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&h=600&fit=crop&q=80",
      title: "Tokyo Shibuya Night Vault",
    },
    {
      id: "m-2",
      url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop&q=80",
      title: "New York Crimson Carbon",
    },
    {
      id: "m-3",
      url: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=600&fit=crop&q=80",
      title: "London Retro Pastel Horizon",
    },
    {
      id: "m-4",
      url: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=600&fit=crop&q=80",
      title: "Paris Haute Stealth Apex",
    },
    {
      id: "m-5",
      url: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&h=600&fit=crop&q=80",
      title: "Berlin Underground Solar Flare",
    },
    {
      id: "m-6",
      url: "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&h=600&fit=crop&q=80",
      title: "Milan Monochrome Minimalist",
    },
  ];

  return (
    <section className="relative w-full py-20 bg-white text-zinc-900 overflow-hidden border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center space-y-3 relative z-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-950 text-white text-xs font-mono font-bold uppercase tracking-widest shadow-md">
          <Sparkles className="size-3.5 text-[#ccff00] animate-spin" style={{ animationDuration: '4s' }} />
          <span>DIAGONAL STREET MARQUEE</span>
        </div>

        <h2 
          className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-black"
          style={{ fontFamily: 'Syne, sans-serif' }}
        >
          GLOBAL SNEAKER ARCHIVE
        </h2>

        <p className="text-sm text-zinc-500 max-w-xl mx-auto font-mono">
          Hover to pause motion • Continuous infinite multi-lane diagonal stream
        </p>
      </div>

      {/* Full-width Diagonal Marquee Viewport */}
      <div className="relative w-full h-[620px] overflow-hidden">
        <DiagonalMarqueeCarousel
          cards={streetCards}
          angle={-20}
          baseSpeed={100}
          className="h-[620px] bg-transparent"
        />
      </div>
    </section>
  );
}
