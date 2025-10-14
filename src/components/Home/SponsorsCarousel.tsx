"use client"; // needed for Next.js 13+ app directory

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image, { StaticImageData } from "next/image";

type TSponsors = {
  name: string;
  logo: StaticImageData | string;
  url: string;
};

type BrandLogoProps = {
  sponsors: TSponsors[];
  page: string
};




export default function AutoSponsorsCarousel({ sponsors, page='home' }: BrandLogoProps) {


  return page === 'home' ? (
    <div className="w-full max-w-7xl mx-auto mt-10">
      <Swiper
        slidesPerView={6}
        spaceBetween={20}
        loop={true}
        speed={3000}
        autoplay={{
          delay: 1,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        freeMode={true}
      >
        {sponsors?.map((sponsor: TSponsors, index: number) => (
          <SwiperSlide key={index}>
            <div
              key={`${sponsor.name}-2`}
              className="group relative opacity-50 hover:opacity-100 cursor-pointer overflow-hidden border-border hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5"
            > 
                <Image
                  src={sponsor.logo || "/placeholder.svg"}
                  alt={`${sponsor.name} logo`}
                  className="max-w-full max-h-12 md:max-h-16 w-auto h-auto object-contain filter  group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
                />             
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  ):  <div className="w-full max-w-7xl mx-auto mt-10">
      <Swiper
        slidesPerView={6}
        spaceBetween={20}
        loop={true}
        speed={3000}
        autoplay={{
          delay: 1,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        freeMode={true}
      >
        {sponsors?.map((sponsor: TSponsors, index: number) => (
          <SwiperSlide key={index}>
            <div
              key={`${sponsor.name}-2`}
              className="group relative opacity-50 hover:opacity-100 cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-lg "
            > 
                <Image
                  src={sponsor.logo || "/placeholder.svg"}
                  alt={`${sponsor.name} logo`}
                  className="h-[150px] object-contain filter group-hover:grayscale-0 transition-all duration-300 group-hover:scale-105"
                />             
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
}
