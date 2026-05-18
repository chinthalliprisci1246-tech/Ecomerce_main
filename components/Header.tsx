import SearchBar from './SearchBar'
import CartIcon from './CartIcon'
import FavoriteButton from './FavoriteButton'
import MobileMenu from './MobileMenu'
import Container from './Container'
import Logo from './Logo'
import HeaderMenu from './HeaderMenu'
import SignIn from './SignIn'


const Header = async () => {
  /*const user = await useCurrentUser(); */
  

  return (
    <header className='bg-white py-5 top-0 z-50 backdrop-blur-md'>
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
    </header>
  )
}

export default Header
