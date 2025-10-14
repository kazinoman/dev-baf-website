import React from "react";
import awards1 from "@/assets/images/history/awards/award1.png";
import awards2 from "@/assets/images/history/awards/award2.png";
import awards3 from "@/assets/images/history/awards/award3.png";
import awards4 from "@/assets/images/history/awards/award4.png";
import Image from "next/image";

const awardsItems = [
  {
    image: awards1,
    name: "SEASON 2015",
    title: "FINAL TOUR",
  },
  {
    image: awards2,
    name: "SEASON 2015",
    title: "FINAL TOUR",
  },
  {
    image: awards3,
    name: "SEASON 2015",
    title: "FINAL TOUR",
  },
  {
    image: awards4,
    name: "SEASON 2015",
    title: "FINAL TOUR",
  },
];

const OurAwards = () => {
  return (
    <div className="mb-10 md:mb-24">
      {/* Header this section  */}
      <div className="mb-16">
        <h2 className=" text-4xl md:text-5xl font-bold text-[#111111] text-center uppercase">
          OUR AWARDS
        </h2>
        <p className="text-lg text-center text-[#999999] roboto-font mt-4 w-full md:w-1/2 mx-auto">
          It is one of the most popular football clubs that offer training
          programs for the youth, as well as summer camps{" "}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {awardsItems?.map((award, awardIndex) => (
          <div
            key={awardIndex}
            className="border border-gray-100 overflow-hidden py-5 md:py-10 group"
          >
            {/* image  */}
            <div>
              <Image
                src={award.image}
                width={500}
                height={500}
                alt="awards-image"
                className="object-contain h-[250px] group-hover:scale-110 duration-500 cursor-pointer"
              />
            </div>

            {/* content  */}
            <div className="mt-7">
              <h2 className="text-center text-2xl text-[#111111] font-semibold uppercase">
                {award.name}
              </h2>
              <h2 className="text-[#777777] text-lg roboto-font uppercase mt-1 text-center">
                {award.title}
              </h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurAwards;
