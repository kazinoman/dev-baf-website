"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search, XCircle, AlertTriangle, ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function BannedSubstancesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    {
      name: "Anabolic Agents",
      color: "#ef4444",
      prohibited: "Always Banned",
      substances: [
        { name: "Testosterone", description: "Synthetic anabolic steroid", severity: "High" },
        { name: "Nandrolone", description: "Anabolic steroid", severity: "High" },
        { name: "Stanozolol", description: "Synthetic anabolic steroid", severity: "High" },
        { name: "SARMs", description: "Selective androgen receptor modulators", severity: "High" },
        { name: "Trenbolone", description: "Veterinary anabolic steroid", severity: "High" },
      ],
    },
    {
      name: "Peptide Hormones & Growth Factors",
      color: "#f97316",
      prohibited: "Always Banned",
      substances: [
        { name: "EPO (Erythropoietin)", description: "Boosts red blood cell production", severity: "High" },
        { name: "HGH (Human Growth Hormone)", description: "Synthetic growth hormone", severity: "High" },
        { name: "IGF-1", description: "Insulin-like Growth Factor", severity: "High" },
        { name: "HCG", description: "Human Chorionic Gonadotropin", severity: "High" },
      ],
    },
    {
      name: "Beta-2 Agonists",
      color: "#eab308",
      prohibited: "Restricted",
      substances: [
        { name: "Clenbuterol", description: "Fat burner and muscle builder", severity: "High" },
        { name: "Salbutamol", description: "Asthma medication (restricted doses)", severity: "Medium" },
        { name: "Formoterol", description: "Asthma medication (TUE required)", severity: "Medium" },
        { name: "Terbutaline", description: "Bronchodilator (restricted)", severity: "Medium" },
      ],
    },
    {
      name: "Hormone Modulators",
      color: "#a855f7",
      prohibited: "Always Banned",
      substances: [
        { name: "Anastrozole", description: "Aromatase inhibitor", severity: "High" },
        { name: "Clomiphene", description: "Anti-estrogenic substance", severity: "High" },
        { name: "Tamoxifen", description: "Selective estrogen receptor modulator", severity: "High" },
        { name: "Letrozole", description: "Aromatase inhibitor", severity: "High" },
      ],
    },
    {
      name: "Diuretics & Masking Agents",
      color: "#3b82f6",
      prohibited: "Always Banned",
      substances: [
        { name: "Furosemide", description: "Diuretic used as masking agent", severity: "High" },
        { name: "Hydrochlorothiazide", description: "Masking agent", severity: "High" },
        { name: "Spironolactone", description: "Diuretic masking agent", severity: "Medium" },
        { name: "Probenecid", description: "Uric acid masking agent", severity: "High" },
      ],
    },
    {
      name: "Stimulants",
      color: "#ec4899",
      prohibited: "In-Competition Only",
      substances: [
        { name: "Amphetamine", description: "Central nervous system stimulant", severity: "High" },
        { name: "Cocaine", description: "Powerful illegal stimulant", severity: "High" },
        { name: "Methylphenidate (Ritalin)", description: "ADHD medication", severity: "Medium" },
        { name: "Modafinil", description: "Wakefulness-promoting agent", severity: "Medium" },
        { name: "Ephedrine", description: "Stimulant (above threshold)", severity: "Medium" },
      ],
    },
    {
      name: "Narcotics",
      color: "#6366f1",
      prohibited: "In-Competition Only",
      substances: [
        { name: "Morphine", description: "Opioid pain medication", severity: "High" },
        { name: "Oxycodone", description: "Opioid pain medication", severity: "High" },
        { name: "Fentanyl", description: "Synthetic opioid", severity: "High" },
        { name: "Methadone", description: "Opioid", severity: "High" },
      ],
    },
    {
      name: "Cannabinoids",
      color: "#22c55e",
      prohibited: "In-Competition Only",
      substances: [
        { name: "THC (Marijuana)", description: "Tetrahydrocannabinol", severity: "Medium" },
        { name: "Synthetic Cannabinoids", description: "Lab-made cannabis compounds", severity: "Medium" },
        { name: "CBD Products", description: "May contain trace THC (risk)", severity: "Low" },
      ],
    },
  ];

  const allSubstances = categories.flatMap((cat) =>
    cat.substances.map((sub) => ({
      ...sub,
      category: cat.name,
      color: cat.color,
      prohibited: cat.prohibited,
    }))
  );

  const filteredSubstances = searchTerm
    ? allSubstances.filter(
        (sub) =>
          sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          sub.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allSubstances;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="relative bg-gradient-to-br from-[#C1272D] to-[#A01F25] text-white pt-52 pb-10 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'url("https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
        <div className="main_container mx-auto relative z-10">
          <Link href="/anti-doping">
            <Button variant="black" type="button" className="text-white hover:bg-white/20 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Anti-Doping
            </Button>
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <XCircle className="w-9 h-9" />
            </div>
            <div>
              <h1 className="text-5xl md:text-6xl font-bold">Banned Substances</h1>
              <p className="text-lg text-white/90 mt-2">Complete database of prohibited substances and methods</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="main_container mx-auto px-6 py-12">
        <Alert variant="destructive" className="bg-red-50 border-2 border-red-300 mb-8">
          <AlertTriangle className="h-5 w-5" />
          <AlertDescription className="text-red-900 text-base">
            <strong>Critical Warning:</strong> Use of any banned substance can result in serious penalties including
            multi-year bans, loss of medals, prize money forfeiture, and permanent damage to your athletic career and
            reputation.
          </AlertDescription>
        </Alert>

        {/* Search */}
        <Card className="mb-8 border-2">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search banned substances by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-base"
              />
            </div>
            {searchTerm && (
              <p className="text-sm text-gray-600 mt-3">
                Found <span className="font-semibold text-[#C1272D]">{filteredSubstances.length}</span> results
              </p>
            )}
          </CardContent>
        </Card>

        {/* Categories */}
        {!searchTerm ? (
          <div className="space-y-8">
            {categories.map((category, idx) => (
              <Card
                key={idx}
                className="border-l-4 hover:shadow-lg transition-shadow px-2 py-4"
                style={{ borderLeftColor: category.color }}
              >
                <CardHeader className="bg-gray-50 px-5 py-4">
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <CardTitle className="text-2xl font-semibold">{category.name}</CardTitle>
                    <div className="flex gap-2">
                      <Badge
                        variant={category.prohibited.includes("Always") ? "destructive" : "secondary"}
                        className="text-sm"
                      >
                        {category.prohibited}
                      </Badge>
                      <Badge variant="outline" className="text-sm">
                        {category.substances.length} substances
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {category.substances.map((sub, subIdx) => (
                      <div
                        key={subIdx}
                        className="flex items-start gap-3 p-4 rounded-lg border bg-gray-50 hover:bg-white transition-colors"
                      >
                        <XCircle className="w-6 h-6 text-[#C1272D] flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <div className="font-semibold text-base">{sub.name}</div>
                          <div className="text-sm text-gray-600 mt-1">{sub.description}</div>
                          <Badge
                            className="mt-3"
                            variant={
                              sub.severity === "High"
                                ? "destructive"
                                : sub.severity === "Medium"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {sub.severity} Risk
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubstances.map((sub, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow border">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <XCircle className="w-6 h-6 text-[#C1272D] mt-0.5" />
                    <div className="flex-1">
                      <div className="font-bold text-lg mb-1">{sub.name}</div>
                      <div className="text-sm text-gray-600 mb-3">{sub.description}</div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">
                          {sub.category}
                        </Badge>
                        <Badge
                          variant={
                            sub.severity === "High"
                              ? "destructive"
                              : sub.severity === "Medium"
                              ? "secondary"
                              : "outline"
                          }
                          className="text-xs"
                        >
                          {sub.severity} Risk
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Prohibited Methods */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6">Prohibited Methods</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Blood Doping",
                desc: "Any form of blood manipulation including transfusions and use of products that affect oxygen transfer capacity.",
              },
              {
                title: "Chemical & Physical Manipulation",
                desc: "Tampering with samples, IV infusions over 100ml per 12 hours (except medical emergencies).",
              },
              {
                title: "Gene & Cell Doping",
                desc: "Use of gene editing, gene doping, or cell manipulation to enhance athletic performance.",
              },
            ].map((method, i) => (
              <Card key={i} className="border-l-4 border-[#C1272D] hover:shadow-lg transition-shadow p-4">
                <CardHeader>
                  <XCircle className="w-8 h-8 text-[#C1272D] mb-3" />
                  <CardTitle className="text-lg">{method.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-0">
                  <p className="text-gray-700 mb-3">{method.desc}</p>
                  <Badge variant="destructive">Always Banned</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
