'use client';

import { useEffect, useState } from 'react';
import { type Locale, getT } from '@/lib/i18n';
import { business } from '@/lib/site';

const DAY_ORDER = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

type Status = { open: boolean; time: string };

// Spočítá stav podle reálného času v časovém pásmu Prahy (nezávisle na poloze návštěvníka).
function computeStatus(): Status {
  const now = new Date();
  const dayName = new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Prague', weekday: 'long' }).format(now);
  const hm = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Prague',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(now); // "14:05"
  const [h, m] = hm.split(':').map(Number);
  const mins = h * 60 + m;

  const specFor = (name: string) => business.openingHours.find((s) => (s.days as readonly string[]).includes(name));
  const toMin = (t: string) => {
    const [hh, mm] = t.split(':').map(Number);
    return hh * 60 + mm;
  };

  const today = specFor(dayName);
  if (today) {
    const opens = toMin(today.opens);
    const closes = toMin(today.closes);
    if (mins >= opens && mins < closes) return { open: true, time: today.closes };
    if (mins < opens) return { open: false, time: today.opens };
  }
  // Najdi nejbližší další otvírací čas (dnes už zavřeno nebo dnes zavíráno).
  const startIdx = DAY_ORDER.indexOf(dayName);
  for (let i = 1; i <= 7; i++) {
    const next = specFor(DAY_ORDER[(startIdx + i) % 7]);
    if (next) return { open: false, time: next.opens };
  }
  return { open: false, time: '' };
}

export default function OpenStatus({ locale, className = '' }: { locale: Locale; className?: string }) {
  const t = getT(locale);
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    const update = () => setStatus(computeStatus());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  // Před hydratací nic (aby nevznikl mismatch — čas se počítá až v prohlížeči).
  if (!status) return null;

  const detail = (status.open ? t('statusClosesAt') : t('statusOpensAt')).replace('{time}', status.time);
  const main = status.open ? t('statusOpen') : t('statusClosed');

  return (
    <span className={`open-status${className ? ' ' + className : ''}`} data-open={status.open ? 'true' : 'false'}>
      <span className="dot" aria-hidden="true" />
      <span className="os-main">{main}</span>
      <span className="os-sep" aria-hidden="true">·</span>
      <span className="os-detail">{detail}</span>
    </span>
  );
}
