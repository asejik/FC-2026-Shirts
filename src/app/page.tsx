'use client';

import React, { useState, useEffect, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { MapPin, Clock } from 'lucide-react';
import { subscribeToTime, getIlorinClosedSnapshot } from '@/data/deadlines';

interface CampusItem {
  id: string;
  name: string;
  url?: string;
  isActiveStore?: boolean;
}

const CAMPUSES: CampusItem[] = [
  { id: 'ilorin', name: 'Ilorin' },
  { id: 'lagos', name: 'Lagos' },
  { id: 'ogbomosho', name: 'Ogbomosho', url: 'https://fc-ogbomosho.vercel.app/', isActiveStore: true },
  { id: 'ibadan', name: 'Ibadan' },
  { id: 'abuja', name: 'Abuja' },
  { id: 'osogbo', name: 'Osogbo' },
  { id: 'uyo', name: 'Uyo' },
  { id: 'akure', name: 'Akure' },
];

export default function CampusSelector() {
  const [serverVerifiedClosed, setServerVerifiedClosed] = useState(false);

  const isClientClockClosed = useSyncExternalStore(
    subscribeToTime,
    getIlorinClosedSnapshot,
    getIlorinClosedSnapshot
  );

  const isIlorinClosed = isClientClockClosed || serverVerifiedClosed;

  useEffect(() => {
    // Verify against server-side authoritative time
    fetch('/api/time', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data.ilorinClosed) {
          setServerVerifiedClosed(true);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-8 animate-fade-up">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-2">
            <MapPin size={32} className="text-[#c8102e]" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
            Select Your Campus
          </h1>
          <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto">
            Choose your campus to view specific pricing, registration details, and to order your FC2026 T-Shirt.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 pt-4">
          {CAMPUSES.map((campus) => {
            const isIlorin = campus.id === 'ilorin';
            const closed = isIlorin && isIlorinClosed;

            if (closed) {
              return (
                <div
                  key={campus.id}
                  className="relative bg-gray-50 rounded-2xl p-6 border-2 border-gray-200 shadow-sm flex flex-col items-center justify-center gap-3 cursor-not-allowed opacity-85 select-none"
                  aria-disabled="true"
                >
                  <span className="absolute top-2.5 right-2.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-100 text-[#c8102e] border border-red-200">
                    Closed
                  </span>

                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-red-50 text-red-500">
                    <Clock size={22} />
                  </div>

                  <div className="text-center">
                    <span className="font-bold text-lg block text-gray-700">
                      {campus.name}
                    </span>
                    <span className="text-[11px] text-red-500 font-semibold block mt-0.5">
                      Registration Closed
                    </span>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={campus.id}
                href={campus.url || `/${campus.id}`}
                className="group relative bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-[#c8102e] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center gap-3 active:scale-[0.98]"
              >
                {/* Status Badges */}
                {isIlorin && (
                  <span className="absolute top-2.5 right-2.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Active
                  </span>
                )}
                {campus.isActiveStore && (
                  <span className="absolute top-2.5 right-2.5 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    Active
                  </span>
                )}

                <div className="w-12 h-12 rounded-full flex items-center justify-center transition-colors bg-gray-50 group-hover:bg-red-50 text-gray-400 group-hover:text-[#c8102e]">
                  <MapPin size={24} />
                </div>

                <div className="text-center">
                  <span className="font-bold text-lg block transition-colors text-gray-900 group-hover:text-[#c8102e]">
                    {campus.name}
                  </span>
                  {isIlorin && (
                    <span className="text-[11px] text-amber-600 font-semibold block mt-0.5">
                      Closes Mon 8 AM WAT
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
