/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: false,

  // ✅ Disable strict TypeScript & ESLint checks during Vercel build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // ✅ Enable experimental optimizations
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
a
 

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: false,

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
 // ✅ Fixes build errors on Vercel for static export
  output: "standalone",

  // ✅ Disable strict TypeScript & ESLint checks during Vercel build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // ✅ Optional: Custom headers for caching performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, must-revalidate" },
        ],
      },
    ];
  },
};
  // ✅ Avoid Critters breaking prerender builds
  experimental: {
    optimizeCss: false, // DISABLE broken automatic Critters optimization
    scrollRestoration: true,
  },

  output: "standalone",

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, must-revalidate" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
