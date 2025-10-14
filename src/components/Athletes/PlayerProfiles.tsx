import React from 'react'
import { PlayerProfileCard } from '../Card/PlayerProfileCard'
import player1 from '@/assets/images/team/team01.png'
import player2 from '@/assets/images/team/team02.png'
import player3 from '@/assets/images/team/team03.png'

import financial from '@/assets/images/team/financial.jpg'
import physician from '@/assets/images/team/physician.jpg'
import coach from '@/assets/images/team/coach.jpg'


const playersProfiles = [
  {
    "name": "Lionel Messi",
    "role": "Forward",
    "image": financial,
    "nationality": "Argentina",
    "nationalityFlag": "/flags/argentina.png",
    "currentTeam": "KESTER",
    "pastTeam": "Paris Saint-Germain",
    "age": 36
  },
  {
    "name": "Cristiano Ronaldo",
    "role": "Forward",
    "image": physician,
    "nationality": "Portugal",
    "nationalityFlag": "/flags/portugal.png",
    "currentTeam": "KESTER",
    "pastTeam": "Manchester United",
    "age": 39
  },
  {
    "name": "Kevin De Bruyne",
    "role": "Midfielder",
    "image": coach,
    "nationality": "Belgium",
    "nationalityFlag": "/flags/belgium.png",
    "currentTeam": "Manchester City",
    "pastTeam": "VfL Wolfsburg",
    "age": 32
  }
]


const PlayerProfiles = () => {


  return (
    <div className='mb-24'>
      {
        playersProfiles.map((profile, index)=> <div key={index} >
         <PlayerProfileCard
            name={profile.name}
            role={profile.role}
            image={profile.image.src}
            nationality={profile.nationality}
            nationalityFlag="🇦🇷"
            currentTeam={profile.currentTeam}
            pastTeam={profile.pastTeam}
            age={45}
          />
        </div>)
      }
    </div>
  )
}

export default PlayerProfiles
