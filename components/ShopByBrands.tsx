import React from 'react';
import { Title } from './ui/text';
import Link from 'next/link';
//import brand from '@/sanity/schemaTypes/brand';
//import { getAllBrands } from '@/sanity/lib/queries';
import ShopByBrandsBelow from './ShopByBrandsBelow';



const ShopByBrands = async() => {
   //const Brands = await getBrands();
  return (
    <div className='mb-10 lg:pb-20 bg-shop-light-text p-5 lg:p-7 rounded-md'>
      <div className='flex items-center gap-5 justify-between mb-10'>
        <Title >
            Shop By Brands
        </Title>
        <Link href={"/shop"}
        className='text-sm font-semibold tracking-wide
        hover:text-shop-dark-green hoverEffect'
        >
            View all
        </Link>
        
      </div>
      <div>
       <ShopByBrandsBelow />
      </div>
    </div>
  );
};

export default ShopByBrands 



