import React from 'react';
import { ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-50 text-zinc-600 border-t border-zinc-200 pt-12 sm:pt-16 pb-12 sm:pb-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-7 sm:gap-10 pb-10 sm:pb-16 border-b border-zinc-200">
          
          {/* Brand Info */}
          <div className="col-span-2 lg:col-span-2 space-y-3.5 sm:space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl sm:text-3xl font-black text-black tracking-tighter uppercase" style={{ fontFamily: 'Syne, sans-serif' }}>
                DEN<span className="text-[#84cc16]">CLUB</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-zinc-600 max-w-sm leading-relaxed font-medium">
              DENCLUB is an independent footwear design atelier engineering high-performance propulsion runners and limited streetwear silhouettes for collectors worldwide.
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a href="#" aria-label="Instagram" className="size-8 sm:size-9 rounded-full bg-white hover:bg-zinc-100 text-black flex items-center justify-center transition border border-zinc-200 shadow-xs">
                <svg className="size-3.5 sm:size-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" aria-label="X / Twitter" className="size-8 sm:size-9 rounded-full bg-white hover:bg-zinc-100 text-black flex items-center justify-center transition border border-zinc-200 shadow-xs">
                <svg className="size-3 sm:size-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          {/* Column: Silhouettes */}
          <div className="space-y-2.5 sm:space-y-3">
            <h4 className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-black">Silhouettes</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs font-medium">
              <li><a href="#catalog" className="hover:text-black transition">Phantom Carbon 01</a></li>
              <li><a href="#catalog" className="hover:text-black transition">Cyber Volt V2</a></li>
              <li><a href="#catalog" className="hover:text-black transition">Aero Horizon Retro</a></li>
              <li><a href="#catalog" className="hover:text-black transition">Stealth Apex X</a></li>
              <li><a href="#catalog" className="hover:text-black transition">Solar Flare Neon</a></li>
              <li><a href="#catalog" className="hover:text-black transition">Minimalist Court 00</a></li>
            </ul>
          </div>

          {/* Column: Innovation */}
          <div className="space-y-2.5 sm:space-y-3">
            <h4 className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-black">Innovation</h4>
            <ul className="space-y-1.5 sm:space-y-2 text-[11px] sm:text-xs font-medium">
              <li><a href="#tech-lab" className="hover:text-black transition">Carbon Wave Plate</a></li>
              <li><a href="#tech-lab" className="hover:text-black transition">SuperCritical Foam</a></li>
              <li><a href="#tech-lab" className="hover:text-black transition">Hydro-Shield 3D Knit</a></li>
              <li><a href="#size-finder" className="hover:text-black transition">Sneaker Fit Finder</a></li>
              <li><a href="#lookbook" className="hover:text-black transition">Street Lookbook</a></li>
            </ul>
          </div>

          {/* Column: Support */}
          <div className="col-span-2 sm:col-span-1 space-y-2.5 sm:space-y-3">
            <h4 className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-black">Club Care</h4>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-medium">
              <li><a href="#community" className="hover:text-black transition">VIP Drop Access</a></li>
              <li><a href="#" className="hover:text-black transition">Track Your Order</a></li>
              <li><a href="#" className="hover:text-black transition">30-Day Size Exchange</a></li>
              <li><a href="#" className="hover:text-black transition">Sneaker Care</a></li>
              <li><a href="#" className="hover:text-black transition">Concierge Support</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] sm:text-xs text-zinc-500 font-medium">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
            <span>© 2025–2026 DENCLUB ATELIER INC. ALL RIGHTS RESERVED.</span>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-black transition">Privacy Policy</a>
              <a href="#" className="hover:text-black transition">Terms of Service</a>
            </div>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-zinc-100 text-black font-bold transition border border-zinc-200 shadow-xs cursor-pointer active:scale-95"
          >
            <span>Back to top</span>
            <ArrowUp className="size-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
