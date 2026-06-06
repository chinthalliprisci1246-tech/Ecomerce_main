import { defineType, defineField } from "sanity";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",

  fields: [
    // ✅ name field was missing!
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),


    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),

    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),

    defineField({
      name: "stock",
      title: "Stock",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
  name: "brand",
  title: "Brand",
  type: "reference",
  to: [{ type: "brand" }],
   }),
    defineField({
      name: "variant",
      title: "Product Type",
      type: "string",
      options: {
        list: [
          { title: "New Arrival", value: "newarrival" },
          { title: "Best Seller", value: "bestseller" },
          { title: "Featured", value: "featured" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),
    

    // ✅ Only ONE categories field — with references
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),

    defineField({
      name: "status",
      title: "Product Status",
      type: "string",
      options: {
        list: [
          { title: "Sale", value: "sale" },
          { title: "New", value: "new" },
          { title: "Hot", value: "hot" },
        ],
        layout: "dropdown",
      },
    }),
  ],

  preview: {
    select: {
      title: "name",
      subtitle: "variant",
      media: "images.0",
    },
  },
});