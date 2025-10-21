"use client";

import React, { useState } from "react";

import { format } from "date-fns";
import { Calendar, MapPin, Users, Clock, Target, Award, TrendingUp, Zap, CheckCircle, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

const categoryColors: Record<string, string> = {
  youth: "bg-blue-100 text-blue-800",
  junior: "bg-purple-100 text-purple-800",
  senior: "bg-green-100 text-green-800",
  elite: "bg-red-100 text-red-800",
  grassroots: "bg-yellow-100 text-yellow-800",
};

const disciplineIcons: Record<string, any> = {
  sprints: Zap,
  middle_distance: TrendingUp,
  long_distance: Target,
  hurdles: Award,
  jumps: TrendingUp,
  throws: Target,
  combined_events: Award,
  all: CheckCircle,
};

// ✅ Dummy Data
const dummyPrograms = [
  {
    id: 1,
    program_name: "Elite Sprint Training Camp",
    category: "elite",
    discipline: "sprints",
    description: "High-intensity sprint program designed for elite athletes preparing for national championships.",
    start_date: "2025-11-01",
    duration: "6 Weeks",
    location: "Dhaka National Stadium",
    coach_name: "Md. Arif Hossain",
    status: "ongoing",
    fee: 3000,
    max_participants: 30,
    current_participants: 25,
    image_url: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 2,
    program_name: "Youth Development Camp",
    category: "youth",
    discipline: "jumps",
    description: "Training program for young athletes focusing on fundamentals of jumping techniques.",
    start_date: "2025-12-10",
    duration: "4 Weeks",
    location: "Chittagong Athletics Ground",
    coach_name: "Farzana Ahmed",
    status: "upcoming",
    fee: 1500,
    max_participants: 40,
    current_participants: 20,
    image_url: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    program_name: "Senior Long Distance Program",
    category: "senior",
    discipline: "long_distance",
    description: "Endurance training for senior athletes targeting marathon events.",
    start_date: "2025-10-20",
    duration: "8 Weeks",
    location: "Rajshahi Training Center",
    coach_name: "Tanvir Alam",
    status: "ongoing",
    fee: 2000,
    max_participants: 25,
    current_participants: 25,
    image_url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    program_name: "Grassroots Athletics Workshop",
    category: "grassroots",
    discipline: "throws",
    description: "Beginner-level workshop to introduce athletics fundamentals to newcomers.",
    start_date: "2025-12-01",
    duration: "3 Weeks",
    location: "Khulna District Stadium",
    coach_name: "Rafiq Hasan",
    status: "upcoming",
    fee: 500,
    max_participants: 50,
    current_participants: 10,
    image_url: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=800&q=60",
  },
];

const tabs = [
  { value: "all", label: "All Programs" },
  { value: "upcoming", label: "Upcoming" },
  { value: "ongoing", label: "Ongoing" },
];

export default function TrainingPrograms() {
  const router = useRouter();
  const [filter, setFilter] = useState("all");

  const filteredPrograms = filter === "all" ? dummyPrograms : dummyPrograms.filter((p) => p.status === filter);

  const handleViewDetails = (id: number) => {
    router.push(`/national-training-program/${id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] to-white py-12 px-4 pt-40">
      <div className="main_container mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00704A]/10 to-[#C1272D]/10 rounded-full mb-6">
            <Target className="w-4 h-4 text-[#00704A]" />
            <span className="text-sm font-semibold text-[#00704A]">Professional Training</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-[#2D3436] mb-6">
            Training{" "}
            <span className="bg-gradient-to-r from-[#00704A] to-[#005239] bg-clip-text text-transparent">Programs</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive training programs designed to develop athletes from grassroots to elite level
          </p>
        </div>

        {/* Filter Tabs */}
        <Tabs defaultValue="all" onValueChange={setFilter} className="mb-12">
          <TabsList className="grid w-full md:w-auto grid-cols-3 bg-white border border-gray-200 p-1 rounded-xl shadow-lg">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="rounded-lg p-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00704A] data-[state=active]:to-[#005239] data-[state=active]:text-white"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrograms.map((program) => {
            const DisciplineIcon = disciplineIcons[program.discipline] || Target;
            const spotsLeft = program.max_participants - program.current_participants;

            return (
              <Card
                key={program.id}
                className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group"
              >
                {/* Header */}
                <div
                  className={`h-48 relative overflow-hidden ${
                    program.status === "ongoing"
                      ? "bg-gradient-to-br from-[#00704A] to-[#005239]"
                      : "bg-gradient-to-br from-[#C1272D] to-[#A01F25]"
                  }`}
                >
                  <img src={program.image_url} alt={program.program_name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40" />

                  <div className="absolute top-4 right-4 flex gap-2">
                    <Badge variant="outline" className={categoryColors[program.category]}>
                      {program.category}
                    </Badge>
                    {program.status === "ongoing" && (
                      <Badge variant="outline" className="bg-green-500 text-white border-none animate-pulse">
                        Active
                      </Badge>
                    )}
                  </div>

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white line-clamp-2">{program.program_name}</h3>
                  </div>
                </div>

                {/* Card Content */}
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-2">
                    <DisciplineIcon className="w-5 h-5 text-[#00704A]" />
                    <span className="font-semibold text-[#2D3436] capitalize">
                      {program.discipline.replace("_", " ")}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-3">{program.description}</p>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4 text-[#00704A]" />
                      <span>Starts: {format(new Date(program.start_date), "MMM d, yyyy")}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4 text-[#C1272D]" />
                      <span>{program.duration}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-[#D4AF37]" />
                      <span>{program.location}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <Award className="w-4 h-4 text-[#00704A]" />
                      <span>Coach: {program.coach_name}</span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {spotsLeft > 0 ? `${spotsLeft} spots left` : "Full"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[#00704A] font-bold">
                      <DollarSign className="w-4 h-4" />
                      <span>{program.fee === 0 ? "Free" : `${program.fee} BDT`}</span>
                    </div>
                  </div>

                  <Button
                    variant="black"
                    type="button"
                    className="w-full rounded-xl bg-gradient-to-r from-[#00704A] to-[#005239] hover:from-[#005239] hover:to-[#00704A] text-white"
                    onClick={() => handleViewDetails(program.id)}
                  >
                    {spotsLeft > 0 ? "View Details & Enroll" : "Program Full"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredPrograms.length === 0 && (
          <div className="text-center py-20">
            <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No training programs available at the moment</p>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-20 grid md:grid-cols-3 gap-8">
          <Card className="border-none shadow-lg bg-gradient-to-br from-[#00704A] to-[#005239] text-white">
            <CardContent className="p-8 text-center">
              <Target className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Expert Coaching</h3>
              <p className="text-white/90 text-sm">Learn from certified coaches with international experience</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-gradient-to-br from-[#C1272D] to-[#A01F25] text-white">
            <CardContent className="p-8 text-center">
              <Award className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">World-Class Facilities</h3>
              <p className="text-white/90 text-sm">
                Train at state-of-the-art facilities meeting international standards
              </p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-gradient-to-br from-[#D4AF37] to-[#B8941F] text-white">
            <CardContent className="p-8 text-center">
              <TrendingUp className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Proven Results</h3>
              <p className="text-white/90 text-sm">Track record of developing national and international champions</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
