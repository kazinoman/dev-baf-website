"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ArrowLeft, User, Home, ChevronRight } from "lucide-react";
import DrawerComponent from "../ui/Drawer";
import logo from "@/assets/images/logo_title.png";
import Image from "next/image";
import { TiMinus } from "react-icons/ti";
import { Drawer } from "antd";

// Type definitions
interface MenuItem {
  name: string;
  href: string;
  hasMegamenu?: boolean;
}

interface MegamenuLink {
  name: string;
  href: string;
}

interface MegamenuSection {
  title: string;
  links?: MegamenuLink[];
  content?: React.ReactNode;
}

interface MegamenuContentItem {
  sections: MegamenuSection[];
}

interface MegamenuContent {
  [key: string]: MegamenuContentItem;
}

type NavigationLevel = "main" | "sections" | "links";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [activeMegamenu, setActiveMegamenu] = useState<string | null>(null);
  const [isLangOpen, setIsLangOpen] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("bn");

  // Navigation state for mobile
  // Navigation state for mobile
  const [navigationLevel, setNavigationLevel] = useState<NavigationLevel>("main");
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [selectedSection, setSelectedSection] = useState<MegamenuSection | null>(null);

  const menus: MenuItem[] = [
    { name: "The Federation", href: "/gallery", hasMegamenu: true },
    { name: "Athletes Hub", href: "/athletes", hasMegamenu: true },
    { name: "Events Hub", href: "/events", hasMegamenu: true },
    { name: "Resources & Media", href: "/news", hasMegamenu: true },
  ];

  const megamenuContent: MegamenuContent = {
    ["Athletes Hub"]: {
      sections: [
        {
          title: "Athlete Portal",
          links: [
            { name: "Online Registration", href: "/athletes/all" },
            // { name: "Athlete Login", href: "/athletes/track-field" },
            // { name: "Athlete Dashboard", href: "/athletes/swimming" },
          ],
        },
        {
          title: "Categories",
          links: [
            { name: "All Athletes", href: "/athletes" },
            // { name: "Senior Division", href: "/athletes/elite" },
            // { name: "Junior Division", href: "/athletes/youth" },
          ],
        },
        {
          title: "Rankings & Records",
          links: [
            { name: "National Rankings", href: "/ranking" },
            { name: "Records (National & International)", href: "/record" },
            { name: "Hall of Fame", href: "/hall-of-fame" },
          ],
        },
      ],
    },
    ["Events Hub"]: {
      sections: [
        {
          title: "Competitions & Championships",
          links: [
            { name: "All Events", href: "/all-event" },
            { name: "Upcoming Events", href: "/events/all" },
            { name: "Past Results", href: "/post-event-result" },
            { name: "Live Updates", href: "/events/live" },
          ],
        },
        {
          title: "Training & Coaching",
          links: [
            { name: "National Training Programs", href: "/national-training-program" },
            { name: "Certified Coaches", href: "/certified-coach" },
            { name: "Talent Development", href: "/talent-development" },
            { name: "Workshops & Seminars", href: "/workshop" },
          ],
        },
      ],
    },
    ["Resources & Media"]: {
      sections: [
        {
          title: "Anti-Doping & Fair Play",
          links: [
            { name: "Anti-Doping", href: "/anti-doping" },
            { name: "Anti-Doping Rules", href: "/anti-doping/rules-and-regulation" },
            { name: "Approved Substances", href: "/anti-doping/approved-supplements" },
            { name: "Banned Substances", href: "/anti-doping/banned-supplements" },
            { name: "WADA Guidelines", href: "/anti-doping/wada-guidelines" },
            { name: "Report Violations", href: "/anti-doping/violation-report" },
          ],
        },
        {
          title: "Media & Publications",
          links: [
            { name: "Photo & Video Gallery", href: "/photo-gallery" },
            { name: "Press Releases", href: "/press-releases" },
            { name: "Media Accreditation", href: "/media-inquire" },
          ],
        },
        {
          title: "Support & FAQs",
          links: [{ name: "Frequently Asked Questions", href: "/resource-faq" }],
        },
      ],
    },
    ["The Federation"]: {
      sections: [
        {
          title: "About BAF",
          links: [
            { name: "Our History", href: "/history" },
            { name: "Mission & Vision", href: "/mission-and-vision" },
            { name: "Organizational Structure", href: "/organizational-structure" },
          ],
        },
        {
          title: "Partnerships & Sponsors",
          links: [
            { name: "Our Partners & Sponsors", href: "/our-sponsors" },
            { name: "Become a Sponsor", href: "/our-sponsors/apply-for-sponsorship" },
            { name: "Partnership Programs", href: "/partnership-program" },
          ],
        },
        {
          title: "Governance & Contact",
          links: [
            { name: "Contact Information", href: "/contact" },
            // { name: "Contact Form", href: "/gallery/form" },
          ],
        },
      ],
    },
  };

  useEffect(() => {
    const handleScroll = (): void => {
      setShow(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setIsLangOpen(false);
  };

  const openMenu = () => {
    setIsMenuOpen(true);
    setNavigationLevel("main");
    setSelectedMenu(null);
    setSelectedSection(null);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setTimeout(() => {
      setNavigationLevel("main");
      setSelectedMenu(null);
      setSelectedSection(null);
    }, 300);
  };

  const handleMainMenuClick = (menu: MenuItem) => {
    if (menu.hasMegamenu) {
      setSelectedMenu(menu.name);
      setNavigationLevel("sections");
    } else {
      window.location.href = menu.href;
      closeMenu();
    }
  };

  const handleSectionClick = (section: MegamenuSection) => {
    setSelectedSection(section);
    setNavigationLevel("links");
  };

  const handleBackToMain = () => {
    setNavigationLevel("main");
    setSelectedMenu(null);
    setSelectedSection(null);
  };

  const handleBackToSections = () => {
    setNavigationLevel("sections");
    setSelectedSection(null);
  };

  const handleLinkClick = () => {
    closeMenu();
  };

  const onClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`w-full fixed top-9 z-50 ${
        show ? "translate-y-[-39px] duration-500 ease-in mt-3" : "-translate-y-0 duration-500 ease-in shadow-none"
      } `}
    >
      <div className="px-6">
        <div className="main_container bg-white rounded-md relative shadow-sm">
          <div className="flex items-center justify-between px-5 py-0">
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

            {/* Right side container */}
            <div className="flex items-center">
              {/* Desktop Menu */}
              <nav className="hidden lg:flex items-center w-full text-black">
                {menus.map((item) => (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => item.hasMegamenu && setActiveMegamenu(item.name)}
                  >
                    {item.hasMegamenu ? (
                      <button className="whitespace-nowrap cursor-pointer px-6 py-2 transition-all duration-100 ease-in-out text-[#444444]  hover:text-emerald-600 hover:bg-emerald-50 font-semibold text-sm md:text-base uppercase flex items-center gap-1">
                        {item.name}
                        <ChevronDown
                          size={16}
                          className={`transition-transform duration-000 ${
                            activeMegamenu === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className="px-6 py-2 transition-all duration-300 ease-in-out text-[#444444] hover:text-emerald-600 hover:bg-emerald-50 font-semibold text-sm md:text-base uppercase"
                        onMouseEnter={() => setActiveMegamenu(null)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Buttons + Language */}
              <div className="flex items-center gap-4 pl-7">
                {/* Login Button */}
                <button className="bg-gradient-to-r from-[#C1272D] to-[#A01F25] hover:bg-red-700 cursor-pointer text-white px-5 py-2 md:py-[10px] rounded-md text-sm font-medium transition-colors">
                  LOGIN
                </button>

                {/* Language Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsLangOpen((prev) => !prev)}
                    className="cursor-pointer relative flex items-center justify-center w-8 h-8 p-0.5 rounded-full border border-gray-200 bg-white hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 shadow-sm overflow-hidden"
                  >
                    <Image
                      src={
                        language === "bn"
                          ? "/bd-flag.webp" // 🇧🇩 High-quality Bangladesh flag
                          : "/usa_flag.png" // 🇺🇸 High-quality USA flag
                      }
                      alt={language === "bn" ? "Bangladesh Flag" : "US Flag"}
                      height={60}
                      width={60}
                      className="object-cover h-full w-full"
                    />
                  </button>

                  {isLangOpen && (
                    <div
                      className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 animate-fadeIn"
                      onMouseLeave={() => setIsLangOpen(false)}
                    >
                      <button
                        onClick={() => handleLanguageChange("bn")}
                        className="flex items-center w-full gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <Image src="https://flagcdn.com/w40/bd.png" alt="Bangladesh Flag" width={20} height={14} />
                        <span>বাংলা</span>
                      </button>
                      <button
                        onClick={() => handleLanguageChange("en")}
                        className="flex items-center w-full gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                      >
                        <Image src="https://flagcdn.com/w40/us.png" alt="US Flag" width={20} height={14} />
                        <span>English</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Mobile Menu Toggle */}
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded bg-black text-white lg:hidden"
                >
                  {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
          </div>

          {/* Megamenu */}
          {activeMegamenu && megamenuContent[activeMegamenu] && (
            <div
              className="absolute left-0 right-0 top-full z-40"
              onMouseEnter={() => setActiveMegamenu(activeMegamenu)}
              onMouseLeave={() => setActiveMegamenu(null)}
            >
              <div className="pt-0">
                <div className="bg-white shadow-xl border-t-2 border-emerald-600 rounded-b-xs p-8">
                  <div className="grid grid-cols-4 gap-20">
                    {megamenuContent[activeMegamenu]?.sections?.map((section: MegamenuSection, idx: number) => (
                      <div key={idx}>
                        <h3 className="font-bold text-sm uppercase text-gray-800 mb-4 border-b pb-2 whitespace-nowrap">
                          {section.title}
                        </h3>
                        {section.links ? (
                          <ul className="space-y-2">
                            {section.links.map((link: MegamenuLink, linkIdx: number) => (
                              <li key={linkIdx} onClick={() => setActiveMegamenu(null)}>
                                <Link
                                  href={link.href}
                                  className="text-sm text-gray-600 hover:text-emerald-600 transition-colors flex items-center gap-2"
                                >
                                  <TiMinus size={10} className="text-emerald-600 " />
                                  {link.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          section.content
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <Drawer title="" closable onClose={onClose} open={isMenuOpen} width={250} bodyStyle={{ padding: 0 }}>
            <div
              className={`absolute top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 ${
                isMenuOpen ? "translate-x-0" : "translate-x-full"
              }`}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-emerald-600 to-emerald-700">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-bold text-white">
                    {navigationLevel === "main" && "Main Menu"}
                    {navigationLevel === "sections" && selectedMenu}
                    {navigationLevel === "links" && selectedSection?.title}
                  </h2>
                </div>
                <button
                  onClick={closeMenu}
                  className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content Area */}
              <div className="overflow-y-auto h-[calc(100%-64px)] scrollbar-hide">
                {/* Navigation Content with Slide Animation */}
                <div className="relative overflow-hidden">
                  {/* LEVEL 1: Main Menu */}
                  <div className={`${navigationLevel === "main" ? "block" : "hidden"}`}>
                    <nav className="p-2 ">
                      {menus.map((menu) => (
                        <button
                          key={menu.name}
                          onClick={() => handleMainMenuClick(menu)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-emerald-50 transition-colors rounded-lg mb-1 group"
                        >
                          <span className="font-semibold text-gray-800 group-hover:text-emerald-600">{menu.name}</span>
                          {menu.hasMegamenu && (
                            <ChevronRight size={20} className="text-gray-400 group-hover:text-emerald-600" />
                          )}
                        </button>
                      ))}
                    </nav>
                  </div>

                  {/* LEVEL 2: Sections */}
                  <div className={`${navigationLevel === "sections" ? "block" : "hidden"}`}>
                    <nav className="p-2 ">
                      {navigationLevel === "sections" && (
                        <button
                          onClick={handleBackToMain}
                          className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30  transition-all duration-300 animate-slideInLeft border-b bg-gradient-to-r from-emerald-600 to-emerald-700"
                        >
                          <ArrowLeft size={20} />
                        </button>
                      )}
                      {selectedMenu &&
                        megamenuContent[selectedMenu]?.sections?.map((section, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleSectionClick(section)}
                            className="w-full flex items-center justify-between p-4 text-left hover:bg-emerald-50 transition-colors rounded-lg mb-1 group"
                          >
                            <div>
                              <h3 className="font-semibold text-gray-800 group-hover:text-emerald-600">
                                {section.title}
                              </h3>
                              <p className="text-xs text-gray-500 mt-0.5">{section.links?.length} items</p>
                            </div>
                            <ChevronRight size={20} className="text-gray-400 group-hover:text-emerald-600" />
                          </button>
                        ))}
                    </nav>
                  </div>

                  {/* LEVEL 3: Links */}
                  <div className={`${navigationLevel === "links" ? "block" : "hidden"}`}>
                    <nav className="p-2">
                      {navigationLevel === "links" && (
                        <button
                          onClick={handleBackToSections}
                          className="p-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all duration-300 animate-slideInLeft border-b bg-gradient-to-r from-emerald-600 to-emerald-700"
                        >
                          <ArrowLeft size={20} />
                        </button>
                      )}

                      {selectedSection?.links?.map((link: MegamenuLink, idx: number) => (
                        <a
                          key={idx}
                          href={link.href}
                          onClick={handleLinkClick}
                          className="flex items-center gap-3 p-4 text-left hover:bg-emerald-50 transition-colors rounded-lg mb-1 group"
                        >
                          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-200 transition-colors">
                            <ChevronRight size={16} className="text-emerald-600" />
                          </div>
                          <span className="text-gray-700 group-hover:text-emerald-600 font-medium">{link.name}</span>
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>

                {/* Login & Language Section */}
                <div className="p-4 border-b bg-gray-50 space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-3 rounded-lg font-medium">
                    <User size={18} />
                    LOGIN
                  </button>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleLanguageChange("bn")}
                      className={`flex-1 py-2 px-3 rounded-lg border-2 transition-all text-sm font-medium ${
                        language === "bn"
                          ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      🇧🇩 বাংলা
                    </button>
                    <button
                      onClick={() => handleLanguageChange("en")}
                      className={`flex-1 py-2 px-3 rounded-lg border-2 transition-all text-sm font-medium ${
                        language === "en"
                          ? "border-emerald-600 bg-emerald-50 text-emerald-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      🇺🇸 English
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Drawer>
        )}
      </div>
    </header>
  );
}
