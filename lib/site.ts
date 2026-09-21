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
  priceRange: '$$',
  servesCuisine: ['Matcha', 'Coffee', 'Café'],
  currency: 'CZK',
  // Revoluční 763/15, Praha 1 (OpenStreetMap).
  geo: { latitude: 50.09133, longitude: 14.42744 },
  // Placeholder — doplň reálné profily.
  sameAs: [] as string[],
  openingHours: [
    { label: 'dMonFri', days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '16:30' },
    { label: 'dSat', days: ['Saturday'], opens: '09:00', closes: '15:00' },
  ],
  // Dny bez otevírací doby — zobrazí se jako „Zavřeno“.
  closedDays: [{ label: 'dSun', days: ['Sunday'] }] as { label: string; days: string[] }[],
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

// Sociální sítě — prázdný řetězec = profil zatím neexistuje (ikona se skryje).
export const social = {
  instagram: 'https://www.instagram.com/noamatcha.cz/',
  instagramHandle: '@noamatcha.cz',
  facebook: '',
} as const;

// Spojení MHD (ověřeno z dat PID, 9/2026).
export const transport = {
  tram: { stop: 'Dlouhá třída', lines: ['6', '8', '15', '26'], walkMin: 1 },
  metro: { stop: 'Náměstí Republiky', line: 'B', walkMin: 5 },
} as const;

export const OG_IMAGE = '/og.png';
