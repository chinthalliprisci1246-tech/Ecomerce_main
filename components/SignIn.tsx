import Link from 'next/link';

const SignIn = () => {
  return (
    // 🔐 AUTH: Replace this Link with NextAuth signIn() button after setup
    // When logged in, show user avatar/name instead
    <Link
      href="/login"
      className='text-sm font-semibold border border-shop-dark-green text-shop-dark-green px-4 py-1.5 rounded-full hover:bg-shop-dark-green hover:text-white hoverEffect'
    >
      Login
    </Link>
  );
};
export default SignIn;