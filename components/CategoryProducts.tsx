"use client";
import React, { useState, useEffect } from 'react';
import type { Category, ProductQueryResult } from '@/sanity.types';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { getProductsByCategory } from '@/sanity/quaries/query';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import NoProductAvailable from './NoProductAvailable';

interface Product {
  _id: string;
  name: string;
  price: number;
  images?: unknown[]; 
}
interface Props {
  categories: Category[];
  slug: string;
} 

const CategoryProducts = ({ categories, slug }: Props) => {
  const [currentSlug, setCurrentSlug] = useState(slug);
  const [products, setProducts] = useState<ProductQueryResult[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ✅ handleCategoryChange from tutorial
  const handleCategoryChange = (newSlug: string) => {
    if (newSlug === currentSlug) return; // Prevent unnecessary updates
    setCurrentSlug(newSlug);
    router.push(`/category/${newSlug}`, { scroll: false }); // Update URL without scroll
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

      {/* ✅ Category Buttons with images */}
      <div className="flex flex-col md:min-w-40 border">
        {categories?.map((item) => (
          <Button
            key={item?._id}
            onClick={() => handleCategoryChange(item?.slug?.current)}
            className={`bg-transparent border-0 p-2 rounded-none 
            text-darkColor shadow-none hover:shadow-pink-400 
            hover:text-white font-semibold hoverEffect 
            border-b last:border-b-0 capitalize flex items-center gap-2
            ${currentSlug === item?.slug?.current ? "bg-shop_orange text-white" : ""}`}
          >
            {/* ✅ Category image */}
            {item?.image && (
              <Image
                src={urlFor(item.image).url()}
                alt={item.title}
                width={60}
                height={60}
                className="w-8 h-10 object-contain"
              />
            )}
            <p>{item?.title}</p>
          </Button>
        )
      ) }
      </div>
    
      {/* Products Grid */}
      <div className="flex-1">
        {loading ? (
          // ✅ Loading state from screenshot
          <div className="flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center bg-gray-100 rounded-lg w-full">
            <div className="flex items-center space-x-2 text-blue-600">
              <span>Product is loading...</span>
            </div>
          </div>
        ) : products?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {products.map((product ) => (
              <div
                key={product._id}
                className="border rounded-md p-3 hover:shadow-md hoverEffect"
              >
            
                {product.images?.[0] && (
                  <Image
                    src={urlFor(product.images[0]).url()}
                    alt={product.name ?? "product"}
                    width={200}
                    height={200}
                    className="w-full h-40 object-contain"
                  />
                )}
                <p className="font-semibold mt-2 text-sm">{product.name}</p>
                <p className="text-green-600 font-bold">₹{product.price}</p>
              </div>
            ))}
          </div>
        ) : (
          // ✅ NoProductAvailable component from screenshot
          <NoProductAvailable selectedTab={currentSlug} />
        )}
      </div>

    </div>
  );
};

export default CategoryProducts;