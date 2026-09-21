'use client';

import { useEffect, useState } from 'react';
import { type Locale, getT } from '@/lib/i18n';
import { business } from '@/lib/site';

// "08:00" -> "8:00"
const fmt = (t: string) => t.replace(/^0/, '');

// Otevírací doba z lib/site.ts; dnešní řádek se zvýrazní až v prohlížeči (čas v Europe/Prague).
export default function HoursTable({ locale }: { locale: Locale }) {
  const t = getT(locale);
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    setToday(new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Prague', weekday: 'long' }).format(new Date()));
  }, []);

  const rows = [
    ...business.openingHours.map((h) => ({ label: h.label, days: h.days as readonly string[], value: `${fmt(h.opens)} – ${fmt(h.closes)}`, closed: false })),
    ...business.closedDays.map((c) => ({ label: c.label, days: c.days as readonly string[], value: t('closed'), closed: true })),
  ];

  return (
    <ul className="hours-list">
      {rows.map((r) => {
        const isToday = today !== null && r.days.includes(today);
        return (
          <li key={r.label} className={`${isToday ? 'is-today' : ''}${r.closed ? ' is-closed' : ''}`.trim() || undefined}>
            <span className="hl-day">
              {t(r.label)}
              {isToday && <span className="hl-today">{t('cToday')}</span>}
            </span>
            <span className="hl-time">{r.value}</span>
          </li>
        );
      })}
    </ul>
  );
}
