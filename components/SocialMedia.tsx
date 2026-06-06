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
    href: "https://youtu.be/PoMEGxNLwFc?si=vBO246Df0AgGsvt_",
    icon: <Youtube className="w-5 h-5" />,
  },
  {
    title: "LinkedIn",
    href: "www.linkedin.com/in/imdkdeveloper",
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    title: "GitHub",
    href: "https://github.com/chinthalliprisci1246-tech",
    icon: <Github className="w-5 h-5" />,
  },
  {
    title: "Facebook",
    href: "https://github.com/chinthalliprisci1246-tech",
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
                  "p-2 border-2 rounded-lg hover:text-white hover:bg-green-600 hoverEffect",
                  iconClassName
                )}
              >
                {item.icon}
              </Link>
            </TooltipTrigger>

            <TooltipContent
              className={cn(
                "bg-green-600 text-white font-semibold",
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