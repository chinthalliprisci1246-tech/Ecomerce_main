import { Heart } from "lucide-react";
import React from "react";
import { cn } from "@/lib/utils";
import { Product } from "@/sanity.types";

interface Props {
  product: Product;
  className?: string;
}

const AddToWishlistButton = ({ product, className }: Props) => {
  console.log(product)
  return (
    <div className={cn("absolute top-2 right-2 z-10", className)}>
      <div className="p-2.5 rounded-full hover:bg-shop-dark-blue bg-white/25">
        <Heart size={15} />
      </div>
    </div>
  );
};

export default AddToWishlistButton;
