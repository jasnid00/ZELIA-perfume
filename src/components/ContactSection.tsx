import React, { useState } from 'react';
import { Mail, MapPin, Phone, Clock, CheckCircle2, Send } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    consultationType: 'Fragrance Recommendation',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({
        name: '',
        email: '',
        consultationType: 'Fragrance Recommendation',
        message: '',
      });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#F7F2EB] border-b border-[#E8DEC8]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-xs uppercase tracking-[0.3em] text-[#8C6D46] font-medium">
            Personal Concierge &amp; Atelier
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1E1611] font-light tracking-wide">
            Contact ZÉLIA
          </h2>
          <div className="w-12 h-px bg-[#C5A059] mx-auto my-3" />
          <p className="text-sm text-[#615143] font-light leading-relaxed">
            Whether inquiring about bespoke bridal formulations, flacon engraving, or scheduling a private olfactory consultation, our concierge team welcomes your correspondence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Atelier Details Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-[#FAF7F2] p-8 border border-[#E5DAC8] space-y-6">
              <h3 className="font-serif text-2xl text-[#1E1611] font-normal">
                Boutique &amp; Flagship Atelier
              </h3>

              <div className="space-y-4 text-xs text-[#5C4D3F]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#8C6D46] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#1E1611] block">Paris Flagship</span>
                    <span>18 Rue du Faubourg Saint-Honoré, 75008 Paris, France</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#8C6D46] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#1E1611] block">Grasse Laboratory</span>
                    <span>Route des Parfums, 06130 Grasse, Côte d&apos;Azur</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#8C6D46] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#1E1611] block">Direct Concierge</span>
                    <span className="font-mono">+33 (0)1 42 68 89 20</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#8C6D46] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#1E1611] block">Client Relations</span>
                    <span>concierge@zelia-parfums.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#8C6D46] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-[#1E1611] block">Atelier Hours</span>
                    <span>Monday &ndash; Saturday: 10:00 &ndash; 19:30 CET</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EDE4D4] text-[11px] text-[#8C6D46]">
                Guaranteed reply within 12 hours for all digital consultations.
              </div>
            </div>

            {/* Private Consultation Banner */}
            <div className="bg-[#2B2017] text-[#FAF7F2] p-6 border border-[#3E2F23]">
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#C5A059] mb-1">
                Complimentary Service
              </div>
              <h4 className="font-serif text-xl mb-2">Virtual Scent Consultations</h4>
              <p className="text-xs text-[#D8C7B0] leading-relaxed font-light mb-4">
                Schedule a 20-minute video session with our in-house perfumer to diagnose your scent preferences and receive a tailored sample kit at your doorstep.
              </p>
              <a
                href="#contact"
                onClick={() =>
                  setFormState((prev) => ({
                    ...prev,
                    consultationType: 'Private Olfactory Consultation',
                  }))
                }
                className="inline-block text-xs uppercase tracking-widest text-[#E8DCB8] hover:text-white underline"
              >
                Request Consultation Below &rarr;
              </a>
            </div>
          </div>

          {/* Interactive Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF7F2] p-8 sm:p-10 border border-[#E5DAC8] shadow-xs">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1E1611] font-normal mb-2">
                Send an Inquiry
              </h3>
              <p className="text-xs text-[#6B5A4B] mb-8 font-light">
                Please leave your details below and our concierge will reach out promptly.
              </p>

              {submitted ? (
                <div className="py-16 text-center space-y-4 animate-in fade-in duration-300">
                  <CheckCircle2 className="w-12 h-12 text-[#4B6B48] mx-auto" />
                  <h4 className="font-serif text-3xl text-[#1E1611]">Inquiry Received</h4>
                  <p className="text-xs text-[#615143] max-w-md mx-auto leading-relaxed">
                    Merci {formState.name || 'cher client'}. Our perfume house concierge has received your request and will contact you via {formState.email || 'email'} within 12 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block uppercase tracking-wider text-[#6B5A4B] mb-1.5 font-medium">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Madame / Monsieur..."
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        className="w-full bg-[#F3ECE2] border border-[#DFCDB6] p-3 text-[#1E1611] focus:outline-hidden focus:border-[#8C6D46] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block uppercase tracking-wider text-[#6B5A4B] mb-1.5 font-medium">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="you@domain.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full bg-[#F3ECE2] border border-[#DFCDB6] p-3 text-[#1E1611] focus:outline-hidden focus:border-[#8C6D46] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[#6B5A4B] mb-1.5 font-medium">
                      Nature of Inquiry
                    </label>
                    <select
                      value={formState.consultationType}
                      onChange={(e) =>
                        setFormState({ ...formState, consultationType: e.target.value })
                      }
                      className="w-full bg-[#F3ECE2] border border-[#DFCDB6] p-3 text-[#1E1611] focus:outline-hidden focus:border-[#8C6D46] transition-colors"
                    >
                      <option value="Fragrance Recommendation">Fragrance Recommendation</option>
                      <option value="Private Olfactory Consultation">Private Olfactory Consultation</option>
                      <option value="Bespoke & Bridal Commission">Bespoke &amp; Bridal Commission</option>
                      <option value="Order & Flacon Engraving Assistance">Order &amp; Flacon Engraving Assistance</option>
                      <option value="Press & Wholesale Partnership">Press &amp; Wholesale Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block uppercase tracking-wider text-[#6B5A4B] mb-1.5 font-medium">
                      Your Message *
                    </label>
                    <textarea
                      rows={5}
                      required
                      placeholder="Tell us what you are looking for, your favorite scent notes, or your preferred appointment timing..."
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full bg-[#F3ECE2] border border-[#DFCDB6] p-3 text-[#1E1611] focus:outline-hidden focus:border-[#8C6D46] transition-colors"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-[#8C6D46]">
                      We respect your privacy. No marketing spam.
                    </span>
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#1E1611] text-[#FAF7F2] uppercase tracking-[0.2em] font-medium hover:bg-[#3D2C20] transition-colors shadow-xs"
                    >
                      <span>Send Message</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
