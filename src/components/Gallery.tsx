"use client";

import { useState } from "react";
import Image from "next/image";
import { Images } from "lucide-react";
import type { ClientGalleryItem } from "@/lib/cms/prepare";
import {
  galleryCategoryLabels,
  galleryCategoryOrder,
  type GalleryCategory,
} from "@/data/gallery";
import SectionHeading from "@/components/SectionHeading";
import LightboxDialog from "@/components/LightboxDialog";

type GalleryProps = {
  images: ClientGalleryItem[];
};

type GalleryGroup = {
  category: string;
  label: string;
  images: ClientGalleryItem[];
};

function categoryLabel(category: string): string {
  return (
    galleryCategoryLabels[category as GalleryCategory] ?? category
  );
}

function groupGalleryImages(images: ClientGalleryItem[]): GalleryGroup[] {
  const byCategory = new Map<string, ClientGalleryItem[]>();

  for (const image of images) {
    const existing = byCategory.get(image.category);
    if (existing) {
      existing.push(image);
    } else {
      byCategory.set(image.category, [image]);
    }
  }

  const ordered: GalleryGroup[] = [];

  for (const category of galleryCategoryOrder) {
    const groupImages = byCategory.get(category);
    if (!groupImages?.length) continue;
    ordered.push({
      category,
      label: categoryLabel(category),
      images: groupImages,
    });
    byCategory.delete(category);
  }

  for (const [category, groupImages] of byCategory) {
    ordered.push({
      category,
      label: categoryLabel(category),
      images: groupImages,
    });
  }

  return ordered;
}

export default function Gallery({ images }: GalleryProps) {
  const groups = groupGalleryImages(images);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const activeImages =
    groups.find((group) => group.category === activeCategory)?.images ?? [];

  const openCategory = (category: string, index = 0) => {
    setActiveCategory(category);
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    setActiveCategory(null);
  };

  return (
    <section id="gallery" className="py-24 bg-white" aria-labelledby="gallery-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="gallery-heading"
          eyebrow="Our Work"
          title="Recent Projects & Installations"
          description="Browse projects by category. Open a category to view the full photo set without scrolling through every image on the page."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {groups.map((group) => {
            const previews = group.images.slice(0, 4);
            const remaining = Math.max(group.images.length - previews.length, 0);

            return (
              <button
                key={group.category}
                type="button"
                onClick={() => openCategory(group.category, 0)}
                className="section-card group text-left p-3.5 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 hover:-translate-y-0.5 transition-transform"
                aria-label={`Open ${group.label} gallery, ${group.images.length} photos`}
              >
                <div className="grid grid-cols-2 gap-1.5 mb-3.5">
                  {previews.map((item, index) => (
                    <span
                      key={item.id}
                      className="relative aspect-square overflow-hidden rounded-lg bg-slate-100"
                    >
                      <Image
                        src={item.src}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 45vw, (max-width: 1280px) 20vw, 12vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        loading={index < 2 ? "eager" : "lazy"}
                      />
                      {index === previews.length - 1 && remaining > 0 && (
                        <span className="absolute inset-0 flex items-center justify-center bg-slate-950/55 text-white text-sm font-semibold tracking-wide">
                          +{remaining}
                        </span>
                      )}
                    </span>
                  ))}
                  {Array.from({ length: Math.max(0, 4 - previews.length) }).map(
                    (_, index) => (
                      <span
                        key={`empty-${group.category}-${index}`}
                        className="aspect-square rounded-lg bg-slate-100"
                        aria-hidden="true"
                      />
                    )
                  )}
                </div>

                <div className="flex items-start justify-between gap-3 px-0.5 pb-0.5">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {group.label}
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {group.images.length}{" "}
                      {group.images.length === 1 ? "photo" : "photos"}
                    </p>
                  </div>
                  <span
                    className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600 transition-colors group-hover:bg-sky-100"
                    aria-hidden="true"
                  >
                    <Images className="h-5 w-5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <LightboxDialog
        images={activeImages}
        selectedIndex={selectedIndex}
        onIndexChange={setSelectedIndex}
        onClose={closeLightbox}
      />
    </section>
  );
}
