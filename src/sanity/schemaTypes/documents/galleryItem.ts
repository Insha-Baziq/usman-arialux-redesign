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
      description:
        "The gallery image. An imported URL below also counts. Without an image this entry will not appear on the website.",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const hasImportedUrl = Boolean(
            (context.document as { imageUrl?: string } | undefined)?.imageUrl,
          );
          if (value || hasImportedUrl) return true;
          return "Add an image — without one this gallery entry won't appear on the website.";
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
      // Not displayed on the site — kept hidden to avoid cluttering the form.
      hidden: true,
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
