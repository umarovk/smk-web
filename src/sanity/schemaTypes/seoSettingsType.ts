import { defineField, defineType } from "sanity";

export const seoSettingsType = defineType({
  name: "seoSettings",
  title: "SEO Settings",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      initialValue: "SMK Web",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "defaultDescription",
      title: "Default Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().min(20),
    }),
    defineField({
      name: "defaultOgImage",
      title: "Default OG Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "homeTitle", title: "Home Title", type: "string" }),
    defineField({ name: "homeDescription", title: "Home Description", type: "text", rows: 2 }),
    defineField({ name: "profileTitle", title: "Profile Title", type: "string" }),
    defineField({
      name: "profileDescription",
      title: "Profile Description",
      type: "text",
      rows: 2,
    }),
    defineField({ name: "newsTitle", title: "News Title", type: "string" }),
    defineField({ name: "newsDescription", title: "News Description", type: "text", rows: 2 }),
    defineField({ name: "contactTitle", title: "Contact Title", type: "string" }),
    defineField({
      name: "contactDescription",
      title: "Contact Description",
      type: "text",
      rows: 2,
    }),
    defineField({ name: "tahfidzTitle", title: "Tahfidz Title", type: "string" }),
    defineField({
      name: "tahfidzDescription",
      title: "Tahfidz Description",
      type: "text",
      rows: 2,
    }),
    defineField({ name: "spmbTitle", title: "SPMB Title", type: "string" }),
    defineField({ name: "spmbDescription", title: "SPMB Description", type: "text", rows: 2 }),
  ],
  preview: {
    prepare() {
      return { title: "SEO Settings" };
    },
  },
});
