"use client";
import Container from "@/components/Container";
import { useWishlistStore } from "@/store/wishlistStore";
import { Heart, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const WishlistPage = () => {
  const { wishlistItems, removeFromWishlist } = useWishlistStore();

  return (
    <Container className="py-10 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">My Wishlist</h1>

      {wishlistItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-5 py-20 text-gray-400">
          <Heart size={60} strokeWidth={1} />
          <p className="text-lg font-medium">Your wishlist is empty</p>
          <Link href="/shop" className="bg-shop-dark-green text-white px-6 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {wishlistItems.map((item) => (
            <div key={item._id} className="bg-white border rounded-xl p-4 shadow-sm flex flex-col gap-3">
              <Image src={item.image} alt={item.name} width={200} height={200} className="w-full h-40 object-contain bg-gray-50 rounded-md" />
              <p className="font-semibold text-gray-800 text-sm line-clamp-2">{item.name}</p>
              <p className="text-shop-dark-green font-bold">${item.price}</p>
              <div className="flex gap-2">
                <Link href={`/product/${item.slug}`} className="flex-1 text-center bg-shop-dark-green text-white text-xs py-2 rounded-full hover:opacity-90 transition">
                  View Product
                </Link>
                <button onClick={() => removeFromWishlist(item._id)} className="text-red-400 hover:text-red-600 border rounded-full px-2">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default WishlistPage;