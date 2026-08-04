import { defineField, defineType } from "sanity";

export const heroType = defineType({
  name: "hero",
  title: "Hero Section",
  type: "document",
  fields: [
    defineField({
      name: "badgeText",
      title: "Badge Text",
      type: "string",
      description: "Small label above the headline, e.g. Serving Overberg & Overstrand",
    }),
    defineField({
      name: "headlinePrefix",
      title: "Headline Prefix",
      type: "string",
      description: 'Text before the styled "Aircon" word, usually "Gansbaai"',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({
      name: "description",
      title: "Supporting Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "backgroundImage",
      title: "Desktop Background Image",
      type: "image",
      description:
        "Hero photo shown on tablet and desktop (md breakpoint and up).",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "backgroundImageAlt",
      title: "Desktop Background Image Alt Text",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mobileBackgroundImage",
      title: "Mobile Background Image",
      type: "image",
      description:
        "Optional. Hero photo shown on phones. If empty, the desktop image is used.",
      options: { hotspot: true },
    }),
    defineField({
      name: "mobileBackgroundImageAlt",
      title: "Mobile Background Image Alt Text",
      type: "string",
      description:
        "Alt text for the mobile hero image. Falls back to the desktop alt text if empty.",
    }),
    defineField({
      name: "quoteCtaText",
      title: "Quote Button Text",
      type: "string",
      initialValue: "Request a Quote",
    }),
  ],
  preview: {
    select: {
      title: "headlinePrefix",
      subtitle: "tagline",
      media: "backgroundImage",
    },
  },
});
