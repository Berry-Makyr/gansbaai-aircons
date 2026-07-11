import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "businessName",
      title: "Business Name",
      type: "string",
      initialValue: "Gansbaai Aircon",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      initialValue: "Regulating the temperature since 2005",
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      initialValue: "+27 00 000 0000",
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      initialValue: "info@gansbaaiaircon.co.za",
    }),
    defineField({
      name: "address",
      title: "Physical Address",
      type: "text",
      initialValue: "Gansbaai, Western Cape, South Africa",
    }),
    defineField({
      name: "businessHours",
      title: "Business Hours",
      type: "text",
      initialValue: "Mon-Fri: 8:00 AM - 5:00 PM",
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook URL",
      type: "url",
      initialValue: "https://www.facebook.com/p/Gansbaai-Aircon-and-Refrigeration-100090960227976/",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Meta Description",
      type: "text",
      initialValue: "Professional air conditioning and refrigeration services in Gansbaai, Overstrand, and Overberg areas. Regulating the temperature since 2005.",
    }),
  ],
});
