import React from "react";
import DynamicHeading from "./HeadingComponent";

const LatestNews: React.FC = () => {
  const newsItems = [
    {
      id: 1,
      title: "National Athletics Championship 2025 Registration Open",
      excerpt:
        "Registration is now open for the 48th National Athletics Championship. Athletes from all categories can register through the online portal.",
      date: "October 5, 2025",
      category: "Track & Field",
      gradient: "from-green-600 to-green-400",
      emoji: "📰",
    },
    {
      id: 2,
      title: "Bangladesh Athletes Shine at South Asian Games",
      excerpt: "Our athletes brought home 8 medals including 3 golds from the recent South Asian Games held in Nepal.",
      date: "October 3, 2025",
      category: "Achievement",
      gradient: "from-yellow-500 to-yellow-300",
      emoji: "🏆",
    },
    {
      id: 3,
      title: "New Training Facility Inaugurated in Chittagong",
      excerpt:
        "A state-of-the-art athletics training facility has been inaugurated in Chittagong to support regional athletes.",
      date: "September 28, 2025",
      category: "Training",
      gradient: "from-blue-500 to-blue-400",
      emoji: "📢",
    },
    {
      id: 4,
      title: "New Training Facility Inaugurated in Chittagong",
      excerpt: "A state-of-the-art athletics training ",
      date: "September 28, 2025",
      category: "Training",
      gradient: "from-blue-500 to-blue-400",
      emoji: "📢",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="main_container mx-auto px-4 sm:px-6 lg:px-4 xl:px-0">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-[#00916e] font-semibold text-sm uppercase tracking-wider mb-2">Stay Updated</div>
          {/* <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Latest News & Announcements</h2> */}
          <DynamicHeading title="Latest News & Announcements" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get the latest updates on events, achievements, and federation activities
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {newsItems.map((news) => (
            <div
              key={news.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
            >
              {/* Image Placeholder */}
              <div
                className={`h-48 bg-gradient-to-br ${news.gradient} flex items-center justify-center text-white text-2xl font-semibold`}
              >
                {news.emoji} News Image
              </div>

              {/* Content */}
              <div className="p-6  h-[280px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between space-x-4 text-sm text-gray-500 mb-3">
                    <span>📅 {news.date}</span>
                    <div className="px-2 py-0.5 border border-gray-200 rounded-full">
                      <span>🏃 {news.category}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight line-clamp-2">{news.title}</h3>

                  <p className="text-gray-600 mb-4 leading-relaxed line-clamp-3">{news.excerpt}</p>
                </div>

                <button className="text-[#00916e] font-semibold flex items-center space-x-1 hover:space-x-2 transition-all duration-200 cursor-pointer">
                  <span>Read More</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
