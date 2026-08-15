import React from 'react';
import Link from 'next/link';
import { MapPin } from 'lucide-react';

const CAMPUSES = [
  { id: 'ilorin', name: 'Ilorin' },
  { id: 'lagos', name: 'Lagos' },
  { id: 'ogbomosho', name: 'Ogbomosho' },
  { id: 'ibadan', name: 'Ibadan' },
  { id: 'abuja', name: 'Abuja' },
  { id: 'osogobo', name: 'Osogobo' },
  { id: 'uyo', name: 'Uyo' },
  { id: 'akure', name: 'Akure' },
];

export default function CampusSelector() {
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
          {CAMPUSES.map((campus) => (
            <Link
              key={campus.id}
              href={`/${campus.id}`}
              className="group relative bg-white rounded-2xl p-6 border-2 border-gray-200 hover:border-[#c8102e] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center gap-3 active:scale-[0.98]"
            >
              <div className="w-12 h-12 rounded-full bg-gray-50 group-hover:bg-red-50 flex items-center justify-center transition-colors">
                <MapPin size={24} className="text-gray-400 group-hover:text-[#c8102e] transition-colors" />
              </div>
              <span className="font-bold text-gray-900 text-lg group-hover:text-[#c8102e] transition-colors">
                {campus.name}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
