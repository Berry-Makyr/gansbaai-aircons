import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Inter, Outfit } from "next/font/google";
import localFont from "next/font/local";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const slipstream = localFont({
  src: "./fonts/slipstream.ttf",
  variable: "--font-slipstream",
  display: "swap",
  fallback: ["Arial Black", "Arial", "sans-serif"],
});

const snowcaps = localFont({
  src: "./fonts/snowcaps.ttf",
  variable: "--font-snowcaps",
  display: "swap",
  fallback: ["Impact", "Arial Black", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Gansbaai Aircon | Air Conditioning & Refrigeration | Overstrand",
  description:
    "Professional air conditioning and refrigeration services in Gansbaai, Overstrand, and Overberg areas. Regulating the temperature since 2005.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/brand/favicon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/brand/favicon-96.png", type: "image/png", sizes: "96x96" },
      { url: "/brand/favicon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon", type: "image/png", sizes: "512x512" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/brand/favicon-192.png", sizes: "192x192", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} ${slipstream.variable} ${snowcaps.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-inter)]">
        {children}
        {gaMeasurementId ? (
          <GoogleAnalytics measurementId={gaMeasurementId} />
        ) : null}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
