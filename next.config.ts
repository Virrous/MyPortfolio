import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Do not advertise the framework in response headers.
  poweredByHeader: false,

  // `qualities` defaults to [75] in Next 16; 88 is added for the hero portrait
  // so it stays crisp on high-DPI screens without shipping a much larger file.
  images: {
    qualities: [75, 88],
  },

  // Security headers for a static marketing site with one POST endpoint.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
