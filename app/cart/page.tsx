"use client";

import Container from "@/components/Container";
import { useCartStore } from "@/store/cartStore";
import { ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CartPage = () => {
  const { cartItems, removeFromCart, increaseQty, decreaseQty, clearCart } = useCartStore();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <Container className="py-10 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-8">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-5 py-20 text-gray-400">
          <ShoppingBag size={60} strokeWidth={1} />
          <p className="text-lg font-medium">Your cart is empty</p>
          <Link href="/shop" className="bg-shop-dark-green text-white px-6 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Cart Items */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-4 bg-white border rounded-xl p-4 shadow-sm">
                <Image src={item.image} alt={item.name} width={80} height={80} className="w-20 h-20 object-contain rounded-md bg-gray-50" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">${item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => decreaseQty(item._id)} className="w-7 h-7 border rounded-full text-sm font-bold hover:bg-gray-100">-</button>
                    <span className="text-sm font-semibold">{item.qty}</span>
                    <button onClick={() => increaseQty(item._id)} className="w-7 h-7 border rounded-full text-sm font-bold hover:bg-gray-100">+</button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item._id)} className="text-red-400 hover:text-red-600 transition">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            <button onClick={clearCart} className="text-xs text-red-400 hover:text-red-600 text-right mt-2">Clear Cart</button>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-xl p-6 h-fit flex flex-col gap-4 border">
            <h2 className="text-lg font-bold text-gray-800">Order Summary</h2>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span><span>${total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Shipping</span><span className="text-green-600">Free</span>
            </div>
            <div className="border-t pt-4 flex justify-between font-bold text-gray-800">
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
            {/* 💳 RAZORPAY: call POST /api/razorpay with { amount: total * 100 } */}
            <button className="w-full bg-shop-dark-green text-white py-3 rounded-full font-semibold hover:opacity-90 transition"
              onClick={() => alert("💳 Connect Razorpay here")}>
              Proceed to Pay
            </button>
          </div>

        </div>
      )}
    </Container>
  );
};

export default CartPage;