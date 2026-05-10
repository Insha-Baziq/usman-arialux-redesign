import { defineArrayMember, defineField, defineType } from "sanity";

const videoFields = [
  defineField({
    name: "videoFile",
    title: "Video file",
    type: "file",
    options: {
      accept: "video/*",
    },
  }),
  defineField({
    name: "videoUrl",
    title: "External video URL",
    type: "url",
    description: "Optional fallback for CDN-hosted MP4/WebM files.",
  }),
];

export const mediaSettings = defineType({
  name: "mediaSettings",
  title: "Media settings",
  type: "document",
  groups: [
    { name: "homepage", title: "Homepage", default: true },
    { name: "architecture", title: "Architecture page" },
  ],
  fields: [
    defineField({
      name: "homepageHeroSlides",
      title: "Homepage hero slides",
      type: "array",
      group: "homepage",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "id",
              title: "Stable ID",
              type: "string",
              validation: (Rule) => Rule.required(),
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
              title: "Desktop poster image",
              type: "imageWithAlt",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "mobileImage",
              title: "Mobile poster image",
              type: "imageWithAlt",
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
      title: "Homepage pillar cards",
      type: "array",
      group: "homepage",
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
              title: "Poster image",
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
      title: "Architecture video",
      type: "object",
      group: "architecture",
      fields: [
        defineField({
          name: "posterImage",
          title: "Poster image",
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
