'use client';

import React from 'react';
import { track } from '@vercel/analytics';
import { Phone, ArrowUpRight } from 'lucide-react';
import { BUSINESS_DATA } from '@/data/businessData';

export default function StickyMobileBar() {
  return (
    <div className="fixed bottom-0 inset-x-0 z-50 md:hidden bg-slate-950/95 border-t border-cyan-500/30 backdrop-blur-xl p-3 shadow-2xl shadow-black">
      <div className="flex items-center gap-2.5 max-w-md mx-auto">
        {/* Call Button (Primary CTA) */}
        <a
          href={`tel:${BUSINESS_DATA.phoneRaw}`}
          onClick={() => track('phone_click', { source: 'sticky_bar' })}
          className="flex-1 brand-gradient-btn hover:opacity-95 text-slate-950 font-black text-sm py-3 px-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-95 transition-transform"
        >
          <Phone className="w-4 h-4 fill-slate-950" />
          <span>Call (737) 299-7300</span>
        </a>

        {/* Get Quote (Secondary CTA) */}
        <a
          href="#quote-form"
          className="flex-1 bg-slate-900 hover:bg-slate-800 border border-cyan-500/40 text-white font-bold text-sm py-3 px-3 rounded-xl flex items-center justify-center gap-1.5 active:scale-95 transition-transform"
        >
          <span>Get Quote</span>
          <ArrowUpRight className="w-4 h-4 text-[#5DCCD3]" />
        </a>
      </div>
    </div>
  );
}
