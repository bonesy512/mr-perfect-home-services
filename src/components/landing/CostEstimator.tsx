'use client';

import React, { useState } from 'react';
import { track } from '@vercel/analytics';
import { Calculator, Sparkles, ShieldCheck, CheckCircle2, ArrowRight, Wind, Flame, Home, Clock } from 'lucide-react';
import { BUSINESS_DATA } from '@/data/businessData';

interface ServiceTier {
  id: string;
  name: string;
  baseMin: number;
  baseMax: number;
  icon: React.ReactNode;
  tag: string;
  includes: string[];
}

const ESTIMATE_SERVICES: ServiceTier[] = [
  {
    id: 'Chimney Sweep & Creosote Removal',
    name: 'Chimney Sweep & Creosote Removal',
    baseMin: 149,
    baseMax: 229,
    icon: <Sparkles className="w-5 h-5 text-[#3DCB7D]" />,
    tag: 'Most Popular',
    includes: [
      'Triple-layer living room floor & hearth tarps',
      'Rotary power scrubbing & creosote extraction',
      'High-CFM negative air HEPA vacuum containment',
      'Full damper, smoke chamber & draft verification',
    ],
  },
  {
    id: 'Level 1/2 Camera Inspection',
    name: 'Level 1 & 2 HD Video Flue Scan',
    baseMin: 129,
    baseMax: 199,
    icon: <ShieldCheck className="w-5 h-5 text-[#5DCCD3]" />,
    tag: 'Safety Critical',
    includes: [
      '360° robotic HD camera internal flue traverse',
      'Flue tile crack & combustible clearance scan',
      'Written NFPA 211 fire code inspection report',
      'Same-day digital photo & video records',
    ],
  },
  {
    id: 'Fireplace Masonry & Damper Repair',
    name: 'Fireplace Masonry & Damper Repair',
    baseMin: 199,
    baseMax: 389,
    icon: <Flame className="w-5 h-5 text-amber-400" />,
    tag: 'Restoration',
    includes: [
      'Refractory panel & high-temp mortar tuckpointing',
      'Top-mount energy saving damper replacement',
      'Waterproof CrownSeal crown coating',
      'Zero heat loss seal guarantee',
    ],
  },
  {
    id: 'Whole-Home Air Duct Sanitization',
    name: 'Whole-Home Air Duct Sanitization',
    baseMin: 199,
    baseMax: 399,
    icon: <Wind className="w-5 h-5 text-[#38bdf8]" />,
    tag: 'Clean Air / IAQ',
    includes: [
      'High-capacity negative air vacuum trunk extraction',
      'Botanical plant-based EPA registered fogging',
      'Supply and return vent register rotary scrub',
      'Eliminates allergen, pet dander & mold spores',
    ],
  },
  {
    id: 'Dryer Vent Fire Prevention Cleaning',
    name: 'Dryer Vent Fire Safety Cleaning',
    baseMin: 99,
    baseMax: 169,
    icon: <Flame className="w-5 h-5 text-orange-400" />,
    tag: 'Fire Safety',
    includes: [
      'Full run rotary whip lint clearing from dryer to roof',
      'Exterior booster hood & damper flap check',
      'Airflow velocity CFM measurement before & after',
      'Cuts drying time and appliance electrical draw',
    ],
  },
];

const HOME_SIZES = [
  { id: '1-flue', label: '1 Flue / Single Story', multiplier: 1.0, extraMin: 0, extraMax: 0, desc: 'Standard home or 1 fireplace' },
  { id: '2-flues', label: '2 Flues / Two-Story', multiplier: 1.25, extraMin: 50, extraMax: 90, desc: 'Multi-level or dual hearths' },
  { id: 'estate', label: 'Multi-Flue / Large Estate', multiplier: 1.5, extraMin: 110, extraMax: 180, desc: '3+ Fireplaces or commercial' },
];

const URGENCY_LEVELS = [
  { id: 'Flexible (1-3 Days)', label: 'Flexible (1-3 Days)', fee: 0, tag: 'Standard' },
  { id: 'Urgent (24-48 Hours)', label: 'Urgent (Within 24-48 Hours)', fee: 0, tag: 'Popular' },
  { id: 'Same-Day Emergency', label: '🚨 Same-Day Emergency', fee: 35, tag: 'Immediate' },
];

