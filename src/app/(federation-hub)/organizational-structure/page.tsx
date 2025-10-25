"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Mail, Phone, Award, Shield, Briefcase, Zap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import DynamicHeading from "@/components/Home/HeadingComponent";

const categoryInfo = {
  executive: {
    title: "Executive Board",
    description: "Leadership and strategic direction",
    icon: Shield,
    color: "from-[#00704A] to-[#005239]",
  },
  board: {
    title: "Board of Directors",
    description: "Governance and oversight",
    icon: Users,
    color: "from-[#C1272D] to-[#A01F25]",
  },
  technical: {
    title: "Technical Committee",
    description: "Technical expertise and coaching",
    icon: Award,
    color: "from-[#D4AF37] to-[#B8941F]",
  },
  administrative: {
    title: "Administrative Staff",
    description: "Operations and management",
    icon: Briefcase,
    color: "from-[#00704A] to-[#005239]",
  },
};

// 🧍 Dummy data
const dummyMembers = [
  {
    id: 1,
    full_name: "Md. Arif Hossain",
    category: "executive",
    position: "President",
    email: "arif.hossain@example.com",
    phone: "+8801711000001",
    photo_url:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
    bio: "Leading the Bangladesh Athletics Federation with a focus on development and excellence.",
    achievements: ["Led national sports program", "Increased funding by 30%"],
  },
  {
    id: 2,
    full_name: "Farzana Ahmed",
    category: "board",
    position: "Director of Operations",
    email: "farzana.ahmed@example.com",
    phone: "+8801711000002",
    photo_url:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=500",
    bio: "Oversees operational efficiency and compliance across departments.",
    achievements: ["Implemented digital systems", "Improved logistics chain"],
  },
  {
    id: 3,
    full_name: "Tanvir Alam",
    category: "technical",
    position: "Head Coach",
    email: "tanvir.alam@example.com",
    phone: "+8801711000003",
    photo_url: "https://randomuser.me/api/portraits/men/24.jpg",
    bio: "Coaching national athletes with innovative training strategies.",
    achievements: ["Trained 5 national champions", "Introduced AI-driven performance analysis"],
  },
  {
    id: 4,
    full_name: "Rafiq Hasan",
    category: "administrative",
    position: "Admin Manager",
    email: "rafiq.hasan@example.com",
    phone: "+8801711000004",
    photo_url: "",
    bio: "Handles day-to-day management and coordination within the federation.",
    achievements: ["Optimized internal workflows", "Reduced operational costs by 20%"],
  },
  {
    id: 5,
    full_name: "Nadia Rahman",
    category: "executive",
    position: "Vice President",
    email: "nadia.rahman@example.com",
    phone: "+8801711000005",
    photo_url: "https://randomuser.me/api/portraits/women/33.jpg",
    bio: "Supports strategic initiatives and athlete welfare programs.",
    achievements: ["Established athlete mentorship programs", "Expanded outreach initiatives"],
  },
  {
    id: 6,
    full_name: "Sajjad Karim",
    category: "board",
    position: "Treasurer",
    email: "sajjad.karim@example.com",
    phone: "+8801711000006",
    photo_url: "https://randomuser.me/api/portraits/men/9.jpg",
    bio: "Manages the financial planning and auditing for the federation.",
    achievements: ["Digitized financial reporting", "Secured corporate sponsorships"],
  },
  {
    id: 7,
    full_name: "Rumana Akter",
    category: "technical",
    position: "Assistant Coach",
    email: "rumana.akter@example.com",
    phone: "+8801711000007",
    photo_url: "https://randomuser.me/api/portraits/women/52.jpg",
    bio: "Specializes in sprint and endurance training programs.",
    achievements: ["Developed athlete performance metrics", "Trained 3 regional winners"],
  },
  {
    id: 8,
    full_name: "Ashraful Islam",
    category: "administrative",
    position: "Communications Officer",
    email: "ashraful.islam@example.com",
    phone: "+8801711000008",
    photo_url: "https://randomuser.me/api/portraits/men/15.jpg",
    bio: "Responsible for managing public relations and media coverage.",
    achievements: ["Launched federation’s digital presence", "Increased media reach by 40%"],
  },
  {
    id: 9,
    full_name: "Khadija Jahan",
    category: "executive",
    position: "Secretary General",
    email: "khadija.jahan@example.com",
    phone: "+8801711000009",
    photo_url: "https://randomuser.me/api/portraits/women/40.jpg",
    bio: "Coordinates executive operations and ensures policy implementation.",
    achievements: ["Implemented governance framework", "Improved cross-department efficiency"],
  },
  {
    id: 10,
    full_name: "Mahfuz Rahman",
    category: "technical",
    position: "Physiotherapist",
    email: "mahfuz.rahman@example.com",
    phone: "+8801711000010",
    photo_url: "https://randomuser.me/api/portraits/men/7.jpg",
    bio: "Provides medical and recovery support to athletes.",
    achievements: ["Reduced injury recovery time by 25%", "Designed rehab protocols"],
  },
  {
    id: 11,
    full_name: "Shamima Chowdhury",
    category: "board",
    position: "Member of Finance Committee",
    email: "shamima.chowdhury@example.com",
    phone: "+8801711000011",
    photo_url: "https://randomuser.me/api/portraits/women/46.jpg",
    bio: "Supports strategic financial decisions and audits.",
    achievements: ["Improved budget allocation", "Streamlined expense approval"],
  },
  {
    id: 12,
    full_name: "Rezaul Karim",
    category: "administrative",
    position: "IT Manager",
    email: "rezaul.karim@example.com",
    phone: "+8801711000012",
    photo_url: "https://randomuser.me/api/portraits/men/50.jpg",
    bio: "Manages IT infrastructure and federation’s digital systems.",
    achievements: ["Modernized server systems", "Introduced digital attendance"],
  },
  {
    id: 13,
    full_name: "Tania Akhter",
    category: "technical",
    position: "Nutrition Specialist",
    email: "tania.akhter@example.com",
    phone: "+8801711000013",
    photo_url: "https://randomuser.me/api/portraits/women/26.jpg",
    bio: "Designs personalized nutrition plans for athletes.",
    achievements: ["Developed hydration protocol", "Improved recovery diet efficiency"],
  },
  {
    id: 14,
    full_name: "Imran Hossain",
    category: "board",
    position: "Legal Advisor",
    email: "imran.hossain@example.com",
    phone: "+8801711000014",
    photo_url: "https://randomuser.me/api/portraits/men/19.jpg",
    bio: "Provides legal guidance and manages compliance issues.",
    achievements: ["Updated policy documents", "Handled 20+ legal cases successfully"],
  },
  {
    id: 15,
    full_name: "Shamim Rahman",
    category: "executive",
    position: "Joint Secretary",
    email: "shamim.rahman@example.com",
    phone: "+8801711000015",
    photo_url: "https://randomuser.me/api/portraits/men/44.jpg",
    bio: "Assists in managing organizational communications and planning.",
    achievements: ["Implemented project tracking system", "Enhanced internal communication"],
  },
  {
    id: 16,
    full_name: "Nusrat Islam",
    category: "administrative",
    position: "HR Manager",
    email: "nusrat.islam@example.com",
    phone: "+8801711000016",
    photo_url: "https://randomuser.me/api/portraits/women/58.jpg",
    bio: "Oversees recruitment and staff welfare programs.",
    achievements: ["Introduced employee wellness plan", "Improved retention by 15%"],
  },
  {
    id: 17,
    full_name: "Aminul Haque",
    category: "technical",
    position: "Strength & Conditioning Coach",
    email: "aminul.haque@example.com",
    phone: "+8801711000017",
    photo_url: "https://randomuser.me/api/portraits/men/28.jpg",
    bio: "Develops strength programs to enhance athlete performance.",
    achievements: ["Reduced fatigue injuries", "Enhanced power output by 18%"],
  },
  {
    id: 18,
    full_name: "Rukhsana Begum",
    category: "board",
    position: "Marketing Director",
    email: "rukhsana.begum@example.com",
    phone: "+8801711000018",
    photo_url: "https://randomuser.me/api/portraits/women/39.jpg",
    bio: "Leads marketing campaigns and brand development.",
    achievements: ["Secured national sponsorship deal", "Increased brand engagement by 45%"],
  },
  {
    id: 19,
    full_name: "Fahim Ahmed",
    category: "technical",
    position: "Performance Analyst",
    email: "fahim.ahmed@example.com",
    phone: "+8801711000019",
    photo_url: "https://randomuser.me/api/portraits/men/63.jpg",
    bio: "Analyzes athlete data to optimize performance outcomes.",
    achievements: ["Developed data dashboard", "Enhanced scouting accuracy by 20%"],
  },
  {
    id: 20,
    full_name: "Sabina Yasmin",
    category: "administrative",
    position: "Event Coordinator",
    email: "sabina.yasmin@example.com",
    phone: "+8801711000020",
    photo_url: "https://randomuser.me/api/portraits/women/15.jpg",
    bio: "Coordinates logistics for national and international events.",
    achievements: ["Managed 10+ major tournaments", "Improved event satisfaction by 30%"],
  },
];

