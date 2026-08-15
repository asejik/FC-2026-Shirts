'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import ProductGrid from '@/components/ProductGrid';
import VariationModal from '@/components/VariationModal';
import ProductDetailModal from '@/components/ProductDetailModal';
import CartPanel from '@/components/CartPanel';
import CheckoutModal from '@/components/CheckoutModal';
import Footer from '@/components/Footer';
import { TShirtOption } from '@/data/products';

import { useParams, useRouter } from 'next/navigation';

export default function Home() {
  const { campus } = useParams() as { campus: string };
  const router = useRouter();
  const [searchQuery,      setSearchQuery]      = useState('');
  const [isCartOpen,       setIsCartOpen]       = useState(false);
  const [isCheckoutOpen,   setIsCheckoutOpen]   = useState(false);
  const [variationProduct, setVariationProduct] = useState<TShirtOption | null>(null);
  const [detailProduct,    setDetailProduct]    = useState<TShirtOption | null>(null);

  if (campus !== 'ilorin') {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 capitalize tracking-tight">
            {campus} Campus
          </h1>
          <p className="text-lg text-gray-500">
            Registration and ordering for this campus will be available soon. Please check back later!
          </p>
          <button 
            onClick={() => router.push('/')} 
            className="mt-6 px-6 py-3 bg-[#c8102e] hover:bg-[#a00d24] text-white rounded-xl font-bold transition-colors shadow-sm"
          >
            Choose Another Campus
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      <Header
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <HeroBanner />

      <main className="flex-grow">
        <ProductGrid
          searchQuery={searchQuery}
          onChooseOptions={p => setVariationProduct(p)}
          onSelectProduct={p => setDetailProduct(p)}
        />
      </main>

      <Footer />

      {/* ── Modals & Drawers ────────────────────────── */}
      <VariationModal
        product={variationProduct}
        isOpen={!!variationProduct}
        onClose={() => setVariationProduct(null)}
        onOpenCart={() => { setVariationProduct(null); setIsCartOpen(true); }}
      />

      <ProductDetailModal
        product={detailProduct}
        isOpen={!!detailProduct}
        onClose={() => setDetailProduct(null)}
        onOpenCart={() => { setDetailProduct(null); setIsCartOpen(true); }}
      />

      <CartPanel
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOpenCheckout={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

    </div>
  );
}
