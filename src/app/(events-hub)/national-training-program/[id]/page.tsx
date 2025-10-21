"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Clock,
  Award,
  Target,
  CheckCircle,
  DollarSign,
  CreditCard,
  Wallet,
  Building2,
  AlertCircle,
} from "lucide-react";
import { format } from "date-fns";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useRouter } from "next/navigation";

const categoryColors: Record<string, string> = {
  youth: "bg-blue-100 text-blue-800",
  junior: "bg-purple-100 text-purple-800",
  senior: "bg-green-100 text-green-800",
  elite: "bg-red-100 text-red-800",
  grassroots: "bg-yellow-100 text-yellow-800",
};

/**
 * Dummy programs data (multiple to allow filtering and selection by id)
 */
const DUMMY_PROGRAMS = [
  {
    id: "1",
    program_name: "Elite Sprint Training Camp",
    category: "elite",
    discipline: "sprints",
    description:
      "High-intensity sprint program designed for elite athletes preparing for national championships. Focus on starts, acceleration, top speed and speed endurance.",
    start_date: "2025-11-01",
    end_date: "2025-12-13",
    duration: "6 Weeks",
    schedule: "Mon - Sat • 6:00 AM - 9:00 AM",
    location: "Dhaka National Stadium",
    coach_name: "Md. Arif Hossain",
    status: "ongoing",
    fee: 3000,
    max_participants: 30,
    current_participants: 25,
    features: ["Personalized training plan", "Video analysis", "Nutrition guidance"],
    requirements: ["Fitness clearance", "Age 18+", "Signed waiver"],
    image_url: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: "2",
    program_name: "Youth Development Camp",
    category: "youth",
    discipline: "jumps",
    description:
      "Training program for young athletes focusing on fundamentals of jumping techniques — long jump and high jump. Emphasis on technique and safe progressions.",
    start_date: "2025-12-10",
    end_date: "2026-01-07",
    duration: "4 Weeks",
    schedule: "Tue, Thu, Sat • 4:00 PM - 6:00 PM",
    location: "Chittagong Athletics Ground",
    coach_name: "Farzana Ahmed",
    status: "upcoming",
    fee: 1500,
    max_participants: 40,
    current_participants: 20,
    features: ["Technique drills", "Strength & conditioning"],
    requirements: ["Parental consent for under 18"],
    image_url: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=60",
  },
  {
    id: "3",
    program_name: "Senior Long Distance Program",
    category: "senior",
    discipline: "long_distance",
    description:
      "Endurance training for senior athletes targeting marathon and half-marathon events. Includes long runs, threshold sessions, and recovery protocols.",
    start_date: "2025-10-20",
    end_date: "2026-01-14",
    duration: "12 Weeks",
    schedule: "Mon/Wed/Fri • 5:30 AM - 8:00 AM",
    location: "Rajshahi Training Center",
    coach_name: "Tanvir Alam",
    status: "ongoing",
    fee: 2000,
    max_participants: 25,
    current_participants: 25,
    features: ["GPS-guided runs", "Physio support"],
    requirements: ["Running shoes", "Baseline fitness test"],
    image_url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=1200&q=60",
  },
];

