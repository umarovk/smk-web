import { defineField, defineType } from "sanity";

export const articleType = defineType({
  name: "article",
  title: "Berita & Artikel",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Judul Artikel",
      type: "string",
      validation: (rule) => rule.required().min(10).max(120),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      description: "Digunakan sebagai URL halaman berita. Klik Generate dari judul.",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Ringkasan",
      type: "text",
      rows: 3,
      description: "Ringkasan singkat untuk ditampilkan di kartu listing.",
      validation: (rule) => rule.required().min(20).max(300),
    }),
    defineField({
      name: "coverImage",
      title: "Gambar Sampul",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImageAlt",
      title: "Alt Text Gambar",
      type: "string",
      initialValue: "Gambar berita",
      validation: (rule) => rule.required().min(5),
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "string",
      options: {
        list: [
          { title: "Kegiatan", value: "kegiatan" },
          { title: "Prestasi", value: "prestasi" },
          { title: "Pengumuman", value: "pengumuman" },
          { title: "Akademik", value: "akademik" },
        ],
        layout: "radio",
      },
      initialValue: "kegiatan",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "body",
      title: "Isi Artikel",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
            defineField({
              name: "caption",
              title: "Keterangan Gambar",
              type: "string",
            }),
          ],
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Penulis",
      type: "string",
      initialValue: "Admin",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Tanggal Publikasi",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Opsional, jika kosong akan memakai judul artikel.",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 2,
      description: "Opsional, jika kosong akan memakai ringkasan artikel.",
    }),
  ],
  orderings: [
    {
      title: "Terbaru",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "coverImage",
    },
  },
});
