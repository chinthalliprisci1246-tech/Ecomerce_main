import Logo from '@/components/Logo';
import Link from 'next/link';
import React from 'react'

const NotFoundPage = () => {
  return (
 <div className='bg-white flex flex-col items-center
  justify-center px-4 sm:px-6 lg:px-8 py-10 md:py-32'>
  <div className='max-w-md w-full space-y-8'>
    <div>
      <Logo /> 
      <h2 className='font-extrabold mt-6 text-3xl text-gray-900'>
        Looking for something?
      </h2>
      <p className='mt-2 text-sm text-gray-600'>
        We&apos;re sorry. the web address you entered is 
        not a functioning page on our site.
      </p>
      <div className='mt-8 space-y-6'>
        <div className='rounded-md space-y-4'>
            <Link 
            href="/"
            className='w-full flex items-center justify-center px-4 py-2
            border border-transparent text-sm font-semibold rounded-md
            text-white bg-shop-dark-green/80 hover:bg-shop-dark-green
            focus:outline-none focus:ring-2 focus:ring-offset-2 hoverEffect'
            >Go to ShopkarT home page
            </Link>
        <Link
         href='/shop'
         className='w-full flex items-center justify-center px-4 py-2
            border border-transparent text-sm font-semibold rounded-md
            text-white bg-shop-dark-green/80 hover:bg-shop-dark-green
            focus:outline-none focus:ring-2 focus:ring-offset-2 hoverEffect'>
               Browse Products
        </Link>
        </div>
      </div>
    </div>
  </div>
 </div>
  )
}

export default NotFoundPage;