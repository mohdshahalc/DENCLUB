import React, { useState, useCallback } from 'react';
import { CoverflowCarousel } from './ui/coverflow-carousel';
import { COVERFLOW_SLIDES, DENCLUB_SHOES } from '../data/shoes';
import type { ShoeProduct } from '../types/store';
import { 
  Sparkles, 
  Eye, 
  ShoppingBag, 
  ArrowRight, 
  Sliders, 
  MousePointer2
} from 'lucide-react';

interface SneakerVaultCarouselProps {
  onQuickView: (shoe: ShoeProduct) => void;
  onAddToCart: (shoe: ShoeProduct) => void;
}

export function SneakerVaultCarousel({ onQuickView, onAddToCart }: SneakerVaultCarouselProps) {
  // Preset Controls
  const [currentPreset, setCurrentPreset] = useState<'hyper' | 'cinematic' | 'street' | 'minimal' | 'flat'>('hyper');
  const [rotate, setRotate] = useState(48);
  const [depth, setDepth] = useState(0.65);
  const [perspective, setPerspective] = useState(2.8);
  const [showControls, setShowControls] = useState(false);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const applyPreset = (preset: 'hyper' | 'cinematic' | 'street' | 'minimal' | 'flat') => {
    setCurrentPreset(preset);
    switch (preset) {
      case 'hyper':
        setRotate(52);
        setDepth(0.72);
        setPerspective(2.4);
        break;
      case 'cinematic':
        setRotate(42);
        setDepth(0.55);
        setPerspective(3.2);
        break;
      case 'street':
        setRotate(60);
        setDepth(0.85);
        setPerspective(2.0);
        break;
      case 'minimal':
        setRotate(24);
        setDepth(0.3);
        setPerspective(4.5);
        break;
      case 'flat':
        setRotate(0);
        setDepth(0);
        setPerspective(5.0);
        break;
    }
  };

  const handleActiveIndexChange = useCallback((idx: number) => {
    setActiveSlideIndex(idx);
  }, []);

  const currentActiveShoe = DENCLUB_SHOES[activeSlideIndex] || DENCLUB_SHOES[0];

  return (
    <section id="sneaker-vault" className="py-16 md:py-24 bg-[#fafafa] border-t border-zinc-200 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Card Platform */}
        <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
          
          {/* Top Bar with Title, Subtitle, and Perspective Presets */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-zinc-200">
            
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-[#84cc16] animate-ping" />
                <h3 
                  className="text-2xl sm:text-3xl font-black tracking-tight text-black uppercase"
                  style={{ fontFamily: 'Syne, sans-serif' }}
                >
                  3D SNEAKER VAULT
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 font-medium flex items-center gap-2">
                <MousePointer2 className="size-3.5 text-[#84cc16]" />
                <span>Scroll Wheel / Drag To Rotate • Direct Card Select</span>
              </p>
            </div>

            {/* 3D Perspective Preset Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center bg-zinc-100 p-1 rounded-full border border-zinc-200 shadow-xs">
                {[
                  { id: 'hyper', label: 'Hyper 3D' },
                  { id: 'cinematic', label: 'Cinematic' },
                  { id: 'street', label: 'Street Rake' },
                  { id: 'minimal', label: 'Minimal' },
                  { id: 'flat', label: 'Flat' }
                ].map(p => (
                  <button
                    key={p.id}
                    onClick={() => applyPreset(p.id as any)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition cursor-pointer ${
                      currentPreset === p.id
                        ? 'bg-[#ccff00] text-black shadow-xs'
                        : 'text-zinc-600 hover:text-black'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Advanced Sliders Toggle */}
              <button
                onClick={() => setShowControls(!showControls)}
                className={`p-2 rounded-full border transition cursor-pointer ${
                  showControls 
                    ? 'bg-black text-white border-black' 
                    : 'bg-zinc-100 hover:bg-zinc-200 border-zinc-200 text-zinc-700'
                }`}
                title="Fine-tune 3D Perspective Matrix"
                aria-label="Fine-tune 3D perspective"
              >
                <Sliders className="size-4" />
              </button>
            </div>

          </div>

          {/* Fine Tuning Sliders Drawer */}
          {showControls && (
            <div className="mt-4 p-5 bg-zinc-50 border border-zinc-200 rounded-2xl grid grid-cols-1 sm:grid-cols-3 gap-6 animate-in fade-in">
              <div>
                <div className="flex justify-between text-xs font-bold text-black mb-1.5">
                  <span>Tilt Angle</span>
                  <span className="font-mono text-[#65a30d]">{rotate}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="80"
                  value={rotate}
                  onChange={(e) => setRotate(Number(e.target.value))}
                  className="w-full accent-[#84cc16] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-black mb-1.5">
                  <span>Depth Recession</span>
                  <span className="font-mono text-[#65a30d]">{depth.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1.2"
                  step="0.05"
                  value={depth}
                  onChange={(e) => setDepth(Number(e.target.value))}
                  className="w-full accent-[#84cc16] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-black mb-1.5">
                  <span>Lens Perspective</span>
                  <span className="font-mono text-[#65a30d]">{perspective.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="1.5"
                  max="6"
                  step="0.1"
                  value={perspective}
                  onChange={(e) => setPerspective(Number(e.target.value))}
                  className="w-full accent-[#84cc16] cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* THE 3D COVERFLOW CAROUSEL (NO DOTS, ULTRA SMOOTH) */}
          <div className="py-6">
            <CoverflowCarousel
              slides={COVERFLOW_SLIDES}
              rotate={rotate}
              depth={depth}
              perspective={perspective}
              cardWidth="clamp(240px, 28vw, 360px)"
              showCaption={false}
              showPagination={false} // REMOVED DOTS AS REQUESTED
              showNavigation={false} // Clean buttonless wheel scroll
              wheelScroll={true}
              onActiveIndexChange={handleActiveIndexChange}
              gap={0.06}
              fade={0.12}
              className="py-2"
              cardClassName="border border-zinc-200/90 shadow-[0_25px_50px_rgba(0,0,0,0.10)] bg-white transition-all duration-300 hover:border-[#84cc16]"
            />
          </div>

          {/* CENTERED PROMINENT ACTIVE SHOE NAME (MATCHING SCREENSHOT) */}
          <div className="text-center pt-2 pb-4 animate-in fade-in">
            <h3 
              className="text-2xl sm:text-3xl md:text-4xl font-black text-black uppercase tracking-tight"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              {currentActiveShoe.name}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 font-bold mt-1">
              {currentActiveShoe.tagline} • <span className="text-[#65a30d] font-mono font-black">${currentActiveShoe.price}</span>
            </p>
          </div>

          {/* Bottom Action CTAs Bar */}
          <div className="mt-2 pt-6 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
              <Sparkles className="size-3.5 text-[#84cc16]" />
              <span>NFC Tagged • 100% Authenticated</span>
            </div>

            {/* CTAs */}
            <div className="flex items-center gap-3">
              <button 
                onClick={() => onQuickView(currentActiveShoe)}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#ccff00] hover:bg-[#b8e600] active:scale-95 text-black font-black text-xs uppercase tracking-wider transition shadow-md cursor-pointer"
              >
                <Eye className="size-4" />
                <span>Inspect Model</span>
              </button>

              <button 
                onClick={() => onAddToCart(currentActiveShoe)}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-zinc-100 border border-zinc-300 active:scale-95 text-black font-black text-xs uppercase tracking-wider transition shadow-xs cursor-pointer"
              >
                <ShoppingBag className="size-4 text-zinc-800" />
                <span>Add to Bag (${currentActiveShoe.price})</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
