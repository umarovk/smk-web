import { defineField, defineType } from "sanity";

export const footerSettingsType = defineType({
  name: "footerSettings",
  title: "Footer Settings",
  type: "document",
  fields: [
    defineField({
      name: "description",
      title: "Deskripsi Sekolah",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().min(20),
    }),
    defineField({
      name: "address",
      title: "Alamat",
      type: "string",
      validation: (rule) => rule.required().min(10),
    }),
    defineField({
      name: "phone",
      title: "Nomor Telepon",
      type: "string",
      validation: (rule) => rule.required().min(8),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "quickLinks",
      title: "Tautan Cepat",
      type: "array",
      of: [
        defineField({
          name: "linkItem",
          title: "Tautan",
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required().min(2),
            }),
            defineField({
              name: "href",
              title: "URL / Path",
              type: "string",
              description: "Contoh: /profil atau #ppdb",
              validation: (rule) => rule.required().min(1),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        }),
      ],
      validation: (rule) => rule.min(1).max(6),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Footer Settings",
      };
    },
  },
});
