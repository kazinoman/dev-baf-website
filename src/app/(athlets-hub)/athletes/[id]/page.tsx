"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  ArrowLeft,
  Trophy,
  Award,
  Calendar,
  MapPin,
  Mail,
  Phone,
  User as UserIcon,
  TrendingUp,
  Target,
  Users,
  Ruler,
  Weight,
  Facebook,
  Instagram,
  Twitter,
  Activity,
} from "lucide-react";
import { format } from "date-fns";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useRouter } from "next/navigation";

const teamColors: Record<string, string> = {
  Dhaka: "bg-blue-100 text-blue-800",
  Chittagong: "bg-green-100 text-green-800",
  Rajshahi: "bg-purple-100 text-purple-800",
  Khulna: "bg-orange-100 text-orange-800",
  Sylhet: "bg-pink-100 text-pink-800",
  Barisal: "bg-indigo-100 text-indigo-800",
  Rangpur: "bg-red-100 text-red-800",
  Mymensingh: "bg-yellow-100 text-yellow-800",
  "National Team": "bg-gradient-to-r from-[#00704A] to-[#005239] text-white",
};

// ✅ Dummy Athlete Data
const dummyAthlete = {
  id: "1",
  full_name: "Md. Arif Hossain",
  athlete_category: "sprinter",
  team: "National Team",
  bio: "Bangladesh’s fastest sprinter with a passion for excellence and discipline. Competes nationally and internationally in 100m and 200m events.",
  photo_url: "https://randomuser.me/api/portraits/men/12.jpg",
  date_of_birth: "1995-07-14",
  gender: "male",
  email: "arif.hossain@example.com",
  phone: "+8801711000001",
  height_cm: 178,
  weight_kg: 72,
  preferred_events: ["100m Dash", "200m Sprint"],
  achievements: [
    {
      event_name: "National Athletics Championship 2024",
      position: "Gold Medal",
      date: "2024-03-21",
      record: "10.45s (100m)",
    },
    {
      event_name: "South Asian Games 2023",
      position: "Silver Medal",
      date: "2023-12-05",
      record: "21.10s (200m)",
    },
  ],
  current_personal_bests: {
    "100m Sprint": "10.45s",
    "200m Sprint": "21.10s",
  },
  coaching_history: [
    {
      coach_name: "Tanvir Alam",
      period: "2021 - Present",
      specialization: "Sprint Technique",
    },
    {
      coach_name: "Rafiq Hasan",
      period: "2018 - 2021",
      specialization: "Strength & Conditioning",
    },
  ],
  social_media: {
    facebook: "https://facebook.com/arif.hossain",
    instagram: "https://instagram.com/arif.hossain",
    twitter: "https://twitter.com/arifhossain",
  },
};

