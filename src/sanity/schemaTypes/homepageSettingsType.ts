import { defineField, defineType } from "sanity";

export const homepageSettingsType = defineType({
    name: "homepageSettings",
    title: "Homepage Settings",
    type: "document",
    fields: [
        defineField({
            name: "heroBadge",
            title: "Hero Badge",
            type: "string",
            initialValue: "Portal Resmi Sekolah",
            validation: (rule) => rule,
        }),
        defineField({
            name: "heroTitlePrefix",
            title: "Hero Title Prefix",
            type: "string",
            initialValue: "Pendidikan Modern untuk Masa Depan Cerah di",
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
            name: "heroPrimaryButtonLabel",
            title: "Hero Primary Button Label",
            type: "string",
            initialValue: "Lihat Profil Sekolah",
            validation: (rule) => rule,
        }),
        defineField({
            name: "heroPrimaryButtonHref",
            title: "Hero Primary Button Link",
            type: "string",
            initialValue: "/profil",
            validation: (rule) => rule,
        }),
        defineField({
            name: "heroSecondaryButtonLabel",
            title: "Hero Secondary Button Label",
            type: "string",
            initialValue: "Kelola Konten",
            validation: (rule) => rule,
        }),
        defineField({
            name: "heroSecondaryButtonHref",
            title: "Hero Secondary Button Link",
            type: "string",
            initialValue: "/studio",
            validation: (rule) => rule,
        }),
        defineField({
            name: "heroFrameImage",
            title: "Hero Frame Image (Gambar Besar)",
            type: "image",
            options: { hotspot: true },
            validation: (rule) => rule,
        }),
        defineField({
            name: "heroFrameAlt",
            title: "Hero Frame Alt Text",
            type: "string",
            initialValue: "Ilustrasi lingkungan sekolah",
            validation: (rule) => rule.min(5),
        }),
        defineField({
            name: "metrics",
            title: "Metrik Ringkas",
            type: "array",
            of: [
                defineField({
                    name: "metricItem",
                    title: "Metrik",
                    type: "object",
                    fields: [
                        defineField({
                            name: "label",
                            title: "Label",
                            type: "string",
                            validation: (rule) => rule,
                        }),
                        defineField({
                            name: "value",
                            title: "Value",
                            type: "string",
                            validation: (rule) => rule,
                        }),
                    ],
                    preview: {
                        select: { title: "label", subtitle: "value" },
                    },
                }),
            ],
            validation: (rule) => rule.min(1).max(6),
        }),
        defineField({
            name: "pillarsHeading",
            title: "Judul Section Fokus Pendidikan",
            type: "string",
            initialValue: "Lingkungan Belajar yang Profesional",
            validation: (rule) => rule,
        }),
        defineField({
            name: "metricsButtonLabel",
            title: "Metrics Button Label",
            type: "string",
            initialValue: "Daftar Sekarang",
            validation: (rule) => rule,
        }),
        defineField({
            name: "metricsButtonHref",
            title: "Metrics Button Link",
            type: "string",
            initialValue: "/spmb",
            validation: (rule) => rule,
        }),
        defineField({
            name: "pillars",
            title: "Pilar Pendidikan",
            type: "array",
            of: [
                defineField({
                    name: "pillarItem",
                    title: "Pilar",
                    type: "object",
                    fields: [
                        defineField({
                            name: "title",
                            title: "Judul",
                            type: "string",
                            validation: (rule) => rule,
                        }),
                        defineField({
                            name: "description",
                            title: "Deskripsi",
                            type: "text",
                            rows: 3,
                            validation: (rule) => rule.min(20),
                        }),
                    ],
                    preview: {
                        select: { title: "title", subtitle: "description" },
                    },
                }),
            ],
            validation: (rule) => rule.min(1).max(6),
        }),
        defineField({
            name: "galleryFrames",
            title: "Frame Foto Homepage",
            type: "array",
            of: [
                defineField({
                    name: "galleryFrameItem",
                    title: "Frame Foto",
                    type: "object",
                    fields: [
                        defineField({
                            name: "image",
                            title: "Gambar",
                            type: "image",
                            options: { hotspot: true },
                            validation: (rule) => rule,
                        }),
                        defineField({
                            name: "alt",
                            title: "Alt Text",
                            type: "string",
                            validation: (rule) => rule.min(5),
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
            validation: (rule) => rule.min(2).max(6),
        }),
        defineField({
            name: "ctaTitlePrefix",
            title: "CTA Title Prefix",
            type: "string",
            initialValue: "Bergabung Bersama",
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
            name: "ctaPrimaryButtonLabel",
            title: "CTA Primary Button Label",
            type: "string",
            initialValue: "Info SPMB",
            validation: (rule) => rule,
        }),
        defineField({
            name: "ctaPrimaryButtonHref",
            title: "CTA Primary Button Link",
            type: "string",
            initialValue: "/spmb",
            validation: (rule) => rule,
        }),
        defineField({
            name: "ctaSecondaryButtonLabel",
            title: "CTA Secondary Button Label",
            type: "string",
            initialValue: "Kelola Konten Sekolah",
            validation: (rule) => rule,
        }),
        defineField({
            name: "ctaSecondaryButtonHref",
            title: "CTA Secondary Button Link",
            type: "string",
            initialValue: "/studio",
            validation: (rule) => rule,
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
            return { title: "Homepage Settings" };
        },
    },
});
