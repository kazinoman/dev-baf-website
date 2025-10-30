"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search, CheckCircle, Info, ArrowLeft, Filter } from "lucide-react";
import Link from "next/link";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function ApprovedSupplementsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const supplements = [
    {
      name: "Whey Protein Isolate",
      category: "Protein",
      description: "Pure protein supplement for muscle recovery and growth",
      certification: "NSF Certified for Sport",
      safetyLevel: "Safe",
      dosage: "20-30g per serving",
    },
    {
      name: "Creatine Monohydrate",
      category: "Performance",
      description: "Helps improve strength, power output, and muscle mass",
      certification: "Informed Sport",
      safetyLevel: "Safe",
      dosage: "3-5g daily",
    },
    {
      name: "Beta-Alanine",
      category: "Performance",
      description: "Reduces muscle fatigue during high-intensity exercise",
      certification: "NSF Certified for Sport",
      safetyLevel: "Safe",
      dosage: "2-5g daily",
    },
    {
      name: "Vitamin D3",
      category: "Vitamins",
      description: "Essential vitamin for bone health and immune function",
      certification: "USP Verified",
      safetyLevel: "Safe",
      dosage: "1000-4000 IU daily",
    },
    {
      name: "Omega-3 Fish Oil",
      category: "Essential Fatty Acids",
      description: "Supports cardiovascular health and reduces inflammation",
      certification: "IFOS Certified",
      safetyLevel: "Safe",
      dosage: "1-3g EPA+DHA daily",
    },
    {
      name: "BCAAs (Branched-Chain Amino Acids)",
      category: "Amino Acids",
      description: "Leucine, isoleucine, valine for muscle recovery",
      certification: "Informed Sport",
      safetyLevel: "Safe",
      dosage: "5-10g per serving",
    },
    {
      name: "Magnesium Citrate",
      category: "Minerals",
      description: "Important for muscle function and energy production",
      certification: "USP Verified",
      safetyLevel: "Safe",
      dosage: "200-400mg daily",
    },
    {
      name: "Caffeine",
      category: "Stimulants",
      description: "Enhances alertness and endurance (within WADA limits)",
      certification: "Informed Sport",
      safetyLevel: "Monitor Intake",
      dosage: "3-6mg/kg bodyweight",
    },
    {
      name: "Electrolyte Powder",
      category: "Hydration",
      description: "Replenishes fluids and minerals lost through sweat",
      certification: "NSF Certified for Sport",
      safetyLevel: "Safe",
      dosage: "As needed during exercise",
    },
    {
      name: "L-Glutamine",
      category: "Amino Acids",
      description: "Supports immune function and gut health",
      certification: "Informed Sport",
      safetyLevel: "Safe",
      dosage: "5-10g daily",
    },
    {
      name: "Multivitamin Complex",
      category: "Vitamins",
      description: "Comprehensive vitamin and mineral support",
      certification: "USP Verified",
      safetyLevel: "Safe",
      dosage: "1 serving daily",
    },
    {
      name: "Zinc",
      category: "Minerals",
      description: "Essential mineral for immune function and recovery",
      certification: "USP Verified",
      safetyLevel: "Safe",
      dosage: "15-30mg daily",
    },
  ];

  const filteredSupplements = supplements.filter((supp) => {
    const matchesSearch =
      supp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supp.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || supp.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", ...new Set(supplements.map((s) => s.category))];

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-[#00704A] to-[#005239] text-white pt-52 pb-10 px-6">
        <div className="main_container mx-auto">
          <Link href="/anti-doping">
            <Button variant="black" className="text-white hover:bg-white/20 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Anti-Doping
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <CheckCircle className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">Approved Supplements</h1>
              <p className="text-xl text-white/90 mt-2">
                Verified safe supplements and nutrition products for athletes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="main_container mx-auto px-6 py-12">
        {/* Important Notice */}
        <Alert className="bg-emerald-50 border-2 border-emerald-200 mb-8">
          <CheckCircle className="h-5 w-5 text-emerald-600" />
          <AlertDescription className="text-emerald-900 text-base">
            <strong>Important:</strong> Even approved supplements must be from certified sources. Look for third-party
            certifications like NSF Certified for Sport, Informed Sport, or BSCG to ensure safety.
          </AlertDescription>
        </Alert>

        {/* Search + Filter */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Search supplements by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-11"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="relative">
                <Filter className="absolute left-3 top-3 h-5 w-5 text-gray-400 z-10" />
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="pl-10 !h-11 w-full">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat === "all" ? "All Categories" : cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Result Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-emerald-600">{filteredSupplements.length}</span> supplements
          </p>
        </div>

        {/* Supplements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredSupplements.map((supplement, idx) => (
            <Card
              key={idx}
              className="p-4 hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-emerald-200 group"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="outline" className="text-xs font-medium">
                    {supplement.category}
                  </Badge>
                  <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                </div>
                <CardTitle className="text-lg group-hover:text-emerald-600 transition-colors">
                  {supplement.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="text-sm text-gray-600 mb-4">{supplement.description}</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-blue-100 text-blue-700 text-xs font-medium">{supplement.certification}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={supplement.safetyLevel === "Safe" ? "default" : "secondary"}
                      className={
                        supplement.safetyLevel === "Safe"
                          ? "bg-emerald-500 hover:bg-emerald-600"
                          : "bg-yellow-500 hover:bg-yellow-600"
                      }
                    >
                      {supplement.safetyLevel}
                    </Badge>
                    <span className="text-xs text-gray-500 font-medium">{supplement.dosage}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Safety Guidelines */}
        <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-200">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <Info className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-2xl mb-4 text-emerald-900">Supplement Safety Guidelines</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold mb-3 text-emerald-900">Before Purchase</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Verify third-party testing certification</li>
                      <li>• Check for NSF, Informed Sport, or BSCG seals</li>
                      <li>• Research the manufacturer's reputation</li>
                      <li>• Consult with sports nutritionist if unsure</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-semibold mb-3 text-emerald-900">During Use</h4>
                    <ul className="space-y-2 text-gray-700">
                      <li>• Read all labels carefully for ingredients</li>
                      <li>• Follow recommended dosage guidelines</li>
                      <li>• Keep all supplement documentation</li>
                      <li>• Report adverse effects to healthcare provider</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Certification Info */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Card className="border-l-4 border-l-blue-500 p-4">
            <CardHeader>
              <CardTitle className="text-blue-600">NSF Certified for Sport</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">Tested for over 270 banned substances to confirm product safety.</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-emerald-500 p-4">
            <CardHeader>
              <CardTitle className="text-emerald-600">Informed Sport</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">Every batch tested for prohibited substances. Trusted globally.</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500 p-4">
            <CardHeader>
              <CardTitle className="text-purple-600">BSCG Certified</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">Ensures supplement purity and banned substance control.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
