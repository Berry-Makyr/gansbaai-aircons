import { defineArrayMember, defineField, defineType } from "sanity";

export const whyChooseUsType = defineType({
  name: "whyChooseUs",
  title: "Why Choose Us",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow Label", type: "string" }),
    defineField({ name: "title", title: "Section Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Section Description", type: "text" }),
    defineField({
      name: "items",
      title: "Trust Points",
      type: "array",
      of: [defineArrayMember({ type: "whyChooseUsItem" })],
      validation: (r) => r.min(1),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Why Choose Us" }),
  },
});
