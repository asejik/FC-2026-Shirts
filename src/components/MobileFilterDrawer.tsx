'use client';

import React from 'react';
import { X, SlidersHorizontal } from 'lucide-react';
import { FilterPanel, FilterState } from './SidebarFilter';
import { Category } from '@/data/products';

interface MobileFilterDrawerProps extends FilterState {
  isOpen: boolean;
  onClose: () => void;
  setCategory: (v: Category | 'All') => void;
  onReset: () => void;
  resultCount: number;
}

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  resultCount,
  ...filterProps
}: MobileFilterDrawerProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden />

      {/* Sheet — slides in from left */}
      <div className="absolute inset-y-0 left-0 w-[300px] max-w-[85vw] bg-white shadow-2xl flex flex-col animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <span className="flex items-center gap-2 font-bold text-gray-900 text-base">
            <SlidersHorizontal size={18} className="text-[#c8102e]" aria-hidden /> Filters
          </span>
          <button
            onClick={onClose}
            aria-label="Close filters"
            className="p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Filter panel */}
        <div className="flex-1 overflow-y-auto p-5">
          <FilterPanel {...filterProps} />
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full h-11 bg-[#c8102e] hover:bg-[#a00d24] text-white font-bold text-sm rounded-xl transition"
          >
            Show {resultCount} result{resultCount !== 1 ? 's' : ''}
          </button>
        </div>
      </div>
    </div>
  );
}
