import { defineField, defineType } from "sanity";

export const profileSettingsType = defineType({
  name: "profileSettings",
  title: "Profile Page Settings",
  type: "document",
  fields: [
    defineField({
      name: "heroImage",
      title: "Hero / Banner Image",
      type: "image",
      options: { hotspot: true },
      description: "Foto utama banner halaman profil (landscape).",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroAlt",
      title: "Hero Alt Text",
      type: "string",
      initialValue: "Gedung sekolah tampak depan",
      validation: (rule) => rule.required().min(5),
    }),
    defineField({
      name: "profileDescription",
      title: "Deskripsi Profil Sekolah",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required().min(50),
    }),
    defineField({
      name: "profileImage",
      title: "Foto Profil Sekolah",
      type: "image",
      options: { hotspot: true },
      description: "Foto pendamping deskripsi profil.",
    }),
    defineField({
      name: "profileImageAlt",
      title: "Foto Profil Alt Text",
      type: "string",
      initialValue: "Suasana sekolah",
    }),
    defineField({
      name: "history",
      title: "Sejarah Sekolah",
      type: "text",
      rows: 6,
      validation: (rule) => rule.required().min(50),
    }),
    defineField({
      name: "historyImage",
      title: "Foto Sejarah",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "historyImageAlt",
      title: "Foto Sejarah Alt Text",
      type: "string",
      initialValue: "Dokumentasi sejarah sekolah",
    }),
    defineField({
      name: "vision",
      title: "Visi",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().min(20),
    }),
    defineField({
      name: "missions",
      title: "Misi",
      type: "array",
      of: [
        defineField({
          name: "missionItem",
          title: "Poin Misi",
          type: "object",
          fields: [
            defineField({
              name: "text",
              title: "Isi Misi",
              type: "text",
              rows: 2,
              validation: (rule) => rule.required().min(10),
            }),
          ],
          preview: {
            select: { title: "text" },
          },
        }),
      ],
      validation: (rule) => rule.min(1).max(10),
    }),
    defineField({
      name: "goals",
      title: "Tujuan",
      type: "array",
      of: [
        defineField({
          name: "goalItem",
          title: "Poin Tujuan",
          type: "object",
          fields: [
            defineField({
              name: "text",
              title: "Isi Tujuan",
              type: "text",
              rows: 2,
              validation: (rule) => rule.required().min(10),
            }),
          ],
          preview: {
            select: { title: "text" },
          },
        }),
      ],
      validation: (rule) => rule.min(1).max(10),
    }),
    defineField({
      name: "concentrations",
      title: "Konsentrasi Keahlian",
      type: "array",
      of: [
        defineField({
          name: "concentrationItem",
          title: "Konsentrasi",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Nama Konsentrasi",
              type: "string",
              validation: (rule) => rule.required().min(3),
            }),
            defineField({
              name: "description",
              title: "Deskripsi",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required().min(20),
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
        }),
      ],
      validation: (rule) => rule.min(1).max(8),
    }),
    defineField({
      name: "ctaBadge",
      title: "CTA Badge",
      type: "string",
      description: "Teks kecil di atas judul CTA (misal: 'Tertarik Bergabung?').",
      initialValue: "Tertarik Bergabung?",
      validation: (rule) => rule.required().min(3),
    }),
    defineField({
      name: "ctaTitle",
      title: "CTA Judul",
      type: "string",
      description: "Judul utama section CTA.",
      initialValue: "Daftarkan Diri Anda Sekarang",
      validation: (rule) => rule.required().min(5),
    }),
    defineField({
      name: "ctaDescription",
      title: "CTA Deskripsi",
      type: "text",
      rows: 3,
      description: "Deskripsi pendek di bawah judul CTA. Gunakan {siteName} untuk nama sekolah.",
      initialValue:
        "Bergabunglah bersama kami dan raih masa depan terbaik melalui pendidikan vokasi berkualitas.",
      validation: (rule) => rule.required().min(20),
    }),
    defineField({
      name: "galleryPhotos",
      title: "Galeri Foto Sekolah",
      type: "array",
      description: "Foto-foto tambahan untuk halaman profil.",
      of: [
        defineField({
          name: "photoItem",
          title: "Foto",
          type: "object",
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
              validation: (rule) => rule.required().min(5),
            }),
          ],
          preview: {
            select: {
              title: "alt",
              media: "image",
            },
          },
        }),
      ],
      validation: (rule) => rule.min(2).max(12),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Profile Page Settings" };
    },
  },
});
