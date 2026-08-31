'use client';

import React from 'react';
import { track } from '@vercel/analytics';
import { Phone, ShieldCheck, Star, Clock, Sparkles } from 'lucide-react';
import { BUSINESS_DATA } from '@/data/businessData';
import { Button } from '@/components/ui/button';
import Logo from '@/components/ui/Logo';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-200">
      {/* Top micro-announcement bar */}
      <div className="bg-gradient-to-r from-[#3DCB7D] via-[#5DCCD3] to-[#0376F4] text-slate-950 text-xs py-1.5 px-4 font-semibold tracking-wide shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-950 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-950"></span>
            </span>
            <span>Austin Metro Home Safety & Clean Air Services • Same-Day Dispatch Available</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-900 font-bold">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {BUSINESS_DATA.hours}
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Licensed & Insured
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="border-b border-slate-800/80 backdrop-blur-xl bg-[#080d19]/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo with Twin-Gabled Glyph */}
          <a href="#" className="flex items-center gap-3 group">
            <Logo variant="nav" />
            <div className="hidden lg:block border-l border-slate-800 pl-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#5DCCD3] bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                Austin, TX
              </span>
            </div>
          </a>

          {/* Social Proof & Contact Actions */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Google Rating Pill */}
            <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs shadow-inner">
              <div className="flex items-center gap-0.5 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400/80" />
              </div>
              <span className="font-bold text-white">{BUSINESS_DATA.rating}★</span>
              <span className="text-slate-400">({BUSINESS_DATA.reviewsCount} Google reviews)</span>
            </div>

            {/* Direct Phone Dispatch Button */}
            <a
              href={`tel:${BUSINESS_DATA.phoneRaw}`}
              onClick={() => track('phone_click', { source: 'header' })}
              className="flex items-center gap-2.5 px-3 sm:px-4 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/30 text-white transition-all shadow-sm group hover:border-cyan-400"
            >
              <div className="w-8 h-8 rounded-lg bg-cyan-500/15 flex items-center justify-center text-[#5DCCD3] group-hover:bg-[#5DCCD3] group-hover:text-slate-950 transition-colors">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-left">
                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Austin Dispatch
                </div>
                <div className="text-xs sm:text-sm font-black text-[#5DCCD3]">
                  {BUSINESS_DATA.phone}
                </div>
              </div>
            </a>

            {/* Fast Estimate CTA */}
            <a href="#quote-form" className="hidden sm:inline-flex">
              <Button className="brand-gradient-btn hover:opacity-95 text-slate-950 font-black px-5 py-2.5 rounded-xl shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02]">
                Get Free Estimate
              </Button>
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
