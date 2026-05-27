import React from 'react';
import { Title } from './ui/text';
import Link from 'next/link';
import { getAllBrands } from '@/sanity/queries';
import { urlFor } from '@/sanity/lib/image';
import Image from 'next/image';
import ShopByBrandsBelow from './ShopByBrandsBelow';
import { Brand } from '@/sanity.types';


const ShopByBrands = async () => {
  const brands = await getAllBrands();

  return (
    <div className='mb-10 lg:pb-20 bg-shop-light-text p-5 lg:p-7 rounded-md'>
      <div className='flex items-center gap-5 justify-between mb-10'>
        <Title>Shop By Brands</Title>
        <Link
          href={"/shop"}
          className='text-sm font-semibold tracking-wide hover:text-shop-dark-green hoverEffect'
        >
          View all
        </Link>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6'>
        {brands?.map((brand: Brand) => (
          <div
            key={brand._id}
            className='bg-white rounded-md p-3 flex items-center justify-center shadow-sm hover:shadow-md transition'
          >
            {brand?.logo ? (
              <Image
                src={urlFor(brand.logo).url()}
                alt={brand.title?? ""}
                width={100}
                height={60}
                className='object-contain h-12 w-auto'
              />
            ) : (
              <p className='text-sm font-semibold text-center'>{brand.title}</p>
            )}
          </div>
        ))}
      </div>

      <ShopByBrandsBelow />
    </div>
  );
};

export default ShopByBrands; 



