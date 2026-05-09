import { defineField, defineType } from "sanity";

export const redirect = defineType({
  name: "redirect",
  title: "Redirect",
  type: "document",
  fields: [
    defineField({
      name: "from",
      title: "From path",
      type: "string",
      description: "Example: /old-floor-plan",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "to",
      title: "To path or URL",
      type: "string",
      description: "Example: /floor-plans/cambria",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "permanent",
      title: "Permanent redirect",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "from",
      subtitle: "to",
    },
  },
});
