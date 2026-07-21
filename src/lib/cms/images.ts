import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/sanity/lib/image";
import type { CmsImage } from "./types";

export function isCmsImage(value: CmsImage | string | null | undefined): value is CmsImage {
  return typeof value === "object" && value !== null && "url" in value && !!value.url;
}

export function resolveImageSrc(
  value: CmsImage | string | SanityImageSource | null | undefined,
  width = 1200
): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  if (isCmsImage(value as CmsImage | string)) {
    return (value as CmsImage).url;
  }
  return urlFor(value as SanityImageSource).width(width).auto("format").url();
}

export function resolveImageProps(
  value: CmsImage | string | null | undefined,
  fallbackAlt: string,
  width = 1200
) {
  const src = resolveImageSrc(value, width);
  const alt = isCmsImage(value) ? value.alt || fallbackAlt : fallbackAlt;
  const blurDataURL = isCmsImage(value) ? value.lqip : undefined;
  const imageWidth = isCmsImage(value) ? value.width : undefined;
  const imageHeight = isCmsImage(value) ? value.height : undefined;

  return { src, alt, blurDataURL, imageWidth, imageHeight };
}
