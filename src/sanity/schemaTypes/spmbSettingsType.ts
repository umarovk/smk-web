import { defineField, defineType } from "sanity";

export const spmbSettingsType = defineType({
  name: "spmbSettings",
  title: "SPMB Settings",
  type: "document",
  fields: [
    defineField({
      name: "heroBadge",
      title: "Hero Badge",
      type: "string",
      initialValue: "Penerimaan Murid Baru",
      validation: (rule) => rule,
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      initialValue: "Informasi SPMB",
      validation: (rule) => rule,
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.min(20),
    }),
    defineField({
      name: "registrationInfo",
      title: "Informasi Pendaftaran",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.min(2).max(8),
    }),
    defineField({
      name: "requirements",
      title: "Persyaratan",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.min(3).max(12),
    }),
    defineField({
      name: "registrationFlow",
      title: "Alur Pendaftaran",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.min(3).max(12),
    }),
    defineField({
      name: "scheduleItems",
      title: "Jadwal SPMB",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.min(3).max(12),
    }),
    defineField({
      name: "ctaTitle",
      title: "CTA Title",
      type: "string",
      initialValue: "Butuh Bantuan Pendaftaran?",
      validation: (rule) => rule,
    }),
    defineField({
      name: "ctaDescription",
      title: "CTA Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.min(20),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Kosongkan jika ingin mengikuti default SEO global.",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 2,
      description: "Kosongkan jika ingin mengikuti default SEO global.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "SPMB Settings" };
    },
  },
});
