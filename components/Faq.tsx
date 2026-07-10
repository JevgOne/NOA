import { type Locale, getT, getMessages } from '@/lib/i18n';
import { faqSchema } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';

export default function Faq({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const faq = (getMessages(locale) as unknown as { faq: { q: string; a: string }[] }).faq;

  return (
    <section className="faq reveal" aria-label={t('faqH')}>
      <div className="sec-title">
        <span className="l" />
        <h2>{t('faqH')}</h2>
        <span className="l" />
      </div>
      <div className="faq-list">
        {faq.map((f, i) => (
          <details key={i} className="faq-item">
            <summary>
              <span>{f.q}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </summary>
            <div className="faq-a">{f.a}</div>
          </details>
        ))}
      </div>
      <JsonLd data={faqSchema(locale)} />
    </section>
  );
}
