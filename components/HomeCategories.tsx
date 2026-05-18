import React from "react";
import Image from "next/image";
import { Title } from "./ui/text";
import { urlFor } from "@/sanity/lib/image";
import { Category } from "@/types";
import Link from "next/link";

const HomeCategories = ({ categories }: { categories: Category[] }) => {
  console.log(categories);

  return (
    <div className="bg-white border border-shop_light_green/20 my-10 md:my-20 p-5 lg:p-7 rounded-md">

      <Title className="border-b pb-3">Popular Categories</Title>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-5">

        {categories?.map((category) => (
          <div
            key={category?._id}
            className="group cursor-pointer bg-shop-light p-5 flex items-center gap-3"
          >
            {/* IMAGE PART */}
            {category?.image && (
              <div className="overflow-hidden border-shop-orange/30  hoverEffect w-20 h-20 p-1">
                <Link href={`/category/${category?.slug?.current}`}>
                  <Image
                    src={urlFor(category.image).url()}
                    alt="categoryImage"
                    width={500}
                    height={500}
                    className="w-full h-full object-contain group-hover:scale-110 hoverEffect"
                  />
                </Link>
              </div>
            )}

            {/* TEXT PART */}
            <div className="space-y-1.5">
              <h2 className="text-base font-semibold">{}</h2>
              <p className="text-sm font-bold text-shop-dark-green">
                <span>({})</span> 
              </p>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default HomeCategories;
