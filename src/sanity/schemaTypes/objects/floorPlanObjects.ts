import { defineArrayMember, defineField, defineType } from "sanity";

export const floorPlanSpecs = defineType({
  name: "floorPlanSpecs",
  title: "Floor plan specs",
  type: "object",
  fields: [
    defineField({
      name: "beds",
      title: "Bedrooms",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "baths",
      title: "Bathrooms",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "garages",
      title: "Garages",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "stories",
      title: "Stories",
      type: "number",
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "squareFeet",
      title: "Living square feet",
      type: "number",
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: "garageSquareFeet",
      title: "Garage square feet",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "porchSquareFeet",
      title: "Porch square feet",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "totalSquareFeet",
      title: "Total square feet",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "width",
      title: "Width",
      type: "string",
      description: "Example: 68'-0\"",
    }),
    defineField({
      name: "depth",
      title: "Depth",
      type: "string",
      description: "Example: 82'-6\"",
    }),
    defineField({
      name: "style",
      title: "Architectural style",
      type: "string",
    }),
    defineField({
      name: "collection",
      title: "Collection",
      type: "string",
    }),
  ],
});

export const floorMap = defineType({
  name: "floorMap",
  title: "Floor map",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "Example: Ground floor or Second floor",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Floor map image",
      type: "imageWithAlt",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "notes",
      title: "Notes",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "label",
      media: "image.image",
    },
  },
});

export const addressGroup = defineType({
  name: "addressGroup",
  title: "Address group",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "addresses",
      title: "Addresses",
      type: "array",
      of: [
        defineArrayMember({
          type: "string",
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
      addresses: "addresses",
    },
    prepare({ title, addresses }) {
      const count = Array.isArray(addresses) ? addresses.length : 0;
      return {
        title,
        subtitle: `${count} address${count === 1 ? "" : "es"}`,
      };
    },
  },
});

export const planAmenityGroup = defineType({
  name: "planAmenityGroup",
  title: "Amenity group",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (Rule) => Rule.min(1),
    }),
  ],
});
