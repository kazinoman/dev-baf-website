"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Trophy, Award, Globe, Medal, Calendar, MapPin, Target, History, Crown, Video } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/Badge";

// Dummy records data
const DUMMY_RECORDS = [
  {
    id: 1,
    record_type: "national",
    category: "senior",
    gender: "male",
    discipline: "100m Sprint",
    event_name: "Men’s 100m Final",
    athlete_name: "Mohammad Rahman",
    record_performance: "10.42s",
    date_achieved: "2018-04-20",
    venue: "Dhaka Stadium",
    previous_record: "10.56s",
    previous_holder: "Hasan Ali",
    photo_url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1000",
    video_url: "https://www.youtube.com/watch?v=2XBqf03HoeA",
  },
  {
    id: 2,
    record_type: "asian",
    category: "senior",
    gender: "female",
    discipline: "Javelin Throw",
    event_name: "Women’s Javelin Final",
    athlete_name: "Rokeya Akter",
    record_performance: "56.45m",
    date_achieved: "2021-05-18",
    venue: "Tokyo Stadium",
    previous_record: "55.22m",
    previous_holder: "Sadia Islam",
    photo_url: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?q=80&w=1000",
    video_url: "https://www.youtube.com/watch?v=2XBqf03HoeA",
  },
  {
    id: 3,
    record_type: "international",
    category: "junior",
    gender: "male",
    discipline: "Long Jump",
    event_name: "Junior Long Jump",
    athlete_name: "Ashraful Karim",
    record_performance: "7.62m",
    date_achieved: "2019-08-09",
    venue: "Singapore Sports Hub",
    photo_url: "https://images.unsplash.com/photo-1599586120429-5e32f3b46e49?q=80&w=1000",
    video_url: "https://www.youtube.com/watch?v=2XBqf03HoeA",
  },
  {
    id: 4,
    record_type: "south_asian",
    category: "senior",
    gender: "female",
    discipline: "400m Sprint",
    event_name: "Women’s 400m",
    athlete_name: "Nusrat Jahan",
    record_performance: "52.89s",
    date_achieved: "2020-03-12",
    venue: "Colombo Stadium",
    previous_record: "53.50s",
    previous_holder: "Tania Sultana",
    photo_url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1000",
    video_url: "https://www.youtube.com/watch?v=2XBqf03HoeA",
  },
  // --- Additional 20 Records ---
  {
    id: 5,
    record_type: "national",
    category: "junior",
    gender: "male",
    discipline: "200m Sprint",
    event_name: "Junior 200m Final",
    athlete_name: "Arif Hossain",
    record_performance: "21.34s",
    date_achieved: "2022-02-14",
    venue: "Chittagong Stadium",
    previous_record: "21.50s",
    previous_holder: "Rafi Ahmed",
    photo_url: "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?q=80&w=1000",
    video_url: "https://www.youtube.com/watch?v=2XBqf03HoeA",
  },
  {
    id: 6,
    record_type: "asian",
    category: "senior",
    gender: "male",
    discipline: "High Jump",
    event_name: "Men’s High Jump",
    athlete_name: "Farhan Uddin",
    record_performance: "2.28m",
    date_achieved: "2021-07-19",
    venue: "Kuala Lumpur Arena",
    previous_record: "2.24m",
    previous_holder: "Rashid Khan",
    photo_url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b6b9?q=80&w=1000",
    video_url: "https://www.youtube.com/watch?v=2XBqf03HoeA",
  },
  {
    id: 7,
    record_type: "international",
    category: "senior",
    gender: "female",
    discipline: "Shot Put",
    event_name: "Women’s Shot Put",
    athlete_name: "Samia Yasmin",
    record_performance: "18.42m",
    date_achieved: "2019-11-23",
    venue: "Berlin Stadium",
    previous_record: "18.10m",
    previous_holder: "Fatema Begum",
    photo_url: "https://images.unsplash.com/photo-1617396900799-9e8a8d832b11?q=80&w=1000",
    video_url: "https://www.youtube.com/watch?v=2XBqf03HoeA",
  },
  {
    id: 8,
    record_type: "national",
    category: "senior",
    gender: "male",
    discipline: "Marathon",
    event_name: "Dhaka City Marathon",
    athlete_name: "Shahriar Kabir",
    record_performance: "2h 12m 43s",
    date_achieved: "2023-01-18",
    venue: "Dhaka City",
    previous_record: "2h 15m 10s",
    previous_holder: "Jamal Uddin",
    photo_url: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1000",
    video_url: "https://www.youtube.com/watch?v=2XBqf03HoeA",
  },
  {
    id: 9,
    record_type: "south_asian",
    category: "junior",
    gender: "female",
    discipline: "Long Jump",
    event_name: "Junior Long Jump Final",
    athlete_name: "Mim Akter",
    record_performance: "6.12m",
    date_achieved: "2020-10-25",
    venue: "Kathmandu Ground",
    previous_record: "6.05m",
    previous_holder: "Sumi Begum",
    photo_url: "https://images.unsplash.com/photo-1583512603867-5fd2ae0d2b7b?q=80&w=1000",
    video_url: "https://www.youtube.com/watch?v=2XBqf03HoeA",
  },
  {
    id: 10,
    record_type: "international",
    category: "senior",
    gender: "male",
    discipline: "Discus Throw",
    event_name: "Men’s Discus Throw Final",
    athlete_name: "Raihan Alam",
    record_performance: "65.24m",
    date_achieved: "2022-06-11",
    venue: "Seoul Stadium",
    previous_record: "63.80m",
    previous_holder: "Imran Khan",
    photo_url: "https://images.unsplash.com/photo-1597752129416-bb61d655a29c?q=80&w=1000",
    video_url: "https://www.youtube.com/watch?v=2XBqf03HoeA",
  },
  {
    id: 11,
    record_type: "national",
    category: "senior",
    gender: "female",
    discipline: "800m Sprint",
    event_name: "Women’s 800m",
    athlete_name: "Sadia Noor",
    record_performance: "2:01.45",
    date_achieved: "2023-04-05",
    venue: "Dhaka Stadium",
    previous_record: "2:02.70",
    previous_holder: "Anika Rahman",
    photo_url: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?q=80&w=1000",
    video_url: "https://www.youtube.com/watch?v=2XBqf03HoeA",
  },
  {
    id: 12,
    record_type: "asian",
    category: "senior",
    gender: "male",
    discipline: "Triple Jump",
    event_name: "Men’s Triple Jump",
    athlete_name: "Tanvir Hasan",
    record_performance: "17.05m",
    date_achieved: "2021-03-17",
    venue: "Bangkok Sports Arena",
    previous_record: "16.80m",
    previous_holder: "Shamim Ali",
    photo_url: "https://images.unsplash.com/photo-1599586120429-5e32f3b46e49?q=80&w=1000",
    video_url: "https://www.youtube.com/watch?v=2XBqf03HoeA",
  },
  {
    id: 13,
    record_type: "south_asian",
    category: "junior",
    gender: "male",
    discipline: "Pole Vault",
    event_name: "Junior Pole Vault",
    athlete_name: "Nayeem Islam",
    record_performance: "5.25m",
    date_achieved: "2020-02-10",
    venue: "Delhi Arena",
    previous_record: "5.12m",
    previous_holder: "Riaz Uddin",
    photo_url: "https://images.unsplash.com/photo-1599305090598-94e5fda7a8a7?q=80&w=1000",
    video_url: "https://www.youtube.com/watch?v=2XBqf03HoeA",
  },
  {
    id: 14,
    record_type: "national",
    category: "senior",
    gender: "female",
    discipline: "1500m Sprint",
    event_name: "Women’s 1500m",
    athlete_name: "Farzana Ahmed",
    record_performance: "4:08.62",
    date_achieved: "2023-09-15",
    venue: "Dhaka Stadium",
    previous_record: "4:10.15",
    previous_holder: "Khadija Sultana",
    photo_url: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1000",
    video_url: "https://www.youtube.com/watch?v=2XBqf03HoeA",
  },
  {
    id: 15,
    record_type: "international",
    category: "senior",
    gender: "male",
    discipline: "400m Hurdles",
    event_name: "Men’s 400m Hurdles",
    athlete_name: "Rashedul Islam",
    record_performance: "48.65s",
    date_achieved: "2019-07-30",
    venue: "Doha Stadium",
    previous_record: "48.92s",
    previous_holder: "Rahim Ali",
    photo_url: "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?q=80&w=1000",
    video_url: "https://www.youtube.com/watch?v=2XBqf03HoeA",
  },
  {
    id: 16,
    record_type: "asian",
    category: "junior",
    gender: "female",
    discipline: "100m Sprint",
    event_name: "Junior Women’s 100m",
    athlete_name: "Lamia Khatun",
    record_performance: "11.78s",
    date_achieved: "2022-10-07",
    venue: "Seoul Sports Complex",
    previous_record: "11.85s",
    previous_holder: "Sadia Rahman",
    photo_url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1000",
    video_url: "https://www.youtube.com/watch?v=2XBqf03HoeA",
  },
  {
    id: 17,
    record_type: "south_asian",
    category: "senior",
    gender: "male",
    discipline: "Hammer Throw",
    event_name: "Men’s Hammer Throw",
    athlete_name: "Jahid Hasan",
    record_performance: "75.28m",
    date_achieved: "2020-05-09",
    venue: "Colombo Stadium",
    previous_record: "73.90m",
    previous_holder: "Imam Khan",
    photo_url: "https://images.unsplash.com/photo-1617396900799-9e8a8d832b11?q=80&w=1000",
    video_url: "https://www.youtube.com/watch?v=2XBqf03HoeA",
  },
  {
    id: 18,
    record_type: "international",
    category: "junior",
    gender: "female",
    discipline: "800m Sprint",
    event_name: "Junior 800m Final",
    athlete_name: "Mitu Chowdhury",
    record_performance: "2:04.23",
    date_achieved: "2021-08-19",
    venue: "Jakarta Stadium",
    previous_record: "2:05.40",
    previous_holder: "Nabila Sultana",
    photo_url: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?q=80&w=1000",
    video_url: "https://www.youtube.com/watch?v=2XBqf03HoeA",
  },
  {
    id: 19,
    record_type: "national",
    category: "senior",
    gender: "male",
    discipline: "5000m",
    event_name: "Men’s 5000m",
    athlete_name: "Rafiul Islam",
    record_performance: "13:45.90",
    date_achieved: "2023-04-30",
    venue: "Dhaka Stadium",
    previous_record: "13:49.10",
    previous_holder: "Nayeem Rahman",
    photo_url: "https://images.unsplash.com/photo-1605296867424-35fc25c9212a?q=80&w=1000",
    video_url: "https://www.youtube.com/watch?v=2XBqf03HoeA",
  },
  {
    id: 20,
    record_type: "asian",
    category: "senior",
    gender: "female",
    discipline: "400m Hurdles",
    event_name: "Women’s 400m Hurdles",
    athlete_name: "Sultana Parvin",
    record_performance: "56.10s",
    date_achieved: "2022-05-02",
    venue: "Bangkok Arena",
    previous_record: "56.45s",
    previous_holder: "Anamika Noor",
    photo_url: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=1000",
    video_url: "https://www.youtube.com/watch?v=2XBqf03HoeA",
  },
  {
    id: 21,
    record_type: "international",
    category: "senior",
    gender: "male",
    discipline: "110m Hurdles",
    event_name: "Men’s 110m Hurdles",
    athlete_name: "Kamal Uddin",
    record_performance: "13.29s",
    date_achieved: "2021-07-01",
    venue: "Dubai Stadium",
    previous_record: "13.45s",
    previous_holder: "Rashed Rahman",
    photo_url: "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=1000",
    video_url: "https://www.youtube.com/watch?v=2XBqf03HoeA",
  },
  {
    id: 22,
    record_type: "south_asian",
    category: "junior",
    gender: "female",
    discipline: "Discus Throw",
    event_name: "Junior Discus Final",
    athlete_name: "Tania Alam",
    record_performance: "52.45m",
    date_achieved: "2020-08-28",
    venue: "Colombo Arena",
    previous_record: "51.88m",
    previous_holder: "Jannat Noor",
    photo_url: "https://images.unsplash.com/photo-1597752129416-bb61d655a29c?q=80&w=1000",
    video_url: "https://www.youtube.com/watch?v=2XBqf03HoeA",
  },
  {
    id: 23,
    record_type: "national",
    category: "junior",
    gender: "male",
    discipline: "Javelin Throw",
    event_name: "Junior Javelin Final",
    athlete_name: "Ehsan Habib",
    record_performance: "68.12m",
    date_achieved: "2024-03-17",
    venue: "Rajshahi Stadium",
    previous_record: "66.85m",
    previous_holder: "Sohan Khan",
    photo_url: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?q=80&w=1000",
    video_url: "https://www.youtube.com/watch?v=2XBqf03HoeA",
  },
  {
    id: 24,
    record_type: "international",
    category: "senior",
    gender: "female",
    discipline: "Marathon",
    event_name: "Tokyo Women’s Marathon",
    athlete_name: "Razia Rahman",
    record_performance: "2h 25m 32s",
    date_achieved: "2022-10-22",
    venue: "Tokyo City",
    previous_record: "2h 26m 18s",
    previous_holder: "Salma Khatun",
    photo_url: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1000",
    video_url: "https://www.youtube.com/watch?v=2XBqf03HoeA",
  },
];

