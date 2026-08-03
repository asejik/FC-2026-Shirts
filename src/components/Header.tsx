'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface HeaderProps {
  onOpenCart: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export default function Header({ onOpenCart, searchQuery, setSearchQuery }: HeaderProps) {
  const { totalItems } = useCart();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center gap-3 sm:gap-4">

          {/* ── Brand ────────────────────────────────── */}
          <div className="flex items-center gap-2.5 flex-shrink-0 select-none">
            <div className="w-8 h-8 rounded-md bg-[#c8102e] flex items-center justify-center shadow-sm">
              <span className="text-white font-black text-sm leading-none">FC</span>
            </div>
            <div className="hidden sm:block leading-none">
              <p className="font-extrabold text-gray-900 text-[15px] tracking-tight">FC2026</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-0.5">T-Shirt Showcase</p>
            </div>
          </div>

          {/* ── Search ───────────────────────────────── */}
          <div className="flex-1 min-w-0">
            <div className="relative">
              <input
                type="search"
                placeholder="Search by name or category…"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                aria-label="Search products"
                className="w-full h-9 rounded-lg border border-gray-300 bg-gray-50 pl-3 pr-9 text-sm text-gray-800 placeholder-gray-400
                           focus:outline-none focus:ring-2 focus:ring-[#c8102e]/25 focus:border-[#c8102e] transition"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* ── Cart ─────────────────────────────────── */}
          <button
            onClick={onOpenCart}
            aria-label={`Open cart, ${totalItems} item${totalItems !== 1 ? 's' : ''}`}
            className="relative flex items-center gap-2 h-9 px-3 rounded-lg border border-gray-200 bg-gray-50
                       hover:bg-gray-100 hover:border-gray-300 transition text-sm font-medium text-gray-700 flex-shrink-0"
          >
            <ShoppingBag size={18} className="text-gray-600" />
            <span className="hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] text-[10px] font-bold
                               bg-[#c8102e] text-white rounded-full flex items-center justify-center px-1 shadow-sm">
                {totalItems}
              </span>
            )}
          </button>

        </div>
      </div>
    </header>
  );
}
