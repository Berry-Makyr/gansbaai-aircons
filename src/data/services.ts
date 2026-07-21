export type ServiceItem = {
  id: string;
  title: string;
  description: string;
  iconName:
    | "snowflake"
    | "thermometer-snowflake"
    | "warehouse"
    | "wine"
    | "car"
    | "shield"
    | "wind"
    | "flame"
    | "milk";
};

export const services: ServiceItem[] = [
  {
    id: "air-conditioning",
    title: "Air Conditioning",
    description:
      "Installation, servicing and repairs for split, window/wall, cassette, under-ceiling and ducted systems in homes and commercial spaces.",
    iconName: "snowflake",
  },
  {
    id: "commercial-refrigeration",
    title: "Commercial Refrigeration",
    description:
      "Purpose-built refrigeration for shops, restaurants and other commercial sites, backed by repairs, maintenance and service contracts.",
    iconName: "thermometer-snowflake",
  },
  {
    id: "blast-freezers",
    title: "Blast Freezers",
    description:
      "Blast freezer installation, fault finding and maintenance for businesses that depend on fast, reliable freezing.",
    iconName: "warehouse",
  },
  {
    id: "cold-rooms",
    title: "Cold Rooms",
    description:
      "Cold room design, installation, repairs and planned maintenance for food storage, hospitality and industrial use.",
    iconName: "warehouse",
  },
  {
    id: "wine-cellar",
    title: "Wine Cellar Refrigeration",
    description:
      "Discreet wine cellar cooling designed to hold a steady storage temperature, from initial design through servicing and repairs.",
    iconName: "wine",
  },
  {
    id: "car-aircon",
    title: "Car Aircon Re-gas",
    description:
      "Vehicle aircon re-gassing, fault finding, repairs and component replacement for cars and light commercial vehicles.",
    iconName: "car",
  },
  {
    id: "rust-treatments",
    title: "Rust Treatments",
    description:
      "Protective treatments for outdoor units and refrigeration equipment exposed to Gansbaai's coastal air.",
    iconName: "shield",
  },
  {
    id: "ventilation",
    title: "Ventilation / Extraction Systems",
    description:
      "Practical ventilation and extraction systems for kitchens, workshops and commercial premises.",
    iconName: "wind",
  },
  {
    id: "heat-pumps",
    title: "Heat Pumps",
    description:
      "Heat pump supply, installation and servicing for efficient water heating and year-round temperature control.",
    iconName: "flame",
  },
  {
    id: "milk-tank",
    title: "Milk Tank Refrigeration",
    description:
      "Milk tank installation, repairs and service contracts that help dairy farms keep storage temperatures dependable.",
    iconName: "milk",
  },
];

export const serviceFormOptions = services.map((s) => s.title);
