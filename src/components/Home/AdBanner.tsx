
import Image from "next/image";
import adBanner from '@/assets/images/ad-banner.jpg'


export default function AdBanner() {
  
  return (
    <div className="my-1 sm:my-3 md:my-5 lg:my-16 max-w-7xl mx-auto ">
      <Image
      src={adBanner}
      alt="ad-banner"
      className="w-full object-contain h-auto"
      />
    </div>
  );
}
