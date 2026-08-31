'use client';

import React from 'react';
import { Star, ShieldCheck, Phone, CheckCircle2, ArrowRight, Sparkles, Wind, Flame } from 'lucide-react';
import { BUSINESS_DATA } from '@/data/businessData';
import CleanAirCanvasWrapper from '@/components/canvas/CleanAirCanvasWrapper';
import QuoteForm from '@/components/landing/QuoteForm';

export default function Hero() {
  return (
    <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden pt-6 pb-16 lg:py-20">
      {/* 3D Clean Air Particle Canvas */}
      <CleanAirCanvasWrapper />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Brand Copy & CRO CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Top Verified Local Trust Pill */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 shadow-lg backdrop-blur-md">
              <div className="flex items-center gap-0.5 text-amber-400">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                <Star className="w-3.5 h-3.5 fill-amber-400/80" />
              </div>
              <span className="text-xs font-bold text-white">4.6 Google Rating (92+ Reviews)</span>
              <span className="text-xs text-slate-500">•</span>
              <span className="text-xs font-semibold text-[#5DCCD3]">Austin&apos;s Home Safety & Clean Air Experts</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
              Breathe Cleaner Air.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3DCB7D] via-[#5DCCD3] to-[#38bdf8] drop-shadow-sm">
                Keep Your Fireplace Safe.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl font-normal">
              Certified chimney inspections, no-mess chimney sweeps, and complete air duct sanitization across Austin and Central Texas.
            </p>

            {/* Key Value Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[#3DCB7D] shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>100% Zero-Mess Living Room Guarantee</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-cyan-500/20 flex items-center justify-center text-[#5DCCD3] shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Level 1 & 2 HD Video Flue Camera Scans</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center text-[#38bdf8] shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Hospital-Grade Negative Air Duct Cleaning</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-200">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[#3DCB7D] shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
                <span>Same-Day Austin Emergency Dispatch</span>
              </div>
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-3">
              <a
                href={`tel:${BUSINESS_DATA.phoneRaw}`}
                className="flex items-center justify-center gap-3 brand-gradient-btn hover:opacity-95 text-slate-950 font-black text-base px-7 py-4 rounded-xl shadow-xl shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Phone className="w-5 h-5" />
                <span>Call Austin Dispatch: {BUSINESS_DATA.phone}</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  const formEl = document.getElementById('quote-form');
                  if (formEl) {
                    formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setTimeout(() => {
                      document.getElementById('fullName')?.focus();
                    }, 350);
                  }
                }}
                className="flex items-center justify-center gap-2.5 bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/30 text-white font-bold text-base px-6 py-4 rounded-xl transition-all group hover:border-cyan-400 cursor-pointer"
              >
                <span>Get Instant Online Estimate</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#5DCCD3]" />
              </button>
            </div>

            {/* Trust Pill Bar */}
            <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-[#3DCB7D]" /> NFPA 211 Safety Standards
              </span>
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <Wind className="w-4 h-4 text-[#5DCCD3]" /> Pure Botanical Sanitizers
              </span>
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <Sparkles className="w-4 h-4 text-[#38bdf8]" /> 1,500+ Austin Homes Cleaned
              </span>
            </div>
          </div>

          {/* Right Column: Quote Intake Form */}
          <div className="lg:col-span-5 w-full">
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}
