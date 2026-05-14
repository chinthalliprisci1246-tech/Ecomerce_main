import { Image } from "sanity";

export interface Category {
  _id: string;
  name: string;
  image?: Image;
  slug?: {
    current: string;
  };
}