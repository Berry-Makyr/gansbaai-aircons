import Image from "next/image";
import { Heart } from "lucide-react";
import { PLACEHOLDER_MARKER } from "@/data/business";
import { resolveImageProps } from "@/lib/cms/images";
import type { CommunityOutreachContent } from "@/lib/cms/types";
import SectionHeading from "@/components/SectionHeading";
import CommunityImageGallery from "@/components/CommunityImageGallery";

function PlaceholderText({ text }: { text: string }) {
  if (text.startsWith(PLACEHOLDER_MARKER)) {
    return (
      <span className="placeholder-marker" role="note">
        {text}
      </span>
    );
  }
  return <>{text}</>;
}

type CommunityOutreachProps = {
  content: CommunityOutreachContent;
};

export default function CommunityOutreach({ content }: CommunityOutreachProps) {
  const featured = resolveImageProps(
    content.featuredImage,
    content.featuredImageAlt,
    1200
  );
  const galleryImages = content.galleryImages.map((image, index) => {
    const resolved = resolveImageProps(
      image,
      `Reach for Recovery fundraiser photo ${index + 1}`,
      1200
    );

    return {
      id: `${resolved.src}-${index}`,
      src: resolved.src,
      alt: resolved.alt,
      title: `Reach for Recovery fundraiser photo ${index + 1}`,
      category: "Community Outreach",
    };
  });

  return (
    <section
      id="community"
      className="py-24 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100"
      aria-labelledby="community-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />

        <div className="bg-white rounded-3xl shadow-xl border border-pink-100 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative aspect-[4/3] lg:aspect-auto min-h-[280px]">
              <Image
                src={featured.src}
                alt={featured.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                placeholder={featured.blurDataURL ? "blur" : undefined}
                blurDataURL={featured.blurDataURL}
              />
              <div className="absolute top-4 left-4 bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2">
                <Heart className="w-4 h-4" aria-hidden="true" />
                Breast Cancer Awareness
              </div>
            </div>

            <div className="p-8 lg:p-10 flex flex-col justify-center">
              <p className="text-slate-800 text-lg leading-relaxed mb-6">
                <PlaceholderText text={content.message} />
              </p>

              <blockquote className="border-l-4 border-pink-400 pl-4 mb-6">
                <p className="text-xl font-semibold text-pink-800 italic">
                  &ldquo;{content.closingLine}&rdquo;
                </p>
              </blockquote>

              <div className="flex flex-wrap gap-2">
                {content.hashtags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <CommunityImageGallery images={galleryImages} />
        </div>
      </div>
    </section>
  );
}
