import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  Sparkles, 
  ChevronDown,
  Globe,
  ArrowRight
} from 'lucide-react';
import type { ShoeProduct } from '../types/store';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onSelectShoe: (shoe: ShoeProduct) => void;
  shoes: ShoeProduct[];
}

export function Navbar({ cartCount, wishlistCount, onOpenCart, onSelectShoe, shoes }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [joinEmail, setJoinEmail] = useState('');
  const [joinSubmitted, setJoinSubmitted] = useState(false);

  const filteredSearchResults = searchQuery.trim() === '' 
    ? [] 
    : shoes.filter(s => 
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        s.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (joinEmail.trim()) {
      setJoinSubmitted(true);
    }
  };

  return (
    <>
      {/* Main Header in Fixed Position with Glassmorphism */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-xl border-b border-zinc-200/80 shadow-xs transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center gap-1 group">
              <span 
                className="text-2xl sm:text-3xl font-black tracking-tighter text-black uppercase" 
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                DEN<span className="text-[#84cc16]">CLUB</span>
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-700">
            <a href="#hero-coverflow" className="hover:text-black transition py-1">
              DROP
            </a>
            <a href="#catalog" className="hover:text-black transition py-1">
              SHOP
            </a>
            <a href="#tech-lab" className="hover:text-black transition py-1">
              THE CLUB
            </a>
            <a href="#lookbook" className="hover:text-black transition py-1 hidden lg:inline">
              LOOKBOOK
            </a>
            <a href="#size-finder" className="hover:text-black transition py-1 hidden lg:inline">
              FIT LAB
            </a>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1.5 sm:gap-3.5">
            
            {/* Search Button */}
            <button 
              onClick={() => setSearchOpen(true)}
              className="p-1.5 sm:p-2 rounded-full text-zinc-700 hover:text-black hover:bg-zinc-100 transition"
              aria-label="Search shoes"
            >
              <Search className="size-4 sm:size-5" />
            </button>

            {/* Wishlist */}
            <a 
              href="#catalog"
              className="p-2 rounded-full text-zinc-700 hover:text-black hover:bg-zinc-100 transition relative hidden sm:flex"
              aria-label="Wishlist"
            >
              <Heart className="size-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 size-4 bg-red-500 text-[10px] font-bold text-white rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </a>

            {/* Shopping Bag Button */}
            <button 
              onClick={onOpenCart}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-black font-semibold text-xs sm:text-sm transition group"
              aria-label="Shopping Bag"
            >
              <div className="relative">
                <ShoppingBag className="size-4 text-zinc-800" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 size-4 bg-[#84cc16] text-black text-[10px] font-extrabold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Bag</span>
              <span className="text-[11px] sm:text-xs text-zinc-500 font-bold">({cartCount})</span>
            </button>

            {/* JOIN Button (matches exact screenshot style) */}
            <button 
              onClick={() => setJoinModalOpen(true)}
              className="px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full bg-[#ccff00] hover:bg-[#b8e600] active:scale-95 text-black font-extrabold text-[11px] sm:text-xs uppercase tracking-wider transition shadow-xs cursor-pointer"
            >
              JOIN
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full text-zinc-700 hover:text-black hover:bg-zinc-100 transition"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-zinc-200 px-6 py-6 space-y-4 animate-in fade-in">
            <nav className="flex flex-col space-y-3 text-sm font-bold uppercase tracking-wider text-zinc-800">
              <a 
                href="#hero-coverflow" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#84cc16] py-2 border-b border-zinc-100 flex items-center justify-between"
              >
                <span>DROP (3D Vault)</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#ccff00] text-black font-extrabold">LIVE</span>
              </a>
              <a 
                href="#catalog" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#84cc16] py-2 border-b border-zinc-100"
              >
                SHOP ALL SILHOUETTES
              </a>
              <a 
                href="#tech-lab" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#84cc16] py-2 border-b border-zinc-100"
              >
                THE CLUB ARCHITECTURE
              </a>
              <a 
                href="#lookbook" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#84cc16] py-2 border-b border-zinc-100"
              >
                STREET LOOKBOOK
              </a>
              <a 
                href="#size-finder" 
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-[#84cc16] py-2"
              >
                FIT LAB
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Instant Search Modal */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-start justify-center pt-20 px-4 animate-in fade-in">
          <div className="w-full max-w-2xl bg-white border border-zinc-200 rounded-3xl p-6 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
              <div className="flex items-center gap-3 flex-1">
                <Search className="size-5 text-[#84cc16]" />
                <input 
                  type="text"
                  placeholder="Search silhouettes (e.g. Phantom, Volt, Carbon, Retro)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full bg-transparent text-black placeholder-zinc-400 text-base focus:outline-none"
                />
              </div>
              <button 
                onClick={() => { setSearchOpen(false); setSearchQuery(''); }}
                className="p-1 text-zinc-400 hover:text-black rounded-lg hover:bg-zinc-100"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="mt-4 max-h-[60vh] overflow-y-auto space-y-3 pr-2">
              {searchQuery.trim() === '' ? (
                <div>
                  <p className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-3">Trending Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {['Phantom Carbon 01', 'Cyber Volt V2', 'Waterproof Track', '90s Chunky Retro', 'Marathon Ultralight'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="px-3 py-1.5 rounded-full bg-zinc-100 hover:bg-zinc-200 text-xs text-zinc-700 hover:text-black transition"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              ) : filteredSearchResults.length === 0 ? (
                <div className="text-center py-8 text-zinc-500 text-sm">
                  No silhouettes found matching &quot;{searchQuery}&quot;
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredSearchResults.map((shoe) => (
                    <div 
                      key={shoe.id}
                      onClick={() => {
                        onSelectShoe(shoe);
                        setSearchOpen(false);
                        setSearchQuery('');
                      }}
                      className="flex items-center gap-4 p-3 rounded-2xl hover:bg-zinc-50 cursor-pointer transition border border-transparent hover:border-zinc-200 group"
                    >
                      <img src={shoe.image} alt={shoe.name} className="size-14 rounded-xl object-cover bg-zinc-100" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-black group-hover:text-[#65a30d] transition truncate">{shoe.name}</h4>
                        <p className="text-xs text-zinc-500 truncate">{shoe.tagline}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-black">${shoe.price}</span>
                        <span className="block text-[11px] text-zinc-400 capitalize">{shoe.category}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* JOIN Club Modal */}
      {joinModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="relative w-full max-w-md bg-white border border-zinc-200 rounded-3xl p-8 shadow-2xl text-center">
            <button
              onClick={() => { setJoinModalOpen(false); setJoinSubmitted(false); }}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-black rounded-full hover:bg-zinc-100"
            >
              <X className="size-5" />
            </button>

            <span className="inline-block px-3 py-1 rounded-full bg-[#ccff00] text-black text-[10px] font-extrabold tracking-widest uppercase mb-3">
              DENCLUB VIP ACCESS
            </span>
            <h3 className="text-2xl font-black text-black" style={{ fontFamily: 'Syne, sans-serif' }}>
              JOIN THE CLUB
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 mt-2 mb-6">
              Get access 15 minutes before public drops, members-only pricing, and secret colorways.
            </p>

            {joinSubmitted ? (
              <div className="p-4 rounded-2xl bg-lime-50 border border-lime-200 text-lime-800 text-sm font-bold">
                🎉 Welcome to DENCLUB! Check your inbox for your 15% VIP welcome code.
              </div>
            ) : (
              <form onSubmit={handleJoin} className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email..."
                  value={joinEmail}
                  onChange={(e) => setJoinEmail(e.target.value)}
                  required
                  className="w-full bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-[#84cc16]"
                />
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#ccff00] hover:bg-[#b8e600] text-black font-extrabold text-sm uppercase tracking-wider transition shadow-md cursor-pointer"
                >
                  GET VIP PASS
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
