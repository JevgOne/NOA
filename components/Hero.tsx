import { type Locale, getT } from '@/lib/i18n';

export default function Hero({ locale }: { locale: Locale }) {
  const t = getT(locale);
  return (
    <section className="hero" id="hero">
      <svg className="hero-leaf a" viewBox="0 0 100 120" fill="currentColor" aria-hidden="true">
        <path d="M50 5C25 25 15 55 15 78c0 22 15 37 35 37 0-40 0-70 0-110Z" />
      </svg>
      <svg className="hero-leaf b" viewBox="0 0 100 120" fill="currentColor" aria-hidden="true">
        <path d="M50 5C25 25 15 55 15 78c0 22 15 37 35 37 0-40 0-70 0-110Z" />
      </svg>
      <div className="hero-inner" id="heroInner">
        <h1 className="h-logo">NOA</h1>
        <div className="h-sub">MATCHA</div>
        <div className="h-cafe">{t('heroCafe')}</div>
        <div className="h-rule">
          <span className="l" />
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
            <path d="M12 3C7 6 5 11 5 15c0 3 2 6 7 6 0-6 0-12 0-18Z" />
            <path d="M12 6c3 2 4 5 4 8" />
          </svg>
          <span className="l" />
        </div>
        <div className="h-tag">{t('heroTag')}</div>
      </div>
      <a className="scroll-cue" href="#main">
        <span>{t('scrollCue')}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </a>
    </section>
  );
}
