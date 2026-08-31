'use client';

import React from 'react';
import { MapPin, Navigation, Phone, CheckCircle2, ShieldCheck } from 'lucide-react';
import { BUSINESS_DATA } from '@/data/businessData';

export default function AustinServiceArea() {
  return (
    <section id="service-areas" className="relative py-20 bg-[#060a14] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left info column */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-[#5DCCD3] text-xs font-bold">
              <MapPin className="w-3.5 h-3.5" />
              <span>Full Greater Austin Service Radius</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Rapid Dispatch Across Greater Austin Daily
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              We dispatch fully equipped mobile service units with high-power HEPA containment vacuums, rotary brush systems, and 360° flue cameras directly to your neighborhood 7 days a week.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-[#3DCB7D] shrink-0" />
                <span>Zero travel fees anywhere in the Greater Austin metro</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-[#3DCB7D] shrink-0" />
                <span>Same-day priority dispatch for active smoke problems or escrow deadlines</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-200">
                <CheckCircle2 className="w-5 h-5 text-[#3DCB7D] shrink-0" />
                <span>Fully certified, background-checked, and insured safety technicians</span>
              </div>
            </div>

            <div className="pt-4">
              <a
                href={`tel:${BUSINESS_DATA.phoneRaw}`}
                className="inline-flex items-center gap-3 brand-gradient-btn hover:opacity-95 text-slate-950 font-black px-6 py-3.5 rounded-xl shadow-lg transition-all"
              >
                <Phone className="w-4 h-4" />
                <span>Check Your Neighborhood: {BUSINESS_DATA.phone}</span>
              </a>
            </div>
          </div>

          {/* Right Matrix Cards */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl sm:rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-2 text-white font-bold text-base">
                  <Navigation className="w-5 h-5 text-[#5DCCD3]" />
                  Austin Service Hubs & Neighborhoods
                </div>
                <span className="text-xs text-[#3DCB7D] font-bold bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-500/30">
                  Active Dispatch
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {BUSINESS_DATA.serviceZones.map((zone, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between hover:border-cyan-500/30 transition-colors"
                  >
                    <div>
                      <div className="font-bold text-white text-xs sm:text-sm">
                        {zone.name}
                      </div>
                      <div className="text-[11px] text-slate-400">Zip: {zone.zip}</div>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-[#3DCB7D]" />
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-slate-300 flex items-start gap-2.5">
                <ShieldCheck className="w-4 h-4 text-[#5DCCD3] shrink-0 mt-0.5" />
                <span>
                  Don&apos;t see your specific zip code? We cover all of Travis, Williamson, Hays, and Burnet counties. Call to confirm dispatch.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
