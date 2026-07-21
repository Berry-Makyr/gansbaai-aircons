import { defineArrayMember, defineField, defineType } from "sanity";

export const communityOutreachType = defineType({
  name: "communityOutreach",
  title: "Community Outreach",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow Label", type: "string" }),
    defineField({ name: "title", title: "Section Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Section Description", type: "text" }),
    defineField({
      name: "message",
      title: "Fundraiser Message",
      type: "text",
      rows: 6,
      description: "Full approved fundraiser narrative.",
    }),
    defineField({
      name: "closingLine",
      title: "Closing Quote",
      type: "string",
    }),
    defineField({
      name: "hashtags",
      title: "Hashtags",
      type: "array",
      of: [{ type: "string" }],
      description: "Include the # symbol, e.g. #ReachForRecovery",
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "featuredImageAlt",
      title: "Featured Image Alt Text",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "galleryImages",
      title: "Supporting Gallery Images",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({ name: "alt", title: "Alt Text", type: "string" }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", media: "featuredImage" },
  },
});
