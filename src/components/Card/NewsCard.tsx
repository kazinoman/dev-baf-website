import Image, { StaticImageData } from "next/image"

interface SportsNewsCardProps {
  title: string
  category: string
  author: {
    name: string
    avatar: string | StaticImageData
  }
  date: string
  backgroundImage: string | StaticImageData
}

export function SportsNewsCard({ title, category, author, date, backgroundImage }: SportsNewsCardProps) {
    

  return (
    <div className="relative group overflow-hidden bg-gray-900 shadow-lg hover:shadow-xl  ">

      {/* Background Image */}
      <div className="relative h-[410px] w-full ">
        <Image
          src={backgroundImage || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30"/>


        {/* Category Badge */}
        <div className="absolute top-[210px] md:top-[225px] lg:top-[200px] xl:top-[235px] left-8 z-10">
          <span className="inline-block bg-red-600 text-white text-xs font-bold px-3 py-1 uppercase tracking-wide shadow-lg">
            {category}
          </span>
        </div>


        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
          <h3 className="text-xl md:text-xl font-bold mb-4 leading-tight text-balance drop-shadow-lg  duration-500 hover:text-[#e41b23] cursor-pointer">{title}</h3>


          {/* Author Info */}
          <div className="flex items-center gap-3 mt-8">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white/30 shadow-lg">
              <Image src={author.avatar || "/placeholder.svg"} alt={author.name} fill className="object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-base drop-shadow-md">{author.name}</span>
              <span className="text-sm text-white/80 drop-shadow-md">{date}</span>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
