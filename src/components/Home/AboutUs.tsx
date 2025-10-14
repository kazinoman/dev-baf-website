"use client";
import Image from "next/image";
import { FiCheck } from "react-icons/fi";
import about1 from "@/assets/images/home/about/about1.jpg";
import about2 from "@/assets/images/home/about/about2.jpg";
import Text from "../ui/Text";
import Button from "../ui/Button";
import shape1 from "@/assets/images/home/about/shape1.png";

export default function AboutUs({ page = "home" }: { page: string }) {
  const handleEploreEvent = () => {};

  
  return page === "home" ? (
    <section className="bg-black text-white py-12 lg:py-28">
      <div className="main_container relative">

        <Image
          src={shape1}
          alt="Soccer players in action"
          className="object-container  absolute bottom-16 md:bottom-0 right-24  lg:top-28 lg:right-10 shape-move-right"
        />


        <div className="grid lg:grid-cols-[43%_57%] gap-8 lg:gap-12 items-center">
          {/* Images Section */}
          <div className="grid grid-cols-2 gap-4 items-center">
            <div className="space-y-4">
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={about1}
                  alt="Soccer players in action"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative aspect-[3/5] overflow-hidden">
                <Image
                  src={about2}
                  alt="Soccer players in action"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            <div className="space-y-2 md:space-y-3 lg:space-y-4">
              <Text size="4xl" weight="extrabold" color="white">
                ABOUT THE
              </Text>
              <Text size="5xl" weight="extrabold" color="white">
                BANGLADESH ATHLETICS FEDERATION
              </Text>

              <p className="text-sm md:text-base font_roboto text-neutral-400 mt-10">
                Bangladesh Athletics Federation is dedicated to promoting and
                developing athletics across the country. We aim to nurture
                talent, organize competitions, and foster a culture of
                excellence in track and field sports. Our programs focus on
                empowering athletes, coaches, and officials, while upholding the
                highest standards of sportsmanship and integrity.
              </p>
            </div>

            {/* Stats Section */}
            <div className="flex flex-col md:flex-row gap-3 md:gap-10 lg:gap-12 ">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-8 w-8 md:w-10 md:h-10 bg-white rounded-full ">
                  <FiCheck className="w-5 h-5 md:w-6 md:h-6 text-black" />
                </div>

                <div>
                  <p className="text-sm md:text-base uppercase font_roboto text-white">
                    Manager
                  </p>
                  <Text size="xl" color="white" weight="bold">
                    PRO 05
                  </Text>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-8 w-8 md:w-10 md:h-10 bg-white rounded-full ">
                  <FiCheck className="w-5 h-5 md:w-6 md:h-6 text-black" />
                </div>

                <div>
                  <p className="text-sm md:text-base uppercase font_roboto text-white">
                    PLAYERS
                  </p>
                  <Text size="xl" color="white" weight="bold">
                    PRO 05
                  </Text>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-8 w-8 md:w-10 md:h-10 bg-white rounded-full ">
                  <FiCheck className="w-5 h-5 md:w-6 md:h-6 text-black" />
                </div>

                <div>
                  <p className="text-sm md:text-base uppercase font_roboto text-white">
                    COACH
                  </p>
                  <Text size="xl" color="white" weight="bold">
                    PRO 05
                  </Text>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              variant="orange"
              buttonEvent={handleEploreEvent}
              className="px-2 cursor-pointer"
            >
              Our team
            </Button>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <section className=" text-[#111111] py-12 lg:py-28">

      <div className="main_container relative">
        {/* <Image
          src={shape1}
          alt="Soccer players in action"
          className="object-container  absolute bottom-16 md:bottom-0 right-24  lg:top-28 lg:right-10 shape-move-right"
        /> */}

        <div className="grid lg:grid-cols-[43%_57%] gap-8 lg:gap-12 ">

          {/* Images Section */}
          <div className="grid grid-cols-2 gap-4 items-center   ">
            <div className="space-y-4">
              <div className="relative aspect-[3/4] overflow-hidden ">
                <Image
                  src={about1}
                  alt="Soccer players in action"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative aspect-[3/5] overflow-hidden ">
                <Image
                  src={about2}
                  alt="Soccer players in action"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-8 ">
            <div className="space-y-1 md:space-y-2 lg:space-y-3">
              <Text size="4xl" weight="extrabold" color="black">
                ABOUT THE
              </Text>
              <Text size="5xl" weight="extrabold" color="black">
                CLUB KESTER
              </Text>

              <p className="text-base md:text-base  font_roboto text-[#999999] mt-5 lg:mt-9">
                Nulla habitant commodo euismod feugiat aenean quisque platea ac,
                nisl potenti fusce conubia ventis blandit iaculis, curabitur
                enim inceptos a odio taciti sapien. Dictumst dis metus inceptos
                curae fermentum nvel, ridiculus a dapibus egestas penatibus mus,
                cubilia fusce iaculis
              </p>
            </div>

            {/* Stats Section */}
            <div className="flex flex-col md:flex-row gap-3 md:gap-10 lg:gap-12 ">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-8 w-8 md:w-10 md:h-10 bg-white rounded-full ">
                  <FiCheck className="w-5 h-5 md:w-6 md:h-6 text-black" />
                </div>

                <div>
                  <p className="text-sm  uppercase font_roboto">
                    Manager
                  </p>
                  <Text size="xl" color="black" weight="bold">
                    PRO 05
                  </Text>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-8 w-8 md:w-10 md:h-10 bg-white rounded-full ">
                  <FiCheck className="w-5 h-5 md:w-6 md:h-6 text-black" />
                </div>

                <div>
                  <p className="text-sm uppercase font_roboto">
                    PLAYERS
                  </p>
                  <Text size="xl" color="black" weight="bold">
                    PRO 05
                  </Text>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center h-8 w-8 md:w-10 md:h-10 bg-white rounded-full ">
                  <FiCheck className="w-5 h-5 md:w-6 md:h-6 text-black" />
                </div>

                <div>
                  <p className="text-sm uppercase font_roboto">
                    COACH
                  </p>
                  <Text size="xl" color="black" weight="bold">
                    PRO 05
                  </Text>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              variant="orange"
              buttonEvent={handleEploreEvent}
              className="lg:mt-14 px-2 cursor-pointer"
            >
              Our team
            </Button>
          </div>
        </div>
      </div>
    </section>
  );

  // return (
  //   <section className="bg-black text-white py-12 lg:py-20">
  //     <div className="main_container relative">
  //       <Image
  //         src={shape1}
  //         alt="Soccer players in action"
  //         className="object-container  absolute bottom-16 md:bottom-0 right-24  lg:top-28 lg:right-10 shape-move-right"
  //       />
  //       <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
  //         {/* Images Section */}
  //         <div className="grid grid-cols-2 gap-4 items-center">
  //           <div className="space-y-4">
  //             <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
  //               <Image
  //                 src={about1}
  //                 alt="Soccer players in action"
  //                 fill
  //                 className="object-cover"
  //               />
  //             </div>
  //           </div>

  //           <div className="space-y-4">
  //             <div className="relative aspect-[3/5] overflow-hidden rounded-lg">
  //               <Image
  //                 src={about2}
  //                 alt="Soccer players in action"
  //                 fill
  //                 className="object-cover"
  //               />
  //             </div>
  //           </div>
  //         </div>

  //         {/* Content Section */}
  //         <div className="space-y-8">
  //           <div className="space-y-3 md:space-y-5 lg:space-y-7">
  //             <Text size="4xl" weight="extrabold" color="white">
  //               ABOUT THE
  //             </Text>
  //             <Text size="5xl" weight="extrabold" color="white">
  //               BANGLADESH ATHLETICS FEDERATION
  //             </Text>

  //             <p className="text-sm md:text-base lg:text-xl font_roboto text-neutral-400">
  //               Bangladesh Athletics Federation is dedicated to promoting and
  //               developing athletics across the country. We aim to nurture
  //               talent, organize competitions, and foster a culture of
  //               excellence in track and field sports. Our programs focus on
  //               empowering athletes, coaches, and officials, while upholding the
  //               highest standards of sportsmanship and integrity.
  //             </p>
  //           </div>

  //           {/* Stats Section */}
  //           <div className="flex flex-col md:flex-row gap-3 md:gap-10 lg:gap-12 ">
  //             <div className="flex items-center gap-3">
  //               <div className="flex items-center justify-center h-8 w-8 md:w-10 md:h-10 bg-white rounded-full ">
  //                 <FiCheck className="w-5 h-5 md:w-6 md:h-6 text-black" />
  //               </div>

  //               <div>
  //                 <p className="text-sm md:text-base uppercase font_roboto text-white">
  //                   Manager
  //                 </p>
  //                 <Text size="xl" color="white" weight="bold">
  //                   PRO 05
  //                 </Text>
  //               </div>
  //             </div>

  //             <div className="flex items-center gap-3">
  //               <div className="flex items-center justify-center h-8 w-8 md:w-10 md:h-10 bg-white rounded-full ">
  //                 <FiCheck className="w-5 h-5 md:w-6 md:h-6 text-black" />
  //               </div>

  //               <div>
  //                 <p className="text-sm md:text-base uppercase font_roboto text-white">
  //                   PLAYERS
  //                 </p>
  //                 <Text size="xl" color="white" weight="bold">
  //                   PRO 05
  //                 </Text>
  //               </div>
  //             </div>

  //             <div className="flex items-center gap-3">
  //               <div className="flex items-center justify-center h-8 w-8 md:w-10 md:h-10 bg-white rounded-full ">
  //                 <FiCheck className="w-5 h-5 md:w-6 md:h-6 text-black" />
  //               </div>

  //               <div>
  //                 <p className="text-sm md:text-base uppercase font_roboto text-white">
  //                   COACH
  //                 </p>
  //                 <Text size="xl" color="white" weight="bold">
  //                   PRO 05
  //                 </Text>
  //               </div>
  //             </div>
  //           </div>

  //           <Button type="submit" variant="orange" buttonEvent={handleEploreEvent}>
  //             Our team
  //           </Button>

  //         </div>
  //       </div>
  //     </div>
  //   </section>
  // );
}
