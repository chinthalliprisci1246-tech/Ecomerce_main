"use client"
import { headerData } from '@/constants/data'
import React  from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const HeaderMenu = () => {
    const pathname = usePathname();
    console.log(pathname)
  return (
    <div className='hidden md:inline-flex w-1/3 items-center text-sm capitalize gap-7 text-lightColour font-normal'>
      {headerData?.map((item) => 
    <Link 
    key={item?.title} 
    href={item?.href} 
    className={`hover:text-shop-light-green hoverEffect relative group ${pathname === item?.href && "text-shop_light_green"}`}>
      {item?.title}
      <span className={`absolute -bottom-0.5 left-0.5 w-0 h-0.5 bg-shop_light_green group-hover:w-1/2 hoverEffect group-hover:left-0`} />
      <span className={`absolute -bottom-0.5 right-0.5 w-0 h-0.5 bg-shop_light_green group-hover:w-1/2 hoverEffect group-hover:right-0`} />
    </Link>
    )}
    </div>
  )
}

export default HeaderMenu 