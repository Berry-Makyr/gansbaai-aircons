/** Hash links use `/#…` so they work from inner pages as well as the homepage. */
export const navLinks = [
  { name: "Services", href: "/#services" },
  { name: "Dealers", href: "/#dealers" },
  { name: "Why Us", href: "/#why-us" },
  { name: "FAQ", href: "/#faq" },
  { name: "Contact", href: "/#contact" },
  { name: "Location", href: "/#location" },
  { name: "Gallery", href: "/#gallery" },
  { name: "Reviews", href: "/#reviews" },
] as const;

export const footerExtraLinks = [
  { name: "Service areas", href: "/service-areas" },
  { name: "Insights", href: "/insights" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
] as const;

export function enquiryHref(serviceTitle?: string): string {
  if (!serviceTitle) return "/#enquiry-form";
  return `/?service=${encodeURIComponent(serviceTitle)}#enquiry-form`;
}
