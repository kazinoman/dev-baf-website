"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Award,
  Star,
  Building2,
  ExternalLink,
  Mail,
  Calendar,
  Trophy,
  Handshake,
  ArrowRight,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const tierColors: Record<string, string> = {
  platinum: "from-gray-300 to-gray-400",
  gold: "from-[#D4AF37] to-[#B8941F]",
  silver: "from-gray-400 to-gray-500",
  bronze: "from-[#CD7F32] to-[#A0522D]",
  partner: "from-[#00704A] to-[#005239]",
};

const tierIcons: Record<string, string> = {
  platinum: "💎",
  gold: "🏆",
  silver: "🥈",
  bronze: "🥉",
  partner: "🤝",
};

// Dummy Sponsors Data
const dummySponsors = [
  {
    id: 1,
    company_name: "TechVision Ltd.",
    sponsorship_tier: "platinum",
    description: "Leading innovation partner helping us push athletic performance through technology.",
    logo_url: "/placeholder.svg?height=100&width=100",
    sponsorship_type: ["Technology", "Equipment"],
    benefits: ["Exclusive event branding", "Priority booth space", "Joint press coverage"],
    start_date: "2021-06-01",
    website: "https://techvision.com",
    contact_email: "info@techvision.com",
  },
  {
    id: 2,
    company_name: "Global Energy Co.",
    sponsorship_tier: "gold",
    description: "Powering athletes to achieve greatness with sustainable energy solutions.",
    logo_url: "/placeholder.svg?height=100&width=100",
    sponsorship_type: ["Energy", "CSR"],
    benefits: ["Event banners", "Product placement"],
    start_date: "2022-03-15",
    website: "https://globalenergy.com",
    contact_email: "sponsor@globalenergy.com",
  },
  {
    id: 3,
    company_name: "HealthPlus Medical",
    sponsorship_tier: "silver",
    description: "Providing premium healthcare and wellness support to athletes nationwide.",
    logo_url: "/placeholder.svg?height=100&width=100",
    sponsorship_type: ["Healthcare"],
    benefits: ["On-site medical team", "Branding on jerseys"],
    start_date: "2023-01-10",
    website: "https://healthplus.com",
    contact_email: "support@healthplus.com",
  },
];

