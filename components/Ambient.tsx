'use client';

import { useEffect, useState } from 'react';

type Particle = { left: number; size: number; dur: number; delay: number; drift: number; rot: number };

// Jemné padající lístky matchy v pozadí. Renderuje se jen v prohlížeči (žádný SSR mismatch)
// a nikdy při prefers-reduced-motion.
export default function Ambient() {
  const [particles, setParticles] = useState<Particle[] | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const n = 12;
    const arr: Particle[] = Array.from({ length: n }, (_, i) => ({
      left: (i * 8.3 + Math.random() * 7) % 100,
      size: 7 + Math.random() * 9,
      dur: 16 + Math.random() * 16,
      delay: -Math.random() * 34,
      drift: (Math.random() * 2 - 1) * 44,
      rot: Math.random() * 360,
    }));
    setParticles(arr);
  }, []);

  if (!particles) return null;

  return (
    <div className="ambient" aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={i}
          className="mp"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
            ['--drift' as string]: `${p.drift}px`,
            ['--rot' as string]: `${p.rot}deg`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 3C7 6 5 11 5 15c0 3 2 6 7 6 0-6 0-12 0-18Z" />
          </svg>
        </span>
      ))}
    </div>
  );
}
