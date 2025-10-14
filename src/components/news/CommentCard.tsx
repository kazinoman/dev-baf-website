"use client"
import { Reply } from "lucide-react"
import Avatar from "../ui/Avatar"
import { AvatarImage } from "../ui/AvatarImage"
import { AvatarFallback } from "../ui/AvatarFallBack"
import { StaticImageData } from "next/image"
import { FaCalendarAlt } from "react-icons/fa"
import { IoArrowUndo } from "react-icons/io5"


interface CommentCardProps {
  author: {
    name: string
    avatar: string | StaticImageData
    initials: string
  }
  date: string
  content: string
  onReply?: () => void
}


export function CommentCard({ author, date, content, onReply }: CommentCardProps) {


  return (
    <div className="w-full transition-shadow duration-200 mt-8 md:mt-12">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Avatar Section */}
          <div className="flex-shrink-0 flex justify-center">
            <Avatar variant="circle" className="h-18 w-18 sm:h-18 sm:w-18 md:w-20 md:h-20 lg:w-24 lg:h-24">
              <AvatarImage
                url={author.avatar || "/placeholder.svg"}
                alt={`${author.name}'s avatar`}
                className="object-cover"
              />
              <AvatarFallback className="bg-muted font-medium">{author.initials}</AvatarFallback>
            </Avatar>
          </div>

          {/* Content Section */}
          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
              <div className="flex flex-col gap-1 md:gap-2 items-center ">
                <h3 className="font-semibold uppercase text-base md:text-lg lg:text-xl leading-tight text-[#000000]">{author.name}</h3>
                
                <time className="text-sm md:text-base flex items-center gap-1 text-[#666666] roboto-font" dateTime={date}>
                  <span className="hidden sm:inline"> <FaCalendarAlt className="text-red-600"/> </span>
                  {date}
                </time>
              </div>

              {/* Reply Button */}
              {onReply && (
                <button
                  onClick={onReply}
                  className="hover:text-[#fff] hover:bg-[#E41B23] text-sm md:text-base font-medium transition-colors duration-200 flex items-center justify-center gap-1 px-5 py-2 cursor-pointer roboto-font"
                  aria-label={`Reply to ${author.name}'s comment`}
                >
                  <IoArrowUndo size={18} />
                  Reply
                </button>
              )}
            </div>

            {/* Comment Content */}
            <div className="prose prose-sm max-w-none mt-4">
              <p className="text-[#999999] roboto-font leading-relaxed text-sm sm:text-base md:text-lg text-pretty text-center sm:text-start">{content}</p>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}
