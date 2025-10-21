"use client";

import React, { useState } from "react";
import { Users, Search, Filter, Trophy, MapPin, Calendar, Award, X } from "lucide-react";
import Button from "../ui/Button";
import AthleteCard, { IAthlete } from "./AthletsCard";
import CustomSelect from "../ui/CustomSelect";

const TEAMS = [
  "All Teams",
  "Dhaka",
  "Chittagong",
  "Rajshahi",
  "Khulna",
  "Sylhet",
  "Barisal",
  "Rangpur",
  "Mymensingh",
  "National Team",
];

const EVENTS = [
  "All Events",
  "100m Sprint",
  "200m Sprint",
  "400m Sprint",
  "800m Run",
  "1500m Run",
  "5000m Run",
  "10000m Run",
  "110m Hurdles",
  "400m Hurdles",
  "Long Jump",
  "High Jump",
  "Triple Jump",
  "Pole Vault",
  "Shot Put",
  "Discus Throw",
  "Javelin Throw",
  "Hammer Throw",
  "Marathon",
  "Race Walking",
];

const CATEGORIES = ["All Categories", "senior", "junior", "youth"];

const teamColors = {
  Dhaka: "bg-blue-100 text-blue-800",
  Chittagong: "bg-green-100 text-green-800",
  Rajshahi: "bg-purple-100 text-purple-800",
  Khulna: "bg-orange-100 text-orange-800",
  Sylhet: "bg-pink-100 text-pink-800",
  Barisal: "bg-indigo-100 text-indigo-800",
  Rangpur: "bg-red-100 text-red-800",
  Mymensingh: "bg-yellow-100 text-yellow-800",
  "National Team": "bg-gradient-to-r from-[#00704A] to-[#005239] text-white",
};

const AthletesSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("All Teams");
  const [selectedEvent, setSelectedEvent] = useState("All Events");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [showFilters, setShowFilters] = useState(false);

  const filteredAthletes = athletesData.filter((athlete) => {
    const matchesSearch = searchQuery === "" || athlete.full_name?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTeam = selectedTeam === "All Teams" || athlete.team === selectedTeam;

    const matchesEvent = selectedEvent === "All Events" || athlete.preferred_events?.includes(selectedEvent);

    const matchesCategory = selectedCategory === "All Categories" || athlete.athlete_category === selectedCategory;

    return matchesSearch && matchesTeam && matchesEvent && matchesCategory;
  });

  const activeFiltersCount = [
    selectedTeam !== "All Teams",
    selectedEvent !== "All Events",
    selectedCategory !== "All Categories",
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSelectedTeam("All Teams");
    setSelectedEvent("All Events");
    setSelectedCategory("All Categories");
    setSearchQuery("");
  };

  return (
    <div className="py-6 main_container">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="border-none shadow-lg rounded-xl">
          <div className="p-6 text-center">
            <div className="text-3xl font-bold text-[#00704A] mb-1">{athletesData.length}</div>
            <div className="text-sm text-gray-600">Total Athletes</div>
          </div>
        </div>
        <div className="border-none shadow-lg rounded-xl">
          <div className="p-6 text-center">
            <div className="text-3xl font-bold text-[#C1272D] mb-1">
              {athletesData.filter((a) => a.gender === "male").length}
            </div>
            <div className="text-sm text-gray-600">Male Athletes</div>
          </div>
        </div>
        <div className="border-none shadow-lg rounded-xl">
          <div className="p-6 text-center">
            <div className="text-3xl font-bold text-[#D4AF37] mb-1">
              {athletesData.filter((a) => a.gender === "female").length}
            </div>
            <div className="text-sm text-gray-600">Female Athletes</div>
          </div>
        </div>
        <div className="border-none shadow-lg rounded-xl">
          <div className="p-6 text-center">
            <div className="text-3xl font-bold text-[#00704A] mb-1">{filteredAthletes.length}</div>
            <div className="text-sm text-gray-600">Filtered Results</div>
          </div>
        </div>
      </div>

      {/* Search Header */}
      <div className="flex flex-col items-center justify-between bg-white w-full border border-gray-200 rounded-xl mb-8">
        {/* Search + Filter Toggle */}

        {/* Search Header */}
        <div className="flex flex-col w-full items-center justify-center gap-4 bg-white p-6 rounded-xl">
          {/* Search Input */}
          <div className="relative w-full ">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search athletes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg pl-10 pr-4 py-3 border border-gray-300  shadow-sm text-gray-700 text-sm focus:ring-2 focus:ring-[#00704A] focus:border-[#00704A] transition-all outline-none"
            />
          </div>

          {/* Filter Button */}
          <div className="w-full flex justify-start">
            <Button
              type="button"
              variant="black"
              onClick={() => setShowFilters((prev) => !prev)}
              className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 bg-[#00704A] text-white font-medium rounded-lg shadow hover:bg-[#005f3b] transition-all"
            >
              <Filter className="w-4 h-4" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="bg-white text-[#00704A] rounded-full text-xs px-2 py-0.5 font-semibold">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Filters Section */}
        {showFilters && (
          <div className="bg-white  p-4 mb-6 flex flex-col md:flex-row gap-4 items-center w-full">
            <CustomSelect label="Select Team" options={TEAMS} value={selectedTeam} onChange={setSelectedTeam} />

            <CustomSelect label="Select Event" options={EVENTS} value={selectedEvent} onChange={setSelectedEvent} />

            <CustomSelect
              label="Select Category"
              options={CATEGORIES}
              value={selectedCategory}
              onChange={setSelectedCategory}
            />

            <Button
              variant="white"
              type="button"
              className="text-red-500 flex items-center gap-2"
              onClick={clearFilters}
            >
              <X className="w-4 h-4" />
              Clear
            </Button>
          </div>
        )}
      </div>

      {/* Results Grid */}
      {filteredAthletes.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredAthletes.map((athlete: IAthlete, id: number) => (
            <AthleteCard key={athlete.id} athlete={athlete} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-12">
          <Trophy className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p>No athletes found matching your filters.</p>
        </div>
      )}
    </div>
  );
};

export default AthletesSearch;

const athletesData = [
  {
    id: 1,
    full_name: "Usman Khan",
    photo_url: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
    team: "Falcons",
    gender: "male",
    athlete_category: "professional",
    bio: "A dedicated athlete specializing in 100m sprints and relay races.",
    preferred_events: ["100m Sprint", "200m Dash", "4x100m Relay", "Long Jump"],
    achievements: ["Gold Medal - 100m Sprint 2023", "Silver Medal - 200m 2022"],
    registration_date: "2021-03-15T00:00:00Z",
  },
  {
    id: 2,
    full_name: "Ayesha Rahman",
    photo_url: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0642",
    team: "Eagles",
    gender: "female",
    athlete_category: "junior",
    bio: "Focused on long-distance running and cross-country events.",
    preferred_events: ["Marathon", "10K Run", "Half Marathon"],
    achievements: ["Bronze - City Marathon 2022"],
    registration_date: "2020-06-10T00:00:00Z",
  },
  {
    id: 3,
    full_name: "Kamal Uddin",
    photo_url: "https://images.unsplash.com/photo-1612902376975-6d3c7c68d9b8",
    team: "Tigers",
    gender: "male",
    athlete_category: "amateur",
    bio: "A passionate footballer and sprinter representing his local club.",
    preferred_events: ["Football", "400m Sprint"],
    achievements: ["District Football Champion 2023"],
    registration_date: "2022-08-01T00:00:00Z",
  },
  {
    id: 4,
    full_name: "Nadia Islam",
    photo_url: "https://images.unsplash.com/photo-1614284828631-83baf9932f60",
    team: "Panthers",
    gender: "female",
    athlete_category: "professional",
    bio: "Specializes in gymnastics with national-level achievements.",
    preferred_events: ["Floor Exercise", "Balance Beam", "Vault"],
    achievements: ["Gold - National Gymnastics 2023"],
    registration_date: "2021-11-10T00:00:00Z",
  },
  {
    id: 5,
    full_name: "Rafiq Hasan",
    photo_url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    team: "Warriors",
    gender: "male",
    athlete_category: "junior",
    bio: "Up-and-coming basketball player known for quick reflexes.",
    preferred_events: ["Basketball"],
    achievements: ["MVP - Junior League 2022"],
    registration_date: "2022-02-20T00:00:00Z",
  },
  {
    id: 6,
    full_name: "Farhana Chowdhury",
    photo_url: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6",
    team: "Lions",
    gender: "female",
    athlete_category: "amateur",
    bio: "An enthusiastic swimmer with a focus on freestyle and butterfly events.",
    preferred_events: ["Freestyle 100m", "Butterfly 200m"],
    achievements: ["Gold - City Swim Meet 2023"],
    registration_date: "2021-09-05T00:00:00Z",
  },
  {
    id: 7,
    full_name: "Tanvir Ahmed",
    photo_url: "https://images.unsplash.com/photo-1612902377183-5ec87dfb19a3",
    team: "Sharks",
    gender: "male",
    athlete_category: "professional",
    bio: "A competitive swimmer representing his state in multiple championships.",
    preferred_events: ["Backstroke 200m", "Freestyle 400m"],
    achievements: ["Silver - State Championship 2023"],
    registration_date: "2019-12-12T00:00:00Z",
  },
  {
    id: 8,
    full_name: "Sadia Karim",
    photo_url: "https://images.unsplash.com/photo-1590080875831-25bdb2f3f3dd",
    team: "Falcons",
    gender: "female",
    athlete_category: "junior",
    bio: "Young and passionate table tennis player with a sharp backhand.",
    preferred_events: ["Singles", "Doubles"],
    achievements: ["Runner-up - Inter School Championship 2023"],
    registration_date: "2023-01-22T00:00:00Z",
  },
  {
    id: 9,
    full_name: "Imran Hossain",
    photo_url: "https://images.unsplash.com/photo-1620240731644-57bba900bde6",
    team: "Eagles",
    gender: "male",
    athlete_category: "professional",
    bio: "Track and field athlete specializing in hurdles and high jump.",
    preferred_events: ["110m Hurdles", "High Jump"],
    achievements: ["Gold - Regional Athletics Meet 2023"],
    registration_date: "2020-08-10T00:00:00Z",
  },
  {
    id: 10,
    full_name: "Lubna Nahar",
    photo_url: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
    team: "Panthers",
    gender: "female",
    athlete_category: "amateur",
    bio: "Yoga and pilates trainer competing in local fitness events.",
    preferred_events: ["Yoga Pose Championship"],
    achievements: ["1st Place - City Wellness Contest 2022"],
    registration_date: "2022-05-14T00:00:00Z",
  },
  {
    id: 11,
    full_name: "John Doe",
    photo_url: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
    team: "Team A",
    gender: "male",
    athlete_category: "Category A",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    preferred_events: ["Event A", "Event B"],
    achievements: ["Achievement 1", "Achievement 2"],
    registration_date: "2023-01-01",
  },
  {
    id: 12,
    full_name: "Sohail Rana",
    photo_url: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    team: "Warriors",
    gender: "male",
    athlete_category: "professional",
    bio: "Karate black belt with multiple national medals.",
    preferred_events: ["Kata", "Kumite"],
    achievements: ["National Champion 2022"],
    registration_date: "2019-07-07T00:00:00Z",
  },
  {
    id: 13,
    full_name: "Mehnaz Parvin",
    photo_url: "https://images.unsplash.com/photo-1552058544-f2b08422138a",
    team: "Tigers",
    gender: "female",
    athlete_category: "amateur",
    bio: "Volleyball player known for exceptional teamwork and agility.",
    preferred_events: ["Volleyball"],
    achievements: ["Team Captain - Tigers 2023"],
    registration_date: "2021-01-15T00:00:00Z",
  },
  {
    id: 14,
    full_name: "Arif Rahman",
    photo_url: "https://images.unsplash.com/photo-1614284828631-83baf9932f60",
    team: "Falcons",
    gender: "male",
    athlete_category: "junior",
    bio: "Up-and-coming tennis player with impressive endurance.",
    preferred_events: ["Singles", "Mixed Doubles"],
    achievements: ["Champion - Junior Tennis Cup 2023"],
    registration_date: "2023-03-01T00:00:00Z",
  },
  {
    id: 15,
    full_name: "Rehana Akter",
    photo_url: "https://images.unsplash.com/photo-1583394838336-acd977736f90",
    team: "Eagles",
    gender: "female",
    athlete_category: "professional",
    bio: "Professional archer with national-level recognition.",
    preferred_events: ["Archery 70m", "Archery 30m"],
    achievements: ["Silver - National Archery 2023"],
    registration_date: "2020-10-11T00:00:00Z",
  },
  {
    id: 16,
    full_name: "Fahim Siddiqui",
    photo_url: "https://images.unsplash.com/photo-1620200423043-3df8c1b5e3c5",
    team: "Sharks",
    gender: "male",
    athlete_category: "amateur",
    bio: "Mountain biker with a love for adventure and endurance.",
    preferred_events: ["Cross Country", "Downhill Race"],
    achievements: ["Bronze - Adventure Race 2022"],
    registration_date: "2022-12-03T00:00:00Z",
  },
  {
    id: 17,
    full_name: "Anika Sultana",
    photo_url: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce",
    team: "Lions",
    gender: "female",
    athlete_category: "junior",
    bio: "Young gymnast training for international competitions.",
    preferred_events: ["Balance Beam", "Vault"],
    achievements: ["Gold - Inter School Gymnastics 2023"],
    registration_date: "2023-04-18T00:00:00Z",
  },
  {
    id: 18,
    full_name: "Mizanur Rahman",
    photo_url: "https://images.unsplash.com/photo-1623204655832-f70d9ae3d8d1",
    team: "Panthers",
    gender: "male",
    athlete_category: "professional",
    bio: "National-level cricketer known for consistent batting.",
    preferred_events: ["Cricket"],
    achievements: ["MOM - National League 2023"],
    registration_date: "2020-05-25T00:00:00Z",
  },
  {
    id: 19,
    full_name: "Samira Noor",
    photo_url: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0642",
    team: "Warriors",
    gender: "female",
    athlete_category: "amateur",
    bio: "Cyclist who loves speed and endurance racing.",
    preferred_events: ["Road Race", "Time Trial"],
    achievements: ["Winner - City Cycling Championship 2023"],
    registration_date: "2021-06-09T00:00:00Z",
  },
  {
    id: 20,
    full_name: "Tariq Islam",
    photo_url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    team: "Falcons",
    gender: "male",
    athlete_category: "junior",
    bio: "Promising young boxer with remarkable discipline and skill.",
    preferred_events: ["Featherweight", "Lightweight"],
    achievements: ["Gold - Youth Boxing League 2023"],
    registration_date: "2023-02-10T00:00:00Z",
  },
];
