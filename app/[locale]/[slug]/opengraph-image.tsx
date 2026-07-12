import { ImageResponse } from 'next/og';
import { getMessages, isLocale, pageForSlug, type Locale, type PageKey } from '@/lib/i18n';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'NOA Matcha Café — Husitská 55, Praha 3';

// Nadpis pro OG obrázek dané podstránky (jen latin-1 diakritika — spolehlivě se vykreslí).
function headingFor(locale: Locale, page: PageKey): string {
  const m = getMessages(locale);
  const map: Partial<Record<PageKey, string>> = {
    menu: m.navMenu,
    gallery: m.navGallery,
    reviews: m.navReviews,
    about: m.navAbout,
    contact: m.navContact,
    lpLatte: m.landing.latte.ogHeading,
    lpZizkov: m.landing.zizkov.ogHeading,
    lpCeremonial: m.landing.ceremonial.ogHeading,
    lpTogo: m.landing.togo.ogHeading,
  };
  return map[page] ?? m.seo.siteName;
}

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const l: Locale = isLocale(locale) ? locale : 'cs';
  const page = pageForSlug[l]?.[slug];
  const heading = page ? headingFor(l, page) : getMessages(l).seo.siteName;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #F0E3CB 0%, #EAD9BD 55%, #DEC9A6 100%)',
          color: '#33401F',
          fontFamily: 'serif',
          padding: 70,
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'flex', fontSize: 30, letterSpacing: 16, color: '#8A3B36' }}>NOA MATCHA CAFÉ</div>
        <div style={{ display: 'flex', fontSize: 82, fontWeight: 700, marginTop: 28, maxWidth: 1000, lineHeight: 1.1 }}>
          {heading}
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: '#6E6553', letterSpacing: 4, marginTop: 34 }}>
          Husitská 55 · Praha 3
        </div>
      </div>
    ),
    { ...size },
  );
}
