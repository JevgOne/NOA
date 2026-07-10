import Link from 'next/link';
import { type Locale, getT, pathFor } from '@/lib/i18n';
import CafePhoto from '@/components/CafePhoto';

export default function CafeSection({ locale }: { locale: Locale }) {
  const t = getT(locale);
  return (
    <div className="cafe reveal">
      <CafePhoto alt={t('cafePhotoAlt')} />
      <div className="cafe-txt">
        <div className="eyebrow">{t('cafeEy')}</div>
        <h2>{t('cafeH')}</h2>
        <p className="lead">{t('cafeLead')}</p>
        <p>{t('cafeP')}</p>
        <Link className="cafe-cta" href={pathFor(locale, 'contact')}>
          <span>{t('cafeCta')}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
