import { defineArrayMember, defineField, defineType } from "sanity";

export const dealersSectionType = defineType({
  name: "dealersSection",
  title: "Approved Dealers",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow Label", type: "string" }),
    defineField({ name: "title", title: "Section Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Section Description", type: "text" }),
    defineField({
      name: "dealers",
      title: "Dealer Logos",
      type: "array",
      of: [defineArrayMember({ type: "dealerItem" })],
      validation: (r) => r.min(1),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Approved Dealers" }),
  },
});
