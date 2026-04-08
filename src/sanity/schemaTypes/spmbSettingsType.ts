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
      name: "galleryPhotos",
      title: "Foto Suasana SPMB",
      type: "array",
      of: [
        {
          type: "object",
          name: "photoItem",
          title: "Foto",
          fields: [
            defineField({
              name: "image",
              title: "Gambar",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              validation: (rule) => rule.required().min(4),
            }),
          ],
          preview: {
            select: {
              title: "alt",
              media: "image",
            },
          },
        },
      ],
      validation: (rule) => rule.min(1).max(6),
    }),
    defineField({
      name: "galleryHeading",
      title: "Judul Section Foto",
      type: "string",
      initialValue: "Suasana SPMB",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "registrationInfoHeading",
      title: "Judul Section Informasi Pendaftaran",
      type: "string",
      initialValue: "Informasi Pendaftaran",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "concentrationsHeading",
      title: "Judul Section Program Keahlian",
      type: "string",
      initialValue: "Program Keahlian Tersedia",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "requirementsHeading",
      title: "Judul Section Persyaratan",
      type: "string",
      initialValue: "Persyaratan",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "registrationFlowHeading",
      title: "Judul Section Alur Pendaftaran",
      type: "string",
      initialValue: "Alur Pendaftaran",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "scheduleHeading",
      title: "Judul Section Jadwal",
      type: "string",
      initialValue: "Jadwal SPMB",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "scheduleSecondaryHeading",
      title: "Judul Jadwal Kedua",
      type: "string",
      initialValue: "Jadwal Tahap Lanjutan",
      validation: (rule) => rule.required(),
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
      name: "scheduleSecondaryItems",
      title: "Jadwal Kedua",
      type: "array",
      of: [{ type: "string" }],
      validation: (rule) => rule.min(1).max(12),
    }),
    defineField({
      name: "showReRegistrationSection",
      title: "Tampilkan Section Biaya Daftar Ulang",
      type: "boolean",
      initialValue: true,
      description: "Aktifkan untuk menampilkan, nonaktifkan untuk menyembunyikan section ini.",
    }),
    defineField({
      name: "reRegistrationHeading",
      title: "Judul Section Biaya Daftar Ulang",
      type: "string",
      initialValue: "Biaya Daftar Ulang",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "femaleFeeTitle",
      title: "Judul Tabel Putri",
      type: "string",
      initialValue: "Untuk Siswa Putri",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "femaleFeeItems",
      title: "Item Biaya Putri",
      type: "array",
      of: [
        {
          type: "object",
          name: "feeItem",
          title: "Item Biaya",
          fields: [
            defineField({
              name: "label",
              title: "Nama Item",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "amount",
              title: "Nominal (angka saja)",
              type: "number",
              validation: (rule) => rule.required().min(0),
            }),
          ],
          preview: {
            select: {
              title: "label",
              amount: "amount",
            },
            prepare(selection) {
              return {
                title: selection.title,
                subtitle:
                  typeof selection.amount === "number"
                    ? `Rp ${new Intl.NumberFormat("id-ID").format(selection.amount)}`
                    : "Rp 0",
              };
            },
          },
        },
      ],
      validation: (rule) => rule.min(1).max(30),
    }),
    defineField({
      name: "femaleTotalLabel",
      title: "Label Total Putri",
      type: "string",
      initialValue: "Total Biaya Daftar Ulang",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "femaleTotalAmount",
      title: "Total Putri (angka saja)",
      type: "number",
      initialValue: 1690000,
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "femaleAchievementNote",
      title: "Catatan Jalur Prestasi Putri",
      type: "string",
      initialValue: "Jalur Prestasi Daftar Ulang Sebesar : Rp. 1.175.000",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "maleFeeTitle",
      title: "Judul Tabel Putra",
      type: "string",
      initialValue: "Untuk Siswa Putra",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "maleFeeItems",
      title: "Item Biaya Putra",
      type: "array",
      of: [
        {
          type: "object",
          name: "feeItemMale",
          title: "Item Biaya",
          fields: [
            defineField({
              name: "label",
              title: "Nama Item",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "amount",
              title: "Nominal (angka saja)",
              type: "number",
              validation: (rule) => rule.required().min(0),
            }),
          ],
          preview: {
            select: {
              title: "label",
              amount: "amount",
            },
            prepare(selection) {
              return {
                title: selection.title,
                subtitle:
                  typeof selection.amount === "number"
                    ? `Rp ${new Intl.NumberFormat("id-ID").format(selection.amount)}`
                    : "Rp 0",
              };
            },
          },
        },
      ],
      validation: (rule) => rule.min(1).max(30),
    }),
    defineField({
      name: "maleTotalLabel",
      title: "Label Total Putra",
      type: "string",
      initialValue: "Total Biaya Daftar Ulang",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "maleTotalAmount",
      title: "Total Putra (angka saja)",
      type: "number",
      initialValue: 1615000,
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "maleAchievementNote",
      title: "Catatan Jalur Prestasi Putra",
      type: "string",
      initialValue: "Jalur Prestasi Daftar Ulang Sebesar : Rp. 1.175.000",
      validation: (rule) => rule.required(),
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
