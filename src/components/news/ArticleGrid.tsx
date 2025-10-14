"use client";
import feed1 from "@/assets/images/news/feed1.jpg";
import feed2 from "@/assets/images/news/feed1.jpg";
import feed3 from "@/assets/images/news/feed1.jpg";
import Image from "next/image";
import profileImg from "@/assets/images/home/team/team15.png";
import { CalendarDays, Eye, MessagesSquare } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Championship Finals Set New Attendance Records",
    excerpt:
      "Novia's spaciously two bedroom apartments are perfect for families and even business partners. Look out into the Manhattan skyline from the open fully equipped kitchen.",
    category: "SPORTS",
    date: "24th March 2023",
    author: "Sarah Johnson",
    image: feed1,
  },
  {
    id: 2,
    title: "New Training Facility Opens Next Month",
    excerpt:
      "Novia's spaciously two bedroom apartments are perfect for families and even business partners. Look out into the Manhattan skyline from the open fully equipped kitchen.",
    category: "NEWS",
    date: "23rd March 2023",
    author: "Mike Chen",
    image: feed2,
  },
  {
    id: 3,
    title: "Youth Development Program Expands",
    excerpt:
      "Novia's spaciously two bedroom apartments are perfect for families and even business partners. Look out into the Manhattan skyline from the open fully equipped kitchen.",
    category: "DEVELOPMENT",
    date: "22nd March 2023",
    author: "Emma Wilson",
    image: feed3,
  },
  {
    id: 4,
    title: "Season Statistics and Player Rankings",
    excerpt:
      "Novia's spaciously two bedroom apartments are perfect for families and even business partners. Look out into the Manhattan skyline from the open fully equipped kitchen.",
    category: "ANALYSIS",
    date: "21st March 2023",
    author: "David Rodriguez",
    image: feed2,
  },
];

export function ArticleGrid() {
  return (
    <div className="space-y-8 lg:mr-12">
      <div className="grid grid-cols-1 gap-6">
        {articles.map((article) => (
          <div key={article.id} className="group cursor-pointer  ">
            <div className="relative">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={article.image.src || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full h-full object-cover "
                />
              </div>

              <div className="text-2xl z-10 absolute md:left-14 bottom-[-18px] bg-[#e41b23]">
                <p className="text-sm uppercase font-bold text-[#fff] py-2 px-4">
                  BUSINESS, DESIGN
                </p>
              </div>

              <div className="text-2xl z-10 absolute  md:right-14 bottom-[-18px] bg-[#fff] flex gap-1.5 items-center pt-2 pl-2 pr-8 rounded-sm">
                <Image
                  src={profileImg}
                  alt=""
                  className="w-[50px] h-[40px] rounded-sm"
                />
                <p className="text-base uppercase font-bold text-black">
                  BY HETMAYAR
                </p>
              </div>
            </div>

            <div className="space-y-3 mt-9">
              <h3 className=" text-2xl md:text-4xl font-bold leading-tight uppercase">
                {article.title}
              </h3>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed text-[#777777] text-sm sm:text-base md:text-lg lg:text-xl roboto-font mt-3 md:mt-6">
                {article.excerpt}
              </p>
            </div>


            {/* icons below  */}
            <div className="border-t pt-3 md:pt-6 mt-4 md:mt-8 border-gray-200 flex flex-col md:flex-row md:mb-10 gap-3 md:gap-7 ">
              <div className="flex gap-2 items-center">
                <Eye size={18} />
                <p className="text-[#777777] text-sm sm:text-base md:text-lg lg:text-xl roboto-font">100 Views</p>
              </div>
              <div className="flex gap-2 items-center">
                <MessagesSquare size={18} />
                <p className="text-[#777777] text-sm sm:text-base md:text-lg lg:text-xl roboto-font">
                  30 Comments
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <CalendarDays size={18} />
                <p className="text-[#777777] text-sm sm:text-base md:text-lg lg:text-xl roboto-font">
                  24th June 2023
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