export default function AthleteDetails() {
  const navigate = useRouter();
  const athlete = dummyAthlete; // 👈 Replace API data with dummy

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] to-white py-12 px-4">
      <div className="main_container mx-auto pt-40">
        {/* Back Button */}
        <Button variant="white" type="button" onClick={() => navigate.push("/athletes")} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to All Athletes
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Profile Card */}
          <Card className="lg:col-span-1 border-none shadow-2xl overflow-hidden">
            {/* Photo */}
            <div className="h-80 bg-gradient-to-br from-gray-100 to-gray-200 relative rounded-t-xl overflow-hidden group shadow-sm">
              {athlete.photo_url ? (
                <img
                  src={athlete.photo_url}
                  alt={athlete.full_name}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#00704A] to-[#005239] flex items-center justify-center shadow-md">
                    <span className="text-4xl font-semibold text-white">{athlete.full_name.charAt(0)}</span>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/80" />

              {athlete.team && (
                <div className="absolute top-4 right-4">
                  <Badge
                    variant="secondary"
                    className={`${teamColors[athlete.team] || "bg-gray-100 text-gray-800"} border-none shadow-lg `}
                  >
                    {athlete.team}
                  </Badge>
                </div>
              )}
            </div>

            {/* Profile Info */}
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-[#2D3436] mb-2">{athlete.full_name}</h1>
                <Badge variant="outline" className="bg-[#00704A]/10 text-[#00704A] border-none text-sm font-semibold">
                  {athlete.athlete_category?.toUpperCase()}
                </Badge>
              </div>

              <p className="text-gray-600 text-center mb-6 leading-relaxed">{athlete.bio}</p>

              <div className="space-y-3 pt-6 border-t border-gray-100">
                <InfoItem
                  icon={<Calendar className="w-5 h-5 text-[#00704A]" />}
                  label="Date of Birth"
                  value={format(new Date(athlete.date_of_birth), "MMMM d, yyyy")}
                />
                <InfoItem
                  icon={<UserIcon className="w-5 h-5 text-[#C1272D]" />}
                  label="Gender"
                  value={athlete.gender}
                />
                <InfoItem icon={<MapPin className="w-5 h-5 text-[#D4AF37]" />} label="Team" value={athlete.team} />
                <InfoItem icon={<Mail className="w-5 h-5 text-[#00704A]" />} label="Email" value={athlete.email} />
                <InfoItem icon={<Phone className="w-5 h-5 text-[#C1272D]" />} label="Phone" value={athlete.phone} />
              </div>

              {/* Physical Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-100">
                <StatBox
                  icon={<Ruler className="w-6 h-6 text-[#00704A] mx-auto mb-2" />}
                  color="text-[#00704A]"
                  value={athlete.height_cm}
                  label="cm Height"
                />
                <StatBox
                  icon={<Weight className="w-6 h-6 text-[#C1272D] mx-auto mb-2" />}
                  color="text-[#C1272D]"
                  value={athlete.weight_kg}
                  label="kg Weight"
                />
              </div>

              {/* Social Media */}
              <div className="mt-6 pt-6 border-t border-gray-100 flex justify-center gap-4">
                <SocialLink href={athlete.social_media.facebook} icon={<Facebook className="w-5 h-5" />} color="blue" />
                <SocialLink
                  href={athlete.social_media.instagram}
                  icon={<Instagram className="w-5 h-5" />}
                  color="pink"
                />
                <SocialLink href={athlete.social_media.twitter} icon={<Twitter className="w-5 h-5" />} color="sky" />
              </div>
            </CardContent>
          </Card>

          {/* Right Side Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <StatCard
                icon={<Trophy className="w-8 h-8 mx-auto mb-3" />}
                title="Achievements"
                value={athlete.achievements.length}
                gradient="from-[#00704A] to-[#005239]"
              />
              <StatCard
                icon={<Activity className="w-8 h-8 mx-auto mb-3" />}
                title="Events"
                value={athlete.preferred_events.length}
                gradient="from-[#C1272D] to-[#A01F25]"
              />
              <StatCard
                icon={<Target className="w-8 h-8 mx-auto mb-3" />}
                title="Personal Bests"
                value={Object.keys(athlete.current_personal_bests).length}
                gradient="from-[#D4AF37] to-[#B8941F]"
              />
            </div>

            {/* Tabs */}
            <Tabs defaultValue="events" className="!mb-12  w-full">
              <TabsList className="flex flex-row items-center justify-between gap-4 bg-white border border-gray-200 p-1 rounded-xl h-14 overflow-auto">
                {["events", "achievements", "records", "coaching"].map((key, ids) => {
                  return (
                    <TabsTrigger
                      key={ids}
                      value={key}
                      className="rounded-lg p-4  data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00704A] data-[state=active]:to-[#005239] data-[state=active]:text-white"
                    >
                      {key}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {/* Tabs Content */}
              <TabsContent value="events">
                <TabSection title="Competing Events" icon={<Trophy className="w-5 h-5 text-[#00704A]" />}>
                  <ul className="grid md:grid-cols-2 gap-4">
                    {athlete.preferred_events.map((e, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 p-4 bg-[#00704A]/5 rounded-xl hover:bg-[#00704A]/10 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-[#00704A] flex items-center justify-center text-white font-bold">
                          {i + 1}
                        </div>
                        <span className="font-semibold text-[#2D3436]">{e}</span>
                      </li>
                    ))}
                  </ul>
                </TabSection>
              </TabsContent>

              <TabsContent value="achievements">
                <TabSection title="Career Achievements" icon={<Award className="w-5 h-5 text-[#D4AF37]" />}>
                  {athlete.achievements.map((a, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 p-6 bg-gradient-to-r from-white to-[#F8F6F3] rounded-xl border border-gray-100 hover:shadow-lg transition-shadow mb-3"
                    >
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center flex-shrink-0 shadow-lg">
                        <Award className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#2D3436]">{a.event_name}</h3>
                        <Badge variant="outline" className="bg-[#D4AF37]/10 text-[#D4AF37] border-none mt-1">
                          {a.position}
                        </Badge>
                        {a.record && <p className="text-sm font-semibold text-[#00704A] mt-1">{a.record}</p>}
                      </div>
                    </div>
                  ))}
                </TabSection>
              </TabsContent>

              <TabsContent value="records">
                <TabSection title="Personal Bests" icon={<TrendingUp className="w-5 h-5 text-[#C1272D]" />}>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(athlete.current_personal_bests).map(([e, r]) => (
                      <div
                        key={e}
                        className="p-6 bg-gradient-to-br from-[#C1272D]/5 to-transparent rounded-xl border border-[#C1272D]/10"
                      >
                        <h3 className="font-semibold text-[#2D3436] mb-2">{e}</h3>
                        <div className="text-2xl font-bold text-[#C1272D]">{r}</div>
                      </div>
                    ))}
                  </div>
                </TabSection>
              </TabsContent>

              <TabsContent value="coaching" className="p-0">
                <TabSection
                  title="Coaching History"
                  icon={<Users className="w-5 h-5 text-[#00704A]" />}
                  className="p-0"
                >
                  {athlete.coaching_history.map((c, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 p-6 bg-white rounded-xl border border-gray-200 hover:shadow-lg transition-shadow mb-3"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00704A] to-[#005239] flex items-center justify-center text-white font-bold flex-shrink-0">
                        {c.coach_name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-bold text-[#2D3436]">{c.coach_name}</h3>
                        <Badge variant="outline" className="text-xs mr-2">
                          {c.period}
                        </Badge>
                        <Badge variant="outline" className="bg-[#00704A]/10 text-[#00704A] border-none text-xs">
                          {c.specialization}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </TabSection>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Helper Components ---------- */
function InfoItem({ icon, label, value }: any) {
  return (
    <div className="flex items-center gap-3">
      {icon}
      <div>
        <div className="text-xs text-gray-500">{label}</div>
        <div className="text-sm font-medium">{value}</div>
      </div>
    </div>
  );
}

function StatBox({ icon, color, value, label }: any) {
  return (
    <div className="text-center p-4 bg-white/80 rounded-xl border border-gray-100 shadow-sm">
      {icon}
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-gray-600">{label}</div>
    </div>
  );
}

function SocialLink({ href, icon, color }: any) {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Button type="button" className={`hover:bg-${color}-50 hover:border-${color}-500`}>
        {icon}
      </Button>
    </a>
  );
}

function StatCard({ icon, title, value, gradient }: any) {
  return (
    <Card className={`border-none shadow-lg bg-gradient-to-br ${gradient} text-white`}>
      <CardContent className="p-6 text-center">
        {icon}
        <div className="text-3xl font-bold mb-1">{value}</div>
        <div className="text-sm opacity-90">{title}</div>
      </CardContent>
    </Card>
  );
}

function TabSection({ title, icon, children }: any) {
  return (
    <Card className="border-none shadow-xl">
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="flex items-center gap-2 p-4">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-2 md:p-6">{children}</CardContent>
    </Card>
  );
}
