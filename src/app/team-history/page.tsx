
import OurAwards from '@/components/timeline/OurAwards';
import TeamHistoryTimeline from '@/components/timeline/Timeline';
import TeamHistoryVideoSection from '@/components/timeline/VideoSection';
import AllPageTopBannar from '@/components/ui/AllPageTopBanner';
import React from 'react'


const TeamHistoryPage = () => {

  return (
    <div>
      <AllPageTopBannar pageName='history' pageTtile='team history'/>
      <TeamHistoryTimeline/>
      <TeamHistoryVideoSection/> 

      <OurAwards/>
    </div>
  )
}

export default TeamHistoryPage;