export default function BoardMembers() {
  const [activeCategory, setActiveCategory] = useState("executive");

  const filteredMembers =
    activeCategory === "all" ? dummyMembers : dummyMembers.filter((m) => m.category === activeCategory);

  return (
    <div className="pt-40 bg-gradient-to-br from-[#F8F6F3] to-white ">
      <div className="main_container mx-auto px-3 md:px-0">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00704A]/10 to-[#C1272D]/10 rounded-full mb-6">
            <Users className="w-4 h-4 text-[#00704A]" />
            <span className="text-sm font-semibold text-[#00704A]">Leadership Team</span>
          </div>

          <DynamicHeading title="Board Members" className="text-4xl lg:text-6xl font-bold" />

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Meet the dedicated leaders and professionals guiding Bangladesh Athletics Federation towards excellence and
            growth.
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-12 p-2 md:w-fit">
          <TabsList className="flex flex-row items-center gap-4 bg-white border border-gray-200 p-1 rounded-xl overflow-auto">
            {Object.entries(categoryInfo).map(([key, info]) => {
              const Icon = info.icon;
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="rounded-lg p-3  data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00704A] data-[state=active]:to-[#005239] data-[state=active]:text-white"
                >
                  <Icon className="w-4 h-4 mr" />
                  {info.title.split(" ")[0]}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        {/* Category Description */}
        <div className="mb-12">
          <Card className="border-none shadow-lg bg-gradient-to-r from-white to-[#F8F6F3]">
            <CardContent className="p-8">
              <div className="flex items-center gap-4">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${categoryInfo[activeCategory].color} flex items-center justify-center shadow-lg`}
                >
                  {React.createElement(categoryInfo[activeCategory].icon, {
                    className: "w-8 h-8 text-white",
                  })}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#2D3436] mb-1">{categoryInfo[activeCategory].title}</h2>
                  <p className="text-gray-600">{categoryInfo[activeCategory].description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Members Grid */}
        {filteredMembers.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMembers.map((member) => (
              <Card
                key={member.id}
                className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden group"
              >
                {/* Photo */}
                <div className="h-80 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  {member.photo_url ? (
                    <img
                      src={member.photo_url}
                      alt={member.full_name}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                      <div
                        className={`w-28 h-28 rounded-full bg-gradient-to-br ${
                          categoryInfo[member.category].color
                        } flex items-center justify-center shadow-md`}
                      >
                        <span className="text-4xl font-semibold text-white">{member.full_name.charAt(0)}</span>
                      </div>
                    </div>
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <Badge
                      className={`bg-gradient-to-r ${
                        categoryInfo[member.category].color
                      } text-white border-none px-2 py-1 rounded-2xl`}
                    >
                      {member.position}
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-[#2D3436] mb-3">{member.full_name}</h3>

                  {member.bio && <p className="text-gray-600 text-sm mb-4 line-clamp-3">{member.bio}</p>}

                  {member.achievements && member.achievements.length > 0 && (
                    <div className="mb-4 pb-4 border-b border-gray-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-4 h-4 text-[#D4AF37]" />
                        <span className="text-sm font-semibold text-gray-700">Key Achievements</span>
                      </div>
                      <ul className="space-y-1">
                        {member.achievements.slice(0, 2).map((a, idx) => (
                          <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 flex-shrink-0" />
                            <span className="line-clamp-1">{a}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="space-y-2">
                    {member.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4 text-[#00704A]" />
                        <a href={`mailto:${member.email}`} className="hover:text-[#00704A] transition-colors">
                          {member.email}
                        </a>
                      </div>
                    )}

                    {member.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4 text-[#C1272D]" />
                        <a href={`tel:${member.phone}`} className="hover:text-[#C1272D] transition-colors">
                          {member.phone}
                        </a>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-none shadow-lg">
            <CardContent className="p-16 text-center">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No board members in this category yet</p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="mt-20">
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#00704A] to-[#005239] text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className=" mx-auto px-4 text-center relative z-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <Users className="w-16 h-16 mx-auto mb-4" />
              <h2 className="text-3xl md:text-4xl font-bold">Want to Join Our Team?</h2>
              <p className="text-xl text-white/90 leading-relaxed">
                We're always looking for passionate individuals dedicated to developing athletics in Bangladesh.
                Volunteer opportunities and positions are available.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <a href={`mailto:info@bdathletics.gov.bd`}>
                  <button className="px-8 py-3 bg-white text-[#00704A] rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                    Contact Us
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
