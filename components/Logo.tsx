import Link from 'next/link'
import React from 'react'
import { cn } from '@/lib/utils'

const Logo = ({className, spanDesign} : {className?:string, spanDesign?:string}) => {
  return (
    <Link href={"/"} className='inline-flex'>
     <p className={cn("text-3xl text-shop-dark-green font-black tracking-wider hover:text-shop-light-green hoverEffect group font-sans", className)}>
    Ekar<span 
    className={cn('text-shop-light-green group-hover:text-shop-dark-green hoverEffect', spanDesign)}>T</span>
     </p>
    </Link>
  )
}

export default Logo;