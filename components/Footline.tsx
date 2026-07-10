import { type Locale, getT } from '@/lib/i18n';

const Leaf = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.1" aria-hidden="true">
    <path d="M12 3C7 6 5 11 5 15c0 3 2 6 7 6 0-6 0-12 0-18Z" />
  </svg>
);

export default function Footline({ locale }: { locale: Locale }) {
  const t = getT(locale);
  return (
    <div className="footline">
      <Leaf />
      <span>{t('footline')}</span>
      <Leaf />
    </div>
  );
}
