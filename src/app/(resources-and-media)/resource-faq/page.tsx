"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Search,
  Trophy,
  GraduationCap,
  Users,
  Sparkles,
  CheckCircle,
  Mail,
  Phone,
  HelpCircle,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqData = {
  athletes: [
    { question: "How to register as athlete?", answer: "Fill out the registration form and submit your documents." },
    { question: "Required documents?", answer: "NID/Birth certificate, photo, medical certificate." },
  ],
  coaches: [
    { question: "How to become a certified coach?", answer: "Complete the coaching program and pass exams." },
    { question: "Coaching workshops?", answer: "Register through the coach dashboard." },
  ],
  public: [
    {
      question: "What is BAF?",
      answer: "Bangladesh Athletics Federation is the national governing body of athletics.",
    },
    { question: "How to attend events?", answer: "Events are open to public, check schedule online." },
  ],
};

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("athletes");

  const filterFAQs = (faqs: { question: string; answer: string }[]) => {
    if (!searchQuery) return faqs;
    return faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredFAQs = {
    athletes: filterFAQs(faqData.athletes),
    coaches: filterFAQs(faqData.coaches),
    public: filterFAQs(faqData.public),
  };

  const totalResults = Object.values(filteredFAQs).flat().length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] via-white to-[#F8F6F3] relative pt-20 md:pt-40">
      {/* Decorative background blobs */}
      <div className="fixed top-20 right-10 w-96 h-96 bg-gradient-to-br from-[#00704A]/5 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-[#C1272D]/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative py-20 px-4 max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg mb-8 border border-[#00704A]/10">
            <Sparkles className="w-5 h-5 text-[#00704A]" />
            <span className="text-sm font-semibold bg-gradient-to-r from-[#00704A] to-[#005239] bg-clip-text text-transparent">
              Help Center
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-[#2D3436] mb-6 leading-tight">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-[#00704A] via-[#C1272D] to-[#D4AF37] bg-clip-text text-transparent">
              Questions
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-12">
            Find answers to common questions about Bangladesh Athletics Federation, athlete registration, coaching, and
            more
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <Card className="border-none shadow-2xl overflow-hidden">
              <CardContent className="p-2">
                <div className="relative flex items-center gap-3 bg-gradient-to-r from-gray-50 to-white rounded-xl p-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00704A]/5 to-[#C1272D]/5 rounded-xl" />
                  <Search className="w-6 h-6 text-[#00704A] flex-shrink-0 relative z-10" />
                  <Input
                    placeholder="Search for answers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 bg-transparent text-lg focus-visible:ring-0 focus-visible:ring-offset-0 relative z-10"
                  />
                  {searchQuery && (
                    <Button variant="black" onClick={() => setSearchQuery("")} className="relative z-10">
                      Clear
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>

            {searchQuery && (
              <div className="mt-4 flex items-center justify-center gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-[#00704A]" />
                <span className="text-gray-600">
                  Found <span className="font-bold text-[#00704A]">{totalResults}</span> result
                  {totalResults !== 1 ? "s" : ""}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-12">
          <div className="flex justify-center">
            <TabsList className="inline-grid grid-cols-3 bg-white border-2 border-gray-100 p-2 rounded-2xl shadow-xl">
              <TabsTrigger
                value="athletes"
                className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00704A] data-[state=active]:to-[#005239] data-[state=active]:text-white data-[state=active]:shadow-lg flex items-center gap-2 px-6 py-3 transition-all duration-300"
              >
                <Trophy className="w-5 h-5" />
                <span className="hidden sm:inline font-semibold">For Athletes</span>
                <span className="sm:hidden font-semibold">Athletes</span>
                <Badge
                  variant="outline"
                  className="bg-white/20 text-current border-none ml-1 data-[state=active]:bg-white/30"
                >
                  {filteredFAQs.athletes.length}
                </Badge>
              </TabsTrigger>

              <TabsTrigger
                value="coaches"
                className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#C1272D] data-[state=active]:to-[#A01F25] data-[state=active]:text-white data-[state=active]:shadow-lg flex items-center gap-2 px-6 py-3 transition-all duration-300"
              >
                <GraduationCap className="w-5 h-5" />
                <span className="hidden sm:inline font-semibold">For Coaches</span>
                <span className="sm:hidden font-semibold">Coaches</span>
                <Badge className="bg-white/20 text-current border-none ml-1">{filteredFAQs.coaches.length}</Badge>
              </TabsTrigger>

              <TabsTrigger
                value="public"
                className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#D4AF37] data-[state=active]:to-[#B8941F] data-[state=active]:text-white data-[state=active]:shadow-lg flex items-center gap-2 px-6 py-3 transition-all duration-300"
              >
                <Users className="w-5 h-5" />
                <span className="hidden sm:inline font-semibold">For Public</span>
                <span className="sm:hidden font-semibold">Public</span>
                <Badge className="bg-white/20 text-current border-none ml-1">{filteredFAQs.public.length}</Badge>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Tab Contents */}
          {["athletes", "coaches", "public"].map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card
                  className={`border-none shadow-xl text-white md:col-span-2 ${
                    tab === "athletes"
                      ? "bg-gradient-to-br from-[#00704A] to-[#005239]"
                      : tab === "coaches"
                      ? "bg-gradient-to-br from-[#C1272D] to-[#A01F25]"
                      : "bg-gradient-to-br from-[#D4AF37] to-[#B8941F]"
                  }`}
                >
                  <CardContent className="p-8">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                        {tab === "athletes" ? (
                          <Trophy className="w-8 h-8" />
                        ) : tab === "coaches" ? (
                          <GraduationCap className="w-8 h-8" />
                        ) : (
                          <Users className="w-8 h-8" />
                        )}
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold mb-3">
                          {tab === "athletes" ? "For Athletes" : tab === "coaches" ? "For Coaches" : "For Public"}
                        </h2>
                        <p className="text-white/90 text-lg leading-relaxed">
                          {tab === "athletes"
                            ? "Everything you need to know about registration, events, training, and athlete support."
                            : tab === "coaches"
                            ? "Certification, training programs, resources, and professional development opportunities."
                            : "General information, how to get involved, and ways to support Bangladesh athletics."}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {filteredFAQs[tab].length > 0 ? (
                <Card className="border-none shadow-xl overflow-hidden">
                  <CardContent className="p-8">
                    <Accordion type="single" collapsible className="space-y-4">
                      {filteredFAQs[tab].map((faq, index) => (
                        <AccordionItem
                          key={index}
                          value={`${tab}-${index}`}
                          className="border-none bg-gradient-to-r from-gray-50 to-white rounded-2xl px-6 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                        >
                          <AccordionTrigger className="text-left hover:no-underline py-6 group">
                            <div className="flex items-start gap-4 pr-4">
                              <div
                                className={`w-8 h-8 rounded-full ${
                                  tab === "athletes"
                                    ? "bg-gradient-to-br from-[#00704A] to-[#005239]"
                                    : tab === "coaches"
                                    ? "bg-gradient-to-br from-[#C1272D] to-[#A01F25]"
                                    : "bg-gradient-to-br from-[#D4AF37] to-[#B8941F]"
                                } flex items-center justify-center flex-shrink-0 text-white font-bold text-sm group-hover:scale-110 transition-transform duration-300`}
                              >
                                {index + 1}
                              </div>
                              <span className="font-semibold text-[#2D3436] text-lg">{faq.question}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600 leading-relaxed pb-6 pl-12 text-base">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ) : (
                <Card className="border-none shadow-xl">
                  <CardContent className="p-16 text-center">
                    <Search className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                    <p className="text-gray-600 text-lg">No FAQs found matching your search</p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          ))}

          {/* Contact Section */}
          <Card className="mt-20 border-none shadow-2xl bg-gradient-to-br from-[#00704A] via-[#005239] to-[#00704A] text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            <CardContent className="p-12 md:p-16 relative z-10">
              <div className="text-center space-y-8">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-sm mb-4">
                  <MessageCircle className="w-10 h-10" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Still Have Questions?</h2>
                <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                  Can't find the answer you're looking for? Our team is here to help you.
                </p>
                <div className="grid md:grid-cols-3 gap-6 pt-8 max-w-4xl mx-auto">
                  <Card className="border-none bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-8 text-center">
                      <Mail className="w-10 h-10 mx-auto mb-4" />
                      <div className="font-semibold mb-3 text-lg">Email Us</div>
                      <a
                        href="mailto:info@bdathletics.gov.bd"
                        className="text-sm text-white/90 hover:text-white transition-colors"
                      >
                        info@bdathletics.gov.bd
                      </a>
                    </CardContent>
                  </Card>

                  <Card className="border-none bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-8 text-center">
                      <Phone className="w-10 h-10 mx-auto mb-4" />
                      <div className="font-semibold mb-3 text-lg">Call Us</div>
                      <a href="tel:+8801234567890" className="text-sm text-white/90 hover:text-white transition-colors">
                        +880 1234-567890
                      </a>
                    </CardContent>
                  </Card>

                  <Card className="border-none bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-8 text-center">
                      <HelpCircle className="w-10 h-10 mx-auto mb-4" />
                      <div className="font-semibold mb-3 text-lg">Visit Help Center</div>
                      <a
                        href="#"
                        className="text-sm text-white/90 hover:text-white transition-colors inline-flex items-center gap-1"
                      >
                        Contact Form
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </Tabs>
      </div>
    </div>
  );
}
