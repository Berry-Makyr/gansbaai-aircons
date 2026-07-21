import type { ServiceItem } from "@/data/services";
import type { GalleryCategory } from "@/data/gallery";

export type CmsImage = {
  url: string;
  alt?: string;
  lqip?: string;
  width?: number;
  height?: number;
};

export type SiteSettingsContent = {
  name: string;
  shortName: string;
  tagline: string;
  establishedYear: number;
  phone: { display: string; tel: string };
  emergencyPhone: { display: string; tel: string };
  whatsapp: { number: string; defaultMessage: string };
  email: string;
  address: { line1: string; line2: string; full: string };
  serviceArea: string;
  businessHours: string;
  facebook: string;
  google: {
    mapsEmbedUrl: string;
    mapsDirectionsUrl: string;
    mapsOpenUrl: string;
    reviewsUrl: string;
    leaveReviewUrl: string;
  };
  seoTitle: string;
  seoDescription: string;
};

export type HeroContent = {
  badgeText: string;
  headlinePrefix: string;
  tagline: string;
  description: string;
  quoteCtaText: string;
  backgroundImage: CmsImage | string;
  backgroundImageAlt: string;
};

export type SectionHeadingContent = {
  eyebrow: string;
  title: string;
  description: string;
};

export type WhyChooseUsContent = SectionHeadingContent & {
  items: { title: string; description: string }[];
};

export type CommunityOutreachContent = SectionHeadingContent & {
  message: string;
  closingLine: string;
  hashtags: string[];
  featuredImage: CmsImage | string;
  featuredImageAlt: string;
  galleryImages: (CmsImage | string)[];
};

export type LegacyContent = SectionHeadingContent & {
  milestones: { year: string; title: string; description: string }[];
};

export type DealerContent = {
  name: string;
  logoAlt: string;
  logo: CmsImage | string | null;
};

export type DealersSectionContent = SectionHeadingContent & {
  dealers: DealerContent[];
};

export type ReviewContent = {
  id: string;
  author: string;
  text: string;
  rating: number;
  isPlaceholder: boolean;
};

export type ReviewsSectionContent = SectionHeadingContent & {
  reviews: ReviewContent[];
};

export type ServiceContent = ServiceItem & {
  iconImage?: CmsImage | null;
};

export type GalleryItemContent = {
  id: string | number;
  title: string;
  alt: string;
  category: GalleryCategory;
  showInProjectGallery: boolean;
  image: CmsImage | string;
};

export type HomepageContent = {
  siteSettings: SiteSettingsContent;
  hero: HeroContent;
  whyChooseUs: WhyChooseUsContent;
  communityOutreach: CommunityOutreachContent;
  legacy: LegacyContent;
  dealersSection: DealersSectionContent;
  reviewsSection: ReviewsSectionContent;
  services: ServiceContent[];
  gallery: GalleryItemContent[];
};
