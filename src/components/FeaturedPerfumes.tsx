import React, { useState } from 'react';
import { ShoppingBag, Eye, Heart, Check, Star, Zap, Sparkles } from 'lucide-react';
import { Perfume, BottleSize } from '../types';

interface FeaturedPerfumesProps {
  perfumes: Perfume[];
  onAddToCart: (perfume: Perfume, size: string, price: number, ml?: number) => void;
  onBuyNow: (perfume: Perfume, size: string, price: number, ml?: number) => void;
  onQuickView: (perfume: Perfume) => void;
  wishlist: string[];
  onToggleWishlist: (perfumeId: string) => void;
  selectedCategory?: string;
  onCategoryChange?: (cat: string) => void;
}

export const FeaturedPerfumes: React.FC<FeaturedPerfumesProps> = ({
  perfumes,
  onAddToCart,
  onBuyNow,
  onQuickView,
  wishlist,
  onToggleWishlist,
  selectedCategory,
  onCategoryChange,
}) => {
  const [internalCategory, setInternalCategory] = useState<string>('All');
  const [selectedSizes, setSelectedSizes] = useState<Record<string, BottleSize>>({});
  const [addedAnimation, setAddedAnimation] = useState<string | null>(null);

  const activeCategory = selectedCategory !== undefined ? selectedCategory : internalCategory;

  const categories = [
    'All',
    'Ruby Red Edition',
    'Blush Pink Edition',
    'Royal Blue Edition',
    'Best Sellers',
    'Festive Offers',
    'Floral & Solar',
    'Amber & Woods',
  ];

  const handleCategorySelect = (cat: string) => {
    if (onCategoryChange) {
      onCategoryChange(cat);
    } else {
      setInternalCategory(cat);
    }
  };

  const filteredPerfumes = perfumes.filter((p) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Best Sellers') return p.isBestseller;
    if (activeCategory === 'Festive Offers') return p.isFestiveOffer || p.category === 'Festive Exclusive';
    return p.category === activeCategory;
  });

  const handleSizeChange = (perfumeId: string, sizeObj: BottleSize) => {
    setSelectedSizes((prev) => ({ ...prev, [perfumeId]: sizeObj }));
  };

  const getActiveSize = (perfume: Perfume): BottleSize => {
    return (
      selectedSizes[perfume.id] ||
      perfume.availableSizes.find((s) => s.millilitres === 50) ||
      perfume.availableSizes[1] ||
      perfume.availableSizes[0]
    );
  };

  const handleAdd = (perfume: Perfume) => {
    const size = getActiveSize(perfume);
    onAddToCart(perfume, size.size, size.price, size.millilitres);
    setAddedAnimation(perfume.id);
    setTimeout(() => setAddedAnimation(null), 1500);
  };

  const handleBuy = (perfume: Perfume) => {
    const size = getActiveSize(perfume);
    onBuyNow(perfume, size.size, size.price, size.millilitres);
  };

  const getBottleColorDot = (color?: string) => {
    switch (color) {
      case 'red':
        return 'bg-[#DC2626] border-[#FCA5A5]';
      case 'pink':
        return 'bg-[#EC4899] border-[#FBCFE8]';
      case 'royal-blue':
        return 'bg-[#2563EB] border-[#93C5FD]';
      case 'emerald':
        return 'bg-[#059669] border-[#A7F3D0]';
      default:
        return 'bg-[#D97706] border-[#FDE68A]';
    }
  };

  return (
    <section id="collection" className="py-20 md:py-28 bg-[#FAF7F2] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="text-xs uppercase tracking-[0.3em] text-[#8C6D46] font-medium flex items-center justify-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>Colored Crystal Flacons &amp; Haute Catalog</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E1611] font-light tracking-wide">
            Featured Perfumes in Indian Rupees (₹)
          </h2>
          <div className="w-12 h-px bg-[#C5A059] mx-auto my-3" />
          <p className="text-sm text-[#615143] font-light leading-relaxed">
            Select your exact millilitres (ml) in Ruby Red, Blush Pink, Royal Blue, and Golden crystal vessels. Complimentary delivery across India on orders over ₹1,999.
          </p>
        </div>

        {/* Filter Bar with Red, Pink, Royal Blue Bottles */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            const isRed = cat === 'Ruby Red Edition';
            const isPink = cat === 'Blush Pink Edition';
            const isBlue = cat === 'Royal Blue Edition';

            let activeClass = 'bg-[#1E1611] text-[#FAF7F2] border-[#1E1611]';
            if (isRed) activeClass = 'bg-[#DC2626] text-white border-[#DC2626] shadow-md';
            if (isPink) activeClass = 'bg-[#DB2777] text-white border-[#DB2777] shadow-md';
            if (isBlue) activeClass = 'bg-[#2563EB] text-white border-[#2563EB] shadow-md';

            return (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className={`px-4 py-2.5 text-xs uppercase tracking-[0.18em] transition-all duration-200 border flex items-center gap-1.5 ${
                  isSelected
                    ? `${activeClass} font-semibold`
                    : 'bg-transparent text-[#6B5A4B] border-[#E2D5C3] hover:border-[#8C6D46] hover:text-[#1E1611]'
                }`}
              >
                {isRed && <span className="w-2 h-2 rounded-full bg-[#EF4444]" />}
                {isPink && <span className="w-2 h-2 rounded-full bg-[#F472B6]" />}
                {isBlue && <span className="w-2 h-2 rounded-full bg-[#3B82F6]" />}
                <span>{cat}</span>
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {filteredPerfumes.map((perfume) => {
            const activeSize = getActiveSize(perfume);
            const isWishlisted = wishlist.includes(perfume.id);
            const isJustAdded = addedAnimation === perfume.id;

            return (
              <article
                key={perfume.id}
                className="group flex flex-col bg-[#F6F1EA] border border-[#E5DAC9] hover:border-[#C5A059] transition-all duration-300 hover:-translate-y-1 shadow-xs hover:shadow-lg"
              >
                {/* Image Container */}
                <div className="relative aspect-4/3 overflow-hidden bg-[#ECE3D4] border-b border-[#E8DEC8]">
                  <img
                    src={perfume.image}
                    alt={perfume.name}
                    className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Corner Badges: Color Edition or Discount */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    {perfume.bottleColor && (
                      <span className="inline-flex items-center gap-1.5 bg-[#1E1611]/90 backdrop-blur-xs text-[#FAF7F2] text-[10px] uppercase tracking-widest px-2.5 py-1 font-semibold border border-[#DECDB8]">
                        <span className={`w-2 h-2 rounded-full border ${getBottleColorDot(perfume.bottleColor)}`} />
                        <span>{perfume.bottleColor.toUpperCase()} BOTTLE</span>
                      </span>
                    )}
                    {perfume.discountPercent && (
                      <span className="bg-[#B34026] text-white text-[10px] uppercase tracking-widest px-2.5 py-1 font-bold shadow-xs">
                        Save {perfume.discountPercent}%
                      </span>
                    )}
                    {/* Millilitre Pill Display */}
                    <span className="bg-[#FAF7F2]/95 backdrop-blur-xs text-[#8C6D46] text-[10px] font-mono font-semibold uppercase px-2 py-0.5 border border-[#DECDB8]">
                      {activeSize.millilitres} ml Active
                    </span>
                  </div>

                  {/* Actions: Wishlist and Quick View */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-90 group-hover:opacity-100 transition-opacity z-10">
                    <button
                      onClick={() => onToggleWishlist(perfume.id)}
                      className={`p-2 rounded-full backdrop-blur-xs transition-colors shadow-xs ${
                        isWishlisted
                          ? 'bg-[#8C6D46] text-[#FAF7F2]'
                          : 'bg-[#FAF7F2]/90 text-[#4A3D31] hover:text-[#8C6D46]'
                      }`}
                      aria-label="Save to wishlist"
                    >
                      <Heart className="w-3.5 h-3.5 fill-current" />
                    </button>
                    <button
                      onClick={() => onQuickView(perfume)}
                      className="p-2 rounded-full bg-[#FAF7F2]/90 backdrop-blur-xs text-[#4A3D31] hover:text-[#8C6D46] transition-colors shadow-xs"
                      aria-label="Quick view details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Scent Pyramid Strip */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#1E1611]/85 via-[#1E1611]/40 to-transparent p-3 text-left">
                    <p className="text-[11px] text-[#E8DCB8] tracking-wider truncate font-light">
                      {perfume.topNotes.slice(0, 2).join(' · ')} &bull; {perfume.baseNotes[0]}
                    </p>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    {/* Category & Star Rating */}
                    <div className="flex items-center justify-between text-xs text-[#8C6D46] mb-1.5">
                      <span className="uppercase tracking-[0.2em] font-medium">{perfume.category}</span>
                      <div className="flex items-center gap-1 text-[#C5A059]">
                        <Star className="w-3 h-3 fill-[#C5A059]" />
                        <span className="font-mono text-xs tabular-nums text-[#4A3D31] font-medium">
                          {perfume.rating.toFixed(2)} ({perfume.reviewsCount})
                        </span>
                      </div>
                    </div>

                    {/* Perfume Title */}
                    <h3 className="font-serif text-2xl text-[#1E1611] font-normal tracking-wide group-hover:text-[#8C6D46] transition-colors">
                      {perfume.name}
                    </h3>
                    <p className="text-xs text-[#7B6A5B] italic mb-3">{perfume.subtitle}</p>

                    <p className="text-xs text-[#524436] font-light leading-relaxed line-clamp-2">
                      {perfume.description}
                    </p>
                  </div>

                  {/* Millilitre (ml) Selector */}
                  <div className="space-y-1.5 pt-2 border-t border-[#E8DEC8]">
                    <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-[#8C6D46]">
                      <span className="font-medium">Select Millilitres (ml)</span>
                      <span className="font-mono text-[#B34026] font-semibold">{activeSize.millilitres} ml</span>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                      {perfume.availableSizes.map((s) => (
                        <button
                          key={s.size}
                          onClick={() => handleSizeChange(perfume.id, s)}
                          className={`py-1.5 px-1 text-[11px] font-mono tracking-tight text-center border transition-all ${
                            activeSize.size === s.size
                              ? 'border-[#8C6D46] bg-[#FAF7F2] text-[#1E1611] font-bold shadow-xs'
                              : 'border-[#DFCDB6] bg-transparent text-[#6B5A4B] hover:border-[#8C6D46]'
                          }`}
                        >
                          <span className="block font-semibold">{s.millilitres} ml</span>
                          <span className="block text-[10px] text-[#8C6D46]">₹{s.price.toLocaleString('en-IN')}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Row in Indian Rupees (₹) */}
                  <div className="pt-2 flex items-baseline justify-between border-t border-[#EDE4D4]">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#8C6D46] block">
                        Price ({activeSize.millilitres} ml)
                      </span>
                      <div className="flex items-baseline gap-2">
                        <span className="font-mono text-xl font-bold tabular-nums text-[#1E1611]">
                          ₹{activeSize.price.toLocaleString('en-IN')}
                        </span>
                        {activeSize.originalPrice && (
                          <span className="font-mono text-xs tabular-nums text-[#998675] line-through">
                            ₹{activeSize.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>
                    {activeSize.originalPrice && (
                      <span className="text-[10px] font-mono font-bold text-[#B34026] uppercase">
                        Save ₹{(activeSize.originalPrice - activeSize.price).toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>

                  {/* DUAL ACTION BUTTONS: BUY NOW and ADD TO CART */}
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => handleBuy(perfume)}
                      className="py-3 px-2 bg-[#1E1611] text-[#FAF7F2] text-xs uppercase tracking-wider font-semibold hover:bg-[#3D2C20] flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                    >
                      <Zap className="w-3.5 h-3.5 text-[#C5A059]" />
                      <span>Buy Now</span>
                    </button>

                    <button
                      onClick={() => handleAdd(perfume)}
                      className={`py-3 px-2 text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-1.5 ${
                        isJustAdded
                          ? 'bg-[#4B6B48] text-white'
                          : 'bg-[#C5A059] text-[#1E1611] hover:bg-[#DFBF77]'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
