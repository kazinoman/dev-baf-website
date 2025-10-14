// app/components/UpcomingMatch.tsx
"use client";
import Image from "next/image";
import baseballCourt2 from "@/assets/images/home/upcoming-match/baseball-court2.jpg";
import baseballLogo1 from "@/assets/images/home/upcoming-match/baseball1.png";
import baseballLogo2 from "@/assets/images/home/upcoming-match/baseball2.png";
import Text from "../ui/Text";
import Button from "../ui/Button";

export default function UpcomingMatch() {
  return (
    <section
      className={`relative py-24 bg-cover bg-center h-64 w-full object-center`}
      style={{
        backgroundImage: `url(${baseballCourt2.src})`,
        height: "100%",
        backgroundPosition: "center center",
        backgroundSize: "auto 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Section Title */}
      <div className="text-center md:mb-8">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white">
          UPCOMING BIG MATCH
        </h1>
      </div>

      {/* Match Info */}
      <div className="flex flex-col md:flex-row items-center justify-between relative z-10 max-w-5xl mx-auto mt-18 md:mt-20 ">
        {/* Left Club */}
        <div className="flex items-center mb-6 md:mb-0 md:mr-12 ">
          <div className="max-w-[200px]">
            <Image
              src={baseballLogo1}
              alt="Dragons"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
        </div>

        {/* Center Content */}
        <div className="text-center mt-12 mx-8">
          {/* <Text size="xl" weight="bold" className="uppercase" > August 26, 2023 5:45 PM</Text> */}
          <h1 className="text-white font-bold uppercase text-2xl">
            August 26, 2023 5:45 PM
          </h1>

          <div className="flex gap-3.5 md:gap-6.5 my-7 items-center">
            <Text size="4xl" weight="bold" className="uppercase">
              Dragons
            </Text>
            <Text size="xl" weight="bold" className="uppercase">
              {" "}
              VS
            </Text>
            <Text size="4xl" weight="bold" className="uppercase">
              {" "}
              Bulls
            </Text>
          </div>

          <div className="mt-10 mb-16">
            <Button type="submit" variant="orange" className="cursor-pointer">
              get ticket
            </Button>
          </div>
        </div>

        {/* Right Club */}
        <div className="flex items-center">
          <div className="max-w-[200px]">
            <Image
              src={baseballLogo2}
              alt="Bulls"
              width={200}
              height={200}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* Countdown */}
      <div className="mt-18 md:mt-14 md:ml-10  flex justify-center items-center ">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <div className="flex flex-col justify-center items-center gap-3 py-5 px-2  w-[140px] h-[140px]  border-[1px] border-[#f6f6f633] rounded-sm">
            <Text size="5xl" color="white" weight="extrabold">
              -608
            </Text>
            <p className="text-sm uppercase font-semibold text-white">DAYS</p>
          </div>

          <div className="flex flex-col justify-center items-center gap-4 py-5 px-3  w-[140px] h-[140px]  border-[1px] border-[#f6f6f633] rounded-sm">
            <Text size="5xl" color="white" weight="extrabold">
              0-28
            </Text>
            <p className="text-sm uppercase font-semibold text-white">Hours</p>
          </div>

          <div className="flex flex-col justify-center items-center gap-4 py-5 px-3  w-[140px] h-[140px] border-[1px] border-[#f6f6f633] rounded-sm">
            <Text size="5xl" color="white" weight="extrabold">
              0-40
            </Text>
            <p className="text-sm uppercase font-semibold text-white">Mitins</p>
          </div>

          <div className="flex flex-col justify-center items-center gap-4 py-5 px-3 w-[140px] h-[140px]  border-[1px] border-[#f6f6f633] rounded-sm">
            <Text size="5xl" color="white" weight="extrabold">
              0-09
            </Text>
            <p className="text-sm uppercase font-semibold text-white">
              Secound
            </p>
          </div>
        </div>
      </div>

      {/* Background "LIVE" Watermark */}
      <span className="absolute inset-0 flex justify-center items-center text-gray-200 font-bold text-[12rem] md:text-[18rem] -z-10 select-none opacity-40">
        LIVE
      </span>
    </section>
  );
}
