/** Canonical public site origin (www). */
export const SITE_URL = "https://www.gbaircon.co.za";

export const SITE_NAME = "Gansbaai Aircon & Refrigeration";

/** Absolute URL helper for metadata, sitemap, and structured data. */
export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

const ALLOWED_EMBED_HOSTS = new Set([
  "www.google.com",
  "google.com",
  "maps.google.com",
  "www.google.co.za",
  "google.co.za",
]);

const ALLOWED_LINK_HOSTS = new Set([
  ...ALLOWED_EMBED_HOSTS,
  "www.facebook.com",
  "facebook.com",
  "m.facebook.com",
  "wa.me",
  "api.whatsapp.com",
  "www.whatsapp.com",
]);

function hostnameOf(url: string): string | null {
  try {
    return new URL(url).hostname.toLowerCase();
  } catch {
    return null;
  }
}

/** Returns the URL only when it is an https Google Maps embed/link host. */
export function safeMapsEmbedUrl(url: string | undefined | null): string | null {
  if (!url) return null;
  const host = hostnameOf(url);
  if (!host || !ALLOWED_EMBED_HOSTS.has(host)) return null;
  if (!url.startsWith("https://")) return null;
  return url;
}

/** Returns the URL only when it is an allowlisted https outbound link. */
export function safeExternalUrl(url: string | undefined | null): string | null {
  if (!url) return null;
  const host = hostnameOf(url);
  if (!host || !ALLOWED_LINK_HOSTS.has(host)) return null;
  if (!url.startsWith("https://")) return null;
  return url;
}
