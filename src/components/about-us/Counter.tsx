"use client";
import React from "react";

const counterItems = [
  {
    countNumber: "69",
    name: "CLUB MEMBER",
  },
  {
    countNumber: "46",
    name: "TROPHIES",
  },
  {
    countNumber: "63",
    name: "COACHES",
  },
  {
    countNumber: "58",
    name: "CLASSES",
  },
];

const Counter = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4  max-w-7xl mx-auto mb-16 lg:mb-28 px-4 md:px-5">
      {counterItems.map((item, index) => (
        <div key={index} className="flex justify-center items-center">
          {/* div 1  */}
          <div className="relative w-full ">

            <div className="border border-gray-400 w-[100px] h-[100px] lg:w-[150px] lg:h-[150px] flex justify-center items-center rounded-full ">
              <span className="text-5xl lg:text-[80px] font-medium text-[#212529] ">
                {item.countNumber}
              </span>
            </div>

            <h3 className="absolute top-1/3 left-[85px] lg:left-[125px] text-xl lg:text-2xl font-medium lg:font-bold text-[#111111]">{item.name}</h3>
          </div>

        </div>
      ))}
    </div>
  );
};

export default Counter;
