import React, { useState } from 'react';
import { Ruler, CheckCircle, ArrowRight } from 'lucide-react';

export function SizeGuide() {
  const [currentBrand, setCurrentBrand] = useState('Nike');
  const [currentSize, setCurrentSize] = useState('10');
  const [footWidth, setFootWidth] = useState<'standard' | 'wide' | 'narrow'>('standard');
  const [useCase, setUseCase] = useState<'lifestyle' | 'running' | 'track'>('lifestyle');

  const brands = ['Nike', 'Adidas', 'Jordan', 'New Balance', 'Asics', 'Hoka', 'Salomon'];
  const sizes = ['7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13'];

  const getRecommendedSize = () => {
    const num = parseFloat(currentSize);
    if (footWidth === 'wide') {
      return (num + 0.5).toString();
    }
    return currentSize;
  };

  const recommended = getRecommendedSize();

  return (
    <section id="size-finder" className="py-20 md:py-28 bg-zinc-50 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-zinc-200 text-xs font-bold uppercase tracking-wider text-black shadow-xs">
              <Ruler className="size-3.5 text-[#84cc16]" />
              <span>Smart Fit Algorithm</span>
            </div>

            <h2 
              className="text-4xl sm:text-5xl font-black tracking-tight text-black uppercase leading-tight"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              FIND YOUR EXACT DENCLUB SIZE
            </h2>

            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
              Never guess your shoe size again. Our 3D millimeter fit matrix cross-references your current daily rotation sneakers to deliver pinpoint precision sizing.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-zinc-700 font-medium">
                <CheckCircle className="size-4 text-[#65a30d] shrink-0" />
                <span>Zero-risk 30-day trial with free size exchange labels</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-700 font-medium">
                <CheckCircle className="size-4 text-[#65a30d] shrink-0" />
                <span>Anatomical arch support suitable for all foot arches</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-700 font-medium">
                <CheckCircle className="size-4 text-[#65a30d] shrink-0" />
                <span>True-to-Size guarantee with 98.4% first-time accuracy</span>
              </div>
            </div>
          </div>

          {/* Right Interactive Calculator Box */}
          <div className="lg:col-span-7 bg-white border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-xl">
            <div className="space-y-6">
              
              {/* Step 1: Usual Brand */}
              <div>
                <label className="text-xs uppercase tracking-wider text-black font-extrabold block mb-2">
                  1. What brand do you wear most?
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {brands.map(b => (
                    <button
                      key={b}
                      onClick={() => setCurrentBrand(b)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                        currentBrand === b
                          ? 'bg-black text-white shadow-xs'
                          : 'bg-zinc-100 border border-zinc-200 text-zinc-700 hover:text-black hover:bg-zinc-200'
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Usual Size */}
              <div>
                <label className="text-xs uppercase tracking-wider text-black font-extrabold block mb-2">
                  2. Your standard US Men&apos;s size in {currentBrand}
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setCurrentSize(s)}
                      className={`py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                        currentSize === s
                          ? 'bg-[#ccff00] text-black shadow-xs'
                          : 'bg-zinc-100 border border-zinc-200 text-zinc-700 hover:text-black hover:bg-zinc-200'
                      }`}
                    >
                      US {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Foot Width */}
              <div>
                <label className="text-xs uppercase tracking-wider text-black font-extrabold block mb-2">
                  3. Your Foot Width Profile
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'narrow', label: 'Narrow / Slim' },
                    { id: 'standard', label: 'Standard (D)' },
                    { id: 'wide', label: 'Wide (2E+)' }
                  ].map(w => (
                    <button
                      key={w.id}
                      onClick={() => setFootWidth(w.id as any)}
                      className={`py-2.5 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
                        footWidth === w.id
                          ? 'bg-black text-white'
                          : 'bg-zinc-100 border border-zinc-200 text-zinc-700 hover:text-black'
                      }`}
                    >
                      {w.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Calculation Result Box */}
              <div className="pt-4 border-t border-zinc-200 bg-zinc-50 rounded-2xl p-5 border border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] text-[#65a30d] font-black uppercase tracking-wider block">
                    Recommended DENCLUB Size
                  </span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="text-3xl font-black text-black font-mono" style={{ fontFamily: 'Syne, sans-serif' }}>
                      US {recommended}
                    </span>
                    <span className="text-xs text-zinc-500 font-bold">
                      (EU {Math.round(parseFloat(recommended) * 1.33 + 31)})
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 mt-1 font-medium">
                    {footWidth === 'wide' 
                      ? 'Half-size up selected to ensure roomy forefoot splay in carbon plate.'
                      : 'Fits 1:1 true to size with performance lockdown sock liner.'}
                  </p>
                </div>

                <a
                  href="#catalog"
                  className="px-6 py-3.5 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-xs uppercase tracking-wider transition shadow-md flex items-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <span>Shop US {recommended}</span>
                  <ArrowRight className="size-4" />
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
