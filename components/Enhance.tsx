'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Enhance() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ---- reveal on scroll ----
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>('.reveal:not(.in)'));
    let io: IntersectionObserver | undefined;
    if (reduce || !('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('in'));
    } else {
      io = new IntersectionObserver(
        (entries) =>
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.classList.add('in');
              io!.unobserve(en.target);
            }
          }),
        { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
      );
      revealEls.forEach((el) => io!.observe(el));
    }

    // ---- hero parallax ----
    const heroInner = document.getElementById('heroInner');
    const cue = document.querySelector<HTMLElement>('.scroll-cue');
    let ticking = false;
    let onScroll: (() => void) | undefined;

    if (!reduce && heroInner) {
      onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const y = window.scrollY;
          const vh = window.innerHeight || 800;
          if (y < vh) {
            heroInner.style.transform = `translateY(${-y * 0.15}px)`;
            heroInner.style.opacity = String(Math.max(0, 1 - y / (vh * 0.6)));
            if (cue) cue.style.opacity = String(Math.max(0, 1 - y / 200));
          }
          ticking = false;
        });
      };
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    return () => {
      io?.disconnect();
      if (onScroll) window.removeEventListener('scroll', onScroll);
    };
  }, [pathname]);

  return null;
}
