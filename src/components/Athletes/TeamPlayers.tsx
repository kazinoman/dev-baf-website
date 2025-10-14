import { PlayerCard } from "../Card/PlayerCard"
import player1 from '@/assets/images/team/team01.png'
import player2 from '@/assets/images/team/team02.png'
import player3 from '@/assets/images/team/team03.png'
import player4 from '@/assets/images/team/team04.png'
import player5 from '@/assets/images/team/team05.png'
import player6 from '@/assets/images/team/team06.png'
import player7 from '@/assets/images/team/team07.png'
import player8 from '@/assets/images/team/team08.png'


const players = [
  {
    id: "1",
    name: "MAXIELS DAVID",
    position: "FORWARD",
    image: player1,
    jerseyColor: "#fbbf24",
  },
  {
    id: "2",
    name: "VEN DIESEL",
    position: "WINGER",
    image: player2,
    jerseyColor: "#0891b2",
  },
  {
    id: "3",
    name: "NED STARK",
    position: "WINGER",
    image: player3,
    jerseyColor: "#ef4444",
  },
  {
    id: "4",
    name: "JOHN WICK",
    position: "MID-FIELDER",
    image: player4,
    jerseyColor: "#ffffff",
  },
  {
    id: "5",
    name: "JOHN WICK",
    position: "MID-FIELDER",
    image: player5,
    jerseyColor: "#ffffff",
  },
  {
    id: "6",
    name: "JOHN WICK",
    position: "MID-FIELDER",
    image: player6,
    jerseyColor: "#ffffff",
  },
  {
    id: "7",
    name: "JOHN WICK",
    position: "MID-FIELDER",
    image: player7,
    jerseyColor: "#ffffff",
  },
  {
    id: "8",
    name: "JOHN WICK",
    position: "MID-FIELDER",
    image: player8,
    jerseyColor: "#ffffff",
  },
]


export function TeamPlayers() {

  return (
    <section className="py-12 md:mt-6" >
      <div className="container mx-auto px-4 sm:px-5">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {players?.map((player) => (
            <PlayerCard
              key={player.id}
              id={player.id}
              name={player.name}
              position={player.position}
              image={player.image.src}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
