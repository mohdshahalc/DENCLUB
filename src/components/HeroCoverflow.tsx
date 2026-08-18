import React, { useState, useEffect, useRef } from 'react';
import type { ShoeProduct } from '../types/store';
import { DENCLUB_SHOES } from '../data/shoes';
import voltSneakerImg from '../assets/volt_sneaker.png';
import crimsonRunnerImg from '../assets/crimson_runner.png';
import { 
  ArrowRight, 
  Flame, 
  Sparkles,
  Zap,
  RotateCw,
  Compass,
  Layers,
  Activity,
  Maximize2
} from 'lucide-react';

interface HeroProps {
  onQuickView: (shoe: ShoeProduct) => void;
  onAddToCart: (shoe: ShoeProduct) => void;
}

export function HeroCoverflow({ onQuickView, onAddToCart }: HeroProps) {
  const outerContainerRef = useRef<HTMLDivElement>(null);
  const stickyStageRef = useRef<HTMLDivElement>(null);
  
  // Hardware-accelerated refs
  const leftShoeRef = useRef<HTMLDivElement>(null);
  const rightShoeRef = useRef<HTMLDivElement>(null);
  const leftShadowRef = useRef<HTMLDivElement>(null);
  const rightShadowRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Extraordinary Interactive States
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredShoe, setHoveredShoe] = useState<'left' | 'right' | null>(null);
  const [techMode, setTechMode] = useState(false);
  
  // Drag-to-spin state
  const isDragging = useRef(false);
  const dragTarget = useRef<'left' | 'right' | null>(null);
  const startX = useRef(0);
  const leftSpin = useRef(0);
  const rightSpin = useRef(0);
  const leftSpinVel = useRef(0);
  const rightSpinVel = useRef(0);

  // Mouse & Scroll Lerp State
  const animState = useRef({
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
    scrollProgress: 0,
    targetScrollProgress: 0,
    time: 0
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50);

    const onMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      animState.current.targetMouseX = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      animState.current.targetMouseY = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1

      if (isDragging.current) {
        const deltaX = e.clientX - startX.current;
        startX.current = e.clientX;
        if (dragTarget.current === 'left') {
          leftSpinVel.current = deltaX * 0.8;
          leftSpin.current += deltaX * 0.8;
        } else if (dragTarget.current === 'right') {
          rightSpinVel.current = deltaX * 0.8;
          rightSpin.current += deltaX * 0.8;
        }
      }
    };

    const onMouseUp = () => {
      isDragging.current = false;
      dragTarget.current = null;
    };

    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
      const viewportH = window.innerHeight || 800;
      const progress = Math.max(0, Math.min(1.5, scrollY / (viewportH * 0.65)));
      animState.current.targetScrollProgress = progress;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // 120 FPS High-Precision Physics Loop
    let rafId: number;
    const loop = () => {
      animState.current.time += 0.025;
      const t = animState.current.time;

      // Mouse & Scroll interpolation
      animState.current.mouseX += (animState.current.targetMouseX - animState.current.mouseX) * 0.08;
      animState.current.mouseY += (animState.current.targetMouseY - animState.current.mouseY) * 0.08;
      animState.current.scrollProgress += (animState.current.targetScrollProgress - animState.current.scrollProgress) * 0.1;

      const p = animState.current.scrollProgress; // 0.00 to 1.00+
      const mx = animState.current.mouseX;
      const my = animState.current.mouseY;

      // Spin inertia decay
      if (!isDragging.current) {
        leftSpin.current += leftSpinVel.current;
        leftSpinVel.current *= 0.92;
        rightSpin.current += rightSpinVel.current;
        rightSpinVel.current *= 0.92;
      }

      // Organic Levitation Oscillation
      const floatLeftY = Math.sin(t) * 14;
      const floatLeftRot = Math.cos(t * 0.8) * 3;
      const floatRightY = Math.sin(t + 1.8) * 16;
      const floatRightRot = Math.cos((t + 1.8) * 0.8) * 3;

      // =======================================================================
      // 1. LEFT SNEAKER (CRIMSON RUNNER) - Sinks down to bottom on scroll
      // =======================================================================
      if (leftShoeRef.current) {
        const lx = (-p * 50) + mx * -24;
        const ly = (p * 360) + floatLeftY + my * -14;
        const lRotZ = 12 + floatLeftRot - (p * 24) + mx * -12 + (leftSpin.current * 0.3);
        const lRotX = -8 + (my * -16) + (p * 20);
        const lRotY = 16 + (mx * -22) + leftSpin.current;
        const lScale = (1.0 - p * 0.12) + (hoveredShoe === 'left' ? 0.08 : 0);
        const lOpacity = Math.max(0.15, 1.0 - p * 0.7);

        leftShoeRef.current.style.transform = 
          `translate3d(${lx}px, ${ly}px, 0) rotateX(${lRotX}deg) rotateY(${lRotY}deg) rotateZ(${lRotZ}deg) scale(${lScale})`;
        leftShoeRef.current.style.opacity = `${lOpacity}`;

        // Dynamic Floor Shadow
        if (leftShadowRef.current) {
          const shadowScale = (1.0 - (floatLeftY / 40)) * (1.0 - p * 0.4);
          const shadowOpacity = Math.max(0.05, (0.25 - (floatLeftY / 120)) * (1.0 - p * 0.6));
          leftShadowRef.current.style.transform = `translate3d(${lx * 0.7}px, ${p * 180}px, 0) scale(${shadowScale})`;
          leftShadowRef.current.style.opacity = `${shadowOpacity}`;
        }
      }

      // =======================================================================
      // 2. RIGHT SNEAKER (VOLT V2) - Sinks down to bottom on scroll
      // =======================================================================
      if (rightShoeRef.current) {
        const rx = (p * 50) + mx * 26;
        const ry = (p * 360) + floatRightY + my * 16;
        const rRotZ = -14 + floatRightRot + (p * 24) + mx * 12 + (rightSpin.current * 0.3);
        const rRotX = 10 + (my * 18) - (p * 20);
        const rRotY = -18 + (mx * 24) + rightSpin.current;
        const rScale = (1.0 - p * 0.12) + (hoveredShoe === 'right' ? 0.08 : 0);
        const rOpacity = Math.max(0.15, 1.0 - p * 0.7);

        rightShoeRef.current.style.transform = 
          `translate3d(${rx}px, ${ry}px, 0) rotateX(${rRotX}deg) rotateY(${rRotY}deg) rotateZ(${rRotZ}deg) scale(${rScale})`;
        rightShoeRef.current.style.opacity = `${rOpacity}`;

        // Dynamic Floor Shadow
        if (rightShadowRef.current) {
          const shadowScale = (1.0 - (floatRightY / 40)) * (1.0 - p * 0.4);
          const shadowOpacity = Math.max(0.05, (0.28 - (floatRightY / 120)) * (1.0 - p * 0.6));
          rightShadowRef.current.style.transform = `translate3d(${rx * 0.7}px, ${p * 180}px, 0) scale(${shadowScale})`;
          rightShadowRef.current.style.opacity = `${shadowOpacity}`;
        }
      }

      // 3. Kinetic Text Parallax
      if (line1Ref.current && line2Ref.current) {
        const textDown = p * 60 + my * 3;
        line1Ref.current.style.transform = `translate3d(${mx * 4}px, ${textDown * 0.4}px, 0)`;
        line2Ref.current.style.transform = `translate3d(${mx * -4}px, ${textDown * 0.7}px, 0)`;
      }

      // 4. Scroll indicator
      if (scrollIndicatorRef.current) {
        scrollIndicatorRef.current.style.height = `${Math.min(100, Math.max(25, (p / 1.0) * 100))}%`;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [hoveredShoe]);

  const handleMouseDown = (target: 'left' | 'right', e: React.MouseEvent) => {
    isDragging.current = true;
    dragTarget.current = target;
    startX.current = e.clientX;
  };

  return (
    <section 
      id="hero-coverflow" 
      className="relative w-full min-h-[calc(100vh-5rem)] h-[calc(100vh-5rem)] max-h-[940px] flex flex-col justify-between overflow-hidden bg-white px-4 sm:px-8 lg:px-12 pt-4 pb-12 selection:bg-[#ccff00] selection:text-black scroll-mt-20 snap-start"
      style={{ perspective: '1600px' }}
    >
      {/* Subtle Pristine Studio Architectural Grid */}
      <div 
        className="absolute inset-0 opacity-[0.025] pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: '56px 56px'
        }}
      />

      {/* Studio Center Spotlight Vignette (Pure Monochrome Soft Light) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,1)_30%,rgba(244,244,245,0.6)_100%)] pointer-events-none -z-10" />

        {/* ======================================================================= */}
        {/* SNEAKER 1: RIGHT VOLT HIGH-TOP (3D GYROSCOPIC LEVITATION) */}
        {/* ======================================================================= */}
        <div 
          ref={rightShoeRef}
          onMouseEnter={() => setHoveredShoe('right')}
          onMouseLeave={() => setHoveredShoe(null)}
          onMouseDown={(e) => handleMouseDown('right', e)}
          className={`absolute top-4 sm:top-8 md:top-10 right-0 sm:right-[1%] md:right-[3%] lg:right-[5%] xl:right-[7%] z-10 pointer-events-auto will-change-transform cursor-grab active:cursor-grabbing select-none transition-opacity duration-1000 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="relative group">
            
            {/* Sneaker Image - Faces inwards toward center text */}
            <img
              src={voltSneakerImg}
              alt="Volt V2 Carbon High-Top"
              className="-scale-x-100 w-36 xs:w-44 sm:w-56 md:w-68 lg:w-[360px] xl:w-[420px] object-contain drop-shadow-[0_24px_38px_rgba(0,0,0,0.22)] select-none pointer-events-none"
              draggable={false}
            />

            {/* Realistic Contact Floor Shadow */}
            <div 
              ref={rightShadowRef}
              className="absolute -bottom-8 left-1/4 w-1/2 h-6 bg-black/25 blur-xl rounded-full -z-10 pointer-events-none transition-transform" 
            />

            {/* Interactive 3D Orbit Badge */}
            <div 
              onClick={() => onQuickView(DENCLUB_SHOES[1])}
              className="absolute top-1/4 left-0 sm:left-2 z-10 transition-all duration-300 group-hover:scale-105 cursor-pointer"
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="size-2 rounded-full bg-[#ccff00] border-2 border-black animate-ping absolute" />
                <span className="size-2 rounded-full bg-[#ccff00] border-2 border-black relative" />
                <div className="px-2.5 sm:px-3 py-1 rounded-full bg-black/95 text-[#ccff00] text-[8px] sm:text-[10px] font-mono font-bold tracking-wider uppercase backdrop-blur-md shadow-xl border border-zinc-800 flex items-center gap-1.5 hover:border-[#ccff00] transition whitespace-nowrap">
                  <RotateCw className="size-2.5 animate-spin text-zinc-400" style={{ animationDuration: '6s' }} />
                  <span>VOLT V2</span>
                  <span className="text-white">·</span>
                  <span className="text-zinc-300">CARBON WAVE</span>
                </div>
              </div>
            </div>

            {/* Tech Mode Hotspots */}
            {techMode && (
              <div className="absolute -bottom-4 right-8 z-10 animate-in fade-in">
                <div className="px-2.5 py-1 rounded-lg bg-black text-white text-[8px] font-mono tracking-widest uppercase border border-zinc-700 shadow-xl flex items-center gap-1.5">
                  <Zap className="size-2.5 text-[#ccff00]" />
                  <span>AIR-CELL DUAL CORE</span>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* ======================================================================= */}
        {/* SNEAKER 2: LEFT CRIMSON RUNNER (3D GYROSCOPIC LEVITATION) */}
        {/* ======================================================================= */}
        <div 
          ref={leftShoeRef}
          onMouseEnter={() => setHoveredShoe('left')}
          onMouseLeave={() => setHoveredShoe(null)}
          onMouseDown={(e) => handleMouseDown('left', e)}
          className={`absolute bottom-10 sm:bottom-24 md:bottom-28 left-0 sm:left-[1%] md:left-[3%] lg:left-[5%] xl:left-[7%] z-10 pointer-events-auto will-change-transform cursor-grab active:cursor-grabbing select-none transition-opacity duration-1000 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="relative group">
            
            {/* Sneaker Image */}
            <img
              src={crimsonRunnerImg}
              alt="Apex X Streetwear Runner"
              className="w-36 xs:w-40 sm:w-52 md:w-64 lg:w-[340px] xl:w-[390px] object-contain drop-shadow-[0_24px_38px_rgba(0,0,0,0.2)] select-none pointer-events-none"
              draggable={false}
            />

            {/* Realistic Contact Floor Shadow */}
            <div 
              ref={leftShadowRef}
              className="absolute -bottom-8 left-1/4 w-1/2 h-6 bg-black/22 blur-xl rounded-full -z-10 pointer-events-none transition-transform" 
            />

            {/* Interactive 3D Orbit Badge */}
            <div 
              onClick={() => onQuickView(DENCLUB_SHOES[0])}
              className="absolute -bottom-2 sm:bottom-1/4 left-1 sm:right-2 z-10 transition-all duration-300 group-hover:scale-105 cursor-pointer"
            >
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="size-2 rounded-full bg-[#ef4444] border-2 border-black animate-ping absolute" />
                <span className="size-2 rounded-full bg-[#ef4444] border-2 border-black relative" />
                <div className="px-2.5 sm:px-3 py-1 rounded-full bg-black/95 text-white text-[8px] sm:text-[10px] font-mono font-bold tracking-wider uppercase backdrop-blur-md shadow-xl border border-zinc-800 flex items-center gap-1.5 hover:border-red-500 transition whitespace-nowrap">
                  <RotateCw className="size-2.5 animate-spin text-zinc-400" style={{ animationDuration: '6s' }} />
                  <span>APEX X</span>
                  <span className="text-[#ccff00]">·</span>
                  <span className="text-zinc-300">NITRO-CELL</span>
                </div>
              </div>
            </div>

            {/* Tech Mode Hotspots */}
            {techMode && (
              <div className="absolute -top-4 left-8 z-10 animate-in fade-in">
                <div className="px-2.5 py-1 rounded-lg bg-black text-white text-[8px] font-mono tracking-widest uppercase border border-zinc-700 shadow-xl flex items-center gap-1.5">
                  <Layers className="size-2.5 text-red-400" />
                  <span>FULL CARBON PROPULSION</span>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* ======================================================================= */}
        {/* TOP: MINIMAL CAMPAIGN PILL & 3D INTERACTIVE CONTROLS */}
        {/* ======================================================================= */}
        <div className="w-full flex items-center justify-center gap-3 z-20 pointer-events-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest shadow-md">
            <span className="size-2 rounded-full bg-[#ccff00] animate-ping" />
            <span className="text-[#ccff00] font-mono">●</span>
            <span>VOL. 12 — LIVE NOW</span>
          </div>

          <button
            onClick={() => setTechMode(!techMode)}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all duration-200 shadow-xs cursor-pointer ${
              techMode
                ? 'bg-black text-[#ccff00] border border-black ring-2 ring-lime-400/50'
                : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-200'
            }`}
            title="Toggle 3D Engineering Hotspots"
          >
            <Compass className={`size-3 ${techMode ? 'text-[#ccff00]' : 'text-zinc-500'}`} />
            <span>{techMode ? '3D TECH ACTIVE' : 'DRAG TO SPIN 3D'}</span>
          </button>
        </div>

        {/* ======================================================================= */}
        {/* CENTER: MINIMAL ICONIC TYPOGRAPHY & HIGH-ENERGY CTA */}
        {/* ======================================================================= */}
        <div className="max-w-4xl mx-auto w-full text-center space-y-4 my-auto relative z-20 pointer-events-none select-none">
          
          {/* Line 1: SNEAKERS BUILT */}
          <div ref={line1Ref} className="will-change-transform transition-transform duration-100">
            <h1 
              className="text-[1.65rem] xs:text-[2rem] sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.25rem] font-black tracking-tighter uppercase leading-[0.92] text-black drop-shadow-sm" 
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              SNEAKERS BUILT
            </h1>
          </div>

          {/* Line 2: FOR THE STREET */}
          <div ref={line2Ref} className="will-change-transform transition-transform duration-100">
            <h2 
              className="text-[1.65rem] xs:text-[2rem] sm:text-5xl md:text-6xl lg:text-[5.5rem] xl:text-[6.25rem] font-black tracking-tighter uppercase leading-[0.92] text-[#65a30d] drop-shadow-sm" 
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              FOR THE STREET
            </h2>
          </div>

          {/* Single Focused CTA Button */}
          <div className="pt-2 pointer-events-auto">
            <a
              href="#catalog"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#ccff00] hover:bg-[#b8e600] active:scale-95 text-black font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-xl shadow-lime-300/40 hover:-translate-y-0.5 cursor-pointer"
            >
              <span>SHOP THE DROP</span>
              <ArrowRight className="size-4" />
            </a>
          </div>

        </div>

      </section>
  );
}




