import React, { useState } from 'react';
import { Sparkles, Zap, ShoppingBag, Crown, Ship, Heart, Flame } from 'lucide-react';
import { OCCASION_COLLECTIONS, PERFUMES_DATA } from '../data/perfumes';
import { Perfume } from '../types';

interface OccasionCollectionsProps {
  onAddToCart: (perfume: Perfume, size: string, price: number) => void;
  onBuyNow: (perfume: Perfume, size: string, price: number) => void;
  onQuickView: (perfume: Perfume) => void;
}

export const OccasionCollections: React.FC<OccasionCollectionsProps> = ({
  onAddToCart,
  onBuyNow,
  onQuickView,
}) => {
  const [activeTab, setActiveTab] = useState<'gala' | 'yacht' | 'wedding' | 'relationship'>('gala');

  const tabs = [
    { id: 'gala', label: 'Red Carpet Gala', icon: Flame, subtitle: 'Scarlet & Ruby Bottles' },
    { id: 'yacht', label: 'Riviera Yacht Party', icon: Ship, subtitle: 'Royal Sapphire Blue' },
    { id: 'wedding', label: 'Royal Wedding & Sangeet', icon: Crown, subtitle: 'Gold Vault Hampers' },
    { id: 'relationship', label: 'Intimate Romance', icon: Heart, subtitle: 'Blush Pink Silk' },
  ] as const;

  const currentCollection = OCCASION_COLLECTIONS[activeTab];

  return (
    <section id="occasion-collections" className="py-20 md:py-28 bg-[#FAF7F2] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="text-xs uppercase tracking-[0.3em] text-[#8C6D46] font-medium flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Celebrity Occasions &amp; Scent Pairings</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E1611] font-light tracking-wide">
            Shop Collections by Occasion
          </h2>
          <div className="w-12 h-px bg-[#C5A059] mx-auto my-3" />
          <p className="text-sm text-[#615143] font-light leading-relaxed">
            From the red carpets of Cannes to sunset yacht decks and royal weddings, experience each moment paired with its signature colored crystal flacon in Indian Rupees (₹).
          </p>
        </div>

        {/* 4 Occasion Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-4 text-left border transition-all duration-200 flex flex-col justify-between ${
                  isActive
                    ? 'border-[#B91C1C] bg-[#F5ECE0] text-[#1E1611] shadow-md ring-1 ring-[#B91C1C]'
                    : 'border-[#E0D2C0] bg-[#FAF7F2] text-[#6B5A4B] hover:border-[#8C6D46]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? 'text-[#B91C1C]' : 'text-[#8C6D46]'
                    }`}
                  />
                  <span className="text-[10px] font-mono text-[#8C6D46] uppercase">0{tabs.indexOf(tab) + 1}</span>
                </div>
                <div>
                  <span className="block font-serif text-lg font-normal leading-tight">
                    {tab.label}
                  </span>
                  <span className="block text-[11px] text-[#8C6D46] mt-0.5 font-mono">
                    {tab.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Occasion Spotlight Feature with Celebrity Photo */}
        <div className="bg-[#1C140E] text-[#FAF7F2] border border-[#3E2C1E] p-6 sm:p-10 mb-8 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Celebrity Photo for this occasion */}
            <div className="lg:col-span-6 relative aspect-16/10 overflow-hidden border border-[#C5A059]/40 shadow-2xl">
              <img
                key={currentCollection.celebrityImage}
                src={currentCollection.celebrityImage}
                alt={currentCollection.celebrityCaption}
                className="w-full h-full object-cover object-center animate-in fade-in duration-500 hover:scale-103 transition-transform"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-4 right-4 bg-black/60 backdrop-blur-xs p-2.5 border border-white/20">
                <span className="text-[10px] uppercase font-mono text-[#C5A059] tracking-wider block">
                  Celebrity Occasion Campaign
                </span>
                <span className="font-serif text-xs text-[#FAF7F2]">
                  {currentCollection.celebrityCaption}
                </span>
              </div>
            </div>

            {/* Occasion details */}
            <div className="lg:col-span-6 space-y-4">
              <div className="text-xs font-mono uppercase tracking-[0.25em] text-[#C5A059]">
                Featured Occasion Spotlight
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF7F2] font-light">
                {currentCollection.title}
              </h3>
              <p className="text-sm text-[#D1C3B2] font-light leading-relaxed">
                {currentCollection.subtitle}
              </p>
              <div className="pt-2 text-xs font-mono text-[#C5A059]">
                Curated Flacons in 30 ml · 50 ml · 100 ml with Free Shipping across India
              </div>
            </div>
          </div>
        </div>

        {/* Matched Perfumes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentCollection.items.map((item, idx) => {
            const matchedPerfume =
              PERFUMES_DATA.find((p) => p.id === item.id) || PERFUMES_DATA[0];

            return (
              <div
                key={idx}
                className="bg-[#FAF7F2] border border-[#E5DAC8] p-5 flex flex-col justify-between space-y-4 hover:border-[#C5A059] transition-all shadow-xs"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-[#8C6D46]">
                    <span className="font-mono text-[#B34026] font-semibold">{item.ml}</span>
                    <span className="uppercase tracking-wider">{item.temp}</span>
                  </div>

                  <div className="aspect-4/3 overflow-hidden bg-[#EDE4D4] border border-[#E0D2C0]">
                    <img
                      src={matchedPerfume.image}
                      alt={matchedPerfume.name}
                      className="w-full h-full object-cover hover:scale-104 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#8C6D46] block font-medium">
                      {item.name}
                    </span>
                    <h4 className="font-serif text-xl text-[#1E1611] font-normal leading-snug">
                      {matchedPerfume.name}
                    </h4>
                    <p className="text-xs text-[#6B5A4B] italic mt-0.5">
                      {matchedPerfume.subtitle} &bull; {matchedPerfume.volume}
                    </p>
                  </div>

                  <p className="text-xs text-[#524436] font-light line-clamp-2">
                    {matchedPerfume.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EDE4D4] space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="font-mono text-xl font-bold tabular-nums text-[#1E1611]">
                      ₹{matchedPerfume.price.toLocaleString('en-IN')}
                    </span>
                    {matchedPerfume.originalPrice && (
                      <span className="font-mono text-xs tabular-nums text-[#998675] line-through">
                        ₹{matchedPerfume.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() =>
                        onBuyNow(matchedPerfume, matchedPerfume.volume, matchedPerfume.price)
                      }
                      className="py-2.5 px-2 bg-[#1E1611] text-[#FAF7F2] text-[10px] uppercase tracking-wider font-semibold hover:bg-[#3D2C20] flex items-center justify-center gap-1 transition-colors"
                    >
                      <Zap className="w-3 h-3 text-[#C5A059]" />
                      <span>Buy Now</span>
                    </button>

                    <button
                      onClick={() =>
                        onAddToCart(matchedPerfume, matchedPerfume.volume, matchedPerfume.price)
                      }
                      className="py-2.5 px-2 bg-[#C5A059] text-[#1E1611] text-[10px] uppercase tracking-wider font-semibold hover:bg-[#DFBF77] flex items-center justify-center gap-1 transition-colors"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
