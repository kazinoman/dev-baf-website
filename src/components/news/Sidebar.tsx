import { Search } from "lucide-react";
import news1 from "@/assets/images/news/news1.jpg";
import news2 from "@/assets/images/news/news2.jpg";
import news3 from "@/assets/images/news/news3.jpg";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

const popularFeeds = [
  {
    id: 1,
    title: "HAVING EDUCATION IN AN AREA HELPS",
    date: "24th March 2023",
    image: news1,
  },
  {
    id: 2,
    title: "PEOPLE THINK, FEEL, & BEHAVE IN A WAY",
    date: "24th March 2023",
    image: news2,
  },
  {
    id: 3,
    title: "THAT CONTRIBUTES TO THEIR SUCCESS",
    date: "24th March 2023",
    image: news3,
  },
];

const categorisItems = [
  {
    name: "Business",
    value: "34",
  },
  {
    name: "Consultand",
    value: "24",
  },
  {
    name: "Creative",
    value: "84",
  },
  {
    name: "UI/UI",
    value: "64",
  },
  {
    name: "Technologys",
    value: "34",
  },
];
const tagsItems = [
  "popular",
  "design",
  "ux",
  "develop",
  "icon",
  "business",
  "contact",
  "kit",
  "keyborad",
  "mouse",
  "tech",
];

export function Sidebar() {
  return (
    <div className="space-y-6">
      {/* Search Section */}
      <div>
        <div>
          <div className="text-sm sm:text-base md:text-lg lg:text-2xl font-bold uppercase border-b-[1px] border-gray-300 pb-3 ">
            SEARCH HERE
          </div>
        </div>

        <div>
          <div className="flex mt-12">
            <input
              placeholder="Keyword..."
              className="flex-1 border border-red-600 py-4 pl-3 rounded-xs  focus:outline-none "
            />
            <button className="bg-red-500 hover:bg-red-600 text-white">
              <Search className="h-4 w-[60px]" />
            </button>
          </div>
        </div>
      </div>

      {/* Popular Feeds Section */}
      <div>

        <div className="mt-10">
          <div className="text-sm sm:text-base md:text-lg lg:text-2xl font-bold uppercase border-b-[1px] border-gray-300 pb-3">
            POPULAR FEEDS
          </div>
        </div>


        <div className="space-y-4 mt-8">
          {popularFeeds.map((feed) => (
            <div key={feed.id} className="flex gap-5 group cursor-pointer">
              <div className="flex-shrink-0">
                <img
                  src={feed.image.src || "/placeholder.svg"}
                  alt={feed.title}
                  className="w-20 h-18 object-cover rounded-md group-hover:scale-110 duration-500"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm sm:text-base md:text-lg uppercase leading-tight mb-2 group-hover:text-[#e41b23] group-hover:underline  transition-colors">
                  {feed.title}
                </h3>
                <p className="text-sm text-[#777777] roboto-font">
                  {feed.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categoris section  */} 
      <div>
        <div className="mt-10">
          <div className="text-sm sm:text-base md:text-lg lg:text-2xl   font-bold uppercase border-b-[1px] border-gray-300 pb-3">
            categoris
          </div>
        </div>

        {/* categoris list  */}
        <div className="mt-8">
          {categorisItems?.map((item, index) => (
            <div key={index} className="flex justify-between items-center mt-4">
              <div className="flex gap-1 items-center">
                <GoChevronRight />
                <h3 className="text-sm md:text-base text-[#777777] roboto-font hover:text-[#111111] cursor-pointer">
                  {item.name}
                </h3>
              </div>
              <h3 className="text-sm sm:text-base md:text-lg ">{item.value}</h3>
            </div>
          ))}
        </div>
      </div>
      {/* Tags section  */}
      <div>
        <div className="text-sm sm:text-base md:text-lg lg:text-2xl font-bold uppercase border-b-[1px] border-gray-300 pb-3 mt-10">
          Tags
        </div>

        <ul className="grid grid-cols-3 gap-2 mt-8">
          {tagsItems?.map((item, index) => (
            <li
              key={index}
              className="hover:text-[#FFFFFF] hover:bg-red-600 roboto-font text-sm   py-1.5 px-1 text-center cursor-pointer duration-300 ease-in-out uppercase"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
