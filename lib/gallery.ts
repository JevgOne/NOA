// Placeholder fotky z Unsplash (ověřené 200). Nahraď vlastními fotkami kavárny:
// buď zde vyměň `id` za jiné Unsplash foto, nebo dej vlastní soubory do /public
// a změň `photoUrl` na lokální cestu.

export type GalleryPhoto = { id: string; altKey: string; wide?: boolean };

export const galleryPhotos: GalleryPhoto[] = [
  { id: '1536256263959-770b48d82b0a', altKey: 'ga1', wide: true },
  { id: '1519082274554-1ca37fb8abb7', altKey: 'ga2' },
  { id: '1461023058943-07fcbe16d735', altKey: 'ga3' },
  { id: '1497935586351-b67a49e012bf', altKey: 'ga4' },
  { id: '1515823662972-da6a2e4d3002', altKey: 'ga5' },
  { id: '1464305795204-6f5bbfc7fb81', altKey: 'ga6', wide: true },
  { id: '1509042239860-f550ce710b93', altKey: 'ga7' },
  { id: '1495474472287-4d71bcdd2085', altKey: 'ga8' },
];

export function photoUrl(id: string, w = 1100): string {
  return `https://images.unsplash.com/photo-${id}?fm=jpg&q=72&w=${w}&auto=format&fit=crop`;
}
