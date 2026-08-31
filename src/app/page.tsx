import React from 'react';
import SeasonalBanner from '@/components/landing/SeasonalBanner';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import CoverageChecker from '@/components/landing/CoverageChecker';
import StatsAndBadges from '@/components/landing/StatsAndBadges';
import ServicesGrid from '@/components/landing/ServicesGrid';
import CostEstimator from '@/components/landing/CostEstimator';
import BeforeAfterSlider from '@/components/landing/BeforeAfterSlider';
import WhyChooseUs from '@/components/landing/WhyChooseUs';
import ReviewsSection from '@/components/landing/ReviewsSection';
import AustinServiceArea from '@/components/landing/AustinServiceArea';
import FaqSection from '@/components/landing/FaqSection';
import Footer from '@/components/landing/Footer';
import StickyMobileBar from '@/components/landing/StickyMobileBar';

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#080d19] text-slate-100 selection:bg-[#5DCCD3] selection:text-slate-950">
      {/* 1. Seasonal Austin Safety Alert Banner */}
      <SeasonalBanner />

      {/* 2. Sticky Navigation Header */}
      <Header />

      {/* 3. 3D Particle Hero & Fast Quote Form */}
      <Hero />

      {/* 4. Interactive Austin Coverage & Same-Day Availability Checker */}
      <CoverageChecker />

      {/* 5. Social Proof & Trust Badges */}
      <StatsAndBadges />

      {/* 6. 6 Certified Core Services Grid */}
      <ServicesGrid />

      {/* 7. Instant Estimate Calculator with QuoteForm Sync */}
      <CostEstimator />

      {/* 8. Interactive Before/After Flue & Air Duct Comparison Slider */}
      <BeforeAfterSlider />

      {/* 9. Zero-Mess Guarantee & Contractor Comparison */}
      <WhyChooseUs />

      {/* 10. 4.6★ Google Reviews Engine */}
      <ReviewsSection />

      {/* 11. Austin Service Area & Neighborhood Hubs */}
      <AustinServiceArea />

      {/* 12. FAQ Accordion */}
      <FaqSection />

      {/* 13. Full Footer */}
      <Footer />

      {/* 14. Sticky Mobile Action Bar */}
      <StickyMobileBar />
    </main>
  );
}
