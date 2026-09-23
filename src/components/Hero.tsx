import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
  onExploreCollection: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onShopNow, onExploreCollection }) => {
  return (
    <section className="relative overflow-hidden bg-[#F7F2EB] border-b border-[#E8DEC8]">
      {/* Background warm radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#FAF2E6] via-[#F5ECE0] to-[#EFE4D2] pointer-events-none opacity-80" />

      <div className="relative max-w-7xl mx-auto px-6 py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left space-y-6 md:space-y-8 z-10">
            {/* Quiet Maison Kicker */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-[#8C6D46]">
              <span>Haute Parfumerie</span>
              <span aria-hidden="true">·</span>
              <span>Grasse &amp; Paris</span>
              <span aria-hidden="true">·</span>
              <span>Pure Extrait</span>
            </div>

            {/* Main Brand Title & Tagline */}
            <div className="space-y-4">
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light tracking-[0.15em] text-[#1E1611] uppercase leading-none">
                ZÉLIA
              </h1>
              <p className="font-serif italic text-2xl sm:text-3xl text-[#5C4736] font-normal leading-snug max-w-lg">
                &ldquo;A scent that lingers long after you leave.&rdquo;
              </p>
            </div>

            <p className="text-sm md:text-base text-[#615143] leading-relaxed max-w-lg font-light">
              Crafted in small botanical batches using century-old French maceration techniques. 
              Sensual warmth, velvety florals, and luminous amber that weave an intimate, unforgettable aura.
            </p>

            {/* Dual CTAs: Shop Now & Explore Collection */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onShopNow}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1E1611] text-[#FAF7F2] text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#3D2C20] transition-colors shadow-xs"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreCollection}
                className="inline-flex items-center justify-center px-8 py-4 bg-transparent border border-[#A6865A] text-[#2C2016] text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#EADBCE]/50 transition-colors"
              >
                Explore Collection
              </button>
            </div>

            {/* Trust Badges - Clean Unboxed Metadata */}
            <div className="pt-6 border-t border-[#DECDB8] grid grid-cols-3 gap-4 text-xs text-[#6B5A4B]">
              <div>
                <span className="block font-serif text-xl sm:text-2xl text-[#1E1611] font-normal">28–32%</span>
                <span className="text-[11px] uppercase tracking-wider text-[#8C6D46]">Extrait Concentration</span>
              </div>
              <div>
                <span className="block font-serif text-xl sm:text-2xl text-[#1E1611] font-normal">90 Days</span>
                <span className="text-[11px] uppercase tracking-wider text-[#8C6D46]">Slow Maceration</span>
              </div>
              <div>
                <span className="block font-serif text-xl sm:text-2xl text-[#1E1611] font-normal">14+ Hrs</span>
                <span className="text-[11px] uppercase tracking-wider text-[#8C6D46]">Skin Longevity</span>
              </div>
            </div>
          </div>

          {/* Right Visual Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Decorative warm aura */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#E6D4BE] to-[#F7EAD7] rounded-sm transform -rotate-1 opacity-70 blur-xs" />

              {/* Main Image Showcase */}
              <div className="relative bg-[#EDE3D3] p-2 sm:p-3 shadow-md border border-[#E0D2BF]">
                <div className="overflow-hidden relative aspect-16/11 sm:aspect-16/10">
                  <img
                    src="/src/assets/images/hero_zelia_perfume_1790138430453.jpg"
                    alt="ZÉLIA signature crystal perfume flacon nestled in cream silk and dried champagne botanicals"
                    className="w-full h-full object-cover object-center transform hover:scale-103 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle luxury overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1E1611]/30 via-transparent to-transparent pointer-events-none" />

                  {/* Corner Accent Label */}
                  <div className="absolute bottom-4 left-4 bg-[#FAF7F2]/90 backdrop-blur-xs px-3.5 py-1.5 border border-[#DECDB8] flex items-center gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#9A7432]" />
                    <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-[#2C2016]">
                      ZÉLIA L&apos;Absolu Heritage Flacon
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
