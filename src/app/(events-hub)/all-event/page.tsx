"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import {
  Calendar,
  MapPin,
  Users,
  Trophy,
  Search,
  Clock,
  Radio,
  ArrowRight,
  Flame,
  Target,
  Globe,
  X,
  Filter,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import DynamicHeading from "@/components/Home/HeadingComponent";

const eventTypeInfo = {
  track: { label: "Track Events", icon: Flame, color: "bg-red-100 text-red-800" },
  field: { label: "Field Events", icon: Target, color: "bg-blue-100 text-blue-800" },
  combined: { label: "Combined Events", icon: Trophy, color: "bg-purple-100 text-purple-800" },
  cross_country: { label: "Cross Country", icon: Globe, color: "bg-green-100 text-green-800" },
  road_running: { label: "Road Running", icon: Clock, color: "bg-yellow-100 text-yellow-800" },
  race_walking: { label: "Race Walking", icon: Users, color: "bg-pink-100 text-pink-800" },
};

// 🧩 Dummy Data
const dummyEvents = [
  {
    id: 1,
    title: "National Sprint Championship",
    event_type: "track",
    status: "upcoming",
    event_date: "2025-11-10",
    end_date: "2025-11-12",
    location: "Dhaka Stadium, Bangladesh",
    image_url: "https://via.placeholder.com/400x200?text=National+Sprint+Championship",
    description: "Compete with the best athletes nationwide in sprint events of 100m, 200m and 400m.",
    is_international: false,
    live_stream_url: null,
    max_participants: 100,
    current_participants: 40,
    category: "National",
    disciplines: ["100m", "200m", "400m"],
  },
  {
    id: 2,
    title: "Asian Field Meet 2025",
    event_type: "field",
    status: "ongoing",
    event_date: "2025-11-01",
    end_date: "2025-11-06",
    location: "Singapore Sports Hub",
    image_url: "https://via.placeholder.com/400x200?text=Asian+Field+Meet+2025",
    description: "Top Asian athletes compete for glory in long jump, high jump, shot put and javelin.",
    is_international: true,
    live_stream_url: "https://example.com/live/asian-field",
    max_participants: 150,
    current_participants: 130,
    category: "International",
    disciplines: ["Long Jump", "High Jump", "Shot Put", "Javelin"],
  },
  {
    id: 3,
    title: "Marathon Classic 2025",
    event_type: "road_running",
    status: "completed",
    event_date: "2025-09-20",
    end_date: "2025-09-20",
    location: "Chittagong, Bangladesh",
    image_url: "https://via.placeholder.com/400x200?text=Marathon+Classic+2025",
    description: "A thrilling 42km race through the scenic city of Chittagong with local and regional runners.",
    is_international: false,
    live_stream_url: null,
    max_participants: 200,
    current_participants: 200,
    category: "Regional",
    disciplines: ["Marathon"],
  },
  {
    id: 4,
    title: "Cross Country Challenge",
    event_type: "cross_country",
    status: "upcoming",
    event_date: "2025-12-05",
    end_date: "2025-12-07",
    location: "Sylhet Hills, Bangladesh",
    image_url: "https://via.placeholder.com/400x200?text=Cross+Country+Challenge",
    description: "Test your endurance across undulating terrain in the Sylhet hills.",
    is_international: false,
    live_stream_url: null,
    max_participants: 80,
    current_participants: 10,
    category: "National",
    disciplines: ["10km", "15km"],
  },
  {
    id: 5,
    title: "Race Walking Grand Prix",
    event_type: "race_walking",
    status: "upcoming",
    event_date: "2026-01-15",
    end_date: "2026-01-15",
    location: "Kathmandu, Nepal",
    image_url: "https://via.placeholder.com/400x200?text=Race+Walking+GP",
    description: "International race walking event through city streets in Kathmandu.",
    is_international: true,
    live_stream_url: null,
    max_participants: 120,
    current_participants: 25,
    category: "International",
    disciplines: ["20km Walk", "50km Walk"],
  },
  {
    id: 6,
    title: "Youth Athletics Festival",
    event_type: "track",
    status: "ongoing",
    event_date: "2025-11-03",
    end_date: "2025-11-04",
    location: "Kolkata, India",
    image_url: "https://via.placeholder.com/400x200?text=Youth+Athletics+Festival",
    description: "Bringing together youth athletes under 18 for a multi-sport track and field competition.",
    is_international: false,
    live_stream_url: "https://example.com/live/youthfestival",
    max_participants: 90,
    current_participants: 60,
    category: "Youth",
    disciplines: ["100m", "200m", "400m", "Relay"],
  },
  {
    id: 7,
    title: "Global Combined Events Championship",
    event_type: "combined",
    status: "upcoming",
    event_date: "2026-02-10",
    end_date: "2026-02-12",
    location: "Tokyo, Japan",
    image_url: "https://via.placeholder.com/400x200?text=Global+Combined+Championship",
    description: "Heptathlon & Decathlon global championship featuring all-round athletes from around the world.",
    is_international: true,
    live_stream_url: null,
    max_participants: 80,
    current_participants: 12,
    category: "Global",
    disciplines: ["Heptathlon", "Decathlon"],
  },
  {
    id: 8,
    title: "Bangladesh Field Games Meet",
    event_type: "field",
    status: "completed",
    event_date: "2025-08-14",
    end_date: "2025-08-16",
    location: "Rajshahi, Bangladesh",
    image_url: "https://via.placeholder.com/400x200?text=Bangladesh+Field+Games+Meet",
    description: "Domestic field meet focusing on long jump, triple jump, discus & shot put.",
    is_international: false,
    live_stream_url: null,
    max_participants: 150,
    current_participants: 149,
    category: "National",
    disciplines: ["Triple Jump", "Discus", "Shot Put"],
  },
  {
    id: 9,
    title: "City Road Race Dhaka",
    event_type: "road_running",
    status: "upcoming",
    event_date: "2026-03-08",
    end_date: "2026-03-08",
    location: "Dhaka, Bangladesh",
    image_url: "https://via.placeholder.com/400x200?text=City+Road+Race+Dhaka",
    description: "Open road race in Dhaka for 10km & 21km categories. Both local and international runners welcome.",
    is_international: true,
    live_stream_url: null,
    max_participants: 300,
    current_participants: 45,
    category: "Open",
    disciplines: ["10km", "Half Marathon"],
  },
  {
    id: 10,
    title: "Indoor Athletics Invitational",
    event_type: "track",
    status: "completed",
    event_date: "2025-10-01",
    end_date: "2025-10-02",
    location: "Doha, Qatar",
    image_url: "https://via.placeholder.com/400x200?text=Indoor+Athletics+Invitational",
    description: "Elite indoor meet under roof featuring sprint and middle distance races.",
    is_international: true,
    live_stream_url: null,
    max_participants: 60,
    current_participants: 60,
    category: "Elite",
    disciplines: ["60m", "400m", "800m"],
  },
  {
    id: 11,
    title: "Women’s Road Running Championship",
    event_type: "road_running",
    status: "upcoming",
    event_date: "2026-05-21",
    end_date: "2026-05-21",
    location: "Lahore, Pakistan",
    image_url: "https://via.placeholder.com/400x200?text=Womens+Road+Running+Championship",
    description: "Women-only open road running race covering 21km and 42km distances.",
    is_international: false,
    live_stream_url: null,
    max_participants: 150,
    current_participants: 22,
    category: "Women",
    disciplines: ["Half Marathon", "Marathon"],
  },
  {
    id: 12,
    title: "South Asian Race Walking Series",
    event_type: "race_walking",
    status: "completed",
    event_date: "2025-07-18",
    end_date: "2025-07-18",
    location: "Kathmandu, Nepal",
    image_url: "https://via.placeholder.com/400x200?text=SARWS+2025",
    description: "South Asian country-level race-walking series featuring 20km and 50km walks.",
    is_international: true,
    live_stream_url: null,
    max_participants: 110,
    current_participants: 110,
    category: "Regional",
    disciplines: ["20km Walk", "50km Walk"],
  },
  {
    id: 13,
    title: "Collegiate Athletics Classic",
    event_type: "combined",
    status: "ongoing",
    event_date: "2025-11-04",
    end_date: "2025-11-05",
    location: "Bangalore, India",
    image_url: "https://via.placeholder.com/400x200?text=Collegiate+Athletics+Classic",
    description: "College athletes from across India compete in heptathlon and decathlon events.",
    is_international: false,
    live_stream_url: "https://example.com/live/collegiate",
    max_participants: 70,
    current_participants: 45,
    category: "College",
    disciplines: ["Heptathlon", "Decathlon"],
  },
  {
    id: 14,
    title: "Green City Cross Country",
    event_type: "cross_country",
    status: "completed",
    event_date: "2025-06-11",
    end_date: "2025-06-11",
    location: "Kandy, Sri Lanka",
    image_url: "https://via.placeholder.com/400x200?text=Green+City+Cross+Country",
    description: "Cross country race in scenic terrain of Kandy for 8km and 12km categories.",
    is_international: false,
    live_stream_url: null,
    max_participants: 90,
    current_participants: 89,
    category: "Regional",
    disciplines: ["8km", "12km"],
  },
  {
    id: 15,
    title: "Champions Field Invitational",
    event_type: "field",
    status: "upcoming",
    event_date: "2026-04-20",
    end_date: "2026-04-22",
    location: "Beijing, China",
    image_url: "https://via.placeholder.com/400x200?text=Champions+Field+Invitational",
    description: "Elite field competition for long jump, pole vault, hammer throw and discus.",
    is_international: true,
    live_stream_url: null,
    max_participants: 130,
    current_participants: 14,
    category: "Elite",
    disciplines: ["Pole Vault", "Hammer Throw", "Discus", "Long Jump"],
  },
  {
    id: 16,
    title: "Urban 10K Night Run",
    event_type: "road_running",
    status: "upcoming",
    event_date: "2026-01-08",
    end_date: "2026-01-08",
    location: "Jakarta, Indonesia",
    image_url: "https://via.placeholder.com/400x200?text=Urban+10K+Night+Run",
    description: "Night run through the cityscape of Jakarta under lights and music for 10K participants.",
    is_international: true,
    live_stream_url: null,
    max_participants: 500,
    current_participants: 78,
    category: "Open",
    disciplines: ["10km Night Run"],
  },
  {
    id: 17,
    title: "Masters Athletics Festival",
    event_type: "track",
    status: "completed",
    event_date: "2025-05-15",
    end_date: "2025-05-17",
    location: "Sydney, Australia",
    image_url: "https://via.placeholder.com/400x200?text=Masters+Athletics+Festival",
    description: "Masters athletes (age 35+) compete in track and field events over three days.",
    is_international: true,
    live_stream_url: null,
    max_participants: 140,
    current_participants: 140,
    category: "Masters",
    disciplines: ["100m", "400m", "1500m"],
  },
  {
    id: 18,
    title: "National Heptathlon Championship",
    event_type: "combined",
    status: "ongoing",
    event_date: "2025-11-04",
    end_date: "2025-11-06",
    location: "Hyderabad, India",
    image_url: "https://via.placeholder.com/400x200?text=National+Heptathlon+Championship",
    description: "Homegrown heptathlon athletes fight for the national title in an intense multi-discipline format.",
    is_international: false,
    live_stream_url: "https://example.com/live/heptathlon",
    max_participants: 60,
    current_participants: 35,
    category: "National",
    disciplines: ["Heptathlon"],
  },
  {
    id: 19,
    title: "Beach Running Festival",
    event_type: "road_running",
    status: "upcoming",
    event_date: "2026-02-28",
    end_date: "2026-03-01",
    location: "Phuket, Thailand",
    image_url: "https://via.placeholder.com/400x200?text=Beach+Running+Festival",
    description: "Run across sandy beaches and seaside roads in a fun run festival format.",
    is_international: true,
    live_stream_url: null,
    max_participants: 300,
    current_participants: 23,
    category: "FunRun",
    disciplines: ["5km Beach Run", "10km Beach Run"],
  },
  {
    id: 20,
    title: "Indoor Field Games Arena",
    event_type: "field",
    status: "completed",
    event_date: "2025-04-09",
    end_date: "2025-04-11",
    location: "Vienna, Austria",
    image_url: "https://via.placeholder.com/400x200?text=Indoor+Field+Games+Arena",
    description: "Indoor venue field events in winter season: shot put, indoor javelin and long jump.",
    is_international: true,
    live_stream_url: null,
    max_participants: 100,
    current_participants: 100,
    category: "WinterSeries",
    disciplines: ["Shot Put", "Indoor Javelin", "Long Jump"],
  },
  {
    id: 21,
    title: "City Relay Championships",
    event_type: "track",
    status: "upcoming",
    event_date: "2026-06-12",
    end_date: "2026-06-12",
    location: "Kuala Lumpur, Malaysia",
    image_url: "https://via.placeholder.com/400x200?text=City+Relay+Championships",
    description: "Teams from across cities compete in 4×100m and 4×400m relays in an exciting city stadium setting.",
    is_international: true,
    live_stream_url: null,
    max_participants: 120,
    current_participants: 16,
    category: "CityTeams",
    disciplines: ["4×100m", "4×400m"],
  },
  {
    id: 22,
    title: "Northern Region Cross Country Cup",
    event_type: "cross_country",
    status: "completed",
    event_date: "2025-03-22",
    end_date: "2025-03-22",
    location: "Kathmandu Valley, Nepal",
    image_url: "https://via.placeholder.com/400x200?text=Northern+Region+Cross+Country+Cup",
    description: "Regional terrain challenge for cross country with hilly trails in Kathmandu Valley.",
    is_international: false,
    live_stream_url: null,
    max_participants: 70,
    current_participants: 70,
    category: "Regional",
    disciplines: ["10km Trail", "15km Trail"],
  },
  {
    id: 23,
    title: "Spring Throws Open",
    event_type: "field",
    status: "upcoming",
    event_date: "2026-03-18",
    end_date: "2026-03-19",
    location: "Moscow, Russia",
    image_url: "https://via.placeholder.com/400x200?text=Spring+Throws+Open",
    description: "Throwing disciplines meet featuring hammer, discus & javelin in a spring open format.",
    is_international: true,
    live_stream_url: null,
    max_participants: 90,
    current_participants: 8,
    category: "Open",
    disciplines: ["Hammer Throw", "Discus", "Javelin"],
  },
  {
    id: 24,
    title: "All-Africa Road Running Festival",
    event_type: "road_running",
    status: "upcoming",
    event_date: "2026-04-04",
    end_date: "2026-04-04",
    location: "Nairobi, Kenya",
    image_url: "https://via.placeholder.com/400x200?text=All-Africa+Road+Running+Festival",
    description: "Continental open road running festival for thousands of participants including elite Africans.",
    is_international: true,
    live_stream_url: null,
    max_participants: 1000,
    current_participants: 120,
    category: "Continental",
    disciplines: ["10km", "Half Marathon", "Marathon"],
  },
  {
    id: 25,
    title: "Junior Race Walking Nationals",
    event_type: "race_walking",
    status: "completed",
    event_date: "2025-02-20",
    end_date: "2025-02-20",
    location: "Lagos, Nigeria",
    image_url: "https://via.placeholder.com/400x200?text=Junior+Race+Walking+Nationals",
    description: "Junior (under-20) race walking competition at a national level.",
    is_international: false,
    live_stream_url: null,
    max_participants: 60,
    current_participants: 60,
    category: "Youth",
    disciplines: ["10km Walk"],
  },
  {
    id: 26,
    title: "World Masters Field Championships",
    event_type: "field",
    status: "upcoming",
    event_date: "2026-07-22",
    end_date: "2026-07-24",
    location: "London, UK",
    image_url: "https://via.placeholder.com/400x200?text=World+Masters+Field+Championships",
    description:
      "Masters field event for athletes aged 35+ from around the world competing in all major throws and jumps.",
    is_international: true,
    live_stream_url: null,
    max_participants: 300,
    current_participants: 22,
    category: "Masters",
    disciplines: ["Jumps", "Throws"],
  },
  {
    id: 27,
    title: "City Night Marathon",
    event_type: "road_running",
    status: "upcoming",
    event_date: "2026-08-15",
    end_date: "2026-08-15",
    location: "Berlin, Germany",
    image_url: "https://via.placeholder.com/400x200?text=City+Night+Marathon+Berlin",
    description:
      "Night-time city marathon with festive atmosphere, live music along the route and international runners.",
    is_international: true,
    live_stream_url: null,
    max_participants: 600,
    current_participants: 18,
    category: "Open",
    disciplines: ["Marathon"],
  },
  {
    id: 28,
    title: "South Pacific Combined Events Cup",
    event_type: "combined",
    status: "completed",
    event_date: "2025-12-13",
    end_date: "2025-12-15",
    location: "Auckland, New Zealand",
    image_url: "https://via.placeholder.com/400x200?text=South+Pacific+Combined+Events+Cup",
    description: "Combined events cup for heptathlon and decathlon across South Pacific countries.",
    is_international: true,
    live_stream_url: null,
    max_participants: 50,
    current_participants: 50,
    category: "Regional",
    disciplines: ["Heptathlon", "Decathlon"],
  },
  {
    id: 29,
    title: "Mid-Season Indoor Track Meet",
    event_type: "track",
    status: "ongoing",
    event_date: "2025-11-04",
    end_date: "2025-11-04",
    location: "Madrid, Spain",
    image_url: "https://via.placeholder.com/400x200?text=Mid+Season+Indoor+Track+Meet",
    description: "Indoor track meet for sprints, hurdles and middle-distance events during mid-season break.",
    is_international: true,
    live_stream_url: "https://example.com/live/indoortrack",
    max_participants: 80,
    current_participants: 55,
    category: "Indoor",
    disciplines: ["60m", "110m Hurdles", "800m"],
  },
  {
    id: 30,
    title: "Global Road Running Championships",
    event_type: "road_running",
    status: "upcoming",
    event_date: "2026-10-10",
    end_date: "2026-10-11",
    location: "New York City, USA",
    image_url: "https://via.placeholder.com/400x200?text=Global+Road+Running+Championships",
    description: "Premier global road running championships with elites and amateurs over multiple distances.",
    is_international: true,
    live_stream_url: null,
    max_participants: 2000,
    current_participants: 350,
    category: "Global",
    disciplines: ["5km", "10km", "Half Marathon", "Marathon"],
  },
];

