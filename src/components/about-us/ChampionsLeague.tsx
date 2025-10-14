"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import videoImg from "@/assets/images/home/about/video1.png";
import backgroundPlayer from "@/assets/images/home/about/player2.png";
import Image, { StaticImageData } from "next/image";
import { FaPlay } from "react-icons/fa";

interface SeasonData {
  year: string;
  champion: string;
  runnerUp: string;
  topScorer: string;
  highlight: string;
  videoImg: string | StaticImageData;
  mainDescription: string;
  shortDescription: string;
}

// Example data
const YEARS: SeasonData[] = [
  {
    year: "2020",
    champion: "THE CHAMPIONS LEAGUE TROPHY SINCE 2010",
    runnerUp: "Manchester City",
    topScorer: "Erling Haaland (10)",
    highlight:
      "Chelsea won 1-0 in the final. Tactical defensive masterclass and Kai Havertz's winning goal.",
    videoImg: videoImg,
    mainDescription:
      "It is one of the most popular football clubs that offer training programs for the youth, as well as summer camps. Play the fastest NFT based fantasy football manager earn coins, collect & trade officially.",
    shortDescription:
      "Welcome to the official Chelsea FC website. Get all the latest news, videos & ticket information as well as player profiles.",
  },
  {
    year: "2021",
    champion: "THE CHAMPIONS LEAGUE TROPHY SINCE 2010",
    runnerUp: "Liverpool",
    topScorer: "Karim Benzema (15)",
    highlight:
      "Real Madrid lifted the trophy thanks to Benzema form and a dramatic semi-final vs Manchester City.",
    videoImg: videoImg,
    mainDescription:
      "It is one of the most popular football clubs that offer training programs for the youth, as well as summer camps. Play the fastest NFT based fantasy football manager earn coins, collect & trade officially.",
    shortDescription:
      "Welcome to the official Chelsea FC website. Get all the latest news, videos & ticket information as well as player profiles.",
  },
  {
    year: "2022",
    champion: "THE CHAMPIONS LEAGUE TROPHY SINCE 2010",
    runnerUp: "Inter Milan",
    topScorer: "Erling Haaland (12)",
    highlight:
      "Man City completed the continental treble — dominant throughout the knockout stages.",
    videoImg: videoImg,
    mainDescription:
      "It is one of the most popular football clubs that offer training programs for the youth, as well as summer camps. Play the fastest NFT based fantasy football manager earn coins, collect & trade officially.",
    shortDescription:
      "Welcome to the official Chelsea FC website. Get all the latest news, videos & ticket information as well as player profiles.",
  },
  {
    year: "2023",
    champion: "THE CHAMPIONS LEAGUE TROPHY SINCE 2010",
    runnerUp: "Bayern Munich",
    topScorer: "Kylian Mbappé (11)",
    highlight:
      "Another classic from Real Madrid; experienced core delivered again on big nights.",
    videoImg: videoImg,
    mainDescription:
      "It is one of the most popular football clubs that offer training programs for the youth, as well as summer camps. Play the fastest NFT based fantasy football manager earn coins, collect & trade officially.",
    shortDescription:
      "Welcome to the official Chelsea FC website. Get all the latest news, videos & ticket information as well as player profiles.",
  },
  {
    year: "2024",
    champion: "THE CHAMPIONS LEAGUE TROPHY SINCE 2010",
    runnerUp: "Barcelona",
    topScorer: "Rafael Leão (10)",
    highlight:
      "PSG finally broke through with a spectacular attacking performance in the final.",
    videoImg: videoImg,
    mainDescription:
      "It is one of the most popular football clubs that offer training programs for the youth, as well as summer camps. Play the fastest NFT based fantasy football manager earn coins, collect & trade officially.",
    shortDescription:
      "Welcome to the official Chelsea FC website. Get all the latest news, videos & ticket information as well as player profiles.",
  },
];

type Props = {
  data?: SeasonData[];
};

export default function ChampionsLeague5YearButtons({ data = YEARS }: Props) {
  const [active, setActive] = useState<number>(0);

  return (
    <section className="max-w-7xl mx-auto p-1 relative px-4 sm:px-5 lg:mt-56">
      {/* background image animate  */}
      <Image
        src={backgroundPlayer}
        alt="Soccer players in action"
        className="object-container pointer-events-none z-0  h-[400px] md:h-[500px] lg:h-[850px] absolute bottom-16 md:bottom-0 right-24 top-40 md:top-20 lg:top-[-110px] lg:right-10 shape-move-right"
      />

      {/* Year buttons */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-3 lg:w-[640px] overflow-x-auto py-5 mb-6 px-2 relative z-50">
        {data.map((d, i) => (
          <button
            key={d.year}
            onClick={() => setActive(i)}
            aria-pressed={active === i}
            className={`flex-shrink-0 cursor-pointer px-7 py-4 bg-[#FFFFFF] text-base shadow-6xl shadow-[0_4px_95px_rgba(111,66,193,0.5)] font-medium transition-all duration-300 
              ${active === i ? "text-white bg-red-600" : ""}`}
          >
            {d.year}
          </button>
        ))}
      </div>

      {/* Content cards with Framer Motion */}
      <div className="relative ">
        <AnimatePresence mode="wait">
          <motion.div
            key={data[active].year}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className=""
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">
              <div className="">
                <h3 className="text-xl sm:text-4xl font-bold">
                  {data[active].champion}
                </h3>
                <p className="mt-8 text-sm sm:text-base text-[#212529] roboto-font">
                  {data[active].mainDescription}
                </p>
                <p className="mt-5 text-sm sm:text-base text-[#212529] roboto-font">
                  {data[active].shortDescription}
                </p>
              </div>

              <aside className="lg:pl-10 relative lg:top-[-120px] ">
                <Image
                  src={data[active].videoImg}
                  width={500}
                  height={500}
                  alt="video-img"
                  className="object-contain w-full"
                />
                <div className="w-18 h-18 bg-white rounded-full absolute top-2/5 left-1/2 flex justify-center items-center hover:bg-[#e41b23] hover:text-white cursor-pointer ">
                  <FaPlay />
                </div>
              </aside>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
