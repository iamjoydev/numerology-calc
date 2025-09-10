/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enables strict mode for detecting potential issues
  swcMinify: true, // Faster & optimized builds using Next.js SWC compiler
  poweredByHeader: false, // Removes "X-Powered-By" for security

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
