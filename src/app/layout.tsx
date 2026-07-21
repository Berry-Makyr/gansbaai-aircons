import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "Gansbaai Aircon | Air Conditioning & Refrigeration | Overstrand",
  description:
    "Professional air conditioning and refrigeration services in Gansbaai, Overstrand, and Overberg areas. Regulating the temperature since 2005.",
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
      </body>
    </html>
  );
}
