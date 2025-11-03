"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

// ------------------ DUMMY DATA ------------------
const dummyEvent = {
  id: "event1",
  title: "National Athletics Championship",
  event_type: "track_and_field",
  category: "Senior",
  status: "upcoming",
  is_international: true,
  image_url: "https://source.unsplash.com/1600x400/?sports",
  location: "Dhaka, Bangladesh",
  event_date: "2025-12-15",
  end_date: "2025-12-20",
  registration_deadline: "2025-12-10",
  max_participants: 100,
  current_participants: 35,
  registration_fee: 500,
  disciplines: ["100m", "200m", "Long Jump", "High Jump"],
  description: "The biggest national athletics event of the year.",
  highlights: ["Professional timing system", "Live streaming available", "Medical support on-site"],
  eligibility_criteria: ["Must be 18+ years old", "Registered with local club"],
  schedule: [
    { date: "2025-12-15", time: "09:00 AM", activity: "Opening Ceremony" },
    { date: "2025-12-15", time: "10:00 AM", activity: "100m Heats" },
  ],
  results: [
    {
      discipline: "100m",
      position: 1,
      athlete_name: "John Doe",
      country: "Bangladesh",
      time_or_distance: "10.2s",
      points: 10,
    },
    {
      discipline: "100m",
      position: 2,
      athlete_name: "Ali Khan",
      country: "Pakistan",
      time_or_distance: "10.5s",
      points: 8,
    },
    {
      discipline: "Long Jump",
      position: 1,
      athlete_name: "Sara Rahman",
      country: "Bangladesh",
      time_or_distance: "6.5m",
      points: 10,
    },
  ],
  contact_email: "info@baf.com",
  contact_phone: "+880123456789",
  prizes: true,
  live_stream_url: "https://youtube.com/live",
};

// ------------------ DUMMY USER ------------------
const dummyUser = {
  full_name: "Test User",
  email: "testuser@example.com",
  phone: "+880987654321",
  date_of_birth: "2000-01-01",
  gender: "male",
  team: "Dhaka Athletics Club",
};

