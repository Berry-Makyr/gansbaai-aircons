import { groq } from "next-sanity";

const imageFields = groq`{
  "url": asset->url,
  "alt": coalesce(alt, ""),
  "lqip": asset->metadata.lqip,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height
}`;

export const HOMEPAGE_QUERY = groq`{
  "siteSettings": *[_type == "siteSettings"][0] {
    businessName,
    shortName,
    tagline,
    establishedYear,
    phoneDisplay,
    phoneTel,
    emergencyPhoneDisplay,
    emergencyPhoneTel,
    whatsappNumber,
    whatsappDefaultMessage,
    email,
    addressLine1,
    addressLine2,
    serviceArea,
    businessHours,
    facebookUrl,
    googleMapsEmbedUrl,
    googleMapsDirectionsUrl,
    googleMapsOpenUrl,
    googleReviewsUrl,
    googleLeaveReviewUrl,
    seoTitle,
    seoDescription
  },
  "hero": *[_type == "hero"][0] {
    badgeText,
    headlinePrefix,
    tagline,
    description,
    quoteCtaText,
    backgroundImageAlt,
    mobileBackgroundImageAlt,
    "backgroundImage": backgroundImage ${imageFields},
    "mobileBackgroundImage": mobileBackgroundImage ${imageFields}
  },
  "whyChooseUs": *[_type == "whyChooseUs"][0] {
    eyebrow,
    title,
    description,
    items[] { title, description }
  },
  "communityOutreach": *[_type == "communityOutreach"][0] {
    eyebrow,
    title,
    description,
    message,
    closingLine,
    hashtags,
    featuredImageAlt,
    "featuredImage": featuredImage ${imageFields},
    "galleryImages": galleryImages[] ${imageFields}
  },
  "legacy": *[_type == "legacy"][0] {
    eyebrow,
    title,
    description,
    milestones[] { year, title, description }
  },
  "dealersSection": *[_type == "dealersSection"][0] {
    eyebrow,
    title,
    description,
    dealers[] {
      name,
      logoAlt,
      "logo": logo ${imageFields}
    }
  },
  "reviewsSection": *[_type == "reviewsSection"][0] {
    eyebrow,
    title,
    description,
    reviews[] { author, text, rating, isPlaceholder }
  },
  "services": *[_type == "service"] | order(order asc) {
    "id": slug.current,
    title,
    description,
    iconName,
    order,
    "iconImage": icon ${imageFields}
  },
  "gallery": *[_type == "galleryImage"] | order(order asc) {
    "id": _id,
    title,
    alt,
    category,
    showInProjectGallery,
    order,
    "image": image ${imageFields}
  }
}`;

export const SERVICES_QUERY = groq`*[_type == "service"] | order(order asc) {
  "id": slug.current,
  title,
  description,
  iconName,
  order,
  "iconImage": icon ${imageFields}
}`;

export const SERVICE_BY_SLUG_QUERY = groq`*[_type == "service" && slug.current == $slug][0] {
  "id": slug.current,
  title,
  description,
  iconName,
  order,
  "iconImage": icon ${imageFields}
}`;

export const POSTS_QUERY = groq`*[_type == "post" && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc) {
  "id": _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  "mainImage": mainImage ${imageFields},
  "authorName": author->name
}`;

export const POST_BY_SLUG_QUERY = groq`*[_type == "post" && slug.current == $slug][0] {
  "id": _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  body,
  "mainImage": mainImage ${imageFields},
  "authorName": author->name
}`;

export const POST_SLUGS_QUERY = groq`*[_type == "post" && defined(slug.current)]{ "slug": slug.current }`;
