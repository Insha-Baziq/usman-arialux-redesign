import { defineArrayMember, defineField, defineType } from "sanity";

const pageSectionMembers = [
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
  title: "Website page",
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
      hidden: true,
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
      hidden: true,
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
      hidden: true,
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
      hidden: true,
    }),
    defineField({
      name: "sections",
      title: "Editable page content",
      type: "array",
      group: "content",
      description:
        "Open the existing section and edit its fields. Do not add new section types unless the website has been updated for them.",
      of: pageSectionMembers,
      validation: (Rule) => Rule.min(1),
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
