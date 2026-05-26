import { defineField, defineType } from "sanity";

export const navbarSettingsType = defineType({
  name: "navbarSettings",
  title: "Navbar Settings",
  type: "document",
  fields: [
    defineField({
      name: "items",
      title: "Navigation Items",
      description:
        "Daftar item navbar dari kiri ke kanan. Tambah 'Link' untuk link biasa atau 'Dropdown' untuk menu dropdown. Tombol CTA selalu muncul paling kanan.",
      type: "array",
      of: [{ type: "navLink" }, { type: "navDropdown" }],
      validation: (rule) => rule.min(1).max(12),
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Button Label",
      type: "string",
      initialValue: "SPMB",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ctaHref",
      title: "CTA Button Href",
      type: "string",
      initialValue: "/spmb",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Navbar Settings" };
    },
  },
});
