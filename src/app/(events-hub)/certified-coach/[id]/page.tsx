"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Award,
  Mail,
  Phone,
  MapPin,
  Users,
  Trophy,
  Star,
  GraduationCap,
  CheckCircle,
  Languages,
  Briefcase,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const certificationColors: Record<string, string> = {
  "Level 1": "bg-blue-100 text-blue-800",
  "Level 2": "bg-purple-100 text-purple-800",
  "Level 3": "bg-orange-100 text-orange-800",
  "Master Coach": "bg-red-100 text-red-800",
  International: "bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white",
};

// Dummy coach data
const dummyCoach = {
  id: "1",
  full_name: "John Doe",
  experience_years: 8,
  certification_level: "Level 2",
  availability: "available",
  photo_url: "https://images.unsplash.com/photo-1603415526960-f7e0328d92b4?auto=format&fit=crop&w=800&q=80",
  specialization: ["Strength Training", "Speed Development", "Injury Recovery"],
  email: "john.doe@example.com",
  phone: "+880 1234 567 890",
  location: "Dhaka, Bangladesh",
  athletes_trained: 120,
  achievements: [
    "Trained national-level sprinters",
    "Developed youth talent programs",
    "Certified International Athletics Coach",
  ],
  languages: ["English", "Bangla"],
  bio: "Coach John Doe is an experienced athletic trainer specializing in speed and endurance programs. He has been instrumental in shaping the next generation of national athletes.",
  certifications: ["Advanced Coaching Diploma (Level 2)", "Sports Nutrition Certificate"],
};

