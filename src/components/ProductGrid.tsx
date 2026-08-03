'use client';

import React, { useState, useMemo } from 'react';
import { products, TShirtOption, Category, TShirtSize } from '@/data/products';
import ProductCard from './ProductCard';
import SidebarFilter from './SidebarFilter';
import MobileFilterDrawer from './MobileFilterDrawer';
import { ArrowUpDown, SlidersHorizontal } from 'lucide-react';

interface ProductGridProps {
  searchQuery:     string;
  onChooseOptions: (p: TShirtOption) => void;
  onSelectProduct: (p: TShirtOption) => void;
}

type SortKey = 'relevance' | 'low-high' | 'high-low';

export default function ProductGrid({ searchQuery, onChooseOptions, onSelectProduct }: ProductGridProps) {
  const [category,   setCategory]   = useState<Category | 'All'>('All');
  const [sort,       setSort]       = useState<SortKey>('relevance');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    return products
      .filter(p => {
        const q = searchQuery.trim().toLowerCase();
        if (q && !p.name.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q)) return false;
        if (category !== 'All' && p.category !== category) return false;
        return true;
      })
      .sort((a, b) => {
        if (sort === 'low-high') return a.basePrice - b.basePrice;
        if (sort === 'high-low') return b.basePrice - a.basePrice;
        return 0;
      });
  }, [searchQuery, category, sort]);

  const filterProps = {
    category, setCategory,
    onReset: () => { setCategory('All'); },
  };

  const isDirty = category !== 'All';

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex gap-6 items-start">

        {/* Desktop Sidebar */}
        <SidebarFilter {...filterProps} />

        {/* Mobile Filter Drawer */}
        <MobileFilterDrawer
          {...filterProps}
          isOpen={mobileFiltersOpen}
          onClose={() => setMobileFiltersOpen(false)}
          resultCount={filtered.length}
        />

        {/* ── Main column ──────────────────────────── */}
        <div className="flex-1 min-w-0 space-y-5">

          {/* Toolbar */}
          <div className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-2 min-w-0">
              {/* Mobile filter toggle */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-1.5 h-8 px-3 rounded-lg border border-gray-200
                           text-xs font-semibold text-gray-700 hover:bg-gray-50 transition flex-shrink-0"
                aria-label="Open filters"
              >
                <SlidersHorizontal size={13} aria-hidden />
                Filters
                {isDirty && (
                  <span className="ml-1 w-4 h-4 rounded-full bg-[#c8102e] text-white text-[9px] font-bold flex items-center justify-center">
                    !
                  </span>
                )}
              </button>

              <p className="text-sm font-semibold text-gray-700 truncate">
                {category === 'All' ? 'All T-Shirts' : `${category} Collection`}
                <span className="ml-1.5 text-gray-400 font-normal text-xs">
                  ({filtered.length} result{filtered.length !== 1 ? 's' : ''})
                </span>
              </p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <ArrowUpDown size={13} className="text-gray-400" aria-hidden />
              <label htmlFor="sort-select" className="text-xs text-gray-500 hidden sm:inline">Sort:</label>
              <select
                id="sort-select"
                value={sort}
                onChange={e => setSort(e.target.value as SortKey)}
                className="border border-gray-200 rounded-lg px-2 py-1 text-xs font-semibold bg-gray-50
                           focus:outline-none focus:ring-2 focus:ring-[#c8102e]/25 focus:border-[#c8102e] cursor-pointer"
              >
                <option value="relevance">Relevance</option>
                <option value="low-high">Price: Low → High</option>
                <option value="high-low">Price: High → Low</option>
              </select>
            </div>
          </div>

          {/* Grid or empty state */}
          {filtered.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-16 text-center shadow-sm">
              <p className="text-gray-500 font-medium">No products match your filters.</p>
              <button
                onClick={filterProps.onReset}
                className="mt-4 text-sm text-[#c8102e] hover:underline font-semibold"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
              {filtered.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onChooseOptions={onChooseOptions}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
