export const HERO_IMAGE = "/gallery/gallery-12.jpg";

export type GalleryCategory =
  | "Installation"
  | "Maintenance"
  | "Commercial"
  | "Refrigeration"
  | "Repairs"
  | "Service"
  | "Community"
  | "Promotional";

export type GalleryItem = {
  id: number;
  src: string;
  title: string;
  category: GalleryCategory;
  alt: string;
  featured?: boolean;
};

export const galleryImages: GalleryItem[] = [
  {
    id: 1,
    src: "/gallery/gallery-01.jpg",
    title: "Business Overview",
    category: "Service",
    alt: "Gansbaai Aircon & Refrigeration business information",
    featured: false,
  },
  {
    id: 2,
    src: "/gallery/gallery-02.jpg",
    title: "Our Services",
    category: "Service",
    alt: "Overview of air conditioning and refrigeration services offered",
  },
  {
    id: 3,
    src: "/gallery/gallery-03.jpg",
    title: "Commercial Installation",
    category: "Commercial",
    alt: "Commercial air conditioning installation project",
  },
  {
    id: 4,
    src: "/gallery/gallery-04.jpg",
    title: "Company Branding",
    category: "Service",
    alt: "Gansbaai Aircon company logo and branding",
  },
  {
    id: 5,
    src: "/gallery/gallery-05.jpg",
    title: "Split Unit Installation",
    category: "Installation",
    alt: "Split air conditioning unit installation",
  },
  {
    id: 6,
    src: "/gallery/gallery-06.jpg",
    title: "Outdoor Unit Setup",
    category: "Installation",
    alt: "Outdoor air conditioning condenser unit installation",
  },
  {
    id: 7,
    src: "/gallery/gallery-07.jpg",
    title: "Ducted System Work",
    category: "Installation",
    alt: "Ducted air conditioning system installation",
  },
  {
    id: 8,
    src: "/gallery/gallery-08.jpg",
    title: "Residential Cooling",
    category: "Installation",
    alt: "Residential air conditioning installation project",
  },
  {
    id: 9,
    src: "/gallery/gallery-09.jpg",
    title: "System Maintenance",
    category: "Maintenance",
    alt: "Air conditioning system maintenance and servicing",
  },
  {
    id: 10,
    src: "/gallery/gallery-10.jpg",
    title: "Repair Service",
    category: "Repairs",
    alt: "Air conditioning repair and diagnostics",
  },
  {
    id: 11,
    src: "/gallery/gallery-11.jpg",
    title: "Commercial Project",
    category: "Commercial",
    alt: "Commercial climate control project",
  },
  {
    id: 12,
    src: "/gallery/gallery-12.jpg",
    title: "Featured Installation",
    category: "Installation",
    alt: "Gansbaai Aircon technicians servicing commercial air conditioning units",
    featured: true,
  },
  {
    id: 13,
    src: "/gallery/gallery-13.jpg",
    title: "Reach for Recovery",
    category: "Community",
    alt: "Reach for Recovery breast cancer awareness fundraiser support",
  },
  {
    id: 14,
    src: "/gallery/gallery-14.jpg",
    title: "Ditto Project Donation",
    category: "Community",
    alt: "Gansbaai Aircon Reach for Recovery Ditto Project donation",
  },
  {
    id: 15,
    src: "/gallery/gallery-15.jpg",
    title: "Community Handover",
    category: "Community",
    alt: "Fundraiser donation handover with the Gansbaai Aircon team",
  },
  {
    id: 16,
    src: "/gallery/gallery-16.jpg",
    title: "Breast Cancer Awareness",
    category: "Community",
    alt: "In October We Wear Pink — breast cancer awareness month",
  },
  {
    id: 17,
    src: "/gallery/gallery-17.jpg",
    title: "Cold Room Build",
    category: "Refrigeration",
    alt: "Cold room construction and installation",
  },
  {
    id: 18,
    src: "/gallery/gallery-18.jpg",
    title: "Refrigeration Unit",
    category: "Refrigeration",
    alt: "Commercial refrigeration unit installation",
  },
  {
    id: 19,
    src: "/gallery/gallery-19.jpg",
    title: "Freezer Room",
    category: "Refrigeration",
    alt: "Freezer room installation project",
  },
  {
    id: 20,
    src: "/gallery/gallery-20.jpg",
    title: "HVAC Ductwork",
    category: "Commercial",
    alt: "HVAC ductwork and ventilation installation",
  },
  {
    id: 21,
    src: "/gallery/gallery-21.jpg",
    title: "Indoor Unit Fitting",
    category: "Installation",
    alt: "Indoor air conditioning unit fitting",
  },
  {
    id: 22,
    src: "/gallery/gallery-22.jpg",
    title: "Multi-Split System",
    category: "Installation",
    alt: "Multi-split air conditioning system installation",
  },
  {
    id: 23,
    src: "/gallery/gallery-23.jpg",
    title: "Service Call",
    category: "Service",
    alt: "On-site air conditioning service call",
  },
  {
    id: 24,
    src: "/gallery/gallery-24.jpg",
    title: "Equipment Servicing",
    category: "Maintenance",
    alt: "Refrigeration equipment servicing and maintenance",
  },
  {
    id: 25,
    src: "/gallery/gallery-25.jpg",
    title: "Retail Refrigeration",
    category: "Commercial",
    alt: "Retail commercial refrigeration installation",
  },
  {
    id: 26,
    src: "/gallery/gallery-26.jpg",
    title: "Pipework Installation",
    category: "Installation",
    alt: "Refrigeration pipework and line set installation",
  },
  {
    id: 27,
    src: "/gallery/gallery-27.jpg",
    title: "System Commissioning",
    category: "Service",
    alt: "Air conditioning system commissioning and testing",
  },
  {
    id: 28,
    src: "/gallery/gallery-28.jpg",
    title: "Industrial Cooling",
    category: "Commercial",
    alt: "Industrial cooling and refrigeration project",
  },
  {
    id: 29,
    src: "/gallery/gallery-29.jpg",
    title: "Completed Project",
    category: "Installation",
    alt: "Completed air conditioning installation project",
  },
  {
    id: 30,
    src: "/gallery/gallery-30.jpg",
    title: "Our Team",
    category: "Service",
    alt: "Gansbaai Aircon team promotional graphic",
  },
  {
    id: 31,
    src: "/gallery/gallery-31.jpg",
    title: "Quality Workmanship",
    category: "Service",
    alt: "Professional air conditioning workmanship",
  },
  {
    id: 32,
    src: "/gallery/gallery-32.jpg",
    title: "Seasonal Special",
    category: "Promotional",
    alt: "Comfee winter special promotion",
  },
  {
    id: 33,
    src: "/gallery/gallery-33.jpg",
    title: "Heating Promotion",
    category: "Promotional",
    alt: "Uniterm heating cost promotion",
  },
];

/** Community photos have their own lightbox; every other image is shown here. */
export const projectGalleryImages = galleryImages.filter(
  (item) => item.category !== "Community"
);
