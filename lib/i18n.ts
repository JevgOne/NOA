import cs from '@/messages/cs.json';
import en from '@/messages/en.json';

export const locales = ['cs', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'cs';

export type PageKey = 'home' | 'menu' | 'about' | 'contact';

// Lokalizované slugy. Prázdný slug = domovská stránka /[locale].
export const slugForPage: Record<Locale, Record<PageKey, string>> = {
  cs: { home: '', menu: 'menu', about: 'o-nas', contact: 'kontakt' },
  en: { home: '', menu: 'menu', about: 'about', contact: 'contact' },
};

// Reverzní mapa slug -> PageKey pro daný jazyk (bez domovské stránky).
export const pageForSlug: Record<Locale, Record<string, PageKey>> = {
  cs: { menu: 'menu', 'o-nas': 'about', kontakt: 'contact' },
  en: { menu: 'menu', about: 'about', contact: 'contact' },
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Vytvoří cestu k dané stránce v daném jazyce, např. pathFor('en','about') -> "/en/about".
export function pathFor(locale: Locale, page: PageKey): string {
  const slug = slugForPage[locale][page];
  return slug ? `/${locale}/${slug}` : `/${locale}`;
}

// Alternates pro hreflang + canonical: mapuje každý jazyk (a x-default) na jeho URL.
export function languageAlternates(page: PageKey): Record<string, string> {
  return {
    cs: pathFor('cs', page),
    en: pathFor('en', page),
    'x-default': pathFor(defaultLocale, page),
  };
}

// Z aktuální cesty najde ekvivalentní URL v cílovém jazyce (pro přepínač jazyků).
export function alternatePath(pathname: string, target: Locale): string {
  const parts = pathname.split('/').filter(Boolean); // ["cs"] | ["cs","o-nas"]
  const current = parts[0];
  if (!current || !isLocale(current)) return `/${target}`;
  const slug = parts[1];
  if (!slug) return pathFor(target, 'home');
  const page = pageForSlug[current as Locale]?.[slug];
  if (!page) return `/${target}`;
  return pathFor(target, page);
}

const messages = { cs, en } as const;
export type Messages = typeof cs;

export function getMessages(locale: Locale): Messages {
  return messages[locale];
}

// Malý translator vázaný na jazyk. `t('key')` vrátí string, chybějící klíč vrátí klíč.
export function getT(locale: Locale) {
  const dict = messages[locale] as Record<string, unknown>;
  return (key: string): string => {
    const value = dict[key];
    return typeof value === 'string' ? value : key;
  };
}
