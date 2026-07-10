import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Admin — recenze',
};

// Samostatný root layout pro /admin (bez café navigace).
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body
        style={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          maxWidth: 820,
          margin: '0 auto',
          padding: '2rem 1.25rem 4rem',
          color: '#2a2a2a',
          background: '#f7f5f0',
          lineHeight: 1.5,
        }}
      >
        {children}
      </body>
    </html>
  );
}
