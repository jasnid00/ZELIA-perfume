import React, { useState, useEffect } from 'react';
import { Gift, Zap, Clock, ShoppingBag, Sparkles } from 'lucide-react';
import { Perfume } from '../types';

interface FestiveOffersProps {
  perfumes: Perfume[];
  onAddToCart: (perfume: Perfume, size: string, price: number) => void;
  onBuyNow: (perfume: Perfume, size: string, price: number) => void;
  onQuickView: (perfume: Perfume) => void;
}

export const FestiveOffers: React.FC<FestiveOffersProps> = ({
  perfumes,
  onAddToCart,
  onBuyNow,
  onQuickView,
}) => {
  // Live Countdown Timer state
  const [timeLeft, setTimeLeft] = useState({
    hours: 8,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const festiveItems = perfumes.filter(
    (p) => p.isFestiveOffer || p.category === 'Festive Exclusive' || p.category === 'Ruby Red Edition' || p.category === 'Royal Blue Edition'
  );

  return (
    <section id="festive-offers" className="py-16 md:py-24 bg-[#F5ECE0] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Deal Header with Live Countdown Banner */}
        <div className="bg-gradient-to-r from-[#8A241A] via-[#A83220] to-[#6E1C13] text-white p-6 sm:p-8 rounded-sm shadow-md mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-white/20 backdrop-blur-xs text-xs uppercase tracking-widest font-bold">
              <Gift className="w-3.5 h-3.5 text-[#FDE047]" />
              <span>Festive Season Mega Privilege in INR (₹)</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal">
              Grand Festive Perfume Deals, Colored Flacons &amp; Hampers
            </h2>
            <p className="text-xs sm:text-sm text-white/90 font-light">
              Save up to 45% + Receive a Complimentary 3-Piece Mini Extrait Coffret on orders over ₹2,499
            </p>
          </div>

          {/* Countdown Clock */}
          <div className="bg-black/30 backdrop-blur-md px-5 py-3 border border-white/20 rounded-xs flex items-center gap-4 text-center">
            <div className="flex items-center gap-1.5 text-xs text-[#FDE047] font-semibold uppercase tracking-wider mr-2">
              <Clock className="w-4 h-4 animate-spin-slow" />
              <span>Ends in:</span>
            </div>
            <div className="flex items-center gap-2 font-mono">
              <div className="bg-white/10 px-2 py-1 min-w-[42px]">
                <span className="text-xl font-bold block">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-[9px] uppercase tracking-wider text-white/70">Hours</span>
              </div>
              <span className="text-lg font-bold text-[#FDE047]">:</span>
              <div className="bg-white/10 px-2 py-1 min-w-[42px]">
                <span className="text-xl font-bold block">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-[9px] uppercase tracking-wider text-white/70">Mins</span>
              </div>
              <span className="text-lg font-bold text-[#FDE047]">:</span>
              <div className="bg-white/10 px-2 py-1 min-w-[42px]">
                <span className="text-xl font-bold block">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-[9px] uppercase tracking-wider text-white/70">Secs</span>
              </div>
            </div>
          </div>
        </div>

        {/* Festive Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {festiveItems.slice(0, 4).map((perfume) => (
            <div
              key={perfume.id}
              className="bg-[#FAF7F2] border border-[#E5DAC8] hover:border-[#C5A059] transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-lg group"
            >
              {/* Product Visual */}
              <div className="relative aspect-4/3 overflow-hidden bg-[#ECE3D4] border-b border-[#E8DEC8]">
                <img
                  src={perfume.image}
                  alt={perfume.name}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Offer Badge */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  <span className="bg-[#B34026] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 shadow-xs">
                    {perfume.discountPercent}% OFF
                  </span>
                  <span className="bg-[#FAF7F2]/95 backdrop-blur-xs text-[#1E1611] text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 border border-[#DECDB8]">
                    {perfume.volume}
                  </span>
                </div>

                <div className="absolute top-2 right-2">
                  <button
                    onClick={() => onQuickView(perfume)}
                    className="text-[10px] uppercase tracking-widest bg-white/90 hover:bg-white text-[#1E1611] px-2 py-1 font-medium shadow-xs"
                  >
                    Quick View
                  </button>
                </div>
              </div>

              {/* Info & Millilitres */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#8C6D46] mb-1">
                    <span className="uppercase tracking-wider">{perfume.category}</span>
                    <span className="font-mono text-[#B34026] font-semibold">{perfume.volume}</span>
                  </div>

                  <h3 className="font-serif text-xl text-[#1E1611] font-normal leading-snug group-hover:text-[#8C6D46] transition-colors">
                    {perfume.name}
                  </h3>
                  <p className="text-xs text-[#7B6A5B] italic line-clamp-1">{perfume.tagline}</p>
                </div>

                {/* Price Display in INR (₹) */}
                <div className="pt-2 border-t border-[#EDE4D4] flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-xl font-bold tabular-nums text-[#1E1611]">
                      ₹{perfume.price.toLocaleString('en-IN')}
                    </span>
                    {perfume.originalPrice && (
                      <span className="font-mono text-xs tabular-nums text-[#998675] line-through">
                        ₹{perfume.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  {perfume.originalPrice && (
                    <span className="text-[10px] font-bold text-[#B34026] uppercase">
                      Save ₹{(perfume.originalPrice - perfume.price).toLocaleString('en-IN')}
                    </span>
                  )}
                </div>

                {/* Dual Action Buttons: Buy Now & Add to Cart */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => onBuyNow(perfume, perfume.volume, perfume.price)}
                    className="py-2.5 px-2 bg-[#1E1611] text-[#FAF7F2] text-[10px] uppercase tracking-wider font-semibold hover:bg-[#3D2C20] flex items-center justify-center gap-1 transition-colors"
                  >
                    <Zap className="w-3 h-3 text-[#C5A059]" />
                    <span>Buy Now</span>
                  </button>

                  <button
                    onClick={() => onAddToCart(perfume, perfume.volume, perfume.price)}
                    className="py-2.5 px-2 bg-[#C5A059] text-[#1E1611] text-[10px] uppercase tracking-wider font-semibold hover:bg-[#DFBF77] flex items-center justify-center gap-1 transition-colors"
                  >
                    <ShoppingBag className="w-3 h-3" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Privilege Code Callout Banner */}
        <div className="mt-10 bg-[#FAF7F2] border border-[#DECDB8] p-4 text-center flex flex-col sm:flex-row items-center justify-center gap-3 text-xs">
          <Sparkles className="w-4 h-4 text-[#C5A059]" />
          <span className="text-[#5C4D3F]">
            Apply Festive Coupon at checkout: <strong className="font-mono bg-[#EADCC9] px-2 py-0.5 text-[#1E1611]">FESTIVE20</strong> for an extra 20% discount on orders over ₹3,999!
          </span>
        </div>
      </div>
    </section>
  );
};
