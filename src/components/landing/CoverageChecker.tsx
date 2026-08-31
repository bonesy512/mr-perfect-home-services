'use client';

import React, { useState } from 'react';
import { track } from '@vercel/analytics';
import { MapPin, CheckCircle2, Clock, Truck, ArrowRight, ShieldCheck, Phone, Search } from 'lucide-react';
import { BUSINESS_DATA } from '@/data/businessData';
import { Input } from '@/components/ui/input';

interface ZoneMatch {
  matched: boolean;
  zoneName: string;
  neighborhoods: string;
  unit: string;
  eta: string;
  sameDay: boolean;
}

const POPULAR_ZIPS = [
  { label: 'Westlake', zip: '78746' },
  { label: 'Downtown', zip: '78701' },
  { label: 'SoCo / South', zip: '78704' },
  { label: 'Round Rock', zip: '78681' },
  { label: 'Lakeway', zip: '78738' },
  { label: 'Cedar Park', zip: '78613' },
];

function lookupAustinZip(zipInput: string): ZoneMatch | null {
  const cleanZip = zipInput.trim();
  if (cleanZip.length < 5) return null;

  // 1. Westlake Hills / Lake Travis / Bee Cave
  if (['78746', '78733', '78734', '78738', '78732', '78736', '78735'].includes(cleanZip)) {
    return {
      matched: true,
      zoneName: 'Westlake Hills & Lake Travis Metro',
      neighborhoods: 'Westlake, Rollingwood, Lakeway, Bee Cave & Steiner Ranch',
      unit: 'Westlake Mobile Safety Unit #2',
      eta: '30 - 45 mins average dispatch',
      sameDay: true,
    };
  }

  // 2. Central Austin & Downtown / UT / Mueller
  if (['78701', '78702', '78703', '78705', '78751', '78756', '78722', '78723'].includes(cleanZip)) {
    return {
      matched: true,
      zoneName: 'Central Austin & Downtown District',
      neighborhoods: 'Downtown, Tarrytown, Hyde Park, Mueller & East Austin',
      unit: 'Central Austin Rapid Unit #1',
      eta: '25 - 40 mins average dispatch',
      sameDay: true,
    };
  }

  // 3. South Austin / Sunset Valley / Buda / Kyle
  if (['78704', '78745', '78748', '78749', '78739', '78744', '78610', '78640', '78737'].includes(cleanZip)) {
    return {
      matched: true,
      zoneName: 'South Austin & Hays County Hub',
      neighborhoods: 'SoCo, Circle C, Sunset Valley, Oak Hill, Buda & Kyle',
      unit: 'South Austin Safety Van #3',
      eta: '35 - 50 mins average dispatch',
      sameDay: true,
    };
  }

  // 4. North Austin / Round Rock / Pflugerville / Cedar Park / Leander / Georgetown
  if (['78681', '78664', '78665', '78613', '78641', '78626', '78628', '78660', '78758', '78759', '78726', '78727', '78728', '78729', '78750'].includes(cleanZip)) {
    return {
      matched: true,
      zoneName: 'North Austin & Williamson County',
      neighborhoods: 'Round Rock, Cedar Park, Leander, Georgetown & Pflugerville',
      unit: 'North Metro Air Quality Unit #5',
      eta: '30 - 45 mins average dispatch',
      sameDay: true,
    };
  }

  // 5. Greater 787xx & 786xx Austin Area
  if (cleanZip.startsWith('787') || cleanZip.startsWith('786')) {
    return {
      matched: true,
      zoneName: 'Greater Austin Extended Area',
      neighborhoods: 'Travis, Williamson, Hays & Bastrop County Coverage',
      unit: 'Austin Regional Dispatch Unit #7',
      eta: '45 - 60 mins average dispatch',
      sameDay: true,
    };
  }

  // 6. Outside standard zone
  return {
    matched: false,
    zoneName: 'Extended Texas Region',
    neighborhoods: 'Outside primary 30-mile Austin radius',
    unit: 'Rural Custom Dispatch',
    eta: 'Call dispatch for custom scheduling',
    sameDay: false,
  };
}

