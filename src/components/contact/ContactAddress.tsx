"use client";
import { MapPin, Mail, Phone } from "lucide-react";
import { Separator } from "../ui/Separator";

export function ContactAddress() {

  const contactInfo = [
    {
      icon: MapPin,
      title: "Headquarters",
      details: ["National Stadium, 2nd Floor, Room #34, Dhaka, Bangladesh"],
    },
    {
      icon: Mail,
      title: "Mail Us 24/7",
      details: ["athleticsfederationbd@gmail.com"],
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["Walton Group, BTMC, BJMC and Railways,"],
    },
  ];

  return (
    <section className="py-10 md:py-20 lg:pt-32 px-4 lg:px-8">

      <div className="max-w-7xl mx-auto">
        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6 lg:mb-16">
          {contactInfo.map((info, index) => (
            <div
              key={index}
              className="p-6 transition-all group border border-gray-200 hover:bg-[#e41b23] duration-500 cursor-pointer "
            >
              <div className="flex gap-4">
                {/* icon  */}
                <div
                  className={`w-18 h-12 bg-white rounded-sm flex items-center justify-center mb-4`}
                >
                  <info.icon className={`w-6 h-6 text-[#e41b23] `} />
                </div>

                {/* content  */}
                <div className="w-full">
                  <h3 className="text-xl lg:text-2xl font-semibold text-[#111111] group-hover:text-[#fff] ">
                    {info?.title}
                  </h3>
                  <Separator className="w-12 border-2 border-red-600 group-hover:border-white my-3 " />
                  {info.details.map((datail, datailIndex) => (
                    <h3
                      className="text-[#999999] group-hover:text-[#fff] text-sm md:text-base roboto-font"
                      key={datailIndex}
                    >
                      {" "}
                      {datail}{" "}
                    </h3>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
