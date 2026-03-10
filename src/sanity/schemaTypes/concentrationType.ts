import { defineField, defineType } from "sanity";

export const concentrationType = defineType({
  name: "concentration",
  title: "Jurusan / Konsentrasi Keahlian",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nama Konsentrasi",
      type: "string",
      validation: (rule) => rule.required().min(3),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      description: "Digunakan sebagai URL halaman jurusan. Klik Generate dari nama.",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Deskripsi",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().min(20),
    }),
    defineField({
      name: "duration",
      title: "Durasi Program",
      type: "string",
      description: "Contoh: 3 Tahun",
      initialValue: "3 Tahun",
    }),
    defineField({
      name: "competencyFocus",
      title: "Fokus Kompetensi",
      type: "array",
      of: [{ type: "string" }],
      description: "Daftar kemampuan utama yang dipelajari siswa.",
      validation: (rule) => rule.min(1).max(8),
    }),
    defineField({
      name: "careerProspects",
      title: "Prospek Karier",
      type: "array",
      of: [{ type: "string" }],
      description: "Contoh: Network Administrator, Teknisi Bengkel, dll.",
      validation: (rule) => rule.min(1).max(8),
    }),
    defineField({
      name: "facilities",
      title: "Fasilitas Pendukung",
      type: "array",
      of: [{ type: "string" }],
      description: "Contoh: Lab komputer, bengkel praktik, ruang simulasi, dll.",
      validation: (rule) => rule.max(10),
    }),
    defineField({
      name: "image",
      title: "Foto Konsentrasi",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "imageAlt",
      title: "Foto Alt Text",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "description",
      media: "image",
    },
  },
});
