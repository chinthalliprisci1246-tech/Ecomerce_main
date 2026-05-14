"use client";

import React, { FC } from "react";
import Logo from "./Logo";
import { X } from "lucide-react";
import { headerData } from "@/constants/data";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialMedia from "./SocialMedia";
import useOutSideClick from "@/hooks/useOutSideClick";
interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SideMenu: FC<SidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  const sidebarRef = useOutSideClick<HTMLDivElement>(onClose);

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 h-screen w-full bg-black/50 text-white/80 shadow-xl transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div
        ref={sidebarRef}
        className="min-w-72 max-w-96 bg-black h-screen p-10 border-r border-r-shop_light_green flex flex-col gap-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-5">
          <Logo className="text-white" spanDesign="group-hover:text-white" />

          <button
            onClick={onClose}
            className="hover:text-shop-light-green hoverEffect"
          >
            <X />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col space-y-3.5 font-semibold tracking-wide">
          {headerData?.map((item) => (
            <Link
              href={item.href}
              key={item.title}
              className={`hover:text-shop-light-green hoverEffect ${
                pathname === item.href ? "text-shop-light-green" : ""
              }`}
            >
              {item.title}
            </Link>
          ))}
        </div>

        <SocialMedia />
      </div>
    </div>
  );
};

export default SideMenu;