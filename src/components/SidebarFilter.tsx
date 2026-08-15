'use client';

import React from 'react';
import { SlidersHorizontal, RotateCcw } from 'lucide-react';
import { Category } from '@/data/products';

export interface FilterState {
  category: Category | 'All';
}

interface SidebarFilterProps extends FilterState {
  setCategory: (v: Category | 'All') => void;
  onReset: () => void;
}

const CATEGORIES = [
  { id: 'All' as const, label: 'All T-Shirts' },
  { id: 'Premium 1' as const, label: 'Premium 1 Collection' },
  { id: 'Premium 2' as const, label: 'Premium 2 Collection' },
  { id: 'Standard' as const, label: 'Standard Collection' },
];

export function FilterPanel({
  category,
  setCategory,
  onReset,
}: SidebarFilterProps) {
  const isDirty = category !== 'All';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-bold text-gray-800 text-sm">
          <SlidersHorizontal size={15} className="text-[#c8102e]" aria-hidden />
          Filters
        </span>
        {isDirty && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-xs text-[#c8102e] hover:underline font-semibold"
            aria-label="Reset all filters"
          >
            <RotateCcw size={11} aria-hidden /> Reset
          </button>
        )}
      </div>

      <hr className="border-gray-100" />

      {/* Category */}
      <fieldset>
        <legend className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
          Category
        </legend>
        <div className="space-y-1">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              aria-pressed={category === c.id}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                category === c.id
                  ? 'bg-[#c8102e] text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

export default function SidebarFilter(props: SidebarFilterProps) {
  return (
    <aside className="hidden lg:block w-64 flex-shrink-0 bg-white rounded-2xl border border-gray-200 p-6 sticky top-24 self-start shadow-sm">
      <FilterPanel {...props} />
    </aside>
  );
}
