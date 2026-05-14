"use client"
import React from 'react'
import { Product } from '@/sanity.types'
import { ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useCartStore } from '@/store/cartStore';
import { urlFor } from '@/sanity/lib/image';
import { toast } from 'sonner';

interface Props {
  product: Product;
  className?: string;
}

const AddToButtonCart = ({ product, className }: Props) => {
  const isOutOfStock = product?.stock === 0;
  const { addToCart } = useCartStore();

  const handleAddToCart = () => {
    addToCart({
      _id: product._id,
      name: product.name ?? "",
      price: product.price ?? 0,
      image: product.images?.[0] ? urlFor(product.images[0]).url() : "",
      slug: product.slug?.current ?? "",
      qty: 1,
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div>
      <Button
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className={cn(
          "w-full text-white bg-shop-dark-green/80 shadow-none border border-shop-dark-green/80 font-semibold tracking-wide hover:bg-shop-dark-green hover:border-shop-dark-green hoverEffect",
          className
        )}
      >
        <ShoppingBag /> {isOutOfStock ? "Out of Stock" : "Add to cart"}
      </Button>
    </div>
  );
}

export default AddToButtonCart;
