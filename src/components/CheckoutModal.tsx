'use client';

import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, ShieldCheck, Loader2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useMutation } from '@tanstack/react-query';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, totalPrice, totalItems, clearCart } = useCart();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  // Escape to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const mutation = useMutation({
    mutationFn: async (payload: object) => {
      const url = process.env.NEXT_PUBLIC_GAS_URL;
      if (!url || url === 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL') {
        throw new Error(
          'GAS_URL not configured. Please set NEXT_PUBLIC_GAS_URL in .env.local'
        );
      }
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (json.status === 'error') throw new Error(json.message);
      return json;
    },
    onSuccess: clearCart,
  });

  if (!isOpen) return null;

  const validate = () => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = 'Full name is required.';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      e.email = 'A valid email is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const itemsString = items
    .map(
      (i) =>
        `* ${i.quantity}x ${i.product.name}\n- Type: ${i.tier.name}\n- Colour: ${i.color}\n- Size: ${i.size}\n- Price: ₦${(i.tier.price * i.quantity).toLocaleString()}`
    )
    .join('\n\n');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    mutation.mutate({ name, email, date, itemsString, totalItems, totalPrice });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Order intent form"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden />

      {/* Card */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl animate-fade-up overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-[#c8102e]" aria-hidden />
            <h2 className="font-bold text-gray-900 text-base">Order Intent</h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close order form"
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 p-6">
          {mutation.isSuccess ? (
            /* ── Success ──── */
            <div className="text-center space-y-4 py-4 animate-fade-up">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100">
                <CheckCircle size={32} className="text-emerald-600" />
              </div>
              <div>
                <h3 className="font-extrabold text-gray-900 text-lg">
                  Successfully Submitted!
                </h3>
                <p className="text-sm text-gray-500 mt-1.5 leading-relaxed">
                  A confirmation email has been sent to{' '}
                  <strong className="text-gray-800">{email}</strong> with your
                  payment details.
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 text-left text-sm space-y-2 text-gray-700">
                <p className="font-bold text-gray-900">Next Steps</p>
                <p>
                  1. Transfer payment to <strong>Access Bank</strong>,<br />Account
                  No: <strong>1219660247</strong> (David Boluwatife Ipinyomi).
                </p>
                <p>
                  2. Send your payment receipt to WhatsApp:<br />
                  <strong className="text-[#c8102e] text-base">
                    +2348132191839
                  </strong>
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-full h-12 bg-[#c8102e] hover:bg-[#a00d24] text-white font-bold text-sm rounded-xl transition"
              >
                Done
              </button>
            </div>
          ) : (
            /* ── Form ──── */
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {/* Full name */}
              <div className="space-y-1">
                <label
                  htmlFor="co-name"
                  className="block text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Full Name
                </label>
                <input
                  id="co-name"
                  type="text"
                  required
                  autoComplete="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setErrors((p) => ({ ...p, name: undefined }));
                  }}
                  placeholder="Your full name"
                  aria-describedby={errors.name ? 'co-name-err' : undefined}
                  aria-invalid={!!errors.name}
                  className={`w-full h-10 px-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition ${
                    errors.name
                      ? 'border-red-400 focus:ring-red-200'
                      : 'border-gray-300 focus:ring-[#c8102e]/25 focus:border-[#c8102e]'
                  }`}
                />
                {errors.name && (
                  <p
                    id="co-name-err"
                    role="alert"
                    className="text-xs text-red-500 flex items-center gap-1"
                  >
                    <AlertCircle size={12} /> {errors.name}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label
                  htmlFor="co-email"
                  className="block text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Email Address
                </label>
                <input
                  id="co-email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((p) => ({ ...p, email: undefined }));
                  }}
                  placeholder="you@example.com"
                  aria-describedby={errors.email ? 'co-email-err' : undefined}
                  aria-invalid={!!errors.email}
                  className={`w-full h-10 px-3 border rounded-lg text-sm focus:outline-none focus:ring-2 transition ${
                    errors.email
                      ? 'border-red-400 focus:ring-red-200'
                      : 'border-gray-300 focus:ring-[#c8102e]/25 focus:border-[#c8102e]'
                  }`}
                />
                {errors.email && (
                  <p
                    id="co-email-err"
                    role="alert"
                    className="text-xs text-red-500 flex items-center gap-1"
                  >
                    <AlertCircle size={12} /> {errors.email}
                  </p>
                )}
              </div>

              {/* Date */}
              <div className="space-y-1">
                <label
                  htmlFor="co-date"
                  className="block text-xs font-bold text-gray-600 uppercase tracking-wider"
                >
                  Date
                </label>
                <input
                  id="co-date"
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full h-10 px-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c8102e]/25 focus:border-[#c8102e] transition [color-scheme:light]"
                />
              </div>

              {/* Order summary */}
              <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Selected items</span>
                  <span className="font-semibold text-gray-700">
                    {totalItems} unit{totalItems !== 1 ? 's' : ''}
                  </span>
                </div>
                <div className="whitespace-pre-line text-[11px] text-gray-600 font-mono bg-white rounded-lg p-2 border border-gray-200 max-h-24 overflow-y-auto leading-relaxed">
                  {itemsString || 'No items selected.'}
                </div>
                <div className="flex justify-between items-center text-sm font-extrabold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span className="text-[#c8102e] text-base">
                    ₦{totalPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Submission error */}
              {mutation.isError && (
                <div
                  role="alert"
                  className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-xs font-medium animate-fade-up"
                >
                  <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
                  <span>
                    {(mutation.error as Error)?.message ??
                      'Submission failed. Please try again.'}
                  </span>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={mutation.isPending || items.length === 0}
                className="w-full h-12 bg-[#c8102e] hover:bg-[#a00d24] disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                {mutation.isPending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Submitting…
                  </>
                ) : (
                  'Submit & Receive Payment Details'
                )}
              </button>

              <p className="text-[10px] text-gray-400 text-center leading-relaxed">
                By submitting, you consent to your name and email being used to
                process your order intent and receive payment details.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
