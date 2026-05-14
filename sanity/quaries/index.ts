import { sanityFetch } from "../lib/live";
import { LATEST_BLOG_QUERY } from "./query";
import { DEAL_PRODUCTS } from "./query";
import { PRODUCT_BY_SLUG_QUERY } from "./query";
import { ALL_BRANDS_QUERY } from "./query";

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
    console.log("Error fetching categories", error);
    return [];
  }
};

const getLatestBlogs = async () => {
  try {
    const { data } = await sanityFetch({
      query: LATEST_BLOG_QUERY,
    });

    return data ?? [];
  } catch (error) {
    console.log("Error fetching latest blogs", error);
    return [];
  }
};

const getDealProducts = async () => {
  try {
    const { data } = await sanityFetch({
      query: DEAL_PRODUCTS,
    });

    return data ?? [];
  } catch (error) {
    console.log("Error fetching deal products", error);
    return [];
  }
};

const getProductBySlug = async (slug: string) => {
  try {
    const { data } = await sanityFetch({
      query: PRODUCT_BY_SLUG_QUERY,
      params: { slug },
    });

    return data ?? [];
  } catch (error) {
    console.log("Error fetching product by slug", error);
    return [];
  }
};

const getAllBrands = async () => {
  try {
    const { data } = await sanityFetch({
      query: ALL_BRANDS_QUERY,
    });

    return data ?? [];
  } catch (error) {
    console.log("Error fetching brands", error);
    return [];
  }
};

export { getCategories, getLatestBlogs, getDealProducts, getProductBySlug, getAllBrands };