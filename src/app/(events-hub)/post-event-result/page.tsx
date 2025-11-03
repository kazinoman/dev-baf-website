"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Calendar, MapPin, Search, Medal, X, Download, Eye } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function EventResultsPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [yearFilter, setYearFilter] = useState("all");

  // 🧩 Dummy Events Data (10 entries)
  const dummyEvents = [
    {
      id: 1,
      title: "Dhaka City Marathon",
      location: "Dhaka, Bangladesh",
      event_type: "marathon",
      event_date: "2024-02-12",
      status: "completed",
      results_url: "#",
      results: [
        { athlete_name: "Shakil Ahmed", position: 1, time_or_distance: "2:21:34" },
        { athlete_name: "Rafi Khan", position: 2, time_or_distance: "2:25:19" },
        { athlete_name: "Milon Hossain", position: 3, time_or_distance: "2:28:10" },
      ],
    },
    {
      id: 2,
      title: "Chittagong Trail Run",
      location: "Chittagong Hill Tracts",
      event_type: "trail_run",
      event_date: "2024-05-06",
      status: "completed",
      results_url: "#",
      results: [
        { athlete_name: "Nayeem Islam", position: 1, time_or_distance: "1:45:12" },
        { athlete_name: "Mim Rahman", position: 2, time_or_distance: "1:49:27" },
        { athlete_name: "Jubair Alam", position: 3, time_or_distance: "1:52:40" },
      ],
    },
    {
      id: 3,
      title: "Sylhet Night Run",
      location: "Sylhet",
      event_type: "night_run",
      event_date: "2023-09-18",
      status: "completed",
      results_url: "#",
      results: [],
    },
    {
      id: 4,
      title: "Cox’s Bazar Beach Sprint",
      location: "Cox’s Bazar",
      event_type: "sprint",
      event_date: "2023-12-05",
      status: "completed",
      results_url: "#",
      results: [
        { athlete_name: "Sadia Jahan", position: 1, time_or_distance: "11.2s" },
        { athlete_name: "Rana Hasan", position: 2, time_or_distance: "11.4s" },
        { athlete_name: "Sabbir Rahman", position: 3, time_or_distance: "11.6s" },
      ],
    },
    {
      id: 5,
      title: "Barishal Charity Marathon",
      location: "Barishal",
      event_type: "marathon",
      event_date: "2024-08-14",
      status: "completed",
      results_url: "#",
      results: [],
    },
    {
      id: 6,
      title: "Rajshahi Half Marathon",
      location: "Rajshahi",
      event_type: "half_marathon",
      event_date: "2023-03-21",
      status: "completed",
      results_url: "#",
      results: [
        { athlete_name: "Hasan Ali", position: 1, time_or_distance: "1:07:12" },
        { athlete_name: "Emon Islam", position: 2, time_or_distance: "1:09:50" },
        { athlete_name: "Mehedi Hasan", position: 3, time_or_distance: "1:12:11" },
      ],
    },
    {
      id: 7,
      title: "Khulna Fun Run",
      location: "Khulna",
      event_type: "fun_run",
      event_date: "2022-11-10",
      status: "completed",
      results_url: "#",
      results: [],
    },
    {
      id: 8,
      title: "Comilla Speed Challenge",
      location: "Comilla",
      event_type: "speed_run",
      event_date: "2022-07-19",
      status: "completed",
      results_url: "#",
      results: [
        { athlete_name: "Jahidul Islam", position: 1, time_or_distance: "9.9s" },
        { athlete_name: "Rony Akter", position: 2, time_or_distance: "10.2s" },
      ],
    },
    {
      id: 9,
      title: "Gazipur Forest Trail",
      location: "Gazipur",
      event_type: "trail_run",
      event_date: "2023-06-30",
      status: "completed",
      results_url: "#",
      results: [
        { athlete_name: "Anika Rahman", position: 1, time_or_distance: "2:01:45" },
        { athlete_name: "Tanvir Islam", position: 2, time_or_distance: "2:04:18" },
        { athlete_name: "Bashir Ahmed", position: 3, time_or_distance: "2:07:55" },
      ],
    },
    {
      id: 10,
      title: "Mymensingh City Dash",
      location: "Mymensingh",
      event_type: "city_run",
      event_date: "2024-10-10",
      status: "completed",
      results_url: "#",
      results: [],
    },
  ];

  // 🔍 Filtering
  const filteredEvents = dummyEvents.filter((event) => {
    const matchesSearch =
      searchQuery === "" ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());

    const eventYear = new Date(event.event_date).getFullYear().toString();
    const matchesYear = yearFilter === "all" || eventYear === yearFilter;

    return matchesSearch && matchesYear;
  });

  const years = [...new Set(dummyEvents.map((e) => new Date(e.event_date).getFullYear()))].sort((a, b) => b - a);

  const eventsWithResults = filteredEvents.filter((e) => e.results && e.results.length > 0);
  const totalMedals = eventsWithResults.reduce(
    (sum, e) => sum + (e.results?.filter((r) => r.position <= 3).length || 0),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] to-white py-12 px-4 pt-40">
      <div className="main_container mx-auto">
        {/* 🎖️ Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg mb-8 border border-[#D4AF37]/20">
            <Trophy className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-sm font-semibold bg-gradient-to-r from-[#D4AF37] to-[#B8941F] bg-clip-text text-transparent">
              Results Archive
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-[#2D3436] mb-6 leading-tight">
            Past Event{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] bg-clip-text text-transparent">Results</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Complete archive of athletics competition results and achievements
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-4xl font-bold text-[#D4AF37] mb-2">{dummyEvents.length}</div>
              <div className="text-sm text-gray-600">Completed Events</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-4xl font-bold text-[#00704A] mb-2">{eventsWithResults.length}</div>
              <div className="text-sm text-gray-600">With Results</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-4xl font-bold text-[#C1272D] mb-2">{totalMedals}</div>
              <div className="text-sm text-gray-600">Total Medals</div>
            </div>
          </div>
        </div>

        {/* 🔍 Search and Filters */}
        <Card className="mb-8 border-none shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search by event name or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-lg border-gray-200 focus:border-[#D4AF37]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              <Tabs value={yearFilter} onValueChange={setYearFilter}>
                <TabsList className="bg-white border border-gray-200">
                  <TabsTrigger value="all">All Years</TabsTrigger>
                  {years.slice(0, 3).map((year) => (
                    <TabsTrigger key={year} value={year.toString()}>
                      {year}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </div>
          </CardContent>
        </Card>

        {/* 🏁 Events List */}
        {filteredEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredEvents.map((event) => {
              const hasResults = event.results && event.results.length > 0;
              const topThree = hasResults ? event.results.filter((r) => r.position <= 3).slice(0, 3) : [];

              return (
                <Card
                  key={event.id}
                  className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
                >
                  <div className="h-32 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20" />
                    <div className="absolute inset-0 flex items-center justify-between px-6">
                      <div>
                        <Badge variant="outline" className="bg-white/20 backdrop-blur-sm text-white border-none mb-2">
                          {event.event_type.replace("_", " ").toUpperCase()}
                        </Badge>
                        <h3 className="text-2xl font-bold text-white line-clamp-2">{event.title}</h3>
                      </div>
                      {hasResults && <Trophy className="w-12 h-12 text-white/30" />}
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#00704A]" />
                        {format(new Date(event.event_date), "MMM d, yyyy")}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#C1272D]" />
                        {event.location}
                      </div>
                    </div>

                    {hasResults ? (
                      <div>
                        <h4 className="font-semibold text-[#2D3436] mb-3 flex items-center gap-2">
                          <Medal className="w-4 h-4 text-[#D4AF37]" />
                          Top Performers
                        </h4>
                        <div className="space-y-2">
                          {topThree.map((r, i) => (
                            <div
                              key={i}
                              className={`flex items-center gap-3 p-2 rounded-lg ${
                                r.position === 1
                                  ? "bg-gradient-to-r from-[#D4AF37]/20"
                                  : r.position === 2
                                  ? "bg-gradient-to-r from-gray-300/20"
                                  : "bg-gradient-to-r from-orange-300/20"
                              }`}
                            >
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                                  r.position === 1 ? "bg-[#D4AF37]" : r.position === 2 ? "bg-gray-400" : "bg-orange-400"
                                } text-white`}
                              >
                                {r.position}
                              </div>
                              <span className="flex-1 text-sm font-medium">{r.athlete_name}</span>
                              <span className="text-sm font-bold text-[#00704A]">{r.time_or_distance}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500">Results not available yet</p>
                      </div>
                    )}

                    <div className="flex gap-2 pt-4 border-t border-gray-100">
                      <Button
                        variant="black"
                        type="button"
                        onClick={() => router.push(`/events/${event.id}`)}
                        className="flex-1 bg-gradient-to-r from-[#00704A] to-[#005239] text-white"
                      >
                        <Eye className="mr-2 w-4 h-4" />
                        View Details
                      </Button>
                      {hasResults && event.results_url && (
                        <Button variant="black">
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card className="border-none shadow-lg">
            <CardContent className="p-16 text-center">
              <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-2">No results found</p>
              <p className="text-sm text-gray-500">Try adjusting your filters or search query</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
