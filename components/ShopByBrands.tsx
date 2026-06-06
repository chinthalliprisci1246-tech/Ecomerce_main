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
    <div className='mb-10 lg:pb-20 min-h-50   lg:p-7 bg-gray-100 rounded-xl p-6 mt-10 '>
      <div className='flex items-center gap-5 justify-between mb-10'>
        <Title>Shop By Brands</Title>
        <Link
          href={"/shop"}
          className='bg-white  px-5 py-2 rounded-full text-md font-semibold tracking-wide hover:bg-shop-light-green/85 hoverEffect '
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



