"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Trophy,
  Building2,
  Mail,
  Phone,
  User,
  Briefcase,
  Globe,
  Send,
  CheckCircle,
  Award,
  Users,
  Target,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const sponsorshipTiers = {
  platinum: {
    name: "Platinum Partner",
    price: "BDT 10,000,000+",
    icon: "💎",
    color: "from-gray-300 to-gray-500",
    benefits: [
      "Title sponsorship of major events",
      "Exclusive brand placement across all venues",
      "VIP hospitality packages for all events",
      "Featured partner on all marketing materials",
      "Custom athlete development program sponsorship",
      "Board-level engagement opportunities",
      "Comprehensive media coverage",
      "Exclusive networking events",
    ],
  },
  gold: {
    name: "Gold Partner",
    price: "BDT 5,000,000 - 10,000,000",
    icon: "🏆",
    color: "from-[#D4AF37] to-[#B8941F]",
    benefits: [
      "Premium event sponsorship opportunities",
      "Brand placement at national championships",
      "VIP access to major events",
      "Featured in sponsor communications",
      "Athlete endorsement opportunities",
      "Training program sponsorship",
      "Digital and print media coverage",
      "Quarterly engagement sessions",
    ],
  },
  silver: {
    name: "Silver Partner",
    price: "BDT 2,000,000 - 5,000,000",
    icon: "🥈",
    color: "from-gray-400 to-gray-600",
    benefits: [
      "Event category sponsorship",
      "Logo placement on event materials",
      "Access to select events",
      "Social media recognition",
      "Facility naming opportunities",
      "Equipment sponsorship programs",
      "Press release mentions",
      "Bi-annual meetings",
    ],
  },
  bronze: {
    name: "Bronze Partner",
    price: "BDT 500,000 - 2,000,000",
    icon: "🥉",
    color: "from-[#CD7F32] to-[#A0522D]",
    benefits: [
      "Regional event sponsorship",
      "Website listing and recognition",
      "Event ticket allocation",
      "Social media acknowledgment",
      "Youth program support opportunities",
      "Community engagement initiatives",
      "Quarterly newsletters",
      "Annual review meetings",
    ],
  },
};

const sponsorshipTypes = [
  {
    value: "title_sponsor",
    label: "Title Sponsorship",
    icon: Trophy,
    description: "Main sponsor of major events",
  },
  {
    value: "event_sponsor",
    label: "Event Sponsorship",
    icon: Award,
    description: "Sponsor specific competitions",
  },
  {
    value: "athlete_sponsor",
    label: "Athlete Sponsorship",
    icon: Users,
    description: "Support individual athletes",
  },
  {
    value: "facility_sponsor",
    label: "Facility Sponsorship",
    icon: Building2,
    description: "Training facilities and venues",
  },
  {
    value: "equipment_sponsor",
    label: "Equipment Sponsorship",
    icon: Target,
    description: "Sports equipment and gear",
  },
  {
    value: "program_sponsor",
    label: "Program Sponsorship",
    icon: TrendingUp,
    description: "Training and development programs",
  },
];

