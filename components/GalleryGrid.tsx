'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

export type GalleryItem = { src: string; large: string; alt: string; wide?: boolean };

export default function GalleryGrid({
  items,
  labels,
}: {
  items: GalleryItem[];
  labels: { close: string; prev: string; next: string };
}) {
  const [idx, setIdx] = useState<number | null>(null);
  const open = idx !== null;

  const close = useCallback(() => setIdx(null), []);
  const step = useCallback(
    (delta: number) => setIdx((v) => (v === null ? v : (v + delta + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowRight') step(1);
      else if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close, step]);

  return (
    <>
      <div className="gallery">
        {items.map((p, i) => (
          <figure key={i} className={`gphoto${p.wide ? ' wide' : ''}`}>
            <button type="button" className="gphoto-btn" onClick={() => setIdx(i)} aria-label={p.alt}>
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(max-width: 560px) 100vw, (max-width: 820px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                loading={i < 3 ? 'eager' : 'lazy'}
              />
              <div className="frame" />
            </button>
          </figure>
        ))}
      </div>

      {open && idx !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={items[idx].alt} onClick={close}>
          <button type="button" className="lb-btn lb-close" aria-label={labels.close} onClick={close}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <button
            type="button"
            className="lb-btn lb-prev"
            aria-label={labels.prev}
            onClick={(e) => {
              e.stopPropagation();
              step(-1);
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <figure className="lb-stage" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={items[idx].large} alt={items[idx].alt} />
            <figcaption>{items[idx].alt}</figcaption>
          </figure>
          <button
            type="button"
            className="lb-btn lb-next"
            aria-label={labels.next}
            onClick={(e) => {
              e.stopPropagation();
              step(1);
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
