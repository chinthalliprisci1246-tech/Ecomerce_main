import React from "react";
import { Title } from "./ui/text";
import Link from "next/link";
import Image from "next/image";

const HomeBanner = () => {
  return (
    <div className="bg-shop-light-pink rounded-lg px-10 lg:px-24 py-10 flex items-center justify-between max-w-7xl mx-auto">

      {/* TEXT */}
      <div className="space-y-4">
        <Title>
          Grab Upto 50% Off <br />
          On Selected Headphones
        </Title>

        <Link
          href="/shop"
          className="bg-shop-dark-green text-white px-5 py-2 rounded-md text-sm hover:bg-shop-dark-green/90"
        >
          Buy Now
        </Link>
      </div>

      {/* IMAGE */}
      <div className="hidden ">
        <Image
          src=""
          alt="Headphones"
          width={260}
          height={260}
        />
      </div>

    </div>
  );
};

export default HomeBanner;
