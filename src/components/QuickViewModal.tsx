import React, { useState } from 'react';
import type { ShoeProduct } from '../types/store';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Check, 
  ShieldCheck, 
  Truck, 
  RotateCcw
} from 'lucide-react';

interface QuickViewModalProps {
  shoe: ShoeProduct | null;
  onClose: () => void;
  onAddToCart: (shoe: ShoeProduct, size: number) => void;
}

export function QuickViewModal({ shoe, onClose, onAddToCart }: QuickViewModalProps) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [addedAnimation, setAddedAnimation] = useState(false);

  if (!shoe) return null;

  const currentSize = selectedSize || shoe.sizes[0];

  const handleAdd = () => {
    onAddToCart(shoe, currentSize);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in">
      <div 
        onClick={onClose}
        className="fixed inset-0"
      />

      <div className="relative w-full max-w-4xl bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-2">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-zinc-100 text-zinc-600 hover:text-black hover:bg-zinc-200 transition"
          aria-label="Close modal"
        >
          <X className="size-5" />
        </button>

        {/* Left Image Section */}
        <div className="relative bg-zinc-50 flex items-center justify-center p-6 sm:p-8 aspect-square md:aspect-auto border-b md:border-b-0 md:border-r border-zinc-200">
          <img
            src={shoe.image}
            alt={shoe.name}
            className="w-full max-h-[420px] object-cover rounded-2xl shadow-lg"
          />
          {shoe.badge && (
            <span className="absolute top-6 left-6 px-3 py-1 rounded-full bg-white/95 backdrop-blur text-xs font-extrabold text-black border border-zinc-200 shadow-xs uppercase">
              {shoe.badge}
            </span>
          )}
        </div>

        {/* Right Product Info */}
        <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            {/* Category and Rating */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#65a30d]">
                {shoe.category} • {shoe.releaseYear} DROP
              </span>
              <div className="flex items-center gap-1">
                <Star className="size-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-bold text-black">{shoe.rating}</span>
                <span className="text-xs text-zinc-500 font-medium">({shoe.reviewsCount} reviews)</span>
              </div>
            </div>

            {/* Title & Tagline */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-black uppercase" style={{ fontFamily: 'Syne, sans-serif' }}>
                {shoe.name}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-600 mt-1">
                {shoe.tagline}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-black text-black font-mono">${shoe.price}</span>
              {shoe.originalPrice && (
                <span className="text-base text-zinc-400 line-through font-mono">${shoe.originalPrice}</span>
              )}
              <span className="text-xs text-emerald-800 font-bold bg-emerald-100 px-2.5 py-1 rounded-full">
                In Stock Ready to Ship
              </span>
            </div>

            <p className="text-xs text-zinc-700 leading-relaxed border-t border-zinc-200 pt-3">
              {shoe.description}
            </p>

            {/* Tech Specs */}
            <div className="grid grid-cols-2 gap-2 text-xs bg-zinc-50 p-3.5 rounded-2xl border border-zinc-200">
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase font-bold">Chassis Weight</span>
                <strong className="text-black font-mono">{shoe.weight}</strong>
              </div>
              <div>
                <span className="text-zinc-500 block text-[10px] uppercase font-bold">Cushion Index</span>
                <strong className="text-black">{shoe.cushioning}</strong>
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <div className="flex justify-between text-xs mb-2">
                <span className="text-black font-bold">Select US Size:</span>
                <a href="#size-finder" onClick={onClose} className="text-[#65a30d] font-bold hover:underline">
                  Fit Guide
                </a>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {shoe.sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`py-2 rounded-xl text-xs font-bold transition ${
                      currentSize === s
                        ? 'bg-black text-white shadow-xs'
                        : 'bg-zinc-100 border border-zinc-200 text-zinc-700 hover:text-black hover:bg-zinc-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Add to Cart CTA */}
          <div className="space-y-3 pt-2">
            <button
              onClick={handleAdd}
              className="w-full py-4 rounded-full bg-[#ccff00] hover:bg-[#b8e600] active:scale-[0.99] font-black text-sm uppercase tracking-wider text-black transition shadow-lg shadow-lime-300/40 flex items-center justify-center gap-2 cursor-pointer"
            >
              {addedAnimation ? (
                <>
                  <Check className="size-4" />
                  <span>Added to Bag!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="size-4 text-black" />
                  <span>Add to Bag • US {currentSize} (${shoe.price})</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-zinc-500 font-medium">
              <span className="flex items-center gap-1">
                <Truck className="size-3 text-zinc-700" />
                48h Dispatch
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="size-3 text-[#65a30d]" />
                NFC Tagged
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <RotateCcw className="size-3 text-amber-700" />
                30d Trial
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
