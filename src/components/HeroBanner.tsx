'use client';

import React from 'react';

export default function HeroBanner() {
  return (
    <section className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f172a] via-[#1a3050] to-[#c8102e] text-white">
          <div className="px-6 sm:px-10 lg:px-14 py-10 sm:py-14 relative z-10 max-w-2xl">
            <p className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-red-300 mb-3">
              FC2026 Member Collection
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-4">
              Choose Your<br />
              <span className="text-red-300">FC2026 T-Shirt</span>
            </h1>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-md">
              Browse our Premium and Standard round neck T-shirts, pick your
              size and colour, then submit your order — we'll send payment
              details straight to your email.
            </p>
          </div>

          {/* decorative circles */}
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/5 pointer-events-none" aria-hidden />
          <div className="absolute right-16 -bottom-16 w-56 h-56 rounded-full bg-white/5 pointer-events-none" aria-hidden />
          <div className="absolute right-48 top-8 w-24 h-24 rounded-full bg-white/5 pointer-events-none" aria-hidden />
        </div>
      </div>
    </section>
  );
}
