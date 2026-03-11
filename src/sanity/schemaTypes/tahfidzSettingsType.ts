import { defineField, defineType } from "sanity";

export const tahfidzSettingsType = defineType({
  name: "tahfidzSettings",
  title: "Program Tahfidz Settings",
  type: "document",
  fields: [
    defineField({
      name: "heroBadge",
      title: "Hero Badge",
      type: "string",
      initialValue: "Program Unggulan Keislaman",
      validation: (rule) => rule,
    }),
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      initialValue: "Program Tahfidzul Qur'an",
      validation: (rule) => rule.min(5),
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.min(20),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "heroImageAlt",
      title: "Hero Image Alt",
      type: "string",
      initialValue: "Kegiatan tahfidz siswa",
    }),
    defineField({
      name: "targetHafalan",
      title: "Target Hafalan",
      type: "string",
      initialValue: "3-5 Juz selama masa studi",
      validation: (rule) => rule,
    }),
    defineField({
      name: "programPoints",
      title: "Poin Program",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.min(2).max(8),
    }),
    defineField({
      name: "scheduleItems",
      title: "Jadwal Pembinaan",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.min(2).max(8),
    }),
    defineField({
      name: "benefits",
      title: "Manfaat Program",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.min(2).max(10),
    }),
    defineField({
      name: "ctaTitle",
      title: "CTA Title",
      type: "string",
      initialValue: "Ingin Bergabung Program Tahfidz?",
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
      return { title: "Program Tahfidz Settings" };
    },
  },
});
