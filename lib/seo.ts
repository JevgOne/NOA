import type { Metadata } from 'next';
import { SITE_URL, business } from '@/lib/site';
import { type Locale, type PageKey, getMessages, pathFor, languageAlternates } from '@/lib/i18n';
import { classic, signature, boyfriends } from '@/lib/menu';
import { social } from '@/lib/site';
import { galleryPhotos, photoUrl } from '@/lib/gallery';
import type { Review, Aggregate } from '@/lib/reviews-db';

const ogLocale: Record<Locale, string> = { cs: 'cs_CZ', en: 'en_US' };

const keywords: Record<Locale, string[]> = {
  cs: [
    'matcha', 'matcha Praha', 'matcha kavárna', 'matcha latte Praha', 'ceremoniální matcha',
    'kavárna Praha 3', 'kavárna Žižkov', 'matcha Žižkov', 'Husitská 55', 'NOA Matcha', 'káva Praha 3',
  ],
  en: [
    'matcha', 'matcha Prague', 'matcha café', 'matcha latte Prague', 'ceremonial matcha',
    'café Prague 3', 'café Žižkov', 'matcha Žižkov', 'Husitská 55', 'NOA Matcha', 'coffee Prague 3',
  ],
};

// Sestaví kompletní Metadata (title, description, canonical, hreflang, robots, geo, OG, Twitter).
export function buildMetadata(locale: Locale, page: PageKey): Metadata {
  const m = getMessages(locale);
  const seo = m.seo[page];
  const canonical = pathFor(locale, page);
  const otherLocale: Locale = locale === 'cs' ? 'en' : 'cs';
  const { latitude, longitude } = business.geo;

  return {
    metadataBase: new URL(SITE_URL),
    title: seo.title,
    description: seo.description,
    applicationName: business.name,
    authors: [{ name: business.name, url: SITE_URL }],
    creator: business.name,
    publisher: business.name,
    category: 'food',
    keywords: keywords[locale],
    alternates: {
      canonical,
      languages: languageAlternates(page),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    openGraph: {
      type: 'website',
      title: seo.title,
      description: seo.description,
      url: canonical,
      siteName: m.seo.siteName,
      locale: ogLocale[locale],
      alternateLocale: ogLocale[otherLocale],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
    },
    other: {
      'geo.region': 'CZ-10',
      'geo.placename': `${business.city}, ${business.district}`,
      'geo.position': `${latitude};${longitude}`,
      ICBM: `${latitude}, ${longitude}`,
    },
  };
}

// ---- Structured data (JSON-LD) ----

const address = {
  '@type': 'PostalAddress',
  streetAddress: business.street,
  postalCode: business.postalCode,
  addressLocality: business.city,
  addressRegion: business.region,
  addressCountry: business.country,
};

const openingHoursSpecification = business.openingHours.map((h) => ({
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: h.days.map((d) => `https://schema.org/${d}`),
  opens: h.opens,
  closes: h.closes,
}));

// CafeOrCoffeeShop — hlavní entita provozovny.
// Site-wide entita provozovny (bez hodnocení — to se přidává na stránce recenzí z reálných dat).
export function cafeSchema(locale: Locale): Record<string, unknown> {
  const m = getMessages(locale);
  return {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    '@id': `${SITE_URL}/#cafe`,
    name: business.name,
    description: m.seo.home.description,
    url: `${SITE_URL}${pathFor(locale, 'home')}`,
    telephone: business.phone,
    email: business.email,
    address,
    geo: { '@type': 'GeoCoordinates', latitude: business.geo.latitude, longitude: business.geo.longitude },
    servesCuisine: business.servesCuisine as unknown as string[],
    priceRange: business.priceRange,
    currenciesAccepted: business.currency,
    paymentAccepted: 'Cash, Credit Card',
    openingHoursSpecification,
    hasMenu: `${SITE_URL}${pathFor(locale, 'menu')}`,
    acceptsReservations: true,
    image: galleryPhotos.slice(0, 4).map((p) => photoUrl(p.id, 1200)),
    logo: `${SITE_URL}/icon.svg`,
    hasMap: `https://www.google.com/maps?q=${encodeURIComponent(`${business.street}, ${business.postalCode} ${business.city}`)}`,
    areaServed: { '@type': 'City', name: 'Praha' },
    keywords: keywords[locale].join(', '),
    sameAs: [social.instagram, social.facebook].filter(Boolean),
  };
}

// Hvězdičky do Googlu — z REÁLNÝCH schválených recenzí (jinak nic).
export function reviewsSchema(aggregate: Aggregate | null, reviews: Review[]): Record<string, unknown> | null {
  if (!aggregate) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    '@id': `${SITE_URL}/#cafe`,
    name: business.name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: aggregate.ratingValue,
      reviewCount: aggregate.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.slice(0, 20).map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.body,
      datePublished: r.createdAt,
    })),
  };
}

// Menu + MenuItem se sekcemi a cenami (CZK).
export function menuSchema(locale: Locale): Record<string, unknown> {
  const t = getMessages(locale) as unknown as Record<string, string>;
  const toItem = (id: string) => ({
    '@type': 'MenuItem',
    name: t[`${id}n`] ?? t[id],
    ...(t[`${id}d`] ? { description: t[`${id}d`] } : {}),
    offers: {
      '@type': 'Offer',
      price: String(priceOf(id)),
      priceCurrency: business.currency,
    },
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'Menu',
    '@id': `${SITE_URL}${pathFor(locale, 'menu')}#menu`,
    name: t.menuH,
    inLanguage: locale,
    hasMenuSection: [
      { '@type': 'MenuSection', name: t.classic, hasMenuItem: classic.map((d) => toItem(d.id)) },
      { '@type': 'MenuSection', name: t.signature, hasMenuItem: signature.map((d) => toItem(d.id)) },
      { '@type': 'MenuSection', name: 'Coffee', hasMenuItem: boyfriends.map((d) => toItem(d.id)) },
    ],
  };
}

function priceOf(id: string): number {
  return [...classic, ...signature, ...boyfriends].find((d) => d.id === id)?.price ?? 0;
}

// BreadcrumbList pro podstránky.
export function breadcrumbSchema(locale: Locale, page: Exclude<PageKey, 'home'>): Record<string, unknown> {
  const m = getMessages(locale);
  const label: Record<Exclude<PageKey, 'home'>, string> = {
    menu: m.navMenu,
    gallery: m.navGallery,
    reviews: m.navReviews,
    about: m.navAbout,
    contact: m.navContact,
    lpLatte: m.lpLatteCrumb,
    lpZizkov: m.lpZizkovCrumb,
  };
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: m.breadcrumbHome, item: `${SITE_URL}${pathFor(locale, 'home')}` },
      { '@type': 'ListItem', position: 2, name: label[page], item: `${SITE_URL}${pathFor(locale, page)}` },
    ],
  };
}

// FAQPage — časté dotazy (rich results v Googlu). Data z messages.faq.
export function faqSchema(locale: Locale): Record<string, unknown> {
  const faq = (getMessages(locale) as unknown as { faq: { q: string; a: string }[] }).faq;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
