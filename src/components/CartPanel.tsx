'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface CartPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCheckout: () => void;
}

export default function CartPanel({
  isOpen,
  onClose,
  onOpenCheckout,
}: CartPanelProps) {
  const { items, updateQuantity, removeFromCart, clearCart, totalPrice, totalItems } =
    useCart();

  // Escape to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Your selection cart"
      className="fixed inset-0 z-50 overflow-hidden"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden />

      {/* Drawer */}
      <div className="absolute inset-y-0 right-0 flex flex-col w-full max-w-sm bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={18} className="text-[#c8102e]" aria-hidden />
            <h2 className="font-bold text-gray-900 text-base">
              Your Selection
              <span className="ml-1.5 text-xs font-normal text-gray-400">
                ({totalItems} item{totalItems !== 1 ? 's' : ''})
              </span>
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-gray-400 py-16">
              <ShoppingBag size={48} className="opacity-20" aria-hidden />
              <p className="text-sm font-medium">Your cart is empty.</p>
              <button
                onClick={onClose}
                className="text-sm text-[#c8102e] font-semibold hover:underline"
              >
                Browse T-Shirts
              </button>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 bg-white rounded-lg border border-gray-200 flex-shrink-0 overflow-hidden">
                    <Image
                      src={item.product.images.front}
                      alt={item.product.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div className="flex justify-between items-start gap-1.5">
                      <p className="text-xs font-semibold text-gray-900 leading-tight line-clamp-2">
                        {item.product.name}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Remove ${item.product.name} from cart`}
                        className="text-gray-300 hover:text-red-500 transition-colors flex-shrink-0 p-0.5"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>

                    <p className="text-[11px] text-[#c8102e] font-semibold mt-0.5">
                      {item.tier.name}
                    </p>
                    <p className="text-[10px] text-gray-500">
                      Colour: {item.color} · Size: {item.size}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-extrabold text-gray-900">
                        ₦{(item.tier.price * item.quantity).toLocaleString()}
                      </span>

                      {/* Stepper */}
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-gray-900 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear cart */}
              <button
                onClick={clearCart}
                className="w-full text-center text-xs text-gray-400 hover:text-red-500 transition-colors py-1 font-medium"
              >
                Clear all items
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 p-4 space-y-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600 font-medium">
                Total ({totalItems} unit{totalItems !== 1 ? 's' : ''})
              </span>
              <span className="text-lg font-extrabold text-gray-900">
                ₦{totalPrice.toLocaleString()}
              </span>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenCheckout();
              }}
              className="w-full h-12 bg-[#c8102e] hover:bg-[#a00d24] text-white font-bold text-sm rounded-xl transition-colors shadow-sm"
            >
              Proceed to Order Intent
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
