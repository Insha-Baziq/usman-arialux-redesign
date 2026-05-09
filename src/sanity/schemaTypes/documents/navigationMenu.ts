import { defineArrayMember, defineField, defineType } from "sanity";

export const navigationMenu = defineType({
  name: "navigationMenu",
  title: "Navigation menu",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Menu title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      title: "Menu items",
      type: "array",
      of: [defineArrayMember({ type: "navigationItem" })],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      items: "items",
    },
    prepare({ title, items }) {
      const count = Array.isArray(items) ? items.length : 0;
      return {
        title,
        subtitle: `${count} top-level item${count === 1 ? "" : "s"}`,
      };
    },
  },
});
