"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar, MapPin, Users, Clock, Award, CheckCircle, DollarSign, BookOpen, Target, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import DynamicHeading from "@/components/Home/HeadingComponent";

// ---------- MOCK DATA ----------
export const mockWorkshops = [
  {
    id: "1",
    title: "Advanced Coaching Techniques",
    description:
      "Enhance your coaching skills through modern methodologies and athlete-centered approaches. Learn how to optimize performance through psychological and tactical strategies.",
    facilitator: "John Smith",
    facilitator_bio: "Olympic-level coach with 15 years of experience.",
    type: "coaching",
    workshop_date: "2025-11-10",
    duration: "3 days",
    topics_covered: [
      "Modern coaching psychology",
      "Athlete motivation",
      "Performance tracking",
      "Tactical decision-making",
    ],
    target_audience: ["Coaches", "Trainers", "Team Managers"],
    location: "Dhaka Stadium, Bangladesh",
    max_participants: 30,
    current_registrations: 25,
    certification_provided: true,
    fee: 5000,
    registration_deadline: "2025-11-05",
    status: "upcoming",
  },
  {
    id: "2",
    title: "Sports Nutrition Workshop",
    description: "Learn about the role of proper nutrition in improving athletic performance and recovery.",
    facilitator: "Dr. Sarah Khan",
    facilitator_bio: "Certified Sports Nutritionist, BAF",
    type: "nutrition",
    workshop_date: "2025-09-15",
    duration: "2 days",
    topics_covered: ["Nutritional timing", "Supplements and hydration", "Meal plans for endurance"],
    target_audience: ["Athletes", "Dieticians"],
    location: "Bangabandhu Sports Complex",
    max_participants: 20,
    current_registrations: 20,
    certification_provided: true,
    fee: 0,
    registration_deadline: "2025-09-10",
    status: "completed",
  },
  {
    id: "3",
    title: "Injury Prevention & Rehabilitation",
    description: "A hands-on workshop focused on preventing and managing sports injuries for peak performance.",
    facilitator: "Coach Maria Gomez",
    facilitator_bio: "Physiotherapist & Performance Coach",
    type: "injury_prevention",
    workshop_date: "2025-12-05",
    duration: "2 days",
    topics_covered: ["Warm-up and recovery", "Common sports injuries", "Rehabilitation techniques", "Load management"],
    target_audience: ["Athletes", "Coaches", "Medical Staff"],
    location: "Chittagong Sports Institute",
    max_participants: 25,
    current_registrations: 15,
    certification_provided: false,
    fee: 3000,
    registration_deadline: "2025-12-01",
    status: "upcoming",
  },
  {
    id: "4",
    title: "Sports Science & Performance Analytics",
    description: "Discover how data analytics and biomechanics can enhance sports performance and training outcomes.",
    facilitator: "Dr. Imran Siddiqui",
    facilitator_bio: "Sports Scientist at National Sports Council",
    type: "sports_science",
    workshop_date: "2025-08-20",
    duration: "3 days",
    topics_covered: ["Biomechanics analysis", "Performance tracking tools", "AI in sports training"],
    target_audience: ["Trainers", "Sports Scientists"],
    location: "Sylhet Sports Complex",
    max_participants: 40,
    current_registrations: 38,
    certification_provided: true,
    fee: 4000,
    registration_deadline: "2025-08-15",
    status: "completed",
  },
  {
    id: "5",
    title: "Mental Training for Athletes",
    description: "Master the art of mental toughness and focus enhancement for consistent peak performance.",
    facilitator: "Dr. Ayesha Rahman",
    facilitator_bio: "Sports Psychologist, Bangladesh Olympic Committee",
    type: "mental_training",
    workshop_date: "2025-11-25",
    duration: "2 days",
    topics_covered: [
      "Mindfulness for athletes",
      "Visualization techniques",
      "Pressure management",
      "Confidence building",
    ],
    target_audience: ["Athletes", "Coaches"],
    location: "National Sports Council Auditorium",
    max_participants: 30,
    current_registrations: 18,
    certification_provided: true,
    fee: 2000,
    registration_deadline: "2025-11-20",
    status: "upcoming",
  },
  {
    id: "6",
    title: "Technical Skills Enhancement",
    description: "Improve your technical understanding of modern athletic equipment and techniques.",
    facilitator: "Robert Lee",
    facilitator_bio: "Technical Director, Asia Athletics Association",
    type: "technical",
    workshop_date: "2025-07-10",
    duration: "3 days",
    topics_covered: ["Modern track technologies", "Equipment calibration", "Performance measurement tools"],
    target_audience: ["Technical Officers", "Judges"],
    location: "Mymensingh Sports Academy",
    max_participants: 25,
    current_registrations: 22,
    certification_provided: false,
    fee: 2500,
    registration_deadline: "2025-07-05",
    status: "completed",
  },
  {
    id: "7",
    title: "Administrative Leadership in Sports",
    description: "Learn how to effectively manage sports organizations and ensure smooth event operations.",
    facilitator: "Kamrul Hasan",
    facilitator_bio: "Director of Administration, BAF",
    type: "administrative",
    workshop_date: "2025-10-28",
    duration: "1 day",
    topics_covered: ["Event logistics", "Team coordination", "Crisis management"],
    target_audience: ["Administrators", "Event Managers"],
    location: "Dhaka Sports Federation",
    max_participants: 20,
    current_registrations: 14,
    certification_provided: false,
    fee: 1500,
    registration_deadline: "2025-10-25",
    status: "upcoming",
  },
  {
    id: "8",
    title: "Youth Coaching Fundamentals",
    description: "Develop foundational skills to train and motivate young athletes for long-term success.",
    facilitator: "Nusrat Jahan",
    facilitator_bio: "Youth Development Coach",
    type: "coaching",
    workshop_date: "2025-06-18",
    duration: "2 days",
    topics_covered: ["Child psychology in sports", "Age-specific training", "Talent identification"],
    target_audience: ["Youth Coaches", "Academy Trainers"],
    location: "Khulna Youth Academy",
    max_participants: 35,
    current_registrations: 35,
    certification_provided: true,
    fee: 0,
    registration_deadline: "2025-06-10",
    status: "completed",
  },
  {
    id: "9",
    title: "Strength & Conditioning Bootcamp",
    description: "Get hands-on experience in developing strength and conditioning programs for athletes.",
    facilitator: "Arif Rahman",
    facilitator_bio: "Certified Strength Coach",
    type: "technical",
    workshop_date: "2025-12-15",
    duration: "3 days",
    topics_covered: ["Core stability training", "Functional movement patterns", "Recovery optimization"],
    target_audience: ["Trainers", "Fitness Coaches"],
    location: "Rangpur Sports Complex",
    max_participants: 30,
    current_registrations: 27,
    certification_provided: true,
    fee: 4500,
    registration_deadline: "2025-12-10",
    status: "upcoming",
  },
  {
    id: "10",
    title: "Event Management & Coordination",
    description:
      "A complete guide to managing athletic meets efficiently with digital tools and volunteer coordination.",
    facilitator: "Sabrina Akter",
    facilitator_bio: "Sports Event Coordinator",
    type: "administrative",
    workshop_date: "2025-09-01",
    duration: "1 day",
    topics_covered: ["Scheduling systems", "Volunteer management", "Post-event evaluation"],
    target_audience: ["Sports Managers", "Coordinators"],
    location: "Comilla Athletics Hall",
    max_participants: 20,
    current_registrations: 18,
    certification_provided: false,
    fee: 1200,
    registration_deadline: "2025-08-28",
    status: "completed",
  },
];

