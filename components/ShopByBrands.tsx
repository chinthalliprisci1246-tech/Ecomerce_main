import React from "react";
import { Title } from "./ui/text";
import Link from "next/link";
import { getAllBrands } from "@/sanity/queries";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import ShopByBrandsBelow from "./ShopByBrandsBelow";
import { Brand } from "@/sanity.types";
import { ArrowRight } from "lucide-react";

const ShopByBrands = async () => {
  const brands = await getAllBrands();

  return (
    <div className="mb-10 lg:pb-10 bg-gray-100 rounded-xl p-6 mt-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <Title>Shop By Brands</Title>
          <p className="text-sm text-gray-400 mt-1">
            {brands.length} trusted brands
          </p>
        </div>
        <Link
          href="/shop"
          className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-2 rounded-full text-sm font-semibold text-gray-700 hover:bg-shop-light-green hover:text-white hover:border-shop-light-green transition-all duration-300 group"
        >
          View all
          <ArrowRight
            size={14}
            className="group-hover:translate-x-0.5 transition-transform duration-200"
          />
        </Link>
      </div>

      {/* Brand Grid */}
      {brands.length === 0 ? (
        <p className="text-center text-gray-400 py-10 text-sm">
          No brands available yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {brands?.map((brand: Brand) => (
            <Link
              key={brand._id}
              href={`/brand/${brand?.slug?.current}`}
              className="group bg-white rounded-xl p-4 flex flex-col items-center justify-center gap-2 shadow-sm border border-transparent hover:border-shop-light-green hover:shadow-md transition-all duration-300 min-h-[96px]"
            >
              {brand?.logo ? (
                <Image
                  src={urlFor(brand.logo).width(200).url()}
                  alt={brand.title ?? "Brand logo"}
                  width={120}
                  height={60}
                  className="object-contain h-12 w-auto group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <p className="text-sm font-bold text-gray-700 text-center group-hover:text-shop-dark-green transition-colors">
                  {brand.title}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}

      <ShopByBrandsBelow />
    </div>
  );
};

export default ShopByBrands; 



