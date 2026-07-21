import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Business & Contact Details",
  type: "document",
  fields: [
    defineField({
      name: "businessName",
      title: "Full Business Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortName",
      title: "Short Name",
      type: "string",
      description: "Used in the footer and compact areas.",
    }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "establishedYear", title: "Established Year", type: "number" }),
    defineField({
      name: "phoneDisplay",
      title: "Main Phone (display)",
      type: "string",
      description: "Shown on the website, e.g. 028 384 0703",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "phoneTel",
      title: "Main Phone (tel link)",
      type: "string",
      description: "International format for click-to-call, e.g. +27728229897",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "emergencyPhoneDisplay",
      title: "24-Hour Emergency Phone (display)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "emergencyPhoneTel",
      title: "24-Hour Emergency Phone (tel link)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number",
      type: "string",
      description: "Digits only with country code, e.g. 27728229897",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "whatsappDefaultMessage",
      title: "WhatsApp Default Message",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      description: "Add your preferred business email here before going live.",
      validation: (rule) => rule.email().warning("Use a valid email address"),
    }),
    defineField({
      name: "addressLine1",
      title: "Street Address",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "addressLine2",
      title: "City / Province / Postal Code",
      type: "string",
    }),
    defineField({ name: "serviceArea", title: "Service Area", type: "string" }),
    defineField({
      name: "businessHours",
      title: "Business Hours",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "facebookUrl", title: "Facebook URL", type: "url" }),
    defineField({
      name: "googleMapsEmbedUrl",
      title: "Google Maps Embed URL",
      type: "url",
      description: "Paste the iframe src URL from Google Maps → Share → Embed a map.",
    }),
    defineField({
      name: "googleMapsDirectionsUrl",
      title: "Google Maps Directions URL",
      type: "url",
    }),
    defineField({
      name: "googleMapsOpenUrl",
      title: "Open in Google Maps URL",
      type: "url",
    }),
    defineField({
      name: "googleReviewsUrl",
      title: "Google Reviews Page URL",
      type: "url",
    }),
    defineField({
      name: "googleLeaveReviewUrl",
      title: "Leave a Google Review URL",
      type: "url",
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Page Title",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Meta Description",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    prepare: () => ({ title: "Business & Contact Details" }),
  },
});
