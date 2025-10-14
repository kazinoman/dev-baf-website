import React from 'react'
import athletesBanner from '@/assets/images/bannar/bannerbg-inner.jpg'

type TBannerProps = {
  pageName: string,
  pageTtile: string
}


const AthletesBannar = ({pageName, pageTtile}:TBannerProps) => {


  return (
    <div
      className="relative h-[250px] lg:h-[450px] w-full bg-center bg-cover"
      style={{ backgroundImage: `url(${athletesBanner.src})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-red-800/99 mix-blend-multiply"></div>

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center top-14">
        <div className="w-full max-w-7xl px-4 text-white mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-4 tracking-widest">
            <h4 className="bg-gradient-to-r from-red-500 to-white bg-clip-text text-transparent uppercase">Home</h4>
            <h4>|</h4>
            <h4 className='uppercase'>{pageName}</h4>
          </div>

          <h1 className=" text-3xl md:text-4xl lg:text-6xl font-bold uppercase">{pageTtile}</h1>
        </div>
      </div>
    </div>
  )
}

export default AthletesBannar
