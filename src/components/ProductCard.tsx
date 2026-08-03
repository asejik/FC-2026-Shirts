'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { TShirtOption } from '@/data/products';

interface ProductCardProps {
  product: TShirtOption;
  onChooseOptions: (p: TShirtOption) => void;
  onSelectProduct: (p: TShirtOption) => void;
}

export default function ProductCard({
  product,
  onChooseOptions,
  onSelectProduct,
}: ProductCardProps) {
  const [view, setView] = useState<'front' | 'back'>('front');

  return (
    <article className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col group hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 h-full">
      {/* Image Area */}
      <div
        className="relative bg-gray-50 cursor-pointer overflow-hidden"
        style={{ paddingBottom: '100%' }}
        onClick={() => onSelectProduct(product)}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${product.name}`}
        onKeyDown={(e) => e.key === 'Enter' && onSelectProduct(product)}
      >
        <div className="absolute inset-0 p-4">
          <Image
            src={view === 'front' ? product.images.front : product.images.back}
            alt={`${product.name} — ${view} view`}
            fill
            className="object-contain transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </div>

        {/* View Toggle */}
        <div
          className="absolute bottom-2 left-2 z-10 flex rounded-md overflow-hidden border border-gray-200 bg-white/90 backdrop-blur-sm shadow-sm text-[10px] font-semibold"
          role="group"
          aria-label="View toggle"
        >
          {(['front', 'back'] as const).map((v) => (
            <button
              key={v}
              onClick={(e) => {
                e.stopPropagation();
                setView(v);
              }}
              aria-pressed={view === v}
              className={`px-2.5 py-1.5 capitalize transition-colors min-w-[44px] ${
                view === v
                  ? 'bg-[#c8102e] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="p-3.5 flex flex-col flex-1 gap-2">
        {/* Category Pill */}
        <span
          className={`self-start text-[10px] font-bold px-2 py-0.5 rounded-full ${
            product.category === 'Premium'
              ? 'bg-amber-50 text-amber-700'
              : 'bg-blue-50 text-blue-700'
          }`}
        >
          {product.category}
        </span>

        {/* Name */}
        <button
          onClick={() => onSelectProduct(product)}
          className="text-sm font-semibold text-gray-900 text-left hover:text-[#c8102e] transition-colors leading-snug line-clamp-2"
        >
          {product.name}
        </button>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto">
          <span className="text-base font-extrabold text-gray-900">
            {product.category === 'Premium' ? 'From ' : ''}₦{product.basePrice.toLocaleString()}
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={() => onChooseOptions(product)}
          className="mt-2 w-full h-10 text-sm font-semibold border-2 border-[#c8102e] text-[#c8102e] rounded-lg hover:bg-[#c8102e] hover:text-white active:scale-[0.98] transition-all"
        >
          Choose Options
        </button>
      </div>
    </article>
  );
}
