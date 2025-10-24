"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ArrowLeft,
  ArrowRight,
  User,
  FileText,
  CheckCircle,
  Trophy,
  Target,
  Sparkles,
  Heart,
  School,
  Upload,
  Send,
  Users,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

const ATHLETIC_DISCIPLINES = [
  "100m Sprint",
  "200m Sprint",
  "400m Sprint",
  "800m Run",
  "1500m Run",
  "Long Jump",
  "High Jump",
  "Triple Jump",
  "Shot Put",
  "Javelin Throw",
  "Discus Throw",
];

export default function TalentProgramApplication() {
  const router = useRouter();
  const params = useSearchParams();
  const programId = params.get("id") || "mock-program-1";

  // Mock program data
  const program = {
    id: programId,
    program_name: "Youth Athletics Talent Program",
    scholarship_available: true,
    scholarship_criteria: "Scholarships are available for talented students from low-income families.",
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [uploadingFiles, setUploadingFiles] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState({
    applicant_name: "",
    date_of_birth: "",
    gender: "",
    parent_guardian_name: "",
    email: "",
    phone: "",
    address: "",
    school_name: "",
    current_grade: "",
    athletic_experience: "",
    preferred_disciplines: [] as string[],
    achievements: [] as string[],
    physical_stats: {
      height_cm: "",
      weight_kg: "",
    },
    medical_conditions: "",
    motivation: "",
    emergency_contact: {
      name: "",
      relationship: "",
      phone: "",
    },
    documents: {
      birth_certificate: "",
      photo: "",
      medical_certificate: "",
      school_certificate: "",
    },
    scholarship_requested: false,
    family_income: "",
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNestedChange = (parent: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [parent]: { ...(prev[parent as keyof typeof prev] as Record<string, any>), [field]: value },
    }));
  };

  const handleDisciplineToggle = (discipline: string) => {
    setFormData((prev) => ({
      ...prev,
      preferred_disciplines: prev.preferred_disciplines.includes(discipline)
        ? prev.preferred_disciplines.filter((d) => d !== discipline)
        : [...prev.preferred_disciplines, discipline],
    }));
  };

  const handleFileUpload = (field: string, file: File) => {
    if (!file) return;
    setUploadingFiles((prev) => ({ ...prev, [field]: true }));

    setTimeout(() => {
      const fileUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        documents: { ...prev.documents, [field]: fileUrl },
      }));
      setUploadingFiles((prev) => ({ ...prev, [field]: false }));
    }, 1000);
  };

  const handleSubmit = () => {
    console.log("Form Submitted Data:", formData);
    alert("Form submitted! Check console for data.");
    router.push("/thank-you");
  };

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Athletic Background", icon: Trophy },
    { number: 3, title: "Documents", icon: FileText },
    { number: 4, title: "Review", icon: CheckCircle },
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Full Name *</Label>
                <Input
                  value={formData.applicant_name}
                  onChange={(e) => handleInputChange("applicant_name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Date of Birth *</Label>
                <Input
                  type="date"
                  value={formData.date_of_birth}
                  onChange={(e) => handleInputChange("date_of_birth", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Gender *</Label>
                <Select value={formData.gender} onValueChange={(v) => handleInputChange("gender", v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Parent/Guardian *</Label>
                <Input
                  value={formData.parent_guardian_name}
                  onChange={(e) => handleInputChange("parent_guardian_name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Phone *</Label>
                <Input type="tel" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} />
              </div>
              <div className="md:col-span-2 space-y-2">
                <Label>Address *</Label>
                <Textarea
                  className="min-h-[150px]"
                  value={formData.address}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  minLength={40}
                />
              </div>
            </div>

            <Card className="border-[#C1272D]/20 bg-[#C1272D]/5 p-4">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#C1272D]" />
                  Emergency Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Name *</Label>
                    <Input
                      placeholder="Emergency contact name"
                      value={formData.emergency_contact.name}
                      onChange={(e) => handleNestedChange("emergency_contact", "name", e.target.value)}
                      className="h-10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Relationship *</Label>
                    <Input
                      placeholder="e.g., Mother, Father"
                      value={formData.emergency_contact.relationship}
                      onChange={(e) => handleNestedChange("emergency_contact", "relationship", e.target.value)}
                      className="h-10"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold">Phone *</Label>
                    <Input
                      type="tel"
                      placeholder="+880 1XXX-XXXXXX"
                      value={formData.emergency_contact.phone}
                      onChange={(e) => handleNestedChange("emergency_contact", "phone", e.target.value)}
                      className="h-10"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Athletic Experience */}
            <div className="space-y-2">
              <Label className="text-[#2D3436] font-semibold">Athletic Experience</Label>
              <Textarea
                placeholder="Describe your previous athletic experience, training, or sports participation..."
                value={formData.athletic_experience}
                onChange={(e) => handleInputChange("athletic_experience", e.target.value)}
                className="h-24 border-gray-200 focus:border-[#00704A]"
              />
            </div>

            {/* Preferred Disciplines */}
            <div>
              <Label className="text-[#2D3436] font-semibold mb-3 block">Preferred Athletic Disciplines *</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {ATHLETIC_DISCIPLINES.map((discipline) => (
                  <button
                    key={discipline}
                    onClick={() => handleDisciplineToggle(discipline)}
                    className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                      formData.preferred_disciplines.includes(discipline)
                        ? "border-[#00704A] bg-[#00704A]/10"
                        : "border-gray-200 hover:border-[#00704A]/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{discipline}</span>
                      {formData.preferred_disciplines.includes(discipline) && (
                        <CheckCircle className="w-5 h-5 text-[#00704A]" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Physical Stats */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-[#2D3436] font-semibold">Height (cm)</Label>
                <Input
                  type="number"
                  placeholder="Height in centimeters"
                  value={formData.physical_stats.height_cm}
                  onChange={(e) => handleNestedChange("physical_stats", "height_cm", e.target.value)}
                  className="h-12 border-gray-200 focus:border-[#00704A]"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[#2D3436] font-semibold">Weight (kg)</Label>
                <Input
                  type="number"
                  placeholder="Weight in kilograms"
                  value={formData.physical_stats.weight_kg}
                  onChange={(e) => handleNestedChange("physical_stats", "weight_kg", e.target.value)}
                  className="h-12 border-gray-200 focus:border-[#00704A]"
                />
              </div>
            </div>

            {/* Medical Conditions */}
            <div className="space-y-2">
              <Label className="text-[#2D3436] font-semibold">Medical Conditions</Label>
              <Textarea
                placeholder="List any medical conditions, allergies, or health concerns..."
                value={formData.medical_conditions}
                onChange={(e) => handleInputChange("medical_conditions", e.target.value)}
                className="border-gray-200 focus:border-[#00704A]"
              />
            </div>

            {/* Motivation */}
            <div className="space-y-2">
              <Label className="text-[#2D3436] font-semibold">Why do you want to join this program? *</Label>
              <Textarea
                placeholder="Tell us about your goals and why you want to be part of this program..."
                value={formData.motivation}
                onChange={(e) => handleInputChange("motivation", e.target.value)}
                className="h-24 border-gray-200 focus:border-[#00704A]"
              />
            </div>

            {/* Scholarship */}
            {program.scholarship_available && (
              <Card className="border-[#D4AF37]/20 bg-[#D4AF37]/5">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={formData.scholarship_requested}
                      onCheckedChange={(checked) => handleInputChange("scholarship_requested", checked)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label className="text-[#2D3436] font-semibold mb-2 block">Request Scholarship</Label>
                      <p className="text-sm text-gray-600 mb-4">{program.scholarship_criteria}</p>

                      {formData.scholarship_requested && (
                        <div className="space-y-2 mt-4">
                          <Label className="text-sm font-semibold">Monthly Family Income *</Label>
                          <Select
                            value={formData.family_income}
                            onValueChange={(value) => handleInputChange("family_income", value)}
                          >
                            <SelectTrigger className="h-10">
                              <SelectValue placeholder="Select income range" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="below_20k">Below 20,000 BDT</SelectItem>
                              <SelectItem value="20k_50k">20,000 - 50,000 BDT</SelectItem>
                              <SelectItem value="50k_100k">50,000 - 100,000 BDT</SelectItem>
                              <SelectItem value="above_100k">Above 100,000 BDT</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-[#00704A]/5 rounded-xl p-6 border border-[#00704A]/10 mb-6">
              <h3 className="font-semibold text-[#2D3436] mb-2">Required Documents</h3>
              <p className="text-sm text-gray-600">
                Please upload clear scans or photos of the following documents. Accepted formats: PDF, JPG, PNG
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { field: "photo", label: "Passport Size Photo", icon: User, required: true },
                { field: "birth_certificate", label: "Birth Certificate", icon: FileText, required: true },
                { field: "medical_certificate", label: "Medical Fitness Certificate", icon: Heart, required: true },
                { field: "school_certificate", label: "School Certificate", icon: School, required: false },
              ].map(({ field, label, icon: Icon, required }) => (
                <div key={field} className="space-y-2">
                  <Label className="text-[#2D3436] font-semibold flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[#00704A]" />
                    {label} {required && "*"}
                  </Label>
                  <div className="relative">
                    <Input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => e.target.files?.[0] && handleFileUpload(field, e.target.files[0])}
                      className="hidden"
                      id={field}
                      disabled={uploadingFiles[field]}
                    />
                    <label
                      htmlFor={field}
                      className={`flex flex-col items-center justify-center h-32 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 ${
                        formData.documents[field]
                          ? "border-[#00704A] bg-[#00704A]/5"
                          : "border-gray-300 hover:border-[#00704A] hover:bg-gray-50"
                      }`}
                    >
                      {uploadingFiles[field] ? (
                        <div className="text-center">
                          <div className="w-8 h-8 border-3 border-[#00704A] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                          <span className="text-sm text-gray-600">Uploading...</span>
                        </div>
                      ) : formData.documents[field] ? (
                        <div className="text-center">
                          <CheckCircle className="w-8 h-8 text-[#00704A] mx-auto mb-2" />
                          <span className="text-sm font-medium text-[#00704A]">Uploaded</span>
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <span className="text-sm text-gray-600">Click to upload</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Card className="border-[#00704A]/20 bg-gradient-to-br from-[#00704A]/5 to-white">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Sparkles className="w-6 h-6 text-[#D4AF37]" />
                  <h3 className="text-2xl font-bold text-[#2D3436]">Application Summary</h3>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-[#2D3436] mb-3">Personal Information</h4>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <span className="text-gray-600">Name:</span>{" "}
                        <span className="font-semibold">{formData.applicant_name}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Date of Birth:</span>{" "}
                        <span className="font-semibold">{formData.date_of_birth}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Gender:</span>{" "}
                        <span className="font-semibold capitalize">{formData.gender}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Parent/Guardian:</span>{" "}
                        <span className="font-semibold">{formData.parent_guardian_name}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Email:</span>{" "}
                        <span className="font-semibold">{formData.email}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Phone:</span>{" "}
                        <span className="font-semibold">{formData.phone}</span>
                      </div>
                      <div className="md:col-span-2">
                        <span className="text-gray-600">School:</span>{" "}
                        <span className="font-semibold">
                          {formData.school_name} - Grade {formData.current_grade}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-semibold text-[#2D3436] mb-3">Athletic Background</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600">Preferred Disciplines:</span>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {formData.preferred_disciplines.map((d, idx) => (
                            <Badge variant="outline" key={idx} className="bg-[#00704A]/10 text-[#00704A] border-none">
                              {d}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {formData.athletic_experience && (
                        <div>
                          <span className="text-gray-600">Experience:</span>
                          <p className="text-gray-700 mt-1">{formData.athletic_experience}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {formData.scholarship_requested && (
                    <div className="border-t border-gray-200 pt-4">
                      <Badge variant="outline" className="bg-[#D4AF37]/10 text-[#D4AF37] border-none">
                        Scholarship Requested
                      </Badge>
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="font-semibold text-[#2D3436] mb-3">Documents Uploaded</h4>
                    <div className="grid md:grid-cols-2 gap-2">
                      {Object.entries(formData.documents).map(
                        ([key, value]) =>
                          value && (
                            <div key={key} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-[#00704A]" />
                              <span className="text-gray-700 capitalize">{key.replace("_", " ")}</span>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
              <h4 className="font-semibold text-yellow-900 mb-2">What happens next?</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>• Your application will be reviewed within 5-7 business days</li>
                <li>• If shortlisted, you'll be invited for a trial/assessment session</li>
                <li>• We'll contact you via email and phone with updates</li>
                <li>• Final selection results will be communicated within 2 weeks</li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-10 px-4 pt-40">
      <div className="max-w-4xl mx-auto">
        <Button variant="black" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Card className="border-none shadow-xl mb-8">
          <div className="h-32 bg-gradient-to-r from-[#00704A] to-[#005239] flex items-center px-8">
            <div>
              <Badge variant="outline" className="bg-white/20 text-white mb-2">
                Application Form
              </Badge>
              <h1 className="text-3xl font-bold text-white">{program.program_name}</h1>
            </div>
          </div>
        </Card>

        {/* Progress bar */}
        <div className="flex justify-between mb-10 relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 -translate-y-1/2">
            <div
              //   className="h-1 bg-green-700 transition-all duration-500"
              style={{
                width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
              }}
            />
          </div>
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.number} className="flex flex-col items-center z-10">
                <div
                  className={`w-12 h-12 flex items-center justify-center rounded-full ${
                    currentStep >= s.number
                      ? "bg-gradient-to-r from-[#00704A] to-[#005239] text-white"
                      : "bg-white border border-gray-300 text-gray-400"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`text-[11px] xs:text-xs sm:text-sm mt-2 ${
                    currentStep >= s.number ? "text-[#00704A]" : "text-gray-400"
                  }`}
                >
                  {s.title}
                </span>
              </div>
            );
          })}
        </div>

        {/* Step content */}
        <Card className="shadow-lg border-none">
          <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white px-8 py-4">
            <CardTitle className="text-2xl font-bold">{steps[currentStep - 1].title}</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            {renderStepContent()}

            <div className="flex justify-between mt-8 pt-6 border-t">
              <Button variant="black" disabled={currentStep === 1} onClick={() => setCurrentStep((p) => p - 1)}>
                Previous
              </Button>
              {currentStep < steps.length ? (
                <Button
                  variant="white"
                  type="button"
                  onClick={() => setCurrentStep((p) => p + 1)}
                  className="bg-gradient-to-r from-[#00704A] to-[#005239] hover:from-[#005239] hover:to-[#00704A] "
                >
                  Next
                </Button>
              ) : (
                <Button variant="black" onClick={handleSubmit} className="bg-red-700 hover:bg-red-800 hover:text-white">
                  <Send className="mr-2 w-4 h-4" /> Submit
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