export default function CostEstimator() {
  const [selectedServiceId, setSelectedServiceId] = useState(ESTIMATE_SERVICES[0].id);
  const [selectedHomeSize, setSelectedHomeSize] = useState(HOME_SIZES[0].id);
  const [selectedUrgency, setSelectedUrgency] = useState(URGENCY_LEVELS[0].id);

  const currentService = ESTIMATE_SERVICES.find((s) => s.id === selectedServiceId) || ESTIMATE_SERVICES[0];
  const currentSize = HOME_SIZES.find((s) => s.id === selectedHomeSize) || HOME_SIZES[0];
  const currentUrgency = URGENCY_LEVELS.find((u) => u.id === selectedUrgency) || URGENCY_LEVELS[0];

  const estimatedMin = Math.round((currentService.baseMin + currentSize.extraMin) + currentUrgency.fee);
  const estimatedMax = Math.round((currentService.baseMax + currentSize.extraMax) + currentUrgency.fee);

  const handleLockInEstimate = () => {
    // Track calculator lock-in in Vercel Analytics
    track('calculator_locked', {
      service: currentService.id,
      price: `$${estimatedMin} - $${estimatedMax}`,
      home_size: currentSize.label,
      urgency: currentUrgency.id,
    });

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('mrperfect:set-estimate', {
          detail: {
            service: currentService.id,
            urgency: currentUrgency.id,
            priceRange: `$${estimatedMin} - $${estimatedMax}`,
            sizeLabel: currentSize.label,
          },
        })
      );

      const formEl = document.getElementById('quote-form');
      if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
          document.getElementById('fullName')?.focus();
        }, 400);
      }
    }
  };

  return (
    <section id="estimate-calculator" className="relative py-20 bg-[#080d19] border-t border-slate-800 scroll-mt-20">
      {/* Background glow accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-[#5DCCD3] text-xs font-bold">
            <Calculator className="w-3.5 h-3.5" />
            <span>100% Transparent Austin Pricing</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Instant Austin Estimate Calculator
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            No hidden fees. Select your project parameters below to get an instant pricing bracket tailored to your home.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 3-Step Selection Engine */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Service Type */}
            <div className="p-6 rounded-2xl sm:rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#5DCCD3] flex items-center justify-between">
                <span>Step 1: Select Service Type</span>
                <span className="text-[11px] text-slate-400 font-normal">Choose 1 of 5 services</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ESTIMATE_SERVICES.map((srv) => {
                  const isSelected = selectedServiceId === srv.id;
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      onClick={() => setSelectedServiceId(srv.id)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-950/60 border-[#5DCCD3] text-white shadow-md shadow-cyan-500/10 ring-1 ring-[#5DCCD3]/50'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center">
                          {srv.icon}
                        </div>
                        <div>
                          <div className="text-xs font-bold leading-snug">{srv.name}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            From ${srv.baseMin}
                          </div>
                        </div>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${isSelected ? 'bg-[#3DCB7D]/20 text-[#3DCB7D]' : 'text-slate-400'}`}>
                        {srv.tag}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Home Architecture & Flues */}
            <div className="p-6 rounded-2xl sm:rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#5DCCD3] flex items-center justify-between">
                <span>Step 2: Home Scale & Flue Count</span>
                <span className="text-[11px] text-slate-400 font-normal">Structure size</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {HOME_SIZES.map((size) => {
                  const isSelected = selectedHomeSize === size.id;
                  return (
                    <button
                      key={size.id}
                      type="button"
                      onClick={() => setSelectedHomeSize(size.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-950/60 border-[#5DCCD3] text-white ring-1 ring-[#5DCCD3]/50 shadow-sm'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <div className="font-bold text-xs">{size.label}</div>
                      <div className="text-[10px] text-slate-400 mt-1">{size.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Urgency */}
            <div className="p-6 rounded-2xl sm:rounded-3xl bg-slate-900/80 border border-slate-800 space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#5DCCD3] flex items-center justify-between">
                <span>Step 3: Scheduling Timeline</span>
                <span className="text-[11px] text-slate-400 font-normal">Emergency vs Standard</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {URGENCY_LEVELS.map((urgency) => {
                  const isSelected = selectedUrgency === urgency.id;
                  return (
                    <button
                      key={urgency.id}
                      type="button"
                      onClick={() => setSelectedUrgency(urgency.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-950/60 border-[#5DCCD3] text-white ring-1 ring-[#5DCCD3]/50 shadow-sm'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                      }`}
                    >
                      <div className="font-bold text-xs">{urgency.label}</div>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {urgency.fee > 0 ? `+ $${urgency.fee} dispatch fee` : 'Standard rate'}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Live Price Display & Lock-In CTA */}
          <div className="lg:col-span-5 w-full">
            <div className="sticky top-24 rounded-2xl sm:rounded-3xl border border-cyan-500/40 bg-gradient-to-b from-slate-900 via-[#071120] to-slate-950 p-6 sm:p-8 shadow-2xl shadow-cyan-500/10 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Estimated Price Bracket
                </span>
                <span className="text-xs text-[#3DCB7D] font-bold bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  Zero Travel Surcharge
                </span>
              </div>

              {/* Price Callout */}
              <div className="space-y-1 text-center py-2">
                <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#3DCB7D] via-[#5DCCD3] to-[#38bdf8] tracking-tight">
                  ${estimatedMin} – ${estimatedMax}
                </div>
                <p className="text-xs text-slate-400">
                  Estimated Austin residential pricing for {currentService.name}
                </p>
              </div>

              {/* Inclusions Checklist */}
              <div className="space-y-2.5 bg-slate-950/80 p-4 rounded-2xl border border-slate-800/80">
                <div className="text-xs font-bold text-white uppercase tracking-wider">
                  Guaranteed With This Service:
                </div>
                <ul className="space-y-2">
                  {currentService.includes.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#3DCB7D] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleLockInEstimate}
                  className="w-full brand-gradient-btn hover:opacity-95 text-slate-950 font-black text-base py-4 rounded-xl shadow-xl shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Lock In This Estimate Range</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <p className="text-[11px] text-center text-slate-400">
                  Transfers parameters to our Austin quote coordinator for 15-min confirmation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
