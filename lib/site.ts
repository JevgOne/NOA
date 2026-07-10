// Central business/site config — single source of truth for SEO + structured data.
// Kontaktní údaje jsou zatím PLACEHOLDER (viz README) — až přijdou reálné, změň zde.

export const SITE_URL = 'https://noamatcha.cz';

export const business = {
  name: 'NOA Matcha Café',
  legalName: 'NOA Matcha',
  street: 'Národní 12',
  postalCode: '110 00',
  city: 'Praha 1',
  region: 'Praha',
  country: 'CZ',
  phone: '+420777123456',
  phoneDisplay: '+420 777 123 456',
  email: 'ahoj@noamatcha.cz',
  priceRange: '$$',
  servesCuisine: ['Matcha', 'Coffee', 'Café'],
  currency: 'CZK',
  // Placeholder geo — doplň reálné souřadnice provozovny.
  geo: { latitude: 50.0810, longitude: 14.4190 },
  // Placeholder — doplň reálné profily.
  sameAs: [] as string[],
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '20:00' },
    { days: ['Saturday'], opens: '09:00', closes: '20:00' },
    { days: ['Sunday'], opens: '09:00', closes: '18:00' },
  ],
  // Placeholder hodnocení — nahraď reálnými čísly (např. z Google Business).
  aggregateRating: { ratingValue: 4.9, reviewCount: 127 },
} as const;

// Placeholder odkazy na sociální sítě — doplň reálné profily.
export const social = {
  instagram: 'https://instagram.com/',
  instagramHandle: '@noamatcha',
  facebook: 'https://facebook.com/',
} as const;

export const OG_IMAGE = '/og.png';
