import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, Sparkles, Check, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  initialCheckout?: boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  initialCheckout = false,
}) => {
  const [promoCode, setPromoCode] = useState('FESTIVE20');
  const [discountPercent, setDiscountPercent] = useState(20);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('Festive 20% Privilege active');
  const [giftWrap, setGiftWrap] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(initialCheckout);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Checkout form state in Indian context
  const [checkoutForm, setCheckoutForm] = useState({
    name: 'Ananya Sharma',
    phone: '+91 98201 45892',
    email: 'ananya.sharma@luxurymail.com',
    address: 'B-14, Sterling Penthouse, Bandra West',
    city: 'Mumbai',
    postalCode: '400050',
    state: 'Maharashtra',
    country: 'India',
    paymentMethod: 'upi_cod',
  });

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const freeShippingThreshold = 1999;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingCost = subtotal === 0 || isFreeShipping ? 0 : 149;
  const total = Math.max(0, subtotal - discountAmount + shippingCost);

  const applyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (code === 'FESTIVE20') {
      setDiscountPercent(20);
      setPromoSuccess('Festive 20% Privilege applied!');
      setPromoError('');
    } else if (code === 'ZELIA10') {
      setDiscountPercent(10);
      setPromoSuccess('10% Maison Welcome Privilege applied');
      setPromoError('');
    } else if (code === 'EXTRACT') {
      setDiscountPercent(15);
      setPromoSuccess('15% VIP Collector privilege applied');
      setPromoError('');
    } else {
      setPromoError('Invalid privilege code. Try "FESTIVE20"');
      setPromoSuccess('');
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `ZL-IN-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(generatedId);
    setOrderComplete(true);
    onClearCart();
  };

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
              <ShoppingBag className="w-4 h-4 text-[#8C6D46]" />
              <h2 className="font-serif text-xl text-[#1E1611] tracking-wide">
                {orderComplete
                  ? 'Order Confirmation'
                  : isCheckingOut
                  ? 'Express Checkout (All India)'
                  : 'Your Fragrance Bag'}
              </h2>
            </div>
            <button
              onClick={() => {
                if (orderComplete) {
                  setOrderComplete(false);
                  setIsCheckingOut(false);
                }
                onClose();
              }}
              className="p-1 text-[#6B5A4B] hover:text-[#1E1611]"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {orderComplete ? (
              /* Order Confirmation Screen */
              <div className="py-8 text-center space-y-5 animate-in fade-in duration-300">
                <div className="w-14 h-14 bg-[#4B6B48]/10 text-[#4B6B48] flex items-center justify-center mx-auto border border-[#4B6B48]/30">
                  <Check className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <div className="text-xs uppercase tracking-[0.25em] text-[#8C6D46]">
                    Commande Confirmée · India Dispatch
                  </div>
                  <h3 className="font-serif text-3xl text-[#1E1611]">
                    Dhanyavaad, {checkoutForm.name.split(' ')[0]}!
                  </h3>
                  <p className="font-mono text-xs text-[#8C6D46]">
                    Order Number: <strong className="text-[#1E1611]">{orderId}</strong>
                  </p>
                </div>

                <div className="p-4 bg-[#F5ECE0] border border-[#DECDB8] text-left text-xs space-y-2">
                  <p className="text-[#5C4D3F]">
                    Your flacons are now being carefully inspected, hand-boxed in our signature champagne presentation box with golden silk ribbons, and prepared for BlueDart / Delhivery express dispatch.
                  </p>
                  <p className="text-[#7D6B5A] text-[11px]">
                    SMS updates will be sent to <strong className="text-[#1E1611]">{checkoutForm.phone}</strong> and receipt to <strong className="text-[#1E1611]">{checkoutForm.email}</strong>.
                  </p>
                  <div className="pt-2 border-t border-[#DECDB8] flex items-center gap-1.5 text-[#4B6B48] font-medium text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Complimentary Discovery Samples Included</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setOrderComplete(false);
                    setIsCheckingOut(false);
                    onClose();
                  }}
                  className="w-full py-3.5 bg-[#1E1611] text-[#FAF7F2] text-xs uppercase tracking-widest font-medium hover:bg-[#3D2C20] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            ) : isCheckingOut ? (
              /* Checkout Form in Indian Rupees */
              <form onSubmit={handlePlaceOrder} className="space-y-4 text-xs">
                <div className="p-3 bg-[#F5ECE0] border border-[#DECDB8] flex items-center justify-between text-xs">
                  <span className="text-[#6B5A4B]">Total Due Today:</span>
                  <span className="font-mono font-bold text-lg text-[#1E1611]">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="space-y-3">
                  <h4 className="font-serif text-base text-[#1E1611] border-b border-[#E8DEC8] pb-1">
                    1. Delivery Details (All India Shipping)
                  </h4>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#6B5A4B] mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={checkoutForm.name}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, name: e.target.value })}
                      className="w-full bg-[#F3ECE2] border border-[#DFCDB6] p-2 text-[#1E1611]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#6B5A4B] mb-1">
                        Mobile Number (For Delivery SMS)
                      </label>
                      <input
                        type="tel"
                        required
                        value={checkoutForm.phone}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, phone: e.target.value })}
                        className="w-full bg-[#F3ECE2] border border-[#DFCDB6] p-2 text-[#1E1611]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#6B5A4B] mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        value={checkoutForm.email}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, email: e.target.value })}
                        className="w-full bg-[#F3ECE2] border border-[#DFCDB6] p-2 text-[#1E1611]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#6B5A4B] mb-1">
                      Flat / House No. &amp; Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={checkoutForm.address}
                      onChange={(e) => setCheckoutForm({ ...checkoutForm, address: e.target.value })}
                      className="w-full bg-[#F3ECE2] border border-[#DFCDB6] p-2 text-[#1E1611]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#6B5A4B] mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={checkoutForm.city}
                        onChange={(e) => setCheckoutForm({ ...checkoutForm, city: e.target.value })}
                        className="w-full bg-[#F3ECE2] border border-[#DFCDB6] p-2 text-[#1E1611]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-wider text-[#6B5A4B] mb-1">
                        PIN Code (6 Digits)
                      </label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={checkoutForm.postalCode}
                        onChange={(e) =>
                          setCheckoutForm({ ...checkoutForm, postalCode: e.target.value })
                        }
                        className="w-full bg-[#F3ECE2] border border-[#DFCDB6] p-2 text-[#1E1611]"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="font-serif text-base text-[#1E1611] border-b border-[#E8DEC8] pb-1">
                    2. Payment Method
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    <label
                      className={`p-2.5 border text-center cursor-pointer transition-colors ${
                        checkoutForm.paymentMethod === 'upi_cod'
                          ? 'border-[#8C6D46] bg-[#F5ECE0] text-[#1E1611]'
                          : 'border-[#DFCDB6] text-[#6B5A4B]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={checkoutForm.paymentMethod === 'upi_cod'}
                        onChange={() =>
                          setCheckoutForm({ ...checkoutForm, paymentMethod: 'upi_cod' })
                        }
                        className="sr-only"
                      />
                      <span className="block font-medium">UPI / GPay / Cards</span>
                      <span className="text-[10px] text-[#8C6D46]">Instant Payment</span>
                    </label>

                    <label
                      className={`p-2.5 border text-center cursor-pointer transition-colors ${
                        checkoutForm.paymentMethod === 'cod'
                          ? 'border-[#8C6D46] bg-[#F5ECE0] text-[#1E1611]'
                          : 'border-[#DFCDB6] text-[#6B5A4B]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        checked={checkoutForm.paymentMethod === 'cod'}
                        onChange={() => setCheckoutForm({ ...checkoutForm, paymentMethod: 'cod' })}
                        className="sr-only"
                      />
                      <span className="block font-medium">Cash on Delivery</span>
                      <span className="text-[10px] text-[#8C6D46]">Pay at Doorstep</span>
                    </label>
                  </div>
                </div>

                <div className="pt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCheckingOut(false)}
                    className="w-1/3 py-3 border border-[#DFCDB6] text-[#6B5A4B] uppercase tracking-wider text-[11px] hover:bg-[#EAE0D2]"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-3 bg-[#1E1611] text-[#FAF7F2] uppercase tracking-[0.2em] font-medium text-xs hover:bg-[#3D2C20] flex items-center justify-center gap-2 shadow-md"
                  >
                    <span>Confirm Order (₹{total.toLocaleString('en-IN')})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            ) : cartItems.length === 0 ? (
              /* Empty Cart State */
              <div className="py-20 text-center space-y-4">
                <ShoppingBag className="w-10 h-10 text-[#C5A059] mx-auto opacity-70" />
                <h3 className="font-serif text-2xl text-[#1E1611]">Your bag is empty</h3>
                <p className="text-xs text-[#6B5A4B] max-w-xs mx-auto">
                  Explore our Red, Pink, Royal Blue bottles and discover an extrait that lingers long after you leave.
                </p>
                <button
                  onClick={onClose}
                  className="inline-block px-6 py-3 bg-[#1E1611] text-[#FAF7F2] text-xs uppercase tracking-widest font-medium hover:bg-[#3D2C20]"
                >
                  Explore Bottles
                </button>
              </div>
            ) : (
              /* Itemized Cart List in INR */
              <>
                {/* Free Shipping Progress Meter in INR */}
                <div className="p-3 bg-[#F5ECE0] border border-[#DECDB8] space-y-1.5 text-xs">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#6B5A4B]">
                      {isFreeShipping
                        ? '🎉 You have qualified for Free Express Shipping Across India!'
                        : `Add ₹${(freeShippingThreshold - subtotal).toLocaleString('en-IN')} more for Free Express Shipping`}
                    </span>
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                  </div>
                  <div className="w-full h-1.5 bg-[#E4D7C5] overflow-hidden">
                    <div
                      className="h-full bg-[#8C6D46] transition-all duration-300"
                      style={{
                        width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Items */}
                <div className="space-y-4 divide-y divide-[#E8DEC8]">
                  {cartItems.map((item, index) => (
                    <div key={`${item.product.id}-${item.selectedSize}`} className="pt-4 first:pt-0 flex gap-4">
                      <div className="w-20 h-20 bg-[#ECE3D4] border border-[#DECDB8] overflow-hidden shrink-0 relative">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <span className="absolute bottom-0 inset-x-0 bg-black/70 text-white text-[9px] font-mono text-center">
                          {item.millilitres} ml
                        </span>
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-serif text-base text-[#1E1611] font-medium leading-snug">
                                {item.product.name}
                              </h4>
                              <p className="text-[11px] text-[#8C6D46] font-mono">
                                {item.selectedSize} ({item.millilitres} ml)
                              </p>
                            </div>
                            <button
                              onClick={() => onRemoveItem(index)}
                              className="text-[#998675] hover:text-[#B23B3B] p-1"
                              aria-label="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          {item.engraving && (
                            <p className="text-[10px] text-[#6B5A4B] italic">
                              Engraving: &ldquo;{item.engraving}&rdquo;
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2">
                          {/* Quantity Stepper */}
                          <div className="flex items-center border border-[#DECDB8] bg-[#F7F2EB]">
                            <button
                              onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                              className="p-1 text-[#6B5A4B] hover:text-[#1E1611]"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="font-mono text-xs px-2.5 py-0.5 tabular-nums text-[#1E1611]">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                              className="p-1 text-[#6B5A4B] hover:text-[#1E1611]"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Line total in INR (₹) */}
                          <span className="font-mono text-xs font-semibold tabular-nums text-[#1E1611]">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Gift Wrap Toggle */}
                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-[#5C4D3F]">
                    <input
                      type="checkbox"
                      checked={giftWrap}
                      onChange={(e) => setGiftWrap(e.target.checked)}
                      className="accent-[#8C6D46]"
                    />
                    <span>Complimentary signature gift boxing &amp; handwritten calligraphy note</span>
                  </label>
                </div>

                {/* Privilege Promo Code */}
                <div className="pt-2 border-t border-[#E8DEC8]">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Privilege Code (try FESTIVE20)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 bg-[#F3ECE2] border border-[#DFCDB6] p-2 text-xs text-[#1E1611] focus:outline-hidden"
                    />
                    <button
                      onClick={applyPromo}
                      className="px-4 py-2 bg-[#2C2016] text-[#FAF7F2] text-[11px] uppercase tracking-wider font-medium hover:bg-[#3D2C20]"
                    >
                      Apply
                    </button>
                  </div>
                  {promoSuccess && (
                    <p className="text-[11px] text-[#4B6B48] mt-1 font-medium">{promoSuccess}</p>
                  )}
                  {promoError && (
                    <p className="text-[11px] text-[#A63A3A] mt-1 font-medium">{promoError}</p>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer Totals & Checkout Button in INR */}
          {!orderComplete && cartItems.length > 0 && !isCheckingOut && (
            <div className="p-6 border-t border-[#E8DEC8] bg-[#F7F2EB] space-y-3">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#6B5A4B]">
                  <span>Subtotal</span>
                  <span className="font-mono tabular-nums text-[#1E1611]">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#4B6B48]">
                    <span>Festive Privilege ({discountPercent}%)</span>
                    <span className="font-mono tabular-nums">-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#6B5A4B]">
                  <span>Express Shipping (All India)</span>
                  <span className="font-mono tabular-nums text-[#1E1611]">
                    {shippingCost === 0 ? 'Complimentary' : `₹${shippingCost}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-[#DECDB8] flex justify-between font-medium text-sm text-[#1E1611]">
                  <span>Total Due</span>
                  <span className="font-mono text-base font-bold tabular-nums">
                    ₹{total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsCheckingOut(true)}
                className="w-full py-4 bg-[#1E1611] text-[#FAF7F2] text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#3D2C20] transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="text-center text-[10px] uppercase tracking-wider text-[#8C6D46]">
                Cash on Delivery (COD) &bull; Free 30-Day Bottle Returns
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
