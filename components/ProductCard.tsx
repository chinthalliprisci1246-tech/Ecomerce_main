// components/ProductCard.tsx
import React from "react";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { FlameIcon, StarIcon } from "lucide-react";
import { Title } from "./ui/text";
import PriceView from "./PriceView";
import { Product } from "@/sanity.types";
import AddToButtonCart from "./AddToButtonCart";

// Deterministic pseudo-random — same product always gets same rating
function seededRandom(seed: string, index: number): number {
  let hash = 0;
  const str = seed + index;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) / 2147483647;
}

const ProductCard = ({ product }: { product: Product }) => {
  const rating = 3 + Math.floor(seededRandom(product._id, 1) * 3); // 3–5
  const reviewCount = 4 + Math.floor(seededRandom(product._id, 2) * 44); // 4–47

  return (
    <div className="text-sm border border-shop-dark-blue/20 rounded-md bg-white group">
      <Link href={`/product/${product?.slug?.current}`}>
        <div className="relative group overflow-hidden bg-shop-light-green">
          {product?.images?.[0] && (
            <Image
              src={urlFor(product.images[0]).url()}
              alt={product?.name || "Product Image"}
              loading="lazy"
              width={700}
              height={700}
              className={`w-full h-64 object-contain overflow-hidden transition-transform bg-white/25 hoverEffect ${
                product?.stock !== 0
                  ? "group-hover:scale-105"
                  : "opacity-50"
              }`}
            />
          )}

          {product?.status === "sale" && (
            <p className="absolute top-2 left-2 z-10 text-xs border border-shop-dark-blue/50 px-2 rounded-full group-hover:border-shop-light-green group-hover:text-shop-light-green hoverEffect">
              Sale!
            </p>
          )}
          {product?.status === "new" && (
            <p className="absolute top-2 left-2 z-10 text-xs border border-shop-dark-blue/50 px-2 rounded-full group-hover:border-shop-light-green group-hover:text-shop-light-green hoverEffect">
              New
            </p>
          )}
          {product?.status === "hot" && (
            <div className="absolute top-2 left-2 z-10 border border-shop-orange/50 p-1 rounded-full group-hover:border-shop-orange hoverEffect">
              <FlameIcon
                size={18}
                fill="#fb6c08"
                className="text-shop-orange/50 group-hover:text-shop-orange hoverEffect"
              />
            </div>
          )}
        </div>
      </Link>

      <div className="p-3 flex flex-col gap-2">
        {product?.categories && (
          <p className="uppercase line-clamp-1 text-xs text-shop-light-text">
            {product.categories.join(", ")}
          </p>
        )}

        <Link href={`/product/${product?.slug?.current}`}>
          <Title className="text-sm line-clamp-2 hover:text-shop-dark-green hoverEffect">
            {product?.name}
          </Title>
        </Link>

        {/* Dynamic rating per product */}
        <div>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <StarIcon
                key={index}
                size={12}
                className={
                  index < rating
                    ? "text-shop-light-green"
                    : "text-shop-light-text"
                }
                fill={index < rating ? "#93D991" : "#ababab"}
              />
            ))}
          </div>
          <p className="text-shop-light-text text-xs tracking-wide">
            {reviewCount} Reviews
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <p className="font-medium">
            {product?.stock && product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>
          <p
            className={`font-semibold ${
              product?.stock === 0
                ? "text-red-600"
                : "text-shop-light-green/80"
            }`}
          >
            {product?.stock && product.stock > 0
              ? product.stock
              : "Unavailable"}
          </p>
        </div>

        <PriceView price={product?.price} className="text-sm" />
        <AddToButtonCart product={product} className="w-36 rounded-full" />
      </div>
    </div>
  );
};

export default ProductCard;