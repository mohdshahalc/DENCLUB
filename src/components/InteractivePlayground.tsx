import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import voltSneakerImg from '../assets/volt_sneaker.png';
import crimsonRunnerImg from '../assets/crimson_runner.png';
import type { ShoeProduct } from '../types/store';
import { DENCLUB_SHOES } from '../data/shoes';
import { 
  Sparkles, 
  RotateCw, 
  MoveHorizontal, 
  ShoppingBag, 
  Eye, 
  Check, 
  Sliders, 
  Tag, 
  Palette,
  RefreshCw,
  ArrowRight
} from 'lucide-react';

gsap.registerPlugin(Draggable);

interface CustomizerProps {
  onAddToCart?: (shoe: ShoeProduct, size?: number) => void;
  onQuickView?: (shoe: ShoeProduct) => void;
}

export function InteractivePlayground({ onAddToCart, onQuickView }: CustomizerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const turntableRef = useRef<HTMLDivElement>(null);
  const sliderKnobRef = useRef<HTMLDivElement>(null);
  const tag1Ref = useRef<HTMLDivElement>(null);
  const tag2Ref = useRef<HTMLDivElement>(null);

  // Customizer State
  const [selectedColor, setSelectedColor] = useState<'volt' | 'crimson' | 'dark'>('volt');
  const [rotationAngle, setRotationAngle] = useState(0);
  const [sliderMaterialIndex, setSliderMaterialIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);

  const materials = [
    { name: 'Carbon Wave Plate', desc: '100% Aerospace Grade Multi-Axial Carbon' },
    { name: 'SuperCritical Nitrogen Foam', desc: '400 ATM Infused Micro-Cell Cushion' },
    { name: 'Hydro-Shield 3D Knit', desc: 'Seamless Monofilament Ocean-Yarn Wrap' },
  ];

  useEffect(() => {
    let rotateDraggable: globalThis.Draggable[] = [];
    let sliderDraggable: globalThis.Draggable[] = [];
    let tag1Draggable: globalThis.Draggable[] = [];
    let tag2Draggable: globalThis.Draggable[] = [];

    const timer = setTimeout(() => {
      if (!containerRef.current || !turntableRef.current || !sliderKnobRef.current || !tag1Ref.current || !tag2Ref.current) return;

      // 1. 360° SNEAKER ROTATION TURNTABLE (type: "rotation")
      rotateDraggable = Draggable.create(turntableRef.current, {
        type: "rotation",
        cursor: "grab",
        activeCursor: "grabbing",
        onDrag: function () {
          const deg = Math.round(this.rotation % 360);
          setRotationAngle(deg >= 0 ? deg : 360 + deg);
        }
      });

      // 2. HORIZONTAL MATERIAL SCRUBBER (type: "x")
      sliderDraggable = Draggable.create(sliderKnobRef.current, {
        type: "x",
        bounds: { minX: 0, maxX: 180 },
        edgeResistance: 0.8,
        cursor: "grab",
        activeCursor: "grabbing",
        onDrag: function () {
          const idx = Math.min(2, Math.floor((this.x / 180) * 3));
          setSliderMaterialIndex(idx);
        }
      });

      // 3. DRAGGABLE METALLIC HANGTAGS (type: "x,y" with bounds)
      tag1Draggable = Draggable.create(tag1Ref.current, {
        type: "x,y",
        bounds: containerRef.current,
        edgeResistance: 0.7,
        cursor: "grab",
        activeCursor: "grabbing"
      });

      tag2Draggable = Draggable.create(tag2Ref.current, {
        type: "x,y",
        bounds: containerRef.current,
        edgeResistance: 0.7,
        cursor: "grab",
        activeCursor: "grabbing"
      });
    }, 60);

    return () => {
      clearTimeout(timer);
      rotateDraggable[0]?.kill();
      sliderDraggable[0]?.kill();
      tag1Draggable[0]?.kill();
      tag2Draggable[0]?.kill();
    };
  }, []);

  const handleReset = () => {
    if (turntableRef.current && sliderKnobRef.current && tag1Ref.current && tag2Ref.current) {
      gsap.to(turntableRef.current, { rotation: 0, duration: 0.8, ease: 'back.out(1.5)' });
      gsap.to(sliderKnobRef.current, { x: 0, duration: 0.6, ease: 'power2.out' });
      gsap.to([tag1Ref.current, tag2Ref.current], { x: 0, y: 0, duration: 0.6, ease: 'back.out(1.4)' });
      setRotationAngle(0);
      setSliderMaterialIndex(0);
    }
  };

  const currentShoe = selectedColor === 'volt' ? DENCLUB_SHOES[1] : DENCLUB_SHOES[0];

  const handleAddCustom = () => {
    if (onAddToCart) {
      onAddToCart(currentShoe);
      setIsAdded(true);
      setTimeout(() => setIsAdded(false), 1200);
    }
  };

  return (
    <section id="customizer" className="py-20 md:py-28 bg-[#fafafa] border-t border-zinc-200 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950 text-white text-xs font-black uppercase tracking-widest shadow-md">
              <Sparkles className="size-3.5 text-[#ccff00]" />
              <span>Interactive 360° Studio</span>
            </div>
            <h2 
              className="text-4xl sm:text-5xl font-black tracking-tight text-black uppercase"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              SPIN & CUSTOMIZE YOUR PAIR
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base max-w-xl font-medium">
              Grab and spin the turntable 360° to inspect every curve. Drag the material slider and attach your custom NFC club tags.
            </p>
          </div>

          {/* Colorway Switcher Buttons */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-full border border-zinc-200 shadow-sm self-start md:self-end">
            {[
              { id: 'volt', label: 'Neon Volt', bg: '#ccff00', text: '#000' },
              { id: 'crimson', label: 'Crimson Wave', bg: '#ef4444', text: '#fff' },
              { id: 'dark', label: 'Stealth Black', bg: '#09090b', text: '#fff' }
            ].map(c => (
              <button
                key={c.id}
                onClick={() => setSelectedColor(c.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition cursor-pointer flex items-center gap-2 ${
                  selectedColor === c.id
                    ? 'bg-black text-white shadow-sm'
                    : 'text-zinc-600 hover:text-black hover:bg-zinc-100'
                }`}
              >
                <span className="size-2.5 rounded-full" style={{ backgroundColor: c.bg }} />
                <span>{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ===================================================================== */}
        {/* MAIN 360° CUSTOMIZER STAGE (CONTAINER FOR GSAP DRAGGABLES) */}
        {/* ===================================================================== */}
        <div 
          ref={containerRef}
          className="relative w-full min-h-[580px] lg:h-[620px] bg-white border border-zinc-200/90 rounded-3xl overflow-hidden flex flex-col justify-between p-6 sm:p-10 shadow-2xl"
        >
          
          {/* Subtle Technical Grid */}
          <div 
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
              backgroundSize: '40px 40px'
            }}
          />

          {/* Ambient Spotlight */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-96 bg-[#ccff00]/15 blur-[120px] rounded-full pointer-events-none" />

          {/* TOP HUD INFO */}
          <div className="relative z-10 flex items-center justify-between text-xs font-mono font-bold uppercase pb-4 border-b border-zinc-200">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-[#ccff00] animate-ping" />
              <span>360° GYRO ROTATION: <strong className="text-black">{rotationAngle}°</strong></span>
            </div>
            
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-zinc-500 hover:text-black transition text-[11px] font-bold cursor-pointer"
            >
              <RefreshCw className="size-3" />
              <span>Reset Position</span>
            </button>
          </div>

          {/* =================================================================== */}
          {/* CENTER 360° TURNTABLE & SNEAKER (DRAGGABLE ROTATION) */}
          {/* =================================================================== */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-auto">
            
            {/* Turntable Disc (type: "rotation") */}
            <div 
              ref={turntableRef}
              className="relative size-72 sm:size-96 md:size-[420px] rounded-full border-2 border-dashed border-zinc-300 hover:border-[#84cc16] flex items-center justify-center cursor-grab active:cursor-grabbing transition-colors duration-300 group"
            >
              {/* Radial Degree Hash Marks */}
              <div className="absolute inset-2 rounded-full border border-zinc-200 pointer-events-none" />
              <div className="absolute top-2 text-[9px] font-mono text-zinc-400 font-bold uppercase">0° / 360°</div>
              <div className="absolute right-2 text-[9px] font-mono text-zinc-400 font-bold uppercase">90°</div>
              <div className="absolute bottom-2 text-[9px] font-mono text-zinc-400 font-bold uppercase">180°</div>
              <div className="absolute left-2 text-[9px] font-mono text-zinc-400 font-bold uppercase">270°</div>

              {/* The 3D Sneaker */}
              <img
                src={selectedColor === 'volt' ? voltSneakerImg : crimsonRunnerImg}
                alt="Customizable Sneaker"
                className="w-64 sm:w-80 md:w-96 object-contain pointer-events-none select-none drop-shadow-[0_25px_35px_rgba(0,0,0,0.20)] transition-transform duration-300 group-hover:scale-105"
                draggable={false}
              />
            </div>

            <span className="text-[11px] font-mono font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5 mt-4">
              <RotateCw className="size-3.5 text-[#84cc16]" /> Grab & spin turntable 360° to view all angles
            </span>
          </div>

          {/* =================================================================== */}
          {/* DRAGGABLE CUSTOM HANGTAGS (type: "x,y") */}
          {/* =================================================================== */}
          
          {/* Tag 1: NFC Authenticity Tag */}
          <div 
            ref={tag1Ref}
            className="absolute top-24 left-8 sm:left-14 z-20 cursor-grab active:cursor-grabbing"
          >
            <div className="px-3.5 py-1.5 rounded-full bg-black text-[#ccff00] text-[10px] font-mono font-bold uppercase tracking-wider shadow-xl flex items-center gap-2 hover:scale-110 transition-transform">
              <Tag className="size-3" />
              <span>NFC VAULT TAG #001</span>
            </div>
          </div>

          {/* Tag 2: VIP Pass Tag */}
          <div 
            ref={tag2Ref}
            className="absolute top-36 right-8 sm:right-14 z-20 cursor-grab active:cursor-grabbing"
          >
            <div className="px-3.5 py-1.5 rounded-full bg-[#ccff00] text-black text-[10px] font-mono font-bold uppercase tracking-wider shadow-xl flex items-center gap-2 hover:scale-110 transition-transform">
              <Sparkles className="size-3 text-black" />
              <span>DENCLUB VIP DROP 2026</span>
            </div>
          </div>

          {/* =================================================================== */}
          {/* BOTTOM CONTROLS: HORIZONTAL MATERIAL SLIDER + ADD TO BAG */}
          {/* =================================================================== */}
          <div className="relative z-10 pt-4 border-t border-zinc-200 flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Horizontal Material Scrubber (type: "x") */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
              <div className="text-left">
                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase block">Selected Chassis Layer</span>
                <strong className="text-xs font-black text-black uppercase">
                  {materials[sliderMaterialIndex].name}
                </strong>
              </div>

              {/* Slider Track (200px) */}
              <div className="w-[200px] h-9 bg-zinc-100 rounded-full border border-zinc-300 relative p-1 flex items-center">
                <div 
                  ref={sliderKnobRef}
                  className="size-7 rounded-full bg-black text-[#ccff00] flex items-center justify-center cursor-grab active:cursor-grabbing shadow-md hover:scale-105 transition-transform"
                >
                  <MoveHorizontal className="size-3.5" />
                </div>
              </div>

              <span className="text-[10px] font-mono text-zinc-400 uppercase hidden sm:inline">
                Drag slider to switch tech
              </span>
            </div>

            {/* Price & Action Button */}
            <div className="flex items-center gap-4 self-end lg:self-center">
              <div className="text-right">
                <span className="text-xl font-black text-black font-mono">${currentShoe.price}</span>
                <span className="text-[10px] text-zinc-500 font-bold block">Customized Build</span>
              </div>

              <button
                onClick={handleAddCustom}
                className="px-8 py-3.5 rounded-full bg-[#ccff00] hover:bg-[#b8e600] active:scale-95 text-black font-black text-xs uppercase tracking-wider transition shadow-md flex items-center gap-2 cursor-pointer"
              >
                {isAdded ? (
                  <>
                    <Check className="size-4" />
                    <span>Added Custom Pair!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="size-4" />
                    <span>Add Custom Build to Bag</span>
                  </>
                )}
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
