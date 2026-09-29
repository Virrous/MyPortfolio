import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Poppins } from "next/font/google";
import {
  siteConfig,
  personSchema,
  organizationSchema,
  websiteSchema,
} from "@/lib/site";
import { JsonLdGraph } from "@/lib/jsonld";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import "@/styles/base.css";

// Display face. Geometric and even, so headlines read as confident rather than
// decorative. Previous serif pairing felt ornamental next to the body text.
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

// Body and UI face. Humanist grotesk with generous counters, which holds up
// at the small sizes used for captions and form labels.
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-jakarta",
});

const fullTitle = `${siteConfig.name} · ${siteConfig.role}, ${siteConfig.companyName}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: fullTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.companyName,
  keywords: [...siteConfig.keywords],
  alternates: { canonical: "/" },
  // og:image / twitter:image are supplied by the opengraph-image and
  // twitter-image file conventions in this directory.
  openGraph: {
    type: "profile",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: fullTitle,
    description: siteConfig.description,
    locale: siteConfig.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: fullTitle,
    description: siteConfig.shortDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

// Browser chrome is painted before any stylesheet, so the single declared
// theme color must match the one palette the site ships. No media query: the
// site is dark for every visitor, including those whose OS prefers light.
const themeColor = "#101112";

export const viewport: Viewport = {
  themeColor,
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${jakarta.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <JsonLdGraph
          nodes={[personSchema, organizationSchema, websiteSchema]}
        />
      </body>
    </html>
  );
}
