import { defineField, defineType } from "sanity";
import { serviceIconList } from "./objects";

export const serviceType = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Service Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/&/g, "and")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, "")
            .slice(0, 96),
      },
      validation: (rule) =>
        rule.required().custom((value) => {
          const current = value?.current || "";
          if (!current) return "Required";
          if (/[^a-z0-9-]/.test(current)) {
            return "Use lowercase letters, numbers and hyphens only (no & or spaces).";
          }
          return true;
        }),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "iconName",
      title: "Icon",
      type: "string",
      options: { list: [...serviceIconList] },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Optional Custom Image",
      type: "image",
      description: "Optional. Leave empty to use the selected icon above.",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first on the homepage.",
    }),
  ],
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "description", media: "icon" },
  },
});
