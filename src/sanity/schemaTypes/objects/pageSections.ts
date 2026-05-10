import { defineArrayMember, defineField, defineType } from "sanity";

const sectionThemeOptions = [
  { title: "Light", value: "light" },
  { title: "Dark", value: "dark" },
  { title: "Warm", value: "warm" },
  { title: "Transparent", value: "transparent" },
];

export const videoAsset = defineType({
  name: "videoAsset",
  title: "Video asset",
  type: "object",
  fields: [
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      initialValue: "sanityFile",
      options: {
        layout: "radio",
        list: [
          { title: "Sanity file", value: "sanityFile" },
          { title: "External URL", value: "externalUrl" },
        ],
      },
    }),
    defineField({
      name: "file",
      title: "Optional video file",
      type: "file",
      description:
        "Large MP4 files can take time to upload. The poster image still shows immediately while the video loads.",
      options: {
        accept: "video/*",
      },
      hidden: ({ parent }) => parent?.source === "externalUrl",
    }),
    defineField({
      name: "url",
      title: "Optional external video URL",
      type: "url",
      description:
        "Use this for an already-hosted MP4/WebM instead of uploading to Sanity.",
      hidden: ({ parent }) => parent?.source !== "externalUrl",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "caption",
      source: "source",
    },
    prepare({ title, source }) {
      return {
        title: title || "Video",
        subtitle: source === "externalUrl" ? "External URL" : "Sanity file",
      };
    },
  },
});

const videoAssetField = defineField({
  name: "video",
  title: "Video",
  type: "videoAsset",
});

export const heroCarouselSection = defineType({
  name: "heroCarouselSection",
  title: "Hero carousel",
  type: "object",
  fields: [
    defineField({
      name: "slides",
      title: "Slides",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "id",
              title: "Stable ID",
              type: "string",
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
              name: "cta",
              title: "Button",
              type: "cta",
            }),
            defineField({
              name: "image",
              title: "Poster image",
              type: "imageWithAlt",
              description:
                "Required visual fallback. This can be used alone as an image slide, or under an optional video.",
            }),
            defineField({
              name: "mobileImage",
              title: "Mobile poster image",
              type: "imageWithAlt",
              description:
                "Optional mobile fallback image. Uses the desktop/poster image when empty.",
            }),
            videoAssetField,
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
              media: "image.image",
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      slides: "slides",
    },
    prepare({ slides }) {
      const firstSlide = Array.isArray(slides) ? slides[0] : null;
      return {
        title: firstSlide?.title || "Hero carousel",
        subtitle: `${Array.isArray(slides) ? slides.length : 0} slide${Array.isArray(slides) && slides.length === 1 ? "" : "s"}`,
        media: firstSlide?.image?.image,
      };
    },
  },
});

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero section",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "backgroundImage",
      title: "Background image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "alignment",
      title: "Text alignment",
      type: "string",
      initialValue: "left",
      options: {
        layout: "radio",
        list: [
          { title: "Left", value: "left" },
          { title: "Center", value: "center" },
        ],
      },
    }),
    defineField({
      name: "ctas",
      title: "Buttons",
      type: "array",
      of: [defineArrayMember({ type: "cta" })],
      validation: (Rule) => Rule.max(2),
    }),
  ],
  preview: {
    select: {
      title: "heading",
      subtitle: "eyebrow",
      media: "backgroundImage.image",
    },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: subtitle || "Hero section", media };
    },
  },
});

export const textImageSection = defineType({
  name: "textImageSection",
  title: "Text and image",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "richText",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "imagePosition",
      title: "Image position",
      type: "string",
      initialValue: "right",
      options: {
        layout: "radio",
        list: [
          { title: "Left", value: "left" },
          { title: "Right", value: "right" },
        ],
      },
    }),
    defineField({
      name: "cta",
      title: "Button",
      type: "cta",
    }),
  ],
  preview: {
    select: {
      title: "heading",
      subtitle: "eyebrow",
      media: "image.image",
    },
  },
});

export const imageGallerySection = defineType({
  name: "imageGallerySection",
  title: "Image gallery",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "layout",
      title: "Gallery layout",
      type: "string",
      initialValue: "carousel",
      options: {
        layout: "radio",
        list: [
          { title: "Carousel", value: "carousel" },
          { title: "Grid", value: "grid" },
          { title: "Editorial mosaic", value: "mosaic" },
        ],
      },
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [defineArrayMember({ type: "imageWithAlt" })],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: "heading",
      images: "images",
    },
    prepare({ title, images }) {
      const count = Array.isArray(images) ? images.length : 0;
      return {
        title: title || "Image gallery",
        subtitle: `${count} image${count === 1 ? "" : "s"}`,
      };
    },
  },
});

