import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { HERO_SLIDES } from '../data/perfumes';

interface SlideshowHeroProps {
  onShopNow: () => void;
  onExploreCelebrity: () => void;
  onExploreFestive: () => void;
}

export const SlideshowHero: React.FC<SlideshowHeroProps> = ({
  onShopNow,
  onExploreCelebrity,
  onExploreFestive,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const slide = HERO_SLIDES[currentSlide];

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handlePrimaryClick = () => {
    if (currentSlide === 0) onExploreFestive();
    else if (currentSlide === 1) onExploreCelebrity();
    else onShopNow();
  };

  const handleSecondaryClick = () => {
    if (currentSlide === 0) onExploreFestive();
    else if (currentSlide === 1) onExploreCelebrity();
    else onShopNow();
  };

  return (
    <div
      className="relative overflow-hidden bg-[#1E1611] text-[#FAF7F2] select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides Viewport */}
      <div className="relative min-h-[560px] md:min-h-[660px] flex items-center">
        {/* Slide Background Image with cinematic transition */}
        <div className="absolute inset-0">
          <img
            key={slide.id}
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center animate-in fade-in duration-700"
            referrerPolicy="no-referrer"
          />
          {/* Gradients: Left dark scrim for readability, bottom subtle shadow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#140D08]/95 via-[#1A110B]/80 to-[#140D08]/30 md:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#140D08] via-transparent to-black/20" />
        </div>

        {/* Content Container */}
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24 z-10 w-full">
          <div className="max-w-2xl space-y-6">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#C5A059]/20 border border-[#C5A059]/50 backdrop-blur-xs text-[#FAF7F2] text-xs uppercase tracking-[0.25em] font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>{slide.badge}</span>
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-3">
              <span className="font-serif text-5xl sm:text-6xl md:text-7xl font-light tracking-[0.12em] uppercase leading-none block text-[#FAF7F2]">
                ZÉLIA
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl text-[#E8DCB8] font-light leading-tight">
                {slide.title}
              </h2>
              <p className="font-serif italic text-lg sm:text-2xl text-[#D8C7B0] font-normal leading-snug">
                {slide.tagline}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-[#D1C3B2] font-light leading-relaxed max-w-xl">
              {slide.subtitle}
            </p>

            {/* Discount Flash Bar */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#B34026] text-white text-xs font-mono font-semibold tracking-wider uppercase shadow-xs">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>{slide.discountText}</span>
              <span className="text-[10px] opacity-80">· Use Code: FESTIVE20</span>
            </div>

            {/* Action Buttons: Buy Now & Explore */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={handlePrimaryClick}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#C5A059] text-[#1E1611] text-xs uppercase tracking-[0.25em] font-bold hover:bg-[#DFBF77] transition-colors shadow-lg"
              >
                <span>{slide.buttonText}</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleSecondaryClick}
                className="inline-flex items-center justify-center px-8 py-4 bg-black/40 border border-[#C5A059]/60 text-[#FAF7F2] text-xs uppercase tracking-[0.25em] font-medium hover:bg-black/60 transition-colors backdrop-blur-xs"
              >
                {slide.secondaryButtonText}
              </button>
            </div>

            {/* Millilitre Quick Trust Marker */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-[11px] text-[#C5A059] uppercase tracking-wider font-mono">
              <span>Available in: 30 ml · 50 ml · 100 ml · 200 ml</span>
              <span aria-hidden="true">·</span>
              <span>100% Authentic Grasse Fragrances</span>
            </div>
          </div>
        </div>

        {/* Carousel Controls: Arrows */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/40 border border-[#DECDB8]/30 text-white hover:bg-black/70 hover:border-[#C5A059] transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-black/40 border border-[#DECDB8]/30 text-white hover:bg-black/70 hover:border-[#C5A059] transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide Indicators / Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 transition-all duration-300 ${
                currentSlide === idx
                  ? 'w-8 bg-[#C5A059]'
                  : 'w-2 bg-[#FAF7F2]/40 hover:bg-[#FAF7F2]/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
