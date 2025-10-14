'use client'
import { EventArticleCard } from '@/components/Card/EventArticleCard';
import AllPageTopBannar from '@/components/ui/AllPageTopBanner';
import React, { useState } from 'react'
import event1 from '@/assets/images/event/event1.jpg'
import event2 from '@/assets/images/event/event2.jpg'
import event3 from '@/assets/images/event/event3.jpg'
import event4 from '@/assets/images/event/event4.jpg'
import event5 from '@/assets/images/event/event5.jpg'
import event6 from '@/assets/images/event/event6.jpg'
import event7 from '@/assets/images/event/event7.jpg'
import event8 from '@/assets/images/event/event7.jpg'
import event9 from '@/assets/images/event/event9.jpg'
import Pagination from '@/components/ui/Pagination';



const articles = [
  {
    id: '1',
    title: "How do you get ready for match?",
    description:
      "Welcome to the official Sportius FC website. Get all the latest news, videos and ticket info as well as player profiles.",
    date: "20 JANUARY 2023",
    imageUrl: event1,
    imageAlt: "Soccer team in huddle preparing for match",
  },
  {
    id: '2',
    title: "It's what you were waiting for this...",
    description:
      "Welcome to the official Sportius FC website. Get all the latest news, videos and ticket info as well as player profiles.",
    date: "20 JANUARY 2023",
    imageUrl: event2,
    imageAlt: "Soccer player kicking ball in stadium",
  },
  {
    id: '3',
    title: "Are you ready for new season?",
    description:
      "Welcome to the official Sportius FC website. Get all the latest news, videos and ticket info as well as player profiles.",
    date: "20 JANUARY 2023",
    imageUrl: event3,
    imageAlt: "Two soccer players competing for ball",
  },
  {
    id: '4',
    title: "Are you ready for new season?",
    description:
      "Welcome to the official Sportius FC website. Get all the latest news, videos and ticket info as well as player profiles.",
    date: "20 JANUARY 2023",
    imageUrl: event4,
    imageAlt: "Two soccer players competing for ball",
  },
  {
    id: '5',
    title: "Are you ready for new season?",
    description:
      "Welcome to the official Sportius FC website. Get all the latest news, videos and ticket info as well as player profiles.",
    date: "20 JANUARY 2023",
    imageUrl: event5,
    imageAlt: "Two soccer players competing for ball",
  },
  {
    id: '6',
    title: "Are you ready for new season?",
    description:
      "Welcome to the official Sportius FC website. Get all the latest news, videos and ticket info as well as player profiles.",
    date: "20 JANUARY 2023",
    imageUrl: event6,
    imageAlt: "Two soccer players competing for ball",
  },
  {
    id: '7',
    title: "Are you ready for new season?",
    description:
      "Welcome to the official Sportius FC website. Get all the latest news, videos and ticket info as well as player profiles.",
    date: "20 JANUARY 2023",
    imageUrl: event7,
    imageAlt: "Two soccer players competing for ball",
  },
  {
    id: '8',
    title: "Are you ready for new season?",
    description:
      "Welcome to the official Sportius FC website. Get all the latest news, videos and ticket info as well as player profiles.",
    date: "20 JANUARY 2023",
    imageUrl: event8,
    imageAlt: "Two soccer players competing for ball",
  },
  {
    id: '9',
    title: "Are you ready for new season?",
    description:
      "Welcome to the official Sportius FC website. Get all the latest news, videos and ticket info as well as player profiles.",
    date: "20 JANUARY 2023",
    imageUrl: event9,
    imageAlt: "Two soccer players competing for ball",
  },
]



const EventsPage = () => {
      const [currentPage, setCurrentPage] = useState(1)
      const totalPages = 105


  return (
    <div>
      <AllPageTopBannar pageName='Event' pageTtile='out events'/>

       {/* event articles card  */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-28 max-w-7xl mx-auto">
          {articles?.map((article, index) => (
            <EventArticleCard
              key={index}
              id={article.id}
              title={article.title}
              description={article.description}
              date={article.date}
              imageUrl={article.imageUrl.src}
              imageAlt={article.imageAlt}
            />
          ))}
        </div>

        {/* Pagination  */}
        <div className="flex justify-start  mb-28 mt-4 max-w-7xl mx-auto">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            siblingCount={1}
            showFirstLast={true}
          />
        </div>

    </div>
  )
}

export default EventsPage;
