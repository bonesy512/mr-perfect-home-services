'use client';

import React from 'react';
import { Star, ShieldCheck, Flame, Clock, Sparkles } from 'lucide-react';
import { BUSINESS_DATA } from '@/data/businessData';

export default function StatsAndBadges() {
  return (
    <section className="relative z-20 border-y border-zinc-800/80 bg-zinc-950/90 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-zinc-800/80">
          {/* Stat 1 */}
          <div className="flex items-center gap-3.5 pt-4 lg:pt-0">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Star className="w-6 h-6 fill-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="text-2xl sm:text-3xl font-black text-white">{BUSINESS_DATA.rating}★</span>
                <span className="text-xs text-amber-400 font-semibold bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/30">Google</span>
              </div>
              <p className="text-xs text-stone-400 font-medium">92 Verified Austin Reviews</p>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="flex items-center gap-3.5 pt-4 lg:pt-0 lg:pl-8">
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white">100%</div>
              <p className="text-xs text-stone-400 font-medium">Zero-Mess HEPA Living Room Trap</p>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="flex items-center gap-3.5 pt-4 lg:pt-0 lg:pl-8">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black text-white">7 AM - 7 PM</div>
              <p className="text-xs text-stone-400 font-medium">Open 7 Days • Same-Day Dispatch</p>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="flex items-center gap-3.5 pt-4 lg:pt-0 lg:pl-8">
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 shrink-0">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white">1,500+</div>
              <p className="text-xs text-stone-400 font-medium">Flues & Ducts Safely Cleaned</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
