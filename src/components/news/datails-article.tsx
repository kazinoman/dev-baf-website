"use client";
import React from "react";
import feed1 from "@/assets/images/news/feed1.jpg";
import profileImg from "@/assets/images/home/team/team15.png";
import Image from "next/image";
import { CalendarDays, Eye, MessagesSquare } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Championship Finals Set New Attendance Records",
    excerpt:
      "The journey, often, starts “simple” with localization. But then, quickly advances to contextual pricing, juggling complexity of large and frequently updated product catalog, managing continuously running multivariate tests and promotion campaigns, and serving customer-tailored dynamic recommendations. Eventually, you reach a realization that every page is similar to an open Tetris board where each “slot” can and should be dynamically tailored by dynamic visitor preferences, all powered by an ever-growing set of dynamic business rules.",
    category: "SPORTS",
    date: "24th March 2023",
    author: "Sarah Johnson",
    image: feed1,
  },
];

const DatailsArticle = () => {
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
            </div>

            <div className="space-y-3 mt-12">
              <h3 className=" text-2xl md:text-4xl font-bold leading-tight uppercase">
                {article.title}
              </h3>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed text-[#777777] text-sm sm:text-base md:text-lg  roboto-font mt-3 md:mt-10">
                {article.excerpt}
              </p>
            </div>

            <div
              className="
    border-t border-gray-200 
    pt-3 md:pt-6 
    mt-4 md:mt-8 
    flex flex-col md:flex-row 
    gap-3 md:gap-7 
    md:items-center 
    md:justify-between
  "
            >
              {/* Views */}
              <div className="flex gap-2 items-center">
                <Eye size={18} className="shrink-0" />
                <p className="text-[#777777] text-sm sm:text-base roboto-font">
                  100 Views
                </p>
              </div>

              {/* Comments */}
              <div className="flex gap-2 items-center">
                <MessagesSquare size={18} className="shrink-0" />
                <p className="text-[#777777] text-sm sm:text-base roboto-font">
                  30 Comments
                </p>
              </div>

              {/* Date */}
              <div className="flex gap-2 items-center">
                <CalendarDays size={18} className="shrink-0" />
                <p className="text-[#777777] text-sm sm:text-base roboto-font">
                  24th June 2023
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Article footer  */}
      <div className="space-y-3 mt-10 md:mt-28">
        {/* Heading */}
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight uppercase">
          SETTING THE MOOD WITH INCENSE
        </h3>

        {/* Content */}
        <div className="flex flex-col sm:flex-row sm:gap-6 lg:gap-7 mt-5 sm:mt-7">
          <Image
            src={feed1}
            width={200}
            height={500}
            alt="update-news"
            className="
        w-full 
        sm:w-48 md:w-56 lg:w-64 
        h-40 sm:h-44 md:h-44 
        object-cover 
        rounded-lg
        flex-shrink-0
      "
          />
          <p className="text-sm sm:text-base md:text-lg  text-[#777777] font-normal roboto-font leading-relaxed mt-4 sm:mt-0">
            From connecting back-office operations to front-of-the-house A/B
            testing and dynamic personalization for each customer, the shared
            foundation is fast server-side rendering powered by fast storefront
            data access. On top of this foundation, we add layers of caching,
            prerendering and edge delivery optimizations — not the other way
            around.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DatailsArticle;
