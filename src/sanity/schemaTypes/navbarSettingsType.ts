import { defineField, defineType } from "sanity";

export const navbarSettingsType = defineType({
  name: "navbarSettings",
  title: "Navbar Settings",
  type: "document",
  fields: [
    defineField({
      name: "mainLinks",
      title: "Main Links",
      type: "array",
      of: [
        defineField({
          name: "mainLinkItem",
          title: "Main Link",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule,
            }),
            defineField({
              name: "href",
              title: "Href",
              type: "string",
              description: "Gunakan path seperti /profil atau anchor seperti #kontak",
              validation: (rule) => rule,
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "href",
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1).max(8),
    }),
    defineField({
      name: "jurusanLabel",
      title: "Jurusan Dropdown Label",
      type: "string",
      initialValue: "Jurusan",
      validation: (rule) => rule,
    }),
    defineField({
      name: "secondaryLinks",
      title: "Secondary Links",
      type: "array",
      of: [
        defineField({
          name: "secondaryLinkItem",
          title: "Secondary Link",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule,
            }),
            defineField({
              name: "href",
              title: "Href",
              type: "string",
              description: "Gunakan path seperti /berita atau anchor seperti #kontak",
              validation: (rule) => rule,
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "href",
            },
          },
        }),
      ],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Button Label",
      type: "string",
      initialValue: "SPMB",
      validation: (rule) => rule,
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Button Href",
      type: "string",
      initialValue: "/spmb",
      validation: (rule) => rule,
    }),
  ],
  preview: {
    prepare() {
      return { title: "Navbar Settings" };
    },
  },
});