export default function EventDetailsPage() {
  const router = useRouter();

  const [showRegistrationDialog, setShowRegistrationDialog] = useState(false);
  const [user, setUser] = useState(dummyUser);
  const [selectedDiscipline, setSelectedDiscipline] = useState("all");
  const [registrationData, setRegistrationData] = useState({
    athlete_name: dummyUser.full_name,
    athlete_email: dummyUser.email,
    athlete_phone: dummyUser.phone,
    date_of_birth: dummyUser.date_of_birth,
    gender: dummyUser.gender,
    team: dummyUser.team,
    selected_disciplines: [],
    emergency_contact: { name: "", phone: "", relationship: "" },
    medical_conditions: "",
    personal_bests: {},
  });

  const event = dummyEvent;
  const spotsLeft = event.max_participants - event.current_participants;
  const isFull = spotsLeft <= 0;
  const canRegister =
    event.status === "upcoming" &&
    !isFull &&
    (!event.registration_deadline || new Date(event.registration_deadline) > new Date());

  const uniqueDisciplines = [...new Set(event.results.map((r) => r.discipline))].sort();
  const filteredResults =
    selectedDiscipline === "all" ? event.results : event.results.filter((r) => r.discipline === selectedDiscipline);

  const groupedResults = filteredResults.reduce((acc, result) => {
    if (!acc[result.discipline]) acc[result.discipline] = [];
    acc[result.discipline].push(result);
    return acc;
  }, {});

  //   const handleDisciplineToggle = (discipline: string) => {
  //     setRegistrationData((prev) => ({
  //       ...prev,
  //       selected_disciplines: prev.selected_disciplines.includes(discipline)
  //         ? prev.selected_disciplines.filter((d) => d !== discipline)
  //         : [...prev.selected_disciplines, discipline],
  //     }));
  //   };

  const handleRegister = () => setShowRegistrationDialog(true);

  const handleSubmitRegistration = () => {
    console.log("Registration Data:", registrationData);
    alert("Registration successful! (simulated)");
    setShowRegistrationDialog(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Button type="button" variant="black" onClick={() => router.push("/events")} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to All Events
        </Button>

        {/* Hero Banner */}
        <Card className="border-none shadow-2xl overflow-hidden mb-8">
          <div
            className={`h-80 relative ${
              event.status === "ongoing"
                ? "bg-gradient-to-br from-[#C1272D] to-[#A01F25]"
                : "bg-gradient-to-br from-[#00704A] to-[#005239]"
            }`}
          >
            {event.image_url && (
              <>
                <img src={event.image_url} alt={event.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50" />
              </>
            )}
            <div className="absolute inset-0 flex items-center justify-center px-8">
              <div className="text-center max-w-4xl">
                <div className="flex justify-center gap-3 mb-4 flex-wrap">
                  <Badge
                    variant="outline"
                    className="bg-white/20 backdrop-blur-sm text-white border-none text-lg px-4 py-2"
                  >
                    {event.event_type.replace("_", " ").toUpperCase()}
                  </Badge>
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-none text-lg px-4 py-2">
                    {event.category.toUpperCase()}
                  </Badge>
                  {event.is_international && (
                    <Badge className="bg-[#D4AF37] text-white border-none text-lg px-4 py-2">
                      <Globe className="w-4 h-4 mr-1" />
                      INTERNATIONAL
                    </Badge>
                  )}
                  {event.status === "ongoing" && (
                    <Badge className="bg-[#C1272D] text-white border-none text-lg px-4 py-2 animate-pulse">
                      <Radio className="w-4 h-4 mr-1" />
                      LIVE NOW
                    </Badge>
                  )}
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{event.title}</h1>
                <p className="text-xl text-white/90">
                  {event.location} • {format(new Date(event.event_date), "MMMM d, yyyy")}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* --- MAIN GRID --- */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-none shadow-lg">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#00704A]/10 flex items-center justify-center">
                    <Calendar className="w-7 h-7 text-[#00704A]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Event Date</p>
                    <p className="font-semibold text-[#2D3436] text-lg">
                      {format(new Date(event.event_date), "MMMM d, yyyy")}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-xl bg-[#C1272D]/10 flex items-center justify-center">
                    <MapPin className="w-7 h-7 text-[#C1272D]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Venue</p>
                    <p className="font-semibold text-[#2D3436] text-lg">{event.location}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

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
                    <p className="text-gray-600 leading-relaxed mb-6">{event.description}</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Registration Card */}
            <Card className="border-none shadow-2xl sticky top-24">
              <CardContent className="p-8">
                <Button
                  type="button"
                  variant="black"
                  onClick={handleRegister}
                  className="w-full h-14 bg-gradient-to-r from-[#00704A] to-[#005239] hover:from-[#005239] hover:to-[#00704A] text-white text-lg font-semibold mb-4"
                >
                  <Trophy className="mr-2 w-5 h-5" />
                  Register for Event
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Registration Dialog */}
        <Dialog open={showRegistrationDialog} onOpenChange={setShowRegistrationDialog}>
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">Register for {event.title}</DialogTitle>
              <DialogDescription>Complete the registration form to participate in this event</DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="space-y-4">
                <h4 className="font-semibold text-[#2D3436]">Personal Information</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name *</Label>
                    <Input
                      value={registrationData.athlete_name}
                      onChange={(e) => setRegistrationData({ ...registrationData, athlete_name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email *</Label>
                    <Input
                      type="email"
                      value={registrationData.athlete_email}
                      onChange={(e) => setRegistrationData({ ...registrationData, athlete_email: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="black" onClick={() => setShowRegistrationDialog(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmitRegistration}
                className="bg-gradient-to-r from-[#00704A] to-[#005239] text-white"
              >
                Complete Registration
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
