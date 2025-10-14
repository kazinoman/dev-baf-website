"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";

interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

const timelineData: TimelineItem[] = [
  {
    year: "1965",
    title: "Journey Was Started",
    description:
      "It is one of the most popular football club that offer training programs for the youth.",
  },
  {
    year: "1990",
    title: "UEFA Champion 1990",
    description:
      "It is one of the most popular football club that offer training programs for the youth.",
  },
  {
    year: "2016",
    title: "Clown Reward 2016",
    description:
      "It is one of the most popular football club that offer training programs for the youth.",
  },
  {
    year: "2022",
    title: "World Club Cup Champion",
    description:
      "It is one of the most popular football club that offer training programs for the youth.",
  },
];


export default function TeamHistoryTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    refs.current.forEach((el, idx) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(idx);
          }
        },
        {
          root: null,
          rootMargin: "-40% 0px -40% 0px", // triggers when near center
          threshold: 0,
        }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);




  return (
    <section className="relative mx-auto max-w-6xl px-4 py-8 md:py-16">

               <div
                className={`absolute left-1/2 top-6 z-20 sm:hidden h-12 w-12 bg-[#111111] -translate-x-1/2 rounded-full shadow transition-all duration-300 md:block lg:flex justify-center items-center text-[#fff] mt-10
                `}
              > 
               <FaPlus/>
              </div>

              <div
                className={`absolute left-1/2 bottom-0 z-20 sm:hidden h-12 w-12 bg-[#e41b23] -translate-x-1/2 rounded-full shadow transition-all duration-300 md:block lg:flex justify-center items-center text-[#fff] mt-10
                `}
              > 
               <FaPlus/>
              </div>



      {/* vertical line */}
      <div className="absolute left-1/2 top-0 hidden h-full w-1 -translate-x-1/2 bg-gray-100 md:block group" />

      <div className="flex flex-col space-y-8 md:space-y-16 mt-32">
        {timelineData.map((item, index) => {
          const isLeft = index % 2 === 0;
          const isActive = index === activeIndex;

          return (
            <div
              key={index}
              ref={(el) => {
                refs.current[index] = el;
              }}
              className="relative flex flex-col md:flex-row md:items-center justify-between group"
            >
              

               {/* dot */}
              <span
                className={`absolute left-1/2 top-6 z-20 hidden h-5 w-5 -translate-x-1/2 rounded-full border-4 shadow transition-all duration-300 md:block 
                ${
                  isActive
                    ? "bg-red-500 border-red-600 scale-125 duration-300"
                    : "bg-black border-white"
                }`}
              />

              {/* left side */}
              <div
                className={`md:w-5/12 ${
                  isLeft
                    ? `md:pr-12 md:text-right  ${isActive? 'border-r-2 border-[#e41b23] duration-300': ''}`
                    : `md:order-2 md:pl-12 text-start ${isActive? 'border-l-2 border-red-500':''}`
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="rounded-2xl bg-white md:py-6"
                >
                  <h3 className="text-2xl md:text-3xl font-semibold text-[#111] uppercase">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[#777777] text-base roboto-font ">{item.description}</p>
                </motion.div>
              </div>

              {/* year */}
              <div
                className={`mt-3 md:mt-6 flex  items-center ${
                  isLeft ? "justify-start md:pl-12" : "justify-end md:pr-12"
                } md:mt-0 md:w-5/12 w-full`}
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-6xl font-extrabold text-white [text-shadow:_2px_2px_0_#e41b23,_-2px_2px_0_#e41b23,_2px_-2px_0_#e41b23,_-2px_-2px_0_#e41b23]"
                >
                  {item.year}

                </motion.span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
