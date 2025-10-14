'use client'

import { AuthorProfile } from '@/components/news/AuthorProfile';
import DatailsArticle from '@/components/news/datails-article';
import { Sidebar } from '@/components/news/Sidebar';
import SocialShareOthers from '@/components/news/social-others';
import AllPageTopBannar from '@/components/ui/AllPageTopBanner';
import author from '@/assets/images/author/author.jpg'
import { CommentCard } from '@/components/news/CommentCard';
import CommentPage from '@/components/news/CommentSection';
import CommentForm from '@/components/news/CommentForm';


const NewsDatailsPage = () => {


   const handleReply = () => {
    console.log("Reply clicked")
  }


  return (
     <div>
      <AllPageTopBannar pageName='news' pageTtile='latest news' />

      {/* main content  */}
       <div className="container mx-auto px-4 py-8 mt-0 md:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
           <DatailsArticle/>
           <SocialShareOthers/>
           <AuthorProfile author={{
                          name: "Rosalina Kelian",
                          avatar: author,
                          initials: "RK",
                      }} 
                      bio='Getting fast initial render with streaming server-side rendering, efficient component-level updates and state transitions, while also setting up a performant loading and bundling strategy.'
                      />
            <CommentPage/>
            <CommentForm/>
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

export default NewsDatailsPage;