export default function EventsPage() {
  const router = useRouter();
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  // Filtered data
  const events = useMemo(() => {
    if (filter === "all") return dummyEvents;
    return dummyEvents.filter((e) => e.status === filter);
  }, [filter]);

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesSearch =
        searchQuery === "" ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === "all" || event.event_type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [events, searchQuery, selectedType]);

  const liveEvents = dummyEvents.filter((e) => e.status === "ongoing" && e.live_stream_url);
  const upcomingCount = dummyEvents.filter((e) => e.status === "upcoming").length;
  const ongoingCount = dummyEvents.filter((e) => e.status === "ongoing").length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] to-white py-12 px-4 pt-40">
      <div className="main_container mx-auto">
        {/* 🌟 Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg mb-8 border border-[#00704A]/10">
            <Trophy className="w-5 h-5 text-[#00704A]" />
            <span className="text-sm font-semibold bg-gradient-to-r from-[#00704A] to-[#005239] bg-clip-text text-transparent">
              Compete & Excel
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-[#2D3436] mb-6 leading-tight">
            Events &{" "}
            <span className="bg-gradient-to-r from-[#00704A] to-[#005239] bg-clip-text text-transparent bg-clip-text text-transparent">
              Competitions
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Participate in national and international athletics competitions
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-4xl font-bold text-[#00704A] mb-2">{upcomingCount}</div>
              <div className="text-sm text-gray-600">Upcoming Events</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-4xl font-bold text-[#C1272D] mb-2">{ongoingCount}</div>
              <div className="text-sm text-gray-600">Live Now</div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
              <div className="text-4xl font-bold text-[#D4AF37] mb-2">{dummyEvents.length}</div>
              <div className="text-sm text-gray-600">Total Events</div>
            </div>
          </div>
        </div>

        {/* 🔴 Live Events Banner */}
        {liveEvents.length > 0 && (
          <Card className="mb-8 border-none shadow-xl bg-gradient-to-r from-[#C1272D] to-[#A01F25] text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            <CardContent className="p-6 relative z-10">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Radio className="w-8 h-8" />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Live Events Now!</h3>
                    <p className="text-white/90 text-sm">
                      {liveEvents.length} event(s) currently in progress with live streaming
                    </p>
                  </div>
                </div>
                <Button
                  variant="black"
                  type="button"
                  className="bg-white text-[#C1272D] hover:bg-gray-100"
                  //   onClick={() => window.open(liveEvents[0].live_stream_url, "_blank")}
                >
                  Watch Live
                  <Radio className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 🔍 Search & Filters */}
        <Card className="mb-8 border-none shadow-xl">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search events by name, location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-lg border-gray-200 focus:border-[#00704A]"
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

              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="h-12 px-4 border-2 border-gray-200 rounded-lg focus:border-[#00704A] focus:outline-none"
                >
                  <option value="all">All Types</option>
                  {Object.entries(eventTypeInfo).map(([key, info]) => (
                    <option key={key} value={key}>
                      {info.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 🏷️ Event Type Quick Filter */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {Object.entries(eventTypeInfo).map(([key, info]) => {
            const Icon = info.icon;
            const count = dummyEvents.filter((e) => e.event_type === key).length;
            return (
              <button
                key={key}
                onClick={() => setSelectedType(selectedType === key ? "all" : key)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  selectedType === key
                    ? "border-[#00704A] bg-[#00704A]/5 shadow-lg"
                    : "border-gray-200 hover:border-[#00704A]/30 bg-white"
                }`}
              >
                <Icon className="w-6 h-6 text-[#00704A] mb-2" />
                <p className="font-semibold text-sm text-[#2D3436]">{info.label}</p>
                <p className="text-xs text-gray-500">{count} events</p>
              </button>
            );
          })}
        </div>

        {/* 🗂️ Tabs */}
        <Tabs defaultValue="all" onValueChange={setFilter} className="mb-8">
          <TabsList className="grid w-full md:w-auto grid-cols-4 bg-white border border-gray-200 p-1 rounded-xl shadow-lg">
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="ongoing">Live</TabsTrigger>
            <TabsTrigger value="completed">Past</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* 🎯 Events Grid */}
        {filteredEvents.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => {
              const typeInfo = eventTypeInfo[event.event_type];
              const Icon = typeInfo?.icon || Trophy;

              return (
                <Card
                  key={event.id}
                  className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group cursor-pointer"
                >
                  <div
                    className={`h-48 relative overflow-hidden ${
                      event.status === "ongoing"
                        ? "bg-gradient-to-br from-[#C1272D] to-[#A01F25]"
                        : event.status === "completed"
                        ? "bg-gradient-to-br from-gray-600 to-gray-800"
                        : "bg-gradient-to-br from-[#00704A] to-[#005239]"
                    }`}
                  >
                    {event.image_url && (
                      <>
                        <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40" />
                      </>
                    )}

                    <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                      <Badge variant="outline" className={`${typeInfo?.color} border-none shadow-lg`}>
                        {typeInfo?.label}
                      </Badge>
                      {event.is_international && (
                        <Badge variant="outline" className="bg-[#D4AF37] text-white border-none shadow-lg">
                          <Globe className="w-3 h-3 mr-1" />
                          International
                        </Badge>
                      )}
                      {event.status === "ongoing" && (
                        <Badge
                          variant="outline"
                          className="bg-[#C1272D] text-white border-none shadow-lg animate-pulse"
                        >
                          <Radio className="w-3 h-3 mr-1" />
                          LIVE
                        </Badge>
                      )}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-2xl font-bold text-white line-clamp-2">{event.title}</h3>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Calendar className="w-5 h-5 text-[#00704A]" />
                      <span>
                        {format(new Date(event.event_date), "MMMM d, yyyy")}
                        {event.end_date && ` - ${format(new Date(event.end_date), "MMM d")}`}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-gray-600">
                      <MapPin className="w-5 h-5 text-[#C1272D]" />
                      <span>{event.location}</span>
                    </div>

                    {event.max_participants && (
                      <div className="flex items-center gap-3 text-gray-600">
                        <Users className="w-5 h-5 text-[#D4AF37]" />
                        <span>
                          {event.current_participants || 0} / {event.max_participants} registered
                        </span>
                      </div>
                    )}

                    <p className="text-gray-600 text-sm line-clamp-2 pt-2 border-t border-gray-100">
                      {event.description}
                    </p>

                    <div className="flex gap-2 pt-4">
                      {event.status === "upcoming" && (
                        <Button
                          onClick={() => router.push(`/events/${event.id}`)}
                          className="flex-1 bg-gradient-to-r from-[#00704A] to-[#005239] hover:from-[#005239] hover:to-[#00704A] text-white"
                        >
                          Register Now
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      )}
                      {event.status === "ongoing" && event.live_stream_url && (
                        <Button
                          onClick={() => window.open(event.live_stream_url, "_blank")}
                          className="flex-1 bg-gradient-to-r from-[#C1272D] to-[#A01F25] hover:from-[#A01F25] hover:to-[#C1272D] text-white"
                        >
                          <Radio className="mr-2 w-4 h-4" />
                          Watch Live
                        </Button>
                      )}
                      {event.status === "completed" && (
                        <Button onClick={() => router.push(`/events/${event.id}`)} variant="black" className="flex-1">
                          View Results
                        </Button>
                      )}
                      <Button
                        onClick={() => router.push(`/events/${event.id}`)}
                        variant="black"
                        className={`${event.status !== "completed" && "flex-1 w-full"}`}
                      >
                        Details
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      <Badge variant="outline" className="!border-[#00704A] !text-[#00704A]">
                        {event.category}
                      </Badge>
                      {event.disciplines && event.disciplines.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {event.disciplines.length} disciplines
                        </Badge>
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
              <p className="text-gray-600 text-lg mb-2">No events found</p>
              <p className="text-sm text-gray-500">Try adjusting your filters or search query</p>
            </CardContent>
          </Card>
        )}

        {/* 📜 View Archive */}
        <div className="mt-12 text-center">
          <Button
            variant="black"
            onClick={() => router.push("/events/archive")}
            className="border-2 border-[#00704A] text-[#00704A] hover:bg-[#00704A] hover:text-white"
          >
            View Past Event Results & Archive
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
