import { resolveImageSrc } from "./images";
import type { GalleryItemContent } from "./types";

export type ClientGalleryItem = {
  id: string | number;
  title: string;
  alt: string;
  category: string;
  src: string;
};

export function prepareGalleryForClient(
  gallery: GalleryItemContent[]
): ClientGalleryItem[] {
  return gallery
    .filter((item) => item.showInProjectGallery)
    .map((item) => ({
      id: item.id,
      title: item.title,
      alt: item.alt,
      category: item.category,
      src: resolveImageSrc(item.image, 1200),
    }));
}
