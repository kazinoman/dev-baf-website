import ChampionsLeague5YearButtons from '@/components/about-us/ChampionsLeague';
import Counter from '@/components/about-us/Counter';
import AboutUs from '@/components/Home/AboutUs';
import { SponsorsSection } from '@/components/Home/Sponsors';
import AllPageTopBannar from '@/components/ui/AllPageTopBanner';
// import image 
import brand1 from '@/assets/images/brands/1.png'
import brand2 from '@/assets/images/brands/2.png'
import brand3 from '@/assets/images/brands/3.png'
import brand4 from '@/assets/images/brands/4.png'
import brand5 from '@/assets/images/brands/5.png'
import brand6 from '@/assets/images/brands/6.png'
import brand7 from '@/assets/images/brands/7.png'
import brand8 from '@/assets/images/brands/8.png'
import brand9 from '@/assets/images/brands/9.png'


const sponsors = [
  {
    name: "bKash",
    logo: brand1,
    url: "https://bkash.com",
  },
  {
    name: "Daraz",
    logo: brand2,
    url: "https://daraz.com.bd",
  },
  {
    name: "jamuna",
    logo: brand3,
    url: "https://jamunabd.com",
  },
  {
    name: "MGI",
    logo: brand4,
    url: "https://mgi.com.bd",
  },
  {
    name: "Citygroup",
    logo: brand5,
    url: "https://citygroup.com.bd",
  },
  {
    name: "Jamuna",
    logo: brand6,
    url: "https://jamuna.tv",
  },{
    name: "Citygroup",
    logo: brand7,
    url: "https://citygroup.com.bd",
  },
  {
    name: "Jamuna",
    logo: brand8,
    url: "https://jamuna.tv",
  },
  {
    name: "Jamuna",
    logo: brand9,
    url: "https://jamuna.tv",
  },

];


const AboutusPage = () => {

  return (
    <div>
        <AllPageTopBannar pageName='About us' pageTtile='about us' />
        <AboutUs page="about-us"/>
        <Counter/>
        <ChampionsLeague5YearButtons/>
        <SponsorsSection sponsors={sponsors} page='about-us' />  
    </div>
  )
}

export default AboutusPage;
