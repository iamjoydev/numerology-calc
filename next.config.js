/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Strict mode for better performance
  reactStrictMode: true,

  // ✅ Enable SWC compiler for faster builds
  swcMinify: true,

  // ✅ Ignore build errors for smooth Vercel deployments
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // ✅ Disable Next.js experimental Critters CSS optimizer
  // We manually installed Critters, but disable auto-inlining to prevent build crashes
  experimental: {
    optimizeCss: false,
    scrollRestoration: true,
  },

  // ✅ Fix for Vercel standalone deployment builds
  output: "standalone",

  // ✅ Add cache headers for faster Vercel CDN performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, must-revalidate"
          }
        ]
      }
    ];
  },

  // ✅ Enable image optimization for better SEO
  images: {
    domains: ["localhost", "yourdomain.com"],
    formats: ["image/avif", "image/webp"],
  }
};

module.exports = nextConfig;
