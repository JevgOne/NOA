import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Cinzel, EB_Garamond } from 'next/font/google';
import '@/app/globals.css';
import { locales, isLocale, type Locale, getT } from '@/lib/i18n';
import { SITE_URL } from '@/lib/site';
import { cafeSchema } from '@/lib/seo';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Enhance from '@/components/Enhance';
import JsonLd from '@/components/JsonLd';

const cinzel = Cinzel({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-cinzel',
  display: 'swap',
});

const garamond = EB_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-garamond',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
};

// dynamicParams=true kvůli on-demand revalidaci home po schválení recenze.
// Neplatný jazyk stále vrací 404 přes notFound() guard v layoutu.
export const dynamicParams = true;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Inline skript: přidá .js na <html> co nejdřív, aby se .reveal skryl jen s JS (jinak zůstává viditelný).
const JS_FLAG = `document.documentElement.classList.add('js')`;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const t = getT(l);

  return (
    <html lang={l} className={`${cinzel.variable} ${garamond.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG }} />
        <a className="skip-link" href="#main">{t('skipToContent')}</a>
        <div className="bg" />
        <div className="wrap">
          <Nav locale={l} />
          {children}
          <Footer locale={l} />
        </div>
        <Enhance />
        <JsonLd data={cafeSchema(l)} />
      </body>
    </html>
  );
}
