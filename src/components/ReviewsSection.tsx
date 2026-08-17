import React, { useState } from 'react';
import { Star, ShieldCheck, Sparkles, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { TESTIMONIALS } from '../data/shoes';

export function ReviewsSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <section id="community" className="py-20 md:py-28 bg-white border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header and Aggregate Rating */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-7 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-zinc-100 border border-zinc-200 text-xs font-bold uppercase tracking-wider text-black">
              <MessageSquare className="size-3.5 text-[#84cc16]" />
              <span>Verified Club Feedback</span>
            </div>
            <h2 
              className="text-4xl sm:text-5xl font-black tracking-tight text-black uppercase"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              COMMUNITY HYPE & REVIEWS
            </h2>
            <p className="text-zinc-600 text-sm sm:text-base max-w-xl">
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {TESTIMONIALS.map(t => (
            <div 
              key={t.id}
              className="bg-zinc-50 border border-zinc-200 hover:border-zinc-300 rounded-3xl p-6 flex flex-col justify-between space-y-4 shadow-xs transition duration-300"
            >
              <div className="space-y-3">
                {/* Rating & Date */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="size-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-zinc-400 font-bold">{t.date}</span>
                </div>

                {/* Comment */}
                <p className="text-sm text-zinc-700 leading-relaxed italic">
                  &ldquo;{t.comment}&rdquo;
                </p>

                {/* Model Tag */}
                <div className="pt-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-white border border-zinc-200 text-[11px] text-black font-bold shadow-xs">
                    Purchased: {t.shoeName}
                  </span>
                </div>
              </div>

              {/* Reviewer Profile */}
              <div className="flex items-center gap-3 pt-4 border-t border-zinc-200">
                <img 
                  src={t.avatar} 
                  alt={t.name} 
                  className="size-11 rounded-full object-cover border border-zinc-200" 
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-sm font-bold text-black">{t.name}</h4>
                    {t.verified && (
                      <CheckCircle2 className="size-3.5 text-[#65a30d]" />
                    )}
                  </div>
                  <p className="text-xs text-zinc-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* VIP Drop Alert Box */}
        <div className="relative rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-2xl text-white">
          <div className="relative z-10 space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-zinc-800 text-xs font-bold text-[#ccff00] uppercase tracking-widest">
              <Sparkles className="size-3.5" />
              <span>DENCLUB VIP DROP NOTIFICATIONS</span>
            </div>

            <h3 
              className="text-3xl sm:text-4xl font-black text-white uppercase"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              NEVER MISS A LIMITED DROP
            </h3>

            <p className="text-zinc-400 text-sm">
              Members receive early access 15 minutes before public drop windows and secret password codes for Tier-1 collaborations.
            </p>

            {subscribed ? (
              <div className="p-4 rounded-2xl bg-lime-500/20 border border-lime-500/40 text-lime-300 text-sm font-bold flex items-center justify-center gap-2 animate-in fade-in">
                <CheckCircle2 className="size-5" />
                <span>You&apos;re in the club! Use secret promo code <strong>DENMEMBER15</strong> for 15% off your first order.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-2">
                <input
                  type="email"
                  placeholder="Enter your email for priority drop alerts..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-zinc-800 border border-zinc-700 rounded-full px-5 py-3.5 text-sm text-white placeholder-zinc-400 focus:outline-none focus:border-[#ccff00]"
                />
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-full bg-[#ccff00] hover:bg-[#b8e600] font-extrabold text-sm uppercase tracking-wider text-black transition shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  <span>Join Club Pass</span>
                  <Send className="size-4" />
                </button>
              </form>
            )}

            <span className="text-[11px] text-zinc-500 block pt-1 font-medium">
              No spam ever. 1-click unsubscribe anytime. 48,000+ active members.
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
