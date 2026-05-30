"use client";
import { useState } from "react";
import { MapPin, Phone, Clock, Mail } from "lucide-react";

const Brands = [
  {
    icon: MapPin,
    title: "Visit Us",
    desc: " New Orleans, USA",
  },
  {
    icon: Phone,
    title: "Call us on",
    desc: "+1 270 956 648",
  },
  {
    icon: Clock,
    title: "Working Hours",
    desc: "Mon - Sat: 10:00 AM - 7:00 PM",
  },
  {
    icon: Mail,
    title: "Email us on",
    desc: "shopcart@gmail.com",
  },
];


const FooterTop = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="bg-gray-100 rounded-xl p-6 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
        {Brands.map((item, index) => {
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

export default FooterTop;

