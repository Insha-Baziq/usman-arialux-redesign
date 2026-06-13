import { defineField, defineType } from "sanity";

export const portfolioItem = defineType({
  name: "portfolioItem",
  title: "Portfolio image",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "settings", title: "Settings" },
    { name: "seo", title: "SEO" },
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
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "settings",
      hidden: true,
      options: {
        source: "title",
        maxLength: 96,
      },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "content",
      options: {
        list: [
          { title: "Exterior", value: "exterior" },
          { title: "Interior", value: "interior" },
          { title: "Kitchen", value: "kitchen" },
          { title: "Bath", value: "bath" },
          { title: "Outdoor living", value: "outdoor-living" },
          { title: "Detail", value: "detail" },
        ],
      },
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
      name: "caption",
      title: "Caption",
      type: "text",
      rows: 3,
      group: "content",
    }),
    defineField({
      name: "featured",
      title: "Show in homepage Recent Builds",
      type: "boolean",
      group: "settings",
      description:
        "Turn this on for images that should appear in the Recent Builds carousel on the homepage. The portfolio page still shows every portfolio image.",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display order",
      type: "number",
      group: "settings",
      initialValue: 100,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
      hidden: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "image.image",
    },
  },
});
