import { defineField, defineType } from "sanity";

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Gallery image",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "settings", title: "Settings" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "string",
      group: "settings",
      options: {
        list: [
          { title: "Portfolio", value: "portfolio" },
          { title: "Interior finishes", value: "interior-finishes" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Uploaded image",
      type: "imageWithAlt",
      group: "content",
      description: "Optional replacement for the current imported image URL below.",
    }),
    defineField({
      name: "imageUrl",
      title: "Current image URL",
      type: "string",
      group: "content",
      description:
        "Imported image currently used by the website. Uploading an image above overrides this.",
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "text",
      rows: 3,
      group: "content",
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      group: "settings",
      initialValue: 100,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "gallery",
      media: "image.image",
    },
  },
});
