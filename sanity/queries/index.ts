// sanity/queries/index.ts
import { sanityFetch } from "../lib/live";
import {
  LATEST_BLOG_QUERY,
  DEAL_PRODUCTS,
  PRODUCT_BY_SLUG_QUERY,
  ALL_BRANDS_QUERY,
  PRODUCTS_BY_CATEGORY_QUERY,
  ALL_CATEGORIES_QUERY,
  BRAND_BY_SLUG_QUERY,
  PRODUCTS_BY_BRAND_QUERY,

} from "./query";

const getCategories = async (quantity?: number) => {
  try {
    const query = quantity
      ? `*[_type == "category"] | order(name asc) [0...$quantity] {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`
      : `*[_type == "category"] | order(name asc) {
          ...,
          "productCount": count(*[_type == "product" && references(^._id)])
        }`;

    const { data } = await sanityFetch({
      query,
      params: quantity ? { quantity } : {},
    });
    return data ?? [];
  } catch (error) {
    console.error("Error fetching categories", error);
    return [];
  }
};

const getAllCategories = async () => {
  try {
    const { data } = await sanityFetch({ query: ALL_CATEGORIES_QUERY });
    return data ?? [];
  } catch (error) {
    console.error("Error fetching all categories", error);
    return [];
  }
};

const getLatestBlogs = async () => {
  try {
    const { data } = await sanityFetch({ query: LATEST_BLOG_QUERY });
    return data ?? [];
  } catch (error) {
    console.error("Error fetching latest blogs", error);
    return [];
  }
};

const getDealProducts = async () => {
  try {
    const { data } = await sanityFetch({ query: DEAL_PRODUCTS });
    return data ?? [];
  } catch (error) {
    console.error("Error fetching deal products", error);
    return [];
  }
};

// ⚠️ Returns null on not-found — not [] — so product pages can correctly
// call notFound() without crashing on product.images or product.name
const getProductBySlug = async (slug: string) => {
  try {
    const { data } = await sanityFetch({
      query: PRODUCT_BY_SLUG_QUERY,
      params: { slug },
    });
    return data ?? null;
  } catch (error) {
    console.error("Error fetching product by slug", error);
    return null;
  }
};

const getAllBrands = async () => {
  try {
    const { data } = await sanityFetch({ query: ALL_BRANDS_QUERY });
    return data ?? [];
  } catch (error) {
    console.error("Error fetching brands", error);
    return [];
  }
};

const getProductsByCategory = async (slug: string) => {
  try {
    const { data } = await sanityFetch({
      query: PRODUCTS_BY_CATEGORY_QUERY,
      params: { slug },
    });
    return data ?? [];
  } catch (error) {
    console.error("Error fetching products by category", error);
    return [];
  }
};
const getBrandBySlug = async (slug: string) => {
  try {
    const { data } = await sanityFetch({
      query: BRAND_BY_SLUG_QUERY,
      params: { slug },
    });
    return data ?? null;
  } catch (error) {
    console.error("Error fetching brand", error);
    return null;
  }
};

const getProductsByBrand = async (slug: string) => {
  try {
    const { data } = await sanityFetch({
      query: PRODUCTS_BY_BRAND_QUERY,
      params: { slug },
    });
    return data ?? [];
  } catch (error) {
    console.error("Error fetching products by brand", error);
    return [];
  }
};

export {
  getCategories,
  getAllCategories,
  getLatestBlogs,
  getDealProducts,
  getProductBySlug,
  getAllBrands,
  getProductsByCategory,
  getBrandBySlug,
  getProductsByBrand,
};