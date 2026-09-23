import React from 'react';

export const OurStory: React.FC = () => {
  return (
    <section id="our-story" className="py-20 md:py-28 bg-[#FAF7F2] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Visual Column */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative">
              {/* Subtle aesthetic backdrop */}
              <div className="absolute -inset-3 bg-[#EFE4D2] transform rotate-1 border border-[#DECDB8]" />

              <div className="relative bg-[#EDE3D3] p-2 sm:p-3 shadow-md border border-[#E0D2BF]">
                <div className="relative aspect-4/3 overflow-hidden">
                  <img
                    src="/src/assets/images/story_zelia_craft_1790138493621.jpg"
                    alt="Artisan master perfumer compounding rare botanical essences in the ZÉLIA atelier"
                    className="w-full h-full object-cover object-center hover:scale-103 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 bg-[#FAF7F2]/95 backdrop-blur-xs px-4 py-2 border border-[#DECDB8]">
                    <span className="font-serif italic text-xs text-[#2C2016]">
                      L&apos;Atelier de Grasse &mdash; 90-Day Slow Maceration
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <div className="text-xs uppercase tracking-[0.3em] text-[#8C6D46] font-medium">
              The Maison Heritage
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E1611] font-light tracking-wide leading-tight">
              Crafted for the Memory You Leave Behind
            </h2>

            <div className="w-12 h-px bg-[#C5A059]" />

            <div className="space-y-4 text-sm text-[#5C4D3F] font-light leading-relaxed">
              <p>
                Founded on the belief that true luxury cannot be rushed, <strong className="font-normal text-[#1E1611]">ZÉLIA</strong> was born in the floral cradles of Grasse, France. Here, where morning mist rolls off the Maritime Alps into fields of centifolia rose and sun-ripened orange blossoms, our master noses translate ephemeral emotions into liquid memories.
              </p>
              <p>
                While commercial fragrances prioritize volatile top notes designed to entice in a 10-second store test, ZÉLIA inverts this convention. We dedicate the lion&apos;s share of our formulas to rich base resins, precious woods, and solar ambers that bond intimately with your skin chemistry.
              </p>
              <p className="italic font-serif text-base text-[#2C2016] border-l-2 border-[#C5A059] pl-4 py-1">
                &ldquo;We don&apos;t just formulate perfumes; we bottle the feeling of turning a corner and realizing someone extraordinary has just walked past.&rdquo;
              </p>
              <p>
                Every single flacon undergoes a minimum of 90 days of slow maceration in temperature-controlled glass carboys, allowing each aromatic facet to marry naturally without synthetic fixatives or harsh preservatives.
              </p>
            </div>

            <div className="pt-4 grid grid-cols-2 gap-6 text-xs text-[#6B5A4B] border-t border-[#DECDB8]">
              <div>
                <span className="block font-serif text-2xl text-[#1E1611]">100%</span>
                <span className="text-[11px] uppercase tracking-wider text-[#8C6D46]">Artisanal Hand-Poured</span>
              </div>
              <div>
                <span className="block font-serif text-2xl text-[#1E1611]">Grasse</span>
                <span className="text-[11px] uppercase tracking-wider text-[#8C6D46]">Ethical Harvests</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
