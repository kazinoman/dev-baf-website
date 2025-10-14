import * as React from "react";
import clsx from "clsx";

type Variant = "default" | "secondary" | "destructive" | "outline";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

const baseClasses =
  "inline-flex items-center text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";


const variantClasses: Record<Variant, string> = {
  default:
    "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
  secondary:
    "text-[#111111] uppercase roboto-font font-semibold hover:bg-red-600 hover:text-white duration-500 cursor-pointer",
  destructive:
    "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  outline:
    "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-400",
};



export function Badge({
  variant = "default",
  className = "",
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={clsx(baseClasses, variantClasses[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
}