export default function CoachDetailsPage() {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get("id");

  // You can later replace this lookup with a dynamic data fetch
  const coach = dummyCoach;

  if (!coach) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8F6F3] to-white">
        <Card className="max-w-md w-full border-none shadow-xl">
          <CardContent className="p-12 text-center">
            <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-4">Coach not found</p>
            <Button type="button" onClick={() => router.push("/coaches")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Coaches
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] to-white py-12 px-4 pt-40">
      <div className="main_container mx-auto">
        <Button
          type="button"
          variant="black"
          onClick={() => router.push("/certified-coach")}
          className="mb-6 hover:bg-gradient-to-br from-[#00704A] to-[#005239]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to All Coaches
        </Button>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Left Card */}
          <Card className="lg:col-span-1 border-none shadow-2xl overflow-hidden">
            <div className="h-80 bg-gradient-to-br from-gray-100 to-gray-200 relative">
              {coach.photo_url ? (
                <img src={coach.photo_url} alt={coach.full_name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#00704A] to-[#005239] flex items-center justify-center text-white text-6xl font-bold shadow-2xl">
                    {coach.full_name?.charAt(0) || "C"}
                  </div>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute top-4 right-4">
                <Badge
                  variant="outline"
                  className={`${
                    certificationColors[coach.certification_level]
                  } border-none shadow-lg text-lg px-4 py-2`}
                >
                  {coach.certification_level}
                </Badge>
              </div>

              {coach.availability && (
                <div className="absolute top-4 left-4">
                  <Badge
                    className={
                      coach.availability === "available"
                        ? "bg-green-500 text-white border-none shadow-lg"
                        : coach.availability === "limited"
                        ? "bg-yellow-500 text-white border-none shadow-lg"
                        : "bg-gray-500 text-white border-none shadow-lg"
                    }
                  >
                    {coach.availability.toUpperCase()}
                  </Badge>
                </div>
              )}
            </div>

            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-[#2D3436] mb-2">{coach.full_name}</h1>
                <p className="text-gray-600 font-medium">{coach.experience_years} Years of Coaching Experience</p>
              </div>

              {/* Specializations */}
              {coach.specialization && (
                <div className="mb-6 pb-6 border-b border-gray-100">
                  <p className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#D4AF37]" />
                    Specializations
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {coach.specialization.map((spec, idx) => (
                      <Badge key={idx} className="bg-[#00704A]/10 text-[#00704A] border-none">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-5 h-5 text-[#00704A]" />
                  <a href={`mailto:${coach.email}`} className="text-sm hover:text-[#00704A]">
                    {coach.email}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-5 h-5 text-[#C1272D]" />
                  <a href={`tel:${coach.phone}`} className="text-sm hover:text-[#C1272D]">
                    {coach.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-sm">{coach.location}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-[#00704A]/5 rounded-xl">
                  <Users className="w-6 h-6 text-[#00704A] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#00704A]">{coach.athletes_trained}</div>
                  <div className="text-xs text-gray-600">Athletes Trained</div>
                </div>
                <div className="text-center p-4 bg-[#D4AF37]/10 rounded-xl">
                  <Trophy className="w-6 h-6 text-[#D4AF37] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#D4AF37]">{coach.achievements.length}</div>
                  <div className="text-xs text-gray-600">Achievements</div>
                </div>
              </div>

              {/* Languages */}
              <div className="pt-6 border-t border-gray-100">
                <p className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Languages className="w-4 h-4 text-[#00704A]" />
                  Languages
                </p>
                <p className="text-sm text-gray-600">{coach.languages.join(", ")}</p>
              </div>

              <Button
                type="button"
                className="w-full mt-6 bg-gradient-to-r from-[#00704A] to-[#005239] text-white h-12"
              >
                <Mail className="w-4 h-4 mr-2" />
                Contact Coach
              </Button>
            </CardContent>
          </Card>

          {/* Right Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio */}
            <Card className="border-none shadow-xl">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-[#00704A]" />
                  About {coach.full_name.split(" ")[0]}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <p className="text-gray-600 leading-relaxed text-lg">{coach.bio}</p>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="achievements" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 bg-white border border-gray-200 p-1 rounded-xl">
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="certifications">Certifications</TabsTrigger>
              </TabsList>

              <TabsContent value="achievements">
                <Card className="border-none shadow-xl">
                  <CardHeader className="border-b border-gray-100">
                    <CardTitle className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-[#D4AF37]" />
                      Coaching Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-4">
                      {coach.achievements.map((a, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-4 p-6 bg-gradient-to-r from-white to-[#F8F6F3] rounded-xl border border-gray-100"
                        >
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center flex-shrink-0 shadow-lg">
                            <Award className="w-6 h-6 text-white" />
                          </div>
                          <p className="text-lg font-semibold text-[#2D3436]">{a}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="certifications">
                <Card className="border-none shadow-xl">
                  <CardHeader className="border-b border-gray-100">
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-[#00704A]" />
                      Professional Certifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <div className="space-y-6">
                      <div className="p-6 bg-gradient-to-br from-[#00704A]/10 rounded-xl border-2 border-[#00704A]/20">
                        <div className="flex items-center gap-3 mb-3">
                          <GraduationCap className="w-6 h-6 text-[#00704A]" />
                          <h3 className="text-xl font-bold text-[#2D3436]">Primary Certification</h3>
                        </div>
                        <Badge
                          className={`${certificationColors[coach.certification_level]} border-none text-lg px-4 py-2`}
                        >
                          {coach.certification_level}
                        </Badge>
                        <p className="text-sm text-gray-600 mt-3">
                          Bangladesh Athletics Federation Official Certification
                        </p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-[#2D3436] mb-4 text-lg">Additional Qualifications</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          {coach.certifications.map((cert, i) => (
                            <div
                              key={i}
                              className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-200"
                            >
                              <CheckCircle className="w-5 h-5 text-[#00704A]" />
                              <p className="text-sm font-medium text-[#2D3436]">{cert}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Bottom CTA */}
        <Card className="border-none shadow-xl bg-gradient-to-br from-[#00704A] to-[#005239] text-white text-center">
          <CardContent className="p-12">
            <GraduationCap className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Interested in Training with {coach.full_name.split(" ")[0]}?</h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              {coach.availability === "available"
                ? `${
                    coach.full_name.split(" ")[0]
                  } is currently accepting new athletes. Contact directly to discuss training opportunities.`
                : `${coach.full_name.split(" ")[0]} is currently unavailable.`}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                type="button"
                className="h-14 px-8 bg-white text-[#00704A] hover:bg-gray-100 text-lg font-semibold"
              >
                <Mail className="w-5 h-5 mr-2" />
                Send Inquiry
              </Button>
              <Button
                type="button"
                variant="black"
                className="h-14 px-8 border-2 border-white text-white hover:bg-white/10 text-lg font-semibold"
                onClick={() => router.push("/training-programs")}
              >
                View Training Programs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