const DISCIPLINES = [
  "All Disciplines",
  "100m Sprint",
  "200m Sprint",
  "400m Sprint",
  "800m Run",
  "1500m Run",
  "Long Jump",
  "High Jump",
  "Javelin Throw",
  "Discus Throw",
  "Marathon",
];

const recordTypeIcons = {
  national: Trophy,
  international: Globe,
  asian: Award,
  south_asian: Medal,
};

export default function AthleticsRecordsPage() {
  const [selectedRecordType, setSelectedRecordType] = useState("national");
  const [selectedCategory, setSelectedCategory] = useState("senior");
  const [selectedGender, setSelectedGender] = useState("male");
  const [selectedDiscipline, setSelectedDiscipline] = useState("All Disciplines");

  // Filter dummy records
  const records = DUMMY_RECORDS.filter((record) => {
    const matchesType = record.record_type === selectedRecordType;
    const matchesCategory = record.category === selectedCategory;
    const matchesGender = record.gender === selectedGender;
    const matchesDiscipline = selectedDiscipline === "All Disciplines" || record.discipline === selectedDiscipline;

    return matchesType && matchesCategory && matchesGender && matchesDiscipline;
  });

  const groupedRecords = records.reduce<Record<string, typeof records>>((acc, record) => {
    if (!acc[record.discipline]) acc[record.discipline] = [];
    acc[record.discipline].push(record);
    return acc;
  }, {});

  const isLoading = false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F6F3] to-white py-12 px-4 pt-32 md:pt-40">
      <div className="main_container mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg mb-8 border border-[#D4AF37]/20">
            <Crown className="w-5 h-5 text-[#D4AF37]" />
            <span className="text-sm font-semibold bg-gradient-to-r from-[#D4AF37] to-[#B8941F] bg-clip-text text-transparent">
              Record Breakers
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-[#2D3436] mb-6 leading-tight">
            Athletics{" "}
            <span className="bg-gradient-to-r from-[#D4AF37] to-[#B8941F] bg-clip-text text-transparent">Records</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            National and international records by Bangladeshi athletes
          </p>
        </div>

        {/* Filters */}
        <Card className="border-none shadow-2xl mb-8">
          <CardContent className="p-2 md:p-8">
            <div className="space-y-6">
              {/* Record Type */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[#D4AF37]" />
                  Record Type
                </label>
                <Tabs value={selectedRecordType} onValueChange={setSelectedRecordType}>
                  <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-xl">
                    <TabsTrigger value="national">
                      <Trophy className="w-4 h-4 mr-2 hidden md:block" />
                      National
                    </TabsTrigger>
                    <TabsTrigger value="south_asian">
                      <Medal className="w-4 h-4 mr-2 hidden md:block" />
                      South Asian
                    </TabsTrigger>
                    <TabsTrigger value="asian">
                      <Award className="w-4 h-4 mr-2 hidden md:block" />
                      Asian
                    </TabsTrigger>
                    <TabsTrigger value="international">
                      <Globe className="w-4 h-4 mr-2 hidden md:block" />
                      International
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Category, Gender, Discipline */}
              <div className="grid md:grid-cols-3 gap-4">
                {/* Category */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Category</label>
                  <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
                    <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-xl">
                      <TabsTrigger value="senior">Senior</TabsTrigger>
                      <TabsTrigger value="junior">Junior</TabsTrigger>
                      <TabsTrigger value="youth">Youth</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Gender */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Gender</label>
                  <Tabs value={selectedGender} onValueChange={setSelectedGender}>
                    <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-xl">
                      <TabsTrigger value="male">Men</TabsTrigger>
                      <TabsTrigger value="female">Women</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Discipline */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">Discipline</label>
                  <Select value={selectedDiscipline} onValueChange={setSelectedDiscipline}>
                    <SelectTrigger className="!h-11 w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {DISCIPLINES.map((discipline) => (
                        <SelectItem key={discipline} value={discipline}>
                          {discipline}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Records List */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="border-none shadow-lg animate-pulse">
                <CardContent className="p-8">
                  <div className="h-40 bg-gray-200 rounded" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : records.length > 0 ? (
          <div className="space-y-8">
            {Object.entries(groupedRecords).map(([discipline, disciplineRecords]) => (
              <div key={discipline}>
                <div className="flex items-center gap-3 mb-6">
                  <Target className="w-6 h-6 text-[#00704A]" />
                  <h2 className="text-3xl font-bold text-[#2D3436]">{discipline}</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {disciplineRecords.map((record) => {
                    const RecordIcon = recordTypeIcons[record.record_type as keyof typeof recordTypeIcons];
                    const currentYear = new Date().getFullYear();
                    const recordYear = new Date(record.date_achieved).getFullYear();
                    const yearsStanding = currentYear - recordYear;

                    return (
                      <Card
                        key={record.id}
                        className="border-none shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                      >
                        {/* Header */}
                        <div className="h-32 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] relative overflow-hidden">
                          {record.photo_url && (
                            <>
                              <img
                                src={record.photo_url}
                                alt={record.athlete_name}
                                className="w-full h-full object-cover opacity-40"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </>
                          )}

                          <div className="absolute inset-0 flex items-center justify-between px-6">
                            <div>
                              <Badge
                                variant="outline"
                                className="bg-white/20 backdrop-blur-sm text-white border-none mb-2"
                              >
                                {record.record_type.replace("_", " ").toUpperCase()} RECORD
                              </Badge>
                              <h3 className="text-2xl font-bold text-white">{record.record_performance}</h3>
                            </div>
                            <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                              <RecordIcon className="w-8 h-8 text-white" />
                            </div>
                          </div>
                        </div>

                        {/* Content */}
                        <CardContent className="p-6 space-y-4">
                          <div>
                            <h4 className="text-2xl font-bold text-[#2D3436] mb-1">{record.athlete_name}</h4>
                            <p className="text-gray-600">{record.event_name}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="w-4 h-4 text-[#00704A]" />
                              <div>
                                <div className="text-xs text-gray-500">Date</div>
                                <div className="font-semibold">
                                  {format(new Date(record.date_achieved), "MMM d, yyyy")}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="w-4 h-4 text-[#C1272D]" />
                              <div>
                                <div className="text-xs text-gray-500">Venue</div>
                                <div className="font-semibold line-clamp-1">{record.venue}</div>
                              </div>
                            </div>
                          </div>

                          {yearsStanding >= 1 && (
                            <div className="bg-[#D4AF37]/10 rounded-xl p-4 border border-[#D4AF37]/20">
                              <div className="flex items-center gap-2">
                                <History className="w-5 h-5 text-[#D4AF37]" />
                                <span className="text-sm font-semibold text-[#2D3436]">
                                  Record standing for{" "}
                                  <span className="text-[#D4AF37]">
                                    {yearsStanding} {yearsStanding === 1 ? "year" : "years"}
                                  </span>
                                </span>
                              </div>
                            </div>
                          )}

                          {record.previous_record && (
                            <div className="pt-4 border-t border-gray-100">
                              <div className="text-xs text-gray-500 mb-1">Previous Record</div>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-gray-700">{record.previous_holder}</span>
                                <span className="text-sm font-bold text-gray-600">{record.previous_record}</span>
                              </div>
                            </div>
                          )}

                          {record.video_url && (
                            <button
                              onClick={() => window.open(record.video_url, "_blank")}
                              className="w-full mt-4 bg-gradient-to-r from-[#00704A] to-[#005239] hover:from-[#005239] hover:to-[#00704A] text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300"
                            >
                              <Video className="w-5 h-5" />
                              Watch Performance
                            </button>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Card className="border-none shadow-lg">
            <CardContent className="p-16 text-center">
              <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-2">No records found</p>
              <p className="text-sm text-gray-500">Try adjusting your filters</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
