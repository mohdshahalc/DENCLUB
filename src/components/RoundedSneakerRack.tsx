import React, { useState, useEffect, useRef } from 'react';
import type { ShoeProduct } from '../types/store';
import { DENCLUB_SHOES } from '../data/shoes';
import voltSneakerImg from '../assets/volt_sneaker.png';
import crimsonRunnerImg from '../assets/crimson_runner.png';
import { 
  Sparkles, 
  Eye, 
  ShoppingBag, 
  ArrowUpRight,
  ShieldCheck,
  Plus
} from 'lucide-react';

interface RoundedSneakerRackProps {
  onQuickView: (shoe: ShoeProduct) => void;
  onAddToCart: (shoe: ShoeProduct) => void;
}

export function RoundedSneakerRack({ onQuickView, onAddToCart }: RoundedSneakerRackProps) {
  const rackRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredShoeId, setHoveredShoeId] = useState<string | null>(null);

  // Smooth mouse parallax interpolation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!rackRef.current) return;
      const rect = rackRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
      setMousePos({ x, y });
    };

    const currentRack = rackRef.current;
    if (currentRack) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // 3D Parallax tilt angles
  const tiltX = mousePos.y * -5;
  const tiltY = mousePos.x * 6;

  // Curated 3 Tiers of Sneakers sitting on the rounded shelves
  const shelfTier1 = [
    { ...DENCLUB_SHOES[0], overrideImg: crimsonRunnerImg, tierTag: 'TIER 01 / APEX' },
    { ...DENCLUB_SHOES[1], overrideImg: voltSneakerImg, tierTag: 'TIER 01 / VOLT' },
    { ...DENCLUB_SHOES[2], tierTag: 'TIER 01 / AERO' }
  ];

  const shelfTier2 = [
    { ...DENCLUB_SHOES[3], tierTag: 'TIER 02 / STEALTH' },
    { ...DENCLUB_SHOES[4], tierTag: 'TIER 02 / SOLAR' },
    { ...DENCLUB_SHOES[5], tierTag: 'TIER 02 / MINIMAL' }
  ];

  const shelfTier3 = [
    { ...DENCLUB_SHOES[6], tierTag: 'TIER 03 / HYDRO' },
    { ...DENCLUB_SHOES[7], tierTag: 'TIER 03 / HYBRID' },
    { ...DENCLUB_SHOES[1], overrideImg: voltSneakerImg, tierTag: 'TIER 03 / VAULT' }
  ];

  return (
    <section id="rounded-rack" className="py-24 md:py-36 bg-white border-t border-zinc-200 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Editorial Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-950 text-white text-[11px] font-black uppercase tracking-widest shadow-md">
            <span className="size-2 rounded-full bg-[#ccff00] animate-ping" />
            <span className="text-[#ccff00]">●</span>
            <span>SHOWROOM ARCHITECTURE</span>
          </div>

          <h2 
            className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-black uppercase leading-[0.9]"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            THE SNEAKER RACK
          </h2>

          <p className="text-xs sm:text-sm font-mono font-bold tracking-widest text-zinc-500 uppercase">
            LATEST DROPS / CURATED IN 3D
          </p>
        </div>

        {/* ===================================================================== */}
        {/* LARGE ROUNDED 3D ARCHITECTURAL SNEAKER RACK (CAPSULE GEOMETRY) */}
        {/* ===================================================================== */}
        <div 
          ref={rackRef}
          className="relative w-full max-w-6xl mx-auto transition-transform duration-500 ease-out will-change-transform"
          style={{
            transform: `perspective(1800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
            transformStyle: 'preserve-3d'
          }}
        >
          
          {/* Subtle Outer Drop Shadow Floor Glow */}
          <div className="absolute -bottom-10 left-10 right-10 h-16 bg-black/10 blur-3xl rounded-full pointer-events-none -z-10" />

          {/* MAIN MOLDED CAPSULE HOUSING (Sculpted 3D Beveled Frame) */}
          <div className="relative w-full rounded-[45px] sm:rounded-[65px] lg:rounded-[80px] bg-gradient-to-b from-[#fdfdfd] via-[#f7f7f8] to-[#ededef] border-[3px] border-zinc-200/90 shadow-[0_35px_80px_rgba(0,0,0,0.08),inset_0_3px_6px_rgba(255,255,255,0.9),inset_0_-6px_12px_rgba(0,0,0,0.04)] p-4 sm:p-7 lg:p-9 overflow-hidden">
            
            {/* Subtle Lime Top Bevel Accent Hairline */}
            <div className="absolute top-0 left-1/4 right-1/4 h-[2px] bg-gradient-to-r from-transparent via-[#84cc16]/50 to-transparent pointer-events-none" />

            {/* INNER RECESSED SHOWROOM CAVITY (Depth Chamber) */}
            <div className="relative w-full rounded-[35px] sm:rounded-[50px] lg:rounded-[65px] bg-gradient-to-b from-zinc-100/90 via-zinc-50/60 to-zinc-100/95 border border-zinc-200/80 shadow-[inset_0_16px_36px_rgba(0,0,0,0.06),inset_0_-12px_28px_rgba(0,0,0,0.03)] p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
              
              {/* Top Cavity Status Badge */}
              <div className="flex items-center justify-between px-4 text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">
                <span className="flex items-center gap-1.5 text-black">
                  <ShieldCheck className="size-3.5 text-[#84cc16]" />
                  DENCLUB ATELIER // CAPSULE RACK 01
                </span>
                <span className="hidden sm:inline">CAPACITY: 09 SILHOUETTES</span>
              </div>

              {/* --------------------------------------------------------------- */}
              {/* SHELF TIER 1: PROPULSION & SPEED (Top Curved Shelf) */}
              {/* --------------------------------------------------------------- */}
              <div className="relative pb-5">
                {/* Sneakers on Shelf */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 items-end justify-items-center relative z-10 px-2 sm:px-6">
                  {shelfTier1.map((shoe) => {
                    const isHovered = hoveredShoeId === shoe.id;
                    const displayImg = (shoe as any).overrideImg || shoe.image;

                    return (
                      <div
                        key={`tier1-${shoe.id}`}
                        onMouseEnter={() => setHoveredShoeId(shoe.id)}
                        onMouseLeave={() => setHoveredShoeId(null)}
                        onClick={() => onQuickView(shoe)}
                        className="group relative flex flex-col items-center cursor-pointer w-full max-w-[240px] pt-4"
                      >
                        {/* Sneaker Image with 3D Pop Lift */}
                        <div className="relative transition-all duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-3 group-hover:rotate-[-2deg]">
                          <img
                            src={displayImg}
                            alt={shoe.name}
                            className="h-28 sm:h-32 md:h-36 object-contain drop-shadow-[0_12px_18px_rgba(0,0,0,0.12)] select-none pointer-events-none"
                            draggable={false}
                          />
                        </div>

                        {/* Soft Contact Shadow on Shelf */}
                        <div className="w-3/4 h-3 bg-black/15 blur-md rounded-full -mt-1 group-hover:scale-110 group-hover:bg-black/25 transition-all duration-300" />

                        {/* Interactive Tooltip Label */}
                        <div className="mt-2 text-center transition-all duration-200">
                          <span className="text-xs font-bold text-black group-hover:text-[#65a30d] transition-colors block truncate max-w-[190px]">
                            {shoe.name}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-zinc-400">
                            ${shoe.price}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Sculpted Curved Shelf Surface */}
                <div className="mt-2 w-full h-4 sm:h-5 rounded-[24px] bg-gradient-to-b from-white via-zinc-100 to-zinc-200/90 border-t border-white border-b-2 border-zinc-300 shadow-[0_6px_14px_rgba(0,0,0,0.04)] relative">
                  <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />
                </div>
              </div>

              {/* --------------------------------------------------------------- */}
              {/* SHELF TIER 2: LIFESTYLE & TECH (Middle Curved Shelf with Lime Lip) */}
              {/* --------------------------------------------------------------- */}
              <div className="relative pb-5">
                {/* Sneakers on Shelf */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 items-end justify-items-center relative z-10 px-2 sm:px-6">
                  {shelfTier2.map((shoe) => {
                    const isHovered = hoveredShoeId === shoe.id;
                    const displayImg = (shoe as any).overrideImg || shoe.image;

                    return (
                      <div
                        key={`tier2-${shoe.id}`}
                        onMouseEnter={() => setHoveredShoeId(shoe.id)}
                        onMouseLeave={() => setHoveredShoeId(null)}
                        onClick={() => onQuickView(shoe)}
                        className="group relative flex flex-col items-center cursor-pointer w-full max-w-[240px] pt-4"
                      >
                        {/* Sneaker Image with 3D Pop Lift */}
                        <div className="relative transition-all duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-3 group-hover:rotate-[2deg]">
                          <img
                            src={displayImg}
                            alt={shoe.name}
                            className="h-28 sm:h-32 md:h-36 object-contain drop-shadow-[0_12px_18px_rgba(0,0,0,0.12)] select-none pointer-events-none"
                            draggable={false}
                          />
                        </div>

                        {/* Soft Contact Shadow on Shelf */}
                        <div className="w-3/4 h-3 bg-black/15 blur-md rounded-full -mt-1 group-hover:scale-110 group-hover:bg-black/25 transition-all duration-300" />

                        {/* Interactive Tooltip Label */}
                        <div className="mt-2 text-center transition-all duration-200">
                          <span className="text-xs font-bold text-black group-hover:text-[#65a30d] transition-colors block truncate max-w-[190px]">
                            {shoe.name}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-zinc-400">
                            ${shoe.price}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Sculpted Curved Shelf Surface with Subtle Lime Lip Highlight */}
                <div className="mt-2 w-full h-4 sm:h-5 rounded-[24px] bg-gradient-to-b from-white via-zinc-100 to-zinc-200/90 border-t border-white border-b-2 border-[#84cc16]/50 shadow-[0_6px_14px_rgba(0,0,0,0.05)] relative">
                  <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-[#ccff00]/60 to-transparent" />
                </div>
              </div>

              {/* --------------------------------------------------------------- */}
              {/* SHELF TIER 3: HERITAGE & COLLABS (Bottom Curved Shelf) */}
              {/* --------------------------------------------------------------- */}
              <div className="relative pb-2">
                {/* Sneakers on Shelf */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 items-end justify-items-center relative z-10 px-2 sm:px-6">
                  {shelfTier3.map((shoe, idx) => {
                    const isHovered = hoveredShoeId === shoe.id;
                    const displayImg = (shoe as any).overrideImg || shoe.image;

                    return (
                      <div
                        key={`tier3-${shoe.id}-${idx}`}
                        onMouseEnter={() => setHoveredShoeId(shoe.id)}
                        onMouseLeave={() => setHoveredShoeId(null)}
                        onClick={() => onQuickView(shoe)}
                        className="group relative flex flex-col items-center cursor-pointer w-full max-w-[240px] pt-4"
                      >
                        {/* Sneaker Image with 3D Pop Lift */}
                        <div className="relative transition-all duration-300 ease-out group-hover:scale-110 group-hover:-translate-y-3 group-hover:rotate-[-2deg]">
                          <img
                            src={displayImg}
                            alt={shoe.name}
                            className="h-28 sm:h-32 md:h-36 object-contain drop-shadow-[0_12px_18px_rgba(0,0,0,0.12)] select-none pointer-events-none"
                            draggable={false}
                          />
                        </div>

                        {/* Soft Contact Shadow on Shelf */}
                        <div className="w-3/4 h-3 bg-black/15 blur-md rounded-full -mt-1 group-hover:scale-110 group-hover:bg-black/25 transition-all duration-300" />

                        {/* Interactive Tooltip Label */}
                        <div className="mt-2 text-center transition-all duration-200">
                          <span className="text-xs font-bold text-black group-hover:text-[#65a30d] transition-colors block truncate max-w-[190px]">
                            {shoe.name}
                          </span>
                          <span className="text-[10px] font-mono font-bold text-zinc-400">
                            ${shoe.price}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom Base Shelf Foundation */}
                <div className="mt-2 w-full h-4 sm:h-5 rounded-[24px] bg-gradient-to-b from-white via-zinc-100 to-zinc-200/90 border-t border-white border-b-2 border-zinc-300 shadow-[0_6px_14px_rgba(0,0,0,0.04)] relative">
                  <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Bottom Quick Action Bar */}
        <div className="mt-12 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#catalog"
            className="px-8 py-4 rounded-full bg-[#ccff00] hover:bg-[#b8e600] active:scale-95 text-black font-black text-xs uppercase tracking-wider transition-all duration-200 shadow-md flex items-center gap-2 cursor-pointer"
          >
            <span>Explore Full Catalog</span>
            <ArrowUpRight className="size-4" />
          </a>

          <a
            href="#size-finder"
            className="px-7 py-4 rounded-full bg-zinc-100 hover:bg-zinc-200 border border-zinc-300 text-black font-bold text-xs uppercase tracking-wider transition cursor-pointer"
          >
            Calculate Your Size
          </a>
        </div>

      </div>
    </section>
  );
}
