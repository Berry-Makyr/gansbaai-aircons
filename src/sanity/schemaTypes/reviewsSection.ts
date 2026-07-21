import { defineArrayMember, defineField, defineType } from "sanity";

export const reviewsSectionType = defineType({
  name: "reviewsSection",
  title: "Customer Reviews",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow Label", type: "string" }),
    defineField({ name: "title", title: "Section Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Section Description", type: "text" }),
    defineField({
      name: "reviews",
      title: "Reviews",
      type: "array",
      of: [defineArrayMember({ type: "reviewItem" })],
      description: "Use only verified Google reviews. Do not invent customer feedback.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Customer Reviews" }),
  },
});
