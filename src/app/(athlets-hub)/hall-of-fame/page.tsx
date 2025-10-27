"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trophy, Award, Medal, Star, Crown, Sparkles, Target, TrendingUp, Heart, Quote } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function HallOfFame() {
  const [selectedAthlete, setSelectedAthlete] = useState<any>(null);

  // ✅ Dummy Data (20+ items)
  const legends = Array.from({ length: 25 }).map((_, i) => ({
    id: i + 1,
    athlete_name: `Athlete ${i + 1}`,
    induction_year: 2000 + (i % 20),
    active_years: `${1995 + i} - ${2005 + i}`,
    specialization: ["100m Sprint", "Long Jump", "Marathon"].slice(0, (i % 3) + 1),
    medals: {
      gold: (i % 5) + 1,
      silver: (i % 3) + 1,
      bronze: (i % 4) + 1,
    },
    major_achievements: [
      {
        year: 2001 + i,
        achievement: "Won National Gold Medal",
        event: "National Athletics Championship",
      },
      {
        year: 2003 + i,
        achievement: "Represented Bangladesh Internationally",
        event: "Asian Games",
      },
    ],
    records_held: ["Fastest 100m Sprint (National)", "Longest Jump (Regional)"].slice(0, (i % 2) + 1),
    honors_awards: ["Best Athlete of the Year", "National Sports Award"].slice(0, (i % 2) + 1),
    legacy: "Inspired a generation of young athletes to pursue excellence in sports.",
    biography:
      "An accomplished athlete known for perseverance, discipline, and passion. Represented Bangladesh across multiple events and brought home numerous medals.",
    quotes: ["Victory is not in winning, but in never giving up.", "Dream, train, achieve, repeat."].slice(
      0,
      (i % 2) + 1
    ),
    is_featured: i % 6 === 0,
    photo_url: `https://randomuser.me/api/portraits/${i % 2 === 0 ? "men" : "women"}/${i + 10}.jpg`,
  }));

  const featuredLegends = legends.filter((l) => l.is_featured);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] to-white py-12 px-4 pt-32 md:pt-40">
      <div className="main_container mx-auto">
        {/* ===== Hero Section ===== */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg mb-8 border border-[#D4AF37]/20">
            <Crown className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-sm font-semibold bg-gradient-to-r from-[#D4AF37] to-[#B8941F] bg-clip-text text-transparent">
              Legends of Bangladesh Athletics
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-[#2D3436] mb-6 leading-tight">
            Hall of{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] bg-clip-text text-transparent">Fame</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Celebrating the legendary athletes who have shaped Bangladesh athletics history
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-2 md:p-6 shadow-lg border border-gray-100">
              <div className="text-base md:text-4xl font-bold text-[#D4AF37] mb-2">{legends.length}</div>
              <div className="text-sm text-gray-600">Legends</div>
            </div>
            <div className="bg-white rounded-2xl p-2  md:p-6 shadow-lg border border-gray-100">
              <div className="text-base md:text-4xl font-bold text-[#00704A] mb-2">
                {legends.reduce((sum, l) => sum + (l.medals.gold + l.medals.silver + l.medals.bronze), 0)}
              </div>
              <div className="text-sm text-gray-600">Total Medals</div>
            </div>
            <div className="bg-white rounded-2xl p-2 md:p-6 shadow-lg border border-gray-100">
              <div className="text-base md:text-4xl font-bold text-[#C1272D] mb-2">
                {legends.reduce((sum, l) => sum + (l.major_achievements?.length || 0), 0)}
              </div>
              <div className="text-sm text-gray-600">Achievements</div>
            </div>
          </div>
        </div>

        {/* ===== Featured Legends ===== */}
        {featuredLegends.length > 0 && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-6 h-6 text-[#D4AF37]" />
              <h2 className="text-3xl font-bold text-[#2D3436]">Featured Legends</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {featuredLegends.map((legend) => (
                <Card
                  key={legend.id}
                  className="border-none shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden cursor-pointer group"
                  onClick={() => setSelectedAthlete(legend)}
                >
                  <div className="h-96 relative overflow-hidden">
                    <img
                      src={legend.photo_url}
                      alt={legend.athlete_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    <div className="absolute top-4 right-4">
                      <div className="bg-[#D4AF37] p-3 rounded-full shadow-lg">
                        <Crown className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <Badge variant="outline" className="bg-white/20 backdrop-blur-sm text-white border-none mb-3">
                        Inducted {legend.induction_year}
                      </Badge>
                      <h3 className="text-4xl font-bold text-white mb-2">{legend.athlete_name}</h3>
                      <p className="text-white/90 text-lg mb-3">{legend.active_years}</p>
                      <div className="flex flex-wrap gap-2">
                        {legend.specialization.map((spec, idx) => (
                          <Badge
                            variant="outline"
                            key={idx}
                            className="bg-white/20 backdrop-blur-sm text-white border-none"
                          >
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center justify-center gap-6 mb-4 pb-4 border-b border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center">
                          <Trophy className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-lg">{legend.medals.gold}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gray-400 flex items-center justify-center">
                          <Medal className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-lg">{legend.medals.silver}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center">
                          <Medal className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-lg">{legend.medals.bronze}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 line-clamp-3 mb-4">{legend.biography}</p>

                    <Button
                      variant="black"
                      onClick={() => setSelectedAthlete(legend)}
                      className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white"
                    >
                      Read Full Story
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* ===== All Legends ===== */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-6 h-6 text-[#00704A]" />
            <h2 className="text-3xl font-bold text-[#2D3436]">All Hall of Fame Members</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {legends.map((legend) => (
              <Card
                key={legend.id}
                className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
                onClick={() => setSelectedAthlete(legend)}
              >
                <div className="h-80 relative overflow-hidden">
                  <img
                    src={legend.photo_url}
                    alt={legend.athlete_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                  {legend.is_featured && (
                    <div className="absolute top-4 right-4">
                      <div className="bg-[#D4AF37] p-2 rounded-full shadow-lg">
                        <Star className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-2xl font-bold text-white mb-1">{legend.athlete_name}</h3>
                    <p className="text-white/90">{legend.active_years}</p>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {legend.specialization.map((spec, idx) => (
                      <Badge variant="outline" key={idx} className="bg-[#00704A]/10 text-[#00704A] border-none">
                        {spec}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-gray-600 text-sm line-clamp-2">{legend.biography}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* ===== Detail Dialog ===== */}
        <Dialog open={!!selectedAthlete} onOpenChange={() => setSelectedAthlete(null)}>
          <DialogContent className="max-w-4xl md:min-w-[800px] max-h-[90vh] overflow-y-auto">
            {selectedAthlete && (
              <div>
                <DialogHeader>
                  <div className="h-96 -mx-6 -mt-6 mb-6 relative overflow-hidden rounded-t-xl">
                    <img
                      src={selectedAthlete.photo_url}
                      alt={selectedAthlete.athlete_name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <DialogTitle className="text-5xl font-bold text-white mb-2">
                        {selectedAthlete.athlete_name}
                      </DialogTitle>
                      <p className="text-white/90 text-xl">{selectedAthlete.active_years}</p>
                    </div>
                  </div>
                </DialogHeader>

                {/* ... Biography, Medals, Achievements, etc ... */}
                <div className="space-y-8">
                  {/* Specialization */}
                  <div>
                    <h3 className="text-xl font-bold text-[#2D3436] mb-3 flex items-center gap-2">
                      <Target className="w-5 h-5 text-[#00704A]" />
                      Specialization
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedAthlete.specialization?.map((spec, idx) => (
                        <Badge key={idx} className="bg-[#00704A]/10 text-[#00704A] border-none text-base px-4 py-2">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Medal Count */}
                  {selectedAthlete.medals && (
                    <div>
                      <h3 className="text-xl font-bold text-[#2D3436] mb-4 flex items-center gap-2">
                        <Trophy className="w-5 h-5 text-[#D4AF37]" />
                        Career Medals
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#B8941F]/5 rounded-xl p-6 text-center border-2 border-[#D4AF37]">
                          <Trophy className="w-12 h-12 text-[#D4AF37] mx-auto mb-2" />
                          <div className="text-4xl font-bold text-[#D4AF37] mb-1">
                            {selectedAthlete.medals.gold || 0}
                          </div>
                          <div className="text-sm text-gray-600">Gold Medals</div>
                        </div>
                        <div className="bg-gray-100 rounded-xl p-6 text-center border-2 border-gray-300">
                          <Medal className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                          <div className="text-4xl font-bold text-gray-600 mb-1">
                            {selectedAthlete.medals.silver || 0}
                          </div>
                          <div className="text-sm text-gray-600">Silver Medals</div>
                        </div>
                        <div className="bg-orange-100 rounded-xl p-6 text-center border-2 border-orange-300">
                          <Medal className="w-12 h-12 text-orange-500 mx-auto mb-2" />
                          <div className="text-4xl font-bold text-orange-600 mb-1">
                            {selectedAthlete.medals.bronze || 0}
                          </div>
                          <div className="text-sm text-gray-600">Bronze Medals</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Biography */}
                  <div>
                    <h3 className="text-xl font-bold text-[#2D3436] mb-3">Biography</h3>
                    <p className="text-gray-600 leading-relaxed">{selectedAthlete.biography}</p>
                  </div>

                  {/* Major Achievements */}
                  {selectedAthlete.major_achievements && selectedAthlete.major_achievements.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-[#2D3436] mb-4 flex items-center gap-2">
                        <Award className="w-5 h-5 text-[#C1272D]" />
                        Major Achievements
                      </h3>
                      <div className="space-y-3">
                        {selectedAthlete.major_achievements.map((achievement, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-4 p-4 bg-gradient-to-r from-[#00704A]/5 to-transparent rounded-xl border border-[#00704A]/10"
                          >
                            <div className="w-16 flex-shrink-0">
                              <div className="text-2xl font-bold text-[#00704A]">{achievement.year}</div>
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-[#2D3436] mb-1">{achievement.achievement}</div>
                              <div className="text-sm text-gray-600">{achievement.event}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Records */}
                  {selectedAthlete.records_held && selectedAthlete.records_held.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-[#2D3436] mb-3 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
                        Records Held
                      </h3>
                      <div className="grid md:grid-cols-2 gap-3">
                        {selectedAthlete.records_held.map((record, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 p-3 bg-[#D4AF37]/10 rounded-lg border border-[#D4AF37]/20"
                          >
                            <Trophy className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                            <span className="text-sm font-medium text-gray-700">{record}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Honors & Awards */}
                  {selectedAthlete.honors_awards && selectedAthlete.honors_awards.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-[#2D3436] mb-3 flex items-center gap-2">
                        <Star className="w-5 h-5 text-[#D4AF37]" />
                        Honors & Awards
                      </h3>
                      <div className="space-y-2">
                        {selectedAthlete.honors_awards.map((honor, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 p-3 bg-white rounded-lg border border-gray-200"
                          >
                            <Star className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                            <span className="text-sm text-gray-700">{honor}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Legacy */}
                  {selectedAthlete.legacy && (
                    <div className="bg-gradient-to-br from-[#00704A]/5 to-[#C1272D]/5 rounded-xl p-6 border-2 border-[#00704A]/10">
                      <h3 className="text-xl font-bold text-[#2D3436] mb-3 flex items-center gap-2">
                        <Heart className="w-5 h-5 text-[#C1272D]" />
                        Legacy
                      </h3>
                      <p className="text-gray-700 leading-relaxed italic">{selectedAthlete.legacy}</p>
                    </div>
                  )}

                  {/* Quotes */}
                  {selectedAthlete.quotes && selectedAthlete.quotes.length > 0 && (
                    <div>
                      <h3 className="text-xl font-bold text-[#2D3436] mb-4 flex items-center gap-2">
                        <Quote className="w-5 h-5 text-gray-400" />
                        Memorable Quotes
                      </h3>
                      <div className="space-y-4">
                        {selectedAthlete.quotes.map((quote, idx) => (
                          <div key={idx} className="pl-6 border-l-4 border-[#D4AF37] py-2">
                            <Quote className="w-6 h-6 text-[#D4AF37] mb-2 opacity-50" />
                            <p className="text-gray-700 italic text-lg leading-relaxed">"{quote}"</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
