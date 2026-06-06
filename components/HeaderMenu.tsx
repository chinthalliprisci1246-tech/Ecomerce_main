"use client";
import { headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";

const HeaderMenu = () => {
  const pathname = usePathname();

  return (
    <nav className="hidden md:inline-flex w-1/3 items-center text-sm capitalize gap-7 text-lightColor font-normal">
      {headerData?.map((item) => {
        const isActive = pathname === item?.href;

        return (
          <Link
            key={item?.title}
            href={item?.href}
            className={`relative group transition-colors duration-200 ${
              isActive
                ? "text-shop-light-green font-medium  underline underline-offset-4"
                : "text-lightColour hover:text-shop-light-green"
            }`}
          >
            {item?.title}

            {/* Left half of underline */}
            <span
              className={`absolute -bottom-0.5 left-0 h-0.5 bg-shop-light-green transition-all duration-300 ease-out ${
                isActive ? "w-1/2" : "w-0 group-hover:w-1/2"
              }`}
            />
            {/* Right half of underline */}
            <span
              className={`absolute -bottom-0.5 right-0 h-0.5 bg-shop-light-green transition-all duration-300 ease-out ${
                isActive ? "w-1/2" : "w-0 group-hover:w-1/2"
              }`}
            />
          </Link>
        );
      })}
    </nav>
  );
};

export default HeaderMenu;