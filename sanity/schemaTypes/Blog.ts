import { defineType, defineField } from "sanity";

export const blog = defineType({
  name: "blog",
  title: "Blog",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "slug", title: "Slug", type: "slug",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "mainImage", title: "Main Image", type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "publishedAt", title: "Published At", type: "datetime" }),

    
    defineField({
      name: "isLatest",
      title: "Is Latest",
      type: "boolean",
      initialValue: false,
    }),
  ],
});