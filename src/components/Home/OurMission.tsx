"use client";

import React from "react";
import { LuTarget } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { LuAward } from "react-icons/lu";
import DynamicHeading from "./HeadingComponent";

const OurMission = () => {
  // Split the title into words
  const title = " Building Champions On and Off the Field";
  const words = title.trim().split(" ");
  const lastWord = words.pop(); // Remove the last word
  const rest = words.join(" "); // Join the rest

  return (
    <section className="py-20 bg-white">
      <div className="main_container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="text-[#00916e] font-semibold text-sm uppercase tracking-wider mb-2">Our Mission</div>
          {/* <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {rest}{" "}
            <span className="bg-gradient-to-r from-[#C1272D] to-[#A01F25] bg-clip-text text-transparent">
              {lastWord}
            </span>
          </h2> */}
          <DynamicHeading title="Building Champions On and Off the Field" />
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Our mission is to develop athletes with discipline, teamwork, and passion — fostering both physical
            excellence and strong character to achieve greatness in every arena.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="border-none rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-[#00704A]/5">
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#00704A] to-[#005239] flex items-center justify-center shadow-lg">
                <div className="w-8 h-8 text-white flex items-center justify-center">
                  <LuTarget className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#2D3436] mb-4">Excellence</h3>
              <p className="text-gray-600 leading-relaxed">
                Nurturing world-class athletes through systematic training and unwavering dedication to excellence.
              </p>
            </div>
          </div>

          <div className="border-none rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-[#C1272D]/5">
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#C1272D] to-[#A01F25] flex items-center justify-center shadow-lg">
                <div className="w-8 h-8 text-white flex items-center justify-center">
                  <LuUsers className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#2D3436] mb-4">Development</h3>
              <p className="text-gray-600 leading-relaxed">
                Comprehensive programs from grassroots to elite level, ensuring continuous athlete growth.
              </p>
            </div>
          </div>

          <div className="border-none rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white to-[#D4AF37]/5">
            <div className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center shadow-lg">
                <div className="w-8 h-8 text-white flex items-center justify-center">
                  <LuAward className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-[#2D3436] mb-4">Achievement</h3>
              <p className="text-gray-600 leading-relaxed">
                Building a legacy of national pride through international success and record-breaking performances.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurMission;
