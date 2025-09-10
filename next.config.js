/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    appDir: true,
  },
  // ✅ Fixes prerender error for 404 & 500
  output: "standalone",
};

module.exports = nextConfig;

  // Enable image optimization
  images: {
    domains: ["localhost", "yourdomain.com"], // Update with your domain if needed
    formats: ["image/avif", "image/webp"],
  },

  // Internationalization support (Optional: Add Bengali/Hindi/English)
  i18n: {
    locales: ["en", "bn", "hi"],
    defaultLocale: "en",
  },

  // Experimental features for better performance on Vercel
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
    serverActions: true,
  },

  // Environment variables
  env: {
    APP_NAME: "Numerology Calculator",
    VERSION: "1.0.0",
  },
};

module.exports = nextConfig;


