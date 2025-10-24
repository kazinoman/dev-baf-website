"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Sparkles,
  Target,
  Users,
  Award,
  TrendingUp,
  Calendar,
  MapPin,
  Clock,
  Star,
  Trophy,
  Rocket,
  Heart,
  CheckCircle,
  DollarSign,
  GraduationCap,
  Zap,
  Shield,
  Gift,
  ArrowRight,
  Phone,
  Mail,
} from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

const programTypeColors: Record<string, string> = {
  talent_scouting: "bg-purple-100 text-purple-800",
  junior_development: "bg-blue-100 text-blue-800",
  grassroots: "bg-green-100 text-green-800",
  elite_pathway: "bg-red-100 text-red-800",
  school_program: "bg-yellow-100 text-yellow-800",
};

const programTypeIcons: Record<string, any> = {
  talent_scouting: Target,
  junior_development: Users,
  grassroots: Heart,
  elite_pathway: Trophy,
  school_program: GraduationCap,
};

const ageGroupLabels: Record<string, string> = {
  under_10: "Under 10",
  under_12: "Under 12",
  under_14: "Under 14",
  under_16: "Under 16",
  under_18: "Under 18",
  under_20: "Under 20",
};

// Dummy program data
const dummyPrograms = [
  {
    id: 1,
    program_name: "Junior Development Camp",
    program_type: "junior_development",
    age_group: "under_14",
    image_url: "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?auto=format&fit=crop&w=800&q=80",
    description: "A program focused on developing core athletic skills and teamwork for young athletes under 14.",
    start_date: "2025-02-10",
    duration: "3 Months",
    location: "Dhaka National Stadium",
    max_participants: 30,
    current_participants: 22,
    fee: 5000,
    outcomes: { total_graduates: 45, national_athletes: 5 },
    program_features: ["Certified coaches", "Modern equipment", "Video analysis"],
    success_stories: [{ athlete_name: "Arif Hossain", achievement: "National U16 Champion", year: 2024 }],
    scholarship_available: true,
    status: "applications_open",
  },
  {
    id: 2,
    program_name: "Elite Pathway Program",
    program_type: "elite_pathway",
    age_group: "under_18",
    image_url: "https://images.unsplash.com/photo-1584467735871-4b5a1ae0f8b3?auto=format&fit=crop&w=800&q=80",
    description: "Designed for athletes preparing for professional and international-level competitions.",
    start_date: "2025-03-01",
    duration: "6 Months",
    location: "Bangabandhu Stadium",
    max_participants: 20,
    current_participants: 20,
    fee: 0,
    outcomes: { total_graduates: 60, national_athletes: 15 },
    program_features: ["High-performance training", "Sports nutrition sessions", "Mental conditioning"],
    success_stories: [{ athlete_name: "Shamima Akter", achievement: "SEA Games Medalist", year: 2023 }],
    scholarship_available: true,
    status: "closed",
  },
];

