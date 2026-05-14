import { client } from "@/sanity/lib/client";

export const LATEST_BLOG_QUERY = `
  *[_type == "blog" && isLatest == true] | order(name asc) {
    ...,
    blogcategories[]-> {
      _id,
      title
    }
  }
`;

export const DEAL_PRODUCTS = `
  *[_type == "product" && status == "hot"] | order(name asc) {
    ...,
    "categories": categories[]-> {
      _id,
      title,
      slug
    }
  }
`;

export const PRODUCT_BY_SLUG_QUERY = `*[_type == "product" && slug.current == $slug] | order(name asc) [0]`;

export const ALL_BRANDS_QUERY = `
  *[_type == "brand"] | order(title asc) {
    _id,
    title,
    slug,
    image
  }
`;

export const getCategories = async () => {
  return await client.fetch(
    `*[_type == "category"] | order(title asc) {
      _id,
      title,
      slug,
      image
    }`
  );
};

export const getProductsByCategory = async (slug: string) => {
  return await client.fetch(
    `*[_type == "product" && references(*[_type=="category" && slug.current == $slug]._id)] {
      _id,
      name,
      slug,
      price,
      stock,
      status,
      variant,
      images,
      "categories": categories[]-> {
        _id,
        title,
        slug
      }
    }`,
    { slug }
  );
};
