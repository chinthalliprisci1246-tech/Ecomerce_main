/*import { Truck, RotateCcw, Headphones, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Delivery",
    desc: "Free shipping over $100",
  },
  {
    icon: RotateCcw,
    title: "Free Return",
    desc: "Free shipping over $100",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    desc: "Friendly 24/7 customer support",
  },
  {
    icon: ShieldCheck,
    title: "Money Back Guarantee",
    desc: "Quality checked by our team",
  },
];

const ShopByBrandsBelow = () => {
  return (
    <div className="bg-gray-100 rounded-xl p-6 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {features.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="flex items-center gap-4 border-r last:border-none pr-4"
            >
              <Icon className="w-8 h-8 text-gray-600" />

              <div>
                <p className="font-semibold text-sm">{item.title}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShopByBrandsBelow; */

"use client";

import { useState } from "react";
import { Truck, RotateCcw, Headphones, ShieldCheck } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Delivery",
    desc: "Free shipping over $100",
  },
  {
    icon: RotateCcw,
    title: "Free Return",
    desc: "Free shipping over $100",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    desc: "Friendly 24/7 customer support",
  },
  {
    icon: ShieldCheck,
    title: "Money Back Guarantee",
    desc: "Quality checked by our team",
  },
];

const ShopByBrandsBelow = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="bg-gray-100 rounded-xl p-6 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {features.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeIndex === index;

          return (
            <div
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`
                flex items-center gap-4 p-4 cursor-pointer transition-all duration-200
                ${isActive ? "bg-green-100" : "bg-transparent"}
                
                border-b sm:border-b-0 sm:border-r
                md:border-b-0 md:border-r
                last:border-none
              `}
            >
              <Icon
                className={`
                  w-8 h-8 transition-colors
                  ${isActive ? "text-green-600" : "text-gray-600"}
                `}
              />

              <div>
                <p
                  className={`text-sm font-semibold ${
                    isActive ? "text-green-600" : ""
                  }`}
                >
                  {item.title}
                </p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShopByBrandsBelow;