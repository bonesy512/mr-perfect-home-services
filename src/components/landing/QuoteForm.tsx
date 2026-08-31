'use client';

import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { track } from '@vercel/analytics';
import { ShieldCheck, Phone, CheckCircle2, ArrowRight, Wind, Star, AlertCircle } from 'lucide-react';
import { BUSINESS_DATA } from '@/data/businessData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const SERVICE_OPTIONS = [
  { id: 'Chimney Sweep & Creosote Removal', label: 'Chimney Sweep', tag: 'Most Popular' },
  { id: 'Level 1/2 Camera Inspection', label: 'Safety Inspection', tag: 'Recommended' },
  { id: 'Fireplace Masonry & Damper Repair', label: 'Fireplace Repair', tag: 'Restoration' },
  { id: 'Whole-Home Air Duct Sanitization', label: 'Air Duct Cleaning', tag: 'Clean Air' },
  { id: 'Dryer Vent Fire Prevention Cleaning', label: 'Dryer Vent', tag: 'Fire Safety' },
];

export default function QuoteForm() {
  const [selectedService, setSelectedService] = useState('Chimney Sweep & Creosote Removal');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    zipCode: '',
    urgency: 'Normal (Within 1-3 Days)',
    notes: '',
  });
  const [showNotes, setShowNotes] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [leadRef, setLeadRef] = useState<string | null>(null);

  // Sync with interactive tools (Coverage Checker & Cost Estimator)
  React.useEffect(() => {
    const handleEstimateSync = (e: Event) => {
      const customEvent = e as CustomEvent<{
        service?: string;
        urgency?: string;
        priceRange?: string;
        sizeLabel?: string;
      }>;
      if (customEvent.detail) {
        if (customEvent.detail.service) {
          setSelectedService(customEvent.detail.service);
        }
        setFormData((prev) => ({
          ...prev,
          urgency: customEvent.detail.urgency || prev.urgency,
          notes: customEvent.detail.priceRange
            ? `Calculator Estimate: ${customEvent.detail.priceRange} [${customEvent.detail.sizeLabel || 'Standard'}]`
            : prev.notes,
        }));
        setShowNotes(true);
      }
    };

    const handleZipSync = (e: Event) => {
      const customEvent = e as CustomEvent<{ zipCode?: string }>;
      if (customEvent.detail?.zipCode) {
        setFormData((prev) => ({
          ...prev,
          zipCode: customEvent.detail.zipCode || prev.zipCode,
        }));
      }
    };

    window.addEventListener('mrperfect:set-estimate', handleEstimateSync);
    window.addEventListener('mrperfect:set-zip', handleZipSync);

    return () => {
      window.removeEventListener('mrperfect:set-estimate', handleEstimateSync);
      window.removeEventListener('mrperfect:set-zip', handleZipSync);
    };
  }, []);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 110,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#3DCB7D', '#5DCCD3', '#0376F4', '#ffffff', '#38bdf8'],
      });
    } catch {
      // Graceful fallback
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!formData.fullName.trim() || !formData.phone.trim()) {
      setErrorMessage('Please fill out your name and a valid phone number.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          service: selectedService,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit estimate request. Please try calling dispatch directly.');
      }

      // Track successful submission in Vercel Analytics
      track('quote_submitted', {
        service: selectedService,
        zip: formData.zipCode || 'unspecified',
        urgency: formData.urgency,
      });

      setLeadRef(data.leadId || null);
      setSubmitted(true);
      triggerConfetti();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Network error occurred. Please call (737) 299-7300.';
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="quote-form" className="relative scroll-mt-24">
      {/* Glow ambient background rings */}
      <div className="absolute -top-6 -right-6 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative rounded-2xl sm:rounded-3xl border border-cyan-500/30 bg-slate-900/90 backdrop-blur-2xl p-6 sm:p-8 lg:p-9 shadow-2xl shadow-black/80">
        {submitted ? (
          <div className="text-center py-8 sm:py-10 space-y-6 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gradient-to-br from-[#3DCB7D] via-[#5DCCD3] to-[#0376F4] flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11 text-slate-950 stroke-[2.5]" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Estimate Request Received!
              </h3>
              <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto">
                Thank you, <span className="font-bold text-[#5DCCD3]">{formData.fullName}</span>. An Austin home safety coordinator is reviewing your <span className="font-bold text-white">{selectedService}</span> inquiry.
              </p>
              {leadRef && (
                <p className="text-[11px] font-mono text-slate-400">
                  Confirmation Ref: <span className="text-[#3DCB7D] font-bold">{leadRef}</span>
                </p>
              )}
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/80 border border-slate-800 text-left max-w-md mx-auto space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Estimated Response Time:</span>
                <span className="text-[#3DCB7D] font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#3DCB7D] animate-pulse" />
                  Under 15 Minutes
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Direct Austin Phone Dispatch:</span>
                <a href={`tel:${BUSINESS_DATA.phoneRaw}`} className="text-[#5DCCD3] font-bold hover:underline">
                  {BUSINESS_DATA.phone}
                </a>
              </div>
              <div className="text-xs text-slate-400 border-t border-slate-800 pt-2">
                <span className="text-slate-200 font-medium">Guaranteed:</span> 100% Zero-Mess HEPA living room trap & certified clean finish.
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`tel:${BUSINESS_DATA.phoneRaw}`}
                onClick={() => track('phone_click', { source: 'quote_form_success' })}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 brand-gradient-btn hover:opacity-95 text-slate-950 font-black px-6 py-3 rounded-xl shadow-lg transition-all"
              >
                <Phone className="w-4 h-4" />
                Call Dispatch Directly
              </a>
              <Button
                variant="outline"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ fullName: '', phone: '', zipCode: '', urgency: 'Normal (Within 1-3 Days)', notes: '' });
                  setErrorMessage(null);
                }}
                className="w-full sm:w-auto border-slate-700 text-slate-300 hover:bg-slate-800"
              >
                Submit Another Request
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Header with Mini Trust Pill */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-[#5DCCD3] text-xs font-bold shadow-sm">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>⭐ 4.6 (92+ Austin Reviews) • 100% Zero-Mess Guarantee</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Request Free Austin Estimate
              </h2>
              <p className="text-xs sm:text-sm text-slate-400">
                100% Zero-Mess living room guarantee. Fast dispatch across Austin.
              </p>
            </div>

            {/* Error Message Banner */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-xs flex items-start gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-red-300">{errorMessage}</p>
                  <p className="mt-0.5 text-[11px] text-red-300/80">
                    Need immediate help? Call Austin Dispatch at{' '}
                    <a href={`tel:${BUSINESS_DATA.phoneRaw}`} className="underline font-bold text-white">
                      {BUSINESS_DATA.phone}
                    </a>
                  </p>
                </div>
              </div>
            )}

            {/* Service Category Buttons */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                1. Select Service Needed:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SERVICE_OPTIONS.map((srv) => {
                  const isSelected = selectedService === srv.id;
                  return (
                    <button
                      key={srv.id}
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => setSelectedService(srv.id)}
                      className={`text-left p-2.5 rounded-xl border text-xs transition-all relative ${
                        isSelected
                          ? 'border-[#5DCCD3] bg-cyan-950/50 text-white shadow-md shadow-cyan-500/10 ring-1 ring-[#5DCCD3]/50'
                          : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="font-bold">{srv.label}</div>
                      <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-[#3DCB7D] font-bold' : 'text-slate-400'}`}>
                        {srv.tag}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-3.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
                2. Contact & Details:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="fullName" className="text-xs text-slate-300 font-medium">
                    Full Name <span className="text-[#5DCCD3]">*</span>
                  </label>
                  <Input
                    id="fullName"
                    required
                    disabled={isSubmitting}
                    placeholder="e.g. Marcus Sterling"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="bg-slate-950/80 border-slate-700 text-white placeholder:text-slate-400 focus-visible:ring-[#5DCCD3] h-10"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="phone" className="text-xs text-slate-300 font-medium">
                    Phone Number <span className="text-[#5DCCD3]">*</span>
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    disabled={isSubmitting}
                    placeholder="e.g. (737) 299-7300"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="bg-slate-950/80 border-slate-700 text-white placeholder:text-slate-400 focus-visible:ring-[#5DCCD3] h-10"
                  />
                </div>
              </div>

              {/* Phone Trust & Anti-Spam Microcopy */}
              <p className="text-[11px] text-[#5DCCD3]/95 flex items-center gap-1 font-medium -mt-1">
                <span>🔒 No spam. We only text your estimate & technician ETA window within 15 mins.</span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="zipCode" className="text-xs text-slate-300 font-medium">
                    Austin Zip / Neighborhood
                  </label>
                  <Input
                    id="zipCode"
                    disabled={isSubmitting}
                    placeholder="e.g. 78701, Westlake"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                    className="bg-slate-950/80 border-slate-700 text-white placeholder:text-slate-400 focus-visible:ring-[#5DCCD3] h-10"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="urgency" className="text-xs text-slate-300 font-medium">
                    Scheduling Timeline
                  </label>
                  <select
                    id="urgency"
                    disabled={isSubmitting}
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="w-full rounded-md bg-slate-950/80 border border-slate-700 text-white text-xs px-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5DCCD3] h-10"
                  >
                    <option value="Same-Day Emergency">🚨 Same-Day Emergency (Today)</option>
                    <option value="Urgent (24-48 Hours)">⚡ Urgent (Within 24-48 Hours)</option>
                    <option value="Flexible (1-3 Days)">📅 Flexible (Within 1-3 Days)</option>
                    <option value="Real Estate Closing">🏡 Escrow / Real Estate Inspection</option>
                  </select>
                </div>
              </div>

              {/* Progressive Disclosure: Collapsible Notes */}
              <div className="pt-0.5">
                {!showNotes ? (
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setShowNotes(true)}
                    className="text-xs text-[#5DCCD3] hover:text-cyan-300 font-medium flex items-center gap-1.5 transition-colors group py-1 cursor-pointer"
                  >
                    <span className="w-4 h-4 rounded-full bg-cyan-950 border border-cyan-500/40 flex items-center justify-center text-[11px] group-hover:border-cyan-400 text-cyan-300">+</span>
                    <span>Add details or symptoms (optional)</span>
                  </button>
                ) : (
                  <div className="space-y-1 animate-in fade-in duration-200">
                    <div className="flex items-center justify-between">
                      <label htmlFor="notes" className="text-xs text-slate-300 font-medium">
                        Project Notes / Symptoms (Optional)
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowNotes(false)}
                        className="text-[11px] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                      >
                        Hide
                      </button>
                    </div>
                    <Textarea
                      id="notes"
                      disabled={isSubmitting}
                      placeholder="e.g. Smoke odor when heater runs, dryer taking too long, annual safety camera check..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      rows={2}
                      className="bg-slate-950/80 border-slate-700 text-white placeholder:text-slate-400 focus-visible:ring-[#5DCCD3] text-xs"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Submit Action with Value Subtext */}
            <div className="space-y-2.5 pt-1">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full brand-gradient-btn hover:opacity-95 text-slate-950 font-black text-base py-4 rounded-xl shadow-xl shadow-cyan-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] flex flex-col items-center justify-center gap-0.5 h-auto cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2 py-1">
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    Locking In Your Free Estimate...
                  </span>
                ) : (
                  <>
                    <div className="flex items-center justify-center gap-2">
                      <span>Get My Free Austin Estimate</span>
                      <ArrowRight className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-900/80">
                      100% Free • Zero Obligation • 15-Min Response
                    </span>
                  </>
                )}
              </Button>

              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#3DCB7D]" /> Zero travel surcharges in Austin
                </span>
                <span className="flex items-center gap-1">
                  <Wind className="w-3.5 h-3.5 text-[#5DCCD3]" /> 15-minute quick callback
                </span>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
