import { defineArrayMember, defineField, defineType } from "sanity";

export const legacyType = defineType({
  name: "legacy",
  title: "Our Legacy",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow Label", type: "string" }),
    defineField({ name: "title", title: "Section Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Section Description", type: "text" }),
    defineField({
      name: "milestones",
      title: "Timeline Milestones",
      type: "array",
      of: [defineArrayMember({ type: "legacyMilestone" })],
      validation: (r) => r.min(1),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Our Legacy" }),
  },
});
