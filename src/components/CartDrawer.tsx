import React, { useState } from 'react';
import type { CartItem } from '../types/store';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  ShieldCheck, 
  Truck, 
  Tag, 
  Check
} from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoApplied, setPromoApplied] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  if (!isOpen) return null;

  const rawSubtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const subtotal = rawSubtotal - discountAmount;
  const freeShippingThreshold = 180;
  const distanceToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'DENCLUB2025' || code === 'DENMEMBER15' || code === 'DENMEMBER') {
      setDiscountPercent(15);
      setPromoApplied(true);
    } else {
      alert('Invalid promo code. Try "DENCLUB2025" or "DENMEMBER15"!');
    }
  };

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    setTimeout(() => {
      onClearCart();
      setCheckoutSuccess(false);
      onClose();
      alert('🎉 Order placed successfully! Your DENCLUB authenticity certificate and tracking details have been generated.');
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in">
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity" 
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-zinc-200 text-black shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-zinc-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="size-5 text-[#84cc16]" />
              <h3 className="text-lg font-black uppercase tracking-tight" style={{ fontFamily: 'Syne, sans-serif' }}>
                YOUR VAULT BAG ({items.reduce((s, i) => s + i.quantity, 0)})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-zinc-500 hover:text-black hover:bg-zinc-100 transition"
              aria-label="Close cart"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-6 py-3 bg-zinc-50 border-b border-zinc-200 text-xs">
            <div className="flex items-center justify-between text-zinc-700 mb-1.5 font-medium">
              <span className="flex items-center gap-1.5">
                <Truck className="size-3.5 text-[#65a30d]" />
                {distanceToFreeShipping > 0 ? (
                  <>Add <strong className="text-black">${distanceToFreeShipping.toFixed(0)}</strong> for Free Express Delivery</>
                ) : (
                  <strong className="text-emerald-700">✨ You unlocked Free Express Shipping!</strong>
                )}
              </span>
              <span className="font-mono text-zinc-500 font-bold">{progressPercent.toFixed(0)}%</span>
            </div>
            <div className="w-full h-2 bg-zinc-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#84cc16] transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="size-16 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center mx-auto text-zinc-400">
                  <ShoppingBag className="size-8" />
                </div>
                <h4 className="text-base font-bold text-black">Your bag is empty</h4>
                <p className="text-xs text-zinc-500 max-w-xs mx-auto">
                  Explore our featured 3D Sneaker Rack to pick your pair.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-full bg-[#ccff00] hover:bg-[#b8e600] text-black text-xs font-extrabold uppercase tracking-wider transition shadow-sm cursor-pointer"
                >
                  Explore Drops
                </button>
              </div>
            ) : (
              items.map((item, index) => (
                <div 
                  key={`${item.product.id}-${item.size}-${index}`}
                  className="flex gap-4 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 group"
                >
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    className="size-20 rounded-xl object-cover bg-white border border-zinc-200 shrink-0" 
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-sm font-bold text-black truncate">{item.product.name}</h4>
                        <button
                          onClick={() => onRemoveItem(index)}
                          className="text-zinc-400 hover:text-red-500 transition p-0.5"
                          aria-label="Remove item"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                      <div className="text-xs text-zinc-500 mt-0.5 flex items-center gap-2 font-medium">
                        <span>Size: <strong className="text-black">US {item.size}</strong></span>
                        <span>•</span>
                        <span className="text-black font-bold font-mono">${item.product.price}</span>
                      </div>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-zinc-200">
                      <div className="flex items-center gap-2 bg-white border border-zinc-200 rounded-full px-2 py-0.5 shadow-xs">
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                          className="p-1 text-zinc-500 hover:text-black rounded-full hover:bg-zinc-100 transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="text-xs font-bold px-1.5">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                          className="p-1 text-zinc-500 hover:text-black rounded-full hover:bg-zinc-100 transition"
                          aria-label="Increase quantity"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <span className="text-sm font-black text-black font-mono">
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Box */}
          {items.length > 0 && (
            <div className="p-6 border-t border-zinc-200 bg-zinc-50 space-y-4">
              
              {/* Promo Code Input */}
              <form onSubmit={applyPromo} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="size-3.5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                  <input
                    type="text"
                    placeholder="Promo (DENCLUB2025)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="w-full bg-white border border-zinc-300 rounded-full pl-9 pr-3 py-2 text-xs text-black placeholder-zinc-400 focus:outline-none focus:border-[#84cc16] uppercase font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white hover:bg-zinc-800 text-xs font-bold uppercase rounded-full transition"
                >
                  Apply
                </button>
              </form>

              {promoApplied && (
                <div className="flex items-center justify-between text-xs text-emerald-800 bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-200 font-bold">
                  <span className="flex items-center gap-1">
                    <Check className="size-3.5" />
                    Promo applied (15% OFF)
                  </span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              {/* Subtotal Breakup */}
              <div className="space-y-1.5 text-xs text-zinc-600 font-medium">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-black font-mono font-bold">${rawSubtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Member Discount</span>
                    <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-black font-bold">
                    {distanceToFreeShipping === 0 ? 'FREE EXPRESS' : '$15.00'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-black pt-2 border-t border-zinc-200">
                  <span>Total</span>
                  <span className="font-mono text-lg">
                    ${(subtotal + (distanceToFreeShipping === 0 ? 0 : 15)).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={checkoutSuccess}
                className="w-full py-4 rounded-full bg-[#ccff00] hover:bg-[#b8e600] active:scale-[0.99] font-black text-sm uppercase tracking-wider text-black transition shadow-lg shadow-lime-300/40 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                {checkoutSuccess ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <span>Proceed to Fast Checkout</span>
                    <ArrowRight className="size-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500 font-medium">
                <ShieldCheck className="size-3.5 text-[#65a30d]" />
                <span>256-Bit Encrypted Secure Checkout • Apple Pay / Visa / Crypto</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
