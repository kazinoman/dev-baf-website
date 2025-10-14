import Image from "next/image";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa6";
import { RxDividerVertical } from "react-icons/rx";


interface PlayerCardProps {
  id: string;
  name: string;
  position: string;
  image: string;
}

export function PlayerCard({ id, name, position, image }: PlayerCardProps) {



  return (
    <div className="group relative overflow-hidden transition-all duration-300 ">
      <div className="p-0">
        <div className="relative h-[310px] w-full lg:w-[300px] overflow-hidden  flex justify-center items-end group bg-gradient-to-b from-black/5 to-black/5">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={240}
            height={100}
            className="object-contain object-center group-hover:scale-110 transition-transform duration-300"
          />

        
          {/* Position Badge */}
          {/* <div className="absolute top-3 left-3 bg-background/90 text-foreground font-medium backdrop-blur-sm">
            {position}
          </div> */}

          {/* hover element  */}
          <div
            className="absolute top-8 right-5 flex flex-col justify-center items-center gap-1 py-1 opacity-0 translate-x-full group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-in-out"
          >

            {/* Social icons */}
             <div className="px-3 py-3 bg-white text-[#111] duration-500 cursor-pointer">
                <RxDividerVertical className="cursor-pointer hover:scale-110 transition-transform" />
             </div>

            <div className="px-3 py-3 bg-white hover:bg-[#e41b23] hover:text-[#fff] text-[#111] duration-500 cursor-pointer">
               <FaFacebookF className="cursor-pointer hover:scale-110 transition-transform " />
            </div>

             <div className="px-3 py-3 bg-white hover:bg-[#e41b23] hover:text-[#fff] text-[#111] duration-500 cursor-pointer">
               <FaTwitter className="cursor-pointer hover:scale-110 transition-transform " />
            </div>
            
             <div className="px-3 py-3 bg-white hover:bg-[#e41b23] hover:text-[#fff] text-[#111] duration-500 cursor-pointer">
               <FaLinkedinIn className="cursor-pointer hover:scale-110 transition-transform " />
            </div>

          </div>

        </div>

        <div className="py-4 space-y-3">
          <div>
            <p className="text-sm text-[#999999]  font-normal roboto-font">
              {position}
            </p>
            <h3 className="font-semibold text-2xl text-[#111111] hover:text-[#E41B23] leading-tight text-balance duration-300 cursor-pointer mt-0.5">
              {name}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
