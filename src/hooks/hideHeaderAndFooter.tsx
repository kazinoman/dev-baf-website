"use client";

import { usePathname } from "next/navigation";

const HIDE_LAYOUT_ROUTES = ["/athletes/registration", "/athlete/success"];

export function useHideLayout(): boolean {
  const pathname = usePathname();

  return HIDE_LAYOUT_ROUTES.includes(pathname || "");
}
