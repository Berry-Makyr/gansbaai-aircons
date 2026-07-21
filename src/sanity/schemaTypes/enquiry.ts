import { defineField, defineType } from "sanity";

export const enquiryType = defineType({
  name: "enquiry",
  title: "Website Enquiry",
  type: "document",
  fields: [
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      initialValue: "new",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Contacted", value: "contacted" },
          { title: "Completed", value: "completed" },
          { title: "Spam", value: "spam" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted",
      type: "datetime",
      readOnly: true,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "service",
      title: "Service",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      rows: 8,
      readOnly: true,
    }),
    defineField({
      name: "internalNotes",
      title: "Internal Notes",
      description: "Private follow-up notes for the team.",
      type: "text",
      rows: 5,
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      service: "service",
      submittedAt: "submittedAt",
      status: "status",
    },
    prepare({ title, service, submittedAt, status }) {
      const date = submittedAt
        ? new Date(submittedAt).toLocaleString("en-ZA")
        : "Unknown date";
      return {
        title: title || "Unnamed enquiry",
        subtitle: `${status || "new"} · ${service || "General"} · ${date}`,
      };
    },
  },
});
