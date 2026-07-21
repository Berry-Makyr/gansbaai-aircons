import { defineField, defineType } from "sanity";

export const whyChooseUsItem = defineType({
  name: "whyChooseUsItem",
  title: "Why Choose Us Item",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
});

export const legacyMilestone = defineType({
  name: "legacyMilestone",
  title: "Legacy Milestone",
  type: "object",
  fields: [
    defineField({ name: "year", title: "Year / Period", type: "string", validation: (r) => r.required() }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", validation: (r) => r.required() }),
  ],
  preview: {
    select: { title: "title", subtitle: "year" },
  },
});

export const dealerItem = defineType({
  name: "dealerItem",
  title: "Dealer",
  type: "object",
  fields: [
    defineField({ name: "name", title: "Brand Name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Upload an official approved dealer logo (SVG or WebP preferred).",
      options: { hotspot: true },
    }),
    defineField({
      name: "logoAlt",
      title: "Logo Alt Text",
      type: "string",
      description: "Describe the logo for accessibility, e.g. Samsung approved dealer.",
    }),
  ],
  preview: {
    select: { title: "name", media: "logo" },
  },
});

export const reviewItem = defineType({
  name: "reviewItem",
  title: "Review",
  type: "object",
  fields: [
    defineField({ name: "author", title: "Customer Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "text", title: "Review Text", type: "text", validation: (r) => r.required() }),
    defineField({
      name: "rating",
      title: "Star Rating",
      type: "number",
      validation: (r) => r.required().min(1).max(5).integer(),
      initialValue: 5,
    }),
    defineField({
      name: "isPlaceholder",
      title: "Placeholder (not yet verified)",
      type: "boolean",
      description: "Enable only for draft placeholders. Use real verified Google reviews for production.",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "author", subtitle: "text" },
  },
});

export const galleryCategoryList = [
  { title: "Installation", value: "Installation" },
  { title: "Maintenance", value: "Maintenance" },
  { title: "Commercial", value: "Commercial" },
  { title: "Refrigeration", value: "Refrigeration" },
  { title: "Repairs", value: "Repairs" },
  { title: "Service", value: "Service" },
  { title: "Community", value: "Community" },
  { title: "Promotional", value: "Promotional" },
] as const;

export const serviceIconList = [
  { title: "Snowflake (Aircon)", value: "snowflake" },
  { title: "Thermometer (Refrigeration)", value: "thermometer-snowflake" },
  { title: "Warehouse (Cold Rooms)", value: "warehouse" },
  { title: "Wine (Wine Cellar)", value: "wine" },
  { title: "Car (Vehicle Aircon)", value: "car" },
  { title: "Shield (Rust Treatment)", value: "shield" },
  { title: "Wind (Ventilation)", value: "wind" },
  { title: "Flame (Heat Pumps)", value: "flame" },
  { title: "Milk (Dairy)", value: "milk" },
] as const;
