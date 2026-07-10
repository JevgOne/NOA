import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, type Locale } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';
import Hero from '@/components/Hero';
import MenuSections from '@/components/MenuSections';
import CafeSection from '@/components/CafeSection';
import InviteSection from '@/components/InviteSection';
import QualityStrip from '@/components/QualityStrip';
import Reviews from '@/components/Reviews';
import Instagram from '@/components/Instagram';
import Faq from '@/components/Faq';
import Footline from '@/components/Footline';

// ISR: home ukazuje nejnovější schválené recenze z DB — obnovuj každou minutu.
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata(locale, 'home');
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;

  return (
    <>
      <Hero locale={l} />
      <main id="main">
        <div className="container">
          <MenuSections locale={l} leadingRule />
          <CafeSection locale={l} />
          <InviteSection locale={l} />
          <QualityStrip locale={l} />
          <Reviews locale={l} />
          <Instagram locale={l} />
          <Faq locale={l} />
          <Footline locale={l} />
        </div>
      </main>
    </>
  );
}
