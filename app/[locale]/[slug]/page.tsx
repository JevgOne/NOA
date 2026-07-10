import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, type Locale, slugForPage, pageForSlug, getT } from '@/lib/i18n';
import { buildMetadata } from '@/lib/seo';
import Breadcrumbs from '@/components/Breadcrumbs';
import MenuContent from '@/components/MenuContent';
import AboutContent from '@/components/AboutContent';
import ContactContent from '@/components/ContactContent';

export const dynamicParams = false;

export function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return [];
  return Object.values(slugForPage[params.locale])
    .filter(Boolean)
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) return {};
  const page = pageForSlug[locale]?.[slug];
  if (!page) return {};
  return buildMetadata(locale, page);
}

export default async function SlugPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const l = locale as Locale;
  const page = pageForSlug[l]?.[slug];
  if (!page || page === 'home') notFound();

  const t = getT(l);
  const label =
    page === 'menu' ? t('navMenu') : page === 'about' ? t('navAbout') : t('navContact');

  return (
    <>
      <Breadcrumbs locale={l} page={page} label={label} />
      {page === 'menu' && <MenuContent locale={l} />}
      {page === 'about' && <AboutContent locale={l} />}
      {page === 'contact' && <ContactContent locale={l} />}
    </>
  );
}
