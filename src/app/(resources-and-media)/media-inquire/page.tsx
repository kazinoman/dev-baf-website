"use client";

import React, { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Newspaper,
  Mail,
  Phone,
  Building2,
  User,
  Calendar,
  Briefcase,
  Send,
  CheckCircle,
  Camera,
  Mic,
  Video,
  Radio as RadioIcon,
  FileText,
  Share2,
} from "lucide-react";

import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import DynamicHeading from "@/components/Home/HeadingComponent";

const inquiryTypes = {
  media_accreditation: {
    title: "Media Accreditation",
    icon: Camera,
    description: "Apply for media access to events and facilities",
  },
  interview_request: {
    title: "Interview Request",
    icon: Mic,
    description: "Request interviews with athletes, coaches, or officials",
  },
  press_inquiry: {
    title: "Press Inquiry",
    icon: FileText,
    description: "General press and media inquiries",
  },
  photo_request: {
    title: "Photo/Video Request",
    icon: Video,
    description: "Request photos or video footage",
  },
  partnership: {
    title: "Partnership",
    icon: Share2,
    description: "Media partnership opportunities",
  },
  other: {
    title: "Other",
    icon: Mail,
    description: "Other media-related inquiries",
  },
};

const mediaTypes = [
  { value: "print", label: "Print Media", icon: FileText },
  { value: "online", label: "Online/Digital", icon: Share2 },
  { value: "tv", label: "Television", icon: Video },
  { value: "radio", label: "Radio", icon: RadioIcon },
  { value: "podcast", label: "Podcast", icon: Mic },
  { value: "social_media", label: "Social Media", icon: Camera },
];

