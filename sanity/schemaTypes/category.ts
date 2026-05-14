import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",          // ✅ document name (VERY IMPORTANT)
  title: "Category",         // ✅ display name in Sanity
  type: "document",          // ✅ REQUIRED

  fields: [
    defineField({
      name: "title",         // ✅ this matches your React code
      title: "Title",
      type: "string",
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
    }),

    defineField({
      name: "image",
      title: "Image",
      type: "image",
    }),
  ],
});