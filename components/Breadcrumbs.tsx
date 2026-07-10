import Link from 'next/link';
import { type Locale, type PageKey, getT, pathFor } from '@/lib/i18n';
import { breadcrumbSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export default function Breadcrumbs({
  locale,
  page,
  label,
}: {
  locale: Locale;
  page: Exclude<PageKey, 'home'>;
  label: string;
}) {
  const t = getT(locale);
  return (
    <nav className="crumbs" aria-label={locale === 'cs' ? 'Drobečková navigace' : 'Breadcrumb'}>
      <ol>
        <li>
          <Link href={pathFor(locale, 'home')}>{t('breadcrumbHome')}</Link>
        </li>
        <li aria-hidden="true" className="sep">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </li>
        <li>
          <span aria-current="page">{label}</span>
        </li>
      </ol>
      <JsonLd data={breadcrumbSchema(locale, page)} />
    </nav>
  );
}
