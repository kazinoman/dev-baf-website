import { ArticleGrid } from '@/components/news/ArticleGrid';
import { Sidebar } from '@/components/news/Sidebar';
import AllPageTopBannar from '@/components/ui/AllPageTopBanner';
import React from 'react'

const NewsPage = () => {


  return (
    <div>
      <AllPageTopBannar pageName='news' pageTtile='latest news' />

      {/* main content  */}
       <div className="container mx-auto px-4 py-8 mt-0 md:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <ArticleGrid />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>

        </div>
      </div>
    </div>
  )
}

export default NewsPage;
