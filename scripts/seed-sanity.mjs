/**
 * Idempotent Sanity seed script.
 *
 * Usage (from frontend/):
 *   SANITY_API_WRITE_TOKEN=your_token npm run seed
 *
 * Create a token at https://www.sanity.io/manage → API → Tokens (Editor permissions).
 */

import { createClient } from "@sanity/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");

function loadEnvFile() {
  const envPath = path.join(root, ".env.local");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token =
  process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-07-11",
  token,
  useCdn: false,
});

const assetCache = new Map();

async function uploadImage(relativePath) {
  if (assetCache.has(relativePath)) return assetCache.get(relativePath);

  const filePath = path.join(publicDir, relativePath.replace(/^\//, ""));
  if (!fs.existsSync(filePath)) {
    console.warn(`Skipping missing file: ${filePath}`);
    return null;
  }

  const buffer = fs.readFileSync(filePath);
  const asset = await client.assets.upload("image", buffer, {
    filename: path.basename(filePath),
  });
  const ref = { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  assetCache.set(relativePath, ref);
  return ref;
}

async function seedSingleton(id, doc) {
  await client.createOrReplace({ _id: id, _type: doc._type, ...doc });
  console.log(`✓ ${id}`);
}

const services = [
  { id: "service-air-conditioning", title: "Air Conditioning", slug: "air-conditioning", iconName: "snowflake", order: 1, description: "Installation, servicing and repairs for split, window/wall, cassette, under-ceiling and ducted systems in homes and commercial spaces." },
  { id: "service-commercial-refrigeration", title: "Commercial Refrigeration", slug: "commercial-refrigeration", iconName: "thermometer-snowflake", order: 2, description: "Purpose-built refrigeration for shops, restaurants and other commercial sites, backed by repairs, maintenance and service contracts." },
  { id: "service-blast-freezers", title: "Blast Freezers", slug: "blast-freezers", iconName: "warehouse", order: 3, description: "Blast freezer installation, fault finding and maintenance for businesses that depend on fast, reliable freezing." },
  { id: "service-cold-rooms", title: "Cold Rooms", slug: "cold-rooms", iconName: "warehouse", order: 4, description: "Cold room design, installation, repairs and planned maintenance for food storage, hospitality and industrial use." },
  { id: "service-wine-cellar", title: "Wine Cellar Refrigeration", slug: "wine-cellar-refrigeration", iconName: "wine", order: 5, description: "Discreet wine cellar cooling designed to hold a steady storage temperature, from initial design through servicing and repairs." },
  { id: "service-car-aircon", title: "Car Aircon Re-gas", slug: "car-aircon-re-gas", iconName: "car", order: 6, description: "Vehicle aircon re-gassing, fault finding, repairs and component replacement for cars and light commercial vehicles." },
  { id: "service-rust-treatments", title: "Rust Treatments", slug: "rust-treatments", iconName: "shield", order: 7, description: "Protective treatments for outdoor units and refrigeration equipment exposed to Gansbaai's coastal air." },
  { id: "service-ventilation", title: "Ventilation / Extraction Systems", slug: "ventilation-extraction-systems", iconName: "wind", order: 8, description: "Practical ventilation and extraction systems for kitchens, workshops and commercial premises." },
  { id: "service-heat-pumps", title: "Heat Pumps", slug: "heat-pumps", iconName: "flame", order: 9, description: "Heat pump supply, installation and servicing for efficient water heating and year-round temperature control." },
  { id: "service-milk-tank", title: "Milk Tank Refrigeration", slug: "milk-tank-refrigeration", iconName: "milk", order: 10, description: "Milk tank installation, repairs and service contracts that help dairy farms keep storage temperatures dependable." },
];

const galleryMeta = JSON.parse(
  fs.readFileSync(path.join(__dirname, "seed-gallery.json"), "utf8")
);

async function main() {
  console.log(`Seeding Sanity project ${projectId} (${dataset})...\n`);

  await seedSingleton("siteSettings", {
    _type: "siteSettings",
    businessName: "Gansbaai Aircon & Refrigeration CC",
    shortName: "Gansbaai Aircon",
    tagline: "Regulating The Temperature Since 2005",
    establishedYear: 2005,
    phoneDisplay: "028 384 0703",
    phoneTel: "+27283840703",
    emergencyPhoneDisplay: "072 822 9897",
    emergencyPhoneTel: "+27728229897",
    whatsappNumber: "27728229897",
    whatsappDefaultMessage:
      "Hi Gansbaai Aircon, I would like to get a quote or more information.",
    email: "admin@gbaircon.co.za",
    addressLine1: "33 Industry Circle, Gansbaai Industrial",
    addressLine2: "Gansbaai, Western Cape, 7220",
    serviceArea: "Overberg & Overstrand",
    businessHours:
      "Mon–Thu: 08:00–17:00; Fri: 08:00–16:30; Sat & public holidays: by appointment",
    facebookUrl:
      "https://www.facebook.com/p/Gansbaai-Aircon-and-Refrigeration-100090960227976/",
    googleMapsEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d205.28137355643688!2d19.353156682732966!3d-34.59146604955906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dce10c7e8af9e5d%3A0x85f233d1d0fabfb!2sGansbaai%20Aircon%20and%20Refrigeration!5e0!3m2!1sen!2sza!4v1784290254971!5m2!1sen!2sza",
    googleMapsDirectionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=-34.59146604955906%2C19.353156682732966",
    googleMapsOpenUrl:
      "https://www.google.com/maps?cid=603239620478479355",
    googleReviewsUrl:
      "https://www.google.com/maps?cid=603239620478479355",
    googleLeaveReviewUrl:
      "https://www.google.com/search?hl=en-ZA&gl=za&q=Gansbaai+Aircon+and+Refrigeration#lrd=0x1dce10c7e8af9e5d:0x85f233d1d0fabfb,3,,,",
    seoTitle:
      "Gansbaai Aircon & Refrigeration | Overberg HVAC Services",
    seoDescription:
      "Family-run air conditioning, commercial refrigeration, cold room, wine cellar and milk tank specialists serving Gansbaai and the Overberg since 2005.",
  });

  const heroImage = await uploadImage("/gallery/gallery-12.jpg");
  await seedSingleton("hero", {
    _type: "hero",
    badgeText: "Serving Overberg & Overstrand",
    headlinePrefix: "Gansbaai",
    tagline: "Regulating The Temperature Since 2005",
    description:
      "Family-run since 2005, Gansbaai Aircon & Refrigeration CC installs, services and repairs air-conditioning and refrigeration systems for homes, businesses and farms throughout the Overberg.",
    quoteCtaText: "Request a Quote",
    backgroundImage: heroImage,
    backgroundImageAlt:
      "Gansbaai Aircon technicians servicing commercial air conditioning units",
  });

  await seedSingleton("whyChooseUs", {
    _type: "whyChooseUs",
    eyebrow: "Why Choose Us",
    title: "Trusted Local Experts Since 2005",
    description:
      "Based in Gansbaai and family-run, we pair practical advice with qualified workmanship and local backup.",
    items: [
      { _type: "whyChooseUsItem", _key: "w1", title: "Established Since 2005", description: "Local Overberg service since 2005\nLong-standing residential and commercial clients" },
      { _type: "whyChooseUsItem", _key: "w2", title: "Family-Owned", description: "Owner-managed local business\nDirect contact with the people doing the work" },
      { _type: "whyChooseUsItem", _key: "w3", title: "Honest Workmanship", description: "Clear advice and fair recommendations\nNeat install and repair finish" },
      { _type: "whyChooseUsItem", _key: "w4", title: "Qualified Technicians", description: "Experienced install and repair teams\nSupport across major AC and refrigeration brands" },
      { _type: "whyChooseUsItem", _key: "w5", title: "Emergency Breakdown Service", description: "24-hour refrigeration breakdown support\nHelp when waiting until morning is not an option" },
      { _type: "whyChooseUsItem", _key: "w6", title: "Residential, Commercial & Industrial", description: "Homes, shops, cold rooms and farms\nPractical experience across cooling systems" },
      { _type: "whyChooseUsItem", _key: "w7", title: "Serving Overberg & Overstrand", description: "Based in Gansbaai\nOn-site service across surrounding towns and farms" },
    ],
  });

  const featured = await uploadImage("/gallery/gallery-14.jpg");
  const g13 = await uploadImage("/gallery/gallery-13.jpg");
  const g14 = await uploadImage("/gallery/gallery-14.jpg");
  const g15 = await uploadImage("/gallery/gallery-15.jpg");
  const g16 = await uploadImage("/gallery/gallery-16.jpg");

  await seedSingleton("communityOutreach", {
    _type: "communityOutreach",
    eyebrow: "Community Outreach",
    title: "Reach for Recovery — Breast Cancer Fundraiser",
    description:
      "As a local family business, we believe in supporting the community that supports us.",
    message:
      "PLACEHOLDER: Complete approved fundraiser message — edit this in Studio with the full Reach for Recovery narrative.",
    closingLine: "Together, we've not only cooled homes—we've warmed hearts.",
    hashtags: ["#ReachForRecovery", "#BreastCancerAwarenessMonth", "#Gansbaai"],
    featuredImage: featured,
    featuredImageAlt:
      "Gansbaai Aircon team supporting the Reach for Recovery breast cancer fundraiser",
    galleryImages: [g13, g14, g15, g16].filter(Boolean).map((img, i) => ({
      ...img,
      _key: `cg${i}`,
      alt: `Reach for Recovery fundraiser photo ${i + 1}`,
    })),
  });

  await seedSingleton("legacy", {
    _type: "legacy",
    eyebrow: "Our Legacy",
    title: "A Family Business Built on Trust",
    description:
      "From Hein Goedde Snr's founding vision to the next generation — our story is one of honesty, quality, and community.",
    milestones: [
      { _type: "legacyMilestone", _key: "l1", year: "2005", title: "Founded by Hein Goedde Snr", description: "Gansbaai Aircon & Refrigeration CC was established with a commitment to honest workmanship and quality service." },
      { _type: "legacyMilestone", _key: "l2", year: "2005–2024", title: "Built on Trust", description: "Over nearly two decades, the business grew through word of mouth, reliable service, and a reputation for doing the job right." },
      { _type: "legacyMilestone", _key: "l3", year: "2025", title: "A New Chapter", description: "Ownership transferred to Hein Goedde Jnr, continuing the family legacy while embracing modern technology and techniques." },
      { _type: "legacyMilestone", _key: "l4", year: "Today", title: "Continuing the Legacy", description: "The same family values — honesty, quality, and community — now paired with up-to-date equipment and industry expertise." },
    ],
  });

  await seedSingleton("dealersSection", {
    _type: "dealersSection",
    eyebrow: "Approved Dealer",
    title: "Trusted Brand Partners",
    description:
      "We supply and service leading air conditioning and refrigeration brands with factory-approved expertise.",
    dealers: [
      { _type: "dealerItem", _key: "d1", name: "Samsung", logoAlt: "Samsung approved dealer" },
      { _type: "dealerItem", _key: "d2", name: "LG", logoAlt: "LG approved dealer" },
      { _type: "dealerItem", _key: "d3", name: "Alliance", logoAlt: "Alliance approved dealer" },
      { _type: "dealerItem", _key: "d4", name: "Scotsman", logoAlt: "Scotsman approved dealer" },
      { _type: "dealerItem", _key: "d5", name: "Staycold", logoAlt: "Staycold approved dealer" },
      { _type: "dealerItem", _key: "d6", name: "Comfee", logoAlt: "Comfee approved dealer" },
    ],
  });

  await seedSingleton("reviewsSection", {
    _type: "reviewsSection",
    eyebrow: "Customer Reviews",
    title: "What Our Clients Say",
    description:
      "Visit our Google business listing to read feedback or leave a review after your job is complete.",
    reviews: [
      { _type: "reviewItem", _key: "r1", author: "PLACEHOLDER: Customer Name", text: "PLACEHOLDER: Add verified Google review text in Studio.", rating: 5, isPlaceholder: true },
      { _type: "reviewItem", _key: "r2", author: "PLACEHOLDER: Customer Name", text: "PLACEHOLDER: Add verified Google review text in Studio.", rating: 5, isPlaceholder: true },
      { _type: "reviewItem", _key: "r3", author: "PLACEHOLDER: Customer Name", text: "PLACEHOLDER: Add verified Google review text in Studio.", rating: 5, isPlaceholder: true },
    ],
  });

  for (const service of services) {
    await client.createOrReplace({
      _id: service.id,
      _type: "service",
      title: service.title,
      slug: { _type: "slug", current: service.slug },
      description: service.description,
      iconName: service.iconName,
      order: service.order,
    });
    console.log(`✓ ${service.id}`);
  }

  for (const item of galleryMeta) {
    const image = await uploadImage(item.src);
    if (!image) continue;
    const docId = `galleryImage-${String(item.id).padStart(2, "0")}`;
    await client.createOrReplace({
      _id: docId,
      _type: "galleryImage",
      title: item.title,
      alt: item.alt,
      category: item.category,
      showInProjectGallery: item.showInProjectGallery,
      order: item.id,
      image,
    });
    console.log(`✓ ${docId}`);
  }

  console.log("\nSeed complete. Open /studio to review and publish content.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
