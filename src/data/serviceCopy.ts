/** Extra SEO body copy for service landing pages (keyed by service slug/id). */
export const servicePageCopy: Record<
  string,
  { seoTitle: string; seoDescription: string; highlights: string[] }
> = {
  "air-conditioning": {
    seoTitle: "Air Conditioning Installation & Repairs | Gansbaai Aircon",
    seoDescription:
      "Split, cassette, under-ceiling and ducted aircon installation, servicing and repairs in Gansbaai, Hermanus and the Overberg.",
    highlights: [
      "Residential and commercial systems",
      "Supply, install, service and repair",
      "Advice on sizing for Overberg summers and coastal humidity",
    ],
  },
  "commercial-refrigeration": {
    seoTitle: "Commercial Refrigeration | Gansbaai & Overberg",
    seoDescription:
      "Shop, restaurant and commercial refrigeration installation, maintenance and emergency repairs across the Overstrand.",
    highlights: [
      "Display fridges, cold storage and kitchen systems",
      "Planned maintenance contracts available",
      "Fast response when stock is at risk",
    ],
  },
  "blast-freezers": {
    seoTitle: "Blast Freezer Installation & Repairs | Overberg",
    seoDescription:
      "Blast freezer install, fault finding and maintenance for food businesses in Gansbaai and the Overberg.",
    highlights: [
      "Rapid pull-down performance focus",
      "Fault finding and component replacement",
      "Support for hospitality and processing sites",
    ],
  },
  "cold-rooms": {
    seoTitle: "Cold Room Design, Install & Repairs | Gansbaai",
    seoDescription:
      "Cold room design, installation, repairs and maintenance for food storage, hospitality and industry in the Overberg.",
    highlights: [
      "New builds and upgrades",
      "Temperature reliability for produce and stock",
      "Coastal-aware equipment care",
    ],
  },
  "wine-cellar": {
    seoTitle: "Wine Cellar Refrigeration | Overberg Wine Farms",
    seoDescription:
      "Quiet, steady wine cellar cooling design, installation and servicing for Overberg cellars and private collections.",
    highlights: [
      "Stable storage temperatures",
      "Discreet installs for private and commercial cellars",
      "Ongoing servicing and repairs",
    ],
  },
  "car-aircon": {
    seoTitle: "Car Aircon Re-gas & Repairs | Gansbaai",
    seoDescription:
      "Vehicle aircon re-gassing, diagnostics and repairs for cars and light commercial vehicles in Gansbaai.",
    highlights: [
      "Re-gas and leak checks",
      "Component repairs and replacement",
      "Cars and light commercial vehicles",
    ],
  },
  "rust-treatments": {
    seoTitle: "Coastal Rust Treatment for Aircon Units | Gansbaai",
    seoDescription:
      "Protective rust treatments for outdoor aircon and refrigeration units exposed to Gansbaai sea air.",
    highlights: [
      "Coastal corrosion protection",
      "Extends outdoor unit lifespan",
      "Ideal for sea-facing properties",
    ],
  },
  ventilation: {
    seoTitle: "Ventilation & Extraction Systems | Overberg",
    seoDescription:
      "Kitchen, workshop and commercial ventilation and extraction systems installed and serviced from Gansbaai.",
    highlights: [
      "Practical extraction for kitchens and workshops",
      "Commercial premises focus",
      "Install and maintenance support",
    ],
  },
  "heat-pumps": {
    seoTitle: "Heat Pump Installation & Servicing | Overstrand",
    seoDescription:
      "Efficient heat pump supply, installation and servicing for water heating and climate control in the Overberg.",
    highlights: [
      "Energy-efficient water heating",
      "Install and aftercare",
      "Suitable for homes and businesses",
    ],
  },
  "milk-tank": {
    seoTitle: "Milk Tank Refrigeration | Overberg Dairies",
    seoDescription:
      "Milk tank installation, repairs and service contracts for dairy farms across the Overberg.",
    highlights: [
      "Dependable milk storage temperatures",
      "Farm call-outs and contracts",
      "Install, repair and maintain",
    ],
  },
  "fishing-vessel": {
    seoTitle: "Fishing Vessel Refrigeration & Freezers | Gansbaai",
    seoDescription:
      "Marine refrigeration and freezer systems for fishing vessels — install, repair and service in Gansbaai.",
    highlights: [
      "Marine refrigeration specialists",
      "Onshore and vessel support",
      "Freezer and hold cooling systems",
    ],
  },
};

export function getServicePageCopy(slug: string) {
  return (
    servicePageCopy[slug] ?? {
      seoTitle: "Air Conditioning & Refrigeration Services | Gansbaai Aircon",
      seoDescription:
        "Professional air conditioning and refrigeration services in Gansbaai and the Overberg.",
      highlights: [
        "Local Overberg technicians",
        "Installation, servicing and repairs",
        "Free quotes via form or WhatsApp",
      ],
    }
  );
}
