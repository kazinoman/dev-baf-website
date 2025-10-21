"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import Image from "next/image";


import bg1 from "@/assets/images/home/banner/banner-bg3.jpg";
import bg2 from "@/assets/images/home/banner/banner-bg1.jpg";
import img from "@/assets/images/home/banner/banner1.jpg";
import img2 from "@/assets/images/home/banner/banner2.jpg";
import shape from "@/assets/images/home/banner/shape1.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import Button from "../ui/Button";

const heroSlides = [
  {
    id: 1,
    image: img,
    backgroundImage: bg1,
    title: "Track & Field Excellence",
    subtitle: "National Champions",
    description: "Join our elite training program and compete at the highest level of athletics.",
    badge: "2025 Season",
  },
  {
    id: 2,
    image: img2,
    backgroundImage: bg2,
    title: "Building Future Champions",
    subtitle: "Youth Development Program",
    description: "Comprehensive training and mentorship for the next generation of athletes.",
    badge: "Registration Open",
  },
];

const actionButtons = [
  { id: 1, label: "Explore Events", link: "/events" },
  { id: 2, label: "RESULT AND RECORDS", link: "/register" },
  { id: 3, label: "JOIN ATHLETICS", link: "/athletes" },
  { id: 4, label: "COACHING", link: "/news" },
];

export default function AIHeroSlider() {
  const handleButtonClick = (link: string) => {
    console.log("Navigate to:", link);
    // Add your navigation logic here
  };

  return (
    <section className="">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop
        speed={1000}
        onSlideChange={(swiper) => {
          const activeSlide = swiper.slides[swiper.activeIndex];
          const animatedEls = activeSlide.querySelectorAll("[data-animate]");

          animatedEls.forEach((el, i) => {
            el.classList.remove("fade-up", "fade-left", "fade-right");
            void (el as HTMLElement).offsetWidth;
            el.classList.add(el.getAttribute("data-animate")!);
            (el as HTMLElement).style.animationDelay = `${i * 0.3}s`;
          });
        }}
      >
        {heroSlides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative  h-[700px]">
              {/* Background Image */}
              <Image
                src={slide.image}
                alt="Background"
                fill
                priority
                className="absolute inset-0 object-cover w-full h-auto"
              />

              {/* Greenish Gradient Overlay from new component */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-700/32 via-gray-900/28 to-black/15" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/42 via-emerald-800/28 to-emerald-500/10" />

              {/* Geometric Pattern Overlay */}
              {/* <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23ffffff fillOpacity=0.1%3E%3Cpath d=M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
              </div> */}

              <div className="relative main_container z-10 h-full px-6 xl:px-6 2xl:px-0">
                <Image src={shape} alt="shape" className="object-contain opacity-30 absolute -top-30" />

                <div className="grid gap-10 md:grid-cols-2 h-full">
                  <div className="content-center">
                    {/* Badge */}
                    <div className="fade-up animation-delay-200">
                      <div className="bg-emerald-600 inline text-xs sm:text-sm px-3 py-1 tracking-widest text-white uppercase font-semibold">
                        {slide.badge}
                      </div>
                    </div>

                    {/* Subtitle */}
                    <div className="fade-up animation-delay-300 mt-3">
                      <p className="text-white/90 text-xs sm:text-sm font-medium uppercase tracking-wide">
                        {slide.subtitle}
                      </p>
                    </div>

                    {/* Main Title */}
                    <div className="fade-up animation-delay-400 mt-3">
                      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-wider font-bold text-white leading-snug">
                        <span className="text-balance">{slide.title}</span>
                      </h1>
                    </div>

                    {/* Description */}
                    <div className="fade-up animation-delay-500 mt-3">
                      <p className="text-white/80 text-xs sm:text-sm md:text-base max-w-md">{slide.description}</p>
                    </div>

                    {/* Slide Number */}
                    <div className="fade-up animation-delay-600 mt-6">
                      <div className="flex items-center gap-4">
                        {/* Learn More Button */}
                        <button className="text-white hover:text-emerald-300 transition-colors flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase">
                          Learn More
                          <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Buttons Overlay - Right-aligned within 1500px container (Desktop only) */}
      <div
        className="absolute top-[calc(50vh-50px)] 
    -translate-y-1/2 left-1/2 -translate-x-1/2  hidden lg:flex z-20 w-full px-6"
      >
        <div className="max-w-[1500px] w-full mx-auto flex justify-end">
          <div className="relative">
            {/* Gradient Background for Buttons */}
            <div className="absolute inset-0  backdrop-blur-sm rounded-2xl"></div>

            {/* Buttons Container */}
            <div className="relative space-y-4 px-8 py-12">
              {actionButtons.map((button, index) => (
                <div key={button.id} className="fade-up" style={{ animationDelay: `${(index + 3) * 0.15}s` }}>
                  <button
                    onClick={() => handleButtonClick(button.link)}
                    className="w-full rounded-lg min-w-[280px] px-8 py-4 text-base font-semibold uppercase tracking-wider transition-all duration-300 transform hover:scale-105 hover:shadow-2xl bg-white/20 hover:bg-white/30 text-white border-2 border-white/40 hover:border-white backdrop-blur-md"
                  >
                    {button.label}
                  </button>
                </div>
              ))}

              {/* Additional Info */}
              <div className="text-white text-center mt-8 pt-6 border-t border-white/30">
                <p className="text-sm opacity-60">Join Bangladesh Athletics</p>
                <p className="text-xs opacity-60 mt-1">Building Champions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Buttons - Below Slider */}
      <div className="lg:hidden px-6 -mt-40 relative z-20">
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-lg p-6 shadow-xl">
          <div className="space-y-3">
            {actionButtons.map((button) => (
              <button
                key={button.id}
                onClick={() => handleButtonClick(button.link)}
                className="w-full px-6 py-3 text-base font-semibold uppercase tracking-wider transition-all duration-300 transform hover:scale-105 bg-white/20 hover:bg-white/30 text-white border-2 border-white/40 hover:border-white backdrop-blur-md"
              >
                {button.label}
              </button>
            ))}
          </div>

          {/* Mobile Additional Info */}
          <div className="text-white text-center mt-6 pt-6 border-t border-white/30">
            <p className="text-sm opacity-90">Join Bangladesh Athletics Foundation</p>
            <p className="text-xs opacity-75 mt-1">Building Champions, Inspiring Excellence</p>
          </div>
        </div>
      </div>
    </section>
  );
}
