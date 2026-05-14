"use client";

import React from "react";
import { Facebook, Github, Linkedin, Twitter, Youtube } from "lucide-react";
import Link from "next/link";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

const socialLink = [
  {
    title: "YouTube",
    href: "#",
    icon: <Youtube className="w-5 h-5" />,
  },
  {
    title: "LinkedIn",
    href: "#",
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    title: "GitHub",
    href: "#",
    icon: <Github className="w-5 h-5" />,
  },
  {
    title: "Facebook",
    href: "#",
    icon: <Facebook className="w-5 h-5" />,
  },
  {
    title: "Twitter",
    href: "#",
    icon: <Twitter className="w-5 h-5" />,
  },
];

const SocialMedia = ({
  className,
  iconClassName,
  tooltipClassName,
}: Props) => {
  return (
    <TooltipProvider>
      <div className={cn("flex items-center gap-3.5", className)}>
        {socialLink.map((item) => (
          <Tooltip key={item.title}>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "p-2 border rounded-full hover:text-white hover:border-shop_light_green hoverEffect",
                  iconClassName
                )}
              >
                {item.icon}
              </Link>
            </TooltipTrigger>

            <TooltipContent
              className={cn(
                "bg-white text-black font-semibold",
                tooltipClassName
              )}
            >
              {item.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SocialMedia;