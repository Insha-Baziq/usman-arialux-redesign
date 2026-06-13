import { defineField, defineType } from "sanity";

export const video = defineType({
  name: "video",
  title: "Video",
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
      name: "vimeoId",
      title: "Vimeo ID",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "vimeoHash",
      title: "Vimeo privacy hash",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail",
      type: "imageWithAlt",
      group: "content",
      hidden: true,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "richText",
      group: "content",
      hidden: true,
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "settings",
      initialValue: false,
      hidden: true,
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
      subtitle: "vimeoId",
      media: "thumbnail.image",
    },
  },
});
