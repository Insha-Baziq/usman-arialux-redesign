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
  ],
  fields: [
    defineField({
      name: "homepageHeroSlides",
      title: "Hero slides",
      type: "array",
      group: "hero",
      description:
        "The rotating banners at the top of the homepage. Drag a slide to change its order. Only a title and a background image are required — everything else is optional.",
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
              description: "The large headline shown on the slide.",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "subtitle",
              title: "Subtitle (optional)",
              type: "string",
              description: "Smaller line under the title. Leave blank to hide it.",
            }),
            defineField({
              name: "ctaLabel",
              title: "Button text (optional)",
              type: "string",
              description:
                'e.g. "Explore Floor Plans". Leave both button fields blank to hide the button.',
            }),
            defineField({
              name: "ctaHref",
              title: "Button link (optional)",
              type: "string",
              description: "Where the button goes, e.g. /all-floor-plans",
            }),
            defineField({
              name: "desktopImage",
              title: "Background image",
              type: "imageWithAlt",
              description:
                "Shown behind the text. Also used as the still preview if you add a video below.",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "mobileImage",
              title: "Mobile image (optional)",
              type: "imageWithAlt",
              description: "Uses the background image when empty.",
            }),
            ...videoFields,
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
  ],
  preview: {
    prepare() {
      return {
        title: "Media settings",
      };
    },
  },
});
