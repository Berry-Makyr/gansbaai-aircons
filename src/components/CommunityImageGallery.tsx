"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import LightboxDialog, {
  type LightboxImage,
} from "@/components/LightboxDialog";

type CommunityImageGalleryProps = {
  images: LightboxImage[];
};

export default function CommunityImageGallery({
  images,
}: CommunityImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 bg-pink-50/50">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className="group relative aspect-square rounded-xl overflow-hidden focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
            aria-label={`View ${image.title} full size`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <span
              className="absolute inset-0 flex items-center justify-center bg-slate-950/0 group-hover:bg-slate-950/35 group-focus-visible:bg-slate-950/35 transition-colors"
              aria-hidden="true"
            >
              <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity" />
            </span>
          </button>
        ))}
      </div>

      <LightboxDialog
        images={images}
        selectedIndex={selectedIndex}
        onIndexChange={setSelectedIndex}
        onClose={() => setSelectedIndex(null)}
      />
    </>
  );
}
