import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, X, Heart, Sparkles, Gift } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  onSearchQuery?: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  onOpenCart,
  wishlistCount,
  onOpenWishlist,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [announcementIdx, setAnnouncementIdx] = useState(0);

  const announcements = [
    '✨ FESTIVE SALE LIVE: Save up to 45% + Free Express Shipping across India over ₹1,999',
    '🔴 NEW DROPS: Ruby Red, Blush Pink & Royal Sapphire Blue Crystal Bottles now live!',
    '🎁 Use Code: FESTIVE20 for Extra 20% Privilege Discount on all flacons & hampers',
    '⭐ Cash on Delivery (COD) & UPI Instant Pay available across 25,000+ PIN codes',
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIdx((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [announcements.length]);

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* Top announcement bar - rotating FridayCharm style promo ticker */}
      <div className="bg-[#1A120B] text-[#E8DCB8] text-[11px] py-2 px-4 text-center tracking-wider uppercase font-medium flex items-center justify-center gap-3 transition-all border-b border-[#36261A]">
        <Gift className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
        <span className="truncate">{announcements[announcementIdx]}</span>
      </div>

      {/* Top Bar Contract: 3 zones, 1 row */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF7F2]/95 backdrop-blur-md shadow-xs border-b border-[#E8DEC8]'
            : 'bg-[#FAF7F2] border-b border-[#EDE4D4]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#"
            className="font-serif text-3xl md:text-4xl tracking-[0.25em] text-[#1E1611] font-light hover:text-[#8C6D46] transition-colors uppercase"
          >
            ZÉLIA
          </a>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-xs uppercase tracking-[0.18em] font-medium text-[#4A3D31]">
            <a
              href="#festive-offers"
              className="text-[#B34026] font-semibold hover:text-[#8C1F10] transition-colors relative py-1 flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-[#B34026]" />
              <span>Festive Deals (₹)</span>
            </a>
            <a
              href="#collection"
              className="hover:text-[#9A7432] transition-colors relative py-1"
            >
              Red, Pink &amp; Blue Bottles
            </a>
            <a
              href="#celebrity-spotlight"
              className="hover:text-[#9A7432] transition-colors relative py-1"
            >
              Celebrity Allure
            </a>
            <a
              href="#occasion-collections"
              className="hover:text-[#9A7432] transition-colors relative py-1"
            >
              Occasions
            </a>
            <a
              href="#outfit-pairing"
              className="hover:text-[#9A7432] transition-colors relative py-1"
            >
              Outfit Pairings
            </a>
            <a
              href="#fragrance-notes"
              className="hover:text-[#9A7432] transition-colors relative py-1"
            >
              Notes Pyramid
            </a>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#4A3D31] hover:text-[#9A7432] transition-colors"
              aria-label="Search fragrances"
            >
              <Search className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenWishlist}
              className="relative p-2 text-[#4A3D31] hover:text-[#9A7432] transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#B34026]" />
              )}
            </button>

            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-3 py-2 text-xs uppercase tracking-widest font-medium text-[#1E1611] bg-[#F5ECE0] border border-[#DECDB8] hover:border-[#9A7432] transition-colors"
              aria-label={`Shopping bag with ${totalItems} items`}
            >
              <ShoppingBag className="w-4 h-4 text-[#8C6D46]" />
              <span className="font-mono text-xs tabular-nums text-[#1E1611] font-bold">
                {totalItems}
              </span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#2C241D]"
              aria-label="Toggle navigation menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className="w-full h-0.5 bg-[#2C241D]" />
                <span className="w-full h-0.5 bg-[#2C241D]" />
                <span className="w-full h-0.5 bg-[#2C241D]" />
              </div>
            </button>
          </div>
        </div>

        {/* Search Bar Drawer */}
        {searchOpen && (
          <div className="bg-[#F3ECE2] border-t border-[#E8DEC8] px-6 py-4 animate-in fade-in duration-200">
            <div className="max-w-2xl mx-auto flex items-center gap-3">
              <Search className="w-4 h-4 text-[#8C6D46]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search red bottle, pink bottle, royal blue bottle, 50ml, 100ml, festive hampers..."
                className="w-full bg-transparent border-none text-sm text-[#2C241D] placeholder:text-[#8C6D46]/70 focus:outline-hidden font-light"
                autoFocus
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="text-[#8C6D46] hover:text-[#2C241D]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF7F2] border-b border-[#E8DEC8] px-6 py-6 flex flex-col gap-4 text-xs uppercase tracking-widest text-[#4A3D31]">
            <a
              href="#festive-offers"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-[#B34026] font-bold"
            >
              Festive Deals in INR (₹)
            </a>
            <a
              href="#collection"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#9A7432]"
            >
              Red, Pink &amp; Blue Bottles
            </a>
            <a
              href="#celebrity-spotlight"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#9A7432]"
            >
              Celebrity Spotlight
            </a>
            <a
              href="#occasion-collections"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#9A7432]"
            >
              Occasion Collections
            </a>
            <a
              href="#outfit-pairing"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#9A7432]"
            >
              Celebrity Outfit Pairings
            </a>
            <a
              href="#fragrance-notes"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-[#9A7432]"
            >
              Fragrance Notes
            </a>
          </div>
        )}
      </header>
    </>
  );
};
