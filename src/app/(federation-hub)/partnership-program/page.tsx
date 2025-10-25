"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import {
  GraduationCap,
  School,
  Building2,
  Users,
  Trophy,
  Target,
  Handshake,
  CheckCircle,
  Mail,
  MapPin,
  Award,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { format } from "date-fns";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ---------- ICON + COLOR MAPPINGS ----------
const organizationTypeIcons = {
  school: School,
  university: GraduationCap,
  sports_club: Trophy,
  ngo: Users,
  corporate: Building2,
  government: Building2,
  other: Handshake,
};

const partnershipTypeColors = {
  training_program: "bg-blue-100 text-blue-800",
  talent_identification: "bg-purple-100 text-purple-800",
  facility_sharing: "bg-green-100 text-green-800",
  coaching_support: "bg-orange-100 text-orange-800",
  equipment_support: "bg-pink-100 text-pink-800",
  event_collaboration: "bg-indigo-100 text-indigo-800",
  research: "bg-yellow-100 text-yellow-800",
  other: "bg-gray-100 text-gray-800",
};

// ---------- DUMMY DATA ----------
const dummyPartnerships = [
  {
    id: 1,
    organization_name: "Greenfield High School",
    organization_type: "school",
    partnership_type: "training_program",
    description: "Partnered to train young athletes and organize inter-school track events.",
    location: "Dhaka, Bangladesh",
    achievements: ["Trained over 300 students", "Hosted inter-school athletics championship 2024"],
    students_benefited: 300,
    start_date: "2022-01-01",
    contact_email: "info@greenfield.edu.bd",
    featured: true,
    logo_url: "",
  },
  {
    id: 2,
    organization_name: "Bangladesh Sports Club",
    organization_type: "sports_club",
    partnership_type: "event_collaboration",
    description: "Collaboration for youth athletic tournaments and training camps.",
    location: "Chattogram, Bangladesh",
    achievements: ["Organized regional tournaments", "Provided facility support"],
    students_benefited: 500,
    start_date: "2021-06-10",
    contact_email: "contact@sportsclub.com",
    featured: false,
    logo_url: "",
  },
  {
    id: 3,
    organization_name: "Tech University of Bangladesh",
    organization_type: "university",
    partnership_type: "research",
    description: "Collaborative sports research and athlete performance analysis program.",
    location: "Rajshahi, Bangladesh",
    achievements: ["Published 3 research papers", "Developed analytics tools"],
    students_benefited: 200,
    start_date: "2023-02-15",
    contact_email: "hello@tub.edu.bd",
    featured: true,
    logo_url: "",
  },
];

