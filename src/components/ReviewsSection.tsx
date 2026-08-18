import React, { useState } from 'react';
import { Star, ShieldCheck, Sparkles, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { DiagonalMarqueeCarousel } from './ui/great-ui-diagonal-marquee-carousel';

export function ReviewsSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  const streetCards = [
    {
      id: 'm-1',
      url: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&h=600&fit=crop&q=80',
      title: 'Tokyo Shibuya Night Vault',
    },
    {
      id: 'm-2',
      url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop&q=80',
      title: 'New York Crimson Carbon',
    },
    {
      id: 'm-3',
      url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=600&fit=crop&q=80',
      title: 'London Retro Pastel Horizon',
    },
    {
      id: 'm-4',
      url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=600&fit=crop&q=80',
      title: 'Paris Haute Stealth Apex',
    },
    {
      id: 'm-5',
      url: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&h=600&fit=crop&q=80',
      title: 'Berlin Underground Solar Flare',
    },
    {
      id: 'm-6',
      url: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&h=600&fit=crop&q=80',
      title: 'Milan Monochrome Minimalist',
    },
    {
      id: 'm-7',
      url: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&h=600&fit=crop&q=80',
      title: 'Seoul Cybernetic Cobalt Runner',
    },
  ];

  return (
    <section id="community" className="py-20 md:py-28 bg-white border-t border-zinc-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Standard Consistent Section Header & Rating Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="space-y-3 lg:col-span-7">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-bold uppercase tracking-wider text-black">
              <MessageSquare className="size-3.5 text-[#84cc16]" />
              <span>Verified Club Feedback</span>
            </div>
            <h2 
              className="text-4xl sm:text-5xl font-black tracking-tight text-black uppercase"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              COMMUNITY HYPE & REVIEWS
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 max-w-xl">
              Real feedback from sneakerheads, marathon pacers, and designers who beat the pavement daily in DENCLUB silhouettes.
            </p>
          </div>

          {/* Rating Summary Card */}
          <div className="lg:col-span-5 bg-zinc-50 border border-zinc-200 rounded-3xl p-6 flex items-center justify-between shadow-xs">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-black">4.92</span>
                <span className="text-zinc-500 text-sm font-bold">/ 5.00</span>
              </div>
              <div className="flex items-center gap-1 mt-1 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="size-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs text-zinc-500 font-medium block mt-1">Based on 1,480+ verified purchases</span>
            </div>

            <div className="space-y-1 text-right text-xs text-zinc-600 font-medium border-l border-zinc-200 pl-6">
              <div className="text-[#65a30d] font-bold flex items-center gap-1 justify-end">
                <ShieldCheck className="size-3.5" />
                <span>100% Authenticated</span>
              </div>
              <div>98.6% Would Recommend</div>
              <div>0.4% Return Rate</div>
            </div>
          </div>
        </div>

        {/* Full-width Seamless Borderless Diagonal Marquee */}
        <div className="relative w-full h-[600px] sm:h-[650px] md:h-[690px] my-6 mb-14 sm:mb-20 overflow-hidden bg-white">
          <DiagonalMarqueeCarousel
            cards={streetCards}
            angle={-20}
            baseSpeed={90}
            className="h-full bg-white"
          />
        </div>

        {/* Newsletter & VIP Drop Access Card with Generous Breathing Space */}
        <div className="mt-20 md:mt-32 relative overflow-hidden rounded-3xl bg-zinc-950 text-white p-8 sm:p-12 lg:p-16 border border-zinc-800 shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#ccff00]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-mono uppercase tracking-widest text-[#ccff00] border border-white/10">
              <Sparkles className="size-3" />
              <span>DENCLUB PRIVATE ACCESS</span>
            </div>

            <h3 
              className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white uppercase"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              NEVER MISS A LIMITED DROP
            </h3>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              Join 45,000+ collectors receiving SMS and email alerts 15 minutes before global drops go live. Zero spam, strictly heat.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-2xl bg-[#ccff00]/10 border border-[#ccff00]/30 text-[#ccff00] flex items-center gap-3 animate-in fade-in">
                <CheckCircle2 className="size-6 shrink-0" />
                <div>
                  <p className="font-bold text-white text-sm">You are on the VIP Access list!</p>
                  <p className="text-xs text-zinc-300">Check your inbox for your 10% welcome voucher and early drop code.</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-5 py-3.5 rounded-full bg-zinc-900 border border-zinc-700 text-white placeholder-zinc-500 text-sm focus:outline-hidden focus:border-[#ccff00] transition"
                />
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-black font-black text-sm uppercase tracking-wider transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer active:scale-95 whitespace-nowrap"
                >
                  <span>Get VIP Pass</span>
                  <Send className="size-4" />
                </button>
              </form>
            )}

            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-zinc-500 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#ccff00]" /> Early Drop Access
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#ccff00]" /> 1-of-1 Atelier Invites
              </span>
              <span className="flex items-center gap-1.5">
                <span className="size-1.5 rounded-full bg-[#ccff00]" /> Free Worldwide Shipping
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
