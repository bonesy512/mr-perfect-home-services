import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import JsonLd from '@/components/seo/JsonLd';

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mrperfectaustin.com';

export const viewport: Viewport = {
  themeColor: '#080d19',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mr Perfect Home Services | Austin's Certified Chimney & Air Quality Specialists",
    template: '%s | Mr Perfect Home Services',
  },
  description:
    'Austin premier chimney sweep, 360° video camera safety inspections, fireplace repairs, and whole-home air duct sanitization. 100% Zero-Mess Guarantee. 4.6★ Google rated. Call (737) 299-7300.',
  applicationName: 'Mr Perfect Home Services',
  authors: [{ name: 'Mr Perfect Home Services', url: siteUrl }],
  generator: 'Next.js',
  keywords: [
    'Chimney Sweep Austin TX',
    'Chimney Inspection Austin',
    'Fireplace Repair Austin',
    'Air Duct Cleaning Austin',
    'Dryer Vent Cleaning Austin',
    'Mr Perfect Home Services',
    'Level 2 Chimney Inspection',
    'Creosote Removal Austin',
    'Chimney Cap Installation Austin',
    'Indoor Air Quality Austin',
    'Zero Mess Chimney Cleaning Austin'
  ],
  referrer: 'origin-when-cross-origin',
  creator: 'Mr Perfect Home Services',
  publisher: 'Mr Perfect Home Services',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Mr Perfect Home Services | Austin's Certified Chimney & Air Quality Specialists",
    description:
      'Certified chimney sweeps, 360° camera inspections, and whole-home air duct sanitization across Austin, TX. 100% Zero-Mess Guarantee. Open 7 AM - 7 PM Daily.',
    url: siteUrl,
    siteName: 'Mr Perfect Home Services',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Mr Perfect Home Services | Austin's Certified Chimney & Air Quality Specialists",
    description:
      'Certified chimney sweeps, camera inspections, and whole-home air duct sanitization across Greater Austin. 100% Zero-Mess Guarantee.',
    creator: '@mrperfectaustin',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  manifest: '/manifest.webmanifest',
  category: 'Home Improvement & Maintenance',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} dark scroll-smooth`}>
      <head>
        <JsonLd />
      </head>
      <body className="min-h-screen bg-[#080d19] text-slate-100 antialiased selection:bg-[#5DCCD3] selection:text-slate-950 flex flex-col">
        {/* pb-28 on mobile ensures sticky bottom action bar never overlaps any footer or form elements */}
        <div className="flex-1 flex flex-col pb-28 md:pb-0">
          {children}
        </div>
      </body>
    </html>
  );
}

