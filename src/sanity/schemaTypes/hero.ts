import { defineField, defineType } from "sanity";

export const heroType = defineType({
  name: "hero",
  title: "Hero Section",
  type: "document",
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      initialValue: "Gansbaai Aircon",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subheadline",
      title: "Subheadline",
      type: "text",
      initialValue: "Regulating the temperature since 2005. Serving the Overstrand & Overberg areas.",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "ctaText",
      title: "Call to Action Text",
      type: "string",
      initialValue: "Get a Free Quote",
    }),
  ],
});
