import { defineArrayMember, defineField, defineType } from "sanity";

export const article = defineType({
  name: "article",
  title: "Article",
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
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      group: "content",
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "imageWithAlt",
      group: "content",
    }),
    defineField({
      name: "heroImageUrl",
      title: "Hero image URL",
      type: "string",
      group: "content",
      description: "Starter/fallback hero image URL. Uploading a hero image overrides this.",
    }),
    defineField({
      name: "imageUrls",
      title: "Article image URLs",
      type: "array",
      group: "content",
      description: "Starter/fallback article image URLs.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "src", title: "Image URL", type: "string" }),
            defineField({ name: "alt", title: "Alt text", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      group: "settings",
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      group: "settings",
      initialValue: "AriaLux Homes",
    }),
    defineField({
      name: "body",
      title: "Article body",
      type: "richText",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      group: "settings",
      initialValue: false,
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "heroImage.image",
    },
  },
});
