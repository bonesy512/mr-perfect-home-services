'use client';

import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  Wind,
  Flame,
  Home,
  CheckCircle2,
  ArrowRight,
  Phone,
  Search,
  CheckCheck,
} from 'lucide-react';
import { BUSINESS_DATA, ServiceItem } from '@/data/businessData';

const ICON_MAP: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-6 h-6" />,
  SearchCheck: <Search className="w-6 h-6" />,
  ShieldCheck: <ShieldCheck className="w-6 h-6" />,
  Wind: <Wind className="w-6 h-6" />,
  FlameKindling: <Flame className="w-6 h-6" />,
  Home: <Home className="w-6 h-6" />,
};

export default function ServicesGrid() {
  return (
    <section id="services" className="relative py-20 bg-[#080d19] scroll-mt-20">
      {/* Background glow accents */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-[#5DCCD3] text-xs font-bold">
            <Wind className="w-3.5 h-3.5" />
            <span>Complete Residential Safety & Clean Air Services</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Our 6 Certified Core Services
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            From creosote removal and high-definition video flue scans to whole-home duct sanitization, every job is backed by our Zero-Mess Guarantee.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {BUSINESS_DATA.services.map((service: ServiceItem) => {
            const icon = ICON_MAP[service.iconName] || <Sparkles className="w-6 h-6" />;
            return (
              <div
                key={service.id}
                className="relative rounded-2xl border border-slate-800 bg-slate-900/70 hover:bg-slate-900/95 transition-all duration-300 p-6 sm:p-7 flex flex-col justify-between group hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10"
              >
                {/* Top: Icon & Tag */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/15 via-cyan-500/15 to-blue-500/15 border border-cyan-500/30 flex items-center justify-center text-[#5DCCD3] group-hover:scale-110 group-hover:bg-[#5DCCD3] group-hover:text-slate-950 transition-all">
                      {icon}
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-[#3DCB7D]">
                      {service.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#5DCCD3] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-300 text-xs sm:text-sm mt-2 leading-relaxed">
                      {service.shortDesc}
                    </p>
                  </div>

                  {/* Bullet Highlights */}
                  <ul className="space-y-2 pt-2 border-t border-slate-800/80">
                    {service.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-[#3DCB7D] shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer: Price & CTA */}
                <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] uppercase font-semibold text-slate-400">
                      Austin Pricing
                    </div>
                    <div className="text-sm font-black text-[#5DCCD3]">
                      {service.priceEstimate}
                    </div>
                  </div>

                  <a
                    href="#quote-form"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-cyan-500/10 hover:bg-[#5DCCD3] border border-cyan-500/30 text-[#5DCCD3] hover:text-slate-950 font-bold text-xs transition-all"
                  >
                    <span>Get Estimate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Diagnostic Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-cyan-950/40 to-slate-900 backdrop-blur-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-bold text-white flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-[#5DCCD3]" />
              Need help deciding which service is right?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300">
              Our safety coordinators diagnose smoke drafting issues, damper rattles, and HVAC odors over the phone in minutes.
            </p>
          </div>

          <a
            href={`tel:${BUSINESS_DATA.phoneRaw}`}
            className="shrink-0 inline-flex items-center gap-2 brand-gradient-btn hover:opacity-95 text-slate-950 font-black text-sm px-6 py-3.5 rounded-xl shadow-lg transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>Call {BUSINESS_DATA.phone}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
