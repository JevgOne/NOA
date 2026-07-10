import { type Locale, getT } from '@/lib/i18n';

export default function QualityStrip({ locale }: { locale: Locale }) {
  const t = getT(locale);
  return (
    <div className="quality reveal">
      <div className="qcell">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
          <path d="M12 3C8 6 6 10 6 14c0 3 2 5 6 5s6-2 6-5c0-4-2-8-6-11Z" />
          <path d="M12 6v12" />
        </svg>
        <div className="cap" dangerouslySetInnerHTML={{ __html: t('q1') }} />
      </div>
      <div className="qcell">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
          <path d="M9 4h6v3a3 3 0 0 1-6 0Z" />
          <path d="M12 10v4M8 20h8l-1-4H9Z" />
        </svg>
        <div className="cap" dangerouslySetInnerHTML={{ __html: t('q2') }} />
      </div>
      <div className="qcell">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
          <path d="M12 4C9 8 7 12 12 20c5-8 3-12 0-16Z" />
          <path d="M12 8v9" />
        </svg>
        <div className="cap" dangerouslySetInnerHTML={{ __html: t('q3') }} />
      </div>
      <div className="qcell">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
          <path d="M4 19 12 6l8 13Z" />
          <path d="M8.5 15l3.5-2.5L15.5 15" />
        </svg>
        <div className="cap" dangerouslySetInnerHTML={{ __html: t('q4') }} />
      </div>
    </div>
  );
}
