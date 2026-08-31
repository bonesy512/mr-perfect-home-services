'use client';

import React from 'react';
import { Phone, Clock, MapPin, ShieldCheck, Star, Sparkles, Wind } from 'lucide-react';
import { BUSINESS_DATA } from '@/data/businessData';
import Logo from '@/components/ui/Logo';

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs sm:text-sm">
      {/* Top Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Ready for cleaner air and a safe fireplace?
            </h3>
            <p className="text-slate-300 text-sm">
              Schedule your Austin certified inspection or chimney sweep today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={`tel:${BUSINESS_DATA.phoneRaw}`}
              className="inline-flex items-center gap-2 brand-gradient-btn hover:opacity-95 text-slate-950 font-black px-6 py-3.5 rounded-xl shadow-lg transition-all"
            >
              <Phone className="w-4 h-4" />
              <span>Call Dispatch: {BUSINESS_DATA.phone}</span>
            </a>
            <a
              href="#quote-form"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold px-6 py-3.5 rounded-xl transition-all"
            >
              <span>Online Estimate</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <Logo variant="footer" />
            <p className="text-slate-400 text-xs leading-relaxed">
              Austin&apos;s trusted home safety specialists. Certified chimney sweeps, 360° video camera inspections, firebox masonry repairs, and whole-home air duct sanitization.
            </p>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
              <span className="text-white">4.6★</span>
              <span className="text-slate-400">({BUSINESS_DATA.reviewsCount} Google Reviews)</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Certified Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#services" className="hover:text-[#5DCCD3] transition-colors">
                  Chimney Sweep & Creosote Removal
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#5DCCD3] transition-colors">
                  Level 1 & 2 Camera Safety Scans
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#5DCCD3] transition-colors">
                  Fireplace Masonry & Damper Repair
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#5DCCD3] transition-colors">
                  Whole-Home Air Duct Sanitization
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#5DCCD3] transition-colors">
                  Dryer Vent Fire Prevention
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#5DCCD3] transition-colors">
                  Chimney Caps & Animal Screens
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Service Hubs */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Austin Metro Coverage
            </h4>
            <ul className="space-y-2 text-xs">
              <li>Austin (Downtown & Central)</li>
              <li>Westlake Hills & Rollingwood</li>
              <li>Lakeway & Lake Travis</li>
              <li>Round Rock & Pflugerville</li>
              <li>Cedar Park & Leander</li>
              <li>Buda, Kyle & South Austin</li>
              <li>Georgetown & Bee Cave</li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Contact & Dispatch
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#5DCCD3] shrink-0" />
                <span>
                  Primary: <a href={`tel:${BUSINESS_DATA.phoneRaw}`} className="text-white font-bold hover:text-[#5DCCD3]">{BUSINESS_DATA.phone}</a>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#3DCB7D] shrink-0" />
                <span>
                  Office: <a href={`tel:${BUSINESS_DATA.phoneAltRaw}`} className="text-slate-300 hover:text-white">{BUSINESS_DATA.phoneAlt}</a>
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hours: {BUSINESS_DATA.hours}</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0" />
                <span>HQ: Austin, Texas 78701</span>
              </li>
              <li className="pt-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-500/30 text-[#3DCB7D] font-bold text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Zero-Mess Guarantee
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Notice */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} Mr Perfect Home Services. All rights reserved. Austin, Texas.</p>
          <div className="flex items-center gap-4">
            <a href="#services" className="hover:text-slate-300">Services</a>
            <span>•</span>
            <a href="#faq" className="hover:text-slate-300">Safety FAQs</a>
            <span>•</span>
            <a href="#quote-form" className="hover:text-slate-300">Free Estimate</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
