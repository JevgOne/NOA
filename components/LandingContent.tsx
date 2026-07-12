import Link from 'next/link';
import { type Locale, getT, getMessages, pathFor } from '@/lib/i18n';
import Footline from '@/components/Footline';
import LeafRule from '@/components/LeafRule';

type LandingData = {
  h1: string;
  lead: string;
  body: string[];
  sections: { h: string; p: string }[];
};

export default function LandingContent({
  locale,
  landingKey,
}: {
  locale: Locale;
  landingKey: 'latte' | 'zizkov' | 'ceremonial' | 'togo';
}) {
  const t = getT(locale);
  const data = (getMessages(locale) as unknown as { landing: Record<string, LandingData> }).landing[landingKey];

  return (
    <main id="main">
      <div className="container">
        <div className="page-head">
          <LeafRule marginBottom="1rem" />
          <h1>{data.h1}</h1>
        </div>

        <div className="prose lp-prose">
          <p className="lead">{data.lead}</p>
          {data.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>

        <div className="lp-sections">
          {data.sections.map((s, i) => (
            <section key={i} className="lp-section reveal">
              <h2>{s.h}</h2>
              <p>{s.p}</p>
            </section>
          ))}
        </div>

        <div className="lp-cta">
          <Link className="reserve-cta" href={pathFor(locale, 'menu')}>
            {t('lpCtaMenu')}
          </Link>
          <Link className="cafe-cta" href={pathFor(locale, 'contact')}>
            <span>{t('lpCtaContact')}</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>

        <Footline locale={locale} />
      </div>
    </main>
  );
}
