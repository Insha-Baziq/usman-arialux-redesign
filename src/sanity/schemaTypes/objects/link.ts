import { defineArrayMember, defineField, defineType } from "sanity";

export const link = defineType({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "kind",
      title: "Link type",
      type: "string",
      initialValue: "internalPath",
      options: {
        layout: "radio",
        list: [
          { title: "Internal path", value: "internalPath" },
          { title: "Page", value: "page" },
          { title: "Floor plan", value: "floorPlan" },
          { title: "Article", value: "article" },
          { title: "External URL", value: "external" },
          { title: "Phone", value: "phone" },
          { title: "Email", value: "email" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "path",
      title: "Internal path",
      type: "string",
      description: "Example: /all-floor-plans or /contact",
      hidden: ({ parent }) => parent?.kind !== "internalPath",
    }),
    defineField({
      name: "page",
      title: "Page",
      type: "reference",
      to: [{ type: "page" }],
      hidden: ({ parent }) => parent?.kind !== "page",
    }),
    defineField({
      name: "floorPlan",
      title: "Floor plan",
      type: "reference",
      to: [{ type: "floorPlan" }],
      hidden: ({ parent }) => parent?.kind !== "floorPlan",
    }),
    defineField({
      name: "article",
      title: "Article",
      type: "reference",
      to: [{ type: "article" }],
      hidden: ({ parent }) => parent?.kind !== "article",
    }),
    defineField({
      name: "url",
      title: "External URL",
      type: "url",
      hidden: ({ parent }) => parent?.kind !== "external",
    }),
    defineField({
      name: "phone",
      title: "Phone number",
      type: "string",
      hidden: ({ parent }) => parent?.kind !== "phone",
    }),
    defineField({
      name: "email",
      title: "Email address",
      type: "email",
      hidden: ({ parent }) => parent?.kind !== "email",
    }),
    defineField({
      name: "openInNewTab",
      title: "Open in a new tab",
      type: "boolean",
      initialValue: false,
      hidden: ({ parent }) => parent?.kind !== "external",
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "kind",
    },
  },
});

export const navigationChildItem = defineType({
  name: "navigationChildItem",
  title: "Navigation child item",
  type: "object",
  fields: [
    defineField({
      name: "link",
      title: "Link",
      type: "link",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short description",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "link.label",
      subtitle: "description",
    },
  },
});

export const navigationItem = defineType({
  name: "navigationItem",
  title: "Navigation item",
  type: "object",
  fields: [
    defineField({
      name: "link",
      title: "Top-level link",
      type: "link",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "children",
      title: "Dropdown items",
      type: "array",
      of: [defineArrayMember({ type: "navigationChildItem" })],
    }),
  ],
  preview: {
    select: {
      title: "link.label",
      children: "children",
    },
    prepare({ title, children }) {
      const count = Array.isArray(children) ? children.length : 0;
      return {
        title,
        subtitle: count ? `${count} dropdown item${count === 1 ? "" : "s"}` : "Direct link",
      };
    },
  },
});
