"use client";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

const CartIcon = () => {
  const { cartItems } = useCartStore();
  const totalQty = cartItems.reduce((sum, item) => sum + item.qty, 0);
  return (
    <Link href="/cart" className="group relative">
      <ShoppingCart className="w-6 h-6 hover:text-shop-dark-green hoverEffect" />
      <span className="absolute -top-1 -right-1 bg-shop-dark-green text-white h-3.5 w-3.5 rounded-full text-xs font-semibold flex items-center justify-center">
        {totalQty}
      </span>
    </Link>
  );
};
export default CartIcon;