export default function PartnershipPrograms() {
  const [filter, setFilter] = useState("all");

  const partnerships =
    filter === "all" ? dummyPartnerships : dummyPartnerships.filter((p) => p.organization_type === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] via-white to-[#F8F6F3] pt-10 sm:pt-40">
      {/* Decorative Blurs */}
      <div className="fixed top-20 right-10 w-96 h-96 bg-gradient-to-br from-[#00704A]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-[#C1272D]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* HERO */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg mb-8 border border-[#00704A]/10">
              <Handshake className="w-5 h-5 text-[#00704A]" />
              <span className="text-sm font-semibold bg-gradient-to-r from-[#00704A] to-[#005239] bg-clip-text text-transparent">
                Collaboration & Growth
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-[#2D3436] mb-6 leading-tight">
              Partnership{" "}
              <span className="bg-gradient-to-r from-[#00704A] via-[#C1272D] to-[#D4AF37] bg-clip-text text-transparent">
                Programs
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Collaborating with schools, universities, and sports organizations to develop athletics across Bangladesh.
            </p>

            <Link href="/apply-for-partnership">
              <Button
                variant="black"
                className="h-14 px-8 text-bold bg-gradient-to-r from-[#00704A] to-[#005239] hover:from-[#005239] hover:to-[#00704A] text-white hover:text-white text-lg font-semibold shadow-xl"
              >
                Apply for Partnership
              </Button>
            </Link>
          </div>

          {/* STATS */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[
              { label: "Active Partners", value: partnerships.length, icon: Handshake },
              { label: "Schools & Universities", value: "150+", icon: GraduationCap },
              { label: "Students Reached", value: "50,000+", icon: Users },
              { label: "Programs Running", value: "75+", icon: Target },
            ].map((stat, i) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={i}
                  className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#00704A] to-[#005239] flex items-center justify-center shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-4xl font-bold text-[#00704A] mb-2">{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* FILTER TABS */}
          <Tabs defaultValue="all" onValueChange={setFilter} className="mb-12">
            <div className="flex justify-center">
              <TabsList className="inline-grid grid-cols-4 bg-white border-2 border-gray-100 p-2 rounded-2xl shadow-xl">
                <TabsTrigger value="all" className="rounded-xl">
                  All Partners
                </TabsTrigger>
                <TabsTrigger value="school" className="rounded-xl">
                  Schools
                </TabsTrigger>
                <TabsTrigger value="university" className="rounded-xl">
                  Universities
                </TabsTrigger>
                <TabsTrigger value="sports_club" className="rounded-xl">
                  Sports Clubs
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>

          {/* PARTNERS GRID */}
          {partnerships.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partnerships.map((p) => {
                const Icon = organizationTypeIcons[p.organization_type as keyof typeof organizationTypeIcons];
                return (
                  <Card
                    key={p.id}
                    className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group"
                  >
                    {p.featured && <div className="h-1 bg-gradient-to-r from-[#D4AF37] to-[#B8941F]" />}
                    <CardContent className="p-8">
                      {/* LOGO / ICON */}
                      <div className="flex items-start justify-between mb-6">
                        {p.logo_url ? (
                          <img src={p.logo_url} alt={p.organization_name} className="w-20 h-20 object-contain" />
                        ) : (
                          <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-[#00704A] to-[#005239] flex items-center justify-center">
                            <Icon className="w-10 h-10 text-white" />
                          </div>
                        )}
                        {p.featured && (
                          <Badge
                            variant="outline"
                            className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white border-none"
                          >
                            <Award className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>

                      {/* DETAILS */}
                      <h3 className="text-xl font-bold text-[#2D3436] mb-2">{p.organization_name}</h3>
                      <div className="flex gap-2 mb-4">
                        <Badge variant="outline" className="text-xs capitalize">
                          {p.organization_type.replace(/_/g, " ")}
                        </Badge>
                        <Badge
                          className={`${
                            partnershipTypeColors[p.partnership_type as keyof typeof partnershipTypeColors]
                          } border-none text-xs capitalize`}
                        >
                          {p.partnership_type.replace(/_/g, " ")}
                        </Badge>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">{p.description}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <MapPin className="w-4 h-4" />
                        <span>{p.location}</span>
                      </div>
                      <div className="space-y-2 mb-4 pt-4 border-t border-gray-100">
                        <p className="text-xs font-semibold text-gray-700 mb-2">Key Achievements:</p>
                        {p.achievements.slice(0, 2).map((a, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
                            <CheckCircle className="w-3 h-3 text-[#00704A] mt-0.5" />
                            <span>{a}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-4 pt-4 border-t border-gray-100">
                        {p.students_benefited && (
                          <div className="text-center">
                            <div className="text-2xl font-bold text-[#00704A]">{p.students_benefited}+</div>
                            <div className="text-xs text-gray-500">Students</div>
                          </div>
                        )}
                        {p.start_date && (
                          <div className="text-center">
                            <div className="text-sm font-bold text-[#C1272D]">
                              {format(new Date(p.start_date), "yyyy")}
                            </div>
                            <div className="text-xs text-gray-500">Since</div>
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 mt-6">
                        {p.contact_email && (
                          <Button
                            variant="black"
                            // size="sm"
                            className="flex-1"
                            onClick={() => (window.location.href = `mailto:${p.contact_email}`)}
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Contact
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <Card className="border-none shadow-xl">
              <CardContent className="p-20 text-center">
                <Handshake className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <p className="text-gray-600 text-lg">No partnerships found in this category</p>
              </CardContent>
            </Card>
          )}

          {/* CTA */}
          <Card className="mt-20 border-none shadow-2xl bg-gradient-to-br from-[#00704A] via-[#005239] to-[#00704A] text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            <CardContent className="p-12 md:p-16 relative z-10">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm mb-6">
                    <Sparkles className="w-10 h-10" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">Partner With Us</h2>
                  <p className="text-xl text-white/90 leading-relaxed mb-8">
                    Join our network of partners and help develop athletics talent across Bangladesh. Together, we can
                    create lasting impact.
                  </p>
                  <div className="flex gap-4">
                    <Link href="/apply-for-partnership">
                      <Button className="h-14 px-8 bg-white text-[#00704A] hover:bg-gray-100 text-lg font-semibold">
                        Apply Now
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                    <Button
                      variant="black"
                      className="h-14 px-8 text-lg font-semibold border-2 border-white text-white hover:bg-white/10"
                    >
                      Download Brochure
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      title: "Access to Training Programs",
                      desc: "Benefit from BAF's expertise and coaching resources",
                    },
                    {
                      title: "Equipment Support",
                      desc: "Receive athletics equipment and facility upgrades",
                    },
                    {
                      title: "Event Hosting",
                      desc: "Host inter-school and regional competitions",
                    },
                    {
                      title: "Talent Development",
                      desc: "Identify and nurture young athletic talent",
                    },
                    {
                      title: "Recognition",
                      desc: "National recognition and branding opportunities",
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-4">
                      <CheckCircle className="w-6 h-6 text-[#D4AF37]" />
                      <div>
                        <p className="font-semibold mb-1">{item.title}</p>
                        <p className="text-sm text-white/80">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
