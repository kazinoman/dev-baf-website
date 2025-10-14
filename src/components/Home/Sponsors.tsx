"use client";
import Image, { StaticImageData } from "next/image";
import AutoSponsorsCarousel from "./SponsorsCarousel";

// type defind
type TSponsors = {
  name: string;
  logo: StaticImageData | string;
  url: string;
};

type SponsorsProps = {
  sponsors: TSponsors[];
  page: string;
};

export function SponsorsSection({ sponsors, page = "home" }: SponsorsProps) {
  return page === "home" ? (
    <section className={`py-16 px-4  mt-20 lg:mt-1`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4 text-balance">HAPPY SPONSORS</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 w-2/3 mx-auto">
          {sponsors.slice(0, 4).map((item, index) => (
            <div key={index} className="flex items-center justify-center">
              <Image src={item.logo} width={200} height={200} alt="bg" />
            </div>
          ))}
        </div>

        <AutoSponsorsCarousel sponsors={sponsors} page="home" />
      </div>
    </section>
  ) : (
    <section className="py-16 px-4  mt-28">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance z-30">HAPPY SPONSORS</h2>
          <p className="w-1/3 mx-auto text-base roboto-font text-[#999999] mt-8">
            It is one of the most popular football clubs that offer training programs for the youth, as well as summer
            camps.
          </p>
        </div>

        <AutoSponsorsCarousel sponsors={sponsors} page="about-us" />
      </div>
    </section>
  );
}
