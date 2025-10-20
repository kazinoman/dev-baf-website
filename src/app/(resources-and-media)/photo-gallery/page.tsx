"use client";

import React, { useState } from "react";
import {
  Image as ImageIcon,
  Search,
  Camera,
  Download,
  Share2,
  X,
  ChevronLeft,
  ChevronRight,
  Trophy,
  Users,
  GraduationCap,
  Award,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/Badge";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Button from "@/components/ui/Button";
import Image from "next/image";

// 🟢 Category definitions
const categoryInfo = {
  all: { title: "All Photos", icon: ImageIcon, color: "from-emerald-600 to-emerald-800" },
  events: { title: "Events", icon: Trophy, color: "from-red-700 to-red-900" },
  athletes: { title: "Athletes", icon: Users, color: "from-yellow-500 to-yellow-700" },
  training: { title: "Training", icon: GraduationCap, color: "from-emerald-600 to-emerald-800" },
  awards: { title: "Awards", icon: Award, color: "from-yellow-500 to-yellow-700" },
};

// 🟢 Dummy Images
const dummyImages = [
  {
    id: 1,
    title: "National Sports Day",
    description: "Athletes celebrating victory on National Sports Day.",
    category: "events",
    image_url: "https://images.unsplash.com/photo-1505842465776-3b4953ca4f44",
    is_featured: true,
  },
  {
    id: 2,
    title: "Track Training",
    description: "Early morning sprint practice at the stadium.",
    category: "training",
    image_url: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
  },
  {
    id: 3,
    title: "Gold Medal Moment",
    description: "Celebrating the gold medal win at the national games.",
    category: "awards",
    image_url: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
  },
  {
    id: 4,
    title: "Team Celebration",
    description: "Team Bangladesh celebrating after a record-breaking relay run.",
    category: "athletes",
    image_url: "https://images.unsplash.com/photo-1505672678657-cc7037095e2c",
  },
  {
    id: 5,
    title: "Award Ceremony",
    description: "Honoring the top athletes of the year.",
    category: "awards",
    image_url: "https://images.unsplash.com/photo-1589987607627-61a1cf1f5f2e",
  },
  {
    id: 6,
    title: "Training Camp",
    description: "Athletes undergoing fitness training at camp.",
    category: "training",
    image_url: "https://images.unsplash.com/photo-1509223197845-458d87318791",
  },
  {
    id: 7,
    title: "Press Conference",
    description: "National Athletics team press meet before the event.",
    category: "events",
    image_url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
  },
  {
    id: 8,
    title: "Stadium View",
    description: "Aerial view of the main national athletics stadium.",
    category: "events",
    image_url: "https://images.unsplash.com/photo-1508606572321-901ea443707f",
  },
  {
    id: 9,
    title: "Athlete Portrait",
    description: "Focused and determined athlete ready for competition.",
    category: "athletes",
    image_url: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
  },
  {
    id: 10,
    title: "Medal Display",
    description: "Medals won during international championships.",
    category: "awards",
    image_url: "https://images.unsplash.com/photo-1611892440504-42a792e24d32",
  },
  {
    id: 11,
    title: "Training Session",
    description: "Athletes pushing their limits during a workout session.",
    category: "training",
    image_url: "https://images.unsplash.com/photo-1605296867304-46d5465a13f1",
  },
  {
    id: 12,
    title: "Podium Celebration",
    description: "Top athletes celebrating on the podium.",
    category: "awards",
    image_url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  },
];

export default function PhotoGallery() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // 🟢 Filter by category + search
  const filteredImages = dummyImages.filter((image) => {
    const matchCategory = selectedCategory === "all" || image.category === selectedCategory;
    const matchSearch =
      searchQuery === "" ||
      image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      image.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const handleImageClick = (image: any, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
  };

  const handleNextImage = () => {
    const nextIndex = (selectedIndex + 1) % filteredImages.length;
    setSelectedIndex(nextIndex);
    setSelectedImage(filteredImages[nextIndex]);
  };

  const handlePrevImage = () => {
    const prevIndex = (selectedIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedIndex(prevIndex);
    setSelectedImage(filteredImages[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white py-12 px-4">
      <div className="main_container pt-40 mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full mb-6">
            <Camera className="w-4 h-4" />
            <span className="text-sm font-semibold">Media Center</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Photo <span className="text-emerald-700">Gallery</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore moments of excellence, dedication, and triumph in Bangladesh athletics.
          </p>
        </div>

        {/* Featured Images Section */}
        {dummyImages.filter((img) => img.is_featured).length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3436] mb-8 flex items-center gap-2">
              <Award className="w-6 h-6 text-[#D4AF37]" />
              Featured Photos
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {dummyImages
                .filter((img) => img.is_featured)
                .slice(0, 3)
                .map((image, idx) => (
                  <Card
                    key={image.id}
                    className="border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-pointer group"
                    onClick={() => handleImageClick(image, idx)}
                  >
                    <div className="relative h-64 md:h-72">
                      <img
                        src={image.image_url}
                        alt={image.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <Badge className="bg-[#D4AF37] text-white border-none mb-2">FEATURED</Badge>
                        <h3 className="text-white font-bold text-lg md:text-xl line-clamp-2">{image.title}</h3>
                        {image.description && (
                          <p className="text-white/80 text-sm mt-1 line-clamp-2">{image.description}</p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* Search Bar */}
        <Card className="border-none shadow-md mb-8">
          <CardContent className="p-6 relative">
            <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search photos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base border-gray-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </CardContent>
        </Card>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid grid-cols-3 md:grid-cols-5 gap-2 mb-8 bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
            {Object.entries(categoryInfo).map(([key, info]) => {
              const Icon = info.icon;
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="data-[state=active]:bg-emerald-700 data-[state=active]:text-white rounded-md"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {info.title}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-none shadow-lg">
            <CardContent className="p-6 text-center">
              <ImageIcon className="w-8 h-8 text-[#00704A] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#00704A]">{dummyImages.length}</div>
              <div className="text-sm text-gray-600">Total Photos</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg">
            <CardContent className="p-6 text-center">
              <Trophy className="w-8 h-8 text-[#C1272D] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#C1272D]">
                {dummyImages.filter((i) => i.category === "events").length}
              </div>
              <div className="text-sm text-gray-600">Event Photos</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-[#D4AF37] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#D4AF37]">
                {dummyImages.filter((i) => i.category === "athletes").length}
              </div>
              <div className="text-sm text-gray-600">Athlete Photos</div>
            </CardContent>
          </Card>
          <Card className="border-none shadow-lg">
            <CardContent className="p-6 text-center">
              <Award className="w-8 h-8 text-[#00704A] mx-auto mb-2" />
              <div className="text-2xl font-bold text-[#00704A]">{dummyImages.length}</div>
              <div className="text-sm text-gray-600">Featured</div>
            </CardContent>
          </Card>
        </div>

        {/* Image Grid */}
        {filteredImages.length ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.map((image, idx) => (
              <Card
                key={image.id}
                className="overflow-hidden shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 hover:-translate-y-1"
                onClick={() => handleImageClick(image, idx)}
              >
                <div className="relative h-full w-full group">
                  <Image
                    priority
                    width={1000}
                    height={1000}
                    quality={100}
                    src={image.image_url}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Badge
                      variant="outline"
                      className={`bg-gradient-to-r ${categoryInfo[image.category]?.color} text-white border-none mb-2`}
                    >
                      {image.category}
                    </Badge>
                    <h3 className="text-white font-semibold text-sm truncate">{image.title}</h3>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border-none shadow-lg">
            <CardContent className="p-16 text-center">
              <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-2">No photos found</p>
            </CardContent>
          </Card>
        )}

        {/* Dialog */}
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-5xl p-0 overflow-hidden">
            <DialogTitle className="sr-only"></DialogTitle>
            {selectedImage && (
              <div className="relative ">
                <div className="h-[60dvh] w-full overflow-hidden rounded-lg">
                  <Image
                    priority
                    height={1000}
                    width={1000}
                    src={selectedImage.image_url}
                    alt={selectedImage.title}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="bg-white p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge
                      className={`bg-gradient-to-r ${
                        categoryInfo[selectedImage.category]?.color
                      } text-white border-none`}
                    >
                      {selectedImage.category}
                    </Badge>
                    {selectedImage.is_featured && (
                      <Badge className="bg-yellow-600 text-white border-none">FEATURED</Badge>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{selectedImage.title}</h2>
                  <p className="text-gray-600">{selectedImage.description}</p>
                  <div className="flex flex-col md:flex-row gap-3 mt-6">
                    <Button
                      type="button"
                      variant="black"
                      className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white"
                    >
                      <Download className="w-4 h-4 mr-2" /> Download
                    </Button>
                    <Button type="button" variant="white" className="flex-1 border-2 hover:text-white">
                      <Share2 className="w-4 h-4 mr-2" /> Share
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
