import { Search } from 'lucide-react';
import Link from 'next/link';

const SearchBar = () => {
  return (
    <Link href="/search">
      <Search className='w-5 h-5 hover:text-shop-dark-green hoverEffect cursor-pointer' />
    </Link>
  );
};
export default SearchBar;
