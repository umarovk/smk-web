import { defineField, defineType } from "sanity";

export const siteSettingsType = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteName",
      title: "Nama Sekolah",
      type: "string",
      validation: (rule) => rule.min(3),
    }),
    defineField({
      name: "logo",
      title: "Logo Sekolah",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: "siteName",
      media: "logo",
    },
    prepare(selection) {
      return {
        title: selection.title || "Site Settings",
        media: selection.media,
      };
    },
  },
});
