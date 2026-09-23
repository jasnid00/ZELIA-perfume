import React, { useState } from 'react';
import { Star, CheckCircle, MessageSquarePlus, X } from 'lucide-react';
import { Review } from '../types';
import { REVIEWS_DATA, PERFUMES_DATA } from '../data/perfumes';

export const CustomerReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(REVIEWS_DATA);
  const [modalOpen, setModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({
    author: '',
    location: '',
    perfumeName: PERFUMES_DATA[0].name,
    rating: 5,
    title: '',
    comment: '',
  });
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.author || !newReview.comment || !newReview.title) return;

    const created: Review = {
      id: `rev-${Date.now()}`,
      author: newReview.author,
      location: newReview.location || 'Boutique Client',
      rating: newReview.rating,
      date: 'Today',
      perfumeName: newReview.perfumeName,
      title: newReview.title,
      comment: newReview.comment,
      verified: true,
    };

    setReviews([created, ...reviews]);
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setModalOpen(false);
      setNewReview({
        author: '',
        location: '',
        perfumeName: PERFUMES_DATA[0].name,
        rating: 5,
        title: '',
        comment: '',
      });
    }, 1500);
  };

  return (
    <section id="reviews" className="py-20 md:py-28 bg-[#FAF7F2] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-[0.3em] text-[#8C6D46] font-medium">
              Voices of Devotion
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E1611] font-light tracking-wide">
              Customer Reviews
            </h2>
            <div className="w-12 h-px bg-[#C5A059]" />
            <p className="text-sm text-[#615143] font-light max-w-lg">
              Read uncensored impressions from patrons across Mumbai, Delhi, Paris, and London who wear ZÉLIA as their personal olfactory signature.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="bg-[#F5ECE0] p-4 border border-[#DECDB8] flex items-center gap-4">
              <div>
                <span className="font-serif text-3xl font-normal text-[#1E1611]">4.95</span>
                <span className="text-xs text-[#8C6D46] block font-mono">out of 5.0</span>
              </div>
              <div className="space-y-1">
                <div className="flex text-[#C5A059]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-[11px] uppercase tracking-wider text-[#6B5A4B] block">
                  Based on 600+ Verified Orders
                </span>
              </div>
            </div>

            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-4 bg-[#1E1611] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-medium hover:bg-[#3D2C20] transition-colors"
            >
              <MessageSquarePlus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((rev) => (
            <article
              key={rev.id}
              className="bg-[#F6F0E6] p-8 border border-[#E5D7C3] flex flex-col justify-between space-y-4 hover:border-[#C5A059] transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#C5A059]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-[#8C6D46] font-mono">{rev.date}</span>
                </div>

                <div className="text-xs uppercase tracking-widest text-[#8C6D46] font-medium">
                  {rev.perfumeName}
                </div>

                <h3 className="font-serif text-xl text-[#1E1611] font-normal leading-snug">
                  &ldquo;{rev.title}&rdquo;
                </h3>

                <p className="text-xs sm:text-sm text-[#5C4D3F] font-light leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              {/* Attributable author with verified badge */}
              <div className="pt-4 border-t border-[#E0D1BC] flex items-center justify-between text-xs">
                <div>
                  <span className="font-medium text-[#1E1611] block">{rev.author}</span>
                  <span className="text-[#8C6D46] text-[11px]">{rev.location}</span>
                </div>
                {rev.verified && (
                  <div className="flex items-center gap-1 text-[#4A6741] text-[11px] font-medium">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Verified Purchase</span>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Write a Review Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#1E1611]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FAF7F2] border border-[#DECDB8] max-w-lg w-full p-8 shadow-xl relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-5 right-5 text-[#8C6D46] hover:text-[#1E1611]"
              aria-label="Close review modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-xs uppercase tracking-[0.25em] text-[#8C6D46] mb-1">
              Client Feedback
            </div>
            <h3 className="font-serif text-2xl text-[#1E1611] mb-6">
              Share Your Scent Experience
            </h3>

            {submittedMessage ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-[#4B6B48] mx-auto" />
                <h4 className="font-serif text-2xl text-[#1E1611]">Merci beaucoup.</h4>
                <p className="text-xs text-[#6B5A4B]">Your review has been verified and added to our journal.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block uppercase tracking-wider text-[#6B5A4B] mb-1 font-medium">
                    Fragrance
                  </label>
                  <select
                    value={newReview.perfumeName}
                    onChange={(e) => setNewReview({ ...newReview, perfumeName: e.target.value })}
                    className="w-full bg-[#F3ECE2] border border-[#DFCDB6] p-2.5 text-[#1E1611] focus:outline-hidden focus:border-[#8C6D46]"
                  >
                    {PERFUMES_DATA.map((p) => (
                      <option key={p.id} value={p.name}>
                        {p.name} ({p.subtitle})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block uppercase tracking-wider text-[#6B5A4B] mb-1 font-medium">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Adrienne Delacroix"
                      value={newReview.author}
                      onChange={(e) => setNewReview({ ...newReview, author: e.target.value })}
                      className="w-full bg-[#F3ECE2] border border-[#DFCDB6] p-2.5 text-[#1E1611] focus:outline-hidden focus:border-[#8C6D46]"
                    />
                  </div>
                  <div>
                    <label className="block uppercase tracking-wider text-[#6B5A4B] mb-1 font-medium">
                      City, Country
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Monaco, MC"
                      value={newReview.location}
                      onChange={(e) => setNewReview({ ...newReview, location: e.target.value })}
                      className="w-full bg-[#F3ECE2] border border-[#DFCDB6] p-2.5 text-[#1E1611] focus:outline-hidden focus:border-[#8C6D46]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#6B5A4B] mb-1 font-medium">
                    Rating (1 to 5 Stars)
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setNewReview({ ...newReview, rating: num })}
                        className={`p-2 border transition-colors ${
                          newReview.rating >= num
                            ? 'border-[#C5A059] bg-[#FAF3E8] text-[#C5A059]'
                            : 'border-[#DFCDB6] bg-transparent text-[#998675]'
                        }`}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#6B5A4B] mb-1 font-medium">
                    Headline / Summary
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. An intoxicating drydown that lasts until midnight"
                    value={newReview.title}
                    onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                    className="w-full bg-[#F3ECE2] border border-[#DFCDB6] p-2.5 text-[#1E1611] focus:outline-hidden focus:border-[#8C6D46]"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#6B5A4B] mb-1 font-medium">
                    Sensory Review
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe how the notes developed on your skin and the compliments you received..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full bg-[#F3ECE2] border border-[#DFCDB6] p-2.5 text-[#1E1611] focus:outline-hidden focus:border-[#8C6D46]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-5 py-2.5 border border-[#DFCDB6] text-[#6B5A4B] uppercase tracking-wider hover:bg-[#EAE0D2]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#1E1611] text-[#FAF7F2] uppercase tracking-wider font-medium hover:bg-[#3D2C20]"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
