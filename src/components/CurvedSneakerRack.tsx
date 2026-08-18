import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { ShoeProduct } from '../types/store';
import { DENCLUB_SHOES } from '../data/shoes';
import voltSneakerImg from '../assets/volt_sneaker.png';
import crimsonRunnerImg from '../assets/crimson_runner.png';
import stealthSneakerImg from '../assets/stealth_sneaker.png';
import solarSneakerImg from '../assets/solar_sneaker.png';
import cobaltRunnerImg from '../assets/cobalt_runner.png';
import pinkSneakerImg from '../assets/pink_sneaker.png';
import aethelFlightstepImg from '../assets/aethel_flightstep.png';
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

  // Expanded Diverse Shoes List for the 3D rotating curve wave rack
  const rackShoes: RackShoeItem[] = [
    { shoe: DENCLUB_SHOES[8] || DENCLUB_SHOES[0], customImg: aethelFlightstepImg },
    { shoe: DENCLUB_SHOES[4] || DENCLUB_SHOES[0], customImg: solarSneakerImg },
    { shoe: DENCLUB_SHOES[1] || DENCLUB_SHOES[0], customImg: voltSneakerImg },
    { shoe: DENCLUB_SHOES[2] || DENCLUB_SHOES[0], customImg: pinkSneakerImg },
    { shoe: DENCLUB_SHOES[0], customImg: crimsonRunnerImg },
    { shoe: DENCLUB_SHOES[3] || DENCLUB_SHOES[0], customImg: stealthSneakerImg },
    { shoe: DENCLUB_SHOES[6] || DENCLUB_SHOES[0], customImg: cobaltRunnerImg },
    { shoe: DENCLUB_SHOES[8] || DENCLUB_SHOES[0], customImg: aethelFlightstepImg },
    { shoe: DENCLUB_SHOES[4] || DENCLUB_SHOES[0], customImg: solarSneakerImg },
    { shoe: DENCLUB_SHOES[2] || DENCLUB_SHOES[0], customImg: pinkSneakerImg },
    { shoe: DENCLUB_SHOES[1] || DENCLUB_SHOES[0], customImg: voltSneakerImg },
    { shoe: DENCLUB_SHOES[0], customImg: crimsonRunnerImg },
    { shoe: DENCLUB_SHOES[3] || DENCLUB_SHOES[0], customImg: stealthSneakerImg },
    { shoe: DENCLUB_SHOES[6] || DENCLUB_SHOES[0], customImg: cobaltRunnerImg }
  ];

  const count = rackShoes.length;
  
  // Continuous index / target index for smooth glide
  const [activeIndex, setActiveIndex] = useState(3); // Start centered
  const posRef = useRef(3);
  const targetPosRef = useRef(3);
  const rafRef = useRef<number | null>(null);

  // Mouse Parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Velocity & Momentum Inertia State
  const velocityRef = useRef(0);
  const isInteracting = useRef(false);

  // Smooth continuous position interpolation with spring settling & momentum
  const updatePosition = useCallback(() => {
    const diff = targetPosRef.current - posRef.current;
    
    if (Math.abs(diff) < 0.0003 && Math.abs(velocityRef.current) < 0.0003) {
      posRef.current = targetPosRef.current;
      setActiveIndex(Math.round(targetPosRef.current));
      rafRef.current = null;
      return;
    }

    // Critically damped fluid spring lerp (ultra-smooth 120 FPS glide)
    posRef.current += diff * 0.09 + velocityRef.current;
    velocityRef.current *= 0.88; // inertia damping

    setActiveIndex(Math.round(posRef.current));
    
    if (stageRef.current) {
      setRenderTrigger(prev => prev + 1);
    }

    rafRef.current = requestAnimationFrame(updatePosition);
  }, []);

  const [, setRenderTrigger] = useState(0);

  const goToIndex = (newIndex: number) => {
    targetPosRef.current = Math.max(0, Math.min(count - 1, newIndex));
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(updatePosition);
    }
  };

  // Drag / Swipe handling with momentum release
  const isDraggingRack = useRef(false);
  const dragStartX = useRef(0);
  const dragLastX = useRef(0);
  const dragStartPos = useRef(3);

  const handleRackMouseDown = (e: React.MouseEvent) => {
    isDraggingRack.current = true;
    isInteracting.current = true;
    dragStartX.current = e.clientX;
    dragLastX.current = e.clientX;
    dragStartPos.current = posRef.current;
    velocityRef.current = 0;
  };

  const handleRackMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRack.current) return;
    const deltaX = e.clientX - dragStartX.current;
    const instantaneousDelta = e.clientX - dragLastX.current;
    dragLastX.current = e.clientX;

    // Track fling velocity
    velocityRef.current = -instantaneousDelta / 220;

    const stepDelta = -deltaX / 190;
    const nextPos = Math.max(0, Math.min(count - 1, dragStartPos.current + stepDelta));
    targetPosRef.current = nextPos;
    if (rafRef.current === null) {
      rafRef.current = requestAnimationFrame(updatePosition);
    }
  };

  const handleRackMouseUp = () => {
    if (isDraggingRack.current) {
      isDraggingRack.current = false;
      isInteracting.current = false;
      // Smoothly snap to nearest whole shoe with inertia projection
      const projected = targetPosRef.current + velocityRef.current * 4;
      goToIndex(Math.round(Math.max(0, Math.min(count - 1, projected))));
    }
  };

  // Horizontal trackpad gesture
  const lastWheelTime = useRef(0);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.2 && Math.abs(e.deltaX) > 8) {
        const now = Date.now();
        if (now - lastWheelTime.current < 140) return;

        const step = e.deltaX > 0 ? 1 : -1;
        const current = Math.round(targetPosRef.current);
        const nextIndex = Math.max(0, Math.min(count - 1, current + step));

        if (nextIndex !== current) {
          lastWheelTime.current = now;
          goToIndex(nextIndex);
        }
      }
    };

    stage.addEventListener('wheel', handleWheel, { passive: true });

    return () => {
      stage.removeEventListener('wheel', handleWheel);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [count, updatePosition]);

  // Parallax tracking
  useEffect(() => {
    const stage = containerRef.current;
    if (!stage) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = stage.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseup', handleRackMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleRackMouseUp);
    };
  }, []);

  // 120 FPS continuous loop for living wave physics
  const timeRef = useRef(0);
  const [, setTick] = useState(0);

  useEffect(() => {
    let animId: number;
    const waveLoop = () => {
      timeRef.current += 0.025;
      setTick(t => (t + 1) % 1000000);
      animId = requestAnimationFrame(waveLoop);
    };
    animId = requestAnimationFrame(waveLoop);
    return () => cancelAnimationFrame(animId);
  }, []);

  const currentCenterShoe = rackShoes[Math.max(0, Math.min(count - 1, Math.round(posRef.current)))]?.shoe || DENCLUB_SHOES[0];

  const tiltX = mousePos.y * -3;
  const tiltY = mousePos.x * 5;

  return (
    <section 
      id="sneaker-vault" 
      ref={containerRef}
      className="relative w-full min-h-[90vh] sm:min-h-[95vh] py-6 sm:py-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-center overflow-hidden bg-white border-t border-zinc-200 selection:bg-[#ccff00] selection:text-black select-none scroll-mt-20 snap-start"
    >
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between my-auto relative space-y-3 sm:space-y-4">
        
        {/* Subtle Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-zinc-950 text-white text-[10px] font-black uppercase tracking-widest shadow-md">
            <span className="size-1.5 rounded-full bg-[#ccff00] animate-ping" />
            <span className="text-[#ccff00]">●</span>
            <span>3D ARCHITECTURAL WAVE</span>
          </div>

          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-black uppercase leading-none"
            style={{ fontFamily: 'Syne, sans-serif' }}
          >
            THE SNEAKER RACK
          </h2>

          <p className="text-[10px] sm:text-[11px] font-mono font-bold tracking-widest text-zinc-400 uppercase flex items-center justify-center gap-1.5">
            <MousePointer2 className="size-3 text-[#84cc16]" />
            <span>Click or drag any shoe to rotate</span>
          </p>
        </div>

        {/* ===================================================================== */}
        {/* 3D HARMONIC CURVE WAVE STAGE */}
        {/* ===================================================================== */}
        <div className="relative w-full max-w-6xl mx-auto flex items-center justify-center py-2">
          
          {/* Left Arrow Button */}
          <button
            onClick={() => goToIndex(Math.max(0, activeIndex - 1))}
            className="absolute left-2 sm:left-4 z-40 p-2.5 rounded-full bg-white/95 hover:bg-black hover:text-white text-black border border-zinc-200 shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md hidden sm:flex items-center justify-center"
            aria-label="Previous shoe"
          >
            <ChevronLeft className="size-5" />
          </button>

          {/* 3D Stage with Wave Perspective */}
          <div 
            ref={stageRef}
            onMouseDown={handleRackMouseDown}
            onMouseMove={handleRackMouseMove}
            onMouseUp={handleRackMouseUp}
            className="relative w-full max-w-5xl mx-auto min-h-[270px] sm:min-h-[310px] md:min-h-[340px] flex items-center justify-center py-2 my-auto transition-transform duration-500 ease-out will-change-transform cursor-grab active:cursor-grabbing"
            style={{
              perspective: '1500px',
              transformStyle: 'preserve-3d',
              transform: `perspective(1500px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
            }}
          >
            
            {/* Ambient Pristine Studio Lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-radial from-zinc-200/40 via-zinc-100/15 to-transparent blur-[75px] rounded-full pointer-events-none -z-10" />

            {/* Sculpted 3D Wave Shelf Platform */}
            <div 
              className="absolute bottom-4 sm:bottom-6 w-full max-w-4xl h-9 rounded-[50%_50%_40%_40%/100%_100%_0%_0%] bg-gradient-to-b from-white via-zinc-100 to-zinc-200 border-t border-white border-b-2 border-zinc-300 shadow-[0_16px_32px_rgba(0,0,0,0.06),inset_0_2px_4px_rgba(255,255,255,0.9)] pointer-events-none"
              style={{
                transform: 'rotateX(42deg) translateZ(15px)',
                transformOrigin: 'bottom center'
              }}
            >
              {/* Vibrant Wave Hairline Glow */}
              <div className="absolute top-0 left-12 right-12 h-[2.5px] bg-gradient-to-r from-transparent via-[#84cc16]/80 to-transparent" />
            </div>

            {/* =================================================================== */}
            {/* 3D SHOES UNDULATING ON HARMONIC CURVE WAVE */}
            {/* =================================================================== */}
            {rackShoes.map((item, idx) => {
              const offset = idx - posRef.current;
              const absOffset = Math.abs(offset);
              const isCenter = absOffset < 0.45;

              // Harmonic 3D Curve Wave Physics
              const spacingX = 195;
              const x = offset * spacingX;
              
              // Sinusoidal Wave Elevation & Natural Dip
              const waveY = (Math.cos(offset * 0.72) - 1) * 30 + Math.sin(offset * 1.15) * 10;
              // Living float wave oscillation
              const livingFloat = Math.sin(timeRef.current * 1.2 + idx * 0.85) * 5.5;
              const y = waveY + livingFloat;

              // 3D Depth Wave (Z-Arc)
              const z = Math.cos(offset * 0.52) * 100 - 20;

              // 3D Wave Tilts (Dynamic banking into the wave curve)
              const rotZ = Math.sin(offset * 0.65) * -11 + Math.cos(timeRef.current + idx * 0.8) * 2;
              const rotY = -offset * 15;
              const rotX = 4 + Math.sin(timeRef.current * 0.8 + idx) * 2.5;

              // Scale & Opacity & Soft Blur on Edges
              const scale = Math.max(0.7, 1.2 - absOffset * 0.15);
              const opacity = isCenter 
                ? 1 
                : Math.max(0.28, 0.58 - (absOffset - 1) * 0.14);
              const brightness = isCenter ? 1.06 : 0.72;
              const blurAmount = isCenter ? 0 : Math.min(1.8, (absOffset - 0.5) * 1.0);

              return (
                <div
                  key={`rack-shoe-${idx}`}
                  onClick={() => goToIndex(idx)}
                  className="absolute flex flex-col items-center cursor-pointer will-change-transform select-none group"
                  style={{
                    transform: `translate3d(${x}px, ${y}px, ${z}px) rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scale})`,
                    opacity,
                    filter: `brightness(${brightness}) blur(${blurAmount}px)`,
                    zIndex: isCenter ? 50 : Math.round(50 - absOffset * 10),
                    transition: 'opacity 0.25s ease-out, filter 0.25s ease-out',
                    transformStyle: 'preserve-3d'
                  }}
                >
                  {/* Sneaker Visual with Dynamic Hover Floating */}
                  <div className="relative">
                    <img
                      src={item.customImg}
                      alt={item.shoe.name}
                      className="w-34 sm:w-44 md:w-52 lg:w-58 object-contain select-none pointer-events-none drop-shadow-[0_20px_28px_rgba(0,0,0,0.18)] transition-transform duration-300 group-hover:scale-105"
                      draggable={false}
                    />
                  </div>

                  {/* Dynamic Floor Shadow with Wave Elevation Scaling */}
                  <div 
                    className={`h-2.5 bg-black/25 blur-md rounded-full -mt-2 transition-all duration-300 ${
                      isCenter ? 'w-40 bg-black/35 blur-lg scale-110' : 'w-24 bg-black/10'
                    }`} 
                    style={{
                      transform: `scale(${1 - y / 100})`
                    }}
                  />
                </div>
              );
            })}

          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => goToIndex(Math.min(count - 1, activeIndex + 1))}
            className="absolute right-2 sm:right-4 z-40 p-2.5 rounded-full bg-white/95 hover:bg-black hover:text-white text-black border border-zinc-200 shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-md hidden sm:flex items-center justify-center"
            aria-label="Next shoe"
          >
            <ChevronRight className="size-5" />
          </button>

        </div>

        {/* ===================================================================== */}
        {/* CENTER SHOE INFO & ACTION CTAs (ALWAYS PROMINENTLY VISIBLE) */}
        {/* ===================================================================== */}
        <div className="text-center pt-2 pb-2 space-y-2.5 z-30">
          
          <div className="space-y-1 animate-in fade-in duration-300">
            <h3 
              className="text-xl sm:text-2xl md:text-3xl font-black text-black uppercase tracking-tight"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              {currentCenterShoe.name}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 font-bold flex items-center justify-center gap-2">
              <span>{currentCenterShoe.tagline}</span>
              <span>•</span>
              <span className="text-[#65a30d] font-mono font-black text-sm sm:text-base">${currentCenterShoe.price}</span>
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              onClick={() => onQuickView(currentCenterShoe)}
              className="px-5 sm:px-6 py-2.5 rounded-full bg-[#ccff00] hover:bg-[#b8e600] active:scale-95 text-black font-black text-xs uppercase tracking-wider transition shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
            >
              <Eye className="size-4" />
              <span>Inspect Model</span>
            </button>

            <button
              onClick={() => onAddToCart(currentCenterShoe)}
              className="px-5 sm:px-6 py-2.5 rounded-full bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider transition shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <ShoppingBag className="size-4 text-[#ccff00]" />
              <span>Add to Bag (${currentCenterShoe.price})</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
