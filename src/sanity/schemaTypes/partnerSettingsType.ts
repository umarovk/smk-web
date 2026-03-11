import { defineField, defineType } from "sanity";

export const partnerSettingsType = defineType({
  name: "partnerSettings",
  title: "Partner & MoU Settings",
  type: "document",
  fields: [
    defineField({
      name: "heading",
      title: "Judul Section",
      type: "string",
      initialValue: "Media Partner & Industri MoU",
      validation: (rule) => rule.min(5),
    }),
    defineField({
      name: "description",
      title: "Deskripsi Section",
      type: "text",
      rows: 3,
      initialValue:
        "Sekolah kami berkolaborasi dengan media partner dan perusahaan industri untuk memperkuat pembelajaran berbasis dunia kerja.",
      validation: (rule) => rule.min(20),
    }),
    defineField({
      name: "partners",
      title: "Daftar Partner",
      type: "array",
      description: "Logo akan berjalan otomatis dalam slider pada halaman beranda.",
      of: [
        defineField({
          name: "partnerItem",
          title: "Partner",
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: "Nama Partner",
              type: "string",
              validation: (rule) => rule.min(2),
            }),
            defineField({
              name: "category",
              title: "Kategori",
              type: "string",
              options: {
                list: [
                  { title: "Media Partner", value: "media" },
                  { title: "Perusahaan MoU", value: "company" },
                ],
                layout: "radio",
              },
              initialValue: "company",
              validation: (rule) => rule,
            }),
            defineField({
              name: "logo",
              title: "Logo",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule,
            }),
            defineField({
              name: "website",
              title: "Website (Opsional)",
              type: "url",
            }),
          ],
          preview: {
            select: {
              title: "name",
              subtitle: "category",
              media: "logo",
            },
            prepare(selection) {
              const categoryLabel =
                selection.subtitle === "media" ? "Media Partner" : "Perusahaan MoU";

              return {
                title: selection.title,
                subtitle: categoryLabel,
                media: selection.media,
              };
            },
          },
        }),
      ],
      validation: (rule) => rule.min(1).max(24),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Partner & MoU Settings",
      };
    },
  },
});
