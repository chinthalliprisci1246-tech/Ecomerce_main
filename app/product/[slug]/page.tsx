import Container from '@/components/Container';
import ImageView from '@/components/ImageView';
import PriceView from '@/components/PriceView';
import { getProductBySlug } from '@/sanity/quaries';
import { StarIcon } from 'lucide-react';
import React from 'react'
import AddToButtonCart from '@/components/AddToButtonCart';
import FavoriteButton from '@/components/FavoriteButton';

const SingleProductPage = async({params}:{params:Promise <{slug: string}>;
}) => {
    const {slug} = await params;
    const product = await getProductBySlug(slug);
    
    console.log("Product", product)
    return (
    <Container className="flex flex-col md:flex-row gap-10 py-10">
      {product?.images && (
        <ImageView
          images={product?.images}
          isStock={product?.stock}
        />
      )}

      <div className="space-y-1">
        <h2 className="text-2xl font-bold">
          {product?.name}
        </h2>

        <p className="text-sm text-gray-600 tracking-wide">
          {product?.description}
        </p>
        <div className='flex items-center gap-0.5 text-xs'>
            {[...Array(5)].map((_, index) => (
                <StarIcon 
                key={index}
                size={12}
                className='text-shop-light-green'
                fill={'#3b9c3c'}
                />
            ))}
            <p className='font-semibold'>{`(120)`}</p>
        </div>
        <div className='space-y-2 border-t border-b border-gray-200  text-sm inline-block'>
            <PriceView 
            price={product?.price}
            discount={product.discount}
            className='text-lg font-bold'
            />
            <p className={`px-6 py-1.5 font-semibold rounded-lg ${product?.stock === 0 ? "bg-red-100 text-red-600" : "text-green-600 bg-green-100"}`}>{(product?.stock as number) > 0 ? "in stock" : "out of stock"}</p>
        </div>
        <div className='flex items-center gap-2.5 lg:gap-5'>
          <AddToButtonCart product={product}/>
          <FavoriteButton  />
        </div>
      </div>
    </Container>
    );
  
}

export default SingleProductPage;
