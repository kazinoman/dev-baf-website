"use client";

import React, { JSX } from "react";

type TextProps = {
  size: "sm" | "base" | "xl" | "4xl" | "5xl";
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  weight?:
    | "thin"
    | "extralight"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold"
    | "black"
  color?: 'white'|'gray'|'black';
  className?: string 
};


const Text = ({ size='base', weight='normal', color='white', children, as: Component = "p", className }: TextProps) => {

  const sizeClasses: Record< NonNullable<TextProps['size']>, string> = {
    sm: "text-sm",
    base: "text-base",
    xl: "text-xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
  };

  const weightClass: Record<NonNullable<TextProps['weight']>, string> = {
    thin: "font-thin",
    extralight: "font-extralight",
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
    black: "font-black",
  };
  const colorClass:Record<NonNullable<TextProps['color']>, string> = {
    white: "text-white",
    gray: "text-gray-500",
    black: "text-black",
  }

 

  return (
    <Component className={`${sizeClasses[size]} ${weightClass[weight]} ${colorClass[color]} ${className} `}>
      {children}
    </Component>
  );
};

export default Text;
