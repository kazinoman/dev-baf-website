"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { FileText, Download, ExternalLink, BookOpen, Globe, ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function WadaGuidelinesPage() {
  const guidelines = [
    {
      title: "World Anti-Doping Code",
      description: "The core document that harmonizes anti-doping policies worldwide",
      version: "2021 Edition",
      type: "Core Document",
      pages: "185 pages",
    },
    {
      title: "International Standards",
      description: "Technical and operational requirements for anti-doping programs",
      version: "2024",
      type: "Standards",
      pages: "Multiple Standards",
    },
    {
      title: "Prohibited List",
      description: "Annual list of substances and methods banned in sport",
      version: "2024",
      type: "Reference",
      pages: "Updated Annually",
    },
    {
      title: "Athlete Guide",
      description: "Comprehensive guide for athletes on anti-doping rules",
      version: "Latest",
      type: "Education",
      pages: "50+ pages",
    },
    {
      title: "Testing & Investigations",
      description: "Guidelines for sample collection and investigation procedures",
      version: "2024",
      type: "Standards",
      pages: "Technical Guide",
    },
    {
      title: "Results Management",
      description: "Process for handling adverse analytical findings",
      version: "2024",
      type: "Standards",
      pages: "Procedures Manual",
    },
  ];

  const principles = [
    {
      title: "Protect Athletes' Health",
      description:
        "Doping can cause serious short-term and long-lasting health damage including cardiovascular issues, hormonal imbalances, and psychological problems.",
    },
    {
      title: "Ensure Fair Competition",
      description:
        "All athletes should compete on a level playing field without artificial enhancements that provide unfair advantages over clean athletes.",
    },
    {
      title: "Maintain Sport's Integrity",
      description:
        "Clean sport upholds the fundamental values and ethics of athletics including honesty, respect, excellence, and courage.",
    },
    {
      title: "Promote Clean Sport Culture",
      description:
        "Education and awareness programs are essential to preventing doping and fostering a culture of clean competition at all levels.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#D4AF37] to-[#B8941F] text-white pt-52 pb-10 px-6">
        <div className="main_container mx-auto">
          <Link href="/anti-doping">
            <Button variant="black" className="text-white hover:bg-white/20 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Anti-Doping
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Globe className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">WADA Guidelines</h1>
              <p className="text-xl text-white/90 mt-2">World Anti-Doping Agency standards and documentation</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main_container mx-auto px-6 py-12">
        {/* WADA Introduction */}
        <Card className="bg-gradient-to-br from-yellow-50 to-amber-50 border-2 border-yellow-200 mb-12">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Globe className="w-10 h-10 text-yellow-700" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4 text-yellow-900">World Anti-Doping Agency (WADA)</h2>
                <p className="text-gray-800 text-lg mb-6 leading-relaxed">
                  WADA is the international independent agency established in 1999 to promote, coordinate, and monitor
                  the fight against doping in sport. It develops and harmonizes anti-doping rules and policies
                  worldwide, ensuring consistency across all sports and countries.
                </p>
                <Button variant="black" className="bg-[#D4AF37] hover:bg-[#B8941F] gap-2 text-white">
                  <ExternalLink className="w-4 h-4" />
                  Visit WADA Official Website
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Core Principles */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-yellow-900">Core Principles of Anti-Doping</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {principles.map((principle, idx) => (
              <Card key={idx} className="border-l-4 border-l-[#D4AF37] hover:shadow-xl transition-shadow p-5">
                <CardHeader>
                  <CardTitle className="text-xl text-yellow-800">{principle.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-gray-700 leading-relaxed">{principle.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Official Documents */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-yellow-900">Official WADA Documents</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guidelines.map((guide, idx) => (
              <Card
                key={idx}
                className="p-4 hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-yellow-300 group"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <FileText className="w-10 h-10 text-yellow-700 group-hover:scale-110 transition-transform" />
                    <Badge variant="secondary">{guide.type}</Badge>
                  </div>
                  <CardTitle className="text-lg mb-2 group-hover:text-yellow-800 transition-colors">
                    {guide.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600">{guide.description}</p>
                  <div className="flex gap-2 mt-3">
                    <Badge variant="outline" className="text-xs">
                      {guide.version}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {guide.pages}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Button
                    variant="black"
                    className="w-full gap-2 hover:bg-yellow-50 hover:text-yellow-800 hover:border-yellow-300"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Code Provisions */}
        <Card className="mb-12 border-2">
          <CardHeader className="bg-yellow-50">
            <CardTitle className="text-2xl flex items-center gap-3 text-yellow-900 p-5">
              <BookOpen className="w-6 h-6 text-yellow-700" />
              Key WADA Code Provisions
            </CardTitle>
          </CardHeader>
          <CardContent className="px-5">
            <div className="grid md:grid-cols-2 gap-6 py-5">
              <div className="p-5 bg-yellow-50 rounded-lg border-2 border-yellow-100">
                <h4 className="font-bold text-lg mb-3 text-yellow-900">Article 2: Anti-Doping Rule Violations</h4>
                <p className="text-gray-700">
                  Defines 11 specific violations including presence of prohibited substances, use or attempted use,
                  evading sample collection, tampering, possession, trafficking, and whereabouts failures.
                </p>
              </div>
              <div className="p-5 bg-amber-50 rounded-lg border-2 border-amber-100">
                <h4 className="font-bold text-lg mb-3 text-amber-900">Article 10: Sanctions</h4>
                <p className="text-gray-700">
                  Establishes standard periods of ineligibility ranging from reprimands and warnings to lifetime bans
                  depending on the nature and circumstances of the anti-doping rule violation.
                </p>
              </div>
              <div className="p-5 bg-orange-50 rounded-lg border-2 border-orange-100">
                <h4 className="font-bold text-lg mb-3 text-orange-900">Article 14: Results Management</h4>
                <p className="text-gray-700">
                  Outlines comprehensive procedures for handling adverse analytical findings, atypical findings, and
                  other anti-doping rule violations including notification and provisional suspensions.
                </p>
              </div>
              <div className="p-5 bg-lime-50 rounded-lg border-2 border-lime-100">
                <h4 className="font-bold text-lg mb-3 text-lime-900">Article 21: Additional Roles</h4>
                <p className="text-gray-700">
                  Defines responsibilities of athletes, athlete support personnel, national federations, and other
                  stakeholders in maintaining anti-doping compliance and clean sport.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Education & Resources */}
        <Card className="bg-gradient-to-br from-yellow-50 to-lime-50 border-2 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3 text-yellow-900 p-5">
              <Shield className="w-6 h-6 text-yellow-700" />
              Education & Resources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 pb-7">
              <Button variant="black" className="w-full justify-start gap-3 h-auto py-4 bg-white hover:border-blue-300">
                <FileText className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                  <div className="font-semibold">WADA E-Learning Platform (ADEL)</div>
                  <div className="text-xs text-gray-600">Interactive online courses</div>
                </div>
              </Button>
              <Button
                variant="black"
                className="w-full justify-start gap-3 h-auto py-4 bg-white hover:border-green-300"
              >
                <BookOpen className="w-5 h-5 text-green-600" />
                <div className="text-left">
                  <div className="font-semibold">ALPHA Program</div>
                  <div className="text-xs text-gray-600">Athlete Learning about Health & Anti-Doping</div>
                </div>
              </Button>
              <Button
                variant="black"
                className="w-full justify-start gap-3 h-auto py-4 bg-white hover:border-purple-300"
              >
                <Globe className="w-5 h-5 text-purple-600" />
                <div className="text-left">
                  <div className="font-semibold">Global DRO</div>
                  <div className="text-xs text-gray-600">Check medications for prohibited substances</div>
                </div>
              </Button>
              <Button
                variant="black"
                className="w-full justify-start gap-3 h-auto py-4 bg-white hover:border-orange-300"
              >
                <FileText className="w-5 h-5 text-orange-600" />
                <div className="text-left">
                  <div className="font-semibold">Athlete Central</div>
                  <div className="text-xs text-gray-600">Resources and information hub</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
