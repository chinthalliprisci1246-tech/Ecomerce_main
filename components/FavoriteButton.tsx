"use client";
import { useWishlistStore } from "@/store/wishlistStore";
import { Heart } from "lucide-react";
import Link from "next/link";

const FavoriteButton = () => {
  const { wishlistItems } = useWishlistStore();
  return (
    <Link href="/wishlist" className="group relative">
      <Heart className="w-5 h-5 hover:text-shop-dark-green hoverEffect" />
      <span className="absolute -top-1 -right-1 bg-shop-dark-green text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
        {wishlistItems.length}
      </span>
    </Link>
  );
};
export default FavoriteButton;
