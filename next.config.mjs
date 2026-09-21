/** @type {import('next').NextConfig} */
const nextConfig = {
  // Kavárna se přestěhovala ze Žižkova — staré URL landing page přesměrovat (SEO).
  async redirects() {
    return [
      { source: '/cs/kavarna-zizkov', destination: '/cs/kavarna-stare-mesto', permanent: true },
      { source: '/en/cafe-zizkov', destination: '/en/cafe-old-town', permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
};

export default nextConfig;
