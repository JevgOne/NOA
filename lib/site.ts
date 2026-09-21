// Central business/site config — single source of truth for SEO + structured data.
// Kontaktní údaje jsou zatím PLACEHOLDER (viz README) — až přijdou reálné, změň zde.

export const SITE_URL = 'https://www.noamatcha.cz';

export const business = {
  name: 'NOA Matcha Café',
  legalName: 'AK barbers s.r.o.',
  street: 'Revoluční 763/15',
  postalCode: '110 00',
  city: 'Praha 1',
  district: 'Staré Město',
  region: 'Praha',
  country: 'CZ',
  phone: '+420775502831',
  phoneDisplay: '+420 775 502 831',
  email: 'ahoj@noamatcha.cz',
  priceRange: '$$',
  servesCuisine: ['Matcha', 'Coffee', 'Café'],
  currency: 'CZK',
  // Revoluční 763/15, Praha 1 (OpenStreetMap).
  geo: { latitude: 50.09133, longitude: 14.42744 },
  // Placeholder — doplň reálné profily.
  sameAs: [] as string[],
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '16:30' },
    { days: ['Saturday'], opens: '09:00', closes: '15:00' },
    // Neděle zavřeno.
  ],
  // Placeholder hodnocení — nahraď reálnými čísly (např. z Google Business).
  aggregateRating: { ratingValue: 4.9, reviewCount: 127 },
} as const;

// Provozovatel (povinné údaje dle zákona o obchodních korporacích / spotřebitele).
export const operator = {
  name: 'AK barbers s.r.o.',
  ico: '17564093',
  dic: 'CZ17564093',
  responsible: 'Adrian Križan',
} as const;

// Placeholder odkazy na sociální sítě — doplň reálné profily.
export const social = {
  instagram: 'https://instagram.com/',
  instagramHandle: '@noamatcha',
  facebook: 'https://facebook.com/',
} as const;

export const OG_IMAGE = '/og.png';
