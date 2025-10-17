import { cn } from "@/utils";

interface HeadingProps {
  title: string;
  className?: string;
}

export default function DynamicHeading({ title, className }: HeadingProps) {
  // Split the title into words
  const words = title.trim().split(" ");
  const lastWord = words.pop(); // Remove the last word
  const rest = words.join(" "); // Join the rest

  return (
    <h2 className={cn("text-3xl lg:text-4xl font-bold text-gray-900 mb-4", className ? className : "")}>
      {rest}{" "}
      <span className={`bg-gradient-to-r from-[#C1272D] to-[#A01F25] bg-clip-text text-transparent`}>{lastWord}</span>
    </h2>
  );
}
