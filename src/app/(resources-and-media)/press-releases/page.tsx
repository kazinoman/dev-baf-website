"use client";
import React, { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Newspaper,
  Search,
  Calendar,
  User,
  TrendingUp,
  Award,
  Megaphone,
  FileText,
  X,
  ChevronRight,
} from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Link from "next/link";
import DynamicHeading from "@/components/Home/HeadingComponent";

const categoryInfo = {
  all: {
    title: "All News",
    icon: Newspaper,
    color: "bg-gray-100 text-gray-800",
  },
  announcement: {
    title: "Announcements",
    icon: Megaphone,
    color: "bg-blue-100 text-blue-800",
  },
  achievement: {
    title: "Achievements",
    icon: Award,
    color: "bg-yellow-100 text-yellow-800",
  },
  event: {
    title: "Events",
    icon: Calendar,
    color: "bg-green-100 text-green-800",
  },
  partnership: {
    title: "Partnerships",
    icon: TrendingUp,
    color: "bg-purple-100 text-purple-800",
  },
  policy: {
    title: "Policies",
    icon: FileText,
    color: "bg-red-100 text-red-800",
  },
};

// Dummy Press Releases
const DUMMY_PRESS_RELEASES = [
  {
    id: 1,
    title: "Bangladesh Athletics Federation Launches New Training Program",
    subtitle: "Aims to boost performance of young athletes nationwide",
    category: "announcement",
    image_url: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=800&q=80",
    content:
      "The Bangladesh Athletics Federation has launched a new training initiative aimed at improving the performance of upcoming athletes through structured mentorship and advanced facilities.",
    publish_date: "2025-10-05",
    author: "Admin",
    tags: ["training", "sports", "development"],
    is_featured: true,
  },
  {
    id: 2,
    title: "National Athletics Championship 2025 Announced",
    subtitle: "Get ready for the biggest sporting event of the year",
    category: "event",
    image_url: "https://images.unsplash.com/photo-1598970434795-0c54fe7c0642?auto=format&fit=crop&w=800&q=80",
    content:
      "The annual National Athletics Championship will kick off next month featuring top athletes across the country competing in various categories.",
    publish_date: "2025-09-25",
    author: "BAF Media",
    tags: ["championship", "athletics", "competition"],
    is_featured: true,
  },
  {
    id: 3,
    title: "Partnership with Global Sports Agency",
    subtitle: "New opportunities for international exposure",
    category: "partnership",
    image_url: "https://images.unsplash.com/photo-1533667586627-9be7c9e3f0ea?auto=format&fit=crop&w=800&q=80",
    content:
      "The Bangladesh Athletics Federation has partnered with Global Sports Agency to provide more international exposure to local athletes through global tournaments.",
    publish_date: "2025-08-20",
    author: "BAF PR Team",
    tags: ["partnership", "global", "athletes"],
    is_featured: true,
  },
  {
    id: 4,
    title: "New Policy for Athlete Health and Safety",
    subtitle: "Ensuring athlete well-being on and off the field",
    category: "policy",
    image_url: "https://images.unsplash.com/photo-1571019613914-85f342c9e66f?auto=format&fit=crop&w=800&q=80",
    content:
      "A new health and safety policy has been introduced to ensure better medical support and psychological care for athletes across all levels.",
    publish_date: "2025-09-10",
    author: "Health Committee",
    tags: ["policy", "health", "safety"],
    is_featured: false,
  },
  {
    id: 5,
    title: "Athletes Win 5 Medals in South Asian Games",
    subtitle: "Historic success for Bangladesh athletics",
    category: "achievement",
    image_url: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=800&q=80",
    content:
      "Bangladeshi athletes secured five medals in the South Asian Games, marking a historic achievement for the federation.",
    publish_date: "2025-07-28",
    author: "BAF Newsroom",
    tags: ["achievement", "medal", "games"],
    is_featured: false,
  },
];

