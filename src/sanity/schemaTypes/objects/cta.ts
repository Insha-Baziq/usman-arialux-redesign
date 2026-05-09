import { defineField, defineType } from "sanity";

export const cta = defineType({
  name: "cta",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Button label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "link",
      title: "Button link",
      type: "link",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "style",
      title: "Button style",
      type: "string",
      initialValue: "primary",
      options: {
        layout: "radio",
        list: [
          { title: "Primary", value: "primary" },
          { title: "Secondary", value: "secondary" },
          { title: "Text link", value: "text" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "style",
    },
  },
});
