import React from "react";
import {
  Target,
  Eye,
  Heart,
  Users,
  Trophy,
  TrendingUp,
  Shield,
  Sparkles,
  Globe,
  Zap,
  Award,
  BookOpen,
} from "lucide-react";
import DynamicHeading from "@/components/Home/HeadingComponent";
import { Badge } from "@/components/ui/Badge";

const coreValues = [
  {
    icon: Trophy,
    title: "Excellence",
    description: "Pursuing the highest standards in training, competition, and sportsmanship",
    color: "from-[#00704A] to-[#005239]",
  },
  {
    icon: Heart,
    title: "Integrity",
    description: "Upholding honesty, fairness, and ethical conduct in all our activities",
    color: "from-[#C1272D] to-[#A01F25]",
  },
  {
    icon: Users,
    title: "Inclusivity",
    description: "Creating opportunities for all athletes regardless of background or ability",
    color: "from-[#D4AF37] to-[#B8941F]",
  },
  {
    icon: TrendingUp,
    title: "Development",
    description: "Continuous improvement through innovation, education, and dedication",
    color: "from-[#D4AF37] to-[#B8941F]",
  },
  {
    icon: Shield,
    title: "Safety",
    description: "Ensuring athlete wellbeing and promoting clean, fair competition",
    color: "from-[#00704A] to-[#005239]",
  },
  {
    icon: Globe,
    title: "Unity",
    description: "Building a strong athletics community that represents Bangladesh with pride",

    color: "from-[#C1272D] to-[#A01F25]",
  },
];

const objectives = [
  {
    icon: Target,
    title: "Talent Identification & Development",
    points: [
      "Implement nationwide grassroots programs",
      "Establish regional training centers",
      "Create clear athlete progression pathways",
      "Provide world-class coaching and facilities",
    ],
  },
  {
    icon: Award,
    title: "Competitive Excellence",
    points: [
      "Win medals at South Asian Games",
      "Qualify athletes for Olympic Games",
      "Break national and regional records",
      "Develop podium-ready athletes",
    ],
  },
  {
    icon: BookOpen,
    title: "Education & Awareness",
    points: [
      "Conduct anti-doping education programs",
      "Provide sports science knowledge",
      "Offer career guidance for athletes",
      "Promote healthy lifestyle choices",
    ],
  },
  {
    icon: Users,
    title: "Community Engagement",
    points: [
      "Partner with schools and universities",
      "Organize public athletics events",
      "Build fan and supporter communities",
      "Increase media coverage and visibility",
    ],
  },
];

const MissionAndVision = () => {
  return (
    <div className="bg-[#F2F0EF]">
      <div className="py-16 px-4 lg:px-0 pt-40 main_container ">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00704A]/10 to-[#C1272D]/10 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[#00704A]" />
            <span className="text-sm font-semibold text-[#00704A]">Our Purpose</span>
          </div>

          <DynamicHeading title="Mission & Vision" className="text-4xl lg:text-6xl font-bold" />

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Guiding principles that drive our commitment to athletics excellence and the development of world-class
            athletes in Bangladesh
          </p>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          {/* Mission Card */}
          <div className="rounded-2xl border-none shadow-2xl overflow-hidden group hover:shadow-3xl transition-all duration-300">
            <div className="h-48 bg-gradient-to-br from-[#00704A] to-[#005239] relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Target className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            </div>

            <div className="p-8 md:p-10 bg-white">
              <h2 className="text-3xl font-bold text-[#2D3436] mb-6">Our Mission</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  To develop, promote, and elevate athletics in Bangladesh by providing world-class training,
                  competitive opportunities, and support systems that enable our athletes to achieve excellence at
                  national and international levels.
                </p>
                <p>
                  We are committed to fostering a culture of sportsmanship, integrity, and continuous improvement while
                  ensuring athletics is accessible to all Bangladeshis, regardless of background or circumstance.
                </p>
                <div className="flex flex-wrap gap-2 pt-4">
                  <Badge
                    variant="secondary"
                    className="bg-[#00704A]/10 text-[#00704A] border-none rounded-2xl px-2 py-1"
                  >
                    Development
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-[#00704A]/10 text-[#00704A] border-none rounded-2xl px-2 py-1"
                  >
                    Excellence
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-[#00704A]/10 text-[#00704A] border-none rounded-2xl px-2 py-1"
                  >
                    Accessibility
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div className="rounded-2xl border-none shadow-2xl overflow-hidden group hover:shadow-3xl transition-all duration-300">
            <div className="h-48 bg-gradient-to-br from-[#C1272D] to-[#A01F25] relative overflow-hidden">
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Eye className="w-12 h-12 text-white" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            </div>

            <div className="p-8 md:p-10 bg-white">
              <h2 className="text-3xl font-bold text-[#2D3436] mb-6">Our Vision</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  To be recognized as a leading athletics federation in South Asia, producing world-class athletes who
                  compete at the highest levels including the Olympic Games and World Championships.
                </p>
                <p>
                  We envision a Bangladesh where athletics is celebrated, supported, and serves as a source of national
                  pride, inspiring future generations to pursue excellence in sports and life.
                </p>
                <div className="flex flex-wrap gap-2 pt-4">
                  <Badge
                    variant="destructive"
                    className="!bg-[#C1272D]/10 !text-[#C1272D] border-none rounded-2xl px-2 py-1"
                  >
                    Leadership
                  </Badge>
                  <Badge
                    variant="destructive"
                    className="!bg-[#C1272D]/10 !text-[#C1272D] border-none rounded-2xl px-2 py-1"
                  >
                    Pride
                  </Badge>
                  <Badge
                    variant="destructive"
                    className="!bg-[#C1272D]/10 !text-[#C1272D] border-none rounded-2xl px-2 py-1"
                  >
                    Inspiration
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D3436] mb-4">
              Core <span className="text-[#D4AF37]">Values</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-[#00704A] to-[#C1272D] mx-auto rounded-full" />
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              The fundamental principles that guide our decisions, actions, and interactions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, index) => {
              const Icon = value.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className="p-8">
                    <div
                      className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[#2D3436] mb-3">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Strategic Objectives Section */}
        <div className="mb-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D3436] mb-4">
              Strategic <span className="text-[#00704A]">Objectives</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-[#00704A] to-[#C1272D] mx-auto rounded-full" />
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Key focus areas driving our mission forward</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {objectives.map((objective, index) => {
              const Icon = objective.icon;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-white border-none shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <div className="p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00704A] to-[#005239] flex items-center justify-center flex-shrink-0">
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#2D3436]">{objective.title}</h3>
                      </div>
                    </div>

                    <ul className="space-y-3">
                      {objective.points.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <div className="w-2 h-2 rounded-full bg-[#00704A] mt-2 flex-shrink-0" />
                          <span className="text-gray-600">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div>
        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-[#00704A] to-[#005239] text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />

          <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

              <div className="relative z-10 max-w-3xl mx-auto space-y-6">
                <Zap className="w-16 h-16 mx-auto mb-4" />
                <h2 className="text-3xl md:text-4xl font-bold">Join Our Journey</h2>
                <p className="text-xl text-white/90 leading-relaxed">
                  Whether you're an aspiring athlete, coach, volunteer, or supporter, you have a place in our mission.
                  Together, we're building the future of Bangladesh athletics.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MissionAndVision;
