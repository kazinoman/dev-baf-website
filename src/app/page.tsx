import AthleteSpotlight from "@/components/Home/AthleteSpotlight";
import Hero from "@/components/Home/Hero";
import LatestNews from "@/components/Home/LatestNews";
import { SponsorsSection } from "@/components/Home/Sponsors";

// image import
import bkash from "@/assets/images/home/sponsors/bKash.png";
import daraz from "@/assets/images/home/sponsors/daraz.png";
import jamuna from "@/assets/images/home/sponsors/jamuna.png";
import meghna from "@/assets/images/home/sponsors/meghna.png";
import OurMission from "@/components/Home/OurMission";
import UpcomingEvents from "@/components/Home/UpcommingEvents";
import QuickLinks from "@/components/Home/QuickLinks";

const sponsors = [
  {
    name: "bKash",
    logo: bkash,
    url: "https://bkash.com",
  },
  {
    name: "Daraz",
    logo: daraz,
    url: "https://daraz.com.bd",
  },
  {
    name: "jamuna",
    logo: jamuna,
    url: "https://jamunabd.com",
  },
  {
    name: "MGI",
    logo: meghna,
    url: "https://mgi.com.bd",
  },
  {
    name: "Citygroup",
    logo: jamuna,
    url: "https://citygroup.com.bd",
  },
  {
    name: "Jamuna",
    logo: bkash,
    url: "https://jamuna.tv",
  },
  {
    name: "Citygroup",
    logo: jamuna,
    url: "https://citygroup.com.bd",
  },
  {
    name: "Jamuna",
    logo: bkash,
    url: "https://jamuna.tv",
  },
];

const HomePage = () => {
  return (
    <div>
      <Hero />
      <OurMission />
      <LatestNews />

      <UpcomingEvents />
      <AthleteSpotlight />
      {/* <SponsorsSection sponsors={sponsors} page="home" /> */}
      <QuickLinks />
    </div>
  );
};

export default HomePage;
