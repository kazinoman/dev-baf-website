"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import upCommingMatchBg from "@/assets/images/home/upcoming-match/upcomingMatchbg.png";
import club1 from "@/assets/images/home/upcoming-match/club-1.svg";
import club2 from "@/assets/images/home/upcoming-match/club-2.svg";
import Image from "next/image";

const items = [
  {
    date: "17 Apr - 30 Apr 2025",
    address: "Mirpur Stadium",
    title: "48th National Athletics Championship - 2025",
    rightSideIcon: club1,
    leftSideIcon: club2,
  },
  {
    date: "17 Apr - 30 Apr 2025",
    address: "Mirpur Stadium",
    title: "48th National Athletics Championship - 2025",
    rightSideIcon: club1,
    leftSideIcon: club2,
  },
  {
    date: "17 Apr - 30 Apr 2025",
    address: "Mirpur Stadium",
    title: "48th National Athletics Championship - 2025",
    rightSideIcon: club1,
    leftSideIcon: club2,
  },
  {
    date: "17 Apr - 30 Apr 2025",
    address: "Mirpur Stadium",
    title: "48th National Athletics Championship - 2025",
    rightSideIcon: club1,
    leftSideIcon: club2,
  },
  {
    date: "17 Apr - 30 Apr 2025",
    address: "Mirpur Stadium",
    title: "48th National Athletics Championship - 2025",
    rightSideIcon: club1,
    leftSideIcon: club2,
  },
  {
    date: "17 Apr - 30 Apr 2025",
    address: "Mirpur Stadium",
    title: "48th National Athletics Championship - 2025",
    rightSideIcon: club1,
    leftSideIcon: club2,
  },
  {
    date: "17 Apr - 30 Apr 2025",
    address: "Mirpur Stadium",
    title: "48th National Athletics Championship - 2025",
    rightSideIcon: club1,
    leftSideIcon: club2,
  },
];


export default function UpcomingMatchCarousel() {
 

  return (
    <div className="w-full max-w-7xl mx-auto pt-3 ">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={3}
        centeredSlides={true}
        loop={true}
        speed={5000}
        autoplay={{
          delay: 1, // 2 seconds
          disableOnInteraction: false,
        }}
        freeMode={true}
        className="mySwiper"
        // For responsive
        breakpoints={{
          0: {
            slidesPerView: 1, // mobile
          },
          640: {
            slidesPerView: 2, // sm
          },
          768: {
            slidesPerView: 3, // md
          },
          1024: {
            slidesPerView: 3, // lg
          },
          1280: {
            slidesPerView: 3, // xl
          },
        }}
      >
        {items?.map((item, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <div
                className={`transition-transform duration-500 flex h-48 w-full mx-auto  relative
                 `}
                style={{
                  transform: isActive ? "scale(1.0)" : "scale(0.9)",
                  backgroundColor: isActive ? "transparent" : "white", // reset properly
                  backgroundImage: isActive
                    ? `url(${upCommingMatchBg.src})`
                    : "none",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  color: isActive ? "#FFFFFF" : "#111",
                }}
              >
                {/* overlay */}
                {isActive && (
                  <div className="absolute inset-0 bg-black/60 z-0"></div>
                )}

                 

                 <div className="z-10 flex flex-col justify-center items-center px-8 w-full"> 

                  <p className={`${isActive? 'text-base font-bold text-center roboto-font' : 'font-normal'}`}>
                      {item.date}
                    </p>

                <div className="z-10 flex justify-between items-center w-full">
                
                  <div>
                    <Image src={club1} width={60} height={100} alt="bg" />
                  </div>

               
                  <div className="px-2">

                    {/* <p className="text-base font-bold text-center roboto-font">
                      {item.date}
                    </p> */}

                    <p className="text-base font-bold text-center tracking-wide">
                      {item.address}
                    </p>

                    {/* <p
                      className={`${
                        isActive
                          ? "text-base font-bold text-center mt-3 uppercase"
                          : "text-base font-bold text-center mt-3 uppercase text-[#E41B23]"
                      }`}
                    >
                      {item.title}
                    </p> */}
                  </div>

                  <div>
                    <Image src={club2} width={60} height={100} alt="bg" />
                  </div>
                </div>

                   <p
                      className={`${
                        isActive
                          ? "text-base font-bold text-center mt-1 uppercase lg:px-16"
                          : "text-base font-bold text-center mt-1 uppercase text-[#E41B23] lg:px-16"
                      }`}
                    >
                      {item.title}
                    </p> 

                </div>




              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
