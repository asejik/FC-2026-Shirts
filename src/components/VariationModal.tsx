'use client';

import React, { useState, useEffect } from 'react';
import { X, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import { TShirtOption, TShirtSize, QualityTier } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface VariationModalProps {
  product: TShirtOption | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenCart: () => void;
}

export default function VariationModal({
  product,
  isOpen,
  onClose,
  onOpenCart,
}: VariationModalProps) {
  const { addToCart } = useCart();
  const [selectedTier, setSelectedTier] = useState<QualityTier | null>(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    if (product) {
      const defaultTier = product.qualityTiers[0] ?? null;
      setSelectedTier(defaultTier);
      setSelectedColor(product.colors[0]?.name ?? '');
      setQuantities({});
    }
  }, [product]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', onKey);
    }
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const activeTier = selectedTier || product.qualityTiers[0];
  const currentColorName = selectedColor || (product.colors.length > 0 ? product.colors[0].name : '');
  const currentColorObj = product.colors.find(c => c.name === currentColorName) || product.colors[0];
  const hasAny = Object.values(quantities).some((q) => q > 0);

  const adjustQty = (size: TShirtSize, delta: number) => {
    if (!activeTier) return;
    const key = `${activeTier.id}|${currentColorName}|${size}`;
    setQuantities((prev) => ({
      ...prev,
      [key]: Math.max(0, (prev[key] ?? 0) + delta),
    }));
  };

  const commit = () => {
    Object.entries(quantities).forEach(([key, qty]) => {
      if (qty > 0) {
        const [tierId, colorName, sizeName] = key.split('|');
        const tierObj = product.qualityTiers.find((t) => t.id === tierId);
        if (tierObj) {
          addToCart(product, tierObj, sizeName as TShirtSize, colorName, qty);
        }
      }
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Select variation for ${product.name}`}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden />

      {/* Sheet */}
      <div className="relative w-full sm:max-w-md bg-white rounded-t-2xl sm:rounded-2xl shadow-2xl animate-fade-up overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between px-5 pt-5 pb-4 border-b border-gray-100">
          <div className="flex gap-3 items-center">
            {currentColorObj && (
              <div className="relative w-10 h-10 rounded-md overflow-hidden bg-gray-50 border border-gray-200">
                <Image src={currentColorObj.imageFront} alt={currentColorName} fill className="object-cover" />
              </div>
            )}
            <div>
              <h2 className="font-bold text-gray-900 text-base">Select a variation</h2>
              <p className="text-xs text-gray-500 mt-0.5">{product.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-gray-400 hover:text-gray-700 p-1.5 rounded-full hover:bg-gray-100 transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Quality Tier selector */}
        {product.qualityTiers.length > 1 && (
          <div className="px-5 pt-3 pb-2 border-b border-gray-50 space-y-1.5">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Shirt Type / Quality
            </p>
            <div className="flex flex-col gap-1.5" role="group" aria-label="Select shirt type">
              {product.qualityTiers.map((tier) => (
                <button
                  key={tier.id}
                  onClick={() => setSelectedTier(tier)}
                  aria-pressed={activeTier?.id === tier.id}
                  className={`w-full px-3 py-2 text-xs font-semibold rounded-lg border transition-colors flex items-center justify-between ${
                    activeTier?.id === tier.id
                      ? 'bg-[#c8102e] text-white border-[#c8102e]'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-400'
                  }`}
                >
                  <span>{tier.name}</span>
                  <span className={activeTier?.id === tier.id ? 'text-white' : 'text-gray-900 font-bold'}>
                    ₦{tier.price.toLocaleString()}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Colour selector */}
        {product.colors.length > 0 && (
          <div className="px-5 pt-3 pb-2 border-b border-gray-50 space-y-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Colour</p>
            <div className="flex flex-wrap gap-3" role="group" aria-label="Select colour">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c.name)}
                  aria-pressed={currentColorName === c.name}
                  className="group flex flex-col items-center gap-1.5 focus:outline-none"
                >
                  <div className={`relative w-10 h-10 rounded-full overflow-hidden border-2 transition-all ${
                    currentColorName === c.name
                      ? 'border-[#c8102e] shadow-md scale-110'
                      : 'border-gray-200 opacity-70 group-hover:opacity-100 group-hover:border-gray-300'
                  }`}>
                    <Image src={c.imageFront} alt={c.name} fill className="object-cover" />
                  </div>
                  <span className={`text-[10px] font-bold ${
                    currentColorName === c.name ? 'text-gray-900' : 'text-gray-500 group-hover:text-gray-700'
                  }`}>
                    {c.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Size rows */}
        <div
          className="px-5 py-3 space-y-0.5 max-h-56 overflow-y-auto"
          role="group"
          aria-label="Select size and quantity"
        >
          {product.sizes.map((size) => {
            const qty = quantities[`${activeTier?.id}|${currentColorName}|${size}`] ?? 0;
            return (
              <div
                key={size}
                className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0"
              >
                <div>
                  <p className="text-xs font-semibold text-gray-800">
                    {activeTier?.name} ({currentColorName} / {size})
                  </p>
                  <p className="text-xs text-gray-500 font-medium">
                    ₦{activeTier?.price.toLocaleString()}
                  </p>
                </div>

                {/* Qty stepper */}
                <div className="flex items-center gap-2.5" aria-label={`Quantity for ${size}`}>
                  <button
                    onClick={() => adjustQty(size, -1)}
                    disabled={qty === 0}
                    aria-label={`Decrease quantity for ${size}`}
                    className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 transition-colors"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="w-5 text-center text-sm font-bold text-gray-900 tabular-nums">
                    {qty}
                  </span>
                  <button
                    onClick={() => adjustQty(size, +1)}
                    aria-label={`Increase quantity for ${size}`}
                    className="w-8 h-8 rounded-lg bg-[#c8102e] text-white flex items-center justify-center hover:bg-[#a00d24] transition-colors"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100 flex gap-3 bg-gray-50">
          <button
            onClick={() => {
              commit();
              onClose();
            }}
            className="flex-1 h-11 text-xs sm:text-sm font-semibold border-2 border-[#c8102e] text-[#c8102e] rounded-xl hover:bg-[#c8102e] hover:text-white transition-colors"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => {
              commit();
              onClose();
              onOpenCart();
            }}
            disabled={!hasAny}
            className="flex-1 h-11 text-xs sm:text-sm font-semibold bg-[#c8102e] text-white rounded-xl hover:bg-[#a00d24] disabled:opacity-40 transition-colors shadow-sm"
          >
            View Cart
          </button>
        </div>
      </div>
    </div>
  );
}
