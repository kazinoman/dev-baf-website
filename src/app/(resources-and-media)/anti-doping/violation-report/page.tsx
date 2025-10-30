"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, Lock, Send, CheckCircle, ArrowLeft, AlertTriangle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import Button from "@/components/ui/Button";

export default function ReportViolationPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [formData, setFormData] = useState({
    reporterName: "",
    reporterEmail: "",
    reporterPhone: "",
    violationType: "",
    athleteName: "",
    incidentDate: "",
    location: "",
    description: "",
    evidence: "",
    witnesses: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleNewReport = () => {
    setIsSubmitted(false);
    setIsAnonymous(false);
    setFormData({
      reporterName: "",
      reporterEmail: "",
      reporterPhone: "",
      violationType: "",
      athleteName: "",
      incidentDate: "",
      location: "",
      description: "",
      evidence: "",
      witnesses: "",
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#36A365] to-[#0E7C3F] text-white py-12 pt-40 px-6">
          <div className="max-w-3xl mx-auto">
            <Link href="/anti-doping">
              <Button variant="black" className="text-white hover:bg-white/20 mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Anti-Doping
              </Button>
            </Link>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-16">
          <Card className="border-2 border-green-200">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-green-900">Report Submitted Successfully</h2>
              <p className="text-lg text-gray-700 mb-6">
                Thank you for your report. It will be reviewed by our anti-doping committee and appropriate action will
                be taken.
              </p>
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <p className="text-sm text-gray-600 mb-2">Your Reference Number:</p>
                <p className="text-2xl font-mono font-bold text-blue-600">AD-{Date.now().toString().slice(-8)}</p>
                <p className="text-xs text-gray-500 mt-3">Please save this reference number for your records</p>
              </div>
              <div className="space-y-3">
                <Button
                  onClick={handleNewReport}
                  type="button"
                  variant="black"
                  className="w-full md:w-auto bg-[#36A365] hover:bg-[#0E7C3F]"
                >
                  Submit Another Report
                </Button>
                <br />
                <Link href="/anti-doping">
                  <Button variant="black" type="button" className="w-full md:w-auto">
                    Return to Anti-Doping Page
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#36A365] to-[#0E7C3F] text-white pt-44 pb-10 px-6">
        <div className="main_container mx-auto">
          <Link href="/anti-doping">
            <Button variant="black" type="button" className="text-white hover:bg-white/20 mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Anti-Doping
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">Report a Violation</h1>
              <p className="text-xl text-white/90 mt-2">Confidential reporting system for anti-doping violations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Alert className="bg-blue-50 border-2 border-blue-200 mb-8">
          <Lock className="h-5 w-5 text-blue-600" />
          <AlertDescription className="text-blue-900 text-base">
            <strong>Confidential & Secure:</strong> All reports are encrypted and treated with strict confidentiality.
            You can choose to remain anonymous.
          </AlertDescription>
        </Alert>

        <form onSubmit={handleSubmit}>
          {/* Reporting Options */}
          <Card className="mb-6 border-2">
            <CardHeader className="bg-gray-50">
              <CardTitle className="p-5">Reporting Options</CardTitle>
            </CardHeader>
            <CardContent className="py-6">
              <div className="flex items-start space-x-3">
                <Checkbox id="anonymous" checked={isAnonymous} className="mt-1" />
                <div>
                  <label htmlFor="anonymous" className="font-medium cursor-pointer">
                    Submit this report anonymously
                  </label>
                  <p className="text-sm text-gray-600 mt-1">
                    Your identity will be protected, but we may not be able to contact you.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {!isAnonymous && (
            <Card className="mb-6 border-2">
              <CardHeader className="bg-gray-50">
                <CardTitle className="p-5">Your Information (Optional)</CardTitle>
              </CardHeader>
              <CardContent className="py-6 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input
                      value={formData.reporterName}
                      onChange={(e) => handleChange("reporterName", e.target.value)}
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email Address</Label>
                    <Input
                      type="email"
                      value={formData.reporterEmail}
                      onChange={(e) => handleChange("reporterEmail", e.target.value)}
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <Input
                    value={formData.reporterPhone}
                    onChange={(e) => handleChange("reporterPhone", e.target.value)}
                    placeholder="+880 XXX XXX XXX"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Violation Details */}
          <Card className="mb-6 border-2">
            <CardHeader className="bg-gray-50 p-0">
              <CardTitle className="p-5">Violation Details</CardTitle>
            </CardHeader>
            <CardContent className="py-4 space-y-6">
              <div className="space-y-3">
                <Label className="text-base font-semibold">Type of Violation *</Label>
                <RadioGroup
                  value={formData.violationType}
                  onValueChange={(value) => handleChange("violationType", value)}
                  required
                  className="space-y-3"
                >
                  {[
                    { id: "substance", label: "Use of Prohibited Substance" },
                    { id: "method", label: "Prohibited Method (e.g., blood doping)" },
                    { id: "trafficking", label: "Trafficking or Distribution" },
                    { id: "tampering", label: "Tampering with Testing Process" },
                    { id: "evasion", label: "Evading or Refusing Sample Collection" },
                    { id: "other", label: "Other Violation" },
                  ].map((opt) => (
                    <div key={opt.id} className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value={opt.id} id={opt.id} />
                      <Label htmlFor={opt.id} className="font-normal cursor-pointer flex-1">
                        {opt.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Athlete/Person Name (if known)</Label>
                <Input
                  value={formData.athleteName}
                  onChange={(e) => handleChange("athleteName", e.target.value)}
                  placeholder="Name of person involved"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date of Incident</Label>
                  <Input
                    type="date"
                    value={formData.incidentDate}
                    onChange={(e) => handleChange("incidentDate", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={formData.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    placeholder="Where did this occur?"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Detailed Description *</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  placeholder="Provide as much detail as possible..."
                  rows={8}
                  required
                  className="resize-none"
                />
                <p className="text-xs text-gray-500">
                  Be specific — substances, methods, dates, and locations help investigations.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Evidence (if available)</Label>
                <Textarea
                  value={formData.evidence}
                  onChange={(e) => handleChange("evidence", e.target.value)}
                  placeholder="Describe any evidence such as photos, documents, messages..."
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label>Witnesses</Label>
                <Input
                  value={formData.witnesses}
                  onChange={(e) => handleChange("witnesses", e.target.value)}
                  placeholder="Names and contact info of any witnesses"
                />
              </div>
            </CardContent>
          </Card>

          <Alert variant="destructive" className="bg-yellow-50 border-2 border-yellow-300 mb-6">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <AlertDescription className="text-yellow-900">
              <strong>Important:</strong> False reporting is a serious offense. Please ensure all information provided
              is accurate to the best of your knowledge.
            </AlertDescription>
          </Alert>

          <div className="flex flex-col md:flex-row gap-4 justify-end">
            <Link href="/anti-doping">
              <Button type="button" variant="black" className="w-full md:w-auto">
                Cancel
              </Button>
            </Link>
            <Button type="submit" variant="black" className="w-full md:w-auto bg-[#36A365] hover:bg-[#0E7C3F] gap-2">
              <Send className="w-5 h-5" />
              Submit Confidential Report
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
