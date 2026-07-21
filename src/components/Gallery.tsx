"use client";

import { useState } from "react";
import Image from "next/image";
import { ZoomIn } from "lucide-react";
import type { ClientGalleryItem } from "@/lib/cms/prepare";
import SectionHeading from "@/components/SectionHeading";
import LightboxDialog from "@/components/LightboxDialog";

type GalleryProps = {
  images: ClientGalleryItem[];
};

export default function Gallery({ images }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-24 bg-white" aria-labelledby="gallery-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Our Work"
          title="Recent Projects & Installations"
          description="Take a look at some of our completed work, showcasing our commitment to neat, professional, and high-quality service."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((item, index) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedIndex(index)}
              className="group relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer shadow-md bg-slate-100 text-left focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2"
              aria-label={`View ${item.title} — ${item.category}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                loading={index < 6 ? "eager" : "lazy"}
              />

              <div
                className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/40 transition-all duration-300 z-10 flex items-center justify-center"
                aria-hidden="true"
              >
                <ZoomIn className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300" />
              </div>

              <div
                className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 translate-y-4 group-hover:translate-y-0"
                aria-hidden="true"
              >
                <p className="text-sky-300 text-xs font-semibold uppercase tracking-wider mb-1">
                  {item.category}
                </p>
                <p className="text-white font-medium">{item.title}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <LightboxDialog
        images={images}
        selectedIndex={selectedIndex}
        onIndexChange={setSelectedIndex}
        onClose={() => setSelectedIndex(null)}
      />
    </section>
  );
}
