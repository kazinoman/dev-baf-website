import Image, { StaticImageData } from "next/image";
import React from "react";
import FAQ from "./Faq";


interface FAQItem {
  question: string;
  answer: string;
}

interface TFaqProps {
  faqs: FAQItem[];
  title: string;
  image: string | StaticImageData;
  contentFrist: boolean;
}

const FaqSection = ({ faqs, title, image, contentFrist }: TFaqProps) => {
  return (
    <div className={`${contentFrist ? "bg-gray-100 pt-5 pb-10 md:py-16" : ""}  px-4 sm:px-5`}>
      <div className="h-[560px] grid grid-cols-1 md:grid-cols-2  items-center gap-4 md:gap-8 mt-7 mb-96 md:my-20 max-w-7xl mx-auto ">
        {/* Image Section */}
        <div
          className={`relative w-full h-[560px] order-1 ${
            contentFrist ? "order-2" : "order-1"
          }`}
        >
          <Image
            src={image}
            alt="faq-image"
            fill
            className="object-cover rounded-sm"
            priority
          />
        </div>

        {/* FAQ */}
        <div className={`${contentFrist ? "order-1" : "order-2"}`}>
          <FAQ faqs={faqs} title={title} />
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
