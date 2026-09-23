import React from 'react';
import { Clock, ShieldCheck, Flower2, Gift } from 'lucide-react';

export const WhyChooseZelia: React.FC = () => {
  const pillars = [
    {
      icon: Clock,
      title: '28%–32% Pure Extrait',
      subtitle: 'Uncompromising Longevity',
      description:
        'Twice the concentration of standard luxury perfumes. Our extraits fuse with your natural skin oils for a sillage that endures from early morning to late night without needing re-application.',
    },
    {
      icon: Flower2,
      title: 'Botanical Integrity',
      subtitle: 'Ethical French Sourcing',
      description:
        'Sourced directly from family growers in Grasse, Madagascar, and Calabria. We harvest at the precise hour when petals yield their most concentrated, authentic aromatic oils.',
    },
    {
      icon: ShieldCheck,
      title: '90-Day Cold Maceration',
      subtitle: 'No Synthetic Accelerators',
      description:
        'Most modern perfume is rushed to store shelves in 7 days. At ZÉLIA, we allow our blends 90 to 100 days of slow maturation in glass demijohns to achieve velvety, rounded harmony.',
    },
    {
      icon: Gift,
      title: 'Haute Presentation',
      subtitle: 'Complimentary Discovery Coffret',
      description:
        'Every full-size flacon arrives in our signature champagne textured gift box with a 2ml matching sample. Test the sample first; if not completely captivated, return the unopened flacon effortlessly.',
    },
  ];

  return (
    <section id="why-zelia" className="py-20 md:py-28 bg-[#F7F2EB] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-xs uppercase tracking-[0.3em] text-[#8C6D46] font-medium">
            The ZÉLIA Distinction
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E1611] font-light tracking-wide">
            Why Choose ZÉLIA
          </h2>
          <div className="w-12 h-px bg-[#C5A059] mx-auto my-3" />
          <p className="text-sm text-[#615143] font-light leading-relaxed">
            In an era of rushed synthetic scents, we remain fiercely devoted to the patient art of slow French haute parfumerie.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-[#FAF7F2] p-8 border border-[#E4D8C5] hover:border-[#C5A059] transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-[#DECDB8] bg-[#F5ECE0] text-[#8C6D46]">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl text-[#1E1611] font-normal leading-snug">
                      {pillar.title}
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-[#8C6D46] font-medium mt-1">
                      {pillar.subtitle}
                    </p>
                  </div>
                  <p className="text-xs text-[#615143] font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="pt-4 border-t border-[#EDE4D4] text-[11px] font-mono text-[#8C6D46]">
                  PILLAR 0{idx + 1}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
