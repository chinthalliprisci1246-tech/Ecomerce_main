// components/ProductGrid.tsx
"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import HomeTabBar from "./HomeTabBar";
import ProductCard from "./ProductCard";
import NoProductAvailable from "./NoProductAvailable";
import { Product } from "@/sanity.types";

interface Props {
  productType: string[];
}

const SkeletonCard = () => (
  <div className="border border-gray-200 rounded-md bg-white animate-pulse">
    <div className="w-full h-64 bg-gray-200 rounded-t-md" />
    <div className="p-3 flex flex-col gap-2">
      <div className="h-3 bg-gray-200 rounded w-1/2" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-3 bg-gray-200 rounded w-1/4" />
      <div className="h-3 bg-gray-200 rounded w-1/3" />
      <div className="h-8 bg-gray-200 rounded-full mt-1" />
    </div>
  </div>
);

const ProductGrid: React.FC<Props> = ({ productType }) => {
  const [selectedTab, setSelectedTab] = useState<string>(
    productType[0] ?? ""
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!selectedTab) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = `
          *[_type == "product" && variant == $variant] {
            _id, name, images, stock, price, discount, slug, status, variant,
            "categories": categories[]->title
          }
        `;
        const response = await client.fetch<Product[]>(query, {
          variant: selectedTab,
        });
        setProducts(response);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedTab]);

  return (
    <div className="mt-10">
      <HomeTabBar
        selectedTab={selectedTab}
        onTabSelect={setSelectedTab}
        productType={productType}
      />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {[...Array(10)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <NoProductAvailable selectedTab={selectedTab} />
      )}
    </div>
  );
};

export default ProductGrid;