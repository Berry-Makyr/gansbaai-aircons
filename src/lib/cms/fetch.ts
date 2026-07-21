import { client } from "@/sanity/lib/client";
import { HOMEPAGE_QUERY } from "@/sanity/queries";
import { business, isPlaceholder } from "@/data/business";
import { services as defaultServices } from "@/data/services";
import { whyChooseUsItems } from "@/data/whyChooseUs";
import { communityOutreach as defaultCommunityData } from "@/data/community";
import { legacyMilestones } from "@/data/legacy";
import { dealers as defaultDealersData } from "@/data/dealers";
import { reviews as defaultReviews } from "@/data/reviews";
import {
  galleryImages as defaultGallery,
  projectGalleryImages,
  HERO_IMAGE,
} from "@/data/gallery";
import type {
  HomepageContent,
  SiteSettingsContent,
  HeroContent,
  WhyChooseUsContent,
  CommunityOutreachContent,
  LegacyContent,
  DealersSectionContent,
  ReviewsSectionContent,
  ServiceContent,
  GalleryItemContent,
  CmsImage,
} from "./types";
import { isCmsImage } from "./images";

type SanityHomepage = {
  siteSettings?: Partial<{
    businessName: string;
    shortName: string;
    tagline: string;
    establishedYear: number;
    phoneDisplay: string;
    phoneTel: string;
    emergencyPhoneDisplay: string;
    emergencyPhoneTel: string;
    whatsappNumber: string;
    whatsappDefaultMessage: string;
    email: string;
    addressLine1: string;
    addressLine2: string;
    serviceArea: string;
    businessHours: string;
    facebookUrl: string;
    googleMapsEmbedUrl: string;
    googleMapsDirectionsUrl: string;
    googleMapsOpenUrl: string;
    googleReviewsUrl: string;
    googleLeaveReviewUrl: string;
    seoTitle: string;
    seoDescription: string;
  }>;
  hero?: Partial<HeroContent & { backgroundImage?: CmsImage }>;
  whyChooseUs?: Partial<WhyChooseUsContent>;
  communityOutreach?: Partial<CommunityOutreachContent & {
    featuredImage?: CmsImage;
    galleryImages?: CmsImage[];
  }>;
  legacy?: Partial<LegacyContent>;
  dealersSection?: Partial<DealersSectionContent>;
  reviewsSection?: Partial<ReviewsSectionContent>;
  services?: Array<Partial<ServiceContent> & { id?: string; iconImage?: CmsImage | null }>;
  gallery?: Array<Partial<GalleryItemContent> & { image?: CmsImage }>;
};

function defaultSiteSettings(): SiteSettingsContent {
  return {
    name: business.name,
    shortName: business.shortName,
    tagline: business.tagline,
    establishedYear: business.establishedYear,
    phone: { ...business.phone },
    emergencyPhone: { ...business.emergencyPhone },
    whatsapp: { ...business.whatsapp },
    email: business.email,
    address: { ...business.address },
    serviceArea: business.serviceArea,
    businessHours: business.businessHours,
    facebook: business.facebook,
    google: { ...business.google },
    seoTitle: business.seoTitle,
    seoDescription: business.seoDescription,
  };
}

function mergeSiteSettings(data?: SanityHomepage["siteSettings"]): SiteSettingsContent {
  const defaults = defaultSiteSettings();
  if (!data) return defaults;

  const line1 = data.addressLine1 ?? defaults.address.line1;
  const line2 = data.addressLine2 ?? defaults.address.line2;

  return {
    name: data.businessName ?? defaults.name,
    shortName: data.shortName ?? defaults.shortName,
    tagline: data.tagline ?? defaults.tagline,
    establishedYear: data.establishedYear ?? defaults.establishedYear,
    phone: {
      display: data.phoneDisplay ?? defaults.phone.display,
      tel: data.phoneTel ?? defaults.phone.tel,
    },
    emergencyPhone: {
      display: data.emergencyPhoneDisplay ?? defaults.emergencyPhone.display,
      tel: data.emergencyPhoneTel ?? defaults.emergencyPhone.tel,
    },
    whatsapp: {
      number: data.whatsappNumber ?? defaults.whatsapp.number,
      defaultMessage: data.whatsappDefaultMessage ?? defaults.whatsapp.defaultMessage,
    },
    email: data.email ?? defaults.email,
    address: {
      line1: line1,
      line2: line2,
      full: `${line1}, ${line2}`,
    },
    serviceArea: data.serviceArea ?? defaults.serviceArea,
    businessHours: data.businessHours ?? defaults.businessHours,
    facebook: data.facebookUrl ?? defaults.facebook,
    google: {
      mapsEmbedUrl: data.googleMapsEmbedUrl ?? defaults.google.mapsEmbedUrl,
      mapsDirectionsUrl: data.googleMapsDirectionsUrl ?? defaults.google.mapsDirectionsUrl,
      mapsOpenUrl: data.googleMapsOpenUrl ?? defaults.google.mapsOpenUrl,
      reviewsUrl: data.googleReviewsUrl ?? defaults.google.reviewsUrl,
      leaveReviewUrl: data.googleLeaveReviewUrl ?? defaults.google.leaveReviewUrl,
    },
    seoTitle: data.seoTitle ?? defaults.seoTitle,
    seoDescription: data.seoDescription ?? defaults.seoDescription,
  };
}

