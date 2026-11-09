'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import ProductGrid from '@/components/ProductGrid';
import VariationModal from '@/components/VariationModal';
import ProductDetailModal from '@/components/ProductDetailModal';
import CartPanel from '@/components/CartPanel';
import CheckoutModal from '@/components/CheckoutModal';
import Footer from '@/components/Footer';
import { TShirtOption } from '@/data/products';
import {
  ILORIN_DEADLINE_FORMATTED,
  subscribeToTime,
  getIlorinClosedSnapshot,
} from '@/data/deadlines';
import { Clock, MessageCircle, AlertTriangle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

export default function Home() {
  const { campus } = useParams() as { campus: string };
  const router = useRouter();
  const [searchQuery,      setSearchQuery]      = useState('');
  const [isCartOpen,       setIsCartOpen]       = useState(false);
  const [isCheckoutOpen,   setIsCheckoutOpen]   = useState(false);
  const [variationProduct, setVariationProduct] = useState<TShirtOption | null>(null);
  const [detailProduct,    setDetailProduct]    = useState<TShirtOption | null>(null);
  const [serverVerifiedClosed, setServerVerifiedClosed] = useState(false);

  // Sync external store for real-time client clock tracking without cascading renders
  const isClientClockClosed = useSyncExternalStore(
    subscribeToTime,
    getIlorinClosedSnapshot,
    getIlorinClosedSnapshot
  );

  const isIlorinClosed = campus === 'ilorin' && (isClientClockClosed || serverVerifiedClosed);

  useEffect(() => {
    if (campus !== 'ilorin') return;

    // Double check with server-side authoritative time (defeats local clock spoofing)
    fetch('/api/time', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data.ilorinClosed) {
          setServerVerifiedClosed(true);
        }
      })
      .catch(() => {
        // Fallback to client clock check if network offline
      });
  }, [campus]);

  if (campus === 'ogbomosho') {
    if (typeof window !== 'undefined') {
      window.location.replace('https://fc-ogbomosho.vercel.app/');
    }
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="text-center space-y-4 max-w-md">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 capitalize tracking-tight">
            Ogbomosho Campus
          </h1>
          <p className="text-lg text-gray-500">
            Redirecting to the Ogbomosho campus store...
          </p>
          <a 
            href="https://fc-ogbomosho.vercel.app/" 
            className="mt-6 inline-block px-6 py-3 bg-[#c8102e] hover:bg-[#a00d24] text-white rounded-xl font-bold transition-colors shadow-sm"
          >
            Go to Ogbomosho Store
          </a>
        </div>
      </div>
    );
  }

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

  // Ilorin campus: if registration is closed, show strictly the Closed screen
  if (isIlorinClosed) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
        <header className="bg-white border-b border-gray-200 py-4 px-6 flex items-center justify-between shadow-sm">
          <Link href="/" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition font-medium text-sm">
            <ArrowLeft size={18} />
            <span>Choose Another Campus</span>
          </Link>
          <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full">
            Registration Closed
          </span>
        </header>

        <div className="flex-1 flex items-center justify-center p-4 sm:p-6 my-8">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-200 text-center space-y-6 animate-fade-up">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-50 text-[#c8102e] mx-auto border-2 border-red-100 shadow-sm">
              <Clock size={40} />
            </div>

            <div className="space-y-2">
              <span className="inline-block px-3 py-1 bg-red-100 text-[#c8102e] text-xs font-bold uppercase tracking-wider rounded-full">
                Ilorin Campus
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Registration Closed
              </h1>
              <p className="text-gray-600 text-sm leading-relaxed pt-1">
                Registration and ordering for the <strong>Ilorin Campus</strong> closed on{' '}
                <span className="font-semibold text-gray-900">{ILORIN_DEADLINE_FORMATTED}</span>.
                No new orders are being accepted.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-4 text-left space-y-2.5">
              <p className="font-bold text-gray-900 text-xs sm:text-sm">
                Already submitted an order intent?
              </p>
              <p className="text-xs text-gray-600 leading-relaxed">
                If you placed an order before 8:00 AM WAT and need to verify payment or send your receipt, please message our coordinator directly on WhatsApp:
              </p>
              <a
                href="https://wa.me/2348132191839?text=Hello%2C%20I%20have%20an%20order%20for%20FC2026%20Ilorin%20Campus%20and%20would%20like%20to%20verify%20my%20payment."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-flex items-center justify-center gap-2 w-full py-3 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm rounded-xl transition shadow-sm"
              >
                <MessageCircle size={18} />
                <span>WhatsApp Coordinator (+234 813 219 1839)</span>
              </a>
            </div>

            <button
              onClick={() => router.push('/')}
              className="w-full py-3 px-4 bg-[#c8102e] hover:bg-[#a00d24] text-white rounded-xl font-bold text-sm transition-colors shadow-sm"
            >
              Choose Another Campus
            </button>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  // When registration is open: show store with warning banner of upcoming deadline
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      <Header
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Notice Banner */}
      <div className="bg-amber-500 text-amber-950 px-4 py-2 text-xs sm:text-sm font-semibold border-b border-amber-600/20">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center">
          <AlertTriangle size={16} className="flex-shrink-0" />
          <span>
            Notice: Registration for Ilorin Campus closes <strong>{ILORIN_DEADLINE_FORMATTED}</strong>. Complete your order before the deadline!
          </span>
        </div>
      </div>

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
