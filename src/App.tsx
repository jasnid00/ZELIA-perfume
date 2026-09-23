/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { SlideshowHero } from './components/SlideshowHero';
import { ColorfulCollectionsBar } from './components/ColorfulCollectionsBar';
import { CelebrityIntro } from './components/CelebrityIntro';
import { FestiveOffers } from './components/FestiveOffers';
import { FeaturedPerfumes } from './components/FeaturedPerfumes';
import { OccasionCollections } from './components/OccasionCollections';
import { CelebrityOutfitPairing } from './components/CelebrityOutfitPairing';
import { FragranceNotes } from './components/FragranceNotes';
import { OurStory } from './components/OurStory';
import { WhyChooseZelia } from './components/WhyChooseZelia';
import { CustomerReviews } from './components/CustomerReviews';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { PERFUMES_DATA } from './data/perfumes';
import { Perfume, CartItem } from './types';
import { Check } from 'lucide-react';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PERFUMES_DATA[0], // Rouge Impérial Red Bottle
      selectedSize: '50 ml Crimson Crystal Flacon',
      millilitres: 50,
      price: 4499,
      quantity: 1,
      engraving: 'ZÉLIA · 2026',
    },
  ]);
  const [wishlist, setWishlist] = useState<string[]>([PERFUMES_DATA[1].id]); // Bleu Saphir Blue Bottle
  const [cartOpen, setCartOpen] = useState(false);
  const [initialCheckoutState, setInitialCheckoutState] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [quickViewPerfume, setQuickViewPerfume] = useState<Perfume | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCart = (
    perfume: Perfume,
    size: string,
    price: number,
    ml?: number,
    engraving?: string
  ) => {
    const itemMl = ml || perfume.millilitres || 50;
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === perfume.id && item.selectedSize === size
      );
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex].quantity += 1;
        if (engraving) copy[existingIndex].engraving = engraving;
        return copy;
      }
      return [
        ...prev,
        {
          product: perfume,
          selectedSize: size,
          millilitres: itemMl,
          price,
          quantity: 1,
          engraving,
        },
      ];
    });
    showToast(`Added ${perfume.name} (${itemMl} ml · ₹${price.toLocaleString('en-IN')}) to your bag`);
  };

  // Immediate "Buy Now" flow: adds item to cart and opens cart directly in checkout mode!
  const handleBuyNow = (
    perfume: Perfume,
    size: string,
    price: number,
    ml?: number,
    engraving?: string
  ) => {
    handleAddToCart(perfume, size, price, ml, engraving);
    setInitialCheckoutState(true);
    setCartOpen(true);
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const copy = [...prev];
      copy[index].quantity = newQty;
      return copy;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleToggleWishlist = (perfumeId: string) => {
    setWishlist((prev) => {
      if (prev.includes(perfumeId)) {
        showToast('Removed from saved fragrances');
        return prev.filter((id) => id !== perfumeId);
      }
      showToast('Saved to your fragrance wishlist');
      return [...prev, perfumeId];
    });
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2C241D]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E1611] text-[#FAF7F2] border border-[#C5A059]/40 px-5 py-3 shadow-xl flex items-center gap-3 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <div className="w-5 h-5 rounded-full bg-[#C5A059] text-[#1E1611] flex items-center justify-center">
            <Check className="w-3 h-3 stroke-[3]" />
          </div>
          <span className="text-xs tracking-wider">{toastMessage}</span>
        </div>
      )}

      {/* Top Bar with Rotating Deals & Announcement */}
      <Navbar
        cartItems={cartItems}
        onOpenCart={() => {
          setInitialCheckoutState(false);
          setCartOpen(true);
        }}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => setWishlistOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Slideshow with Festive, Celebrity & Collection Banners */}
        <SlideshowHero
          onShopNow={() => scrollToSection('collection')}
          onExploreCelebrity={() => scrollToSection('celebrity-spotlight')}
          onExploreFestive={() => scrollToSection('festive-offers')}
        />

        {/* 2. Colorful Collections Bar (FridayCharm visual category bubbles) */}
        <ColorfulCollectionsBar
          activeCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            scrollToSection('collection');
          }}
        />

        {/* 3. Celebrity Intro: Hot Glamorous Celebrity Holding Perfume Photo */}
        <CelebrityIntro
          perfume={PERFUMES_DATA[1]} // Rose Céleste / Red Carpet pick
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onQuickView={(p) => setQuickViewPerfume(p)}
        />

        {/* 4. Festive Offers & Live Countdown Flash Deals */}
        <FestiveOffers
          perfumes={PERFUMES_DATA}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onQuickView={(p) => setQuickViewPerfume(p)}
        />

        {/* 5. Featured Perfumes Catalog (Mentioning Millilitres + Buy Now + Add to Cart) */}
        <FeaturedPerfumes
          perfumes={PERFUMES_DATA}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onQuickView={(p) => setQuickViewPerfume(p)}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* 6. Collections by Occasion: Seasonal, Gift Sets, Relationship, Mood & Energy */}
        <OccasionCollections
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onQuickView={(p) => setQuickViewPerfume(p)}
        />

        {/* 7. Celebrity Outfit & Fragrance Pairing Guide */}
        <CelebrityOutfitPairing
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onQuickView={(p) => setQuickViewPerfume(p)}
        />

        {/* 8. Fragrance Notes Pyramid & Interactive Olfactory Quiz */}
        <FragranceNotes
          onSelectPerfume={(perfume) => {
            setQuickViewPerfume(perfume);
          }}
        />

        {/* 9. Our Story & Grasse Atelier Heritage */}
        <OurStory />

        {/* 10. Why Choose ZÉLIA (4 Haute Pillars) */}
        <WhyChooseZelia />

        {/* 11. Customer Reviews with Verified Testimonials */}
        <CustomerReviews />

        {/* 12. Boutique Concierge & Contact Form */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-over Cart & Express Checkout Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => {
          setCartOpen(false);
          setInitialCheckoutState(false);
        }}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        initialCheckout={initialCheckoutState}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlistIds={wishlist}
        perfumes={PERFUMES_DATA}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(perfume, size, price) => {
          handleAddToCart(perfume, size, price);
          setWishlistOpen(false);
          setCartOpen(true);
        }}
      />

      {/* Quick View Modal with Millilitres and Dual Action Buttons */}
      <QuickViewModal
        perfume={quickViewPerfume}
        onClose={() => setQuickViewPerfume(null)}
        onAddToCart={(perfume, size, price, ml, engraving) => {
          handleAddToCart(perfume, size, price, ml, engraving);
        }}
        onBuyNow={(perfume, size, price, ml, engraving) => {
          handleBuyNow(perfume, size, price, ml, engraving);
        }}
      />
    </div>
  );
}
