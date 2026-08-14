import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "img-src 'self' data: blob: https://cdn.sanity.io https://*.google.com https://*.gstatic.com https://*.googleapis.com https://*.google-analytics.com https://*.googletagmanager.com",
      "font-src 'self' data:",
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
      "connect-src 'self' https://*.sanity.io https://*.api.sanity.io wss://*.sanity.io https://cdn.sanity.io https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
      "frame-src 'self' https://www.google.com https://maps.google.com https://www.google.co.za",
      "form-action 'self'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const studioSecurityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  // Studio needs to frame itself and load Sanity assets; do not send DENY here.
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "img-src 'self' data: blob: https://cdn.sanity.io https://*.sanity.io https://*.google.com https://*.gstatic.com https://*.ggpht.com",
      "font-src 'self' data: https://cdn.sanity.io https://fonts.gstatic.com",
      "style-src 'self' 'unsafe-inline' https://cdn.sanity.io https://fonts.googleapis.com",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://core.sanity-cdn.com https://cdn.sanity.io https://www.gstatic.com https://*.google.com",
      "connect-src 'self' https://*.sanity.io https://*.api.sanity.io wss://*.sanity.io https://cdn.sanity.io https://core.sanity-cdn.com https://*.google.com https://*.googleapis.com",
      "frame-src 'self' https://*.sanity.io https://lookerstudio.google.com https://datastudio.google.com",
      "worker-src 'self' blob:",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/services/Fishing-Vessel-Refrigeration-",
        destination: "/services/fishing-vessel",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/studio/:path*",
        headers: studioSecurityHeaders,
      },
      {
        source: "/((?!studio).*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
