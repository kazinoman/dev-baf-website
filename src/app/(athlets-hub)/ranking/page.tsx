"use client";

import React, { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy, TrendingUp, TrendingDown, Minus, Award, Target, Filter, Medal, Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/Badge";

// ---------------------------------------------
// Dummy Data
// ---------------------------------------------
const DISCIPLINES = [
  "All Disciplines",
  "100m Sprint",
  "200m Sprint",
  "400m Sprint",
  "Long Jump",
  "High Jump",
  "Javelin Throw",
];

const DUMMY_RANKINGS = [
  {
    id: 1,
    athlete_name: "Usain Bolt",
    category: "senior",
    gender: "male",
    discipline: "100m Sprint",
    ranking_position: 1,
    previous_rank: 2,
    best_performance: "9.58s",
    performance_date: "2024-08-12",
    venue: "Tokyo Stadium",
    team: "Jamaica",
    photo_url: "https://i.pravatar.cc/100?img=1",
    points: 980,
  },
  {
    id: 2,
    athlete_name: "Yohan Blake",
    category: "senior",
    gender: "male",
    discipline: "100m Sprint",
    ranking_position: 2,
    previous_rank: 1,
    best_performance: "9.69s",
    performance_date: "2024-08-10",
    venue: "Tokyo Stadium",
    team: "Jamaica",
    photo_url: "https://i.pravatar.cc/100?img=2",
    points: 950,
  },
  {
    id: 3,
    athlete_name: "Neeraj Chopra",
    category: "senior",
    gender: "male",
    discipline: "Javelin Throw",
    ranking_position: 1,
    previous_rank: null,
    best_performance: "89.5m",
    performance_date: "2024-07-20",
    venue: "New Delhi",
    team: "India",
    photo_url: "https://i.pravatar.cc/100?img=3",
    points: 975,
  },
  {
    id: 4,
    athlete_name: "Sydney McLaughlin",
    category: "senior",
    gender: "female",
    discipline: "400m Sprint",
    ranking_position: 1,
    previous_rank: 1,
    best_performance: "50.68s",
    performance_date: "2024-08-15",
    venue: "Paris Stadium",
    team: "USA",
    photo_url: "https://i.pravatar.cc/100?img=4",
    points: 990,
  },
];

// ---------------------------------------------
// Helpers
// ---------------------------------------------
const categoryColors: Record<string, string> = {
  senior: "bg-blue-100 text-blue-800",
  junior: "bg-purple-100 text-purple-800",
  youth: "bg-green-100 text-green-800",
};

const getRankChange = (current: number, previous: number | null) => {
  if (!previous) return { icon: Minus, color: "text-gray-400", text: "New" };
  const change = previous - current;
  if (change > 0) return { icon: TrendingUp, color: "text-green-600", text: `+${change}` };
  if (change < 0) return { icon: TrendingDown, color: "text-red-600", text: change.toString() };
  return { icon: Minus, color: "text-gray-400", text: "—" };
};

const getMedalIcon = (position: number) => {
  if (position === 1) return { icon: Trophy, color: "text-[#D4AF37]", bg: "bg-[#D4AF37]/10" };
  if (position === 2) return { icon: Medal, color: "text-gray-400", bg: "bg-gray-100" };
  if (position === 3) return { icon: Medal, color: "text-orange-400", bg: "bg-orange-100" };
  return null;
};

// ---------------------------------------------
// Component
// ---------------------------------------------
export default function AthleteRankingsPage() {
  const [selectedCategory, setSelectedCategory] = useState("senior");
  const [selectedGender, setSelectedGender] = useState("male");
  const [selectedDiscipline, setSelectedDiscipline] = useState("All Disciplines");

  // Simulate API filter
  const rankings = useMemo(() => {
    return DUMMY_RANKINGS.filter((r) => {
      const matchesCategory = r.category === selectedCategory;
      const matchesGender = r.gender === selectedGender;
      const matchesDiscipline = selectedDiscipline === "All Disciplines" || r.discipline === selectedDiscipline;
      return matchesCategory && matchesGender && matchesDiscipline;
    });
  }, [selectedCategory, selectedGender, selectedDiscipline]);

  const groupedRankings = useMemo(() => {
    return rankings.reduce((acc: Record<string, typeof rankings>, r) => {
      if (!acc[r.discipline]) acc[r.discipline] = [];
      acc[r.discipline].push(r);
      return acc;
    }, {});
  }, [rankings]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] to-white py-12 px-4 pt-32 md:pt-40">
      <div className="main_container mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg mb-8 border border-[#D4AF37]/20">
            <Trophy className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-sm font-semibold bg-gradient-to-r from-[#D4AF37] to-[#B8941F] bg-clip-text text-transparent">
              National Rankings
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-[#2D3436] mb-6 leading-tight">
            Athlete{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] bg-clip-text text-transparent">Rankings</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Official national rankings based on performances in sanctioned competitions
          </p>

          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-2 md:p-6 shadow-lg border border-gray-100">
              <div className="text-base md:text-4xl font-bold text-[#00704A] mb-2">{rankings.length}</div>
              <div className="text-sm text-gray-600">Ranked Athletes</div>
            </div>
            <div className="bg-white rounded-2xl p-2 md:p-6 shadow-lg border border-gray-100">
              <div className="text-base md:text-4xl font-bold text-[#C1272D] mb-2">
                {Object.keys(groupedRankings).length}
              </div>
              <div className="text-sm text-gray-600">Disciplines</div>
            </div>
            <div className="bg-white rounded-2xl p-2 md:p-6 shadow-lg border border-gray-100">
              <div className="text-base md:text-4xl  font-bold text-[#D4AF37] mb-2">2024</div>
              <div className="text-sm text-gray-600">Current Season</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="border-none shadow-xl mb-8 ">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4 ">
              {/* Category */}
              <div className="space-y-2  ">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#00704A]" /> Category
                </label>
                <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                  <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-xl">
                    <TabsTrigger value="senior">Senior</TabsTrigger>
                    <TabsTrigger value="junior">Junior</TabsTrigger>
                    <TabsTrigger value="youth">Youth</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Gender */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#C1272D]" /> Gender
                </label>
                <Tabs value={selectedGender} onValueChange={setSelectedGender}>
                  <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-xl">
                    <TabsTrigger value="male">Men</TabsTrigger>
                    <TabsTrigger value="female">Women</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Discipline */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[#D4AF37]" /> Discipline
                </label>
                <Select value={selectedDiscipline} onValueChange={setSelectedDiscipline}>
                  <SelectTrigger className="!h-11 w-full">
                    <SelectValue placeholder="Select Discipline" />
                  </SelectTrigger>
                  <SelectContent>
                    {DISCIPLINES.map((discipline) => (
                      <SelectItem key={discipline} value={discipline}>
                        {discipline}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rankings */}
        {rankings.length > 0 ? (
          <div className="space-y-8">
            {Object.entries(groupedRankings).map(([discipline, athletes]) => (
              <div key={discipline}>
                <div className="flex items-center gap-3 mb-4">
                  <Trophy className="w-6 h-6 text-[#D4AF37]" />
                  <h2 className="text-2xl font-bold text-[#2D3436]">{discipline}</h2>
                  <Badge variant="outline" className="border-[#00704A] text-[#00704A]">
                    {athletes.length} athletes
                  </Badge>
                </div>

                <div className="space-y-3">
                  {athletes.map((athlete) => {
                    const rankChange = getRankChange(athlete.ranking_position, athlete.previous_rank);
                    const RankIcon = rankChange.icon;
                    const medal = getMedalIcon(athlete.ranking_position);

                    return (
                      <Card
                        key={athlete.id}
                        className={`border-none shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                          athlete.ranking_position === 1
                            ? "ring-2 ring-[#D4AF37]"
                            : athlete.ranking_position === 2
                            ? "ring-2 ring-gray-400"
                            : athlete.ranking_position === 3
                            ? "ring-2 ring-orange-400"
                            : ""
                        }`}
                      >
                        <CardContent className="p-6">
                          <div className="flex flex-col md:flex-row items-start gap-6">
                            <div className="flex flex-row md:flex-col items-start justify-start gap-6">
                              {/* Rank */}
                              <div className="flex flex-col items-center gap-2">
                                <div
                                  className={`w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl shadow-lg ${
                                    athlete.ranking_position === 1
                                      ? "bg-gradient-to-br from-[#D4AF37] to-[#B8941F] text-white"
                                      : athlete.ranking_position === 2
                                      ? "bg-gradient-to-br from-gray-400 to-gray-500 text-white"
                                      : athlete.ranking_position === 3
                                      ? "bg-gradient-to-br from-orange-400 to-orange-500 text-white"
                                      : "bg-white border-2 border-gray-200 text-[#2D3436]"
                                  }`}
                                >
                                  {athlete.ranking_position}
                                </div>
                                <div className={`flex items-center gap-1 text-xs ${rankChange.color}`}>
                                  <RankIcon className="w-3 h-3" />
                                  <span className="font-semibold">{rankChange.text}</span>
                                </div>
                              </div>

                              {/* Photo */}
                              <div className="w-20 h-20 rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
                                {athlete.photo_url ? (
                                  <img
                                    src={athlete.photo_url}
                                    alt={athlete.athlete_name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-400">
                                    {athlete.athlete_name?.charAt(0)}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1 w-full">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h3 className="text-xl font-bold text-[#2D3436] mb-1">{athlete.athlete_name}</h3>
                                  <div className="flex flex-wrap gap-2">
                                    <Badge className={categoryColors[athlete.category]}>{athlete.category}</Badge>
                                    {athlete.team && (
                                      <Badge variant="outline" className="border-[#00704A] text-[#00704A]">
                                        {athlete.team}
                                      </Badge>
                                    )}
                                  </div>
                                </div>

                                {medal && (
                                  <div className={`${medal.bg} p-3 rounded-xl`}>
                                    <medal.icon className={`w-8 h-8 ${medal.color}`} />
                                  </div>
                                )}
                              </div>

                              <div className="grid md:grid-cols-3 gap-4 mt-4">
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <Target className="w-4 h-4 text-[#00704A]" />
                                  <div>
                                    <div className="text-xs text-gray-500">Best Performance</div>
                                    <div className="font-bold text-[#00704A]">{athlete.best_performance}</div>
                                  </div>
                                </div>

                                {athlete.performance_date && (
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <Calendar className="w-4 h-4 text-[#C1272D]" />
                                    <div>
                                      <div className="text-xs text-gray-500">Date</div>
                                      <div className="font-semibold">
                                        {format(new Date(athlete.performance_date), "MMM d, yyyy")}
                                      </div>
                                    </div>
                                  </div>
                                )}

                                {athlete.venue && (
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <MapPin className="w-4 h-4 text-[#D4AF37]" />
                                    <div>
                                      <div className="text-xs text-gray-500">Venue</div>
                                      <div className="font-semibold">{athlete.venue}</div>
                                    </div>
                                  </div>
                                )}
                              </div>

                              {athlete.points && (
                                <div className="mt-3 flex items-center gap-2">
                                  <Award className="w-4 h-4 text-[#D4AF37]" />
                                  <span className="text-sm font-semibold text-gray-700">
                                    {athlete.points} ranking points
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Card className="border-none shadow-lg">
            <CardContent className="p-16 text-center">
              <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-2">No rankings found</p>
              <p className="text-sm text-gray-500">Try adjusting your filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
