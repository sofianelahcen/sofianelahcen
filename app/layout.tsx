import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import {
  siteDescription,
  siteName,
  siteTitle,
  siteUrl,
} from "@/lib/site-config";
import "./globals.css";

const sackersGothic = localFont({
  src: "./fonts/Sackers-Gothic-Medium.woff2",
  weight: "500",
  style: "normal",
  display: "swap",
  variable: "--font-sackers-gothic",
  fallback: ["ui-sans-serif", "system-ui", "sans-serif"],
});

const monumentGrotesk = localFont({
  src: "./fonts/MonumentGroteskPlusVariable.woff2",
  weight: "200 1000",
  style: "normal",
  display: "swap",
  variable: "--font-monument-grotesk",
  fallback: ["ui-monospace", "SFMono-Regular", "monospace"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s — ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  keywords: [
    "Sofiane Lahcen",
    "art direction",
    "image making",
    "creative direction",
    "fashion photography",
    "beauty photography",
    "luxury branding",
    "brand strategy",
    "Paris",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    siteName,
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    locale: "en_GB",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sackersGothic.variable} ${monumentGrotesk.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
