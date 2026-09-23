import React, { useState } from 'react';
import { Shirt, Zap, ShoppingBag } from 'lucide-react';
import { OUTFIT_PAIRINGS, PERFUMES_DATA } from '../data/perfumes';
import { Perfume } from '../types';

interface CelebrityOutfitPairingProps {
  onAddToCart: (perfume: Perfume, size: string, price: number) => void;
  onBuyNow: (perfume: Perfume, size: string, price: number) => void;
  onQuickView: (perfume: Perfume) => void;
}

export const CelebrityOutfitPairing: React.FC<CelebrityOutfitPairingProps> = ({
  onAddToCart,
  onBuyNow,
  onQuickView,
}) => {
  const [selectedOutfitId, setSelectedOutfitId] = useState<string>(OUTFIT_PAIRINGS[0].id);

  const selectedPairing =
    OUTFIT_PAIRINGS.find((p) => p.id === selectedOutfitId) || OUTFIT_PAIRINGS[0];
  const pairedPerfume =
    PERFUMES_DATA.find((p) => p.id === selectedPairing.pairedPerfumeId) || PERFUMES_DATA[0];

  return (
    <section id="outfit-pairing" className="py-20 md:py-28 bg-[#1B130D] text-[#FAF7F2] border-b border-[#36271D]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="flex items-center justify-center gap-2 text-xs uppercase tracking-[0.3em] text-[#C5A059] font-medium">
            <Shirt className="w-4 h-4 text-[#C5A059]" />
            <span>Haute Couture &amp; Olfactory Styling</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-[#FAF7F2]">
            Celebrity Outfit &amp; Fragrance Pairing Guide
          </h2>
          <div className="w-12 h-px bg-[#C5A059] mx-auto my-3" />
          <p className="text-xs sm:text-sm text-[#D1C3B2] font-light leading-relaxed">
            Discover the exact fragrance and bottle pairings favored by celebrity stylists for red carpets, yacht parties, royal sangeets, and intimate candlelight dinners in Indian Rupees (₹).
          </p>
        </div>

        {/* Outfit Switcher Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {OUTFIT_PAIRINGS.map((pairing) => (
            <button
              key={pairing.id}
              onClick={() => setSelectedOutfitId(pairing.id)}
              className={`px-5 py-3 text-xs uppercase tracking-[0.18em] transition-all border ${
                selectedOutfitId === pairing.id
                  ? 'bg-[#C5A059] text-[#1E1611] font-bold border-[#C5A059] shadow-md'
                  : 'bg-[#251A12] text-[#D8C7B0] border-[#443224] hover:border-[#C5A059]'
              }`}
            >
              {pairing.celebrityName}
            </button>
          ))}
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center bg-[#241911] p-6 sm:p-10 border border-[#3E2C1E]">
          {/* Visual Column: Celebrity Photo */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-4/3 sm:aspect-16/11 overflow-hidden border border-[#C5A059]/40 shadow-xl">
              <img
                key={selectedPairing.image}
                src={selectedPairing.image}
                alt={selectedPairing.celebrityName}
                className="w-full h-full object-cover object-center animate-in fade-in duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B130D]/90 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 border border-white/20">
                <span className="text-[10px] uppercase tracking-widest text-[#C5A059] font-bold block">
                  {selectedPairing.vibe}
                </span>
                <span className="font-serif text-sm text-[#FAF7F2]">
                  {selectedPairing.celebrityName} &bull; {selectedPairing.occasion}
                </span>
              </div>
            </div>
          </div>

          {/* Details & Paired Perfume Column */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-[#C5A059] mb-1 font-mono">
                Stylist Pairing Breakdown
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF7F2] font-normal leading-snug">
                {selectedPairing.occasion}
              </h3>
              <p className="text-xs text-[#E8DCB8] italic mt-1 font-light">
                {selectedPairing.outfitDescription}
              </p>
            </div>

            {/* Celebrity Quote */}
            <blockquote className="p-4 bg-[#1B130D] border-l-2 border-[#C5A059] text-xs sm:text-sm text-[#D8C7B0] italic font-serif leading-relaxed">
              {selectedPairing.quote}
            </blockquote>

            {/* Paired Flacon Card in INR (₹) */}
            <div className="p-4 bg-[#1E150F] border border-[#C5A059]/30 flex flex-col sm:flex-row items-center gap-4">
              <div className="w-20 h-20 bg-[#2D1F16] border border-[#443224] shrink-0 overflow-hidden relative">
                <img
                  src={pairedPerfume.image}
                  alt={pairedPerfume.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {pairedPerfume.bottleColor && (
                  <span className="absolute bottom-0 inset-x-0 bg-black/70 text-[9px] font-mono text-center text-[#E8DCB8]">
                    {pairedPerfume.bottleColor.toUpperCase()}
                  </span>
                )}
              </div>

              <div className="flex-1 text-center sm:text-left space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg text-[#FAF7F2]">{pairedPerfume.name}</span>
                  <span className="font-mono text-xs text-[#C5A059] font-bold">
                    {pairedPerfume.volume} (Also in 30ml &amp; 100ml)
                  </span>
                </div>
                <p className="text-xs text-[#A89685] line-clamp-1">{pairedPerfume.tagline}</p>
                <div className="flex items-baseline gap-2 pt-1 justify-center sm:justify-start">
                  <span className="font-mono text-lg font-bold text-[#FAF7F2] tabular-nums">
                    ₹{pairedPerfume.price.toLocaleString('en-IN')}
                  </span>
                  {pairedPerfume.originalPrice && (
                    <span className="font-mono text-xs text-[#8C7B6D] line-through tabular-nums">
                      ₹{pairedPerfume.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="text-[10px] text-[#B34026] font-bold uppercase">
                    Save {pairedPerfume.discountPercent}%
                  </span>
                </div>
              </div>
            </div>

            {/* Dual Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() =>
                  onBuyNow(pairedPerfume, pairedPerfume.volume, pairedPerfume.price)
                }
                className="py-3.5 px-4 bg-[#C5A059] text-[#1E1611] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#DFBF77] transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Buy This Scent Pairing (Express)</span>
              </button>

              <button
                onClick={() =>
                  onAddToCart(pairedPerfume, pairedPerfume.volume, pairedPerfume.price)
                }
                className="py-3.5 px-4 bg-transparent border border-[#C5A059] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C5A059]/20 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add Scent to Bag</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
