import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Mr Perfect Home Services | Austin's Certified Chimney & Air Quality Specialists",
  description:
    'Austin premier chimney sweep, 360° video camera safety inspections, fireplace repairs, and whole-home air duct sanitization. 100% Zero-Mess Guarantee. 4.6★ Google rated. Call (737) 299-7300.',
  keywords: [
    'Chimney Sweep Austin TX',
    'Chimney Inspection Austin',
    'Fireplace Repair Austin',
    'Air Duct Cleaning Austin',
    'Dryer Vent Cleaning Austin',
    'Mr Perfect Home Services',
    'Level 2 Chimney Inspection',
    'Creosote Removal Austin'
  ],
  authors: [{ name: 'Mr Perfect Home Services' }],
  openGraph: {
    title: "Mr Perfect Home Services | Austin's Certified Chimney & Air Quality Specialists",
    description:
      'Certified chimney sweeps, camera inspections, and whole-home air duct sanitization across Austin, TX. 100% Zero-Mess Guarantee. Open 7 AM - 7 PM Daily.',
    url: 'https://mrperfectaustin.com',
    siteName: 'Mr Perfect Home Services',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark scroll-smooth`}>
      <body className="min-h-screen bg-[#080d19] text-slate-100 antialiased selection:bg-[#5DCCD3] selection:text-slate-950 flex flex-col">
        {/* pb-28 on mobile ensures sticky bottom action bar never overlaps any footer or form elements */}
        <div className="flex-1 flex flex-col pb-28 md:pb-0">
          {children}
        </div>
      </body>
    </html>
  );
}
