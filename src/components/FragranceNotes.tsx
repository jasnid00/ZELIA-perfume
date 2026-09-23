import React, { useState } from 'react';
import { Sparkles, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { FRAGRANCE_PYRAMID_NOTES, PERFUMES_DATA } from '../data/perfumes';
import { Perfume } from '../types';

interface FragranceNotesProps {
  onSelectPerfume: (perfume: Perfume) => void;
}

export const FragranceNotes: React.FC<FragranceNotesProps> = ({ onSelectPerfume }) => {
  const [activeTier, setActiveTier] = useState<'top' | 'heart' | 'base'>('heart');
  const [quizStep, setQuizStep] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<{
    mood?: string;
    vibe?: string;
    setting?: string;
  }>({});

  const tiers = [
    { id: 'top', label: 'Top Notes', subtitle: 'The First Spark (0–30m)', color: '#D4AF37' },
    { id: 'heart', label: 'Heart Notes', subtitle: 'The Soul & Body (30m–6h)', color: '#B38B4D' },
    { id: 'base', label: 'Base Notes', subtitle: 'The Lingering Memory (6–18h)', color: '#7A5B35' },
  ] as const;

  const currentNotes = FRAGRANCE_PYRAMID_NOTES[activeTier];

  // Simple, elegant scent quiz logic
  const handleQuizChoice = (key: 'mood' | 'vibe' | 'setting', value: string) => {
    const updated = { ...quizAnswers, [key]: value };
    setQuizAnswers(updated);
    if (quizStep < 2) {
      setQuizStep(quizStep + 1);
    } else {
      setQuizStep(3); // Result step
    }
  };

  const getRecommendedPerfume = (): Perfume => {
    if (quizAnswers.mood === 'Warm & Sensual') {
      return PERFUMES_DATA.find((p) => p.id === 'amber-solaris') || PERFUMES_DATA[0];
    }
    if (quizAnswers.mood === 'Romantic & Elegant') {
      return PERFUMES_DATA.find((p) => p.id === 'rose-celeste') || PERFUMES_DATA[1];
    }
    if (quizAnswers.mood === 'Mysterious & Deep') {
      return PERFUMES_DATA.find((p) => p.id === 'santal-nocturne') || PERFUMES_DATA[2];
    }
    if (quizAnswers.mood === 'Fresh & Radiant') {
      return PERFUMES_DATA.find((p) => p.id === 'soleil-d-oranger') || PERFUMES_DATA[4];
    }
    return PERFUMES_DATA[3]; // ZÉLIA L'Absolu
  };

  const recommendedPerfume = getRecommendedPerfume();

  return (
    <section id="fragrance-notes" className="py-20 md:py-28 bg-[#F5ECE0] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-xs uppercase tracking-[0.3em] text-[#8C6D46] font-medium">
            Olfactory Architecture
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E1611] font-light tracking-wide">
            The Anatomy of Scent
          </h2>
          <div className="w-12 h-px bg-[#C5A059] mx-auto my-3" />
          <p className="text-sm text-[#615143] font-light leading-relaxed">
            A truly memorable perfume does not reveal all its secrets at once. ZÉLIA compositions unfold in three distinct stages over the course of hours on warm skin.
          </p>
        </div>

        {/* Pyramid Exploration Module */}
        <div className="bg-[#FAF7F2] border border-[#DECDB8] p-6 sm:p-10 shadow-xs mb-16">
          {/* Tier Selector */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8">
            {tiers.map((tier) => (
              <button
                key={tier.id}
                onClick={() => setActiveTier(tier.id)}
                className={`py-4 px-3 sm:px-6 text-center border transition-all ${
                  activeTier === tier.id
                    ? 'border-[#9A7432] bg-[#FAF3E8] text-[#1E1611] shadow-xs'
                    : 'border-[#EADCC9] bg-transparent text-[#6B5A4B] hover:border-[#DECDB8]'
                }`}
              >
                <span className="block font-serif text-lg sm:text-2xl font-light">
                  {tier.label}
                </span>
                <span className="block text-[10px] sm:text-xs uppercase tracking-wider text-[#8C6D46] mt-1 font-mono">
                  {tier.subtitle}
                </span>
              </button>
            ))}
          </div>

          {/* Active Tier Notes Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentNotes.map((note, index) => (
              <div
                key={index}
                className="p-5 bg-[#F7F2EB] border border-[#E8DEC8] hover:border-[#C5A059] transition-colors"
              >
                <div className="flex items-center justify-between text-xs text-[#8C6D46] mb-2 font-mono">
                  <span>0{index + 1}</span>
                  <span>{note.duration}</span>
                </div>
                <h4 className="font-serif text-xl text-[#1E1611] font-normal mb-2">
                  {note.name}
                </h4>
                <p className="text-xs text-[#615143] font-light leading-relaxed">
                  {note.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Scent Finder Quiz Module */}
        <div className="bg-[#231A13] text-[#FAF7F2] p-8 sm:p-12 border border-[#3E2E21] relative overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C5A059] mb-3">
              <Compass className="w-4 h-4" />
              <span>Interactive Concierge</span>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-light tracking-wide text-[#F5ECE0] mb-3">
              Find Your Signature ZÉLIA Scent
            </h3>
            <p className="text-xs sm:text-sm text-[#D8C7B0] font-light mb-8 max-w-xl">
              Answer 3 brief questions to discover the bespoke formulation designed to linger harmoniously with your natural aura.
            </p>

            {/* Quiz Flow */}
            {quizStep === 0 && (
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-widest text-[#E8DCB8]">
                  Step 1 of 3: Which sensory mood best defines you?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Warm & Sensual', sub: 'Golden amber, sunlit mimosa, creamy vanilla' },
                    { label: 'Romantic & Elegant', sub: 'Dewy May rose, champagne pear, white musk' },
                    { label: 'Mysterious & Deep', sub: 'Smoky sandalwood, black cardamom, dark honey' },
                    { label: 'Fresh & Radiant', sub: 'Sparkling neroli, Italian clementine, green tea' },
                  ].map((option) => (
                    <button
                      key={option.label}
                      onClick={() => handleQuizChoice('mood', option.label)}
                      className="p-4 text-left border border-[#443325] bg-[#2C2118] hover:border-[#C5A059] hover:bg-[#36291E] transition-all"
                    >
                      <span className="block font-serif text-lg text-[#FAF7F2] font-normal">
                        {option.label}
                      </span>
                      <span className="block text-xs text-[#BAA792] font-light mt-0.5">
                        {option.sub}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {quizStep === 1 && (
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-widest text-[#E8DCB8]">
                  Step 2 of 3: When do you intend to wear this fragrance?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { label: 'Everyday Signature', sub: 'Intimate, effortless, skin-like' },
                    { label: 'Twilight & Galas', sub: 'Magnetic sillage, opulent presence' },
                    { label: 'All Occasions', sub: 'Versatile and captivating always' },
                  ].map((option) => (
                    <button
                      key={option.label}
                      onClick={() => handleQuizChoice('vibe', option.label)}
                      className="p-4 text-left border border-[#443325] bg-[#2C2118] hover:border-[#C5A059] hover:bg-[#36291E] transition-all"
                    >
                      <span className="block font-serif text-lg text-[#FAF7F2] font-normal">
                        {option.label}
                      </span>
                      <span className="block text-xs text-[#BAA792] font-light mt-0.5">
                        {option.sub}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {quizStep === 2 && (
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-widest text-[#E8DCB8]">
                  Step 3 of 3: Preferred fragrance intensity?
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { label: 'Enveloping & Enduring', sub: 'Pure Extrait (30%+) lasting all day & night' },
                    { label: 'Graceful & Subtle', sub: 'Luminous Eau de Parfum with close skin trail' },
                  ].map((option) => (
                    <button
                      key={option.label}
                      onClick={() => handleQuizChoice('setting', option.label)}
                      className="p-4 text-left border border-[#443325] bg-[#2C2118] hover:border-[#C5A059] hover:bg-[#36291E] transition-all"
                    >
                      <span className="block font-serif text-lg text-[#FAF7F2] font-normal">
                        {option.label}
                      </span>
                      <span className="block text-xs text-[#BAA792] font-light mt-0.5">
                        {option.sub}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {quizStep === 3 && (
              <div className="bg-[#2E231A] border border-[#523E2E] p-6 sm:p-8 animate-in fade-in duration-300">
                <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#C5A059] mb-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C5A059]" />
                  <span>Your Olfactory Match</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                  <div className="sm:col-span-4 aspect-4/3 overflow-hidden border border-[#523E2E]">
                    <img
                      src={recommendedPerfume.image}
                      alt={recommendedPerfume.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="sm:col-span-8 space-y-3">
                    <h4 className="font-serif text-2xl sm:text-3xl text-[#FAF7F2]">
                      {recommendedPerfume.name}
                    </h4>
                    <p className="text-xs text-[#C5A059] italic">{recommendedPerfume.tagline}</p>
                    <p className="text-xs text-[#D8C7B0] leading-relaxed font-light">
                      {recommendedPerfume.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <button
                        onClick={() => onSelectPerfume(recommendedPerfume)}
                        className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#C5A059] text-[#1E1611] text-xs uppercase tracking-widest font-semibold hover:bg-[#DFBF77] transition-colors"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          setQuizStep(0);
                          setQuizAnswers({});
                        }}
                        className="text-xs uppercase tracking-widest text-[#BAA792] hover:text-[#FAF7F2] underline py-2"
                      >
                        Retake Quiz
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
