"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileText, CheckCircle, XCircle, Globe, Flag, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function AntiDopingPage() {
  const sections = [
    {
      title: "Rules & Regulations",
      description: "Comprehensive anti-doping rules, athlete responsibilities, and testing procedures.",
      icon: FileText,
      color: "from-[#C1272D] to-[#A01F25]",
      iconBg: "bg-[#C1272D]/10",
      iconColor: "text-[#A01F25]",
      stats: "15+ Rules",
      href: "/anti-doping/rules-and-regulation",
    },
    {
      title: "Approved Supplements",
      description: "List of verified safe supplements and nutrition products for athletes.",
      icon: CheckCircle,
      color: "from-[#00704A] to-[#005239]",
      iconBg: "bg-[#00704A]/10",
      iconColor: "text-[#005239]",
      stats: "50+ Products",
      href: "/anti-doping/approved-supplements",
    },
    {
      title: "WADA Guidelines",
      description: "Official World Anti-Doping Agency standards and documentation.",
      icon: Globe,
      color: "from-[#D4AF37] to-[#B8941F]",
      iconBg: "bg-[#D4AF37]/10",
      iconColor: "text-[#B8941F]",
      stats: "International Standards",
      href: "/anti-doping/wada-guidelines",
    },
    {
      title: "Banned Substances",
      description: "Complete database of prohibited substances and methods.",
      icon: XCircle,
      color: "from-[#C1272D] to-[#A01F25]",
      iconBg: "bg-[#C1272D]/10",
      iconColor: "text-[#A01F25]",
      stats: "200+ Substances",
      href: "/anti-doping/banned-supplements",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-[#C1272D] to-[#A01F25] text-white pt-52 pb-10  px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-55 blur-sm">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>

        <div className="main_container mx-auto relative z-10 pt-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-md">
              <Shield className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-bold drop-shadow-sm">Anti-Doping & Fair Play</h1>
              <p className="text-xl text-white/90 mt-2">Clean Sport. Fair Competition. Integrity First.</p>
            </div>
          </div>

          <p className="text-xl text-white/90 max-w-3xl mt-6 leading-relaxed">
            The Bangladesh Athletics Federation is committed to maintaining integrity in sport through comprehensive
            anti-doping measures and athlete education.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <div className="main_container mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: "100%", label: "Clean Sport Commitment", color: "text-[#C1272D]" },
            { value: "24/7", label: "Confidential Reporting", color: "text-[#00704A]" },
            { value: "WADA", label: "Compliant", color: "text-[#D4AF37]" },
            { value: "Zero", label: "Tolerance Policy", color: "text-[#A01F25]" },
          ].map((item, i) => (
            <div key={i}>
              <div className={`text-4xl md:text-5xl font-bold mb-2 ${item.color}`}>{item.value}</div>
              <div className="text-sm md:text-base text-gray-700 font-medium">{item.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Resource Cards */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Anti-Doping Resources</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access rules, supplements, banned substances, and global anti-doping standards.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {sections.map((section, idx) => {
            const Icon = section.icon;
            return (
              <Card
                key={idx}
                className="group hover:shadow-xl border border-gray-100 hover:border-gray-200 transition-all overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${section.color}`} />
                <CardHeader className="px-6 py-3">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 ${section.iconBg} rounded-xl flex items-center justify-center`}>
                      <Icon className={`w-7 h-7 ${section.iconColor}`} />
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {section.stats}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl">{section.title}</CardTitle>
                  <CardDescription className="text-base mt-2">{section.description}</CardDescription>
                </CardHeader>
                <CardContent className="px-6 py-3">
                  <Link href={section.href}>
                    <Button
                      variant="black"
                      type="button"
                      className={`w-full bg-gradient-to-r ${section.color} text-white hover:opacity-90 transition-all group-hover:gap-3`}
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Report Violation CTA */}
        <Card className="bg-gradient-to-br from-[#C1272D] to-[#A01F25] text-white border-none shadow-2xl overflow-hidden">
          <CardContent className="p-10 md:p-12 relative text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Flag className="w-8 h-8" />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Report a Violation</h3>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Witnessed a doping violation? Reports are treated with strict confidentiality. You can report
                anonymously.
              </p>
              <Link href="/anti-doping/violation-report">
                <Button
                  variant="black"
                  type="button"
                  className="bg-white text-[#C1272D] hover:bg-gray-100 font-semibold px-8"
                >
                  <Flag className="w-5 h-5 mr-2" />
                  Submit Confidential Report
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Core Principles */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Core Principles</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-l-4 border-l-[#C1272D] hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h4 className="font-bold text-lg mb-3 text-[#C1272D]">Zero Tolerance</h4>
                <p className="text-gray-700">
                  We maintain a strict zero-tolerance policy towards doping and cheating. Violations result in serious
                  consequences.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-[#00704A] hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h4 className="font-bold text-lg mb-3 text-[#00704A]">Athlete Education</h4>
                <p className="text-gray-700">
                  Comprehensive education programs help athletes comply with anti-doping rules, protecting their careers
                  and health.
                </p>
              </CardContent>
            </Card>
            <Card className="border-l-4 border-l-[#D4AF37] hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h4 className="font-bold text-lg mb-3 text-[#D4AF37]">Fair Competition</h4>
                <p className="text-gray-700">
                  Every athlete deserves a level playing field. Clean sport ensures fairness and preserves the integrity
                  of athletics.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
