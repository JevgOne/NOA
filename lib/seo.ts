import type { Metadata } from 'next';
import { SITE_URL, OG_IMAGE, business } from '@/lib/site';
import { type Locale, type PageKey, getMessages, pathFor, languageAlternates } from '@/lib/i18n';
import { classic, signature, boyfriends } from '@/lib/menu';
import { reviews } from '@/lib/reviews';

const ogLocale: Record<Locale, string> = { cs: 'cs_CZ', en: 'en_US' };

// Sestaví kompletní Metadata (title, description, canonical, hreflang, OG, Twitter) pro stránku + jazyk.
export function buildMetadata(locale: Locale, page: PageKey): Metadata {
  const m = getMessages(locale);
  const seo = m.seo[page];
  const canonical = pathFor(locale, page);
  const otherLocale: Locale = locale === 'cs' ? 'en' : 'cs';

  return {
    metadataBase: new URL(SITE_URL),
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical,
      languages: languageAlternates(page),
    },
    openGraph: {
      type: 'website',
      title: seo.title,
      description: seo.description,
      url: canonical,
      siteName: m.seo.siteName,
      locale: ogLocale[locale],
      alternateLocale: ogLocale[otherLocale],
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: m.seo.ogAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [OG_IMAGE],
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
export function cafeSchema(locale: Locale): Record<string, unknown> {
  const m = getMessages(locale);
  const body = getMessages(locale) as unknown as Record<string, string>;
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
    openingHoursSpecification,
    hasMenu: `${SITE_URL}${pathFor(locale, 'menu')}`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: business.aggregateRating.ratingValue,
      reviewCount: business.aggregateRating.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      reviewRating: { '@type': 'Rating', ratingValue: r.rating, bestRating: 5 },
      reviewBody: body[r.textKey],
    })),
    ...(business.sameAs.length ? { sameAs: business.sameAs } : {}),
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
    about: m.navAbout,
    contact: m.navContact,
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
