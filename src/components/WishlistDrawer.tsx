import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Perfume } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  perfumes: Perfume[];
  onRemoveFromWishlist: (id: string) => void;
  onAddToCart: (perfume: Perfume, size: string, price: number) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  perfumes,
  onRemoveFromWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const wishlistedPerfumes = perfumes.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#1E1611]/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#DECDB8] shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#E8DEC8] flex items-center justify-between bg-[#F7F2EB]">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#8C6D46] fill-[#8C6D46]" />
              <h2 className="font-serif text-xl text-[#1E1611] tracking-wide">
                Saved Fragrances ({wishlistedPerfumes.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-[#6B5A4B] hover:text-[#1E1611]"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6">
            {wishlistedPerfumes.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <Heart className="w-8 h-8 text-[#DECDB8] mx-auto" />
                <p className="font-serif text-xl text-[#1E1611]">No saved fragrances yet</p>
                <p className="text-xs text-[#6B5A4B]">
                  Click the heart icon on any colored bottle to save it to your private wishlist.
                </p>
              </div>
            ) : (
              <div className="space-y-4 divide-y divide-[#E8DEC8]">
                {wishlistedPerfumes.map((perfume) => (
                  <div key={perfume.id} className="pt-4 first:pt-0 flex gap-4">
                    <div className="w-20 h-20 bg-[#ECE3D4] border border-[#DECDB8] overflow-hidden shrink-0 relative">
                      <img
                        src={perfume.image}
                        alt={perfume.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-0 inset-x-0 bg-black/70 text-white text-[9px] font-mono text-center">
                        {perfume.volume}
                      </span>
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-serif text-base text-[#1E1611] font-medium leading-snug">
                              {perfume.name}
                            </h4>
                            <p className="text-xs text-[#8C6D46] font-mono">
                              {perfume.category} &bull; {perfume.volume}
                            </p>
                          </div>
                          <button
                            onClick={() => onRemoveFromWishlist(perfume.id)}
                            className="text-[#998675] hover:text-[#B23B3B] p-1"
                            aria-label="Remove from wishlist"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <span className="font-mono text-xs font-semibold tabular-nums text-[#1E1611]">
                          ₹{perfume.price.toLocaleString('en-IN')}
                        </span>

                        <button
                          onClick={() => onAddToCart(perfume, perfume.volume, perfume.price)}
                          className="px-3 py-1.5 bg-[#1E1611] text-[#FAF7F2] text-[10px] uppercase tracking-wider font-medium hover:bg-[#3D2C20] flex items-center gap-1.5"
                        >
                          <ShoppingBag className="w-3 h-3 text-[#C5A059]" />
                          <span>Move to Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-[#E8DEC8] bg-[#F7F2EB]">
            <button
              onClick={onClose}
              className="w-full py-3 border border-[#DFCDB6] text-[#6B5A4B] text-xs uppercase tracking-widest hover:bg-[#EAE0D2]"
            >
              Continue Exploring
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};
