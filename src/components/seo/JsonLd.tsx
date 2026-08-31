import React from 'react';
import { BUSINESS_DATA } from '@/data/businessData';

export default function JsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mrperfectaustin.com';

  // 1. LocalBusiness / HVAC / Chimney Service Schema
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': ['HomeAndConstructionBusiness', 'HVACBusiness', 'ProfessionalService'],
    '@id': `${siteUrl}/#business`,
    name: BUSINESS_DATA.name,
    alternateName: 'Mr Perfect Chimney Sweep & Air Duct Cleaning',
    description: BUSINESS_DATA.description,
    url: siteUrl,
    telephone: '+1-737-299-7300',
    email: 'contact@mrperfectaustin.com',
    priceRange: '$$',
    currenciesAccepted: 'USD',
    paymentAccepted: 'Cash, Credit Card, Check, Debit Card',
    image: `${siteUrl}/opengraph-image`,
    logo: `${siteUrl}/favicon.ico`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: BUSINESS_DATA.city,
      addressRegion: 'TX',
      postalCode: '78701',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.2672,
      longitude: -97.7431,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '07:00',
        closes: '19:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(BUSINESS_DATA.rating),
      reviewCount: String(BUSINESS_DATA.reviewsCount),
      bestRating: '5',
      worstRating: '1',
    },
    areaServed: BUSINESS_DATA.serviceZones.map((zone) => ({
      '@type': 'City',
      name: zone.name,
      containedInPlace: {
        '@type': 'State',
        name: 'Texas',
      },
    })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Austin Home Safety & Air Quality Services',
      itemListElement: BUSINESS_DATA.services.map((service, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: service.title,
          description: service.longDesc,
          provider: {
            '@type': 'HomeAndConstructionBusiness',
            name: BUSINESS_DATA.name,
          },
        },
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'USD',
          description: service.priceEstimate,
        },
        position: index + 1,
      })),
    },
    review: BUSINESS_DATA.reviews.map((r) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: r.author,
      },
      datePublished: '2026-02-15',
      reviewBody: r.review,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(r.rating),
        bestRating: '5',
        worstRating: '1',
      },
      itemReviewed: {
        '@type': 'HomeAndConstructionBusiness',
        name: BUSINESS_DATA.name,
      },
    })),
  };

  // 2. FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: BUSINESS_DATA.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  // 3. WebSite Schema
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: BUSINESS_DATA.name,
    description: BUSINESS_DATA.tagline,
    publisher: {
      '@id': `${siteUrl}/#business`,
    },
    inLanguage: 'en-US',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
