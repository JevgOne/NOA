# NOA Matcha Café — web

Produkční web kavárny **NOA Matcha Café** postavený v **Next.js 15 (App Router, TypeScript)**.
Server-side rendering, i18n na úrovni URL (`/cs`, `/en`) a plné SEO. Vizuál je převzatý 1:1
ze schváleného prototypu `noa-matcha.html`.

## Spuštění

```bash
npm install
npm run dev      # vývoj na http://localhost:3000
```

Produkční build a spuštění:

```bash
npm run build
npm run start
```

## Stack

- **Next.js 15** (App Router, React 19, TypeScript)
- **next/font/google** — Cinzel + EB Garamond (self-hosted, vč. `latin-ext` pro českou diakritiku)
- **next/image** — foto kavárny z Unsplash (`remotePatterns` v `next.config.mjs`), se SVG fallbackem
- Vlastní lehké i18n renderované **na serveru** (žádná runtime knihovna)
- Bez těžkých UI knihoven

## Struktura

```
app/
  [locale]/
    layout.tsx        # <html lang>, fonty, Nav/Footer, JSON-LD kavárny
    page.tsx          # Domů (hero + menu + kavárna + pozvací pásek)
    [slug]/page.tsx   # Menu / O nás / Kontakt (dispatcher přes mapu slugů)
  sitemap.ts          # dynamický sitemap.xml (všechny URL v obou jazycích)
  robots.ts           # robots.txt
  globals.css         # CSS 1:1 z prototypu (fonty přes CSS proměnné)
components/            # Hero, MenuSections, CafeSection, InviteSection, ...
lib/
  i18n.ts             # jazyky, mapy slugů, translator, alternates
  seo.ts              # buildMetadata() + JSON-LD (Cafe, Menu, Breadcrumb)
  site.ts             # údaje o provozovně (adresa, telefon, otevírací doba)
  menu.ts             # struktura a ceny menu
messages/
  cs.json, en.json    # všechny texty (vytažené z prototypu)
middleware.ts         # redirect / -> /cs|/en dle Accept-Language
```

## Routing

| URL | Stránka |
|-----|---------|
| `/` | redirect na `/cs` nebo `/en` (dle `Accept-Language`) |
| `/cs`, `/en` | Domů |
| `/cs/menu`, `/en/menu` | Menu (celý nápojový lístek) |
| `/cs/o-nas`, `/en/about` | O nás |
| `/cs/kontakt`, `/en/contact` | Kontakt |

Neplatný jazyk nebo slug → 404.

## Kde co měnit

- **Texty / překlady:** `messages/cs.json` a `messages/en.json` (klíče jsou stejné v obou jazycích).
- **Ceny a položky menu:** ceny jsou v komponentě `components/MenuSections.tsx` (a v `lib/menu.ts`
  pro JSON-LD). Při změně ceny uprav obojí, ať sedí i strukturovaná data.
- **Údaje o provozovně** (adresa, telefon, e-mail, otevírací doba, GPS): `lib/site.ts` — jedno
  místo, ze kterého čte Kontakt i JSON-LD.
- **Doména pro SEO:** `SITE_URL` v `lib/site.ts` (nyní placeholder `https://noamatcha.cz`).

## ⚠️ Doplnit před spuštěním do provozu

Kontaktní údaje jsou zatím **placeholder** — nahraď reálnými v `lib/site.ts`:

- `phone` / `phoneDisplay` (nyní `+420 777 123 456`)
- `email` (nyní `ahoj@noamatcha.cz`)
- `street` / `postalCode` / `city` (nyní `Národní 12, 110 00 Praha 1`)
- `geo` (nyní placeholder souřadnice)
- `sameAs` (odkazy na Instagram/Facebook — doplnit i `href` u ikon v `components/ContactContent.tsx`)

Dále:

- **OG obrázek:** přidej `public/og.png` (1200×630). Metadata na něj už odkazují (`OG_IMAGE` v `lib/site.ts`).
- **Doména:** až bude známá, změň `SITE_URL` v `lib/site.ts`.

## Přidání dalšího jazyka

1. Přidej kód jazyka do `locales` v `lib/i18n.ts` a doplň `slugForPage` + `pageForSlug`.
2. Vytvoř `messages/<locale>.json` (zkopíruj strukturu z `cs.json`).
3. Přidej podset fontu (pokud jazyk potřebuje jiné znaky) v `app/[locale]/layout.tsx`.
4. Doplň `ogLocale` v `lib/seo.ts`.

## Recenze (databáze Turso + moderace)

Návštěvníci můžou psát recenze na `/recenze` (`/reviews`). Nová recenze se uloží jako
**„čeká na schválení"** a zobrazí se až po schválení v adminu. Hodnocení (hvězdičky) i
`AggregateRating` / `Review` JSON-LD se počítají z **reálných schválených** recenzí.

### Potřebné proměnné prostředí

| Proměnná | Popis |
|----------|-------|
| `TURSO_DATABASE_URL` | URL Turso databáze (`libsql://...`). Bez ní běží lokální `local.db` (jen pro vývoj). |
| `TURSO_AUTH_TOKEN` | Auth token k Turso databázi. |
| `ADMIN_KEY` | Tajný klíč pro přístup do moderace `/admin/recenze?key=…`. |

### Založení Turso databáze

```bash
# instalace CLI: https://docs.turso.tech/quickstart
turso db create noa-matcha
turso db show noa-matcha --url          # -> TURSO_DATABASE_URL
turso db tokens create noa-matcha       # -> TURSO_AUTH_TOKEN
```

Proměnné nastav lokálně v `.env.local` a na Vercelu v **Project Settings → Environment
Variables**. Tabulka `reviews` se vytvoří automaticky při prvním použití a naseeduje se
3 ukázkovými recenzemi (**smaž je v adminu**, jsou to placeholdery).

### Moderace

Otevři `https://…/admin/recenze?key=TVŮJ_ADMIN_KEY` — uvidíš recenze čekající na schválení
(schválit / smazat) i schválené. Admin je `noindex` a mimo veřejnou navigaci.

> Bez nastavené Turso DB web funguje dál, jen sekce recenzí je prázdná a odeslání formuláře
> zahlásí chybu — jakmile doplníš env proměnné, vše naběhne.

## Nasazení

Připraveno pro **Vercel** (build `next build` prochází). Zatím bez nasazení — po připojení
repozitáře na Vercel se nastaví jen `SITE_URL` na finální doménu.

## Ověření SSR

Že jde o skutečný server-side rendering (a ne JS na klientu), ověříš přes `view-source`
nebo `curl` — obsah musí být přímo v HTML:

```bash
curl -s http://localhost:3000/cs | grep "Matcha Latte"        # najde text
curl -s http://localhost:3000/en/menu | grep "MenuItem"       # JSON-LD strukturovaná data
```

### Přehled vygenerovaných URL a jejich meta

| URL | `<title>` | canonical | JSON-LD |
|-----|-----------|-----------|---------|
| `/cs`, `/en` | NOA Matcha Café — … | self | CafeOrCoffeeShop |
| `/cs/menu`, `/en/menu` | Menu — NOA Matcha Café | self | Cafe + Menu/MenuItem + BreadcrumbList |
| `/cs/o-nas`, `/en/about` | O nás / About — … | self | Cafe + BreadcrumbList |
| `/cs/kontakt`, `/en/contact` | Kontakt / Contact — … | self | Cafe + BreadcrumbList |

Každá stránka má `hreflang` alternativy pro `cs`, `en` a `x-default`.
