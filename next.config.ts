import type { NextConfig } from "next";

// Sent on every response: no framing by other sites, no MIME sniffing, a short referrer to other sites, and no camera,
// microphone or location. HSTS only in production, so localhost over http is not pinned to https.
const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  ...(process.env.NODE_ENV === "production"
    ? [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" }]
    : []),
];

// Pages from before the rebrand (2026-11-19): the kits page and the old AI automation services. Links to them out in
// the world land on the services list instead of a 404.
const OLD_SERVICES = [
  "audit",
  "workflows",
  "lead-response",
  "chat-agent",
  "voice",
  "crm",
  "documents",
  "website",
  "content",
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/products", destination: "/services", permanent: true },
      ...OLD_SERVICES.map((id) => ({ source: `/services/${id}`, destination: "/services", permanent: true })),
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  cacheComponents: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
