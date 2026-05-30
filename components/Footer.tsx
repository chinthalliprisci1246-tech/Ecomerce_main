import FooterTop from './FooterTop'
import Container from './Container'
import Logo from './Logo'
import SocialMedia from './SocialMedia'
import { SubText, SubTitle } from './ui/text'
import { quickLinksData,categoriesData } from '@/constants/data'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer>
      <Container>
        <FooterTop />
        <div className='py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <div className='space-y-4'>
            <Logo />
            <SubText>Discover curated furniture collections at shopcart, blending style
              and comfort to elevate your living spaces.
            </SubText>
            <SocialMedia className='text-black pt-5' 
            iconClassName='border-black/60 hover:text-shop-light-green text-black'
            tooltipClassName='bg-shop-light-green text-black'
            />
          </div>
         <div className='grid grid-cols-2 lg:grid-cols-2'>
          <div>
            <SubTitle className='text-xl cursor-pointer hover:text-shop-light-green font-bold'>Quick:</SubTitle>
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
            <SubTitle className='text-xl cursor-pointer hover:text-shop-light-green font-bold'>Category:</SubTitle>
            <ul className='space-y-4 mt-4'>
              {categoriesData?.map((item) => (
                <li key={item?.title}>
                  <Link href={`/category/${item?.href}`} className='hover:text-shop-light-green hoverEffect font-medium'>
                  {item?.title}
                  </Link></li>
              ))}
            </ul>
          </div>
          </div>
         <div>
            <SubTitle>News letter</SubTitle>
            <SubText>Subcribe to our News letter to receive updates and exclusive offers</SubText>
            <form className='space-x-4 mt-2 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-1 lg:gap-2'>
              <input placeholder='Enter your email' type='email' required />
              <button className='bg-shop-light-green text-gray-800 font-semibold rounded-md  py-1.5 lg:px-4 hover:bg-shop-light-green/90 hover:text-black hoverEffect '>Subcribe</button>
            </form>
          </div>
        </div>
      </Container>
      <div className='bg-gray-950 py-6 border-t text-center text-sm text-gray-600 max-w-full'>
            <div>
          @{new Date().getFullYear()}{" "}
            <Logo className="text-white text-md" spanDesign="group-hover:text-white" />
                 . All rights reserved
            </div>
          </div>
    </footer>
  )
}

export default Footer;