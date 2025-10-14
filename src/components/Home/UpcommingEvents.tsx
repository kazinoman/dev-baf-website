import React from "react";
import { FaMapMarkerAlt, FaClock, FaUsers } from "react-icons/fa";
import DynamicHeading from "./HeadingComponent";

const UpcomingEvents: React.FC = () => {
  const events = [
    {
      id: 1,
      title: "National Junior Athletics Championship",
      day: "15",
      month: "Oct",
      location: "Dhaka National Stadium",
      time: "9:00 AM - 5:00 PM",
      category: "Junior Category",
    },
    {
      id: 2,
      title: "Inter-District Track & Field Meet",
      day: "22",
      month: "Oct",
      location: "Chittagong MA Aziz Stadium",
      time: "8:00 AM - 6:00 PM",
      category: "All Categories",
    },
    {
      id: 3,
      title: "Bangladesh Open Athletics Meet 2025",
      day: "05",
      month: "Nov",
      location: "Sylhet District Stadium",
      time: "9:00 AM - 5:00 PM",
      category: "Open Category",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-[#00916e] font-semibold text-sm uppercase tracking-wider mb-2">Mark Your Calendar</div>
          {/* <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Upcoming Events & Competitions</h2> */}
          <DynamicHeading title="Upcoming Events & Competitions" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don&apos;t miss these exciting athletic events and championships
          </p>
        </div>

        {/* Events List */}
        <div className="max-w-4xl mx-auto space-y-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white border-2 border-gray-200 rounded-2xl p-6 grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] gap-6 items-center transition-all duration-300 hover:border-[#00916e] hover:shadow-lg cursor-pointer"
            >
              {/* Date */}
              <div className="bg-gray-50 rounded-xl p-4 text-center min-w-20">
                <div className="text-2xl font-bold text-[#00916e] leading-none">{event.day}</div>
                <div className="text-sm font-semibold text-gray-600 uppercase mt-1">{event.month}</div>
              </div>

              {/* Details */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                  <span className="flex items-center space-x-1">
                    <FaMapMarkerAlt className="text-gray-400" />
                    <span>{event.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <FaClock className="text-gray-400" />
                    <span>{event.time}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <FaUsers className="text-gray-400" />
                    <span>{event.category}</span>
                  </span>
                </div>
              </div>

              {/* Register Button */}
              <a
                href="#"
                className="px-6 py-3 bg-[#00916e] text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200 text-center"
              >
                Register Now
              </a>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="flex justify-center mt-12">
          <button className="px-8 py-3 bg-[#00916e] text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200 shadow-md hover:shadow-lg cursor-pointer">
            View More
          </button>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEvents;
