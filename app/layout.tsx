import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
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
  title: "SOFIANE LAHCEN",
  description:
    "Paris-based multidisciplinary creative Sofiane Lahcen specialises in art direction for fashion, beauty, and luxury brands.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
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