export default function TalentDevelopmentPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState("all");
  const [selectedAge, setSelectedAge] = useState("all");

  // Filter dummy data
  const programs = dummyPrograms.filter((program) => {
    const typeMatch = selectedType === "all" || program.program_type === selectedType;
    const ageMatch = selectedAge === "all" || program.age_group === selectedAge;
    return typeMatch && ageMatch;
  });

  const totalGraduates = programs.reduce((sum, p) => sum + (p.outcomes?.total_graduates || 0), 0);
  const totalNationalAthletes = programs.reduce((sum, p) => sum + (p.outcomes?.national_athletes || 0), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] to-white py-12 px-4 pt-40">
      <div className="main_container mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg mb-8 border border-[#D4AF37]/20">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-sm font-semibold bg-gradient-to-r from-[#D4AF37] to-[#B8941F] bg-clip-text text-transparent">
              Building Future Champions
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-[#2D3436] mb-6 leading-tight">
            Talent{" "}
            <span className="bg-gradient-to-r from-[#00704A] to-[#005239] bg-clip-text text-transparent">
              Development
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Comprehensive programs to identify, nurture, and develop young athletic talent from grassroots to elite
            level.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-4xl font-bold text-[#00704A] mb-2">{programs.length}</div>
              <div className="text-sm text-gray-600">Active Programs</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-4xl font-bold text-[#C1272D] mb-2">{totalGraduates}+</div>
              <div className="text-sm text-gray-600">Graduates</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-4xl font-bold text-[#D4AF37] mb-2">{totalNationalAthletes}+</div>
              <div className="text-sm text-gray-600">National Athletes</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-4xl font-bold text-purple-600 mb-2">95%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>

        {/* Program Benefits Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-[#00704A]/5 to-white">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#00704A] to-[#005239] flex items-center justify-center shadow-lg">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-[#2D3436] mb-2">Expert Scouting</h3>
              <p className="text-sm text-gray-600">Professional talent identification</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-[#C1272D]/5 to-white">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#C1272D] to-[#A01F25] flex items-center justify-center shadow-lg">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-[#2D3436] mb-2">World-Class Coaching</h3>
              <p className="text-sm text-gray-600">Certified international coaches</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-[#D4AF37]/5 to-white">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center shadow-lg">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-[#2D3436] mb-2">Sports Science</h3>
              <p className="text-sm text-gray-600">Scientific training methods</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-500/5 to-white">
            <CardContent className="p-6 text-center">
              <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center shadow-lg">
                <Gift className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-bold text-[#2D3436] mb-2">Scholarships</h3>
              <p className="text-sm text-gray-600">Financial support available</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-none shadow-xl mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-4 w-full">
              {/* Program Type */}
              <div className="space-y-2 w-full">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#00704A]" />
                  Program Type
                </label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-full h-12">
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Programs</SelectItem>
                    <SelectItem value="talent_scouting">Talent Scouting</SelectItem>
                    <SelectItem value="junior_development">Junior Development</SelectItem>
                    <SelectItem value="grassroots">Grassroots</SelectItem>
                    <SelectItem value="elite_pathway">Elite Pathway</SelectItem>
                    <SelectItem value="school_program">School Program</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Age Group */}
              <div className="space-y-2 w-full">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#C1272D]" />
                  Age Group
                </label>
                <Select value={selectedAge} onValueChange={setSelectedAge}>
                  <SelectTrigger className="w-full h-12">
                    <SelectValue placeholder="Select Age Group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Age Groups</SelectItem>
                    {Object.entries(ageGroupLabels).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((program) => {
            const TypeIcon = programTypeIcons[program.program_type] || Target;
            const spotsLeft = program.max_participants - (program.current_participants || 0);

            return (
              <Card
                key={program.id}
                className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group"
              >
                {/* Header Image */}
                <div className="h-56 relative overflow-hidden bg-gradient-to-br from-[#00704A] to-[#005239]">
                  <img
                    src={program.image_url}
                    alt={program.program_name}
                    className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Badge variant="outline" className={programTypeColors[program.program_type]}>
                      {program.program_type.replace("_", " ")}
                    </Badge>
                    {program.scholarship_available && (
                      <Badge className="bg-[#D4AF37] text-white border-none">
                        <Gift className="w-3 h-3 mr-1" />
                        Scholarship
                      </Badge>
                    )}
                  </div>

                  {program.status === "applications_open" && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-green-500 text-white border-none animate-pulse shadow-lg">
                        <Zap className="w-3 h-3 mr-1" />
                        Now Open
                      </Badge>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                        <TypeIcon className="w-6 h-6 text-white" />
                      </div>
                      <Badge variant="outline" className="border-white text-white">
                        {ageGroupLabels[program.age_group]}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-white line-clamp-2">{program.program_name}</h3>
                  </div>
                </div>

                {/* Program Info */}
                <CardContent className="py-3 space-y-4 flex flex-col justify-between h-full">
                  <div className="space-y-6">
                    <p className="text-gray-600 line-clamp-3 leading-relaxed">{program.description}</p>

                    {/* Key Info */}
                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-100">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-[#00704A]" />
                        <div>
                          <div className="text-xs text-gray-500">Starts</div>
                          <div className="font-semibold">{format(new Date(program.start_date), "MMM d")}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="w-4 h-4 text-[#C1272D]" />
                        <div>
                          <div className="text-xs text-gray-500">Duration</div>
                          <div className="font-semibold">{program.duration}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm col-span-2">
                        <MapPin className="w-4 h-4 text-[#D4AF37]" />
                        <div>
                          <div className="text-xs text-gray-500">Location</div>
                          <div className="font-semibold">{program.location}</div>
                        </div>
                      </div>
                    </div>

                    {/* Highlights */}
                    {program.program_features?.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-[#2D3436] mb-2 flex items-center gap-2">
                          <Star className="w-4 h-4 text-[#D4AF37]" />
                          Program Highlights
                        </h4>
                        <div className="space-y-1">
                          {program.program_features.slice(0, 3).map((feature, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-[#00704A]" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-4">
                    {/* Apply */}
                    <div className="flex items-center justify-between pt-4">
                      <div>
                        {spotsLeft > 0 ? (
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="w-4 h-4 text-[#00704A]" />
                            <span className="font-semibold text-[#00704A]">{spotsLeft} spots left</span>
                          </div>
                        ) : (
                          <Badge variant="outline" className="border-red-500 text-red-600">
                            Full
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-lg font-bold text-[#00704A]">
                          {program.fee === 0 ? "Free" : `${program.fee} BDT`}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="black"
                      onClick={() => router.push(`/talent-development/application-form?id=${program.id}`)}
                      disabled={spotsLeft <= 0}
                      className="w-full h-12 bg-gradient-to-r from-[#00704A] to-[#005239] hover:from-[#005239] hover:to-[#00704A] text-white text-base font-semibold"
                    >
                      {spotsLeft > 0 ? (
                        <>
                          Apply Now <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      ) : (
                        "Program Full"
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Why Join Section */}
        <div className="mt-20 bg-gradient-to-br from-[#00704A] to-[#005239] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center">Why Join Our Talent Programs?</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Rocket className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Career Pathway</h3>
                <p className="text-white/90">Clear progression from grassroots to international competition</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Performance Excellence</h3>
                <p className="text-white/90">Data-driven training methods and continuous improvement</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">Holistic Development</h3>
                <p className="text-white/90">Physical, mental, and academic support for well-rounded growth</p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Button
                onClick={() => {}}
                className="h-14 px-8 bg-white text-[#00704A] hover:bg-gray-100 text-lg font-semibold rounded-xl shadow-xl"
              >
                Learn More About Our Programs
              </Button>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <Card className="border-none shadow-xl bg-gradient-to-br from-white to-[#F8F6F3]">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-[#2D3436] mb-2">Have Questions About Our Programs?</h3>
              <p className="text-gray-600">Our talent development team is here to help you find the right program.</p>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl shadow-md">
                <Phone className="w-5 h-5 text-[#00704A]" />
                <div className="text-left">
                  <div className="text-xs text-gray-500">Call Us</div>
                  <div className="font-semibold text-[#2D3436]">+880 1711-234567</div>
                </div>
              </div>

              <div className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl shadow-md">
                <Mail className="w-5 h-5 text-[#C1272D]" />
                <div className="text-left">
                  <div className="text-xs text-gray-500">Email Us</div>
                  <div className="font-semibold text-[#2D3436]">talent@bdathletics.gov.bd</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