export default function SponsorsPage() {
  const [filter, setFilter] = useState("all");

  const filteredSponsors =
    filter === "all" ? dummySponsors : dummySponsors.filter((s) => s.sponsorship_tier === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] via-white to-[#F8F6F3] pt-5 sm:pt-40">
      {/* Decorative Background */}
      <div className="fixed top-20 right-10 w-96 h-96 bg-gradient-to-br from-[#D4AF37]/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-[#00704A]/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative py-20 px-4">
        <div className="main_container mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg mb-8 border border-[#D4AF37]/20">
              <Handshake className="w-5 h-5 text-[#D4AF37]" />
              <span className="text-sm font-semibold bg-gradient-to-r from-[#D4AF37] to-[#B8941F] bg-clip-text text-transparent">
                Official Sponsors
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-[#2D3436] mb-6 leading-tight">
              Our Valued{" "}
              <span className="bg-gradient-to-r from-[#D4AF37] via-[#00704A] to-[#C1272D] bg-clip-text text-transparent">
                Partners
              </span>
            </h1>

            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              We're proud to work with leading organizations who share our vision of developing world-class athletes and
              promoting excellence in Bangladesh.
            </p>

            <Link href="/become-a-sponsor">
              <Button
                type="button"
                variant="black"
                className="h-14 px-8 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white text-lg font-semibold shadow-xl"
              >
                Become a Sponsor
                {/* <ArrowRight className="ml-2 w-5 h-5" /> */}
              </Button>
            </Link>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[
              { label: "Active Sponsors", value: dummySponsors.length, icon: Building2 },
              { label: "Events Supported", value: "50+", icon: Trophy },
              { label: "Athletes Supported", value: "200+", icon: Award },
              { label: "Years of Partnership", value: "20+", icon: Calendar },
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <CardContent className="p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#B8941F] bg-clip-text text-transparent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Filter Tabs */}
          <Tabs defaultValue="all" onValueChange={setFilter} className="mb-12">
            <div className="flex justify-center">
              <TabsList className="inline-grid grid-cols-5 bg-white border-2 border-gray-100 p-2 rounded-2xl shadow-xl">
                <TabsTrigger value="all" className="rounded-xl">
                  All Sponsors
                </TabsTrigger>
                <TabsTrigger value="platinum" className="rounded-xl">
                  💎 Platinum
                </TabsTrigger>
                <TabsTrigger value="gold" className="rounded-xl">
                  🏆 Gold
                </TabsTrigger>
                <TabsTrigger value="silver" className="rounded-xl">
                  🥈 Silver
                </TabsTrigger>
                <TabsTrigger value="bronze" className="rounded-xl">
                  🥉 Bronze
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>

          {/* Sponsors Grid */}
          {filteredSponsors.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredSponsors.map((sponsor) => (
                <Card
                  key={sponsor.id}
                  className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group"
                >
                  <div className={`h-2 bg-gradient-to-r ${tierColors[sponsor.sponsorship_tier]}`} />
                  <CardContent className="p-4 flex flex-col justify-between h-full">
                    <div>
                      {/* Logo + Tier */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-32 h-32 flex items-center justify-center">
                          <img
                            src={sponsor.logo_url}
                            alt={sponsor.company_name}
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                        <Badge
                          variant="outline"
                          className={`bg-gradient-to-r ${
                            tierColors[sponsor.sponsorship_tier]
                          } text-white border-none text-sm px-3 py-1`}
                        >
                          {tierIcons[sponsor.sponsorship_tier]} {sponsor.sponsorship_tier.toUpperCase()}
                        </Badge>
                      </div>

                      {/* Info */}
                      <h3 className="text-2xl font-bold text-[#2D3436] mb-3">{sponsor.company_name}</h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{sponsor.description}</p>

                      {/* Types */}
                      {sponsor.sponsorship_type?.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                          {sponsor.sponsorship_type.map((type, index) => (
                            <Badge key={index} variant="outline" className="text-xs capitalize">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Benefits */}
                      {sponsor.benefits?.length > 0 && (
                        <div className="space-y-2 mb-6">
                          {sponsor.benefits.slice(0, 3).map((benefit, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-[#00704A] mt-0.5 flex-shrink-0" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Partner Since */}
                      {sponsor.start_date && (
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 pt-4 border-t border-gray-100">
                          <Calendar className="w-4 h-4" />
                          <span>Partner since {format(new Date(sponsor.start_date), "MMMM yyyy")}</span>
                        </div>
                      )}
                    </div>

                    {/* Contact */}
                    <div className="flex gap-2 mt-auto">
                      {sponsor.website && (
                        <Button
                          variant="black"
                          className="flex-1 rounded-2xl"
                          onClick={() => window.open(sponsor.website, "_blank")}
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Website
                        </Button>
                      )}
                      {sponsor.contact_email && (
                        <Button
                          variant="black"
                          className="rounded-2xl"
                          onClick={() => (window.location.href = `mailto:${sponsor.contact_email}`)}
                        >
                          <Mail className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-none shadow-xl">
              <CardContent className="p-20 text-center">
                <Building2 className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <p className="text-gray-600 text-lg mb-4">No sponsors found in this category</p>
                <Link href="/become-a-sponsor">
                  <Button className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white">
                    Be Our First Sponsor
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}

          {/* CTA Section */}
          <Card className="mt-20 border-none shadow-2xl bg-gradient-to-br from-[#00704A] via-[#005239] to-[#00704A] text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

            <CardContent className="p-12 md:p-16 relative z-10">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm mb-6">
                    <Sparkles className="w-10 h-10" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">Join Our Success Story</h2>
                  <p className="text-xl text-white/90 leading-relaxed mb-8">
                    Partner with Bangladesh Athletics Federation and be part of developing the next generation of
                    world-class athletes.
                  </p>
                  <Link href="/become-a-sponsor">
                    <Button
                      variant="white"
                      className="h-14 px-8 bg-white text-[#00704A] hover:bg-gray-100 text-lg font-semibold"
                    >
                      Become a Sponsor
                      {/* <ArrowRight className="ml-2 w-5 h-5" /> */}
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {[
                    "Brand visibility at national and international events",
                    "Association with excellence and achievement",
                    "Corporate social responsibility recognition",
                    "Exclusive networking opportunities",
                    "Custom sponsorship packages available",
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 bg-white/5 backdrop-blur-sm rounded-xl p-4">
                      <CheckCircle className="w-6 h-6 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      <span className="text-white/90">{benefit}</span>
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
