"use client";

import Button from "@/components/ui/Button";
import Link from "next/link";
import React from "react";
import { Trophy, Calendar, Award, TrendingUp, Flag, Users, Target, Star, Zap, ArrowRight } from "lucide-react";
import DynamicHeading from "@/components/Home/HeadingComponent";

const History = () => {
  const milestones = [
    {
      year: "1972",
      title: "Foundation Year",
      description:
        "Bangladesh Athletics Federation was established following the independence of Bangladesh, marking the beginning of organized athletics in the nation.",
      icon: Flag,
      color: "from-[#00704A] to-[#005239]",
    },
    {
      year: "1978",
      title: "International Recognition",
      description:
        "Bangladesh Athletics Federation gained full membership status with the International Association of Athletics Federations (IAAF), now World Athletics.",
      icon: Trophy,
      color: "from-[#C1272D] to-[#A01F25]",
    },
    {
      year: "1985",
      title: "First National Championship",
      description:
        "Organized the first comprehensive National Athletics Championship, setting standards for competition excellence across the country.",
      icon: Award,
      color: "from-[#D4AF37] to-[#B8941F]",
    },
    {
      year: "1993",
      title: "Regional Success",
      description:
        "Bangladesh athletes won multiple medals at the South Asian Games, marking our emergence as a competitive force in regional athletics.",
      icon: Star,
      color: "from-[#00704A] to-[#005239]",
    },
    {
      year: "2006",
      title: "Training Infrastructure",
      description:
        "Established state-of-the-art training facilities and coaching programs, bringing international standard preparation to our athletes.",
      icon: Target,
      color: "from-[#C1272D] to-[#A01F25]",
    },
    {
      year: "2015",
      title: "Youth Development Program",
      description:
        "Launched comprehensive grassroots programs reaching schools and communities nationwide, discovering and nurturing young talent.",
      icon: Users,
      color: "from-[#D4AF37] to-[#B8941F]",
    },
    {
      year: "2020",
      title: "Digital Transformation",
      description:
        "Modernized operations with digital athlete registration, online event management, and comprehensive performance tracking systems.",
      icon: TrendingUp,
      color: "from-[#00704A] to-[#005239]",
    },
    {
      year: "2024",
      title: "Record-Breaking Year",
      description:
        "Witnessed multiple national records broken across various disciplines, showcasing the continuous improvement in Bangladesh athletics.",
      icon: Trophy,
      color: "from-[#C1272D] to-[#A01F25]",
    },
  ];

  const statistics = [
    { label: "Years of Excellence", value: "50+", icon: Calendar, color: "from-[#00704A] to-[#005239]" },
    { label: "National Champions", value: "500+", icon: Trophy, color: "from-[#C1272D] to-[#A01F25]" },
    { label: "International Medals", value: "150+", icon: Award, color: "from-[#D4AF37] to-[#B8941F]" },
    { label: "Active Athletes", value: "5000+", icon: Users, color: "from-[#00704A] to-[#005239]" },
  ];

  return (
    <div className="bg-[#F2F0EF]">
      <div className="main_container">
        {" "}
        {/* Hero Section */}
        <div className="text-center mb-16 pt-48">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00704A]/10 to-[#C1272D]/10 rounded-full mb-6">
            <Calendar className="w-4 h-4 text-[#00704A]" />
            <span className="text-sm font-semibold text-[#00704A]">Since 1972</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-[#2D3436] mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-[#00704A] to-[#005239] bg-clip-text text-transparent">Legacy</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Five decades of dedication to athletics excellence, from humble beginnings to becoming a recognized force in
            South Asian athletics. Our journey reflects the spirit and determination of Bangladesh.
          </p>
        </div>
        {/* Statistics Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-20">
          {statistics.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 rounded-xl bg-[#FBFBFB]"
              >
                <div className="p-8 text-center">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-700 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Historical Journey Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            {/* <h2 className="text-3xl md:text-4xl font-bold text-[#2D3436] mb-4">
              Historical <span className="text-[#C1272D]">Milestones</span>
            </h2> */}
            <DynamicHeading title="Historical Milestones" />
            <div className="h-1 w-24 bg-gradient-to-r from-[#00704A] to-[#C1272D] mx-auto rounded-full" />
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00704A] via-[#C1272D] to-[#D4AF37] transform -translate-x-1/2" />

            <div className="space-y-12">
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={milestone.year}
                    className={`flex flex-col md:flex-row items-center gap-8  ${
                      isEven ? "md:flex-row" : "md:flex-row-reverse"
                    } `}
                  >
                    {/* Content Card */}
                    <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"} `}>
                      <div className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 rounded-xl bg-[#FBFBFB]">
                        <div className="p-8">
                          <div
                            className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${milestone.color} text-white border-none mb-4 text-sm font-semibold `}
                          >
                            {milestone.year}
                          </div>

                          <h3 className="text-2xl font-bold text-[#2D3436] mb-3">{milestone.title}</h3>
                          <p className="text-gray-600 leading-relaxed">{milestone.description}</p>
                        </div>
                      </div>
                    </div>

                    {/* Timeline Icon */}
                    <div className="relative z-10 flex-shrink-0">
                      <div
                        className={`w-20 h-20 rounded-full bg-gradient-to-br ${milestone.color} flex items-center justify-center shadow-2xl`}
                      >
                        <Icon className="w-10 h-10 text-white" />
                      </div>
                    </div>

                    {/* Spacer for even layout */}
                    <div className="flex-1 hidden md:block" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div>
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#00704A] to-[#005239] text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm mb-6">
                <TrendingUp className="w-10 h-10" />
              </div>

              <h2 className="text-3xl md:text-4xl font-bold">Looking Forward</h2>

              <p className="text-xl text-white/90 leading-relaxed">
                As we continue our journey, we remain committed to excellence, innovation, and the development of
                world-class athletes. Our history inspires us, but our future drives us forward. Together, we&apos;re
                building the next chapter of Bangladesh athletics.
              </p>

              <div className="flex flex-wrap justify-center gap-4 pt-6">
                <div className="bg-white/20 text-white border-none text-lg px-6 py-2 rounded-xl">Excellence</div>
                <div className="bg-white/20 text-white border-none text-lg px-6 py-2 rounded-xl">Innovation</div>
                <div className="bg-white/20 text-white border-none text-lg px-6 py-2 rounded-xl">Dedication</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default History;
