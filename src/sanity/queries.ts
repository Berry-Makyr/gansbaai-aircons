import { groq } from "next-sanity";

export const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0] {
  businessName,
  tagline,
  phone,
  email,
  address,
  businessHours,
  facebookUrl,
  seoDescription
}`;

export const HERO_QUERY = groq`*[_type == "hero"][0] {
  headline,
  subheadline,
  "backgroundImageUrl": backgroundImage.asset->url,
  ctaText
}`;

export const SERVICES_QUERY = groq`*[_type == "service"] | order(order asc) {
  title,
  "slug": slug.current,
  description,
  "iconUrl": icon.asset->url
}`;

export const GALLERY_QUERY = groq`*[_type == "galleryImage"] | order(order asc) {
  title,
  "imageUrl": image.asset->url,
  alt
}`;
