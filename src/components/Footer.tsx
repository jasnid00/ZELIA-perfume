import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmail('');
    }, 4000);
  };

  return (
    <footer className="bg-[#1A130E] text-[#EDE4D4] border-t border-[#36271D]">
      {/* Newsletter Privilège Bar */}
      <div className="border-b border-[#2C1F17] py-14 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="text-[11px] uppercase tracking-[0.3em] text-[#C5A059]">
            Maison Cercle Privilège
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl text-[#FAF7F2] font-light tracking-wide">
            Receive Private Vintage Announcements
          </h3>
          <p className="text-xs sm:text-sm text-[#BFAEA0] font-light max-w-lg mx-auto leading-relaxed">
            Subscribers receive private access to limited harvest runs, invitations to seasonal olfactory previews, and 10% off their first commission.
          </p>

          <div className="pt-2 max-w-md mx-auto">
            {subscribed ? (
              <div className="p-3 bg-[#2A2018] border border-[#4B6B48]/40 text-[#A2C29F] text-xs flex items-center justify-center gap-2">
                <Check className="w-4 h-4" />
                <span>Bienvenue au Cercle ZÉLIA. Your welcome privilege has been dispatched.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-[#261C14] border border-[#443224] px-4 py-3 text-xs text-[#FAF7F2] placeholder:text-[#8C7665] focus:outline-hidden focus:border-[#C5A059] transition-colors"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#C5A059] text-[#1A130E] text-xs uppercase tracking-widest font-semibold hover:bg-[#DFBF77] transition-colors flex items-center gap-2"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <span className="font-serif text-3xl tracking-[0.25em] text-[#FAF7F2] block uppercase font-light">
              ZÉLIA
            </span>
            <p className="font-serif italic text-base text-[#D4AF37] font-normal">
              &ldquo;A scent that lingers long after you leave.&rdquo;
            </p>
            <p className="text-xs text-[#9E8B7C] font-light leading-relaxed max-w-sm">
              Haute parfumerie rooted in slow French traditions. Pure botanical extraits, hand-numbered flacons, and an unwavering devotion to timeless sillage.
            </p>
            <div className="pt-2 text-[11px] text-[#C5A059] flex items-center gap-3">
              <span>Grasse</span>
              <span aria-hidden="true">&bull;</span>
              <span>Paris</span>
              <span aria-hidden="true">&bull;</span>
              <span>Geneva</span>
              <span aria-hidden="true">&bull;</span>
              <span>New York</span>
            </div>
          </div>

          {/* Nav: The Collections */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#B5A496]">
              <li>
                <a href="#collection" className="hover:text-[#FAF7F2] transition-colors">
                  Pure Extraits de Parfum
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-[#FAF7F2] transition-colors">
                  Floral &amp; Solar Flacons
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-[#FAF7F2] transition-colors">
                  Amber &amp; Smoked Woods
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-[#FAF7F2] transition-colors">
                  Gourmand &amp; Aged Oud
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-[#FAF7F2] transition-colors">
                  Discovery Coffrets
                </a>
              </li>
            </ul>
          </div>

          {/* Nav: The Maison */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium">
              The Maison
            </h4>
            <ul className="space-y-2 text-xs text-[#B5A496]">
              <li>
                <a href="#our-story" className="hover:text-[#FAF7F2] transition-colors">
                  Our Grasse Atelier
                </a>
              </li>
              <li>
                <a href="#fragrance-notes" className="hover:text-[#FAF7F2] transition-colors">
                  Fragrance Pyramid Notes
                </a>
              </li>
              <li>
                <a href="#why-zelia" className="hover:text-[#FAF7F2] transition-colors">
                  90-Day Slow Maceration
                </a>
              </li>
              <li>
                <a href="#why-zelia" className="hover:text-[#FAF7F2] transition-colors">
                  Sustainable Flower Harvests
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#FAF7F2] transition-colors">
                  Client Reviews &amp; Testimonials
                </a>
              </li>
            </ul>
          </div>

          {/* Nav: Client Care & Concierge */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#C5A059] font-medium">
              Client Care
            </h4>
            <ul className="space-y-2 text-xs text-[#B5A496]">
              <li>
                <a href="#contact" className="hover:text-[#FAF7F2] transition-colors">
                  Private Consultations
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#FAF7F2] transition-colors">
                  Flacon Engraving Services
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#FAF7F2] transition-colors">
                  Complimentary Shipping &amp; Returns
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#FAF7F2] transition-colors">
                  Authenticity Verification
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#FAF7F2] transition-colors">
                  Atelier Boutiques
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-[#2C1F17] flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#7E6E60] gap-4">
          <div>
            &copy; {new Date().getFullYear()} ZÉLIA Parfums Haute Parfumerie. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#contact" className="hover:text-[#FAF7F2] transition-colors">
              Privacy Policy
            </a>
            <a href="#contact" className="hover:text-[#FAF7F2] transition-colors">
              Terms of Maison
            </a>
            <a href="#contact" className="hover:text-[#FAF7F2] transition-colors">
              IFRA Standards
            </a>
            <a href="#contact" className="hover:text-[#FAF7F2] transition-colors">
              Ethics &amp; Sustainability
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
