import React from "react";
import { Title } from "./ui/text";
import Link from "next/link";


const HomeBanner = () => {
  return (
    <div className="bg-green-300 rounded-lg px-10 lg:px-24 py-10 flex items-center justify-between max-w-7xl mx-auto min-h-70"
     style={{
        backgroundImage: "url('/banner-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}>

      {/* TEXT */}
      <div className="space-y-8">
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
    </div>
  );
};

export default HomeBanner;
