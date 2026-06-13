import { defineArrayMember, defineField, defineType } from "sanity";

const videoFields = [
  defineField({
    name: "videoFile",
    title: "Video file (optional)",
    type: "file",
    description:
      "Upload an MP4/WebM when the video should be managed in Sanity. Large files can take a while to upload.",
    options: {
      accept: "video/*",
    },
  }),
  defineField({
    name: "videoUrl",
    title: "External video URL (optional)",
    type: "url",
    description: "Use this for an already-hosted MP4/WebM instead of uploading a file.",
  }),
];

export const mediaSettings = defineType({
  name: "mediaSettings",
  title: "Homepage media",
  type: "document",
  groups: [
    { name: "hero", title: "Hero slides", default: true },
    { name: "services", title: "Service cards" },
    { name: "architecture", title: "Architecture video" },
  ],
  fields: [
    defineField({
      name: "homepageHeroSlides",
      title: "Hero slides",
      type: "array",
      group: "hero",
      description:
        "Add, remove, reorder, or replace homepage hero image/video slides.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "id",
              title: "Internal ID",
              type: "string",
              description: "Legacy field kept for existing slides. New slides can leave it empty.",
              readOnly: true,
              hidden: true,
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "subtitle",
              title: "Subtitle",
              type: "string",
            }),
            defineField({
              name: "ctaLabel",
              title: "Button label",
              type: "string",
            }),
            defineField({
              name: "ctaHref",
              title: "Button URL",
              type: "string",
            }),
            defineField({
              name: "desktopImage",
              title: "Desktop image / video poster",
              type: "imageWithAlt",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "mobileImage",
              title: "Mobile image / video poster",
              type: "imageWithAlt",
              description: "Optional. Uses the desktop image when empty.",
            }),
            ...videoFields,
            defineField({
              name: "order",
              title: "Display order",
              type: "number",
              initialValue: 100,
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "subtitle",
              media: "desktopImage.image",
            },
          },
        }),
      ],
    }),
    defineField({
      name: "homepagePillars",
      title: "Service cards",
      type: "array",
      group: "services",
      description:
        "The three landing-page service cards, including Architectural Services and related service media.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 4,
            }),
            defineField({
              name: "image",
              title: "Image / video poster",
              type: "imageWithAlt",
              validation: (Rule) => Rule.required(),
            }),
            ...videoFields,
            defineField({
              name: "order",
              title: "Display order",
              type: "number",
              initialValue: 100,
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
              media: "image.image",
            },
          },
        }),
      ],
    }),
    defineField({
      name: "architectureVideo",
      title: "Architecture service video",
      type: "object",
      group: "architecture",
      description: "The video shown on the Architectural Services page.",
      fields: [
        defineField({
          name: "posterImage",
          title: "Video poster image",
          type: "imageWithAlt",
        }),
        ...videoFields,
      ],
      preview: {
        select: {
          media: "posterImage.image",
        },
        prepare({ media }) {
          return {
            title: "Architecture video",
            media,
          };
        },
      },
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Media settings",
      };
    },
  },
});
