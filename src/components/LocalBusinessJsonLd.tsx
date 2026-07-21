import type {
  ServiceContent,
  SiteSettingsContent,
} from "@/lib/cms/types";

type LocalBusinessJsonLdProps = {
  siteSettings: SiteSettingsContent;
  services: ServiceContent[];
};

export default function LocalBusinessJsonLd({
  siteSettings,
  services,
}: LocalBusinessJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": "https://gansbaaiaircon.co.za/#business",
    name: siteSettings.name,
    url: "https://gansbaaiaircon.co.za",
    description: siteSettings.seoDescription,
    foundingDate: String(siteSettings.establishedYear),
    telephone: siteSettings.phone.tel,
    email: siteSettings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteSettings.address.line1,
      addressLocality: "Gansbaai",
      addressRegion: "Western Cape",
      postalCode: "7220",
      addressCountry: "ZA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -34.59146604955906,
      longitude: 19.353156682732966,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Overberg" },
      { "@type": "AdministrativeArea", name: "Overstrand" },
    ],
    hasMap: siteSettings.google.mapsOpenUrl,
    sameAs: [siteSettings.facebook, siteSettings.google.mapsOpenUrl],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: `+${siteSettings.whatsapp.number}`,
        url: `https://wa.me/${siteSettings.whatsapp.number}`,
      },
      {
        "@type": "ContactPoint",
        contactType: "emergency service",
        telephone: siteSettings.emergencyPhone.tel,
        availableLanguage: ["en", "af"],
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
        opens: "08:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Friday",
        opens: "08:00",
        closes: "16:30",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Air conditioning and refrigeration services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
