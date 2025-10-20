import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine Tailwind classes safely.
 * - clsx() handles conditional classes
 * - twMerge() resolves Tailwind conflicts (e.g. "p-2 p-4" → "p-4")
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
