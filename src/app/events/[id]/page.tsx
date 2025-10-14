import EventDetails from '@/components/events/EventDetails';
import AllPageTopBannar from '@/components/ui/AllPageTopBanner';
import React from 'react'

const EventDatailsPage = () => {


  return (
    <div>
       <AllPageTopBannar pageName='event details' pageTtile='event details'/>
       <EventDetails></EventDetails>
    </div>
  )
}

export default EventDatailsPage;
