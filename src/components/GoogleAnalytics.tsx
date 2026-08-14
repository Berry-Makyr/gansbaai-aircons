"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

type GoogleAnalyticsProps = {
  measurementId: string;
};

/** Loads GA4 on public pages only — never on /studio. */
export function GoogleAnalytics({ measurementId }: GoogleAnalyticsProps) {
  const pathname = usePathname();
  const id = measurementId.trim();

  if (!id || pathname?.startsWith("/studio")) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${id}');
        `}
      </Script>
    </>
  );
}
