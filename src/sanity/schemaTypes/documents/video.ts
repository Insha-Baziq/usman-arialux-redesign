import { defineField, defineType } from "sanity";

const isUpload = (document: unknown) =>
  (document as { source?: string } | undefined)?.source === "upload";

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
      name: "source",
      title: "Video source",
      type: "string",
      group: "content",
      description: "Embed a Vimeo video, or upload a video file directly.",
      initialValue: "vimeo",
      options: {
        layout: "radio",
        list: [
          { title: "Vimeo", value: "vimeo" },
          { title: "Upload a file", value: "upload" },
        ],
      },
    }),
    defineField({
      name: "vimeoId",
      title: "Vimeo ID",
      type: "string",
      group: "content",
      description: "The number in the Vimeo URL, e.g. vimeo.com/123456789",
      hidden: ({ document }) => isUpload(document),
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (isUpload(context.document)) return true;
          return value ? true : "Add the Vimeo ID, or switch the source to Upload a file.";
        }),
    }),
    defineField({
      name: "vimeoHash",
      title: "Vimeo privacy hash (optional)",
      type: "string",
      group: "content",
      description:
        "For unlisted videos: the code after the ID, e.g. vimeo.com/123456789/abc123. Leave blank for public videos.",
      hidden: ({ document }) => isUpload(document),
    }),
    defineField({
      name: "videoFile",
      title: "Video file",
      type: "file",
      group: "content",
      options: { accept: "video/*" },
      description: "Upload an MP4/WebM. Large files can take a while to upload.",
      hidden: ({ document }) => !isUpload(document),
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (!isUpload(context.document)) return true;
          return value ? true : "Upload a video file, or switch the source to Vimeo.";
        }),
    }),
    defineField({
      name: "thumbnail",
      title: "Poster image (optional)",
      type: "imageWithAlt",
      group: "content",
      description: "Still image shown before an uploaded video plays.",
      hidden: ({ document }) => !isUpload(document),
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
      source: "source",
      vimeoId: "vimeoId",
      media: "thumbnail.image",
    },
    prepare({ title, source, vimeoId, media }) {
      return {
        title,
        subtitle: source === "upload" ? "Uploaded file" : vimeoId ? `Vimeo ${vimeoId}` : "Vimeo",
        media,
      };
    },
  },
});
