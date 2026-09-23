import React, { useState } from 'react';
import { X, Star, ShoppingBag, Check, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { Perfume, BottleSize } from '../types';

interface QuickViewModalProps {
  perfume: Perfume | null;
  onClose: () => void;
  onAddToCart: (perfume: Perfume, size: string, price: number, ml?: number, engraving?: string) => void;
  onBuyNow: (perfume: Perfume, size: string, price: number, ml?: number, engraving?: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  perfume,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  if (!perfume) return null;

  const defaultSize =
    perfume.availableSizes.find((s) => s.millilitres === 50) ||
    perfume.availableSizes[1] ||
    perfume.availableSizes[0];

  const [selectedSize, setSelectedSize] = useState<BottleSize>(defaultSize);
  const [engraving, setEngraving] = useState('');
  const [showEngravingInput, setShowEngravingInput] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(perfume, selectedSize.size, selectedSize.price, selectedSize.millilitres, engraving.trim() || undefined);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  const handleBuy = () => {
    onBuyNow(perfume, selectedSize.size, selectedSize.price, selectedSize.millilitres, engraving.trim() || undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#1E1611]/70 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-[#FAF7F2] border border-[#DECDB8] max-w-3xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-[#6B5A4B] hover:text-[#1E1611]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Left: Product Image */}
          <div className="md:col-span-5 bg-[#EDE3D3] relative aspect-4/3 md:aspect-auto">
            <img
              src={perfume.image}
              alt={perfume.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 left-3 bg-[#1E1611] text-[#E8DCB8] px-2.5 py-1 text-[10px] uppercase tracking-widest font-semibold border border-[#DECDB8]">
              {selectedSize.millilitres} ml Active Flacon
            </div>
            {perfume.bottleColor && (
              <div className="absolute bottom-3 left-3 bg-[#1E1611]/90 backdrop-blur-xs text-[#FAF7F2] px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider border border-white/20">
                {perfume.bottleColor.toUpperCase()} CRYSTAL BOTTLE
              </div>
            )}
          </div>

          {/* Right: Details & Olfactory Breakdown */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-5 max-h-[85vh] overflow-y-auto">
            <div>
              <div className="flex items-center justify-between text-xs text-[#8C6D46] mb-1">
                <span className="uppercase tracking-[0.2em] font-medium">{perfume.category}</span>
                <div className="flex items-center gap-1 text-[#C5A059]">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="font-mono text-xs tabular-nums text-[#1E1611]">
                    {perfume.rating.toFixed(2)} ({perfume.reviewsCount} reviews)
                  </span>
                </div>
              </div>

              <h3 className="font-serif text-3xl text-[#1E1611] font-normal leading-tight">
                {perfume.name}
              </h3>
              <p className="font-serif italic text-xs text-[#8C6D46] mt-0.5">{perfume.tagline}</p>
            </div>

            <p className="text-xs text-[#5C4D3F] font-light leading-relaxed">
              {perfume.detailedDescription}
            </p>

            {/* Olfactory Pyramid Breakdown */}
            <div className="bg-[#F6EFE5] p-4 border border-[#E5DAC8] space-y-2 text-xs">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#8C6D46] font-medium block">
                Fragrance Architecture
              </span>
              <div className="space-y-1 text-[#4A3D31]">
                <div>
                  <strong className="text-[#1E1611] font-medium">Top Notes:</strong>{' '}
                  <span className="text-[#6B5A4B]">{perfume.topNotes.join(', ')}</span>
                </div>
                <div>
                  <strong className="text-[#1E1611] font-medium">Heart Notes:</strong>{' '}
                  <span className="text-[#6B5A4B]">{perfume.heartNotes.join(', ')}</span>
                </div>
                <div>
                  <strong className="text-[#1E1611] font-medium">Base Notes:</strong>{' '}
                  <span className="text-[#6B5A4B]">{perfume.baseNotes.join(', ')}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#DECDB8] flex items-center justify-between text-[11px] text-[#6B5A4B]">
                <span>Longevity: <strong className="text-[#1E1611]">{perfume.longevity}</strong></span>
                <span>Sillage: <strong className="text-[#1E1611]">{perfume.sillage}</strong></span>
              </div>
            </div>

            {/* Size Options (with prominent Millilitres in INR) */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-[#8C6D46]">
                <span className="font-medium">Select Bottle Millilitres (ml)</span>
                <span className="font-mono text-[#B34026] font-semibold">{selectedSize.millilitres} ml</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {perfume.availableSizes.map((s) => (
                  <button
                    key={s.size}
                    onClick={() => setSelectedSize(s)}
                    className={`p-2 text-center border text-xs transition-colors ${
                      selectedSize.size === s.size
                        ? 'border-[#8C6D46] bg-[#F5ECE0] text-[#1E1611] font-bold shadow-xs'
                        : 'border-[#DFCDB6] bg-transparent text-[#6B5A4B] hover:border-[#8C6D46]'
                    }`}
                  >
                    <span className="block font-mono font-semibold">{s.millilitres} ml</span>
                    <span className="block font-mono text-[11px] tabular-nums text-[#8C6D46] mt-0.5">
                      ₹{s.price.toLocaleString('en-IN')}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Flacon Engraving Option */}
            <div>
              {!showEngravingInput ? (
                <button
                  onClick={() => setShowEngravingInput(true)}
                  className="flex items-center gap-1.5 text-xs text-[#8C6D46] hover:text-[#1E1611] underline"
                >
                  <Sparkles className="w-3 h-3 text-[#C5A059]" />
                  <span>Add complimentary gold calligraphy engraving on bottle</span>
                </button>
              ) : (
                <div className="space-y-1.5 p-3 bg-[#F5ECE0] border border-[#DECDB8] text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] uppercase tracking-wider text-[#6B5A4B]">
                      Bottle Engraving (Max 16 chars)
                    </span>
                    <button
                      onClick={() => {
                        setShowEngravingInput(false);
                        setEngraving('');
                      }}
                      className="text-[#998675] hover:text-[#1E1611]"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <input
                    type="text"
                    maxLength={16}
                    placeholder="e.g. For Aisha · 2026"
                    value={engraving}
                    onChange={(e) => setEngraving(e.target.value)}
                    className="w-full bg-[#FAF7F2] border border-[#DFCDB6] p-2 text-xs text-[#1E1611] focus:outline-hidden"
                  />
                </div>
              )}
            </div>

            {/* Pricing Row in INR (₹) */}
            <div className="pt-2 flex items-baseline justify-between border-t border-[#DECDB8]">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#8C6D46] block">
                  Price ({selectedSize.millilitres} ml)
                </span>
                <span className="font-mono text-2xl font-bold tabular-nums text-[#1E1611]">
                  ₹{selectedSize.price.toLocaleString('en-IN')}
                </span>
              </div>
              {selectedSize.originalPrice && (
                <div className="text-right">
                  <span className="text-xs font-mono text-[#998675] line-through block">
                    ₹{selectedSize.originalPrice.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] font-bold text-[#B34026] uppercase">
                    Save ₹{(selectedSize.originalPrice - selectedSize.price).toLocaleString('en-IN')}
                  </span>
                </div>
              )}
            </div>

            {/* Dual Action Buttons: Buy Now & Add to Cart */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <button
                onClick={handleBuy}
                className="py-3.5 px-4 bg-[#1E1611] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#3D2C20] transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Zap className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Buy Now (Express)</span>
              </button>

              <button
                onClick={handleAdd}
                className={`py-3.5 px-4 text-xs uppercase tracking-[0.2em] font-semibold transition-colors flex items-center justify-center gap-2 ${
                  isAdded ? 'bg-[#4B6B48] text-white' : 'bg-[#C5A059] text-[#1E1611] hover:bg-[#DFBF77]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#8C6D46]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8C6D46]" />
              <span>Complimentary discovery sample coffret included with delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