export default function MediaInquiries() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    inquiry_type: "",
    organization: "",
    contact_name: "",
    email: "",
    phone: "",
    position: "",
    subject: "",
    message: "",
    event_coverage: "",
    coverage_date: "",
    media_type: [] as string[],
    credentials_requested: false,
  });

  const submitMutation = () => {};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleMediaTypeToggle = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      media_type: prev.media_type.includes(type)
        ? prev.media_type.filter((t) => t !== type)
        : [...prev.media_type, type],
    }));
  };

  if (submitted) {
    return (
      <div className=" min-h-screen bg-gradient-to-br from-[#F8F6F3] to-white flex items-center justify-center py-12 px-4">
        <Card className="w-full border-none shadow-2xl">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00704A] to-[#005239] flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-[#2D3436] mb-4">Inquiry Submitted Successfully!</h2>
            <p className="text-gray-600 text-lg mb-8">
              Thank you for your inquiry. Our media team will review your request and get back to you within 2-3
              business days.
            </p>
            <div className="bg-[#00704A]/5 rounded-xl p-6 mb-8">
              <p className="text-sm text-gray-600 text-left">
                <strong>What’s next?</strong>
                <br />• You will receive a confirmation email shortly
                <br />• Our team will review your request
                <br />• We’ll contact you with further details
              </p>
            </div>
            <Button
              type="button"
              onClick={() => setSubmitted(false)}
              className="bg-gradient-to-r from-[#00704A] to-[#005239] hover:from-[#005239] hover:to-[#00704A] text-white"
            >
              Submit Another Inquiry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#F8F6F3] to-white py-16 px-4">
      <div className="main_container pt-40 mx-auto">
        {/* Hero Section */}
        <header className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00704A]/10 to-[#C1272D]/10 rounded-full mb-6">
            <Newspaper className="w-4 h-4 text-[#00704A]" />
            <span className="text-sm font-semibold text-[#00704A]">Media Center</span>
          </div>
          <DynamicHeading className="text-4xl md:!text-6xl font-bold" title="Media Inquiries" />

          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Submit your media inquiries, accreditation requests, and partnership opportunities.
          </p>
        </header>

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Form */}
          <Card className="lg:col-span-2 border-none shadow-2xl rounded-2xl">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-2xl px-8 py-4">Submit Your Inquiry</CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Inquiry Type */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Type of Inquiry *</Label>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(inquiryTypes).map(([key, info]) => {
                      const Icon = info.icon;
                      const active = formData.inquiry_type === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setFormData({ ...formData, inquiry_type: key })}
                          className={cn(
                            "p-4 border-2 rounded-xl text-left transition-all",
                            active
                              ? "border-[#00704A] bg-[#00704A]/5 shadow-sm"
                              : "border-gray-200 hover:border-[#00704A]/50"
                          )}
                        >
                          <Icon className=" w-6 h-6 text-[#00704A] mb-2" />
                          <p className="font-semibold text-sm mb-1">{info.title}</p>
                          <p className="text-xs text-gray-600">{info.description}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Organization Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <InputGroup
                    id="organization"
                    label="Media Organization *"
                    icon={Building2}
                    placeholder="e.g., The Daily Star"
                    value={formData.organization}
                    onChange={(v) => setFormData({ ...formData, organization: v })}
                    required
                  />
                  <InputGroup
                    id="position"
                    label="Your Position *"
                    icon={Briefcase}
                    placeholder="e.g., Sports Journalist"
                    value={formData.position}
                    onChange={(v) => setFormData({ ...formData, position: v })}
                    required
                  />
                </div>

                {/* Contact */}
                <div className="grid md:grid-cols-3 gap-6">
                  <InputGroup
                    id="contact_name"
                    label="Full Name *"
                    icon={User}
                    placeholder="John Doe"
                    value={formData.contact_name}
                    onChange={(v) => setFormData({ ...formData, contact_name: v })}
                    required
                  />
                  <InputGroup
                    id="email"
                    type="email"
                    label="Email *"
                    icon={Mail}
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(v) => setFormData({ ...formData, email: v })}
                    required
                  />
                  <InputGroup
                    id="phone"
                    label="Phone"
                    icon={Phone}
                    placeholder="+880 1XXX-XXXXXX"
                    value={formData.phone}
                    onChange={(v) => setFormData({ ...formData, phone: v })}
                  />
                </div>

                {/* Media Type */}
                <div>
                  <Label className="text-base font-semibold mb-3 block">Type of Media *</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {mediaTypes.map((type) => {
                      const Icon = type.icon;
                      const selected = formData.media_type.includes(type.value);
                      return (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => handleMediaTypeToggle(type.value)}
                          className={cn(
                            "p-1.5 md:p-4 border-2 rounded-xl flex items-center gap-3 transition-all",
                            selected ? "border-[#00704A] bg-[#00704A]/5" : "border-gray-200 hover:border-[#00704A]/50"
                          )}
                        >
                          <Icon className="hidden md:block w-5 h-5 text-[#00704A]" />
                          <span className="font-medium text-[10px] md:text-sm">{type.label}</span>
                          <div className="ml-auto">
                            {selected && <CheckCircle className="!w-5 !h-5 text-[#00704A] ml-auto" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Subject */}
                <InputGroup
                  id="subject"
                  label="Subject *"
                  placeholder="Brief description of your inquiry"
                  value={formData.subject}
                  onChange={(v) => setFormData({ ...formData, subject: v })}
                  required
                />

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    placeholder="Please provide details about your inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="min-h-40"
                    required
                  />
                </div>

                {/* Submit */}
                <Button
                  variant="black"
                  type="submit"
                  className="w-full h-14 bg-gradient-to-r from-[#00704A] to-[#005239] hover:from-[#005239] hover:to-[#00704A] text-white text-lg font-semibold"
                >
                  Submit Inquiry
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Sidebar */}
          <aside className="space-y-6">
            <Card className="border-none shadow-xl rounded-2xl">
              <CardHeader className="border-b border-gray-100">
                <CardTitle>Media Relations</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4 text-sm text-gray-700">
                <p>For urgent media inquiries:</p>
                <div className="space-y-2">
                  <ContactLine
                    icon={Mail}
                    text="media@bdathletics.gov.bd"
                    href="mailto:media@bdathletics.gov.bd"
                    color="#00704A"
                  />
                  <ContactLine icon={Phone} text="+880 1234-567890" href="tel:+8801234567890" color="#C1272D" />
                </div>
                <div className="pt-4 border-t border-gray-200 text-gray-600 text-sm">
                  <strong>Office Hours:</strong>
                  <br />
                  Sunday - Thursday: 9:00 AM - 5:00 PM
                  <br />
                  Friday - Saturday: Closed
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl bg-gradient-to-br from-[#C1272D] to-[#A01F25] text-white rounded-2xl">
              <CardContent className="p-8 text-center">
                <FileText className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Media Guidelines</h3>
                <p className="text-white/90 text-sm mb-4">
                  Please review our media guidelines before submitting your request.
                </p>
                <Button
                  type="button"
                  variant="white"
                  className="w-full bg-white text-[#C1272D] hover:bg-gray-100 hover:text-black"
                >
                  Download Guidelines
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ---------- SMALL REUSABLE COMPONENTS ---------- */
function InputGroup({
  id,
  label,
  icon: Icon,
  value,
  onChange,
  type = "text",
  placeholder,
  required,
}: {
  id: string;
  label: string;
  icon?: React.ElementType;
  value: string;
  onChange: (val: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />}
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn("pl-10 h-12", Icon && "pl-10")}
          required={required}
        />
      </div>
    </div>
  );
}

function ContactLine({
  icon: Icon,
  text,
  href,
  color,
}: {
  icon: React.ElementType;
  text: string;
  href: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon className="w-4 h-4" style={{ color }} />
      <a href={href} className="hover:underline">
        {text}
      </a>
    </div>
  );
}