function defaultHero(): HeroContent {
  return {
    badgeText: `Serving ${business.serviceArea}`,
    headlinePrefix: "Gansbaai",
    tagline: business.tagline,
    description:
      "The Leading Air Conditioning & Refrigeration Specialists in the Overstrand & Overberg.\nFor over 20 years, Gansbaai Aircon & Refrigeration has been a trusted name in climate control and refrigeration, delivering innovative solutions backed by technical expertise, quality craftsmanship, and exceptional customer service. \nWe specialize in the design, supply, installation, servicing, and maintenance of residential, commercial, and industrial systems, ensuring every solution is tailored for maximum performance, efficiency, and reliability.",
    quoteCtaText: "Request a Quote",
    backgroundImage: HERO_IMAGE,
    backgroundImageAlt:
      "Gansbaai Aircon technicians servicing commercial air conditioning units",
  };
}

function mergeHero(data?: SanityHomepage["hero"]): HeroContent {
  const defaults = defaultHero();
  if (!data) return defaults;
  return {
    badgeText: data.badgeText ?? defaults.badgeText,
    headlinePrefix: data.headlinePrefix ?? defaults.headlinePrefix,
    tagline: data.tagline ?? defaults.tagline,
    description: data.description ?? defaults.description,
    quoteCtaText: data.quoteCtaText ?? defaults.quoteCtaText,
    backgroundImage: data.backgroundImage?.url
      ? data.backgroundImage
      : defaults.backgroundImage,
    backgroundImageAlt: data.backgroundImageAlt ?? defaults.backgroundImageAlt,
  };
}

function defaultWhyChooseUs(): WhyChooseUsContent {
  return {
    eyebrow: "Why Choose Us",
    title: "Trusted Local Experts Since 2005",
    description:
      "Based in Gansbaai and family-run, we pair practical advice with qualified workmanship and local backup.",
    items: [...whyChooseUsItems],
  };
}

function mergeWhyChooseUs(data?: SanityHomepage["whyChooseUs"]): WhyChooseUsContent {
  const defaults = defaultWhyChooseUs();
  if (!data) return defaults;
  return {
    eyebrow: data.eyebrow ?? defaults.eyebrow,
    title: data.title ?? defaults.title,
    description: data.description ?? defaults.description,
    items: data.items?.length ? data.items : defaults.items,
  };
}

function defaultCommunity(): CommunityOutreachContent {
  return {
    eyebrow: "Community Outreach",
    title: defaultCommunityData.title,
    description:
      "As a local family business, we believe in supporting the community that supports us.",
    message: defaultCommunityData.message,
    closingLine: defaultCommunityData.closingLine,
    hashtags: [...defaultCommunityData.hashtags],
    featuredImage: defaultCommunityData.imageSrc,
    featuredImageAlt: defaultCommunityData.imageAlt,
    galleryImages: [...defaultCommunityData.galleryImages],
  };
}

function mergeCommunity(data?: SanityHomepage["communityOutreach"]): CommunityOutreachContent {
  const defaults = defaultCommunity();
  if (!data) return defaults;
  return {
    eyebrow: data.eyebrow ?? defaults.eyebrow,
    title: data.title ?? defaults.title,
    description: data.description ?? defaults.description,
    message: data.message ?? defaults.message,
    closingLine: data.closingLine ?? defaults.closingLine,
    hashtags: data.hashtags?.length ? data.hashtags : defaults.hashtags,
    featuredImage: data.featuredImage?.url ? data.featuredImage : defaults.featuredImage,
    featuredImageAlt: data.featuredImageAlt ?? defaults.featuredImageAlt,
    galleryImages:
      data.galleryImages?.length
        ? data.galleryImages.map((img, i) =>
            isCmsImage(img) ? img : defaults.galleryImages[i] ?? defaults.galleryImages[0]
          )
        : defaults.galleryImages,
  };
}

function defaultLegacy(): LegacyContent {
  return {
    eyebrow: "Our Legacy",
    title: "A Family Business Built on Trust",
    description:
      "From Hein Goedde Snr's founding vision to the next generation — our story is one of honesty, quality, and community.",
    milestones: [...legacyMilestones],
  };
}

function mergeLegacy(data?: SanityHomepage["legacy"]): LegacyContent {
  const defaults = defaultLegacy();
  if (!data) return defaults;
  return {
    eyebrow: data.eyebrow ?? defaults.eyebrow,
    title: data.title ?? defaults.title,
    description: data.description ?? defaults.description,
    milestones: data.milestones?.length ? data.milestones : defaults.milestones,
  };
}

function defaultDealers(): DealersSectionContent {
  return {
    eyebrow: "Approved Dealer",
    title: "Trusted Brand Partners",
    description:
      "We supply and service leading air conditioning and refrigeration brands with factory-approved expertise.",
    dealers: defaultDealersData.map((d) => ({
      name: d.name,
      logoAlt: d.logoAlt,
      logo: d.logoSrc,
    })),
  };
}

