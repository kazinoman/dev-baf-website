"use client";
import { useState } from "react";
import { Plus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface TFaqProps {
  faqs: FAQItem[],
  title: string
}




export default function FAQ({faqs, title }: TFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="">
      <h2 className=" text-3xl md:text-4xl lg:text-5xl font-bold uppercase mb-6">{title}</h2>

      {faqs.map((faq, index) => (
        <div
          key={index}
          className="py-3 transition-all"
        >
          <button
            onClick={() => toggleFAQ(index)}
            className="w-full flex justify-between items-center text-left focus:outline-none cursor-pointer border border-gray-200 py-3 px-4 rounded-sm"
          >
            <span
              className={`font-semibold text-[#111] text-lg ${
                openIndex === index ? "text-red-500" : ""
              }`}
            >
              {faq.question}
            </span>

            <div
              className={`bg-gray-200 flex justify-center items-center w-7 h-7 duration-500 ${
                openIndex === index
                  ? "rotate-45 bg-red-500 text-white w-7 h-7 duration-500"
                  : ""
              }`}
            >
              <Plus
                className={` text-gray-700 transition-transform duration-500 ${
                  openIndex === index ? "text-white" : ""
                }`}
              />
            </div>
          </button>

          <div
            className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
              openIndex === index ? "max-h-40" : "max-h-0"
            }`}
          >
            <p className="text-[#666666] roboto-font text-base mt-3">
              {faq.answer}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
