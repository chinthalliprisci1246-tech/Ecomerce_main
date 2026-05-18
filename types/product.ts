import { Image } from "sanity";

export interface Product {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  images: Image;
  price: number;
  stock: number;
  variant: string;
  status?: string;
}