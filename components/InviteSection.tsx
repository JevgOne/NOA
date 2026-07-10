import Link from 'next/link';
import { type Locale, getT, pathFor } from '@/lib/i18n';

export default function InviteSection({ locale }: { locale: Locale }) {
  const t = getT(locale);
  return (
    <div className="invite reveal">
      <div className="eyebrow">{t('inviteEy')}</div>
      <h2>{t('inviteH')}</h2>
      <div className="meta">
        <div>
          <div className="k">{t('inviteAddrK')}</div>
          <div className="v">Národní 12, Praha 1</div>
        </div>
        <div>
          <div className="k">{t('inviteHoursK')}</div>
          <div className="v">{t('inviteHoursV')}</div>
        </div>
      </div>
      <Link className="btn" href={pathFor(locale, 'contact')}>
        <span>{t('inviteBtn')}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </Link>
    </div>
  );
}
