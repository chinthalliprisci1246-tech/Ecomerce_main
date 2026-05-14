import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
  qty: number;
}

interface CartStore {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cartItems: [],
      addToCart: (item) =>
        set((state) => {
          const exists = state.cartItems.find((i) => i._id === item._id);
          if (exists) {
            return {
              cartItems: state.cartItems.map((i) =>
                i._id === item._id ? { ...i, qty: i.qty + 1 } : i
              ),
            };
          }
          return { cartItems: [...state.cartItems, { ...item, qty: 1 }] };
        }),
      removeFromCart: (id) =>
        set((state) => ({
          cartItems: state.cartItems.filter((i) => i._id !== id),
        })),
      clearCart: () => set({ cartItems: [] }),
    }),
    { name: "cart-storage" }
  )
);