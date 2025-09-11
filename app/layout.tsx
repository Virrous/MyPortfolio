import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ashes Pokhrel",
  description:
    "Professional portfolio of Ashes Pokhrel - Python Developer specializing in Web Applications, Blockchain Smart Contracts, and AI/ML Solutions",
  keywords: [
    "Python Developer",
    "Blockchain",
    "Smart Contracts",
    "AI",
    "Machine Learning",
    "Web Development",
  ],
  authors: [{ name: "Ashes Pokhrel" }],
  creator: "Ashes Pokhrel",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ashespokhrel.dev",
    title: "Ashes Pokhrel",
    description:
      "Professional portfolio showcasing Python web development, blockchain smart contracts, and AI/ML projects",
    siteName: "Ashes Pokhrel Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashes Pokhrel",
    description:
      "Professional portfolio showcasing Python web development, blockchain smart contracts, and AI/ML projects",
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          {children}
          <Toaster />
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
