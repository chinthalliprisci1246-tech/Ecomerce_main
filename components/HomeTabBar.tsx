"use client";

import React from "react";
import Link from "next/link";

interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
  productType: string[];
}

const HomeTabBar: React.FC<Props> = ({
  selectedTab,
  onTabSelect,
  productType,
}) => {
  return (
    <div className="flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-3 text-sm font-semibold">
        {productType?.map((item) => (
          <button
            key={item}
            onClick={() => onTabSelect(item)}
            className={`
            border px-4 py-1.5 md:px-6 md:py-2 rounded-full hoverEffect
            ${
              selectedTab === item
                ? "bg-shop-light-green text-white border-shop-light-green"
                : "border-shop-light-green/30 hover:bg-shop-light-green hover:text-white"
            }
            `}
          >
            {item}
          </button>
        ))}
      </div>

      <Link
        href="/shop"
        className="
        border border-shop-light-green/30 px-4 py-1.5
        md:px-6 md:py-2 rounded-full hover:bg-shop-light-green
        hover:border-shop-light-green hover:text-white hoverEffect
        "
      >
        See All
      </Link>
    </div>
  );
};

export default HomeTabBar;
