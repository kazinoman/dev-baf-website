import React from "react";
import { FaUser, FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import logo from "@/assets/images/logo_title_white.png";
import Link from "next/link";
import Image from "next/image";

const Footer: React.FC = () => {
  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Events", href: "#events" },
    { name: "Rankings", href: "#rankings" },
    { name: "Training", href: "#training" },
    { name: "Media Gallery", href: "#media" },
  ];

  const athleteLinks = [
    { name: "Register", href: "#register" },
    { name: "Athlete Portal", href: "#portal" },
    { name: "Find a Coach", href: "#coaches" },
    { name: "Anti-Doping", href: "#antidoping" },
    { name: "Records", href: "#records" },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, href: "#" },
    { icon: <FaTwitter />, href: "#" },
    { icon: <FaInstagram />, href: "#" },
    { icon: <FaYoutube />, href: "#" },
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Content */}
      <div className="main_container mx-auto px-6 sm:px-8 lg:px-10 py-14">
        {/* Small/Medium screen layout */}
        <div className="block lg:hidden">
          {/* Brand & About - full width */}
          <div className="mb-10">
            <div className="flex items-center space-x-3 mb-6 justify-center sm:justify-start">
              <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center shadow-md">
                {/* Logo */}
                <Link href="/">
                  <Image
                    src={logo}
                    className="w-32 md:w-44 lg:w-48 h-auto py-2 lg:py-3"
                    width={200}
                    height={400}
                    alt="logo-title"
                  />
                </Link>
              </div>
              <div>
                <h3 className="text-lg font-bold">Bangladesh Athletics</h3>
                <p className="text-green-400 text-sm">Federation Portal</p>
              </div>
            </div>
            <p className="text-gray-400 leading-relaxed text-center sm:text-left mb-6">
              The official governing body for athletics in Bangladesh, dedicated to developing and promoting track and
              field sports nationwide.
            </p>
            <div className="flex justify-center sm:justify-start space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Other sections in 2 columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
            {/* Quick Links */}
            <div className="text-center sm:text-left">
              <h4 className="text-lg font-bold mb-6 text-green-500">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Athletes */}
            <div className="text-center sm:text-left">
              <h4 className="text-lg font-bold mb-6 text-green-500">For Athletes</h4>
              <ul className="space-y-3">
                {athleteLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="text-center sm:text-left sm:col-span-2">
              <h4 className="text-lg font-bold mb-6 text-green-500">Contact</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="mailto:info@baf.gov.bd" className="hover:text-green-400 transition-colors duration-200">
                    info@baf.gov.bd
                  </a>
                </li>
                <li>
                  <a href="tel:+880123456789" className="hover:text-green-400 transition-colors duration-200">
                    +880 123 456 789
                  </a>
                </li>
                <li>
                  Dhaka National Stadium
                  <br />
                  Dhaka, Bangladesh
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Large screen layout (previous 4-column version) */}
        <div className="hidden lg:grid grid-cols-4 gap-10 lg:gap-14">
          {/* Brand & About */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              {/* <div className="w-12 h-12 bg-[#00916e] rounded-full flex items-center justify-center shadow-md"> */}
              {/* Logo */}
              <Link href="/">
                <Image
                  src={logo}
                  className="w-32 md:w-44 lg:w-48 h-auto py-2 lg:py-3"
                  width={200}
                  height={400}
                  alt="logo-title"
                />
              </Link>
              {/* </div> */}
            </div>
            <p className="text-gray-400 leading-relaxed mb-6">
              The official governing body for athletics in Bangladesh, dedicated to developing and promoting track and
              field sports across the nation.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-[#00916e] transition-colors duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-[#00916e] transition-colors duration-200">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Athletes */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">For Athletes</h4>
            <ul className="space-y-3">
              {athleteLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-400 hover:text-[#00916e] transition-colors duration-200">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white">Contact</h4>
            <ul className="space-y-3 text-gray-400">
              <li>
                <a href="mailto:info@baf.gov.bd" className="hover:text-[#00916e] transition-colors duration-200">
                  info@baf.gov.bd
                </a>
              </li>
              <li>
                <a href="tel:+880123456789" className="hover:text-[#00916e] transition-colors duration-200">
                  +880 123 456 789
                </a>
              </li>
              <li>
                Dhaka National Stadium
                <br />
                Dhaka, Bangladesh
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 py-6 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Bangladesh Athletics Federation. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