function mergeDealers(data?: SanityHomepage["dealersSection"]): DealersSectionContent {
  const defaults = defaultDealers();
  if (!data) return defaults;

  const fromCms = data.dealers?.length
    ? data.dealers.map((d) => {
        const fallback =
          defaults.dealers.find(
            (item) => item.name.toLowerCase() === (d.name ?? "").toLowerCase()
          ) ?? null;
        const sanityLogo =
          d.logo &&
          typeof d.logo === "object" &&
          "url" in d.logo &&
          d.logo.url
            ? d.logo
            : null;
        return {
          name: d.name ?? fallback?.name ?? "",
          logoAlt:
            d.logoAlt ??
            fallback?.logoAlt ??
            `${d.name} approved dealer`,
          logo: sanityLogo ?? fallback?.logo ?? null,
        };
      })
    : [...defaults.dealers];

  const cmsNames = new Set(fromCms.map((d) => d.name.toLowerCase()));
  for (const dealer of defaults.dealers) {
    if (!cmsNames.has(dealer.name.toLowerCase())) {
      fromCms.push(dealer);
    }
  }

  return {
    eyebrow: data.eyebrow ?? defaults.eyebrow,
    title: data.title ?? defaults.title,
    description: data.description ?? defaults.description,
    dealers: fromCms,
  };
}

function defaultReviewsSection(): ReviewsSectionContent {
  return {
    eyebrow: "Customer Reviews",
    title: "What Our Clients Say",
    description:
      "Visit our Google business listing to read feedback or leave a review after your job is complete.",
    reviews: defaultReviews.map((r, i) => ({ ...r, id: r.id ?? `default-${i}` })),
  };
}

function mergeReviews(data?: SanityHomepage["reviewsSection"]): ReviewsSectionContent {
  const defaults = defaultReviewsSection();
  if (!data) return defaults;
  return {
    eyebrow: data.eyebrow ?? defaults.eyebrow,
    title: data.title ?? defaults.title,
    description: data.description ?? defaults.description,
    reviews: data.reviews?.length
      ? data.reviews.map((r, i) => ({
          id: `cms-${i}`,
          author: r.author ?? "",
          text: r.text ?? "",
          rating: r.rating ?? 5,
          isPlaceholder: r.isPlaceholder ?? false,
        }))
      : defaults.reviews,
  };
}

function mergeServices(data?: SanityHomepage["services"]): ServiceContent[] {
  if (!data?.length) return defaultServices.map((s) => ({ ...s }));
  return data
    .filter((s) => s.title && s.description && s.iconName)
    .map((s) => ({
      id: s.id ?? s.title!.toLowerCase().replace(/\s+/g, "-"),
      title: s.title!,
      description: s.description!,
      iconName: s.iconName as ServiceContent["iconName"],
      iconImage: s.iconImage ?? null,
    }));
}

function mergeGallery(data?: SanityHomepage["gallery"]): GalleryItemContent[] {
  if (!data?.length) {
    return defaultGallery.map((g) => ({
      id: g.id,
      title: g.title,
      alt: g.alt,
      category: g.category,
      showInProjectGallery: g.category !== "Community",
      image: g.src,
    }));
  }

  return data
    .filter((g) => g.image?.url || g.title)
    .map((g, i) => ({
      id: g.id ?? i + 1,
      title: g.title ?? `Project ${i + 1}`,
      alt: g.alt ?? g.title ?? "Gallery image",
      category: (g.category ?? "Service") as GalleryItemContent["category"],
      showInProjectGallery: g.showInProjectGallery ?? true,
      image: g.image?.url ? g.image : projectGalleryImages[i]?.src ?? HERO_IMAGE,
    }));
}

function mergeHomepage(data: SanityHomepage | null): HomepageContent {
  return {
    siteSettings: mergeSiteSettings(data?.siteSettings),
    hero: mergeHero(data?.hero),
    whyChooseUs: mergeWhyChooseUs(data?.whyChooseUs),
    communityOutreach: mergeCommunity(data?.communityOutreach),
    legacy: mergeLegacy(data?.legacy),
    dealersSection: mergeDealers(data?.dealersSection),
    reviewsSection: mergeReviews(data?.reviewsSection),
    services: mergeServices(data?.services),
    gallery: mergeGallery(data?.gallery),
  };
}

export async function getHomepageContent(): Promise<HomepageContent> {
  try {
    const data = await client.fetch<SanityHomepage | null>(
      HOMEPAGE_QUERY,
      {},
      {
        // Time-based refresh so Studio publishes appear without a webhook.
        // Optional Sanity webhook can still purge sooner via /api/revalidate.
        next: {
          revalidate: 60,
        },
      }
    );
    return mergeHomepage(data);
  } catch (error) {
    console.error("Failed to fetch Sanity homepage content, using defaults.", error);
    return mergeHomepage(null);
  }
}

export { isPlaceholder };
