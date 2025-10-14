"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image, { StaticImageData } from "next/image";

// image imports
import img1 from "@/assets/images/gallery/1.png";
import img2 from "@/assets/images/gallery/2.png";
import img3 from "@/assets/images/gallery/3.png";
import img4 from "@/assets/images/gallery/4.png";
import img5 from "@/assets/images/gallery/5.png";
import img6 from "@/assets/images/gallery/6.png";
import { BiPlus } from "react-icons/bi";

interface SeasonData {
  id: number;
  images: (StaticImageData | string)[];
  label: string;
}

// Each season now has 6 images
const YEARS: SeasonData[] = [
  { id: 1, images: [img1, img2, img3, img4, img5, img6], label: "fifa 2023" },
  { id: 2, images: [img2, img3, img4, img5, img6, img1], label: "ueea cup" },
  { id: 3, images: [img3, img4, img5, img6, img1, img2], label: "warm up" },
  { id: 4, images: [img4, img5, img6, img1, img2, img3], label: "national" },
  { id: 5, images: [img5, img6, img1, img2, img3, img4], label: "Season" },
];

type Props = {
  data?: SeasonData[];
};

export default function ChampionsLeagueGallery({ data = YEARS }: Props) {
  const [activeSeason, setActiveSeason] = useState<number>(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null); // null = closed

  const images = data[activeSeason].images;

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const showNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % images.length);
  };

  const showPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
  };

  return (
    <section className="max-w-7xl mx-auto p-4 bg-white lg:mb-28">
      {/* Season buttons */}
      <div className="flex gap-2 overflow-x-auto py-5 mb-6 px-2 mt-10 lg:mt-24">
        {data.map((d, i) => (
          <button
            key={d.id}
            onClick={() => setActiveSeason(i)}
            aria-pressed={activeSeason === i}
            className={`cursor-pointer flex-shrink-0 px-4 rounded-full font-medium transition-all duration-300 focus:outline-none focus:text-red-600 focus:underline text-[#111] text-lg uppercase ${
              activeSeason === i ? "" : ""
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Grid of images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <motion.div
            key={index}
            className=""
            onClick={() => openLightbox(index)}
            // whileHover={{ scale: 1.05 }}
          >
            <div className="relative group overflow-hidden cursor-pointer rounded-lg">
              <Image
                src={img}
                width={500}
                height={500}
                alt="gallery-image-1"
                className="group-hover:scale-110 duration-500 ease-in"
              />
              <div className="absolute inset-0 group-hover:bg-red-800/85 mix-blend-multiply z-10 duration-500"></div>

              {/* invisible group-hover:visible  */}
              {/* Middle circle  */}
              <div className="invisible group-hover:visible absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full w-[0%] h-[0%] transition-all duration-500 ease-out group-hover:w-[15%] group-hover:h-[15%] flex justify-center items-center"
                >
                  <BiPlus className="text-[#111]" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 duration-1000 ease-in"
          >
            {/* Previous Button */}
            <button
              onClick={showPrev}
              className="absolute left-5 text-white text-3xl font-bold p-2 bg-black/50 rounded-full hover:bg-black/70 cursor-pointer"
            >
              ◀
            </button>

            {/* Image */}
            <Image
              src={images[lightboxIndex]}
              width={800}
              height={800}
              alt={`season-${activeSeason}-img-${lightboxIndex}`}
              className=" max-h-[90vh] object-contain duration-1000 ease-in"
            />

            {/* Next Button */}
            <button
              onClick={showNext}
              className="absolute right-5 text-white text-3xl font-bold p-2 bg-black/50 rounded-full hover:bg-black/70 cursor-pointer"
            >
              ▶
            </button>

            {/* Close Lightbox */}
            <button
              onClick={closeLightbox}
              className="absolute top-5 right-5 text-white text-3xl font-bold p-2 bg-black/50 rounded-full hover:bg-black/70 cursor-pointer"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
