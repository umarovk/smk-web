import { defineField, defineType } from "sanity";

export const navLinkType = defineType({
  name: "navLink",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "href",
      title: "Href",
      type: "string",
      description: "Path seperti /profil atau anchor seperti #kontak",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "href" },
    prepare({ title, subtitle }) {
      return {
        title: title || "(tanpa label)",
        subtitle: subtitle || "(tanpa href)",
      };
    },
  },
});
