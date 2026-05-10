import { defineField, defineType } from "sanity";

export const galleryItem = defineType({
  name: "galleryItem",
  title: "Gallery item",
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
      title: "Image",
      type: "imageWithAlt",
      group: "content",
    }),
    defineField({
      name: "imageUrl",
      title: "Image URL",
      type: "string",
      group: "content",
      description: "Starter/fallback image URL. Uploading an image overrides this.",
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
