import React, { useState } from 'react';
import { Sparkles, ShoppingBag, Zap, Star, ShieldCheck } from 'lucide-react';
import { Perfume } from '../types';
import { PERFUMES_DATA } from '../data/perfumes';

interface CelebrityIntroProps {
  perfume: Perfume;
  onAddToCart: (perfume: Perfume, size: string, price: number) => void;
  onBuyNow: (perfume: Perfume, size: string, price: number) => void;
  onQuickView: (perfume: Perfume) => void;
}

export const CelebrityIntro: React.FC<CelebrityIntroProps> = ({
  onAddToCart,
  onBuyNow,
  onQuickView,
}) => {
  // Let user switch between Scarlet Red Flacon and Champagne Gold Flacon
  const [selectedCelebrityScentId, setSelectedCelebrityScentId] = useState<string>('rouge-imperial');

  const activePerfume =
    PERFUMES_DATA.find((p) => p.id === selectedCelebrityScentId) || PERFUMES_DATA[0];

  const celebrityScents = [
    {
      id: 'rouge-imperial',
      label: 'Scarlet Gala (Red Bottle)',
      celebrityPhoto: '/src/assets/images/celebrity_occasion_gala_1790140421441.jpg',
      quote: '“Rouge Impérial leaves a magnetic crimson trail on bare skin. Every head turns as I walk by.”',
    },
    {
      id: 'bleu-saphir',
      label: 'Riviera Yacht (Blue Bottle)',
      celebrityPhoto: '/src/assets/images/celebrity_occasion_yacht_1790140443712.jpg',
      quote: '“Bleu Saphir is liquid luxury. Crisp marine amber and cypress that feels like sailing through the French Riviera.”',
    },
    {
      id: 'rose-poudree',
      label: 'Silk Peony (Pink Bottle)',
      celebrityPhoto: '/src/assets/images/celebrity_intro_glamour_1790139308498.jpg',
      quote: '“A touch of Rose Poudrée on my shoulders before stepping out; he leans in before I even sit down.”',
    },
  ];

  const currentOption =
    celebrityScents.find((s) => s.id === selectedCelebrityScentId) || celebrityScents[0];

  return (
    <section id="celebrity-spotlight" className="py-16 md:py-24 bg-[#18110B] text-[#FAF7F2] border-b border-[#36271D] relative overflow-hidden">
      {/* Background soft ambient glows */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#DC2626]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Celebrity Switcher Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-medium mr-2">
            Celebrity Spotlight Editions:
          </span>
          {celebrityScents.map((cs) => (
            <button
              key={cs.id}
              onClick={() => setSelectedCelebrityScentId(cs.id)}
              className={`px-4 py-2 text-xs uppercase tracking-wider transition-all border ${
                selectedCelebrityScentId === cs.id
                  ? 'bg-[#C5A059] text-[#1E1611] font-bold border-[#C5A059] shadow-md'
                  : 'bg-[#251A12] text-[#D8C7B0] border-[#443224] hover:border-[#C5A059]'
              }`}
            >
              {cs.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Visual Column: Celebrity Holding Perfume */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Gold frame accent */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#C5A059] via-[#DC2626] to-[#2563EB] rounded-xs opacity-50 blur-xs" />

              <div className="relative bg-[#251A12] p-2 border border-[#C5A059]/40 shadow-2xl">
                <div className="relative aspect-4/5 sm:aspect-16/11 overflow-hidden">
                  <img
                    key={currentOption.celebrityPhoto}
                    src={currentOption.celebrityPhoto}
                    alt="Glamorous seductive celebrity holding the iconic ZÉLIA perfume flacon"
                    className="w-full h-full object-cover object-center animate-in fade-in duration-500 transform hover:scale-103 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#18110B]/90 via-transparent to-transparent pointer-events-none" />

                  {/* Red Carpet VIP Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-[#1E1611]/90 backdrop-blur-md p-3 border border-[#C5A059]/40 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-widest text-[#C5A059] font-semibold">
                        Red Carpet Premiere Exclusive
                      </div>
                      <div className="font-serif text-sm text-[#FAF7F2]">
                        {activePerfume.name} &bull; {activePerfume.volume}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-[#C5A059]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text & Offer Column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[#B34026] text-white text-[10px] uppercase tracking-[0.25em] font-bold">
                Celebrity Red Carpet Choice
              </span>
              <span className="text-xs uppercase tracking-[0.25em] text-[#C5A059]">
                {activePerfume.category}
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#FAF7F2] leading-tight">
                {activePerfume.name}: The Scent of Haute Icons
              </h2>
              <p className="font-serif italic text-xl text-[#E8DCB8]">
                {currentOption.quote}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#D1C3B2] font-light leading-relaxed">
              {activePerfume.detailedDescription}
            </p>

            {/* Millilitres and Indian Rupee Pricing Callout */}
            <div className="p-4 bg-[#231810] border border-[#C5A059]/30 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#C5A059] block">
                    Featured Millilitre Presentation
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="font-serif text-xl text-[#FAF7F2]">
                      {activePerfume.name} &bull; {activePerfume.volume} Flacon
                    </span>
                    <span className="text-xs bg-[#C5A059]/20 text-[#E8DCB8] px-2 py-0.5 font-mono">
                      Also in 30 ml &amp; 100 ml
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  {activePerfume.originalPrice && (
                    <span className="text-xs font-mono text-[#A39180] line-through block">
                      ₹{activePerfume.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  <span className="font-mono text-2xl font-bold text-[#E8DCB8] tabular-nums">
                    ₹{activePerfume.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Dual Action Buttons: Buy Now & Add to Cart */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => onBuyNow(activePerfume, activePerfume.volume, activePerfume.price)}
                  className="w-full py-3.5 px-4 bg-[#C5A059] text-[#1E1611] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#DFBF77] transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <Zap className="w-4 h-4 fill-current" />
                  <span>Buy Now (Express COD / UPI)</span>
                </button>

                <button
                  onClick={() => onAddToCart(activePerfume, activePerfume.volume, activePerfume.price)}
                  className="w-full py-3.5 px-4 bg-transparent border border-[#C5A059] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#C5A059]/20 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-3 text-[11px] text-[#C5A059] pt-2 border-t border-[#36271D]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span>100% Authentic Flacons</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
                <span>Free Discovery Samples</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 shrink-0" />
                <span>Cash on Delivery (COD)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
