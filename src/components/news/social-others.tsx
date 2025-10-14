import { Quote } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Separator } from "../ui/Separator";
import { FaFacebookF, FaTwitter } from "react-icons/fa";
import { FaBehance, FaSquareInstagram } from "react-icons/fa6";
import Image from "next/image";
import dotIcon from "@/assets/images/icons/grid-shape.svg";

export default function SocialShareOthers() {
  return (
    <div className="min-h-screen">
      <main className="my-20">
        {/* Testimonial Section */}

        {/* Testimonial Block */}
        <div className="mb-8 border border-[#e5272e] rounded-lg">
          <div className="p-6 sm:p-8 md:p-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
              {/* Quote Icon */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-red-500 rounded-full flex justify-center items-center flex-shrink-0">
                <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-white fill-current" />
              </div>

              {/* Author Info */}
              <div className="mt-2 sm:mt-0">
                <h3 className="font-bold text-base sm:text-lg text-foreground">ROSALINA D. WILLIAM</h3>
                <p className="text-xs sm:text-sm text-muted-foreground uppercase tracking-wide">FOUNDER</p>
              </div>
            </div>

            {/* Quote Text */}
            <blockquote className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-[#111111] leading-relaxed">
              Choices to take a holiday and travelling out in this pandemic situation are limited. Why not take a stay
              action on quality.
            </blockquote>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-full mb-8 mt-10 sm:mt-14">
          <p className="text-[#777777] leading-relaxed text-sm sm:text-base md:text-lg roboto-font">
            Surveying the existing landscape of available developer tools and runtimes, we felt that there is a gap.
            Enabling dynamic commerce requires close integration between server and client, an optimized streaming and
            data fetch strategy, and a production platform that operates at scale. These are hard technical problems
            that Shopify can help solve and this is why we&apos;ve been hard at work on the Hydrogen framework.
            It&apos;s a React-based framework optimized for commerce and specialized to be powered by Shopify APIs and
            infrastructure. The future of commerce is dynamic and personalized.
          </p>
        </div>

        {/* Tags and Social Share Section */}
        <div
          className="
    flex flex-col md:flex-row 
    justify-between 
    items-start md:items-center 
    gap-4 md:gap-12 
     mt-6 md:mb-12 md:mt-16 lg:mt-24
  "
        >
          {/* Related Tags */}
          <div className="w-full md:w-auto">
            <h3 className="font-bold text-[#111111] mb-3 uppercase tracking-wide text-lg sm:text-xl">RELATED TAGS</h3>
            <div className="flex flex-wrap gap-2 mt-4 sm:mt-6">
              <Badge variant="secondary" className="pr-3 md:px-3 py-1 text-xs sm:text-sm font-medium">
                POPULAR
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 text-xs sm:text-sm font-medium">
                DESIGN
              </Badge>
              <Badge variant="secondary" className="px-3 py-1 text-xs sm:text-sm font-medium">
                UX
              </Badge>
            </div>
          </div>

          {/* Social Share */}
          <div className="w-full md:w-auto">
            <h3 className="font-bold text-[#111111] mb-3 uppercase tracking-wide text-lg sm:text-xl">SHARE</h3>
            <div className="flex flex-wrap gap-4 sm:gap-5 mt-4 sm:mt-6">
              <FaTwitter size={18} className="text-[#b9b9b9] hover:text-[#e41b23] transition-colors" />
              <FaFacebookF size={18} className="text-[#b9b9b9] hover:text-[#e41b23] transition-colors" />
              <FaSquareInstagram size={18} className="text-[#b9b9b9] hover:text-[#e41b23] transition-colors" />
              <FaBehance size={18} className="text-[#b9b9b9] hover:text-[#e41b23] transition-colors" />
              <FaTwitter size={18} className="text-[#b9b9b9] hover:text-[#e41b23] transition-colors" />
            </div>
          </div>
        </div>

        <Separator className=" md:mb-8 mt-8" />

        {/* Navigation */}
        <div
          className="
    flex flex-col md:flex-row 
    justify-between 
    items-start md:items-center 
    gap-4 md:gap-12 
     mt-6 md:mt-12
  "
        >
          {/* Previous Post */}
          <div className="w-full md:w-auto text-left">
            <p className="text-sm text-[#777777] mb-1 roboto-font">Prev Post</p>
            <h5 className="font-bold text-xl sm:text-2xl md:text-3xl group-hover:text-primary transition-colors">
              TIPS ON MINIMALIST
            </h5>
          </div>

          {/* Decorative Dots */}
          <div className="hidden md:flex gap-1">
            <Image src={dotIcon} width={40} height={100} alt="dot-icons" className="object-contain" />
          </div>

          {/* Next Post */}
          <div className="w-full md:w-auto text-left md:text-right">
            <p className="text-sm text-[#777777] mb-1 roboto-font">Next Post</p>
            <h5 className="font-bold text-xl sm:text-2xl md:text-3xl group-hover:text-primary transition-colors">
              LESS IS MORE
            </h5>
          </div>
        </div>
      </main>
    </div>
  );
}
