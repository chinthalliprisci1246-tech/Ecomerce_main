"use client";
import SearchBar from './SearchBar'
import CartIcon from './CartIcon'
import FavoriteButton from './FavoriteButton'
import MobileMenu from './MobileMenu'
import Container from './Container'
import Logo from './Logo'
import HeaderMenu from './HeaderMenu'
import SignIn from './SignIn'
import { useState, useEffect } from "react";

  export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav 
    className={`sticky py-4 top-0 z-50 transition-all duration-200 ${
       scrolled 
        ? "bg-white/90 backdrop-blur-md border-b border-green-200 shadow-md"
        : "bg-transparent"}`}
       >
      <Container className='flex items-center justify-between text-lightColor'>
        <div className='w-auto md:w-1/3 flex items-center justify-start gap-2.5 md:gap-0'>
          <MobileMenu />
          <Logo />
        </div>

        <HeaderMenu />

        <div className='w-auto md:w-1/3 flex items-center justify-end gap-5'>
          <SearchBar />
          <CartIcon />
          <FavoriteButton />
          <SignIn />
        </div>
      </Container>
    </nav>
  )
}