"use client";
import Image, { StaticImageData } from "next/image";
import { AvatarFallback } from "../ui/AvatarFallBack";
import Avatar from "../ui/Avatar";
import { AvatarImage } from "../ui/AvatarImage";

interface AuthorProfileProps {
  author: {
    name: string;
    avatar: string | StaticImageData;
    initials: string;
  };
  bio: string;
  label?: string;
}

export function AuthorProfile({
  author,
  bio,
  label = "Written by",
}: AuthorProfileProps) {

  return (
    <div className="w-full shadow-sm mt-2 md:mt-20 lg:mt-32">
      <div className="px-4 py-6 sm:px-6 sm:py-8 md:px-10 lg:px-12">
        <div className="flex flex-col sm:flex-row sm:gap-6 lg:gap-8 items-center sm:items-start">
          {/* Avatar Section */}
          <Avatar
            variant="rectangle"
            className="
              shadow-md 
              w-28 h-28 
              sm:w-36 sm:h-36 
              md:w-44 md:h-44 
              lg:w-52 lg:h-52 
              flex-shrink-0 flex
            "
          >
            <AvatarImage
              url={author.avatar || "/placeholder.svg"}
              alt={`${author.name}'s profile picture`}
              className="object-cover w-full h-full "
            />
            <AvatarFallback className="bg-muted text-muted-foreground font-semibold text-lg flex items-center justify-center w-full h-full rounded-xl">
              {author.initials}
            </AvatarFallback>
          </Avatar>

          {/* Content Section */}
          <div className="flex-1 text-center sm:text-left mt-4 sm:mt-0">
            {label && (
              <p className="text-xs sm:text-sm text-[#777777] tracking-wide font-medium mb-1">
                {label}
              </p>
            )}

            <h2 className="font-bold text-[#111111] text-lg sm:text-xl md:text-2xl lg:text-4xl leading-tight mb-2">
              {author.name}
            </h2>

            <p className="text-[#777777] text-sm sm:text-base md:text-lg  roboto-font leading-relaxed max-w-prose mx-auto sm:mx-0">
              {bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
