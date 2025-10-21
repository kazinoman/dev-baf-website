"use client";

import React, { useState } from "react";
import Link from "next/link";

import { Award, Search, MapPin, Mail, Phone, Trophy, Users, Star, CheckCircle, GraduationCap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@/components/ui/select";
import { SelectContent } from "@/components/ui/select";
import { SelectItem } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/Badge";
import { CardContent } from "@/components/ui/card";
import Button from "@/components/ui/Button";

// --- Types ---
interface Coach {
  id: number;
  full_name: string;
  photo_url?: string;
  certification_level: string;
  availability?: "available" | "limited" | "unavailable";
  experience_years?: number;
  specialization?: string[];
  bio?: string;
  athletes_trained?: number;
  achievements?: string[];
  location?: string;
  email?: string;
  phone?: string;
  languages?: string[];
}

// --- Dummy Data ---
const dummyCoaches: Coach[] = [
  {
    id: 1,
    full_name: "John Smith",
    certification_level: "Level 1",
    experience_years: 5,
    specialization: ["Sprints", "Strength Training"],
    bio: "Passionate about helping young athletes develop speed and endurance.",
    athletes_trained: 120,
    achievements: ["State Champion 2021"],
    availability: "available",
    location: "Dhaka, Bangladesh",
    email: "johnsmith@example.com",
    phone: "+880123456789",
    languages: ["English", "Bengali"],
    photo_url: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=800",
  },
  {
    id: 2,
    full_name: "Ayesha Rahman",
    certification_level: "Level 2",
    experience_years: 8,
    specialization: ["Long Distance", "Marathon"],
    bio: "Experienced coach focused on endurance and mindset training.",
    athletes_trained: 200,
    achievements: ["National Marathon 2022"],
    availability: "limited",
    location: "Chittagong, Bangladesh",
    email: "ayesha@example.com",
    phone: "+8801987654321",
    languages: ["English", "Bengali", "Hindi"],
    photo_url: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?q=80&w=800",
  },
  {
    id: 3,
    full_name: "David Lee",
    certification_level: "Master Coach",
    experience_years: 12,
    specialization: ["Throws", "Technique Analysis"],
    bio: "Dedicated to refining techniques and improving athlete performance.",
    athletes_trained: 350,
    achievements: ["Asian Athletics Gold 2019"],
    availability: "unavailable",
    location: "Sylhet, Bangladesh",
    email: "davidlee@example.com",
    phone: "+8801712345678",
    languages: ["English", "Mandarin"],
    photo_url: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?q=80&w=800",
  },
];

const certificationColors: Record<string, string> = {
  "Level 1": "bg-blue-100 text-blue-800",
  "Level 2": "bg-purple-100 text-purple-800",
  "Level 3": "bg-orange-100 text-orange-800",
  "Master Coach": "bg-red-100 text-red-800",
  International: "bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white",
};

export default function CertifiedCoachesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");

  const filteredCoaches = dummyCoaches.filter((coach) => {
    const matchesSearch =
      coach.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      coach.specialization?.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLevel = levelFilter === "all" || coach.certification_level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] to-white py-12 px-4 pt-40">
      <div className="main_container mx-auto">
        {/* --- Hero Section --- */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00704A]/10 to-[#C1272D]/10 rounded-full mb-6">
            <GraduationCap className="w-4 h-4 text-[#00704A]" />
            <span className="text-sm font-semibold text-[#00704A]">Professional Coaching Staff</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-[#2D3436] mb-6">
            Certified{" "}
            <span className="bg-gradient-to-r from-[#00704A] to-[#005239] bg-clip-text text-transparent">Coaches</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Meet our team of experienced and certified athletics coaches dedicated to developing champions.
          </p>
        </div>

        {/* --- Search & Filters --- */}
        <div className="mb-12 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search coaches by name or specialization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 border-gray-200 focus:border-[#00704A]"
            />
          </div>

          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-full md:w-64 !h-14 border-gray-200">
              <SelectValue placeholder="Filter by Level" className="h-32" />
            </SelectTrigger>
            <SelectContent className="">
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="Level 1">Level 1</SelectItem>
              <SelectItem value="Level 2">Level 2</SelectItem>
              <SelectItem value="Level 3">Level 3</SelectItem>
              <SelectItem value="Master Coach">Master Coach</SelectItem>
              <SelectItem value="International">International</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* --- Coaches Grid --- */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCoaches.map((coach) => (
            <Link key={coach.id} href={`/certified-coach/${coach.id}`}>
              <Card className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-pointer">
                <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 relative">
                  {coach.photo_url ? (
                    <img src={coach.photo_url} alt={coach.full_name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#00704A] to-[#005239] flex items-center justify-center text-white text-4xl font-bold shadow-2xl">
                        {coach.full_name.charAt(0)}
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  <div className="absolute top-4 right-4">
                    <Badge
                      variant="outline"
                      className={`${certificationColors[coach.certification_level]} border-none shadow-lg`}
                    >
                      {coach.certification_level}
                    </Badge>
                  </div>

                  {coach.availability && (
                    <div className="absolute top-4 left-4">
                      <Badge
                        variant="outline"
                        className={
                          coach.availability === "available"
                            ? "bg-green-500 text-white border-none"
                            : coach.availability === "limited"
                            ? "bg-yellow-500 text-white border-none"
                            : "bg-gray-500 text-white border-none"
                        }
                      >
                        {coach.availability}
                      </Badge>
                    </div>
                  )}
                </div>

                <CardContent className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-[#2D3436] mb-2">{coach.full_name}</h3>
                    {coach.experience_years && (
                      <p className="text-sm text-gray-600">{coach.experience_years} years of experience</p>
                    )}
                  </div>

                  {coach.specialization && (
                    <div>
                      <p className="text-xs text-gray-500 mb-2">Specializations:</p>
                      <div className="flex flex-wrap gap-2">
                        {coach.specialization.map((spec, i) => (
                          <Badge key={i} variant="outline" className="border-[#00704A] text-[#00704A]">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {coach.bio && <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">{coach.bio}</p>}

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    {coach.athletes_trained && (
                      <div className="text-center p-3 bg-[#00704A]/5 rounded-lg">
                        <Users className="w-5 h-5 text-[#00704A] mx-auto mb-1" />
                        <div className="text-xl font-bold text-[#00704A]">{coach.athletes_trained}</div>
                        <div className="text-xs text-gray-600">Athletes Trained</div>
                      </div>
                    )}
                    {coach.achievements && (
                      <div className="text-center p-3 bg-[#D4AF37]/10 rounded-lg">
                        <Trophy className="w-5 h-5 text-[#D4AF37] mx-auto mb-1" />
                        <div className="text-xl font-bold text-[#D4AF37]">{coach.achievements.length}</div>
                        <div className="text-xs text-gray-600">Achievements</div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 pt-4 border-t border-gray-100">
                    {coach.location && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4 text-[#00704A]" />
                        <span>{coach.location}</span>
                      </div>
                    )}
                    {coach.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4 text-[#C1272D]" />
                        <span>{coach.email}</span>
                      </div>
                    )}
                    {coach.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4 text-[#D4AF37]" />
                        <span>{coach.phone}</span>
                      </div>
                    )}
                  </div>

                  {coach.languages && (
                    <div className="pt-2">
                      <p className="text-xs text-gray-500 mb-2">Languages:</p>
                      <p className="text-sm text-gray-600">{coach.languages.join(", ")}</p>
                    </div>
                  )}

                  <Button
                    type="button"
                    className="w-full bg-gradient-to-r from-[#00704A] to-[#005239] hover:from-[#005239] hover:to-[#00704A] text-white"
                  >
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* --- Empty State --- */}
        {filteredCoaches.length === 0 && (
          <div className="text-center py-20">
            <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">No coaches found matching your criteria</p>
          </div>
        )}

        {/* --- Info Section --- */}
        <div className="mt-20 bg-gradient-to-br from-[#00704A] to-[#005239] rounded-3xl p-8 md:p-12 text-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Become a Certified Coach</h2>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {[
                {
                  icon: <GraduationCap className="w-8 h-8" />,
                  title: "Training",
                  desc: "Comprehensive coaching education programs",
                },
                {
                  icon: <CheckCircle className="w-8 h-8" />,
                  title: "Certification",
                  desc: "Internationally recognized qualifications",
                },
                {
                  icon: <Star className="w-8 h-8" />,
                  title: "Growth",
                  desc: "Continuous professional development opportunities",
                },
              ].map((item, i) => (
                <div key={i} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-white/80 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Button
                type="button"
                className="h-14 px-8 bg-white text-[#00704A] hover:bg-gray-100 text-lg font-semibold rounded-xl"
              >
                Learn About Coaching Certification
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
