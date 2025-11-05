"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Trophy,
  Clock,
  Globe,
  DollarSign,
  CheckCircle,
  Radio,
  Award,
  Target,
  AlertCircle,
  Download,
  Share2,
  Mail,
  Phone,
  Filter,
} from "lucide-react";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/Badge";

// This is a self-contained Next.js 15 page (client component) using only TailwindCSS and dummy data.
// Place this file at: app/events/[id]/page.tsx

export default function EventDetailsPage({ params }: { params?: { id?: string } }) {
  const router = useRouter();
  const eventId = 343;

  // Dummy user (pretend already logged in)
  const dummyUser = {
    id: "user_1",
    full_name: "Md. Demo Athlete",
    email: "athlete@example.com",
    phone: "+8801712345678",
    date_of_birth: "1995-04-10",
    gender: "male",
    team: "Demo Club",
  };

  // Dummy event data (based on the original UI fields)
  const initialEvent = useMemo(
    () => ({
      id: eventId,
      title: "Dhaka City Marathon 2025",
      description:
        "Join the annual Dhaka City Marathon — open to runners of all levels. This event features several race categories, certified timing and medical support.",
      event_type: "road_race",
      category: "marathon",
      is_international: true,
      status: "upcoming", // upcoming | ongoing | completed
      image_url:
        "https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.0.3&s=abcd",
      location: "National Sports Complex, Dhaka",
      event_date: new Date().toISOString().split("T")[0],
      end_date: null,
      registration_deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
      registration_fee: 500,
      max_participants: 500,
      current_participants: 128,
      live_stream_url: "",
      highlights: ["Certified timing by BAF", "Finishers medal for all finishers", "Medical tents along the course"],
      eligibility_criteria: ["Participants must be 16+ years old", "No professional doping athletes allowed"],
      disciplines: ["Full Marathon", "Half Marathon", "10K", "5K Fun Run"],
      schedule: [
        { date: new Date().toISOString(), time: "06:00", activity: "Race Start - 5K" },
        { date: new Date().toISOString(), time: "07:00", activity: "Half Marathon Start" },
        { date: new Date().toISOString(), time: "08:00", activity: "Full Marathon Start" },
      ],
      results: [
        {
          discipline: "Full Marathon",
          athlete_name: "Rahim Uddin",
          position: 1,
          country: "BAN",
          time_or_distance: "2:18:45",
          points: 100,
        },
        {
          discipline: "Full Marathon",
          athlete_name: "Karim Shah",
          position: 2,
          country: "BAN",
          time_or_distance: "2:20:10",
          points: 80,
        },
        {
          discipline: "Half Marathon",
          athlete_name: "Sadia Noor",
          position: 1,
          country: "BAN",
          time_or_distance: "1:12:33",
          points: 100,
        },
        {
          discipline: "10K",
          athlete_name: "Tariq Ahmed",
          position: 1,
          country: "BAN",
          time_or_distance: "00:29:45",
          points: 100,
        },
      ],
      contact_email: "info@dhakamarathon.example",
      contact_phone: "+8801812345678",
      prizes: true,
    }),
    [eventId]
  );

  const [event, setEvent] = useState(initialEvent);
  const [isLoading] = useState(false); // kept for parity with original
  const [showRegistrationDialog, setShowRegistrationDialog] = useState(false);
  const [user, setUser] = useState<typeof dummyUser | null>(dummyUser);
  const [selectedDiscipline, setSelectedDiscipline] = useState("all");
  const [registerPending, setRegisterPending] = useState(false);

  const [registrationData, setRegistrationData] = useState({
    athlete_name: user?.full_name || "",
    athlete_email: user?.email || "",
    athlete_phone: user?.phone || "",
    date_of_birth: user?.date_of_birth || "",
    gender: user?.gender || "",
    team: user?.team || "",
    selected_disciplines: [] as string[],
    emergency_contact: { name: "", phone: "", relationship: "" },
    medical_conditions: "",
    personal_bests: {},
  });

  useEffect(() => {
    // Prefill when user is present (dummy)
    if (user) {
      setRegistrationData((prev) => ({
        ...prev,
        athlete_name: user.full_name || prev.athlete_name,
        athlete_email: user.email || prev.athlete_email,
        athlete_phone: user.phone || prev.athlete_phone,
        date_of_birth: user.date_of_birth || prev.date_of_birth,
        gender: user.gender || prev.gender,
        team: user.team || prev.team,
      }));
    }
  }, [user]);

  // helper: unique disciplines from results
  const uniqueDisciplines = useMemo(() => {
    if (!event.results || event.results.length === 0) return [] as string[];
    const disciplines = Array.from(new Set(event.results.map((r) => r.discipline)));
    return disciplines.sort();
  }, [event]);

  // filtered results
  const filteredResults = useMemo(() => {
    if (!event.results) return [];
    if (selectedDiscipline === "all") return event.results;
    return event.results.filter((r) => r.discipline === selectedDiscipline);
  }, [event, selectedDiscipline]);

  const groupedResults = useMemo(() => {
    return filteredResults.reduce((acc: Record<string, any[]>, result) => {
      if (!acc[result.discipline]) acc[result.discipline] = [];
      acc[result.discipline].push(result);
      return acc;
    }, {} as Record<string, any[]>);
  }, [filteredResults]);

  const spotsLeft = event.max_participants - (event.current_participants || 0);
  const isFull = spotsLeft <= 0;
  const canRegister =
    event.status === "upcoming" &&
    !isFull &&
    (!event.registration_deadline || new Date(event.registration_deadline) > new Date());

  const handleRegister = () => {
    if (!user) {
      // In a real app you'd redirect to login; here we simply show modal and prefill
      setUser(null);
      // For this demo, show registration dialog and allow entering details
      setShowRegistrationDialog(true);
      return;
    }
    setShowRegistrationDialog(true);
  };

  const handleSubmitRegistration = () => {
    // Basic validation
    if (
      !registrationData.athlete_name ||
      !registrationData.athlete_email ||
      registrationData.selected_disciplines.length === 0
    ) {
      alert("Please complete required fields and select at least one discipline.");
      return;
    }

    setRegisterPending(true);
    // simulate async submission
    setTimeout(() => {
      setRegisterPending(false);
      setShowRegistrationDialog(false);
      setEvent((prev) => ({ ...prev, current_participants: (prev.current_participants || 0) + 1 }));
      alert("Registration successful! You will receive a confirmation email shortly.");
    }, 1200);
  };

  const handleDisciplineToggle = (discipline: string) => {
    setRegistrationData((prev) => ({
      ...prev,
      selected_disciplines: prev.selected_disciplines.includes(discipline)
        ? prev.selected_disciplines.filter((d) => d !== discipline)
        : [...prev.selected_disciplines, discipline],
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8F6F3] to-white">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-[#00704A] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8F6F3] to-white">
        <div className="max-w-md w-full border-none shadow-xl bg-white rounded-xl p-12 text-center">
          <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-600 text-lg mb-4">Event not found</p>
          <button
            onClick={() => router.push("/events")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded bg-gray-100"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] to-white py-12 pt-40 px-4">
      <div className="main_container mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.push("/all-event")}
          className="mb-6 inline-flex items-center gap-2 px-3 py-2 rounded bg-white shadow"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Events
        </button>

        {/* Hero Banner */}
        <div className="border-none shadow-2xl overflow-hidden mb-8 rounded-xl">
          <div
            className={`h-80 relative ${
              event.status === "ongoing"
                ? "bg-gradient-to-br from-[#C1272D] to-[#A01F25]"
                : "bg-gradient-to-br from-[#00704A] to-[#005239]"
            }`}
          >
            {event.image_url ? (
              <>
                <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50" />
              </>
            ) : (
              <div className="absolute inset-0 bg-black/20" />
            )}

            <div className="absolute inset-0 flex items-center justify-center px-8">
              <div className="text-center max-w-4xl">
                <div className="flex justify-center gap-3 mb-4 flex-wrap">
                  <span className="bg-white/20 backdrop-blur-sm text-white border-none text-lg px-4 py-2 rounded">
                    {event.event_type.replace("_", " ").toUpperCase()}
                  </span>
                  <span className="bg-white/20 backdrop-blur-sm text-white border-none text-lg px-4 py-2 rounded">
                    {event.category.toUpperCase()}
                  </span>
                  {event.is_international && (
                    <span className="bg-[#D4AF37] text-white border-none text-lg px-4 py-2 rounded inline-flex items-center gap-1">
                      <Globe className="w-4 h-4" /> INTERNATIONAL
                    </span>
                  )}
                  {event.status === "ongoing" && (
                    <span className="bg-[#C1272D] text-white border-none text-lg px-4 py-2 rounded animate-pulse inline-flex items-center gap-1">
                      <Radio className="w-4 h-4" /> LIVE NOW
                    </span>
                  )}
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{event.title}</h1>
                <p className="text-xl text-white/90">
                  {event.location} • {format(new Date(event.event_date), "MMMM d, yyyy")}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#00704A]/10 flex items-center justify-center">
                  <Calendar className="w-7 h-7 text-[#00704A]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Event Date</p>
                  <p className="font-semibold text-[#2D3436] text-lg">
                    {format(new Date(event.event_date), "MMMM d, yyyy")}
                  </p>
                  {event.end_date && (
                    <p className="text-sm text-gray-500">to {format(new Date(event.end_date), "MMM d")}</p>
                  )}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#C1272D]/10 flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-[#C1272D]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Venue</p>
                  <p className="font-semibold text-[#2D3436] text-lg">{event.location}</p>
                  {/* {event.venue_details && <p className="text-sm text-gray-600">{event.venue_details}</p>} */}
                </div>
              </div>

              {event.registration_deadline && (
                <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center">
                    <Clock className="w-7 h-7 text-[#D4AF37]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Registration Deadline</p>
                    <p className="font-semibold text-[#2D3436] text-lg">
                      {format(new Date(event.registration_deadline), "MMM d, yyyy")}
                    </p>
                  </div>
                </div>
              )}

              {event.max_participants && (
                <div className="bg-white rounded-xl shadow p-6 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#00704A]/10 flex items-center justify-center">
                    <Users className="w-7 h-7 text-[#00704A]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Participants</p>
                    <p className="font-semibold text-[#2D3436] text-lg">
                      {event.current_participants || 0} / {event.max_participants}
                    </p>
                    <p className="text-sm text-gray-600">{spotsLeft} spots left</p>
                  </div>
                </div>
              )}
            </div>

            {/* Live Stream */}
            {event.status === "ongoing" && event.live_stream_url && (
              <div className="bg-gradient-to-r from-[#C1272D] to-[#A01F25] text-white rounded-xl shadow p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Radio className="w-10 h-10" />
                      <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-white"></span>
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-1">Event is Live Now!</h3>
                      <p className="text-white/90">Watch the competition live</p>
                    </div>
                  </div>
                  <button
                    onClick={() => window.open(event.live_stream_url, "_blank")}
                    className="bg-white text-[#C1272D] hover:bg-gray-100 h-14 px-8 text-lg font-semibold rounded"
                  >
                    <Radio className="mr-2 w-5 h-5" /> Watch Live Stream
                  </button>
                </div>
              </div>
            )}

            {/* Tabs (simple implementation) */}
            {/* Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-white border border-gray-200 p-1 rounded-xl">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="disciplines">Disciplines</TabsTrigger>
                <TabsTrigger value="schedule">Schedule</TabsTrigger>
                <TabsTrigger value="results">Results</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <Card className="border-none shadow-xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-[#2D3436] mb-4">About This Event</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {event.description || "No description available."}
                    </p>

                    {event.highlights && event.highlights.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold text-[#2D3436] mb-3">Event Highlights</h4>
                        <div className="grid md:grid-cols-2 gap-3">
                          {event.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <CheckCircle className="w-5 h-5 text-[#00704A] flex-shrink-0 mt-0.5" />
                              <span className="text-gray-600">{highlight}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {event.eligibility_criteria && event.eligibility_criteria.length > 0 && (
                      <div className="bg-[#00704A]/5 rounded-xl p-6 border border-[#00704A]/10">
                        <h4 className="font-semibold text-[#2D3436] mb-3 flex items-center gap-2">
                          <Target className="w-5 h-5 text-[#00704A]" />
                          Eligibility Criteria
                        </h4>
                        <ul className="space-y-2">
                          {event.eligibility_criteria.map((criteria, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-600">
                              <span className="text-[#00704A] font-bold">•</span>
                              {criteria}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="disciplines">
                <Card className="border-none shadow-xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-[#2D3436] mb-6">Event Disciplines</h3>
                    {event.disciplines && event.disciplines.length > 0 ? (
                      <div className="grid md:grid-cols-2 gap-4">
                        {event.disciplines.map((discipline, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-4 bg-white border-2 border-gray-100 rounded-xl hover:border-[#00704A] transition-colors"
                          >
                            <div className="w-10 h-10 rounded-full bg-[#00704A]/10 flex items-center justify-center">
                              <Trophy className="w-5 h-5 text-[#00704A]" />
                            </div>
                            <span className="font-medium text-[#2D3436]">{discipline}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">No specific disciplines listed yet</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="schedule">
                <Card className="border-none shadow-xl">
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold text-[#2D3436] mb-6">Event Schedule</h3>
                    {event.schedule && event.schedule.length > 0 ? (
                      <div className="space-y-4">
                        {event.schedule.map((item, index) => (
                          <div
                            key={index}
                            className="flex gap-4 p-4 bg-gradient-to-r from-[#00704A]/5 to-transparent rounded-xl border border-[#00704A]/10"
                          >
                            <div className="w-20 flex-shrink-0">
                              <p className="font-semibold text-[#00704A]">{item.time}</p>
                              <p className="text-xs text-gray-500">{format(new Date(item.date), "MMM d")}</p>
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-[#2D3436]">{item.activity}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500 text-center py-8">Detailed schedule will be announced soon</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="results">
                <Card className="border-none shadow-xl">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-[#2D3436]">Event Results</h3>

                      {uniqueDisciplines.length > 0 && (
                        <div className="flex items-center gap-3">
                          <Filter className="w-5 h-5 text-gray-400" />
                          <Select value={selectedDiscipline} onValueChange={setSelectedDiscipline}>
                            <SelectTrigger className="w-64 border-2 border-gray-200 focus:border-[#00704A]">
                              <SelectValue placeholder="Filter by discipline" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">
                                All Disciplines ({event.results?.length || 0} results)
                              </SelectItem>
                              {uniqueDisciplines.map((discipline) => {
                                const count = event.results.filter((r) => r.discipline === discipline).length;
                                return (
                                  <SelectItem key={discipline} value={discipline}>
                                    {discipline} ({count})
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>

                    {event.status === "completed" && filteredResults.length > 0 ? (
                      <div className="space-y-6">
                        {Object.entries(groupedResults).map(([discipline, results]) => (
                          <div key={discipline}>
                            <div className="flex items-center justify-between mb-4">
                              <h4 className="font-semibold text-lg text-[#2D3436] flex items-center gap-2">
                                <Trophy className="w-5 h-5 text-[#D4AF37]" />
                                {discipline}
                              </h4>
                              <Badge variant="outline" className="border-[#00704A] text-[#00704A]">
                                {results.length} athlete{results.length > 1 ? "s" : ""}
                              </Badge>
                            </div>
                            <div className="space-y-2">
                              {results
                                .sort((a, b) => a.position - b.position)
                                .map((result, index) => (
                                  <div
                                    key={index}
                                    className={`flex items-center gap-4 p-4 rounded-xl ${
                                      result.position === 1
                                        ? "bg-gradient-to-r from-[#D4AF37]/20 to-transparent border-2 border-[#D4AF37]"
                                        : result.position === 2
                                        ? "bg-gradient-to-r from-gray-300/20 to-transparent border-2 border-gray-300"
                                        : result.position === 3
                                        ? "bg-gradient-to-r from-orange-300/20 to-transparent border-2 border-orange-300"
                                        : "bg-gray-50 border border-gray-200"
                                    }`}
                                  >
                                    <div
                                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow ${
                                        result.position === 1
                                          ? "bg-[#D4AF37] text-white"
                                          : result.position === 2
                                          ? "bg-gray-400 text-white"
                                          : result.position === 3
                                          ? "bg-orange-400 text-white"
                                          : "bg-white text-[#2D3436]"
                                      }`}
                                    >
                                      {result.position}
                                    </div>
                                    <div className="flex-1">
                                      <p className="font-semibold text-[#2D3436]">{result.athlete_name}</p>
                                      {result.country && <p className="text-sm text-gray-500">{result.country}</p>}
                                    </div>
                                    <div className="text-right">
                                      <p className="font-bold text-[#00704A]">{result.time_or_distance}</p>
                                      {result.points && <p className="text-sm text-gray-500">{result.points} pts</p>}
                                    </div>
                                    {result.position <= 3 && (
                                      <Award
                                        className={`w-6 h-6 ${
                                          result.position === 1
                                            ? "text-[#D4AF37]"
                                            : result.position === 2
                                            ? "text-gray-400"
                                            : "text-orange-400"
                                        }`}
                                      />
                                    )}
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : event.status === "completed" ? (
                      <p className="text-gray-500 text-center py-8">Results will be published soon</p>
                    ) : (
                      <p className="text-gray-500 text-center py-8">
                        Results will be available after the event concludes
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Registration Card */}
            <div className="bg-white rounded-xl shadow-2xl p-8 sticky top-24">
              <div className="text-center mb-6">
                {event.registration_fee ? (
                  <div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <DollarSign className="w-8 h-8 text-[#00704A]" />
                      <div className="text-5xl font-bold text-[#00704A]">{event.registration_fee}</div>
                      <span className="text-2xl text-gray-500">BDT</span>
                    </div>
                    <p className="text-sm text-gray-600">Registration Fee</p>
                  </div>
                ) : (
                  <div>
                    <div className="text-5xl font-bold text-[#00704A] mb-2">FREE</div>
                    <p className="text-sm text-gray-600">No Registration Fee</p>
                  </div>
                )}
              </div>

              {event.max_participants && (
                <div className="mb-6 p-4 bg-gradient-to-r from-[#00704A]/10 to-transparent rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Registration Status</span>
                    <span
                      className={
                        isFull
                          ? "bg-red-100 text-red-800 px-3 py-1 rounded"
                          : "bg-green-100 text-green-800 px-3 py-1 rounded"
                      }
                    >
                      {isFull ? "FULL" : `${spotsLeft} spots left`}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#00704A] to-[#005239] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${((event.current_participants || 0) / event.max_participants) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {canRegister ? (
                <button
                  onClick={handleRegister}
                  className="w-full h-14 bg-gradient-to-r from-[#00704A] to-[#005239] hover:from-[#005239] hover:to-[#00704A] text-white text-lg font-semibold mb-4 rounded"
                >
                  <Trophy className="mr-2 w-5 h-5 inline" /> Register for Event
                </button>
              ) : event.status === "upcoming" && isFull ? (
                <button
                  disabled
                  className="w-full h-14 bg-gray-300 text-gray-600 text-lg font-semibold mb-4 rounded cursor-not-allowed"
                >
                  Event Full
                </button>
              ) : event.status === "completed" ? (
                <button
                  onClick={() => setSelectedDiscipline("all")}
                  className="w-full h-14 border rounded text-lg font-semibold mb-4"
                >
                  View Results
                </button>
              ) : (
                <button
                  disabled
                  className="w-full h-14 bg-gray-300 text-gray-600 text-lg font-semibold mb-4 rounded cursor-not-allowed"
                >
                  Registration Closed
                </button>
              )}

              <div className="space-y-3 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-[#00704A] flex-shrink-0" />{" "}
                  <span>Official BAF sanctioned event</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-[#00704A] flex-shrink-0" />{" "}
                  <span>Certified officials and timing</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <CheckCircle className="w-5 h-5 text-[#00704A] flex-shrink-0" /> <span>Medical support on-site</span>
                </div>
                {event.prizes && (
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Award className="w-5 h-5 text-[#D4AF37] flex-shrink-0" /> <span>Prize money and medals</span>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Card */}
            {(event.contact_email || event.contact_phone) && (
              <div className="bg-white rounded-xl shadow p-6">
                <h4 className="font-semibold text-[#2D3436] mb-4">Event Contact</h4>
                <div className="space-y-3">
                  {event.contact_email && (
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Mail className="w-4 h-4 text-[#00704A]" />
                      <a href={`mailto:${event.contact_email}`} className="hover:text-[#00704A]">
                        {event.contact_email}
                      </a>
                    </div>
                  )}
                  {event.contact_phone && (
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <Phone className="w-4 h-4 text-[#C1272D]" />
                      <a href={`tel:${event.contact_phone}`} className="hover:text-[#C1272D]">
                        {event.contact_phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Share Card */}
            <div className="bg-white rounded-xl shadow p-6">
              <h4 className="font-semibold text-[#2D3436] mb-4">Share Event</h4>
              <div className="flex gap-2">
                <button className="flex-1 border rounded p-2 inline-flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" /> Share
                </button>
                <button className="flex-1 border rounded p-2 inline-flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" /> Download
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Dialog (simple modal) */}
        {showRegistrationDialog && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowRegistrationDialog(false)} />
            <div className="relative bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg p-6 z-10">
              <div className="mb-4">
                <h3 className="text-2xl font-bold">Register for {event.title}</h3>
                <p className="text-sm text-gray-600">Complete the registration form to participate in this event</p>
              </div>

              <div className="space-y-6 py-4">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#2D3436]">Personal Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm">Full Name *</label>
                      <input
                        value={registrationData.athlete_name}
                        onChange={(e) => setRegistrationData({ ...registrationData, athlete_name: e.target.value })}
                        className="w-full h-10 px-3 border-2 border-gray-200 rounded-md focus:border-[#00704A]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Email *</label>
                      <input
                        type="email"
                        value={registrationData.athlete_email}
                        onChange={(e) => setRegistrationData({ ...registrationData, athlete_email: e.target.value })}
                        className="w-full h-10 px-3 border-2 border-gray-200 rounded-md focus:border-[#00704A]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Phone *</label>
                      <input
                        value={registrationData.athlete_phone}
                        onChange={(e) => setRegistrationData({ ...registrationData, athlete_phone: e.target.value })}
                        className="w-full h-10 px-3 border-2 border-gray-200 rounded-md focus:border-[#00704A]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Date of Birth *</label>
                      <input
                        type="date"
                        value={registrationData.date_of_birth}
                        onChange={(e) => setRegistrationData({ ...registrationData, date_of_birth: e.target.value })}
                        className="w-full h-10 px-3 border-2 border-gray-200 rounded-md focus:border-[#00704A]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Gender *</label>
                      <select
                        value={registrationData.gender}
                        onChange={(e) => setRegistrationData({ ...registrationData, gender: e.target.value })}
                        className="w-full h-10 px-3 border-2 border-gray-200 rounded-md focus:border-[#00704A]"
                      >
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Team/Club</label>
                      <input
                        value={registrationData.team}
                        onChange={(e) => setRegistrationData({ ...registrationData, team: e.target.value })}
                        className="w-full h-10 px-3 border-2 border-gray-200 rounded-md focus:border-[#00704A]"
                      />
                    </div>
                  </div>
                </div>

                {/* Disciplines */}
                {event.disciplines && event.disciplines.length > 0 && (
                  <div className="space-y-4">
                    <h4 className="font-semibold text-[#2D3436]">Select Disciplines *</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {event.disciplines.map((discipline: string) => (
                        <label key={discipline} className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={registrationData.selected_disciplines.includes(discipline)}
                            onChange={() => handleDisciplineToggle(discipline)}
                            className="w-4 h-4"
                          />
                          <span className="text-sm font-medium">{discipline}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Emergency Contact */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-[#2D3436]">Emergency Contact *</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm">Contact Name</label>
                      <input
                        value={registrationData.emergency_contact.name}
                        onChange={(e) =>
                          setRegistrationData({
                            ...registrationData,
                            emergency_contact: { ...registrationData.emergency_contact, name: e.target.value },
                          })
                        }
                        className="w-full h-10 px-3 border-2 border-gray-200 rounded-md focus:border-[#00704A]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Contact Phone</label>
                      <input
                        value={registrationData.emergency_contact.phone}
                        onChange={(e) =>
                          setRegistrationData({
                            ...registrationData,
                            emergency_contact: { ...registrationData.emergency_contact, phone: e.target.value },
                          })
                        }
                        className="w-full h-10 px-3 border-2 border-gray-200 rounded-md focus:border-[#00704A]"
                      />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <label className="text-sm">Relationship</label>
                      <input
                        value={registrationData.emergency_contact.relationship}
                        onChange={(e) =>
                          setRegistrationData({
                            ...registrationData,
                            emergency_contact: { ...registrationData.emergency_contact, relationship: e.target.value },
                          })
                        }
                        className="w-full h-10 px-3 border-2 border-gray-200 rounded-md focus:border-[#00704A]"
                      />
                    </div>
                  </div>
                </div>

                {/* Medical Conditions */}
                <div className="space-y-2">
                  <label className="text-sm">Medical Conditions (Optional)</label>
                  <textarea
                    placeholder="List any medical conditions we should be aware of..."
                    value={registrationData.medical_conditions}
                    onChange={(e) => setRegistrationData({ ...registrationData, medical_conditions: e.target.value })}
                    className="w-full p-3 border-2 border-gray-200 rounded-md h-24"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-blue-800">
                    By registering, you confirm that you meet the eligibility criteria and agree to abide by the event
                    rules and regulations.
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-4">
                <button onClick={() => setShowRegistrationDialog(false)} className="px-4 py-2 border rounded">
                  Cancel
                </button>
                <button
                  onClick={handleSubmitRegistration}
                  disabled={
                    registerPending ||
                    !registrationData.athlete_name ||
                    !registrationData.athlete_email ||
                    registrationData.selected_disciplines.length === 0
                  }
                  className="px-4 py-2 bg-gradient-to-r from-[#00704A] to-[#005239] text-white rounded"
                >
                  {registerPending ? (
                    <span className="inline-flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />{" "}
                      Registering...
                    </span>
                  ) : (
                    <>
                      <CheckCircle className="inline w-4 h-4 mr-2" /> Complete Registration
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Local simple tab state for this single-file page
const tabStateHolder = { value: "overview", set: (v: string) => {} } as any;
function setTab(v: string) {
  tabStateHolder.set(v);
}
let tabState = "overview";
(function wireTabState() {
  // very small local wiring so the tab UI is encapsulated in the file without additional hooks complexity
  const listeners: ((v: string) => void)[] = [];
  tabStateHolder.set = (v: string) => {
    tabState = v;
    listeners.forEach((l) => l(v));
  };
  // expose a small hook-like function used above
  (EventDetailsPage as any).useTab = (cb: (v: string) => void) => listeners.push(cb);
})();

export { tabState };
