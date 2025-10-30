"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { BookOpen, Scale, AlertCircle, FileText, ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export default function AntiDopingRulesPage() {
  const rules = [
    {
      category: "Athlete Responsibilities",
      icon: BookOpen,
      color: "red",
      items: [
        "Know and comply with all anti-doping rules and policies",
        "Be available for testing at all times (no advance notice)",
        "Take responsibility for any substance found in your body",
        "Inform medical personnel that you are subject to anti-doping rules",
        "Keep whereabouts information updated if in testing pool",
        "Check all medications and supplements before use",
        "Obtain Therapeutic Use Exemptions (TUE) when necessary",
      ],
    },
    {
      category: "Prohibited Actions",
      icon: AlertCircle,
      color: "orange",
      items: [
        "Presence of prohibited substance in athlete's sample",
        "Use or attempted use of prohibited substances or methods",
        "Evading, refusing or failing to submit to sample collection",
        "Tampering or attempting to tamper with doping control",
        "Possession of prohibited substances or methods",
        "Trafficking or attempted trafficking of prohibited substances",
        "Administration or attempted administration to any athlete",
        "Complicity or attempted complicity in anti-doping violations",
      ],
    },
    {
      category: "Testing Procedures",
      icon: FileText,
      color: "blue",
      items: [
        "Athletes may be tested in-competition or out-of-competition",
        "Testing can occur anytime, anywhere without prior notice",
        "Both urine and blood samples may be collected",
        "Athletes must provide valid identification at testing",
        "Sample collection follows strict chain of custody procedures",
        "Athletes have the right to a representative during testing",
        "Results are confidential until adjudication is complete",
      ],
    },
    {
      category: "Sanctions & Penalties",
      icon: Scale,
      color: "green",
      items: [
        "First violation: 2-4 years ineligibility depending on circumstances",
        "Second violation: 8 years to lifetime ban from competition",
        "Aggravating circumstances may increase sanction periods",
        "Results obtained while doping may be disqualified",
        "Prize money, medals, and points may be forfeited",
        "Financial penalties and cost recovery may apply",
        "Public disclosure of violations after adjudication",
      ],
    },
  ];

  const colorClasses = {
    red: {
      bg: "bg-red-50",
      icon: "bg-red-100 text-red-600",
      border: "border-red-200",
    },
    orange: {
      bg: "bg-orange-50",
      icon: "bg-orange-100 text-orange-600",
      border: "border-orange-200",
    },
    blue: {
      bg: "bg-blue-50",
      icon: "bg-blue-100 text-blue-600",
      border: "border-blue-200",
    },
    green: {
      bg: "bg-green-50",
      icon: "bg-green-100 text-green-600",
      border: "border-green-200",
    },
  };

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
            <Button variant="black" className="text-white hover:bg-white/20 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Anti-Doping
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <FileText className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold drop-shadow-sm">Rules & Regulations</h1>
              <p className="text-xl text-white/90 mt-2">Comprehensive anti-doping rules and athlete responsibilities</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Section */}
      <div className="main_container mx-auto px-6 py-12">
        {/* Notice */}
        <Alert className="bg-yellow-50 border-2 border-yellow-200 mb-8">
          <AlertCircle className="h-5 w-5 text-yellow-600" />
          <AlertDescription className="text-yellow-900 text-base">
            <strong>Strict Liability Principle:</strong> Athletes are responsible for any prohibited substance found in
            their samples, regardless of how it got there or whether there was intent to cheat.
          </AlertDescription>
        </Alert>

        {/* Rules */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {rules.map((section, idx) => {
            const Icon = section.icon;
            const colors = colorClasses[section.color as keyof typeof colorClasses];

            return (
              <Card key={idx} className={`hover:shadow-xl transition-shadow border-2 ${colors.border}`}>
                <CardHeader className={colors.bg}>
                  <div className="flex items-center gap-4 p-6">
                    <div className={`w-12 h-12 ${colors.icon} rounded-xl flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl">{section.category}</CardTitle>
                      <Badge variant="outline" className="mt-2">
                        {section.items.length} items
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="py-6">
                  <ul className="space-y-3">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full bg-${section.color}-600 mt-2 flex-shrink-0`} />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* TUE Section */}
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200 mb-12">
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#C1272D] rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-2xl mb-3 text-[#A01F25]">Therapeutic Use Exemptions (TUE)</h3>
                <p className="text-gray-800 mb-4 text-lg">
                  Athletes who have a legitimate medical need to use a prohibited substance or method must apply for a
                  Therapeutic Use Exemption before using the substance.
                </p>

                <div className="bg-white rounded-lg p-4 mb-4">
                  <h4 className="font-semibold mb-3 text-[#A01F25]">Requirements for TUE Approval:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Medical treatment is necessary for an acute or chronic condition</li>
                    <li>• No reasonable therapeutic alternative exists</li>
                    <li>• Use would not produce significant performance enhancement</li>
                    <li>• Need is not a consequence of prior prohibited substance use</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold mb-3 text-[#A01F25]">Application Process:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>1. Apply through Bangladesh Athletics Federation</li>
                    <li>2. Provide complete medical documentation from physician</li>
                    <li>3. TUE must be approved before use (except emergencies)</li>
                    <li>4. Maintain TUE documentation and renew as required</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-l-4 border-l-[#C1272D] p-4">
            <CardHeader>
              <CardTitle className="text-[#C1272D]">Whereabouts Requirements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Athletes in the Registered Testing Pool must provide detailed whereabouts information for
                out-of-competition testing.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Specify one hour per day for testing availability</li>
                <li>• Update location changes immediately</li>
                <li>• Three whereabouts failures in 12 months = violation</li>
                <li>• Use WADA ADAMS system for updates</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#1C6E50] p-4">
            <CardHeader>
              <CardTitle className="text-[#1C6E50]">Athlete Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Athletes have specific rights during the doping control process that must be respected.
              </p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Right to a representative during testing</li>
                <li>• Right to request delay for valid reasons</li>
                <li>• Right to supplement selection and sealing</li>
                <li>• Right to fair hearing and appeal process</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
