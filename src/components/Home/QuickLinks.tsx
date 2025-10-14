"use client";

import React from "react";
import { FaFileAlt, FaCalendarAlt, FaUsers, FaTrophy, FaGraduationCap, FaPhotoVideo } from "react-icons/fa";
import DynamicHeading from "./HeadingComponent";
import { IoPersonAddSharp } from "react-icons/io5";
import { MdPersonAdd } from "react-icons/md";
import { RiCalendarScheduleFill } from "react-icons/ri";
import { FaRankingStar } from "react-icons/fa6";
import { FaChildReaching } from "react-icons/fa6";
import { MdModelTraining } from "react-icons/md";
import { MdPermMedia } from "react-icons/md";

const QuickLinks: React.FC = () => {
  // .quick-icon.green { background: linear-gradient(135deg, var(--#00916e) 0%, var(--#00b383) 100%); }
  // .quick-icon.orange { background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%); }
  // .quick-icon.blue { background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%); }
  // .quick-icon.red { background: linear-gradient(135deg, #dc3545 0%, #ef4444 100%); }
  // .quick-icon.purple { background: linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%); }
  // .quick-icon.cyan { background: linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%); }
  // .quick-icon.yellow { background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%); }

  const quickLinks = [
    {
      icon: (
        <div className="bg-gradient-to-br from-[#f59e0b] to-[#fbbf24] h-16 w-16 rounded-2xl flex items-center justify-center">
          <MdPersonAdd className="h-8 w-8" />
        </div>
      ),
      title: "Athlete Registration",
      description: "Register online and start your athletic journey with us",
      color: "from-green-600 to-green-400",
    },
    {
      icon: (
        <div className="bg-gradient-to-br from-[#00916e] to-[#00b383] h-16 w-16 rounded-2xl flex items-center justify-center">
          <RiCalendarScheduleFill className="h-8 w-8" />
        </div>
      ),
      title: "Event Calendar",
      description: "Browse upcoming competitions and championships",
      color: "from-yellow-500 to-yellow-300",
    },
    {
      icon: (
        <div className="bg-gradient-to-br from-[#3b82f6] to-[#60a5fa] h-16 w-16 rounded-2xl flex items-center justify-center">
          <FaRankingStar className="h-8 w-8" />
        </div>
      ),
      title: "National Rankings",
      description: "View athlete rankings by category and performance",
      color: "from-blue-500 to-blue-400",
    },
    {
      icon: (
        <div className="bg-gradient-to-br from-[#dc3545] to-[#ef4444] h-16 w-16 rounded-2xl flex items-center justify-center">
          <FaChildReaching className="h-8 w-8" />
        </div>
      ),
      title: "Records & Achievements",
      description: "Explore national and international athletic records",
      color: "from-red-500 to-red-400",
    },
    {
      icon: (
        <div className="bg-gradient-to-br from-[#8b5cf6] to-[#a78bfa] h-16 w-16 rounded-2xl flex items-center justify-center">
          <MdModelTraining className="h-8 w-8" />
        </div>
      ),
      title: "Training Programs",
      description: "Access coaching resources and development programs",
      color: "from-purple-500 to-purple-400",
    },
    {
      icon: (
        <div className="bg-gradient-to-br from-[#06b6d4] to-[#22d3ee] h-16 w-16 rounded-2xl flex items-center justify-center">
          <MdPermMedia className="h-8 w-8" />
        </div>
      ),
      title: "Media Gallery",
      description: "Photos and videos from events and training sessions",
      color: "from-cyan-500 to-cyan-400",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-green-600 font-semibold text-sm uppercase tracking-wider mb-2">Quick Access</div>
          {/* <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Everything You Need</h2> */}
          <DynamicHeading title="Everything You Need" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access all federation services, resources, and information from one place
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quickLinks.map((link, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-200 rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:border-[#00916e] hover:-translate-y-2 cursor-pointer"
            >
              <div
                className={`w-16 h-16 rounded-xl ${link.color} flex items-center justify-center text-white mx-auto mb-6`}
              >
                {link.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{link.title}</h3>
              <p className="text-gray-500 leading-relaxed">{link.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickLinks;
