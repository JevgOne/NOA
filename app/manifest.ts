import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'NOA Matcha Café',
    short_name: 'NOA Matcha',
    description: 'Prémiová matcha kavárna — Husitská 55, Praha 3 (Žižkov).',
    start_url: '/cs',
    display: 'standalone',
    background_color: '#EAD9BD',
    theme_color: '#33401F',
    lang: 'cs',
    categories: ['food', 'lifestyle'],
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  };
}
