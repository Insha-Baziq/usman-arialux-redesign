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
      name: "livePath",
      title: "Legacy/live path",
      type: "string",
      group: "settings",
      description: "Optional legacy URL path from the old site. The Next.js page still uses the slug.",
      readOnly: true,
      hidden: ({ value }) => value === undefined,
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
      // Not wired up — the listing shows all plans. Hidden to avoid misleading editors.
      hidden: true,
    }),
    defineField({
      name: "listingOrder",
      title: "Listing order",
      type: "number",
      group: "settings",
      description: "Lower numbers appear first.",
      initialValue: 100,
      // Hidden for a minimal Settings tab — plans sort alphabetically by title.
      hidden: true,
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "content",
      description: "Short one-line blurb shown on the floor-plan card.",
      validation: (Rule) => Rule.required(),
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
      hidden: true,
      of: [defineArrayMember({ type: "planAmenityGroup" })],
    }),
    defineField({
      name: "heroImage",
      title: "Uploaded hero image",
      type: "imageWithAlt",
      group: "media",
      description:
        "Main image for this plan. An imported URL below also counts. Without an image the plan will not appear on the website.",
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const hasImportedUrl = Boolean(
            (context.document as { heroImageUrl?: string } | undefined)?.heroImageUrl,
          );
          if (value || hasImportedUrl) return true;
          return "Add a hero image — without one this floor plan won't appear on the website.";
        }),
    }),
    defineField({
      name: "heroImageUrl",
      title: "Current hero image URL",
      type: "string",
      group: "media",
      description:
        "Imported image currently used by the website. Uploading a hero image above overrides this.",
      // Only show for old imported plans that still use a URL; hidden for new uploads.
      hidden: ({ value }) => !value,
    }),
    defineField({
      name: "cardImage",
      title: "Card image",
      type: "imageWithAlt",
      group: "media",
      description: "Optional. Uses hero image when left empty.",
      hidden: true,
    }),
    defineField({
      name: "cardImageUrl",
      title: "Card image URL",
      type: "string",
      group: "media",
      description: "Starter/fallback card image URL. Uploading a card image overrides this.",
      hidden: true,
    }),
    defineField({
      name: "gallery",
      title: "Uploaded gallery images",
      type: "array",
      group: "media",
      description:
        "New uploads appear before the imported gallery URLs below. Use this for replacing or adding gallery images.",
      of: [defineArrayMember({ type: "imageWithAlt" })],
    }),
    defineField({
      name: "galleryUrls",
      title: "Current gallery image URLs",
      type: "array",
      group: "media",
      description:
        "Imported images currently shown by the website. You can remove or edit these while migrating to uploaded gallery images.",
      // Only show for old imported plans that still use URLs; hidden once empty.
      hidden: ({ value }) => !(Array.isArray(value) && value.length > 0),
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
      name: "floorMaps",
      title: "Floor maps",
      type: "array",
      group: "media",
      hidden: true,
      of: [defineArrayMember({ type: "floorMap" })],
    }),
    defineField({
      name: "video",
      title: "Vimeo video",
      type: "object",
      group: "media",
      hidden: true,
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
      hidden: true,
      of: [defineArrayMember({ type: "addressGroup" })],
    }),
    defineField({
      name: "cta",
      title: "Plan detail button",
      type: "cta",
      group: "content",
      // Not used by the floor-plan pages — the detail buttons come from code.
      // Hidden to avoid confusing editors with an unused field.
      hidden: true,
    }),
    defineField({
      name: "relatedPlans",
      title: "Related plans",
      type: "array",
      group: "content",
      hidden: true,
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
      hidden: true,
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