export const floorPlanCarouselSection = defineType({
  name: "floorPlanCarouselSection",
  title: "Floor plan carousel",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "source",
      title: "Plan source",
      type: "string",
      initialValue: "featured",
      options: {
        layout: "radio",
        list: [
          { title: "Featured plans", value: "featured" },
          { title: "Manual selection", value: "manual" },
          { title: "Newest plans", value: "newest" },
        ],
      },
    }),
    defineField({
      name: "plans",
      title: "Manual floor plans",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "floorPlan" }],
        }),
      ],
      hidden: ({ parent }) => parent?.source !== "manual",
    }),
    defineField({
      name: "cta",
      title: "Button",
      type: "cta",
    }),
  ],
  preview: {
    select: {
      title: "heading",
      subtitle: "source",
    },
  },
});

export const cardGridSection = defineType({
  name: "cardGridSection",
  title: "Card grid",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "theme",
      title: "Theme",
      type: "string",
      initialValue: "light",
      options: {
        list: sectionThemeOptions,
      },
    }),
    defineField({
      name: "cards",
      title: "Cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "image",
              title: "Poster image",
              type: "imageWithAlt",
              description:
                "Required visual fallback. This displays first and remains the image-only version when no video is set.",
            }),
            videoAssetField,
            defineField({ name: "link", title: "Link", type: "link" }),
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
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: "heading",
      cards: "cards",
    },
    prepare({ title, cards }) {
      const count = Array.isArray(cards) ? cards.length : 0;
      return {
        title: title || "Card grid",
        subtitle: `${count} card${count === 1 ? "" : "s"}`,
      };
    },
  },
});

export const featureListSection = defineType({
  name: "featureListSection",
  title: "Feature list",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "items",
      title: "Features",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Title", type: "string" }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "description",
            },
          },
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: "heading",
      items: "items",
    },
    prepare({ title, items }) {
      const count = Array.isArray(items) ? items.length : 0;
      return {
        title: title || "Feature list",
        subtitle: `${count} feature${count === 1 ? "" : "s"}`,
      };
    },
  },
});

export const ctaBandSection = defineType({
  name: "ctaBandSection",
  title: "CTA band",
  type: "object",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "backgroundImage",
      title: "Background image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "ctas",
      title: "Buttons",
      type: "array",
      of: [defineArrayMember({ type: "cta" })],
      validation: (Rule) => Rule.max(2),
    }),
  ],
  preview: {
    select: {
      title: "heading",
      media: "backgroundImage.image",
    },
  },
});

export const videoGridSection = defineType({
  name: "videoGridSection",
  title: "Video grid",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "videos",
      title: "Videos",
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "video" }],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "heading",
      videos: "videos",
    },
    prepare({ title, videos }) {
      const count = Array.isArray(videos) ? videos.length : 0;
      return {
        title: title || "Video grid",
        subtitle: `${count} video${count === 1 ? "" : "s"}`,
      };
    },
  },
});

export const contactSection = defineType({
  name: "contactSection",
  title: "Contact section",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "image",
      title: "Contact image",
      type: "imageWithAlt",
    }),
    defineField({
      name: "detailHeading",
      title: "Detail heading",
      type: "string",
    }),
    defineField({
      name: "detailBody",
      title: "Detail body",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "notice",
      title: "Notice text",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "showForm",
      title: "Show contact form",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "showContactDetails",
      title: "Show contact details",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "heading",
    },
    prepare({ title }) {
      return {
        title: title || "Contact section",
      };
    },
  },
});

export const spacerSection = defineType({
  name: "spacerSection",
  title: "Spacer",
  type: "object",
  fields: [
    defineField({
      name: "size",
      title: "Size",
      type: "string",
      initialValue: "medium",
      options: {
        layout: "radio",
        list: [
          { title: "Small", value: "small" },
          { title: "Medium", value: "medium" },
          { title: "Large", value: "large" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "size",
    },
    prepare({ title }) {
      return {
        title: "Spacer",
        subtitle: title,
      };
    },
  },
});