export default function TrainingProgramDetails() {
  const router = useRouter();

  // read program id from URL (search param `?id=...`) if present
  const urlParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const programIdFromUrl = urlParams.get("id");

  // local state
  const [program, setProgram] = useState<any | null>(null);
  const [showEnrollDialog, setShowEnrollDialog] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [enrollmentData, setEnrollmentData] = useState({
    full_name: "",
    email: "",
    phone: "",
    emergency_contact: "",
    medical_conditions: "",
    agree_terms: false,
  });
  const [paymentInfo, setPaymentInfo] = useState({
    card_number: "",
    card_holder: "",
    expiry_date: "",
    cvv: "",
    bkash_number: "",
    transaction_id: "",
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // initialize program from dummy list (pick by id if provided, otherwise first)
  useEffect(() => {
    const found = programIdFromUrl ? DUMMY_PROGRAMS.find((p) => p.id === programIdFromUrl) : DUMMY_PROGRAMS[0];
    setProgram(found || null);
  }, [programIdFromUrl]);

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8F6F3] to-white">
        <Card className="max-w-md w-full border-none shadow-xl">
          <CardContent className="p-12 text-center">
            <Target className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 text-lg mb-4">Program not found</p>
            <Button type="button" variant="black" onClick={() => {}}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Programs
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // compute spots left and fullness
  const spotsLeft = program.max_participants - (program.current_participants || 0);
  const isFull = spotsLeft <= 0;

  // enrollment handlers (local only)
  const handleEnrollClick = () => {
    // in real app you'd check auth; here we just open form
    setShowEnrollDialog(true);
  };

  const handleEnrollSubmit = () => {
    // if fee > 0 then open payment dialog
    if (program.fee > 0) {
      setShowEnrollDialog(false);
      setShowPaymentDialog(true);
    } else {
      finalizeEnrollment();
    }
  };

  const finalizeEnrollment = () => {
    // update local program object (simulate DB update)
    setProgram((prev: any) => {
      if (!prev) return prev;
      return { ...prev, current_participants: (prev.current_participants || 0) + 1 };
    });
    // close dialogs
    setShowEnrollDialog(false);
    setShowPaymentDialog(false);
    // success feedback
    alert("Enrollment successful! You will receive a confirmation email shortly.");
  };

  const handlePaymentSubmit = async () => {
    // basic validation: paymentMethod selected and relevant fields present
    if (!paymentMethod) return;
    // simple fake processing
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      // assume success
      finalizeEnrollment();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] to-white py-12 px-4 pt-40">
      <div className="main_container mx-auto">
        <Button
          variant="black"
          type="button"
          onClick={() => {
            router.push("/national-training-program");
          }}
          className="mb-6 hover:bg-gradient-to-br from-[#00704A] to-[#005239]"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to All Programs
        </Button>

        <Card className="border-none shadow-2xl overflow-hidden mb-8">
          <div
            className={`h-64 relative ${
              program.status === "ongoing"
                ? "bg-gradient-to-br from-[#00704A] to-[#005239]"
                : "bg-gradient-to-br from-[#C1272D] to-[#A01F25]"
            }`}
          >
            {program.image_url ? (
              <>
                <img src={program.image_url} alt={program.program_name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50" />
              </>
            ) : (
              <div className="absolute inset-0 bg-black/20" />
            )}

            <div className="absolute inset-0 flex items-center justify-center px-8">
              <div className="text-center max-w-4xl">
                <div className="flex justify-center gap-3 mb-4">
                  <Badge variant="outline" className={`${categoryColors[program.category]} text-lg px-4 py-2`}>
                    {String(program.category).toUpperCase()}
                  </Badge>
                  {program.status === "ongoing" && (
                    <Badge
                      variant="outline"
                      className="bg-green-500 text-white border-none text-lg px-4 py-2 animate-pulse"
                    >
                      ACTIVE NOW
                    </Badge>
                  )}
                  {isFull && <Badge className="bg-red-500 text-white border-none text-lg px-4 py-2">FULL</Badge>}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{program.program_name}</h1>
                <p className="text-xl text-white/90">
                  {String(program.discipline).replace("_", " ").toUpperCase()} • {program.duration}
                </p>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-xl">
              <CardHeader className="px-6 pt-4">
                <CardTitle>Program Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 leading-relaxed text-lg">{program.description}</p>
              </CardContent>
            </Card>

            <Tabs defaultValue="details" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3 bg-white border border-gray-200 p-1 rounded-xl">
                <TabsTrigger
                  value="details"
                  className="rounded-lg p-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00704A] data-[state=active]:to-[#005239] data-[state=active]:text-white"
                >
                  Details
                </TabsTrigger>
                <TabsTrigger
                  value="features"
                  className="rounded-lg p-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00704A] data-[state=active]:to-[#005239] data-[state=active]:text-white"
                >
                  Features
                </TabsTrigger>
                <TabsTrigger
                  value="requirements"
                  className="rounded-lg p-3 data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00704A] data-[state=active]:to-[#005239] data-[state=active]:text-white"
                >
                  Requirements
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <Card className="border-none shadow-xl">
                  <CardContent className="p-8">
                    <div className="grid md:grid-cols-2 gap-6">
                      {program.start_date && (
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-[#00704A]/10 flex items-center justify-center flex-shrink-0">
                            <Calendar className="w-6 h-6 text-[#00704A]" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Start Date</p>
                            <p className="font-semibold text-[#2D3436]">
                              {format(new Date(program.start_date), "MMMM d, yyyy")}
                            </p>
                          </div>
                        </div>
                      )}

                      {program.end_date && (
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-[#C1272D]/10 flex items-center justify-center flex-shrink-0">
                            <Calendar className="w-6 h-6 text-[#C1272D]" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">End Date</p>
                            <p className="font-semibold text-[#2D3436]">
                              {format(new Date(program.end_date), "MMMM d, yyyy")}
                            </p>
                          </div>
                        </div>
                      )}

                      {program.schedule && (
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                            <Clock className="w-6 h-6 text-[#D4AF37]" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Schedule</p>
                            <p className="font-semibold text-[#2D3436]">{program.schedule}</p>
                          </div>
                        </div>
                      )}

                      {program.location && (
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-[#00704A]/10 flex items-center justify-center flex-shrink-0">
                            <MapPin className="w-6 h-6 text-[#00704A]" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Location</p>
                            <p className="font-semibold text-[#2D3436]">{program.location}</p>
                          </div>
                        </div>
                      )}

                      {program.coach_name && (
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-[#C1272D]/10 flex items-center justify-center flex-shrink-0">
                            <Award className="w-6 h-6 text-[#C1272D]" />
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 mb-1">Lead Coach</p>
                            <p className="font-semibold text-[#2D3436]">{program.coach_name}</p>
                          </div>
                        </div>
                      )}

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center flex-shrink-0">
                          <Users className="w-6 h-6 text-[#D4AF37]" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 mb-1">Capacity</p>
                          <p className="font-semibold text-[#2D3436]">
                            {program.current_participants || 0} / {program.max_participants} participants
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="features">
                <Card className="border-none shadow-xl">
                  <CardContent className="p-8">
                    {program.features && program.features.length > 0 ? (
                      <div className="grid md:grid-cols-2 gap-4">
                        {program.features.map((feature: string, idx: number) => (
                          <div key={idx} className="flex items-start gap-3 p-4 bg-[#00704A]/5 rounded-xl">
                            <CheckCircle className="w-5 h-5 text-[#00704A] mt-0.5 flex-shrink-0" />
                            <p className="text-[#2D3436] font-medium">{feature}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 italic text-center py-8">No features listed</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="requirements">
                <Card className="border-none shadow-xl">
                  <CardContent className="p-8">
                    {program.requirements && program.requirements.length > 0 ? (
                      <div className="space-y-4">
                        {program.requirements.map((req: string, idx: number) => (
                          <div
                            key={idx}
                            className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-200"
                          >
                            <div className="w-8 h-8 rounded-full bg-[#C1272D]/10 flex items-center justify-center flex-shrink-0">
                              <span className="text-[#C1272D] font-bold text-sm">{idx + 1}</span>
                            </div>
                            <p className="text-[#2D3436] flex-1">{req}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-400 italic text-center py-8">No specific requirements</p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <Card className="border-none shadow-2xl sticky top-24">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <DollarSign className="w-8 h-8 text-[#00704A]" />
                    <div className="text-5xl font-bold text-[#00704A]">
                      {program.fee === 0 ? "FREE" : `${program.fee}`}
                    </div>
                    {program.fee > 0 && <span className="text-2xl text-gray-500">BDT</span>}
                  </div>
                  <p className="text-sm text-gray-600">{program.duration} program</p>
                </div>

                <div className="mb-6 p-4 bg-gradient-to-r from-[#00704A]/10 to-transparent rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Enrollment Status</span>
                    <Badge
                      variant="outline"
                      className={
                        isFull ? "bg-red-100 text-red-800 border-none" : "bg-green-100 text-green-800 border-none"
                      }
                    >
                      {isFull ? "FULL" : `${spotsLeft} spots left`}
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#00704A] to-[#005239] h-2 rounded-full transition-all duration-500 "
                      style={{ width: `${((program.current_participants || 0) / program.max_participants) * 100}%` }}
                    />
                  </div>
                </div>

                <Button
                  type="button"
                  variant="orange"
                  className="w-full rounded-xl h-14 bg-gradient-to-r from-[#00704A] to-[#005239] hover:from-[#005239] hover:to-[#00704A] text-white text-lg font-semibold mb-4"
                  onClick={handleEnrollClick}
                >
                  {isFull ? "Program Full" : program.status === "completed" ? "Program Ended" : "Enroll Now"}
                </Button>

                <div className="space-y-3 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle className="w-5 h-5 text-[#00704A] flex-shrink-0" />
                    <span>Expert coaching included</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle className="w-5 h-5 text-[#00704A] flex-shrink-0" />
                    <span>Training materials provided</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle className="w-5 h-5 text-[#00704A] flex-shrink-0" />
                    <span>Progress tracking</span>
                  </div>
                  {program.fee === 0 && (
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <CheckCircle className="w-5 h-5 text-[#00704A] flex-shrink-0" />
                      <span>No registration fee</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Enrollment Dialog */}
        <Dialog open={showEnrollDialog} onOpenChange={setShowEnrollDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-2xl">Enroll in {program.program_name}</DialogTitle>
              <DialogDescription>Please provide your information to complete the enrollment process</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={enrollmentData.full_name}
                    onChange={(e) => setEnrollmentData({ ...enrollmentData, full_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={enrollmentData.email}
                    onChange={(e) => setEnrollmentData({ ...enrollmentData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={enrollmentData.phone}
                    onChange={(e) => setEnrollmentData({ ...enrollmentData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergency">Emergency Contact *</Label>
                  <Input
                    id="emergency"
                    value={enrollmentData.emergency_contact}
                    onChange={(e) => setEnrollmentData({ ...enrollmentData, emergency_contact: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="medical">Medical Conditions (Optional)</Label>
                <Input
                  id="medical"
                  placeholder="Any medical conditions we should be aware of?"
                  value={enrollmentData.medical_conditions}
                  onChange={(e) => setEnrollmentData({ ...enrollmentData, medical_conditions: e.target.value })}
                />
              </div>

              <div className="flex items-start gap-3 p-4 bg-[#00704A]/5 rounded-xl">
                <Checkbox
                  id="terms"
                  checked={enrollmentData.agree_terms}
                  onCheckedChange={(checked) => setEnrollmentData({ ...enrollmentData, agree_terms: Boolean(checked) })}
                />
                <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                  I agree to the terms and conditions, understand the program requirements, and commit to attending all
                  scheduled sessions
                </Label>
              </div>
            </div>

            <DialogFooter>
              <Button variant="black" type="button" onClick={() => setShowEnrollDialog(false)}>
                Cancel
              </Button>

              <Button
                type="button"
                variant="black"
                onClick={handleEnrollSubmit}
                className="bg-gradient-to-r from-[#00704A] to-[#005239] hover:from-[#005239] hover:to-[#00704A] text-white"
              >
                {program.fee > 0 ? "Proceed to Payment" : "Complete Enrollment"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Payment Dialog */}
        <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
          <DialogContent className="sm:max-w-[700px]">
            <DialogHeader>
              <DialogTitle className="text-2xl">Payment</DialogTitle>
              <DialogDescription>Complete your payment to finalize enrollment</DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="p-6 bg-gradient-to-r from-[#00704A]/10 to-transparent rounded-xl">
                <h3 className="font-semibold text-[#2D3436] mb-4">Payment Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Program Fee</span>
                    <span className="font-semibold">{program.fee} BDT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Fee</span>
                    <span className="font-semibold">0 BDT</span>
                  </div>
                  <div className="border-t border-gray-300 pt-2 mt-2">
                    <div className="flex justify-between text-lg">
                      <span className="font-bold">Total Amount</span>
                      <span className="font-bold text-[#00704A]">{program.fee} BDT</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">Select Payment Method</Label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 border-2 rounded-xl transition-all ${
                      paymentMethod === "card"
                        ? "border-[#00704A] bg-[#00704A]/5"
                        : "border-gray-200 hover:border-[#00704A]/50"
                    }`}
                  >
                    <CreditCard className="w-8 h-8 mx-auto mb-2 text-[#00704A]" />
                    <p className="text-sm font-medium">Credit Card</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("bkash")}
                    className={`p-4 border-2 rounded-xl transition-all ${
                      paymentMethod === "bkash"
                        ? "border-[#00704A] bg-[#00704A]/5"
                        : "border-gray-200 hover:border-[#00704A]/50"
                    }`}
                  >
                    <Wallet className="w-8 h-8 mx-auto mb-2 text-[#00704A]" />
                    <p className="text-sm font-medium">bKash</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("bank")}
                    className={`p-4 border-2 rounded-xl transition-all ${
                      paymentMethod === "bank"
                        ? "border-[#00704A] bg-[#00704A]/5"
                        : "border-gray-200 hover:border-[#00704A]/50"
                    }`}
                  >
                    <Building2 className="w-8 h-8 mx-auto mb-2 text-[#00704A]" />
                    <p className="text-sm font-medium">Bank Transfer</p>
                  </button>
                </div>
              </div>

              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Card Number *</Label>
                    <Input
                      placeholder="1234 5678 9012 3456"
                      value={paymentInfo.card_number}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, card_number: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Card Holder Name *</Label>
                    <Input
                      placeholder="John Doe"
                      value={paymentInfo.card_holder}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, card_holder: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Expiry Date *</Label>
                      <Input
                        placeholder="MM/YY"
                        value={paymentInfo.expiry_date}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry_date: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>CVV *</Label>
                      <Input
                        placeholder="123"
                        type="password"
                        maxLength={3}
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "bkash" && (
                <div className="space-y-4">
                  <div className="p-4 bg-pink-50 rounded-xl border border-pink-200">
                    <p className="text-sm text-gray-700">
                      Send <strong className="text-[#00704A]">{program.fee} BDT</strong> to bKash number:{" "}
                      <strong>01XXXXXXXXX</strong>
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label>Your bKash Number *</Label>
                    <Input
                      placeholder="01XXXXXXXXX"
                      value={paymentInfo.bkash_number}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, bkash_number: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Transaction ID *</Label>
                    <Input
                      placeholder="Enter bKash transaction ID"
                      value={paymentInfo.transaction_id}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, transaction_id: e.target.value })}
                    />
                  </div>
                </div>
              )}

              {paymentMethod === "bank" && (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
                    <p className="text-sm text-gray-700 mb-2">
                      <strong>Bank Transfer Details:</strong>
                    </p>
                    <div className="space-y-1 text-sm">
                      <p>
                        <strong>Bank:</strong> Bangladesh Bank
                      </p>
                      <p>
                        <strong>Account Name:</strong> Bangladesh Athletics Federation
                      </p>
                      <p>
                        <strong>Account Number:</strong> 1234567890
                      </p>
                      <p>
                        <strong>Amount:</strong> {program.fee} BDT
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Transaction Reference Number *</Label>
                    <Input
                      placeholder="Enter bank transaction reference"
                      value={paymentInfo.transaction_id}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, transaction_id: e.target.value })}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <AlertCircle className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-600">
                  Your payment information is secure and encrypted. We never store your card details.
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="black"
                type="button"
                onClick={() => setShowPaymentDialog(false)}
                className="bg-gray-200 hover:bg-gradient-to-r from-[#00704A] to-[#005239] hover:from-[#005239] hover:to-[#00704A]"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="black"
                onClick={handlePaymentSubmit}
                disabled={!paymentMethod || isProcessingPayment}
                className="bg-gradient-to-r from-[#00704A] to-[#005239] hover:from-[#005239] hover:to-[#00704A] text-white"
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                {isProcessingPayment ? "Processing..." : `Complete Payment (${program.fee} BDT)`}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
