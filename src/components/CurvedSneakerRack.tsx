import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { ShoeProduct } from '../types/store';
import { DENCLUB_SHOES } from '../data/shoes';
import voltSneakerImg from '../assets/volt_sneaker.png';
import crimsonRunnerImg from '../assets/crimson_runner.png';
import stealthSneakerImg from '../assets/stealth_sneaker.png';
import { 
  Sparkles, 
  Eye, 
  ShoppingBag, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MousePointer2
} from 'lucide-react';

interface CurvedSneakerRackProps {
  onQuickView: (shoe: ShoeProduct) => void;
  onAddToCart: (shoe: ShoeProduct) => void;
}

interface RackShoeItem {
  shoe: ShoeProduct;
  customImg: string;
}

export function CurvedSneakerRack({ onQuickView, onAddToCart }: CurvedSneakerRackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Shoes list for the 3D rotating rack
  const rackShoes: RackShoeItem[] = [
    { shoe: DENCLUB_SHOES[1] || DENCLUB_SHOES[0], customImg: voltSneakerImg },
    { shoe: DENCLUB_SHOES[0], customImg: crimsonRunnerImg },
    { shoe: DENCLUB_SHOES[3] || DENCLUB_SHOES[0], customImg: stealthSneakerImg },
    { shoe: DENCLUB_SHOES[1] || DENCLUB_SHOES[0], customImg: voltSneakerImg },
    { shoe: DENCLUB_SHOES[0], customImg: crimsonRunnerImg },
    { shoe: DENCLUB_SHOES[3] || DENCLUB_SHOES[0], customImg: stealthSneakerImg },
    { shoe: DENCLUB_SHOES[1] || DENCLUB_SHOES[0], customImg: voltSneakerImg }
  ];

  const count = rackShoes.length;
  
  // Continuous index / target index for smooth glide
  const [activeIndex, setActiveIndex] = useState(2); // Start with center item
  const posRef = useRef(2);
  const targetPosRef = useRef(2);
  const rafRef = useRef<number | null>(null);

  // Mouse Parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Smooth RAF loop for settling onto clicked shoe
  const updatePosition = useCallback(() => {
    const diff = targetPosRef.current - posRef.current;
    if (Math.abs(diff) < 0.001) {
      posRef.current = targetPosRef.current;
      setActiveIndex(Math.round(targetPosRef.current));
      rafRef.current = null;
      return;
    }

    // Smooth exponential glide damping
    posRef.current += diff * 0.08;
    setActiveIndex(Math.round(posRef.current));
    
    // Force re-render for smooth 60-120fps motion
    if (stageRef.current) {
      setRenderTrigger(prev => prev + 1);
    }

    rafRef.current = requestAnimationFrame(updatePosition);
  }, []);

  const [, setRenderTrigger] = useState(0);

  const goToIndex = (newIndex: number) => {
    targetPosRef.current = newIndex;
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(updatePosition);
    }
  };

  // Mouse Wheel Scrubbing through the curved rack
  useEffect(() => {
    const stage = containerRef.current;
    if (!stage) return;

    const handleWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 4) return;
      e.preventDefault();

      const step = delta > 0 ? 1 : -1;
      const nextIndex = Math.max(0, Math.min(count - 1, targetPosRef.current + step));
      goToIndex(nextIndex);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePos({ x, y });
    };

    stage.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      stage.removeEventListener('wheel', handleWheel);
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [count, updatePosition]);

  const currentCenterShoe = rackShoes[Math.max(0, Math.min(count - 1, Math.round(posRef.current)))]?.shoe || DENCLUB_SHOES[0];

  const tiltX = mousePos.y * -3;
  const tiltY = mousePos.x * 5;

  return (
    <section 
      id="curved-rack" 
      ref={containerRef}
      className="relative w-full min-h-screen py-6 sm:py-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-between overflow-hidden bg-white border-t border-zinc-200 selection:bg-[#ccff00] selection:text-black select-none"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between my-auto">
        
        {/* Subtle Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-1.5 pt-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-950 text-white text-[10px] font-black uppercase tracking-widest shadow-md">
            <span className="size-1.5 rounded-full bg-[#ccff00] animate-ping" />
            <span className="text-[#ccff00]">●</span>
            <span>3D ARCHITECTURAL RACK</span>
          </div>

          <h2 
            className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-black uppercase leading-[0.9]"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            THE SNEAKER RACK
          </h2>

          <p className="text-[11px] font-mono font-bold tracking-widest text-zinc-400 uppercase flex items-center justify-center gap-1.5">
            <MousePointer2 className="size-3 text-[#84cc16]" />
            <span>Click any shoe or scroll to center</span>
          </p>
        </div>

        {/* ===================================================================== */}
        {/* TRUE 3D CURVED SNEAKER RACK (ONLY CENTER SHOE HIGHLIGHTED) */}
        {/* ===================================================================== */}
        <div 
          ref={stageRef}
          className="relative w-full max-w-5xl mx-auto min-h-[420px] sm:min-h-[460px] flex items-center justify-center py-6 my-auto transition-transform duration-500 ease-out will-change-transform"
          style={{
            perspective: '1400px',
            transformStyle: 'preserve-3d',
            transform: `perspective(1400px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
          }}
        >
          
          {/* Ambient Lighting & Glow Spotlight on Center */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-b from-[#ccff00]/15 via-zinc-100/40 to-transparent blur-[90px] rounded-full pointer-events-none -z-10" />

          {/* Sculpted 3D Curved Shelf Base Platform */}
          <div 
            className="absolute bottom-12 w-full max-w-4xl h-10 rounded-[50%_50%_40%_40%/100%_100%_0%_0%] bg-gradient-to-b from-white via-zinc-100 to-zinc-200 border-t border-white border-b-2 border-zinc-300 shadow-[0_15px_30px_rgba(0,0,0,0.06),inset_0_2px_4px_rgba(255,255,255,0.9)] pointer-events-none"
            style={{
              transform: 'rotateX(40deg) translateZ(10px)',
              transformOrigin: 'bottom center'
            }}
          >
            {/* Subtle Lime Hairline Glow on Curved Center Crest */}
            <div className="absolute top-0 left-16 right-16 h-[2px] bg-gradient-to-r from-transparent via-[#84cc16]/75 to-transparent" />
          </div>

          {/* =================================================================== */}
          {/* 3D SHOES ON CURVED RING (CLICK TO CENTER) */}
          {/* =================================================================== */}
          {rackShoes.map((item, idx) => {
            // Distance from active center position
            const offset = idx - posRef.current;
            const absOffset = Math.abs(offset);
            const isCenter = absOffset < 0.45;

            // Curved cylindrical arc geometry
            const spacingX = 190;
            const x = offset * spacingX;
            // Z curve recession
            const z = Math.max(-120, 85 - Math.pow(absOffset, 1.4) * 45);
            // Inward angle
            const rotY = -offset * 14;
            // Scale: Center is big (1.25x), sides shrink
            const scale = Math.max(0.72, 1.25 - absOffset * 0.18);
            // Opacity: Center is 1.0, sides are dimmed / hidden (0.28 to 0.38)
            const opacity = isCenter 
              ? 1 
              : Math.max(0.2, 0.45 - (absOffset - 1) * 0.12);
            // Brightness filter
            const brightness = isCenter ? 1.08 : 0.65;
            const blurAmount = isCenter ? 0 : Math.min(2, (absOffset - 0.5) * 1.2);

            return (
              <div
                key={`rack-shoe-${idx}`}
                onClick={() => goToIndex(idx)}
                className="absolute flex flex-col items-center cursor-pointer will-change-transform select-none group"
                style={{
                  transform: `translate3d(${x}px, ${-absOffset * 8}px, ${z}px) rotateY(${rotY}deg) scale(${scale})`,
                  opacity,
                  filter: `brightness(${brightness}) blur(${blurAmount}px)`,
                  zIndex: isCenter ? 50 : Math.round(50 - absOffset * 10),
                  transition: 'opacity 0.25s ease-out, filter 0.25s ease-out',
                  transformStyle: 'preserve-3d'
                }}
              >
                {/* Clean Sneaker Cutout (NO CARD CONTAINER, NO TEXT CLUTTER) */}
                <div className="relative">
                  <img
                    src={item.customImg}
                    alt={item.shoe.name}
                    className="w-44 sm:w-56 md:w-64 object-contain select-none pointer-events-none drop-shadow-[0_20px_28px_rgba(0,0,0,0.18)] transition-transform duration-300"
                    draggable={false}
                  />

                  {/* Active Center Sparkle Halo */}
                  {isCenter && (
                    <div className="absolute -inset-4 bg-radial from-[#ccff00]/15 to-transparent rounded-full blur-xl pointer-events-none -z-10 animate-pulse" />
                  )}
                </div>

                {/* Ground Contact Shadow */}
                <div 
                  className={`h-3 bg-black/25 blur-md rounded-full -mt-2 transition-all duration-300 ${
                    isCenter ? 'w-48 bg-black/35 blur-lg scale-110' : 'w-32 bg-black/10'
                  }`} 
                />
              </div>
            );
          })}

        </div>

        {/* ===================================================================== */}
        {/* CENTER SHOE INFO & ACTION CTAs (ONLY FOR CENTER HIGHLIGHTED SHOE) */}
        {/* ===================================================================== */}
        <div className="text-center pt-2 pb-2 space-y-3">
          
          <div className="space-y-0.5 animate-in fade-in duration-300">
            <h3 
              className="text-xl sm:text-2xl md:text-3xl font-black text-black uppercase tracking-tight"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              {currentCenterShoe.name}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 font-bold">
              {currentCenterShoe.tagline} • <span className="text-[#65a30d] font-mono font-black">${currentCenterShoe.price}</span>
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              onClick={() => onQuickView(currentCenterShoe)}
              className="px-6 py-2.5 rounded-full bg-[#ccff00] hover:bg-[#b8e600] active:scale-95 text-black font-black text-xs uppercase tracking-wider transition shadow-sm flex items-center gap-2 cursor-pointer"
            >
              <Eye className="size-3.5" />
              <span>Inspect Model</span>
            </button>

            <button
              onClick={() => onAddToCart(currentCenterShoe)}
              className="px-6 py-2.5 rounded-full bg-white hover:bg-zinc-100 border border-zinc-300 text-black font-bold text-xs uppercase tracking-wider transition shadow-2xs flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <ShoppingBag className="size-3.5 text-zinc-800" />
              <span>Add to Bag (${currentCenterShoe.price})</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
