"use client"
import React, { useEffect } from 'react'
import { Product } from '@/sanity.types'
import { ShoppingBag } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
interface Props {
    product: Product;
    className?: string;
}

const AddToButtonCart = ({ product, className }: Props) => {
    const isOutOfStock = product?.stock === 0;
    

    const handleAddToCart = () =>{
        window.alert("Add to cart!");
    };
  return (
    <div>
      <Button
      onClick={handleAddToCart}
      disabled={isOutOfStock}
       className={cn(
        "w-full text-white bg-shop-dark-green/80 -shop-light-text shadow-none border border-shop-dark-green/80 font-semibold tracking-wide hover:bg-shop-dark-green hover:border-shop-dark-green hoverEffect",
        className
       )}
      >
        <ShoppingBag /> {isOutOfStock? "Out of Stock " :
         "Add to cart"}
      </Button>
    </div>
  )
}

export default AddToButtonCart;
