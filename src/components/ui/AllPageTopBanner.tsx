import React from "react";
import athletesBanner from "@/assets/images/bannar/bannerbg-inner.jpg";

type TBannerProps = {
  pageName: string;
  pageTtile: string;
};

const AllPageTopBannar = ({ pageName, pageTtile }: TBannerProps) => {
  return (
    <div
      className="relative h-[250px] lg:h-[450px] w-full bg-center bg-cover"
      style={{ backgroundImage: `url(${athletesBanner.src})` }}
    >
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div> */}
      <div className="absolute inset-0 bg-zinc-900/20 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center top-14">
        <div className="w-full  main_container px-4 text-white mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-4 tracking-widest">
            <h4 className="text-white uppercase">Home</h4>
            <h4>|</h4>
            <h4 className="uppercase">{pageName}</h4>
          </div>

          <h1 className=" text-3xl md:text-4xl lg:text-7xl font-bold uppercase">{pageTtile}</h1>
        </div>
      </div>
    </div>
  );
};

export default AllPageTopBannar;
