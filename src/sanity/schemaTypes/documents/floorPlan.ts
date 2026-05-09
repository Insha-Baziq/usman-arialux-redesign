import { defineArrayMember, defineField, defineType } from "sanity";

export const floorPlan = defineType({
  name: "floorPlan",
  title: "Floor plan",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "specs", title: "Specs" },
    { name: "media", title: "Media" },
    { name: "availability", title: "Availability" },
    { name: "settings", title: "Settings" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Plan title",
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
      name: "status",
      title: "Publishing status",
      type: "string",
      group: "settings",
      initialValue: "draft",
      options: {
        layout: "radio",
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
          { title: "Hidden", value: "hidden" },
          { title: "Archived", value: "archived" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featuredOnHome",
      title: "Feature on homepage",
      type: "boolean",
      group: "settings",
      initialValue: false,
    }),
    defineField({
      name: "featuredOnListing",
      title: "Feature on floor-plan listing",
      type: "boolean",
      group: "settings",
      initialValue: true,
    }),
    defineField({
      name: "listingOrder",
      title: "Listing order",
      type: "number",
      group: "settings",
      description: "Lower numbers appear first.",
      initialValue: 100,
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "summary",
      title: "Card summary",
      type: "text",
      rows: 3,
      group: "content",
    }),
    defineField({
      name: "description",
      title: "Full description",
      type: "richText",
      group: "content",
    }),
    defineField({
      name: "specs",
      title: "Specs",
      type: "floorPlanSpecs",
      group: "specs",
    }),
    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      group: "specs",
      of: [defineArrayMember({ type: "planAmenityGroup" })],
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "imageWithAlt",
      group: "media",
    }),
    defineField({
      name: "cardImage",
      title: "Card image",
      type: "imageWithAlt",
      group: "media",
      description: "Optional. Uses hero image when left empty.",
    }),
    defineField({
      name: "gallery",
      title: "Gallery",
      type: "array",
      group: "media",
      of: [defineArrayMember({ type: "imageWithAlt" })],
    }),
    defineField({
      name: "floorMaps",
      title: "Floor maps",
      type: "array",
      group: "media",
      of: [defineArrayMember({ type: "floorMap" })],
    }),
    defineField({
      name: "video",
      title: "Vimeo video",
      type: "object",
      group: "media",
      fields: [
        defineField({ name: "vimeoId", title: "Vimeo ID", type: "string" }),
        defineField({ name: "vimeoHash", title: "Vimeo privacy hash", type: "string" }),
        defineField({ name: "caption", title: "Caption", type: "string" }),
      ],
    }),
    defineField({
      name: "availableAt",
      title: "Available at",
      type: "array",
      group: "availability",
      of: [defineArrayMember({ type: "addressGroup" })],
    }),
    defineField({
      name: "cta",
      title: "Plan detail button",
      type: "cta",
      group: "content",
    }),
    defineField({
      name: "relatedPlans",
      title: "Related plans",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "floorPlan" }],
          options: {
            disableNew: true,
          },
        }),
      ],
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
      subtitle: "tagline",
      media: "heroImage.image",
      status: "status",
    },
    prepare({ title, subtitle, media, status }) {
      return {
        title,
        subtitle: `${status || "draft"}${subtitle ? ` · ${subtitle}` : ""}`,
        media,
      };
    },
  },
});
