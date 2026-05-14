import React from 'react'
import FooterTop from './FooterTop'
import Container from './Container'
import Logo from './Logo'
import SocialMedia from './SocialMedia'
import { SubText, SubTitle } from './ui/text'
import { quickLinksData,categoriesData } from '@/constants/data'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className=''>
      <Container>
        <FooterTop />
        <div className='py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <div className='space-y-4'>
            <Logo />
            <SubText>Discover curated furniture collections at shopcart, blending style
              and comfort to elevate your living spaces.
            </SubText>
            <SocialMedia className='text-darkColor/60' 
            iconClassName='border-darkColor/60 hover:border-shop-light-green hover:text-shop-light-green '
            tooltipClassName='bg-darkColor text-white'
            />
          </div>
          <div>
            <SubTitle className='text-xl'>Quick:</SubTitle>
            <ul className='space-y-4 mt-4'>
              {quickLinksData?.map((item) => (
                <li key={item?.title}>
                  <Link href={item?.href} className='hover:text-shop-light-green hoverEffect font-medium'>
                  {item?.title}
                  </Link></li>
              ))}
            </ul>
          </div>
          <div className=''>
            <SubTitle className='text-xl'>Category:</SubTitle>
            <ul className='space-y-4 mt-4'>
              {categoriesData?.map((item) => (
                <li key={item?.title}>
                  <Link href={`/category/${item?.href}`} className='hover:text-shop-light-green hoverEffect font-medium'>
                  {item?.title}
                  </Link></li>
              ))}
            </ul>
          </div>
         <div>
            <SubTitle>News letter</SubTitle>
            <SubText>Subcribe to our News letter to receive updates and exclusive offers</SubText>
            <form className='space-x-4 mt-2 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-1 lg:gap-2'>
              <input placeholder='Enter your email' type='email' required />
              <button className='bg-black/80 text-white/80 rounded-md  py-1.5 lg:px-4 hover:bg-black hover:text-white hoverEffect '>Subcribe</button>
            </form>
          </div>
        </div>
        
          <div className='py-6 border-t text-center text-sm text-gray-600 max-w-full'>
            <p>
          ^{new Date().getFullYear()}{" "}
            <Logo className='text-md' />
                 . All rights reserved
            </p>
          </div>
      </Container>
    </footer>
  )
}

export default Footer