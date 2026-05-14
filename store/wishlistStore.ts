import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface WishlistItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
}

interface WishlistStore {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      wishlistItems: [],
      addToWishlist: (item) =>
        set((state) => {
          const exists = state.wishlistItems.find((i) => i._id === item._id);
          if (exists) return state;
          return { wishlistItems: [...state.wishlistItems, item] };
        }),
      removeFromWishlist: (id) =>
        set((state) => ({
          wishlistItems: state.wishlistItems.filter((i) => i._id !== id),
        })),
      isInWishlist: (id) => get().wishlistItems.some((i) => i._id === id),
    }),
    { name: "shopkart-wishlist" }
  )
);