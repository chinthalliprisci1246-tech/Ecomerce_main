"use client";
import React, { useState, useEffect } from "react";
import type { Category } from "@/sanity.types";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { getProductsByCategory } from "@/sanity/queries";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import NoProductAvailable from "./NoProductAvailable";
import ProductCard from "./ProductCard";
import { Product } from "@/sanity.types";

interface Props {
  categories: Category[];
  slug: string;
}

const SkeletonCard = () => (
  <div className="border border-gray-200 rounded-md bg-white animate-pulse">
    <div className="w-full h-48 bg-gray-200 rounded-t-md" />
    <div className="p-3 flex flex-col gap-2">
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/3" />
      <div className="h-8 bg-gray-200 rounded-full mt-1" />
    </div>
  </div>
);

const CategoryProducts = ({ categories, slug }: Props) => {
  const [currentSlug, setCurrentSlug] = useState(slug);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCategoryChange = (newSlug: string) => {
    if (newSlug === currentSlug) return;
    setCurrentSlug(newSlug);
    router.push(`/category/${newSlug}`, { scroll: false });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProductsByCategory(currentSlug);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentSlug]);

  return (
    <div className="py-5 flex flex-col md:flex-row items-start gap-5">
      {/* Category Sidebar */}
      <div className="flex flex-col md:min-w-40 border rounded-md overflow-hidden">
        {categories?.map((item) => (
          <Button
            key={item?._id}
            onClick={() => handleCategoryChange(item?.slug?.current)}
            className={`bg-transparent border-0 p-2 rounded-none text-darkColor shadow-none
              hover:bg-shop-dark-green hover:text-white font-semibold hoverEffect
              border-b last:border-b-0 capitalize flex items-center gap-2
              ${
                currentSlug === item?.slug?.current
                  ? "bg-shop-dark-green text-white"
                  : ""
              }`}
          >
            {item?.image && (
              <Image
                src={urlFor(item.image).url()}
                alt={item.title ?? "category"}
                width={60}
                height={60}
                className="w-8 h-8 object-contain"
              />
            )}
            <p>{item?.title}</p>
          </Button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="flex-1">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : products?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <NoProductAvailable selectedTab={currentSlug} />
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;