export default function CoverageChecker() {
  const [zipInput, setZipInput] = useState('');
  const [result, setResult] = useState<ZoneMatch | null>(null);

  const handleZipChange = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 5);
    setZipInput(digits);
    if (digits.length === 5) {
      const match = lookupAustinZip(digits);
      setResult(match);
      if (match) {
        track('coverage_checked', {
          zip: digits,
          zone: match.zoneName,
          matched: match.matched,
        });
      }
    } else {
      setResult(null);
    }
  };

  const handleSelectQuickZip = (zip: string) => {
    setZipInput(zip);
    const match = lookupAustinZip(zip);
    setResult(match);
    if (match) {
      track('coverage_checked', {
        zip,
        zone: match.zoneName,
        matched: match.matched,
      });
    }
  };

  const handleBookInZone = () => {
    track('coverage_book_clicked', {
      zip: zipInput,
      zone: result?.zoneName || 'Austin',
    });

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('mrperfect:set-zip', {
          detail: {
            zipCode: `${zipInput} (${result?.zoneName || 'Austin'})`,
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
    <section className="relative py-12 sm:py-16 bg-[#070b16] border-y border-cyan-500/20">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[#5DCCD3] text-xs font-bold shadow-sm">
            <Truck className="w-3.5 h-3.5" />
            <span>Live Austin Fleet Availability</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Check Same-Day Service in Your Austin ZIP
          </h2>

          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
            We operate fully equipped chimney sweep & HEPA air duct mobile units across all Austin neighborhoods 7 days a week.
          </p>
        </div>

        {/* Interactive Search Card */}
        <div className="rounded-2xl sm:rounded-3xl border border-cyan-500/30 bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl shadow-black/80">
          <div className="max-w-2xl mx-auto space-y-5">
            {/* Input Field */}
            <div className="space-y-2">
              <label htmlFor="zipSearch" className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
                <span>Enter Your 5-Digit Texas ZIP Code:</span>
                <span className="text-[11px] font-normal text-slate-400">e.g. 78704, 78746, 78681</span>
              </label>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-5 h-5 text-[#5DCCD3]" />
                </div>
                <Input
                  id="zipSearch"
                  type="text"
                  inputMode="numeric"
                  maxLength={5}
                  value={zipInput}
                  onChange={(e) => handleZipChange(e.target.value)}
                  placeholder="Enter ZIP code (e.g. 78746)..."
                  className="bg-slate-950/90 border-slate-700 text-white placeholder:text-slate-400 text-base sm:text-lg pl-11 h-13 rounded-xl focus-visible:ring-[#5DCCD3]"
                />
              </div>
            </div>

            {/* Quick Select ZIP Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs text-slate-400 font-medium mr-1">Popular Hubs:</span>
              {POPULAR_ZIPS.map((item) => (
                <button
                  key={item.zip}
                  type="button"
                  onClick={() => handleSelectQuickZip(item.zip)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    zipInput === item.zip
                      ? 'bg-cyan-500/20 border-[#5DCCD3] text-[#5DCCD3] font-bold'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                  }`}
                >
                  {item.label} ({item.zip})
                </button>
              ))}
            </div>

            {/* Live Result Feedback Card */}
            {result && (
              <div className="pt-2 animate-in fade-in zoom-in-95 duration-200">
                {result.matched ? (
                  <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-950 via-[#071324] to-slate-950 border border-emerald-500/40 text-left space-y-4 shadow-xl">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-[#3DCB7D]">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-emerald-400 font-black text-sm sm:text-base flex items-center gap-1.5">
                            <span>We Serve Your Neighborhood!</span>
                          </div>
                          <div className="text-xs text-slate-300 font-bold">{result.zoneName}</div>
                        </div>
                      </div>

                      <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#3DCB7D] bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
                        <span className="w-2 h-2 rounded-full bg-[#3DCB7D] animate-ping" />
                        Active Dispatch Unit
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Truck className="w-4 h-4 text-[#5DCCD3] shrink-0" />
                        <span><strong>Assigned:</strong> {result.unit}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <Clock className="w-4 h-4 text-[#3DCB7D] shrink-0" />
                        <span><strong>Arrival Window:</strong> {result.eta}</span>
                      </div>
                    </div>

                    <div className="text-xs text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                      <strong className="text-white">Coverage Area:</strong> {result.neighborhoods}. Includes 100% Zero-Mess living room guarantee and zero travel surcharges.
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                      <button
                        type="button"
                        onClick={handleBookInZone}
                        className="w-full sm:w-auto flex-1 brand-gradient-btn hover:opacity-95 text-slate-950 font-black text-sm py-3.5 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
                      >
                        <span>Book Instant Service in {zipInput}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <a
                        href={`tel:${BUSINESS_DATA.phoneRaw}`}
                        onClick={() => track('phone_click', { source: 'coverage_checker' })}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-white text-xs font-bold px-4 py-3.5 rounded-xl transition-all"
                      >
                        <Phone className="w-3.5 h-3.5 text-[#5DCCD3]" />
                        <span>Call Dispatch ({BUSINESS_DATA.phone})</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/40 text-left space-y-3">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                      <MapPin className="w-5 h-5" />
                      <span>Extended Central Texas Service Zone ({zipInput})</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      You are slightly outside our standard automated same-day route, but we frequently dispatch to extended Texas properties. Call dispatch directly for a fast custom schedule.
                    </p>
                    <a
                      href={`tel:${BUSINESS_DATA.phoneRaw}`}
                      onClick={() => track('phone_click', { source: 'coverage_checker_extended' })}
                      className="inline-flex items-center gap-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 px-4 py-2.5 rounded-xl transition-all"
                    >
                      <Phone className="w-3.5 h-3.5" />
                      <span>Call Dispatch at {BUSINESS_DATA.phone}</span>
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
