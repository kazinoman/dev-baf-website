import * as React from "react";
import clsx from "clsx";

interface SeparatorProps extends React.HTMLAttributes<HTMLHRElement> {
  orientation?: "horizontal" | "vertical";
  className?: string;
}

export function Separator({
  orientation = "horizontal",
  className = "",
  ...props
}: SeparatorProps) {


  if (orientation === "vertical") {
    return (
      <div
        className={clsx("inline-block h-full w-px bg-gray-300", className)}
        {...props}
      />
    );
  }

  // default horizontal separator
  return (
    <hr
      className={clsx("border-t border-gray-300 ", className)}
      {...props}
    />
  );
}