// ---------- TYPE COLORS & ICONS ----------
const workshopTypeColors: Record<string, string> = {
  coaching: "bg-blue-100 text-blue-800",
  sports_science: "bg-purple-100 text-purple-800",
  nutrition: "bg-green-100 text-green-800",
  injury_prevention: "bg-red-100 text-red-800",
  mental_training: "bg-yellow-100 text-yellow-800",
  technical: "bg-indigo-100 text-indigo-800",
  administrative: "bg-gray-100 text-gray-800",
};

const workshopTypeIcons: Record<string, any> = {
  coaching: Award,
  sports_science: Target,
  nutrition: Zap,
  injury_prevention: CheckCircle,
  mental_training: BookOpen,
  technical: Target,
  administrative: Users,
};

// ---------- COMPONENT ----------
export default function WorkshopsPage() {
  const [filter, setFilter] = useState<"upcoming" | "completed">("upcoming");

  const filteredWorkshops = mockWorkshops.filter((w) => w.status === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] to-white py-12 px-4 pt-40">
      <div className="main_container mx-auto">
        {/* HERO SECTION */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00704A]/10 to-[#C1272D]/10 rounded-full mb-6">
            <BookOpen className="w-4 h-4 text-[#00704A]" />
            <span className="text-sm font-semibold text-[#00704A]">Professional Development</span>
          </div>

          <DynamicHeading title="Workshops & Seminars" className="text-4xl lg:text-6xl font-bold mb-6" />

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Enhance your knowledge and skills through expert-led workshops covering various aspects of athletics.
          </p>
        </div>

        {/* FILTER TABS */}
        <Tabs defaultValue="upcoming" onValueChange={(val) => setFilter(val as any)} className="mb-12">
          <TabsList className="grid w-full md:w-auto grid-cols-2 bg-white border border-gray-200 p-1 rounded-xl shadow-lg">
            <TabsTrigger
              value="upcoming"
              className="rounded-lg p-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00704A] data-[state=active]:to-[#005239] data-[state=active]:text-white"
            >
              Upcoming Workshops
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="rounded-lg p-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00704A] data-[state=active]:to-[#005239] data-[state=active]:text-white"
            >
              Past Workshops
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* WORKSHOP GRID */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredWorkshops.map((workshop) => {
            const TypeIcon = workshopTypeIcons[workshop.type] || BookOpen;
            const spotsLeft = workshop.max_participants - (workshop.current_registrations || 0);
            const isUpcoming = workshop.status === "upcoming";

            return (
              <Card
                key={workshop.id}
                className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div
                  className={`p-6 ${
                    isUpcoming
                      ? "bg-gradient-to-br from-[#00704A] to-[#005239]"
                      : "bg-gradient-to-br from-gray-600 to-gray-800"
                  } text-white`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <Badge variant="outline" className={`${workshopTypeColors[workshop.type]} border-none`}>
                      {workshop.type.replace("_", " ")}
                    </Badge>
                    {workshop.certification_provided && (
                      <Badge variant="outline" className="bg-[#D4AF37] text-white border-none">
                        <Award className="w-3 h-3 mr-1" />
                        Certificate
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold mb-2 line-clamp-2">{workshop.title}</h3>

                  <div className="flex items-center gap-4 text-white/80 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {format(new Date(workshop.workshop_date), "MMM d, yyyy")}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {workshop.duration}
                    </div>
                  </div>
                </div>

                <CardContent className="p-6 space-y-6">
                  <p className="text-gray-600 leading-relaxed line-clamp-3">{workshop.description}</p>

                  {/* FACILITATOR */}
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00704A] to-[#005239] flex items-center justify-center text-white font-bold flex-shrink-0">
                      {workshop.facilitator.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-[#2D3436]">{workshop.facilitator}</p>
                      <p className="text-xs text-gray-600 line-clamp-2 mt-1">{workshop.facilitator_bio}</p>
                    </div>
                  </div>

                  {/* TOPICS */}
                  <div>
                    <h4 className="font-semibold text-[#2D3436] mb-3 flex items-center gap-2">
                      <TypeIcon className="w-4 h-4 text-[#00704A]" />
                      Topics Covered
                    </h4>
                    <div className="space-y-2">
                      {workshop.topics_covered.map((topic, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-[#00704A] mt-0.5" />
                          <span className="text-sm text-gray-600">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* AUDIENCE */}
                  <div>
                    <h4 className="font-semibold text-[#2D3436] mb-2">Who Should Attend:</h4>
                    <div className="flex flex-wrap gap-2">
                      {workshop.target_audience.map((aud, idx) => (
                        <Badge key={idx} variant="outline" className="border-[#C1272D] text-[#C1272D]">
                          {aud}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* DETAILS */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-[#00704A]" />
                      <span className="line-clamp-1">{workshop.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4 text-[#C1272D]" />
                      <span>{spotsLeft > 0 ? `${spotsLeft} spots left` : "Full"}</span>
                    </div>
                  </div>

                  {/* FEE & DEADLINE */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-5 h-5 text-[#00704A]" />
                      <span className="text-xl font-bold text-[#00704A]">
                        {workshop.fee === 0 ? "Free" : `${workshop.fee} BDT`}
                      </span>
                    </div>
                    {isUpcoming && (
                      <div className="text-xs text-gray-500">
                        Register by: {format(new Date(workshop.registration_deadline), "MMM d")}
                      </div>
                    )}
                  </div>

                  {/* REGISTER BUTTON */}
                  {isUpcoming && (
                    <Button
                      //   onClick={() => router.push(`/workshop/${workshop.id}`)}
                      variant="black"
                      className="w-full bg-gradient-to-r from-[#00704A] to-[#005239] hover:from-[#005239] hover:to-[#00704A] text-white h-12"
                      disabled={spotsLeft <= 0}
                    >
                      {spotsLeft > 0 ? "Register for Workshop" : "Registration Full"}
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredWorkshops.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">
              {filter === "upcoming"
                ? "No upcoming workshops at the moment. Check back soon!"
                : "No past workshops to display."}
            </p>
          </div>
        )}

        {/* INFO CARDS */}
        <div className="mt-20 grid md:grid-cols-4 gap-6">
          {[
            {
              icon: <Award className="w-6 h-6 text-[#00704A]" />,
              bg: "bg-[#00704A]/10",
              title: "Expert Facilitators",
              desc: "Learn from industry leaders",
            },
            {
              icon: <CheckCircle className="w-6 h-6 text-[#C1272D]" />,
              bg: "bg-[#C1272D]/10",
              title: "Certifications",
              desc: "Earn recognized credentials",
            },
            {
              icon: <Users className="w-6 h-6 text-[#D4AF37]" />,
              bg: "bg-[#D4AF37]/10",
              title: "Networking",
              desc: "Connect with peers",
            },
            {
              icon: <Target className="w-6 h-6 text-[#00704A]" />,
              bg: "bg-[#00704A]/10",
              title: "Practical Skills",
              desc: "Hands-on learning",
            },
          ].map((card, i) => (
            <Card key={i} className="border-none shadow-lg">
              <CardContent className="p-6 text-center">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center ${card.bg}`}>
                  {card.icon}
                </div>
                <h3 className="font-bold text-[#2D3436] mb-1">{card.title}</h3>
                <p className="text-sm text-gray-600">{card.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
