import { defineField, defineType } from "sanity";

/** Daily traffic snapshot copied from Vercel — keeps history beyond Hobby's 31-day API window. */
export const analyticsDayType = defineType({
  name: "analyticsDay",
  title: "Analytics Day",
  type: "document",
  fields: [
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      validation: (rule) => rule.required(),
      readOnly: true,
    }),
    defineField({
      name: "visitors",
      title: "Visitors",
      type: "number",
      validation: (rule) => rule.required().min(0),
      readOnly: true,
    }),
    defineField({
      name: "pageviews",
      title: "Pageviews",
      type: "number",
      validation: (rule) => rule.required().min(0),
      readOnly: true,
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      initialValue: "vercel",
      readOnly: true,
    }),
    defineField({
      name: "capturedAt",
      title: "Captured at",
      type: "datetime",
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      date: "date",
      visitors: "visitors",
      pageviews: "pageviews",
    },
    prepare({ date, visitors, pageviews }) {
      return {
        title: date || "Unknown day",
        subtitle: `${visitors ?? 0} visitors · ${pageviews ?? 0} pageviews`,
      };
    },
  },
});
