import { NextRequest, NextResponse } from 'next/server';

// Inline (edge runtime) — ať se do middleware nebalí překladové JSON.
const locales = ['cs', 'en'] as const;
const defaultLocale = 'cs';

function pickLocale(acceptLanguage: string | null): string {
  if (!acceptLanguage) return defaultLocale;
  const tags = acceptLanguage
    .split(',')
    .map((part) => {
      const [tag, q] = part.trim().split(';q=');
      return { lang: tag.split('-')[0].toLowerCase(), q: q ? parseFloat(q) : 1 };
    })
    .sort((a, b) => b.q - a.q);
  for (const { lang } of tags) {
    if ((locales as readonly string[]).includes(lang)) return lang;
  }
  return defaultLocale;
}

export function middleware(req: NextRequest) {
  const locale = pickLocale(req.headers.get('accept-language'));
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/'],
};
