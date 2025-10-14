import AthletesSearch from "@/components/Athletes/AthletesSearch";
import { Users } from "lucide-react";
import React from "react";

const AthletesPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="text-center mb-12 mt-40">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00704A]/10 to-[#C1272D]/10 rounded-full mb-6">
          <Users className="w-4 h-4 text-[#00704A]" />
          <span className="text-sm font-semibold text-[#00704A]">National Athletes</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-[#2D3436] mb-6">
          Bangladesh{" "}
          <span className="bg-gradient-to-r from-[#00704A] to-[#005239] bg-clip-text text-transparent">Athletes</span>
        </h1>

        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Discover our talented athletes representing Bangladesh in athletics competitions worldwide
        </p>
      </div>

      <AthletesSearch />
    </div>
  );
};

export default AthletesPage;
