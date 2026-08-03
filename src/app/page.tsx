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

export default function Home() {
  const [searchQuery,      setSearchQuery]      = useState('');
  const [isCartOpen,       setIsCartOpen]       = useState(false);
  const [isCheckoutOpen,   setIsCheckoutOpen]   = useState(false);
  const [variationProduct, setVariationProduct] = useState<TShirtOption | null>(null);
  const [detailProduct,    setDetailProduct]    = useState<TShirtOption | null>(null);

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
