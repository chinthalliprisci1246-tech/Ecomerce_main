import Image from "next/image";
import { Title } from "./ui/text";
import { urlFor } from "@/sanity/lib/image";
import { Category } from "@/sanity.types";
import Link from "next/link";

const HomeCategories = ({ categories }: { categories: Category[] }) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 space-y-4 text-center bg-gray-100 rounded-lg w-full mt-10">
      <Title className="border-b pb-3">Popular Categories</Title>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-5 px-5 w-full">
        {categories?.map((category) => (
          <Link
            key={category?._id}
            href={`/category/${category?.slug?.current}`}
            className="group cursor-pointer bg-shop-light-green rounded-lg p-4 flex flex-col items-center gap-3 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            {/* IMAGE */}
            {category?.image && (
              <div className="w-24 h-24 flex items-center justify-center bg-white rounded-md overflow-hidden p-2 shadow-sm">
                <Image
                  src={urlFor(category.image).url()}
                  alt={category?.title ?? "category"}
                  width={500}
                  height={500}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            )}

            {/* TEXT */}
            <div className="space-y-0.5 text-center">
              <h2 className="text-sm font-semibold text-gray-800 leading-tight">
                {category?.title}
              </h2>
              <p className="text-xs text-shop-dark-green font-bold">
                {(category as Category)?.productCount ?? 0} Products
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeCategories;
