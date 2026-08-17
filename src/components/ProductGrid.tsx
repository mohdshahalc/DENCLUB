import React, { useState } from 'react';
import type { ShoeProduct } from '../types/store';
import { 
  Heart, 
  ShoppingBag, 
  Eye, 
  Star, 
  Sparkles, 
  ArrowUpDown
} from 'lucide-react';

interface ProductGridProps {
  shoes: ShoeProduct[];
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
  onQuickView: (shoe: ShoeProduct) => void;
  onAddToCart: (shoe: ShoeProduct, size?: number) => void;
}

export function ProductGrid({
  shoes,
  wishlist,
  onToggleWishlist,
  onQuickView,
  onAddToCart
}: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, number>>({});

  const handleSelectSize = (shoeId: string, size: number) => {
    setSelectedSizes(prev => ({ ...prev, [shoeId]: size }));
  };

  const filteredShoes = shoes.filter(shoe => {
    if (selectedCategory === 'all') return true;
    return shoe.category === selectedCategory;
  });

  const sortedShoes = [...filteredShoes].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <section id="catalog" className="py-20 md:py-28 bg-white border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-bold uppercase tracking-wider text-black">
              <Sparkles className="size-3.5 text-[#84cc16]" />
              <span>Full Atelier Catalog</span>
            </div>
            <h2 
              className="text-4xl sm:text-5xl font-black tracking-tight text-black uppercase"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              LATEST DROPS & SILHOUETTES
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 max-w-xl">
              Engineered with proprietary carbon matrices, supercritical foam cushioning, and handcrafted leather craftsmanship.
            </p>
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2 self-start md:self-end">
            <ArrowUpDown className="size-4 text-zinc-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-zinc-50 border border-zinc-300 text-black text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-[#84cc16] cursor-pointer"
            >
              <option value="featured">Featured / Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Filter Categories Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {[
            { id: 'all', label: 'All Silhouettes' },
            { id: 'running', label: 'Propulsion Running' },
            { id: 'streetwear', label: 'Streetwear & Tech' },
            { id: 'retro', label: 'Retro Heritage' },
            { id: 'limited', label: 'Limited 500 Run' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition cursor-pointer ${
                selectedCategory === tab.id
                  ? 'bg-black text-white shadow-md'
                  : 'bg-zinc-100 text-zinc-600 hover:text-black hover:bg-zinc-200 border border-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedShoes.map(shoe => {
            const isWishlisted = wishlist.includes(shoe.id);
            const currentSelectedSize = selectedSizes[shoe.id] || shoe.sizes[0];

            return (
              <div
                key={shoe.id}
                className="group relative bg-zinc-50 border border-zinc-200/80 hover:border-zinc-400 rounded-3xl p-4 flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Image Container with Badges */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white border border-zinc-200/60 flex items-center justify-center">
                  <img
                    src={shoe.image}
                    alt={shoe.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  
                  {/* Badge */}
                  {shoe.badge && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur text-[10px] font-extrabold tracking-wider text-black border border-zinc-200 shadow-xs uppercase">
                      {shoe.badge}
                    </span>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={() => onToggleWishlist(shoe.id)}
                    className="absolute top-3 right-3 size-9 rounded-full bg-white/90 backdrop-blur shadow-xs flex items-center justify-center text-zinc-500 hover:text-red-500 transition hover:scale-110"
                    aria-label="Wishlist"
                  >
                    <Heart className={`size-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                  </button>

                  {/* Quick View Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[2px]">
                    <button
                      onClick={() => onQuickView(shoe)}
                      className="px-4 py-2 rounded-full bg-white text-black font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg transition transform translate-y-2 group-hover:translate-y-0 hover:bg-zinc-100"
                    >
                      <Eye className="size-3.5" />
                      <span>Inspect</span>
                    </button>
                  </div>
                </div>

                {/* Content Details */}
                <div className="mt-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category & Rating */}
                    <div className="flex items-center justify-between text-xs text-zinc-500 mb-1">
                      <span className="uppercase tracking-wider text-[10px] font-bold text-zinc-600">
                        {shoe.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <Star className="size-3.5 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-black">{shoe.rating}</span>
                        <span className="text-[10px] text-zinc-400">({shoe.reviewsCount})</span>
                      </div>
                    </div>

                    {/* Shoe Title */}
                    <h3 className="text-base font-bold text-black group-hover:text-[#65a30d] transition line-clamp-1">
                      {shoe.name}
                    </h3>
                    <p className="text-xs text-zinc-500 line-clamp-1 mt-0.5">
                      {shoe.tagline}
                    </p>

                    {/* Stock remaining */}
                    {shoe.stockLeft && shoe.stockLeft < 15 && (
                      <div className="mt-2 text-[11px] text-amber-700 font-semibold flex items-center gap-1">
                        <span className="size-1.5 rounded-full bg-amber-500 animate-ping" />
                        <span>Only {shoe.stockLeft} pairs left in stock</span>
                      </div>
                    )}
                  </div>

                  {/* Size Chips & Price */}
                  <div className="mt-4 pt-3 border-t border-zinc-200">
                    
                    {/* Quick Size Chips */}
                    <div className="flex items-center justify-between mb-3 text-xs">
                      <span className="text-[11px] text-zinc-500 font-medium">Size (US):</span>
                      <div className="flex items-center gap-1 overflow-x-auto max-w-[170px] no-scrollbar py-0.5">
                        {shoe.sizes.slice(0, 4).map(size => (
                          <button
                            key={size}
                            onClick={() => handleSelectSize(shoe.id, size)}
                            className={`px-2 py-0.5 rounded-md text-[10px] font-bold transition ${
                              currentSelectedSize === size
                                ? 'bg-black text-white'
                                : 'bg-zinc-200/70 text-zinc-700 hover:bg-zinc-300'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                        {shoe.sizes.length > 4 && (
                          <button
                            onClick={() => onQuickView(shoe)}
                            className="text-[10px] text-zinc-500 hover:text-black font-bold px-1"
                          >
                            +{shoe.sizes.length - 4}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Price and Add to Bag */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-black text-black font-mono">${shoe.price}</span>
                        {shoe.originalPrice && (
                          <span className="text-xs text-zinc-400 line-through font-mono">${shoe.originalPrice}</span>
                        )}
                      </div>

                      <button
                        onClick={() => onAddToCart(shoe, currentSelectedSize)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#ccff00] hover:bg-[#b8e600] active:scale-95 text-black font-extrabold text-xs uppercase tracking-wider transition shadow-sm"
                      >
                        <ShoppingBag className="size-3.5" />
                        <span>Add</span>
                      </button>
                    </div>

                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
