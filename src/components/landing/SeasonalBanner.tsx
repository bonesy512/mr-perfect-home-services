'use client';

import React, { useState } from 'react';
import { track } from '@vercel/analytics';
import { Flame, Phone, X, ShieldAlert, Sparkles } from 'lucide-react';
import { BUSINESS_DATA } from '@/data/businessData';

export default function SeasonalBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Seasonal Safety Announcement"
      className="relative z-50 bg-gradient-to-r from-slate-950 via-[#0a1224] to-slate-950 border-b border-cyan-500/30 text-white text-xs py-2 px-3 sm:px-6 shadow-md transition-all duration-300 animate-in fade-in"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: Seasonal Warning / Activity Metric */}
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="w-6 h-6 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0 animate-pulse">
            <Flame className="w-3.5 h-3.5 fill-amber-400" />
          </div>

          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-slate-200">
            <span className="font-bold text-white flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Austin Home Safety Alert:
            </span>
            <span className="text-slate-300 hidden sm:inline">
              92+ Central Texas homeowners scheduled chimney & air duct safety scans this week.
            </span>
            <span className="text-[#5DCCD3] font-semibold">
              Same-Day Emergency Dispatch Active
            </span>
          </div>
        </div>

        {/* Right: Instant Phone Call & Dismiss Button */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`tel:${BUSINESS_DATA.phoneRaw}`}
            onClick={() => track('phone_click', { source: 'seasonal_banner' })}
            className="inline-flex items-center gap-1.5 font-bold text-slate-950 bg-[#5DCCD3] hover:bg-cyan-300 px-3 py-1 rounded-lg text-[11px] shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            <Phone className="w-3 h-3" />
            <span className="hidden xs:inline">Call Dispatch:</span> {BUSINESS_DATA.phone}
          </a>

          <button
            type="button"
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss seasonal safety alert"
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
