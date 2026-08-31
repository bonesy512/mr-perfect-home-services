'use client';

import React from 'react';
import { ShieldCheck, Video, DollarSign, Sparkles, Check, X, Wind, Sparkle } from 'lucide-react';
import { BUSINESS_DATA } from '@/data/businessData';

export default function WhyChooseUs() {
  return (
    <section className="relative py-20 bg-[#060a14] border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-[#3DCB7D] text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>The Mr. Perfect Safety & Cleanliness Standard</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            The Mr. Perfect Zero-Mess Guarantee
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            We treat your home like our own. Zero dust on furniture, zero soot in carpets, and 100% verified internal flue safety.
          </p>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-7 space-y-4 relative overflow-hidden group hover:border-[#3DCB7D]/50 transition-all shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-[#3DCB7D]">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">Triple-Layer Floor Protection</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              We lay heavy-duty protective runners from your entryway to the hearth. Shoe covers are strictly worn by every technician from the moment we step inside.
            </p>
            <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3DCB7D]" /> Neoprene hardwood & carpet runners
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3DCB7D]" /> Magnetic static fireplace seal drape
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3DCB7D]" /> Guaranteed spotless clean floor finish
              </li>
            </ul>
          </div>

          {/* Pillar 2 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-7 space-y-4 relative overflow-hidden group hover:border-[#5DCCD3]/50 transition-all shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-[#5DCCD3]">
              <Wind className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">HEPA Negative Air Extraction</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Our medical-grade industrial HEPA vacuums pull high negative CFM airflow continuously, capturing 99.97% of airborne soot and dust particles before they escape.
            </p>
            <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5DCCD3]" /> 0.3-micron particulate filtration
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5DCCD3]" /> Sealed dust evacuation chambers
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5DCCD3]" /> Fresh botanical deodorization
              </li>
            </ul>
          </div>

          {/* Pillar 3 */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-7 space-y-4 relative overflow-hidden group hover:border-[#38bdf8]/50 transition-all shadow-lg">
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-[#38bdf8]">
              <Video className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white">HD Video Camera Verification</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              We provide 360° internal camera video footage showing before and after flue conditions so you can verify with your own eyes that your chimney is 100% clean and safe.
            </p>
            <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" /> High-resolution digital flue video
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" /> Detailed photo compliance report
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" /> Insurance & real estate certified
              </li>
            </ul>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-16 rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden shadow-2xl">
          <div className="p-6 sm:p-8 bg-slate-900 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold text-white">Austin Contractor Standards Comparison</h3>
              <p className="text-xs sm:text-sm text-slate-400">Ordinary Contractors vs. The Mr. Perfect Certified Standard</p>
            </div>
            <a
              href="#quote-form"
              className="inline-flex items-center gap-2 brand-gradient-btn hover:opacity-95 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition-all"
            >
              Book With Zero-Mess Guarantee
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400">
                  <th className="py-4 px-6 font-semibold">Safety & Service Standard</th>
                  <th className="py-4 px-6 font-bold text-[#5DCCD3] bg-cyan-950/20">Mr Perfect Home Services</th>
                  <th className="py-4 px-6 font-semibold text-slate-400">Generic Local Handymen</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-slate-300">
                <tr>
                  <td className="py-4 px-6 font-medium text-white">Dust & Soot Containment</td>
                  <td className="py-4 px-6 text-[#3DCB7D] font-bold bg-cyan-950/10 flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#3DCB7D]" /> Triple-layer tarps + HEPA Negative Air Vacuum
                  </td>
                  <td className="py-4 px-6 text-slate-400 flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-400" /> Basic shop-vac (blows soot into room)
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-white">Internal Flue Inspection</td>
                  <td className="py-4 px-6 text-[#3DCB7D] font-bold bg-cyan-950/10 flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#3DCB7D]" /> 360° HD Video Camera Scan with Video Report
                  </td>
                  <td className="py-4 px-6 text-slate-400 flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-400" /> Flashlight glance only
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-white">Dispatch Hours & Response</td>
                  <td className="py-4 px-6 text-[#3DCB7D] font-bold bg-cyan-950/10 flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#3DCB7D]" /> 7:00 AM - 7:00 PM Daily (Same-Day Available)
                  </td>
                  <td className="py-4 px-6 text-slate-400 flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-400" /> Limited weekday hours, 2-week delays
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-white">Local Google Reputation</td>
                  <td className="py-4 px-6 text-[#3DCB7D] font-bold bg-cyan-950/10 flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#3DCB7D]" /> 4.6★ Verified Google Rating (92 Reviews)
                  </td>
                  <td className="py-4 px-6 text-slate-400 flex items-center gap-2">
                    <X className="w-4 h-4 text-rose-400" /> Unverified or unknown reviews
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