export default function BecomeASponsor() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    company_name: "",
    industry: "",
    contact_person: "",
    position: "",
    email: "",
    phone: "",
    website: "",
    sponsorship_interest: [] as string[],
    preferred_tier: "",
    budget_range: "",
    objectives: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // simulate async
    setTimeout(() => {
      console.log("📝 Submitted Data:", formData);
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      sponsorship_interest: prev.sponsorship_interest.includes(interest)
        ? prev.sponsorship_interest.filter((i) => i !== interest)
        : [...prev.sponsorship_interest, interest],
    }));
  };

  // ✅ SUCCESS SCREEN
  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] to-white flex items-center justify-center py-12 px-4">
        <Card className="max-w-2xl w-full border-none shadow-2xl">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-[#2D3436] mb-4">Thank You for Your Interest!</h2>
            <p className="text-gray-600 text-lg mb-8">
              We’ve received your sponsorship inquiry. Our partnerships team will contact you soon.
            </p>
            <div className="bg-[#D4AF37]/5 rounded-xl p-6 mb-8 text-left">
              <p className="text-sm text-gray-600">
                <strong>Next Steps:</strong>
                <br />• Review confirmation email
                <br />• Expect proposal discussion
                <br />• Meet our partnership team
              </p>
            </div>
            <div className="flex gap-4 justify-center">
              <Button type="button" variant="black" onClick={() => router.push("/sponsors")}>
                View Current Sponsors
              </Button>
              <Button
                onClick={() => setSubmitted(false)}
                className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] text-white"
              >
                Submit Another Inquiry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // ✅ MAIN PAGE
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] via-white to-[#F8F6F3] py-12 px-4 pt-24 sm:pt-40">
      <div className="main_container mx-auto">
        {/* HERO */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg mb-8 border border-[#D4AF37]/20">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-sm font-semibold bg-gradient-to-r from-[#D4AF37] to-[#B8941F] bg-clip-text text-transparent">
              Partnership Opportunities
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-[#2D3436] mb-6">
            Become a{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] bg-clip-text text-transparent">Sponsor</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Partner with Bangladesh Athletics Federation and support the development of world-class athletes while
            enhancing your brand’s visibility.
          </p>
        </div>

        {/* TIERS */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-[#2D3436] mb-12">
            Sponsorship <span className="text-[#D4AF37]">Packages</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(sponsorshipTiers).map(([key, tier]) => (
              <Card
                key={key}
                className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${tier.color}`} />
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-5xl mb-4">{tier.icon}</div>
                    <h3 className="text-xl font-bold text-[#2D3436] mb-2">{tier.name}</h3>
                    <Badge variant="outline" className={`bg-gradient-to-r ${tier.color} text-white border-none`}>
                      {tier.price}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    {tier.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-[#00704A] mt-0.5 flex-shrink-0" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FORM */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* FORM SECTION */}
          <div className="lg:col-span-2">
            <Card className="border-none shadow-2xl">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-base md:text-2xl p-4">Sponsorship Inquiry Form</CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Company Information */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-[#2D3436]">Company Information</h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="company_name">Company Name *</Label>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            id="company_name"
                            placeholder="ABC Corporation"
                            value={formData.company_name}
                            onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                            className="pl-10 h-12"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="industry">Industry/Sector *</Label>
                        <Input
                          id="industry"
                          placeholder="e.g., Banking, Telecom"
                          value={formData.industry}
                          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                          className="h-12"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            id="website"
                            type="url"
                            placeholder="https://www.example.com"
                            value={formData.website}
                            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                            className="pl-10 h-12"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Person */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-[#2D3436] pt-6 border-t border-gray-100">
                      Contact Person
                    </h3>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="contact_person">Full Name *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            id="contact_person"
                            placeholder="John Doe"
                            value={formData.contact_person}
                            onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
                            className="pl-10 h-12"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="position">Position/Title *</Label>
                        <div className="relative">
                          <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            id="position"
                            placeholder="Marketing Director"
                            value={formData.position}
                            onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                            className="pl-10 h-12"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="pl-10 h-12"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            id="phone"
                            placeholder="+880 1XXX-XXXXXX"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="pl-10 h-12"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sponsorship Interest */}
                  <div className="space-y-6 pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-semibold text-[#2D3436]">Sponsorship Interest *</h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      {sponsorshipTypes.map((type) => {
                        const Icon = type.icon;
                        const isSelected = formData.sponsorship_interest.includes(type.value);
                        return (
                          <button
                            key={type.value}
                            type="button"
                            onClick={() => handleInterestToggle(type.value)}
                            className={`p-4 border-2 rounded-xl transition-all text-left ${
                              isSelected
                                ? "border-[#D4AF37] bg-[#D4AF37]/5"
                                : "border-gray-200 hover:border-[#D4AF37]/50"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <Icon className="w-5 h-5 text-[#D4AF37] mt-1 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="font-semibold text-sm mb-1">{type.label}</p>
                                <p className="text-xs text-gray-600">{type.description}</p>
                              </div>
                              {isSelected && <CheckCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Preferred Tier & Budget */}
                  <div className="grid md:grid-cols-2 gap-6 w-full">
                    <div className="space-y-2">
                      <Label htmlFor="preferred_tier">Preferred Tier</Label>
                      <Select
                        value={formData.preferred_tier}
                        onValueChange={(value) => setFormData({ ...formData, preferred_tier: value })}
                      >
                        <SelectTrigger className="h-full w-full">
                          <SelectValue placeholder="Select tier" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="platinum">💎 Platinum</SelectItem>
                          <SelectItem value="gold">🏆 Gold</SelectItem>
                          <SelectItem value="silver">🥈 Silver</SelectItem>
                          <SelectItem value="bronze">🥉 Bronze</SelectItem>
                          <SelectItem value="custom">Custom Package</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="budget_range">Budget Range (BDT)</Label>
                      <Select
                        value={formData.budget_range}
                        onValueChange={(value) => setFormData({ ...formData, budget_range: value })}
                      >
                        <SelectTrigger className="h-12 w-full">
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under_500k">Under 500,000</SelectItem>
                          <SelectItem value="500k_1m">500,000 - 1,000,000</SelectItem>
                          <SelectItem value="1m_5m">1,000,000 - 5,000,000</SelectItem>
                          <SelectItem value="5m_10m">5,000,000 - 10,000,000</SelectItem>
                          <SelectItem value="above_10m">Above 10,000,000</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Objectives */}
                  <div className="space-y-2">
                    <Label htmlFor="objectives">Sponsorship Objectives *</Label>
                    <Textarea
                      id="objectives"
                      placeholder="What do you hope to achieve through this sponsorship? (e.g., brand awareness, CSR goals, community engagement)"
                      value={formData.objectives}
                      onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                      className="min-h-32"
                      required
                    />
                  </div>

                  {/* Additional Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Information</Label>
                    <Textarea
                      id="message"
                      placeholder="Any additional information or specific requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="min-h-32"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    variant="black"
                    type="submit"
                    // disabled={
                    //   submitMutation.isPending ||
                    //   !formData.company_name ||
                    //   !formData.contact_person ||
                    //   !formData.email ||
                    //   formData.sponsorship_interest.length === 0 ||
                    //   !formData.objectives
                    // }
                    className="w-full h-14 bg-gradient-to-r from-[#D4AF37] to-[#B8941F] hover:from-[#B8941F] hover:to-[#D4AF37] text-white text-lg font-semibold"
                  >
                    {false ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Submit Sponsorship Inquiry
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Why Sponsor */}
            <Card className="border-none shadow-xl bg-gradient-to-br from-[#00704A] to-[#005239] text-white">
              <CardContent className="p-8">
                <Trophy className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold mb-4">Why Sponsor BAF?</h3>
                <ul className="space-y-3 text-sm text-white/90">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Associate with national pride and sporting excellence</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Reach millions through event coverage and media exposure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Support youth development and community programs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>Customizable packages to meet your objectives</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="border-none shadow-xl">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="p-4">Need More Information?</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <p className="text-sm text-gray-600">
                  Our partnerships team is ready to discuss custom sponsorship packages tailored to your needs.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-[#D4AF37]" />
                    <a href="mailto:partnerships@bdathletics.gov.bd" className="text-[#00704A] hover:underline">
                      partnerships@bdathletics.gov.bd
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-[#D4AF37]" />
                    <a href="tel:+8801234567890" className="text-gray-600">
                      +880 1234-567890
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Success Stories */}
            <Card className="border-none shadow-xl">
              <CardContent className="p-6">
                <h4 className="font-semibold text-[#2D3436] mb-3">Success Stories</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Join leading brands who have partnered with BAF to achieve their marketing and CSR objectives.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    50+ Events
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    200+ Athletes
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    5M+ Reach
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
