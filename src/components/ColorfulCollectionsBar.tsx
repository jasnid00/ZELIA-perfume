import React from 'react';
import { Sparkles, Flame, Heart, Wind, Moon, Gift, Droplets } from 'lucide-react';

interface ColorfulCollectionsBarProps {
  onSelectCategory: (cat: string) => void;
  activeCategory: string;
}

export const ColorfulCollectionsBar: React.FC<ColorfulCollectionsBarProps> = ({
  onSelectCategory,
  activeCategory,
}) => {
  const collections = [
    {
      id: 'All',
      name: 'All Bottles',
      colorBg: 'from-[#2A1F18] to-[#1E1611]',
      borderColor: 'border-[#8C6D46]',
      icon: Sparkles,
      tag: 'Full Catalog',
    },
    {
      id: 'Ruby Red Edition',
      name: 'Ruby Red Bottles',
      colorBg: 'from-[#991B1B] via-[#DC2626] to-[#EF4444]',
      borderColor: 'border-[#FCA5A5]',
      icon: Flame,
      tag: 'Rouge Impérial · 50ml',
      highlight: true,
      badgeText: 'Trending',
    },
    {
      id: 'Blush Pink Edition',
      name: 'Blush Pink Bottles',
      colorBg: 'from-[#BE185D] via-[#EC4899] to-[#F472B6]',
      borderColor: 'border-[#FBCFE8]',
      icon: Heart,
      tag: 'Rose Poudrée · 50ml',
      highlight: true,
      badgeText: 'New Drop',
    },
    {
      id: 'Royal Blue Edition',
      name: 'Royal Blue Bottles',
      colorBg: 'from-[#1E3A8A] via-[#2563EB] to-[#3B82F6]',
      borderColor: 'border-[#93C5FD]',
      icon: Droplets,
      tag: 'Bleu Saphir · 50ml',
      highlight: true,
      badgeText: 'Iconic',
    },
    {
      id: 'Festive Exclusive',
      name: 'Festive Hampers',
      colorBg: 'from-[#78350F] via-[#B45309] to-[#D97706]',
      borderColor: 'border-[#FDE68A]',
      icon: Gift,
      tag: 'Save ₹6,000',
    },
    {
      id: 'Amber & Woods',
      name: 'Emerald Mysore',
      colorBg: 'from-[#064E3B] via-[#047857] to-[#10B981]',
      borderColor: 'border-[#6EE7B7]',
      icon: Moon,
      tag: 'Santal Nocturne',
    },
  ];

  return (
    <section className="py-8 bg-[#FAF7F2] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B91C1C] animate-pulse" />
            <h3 className="font-serif text-lg md:text-xl text-[#1E1611] font-medium tracking-wide">
              Shop by Colored Bottles: Red, Blush Pink &amp; Royal Blue
            </h3>
          </div>
          <span className="text-xs font-mono uppercase text-[#8C6D46] tracking-wider hidden sm:inline">
            Faceted Crystal Vessels in INR (₹)
          </span>
        </div>

        {/* Horizontal scrollable colorful collection tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {collections.map((item) => {
            const Icon = item.icon;
            const isSelected = activeCategory === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectCategory(item.id);
                  const el = document.getElementById('collection');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group relative overflow-hidden p-3.5 text-left rounded-xs border transition-all duration-300 ${
                  isSelected
                    ? 'ring-2 ring-[#C5A059] scale-102 shadow-md'
                    : 'hover:scale-102 hover:shadow-xs'
                } bg-gradient-to-br ${item.colorBg} text-white`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="w-7 h-7 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center">
                    <Icon className="w-3.5 h-3.5 text-white" />
                  </div>
                  {item.highlight && (
                    <span className="bg-[#FAF7F2] text-[#1E1611] text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-xs tracking-wider shadow-xs">
                      {item.badgeText}
                    </span>
                  )}
                </div>

                <div className="text-xs font-semibold tracking-wide leading-tight drop-shadow-xs">
                  {item.name}
                </div>
                <div className="text-[10px] text-white/80 font-mono tracking-tight mt-0.5">
                  {item.tag}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
