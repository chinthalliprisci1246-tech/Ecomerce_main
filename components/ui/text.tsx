import React from "react";
import { cn } from "@/lib/utils";

const Title = ({
    children,
    className,
}:{
    children: React.ReactNode;
    className?:string;
}) => {
   return <h1 className={cn("text-2xl md:text-3xl font-bold capitalize tracking-wider mb-5",className)}>{children}</h1>
          
};

const SubText = ({
    children,
    className,
}:{
    children: React.ReactNode;
    className?:string;
}) => {
    return <h1 className={cn("text-gray-600 text-sm", className)}>{children}</h1>
};
const SubTitle = ({
    children,
    className,
}:{
    children: React.ReactNode;
    className?:string;
}) => {
    return <h1 className={cn("font-semibold text-gray-900 font-sans", className)}>{children}</h1>
}
export  {Title, SubText, SubTitle};