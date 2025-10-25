"use client";

import { ContactAddress } from "@/components/contact/ContactAddress";
import ContactForm from "@/components/contact/ContactForm";
import AllPageTopBannar from "@/components/ui/AllPageTopBanner";
import Button from "@/components/ui/Button";
import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import DynamicHeading from "@/components/Home/HeadingComponent";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    try {
      // await SendEmail({
      //   to: "info@bdathletics.gov.bd",
      //   subject: `Contact Form: ${formData.subject}`,
      //   body: `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
      // });
      setSent(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setSent(false), 5000);
    } catch (error) {
      console.error("Error sending email:", error);
    }
    setIsSending(false);
  };

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <div>
      <AllPageTopBannar pageName="contact" pageTtile="contact us" />
      {/* <ContactAddress/>
      <ContactForm/> */}

      <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] to-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            {/* Contact <span className="text-[#00704A]">Us</span> */}
            <DynamicHeading title="Contact Us" />

            <p className="text-gray-600 text-lg">Get in touch with Bangladesh Athletics Federation</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="border-none shadow-2xl">
              <div className="border-b border-gray-200 p-4">
                <div className="text-xl semibold text-black">
                  <p className="font-bold">Send Us a Message</p>
                </div>
              </div>
              <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-[#2D3436] font-semibold flex items-center">
                      <i className="fas fa-user mr-2 text-[#00704A]"></i>Your Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full h-12 px-4 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00704A] focus:border-transparent transition"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-[#2D3436] font-semibold flex items-center">
                      <i className="fas fa-envelope mr-2 text-[#00704A]"></i>Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full h-12 px-4 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00704A] focus:border-transparent transition"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-[#2D3436] font-semibold flex items-center">
                      <i className="fas fa-tag mr-2 text-[#00704A]"></i>Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full h-12 px-4 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00704A] focus:border-transparent transition"
                      placeholder="What is this regarding?"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[#2D3436] font-semibold flex items-center">
                      <i className="fas fa-comment-dots mr-2 text-[#00704A]"></i>Message
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full min-h-44 p-4 border border-gray-300 text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00704A] focus:border-transparent transition"
                      placeholder="Type your message here..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSending || sent}
                    className="w-full h-12 bg-gradient-to-r from-[#00704A] to-[#005239] hover:from-[#005239] hover:to-[#00704A] text-white text-lg font-semibold rounded-lg transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSending ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Sending...
                      </>
                    ) : sent ? (
                      "Message Sent!"
                    ) : (
                      <>
                        <i className="fas fa-paper-plane mr-2"></i>
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="border-none shadow-lg">
                <div className="p-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00704A] to-[#005239] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-[#2D3436] mb-1">Email</h3>
                      <p className="text-gray-600">info@bdathletics.gov.bd</p>
                      <p className="text-gray-600">support@bdathletics.gov.bd</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C1272D] to-[#A01F25] flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-[#2D3436] mb-1">Phone</h3>
                      <p className="text-gray-600">+880 1234-567890</p>
                      <p className="text-gray-600">+880 1234-567891</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-[#2D3436] mb-1">Address</h3>
                      <p className="text-gray-600">
                        Bangladesh Athletics Federation
                        <br />
                        National Sports Complex
                        <br />
                        Dhaka 1000, Bangladesh
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#00704A]/20 to-[#C1272D]/20 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-[#00704A]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg text-[#2D3436] mb-1">Office Hours</h3>
                      <p className="text-gray-600">
                        Sunday - Thursday: 9:00 AM - 5:00 PM
                        <br />
                        Friday - Saturday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="border-none shadow-lg overflow-hidden rounded-lg">
                <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.598332561696!2d90.413444!3d23.727833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQzJzQwLjIiTiA5MMKwMjQnNDguNCJF!5e0!3m2!1sen!2sbd!4v1690000000000!5m2!1sen!2sbd"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    // allowFullScreen=""
                    loading="lazy"
                    // referrerPolicy="no-referrer-when-dropgrade"
                    className="w-full h-full"
                    title="Bangladesh Athletics Federation Location - Exact Coordinates"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
