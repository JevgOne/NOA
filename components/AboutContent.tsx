import { type Locale, getT } from '@/lib/i18n';
import Footline from '@/components/Footline';
import LeafRule from '@/components/LeafRule';

export default function AboutContent({ locale }: { locale: Locale }) {
  const t = getT(locale);
  return (
    <main id="main">
      <div className="container">
        <div className="page-head">
          <LeafRule marginBottom="1rem" />
          <h1>{t('aboutH')}</h1>
        </div>
        <div className="prose">
          <p className="lead">{t('aboutLead')}</p>
          <p>{t('aboutP1')}</p>
          <p>{t('aboutP2')}</p>
        </div>
        <div className="sec-title">
          <span className="l" />
          <h2>{t('valuesT')}</h2>
          <span className="l" />
        </div>
        <div className="values">
          <div className="value">
            <div className="ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h3>{t('v1t')}</h3>
            <p>{t('v1p')}</p>
          </div>
          <div className="value">
            <div className="ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
                <path d="M9 4h6v3a3 3 0 0 1-6 0Z" />
                <path d="M12 10v4M8 20h8l-1-4H9Z" />
              </svg>
            </div>
            <h3>{t('v2t')}</h3>
            <p>{t('v2p')}</p>
          </div>
          <div className="value">
            <div className="ico">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
            </div>
            <h3>{t('v3t')}</h3>
            <p>{t('v3p')}</p>
          </div>
        </div>
        <Footline locale={locale} />
      </div>
    </main>
  );
}
