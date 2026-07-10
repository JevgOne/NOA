import { ImageResponse } from 'next/og';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'NOA Matcha Café — Husitská 55, Praha 3';

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  // Pouze latin-1 diakritika (á/é/í) — spolehlivě se vykreslí v defaultním fontu.
  const tagline = locale === 'en' ? 'Premium ceremonial matcha from Japan' : 'Ceremoniální matcha z Japonska';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #F0E3CB 0%, #EAD9BD 55%, #DEC9A6 100%)',
          color: '#33401F',
          fontFamily: 'serif',
          padding: 60,
        }}
      >
        <div style={{ display: 'flex', fontSize: 160, fontWeight: 700, letterSpacing: 24, lineHeight: 1 }}>NOA</div>
        <div style={{ display: 'flex', fontSize: 58, letterSpacing: 34, marginTop: 4 }}>MATCHA</div>
        <div style={{ display: 'flex', fontSize: 26, color: '#8A3B36', letterSpacing: 12, marginTop: 16 }}>CAFÉ</div>
        <div style={{ display: 'flex', fontSize: 30, color: '#5A5140', fontStyle: 'italic', marginTop: 40, textAlign: 'center', maxWidth: 900 }}>
          {tagline}
        </div>
        <div style={{ display: 'flex', fontSize: 26, color: '#6E6553', letterSpacing: 4, marginTop: 22 }}>
          Husitská 55 · Praha 3
        </div>
      </div>
    ),
    { ...size },
  );
}
