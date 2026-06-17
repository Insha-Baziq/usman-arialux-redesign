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
      options: {
        list: [
          { title: "Buying", value: "Buying" },
          { title: "Design", value: "Design" },
          { title: "Construction", value: "Construction" },
          { title: "Floor Plans", value: "Floor Plans" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
      group: "content",
      description: "Short blurb shown on the article card.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heroImage",
      title: "Uploaded hero image",
      type: "imageWithAlt",
      group: "content",
      description:
        "Main article image. An imported URL below also counts. Without an image the article will not appear on the website.",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const hasImportedUrl = Boolean(
            (context.document as { heroImageUrl?: string } | undefined)?.heroImageUrl,
          );
          if (value || hasImportedUrl) return true;
          return "Add a hero image — without one this article won't appear on the website.";
        }),
    }),
    defineField({
      name: "heroImageUrl",
      title: "Current hero image URL",
      type: "string",
      group: "content",
      description:
        "Imported image currently used by the website. Uploading a hero image above overrides this.",
    }),
    defineField({
      name: "articleImages",
      title: "Uploaded article images",
      type: "array",
      group: "content",
      description: "Images shown inside the article popup.",
      of: [defineArrayMember({ type: "imageWithAlt" })],
    }),
    defineField({
      name: "imageUrls",
      title: "Current article image URLs",
      type: "array",
      group: "content",
      description:
        "Imported article images currently used by the website. Uploaded article images above override these.",
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
      hidden: true,
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
      hidden: true,
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
