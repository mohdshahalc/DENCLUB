import React, { useState, useEffect, useRef } from 'react';
import type { ShoeProduct } from '../types/store';
import { DENCLUB_SHOES } from '../data/shoes';
import voltSneakerImg from '../assets/volt_sneaker.png';
import crimsonRunnerImg from '../assets/crimson_runner.png';
import { 
  ArrowRight, 
  Ruler, 
  Flame, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Zap,
  ChevronDown,
  MousePointer2
} from 'lucide-react';

interface HeroProps {
  onQuickView: (shoe: ShoeProduct) => void;
  onAddToCart: (shoe: ShoeProduct) => void;
}

export function HeroCoverflow({ onQuickView, onAddToCart }: HeroProps) {
  const outerContainerRef = useRef<HTMLDivElement>(null);
  const stickyStageRef = useRef<HTMLDivElement>(null);
  
  // Element Refs for Hardware-Accelerated Transforms
  const leftShoeRef = useRef<HTMLDivElement>(null);
  const rightShoeRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const line4Ref = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  // Mouse & Scroll Lerp State
  const animState = useRef({
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
    scrollProgress: 0,
    targetScrollProgress: 0
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Initial entrance reveal
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    const onMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      animState.current.targetMouseX = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      animState.current.targetMouseY = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
    };

    const onScroll = () => {
      if (!outerContainerRef.current) return;
      const rect = outerContainerRef.current.getBoundingClientRect();
      const totalScrollable = outerContainerRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable > 0) {
        const rawProgress = -rect.top / totalScrollable;
        animState.current.targetScrollProgress = Math.max(0, Math.min(1, rawProgress));
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initialize

    // 120 FPS Lerp Loop for Buttery Smooth Scroll & Parallax
    let rafId: number;
    const loop = () => {
      // Lerp mouse
      animState.current.mouseX += (animState.current.targetMouseX - animState.current.mouseX) * 0.08;
      animState.current.mouseY += (animState.current.targetMouseY - animState.current.mouseY) * 0.08;

      // Lerp scroll progress for smooth inertia
      animState.current.scrollProgress += (animState.current.targetScrollProgress - animState.current.scrollProgress) * 0.1;

      const p = animState.current.scrollProgress; // 0.00 to 1.00
      const mx = animState.current.mouseX;
      const my = animState.current.mouseY;

      // =======================================================================
      // 1. LEFT SNEAKER (CRIMSON RUNNER) SCROLL-DRIVEN 3D FLIGHT PATH
      // =======================================================================
      if (leftShoeRef.current) {
        // As you scroll: glides from bottom-left diagonally up and rightwards
        const lx = (p * 420 - p * p * 120) + mx * -18;
        const ly = (-p * 340) + my * -14;
        const lRotZ = 16 - p * 52 + mx * -8;
        const lRotX = -8 + p * 20 + my * -10;
        const lRotY = 14 - p * 28 + mx * -12;
        const lScale = 1.0 + Math.sin(p * Math.PI) * 0.28;

        leftShoeRef.current.style.transform = 
          `translate3d(${lx}px, ${ly}px, 0) rotateX(${lRotX}deg) rotateY(${lRotY}deg) rotateZ(${lRotZ}deg) scale(${lScale})`;
      }

      // =======================================================================
      // 2. RIGHT SNEAKER (VOLT V2 HIGH-TOP) SCROLL-DRIVEN 3D FLIGHT PATH
      // =======================================================================
      if (rightShoeRef.current) {
        // As you scroll: glides from top-right diagonally down and leftwards across letters
        const rx = (-p * 450 + p * p * 140) + mx * 22;
        const ry = (p * 380) + my * 16;
        const rRotZ = -14 + p * 54 + mx * 8;
        const rRotX = 12 - p * 22 + my * 12;
        const rRotY = -14 + p * 32 + mx * 16;
        const rScale = 1.04 + Math.sin(p * Math.PI) * 0.32;

        rightShoeRef.current.style.transform = 
          `translate3d(${rx}px, ${ry}px, 0) rotateX(${rRotX}deg) rotateY(${rRotY}deg) rotateZ(${rRotZ}deg) scale(${rScale})`;
      }

      // =======================================================================
      // 3. KINETIC TYPOGRAPHY PARTING ON SCROLL
      // =======================================================================
      if (line1Ref.current && line2Ref.current && line3Ref.current) {
        const textUp = -p * 110 + my * 6;
        const textDown = p * 90 + my * 6;
        const textRight = p * 120 + mx * 8;

        line1Ref.current.style.transform = `translate3d(${mx * 8}px, ${textUp}px, 0)`;
        line2Ref.current.style.transform = `translate3d(${mx * 6}px, ${textDown * 0.7}px, 0)`;
        line3Ref.current.style.transform = `translate3d(${textRight}px, ${textDown}px, 0)`;
      }

      // 4. Subtle grid translation
      if (gridRef.current) {
        gridRef.current.style.transform = `translate3d(${mx * 4}px, ${my * 4 - p * 30}px, 0)`;
      }

      // 5. Scroll indicator progress bar
      if (scrollIndicatorRef.current) {
        scrollIndicatorRef.current.style.height = `${Math.min(100, Math.max(15, p * 100))}%`;
      }

      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    // Pinned 220vh Scroll Stage Container
    <div 
      ref={outerContainerRef} 
      className="relative w-full h-[220vh] bg-white selection:bg-[#ccff00] selection:text-black"
    >
      {/* Sticky 100vh Full Screen Viewport */}
      <section 
        ref={stickyStageRef} 
        id="hero-coverflow" 
        className="sticky top-0 w-full h-screen min-h-[640px] max-h-[1080px] flex flex-col justify-between overflow-hidden bg-white py-4 sm:py-6 px-4 sm:px-8 lg:px-12"
        style={{ perspective: '1600px' }}
      >
        
        {/* 1. Subtle Architectural Grid */}
        <div 
          ref={gridRef}
          className="absolute inset-0 opacity-[0.035] pointer-events-none transition-transform duration-700 ease-out z-0"
          style={{
            backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
            backgroundSize: '48px 48px'
          }}
        />

        {/* 2. Soft Ambient Spotlights */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#ccff00]/14 blur-[140px] rounded-full pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 left-1/4 w-[450px] h-[450px] bg-lime-300/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        {/* ======================================================================= */}
        {/* SNEAKER 1: TOP-RIGHT VOLT SNEAKER (BEHIND TEXT z-10) */}
        {/* GLIDES AND ROTATES ACROSS THE SCREEN CONTINUOUSLY ON SCROLL */}
        {/* ======================================================================= */}
        <div 
          ref={rightShoeRef}
          className={`absolute top-4 sm:top-8 md:top-10 right-0 sm:right-4 md:right-8 lg:right-16 z-10 pointer-events-auto will-change-transform transition-opacity duration-1000 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="relative animate-float-slow group cursor-pointer" onClick={() => onQuickView(DENCLUB_SHOES[1])}>
            <img
              src={voltSneakerImg}
              alt="Volt V2 Carbon High-Top"
              className="w-52 sm:w-72 md:w-96 lg:w-[480px] xl:w-[520px] object-contain drop-shadow-[0_28px_40px_rgba(0,0,0,0.18)] select-none transition-transform duration-500 group-hover:scale-105"
              draggable={false}
            />

            {/* Floating Minimal Technical Badge */}
            <div className="absolute top-1/4 left-2 z-10 opacity-90 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-[#ccff00] border-2 border-black animate-ping absolute" />
                <span className="size-2.5 rounded-full bg-[#ccff00] border-2 border-black relative" />
                <div className="px-3 py-1 rounded-full bg-black/95 text-[#ccff00] text-[10px] font-mono font-bold tracking-wider uppercase backdrop-blur-md shadow-lg flex items-center gap-1.5">
                  <span>VOLT V2</span>
                  <span className="text-white">·</span>
                  <span className="text-zinc-300">CARBON WAVE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* SNEAKER 2: BOTTOM-LEFT CRIMSON RUNNER (BEHIND TEXT z-10) */}
        {/* GLIDES AND ROTATES ACROSS THE SCREEN CONTINUOUSLY ON SCROLL */}
        {/* ======================================================================= */}
        <div 
          ref={leftShoeRef}
          className={`absolute bottom-10 sm:bottom-14 md:bottom-16 left-0 sm:left-4 md:left-8 lg:left-14 z-10 pointer-events-auto will-change-transform transition-opacity duration-1000 ease-out ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="relative animate-float-reverse group cursor-pointer" onClick={() => onQuickView(DENCLUB_SHOES[0])}>
            <img
              src={crimsonRunnerImg}
              alt="Apex X Streetwear Runner"
              className="w-48 sm:w-64 md:w-84 lg:w-[440px] xl:w-[480px] object-contain drop-shadow-[0_28px_40px_rgba(0,0,0,0.16)] select-none transition-transform duration-500 group-hover:scale-105"
              draggable={false}
            />

            {/* Floating Minimal Technical Badge */}
            <div className="absolute bottom-1/4 right-2 z-10 opacity-90 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-[#84cc16] border-2 border-black animate-ping absolute" />
                <span className="size-2.5 rounded-full bg-[#84cc16] border-2 border-black relative" />
                <div className="px-3 py-1 rounded-full bg-black/95 text-white text-[10px] font-mono font-bold tracking-wider uppercase backdrop-blur-md shadow-lg flex items-center gap-1.5">
                  <span>APEX X</span>
                  <span className="text-[#ccff00]">·</span>
                  <span className="text-zinc-300">NITRO-CELL</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================================= */}
        {/* MAIN HERO CONTENT & TYPOGRAPHY (IN FRONT OF SHOES: z-20) */}
        {/* ======================================================================= */}
        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between relative z-20 py-2 pointer-events-none">
          
          {/* Top Campaign Live Badge */}
          <div className="text-center pt-2 pointer-events-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black text-white text-[11px] font-black uppercase tracking-widest shadow-lg">
              <span className="size-2 rounded-full bg-[#ccff00] animate-ping" />
              <span className="text-[#ccff00] font-mono">●</span>
              <span>VOL. 12 — LIVE NOW</span>
            </div>
          </div>

          {/* Center Editorial Typography (Layered in Front of Shoes) */}
          <div className="text-center max-w-5xl mx-auto space-y-3 my-auto py-2 select-none">
            
            <div ref={line1Ref} className="will-change-transform transition-transform duration-100">
              <h1 
                className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.85] text-black drop-shadow-sm" 
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                SNEAKERS
              </h1>
            </div>

            <div className="flex items-baseline justify-center gap-4">
              <div ref={line2Ref} className="will-change-transform transition-transform duration-100">
                <span 
                  className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.85] text-black drop-shadow-sm" 
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  BUILT
                </span>
              </div>

              <div ref={line3Ref} className="will-change-transform transition-transform duration-100">
                <span 
                  className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.85] text-[#84cc16] drop-shadow-sm" 
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  FOR THE STREET
                </span>
              </div>
            </div>

            <p className="text-sm sm:text-base md:text-lg text-zinc-600 max-w-xl mx-auto font-medium leading-relaxed bg-white/50 backdrop-blur-[2px] rounded-full py-1">
              Denclub makes small-batch footwear for people who actually wear their shoes out. High-heat silhouettes & performance engineering.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 pointer-events-auto">
              <a
                href="#catalog"
                className="px-8 py-4 rounded-full bg-[#ccff00] hover:bg-[#b8e600] active:scale-95 text-black font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 shadow-xl shadow-lime-300/40 hover:-translate-y-0.5 cursor-pointer flex items-center gap-2"
              >
                <span>SHOP THE DROP</span>
                <ArrowRight className="size-4" />
              </a>

              <a
                href="#size-finder"
                className="px-8 py-4 rounded-full bg-white hover:bg-zinc-100 border-2 border-zinc-200 text-black font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-200 hover:border-black hover:-translate-y-0.5 cursor-pointer flex items-center gap-2 shadow-xs"
              >
                <Ruler className="size-4 text-zinc-700" />
                <span>SIZE GUIDE</span>
              </a>
            </div>

          </div>

          {/* Bottom Interactive Scroll Indicator Bar */}
          <div className="pt-2 flex items-center justify-between max-w-6xl mx-auto w-full pointer-events-auto border-t border-zinc-200/80">
            <div className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-wider text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Flame className="size-3.5 text-[#84cc16]" />
                Scroll Down To Animate Shoes
              </span>
              <span>•</span>
              <span>100% NFC Authenticated</span>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-zinc-600 uppercase">
              <span>SCROLL INTERACTION</span>
              <div className="w-3.5 h-6 rounded-full border border-zinc-400 p-0.5 flex flex-col justify-start">
                <div 
                  ref={scrollIndicatorRef}
                  className="w-full bg-[#84cc16] rounded-full transition-all duration-75 min-h-[4px]" 
                  style={{ height: '20%' }}
                />
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
