import FaqSection from '@/components/faq/FaqSection'
import AllPageTopBannar from '@/components/ui/AllPageTopBanner'
import React from 'react'
import faqImg1 from '@/assets/images/history/video-1.jpg'
import faqImg2 from '@/assets/images/history/aboutthumb.jpg'

const faqs1 = [
  {
    question: "01. WHAT IS THE BANGLADESH ATHLETICS FEDERATION (BAF)?",
    answer:
      "The Bangladesh Athletics Federation (BAF) is the national governing body responsible for athletics in Bangladesh.",
  },
  {
    question: "02. WHEN WAS BAF ESTABLISHED?",
    answer: "BAF was established in 1972 after Bangladesh gained independence.",
  },
  {
    question: "03. WHAT TYPES OF EVENTS DOES BAF ORGANIZE?",
    answer:
      "BAF organizes national championships, coaching programs, and international athletics competitions.",
  },
];




const page = () => {
  return (
    <div>
      <AllPageTopBannar pageName='faq' pageTtile='faq'/>

      <FaqSection faqs={faqs1} title='General Information' image={faqImg1} contentFrist={false} />
      <FaqSection faqs={faqs1} title='Athlete & Membership Queries' image={faqImg2} contentFrist={true} />
    </div>
  )
}

export default page
