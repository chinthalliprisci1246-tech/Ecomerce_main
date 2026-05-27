// sanity/queries/query.ts

export const LATEST_BLOG_QUERY = `
  *[_type == "blog"] | order(title asc) {
    _id, title, slug, mainImage, description, publishedAt
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

export const PRODUCT_BY_SLUG_QUERY = `
  *[_type == "product" && slug.current == $slug][0] {
    ...,
    "categories": categories[]->title
  }
`;

export const ALL_BRANDS_QUERY = `
  *[_type == "brand"] | order(title asc) {
    _id, title, slug, logo
  }
`;

export const PRODUCTS_BY_VARIANT_QUERY = `
  *[_type == "product" && variant == $variant] {
    _id, name, images, stock, price, discount, slug, status, variant,
    "categories": categories[]->title
  }
`;

export const PRODUCTS_BY_CATEGORY_QUERY = `
  *[_type == "product" && references(*[_type=="category" && slug.current == $slug]._id)] {
    _id, name, slug, price, stock, status, variant, images, discount,
    "categories": categories[]->title
  }
`;

export const ALL_CATEGORIES_QUERY = `
  *[_type == "category"] | order(title asc) {
    _id, title, slug, image
  }
`;