import { defineField, defineType } from "sanity";

export const navDropdownType = defineType({
  name: "navDropdown",
  title: "Dropdown",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "source",
      title: "Sumber Isi Dropdown",
      type: "string",
      description:
        "Manual: isi sendiri di bawah. Jurusan: otomatis pakai daftar Jurusan/Concentration yang sudah dibuat.",
      options: {
        list: [
          { title: "Manual", value: "manual" },
          { title: "Otomatis dari Jurusan", value: "concentrations" },
        ],
        layout: "radio",
      },
      initialValue: "manual",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "items",
      title: "Items Dropdown",
      description: "Diisi hanya kalau Sumber = Manual.",
      type: "array",
      of: [{ type: "navLink" }],
      hidden: ({ parent }) =>
        (parent as { source?: string } | undefined)?.source === "concentrations",
      validation: (rule) =>
        rule.custom((value, ctx) => {
          const parent = ctx.parent as { source?: string } | undefined;
          if (parent?.source === "manual" && (!value || value.length === 0)) {
            return "Tambahkan minimal 1 item untuk dropdown manual";
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: { title: "label", source: "source", items: "items" },
    prepare({ title, source, items }) {
      const subtitle =
        source === "concentrations"
          ? "Otomatis: Jurusan"
          : `Manual${Array.isArray(items) && items.length > 0 ? ` (${items.length} item)` : ""}`;
      return {
        title: `Dropdown · ${title || "(tanpa label)"}`,
        subtitle,
      };
    },
  },
});
