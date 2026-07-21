/**
 * Central business contact data — local fallbacks when Sanity is unavailable.
 * Authoritative contact details supplied by the business owner.
 */

export const PLACEHOLDER_MARKER = "PLACEHOLDER";

export const business = {
  name: "Gansbaai Aircon & Refrigeration CC",
  shortName: "Gansbaai Aircon",
  tagline: "Regulating The Temperature Since 2005",
  establishedYear: 2005,

  phone: {
    display: "028 384 0703",
    tel: "+27283840703",
  },

  emergencyPhone: {
    display: "072 822 9897",
    tel: "+27728229897",
  },

  whatsapp: {
    number: "27728229897",
    defaultMessage:
      "Hi Gansbaai Aircon, I would like to get a quote or more information.",
  },

  email: "admin@gbaircon.co.za",

  address: {
    line1: "33 Industry Circle, Gansbaai Industrial",
    line2: "Gansbaai, Western Cape, 7220",
    full: "33 Industry Circle, Gansbaai Industrial, Gansbaai, Western Cape, 7220",
  },

  serviceArea: "Overberg & Overstrand",

  businessHours:
    "Mon–Thu: 08:00–17:00; Fri: 08:00–16:30; Sat & public holidays: by appointment",

  google: {
    mapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d205.28137355643688!2d19.353156682732966!3d-34.59146604955906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dce10c7e8af9e5d%3A0x85f233d1d0fabfb!2sGansbaai%20Aircon%20and%20Refrigeration!5e0!3m2!1sen!2sza!4v1784290254971!5m2!1sen!2sza",
    mapsDirectionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=-34.59146604955906%2C19.353156682732966",
    mapsOpenUrl:
      "https://www.google.com/maps?cid=603239620478479355",
    reviewsUrl:
      "https://www.google.com/maps?cid=603239620478479355",
    leaveReviewUrl:
      "https://www.google.com/search?hl=en-ZA&gl=za&q=Gansbaai+Aircon+and+Refrigeration#lrd=0x1dce10c7e8af9e5d:0x85f233d1d0fabfb,3,,,",
  },

  facebook:
    "https://www.facebook.com/p/Gansbaai-Aircon-and-Refrigeration-100090960227976/",

  seoTitle:
    "Gansbaai Aircon & Refrigeration | Overberg HVAC Services",
  seoDescription:
    "Family-run air conditioning, commercial refrigeration, cold room, wine cellar and milk tank specialists serving Gansbaai and the Overberg since 2005.",
} as const;

export function getWhatsAppUrl(
  number: string,
  message?: string,
  defaultMessage?: string
): string {
  const text = encodeURIComponent(message ?? defaultMessage ?? business.whatsapp.defaultMessage);
  return `https://wa.me/${number}?text=${text}`;
}

export function isPlaceholder(value: string | null | undefined): boolean {
  return !value || value.startsWith(PLACEHOLDER_MARKER);
}
