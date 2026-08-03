'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Minus, Plus, Check } from 'lucide-react';
import { TShirtOption, TShirtSize, QualityTier } from '@/data/products';
import { useCart } from '@/context/CartContext';

interface ProductDetailModalProps {
  product: TShirtOption | null;
  isOpen: boolean;
  onClose: () => void;
  onOpenCart: () => void;
}

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onOpenCart,
}: ProductDetailModalProps) {
  const { addToCart } = useCart();

  const [view, setView] = useState<'front' | 'back'>('front');
  const [selectedTier, setSelectedTier] = useState<QualityTier | null>(null);
  const [color, setColor] = useState('');
  const [size, setSize] = useState<TShirtSize>('Medium');
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      const defaultTier = product.qualityTiers[0] ?? null;
      setSelectedTier(defaultTier);
      setColor(product.colors[0] ?? '');
      setSize(product.sizes[1] ?? product.sizes[0]);
      setQty(1);
      setView('front');
      setAdded(false);
    }
  }, [product]);

  // Escape to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen || !product) return null;

  const activeTier = selectedTier || product.qualityTiers[0];
  const currentColor = color || product.colors[0];

  const handleAdd = () => {
    if (!activeTier) return;
    addToCart(product, activeTier, size, currentColor, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const handleViewCart = () => {
    onClose();
    onOpenCart();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden />

      {/* Modal card */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl animate-fade-up overflow-hidden max-h-[90vh] flex flex-col">
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close product detail"
          className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white border border-gray-200 text-gray-500 hover:text-gray-900 shadow-sm transition"
        >
          <X size={16} />
        </button>

        {/* Scrollable body */}
        <div className="overflow-y-auto flex-1">
          <div className="flex flex-col sm:flex-row">
            {/* ── Left: Gallery ───────────────────── */}
            <div className="sm:w-[45%] flex-shrink-0 bg-gray-50 p-5 flex flex-col gap-3">
              {/* Main image */}
              <div className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 bg-white">
                <Image
                  src={view === 'front' ? product.images.front : product.images.back}
                  alt={`${product.name} ${view} view`}
                  fill
                  className="object-contain p-6"
                  sizes="(max-width: 640px) 100vw, 400px"
                  priority
                />
              </div>

              {/* Thumbnails */}
              <div className="flex gap-2 justify-center" role="group" aria-label="Image views">
                {(['front', 'back'] as const).map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    aria-pressed={view === v}
                    aria-label={`${v} view`}
                    className={`relative w-16 h-16 rounded-lg border-2 overflow-hidden bg-white transition-all ${
                      view === v
                        ? 'border-[#c8102e] shadow-sm scale-105'
                        : 'border-gray-200 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <Image
                      src={v === 'front' ? product.images.front : product.images.back}
                      alt={`${v} thumbnail`}
                      fill
                      className="object-contain p-1"
                    />
                    <span className="absolute bottom-0 inset-x-0 bg-black/50 text-white text-[8px] text-center capitalize font-bold py-0.5">
                      {v}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* ── Right: Details ──────────────────── */}
            <div className="flex-1 p-5 sm:p-6 space-y-5 overflow-y-auto">
              {/* Category + name */}
              <div>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    product.category === 'Premium'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-blue-50 text-blue-700'
                  }`}
                >
                  {product.category} Collection
                </span>
                <h2 className="mt-2 text-xl sm:text-2xl font-extrabold text-gray-900 leading-snug">
                  {product.name}
                </h2>
                <p className="text-xs text-gray-400 mt-1">Code: {product.code}</p>
              </div>

              {/* Price */}
              <div className="pb-4 border-b border-gray-100">
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                  ₦{activeTier?.price.toLocaleString()}
                </span>
              </div>

              {/* Quality Tier Selector */}
              {product.qualityTiers.length > 1 && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Fabric / Quality Tier:
                  </p>
                  <div className="flex flex-col gap-2" role="group" aria-label="Select shirt tier">
                    {product.qualityTiers.map((tier) => (
                      <button
                        key={tier.id}
                        onClick={() => setSelectedTier(tier)}
                        aria-pressed={activeTier?.id === tier.id}
                        className={`px-3 py-2 text-xs font-semibold rounded-lg border transition-colors flex items-center justify-between ${
                          activeTier?.id === tier.id
                            ? 'bg-[#c8102e] text-white border-[#c8102e]'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'
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

              {/* Colour */}
              {product.colors.length > 0 && (
                <div className="space-y-2">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Colour:{' '}
                    <span className="text-gray-800 font-semibold normal-case">
                      {currentColor}
                    </span>
                  </p>
                  <div className="flex flex-wrap gap-2" role="group" aria-label="Select colour">
                    {product.colors.map((c) => (
                      <button
                        key={c}
                        onClick={() => setColor(c)}
                        aria-pressed={currentColor === c}
                        className={`px-3 h-9 text-xs font-semibold rounded-lg border transition-colors ${
                          currentColor === c
                            ? 'bg-gray-900 text-white border-gray-900'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Size:{' '}
                  <span className="text-[#c8102e] font-semibold normal-case">{size}</span>
                </p>
                <div className="flex flex-wrap gap-2" role="group" aria-label="Select size">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSize(sz)}
                      aria-pressed={size === sz}
                      className={`min-w-[48px] h-10 px-3 text-xs font-bold rounded-lg border transition-colors ${
                        size === sz
                          ? 'bg-[#c8102e] text-white border-[#c8102e]'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-gray-500'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Qty */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Quantity
                </p>
                <div className="inline-flex items-center border border-gray-300 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="w-10 h-10 text-gray-600 hover:bg-gray-100 transition-colors flex items-center justify-center"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-10 text-center text-sm font-bold text-gray-900 tabular-nums">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="w-10 h-10 text-gray-600 hover:bg-gray-100 transition-colors flex items-center justify-center"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 sm:pt-2">
                <button
                  onClick={handleAdd}
                  aria-live="polite"
                  className={`flex-1 h-[60px] sm:h-12 text-base sm:text-sm font-bold rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                    added
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : 'border-[#c8102e] text-[#c8102e] hover:bg-[#c8102e] hover:text-white'
                  }`}
                >
                  {added ? (
                    <>
                      <Check size={16} aria-hidden /> Added!
                    </>
                  ) : (
                    'Add to Cart'
                  )}
                </button>
                <button
                  onClick={handleViewCart}
                  className="flex-1 h-[60px] sm:h-12 text-base sm:text-sm font-bold bg-[#c8102e] text-white rounded-xl hover:bg-[#a00d24] transition-colors shadow-sm"
                >
                  View Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
