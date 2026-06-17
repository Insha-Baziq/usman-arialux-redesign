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
      description:
        "The portfolio image. An imported URL below also counts. Without an image this entry will not appear on the website.",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const hasImportedUrl = Boolean(
            (context.document as { imageUrl?: string } | undefined)?.imageUrl,
          );
          if (value || hasImportedUrl) return true;
          return "Add an image — without one this portfolio entry won't appear on the website.";
        }),
    }),
    defineField({
      name: "imageUrl",
      title: "Current image URL",
      type: "string",
      group: "content",
      description:
        "Imported image currently used by the website. Uploading an image above overrides this.",
      // Only show for old imported items that still use a URL; hidden for new uploads.
      hidden: ({ value }) => !value,
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "text",
      rows: 3,
      group: "content",
      // Not displayed on the site — kept hidden to avoid cluttering the form.
      hidden: true,
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
