import { defineArrayMember, defineField, defineType } from "sanity";

const pageSectionMembers = [
  defineArrayMember({ type: "heroCarouselSection" }),
  defineArrayMember({ type: "heroSection" }),
  defineArrayMember({ type: "textImageSection" }),
  defineArrayMember({ type: "imageGallerySection" }),
  defineArrayMember({ type: "floorPlanCarouselSection" }),
  defineArrayMember({ type: "cardGridSection" }),
  defineArrayMember({ type: "featureListSection" }),
  defineArrayMember({ type: "ctaBandSection" }),
  defineArrayMember({ type: "videoGridSection" }),
  defineArrayMember({ type: "contactSection" }),
  defineArrayMember({ type: "spacerSection" }),
];

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "settings", title: "Settings" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Page title",
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
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "template",
      title: "Page template",
      type: "string",
      group: "settings",
      initialValue: "builder",
      options: {
        list: [
          { title: "Page builder", value: "builder" },
          { title: "Homepage", value: "home" },
          { title: "Contact", value: "contact" },
          { title: "Portfolio listing", value: "portfolio" },
          { title: "Video listing", value: "videos" },
          { title: "Article listing", value: "articles" },
        ],
      },
    }),
    defineField({
      name: "showInSitemap",
      title: "Show in sitemap",
      type: "boolean",
      group: "settings",
      initialValue: true,
    }),
    defineField({
      name: "sections",
      title: "Page sections",
      type: "array",
      group: "content",
      of: pageSectionMembers,
      validation: (Rule) => Rule.min(1),
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
      slug: "slug.current",
      status: "status",
    },
    prepare({ title, slug, status }) {
      return {
        title,
        subtitle: `/${slug || ""} · ${status || "draft"}`,
      };
    },
  },
});