export default function PressReleases() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [pressReleases, setPressReleases] = useState(DUMMY_PRESS_RELEASES);
  const [isLoading, setIsLoading] = useState(false);

  const filteredReleases = pressReleases.filter(
    (release) =>
      (selectedCategory === "all" || release.category === selectedCategory) &&
      (searchQuery === "" ||
        release.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        release.subtitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        release.content?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        release.tags?.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const featuredReleases = pressReleases.filter((r) => r.is_featured).slice(0, 3);
  const latestReleases = pressReleases.slice(0, 5);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] to-white py-12 px-4 pt-40">
      <div className="main_container mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#00704A]/10 to-[#C1272D]/10 rounded-full mb-6">
            <Newspaper className="w-4 h-4 text-[#00704A]" />
            <span className="text-sm font-semibold text-[#00704A]">Media Center</span>
          </div>

          <DynamicHeading className="text-4xl md:!text-6xl font-bold" title="Press Releases" />

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Latest news, announcements, and updates from Bangladesh Athletics Federation
          </p>
        </div>

        {/* Featured Articles */}
        {featuredReleases.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#2D3436] mb-6 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-[#00704A]" />
              Featured Stories
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredReleases.map((release) => (
                <Card
                  key={release.id}
                  className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-pointer group"
                >
                  <div className="relative h-48">
                    <img
                      src={release.image_url}
                      alt={release.title}
                      className="w-full h-full object-cover transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    {/* <div className="absolute top-4 left-4">
                      <Badge className="bg-[#D4AF37] text-white border-none shadow-lg">FEATURED</Badge>
                    </div> */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge variant="outline" className={`${categoryInfo[release.category]?.color} border-none mb-2`}>
                        {release.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-[#2D3436] mb-2 line-clamp-2">{release.title}</h3>
                    {release.subtitle && <p className="text-gray-600 text-sm mb-4 line-clamp-2">{release.subtitle}</p>}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        {format(new Date(release.publish_date), "MMM d, yyyy")}
                      </div>
                      <ChevronRight className="w-5 h-5 text-[#00704A]" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Search Bar */}
            <Card className="border-none shadow-xl">
              <CardContent className="p-6">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    placeholder="Search press releases..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-14 text-lg border-gray-200 focus:border-[#00704A]"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Category Tabs */}
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="flex flex-row bg-white border border-gray-200 p-3 rounded-xl shadow-lg">
                {Object.entries(categoryInfo).map(([key, info]) => {
                  const Icon = info.icon;
                  return (
                    <TabsTrigger
                      key={key}
                      value={key}
                      className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#00704A] data-[state=active]:to-[#005239] data-[state=active]:text-white"
                    >
                      <Icon className="w-4 h-4 md:mr-2 inline md:hidden" />
                      <span className="hidden md:inline">{info.title.split(" ")[0]}</span>
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </Tabs>

            {/* Press Releases List */}
            {isLoading ? (
              <div className="space-y-6">Loading...</div>
            ) : filteredReleases.length > 0 ? (
              <div className="space-y-6">
                {filteredReleases.map((release) => (
                  <Card
                    key={release.id}
                    className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group"
                  >
                    <div className="md:flex h-full">
                      {/* IMAGE SECTION */}
                      <div className="md:w-1/3 relative h-[300px] flex-shrink-0">
                        <img
                          src={release.image_url}
                          alt={release.title}
                          className="w-full h-full object-cover  transition-transform duration-500"
                        />
                      </div>

                      {/* CONTENT SECTION */}
                      <CardContent className="md:w-2/3 px-2 py-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <Badge variant="outline" className={`${categoryInfo[release.category]?.color} border-none`}>
                              {release.category}
                            </Badge>
                            {release.is_featured && (
                              <Badge className="bg-[#D4AF37] text-white border-none">FEATURED</Badge>
                            )}
                          </div>

                          <h3 className="text-2xl font-bold text-[#2D3436] mb-3 group-hover:text-[#00704A] transition-colors">
                            {release.title}
                          </h3>

                          <p className="text-gray-600 mb-4 line-clamp-2">{release.content}</p>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {format(new Date(release.publish_date), "MMM d, yyyy")}
                            </div>
                            {release.author && (
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4" />
                                {release.author}
                              </div>
                            )}
                          </div>
                          <Button type="button" className="text-[#00704A] hover:text-[#005239]">
                            Read More <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </div>

                        {release.tags && release.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4  border-t border-gray-100">
                            {release.tags.map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-none shadow-lg">
                <CardContent className="p-16 text-center">
                  <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg mb-2">No press releases found</p>
                  <p className="text-sm text-gray-500">Try adjusting your filters or search query</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6 sticky top-24 ">
            {/* Latest News */}
            <Card className="border-none shadow-xl">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-[#00704A]" />
                  Latest News
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {latestReleases.map((release) => (
                    <div
                      key={release.id}
                      className="pb-4 border-b border-gray-100  cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors border"
                    >
                      <Badge
                        variant="outline"
                        className={`${categoryInfo[release.category]?.color} border-none text-xs mb-2`}
                      >
                        {release.category}
                      </Badge>
                      <h4 className="font-semibold text-[#2D3436] mb-2 line-clamp-2 text-sm">{release.title}</h4>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {format(new Date(release.publish_date), "MMM d")}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Media Contact */}
            <Card className="border-none shadow-xl bg-gradient-to-br from-[#00704A] to-[#005239] text-white">
              <CardContent className="p-8">
                <Newspaper className="w-12 h-12 mb-4" />
                <h3 className="text-xl font-bold mb-2">Media Inquiries</h3>
                <p className="text-white/90 text-sm mb-6">For press inquiries and media accreditation requests</p>
                <Link href={"#"}>
                  <Button type="button" className="w-full bg-white text-[#00704A] hover:bg-gray-100">
                    Contact Media Team
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
