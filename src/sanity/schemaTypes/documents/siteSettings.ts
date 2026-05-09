import { defineArrayMember, defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "brand", title: "Brand", default: true },
    { name: "contact", title: "Contact" },
    { name: "navigation", title: "Navigation" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "brandName",
      title: "Brand name",
      type: "string",
      group: "brand",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "brand",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "imageWithAlt",
      group: "brand",
    }),
    defineField({
      name: "darkLogo",
      title: "Dark background logo",
      type: "imageWithAlt",
      group: "brand",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "email",
      group: "contact",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 3,
      group: "contact",
    }),
    defineField({
      name: "hours",
      title: "Business hours",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "socialLinks",
      title: "Social links",
      type: "array",
      group: "contact",
      of: [defineArrayMember({ type: "link" })],
    }),
    defineField({
      name: "primaryNavigation",
      title: "Primary navigation",
      type: "reference",
      to: [{ type: "navigationMenu" }],
      group: "navigation",
    }),
    defineField({
      name: "footerNavigation",
      title: "Footer navigation",
      type: "reference",
      to: [{ type: "navigationMenu" }],
      group: "navigation",
    }),
    defineField({
      name: "footerColumns",
      title: "Footer columns",
      type: "array",
      group: "navigation",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Column title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "links",
              title: "Links",
              type: "array",
              of: [defineArrayMember({ type: "link" })],
            }),
          ],
          preview: {
            select: {
              title: "title",
              links: "links",
            },
            prepare({ title, links }) {
              const count = Array.isArray(links) ? links.length : 0;
              return {
                title,
                subtitle: `${count} link${count === 1 ? "" : "s"}`,
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO",
      type: "seo",
      group: "seo",
    }),
  ],
  preview: {
    select: {
      title: "brandName",
      subtitle: "tagline",
      media: "logo.image",
    },
  },
});
